import fs from 'fs';

const buttonsConfig = `buttons: ['bold', 'italic', 'underline', '|', 'ul', 'ol', '|', 'font', 'fontsize', 'brush', 'paragraph', '|', 'image', 'link', '|', 'align', 'undo', 'redo', 'fullsize']`;

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // The current config looks like: config={{ theme: 'dark', minHeight: 200, style: { background: 'var(--admin-input-bg)', color: 'var(--admin-text)' } }}
  // We need to inject the buttons array into it.
  
  content = content.replace(/config=\{\{\s*theme:\s*'dark',\s*minHeight:\s*200,/g, `config={{ theme: 'dark', minHeight: 300, ${buttonsConfig},`);
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated toolbar config in ${filePath}`);
}

fixFile('src/components/admin/EditProject.jsx');
fixFile('src/components/admin/NewProject.jsx');
