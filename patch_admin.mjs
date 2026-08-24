import fs from 'fs';

let content = fs.readFileSync('src/components/admin/AdminApp.jsx', 'utf8');

const settingsJSX = `
            {editingCollection === 'pages' && (
              <div style={{ marginBottom: '3rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ ...styles.header, fontSize: '1.5rem', marginTop: 0, marginBottom: '1.5rem' }}>Page Layout Elements</h3>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>Giant Title (Stroke Text)</label>
                  <input type="text" value={editingDoc.displayTitle || ''} placeholder="e.g. ABOUT" onChange={(e) => setEditingDoc({...editingDoc, displayTitle: e.target.value})} style={{...styles.input, maxWidth: '600px'}} />
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>Contact Section Title</label>
                  <input type="text" value={editingDoc.contactTitle || ''} placeholder="e.g. Contact Carlos Ozuna" onChange={(e) => setEditingDoc({...editingDoc, contactTitle: e.target.value})} style={{...styles.input, maxWidth: '600px'}} />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#334155' }}>Contact Links</label>
                  {(editingDoc.contactLinks || []).map((link, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <input type="text" placeholder="Link Text" value={link.text || ''} onChange={(e) => {
                        const newLinks = [...(editingDoc.contactLinks || [])];
                        newLinks[idx].text = e.target.value;
                        setEditingDoc({...editingDoc, contactLinks: newLinks});
                      }} style={{...styles.input, flex: 1, marginBottom: 0}} />
                      <input type="text" placeholder="URL" value={link.link || ''} onChange={(e) => {
                        const newLinks = [...(editingDoc.contactLinks || [])];
                        newLinks[idx].link = e.target.value;
                        setEditingDoc({...editingDoc, contactLinks: newLinks});
                      }} style={{...styles.input, flex: 2, marginBottom: 0}} />
                      <button onClick={() => {
                        const newLinks = [...(editingDoc.contactLinks || [])];
                        newLinks.splice(idx, 1);
                        setEditingDoc({...editingDoc, contactLinks: newLinks});
                      }} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '4px', cursor: 'pointer' }}>X</button>
                    </div>
                  ))}
                  <button onClick={() => {
                    const newLinks = [...(editingDoc.contactLinks || [])];
                    newLinks.push({ text: '', link: '', isExternal: false });
                    setEditingDoc({...editingDoc, contactLinks: newLinks});
                  }} style={{...styles.btnOutline, padding: '0.5rem 1rem', fontSize: '0.9rem', marginTop: '0.5rem'}}>+ Add Link</button>
                </div>
              </div>
            )}
`;

content = content.replace(
  /<h3 style={{ ...styles.header, fontSize: '1.8rem', borderTop: '1px solid #e2e8f0', paddingTop: '2rem', marginTop: '2rem' }}>Content Blocks<\/h3>/,
  settingsJSX + '\n            <h3 style={{ ...styles.header, fontSize: "1.8rem", borderTop: "1px solid #e2e8f0", paddingTop: "2rem", marginTop: "2rem" }}>Content Blocks</h3>'
);

// Add Publish button next to Save Changes
content = content.replace(
  /<button onClick={saveDoc} style={{ ...styles.btn, padding: '0.75rem 2rem', fontSize: '1.1rem' }}>\s*Save Changes\s*<\/button>/,
  `<button onClick={saveDoc} style={{ ...styles.btn, padding: '0.75rem 2rem', fontSize: '1.1rem' }}>Save Changes</button>
            <button onClick={async () => {
              if (confirm('Deploying will push all saved changes to the live website. This takes about 2 minutes. Continue?')) {
                // Here we would call a Cloudflare Pages deploy hook
                // For now, we'll just show an alert since they use GitHub automatic deploys
                alert('Since the site is linked to your GitHub, saving changes is step 1. To publish to the live site, please click the "Publish" button on your Cloudflare dashboard, or push a commit to GitHub. (A direct webhook integration is coming soon!)');
              }
            }} style={{ ...styles.btnOutline, padding: '0.75rem 2rem', fontSize: '1.1rem', background: '#b89a5a', color: '#fff', borderColor: '#b89a5a' }}>🚀 Publish to Live Site</button>`
);

fs.writeFileSync('src/components/admin/AdminApp.jsx', content);
