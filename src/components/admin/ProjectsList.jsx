import React, { useEffect, useState } from 'react';
import DashboardLayout from './DashboardLayout.jsx';
import { supabase } from '../../supabase';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const { data, error } = await supabase
        .from('portfolio_work')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`¿Estás seguro de que deseas eliminar permanentemente el proyecto "${title}"?`)) return;
    
    setLoading(true);
    const { error } = await supabase.from('portfolio_work').delete().eq('id', id);
    if (error) {
      alert('Error eliminando: ' + error.message);
    } else {
      setProjects(projects.filter(p => p.id !== id));
    }
    setLoading(false);
  };

  return (
    <DashboardLayout activeTab="projects">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Projects Management</h2>
        <a href="/admin/projects/new" className="admin-btn" style={{ textDecoration: 'none' }}>
          + New Project
        </a>
      </div>

      <div className="admin-card">
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--admin-text-muted)' }}>
            <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>📭</span>
            No projects yet. Click "New Project" to add your first catalog.
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--admin-border)' }}>
                <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '500' }}>Project</th>
                <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '500' }}>Category</th>
                <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '500' }}>Date</th>
                <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '500' }}>Assets</th>
                <th style={{ padding: '1rem', color: 'var(--admin-text-muted)', fontWeight: '500', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--admin-border)' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '500', color: 'var(--admin-gold)' }}>{p.title}</div>
                    {p.featured && <span style={{ fontSize: '0.75rem', backgroundColor: 'var(--admin-gold)', color: '#000', padding: '0.1rem 0.4rem', borderRadius: '4px', marginTop: '0.2rem', display: 'inline-block' }}>Featured</span>}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--admin-text-muted)' }}>{p.category}</td>
                  <td style={{ padding: '1rem', color: 'var(--admin-text-muted)' }}>{new Date(p.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {p.image_url && <a href={p.image_url} target="_blank" rel="noreferrer" style={{ color: 'var(--admin-gold)', textDecoration: 'none' }}>🖼️</a>}
                      {p.pdf_url && <a href={p.pdf_url} target="_blank" rel="noreferrer" style={{ color: 'var(--admin-gold)', textDecoration: 'none' }}>📄</a>}
                    </div>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <a href={`/admin/projects/edit?id=${p.id}`} className="admin-btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', textDecoration: 'none' }}>Edit</a>
                      <button onClick={() => handleDelete(p.id, p.title)} className="admin-btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderColor: '#ff4444', color: '#ff4444' }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
