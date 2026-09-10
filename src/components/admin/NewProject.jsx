import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout.jsx';

export default function NewProject() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    link: '',
    featured: false
  });

  const categories = ['Graphic Design', 'Web Design', 'Catalog', 'Branding'];

  const handleSave = (e) => {
    e.preventDefault();
    alert('Project saved! (Firebase integration pending)');
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
            <textarea className="admin-input" rows="4" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe the project, its features, and what makes it unique"></textarea>
          </div>

          <div>
            <label className="admin-label">Thumbnail Image / Main Cover</label>
            <div style={{ border: '2px dashed var(--admin-border)', borderRadius: '8px', padding: '3rem', textAlign: 'center', backgroundColor: 'var(--admin-input-bg)', cursor: 'pointer', transition: 'border-color 0.2s' }}>
              <span style={{ fontSize: '2rem', display: 'block', marginBottom: '1rem' }}>☁️</span>
              <p style={{ margin: 0, color: 'var(--admin-text-muted)' }}>Click to upload or drag and drop</p>
              <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>Max size: 5MB. Allowed: JPG, PNG, WebP</p>
            </div>
          </div>
          
          <div>
            <label className="admin-label">Interactive Flipbook (PDF)</label>
            <div style={{ border: '2px dashed var(--admin-border)', borderRadius: '8px', padding: '2rem', textAlign: 'center', backgroundColor: 'var(--admin-input-bg)', cursor: 'pointer' }}>
              <p style={{ margin: 0, color: 'var(--admin-text-muted)' }}>Upload PDF (Unlimited Size - Direct to Firebase)</p>
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
            <a href="/admin/dashboard" className="admin-btn-outline" style={{ textDecoration: 'none', padding: '0.75rem 2rem', borderRadius: '6px' }}>Cancel</a>
            <button type="submit" className="admin-btn">Create Project</button>
          </div>

        </form>
      </div>
    </DashboardLayout>
  );
}
