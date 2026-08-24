import fs from 'fs';

const adminCode = `
import React, { useState, useEffect, useRef } from 'react';
import { app, auth, db } from '../../lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import GrapesEditor from './GrapesEditor.jsx';

const styles = {
  input: {
    width: '100%',
    padding: '0.6rem 0.75rem',
    borderRadius: '4px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backgroundColor: '#111A33',
    fontSize: '0.85rem',
    color: '#fff',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: "'Inter', sans-serif"
  },
  label: {
    display: 'block',
    fontSize: '0.65rem',
    fontWeight: 600,
    color: '#8892B0',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.4rem',
    fontFamily: "'Inter', sans-serif"
  },
  btnPrimary: {
    background: '#b89a5a',
    color: '#fff',
    border: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.85rem',
    fontFamily: "'Inter', sans-serif",
    transition: 'background 0.2s'
  },
  btnOutline: {
    background: 'transparent',
    color: '#b89a5a',
    border: '1px solid #b89a5a',
    padding: '0.75rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.85rem',
    fontFamily: "'Inter', sans-serif",
    transition: 'background 0.2s'
  },
  btnLink: {
    background: 'transparent',
    color: '#8892B0',
    border: '1px solid rgba(255,255,255,0.1)',
    padding: '0.5rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.75rem',
    width: '100%'
  },
  card: {
    background: '#111A33',
    padding: '1.25rem',
    borderRadius: '6px',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    fontFamily: "'Inter', sans-serif"
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
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      setError('Invalid credentials');
    }
  };

  const handleLogout = () => signOut(auth);

  const createNewDoc = (collectionName) => {
    const title = prompt('Enter a title:');
    if (!title) return;
    const newDoc = {
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      title,
      blocks: [], html: '', css: '', gjsData: null
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
    if (grapesRef.current) {
      const gjsData = grapesRef.current.getData();
      if (gjsData) docToSave = { ...docToSave, ...gjsData, blocks: [] };
    }
    try {
      const docRef = doc(db, editingCollection, docToSave.id);
      await setDoc(docRef, docToSave);
      if (editingCollection === 'pages') {
        setPages(pages.some(p => p.id === docToSave.id) ? pages.map(p => p.id === docToSave.id ? docToSave : p) : [...pages, docToSave]);
      } else {
        setWorks(works.some(w => w.id === docToSave.id) ? works.map(w => w.id === docToSave.id ? docToSave : w) : [...works, docToSave]);
      }
      setEditingDoc(docToSave);
      setMessage('Saved');
      setTimeout(() => setMessage(''), 2000);
    } catch (e) {
      alert('Error saving document');
    }
  };

  const handleDelete = async (id, collectionName) => {
    if (!confirm('Delete document?')) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      if (collectionName === 'pages') setPages(pages.filter(p => p.id !== id));
      else setWorks(works.filter(w => w.id !== id));
    } catch (e) {}
  };

  if (loading) return <div style={{ background: '#0B132B', height: '100vh' }}></div>;
  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0B132B' }}>
        <div style={{ background: '#111A33', padding: '2.5rem', borderRadius: '8px', width: '100%', maxWidth: '380px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", textAlign: 'center', fontSize: '1.8rem', color: '#fff', marginBottom: '2rem' }}>Ozuna CMS</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
            <button type="submit" style={styles.btnPrimary}>Sign In</button>
          </form>
        </div>
      </div>
    );
  }

  if (editingDoc) {
    return (
      <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', position: 'fixed', top: 0, left: 0, zIndex: 1000, backgroundColor: '#0B132B', fontFamily: "'Inter', sans-serif" }}>
         
         {/* LEFT SIDEBAR: Settings */}
         <div style={{ width: '280px', minWidth: '280px', background: '#0B132B', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', overflowY: 'auto', zIndex: 10 }}>
            
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <button onClick={() => setEditingDoc(null)} style={{ background: 'none', border: 'none', color: '#8892B0', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
               </button>
               <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#8892B0', letterSpacing: '0.05em' }}>BACK</span>
            </div>

            <div style={{ padding: '1.25rem' }}>
               <h2 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: '1.25rem', margin: '0 0 1.5rem 0', lineHeight: 1.2, fontWeight: 400 }}>
                  {editingDoc.title || 'Untitled'}
               </h2>
               
               <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                     <label style={styles.label}>Internal Name</label>
                     <input type="text" value={editingDoc.title || ''} onChange={(e) => setEditingDoc({...editingDoc, title: e.target.value})} style={styles.input} />
                  </div>

                  {editingCollection === 'pages' && (
                     <div style={{ background: '#111A33', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Layout Settings</label>
                        
                        <div style={{ marginBottom: '1rem' }}>
                           <label style={styles.label}>Stroke Text Title</label>
                           <input type="text" value={editingDoc.displayTitle || ''} placeholder="ABOUT" onChange={(e) => setEditingDoc({...editingDoc, displayTitle: e.target.value})} style={styles.input} />
                        </div>
                        
                        <div style={{ marginBottom: '1rem' }}>
                           <label style={styles.label}>Contact Header</label>
                           <input type="text" value={editingDoc.contactTitle || ''} placeholder="Contact Carlos Ozuna" onChange={(e) => setEditingDoc({...editingDoc, contactTitle: e.target.value})} style={styles.input} />
                        </div>

                        <div>
                           <label style={styles.label}>Footer Links</label>
                           {(editingDoc.contactLinks || []).map((link, idx) => (
                              <div key={idx} style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.5rem', background: '#0B132B', padding: '0.5rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                 <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <input type="text" placeholder="Text" value={link.text || ''} onChange={(e) => {
                                       const newLinks = [...(editingDoc.contactLinks || [])];
                                       newLinks[idx].text = e.target.value;
                                       setEditingDoc({...editingDoc, contactLinks: newLinks});
                                    }} style={{...styles.input, padding: '0.4rem', fontSize: '0.75rem', background: 'transparent'}} />
                                    <input type="text" placeholder="URL" value={link.link || ''} onChange={(e) => {
                                       const newLinks = [...(editingDoc.contactLinks || [])];
                                       newLinks[idx].link = e.target.value;
                                       setEditingDoc({...editingDoc, contactLinks: newLinks});
                                    }} style={{...styles.input, padding: '0.4rem', fontSize: '0.75rem', background: 'transparent'}} />
                                 </div>
                                 <button onClick={() => {
                                    const newLinks = [...(editingDoc.contactLinks || [])];
                                    newLinks.splice(idx, 1);
                                    setEditingDoc({...editingDoc, contactLinks: newLinks});
                                 }} style={{ background: 'none', color: '#ef4444', border: 'none', padding: '0 4px', cursor: 'pointer', fontSize: '1.2rem' }}>&times;</button>
                              </div>
                           ))}
                           <button onClick={() => {
                              const newLinks = [...(editingDoc.contactLinks || [])];
                              newLinks.push({ text: '', link: '', isExternal: false });
                              setEditingDoc({...editingDoc, contactLinks: newLinks});
                           }} style={styles.btnLink}>+ Add Link</button>
                        </div>
                     </div>
                  )}

                  {editingCollection === 'work' && (
                     <div style={{ background: '#111A33', padding: '1rem', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <label style={{ display: 'block', fontSize: '0.65rem', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Project Details</label>
                        <div><label style={styles.label}>Category</label><input type="text" value={editingDoc.category || ''} onChange={(e) => setEditingDoc({...editingDoc, category: e.target.value})} style={styles.input} /></div>
                        <div style={{marginTop: '0.75rem'}}><label style={styles.label}>Client</label><input type="text" value={editingDoc.client || ''} onChange={(e) => setEditingDoc({...editingDoc, client: e.target.value})} style={styles.input} /></div>
                        <div style={{marginTop: '0.75rem'}}><label style={styles.label}>Year</label><input type="text" value={editingDoc.year || ''} onChange={(e) => setEditingDoc({...editingDoc, year: e.target.value})} style={styles.input} /></div>
                        <div style={{marginTop: '0.75rem'}}><label style={styles.label}>Services</label><input type="text" value={editingDoc.services || ''} onChange={(e) => setEditingDoc({...editingDoc, services: e.target.value})} style={styles.input} /></div>
                        <div style={{marginTop: '0.75rem'}}><label style={styles.label}>External URL</label><input type="text" value={editingDoc.externalUrl || ''} onChange={(e) => setEditingDoc({...editingDoc, externalUrl: e.target.value})} style={styles.input} /></div>
                        <div style={{marginTop: '0.75rem'}}><label style={styles.label}>Short Description</label><textarea rows="3" value={editingDoc.shortDescription || ''} onChange={(e) => setEditingDoc({...editingDoc, shortDescription: e.target.value})} style={{...styles.input, resize: 'vertical'}} /></div>
                     </div>
                  )}
               </div>
            </div>
            
            <div style={{ marginTop: 'auto', padding: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: '#0B132B', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
               <button onClick={saveDoc} style={styles.btnPrimary}>{message ? 'Saved ✓' : 'Save Changes'}</button>
               <button onClick={() => alert('Push to GitHub to deploy to production.')} style={styles.btnOutline}>Deploy to Live Site</button>
            </div>
         </div>

         {/* RIGHT SIDE: Canvas */}
         <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', background: '#000' }}>
             <GrapesEditor ref={grapesRef} initialData={editingDoc} />
         </div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0B132B', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
      <nav style={{ background: '#111A33', padding: '1rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', margin: 0, fontSize: '1.25rem', fontWeight: 400 }}>Ozuna <span style={{ color: '#b89a5a', fontStyle: 'italic' }}>Workspace</span></h1>
        <button onClick={handleLogout} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.1)', color: '#8892B0', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem' }}>Log Out</button>
      </nav>

      <main style={{ flex: 1, padding: '3rem 5%', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#fff', marginBottom: '2.5rem', fontWeight: 400 }}>Dashboard</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#8892B0', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Pages</h3>
              <button onClick={() => createNewDoc('pages')} style={{ background: 'none', border: 'none', color: '#b89a5a', cursor: 'pointer', fontWeight: 600, fontSize: '0.75rem' }}>+ New</button>
            </div>
            {pages.map(page => (
              <div key={page.id} style={styles.card}>
                <span style={{ fontWeight: 500, color: '#fff', fontSize: '0.85rem' }}>{page.title || page.id}</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => openEditor(page, 'pages')} style={{...styles.btnLink, padding: '0.25rem 0.75rem', border: '1px solid rgba(255,255,255,0.1)'}}>Edit</button>
                  <button onClick={() => handleDelete(page.id, 'pages')} style={{ background: 'none', color: '#8892B0', border: 'none', cursor: 'pointer' }}>&times;</button>
                </div>
              </div>
            ))}
          </div>
          
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#8892B0', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Portfolio</h3>
              <button onClick={() => createNewDoc('work')} style={{ background: 'none', border: 'none', color: '#b89a5a', cursor: 'pointer', fontWeight: 600, fontSize: '0.75rem' }}>+ New</button>
            </div>
            {works.map(work => (
              <div key={work.id} style={styles.card}>
                <span style={{ fontWeight: 500, color: '#fff', fontSize: '0.85rem' }}>{work.title || work.id}</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => openEditor(work, 'work')} style={{...styles.btnLink, padding: '0.25rem 0.75rem', border: '1px solid rgba(255,255,255,0.1)'}}>Edit</button>
                  <button onClick={() => handleDelete(work.id, 'work')} style={{ background: 'none', color: '#8892B0', border: 'none', cursor: 'pointer' }}>&times;</button>
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

fs.writeFileSync('src/components/admin/AdminApp.jsx', adminCode);

const grapesCode = `
import React, { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import grapesjs from 'grapesjs';
import gjsPresetWebpage from 'grapesjs-preset-webpage';
import 'grapesjs/dist/css/grapes.min.css';

const GrapesEditor = forwardRef(({ initialData }, ref) => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const e = grapesjs.init({
      container: editorRef.current,
      fromElement: false,
      height: '100%',
      width: '100%',
      storageManager: false, 
      plugins: [gjsPresetWebpage],
      pluginsOpts: {
        [gjsPresetWebpage]: {}
      },
      canvas: {
        styles: [
          'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap'
        ]
      }
    });

    if (initialData?.gjsData) {
      e.loadProjectData(initialData.gjsData);
    } else if (initialData?.html) {
      e.setComponents(initialData.html);
      e.setStyle(initialData.css || '');
    } else if (initialData?.body) {
      e.setComponents(initialData.body);
    }

    setEditor(e);

    return () => {
      e.destroy();
    };
  }, [initialData]);

  useImperativeHandle(ref, () => ({
    getData: () => {
      if (!editor) return null;
      return {
        gjsData: editor.getProjectData(),
        html: editor.getHtml(),
        css: editor.getCss()
      };
    }
  }));

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#0B132B' }}>
      <style>{\`
        /* GrapesJS Premium Dark Theme Overrides */
        .gjs-one-bg { background-color: #0B132B !important; }
        .gjs-two-color { color: #8892B0 !important; }
        .gjs-three-bg { background-color: #b89a5a !important; color: white !important; }
        .gjs-four-color, .gjs-four-color-h:hover { color: #b89a5a !important; }
        
        .gjs-pn-panel { border-bottom: 1px solid rgba(255,255,255,0.05) !important; box-shadow: none !important; }
        .gjs-pn-views-container { box-shadow: -1px 0 0 rgba(255,255,255,0.05) !important; border-left: 1px solid rgba(255,255,255,0.05); }
        .gjs-cv-canvas { background-color: #f1f5f9 !important; }
        
        .gjs-block { border: 1px solid rgba(255,255,255,0.05) !important; border-radius: 4px !important; background: #111A33 !important; }
        .gjs-block:hover { border-color: #b89a5a !important; color: #b89a5a !important; background: #1a2744 !important; }
        
        .gjs-sm-sector .gjs-sm-title { background-color: #0B132B !important; border-bottom: 1px solid rgba(255,255,255,0.05) !important; font-family: 'Inter', sans-serif; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; color: #8892B0 !important; }
        .gjs-sm-property { background-color: #111A33 !important; }
        
        .gjs-field { background-color: #0B132B !important; border: 1px solid rgba(255,255,255,0.1) !important; border-radius: 3px !important; color: #fff !important; }
        .gjs-frame-wrapper { box-shadow: 0 10px 40px -10px rgba(0,0,0,0.3) !important; }
        
        .gjs-pn-btn { color: #8892B0 !important; }
        .gjs-pn-active { color: #b89a5a !important; }
        
        .gjs-trt-trait { background-color: #111A33 !important; }
        .gjs-layer-title { color: #8892B0 !important; }
      \`}</style>
      <div ref={editorRef} style={{ flexGrow: 1, width: '100%' }}></div>
    </div>
  );
});

export default GrapesEditor;
`;

fs.writeFileSync('src/components/admin/GrapesEditor.jsx', grapesCode);
