import fs from 'fs';

let content = fs.readFileSync('src/pages/about-me.astro', 'utf8');

content = content.replace(
  /const { title, contactLinks, meta_description, blocks = \[\], body = '' } = pageData;/,
  `const { title, displayTitle = 'about', contactTitle = 'Contact Carlos Ozuna', contactLinks = [], meta_description, blocks = [], body = '' } = pageData;`
);

content = content.replace(
  /<h1 class="page-title text-center text-huge stroke-text">about<\/h1>/,
  `<h1 class="page-title text-center text-huge stroke-text">{displayTitle}</h1>`
);

content = content.replace(
  /<h2 class="section-title">Contact Carlos Ozuna<\/h2>/,
  `<h2 class="section-title">{contactTitle}</h2>`
);

fs.writeFileSync('src/pages/about-me.astro', content);
