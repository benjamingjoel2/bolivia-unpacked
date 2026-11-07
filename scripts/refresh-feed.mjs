#!/usr/bin/env node
/**
 * Refresh the company feed from the Tourground directory export.
 *   FEED_URL=https://... npm run feed:refresh
 * Writes data/feed.json (used in preference to data/feed.mock.json).
 * Prints which companies were added or removed. Removed companies lose their page in the next build.
 */
import fs from 'node:fs';

const url = process.env.FEED_URL;
if (!url) { console.error('Set FEED_URL to the Tourground directory export URL.'); process.exit(1); }
const headers = process.env.FEED_TOKEN ? { Authorization: `Bearer ${process.env.FEED_TOKEN}` } : {};
const res = await fetch(url, { headers });
if (!res.ok) { console.error(`Feed fetch failed: HTTP ${res.status}`); process.exit(1); }
const next = await res.json();
if (!Array.isArray(next.companies) || !Array.isArray(next.destinations)) { console.error('Feed is missing destinations[] or companies[]. Not written.'); process.exit(1); }

const prevPath = fs.existsSync('data/feed.json') ? 'data/feed.json' : null;
const prev = prevPath ? JSON.parse(fs.readFileSync(prevPath, 'utf8')) : { companies: [] };
const ids = (f) => new Set(f.companies.map((c) => c.id));
const a = ids(prev), b = ids(next);
for (const id of b) if (!a.has(id)) console.log(`+ added   ${id}`);
for (const id of a) if (!b.has(id)) console.log(`- removed ${id} (page will be unpublished in the next build)`);
fs.writeFileSync('data/feed.json', JSON.stringify(next, null, 2) + '\n');
console.log(`Wrote data/feed.json (${next.companies.length} companies).`);
