import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { AUTHORS, CATEGORIES } from './config';

const categorySlugs = CATEGORIES.map((c) => c.slug) as [string, ...string[]];
const authorSlugs = Object.keys(AUTHORS) as [string, ...string[]];

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(110),
      description: z.string().max(200),
      category: z.enum(categorySlugs),
      author: z.enum(authorSlugs).default('editorial-team'),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      location: z.string().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      // Optional: set when an article is sponsored or contains affiliate links,
      // so the required disclosure is shown (CAP Code / ASA guidance).
      sponsored: z.boolean().default(false),
    }),
});

export const collections = { articles };
