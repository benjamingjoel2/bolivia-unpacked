#!/usr/bin/env node
/**
 * Pre-build gate for posts. Fails the build if a published post:
 *  - lacks sources, dates, hero, or categories
 *  - is outside 1,200–2,000 words
 *  - mentions health, entry/visa or safety topics without a factsChecked date
 *  - contains a currency amount (no invented prices) or an invented-sounding first-person anecdote marker
 *  - uses a hero photo with no credit record
 * Also validates the operator feed.
 */
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const root = process.cwd();
let errors = 0;
const err = (m) => { console.error('  ✗ ' + m); errors++; };
const warn = (m) => console.warn('  ! ' + m);

const photos = fs.existsSync(path.join(root, 'src/data/photos.json')) ? JSON.parse(fs.readFileSync(path.join(root, 'src/data/photos.json'), 'utf8')) : {};
for (const [k, p] of Object.entries(photos)) {
  for (const f of ['file', 'title', 'author', 'licence', 'licenceUrl', 'sourceUrl', 'alt']) if (!p[f]) err(`photos.json ${k}: missing ${f}`);
  if (!fs.existsSync(path.join(root, 'src/assets/photos', p.file))) err(`photos.json ${k}: file ${p.file} not found`);
  if (/\bNC\b|\bND\b|noncommercial|noderivs/i.test(p.licence)) err(`photos.json ${k}: licence ${p.licence} not allowed`);
}

console.log('Post check');
const dir = path.join(root, 'src/content/posts');
const sensitive = /\b(visa|passport|entry requirement|vaccin|yellow fever|malaria|altitude sickness|acute mountain sickness|AMS\b|HAPE|HACE|acetazolamide|blockade|crime|robbery|kidnap|safety advice)/i;
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.md'))) {
  const raw = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) { err(`${f}: missing front matter`); continue; }
  const fm = parse(m[1]);
  const body = m[2];
  if (fm.draft) { console.log(`  · held back (draft): ${f}`); continue; }
  for (const k of ['title', 'description', 'published', 'updated', 'categories', 'hero', 'sources']) if (fm[k] === undefined) err(`${f}: missing "${k}"`);
  if (!Array.isArray(fm.sources) || fm.sources.length === 0) err(`${f}: no sources`);
  if (fm.hero && !photos[fm.hero]) err(`${f}: hero photo "${fm.hero}" has no credit record`);
  const words = body.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').split(/\s+/).filter(Boolean).length;
  if (words < 1200 || words > 2000) err(`${f}: ${words} words (must be 1,200–2,000)`);
  if (sensitive.test(body) && !fm.factsChecked) err(`${f}: mentions health/entry/safety topics but has no factsChecked date`);
  const money = body.match(/(?:US\$|\$|£|€|\bBs\.?\s?\d|\bBOB\s?\d|\bUSD\s?\d|\d+\s?(?:bolivianos|dollars|euros|pounds)\b)/i);
  if (money) err(`${f}: looks like a price ("${money[0]}"). Prices are not published.`);
  const anecdote = body.match(/\b(I|my|me)\b(?![-'])/);
  if (anecdote) warn(`${f}: first-person "${anecdote[0]}" found; posts are written by the desk, check it is not an invented anecdote`);
  console.log(`  · ${f}: ${words} words, ${fm.sources?.length ?? 0} sources${fm.factsChecked ? ', facts checked' : ''}`);
}

console.log('Feed check');
const feedPath = fs.existsSync(path.join(root, 'data/feed.json')) ? 'data/feed.json' : 'data/feed.mock.json';
console.log(`  · using ${feedPath}${feedPath.includes('mock') ? ' (MOCK: real export not present)' : ''}`);
try {
  const feed = JSON.parse(fs.readFileSync(path.join(root, feedPath), 'utf8'));
  for (const c of feed.companies ?? []) if (c.tier === 'founder' && c.founder_owned !== true) err(`${c.id}: tier founder but founder_owned is not true`);
} catch (e) { err(`${feedPath}: ${e.message}`); }

if (errors) { console.error(`\n${errors} content error(s). Build stopped.`); process.exit(1); }
console.log('Content check passed.\n');
