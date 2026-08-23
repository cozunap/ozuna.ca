const fs = require('fs');
let config = fs.readFileSync('tina/config.ts', 'utf8');

const blocks = `
      {
        name: "custom_pages",
        label: "Custom Pages (Block Builder)",
        path: "src/content/custom-pages",
        ui: {
          router: ({ document }) => {
            return \`/p/\${document._sys.filename}\`;
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
`;

const splitBy = '    ],';
const parts = config.split(splitBy);
if (parts.length >= 2) {
  const targetIndex = parts.length - 2;
  parts[targetIndex] = parts[targetIndex] + blocks;
  config = parts.join(splitBy);
}

fs.writeFileSync('tina/config.ts', config);
