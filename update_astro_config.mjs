import fs from 'fs';

let config = `import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'hybrid',
  adapter: cloudflare(),
  integrations: [react()]
});
`;

fs.writeFileSync('astro.config.mjs', config);
console.log("Updated astro.config.mjs");
