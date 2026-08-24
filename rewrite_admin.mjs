import fs from 'fs';

const fullCode = `
import React, { useState, useEffect, useRef } from 'react';
import { app, auth, db } from '../../lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import GrapesEditor from './GrapesEditor.jsx';

const styles = {
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    marginBottom: '1rem',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s'
  },
  btn: {
    background: '#b89a5a',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'opacity 0.2s',
  },
  btnOutline: {
    background: 'transparent',
    color: '#b89a5a',
    border: '2px solid #b89a5a',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  btnDanger: {
    background: '#fee2e2',
    color: '#ef4444',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  card: {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
    border: '1px solid #e2e8f0'
  },
  header: {
    fontFamily: "'Playfair Display', serif",
    color: '#0d1f3c'
  }
};

export default function AdminApp() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [pages, setPages] = useState([]);
  const [works, setWorks] = useState([]);
  const [editingDoc, setEditingDoc] = useState(null);
  const [editingCollection, setEditingCollection] = useState('');
  const grapesRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) fetchData();
      else setLoading(false);
    });
    return unsubscribe;
  }, []);

  const fetchData = async () => {
    try {
      const pagesSnap = await getDocs(collection(db, 'pages'));
      const worksSnap = await getDocs(collection(db, 'work'));
      setPages(pagesSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setWorks(worksSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (e) {
      console.error(e);
      setError('Failed to load data. Make sure Firebase is configured correctly.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
    } catch (e) {
      setError('Invalid email or password');
    }
  };

  const handleLogout = () => signOut(auth);

  const createNewDoc = (collectionName) => {
    const title = prompt('Enter a title for the new document:');
    if (!title) return;
    const newDoc = {
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title,
      blocks: [],
      html: '',
      css: '',
      gjsData: null
    };
    setEditingDoc(newDoc);
    setEditingCollection(collectionName);
  };

  const openEditor = (docToEdit, collectionName) => {
    if (!docToEdit.blocks) docToEdit.blocks = [];
    setEditingDoc({ ...docToEdit });
    setEditingCollection(collectionName);
  };

  const saveDoc = async () => {
    let docToSave = { ...editingDoc };
    
    // Pull latest data from GrapesJS before saving
    if (grapesRef.current) {
      const gjsData = grapesRef.current.getData();
      if (gjsData) {
        docToSave = { ...docToSave, ...gjsData, blocks: [] };
      }
    }

    try {
      const docRef = doc(db, editingCollection, docToSave.id);
      await setDoc(docRef, docToSave);
      
      if (editingCollection === 'pages') {
        if (!pages.find(p => p.id === docToSave.id)) setPages([...pages, docToSave]);
        else setPages(pages.map(p => p.id === docToSave.id ? docToSave : p));
      } else {
        if (!works.find(w => w.id === docToSave.id)) setWorks([...works, docToSave]);
        else setWorks(works.map(w => w.id === docToSave.id ? docToSave : w));
      }
      
      setEditingDoc(docToSave);
      setMessage('Document saved successfully! ✅');
      setTimeout(() => setMessage(''), 3000);
    } catch (e) {
      console.error(e);
      alert('Error saving document');
    }
  };

  const handleDelete = async (id, collectionName) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      if (collectionName === 'pages') setPages(pages.filter(p => p.id !== id));
      else setWorks(works.filter(w => w.id !== id));
    } catch (e) {
      alert('Error deleting document');
    }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0d1f3c', color: '#b89a5a' }}>Loading Workspace...</div>;

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d1f3c' }}>
        <div style={{ background: '#fff', padding: '3rem', borderRadius: '12px', width: '100%', maxWidth: '420px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
          <h2 style={{ ...styles.header, textAlign: 'center', fontSize: '2rem' }}>Ozuna CMS</h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '2rem' }}>Sign in to manage your premium content.</p>
          {error && <div style={{ color: '#dc2626', background: '#fef2f2', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
            <button type="submit" style={{ ...styles.btn, width: '100%', marginTop: '0.5rem', padding: '1rem' }}>Access Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  // Render Fullscreen Editor Mode if a document is selected
  if (editingDoc) {
    return (
      <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', position: 'fixed', top: 0, left: 0, zIndex: 1000, backgroundColor: '#f1f5f9' }}>
         
         {/* LEFT SIDEBAR: Page Settings & Controls */}
         <div style={{ width: '350px', minWidth: '350px', background: '#fff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e2e8f0', background: '#0d1f3c', color: '#fff' }}>
               <button onClick={() => setEditingDoc(null)} style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                  &larr; Back to Dashboard
               </button>
               <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#b89a5a', fontSize: '1.5rem', margin: 0, lineHeight: 1.2 }}>
                  {editingDoc.title || editingDoc.id || 'Untitled'}
               </h2>
               {message && <div style={{ color: '#4ade80', fontSize: '0.85rem', marginTop: '0.5rem' }}>{message}</div>}
            </div>
            
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
               
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
         <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', background: '#fff', position: 'relative' }}>
             <GrapesEditor ref={grapesRef} initialData={editingDoc} />
         </div>

      </div>
    );
  }

  // Default Dashboard View
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <nav style={{ background: '#0d1f3c', padding: '1.5rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', margin: 0, fontSize: '1.5rem' }}>Ozuna <span style={{ color: '#b89a5a' }}>Workspace</span></h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span style={{ color: '#cbd5e1', fontSize: '0.9rem', display: 'none', '@media (min-width: 768px)': { display: 'block' } }}>{user.email}</span>
          <button onClick={handleLogout} style={styles.btnOutline}>Log Out</button>
        </div>
      </nav>

      <main style={{ flex: 1, padding: 'clamp(2rem, 5vw, 4rem)', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h2 style={{ ...styles.header, fontSize: '2.5rem', marginBottom: '0.5rem' }}>Dashboard</h2>
            <p style={{ color: '#64748b', margin: 0, fontSize: '1.1rem' }}>Manage your pages and projects.</p>
          </div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
              <h3 style={{ ...styles.header, fontSize: '1.5rem', margin: 0 }}>Website Pages</h3>
              <button onClick={() => createNewDoc('pages')} style={{...styles.btnOutline, padding: '0.25rem 0.75rem', fontSize: '0.9rem'}}>+ New</button>
            </div>
            {pages.map(page => (
              <div key={page.id} style={styles.card} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <span style={{ fontWeight: '500', fontSize: '1.1rem' }}>{page.title || page.id}</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => openEditor(page, 'pages')} style={styles.btn}>Edit</button>
                  <button onClick={() => handleDelete(page.id, 'pages')} style={styles.btnDanger}>X</button>
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.75rem', marginBottom: '1.5rem' }}>
              <h3 style={{ ...styles.header, fontSize: '1.5rem', margin: 0 }}>Portfolio Projects</h3>
              <button onClick={() => createNewDoc('work')} style={{...styles.btnOutline, padding: '0.25rem 0.75rem', fontSize: '0.9rem'}}>+ New</button>
            </div>
            {works.map(work => (
              <div key={work.id} style={styles.card} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <span style={{ fontWeight: '500', fontSize: '1.1rem' }}>{work.title || work.id}</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => openEditor(work, 'work')} style={styles.btn}>Edit</button>
                  <button onClick={() => handleDelete(work.id, 'work')} style={styles.btnDanger}>X</button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
`;

fs.writeFileSync('src/components/admin/AdminApp.jsx', fullCode);
