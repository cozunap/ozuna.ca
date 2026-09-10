import React from 'react';
import DashboardLayout from './DashboardLayout.jsx';

export default function Dashboard() {
  const stats = [
    { label: 'Total Projects', value: '18', icon: '💼', color: '#4f46e5' },
    { label: 'Categories', value: '6', icon: '🏷️', color: '#10b981' },
    { label: 'Featured', value: '3', icon: '⭐', color: 'var(--admin-gold)' },
  ];

  const recentProjects = [
    { id: 1, title: 'Degan Tax', category: 'Web Design', featured: true, date: 'Sep 10, 2026' },
    { id: 2, title: 'Business Cards', category: 'Graphic Design', featured: true, date: 'Aug 24, 2026' },
    { id: 3, title: 'Eletto Sport', category: 'Catalog', featured: false, date: 'Aug 27, 2026' },
  ];

  return (
    <DashboardLayout activeTab="dashboard">
      
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {stats.map((stat, i) => (
          <div key={i} className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', color: stat.color }}>
              {stat.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '1.75rem', margin: '0 0 0.25rem 0' }}>{stat.value}</h3>
              <p style={{ color: 'var(--admin-text-muted)', margin: 0, fontSize: '0.875rem' }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        {/* Recent Projects Table */}
        <div className="admin-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ margin: 0 }}>Recent Projects</h3>
            <a href="/admin/projects" className="admin-btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', borderRadius: '4px', textDecoration: 'none' }}>View All</a>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--admin-text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '1rem 0' }}>Title</th>
                <th style={{ padding: '1rem 0' }}>Category</th>
                <th style={{ padding: '1rem 0' }}>Featured</th>
                <th style={{ padding: '1rem 0' }}>Date</th>
                <th style={{ padding: '1rem 0', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentProjects.map(proj => (
                <tr key={proj.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <td style={{ padding: '1rem 0', fontWeight: '500' }}>{proj.title}</td>
                  <td style={{ padding: '1rem 0' }}>
                    <span style={{ backgroundColor: 'rgba(255,255,255,0.1)', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.75rem' }}>{proj.category}</span>
                  </td>
                  <td style={{ padding: '1rem 0', color: proj.featured ? 'var(--admin-gold)' : 'var(--admin-text-muted)' }}>{proj.featured ? '★' : '☆'}</td>
                  <td style={{ padding: '1rem 0', color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>{proj.date}</td>
                  <td style={{ padding: '1rem 0', textAlign: 'right' }}>
                    <button style={{ background: 'transparent', border: 'none', color: 'var(--admin-text-muted)', cursor: 'pointer' }}>✏️</button>
                    <button style={{ background: 'transparent', border: 'none', color: '#ff6b6b', cursor: 'pointer', marginLeft: '0.5rem' }}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="admin-card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ margin: '0 0 1.5rem 0' }}>Quick Actions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a href="/admin/projects/new" className="admin-btn" style={{ textDecoration: 'none' }}>+ New Project</a>
              <button className="admin-btn-outline" style={{ padding: '0.75rem', borderRadius: '6px' }}>🏷️ New Category</button>
              <button className="admin-btn-outline" style={{ padding: '0.75rem', borderRadius: '6px' }}>⚙️ Global Settings</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
