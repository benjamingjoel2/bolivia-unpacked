import { guidePages, qaPages, iso } from './content';
import { publishedCompanies, companiesForList, rankedCompanies, feedReviewedDate } from './feed';
import { nicheLists } from '../data/niches';
import { site, legal } from '../site.config';
import altitude from '../data/altitude.json';
import salar from '../data/salar-months.json';

export interface RouteInfo { path: string; title: string; lastmod: string; group: string; indexable: boolean }

/** Every public page, with whether it should be indexed (thin, empty or example pages are not). */
export async function allRoutes(): Promise<RouteInfo[]> {
  const feedDate = feedReviewedDate();
  const r: RouteInfo[] = [
    { path: '/', title: `${site.name} home`, lastmod: site.launchDate, group: 'Start', indexable: true },
    { path: '/guide/', title: 'Bolivia destination guide', lastmod: site.launchDate, group: 'Guide', indexable: true },
    { path: '/altitude/', title: 'Bolivia altitude ladder', lastmod: altitude.reviewed, group: 'Guide', indexable: true },
    { path: '/salt-flats-by-month/', title: 'The salt flats, month by month', lastmod: salar.reviewed, group: 'Guide', indexable: true },
  ];
  for (const g of await guidePages()) r.push({ path: `/guide/${g.id}/`, title: g.data.title, lastmod: iso(g.data.reviewed), group: 'Guide', indexable: true });
  r.push({ path: '/questions/', title: 'Traveller questions about Bolivia', lastmod: site.launchDate, group: 'Questions', indexable: true });
  for (const q of await qaPages()) r.push({ path: `/questions/${q.id}/`, title: q.data.question, lastmod: iso(q.data.reviewed), group: 'Questions', indexable: true });
  r.push({ path: '/operators/', title: 'Verified operators in Bolivia, ranked', lastmod: feedDate, group: 'Operators', indexable: true });
  for (const l of nicheLists) r.push({ path: `/operators/${l.slug}/`, title: l.title, lastmod: feedDate, group: 'Operators', indexable: companiesForList(l).length > 0 });
  r.push({ path: '/compare/', title: 'Compare verified operators', lastmod: feedDate, group: 'Operators', indexable: rankedCompanies().length >= 2 });
  for (const c of publishedCompanies()) r.push({ path: `/companies/${c.id}/`, title: c.name, lastmod: c.last_checked, group: 'Companies', indexable: c.example !== true });
  for (const [path, title] of [
    ['/about/', 'About'], ['/how-we-rank/', 'How we rank'], ['/disclosure/', 'Publisher disclosure'], ['/corrections/', 'Corrections and removal'],
  ]) r.push({ path, title, lastmod: site.launchDate, group: 'About', indexable: true });
  for (const [path, title] of [['/privacy/', 'Privacy Policy'], ['/terms/', 'Terms'], ['/cookies/', 'Cookie Policy']]) {
    r.push({ path, title, lastmod: legal.policiesEffective, group: 'Legal', indexable: true });
  }
  return r;
}
