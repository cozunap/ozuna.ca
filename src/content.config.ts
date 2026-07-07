import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const workCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    category: z.enum(['web', 'graphic']),
    image: z.string(),
    description: z.string().optional(),
    link: z.string().optional(),
    gallery: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'work': workCollection,
};
