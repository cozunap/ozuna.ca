import fs from 'fs';

function updateEditor(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Replace imports
  content = content.replace("import ReactQuill from 'react-quill';", "import JoditEditor from 'jodit-react';");
  content = content.replace("import 'react-quill/dist/quill.snow.css';", "");

  // Replace component
  const quillRegex = /<ReactQuill[^>]*>/g;
  if (content.match(quillRegex)) {
    content = content.replace(quillRegex, `<JoditEditor value={formData.description} config={{ theme: 'dark', minHeight: 200, style: { background: 'var(--admin-input-bg)', color: 'var(--admin-text)' } }} onBlur={val => setFormData({...formData, description: val})} onChange={val => setFormData({...formData, description: val})} />`);
  }

  fs.writeFileSync(filePath, content);
  console.log(`Fixed ${filePath}`);
}

updateEditor('src/components/admin/EditProject.jsx');
updateEditor('src/components/admin/NewProject.jsx');
