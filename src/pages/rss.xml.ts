import type { APIRoute } from 'astro';
import { allPosts, postPath } from '../lib/posts';
import { abs } from '../lib/seo';
import { site } from '../site.config';
import { categoryBySlug } from '../data/taxonomy';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  const posts = await allPosts();
  const items = posts.map((p) => `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${abs(postPath(p))}</link>
      <guid isPermaLink="true">${abs(postPath(p))}</guid>
      <description>${esc(p.data.description)}</description>
      <pubDate>${p.data.published.toUTCString()}</pubDate>
${p.data.categories.map((c) => `      <category>${esc(categoryBySlug(c)!.name)}</category>`).join('\n')}
      <dc:creator>The Bolivia Unpacked desk</dc:creator>
    </item>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(site.name)}</title>
    <link>${site.url}/</link>
    <atom:link href="${abs('/rss.xml')}" rel="self" type="application/rss+xml" />
    <description>${esc(site.positioning)}</description>
    <language>en-gb</language>
    <copyright>Published by Tourground</copyright>
${posts[0] ? `    <lastBuildDate>${posts[0].data.updated.toUTCString()}</lastBuildDate>\n` : ''}${items}
  </channel>
</rss>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
