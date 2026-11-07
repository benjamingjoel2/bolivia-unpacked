import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Publishing gate for markdown content:
 * only status: reviewed AND at least one source is ever published.
 */
function publishable<T extends { data: { status: string; sources: unknown[] } }>(e: T) {
  return e.data.status === 'reviewed' && e.data.sources.length > 0;
}

export async function guidePages(): Promise<CollectionEntry<'guide'>[]> {
  return (await getCollection('guide', publishable)).sort((a, b) => a.data.order - b.data.order);
}

export async function qaPages(): Promise<CollectionEntry<'qa'>[]> {
  return (await getCollection('qa', publishable)).sort((a, b) => a.data.order - b.data.order);
}

export const iso = (d: Date | string) => (typeof d === 'string' ? d : d.toISOString().slice(0, 10));

export function humanDate(d: Date | string): string {
  const dt = typeof d === 'string' ? new Date(d + 'T00:00:00Z') : d;
  return dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
