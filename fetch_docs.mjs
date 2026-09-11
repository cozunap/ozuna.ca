import fs from 'fs';
import https from 'https';
https.get('https://raw.githubusercontent.com/withastro/docs/main/src/content/docs/en/guides/integrations-guide/cloudflare.mdx', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('cloudflare_docs.md', data);
    console.log("Downloaded docs");
  });
});
