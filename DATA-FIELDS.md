# Data fields assumed

The Tourground directory export does not exist yet. The site is built against `data/feed.mock.json`. Every field below is an **assumption** about the export. Confirm or correct each one when the real feed is defined. Fields marked *added* were not in the brief's shape and were assumed by this build.

## Top level

| Field | Type | Required | Used for |
| --- | --- | --- | --- |
| `destinations` | array | yes | Validated. Not yet used for routing (single-destination site). |
| `companies` | array | yes | All company pages, rankings, comparison table, counts. |
| `generated_at` *added* | ISO date | no | Shown as "Feed last updated" on ranking pages; `lastmod` in the sitemap. Falls back to `site.launchDate`. |
| `source`, `schema_version` *added* | string | no | Informational only. |

## `destinations[]`

| Field | Type | Notes |
| --- | --- | --- |
| `slug` | string | `bolivia` |
| `name` | string | |
| `type` | string | e.g. `country` |
| `content_dir` | string | Where guide content lives (`src/content`). |

## `companies[]`

| Field | Type | Required | Used for |
| --- | --- | --- | --- |
| `id` | lowercase slug | yes | URL `/companies/{id}/`. Must be unique and stable. |
| `name` | string | yes | Everywhere. |
| `kind` | `dmc` \| `agency` | yes | "What it is" on the fact page. |
| `country_base` | ISO 3166-1 alpha-2 | yes | "Based in"; the *Best local operators* list requires `BO`. JSON-LD `address.addressCountry`. |
| `delivers_in` | alpha-2[] | yes | "Delivers trips in". A company must include `BO` to be ranked on this site. JSON-LD `areaServed`. |
| `sells_from` | alpha-2[] | yes | "Sells from". |
| `niches` | string[] | yes | Ranked-list membership. Values expected: `salt-flats-lipez`, `trekking-climbing`, `amazon`, `culture-markets`, `family`, `overland-peru-chile` (see `src/data/niches.ts`). |
| `tier` | `verified` \| `black` \| `platinum` \| `founder` | yes | Tier label. Only `platinum` may link to its own `website` (rel="sponsored nofollow"). |
| `verified` | boolean | yes | Publishing gate (with `founder_owned`). |
| `founder_owned` | boolean | yes | Publishing gate; "Founder-owned (Tourground Geotrax)" label. |
| `rank` | `{ [alpha-2]: number }` | yes | Order of every list uses `rank.BO` ascending. Companies without `rank.BO` are published (fact page) but not ranked. |
| `summary` | string | yes | Fact page, list entries, JSON-LD `description`. |
| `website` | URL \| null | no | Linked only for `platinum`. |
| `profile_url` | URL | yes | Default outbound link for every company. |
| `sources` | `{url,label}[]` | yes | "Sources" on the fact page. |
| `last_checked` | ISO date | yes | "Last checked" date on the fact page. |
| `memberships` *added* | string[] | no | "Memberships" on the fact page; JSON-LD `memberOf`. The brief asks for memberships on company pages but the feed shape did not include them. |
| `specialties` *added* | string[] | no | Appended to "Specialties" (which otherwise shows the niche names). |
| `listed_since` *added* | ISO date | no | "Published" date on the fact page. Falls back to `site.launchDate`. |
| `removed` *added* | boolean | no | `true` unpublishes the company at the next build (as does deleting it from the feed). |
| `example` *added* | boolean | no | Marks fake test records. Never published unless `INCLUDE_EXAMPLES=1` (local testing only; pages are then `noindex` with a banner). |

## Publishing rule (src/lib/feed.ts → `isPublishable`)

Published when `(verified === true || founder_owned === true) && removed !== true && example !== true`.
