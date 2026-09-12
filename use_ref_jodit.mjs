import fs from 'fs';

for (const file of ['src/components/admin/EditProject.jsx', 'src/components/admin/NewProject.jsx']) {
  let content = fs.readFileSync(file, 'utf-8');
  
  if (!content.includes('const editorContentRef = useRef')) {
    // Add the ref
    content = content.replace(/const imageInputRef = useRef\(null\);/, 'const imageInputRef = useRef(null);\n  const editorContentRef = useRef("");');
    
    // In useEffect when fetching project:
    content = content.replace(/setFormData\(\{/, 'editorContentRef.current = data.description || "";\n        setFormData({');
    
    // In handleSave:
    content = content.replace(/description: formData\.description,/g, 'description: editorContentRef.current,');
    
    // In JoditEditor:
    content = content.replace(/onBlur=\{val => setFormData\(\{\.\.\.formData, description: val\}\)\}/, 'onBlur={val => { editorContentRef.current = val; }}');
    content = content.replace(/onChange=\{newContent => \{\}\}/, 'onChange={newContent => { editorContentRef.current = newContent; }}');
  }
  
  fs.writeFileSync(file, content);
}
console.log("Updated to use ref for Jodit content.");
