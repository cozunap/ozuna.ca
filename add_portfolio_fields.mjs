import fs from 'fs';

let content = fs.readFileSync('src/components/admin/AdminApp.jsx', 'utf8');

const portfolioFields = `
               {editingCollection === 'work' && (
                  <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                     <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0d1f3c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Project Details</label>
                     
                     <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem', color: '#334155' }}>Category</label>
                        <input type="text" value={editingDoc.category || ''} placeholder="e.g. Web Design" onChange={(e) => setEditingDoc({...editingDoc, category: e.target.value})} style={{...styles.input, padding: '0.5rem', fontSize: '0.9rem', marginBottom: 0}} />
                     </div>
                     
                     <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem', color: '#334155' }}>Client</label>
                        <input type="text" value={editingDoc.client || ''} placeholder="Client Name" onChange={(e) => setEditingDoc({...editingDoc, client: e.target.value})} style={{...styles.input, padding: '0.5rem', fontSize: '0.9rem', marginBottom: 0}} />
                     </div>

                     <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem', color: '#334155' }}>Year</label>
                        <input type="text" value={editingDoc.year || ''} placeholder="e.g. 2024" onChange={(e) => setEditingDoc({...editingDoc, year: e.target.value})} style={{...styles.input, padding: '0.5rem', fontSize: '0.9rem', marginBottom: 0}} />
                     </div>

                     <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem', color: '#334155' }}>Services (comma separated)</label>
                        <input type="text" value={editingDoc.services || ''} placeholder="Branding, UI/UX" onChange={(e) => setEditingDoc({...editingDoc, services: e.target.value})} style={{...styles.input, padding: '0.5rem', fontSize: '0.9rem', marginBottom: 0}} />
                     </div>

                     <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem', color: '#334155' }}>External URL (Optional)</label>
                        <input type="text" value={editingDoc.externalUrl || ''} placeholder="https://..." onChange={(e) => setEditingDoc({...editingDoc, externalUrl: e.target.value})} style={{...styles.input, padding: '0.5rem', fontSize: '0.9rem', marginBottom: 0}} />
                     </div>
                     
                     <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem', color: '#334155' }}>Short Description</label>
                        <textarea rows="3" value={editingDoc.shortDescription || ''} placeholder="Brief summary..." onChange={(e) => setEditingDoc({...editingDoc, shortDescription: e.target.value})} style={{...styles.input, padding: '0.5rem', fontSize: '0.9rem', marginBottom: 0, resize: 'vertical'}} />
                     </div>
                  </div>
               )}
`;

content = content.replace(
  /\{\s*editingCollection === 'pages' && \(/,
  portfolioFields + '\n\n               {editingCollection === \'pages\' && ('
);

fs.writeFileSync('src/components/admin/AdminApp.jsx', content);
