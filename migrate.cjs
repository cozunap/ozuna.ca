const fs = require('fs');
const path = require('path');

function migratePage(filePath, pageName) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Basic frontmatter extraction
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return;
  
  const frontmatterRaw = match[1];
  let bodyContent = match[2].trim();
  
  let newFrontmatter = `title: "${pageName}"\nblocks:\n`;
  
  if (filePath.includes('home.md')) {
    newFrontmatter = `title: "Carlos Ozuna | Senior Graphic Designer & Web Developer"
meta_description: "Welcome to Carlos Ozuna's portfolio"
blocks:
  - type: "hero"
    headline: "Welcome to<br><span>Carlos Ozuna's</span> portfolio"
    backgroundVideo: "/assets/videos/designer-working.mp4"
    buttons:
      - text: "Download CV"
        link: "/assets/docs/CV.pdf"
        isExternal: true
      - text: "go to portfolio"
        link: "/work"
        isExternal: false
`;
  } else if (filePath.includes('about.md')) {
    newFrontmatter = `title: "About | Carlos Ozuna"
blocks:
  - type: "text"
    content: >-
      ${bodyContent.replace(/\n/g, '\n      ')}
`;
  } else if (filePath.includes('contact.md')) {
    newFrontmatter = `title: "Contact | Carlos Ozuna"
blocks:
  - type: "text"
    content: >-
      ${bodyContent.replace(/\n/g, '\n      ')}
  - type: "hero"
    headline: "Contact Carlos Ozuna"
    button:
      text: "Email me"
      link: "mailto:ozunaprinting@gmail.com"
`;
  } else if (filePath.includes('work.md')) {
    newFrontmatter = `title: "Work | Carlos Ozuna"
blocks:
  - type: "hero"
    headline: "Selected Work"
`;
  }

  const finalContent = `---\n${newFrontmatter}---\n`;
  fs.writeFileSync(filePath, finalContent);
  console.log(`Migrated ${filePath}`);
}

migratePage('src/content/pages/home.md', 'Home');
migratePage('src/content/pages/about.md', 'About');
migratePage('src/content/pages/contact.md', 'Contact');
migratePage('src/content/pages/work.md', 'Work');

// Work items
const workDir = 'src/content/work';
if (fs.existsSync(workDir)) {
  const files = fs.readdirSync(workDir);
  for (const file of files) {
    if (file.endsWith('.md')) {
      const filePath = path.join(workDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
      if (!match) continue;
      
      const fm = match[1];
      const body = match[2].trim();
      
      const titleMatch = fm.match(/title:\s*"(.*?)"/);
      const title = titleMatch ? titleMatch[1] : file.replace('.md', '');
      
      const catMatch = fm.match(/category:\s*"(.*?)"/);
      const cat = catMatch ? catMatch[1] : 'web';
      
      const imgMatch = fm.match(/image:\s*"(.*?)"/);
      const img = imgMatch ? imgMatch[1] : '';

      const descMatch = fm.match(/description:\s*"(.*?)"/);
      const desc = descMatch ? descMatch[1] : '';
      
      let newFm = `title: "${title}"\ncategory: "${cat}"\nimage: "${img}"\nblocks:\n`;
      if (desc) {
         newFm += `  - type: "text"\n    content: "${desc}"\n`;
      }
      if (body) {
         newFm += `  - type: "text"\n    content: >-\n      ${body.replace(/\n/g, '\n      ')}\n`;
      }
      fs.writeFileSync(filePath, `---\n${newFm}---\n`);
      console.log(`Migrated ${filePath}`);
    }
  }
}

