import { z, defineCollection } from 'astro:content';

const workCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    coverImage: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    link: z.string().optional(),
    externalLink: z.string().optional(),
  })
});

const pagesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    displayTitle: z.string().optional(),
    contactTitle: z.string().optional(),
    meta_description: z.string().optional(),
  })
});

export const collections = {
  'work': workCollection,
  'pages': pagesCollection,
};
