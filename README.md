# Bolivia Unpacked

The plain-English reference for planning Bolivia: altitude, the salt flats, the Andes and the Amazon, and the verified operators who make it easy.

A Tourground destination booster: a static, citable reference site at **https://boliviaunpacked.tourground.com**, built with [Astro](https://astro.build) and hosted on Vercel. Published by Tourground.

## Run it

Requires Node 22+.

```bash
npm ci
npm run dev        # http://localhost:4321
npm run build      # content gate → astro build → JSON-LD and page checks
npm run preview    # serve dist/
```

`npm run build` fails if any reviewed page lacks sources, if the feed is malformed, or if the built HTML breaks a rule (one H1, canonical, footer line, JSON-LD validity, no phone/WhatsApp, only the allowed email, no unverified or example companies).

To see the fake example companies while working on templates: `INCLUDE_EXAMPLES=1 npm run dev`. Never set this on Vercel.

## Where things live

| What | File |
| --- | --- |
| Name, domain, email, editor line, accent colour, address, **all disclosure and paid-label wording**, legal sign-off | `src/site.config.ts` |
| Company feed (mock until the real export exists) | `data/feed.mock.json` → replaced by `data/feed.json` |
| Feed rules (verified-only gate, ranking, links) | `src/lib/feed.ts` |
| Ranked lists (niches) | `src/data/niches.ts` |
| Guide pages | `src/content/guide/*.md` |
| Q&A pages | `src/content/qa/*.md` |
| Altitude ladder data | `src/data/altitude.json` |
| Salt-flats month data | `src/data/salar-months.json` |
| Theme (AGUAYO) | `src/styles/global.css` |
| Paid placement slot (empty) | `src/components/AdSlot.astro`, `paidPlacements` in config |
| Field assumptions | `DATA-FIELDS.md` |
| Facts awaiting checks | `FACTS-TO-VERIFY.md` |

## Add reviewed content

1. Create a markdown file in `src/content/guide/` or `src/content/qa/`. The file name becomes the URL slug.
2. Front matter:

```yaml
---
title: "Page title"
description: "One or two sentences, 20–200 characters."
published: 2026-11-07
reviewed: 2026-11-07
status: draft            # draft | reviewed — only reviewed is published
sources:
  - url: https://example.gov/page
    label: "Publisher: page title"
    accessed: 2026-11-07   # optional
# guide pages also need:
section: regions         # regions | planning
order: 9
elevation_m: 3640        # optional: marks the altitude rail
elevation_label: La Paz  # optional
# Q&A pages also need:
question: "The question as travellers ask it?"
short_answer: "Two or three plain sentences. Shown first and used in FAQPage JSON-LD."
order: 6
---
```

3. Quote any value that contains a colon.
4. Write plain, factual English. No statistics, reviews, quotes or counts without a source.
5. When an editor has checked every fact against the sources, set `status: reviewed` and update `reviewed`. Pages without sources never publish, even if marked reviewed (the build fails).
6. Add new facts that need checking to `FACTS-TO-VERIFY.md`.

## Refresh the feed

Company facts come only from the Tourground directory export. Never edit company facts in this repo.

```bash
FEED_URL="https://<directory-export-url>" FEED_TOKEN="<optional>" npm run feed:refresh
```

This writes `data/feed.json` (used in preference to the mock) and prints added and removed companies. Commit it and push; Vercel rebuilds.

- A company removed from the feed, set `removed: true`, or no longer `verified` / `founder_owned`, loses its page in the next build.
- Ranks are used exactly as given (`rank.BO`, ascending). The site never reorders them.
- Company counts are computed from the feed at build time.

To refresh on every deploy instead, set `FEED_URL` (and `FEED_TOKEN`) in the Vercel project and change the build command to `npm run feed:refresh && npm run build`.

## Deploy

Vercel project settings come from `vercel.json` (build `npm run build`, output `dist`, clean URLs, trailing slashes). Pushing to `main` deploys production. Analytics: Vercel Web Analytics only (enable it in the Vercel project's Analytics tab); no cookies, no other tracking.

## Before launch

- Legal sign-off (US, UK, EU, Brazil) on everything in `disclosure` and `legal` in `src/site.config.ts`, and on the Privacy, Terms and Cookie pages.
- Confirm the business address and correction URL (both placeholders).
- Replace the mock feed with the real export.
- Work through `FACTS-TO-VERIFY.md`.

## Images

None at present (the OG card `public/og-default.png` is generated typography, `scripts/make-og.mjs`). Any image added must be owned or licensed, recorded in `imageCredits` in the config, carry `width` and `height`, be lazy-loaded below the fold, and never show identifiable people.
