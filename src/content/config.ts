import { defineCollection } from 'astro:content';

const workCollection = defineCollection({
  type: 'content'
});

const pagesCollection = defineCollection({
  type: 'content'
});

const customPagesCollection = defineCollection({
  type: 'content'
});

export const collections = {
  'work': workCollection,
  'pages': pagesCollection,
  'custom-pages': customPagesCollection
};
