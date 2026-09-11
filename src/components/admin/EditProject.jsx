import React, { useState, useEffect, useRef } from 'react';
import JoditEditor from 'jodit-react';

import DashboardLayout from './DashboardLayout.jsx';
import { supabase } from '../../supabase.js';

export default function EditProject() {
  const [projectId, setProjectId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    link: '',
    featured: false
  });
  
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [existingPdfUrl, setExistingPdfUrl] = useState('');
  
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const imageInputRef = useRef(null);
  const pdfInputRef = useRef(null);

  const categories = ['Graphic Design', 'Web Design', 'Catalog', 'Branding'];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) {
      window.location.href = '/admin/projects';
      return;
    }
    setProjectId(id);

    async function fetchProject() {
      const { data, error } = await supabase
        .from('portfolio_work')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        alert('Project not found');
        window.location.href = '/admin/projects';
      } else {
        setFormData({
          title: data.title || '',
          category: data.category || '',
          description: data.description || '',
          link: data.link || '',
          featured: data.featured || false
        });
        setExistingImageUrl(data.image_url || '');
        setExistingPdfUrl(data.pdf_url || '');
      }
      setLoading(false);
    }
    
    fetchProject();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      let imageUrl = existingImageUrl;
      let pdfUrl = existingPdfUrl;

      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `images/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { error } = await supabase.storage.from('portfolio').upload(fileName, imageFile, { upsert: true });
        if (error) throw error;
        const { data: publicUrlData } = supabase.storage.from('portfolio').getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
      }

      if (pdfFile) {
        const fileExt = pdfFile.name.split('.').pop();
        const fileName = `pdfs/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const { error } = await supabase.storage.from('portfolio').upload(fileName, pdfFile, { upsert: true });
        if (error) throw error;
        const { data: publicUrlData } = supabase.storage.from('portfolio').getPublicUrl(fileName);
        pdfUrl = publicUrlData.publicUrl;
      }

      const { error } = await supabase
        .from('portfolio_work')
        .update({
          title: formData.title,
          category: formData.category,
          description: formData.description,
          link: formData.link,
          featured: formData.featured,
          image_url: imageUrl,
          pdf_url: pdfUrl
        })
        .eq('id', projectId);

      if (error) throw error;

      alert('¡Proyecto actualizado con éxito!');
      window.location.href = '/admin/projects';
    } catch (error) {
      console.error('Update Error:', error);
      alert('Error updating project: ' + error.message);
    }
    
    setSaving(false);
  };

  if (loading) {
    return (
      <DashboardLayout activeTab="projects">
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeTab="projects">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Edit Project: {formData.title}</h2>
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
            <JoditEditor value={formData.description} config={{ theme: 'dark', minHeight: 300, buttons: ['bold', 'italic', 'underline', '|', 'ul', 'ol', '|', 'font', 'fontsize', 'brush', 'paragraph', '|', 'image', 'link', '|', 'align', 'undo', 'redo', 'fullsize'], style: { background: 'var(--admin-input-bg)', color: 'var(--admin-text)' } }} onBlur={val => setFormData({...formData, description: val})} onChange={val => setFormData({...formData, description: val})} />
          </div>

          <input type="file" ref={imageInputRef} style={{ display: 'none' }} accept="image/png, image/jpeg, image/webp" onChange={e => setImageFile(e.target.files[0])} />
          <input type="file" ref={pdfInputRef} style={{ display: 'none' }} accept="application/pdf" onChange={e => setPdfFile(e.target.files[0])} />

          <div>
            <label className="admin-label">Thumbnail Image / Main Cover</label>
            <div 
              onClick={() => imageInputRef.current.click()}
              style={{ border: imageFile ? '2px solid var(--admin-gold)' : '2px dashed var(--admin-border)', borderRadius: '8px', padding: '3rem', textAlign: 'center', backgroundColor: 'var(--admin-input-bg)', cursor: 'pointer', transition: 'border-color 0.2s' }}
            >
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>{imageFile ? '✅' : '🖼️'}</span>
              <p style={{ margin: 0, color: imageFile ? 'var(--admin-gold)' : 'var(--admin-text-muted)' }}>
                {imageFile ? imageFile.name : (existingImageUrl ? 'Upload new image to replace existing one' : 'Click to upload or drag and drop')}
              </p>
            </div>
            {existingImageUrl && !imageFile && (
              <div style={{ marginTop: '1rem' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)', marginBottom: '0.5rem' }}>Current Image:</p>
                <img src={existingImageUrl} alt="Current" style={{ maxHeight: '100px', borderRadius: '4px' }} />
              </div>
            )}
          </div>
          
          <div>
            <label className="admin-label">Interactive Flipbook (PDF)</label>
            <div 
              onClick={() => pdfInputRef.current.click()}
              style={{ border: pdfFile ? '2px solid var(--admin-gold)' : '2px dashed var(--admin-border)', borderRadius: '8px', padding: '2rem', textAlign: 'center', backgroundColor: 'var(--admin-input-bg)', cursor: 'pointer' }}
            >
              <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>{pdfFile ? '📄' : '📁'}</span>
              <p style={{ margin: 0, color: pdfFile ? 'var(--admin-gold)' : 'var(--admin-text-muted)' }}>
                {pdfFile ? pdfFile.name : (existingPdfUrl ? 'Upload new PDF to replace existing one' : 'Upload PDF')}
              </p>
            </div>
            {existingPdfUrl && !pdfFile && (
              <div style={{ marginTop: '1rem' }}>
                <a href={existingPdfUrl} target="_blank" rel="noreferrer" style={{ fontSize: '0.9rem', color: 'var(--admin-gold)', textDecoration: 'none' }}>View Current PDF</a>
              </div>
            )}
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
            <a href="/admin/projects" className="admin-btn-outline" style={{ textDecoration: 'none', padding: '0.75rem 2rem', borderRadius: '6px', pointerEvents: saving ? 'none' : 'auto' }}>Cancel</a>
            <button type="submit" className="admin-btn" disabled={saving} style={{ opacity: saving ? 0.7 : 1 }}>
              {saving ? 'Guardando...' : 'Save Changes'}
            </button>
          </div>

        </form>
      </div>
    </DashboardLayout>
  );
}
