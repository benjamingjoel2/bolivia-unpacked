#!/usr/bin/env node
/** One-off: renders public/og-default.png (1200x630) from HTML using the site fonts. Requires Playwright. */
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const font = (p) => fs.readFileSync(p).toString('base64');
const an = font('node_modules/@fontsource/archivo-narrow/files/archivo-narrow-latin-700-normal.woff2');
const bi = font('node_modules/@fontsource/bitter/files/bitter-latin-400-normal.woff2');
const stripe = `background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='40'%3E%3Crect width='48' height='4' fill='%23c2185b'/%3E%3Crect y='6' width='48' height='4' fill='%232e7d32'/%3E%3Crect y='12' width='48' height='16' fill='%2314254a'/%3E%3Cpolygon points='24,13 34,20 24,27 14,20' fill='%23ef6c00'/%3E%3Crect y='30' width='48' height='4' fill='%232e7d32'/%3E%3Crect y='36' width='48' height='4' fill='%23c2185b'/%3E%3C/svg%3E");background-repeat:repeat-x;height:40px`;
const html = `<html><head><style>
@font-face{font-family:AN;src:url(data:font/woff2;base64,${an})}
@font-face{font-family:BI;src:url(data:font/woff2;base64,${bi})}
body{margin:0;width:1200px;height:630px;background:#f8f6f1;color:#14254a;font-family:BI;position:relative;overflow:hidden}
.s{${stripe}}
.in{padding:56px 72px 0 120px}
h1{font-family:AN;font-size:132px;line-height:.9;margin:0 0 28px;text-transform:uppercase}
h1 span{color:#a3305a}
p{font-size:34px;line-height:1.35;margin:0;max-width:900px}
.k{font-family:AN;font-size:26px;letter-spacing:.12em;text-transform:uppercase;color:#7f5310;margin-bottom:24px}
.rail{position:absolute;left:52px;top:80px;bottom:40px;border-right:4px solid #14254a;width:20px;background:repeating-linear-gradient(to bottom,#14254a 0 2px,transparent 2px 46px);background-size:12px 100%;background-repeat:no-repeat;background-position:right}
.f{position:absolute;bottom:40px;left:120px;font-family:AN;font-size:28px}
</style></head><body><div class="s"></div><div class="rail"></div><div class="in"><div class="k">A reference publication</div><h1>Bolivia<br><span>Unpacked</span></h1><p>The plain-English reference for planning Bolivia: altitude, the salt flats, the Andes and the Amazon.</p></div><div class="f">boliviaunpacked.tourground.com · Published by Tourground</div></body></html>`;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
await p.setContent(html);
await p.waitForTimeout(300);
await p.screenshot({ path: 'public/og-default.png' });
await b.close();
console.log('wrote public/og-default.png');
