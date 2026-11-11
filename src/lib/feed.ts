/**
 * Feed loader: the ONLY way company data enters the site.
 * Company facts come only from the Tourground directory export. Never hand-edit them here.
 *
 * Source file: data/feed.json (real export, written by `npm run feed:refresh`)
 * Fallback:    data/feed.mock.json (until the real feed exists)
 */
import fs from 'node:fs';
import path from 'node:path';
import { site } from '../site.config';

export type Tier = 'verified' | 'black' | 'platinum' | 'founder';

export interface Source { url: string; label: string }

export interface Company {
  id: string;
  name: string;
  kind: 'dmc' | 'agency';
  country_base: string;
  delivers_in: string[];
  sells_from: string[];
  niches: string[];
  tier: Tier;
  verified: boolean;
  founder_owned: boolean;
  rank: Record<string, number>;
  summary: string;
  website?: string | null;
  profile_url: string;
  sources: Source[];
  last_checked: string;
  memberships?: string[];
  specialties?: string[];
  listed_since?: string;
  removed?: boolean;
  example?: boolean;
}

export interface Destination { slug: string; name: string; type: string; content_dir: string }

export interface Feed {
  generated_at?: string;
  source?: string;
  destinations: Destination[];
  companies: Company[];
}

const root = process.cwd();
const realPath = path.join(root, 'data', 'feed.json');
const mockPath = path.join(root, 'data', 'feed.mock.json');

export const feedFile = fs.existsSync(realPath) ? realPath : mockPath;
export const usingMock = feedFile === mockPath;

const REQUIRED = ['id', 'name', 'kind', 'country_base', 'delivers_in', 'sells_from', 'niches', 'tier', 'verified', 'founder_owned', 'rank', 'summary', 'profile_url', 'sources', 'last_checked'] as const;

function validate(feed: Feed): void {
  if (!Array.isArray(feed.companies) || !Array.isArray(feed.destinations)) {
    throw new Error(`[feed] ${feedFile}: expected destinations[] and companies[]`);
  }
  const ids = new Set<string>();
  for (const c of feed.companies) {
    for (const k of REQUIRED) {
      if ((c as any)[k] === undefined) throw new Error(`[feed] company ${c.id ?? '?'} is missing required field "${k}"`);
    }
    if (!/^[a-z0-9-]+$/.test(c.id)) throw new Error(`[feed] company id "${c.id}" must be a lowercase slug`);
    if (ids.has(c.id)) throw new Error(`[feed] duplicate company id "${c.id}"`);
    ids.add(c.id);
  }
}

let cached: Feed | null = null;
export function loadFeed(): Feed {
  if (cached) return cached;
  const feed = JSON.parse(fs.readFileSync(feedFile, 'utf8')) as Feed;
  validate(feed);
  cached = feed;
  return feed;
}

const includeExamples = process.env.INCLUDE_EXAMPLES === '1';

/**
 * Publishing gate. A company is published only when:
 *  - the feed marks it verified: true OR founder_owned: true
 *  - it is not removed (absent from the feed, or removed: true, means no page in the next build)
 *  - it is not an example record (unless INCLUDE_EXAMPLES=1 for local template testing)
 */
export function isPublishable(c: Company): boolean {
  if (c.removed === true) return false;
  if (!(c.verified === true || c.founder_owned === true)) return false;
  if (c.example === true && !includeExamples) return false;
  return true;
}

export function publishedCompanies(): Company[] {
  return loadFeed().companies.filter(isPublishable);
}

export function rankOf(c: Company): number | null {
  const r = c.rank?.[site.countryCode];
  return typeof r === 'number' && Number.isFinite(r) ? r : null;
}

/** Ordered strictly by the feed's rank for this country. Unranked companies are not listed. */
export function rankedCompanies(): Company[] {
  return publishedCompanies()
    .filter((c) => rankOf(c) !== null && c.delivers_in.includes(site.countryCode))
    .sort((a, b) => (rankOf(a)! - rankOf(b)!));
}

/** A published operator by id, or null if the feed no longer publishes it (verified-only gate). */
export function getOperator(id: string | undefined | null): Company | null {
  if (!id) return null;
  return publishedCompanies().find((c) => c.id === id) ?? null;
}

/** Platinum companies may link to their own site (paid link, rel sponsored nofollow). Everyone else: Tourground profile only. */
export function outboundLink(c: Company): { href: string; rel?: string; label: string; paid: boolean } {
  if (c.tier === 'platinum' && c.website) {
    return { href: c.website, rel: 'sponsored nofollow', label: 'Company website', paid: true };
  }
  return { href: c.profile_url, label: 'Tourground profile', paid: false };
}

export function feedReviewedDate(): string {
  return loadFeed().generated_at ?? site.launchDate;
}

const countryNames: Record<string, string> = {
  BO: 'Bolivia', PE: 'Peru', CL: 'Chile', AR: 'Argentina', BR: 'Brazil', PY: 'Paraguay', EC: 'Ecuador', CO: 'Colombia',
  US: 'United States', GB: 'United Kingdom', DE: 'Germany', FR: 'France', ES: 'Spain', NL: 'Netherlands', CA: 'Canada', AU: 'Australia',
};
export function countryName(code: string): string {
  return countryNames[code] ?? code;
}

export const kindLabel = (k: string) => (k === 'dmc' ? 'Destination management company (DMC)' : k === 'agency' ? 'Travel agency' : k);
