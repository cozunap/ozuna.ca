'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

import DashboardLayout from './DashboardLayout.jsx';
import { supabase } from '../../supabase.js';

export default function EditProject() {
  const [projectId, setProjectId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Graphic Design',
    description: '',
    link: '',
    featured: false
  });
  
  const [projectType, setProjectType] = useState('standard');
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [existingPdfUrl, setExistingPdfUrl] = useState('');
  const [existingPdfUrls, setExistingPdfUrls] = useState([]);
  const [existingGalleryUrls, setExistingGalleryUrls] = useState([]);
  
  const [imageFile, setImageFile] = useState(null);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  
  const imageInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const editorContentRef = useRef("");
  const joditRef = useRef(null);
  const pdfInputRef = useRef(null);

  const categories = ['Graphic Design', 'Web Design'];

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
        window.location.href = '/admin/projects';
      } else {
        let desc = data.description || '';
        let galleryImgs = [];
        let pdfList = [];

        // Check if description has gallery or pdfs JSON
        try {
          if (desc && (desc.trim().startsWith('{') || desc.trim().startsWith('['))) {
            const parsed = JSON.parse(desc);
            if (parsed.gallery && Array.isArray(parsed.gallery)) {
              galleryImgs = parsed.gallery;
            }
            if (parsed.pdfs && Array.isArray(parsed.pdfs)) {
              pdfList = parsed.pdfs;
            }
            if (parsed.text !== undefined) {
              desc = parsed.text;
            } else if (Array.isArray(parsed)) {
              galleryImgs = parsed;
              desc = '';
            }
          }
        } catch (e) {
          // Normal HTML description
        }

        // Also check data.pdf_url
        if (data.pdf_url) {
          if (data.pdf_url.startsWith('[') || data.pdf_url.includes(',')) {
            try {
              const parsedPdfs = JSON.parse(data.pdf_url);
              if (Array.isArray(parsedPdfs)) {
                pdfList = [...new Set([...pdfList, ...parsedPdfs])];
              }
            } catch {
              const split = data.pdf_url.split(',').map(s => s.trim()).filter(Boolean);
              pdfList = [...new Set([...pdfList, ...split])];
            }
          } else if (!pdfList.includes(data.pdf_url)) {
            pdfList.unshift(data.pdf_url);
          }
        }

        if (pdfList.length > 0 || data.pdf_url) {
          setProjectType('pdf');
        } else if (galleryImgs.length > 0) {
          setProjectType(data.category === 'Web Design' ? 'standard' : 'gallery');
        }

        editorContentRef.current = desc;
        setFormData({
          title: data.title || '',
          category: data.category === 'Web Design' ? 'Web Design' : 'Graphic Design',
          description: desc,
          link: data.link || '',
          featured: data.featured || false
        });
        setExistingImageUrl(data.image_url || '');
        setExistingPdfUrl(pdfList[0] || data.pdf_url || '');
        setExistingPdfUrls(pdfList);
        setExistingGalleryUrls(galleryImgs);
      }
      setLoading(false);
    }
    
    fetchProject();
  }, []);

  const editorConfig = useMemo(() => ({
    theme: 'dark',
    minHeight: 250,
    buttons: ['bold', 'italic', 'underline', '|', 'ul', 'ol', '|', 'font', 'fontsize', 'brush', 'paragraph', '|', 'image', 'link', '|', 'align', 'undo', 'redo'],
    style: { background: 'var(--admin-input-bg)', color: 'var(--admin-text)' }
  }), []);

  const handleGallerySelect = (e) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setGalleryFiles(prev => [...prev, ...selected]);
    }
  };

  const removeNewGalleryFile = (index) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingGalleryUrl = (index) => {
    setExistingGalleryUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handlePdfSelect = (e) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setPdfFiles(prev => [...prev, ...selected]);
    }
  };

  const removeNewPdfFile = (index) => {
    setPdfFiles(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingPdfUrl = (index) => {
    setExistingPdfUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setUploadProgress('Guardando cambios...');
    
    try {
      let finalDescription = editorContentRef.current;
      if (joditRef.current && joditRef.current.value !== undefined) {
        finalDescription = joditRef.current.value;
      }

      let imageUrl = existingImageUrl;

      if (imageFile) {
        setUploadProgress('Subiendo portada principal...');
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `images/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        const { error } = await supabase.storage.from('portfolio').upload(fileName, imageFile, { upsert: true });
        if (error) throw error;
        const { data: publicUrlData } = supabase.storage.from('portfolio').getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
      }

      // Upload newly added PDF files
      let finalPdfUrls = [...existingPdfUrls];
      if (pdfFiles.length > 0) {
        for (let i = 0; i < pdfFiles.length; i++) {
          const file = pdfFiles[i];
          setUploadProgress(`Subiendo catálogo PDF (${i + 1}/${pdfFiles.length})...`);
          const fileExt = file.name.split('.').pop();
          const fileName = `pdfs/${Date.now()}_${i}_${Math.random().toString(36).substring(7)}.${fileExt}`;
          const { error } = await supabase.storage.from('portfolio').upload(fileName, file, { upsert: true });
          if (error) throw error;
          const { data: publicUrlData } = supabase.storage.from('portfolio').getPublicUrl(fileName);
          finalPdfUrls.push(publicUrlData.publicUrl);
        }
      }

      // Upload newly added gallery files (applicable to Web Design screens & Multi-Image galleries)
      let finalGalleryUrls = [...existingGalleryUrls];
      if (galleryFiles.length > 0) {
        for (let i = 0; i < galleryFiles.length; i++) {
          const file = galleryFiles[i];
          setUploadProgress(`Subiendo imágenes (${i + 1}/${galleryFiles.length})...`);
          const fileExt = file.name.split('.').pop();
          const fileName = `gallery/${Date.now()}_${i}_${Math.random().toString(36).substring(7)}.${fileExt}`;
          
          const { error } = await supabase.storage.from('portfolio').upload(fileName, file, { upsert: true });
          if (error) throw error;
          const { data: pUrl } = supabase.storage.from('portfolio').getPublicUrl(fileName);
          finalGalleryUrls.push(pUrl.publicUrl);
        }
      }

      // Structure JSON payload if we have multiple gallery items or multiple pdfs
      if (finalGalleryUrls.length > 0 || finalPdfUrls.length > 1) {
        const payload = {
          text: finalDescription,
          gallery: finalGalleryUrls,
          pdfs: finalPdfUrls
        };
        finalDescription = JSON.stringify(payload);
        if (!imageUrl && finalGalleryUrls.length > 0) {
          imageUrl = finalGalleryUrls[0];
        }
      }

      const primaryPdfUrl = finalPdfUrls.length > 0 ? finalPdfUrls[0] : '';

      setUploadProgress('Actualizando en base de datos...');
      const { error } = await supabase
        .from('portfolio_work')
        .update({
          title: formData.title,
          category: formData.category,
          description: finalDescription,
          link: formData.link,
          featured: formData.featured,
          image_url: imageUrl,
          pdf_url: primaryPdfUrl
        })
        .eq('id', projectId);

      if (error) throw error;


      window.location.href = '/admin/projects';
    } catch (error) {
      console.error('Update Error:', error);
      alert('Error updating project: ' + error.message);
    } finally {
      setSaving(false);
      setUploadProgress('');
    }
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
        <div>
          <h2 style={{ margin: 0 }}>Edit Project: {formData.title}</h2>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--admin-text-muted)', fontSize: '0.9rem' }}>
            Actualiza contenido, enlaces de web, catálogo PDF o fotos de la galería.
          </p>
        </div>
      </div>

      <div className="admin-card" style={{ maxWidth: '850px' }}>
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }}>
            <div>
              <label className="admin-label">Project Title *</label>
              <input type="text" className="admin-input" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            </div>
            <div>
              <label className="admin-label">Category *</label>
              <select className="admin-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ appearance: 'none', cursor: 'pointer' }}>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* PROJECT TYPE SELECTOR */}
          <div>
            <label className="admin-label">Project Display Format</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '0.5rem' }}>
              <div 
                onClick={() => setProjectType('standard')}
                style={{
                  border: projectType === 'standard' ? '2px solid var(--admin-gold)' : '1px solid var(--admin-border)',
                  background: projectType === 'standard' ? 'rgba(212,175,55,0.08)' : 'var(--admin-input-bg)',
                  padding: '1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.25rem' }}>💻</span>
                <strong style={{ fontSize: '0.9rem', color: 'var(--admin-text)' }}>Standard / Web Design</strong>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>Cover image + Live Website Link</p>
              </div>

              <div 
                onClick={() => setProjectType('gallery')}
                style={{
                  border: projectType === 'gallery' ? '2px solid var(--admin-gold)' : '1px solid var(--admin-border)',
                  background: projectType === 'gallery' ? 'rgba(212,175,55,0.08)' : 'var(--admin-input-bg)',
                  padding: '1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.25rem' }}>🖼️</span>
                <strong style={{ fontSize: '0.9rem', color: 'var(--admin-text)' }}>Multi-Image Gallery</strong>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>Business Cards, Flyers, Postcards</p>
              </div>

              <div 
                onClick={() => setProjectType('pdf')}
                style={{
                  border: projectType === 'pdf' ? '2px solid var(--admin-gold)' : '1px solid var(--admin-border)',
                  background: projectType === 'pdf' ? 'rgba(212,175,55,0.08)' : 'var(--admin-input-bg)',
                  padding: '1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  textAlign: 'center'
                }}
              >
                <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.25rem' }}>📖</span>
                <strong style={{ fontSize: '0.9rem', color: 'var(--admin-text)' }}>Catalog / Flipbook</strong>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>Editorial PDF booklet with interactive reader</p>
              </div>
            </div>
          </div>

          <div>
            <label className="admin-label">Description</label>
            <JoditEditor ref={joditRef} value={formData.description} config={editorConfig} onBlur={val => { editorContentRef.current = val; }} onChange={newContent => { editorContentRef.current = newContent; }} />
          </div>

          {(formData.category === 'Web Design' || projectType === 'standard' || formData.link) && (
            <div>
              <label className="admin-label">Live Website URL (creates &quot;GO TO WEBSITE&quot; button)</label>
              <input type="url" className="admin-input" placeholder="https://example.com" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
            </div>
          )}

          <input type="file" ref={imageInputRef} style={{ display: 'none' }} accept="image/png, image/jpeg, image/webp" onChange={e => setImageFile(e.target.files[0])} />
          <input type="file" ref={pdfInputRef} style={{ display: 'none' }} accept="application/pdf" onChange={e => setPdfFile(e.target.files[0])} />
          <input type="file" ref={galleryInputRef} style={{ display: 'none' }} accept="image/png, image/jpeg, image/webp" multiple onChange={handleGallerySelect} />

          {/* MAIN COVER IMAGE */}
          <div>
            <label className="admin-label">Thumbnail Image / Main Cover</label>
            <div 
              onClick={() => imageInputRef.current.click()}
              style={{ border: imageFile ? '2px solid var(--admin-gold)' : '2px dashed var(--admin-border)', borderRadius: '8px', padding: '2.5rem', textAlign: 'center', backgroundColor: 'var(--admin-input-bg)', cursor: 'pointer', transition: 'border-color 0.2s' }}
            >
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.5rem' }}>{imageFile ? '✅' : '🖼️'}</span>
              <p style={{ margin: 0, color: imageFile ? 'var(--admin-gold)' : 'var(--admin-text-muted)' }}>
                {imageFile ? imageFile.name : (existingImageUrl ? 'Upload new image to replace cover' : 'Click to upload main cover image')}
              </p>
            </div>
            {existingImageUrl && !imageFile && (
              <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img src={existingImageUrl} alt="Current Cover" style={{ maxHeight: '70px', borderRadius: '4px', border: '1px solid var(--admin-border)' }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Current active cover</span>
              </div>
            )}
          </div>

          {/* MULTI-PAGE / MULTI-IMAGE GALLERY MANAGEMENT (Works for both Web Design screens & Multi-Image galleries) */}
          {(projectType === 'gallery' || projectType === 'standard' || formData.category === 'Web Design' || existingGalleryUrls.length > 0) && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div>
                  <label className="admin-label" style={{ margin: 0 }}>
                    {formData.category === 'Web Design' || projectType === 'standard' 
                      ? `Website Pages & UI Screens (${existingGalleryUrls.length} existing + ${galleryFiles.length} new)` 
                      : `Gallery Items (${existingGalleryUrls.length} existing + ${galleryFiles.length} new)`}
                  </label>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>
                    {formData.category === 'Web Design' || projectType === 'standard' 
                      ? 'Upload multiple screenshots or mockup pages of this website (Homepage, Services, About, Checkout, etc.)' 
                      : 'Upload multiple images at once (business cards, flyers, branding items)'}
                  </p>
                </div>
                <button 
                  type="button" 
                  onClick={() => galleryInputRef.current.click()}
                  className="admin-btn-outline"
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                >
                  + Add Images
                </button>
              </div>

              {/* EMPTY STATE UPLOAD BOX */}
              {existingGalleryUrls.length === 0 && galleryFiles.length === 0 && (
                <div 
                  onClick={() => galleryInputRef.current.click()}
                  style={{ border: '2px dashed var(--admin-border)', borderRadius: '8px', padding: '1.75rem', textAlign: 'center', backgroundColor: 'var(--admin-input-bg)', cursor: 'pointer' }}
                >
                  <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.25rem' }}>🖥️</span>
                  <p style={{ margin: 0, fontWeight: 500, color: 'var(--admin-text)', fontSize: '0.85rem' }}>
                    Click to add website pages or gallery images
                  </p>
                </div>
              )}

              {/* EXISTING GALLERY IMAGES */}
              {existingGalleryUrls.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.75rem', marginBottom: '1rem', marginTop: '0.5rem' }}>
                  {existingGalleryUrls.map((url, idx) => (
                    <div key={idx} style={{ position: 'relative', border: '1px solid var(--admin-border)', borderRadius: '6px', overflow: 'hidden', background: '#111' }}>
                      <img src={url} alt={`Screen/item ${idx + 1}`} style={{ width: '100%', height: '70px', objectFit: 'cover', display: 'block' }} />
                      <div style={{ padding: '0.2rem 0.4rem', fontSize: '0.65rem', color: '#94a3b8', background: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Screen {idx + 1}
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeExistingGalleryUrl(idx)}
                        style={{ position: 'absolute', top: '2px', right: '2px', background: 'rgba(231,76,60,0.9)', color: '#fff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', fontSize: '0.7rem', cursor: 'pointer', lineHeight: '20px', textAlign: 'center', padding: 0 }}
                        title="Delete screen"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* NEW UPLOAD SELECTED */}
              {galleryFiles.length > 0 && (
                <div style={{ borderTop: '1px dashed var(--admin-border)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--admin-gold)', marginBottom: '0.5rem' }}>New images to be uploaded:</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '0.75rem' }}>
                    {galleryFiles.map((file, idx) => (
                      <div key={idx} style={{ position: 'relative', border: '1px solid var(--admin-gold)', borderRadius: '6px', padding: '0.5rem', background: '#222', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.7rem', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', color: 'var(--admin-text)' }}>
                          {file.name}
                        </span>
                        <button 
                          type="button" 
                          onClick={() => removeNewGalleryFile(idx)}
                          style={{ marginTop: '0.25rem', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.65rem', padding: '0.2rem 0.4rem', cursor: 'pointer' }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* MULTI-PDF CATALOG MANAGEMENT */}
          {(projectType === 'pdf' || existingPdfUrls.length > 0 || existingPdfUrl) && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div>
                  <label className="admin-label" style={{ margin: 0 }}>
                    Catalog / Flipbook PDF Documents ({existingPdfUrls.length} existing + {pdfFiles.length} new)
                  </label>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>
                    Upload one or multiple PDF booklets/catalogs (Volume 1, Volume 2, parts, brochures)
                  </p>
                </div>
                <button 
                  type="button" 
                  onClick={() => pdfInputRef.current.click()}
                  className="admin-btn-outline"
                  style={{ fontSize: '0.8rem', padding: '0.4rem 0.8rem' }}
                >
                  + Add PDF Document
                </button>
              </div>

              <input type="file" ref={pdfInputRef} style={{ display: 'none' }} accept="application/pdf" multiple onChange={handlePdfSelect} />

              <div 
                onClick={() => pdfInputRef.current.click()}
                style={{ border: pdfFiles.length > 0 ? '2px solid var(--admin-gold)' : '2px dashed var(--admin-border)', borderRadius: '8px', padding: '2rem', textAlign: 'center', backgroundColor: 'var(--admin-input-bg)', cursor: 'pointer' }}
              >
                <span style={{ fontSize: '1.75rem', display: 'block', marginBottom: '0.5rem' }}>📖</span>
                <p style={{ margin: 0, fontWeight: 500, color: 'var(--admin-text)', fontSize: '0.9rem' }}>
                  Click to select PDF document(s) (supports multiple PDFs)
                </p>
              </div>

              {/* EXISTING PDF LIST */}
              {existingPdfUrls.length > 0 && (
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>Active PDF documents:</span>
                  {existingPdfUrls.map((url, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--admin-input-bg)', padding: '0.6rem 1rem', borderRadius: '6px', border: '1px solid var(--admin-border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '1.1rem' }}>📄</span>
                        <a href={url} target="_blank" rel="noreferrer" style={{ fontSize: '0.85rem', color: 'var(--admin-gold)', textDecoration: 'none' }}>
                          PDF Document {idx + 1} ↗
                        </a>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => removeExistingPdfUrl(idx)}
                        style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.7rem', padding: '0.2rem 0.5rem', cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* NEW PDF FILES SELECTED */}
              {pdfFiles.length > 0 && (
                <div style={{ borderTop: '1px dashed var(--admin-border)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--admin-gold)', marginBottom: '0.5rem' }}>New PDF documents to be uploaded:</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {pdfFiles.map((file, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#222', padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid var(--admin-gold)' }}>
                        <span style={{ fontSize: '0.8rem', color: 'var(--admin-text)' }}>📄 {file.name}</span>
                        <button 
                          type="button" 
                          onClick={() => removeNewPdfFile(idx)}
                          style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.7rem', padding: '0.2rem 0.5rem', cursor: 'pointer' }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <input type="checkbox" id="featured" style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--admin-gold)', cursor: 'pointer' }} checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} />
            <label htmlFor="featured" style={{ color: 'var(--admin-text)', cursor: 'pointer', fontSize: '0.95rem' }}>Mark as Featured Project</label>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
            <a href="/admin/projects" className="admin-btn-outline" style={{ textDecoration: 'none', padding: '0.75rem 2rem', borderRadius: '6px', pointerEvents: saving ? 'none' : 'auto' }}>Cancel</a>
            <button type="submit" className="admin-btn" disabled={saving} style={{ opacity: saving ? 0.7 : 1 }}>
              {saving ? (uploadProgress || 'Saving Changes...') : 'Save Changes'}
            </button>
            {saving && (
              <span style={{ fontSize: '0.85rem', color: 'var(--admin-gold)' }}>
                {uploadProgress}
              </span>
            )}
          </div>

        </form>
      </div>
    </DashboardLayout>
  );
}
