import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export async function allPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', (p) => !p.data.draft);
  return posts.sort((a, b) => b.data.published.getTime() - a.data.published.getTime() || a.data.title.localeCompare(b.data.title));
}

export const postPath = (p: Post) => `/blog/${p.id}/`;

export function readingMinutes(p: Post): number {
  const words = (p.body ?? '').replace(/[#>*_`\[\]()-]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 230));
}

export function wordCount(p: Post): number {
  return (p.body ?? '').split(/\s+/).filter(Boolean).length;
}

/** Related posts: shared destinations count double, shared categories once; ties go to the newest. */
export function relatedPosts(p: Post, all: Post[], n = 3): Post[] {
  return all
    .filter((o) => o.id !== p.id)
    .map((o) => ({
      o,
      score:
        2 * o.data.destinations.filter((d) => p.data.destinations.includes(d)).length +
        o.data.categories.filter((c) => p.data.categories.includes(c)).length,
    }))
    .sort((a, b) => b.score - a.score || b.o.data.published.getTime() - a.o.data.published.getTime())
    .slice(0, n)
    .map((x) => x.o);
}

export const iso = (d: Date | string) => (typeof d === 'string' ? d : d.toISOString().slice(0, 10));

export function humanDate(d: Date | string): string {
  const dt = typeof d === 'string' ? new Date(d + 'T00:00:00Z') : d;
  return dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
