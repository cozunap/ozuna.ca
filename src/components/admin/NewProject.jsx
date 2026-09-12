import React, { useState, useRef } from 'react';
import JoditEditor from 'jodit-react';

import DashboardLayout from './DashboardLayout.jsx';
import { supabase } from '../../supabase.js';

export default function NewProject() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    link: '',
    featured: false
  });
  
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const imageInputRef = useRef(null);
  const editorContentRef = useRef("");
  const joditRef = useRef(null);
  const pdfInputRef = useRef(null);

  const categories = ['Graphic Design', 'Web Design', 'Catalog', 'Branding'];

  const editorConfig = React.useMemo(() => ({ theme: 'dark', minHeight: 300, buttons: ['bold', 'italic', 'underline', '|', 'ul', 'ol', '|', 'font', 'fontsize', 'brush', 'paragraph', '|', 'image', 'link', '|', 'align', 'undo', 'redo', 'fullsize'], style: { background: 'var(--admin-input-bg)', color: 'var(--admin-text)' } }), []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let finalDescription = editorContentRef.current;
      if (joditRef.current && joditRef.current.value !== undefined) {
        finalDescription = joditRef.current.value;
      }

      let imageUrl = '';
      let pdfUrl = '';

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `images/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('portfolio')
          .upload(fileName, imageFile, { upsert: true });

        if (error) throw error;
        
        const { data: publicUrlData } = supabase.storage
          .from('portfolio')
          .getPublicUrl(fileName);
          
        imageUrl = publicUrlData.publicUrl;
      }

      if (pdfFile) {
        const fileExt = pdfFile.name.split('.').pop();
        const fileName = `pdfs/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('portfolio')
          .upload(fileName, pdfFile, { upsert: true });

        if (error) throw error;
        
        const { data: publicUrlData } = supabase.storage
          .from('portfolio')
          .getPublicUrl(fileName);
          
        pdfUrl = publicUrlData.publicUrl;
      }

      
const { error } = await supabase
        .from('portfolio_work')
        .insert([{
          title: formData.title,
          category: formData.category,
          description: finalDescription,
          link: formData.link,
          featured: formData.featured,
          image_url: imageUrl,
          pdf_url: pdfUrl
        }]);

      if (error) throw error;

      
      // Trigger Cloudflare Pages Rebuild
      try {
        await fetch('https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/352756e4-f117-4ab1-9f96-9294f927e1d8', {
          method: 'POST',
          mode: 'no-cors'
        });
      } catch (webhookError) {
        console.error('Webhook error:', webhookError);
      }

      alert('¡Proyecto creado y archivos subidos con éxito!');
      window.location.href = '/admin/dashboard';
    } catch (error) {
      console.error('Upload Error:', error);
      alert('Error uploading files: ' + error.message);
    }
    
    setLoading(false);
  };

  return (
    <DashboardLayout activeTab="projects">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>New Project</h2>
      </div>

      <div className="admin-card" style={{ maxWidth: '800px' }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label className="admin-label">Project Title *</label>
              <input type="text" className="admin-input" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div>
              <label className="admin-label">Category</label>
              <select className="admin-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ appearance: 'none' }}>
                <option value="">Select Category</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="admin-label">Description *</label>
            <JoditEditor ref={joditRef} value={formData.description} config={editorConfig} onBlur={val => { editorContentRef.current = val; }} onChange={newContent => { editorContentRef.current = newContent; }} />
          </div>

          <input type="file" ref={imageInputRef} style={{ display: 'none' }} accept="image/png, image/jpeg, image/webp" onChange={e => setImageFile(e.target.files[0])} />
          <input type="file" ref={pdfInputRef} style={{ display: 'none' }} accept="application/pdf" onChange={e => setPdfFile(e.target.files[0])} />

          <div>
            <label className="admin-label">Thumbnail Image / Main Cover</label>
            <div 
              onClick={() => imageInputRef.current.click()}
              style={{ border: imageFile ? '2px solid var(--admin-gold)' : '2px dashed var(--admin-border)', borderRadius: '8px', padding: '3rem', textAlign: 'center', backgroundColor: 'var(--admin-input-bg)', cursor: 'pointer', transition: 'border-color 0.2s' }}
            >
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>{imageFile ? '✅' : '☁️'}</span>
              <p style={{ margin: 0, color: imageFile ? 'var(--admin-gold)' : 'var(--admin-text-muted)' }}>
                {imageFile ? imageFile.name : 'Click to upload or drag and drop'}
              </p>
              {!imageFile && <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>Max size: 50MB. Allowed: JPG, PNG, WebP</p>}
            </div>
          </div>
          
          <div>
            <label className="admin-label">Interactive Flipbook (PDF)</label>
            <div 
              onClick={() => pdfInputRef.current.click()}
              style={{ border: pdfFile ? '2px solid var(--admin-gold)' : '2px dashed var(--admin-border)', borderRadius: '8px', padding: '2rem', textAlign: 'center', backgroundColor: 'var(--admin-input-bg)', cursor: 'pointer' }}
            >
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>{pdfFile ? '📄' : ''}</span>
              <p style={{ margin: 0, color: pdfFile ? 'var(--admin-gold)' : 'var(--admin-text-muted)' }}>
                {pdfFile ? pdfFile.name : 'Upload PDF (Up to 50MB)'}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label className="admin-label">Live Demo URL</label>
              <input type="url" className="admin-input" placeholder="https://example.com" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.8rem' }}>
              <input type="checkbox" id="featured" style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--admin-gold)' }} checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} />
              <label htmlFor="featured" style={{ color: 'var(--admin-text)', cursor: 'pointer' }}>Mark as Featured Project</label>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <a href="/admin/dashboard" className="admin-btn-outline" style={{ textDecoration: 'none', padding: '0.75rem 2rem', borderRadius: '6px', pointerEvents: loading ? 'none' : 'auto' }}>Cancel</a>
            <button type="submit" className="admin-btn" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Subiendo Archivos...' : 'Create Project'}
            </button>
          </div>

        </form>
      </div>
    </DashboardLayout>
  );
}
