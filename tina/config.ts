import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "600328db-6ac1-42b6-adea-85d038fa5aa3",
  // Get this from tina.io
  token: process.env.TINA_TOKEN || "30d193184bef95f1ef83c4922bba00618b1a7afb",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "assets/uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "work",
        label: "Work",
        path: "src/content/work",
        ui: {
          router: ({ document }) => {
            return `/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "category",
            label: "Category",
            options: ["web", "graphic"],
          },
          {
            type: "image",
            name: "image",
            label: "Image",
          },
          {
            type: "string",
            name: "link",
            label: "Website Link",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "gallery",
            label: "Gallery",
            list: true,
          },
          {
            type: "string",
            name: "meta_description",
            label: "Meta Description",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
    
      {
        name: "custom-pages",
        label: "Custom Pages (Block Builder)",
        path: "src/content/custom-pages",
        ui: {
          router: ({ document }) => {
            return `/p/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "meta_description",
            label: "Meta Description",
          },
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Sections",
            templates: [
              {
                name: "hero",
                label: "Hero Block",
                fields: [
                  {
                    type: "string",
                    name: "headline",
                    label: "Headline",
                  },
                  {
                    type: "string",
                    name: "subheadline",
                    label: "Subheadline",
                  },
                  {
                    type: "image",
                    name: "background",
                    label: "Background Image",
                  },
                  {
                    type: "object",
                    name: "button",
                    label: "Button",
                    fields: [
                      { type: "string", name: "text", label: "Text" },
                      { type: "string", name: "link", label: "Link" }
                    ]
                  }
                ],
              },
              {
                name: "text",
                label: "Text Block",
                fields: [
                  {
                    type: "rich-text",
                    name: "content",
                    label: "Content",
                  }
                ],
              },
              {
                name: "gallery",
                label: "Gallery Block",
                fields: [
                  {
                    type: "image",
                    name: "images",
                    label: "Images",
                    list: true,
                  }
                ]
              },
              {
                name: "testimonial",
                label: "Testimonial",
                fields: [
                  {
                    type: "string",
                    name: "quote",
                    label: "Quote",
                    ui: { component: "textarea" }
                  },
                  {
                    type: "string",
                    name: "author",
                    label: "Author",
                  }
                ]
              }
            ],
          },
        ],
      },
    ],
      },
      {
        name: "pages",
        label: "Pages",
        path: "src/content/pages",
        match: {
          include: "home",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "meta_description",
            label: "Meta Description",
          },
          {
            type: "string",
            name: "heroTitle",
            label: "Hero Title HTML",
          },
          {
            type: "image",
            name: "backgroundVideo",
            label: "Background Video",
          },
          {
            type: "object",
            name: "buttons",
            label: "Buttons",
            list: true,
            fields: [
              {
                type: "string",
                name: "text",
                label: "Button Text",
              },
              {
                type: "string",
                name: "link",
                label: "Link/File",
              },
              {
                type: "boolean",
                name: "isExternal",
                label: "Open in new tab?",
              },
            ],
          },
        ],
      },
      {
        name: "about",
        label: "About Me",
        path: "src/content/pages",
        match: {
          include: "about",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/about-me",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "meta_description",
            label: "Meta Description",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "object",
            name: "contactLinks",
            label: "Contact Links",
            list: true,
            fields: [
              {
                type: "string",
                name: "text",
                label: "Link Text",
              },
              {
                type: "string",
                name: "link",
                label: "URL/File",
              },
              {
                type: "boolean",
                name: "isExternal",
                label: "Open in new tab?",
              },
            ],
          },
        ],
      },
      {
        name: "work_page",
        label: "Work Page",
        path: "src/content/pages",
        match: {
          include: "work",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/work",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "meta_description",
            label: "Meta Description",
          },
          {
            type: "string",
            name: "subtitle",
            label: "Subtitle",
          },
        ],
      },
      {
        name: "contact",
        label: "Contact Page",
        path: "src/content/pages",
        match: {
          include: "contact",
        },
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
          router: () => "/contact",
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "meta_description",
            label: "Meta Description",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "object",
            name: "actionButton",
            label: "Action Button",
            fields: [
              {
                type: "string",
                name: "text",
                label: "Button Text",
              },
              {
                type: "string",
                name: "link",
                label: "Email Address / Link",
              },
            ],
          },
        ],
      },
    ],
  },
});
