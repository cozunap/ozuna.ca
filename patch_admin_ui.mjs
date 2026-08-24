import fs from 'fs';

let content = fs.readFileSync('src/components/admin/AdminApp.jsx', 'utf8');

// Ensure we have useRef in imports
if (!content.includes('useRef')) {
  content = content.replace(/import React, \{ useState, useEffect \} from 'react';/, "import React, { useState, useEffect, useRef } from 'react';");
}

// We need to inject the editor ref into the AdminApp component
if (!content.includes('const grapesRef = useRef(null);')) {
  content = content.replace(/const \[editingCollection, setEditingCollection\] = useState\(''\);/, "const [editingCollection, setEditingCollection] = useState('');\n  const grapesRef = useRef(null);");
}

// We need to update saveDoc to pull from GrapesJS before saving
const oldSaveDoc = `const saveDoc = async () => {`;
const newSaveDoc = `const saveDoc = async () => {
    let docToSave = { ...editingDoc };
    if (editingCollection === 'pages' && grapesRef.current) {
      const gjsData = grapesRef.current.getData();
      if (gjsData) {
        docToSave = { ...docToSave, ...gjsData, blocks: [] };
      }
    }
`;
if (content.includes(oldSaveDoc) && !content.includes('grapesRef.current.getData')) {
  content = content.replace(oldSaveDoc, newSaveDoc);
  // Also we need to make sure we use docToSave in the updateDoc call
  content = content.replace(/await setDoc\(docRef, editingDoc\);/, 'await setDoc(docRef, docToSave);');
  content = content.replace(/setEditingDoc\(editingDoc\);/, 'setEditingDoc(docToSave);');
  content = content.replace(/setPages\(pages\.map\(p => p\.id === editingDoc\.id \? editingDoc : p\)\);/, 'setPages(pages.map(p => p.id === docToSave.id ? docToSave : p));');
  content = content.replace(/setWorks\(works\.map\(w => w\.id === editingDoc\.id \? editingDoc : w\)\);/, 'setWorks(works.map(w => w.id === docToSave.id ? docToSave : w));');
}


// Now replace the editing UI
const editUiStart = `) : (
          <div style={{ background: '#fff', borderRadius: '16px'`;
const editUiEndRegex = /\) : \([\s\S]*?\)\s*<\/main>\s*<\/div>\s*\);\s*\}\s*$/;

const newEditUi = `) : (
        <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', position: 'fixed', top: 0, left: 0, zIndex: 100, backgroundColor: '#f1f5f9' }}>
           
           {/* LEFT SIDEBAR: Page Settings & Controls */}
           <div style={{ width: '350px', minWidth: '350px', background: '#fff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
              
              <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', background: '#0d1f3c', color: '#fff' }}>
                 <button onClick={() => setEditingDoc(null)} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                    &larr; Back to Dashboard
                 </button>
                 <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#b89a5a', fontSize: '1.5rem', margin: 0, lineHeight: 1.2 }}>
                    {editingDoc.title || editingDoc.id || 'Untitled'}
                 </h2>
              </div>
              
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem', flex: 1 }}>
                 
                 <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Document Title</label>
                    <input type="text" value={editingDoc.title || ''} onChange={(e) => setEditingDoc({...editingDoc, title: e.target.value})} style={{...styles.input, marginBottom: 0}} />
                 </div>

                 {editingCollection === 'pages' && (
                    <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                       <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0d1f3c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Layout Settings</label>
                       
                       <div style={{ marginBottom: '1rem' }}>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem', color: '#334155' }}>Stroke Text Title</label>
                          <input type="text" value={editingDoc.displayTitle || ''} placeholder="e.g. ABOUT" onChange={(e) => setEditingDoc({...editingDoc, displayTitle: e.target.value})} style={{...styles.input, padding: '0.5rem', fontSize: '0.9rem', marginBottom: 0}} />
                       </div>
                       
                       <div style={{ marginBottom: '1rem' }}>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem', color: '#334155' }}>Contact Header</label>
                          <input type="text" value={editingDoc.contactTitle || ''} placeholder="Contact Carlos Ozuna" onChange={(e) => setEditingDoc({...editingDoc, contactTitle: e.target.value})} style={{...styles.input, padding: '0.5rem', fontSize: '0.9rem', marginBottom: 0}} />
                       </div>

                       <div>
                          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.5rem', color: '#334155' }}>Footer Links</label>
                          {(editingDoc.contactLinks || []).map((link, idx) => (
                             <div key={idx} style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.5rem', background: '#fff', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1' }}>
                                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                   <input type="text" placeholder="Text" value={link.text || ''} onChange={(e) => {
                                      const newLinks = [...(editingDoc.contactLinks || [])];
                                      newLinks[idx].text = e.target.value;
                                      setEditingDoc({...editingDoc, contactLinks: newLinks});
                                   }} style={{...styles.input, padding: '0.25rem 0.5rem', fontSize: '0.8rem', marginBottom: 0, minHeight: 'auto'}} />
                                   <input type="text" placeholder="URL" value={link.link || ''} onChange={(e) => {
                                      const newLinks = [...(editingDoc.contactLinks || [])];
                                      newLinks[idx].link = e.target.value;
                                      setEditingDoc({...editingDoc, contactLinks: newLinks});
                                   }} style={{...styles.input, padding: '0.25rem 0.5rem', fontSize: '0.8rem', marginBottom: 0, minHeight: 'auto'}} />
                                </div>
                                <button onClick={() => {
                                   const newLinks = [...(editingDoc.contactLinks || [])];
                                   newLinks.splice(idx, 1);
                                   setEditingDoc({...editingDoc, contactLinks: newLinks});
                                }} style={{ background: '#fef2f2', color: '#ef4444', border: '1px solid #fca5a5', padding: '0 0.5rem', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold' }}>&times;</button>
                             </div>
                          ))}
                          <button onClick={() => {
                             const newLinks = [...(editingDoc.contactLinks || [])];
                             newLinks.push({ text: '', link: '', isExternal: false });
                             setEditingDoc({...editingDoc, contactLinks: newLinks});
                          }} style={{...styles.btnOutline, padding: '0.25rem 0.5rem', fontSize: '0.8rem', width: '100%'}}>+ Add Link</button>
                       </div>
                    </div>
                 )}
              </div>
              
              <div style={{ padding: '1.5rem', borderTop: '1px solid #e2e8f0', background: '#fff' }}>
                 <button onClick={saveDoc} style={{ ...styles.btn, width: '100%', padding: '1rem', marginBottom: '0.75rem', fontSize: '1rem' }}>Save Changes</button>
                 <button onClick={() => {
                    if (confirm('Deploying will push all saved changes to the live website. Continue?')) {
                       alert('Please push a commit to GitHub or deploy via Cloudflare dashboard to go live. (Webhook coming soon)');
                    }
                 }} style={{ ...styles.btnOutline, width: '100%', padding: '1rem', borderColor: '#b89a5a', color: '#b89a5a', fontSize: '1rem', fontWeight: 'bold' }}>🚀 Publish to Live Site</button>
              </div>
           </div>

           {/* RIGHT SIDE: Canvas & Builder */}
           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}>
              {editingCollection === 'pages' ? (
                 <GrapesEditor ref={grapesRef} initialData={editingDoc} />
              ) : (
                 <div style={{ padding: '3rem', overflowY: 'auto' }}>
                    <h3 style={{...styles.header, fontSize: '1.8rem', marginBottom: '1.5rem'}}>Portfolio Project Details</h3>
                    <p style={{ color: '#64748b' }}>Portfolio builder coming in Phase 2...</p>
                 </div>
              )}
           </div>

        </div>
      )}
    </main>
  </div>
  );
}
`;

content = content.replace(editUiEndRegex, newEditUi);

fs.writeFileSync('src/components/admin/AdminApp.jsx', content);
