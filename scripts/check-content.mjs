#!/usr/bin/env node
/**
 * Pre-build gate. Fails the build if:
 *  - a markdown page marked status: reviewed has no sources, or lacks published/reviewed dates
 *  - the feed is malformed
 * Reports which drafts are being held back and which feed companies are excluded (and why).
 */
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';

const root = process.cwd();
let errors = 0;
const err = (m) => { console.error('  ✗ ' + m); errors++; };

console.log('Content check');
for (const dir of ['src/content/guide', 'src/content/qa']) {
  for (const f of fs.readdirSync(path.join(root, dir)).filter((f) => f.endsWith('.md'))) {
    const raw = fs.readFileSync(path.join(root, dir, f), 'utf8');
    const m = raw.match(/^---\n([\s\S]*?)\n---/);
    if (!m) { err(`${dir}/${f}: missing front matter`); continue; }
    const fm = parse(m[1]);
    for (const k of ['title', 'published', 'reviewed', 'status', 'sources']) if (fm[k] === undefined) err(`${dir}/${f}: missing "${k}"`);
    if (!['draft', 'reviewed'].includes(fm.status)) err(`${dir}/${f}: status must be draft or reviewed`);
    if (fm.status === 'reviewed' && (!Array.isArray(fm.sources) || fm.sources.length === 0)) err(`${dir}/${f}: reviewed page has no sources (never publish text without sources)`);
    if (fm.status === 'draft') console.log(`  · held back (draft): ${dir}/${f}`);
  }
}

console.log('Feed check');
const feedPath = fs.existsSync(path.join(root, 'data/feed.json')) ? 'data/feed.json' : 'data/feed.mock.json';
console.log(`  · using ${feedPath}${feedPath.includes('mock') ? ' (MOCK: real export not present)' : ''}`);
let feed;
try { feed = JSON.parse(fs.readFileSync(path.join(root, feedPath), 'utf8')); } catch (e) { err(`${feedPath}: ${e.message}`); }
if (feed) {
  const includeExamples = process.env.INCLUDE_EXAMPLES === '1';
  for (const c of feed.companies ?? []) {
    const reasons = [];
    if (c.removed === true) reasons.push('removed');
    if (!(c.verified === true || c.founder_owned === true)) reasons.push('not verified and not founder-owned');
    if (c.example === true && !includeExamples) reasons.push('example record');
    if (reasons.length) console.log(`  · excluded: ${c.id} (${reasons.join(', ')})`);
    else console.log(`  · published: ${c.id}${c.founder_owned ? ' [founder-owned]' : ''} rank.BO=${c.rank?.BO ?? 'none'}`);
    if (c.tier === 'founder' && c.founder_owned !== true) err(`${c.id}: tier founder but founder_owned is not true`);
  }
}

if (errors) { console.error(`\n${errors} content error(s). Build stopped.`); process.exit(1); }
console.log('Content check passed.\n');
