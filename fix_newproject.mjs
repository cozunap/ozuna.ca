import fs from 'fs';
let content = fs.readFileSync('src/components/admin/NewProject.jsx', 'utf-8');

// Fix 1: Add editorContentRef
if (!content.includes('const editorContentRef = useRef')) {
  content = content.replace(/const imageInputRef = useRef\(null\);/, 'const imageInputRef = useRef(null);\n  const editorContentRef = useRef("");');
}

// Fix 2: Jodit onChange and onBlur
content = content.replace(/onChange=\{val => setFormData\(\{\.\.\.formData, description: val\}\)\}/, 'onChange={newContent => { editorContentRef.current = newContent; }}');
content = content.replace(/onBlur=\{val => setFormData\(\{\.\.\.formData, description: val\}\)\}/, 'onBlur={val => { editorContentRef.current = val; }}');

// Fix 3: In handleSave, use the ref instead of state
content = content.replace(/description: formData\.description,/g, 'description: editorContentRef.current,');

// Fix 4: Remove the state update from any other onChange we missed (the fix_jodit_onchange logic)
content = content.replace(/onChange=\{newContent => \{\}\}/, 'onChange={newContent => { editorContentRef.current = newContent; }}');

fs.writeFileSync('src/components/admin/NewProject.jsx', content);
