import { z, defineCollection } from 'astro:content';

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
  'pages': pagesCollection,
  'settings': settingsCollection,
};
