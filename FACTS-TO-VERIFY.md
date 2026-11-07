# Facts to verify

Every fact below appears on the site and must be checked by an editor against the source given, then the check date filled in. "Checked" means the build author (2026-11-07) opened the source that day; "Not checked" means it is from general knowledge or a secondary source and needs a primary check. Initial guide and Q&A pages were marked `status: reviewed` so the site has content; an editor must confirm them.

## Business and config (owner / founders)

| Fact | Where | Source | Status |
| --- | --- | --- | --- |
| Publishing desk business address: the most premium coworking space in Bolivia where the desk sits. Currently a placeholder; the site shows only "La Paz, Bolivia (street address pending confirmation)". | `src/site.config.ts` → `publisher.address` | Founders | **Placeholder** |
| Main-site correction/removal flow URL | `publisher.correctionUrl` | Tourground main site | **Placeholder** |
| Legal entity name of the controller ("Tourground") and its country of establishment | Privacy, Terms | Founders / lawyer | Not checked |
| Legal sign-off: US, UK, EU, Brazil | `legal.signOff` | Lawyers | **Pending** (all false) |
| Email retention period "up to two years" (policy choice) | Privacy | Lawyer | Proposed |
| Vercel Web Analytics: cookieless, daily-discarded visitor hash, data collected | Privacy, Cookies | https://vercel.com/docs/analytics/privacy-policy | Not checked |
| Vercel's transfer mechanism (EU–US Data Privacy Framework / SCCs) | Privacy | Vercel DPA | Not checked |

## Company data (mock feed)

| Fact | Source | Status |
| --- | --- | --- |
| Altiplano Journeys: kind `dmc`, based in BO, delivers in BO, sells from BO, niches (salt flats, culture, overland), rank.BO = 1, tier `founder`, summary wording | Tourground directory export | **Mock values: replace from the real export** |
| Altiplano Journeys profile URL https://altiplanojourneys.tourground.com | Tourground | Not checked |

## Entry rules and visas (change often)

| Fact | Source | Status |
| --- | --- | --- |
| UK citizens: visa-free up to 90 days in a year; 30-day stamps common | https://www.gov.uk/foreign-travel-advice/bolivia/entry-requirements | Checked 2026-11-07 |
| Passport valid 6 months from arrival, 2 blank pages; proof of accommodation may be requested; entry stamp needed | same | Checked 2026-11-07 |
| US citizens: tourist visa requirement dropped from 1 December 2025, stays up to 90 days | News reports (AP via KSAT, 2025-12-01: https://www.ksat.com/news/world/2025/12/01/bolivia-eases-visa-requirements-for-us-and-israeli-travelers/); confirm on https://travel.state.gov and https://www.migracion.gob.bo | **Secondary sources only** |
| Rules for other nationalities | https://www.migracion.gob.bo | Not checked (site says "check") |

## Health

| Fact | Source | Status |
| --- | --- | --- |
| Yellow fever vaccine recommended ≥9 months for areas <2,300 m east of the Andes: all Beni, Pando, Santa Cruz; parts of Chuquisaca, Cochabamba, La Paz, Tarija; not for La Paz/Sucre-only travel | https://wwwnc.cdc.gov/travel/destinations/traveler/none/bolivia | Checked 2026-11-07 |
| Yellow fever **certificate on arrival**: CDC page appeared to say "required for all arriving travellers ≥1 year"; UK says required if arriving from a risk country. Site says "may be required depending on where you arrive from; check both". | CDC page above; FCDO entry requirements | **Conflicting: resolve** (draft Q&A on Rurrenabaque is held back until this is resolved) |
| Malaria transmission <2,500 m; none in La Paz city | CDC page above | Checked 2026-11-07 |
| Altitude rule: above 3,000 m, ≤500 m/day sleeping gain, rest day every 3–4 days | CDC Yellow Book high-elevation chapter; WMS 2024 guidelines (https://journals.sagepub.com/doi/10.1177/10806032241227924) | Not checked (confirm URL and wording) |
| Acetazolamide is prescription-only and can help prevent AMS | https://www.nhs.uk/conditions/altitude-sickness/ | Not checked |
| "NHS and CDC do not list coca tea as a proven prevention" | NHS, CDC pages | Not checked |
| AMS symptoms; HACE/HAPE warning signs | NHS, CDC | Not checked |

## Altitude figures (all approximate; from Wikipedia unless noted, which is a starting reference only)

| Place | Figure on site | Status |
| --- | --- | --- |
| Nevado Sajama | 6,542 m | Wikipedia infobox, 2026-11-07 |
| Illimani | 6,438 m | Wikipedia infobox, 2026-11-07 |
| Huayna Potosí | 6,088 m | Not checked |
| Chacaltaya | 5,395 m | Wikipedia infobox (cites IGM), 2026-11-07 |
| Sol de Mañana | ~4,850 m (4,800–5,000 m) | Not checked |
| La Cumbre (Yungas road top) | ~4,650 m | Not checked |
| Laguna Verde | ~4,300 m | Not checked |
| Laguna Colorada | 4,278 m | Not checked |
| Potosí | 4,090 m | Not checked |
| El Alto International Airport | 4,061 m | Wikipedia infobox (4,061.5 m), 2026-11-07 |
| Tiwanaku | ~3,850 m | Not checked |
| Copacabana | 3,841 m | Wikipedia infobox, 2026-11-07 |
| Lake Titicaca surface | ~3,812 m | Not checked (Britannica) |
| Oruro | 3,709 m | Not checked |
| Uyuni town | ~3,700 m | Not checked |
| Salar de Uyuni | 3,656 m | Not checked |
| La Paz centre | ~3,640 m; range ~3,200 to >4,000 m | Not checked |
| Cusco (Peru) | ~3,400 m | Not checked |
| San Pedro de Atacama (Chile) | ~2,400 m | Not checked |
| Tupiza | ~2,950 m | Not checked |
| Sucre | 2,790 m | Wikipedia infobox, 2026-11-07 |
| Cochabamba | ~2,558 m | Not checked |
| Samaipata | ~1,650 m | Not checked |
| Coroico | 1,525 m | Wikipedia infobox, 2026-11-07 |
| Santa Cruz de la Sierra | ~400 m | Wikipedia infobox, 2026-11-07 |
| Rurrenabaque | ~230 m | Not checked |
| Lodges in Sur Lípez "around 4,200 m or higher" | | Not checked |

## Salt flats and seasons

| Fact | Source | Status |
| --- | --- | --- |
| Salar de Uyuni is the world's largest salt flat | Britannica | Not checked |
| Dry season ~May–Oct, wet ~Dec–Mar; coldest Jun–Aug | SENAMHI, Britannica climate | Not checked |
| Mirror most likely Jan–Mar, possible late Dec and early Apr | Wikipedia, operators | Not checked (no primary source; consider asking SENAMHI data or operator records) |
| Wet-season water can block Isla Incahuasi and the southern route | Operators / Wikipedia | Not checked |
| Snow can close Lípez passes briefly in winter; strong winds in August | | Not checked |
| UK FCDO advice warns about accidents on salar tours | https://www.gov.uk/foreign-travel-advice/bolivia/safety-and-security | Not checked (confirm wording still present) |
| Eduardo Avaroa reserve covers much of the Lípez route | SERNAP | Not checked |
| Hito Cajón border post for San Pedro | | Not checked |

## Transport and flight routes

| Fact | Source | Status |
| --- | --- | --- |
| BoA flies between La Paz, Santa Cruz, Cochabamba, Sucre, Tarija, Uyuni | https://www.boa.bo | **Not checked: confirm current route map** |
| Short flights La Paz–Rurrenabaque exist (operator not named) | Airlines | Not checked |
| Ferroviaria Andina passenger trains Oruro–Uyuni–Tupiza–Villazón, a few days a week | https://www.fca.com.bo (confirm official domain: a booking site lists ferroviaria-andina.com.bo) | **Not checked; July 2026 press reported rail theft between Poopó and Machacamarca (La Razón)** |
| Mi Teleférico links El Alto, centre and southern districts | https://www.miteleferico.bo | Not checked |
| Kasani–Yunguyo and Desaguadero crossings to Peru; Strait of Tiquina barge crossing | | Not checked |
| Viru Viru International Airport, Santa Cruz, is a second international gateway | | Not checked |

## Regions, heritage and history

| Fact | Source | Status |
| --- | --- | --- |
| La Paz seat of government; Sucre constitutional capital and seat of judiciary | Britannica | Not checked |
| UNESCO listings: Potosí (420), Sucre (566), Jesuit Missions of the Chiquitos (529), Tiwanaku (567), Fuerte de Samaipata (883) | whc.unesco.org | Not checked |
| Mission towns: San Javier, Concepción, San Miguel, San Rafael, Santa Ana, San José de Chiquitos | UNESCO 529 | Not checked |
| Potosí one of the largest cities in the Americas in the colonial period | Wikipedia/UNESCO | Not checked |
| Casa Nacional de la Moneda (Potosí); Casa de la Libertad (Sucre); Cal Orck'o tracks; Tarabuco textiles | | Not checked |
| Isla del Sol access restricted at times by local disputes | | Not checked: check current status |
| Treks: Choro, Takesi, Yunga Cruz; Condoriri; Illampu–Ancohuma near Sorata | | Not checked |
| Yungas old road now used mainly by bike tours; new road carries most traffic | | Not checked |
| Madidi lodges, some community-run; pampas on the Yacuma river area | SERNAP | Not checked |
