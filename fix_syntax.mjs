import fs from 'fs';

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  content = content.replace(/<JoditEditor[^>]*>.*?<\/div>/s, `<JoditEditor value={formData.description} config={{ theme: 'dark', minHeight: 200, style: { background: 'var(--admin-input-bg)', color: 'var(--admin-text)' } }} onBlur={val => setFormData({...formData, description: val})} onChange={val => setFormData({...formData, description: val})} />\n          </div>`);
  fs.writeFileSync(filePath, content);
}

fixFile('src/components/admin/EditProject.jsx');
fixFile('src/components/admin/NewProject.jsx');
