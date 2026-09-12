import fs from 'fs';
let content = fs.readFileSync('src/components/admin/NewProject.jsx', 'utf-8');

// 1. CORS
content = content.replace(/method: 'POST',\s*\}\);/g, "method: 'POST',\n          mode: 'no-cors'\n        });");

// 2. Ref
content = content.replace(/const imageInputRef = useRef\(null\);/, 'const imageInputRef = useRef(null);\n  const editorContentRef = useRef("");');
content = content.replace(/description: formData\.description,/g, 'description: editorContentRef.current,');

// 3. Jodit fixes
content = content.replace(/config=\{\{.*?\}\}/g, 'config={editorConfig}');
content = content.replace(/const handleSave/g, `const editorConfig = React.useMemo(() => ({ theme: 'dark', minHeight: 300, buttons: ['bold', 'italic', 'underline', '|', 'ul', 'ol', '|', 'font', 'fontsize', 'brush', 'paragraph', '|', 'image', 'link', '|', 'align', 'undo', 'redo', 'fullsize'], style: { background: 'var(--admin-input-bg)', color: 'var(--admin-text)' } }), []);\n\n  const handleSave`);
content = content.replace(/onBlur=\{val => setFormData\(\{\.\.\.formData, description: val\}\)\}/g, 'onBlur={val => { editorContentRef.current = val; }}');
content = content.replace(/onChange=\{val => setFormData\(\{\.\.\.formData, description: val\}\)\}/g, 'onChange={newContent => { editorContentRef.current = newContent; }}');

fs.writeFileSync('src/components/admin/NewProject.jsx', content);
