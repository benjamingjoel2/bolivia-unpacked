import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const isoDate = z.union([z.string(), z.date()]).transform((v) => (typeof v === 'string' ? v : v.toISOString().slice(0, 10)));
const source = z.object({ url: z.string().url(), label: z.string().min(1), accessed: isoDate.optional() });

const CATEGORIES = ['destinations', 'itineraries', 'altitude-health', 'adventure', 'food-culture', 'travel-tips'] as const;
const DESTINATIONS = ['la-paz', 'uyuni', 'titicaca', 'sucre-potosi', 'amazon', 'yungas'] as const;

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string().min(1).max(110),
    description: z.string().min(80).max(220),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    author: z.string().default('desk'),
    categories: z.array(z.enum(CATEGORIES)).min(1),
    destinations: z.array(z.enum(DESTINATIONS)).default([]),
    hero: z.string(),
    heroAlt: z.string().optional(),
    featured: z.boolean().default(false),
    startHere: z.boolean().default(false),
    operator: z.string().nullable().optional(),
    planNote: z.string().optional(),
    /** Date the health, entry or safety facts were last checked against the official sources. */
    factsChecked: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    sources: z.array(source).min(1),
  }),
});

export const collections = { posts };
