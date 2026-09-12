import fs from 'fs';

for (const file of ['src/components/admin/EditProject.jsx', 'src/components/admin/NewProject.jsx', 'src/components/admin/ProjectsList.jsx']) {
  let content = fs.readFileSync(file, 'utf-8');
  content = content.replace(/method: 'POST',\s*\}\);/g, "method: 'POST',\n          mode: 'no-cors'\n        });");
  fs.writeFileSync(file, content);
}
console.log("Fixed CORS in webhooks.");
