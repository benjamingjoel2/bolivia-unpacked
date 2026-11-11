# Bolivia Unpacked

A Tourground travel blog for people planning a trip to Bolivia: story-led, practical posts, each ending with a "Plan this trip" box that points to a verified local operator in the Tourground directory.

Live at **https://boliviaunpacked.tourground.com**. Astro, fully static, hosted on Vercel (project `bolivia-unpacked`). Published by Tourground.

## Run it

Requires Node 22+.

```bash
npm ci
npm run dev        # http://localhost:4321
npm run build      # content gate → astro build → JSON-LD and page checks
npm run preview    # serve dist/
```

`npm run build` fails if a post breaks a rule: missing sources, outside 1,200–2,000 words, health/entry/safety content without a `factsChecked` date, anything that looks like a price, a hero photo without a credit record, a post page without its Plan box or sources, an image without alt text, a page without Organization + WebSite + BreadcrumbList JSON-LD (plus BlogPosting on posts), Altiplano Journeys shown without its founder-owned label, or a paid placement without the "Advertisement feature" label.

## Where things live

| What | File |
| --- | --- |
| Name, domain, email, disclosure wording, paid-label wording, newsletter settings, directory URL | `src/site.config.ts` |
| Posts | `src/content/posts/*.md` (file name = URL slug, `/blog/<slug>/`) |
| Categories and destinations | `src/data/taxonomy.ts` |
| Authors (real bylines only) | `src/data/authors.ts` |
| Photos and their credits | `src/assets/photos/*.jpg` + `src/data/photos.json` |
| Operator data (verified-only gate) | `data/feed.mock.json` → replaced by `data/feed.json`; `src/lib/feed.ts` |
| Paid placements ("Advertisement feature") | `paidPlacements` in `src/site.config.ts`; `src/components/AdSlot.astro` |
| Styles | `src/styles/global.css` |
| Facts awaiting checks | `FACTS-TO-VERIFY.md` |

## Write a post

Front matter (quote any value containing a colon):

```yaml
---
title: "Post title"
description: "120–200 character summary."
published: 2026-11-11
updated: 2026-11-11
author: desk
categories: [destinations, adventure]   # first is primary: destinations, itineraries, altitude-health, adventure, food-culture, travel-tips
destinations: [uyuni]                   # la-paz, uyuni, titicaca, sucre-potosi, amazon, yungas
hero: uyuni-salt-crust                  # key in src/data/photos.json
featured: false                         # the home page's featured story
startHere: false                        # in the home page's "Start here" strip
operator: altiplano-journeys            # id from the Tourground feed
planNote: "What to ask the operator for this trip."
factsChecked: 2026-11-11                # required when the post states health, entry/visa or safety facts
sources:
  - url: https://www.gov.uk/foreign-travel-advice/bolivia
    label: "UK FCDO: Bolivia travel advice"
    accessed: 2026-11-11
---
```

Rules: no invented reviews, quotes, people, prices or statistics. Health, visa and safety facts link the official source inline and the post carries `factsChecked`. When you re-check a post, update `updated` (and `factsChecked`).

## Photos

Only freely licensed Wikimedia Commons photos (CC BY, CC BY-SA, CC0, public domain), no identifiable people, never AI-generated. Add the file to `src/assets/photos/` and a record to `src/data/photos.json` (author, licence, licence URL, source URL, alt text). Astro generates AVIF/WebP at several widths; captions and `/photo-credits/` are generated from the JSON.

## Newsletter

No mailing-list provider is connected. Until `newsletter.action` is set in `src/site.config.ts`, the sign-up is an email link to the site address with the subject "Subscribe to Bolivia Unpacked". Set `action` (and `emailField`) to a provider's form endpoint to switch to a real form, and update the Privacy Policy with the provider's name.

## Deploy

`vercel.json` sets the build, clean URLs, trailing slashes, cache headers and 301 redirects from the old reference-site URLs. Pushing to `main` deploys production. Analytics: Vercel Web Analytics only (cookieless).
