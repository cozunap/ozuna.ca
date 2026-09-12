import fs from 'fs';

for (const file of ['src/components/admin/EditProject.jsx', 'src/components/admin/NewProject.jsx']) {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Remove the state update from onChange. We still need onChange for Jodit internal API sometimes, so just leave it empty or remove the prop.
  content = content.replace(/onChange=\{val => setFormData\(\{\.\.\.formData, description: val\}\)\}/g, 'onChange={newContent => {}}');
  
  fs.writeFileSync(file, content);
}
console.log("Fixed Jodit onChange bug.");
