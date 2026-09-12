import fs from 'fs';

for (const file of ['src/components/admin/EditProject.jsx', 'src/components/admin/NewProject.jsx']) {
  let content = fs.readFileSync(file, 'utf-8');
  
  // 1. Add editorRef
  if (!content.includes('const joditRef = useRef(null)')) {
    content = content.replace(/const editorContentRef = useRef\(""\);/, 'const editorContentRef = useRef("");\n  const joditRef = useRef(null);');
  }
  
  // 2. Add ref to JoditEditor
  content = content.replace(/<JoditEditor /, '<JoditEditor ref={joditRef} ');
  
  // 3. Update handleSave to pull directly from Jodit instance if available
  // joditRef.current could be the editor instance. In jodit-react, it's a wrapper, so we might need joditRef.current.value or joditRef.current.editor.value
  // Actually, if we just use editorContentRef but ensure we update it on submit, it's safer.
  // Wait, joditRef.current.value is standard for jodit-react.
  const handleSavePatch = `
      let finalDescription = editorContentRef.current;
      if (joditRef.current && joditRef.current.value !== undefined) {
        finalDescription = joditRef.current.value;
      }
      
      const { error } = await supabase`;
      
  content = content.replace(/const \{ error \} = await supabase/, handleSavePatch);
  content = content.replace(/description: editorContentRef\.current,/, 'description: finalDescription,');
  
  fs.writeFileSync(file, content);
}
console.log("Applied bulletproof Jodit refs.");
