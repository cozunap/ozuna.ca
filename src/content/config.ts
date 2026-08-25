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
    heroTitle: z.string().optional(),
    heroSubtitle: z.string().optional(),
    heroDescription: z.string().optional(),
    backgroundVideo: z.string().optional(),
    intro: z.string().optional(),
    cvFile: z.string().optional(),
    whatIBring: z.array(z.string()).optional(),
    title: z.string().optional(),
    displayTitle: z.string().optional(),
    contactTitle: z.string().optional(),
  })
});

const settingsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    siteTitle: z.string(),
    contactEmail: z.string(),
    phoneNumber: z.string(),
    footerText: z.string(),
  })
});

export const collections = {
  'work': workCollection,
  'pages': pagesCollection,
  'settings': settingsCollection,
};
