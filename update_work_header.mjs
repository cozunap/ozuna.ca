import fs from 'fs';

const filePath = 'src/pages/work/index.astro';
let content = fs.readFileSync(filePath, 'utf-8');

const newHeader = `<section class="portfolio-hero" style="position: relative; padding: 8rem 0; margin-bottom: 4rem; background-image: url('/assets/images/portfolio-header-bg.jpg'); background-size: cover; background-position: center;">
    <!-- 90% black overlay -->
    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 1;"></div>
    
    <div class="container" style="position: relative; z-index: 2; text-align: center;">
      <h1 class="title-giant text-white" style="margin-bottom: 1rem;">Portfolio</h1>
      <p class="subtitle text-white" style="margin: 0 auto; opacity: 0.9;">A curated gallery of my latest graphic design, branding, and web development projects.</p>
    </div>
  </section>

  <section class="section" style="padding-top: 0;">
    <div class="container">`;

content = content.replace(/<section class="section" style="padding-top: 5rem;">\s*<div class="container text-center" style="margin-bottom: 4rem;">\s*<h1 class="title-giant">Portfolio<\/h1>\s*<p class="subtitle" style="margin: 0 auto;">A curated gallery of my latest graphic design, branding, and web development projects.<\/p>\s*<\/div>\s*<div class="container">/, newHeader);

fs.writeFileSync(filePath, content);
console.log("Updated work/index.astro");
