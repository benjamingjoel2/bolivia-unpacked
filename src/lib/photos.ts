import type { ImageMetadata } from 'astro';
import credits from '../data/photos.json';

export interface PhotoCredit {
  file: string; title: string; author: string; licence: string; licenceUrl: string; sourceUrl: string; alt: string; place?: string;
}
export interface Photo extends PhotoCredit { key: string; image: ImageMetadata }

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.{jpg,jpeg,JPG,png,webp}', { eager: true });
const byFile = new Map(Object.entries(files).map(([p, m]) => [p.split('/').pop()!, m.default]));

const table = credits as Record<string, PhotoCredit>;

/** Every photo used on the site must have a credit record and a file. Throws at build time otherwise. */
export function photo(key: string): Photo {
  const c = table[key];
  if (!c) throw new Error(`[photos] no credit record for "${key}" in src/data/photos.json`);
  const image = byFile.get(c.file);
  if (!image) throw new Error(`[photos] file src/assets/photos/${c.file} missing for "${key}"`);
  return { key, ...c, image };
}

export const hasPhoto = (key: string) => Boolean(table[key] && byFile.get(table[key].file));

export function allPhotos(): Photo[] {
  return Object.keys(table).filter(hasPhoto).map(photo);
}
