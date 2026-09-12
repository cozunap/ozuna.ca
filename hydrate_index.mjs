import fs from 'fs';

let content = fs.readFileSync('src/pages/work/index.astro', 'utf-8');

if (!content.includes('live-portfolio-hydration')) {
  const script = `
  <script is:inline id="live-portfolio-hydration">
    document.addEventListener('DOMContentLoaded', () => {
      const supabaseUrl = 'https://ozzkgwkhiwwgiiuzpudq.supabase.co';
      const supabaseKey = 'sb_publishable_c4WNjTKmupP-TM5304GriQ_YM9uXv8_';
      
      // Helper function for slugs
      const slugify = (text) => {
        if(!text) return '';
        return text.toString().toLowerCase().replace(/\\s+/g, '-').replace(/[^\\w\\-]+/g, '').replace(/\\-\\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
      };

      fetch(\`\${supabaseUrl}/rest/v1/portfolio_work?select=title,category,image_url&order=created_at.desc\`, {
        headers: { 'apikey': supabaseKey, 'Authorization': \`Bearer \${supabaseKey}\` }
      })
      .then(res => res.json())
      .then(data => {
        if(data && data.length > 0) {
          const grid = document.getElementById('portfolio-grid');
          if(!grid) return;
          
          let html = '';
          data.forEach(project => {
            html += \`
              <a href="/work/\${slugify(project.title)}" class="gallery-card" data-category="\${slugify(project.category)}">
                <div class="gallery-image-wrap">
                  <img src="\${project.image_url || '/assets/images/placeholder.jpg'}" alt="\${project.title}" class="gallery-image" loading="lazy" />
                </div>
                <h3>\${project.title}</h3>
                <p>\${project.category || 'Graphic Design'}</p>
              </a>
            \`;
          });
          
          grid.innerHTML = html;
          
          // trigger active filter
          const activeBtn = document.querySelector('.filter-btn.active');
          if (activeBtn) activeBtn.click();
        }
      })
      .catch(err => console.error("Live fetch error", err));
    });
  </script>
</Layout>`;
  content = content.replace(/<\/Layout>/, script);
}

fs.writeFileSync('src/pages/work/index.astro', content);
console.log("Hydrated portfolio index");
