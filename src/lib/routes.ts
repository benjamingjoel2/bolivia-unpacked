import { allPosts, postPath, iso } from './posts';
import { categories, categoryPath, destinations, destinationPath } from '../data/taxonomy';
import { site } from '../site.config';

export interface Route { path: string; title: string; description?: string; lastmod: string; group: string }

const UPDATED = '2026-11-11';

export async function allRoutes(): Promise<Route[]> {
  const posts = await allPosts();
  const newest = posts.length ? iso(posts.map((p) => p.data.updated).sort((a, b) => b.getTime() - a.getTime())[0]) : UPDATED;
  return [
    { path: '/', title: site.name, description: site.positioning, lastmod: newest, group: 'Home' },
    { path: '/blog/', title: 'All posts', lastmod: newest, group: 'Home' },
    ...posts.map((p) => ({ path: postPath(p), title: p.data.title, description: p.data.description, lastmod: iso(p.data.updated), group: 'Posts' })),
    ...categories.map((c) => ({ path: categoryPath(c.slug), title: c.name, description: c.description, lastmod: newest, group: 'Categories' })),
    ...destinations.map((d) => ({ path: destinationPath(d.slug), title: d.name, description: d.description, lastmod: newest, group: 'Destinations' })),
    ...[
      ['/about/', 'About Bolivia Unpacked'], ['/authors/', 'Authors'], ['/disclosure/', 'Disclosure'], ['/corrections/', 'Corrections'],
      ['/photo-credits/', 'Photo credits'], ['/privacy/', 'Privacy Policy'], ['/cookies/', 'Cookie Policy'], ['/terms/', 'Terms of use'],
    ].map(([path, title]) => ({ path, title, lastmod: UPDATED, group: 'About' })),
  ];
}
