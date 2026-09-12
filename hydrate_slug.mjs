import fs from 'fs';

let content = fs.readFileSync('src/pages/work/[slug].astro', 'utf-8');

// Add IDs to elements
content = content.replace(/<h1 class="title-giant".*?>\{title\}<\/h1>/, '<h1 id="live-title" class="title-giant" style="font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 700; margin-bottom: 0.5rem;">{title}</h1>');
content = content.replace(/\{category && <p style=".*?">\{category\}<\/p>\}/, '{category && <p id="live-category" style="text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; color: var(--text-muted); margin-bottom: 2rem;">{category}</p>}');
content = content.replace(/<div class="project-description".*?set:html=\{description\} \/>/, '<div id="live-description" class="project-description" style="font-size: 1.125rem; color: var(--navy); line-height: 1.8; margin-bottom: 2.5rem; text-align: left;" set:html={description} />');
content = content.replace(/<a href=\{link\} target="_blank" class="btn btn-gold".*?>GO TO WEBSITE<\/a>/, '<a id="live-link" href={link} target="_blank" class="btn btn-gold" style="font-size: 0.9rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 1rem 3rem;">GO TO WEBSITE</a>');
content = content.replace(/<img src=\{image_url\} alt=\{`\$\{title\} Cover`\}.*?\/>/, '<img id="live-image" src={image_url} alt={`${title} Cover`} style="width: 100%; height: auto; border-radius: 4px; box-shadow: 0 4px 20px rgba(0,0,0,0.05);" />');

// Inject the live script
if (!content.includes('id="live-hydration"')) {
  const script = `
  <script is:inline define:vars={{ projectId: project.id }} id="live-hydration">
    const supabaseUrl = 'https://ozzkgwkhiwwgiiuzpudq.supabase.co';
    const supabaseKey = 'sb_publishable_c4WNjTKmupP-TM5304GriQ_YM9uXv8_';
    
    fetch(\`\${supabaseUrl}/rest/v1/portfolio_work?id=eq.\${projectId}&select=title,category,description,image_url,link\`, {
      headers: { 'apikey': supabaseKey, 'Authorization': \`Bearer \${supabaseKey}\` }
    })
    .then(res => res.json())
    .then(data => {
      if(data && data[0]) {
        const live = data[0];
        const elTitle = document.getElementById('live-title');
        const elCategory = document.getElementById('live-category');
        const elDesc = document.getElementById('live-description');
        const elLink = document.getElementById('live-link');
        const elImage = document.getElementById('live-image');
        
        if(elTitle && live.title) elTitle.innerText = live.title;
        if(elCategory && live.category) elCategory.innerText = live.category;
        if(elDesc && live.description) elDesc.innerHTML = live.description;
        if(elImage && live.image_url) elImage.src = live.image_url;
        if(elLink && live.link) elLink.href = live.link;
      }
    })
    .catch(err => console.error("Live fetch error", err));
  </script>
</Layout>`;
  content = content.replace(/<\/Layout>/, script);
}

fs.writeFileSync('src/pages/work/[slug].astro', content);
console.log("Hydrated slug page");
