import type { APIRoute } from 'astro';
import { allRoutes } from '../lib/routes';
import { abs } from '../lib/seo';
import { site, disclosure } from '../site.config';
import { guidePages, qaPages } from '../lib/content';

export const GET: APIRoute = async () => {
  const routes = (await allRoutes()).filter((r) => r.indexable);
  const descs = new Map<string, string>();
  for (const g of await guidePages()) descs.set(`/guide/${g.id}/`, g.data.description);
  for (const q of await qaPages()) descs.set(`/questions/${q.id}/`, q.data.short_answer);
  const groups = [...new Set(routes.map((r) => r.group))];
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.positioning}`,
    '',
    `${site.name} is an independent reference site published by Tourground (${site.domain}). ${disclosure.rankingStatement} ${disclosure.verifiedOnlyStatement} Founder-owned brands are labelled "${disclosure.founderOwnedLabel}". Every factual page shows its sources, a published date and a last-reviewed date.`,
    '',
    ...groups.flatMap((g) => [
      `## ${g}`,
      '',
      ...routes.filter((r) => r.group === g).map((r) => `- [${r.title}](${abs(r.path)})${descs.has(r.path) ? `: ${descs.get(r.path)}` : ''}`),
      '',
    ]),
    `Contact: ${site.email}`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
