import fs from 'fs';

for (const file of ['src/components/admin/EditProject.jsx', 'src/components/admin/NewProject.jsx']) {
  let content = fs.readFileSync(file, 'utf-8');
  
  // 1. Remove the misplaced finalDescription block
  content = content.replace(/      let finalDescription = editorContentRef\.current;\n      if \(joditRef\.current && joditRef\.current\.value !== undefined\) \{\n        finalDescription = joditRef\.current\.value;\n      \}\n      \n      const \{ error \} = await supabase/g, 'const { error } = await supabase');
  
  // 2. Insert it safely at the beginning of handleSave's try block!
  content = content.replace(/    try \{\n      let imageUrl/g, "    try {\n      let finalDescription = editorContentRef.current;\n      if (joditRef.current && joditRef.current.value !== undefined) {\n        finalDescription = joditRef.current.value;\n      }\n\n      let imageUrl");
  
  fs.writeFileSync(file, content);
}
console.log("Fixed finalDescription scope.");
