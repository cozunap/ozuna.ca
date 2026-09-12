import fs from 'fs';

for (const file of ['src/components/admin/EditProject.jsx', 'src/components/admin/NewProject.jsx']) {
  let content = fs.readFileSync(file, 'utf-8');
  
  // We need to stop passing value={formData.description} if it causes re-renders.
  // Actually, JoditEditor in jodit-react handles value updates by checking if newContent === oldContent.
  // BUT another fix is to use useMemo for the config so it doesn't re-render the editor component.
  
  // Let's look at how we can just fix the config object which is currently inline and causes re-renders on every keystroke!
  content = content.replace(/config=\{\{.*?\}\}/g, 'config={editorConfig}');
  
  if (!content.includes('const editorConfig')) {
    content = content.replace(/const handleSave/g, `const editorConfig = React.useMemo(() => ({ theme: 'dark', minHeight: 300, buttons: ['bold', 'italic', 'underline', '|', 'ul', 'ol', '|', 'font', 'fontsize', 'brush', 'paragraph', '|', 'image', 'link', '|', 'align', 'undo', 'redo', 'fullsize'], style: { background: 'var(--admin-input-bg)', color: 'var(--admin-text)' } }), []);\n\n  const handleSave`);
  }
  
  fs.writeFileSync(file, content);
}
console.log("Fixed Jodit config memoization.");
