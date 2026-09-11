import fs from 'fs';

let content = fs.readFileSync('src/pages/about.astro', 'utf-8');

// Replace the top section containing the stroked "about"
const headerRegex = /<div class="container section text-center" style="padding-top: 6rem; padding-bottom: 2rem;">[\s\S]*?<\/svg>\n    <\/div>\n  <\/div>/;

const newHero = `  <section class="about-hero" style="position: relative; padding: 8rem 0; margin-bottom: 4rem; background-image: url('/assets/images/portfolio-header-bg.webp'); background-size: cover; background-position: center top;">
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); z-index: 1;"></div>
    <div class="container" style="position: relative; z-index: 2; text-align: center;">
      <h1 class="title-giant text-white" style="margin-bottom: 1rem;">About</h1>
      <p class="subtitle text-white" style="margin: 0 auto; opacity: 0.9;">A little bit about who I am and what I do.</p>
    </div>
  </section>`;

if (content.match(headerRegex)) {
  content = content.replace(headerRegex, newHero);
} else {
  console.log("Could not find the header to replace.");
}

// Center the content text
content = content.replace('<div class="container" style="max-width: 800px; margin: 0 auto; font-size: 1.125rem; color: var(--navy); line-height: 1.8;">', '<div class="container" style="max-width: 800px; margin: 0 auto; font-size: 1.125rem; color: var(--navy); line-height: 1.8; text-align: center;">');

// Remove list bullet styling since it's centered
content = content.replace('<ul style="margin-bottom: 2.5rem; padding-left: 1.5rem; list-style-type: disc;">', '<ul style="margin-bottom: 2.5rem; padding-left: 0; list-style-type: none;">');

// Center the MDX rendered content
content = content.replace('<div style="margin-bottom: 5rem;">', '<div style="margin-bottom: 5rem; text-align: center;">');

fs.writeFileSync('src/pages/about.astro', content);
console.log("Updated about.astro");
