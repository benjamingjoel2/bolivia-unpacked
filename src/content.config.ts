import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const source = z.object({ url: z.string().url(), label: z.string().min(1), accessed: z.union([z.string(), z.date()]).transform((v) => (typeof v === 'string' ? v : v.toISOString().slice(0, 10))).optional() });

const base = {
  title: z.string().min(1),
  description: z.string().min(20).max(200),
  sources: z.array(source),
  published: z.coerce.date(),
  reviewed: z.coerce.date(),
  status: z.enum(['draft', 'reviewed']),
};

const guide = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/guide' }),
  schema: z.object({
    ...base,
    section: z.enum(['regions', 'planning']),
    order: z.number().int(),
    /** Optional representative elevation in metres, marked on the altitude rail. */
    elevation_m: z.number().int().optional(),
    elevation_label: z.string().optional(),
  }),
});

const qa = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/qa' }),
  schema: z.object({
    ...base,
    question: z.string().min(5),
    /** The short answer, shown first and used in FAQPage JSON-LD. Plain text. */
    short_answer: z.string().min(20),
    order: z.number().int(),
  }),
});

export const collections = { guide, qa };
