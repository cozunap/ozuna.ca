const fs = require('fs');
let code = fs.readFileSync('src/components/admin/AdminApp.jsx', 'utf-8');
code = code.replace(
  'if (!docToEdit.blocks) docToEdit.blocks = [];',
  `if (!docToEdit.blocks) {
      docToEdit.blocks = [];
      if (docToEdit.body) {
        docToEdit.blocks.push({ type: 'text', content: docToEdit.body });
        delete docToEdit.body; // Remove old body field
      }
    }`
);
fs.writeFileSync('src/components/admin/AdminApp.jsx', code);
