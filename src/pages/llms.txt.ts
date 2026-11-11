import type { APIRoute } from 'astro';
import { allRoutes } from '../lib/routes';
import { abs } from '../lib/seo';
import { site, disclosure } from '../site.config';

export const GET: APIRoute = async () => {
  const routes = await allRoutes();
  const groups = ['Posts', 'Destinations', 'Categories', 'About'];
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.positioning}`,
    '',
    `${site.name} (${site.domain}) is a travel blog published by Tourground. Posts are written by the Bolivia Unpacked desk from official and reputable sources, listed at the end of each post. Health, entry and safety facts link to the official source and show the date last checked. We do not publish invented reviews, quotes, prices or statistics. Each post ends with a "Plan this trip" box pointing to a verified operator in the Tourground directory; the founder-owned brand Altiplano Journeys is labelled "${disclosure.founderOwnedLabel}". Paid placements are labelled "${disclosure.paidLabel}".`,
    '',
    ...groups.flatMap((g) => [
      `## ${g}`,
      '',
      ...routes.filter((r) => r.group === g).map((r) => `- [${r.title}](${abs(r.path)})${r.description ? `: ${r.description}` : ''}`),
      '',
    ]),
    `RSS: ${abs('/rss.xml')}`,
    `Contact: ${site.email}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
