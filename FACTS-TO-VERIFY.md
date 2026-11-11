# Facts to verify

Every launch post was written on 2026-11-11 from the sources it lists. Health, entry and safety facts were read on the official pages that day (the FCDO pages, NHS, CDC and TravelHealthPro were readable). Some official sites refused automated fetches that day (US State Department 403, Britannica 403, UNESCO 403, migracion.gob.bo 503, miteleferico.bo rendered empty), so a few facts were confirmed only from search excerpts of those official pages or from secondary sources. An editor should open these and confirm, then update the post's `updated` (and `factsChecked`) date.

## Owner / founders

| Item | Where | Status |
| --- | --- | --- |
| Business address of the publishing desk | `publisher.address` in `src/site.config.ts` | **Placeholder** (not shown on the site) |
| Main-site correction flow URL | `publisher.correctionUrl` | **Placeholder** |
| Bolivia-filtered Tourground directory URL for "browse verified operators" | `publisher.directoryUrl` (currently https://tourground.com/) | **Placeholder** |
| Newsletter provider (form endpoint) | `newsletter.action` | **Not connected**: sign-up is an email link until set |
| Legal sign-off: US, UK, EU, Brazil (Privacy now covers newsletter consent) | `legal.signOff` | **Pending** |
| Altiplano Journeys feed record (mock values) | `data/feed.mock.json` | **Replace with the real directory export** |
| Real author bylines (only if a named writer with real trips joins) | `src/data/authors.ts` | Desk byline only |

## Entry rules (change often)

| Fact | Posts | Status |
| --- | --- | --- |
| US citizens: tourist visa requirement dropped from 1 Dec 2025, stays up to 90 days | first-timer, Bolivia+Peru | **Secondary (AP report).** Confirm on travel.state.gov and migracion.gob.bo |
| UK: 90 days in a year; 30-day stamps common; fine on exit if no entry stamp | first-timer, Bolivia+Peru | Read on FCDO 2026-11-11 |
| Peru entry rules | Bolivia+Peru | Read via gob.pe/migraciones search excerpts; confirm directly |
| Machu Picchu ticket rules for 2026 (named tickets, no date changes, direct or registered-agency sales) | Bolivia+Peru | **Press reports quoting the ministry**; confirm on tuboleto.cultura.pe |

## Health

| Fact | Posts | Status |
| --- | --- | --- |
| Yellow fever **certificate on arrival**: CDC says required for all travellers aged 1+, FCDO/TravelHealthPro say only if arriving from a risk country | first-timer, Amazon, 14-day | **Sources conflict**: posts present both and tell readers to check |
| Yellow fever vaccine recommended below 2,300 m east of the Andes, incl. all of Beni | Amazon, first-timer | CDC + TravelHealthPro, 2026-11-11 |
| Malaria below 2,500 m; tablets vs bite avoidance (CDC and TravelHealthPro differ) | Amazon | Posts defer to a travel clinic |
| Altitude: NHS 1,200 m→3,500 m in a day rule; rest day every 3–4 days above 3,000 m; CDC Yellow Book chapter now at `.../high-altitude-travel-and-altitude-illness.html` | altitude, 14-day | 2026-11-11 |
| Coca tea: TravelHealthPro says evidence inconclusive; NHS and CDC do not list it | altitude | 2026-11-11 |

## Safety

| Fact | Posts | Status |
| --- | --- | --- |
| FCDO: no official minimum standards for tour operators; accidents on main tourist routes; fuel shortages; rainy season Nov–Mar; State of Emergency update 22 Sep 2026 | several | Read 2026-11-11; re-check before each update |
| Potosí mine tours: FCDO does not mention them; Canada's advice does | Sucre & Potosí | Canada page updated 14 Oct 2026 |
| Isla del Sol north access (2017 dispute; later reports suggest reopened) | Titicaca | **Unconfirmed**: post says check current access |
| 16 de Julio market days (Thursday, Sunday); May 2026 blockades | cable cars | Secondary (Global Voices, Los Tiempos 8 Jun 2026) |

## Places and numbers (Wikipedia used as last resort; confirm from a primary source)

| Fact | Posts |
| --- | --- |
| Heights: Salar ~3,656 m; Laguna Colorada ~4,278 m; Sol de Mañana ~4,900 m; Laguna Verde ~4,310 m; El Alto airport ~4,060 m; Sucre ~2,790 m; La Paz centre ~3,600 m | Uyuni, altitude, 14-day |
| Potosí height: sources give ~4,050 m (Britannica), ~4,067 m (Wikipedia), ~4,090 m (Canada) | Sucre & Potosí, 14-day |
| Sucre founding: 1538 (UNESCO) vs 1539 (Britannica); post says "late 1530s" | Sucre & Potosí |
| Mita: ~13,500 Indigenous people forced into the mines by the 17th century (UNESCO, via search excerpt) | Sucre & Potosí |
| Mi Teleférico: 10 lines, ~33 km, first line May 2014, Silver Line March 2019 (industry report); line colours from the official site's page code | cable cars |
| Rurrenabaque: ~410 km by road from La Paz; Madidi created 1995, ~19,000 km²; Pampas del Yacuma municipal area created 2007 (WCS Bolivia) | Amazon |
| Eduardo Avaroa reserve charges an entry fee (no amount published) | Uyuni 3-day |
| Uyuni climate figures (night lows, day highs) | wet or dry |
| Rainbow trout on lakeside menus (introduced species is sourced; menus are general description) | Titicaca |
