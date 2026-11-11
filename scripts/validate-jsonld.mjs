#!/usr/bin/env node
/**
 * Post-build checks over dist/:
 *  - every JSON-LD block parses and has @context + @type
 *  - required properties per type (Google rich-result requirements where they exist)
 *  - one H1 per page, canonical, meta description, footer "Published by Tourground."
 *  - owner rules: no tel:, no WhatsApp, only the allowed email, no unverified companies
 * Exits non-zero on any error.
 */
import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const ALLOWED_EMAIL = 'boliviaunpacked@tourground.com';
const feedPath = fs.existsSync('data/feed.json') ? 'data/feed.json' : 'data/feed.mock.json';
const feed = JSON.parse(fs.readFileSync(feedPath, 'utf8'));
const forbiddenNames = feed.companies
  .filter((c) => !(c.verified === true || c.founder_owned === true) || c.removed === true || (c.example === true && process.env.INCLUDE_EXAMPLES !== '1'))
  .map((c) => c.name);

const REQUIRED = {
  BlogPosting: ['headline', 'datePublished', 'dateModified', 'author', 'publisher', 'image'],
  Blog: ['name', 'url'],
  WebSite: ['name', 'url'],
  Article: ['headline', 'datePublished', 'dateModified', 'author', 'publisher'],
  BreadcrumbList: ['itemListElement'],
  ItemList: ['itemListElement'],
  FAQPage: ['mainEntity'],
  TravelAgency: ['name', 'url', 'address'],
  Organization: ['name', 'url'],
  TouristDestination: ['name'],
};

let errors = 0, pages = 0, blocks = 0;
const types = {};
const fail = (file, msg) => { console.error(`  ✗ ${path.relative(dist, file)}: ${msg}`); errors++; };

function walk(d) { return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]); }

function checkNode(file, node) {
  const t = [].concat(node['@type'] ?? []);
  if (!t.length) return fail(file, 'JSON-LD node without @type');
  for (const ty of t) {
    types[ty] = (types[ty] ?? 0) + 1;
    for (const k of REQUIRED[ty] ?? []) if (node[k] === undefined || (Array.isArray(node[k]) && node[k].length === 0)) fail(file, `${ty} missing ${k}`);
  }
  if (t.includes('BreadcrumbList') || t.includes('ItemList')) {
    node.itemListElement.forEach((li, i) => {
      if (li.position !== i + 1) fail(file, `${t[0]} position ${li.position} at index ${i}`);
      if (t.includes('BreadcrumbList') && !li.item) fail(file, 'BreadcrumbList item missing "item" URL');
      if (t.includes('ItemList') && !li.url) fail(file, 'ItemList element missing url');
    });
  }
  if (t.includes('FAQPage')) {
    for (const q of node.mainEntity) {
      if (q['@type'] !== 'Question' || !q.name || q.acceptedAnswer?.['@type'] !== 'Answer' || !q.acceptedAnswer?.text) fail(file, 'FAQPage Question/Answer malformed');
    }
  }
  if (t.includes('Article') || t.includes('BlogPosting')) {
    for (const k of ['datePublished', 'dateModified']) if (!/^\d{4}-\d{2}-\d{2}/.test(node[k])) fail(file, `Article ${k} not ISO date`);
    if (node.headline.length > 110) fail(file, 'headline > 110 chars');
  }
}

for (const file of walk(dist).filter((f) => f.endsWith('.html'))) {
  pages++;
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(dist, file);
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) fail(file, `${h1s} <h1> elements`);
  if (!/<link rel="canonical" href="https:\/\/boliviaunpacked\.tourground\.com\//.test(html)) fail(file, 'missing canonical');
  if (!/<meta name="description" content="[^"]{20,}"/.test(html)) fail(file, 'missing meta description');
  if (!/<meta property="og:title"/.test(html)) fail(file, 'missing og:title');
  if (!html.includes('Published by Tourground.')) fail(file, 'footer missing "Published by Tourground."');
  if (/href="tel:|wa\.me|whatsapp/i.test(html)) fail(file, 'phone/WhatsApp link found');
  for (const m of html.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g)) {
    if (m[0] !== ALLOWED_EMAIL && !m[0].endsWith('.woff2') && !m[0].includes('@fontsource')) fail(file, `unexpected email ${m[0]}`);
  }
  for (const n of forbiddenNames) if (html.includes(n)) fail(file, `excluded company "${n}" appears`);
  if (html.includes('Altiplano Journeys') && !html.includes('Founder-owned (Tourground Geotrax)')) fail(file, 'Altiplano Journeys mentioned without founder-owned label');
  if (/class="ad-slot"/.test(html) && !html.includes('Advertisement feature')) fail(file, 'paid placement without "Advertisement feature" label');
  const isPost = rel.startsWith('blog/') && rel !== 'blog/index.html';
  if (isPost && !html.includes('id="plan-h"')) fail(file, 'post missing "Plan this trip" box');
  if (isPost && !html.includes('id="sources-h"')) fail(file, 'post missing sources');
  if (isPost && !/<img[^>]+fetchpriority="high"/.test(html)) fail(file, 'post missing hero photo');
  for (const img of html.matchAll(/<img\b[^>]*>/g)) if (!/\balt(=|\s|\/?>)/.test(img[0])) fail(file, 'img without alt');
  const seen = new Set();
  let ldCount = 0;
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    blocks++; ldCount++;
    let data;
    try { data = JSON.parse(m[1]); } catch (e) { fail(file, 'JSON-LD does not parse: ' + e.message); continue; }
    if (data['@context'] !== 'https://schema.org') fail(file, 'JSON-LD @context is not https://schema.org');
    for (const node of data['@graph'] ?? [data]) { checkNode(file, node); [].concat(node['@type']).forEach((t) => seen.add(t)); }
  }
  if (!ldCount) fail(file, 'no JSON-LD');
  for (const t of ['Organization', 'WebSite', 'BreadcrumbList']) if (!seen.has(t)) fail(file, `JSON-LD missing ${t}`);
  if (isPost && !seen.has('BlogPosting')) fail(file, 'JSON-LD missing BlogPosting');
}

console.log(`\nJSON-LD / page checks: ${pages} pages, ${blocks} JSON-LD blocks`);
console.log('  types:', Object.entries(types).map(([k, v]) => `${k}×${v}`).join(', '));
if (errors) { console.error(`\n${errors} error(s).`); process.exit(1); }
console.log('All checks passed.');
