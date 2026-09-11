import fs from 'fs';

function replaceInFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Add imports if not present
  if (!content.includes("import ReactQuill")) {
    content = content.replace("import React, { useState, useEffect, useRef } from 'react';", "import React, { useState, useEffect, useRef } from 'react';\nimport ReactQuill from 'react-quill';\nimport 'react-quill/dist/quill.snow.css';");
    content = content.replace("import React, { useState, useRef } from 'react';", "import React, { useState, useRef } from 'react';\nimport ReactQuill from 'react-quill';\nimport 'react-quill/dist/quill.snow.css';");
  }

  // Replace textarea
  const textareaRegex = /<textarea[^>]*value=\{formData\.description\}[^>]*><\/textarea>/g;
  if (content.match(textareaRegex)) {
    content = content.replace(textareaRegex, `<ReactQuill theme="snow" value={formData.description} onChange={val => setFormData({...formData, description: val})} style={{ backgroundColor: 'var(--admin-input-bg)', color: 'var(--admin-text)', borderRadius: '4px' }} />`);
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
}

replaceInFile('src/components/admin/EditProject.jsx');
replaceInFile('src/components/admin/NewProject.jsx');

// Now update [slug].astro to render HTML
const astroPath = 'src/pages/work/[slug].astro';
if (fs.existsSync(astroPath)) {
  let astroContent = fs.readFileSync(astroPath, 'utf-8');
  astroContent = astroContent.replace(
    /<p style="font-size: 1\.125rem; color: var\(--navy\); line-height: 1\.8; margin-bottom: 2\.5rem; text-align: left;">\{description\}<\/p>/g,
    '<div class="project-description" style="font-size: 1.125rem; color: var(--navy); line-height: 1.8; margin-bottom: 2.5rem; text-align: left;" set:html={description} />'
  );
  fs.writeFileSync(astroPath, astroContent);
  console.log(`Updated ${astroPath}`);
}
