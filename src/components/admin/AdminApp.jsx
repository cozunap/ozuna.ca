import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth, db } from '../../lib/firebase';
import { collection, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';

export default function AdminApp() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Dashboard State
  const [pages, setPages] = useState([]);
  const [works, setWorks] = useState([]);
  const [editingDoc, setEditingDoc] = useState(null);
  const [editingCollection, setEditingCollection] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchData();
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const fetchData = async () => {
    try {
      const pagesSnap = await getDocs(collection(db, 'pages'));
      const worksSnap = await getDocs(collection(db, 'work'));
      
      setPages(pagesSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setWorks(worksSnap.docs.map(d => ({ id: d.id, ...d.data() })));
    } catch (err) {
      console.error("Error fetching data: ", err);
    }
    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email first to reset password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    setEditingDoc(null);
    signOut(auth);
  };

  const openEditor = (item, col) => {
    // Ensure blocks array exists
    const docToEdit = { ...item };
    if (!docToEdit.blocks) docToEdit.blocks = [];
    setEditingDoc(docToEdit);
    setEditingCollection(col);
  };

  const saveDocument = async () => {
    try {
      await setDoc(doc(db, editingCollection, editingDoc.id), editingDoc);
      setMessage('Document saved successfully!');
      setTimeout(() => setMessage(''), 3000);
      fetchData(); // Refresh list
      setEditingDoc(null); // Close editor
    } catch (err) {
      setError('Error saving document: ' + err.message);
    }
  };

  const addBlock = (type) => {
    const newBlock = { type };
    if (type === 'hero') {
      newBlock.title = 'New Hero';
      newBlock.subtitle = 'Subtitle here';
      newBlock.image = '';
    } else if (type === 'text') {
      newBlock.content = 'Add your text here...';
    } else if (type === 'gallery') {
      newBlock.images = [];
    }
    setEditingDoc({
      ...editingDoc,
      blocks: [...(editingDoc.blocks || []), newBlock]
    });
  };

  const updateBlock = (index, field, value) => {
    const newBlocks = [...editingDoc.blocks];
    newBlocks[index][field] = value;
    setEditingDoc({ ...editingDoc, blocks: newBlocks });
  };

  const removeBlock = (index) => {
    const newBlocks = [...editingDoc.blocks];
    newBlocks.splice(index, 1);
    setEditingDoc({ ...editingDoc, blocks: newBlocks });
  };

  if (loading) return <div style={{textAlign: 'center', padding: '4rem', color: 'white'}}>Loading...</div>;

  if (!user) {
    return (
      <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', background: '#fff', borderRadius: '8px', color: '#0d1f3c' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Admin Login</h2>
        {error && <div style={{ color: 'red', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</div>}
        {message && <div style={{ color: 'green', marginBottom: '1rem', fontSize: '0.9rem' }}>{message}</div>}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} required />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px' }} required />
          </div>
          <button type="submit" style={{ width: '100%', padding: '0.75rem', background: '#b89a5a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Log In</button>
        </form>
        <button onClick={handleResetPassword} style={{ width: '100%', padding: '0.75rem', background: 'transparent', color: '#0d1f3c', border: 'none', marginTop: '0.5rem', cursor: 'pointer', textDecoration: 'underline' }}>Forgot Password?</button>
      </div>
    );
  }

  if (editingDoc) {
    return (
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', color: '#fff' }}>
        <button onClick={() => setEditingDoc(null)} style={{ padding: '0.5rem 1rem', marginBottom: '1rem', cursor: 'pointer' }}>&larr; Back to Dashboard</button>
        <h2>Editing: {editingDoc.title || editingDoc.id}</h2>
        
        <div style={{ background: '#fff', color: '#333', padding: '2rem', borderRadius: '8px', marginTop: '1rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>Page Title</label>
            <input type="text" value={editingDoc.title || ''} onChange={(e) => setEditingDoc({...editingDoc, title: e.target.value})} style={{ width: '100%', padding: '0.5rem' }} />
          </div>

          <hr style={{ margin: '2rem 0' }}/>
          <h3>Blocks</h3>
          
          {(editingDoc.blocks || []).map((block, index) => (
            <div key={index} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', position: 'relative' }}>
              <button onClick={() => removeBlock(index)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'red', color: 'white', border: 'none', padding: '0.25rem 0.5rem', cursor: 'pointer' }}>Delete Block</button>
              <h4>Type: {block.type}</h4>
              
              {block.type === 'hero' && (
                <>
                  <input type="text" placeholder="Title" value={block.title || ''} onChange={(e) => updateBlock(index, 'title', e.target.value)} style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }} />
                  <input type="text" placeholder="Subtitle" value={block.subtitle || ''} onChange={(e) => updateBlock(index, 'subtitle', e.target.value)} style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }} />
                  <input type="text" placeholder="Image URL" value={block.image || ''} onChange={(e) => updateBlock(index, 'image', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
                </>
              )}
              
              {block.type === 'text' && (
                <textarea rows="5" value={block.content || ''} onChange={(e) => updateBlock(index, 'content', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
              )}
            </div>
          ))}

          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <button onClick={() => addBlock('hero')} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>+ Add Hero Block</button>
            <button onClick={() => addBlock('text')} style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>+ Add Text Block</button>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'right' }}>
            <button onClick={saveDocument} style={{ background: '#b89a5a', color: '#fff', padding: '1rem 2rem', border: 'none', fontSize: '1.1rem', cursor: 'pointer', fontWeight: 'bold' }}>Save Changes</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', color: 'white' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Admin Dashboard</h2>
        <div>
          <span style={{ marginRight: '1rem' }}>{user.email}</span>
          <button onClick={handleLogout} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid #b89a5a', color: '#b89a5a', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>
      
      {message && <div style={{ background: 'green', color: 'white', padding: '1rem', marginBottom: '1rem' }}>{message}</div>}

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '8px' }}>
          <h3>Main Pages</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {pages.map(page => (
              <li key={page.id} style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                <span>{page.title || page.id}</span>
                <button onClick={() => openEditor(page, 'pages')} style={{ padding: '0.25rem 0.75rem', background: '#b89a5a', color: 'white', border: 'none', cursor: 'pointer' }}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
        
        <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '8px' }}>
          <h3>Portfolio (Work)</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {works.map(work => (
              <li key={work.id} style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                <span>{work.title || work.id}</span>
                <button onClick={() => openEditor(work, 'work')} style={{ padding: '0.25rem 0.75rem', background: '#b89a5a', color: 'white', border: 'none', cursor: 'pointer' }}>Edit</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
