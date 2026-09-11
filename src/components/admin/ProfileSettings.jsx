import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout.jsx';

export default function ProfileSettings() {
  const [loading, setLoading] = useState(false);
  
  const handleSave = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('¡Perfil actualizado con éxito!');
    }, 800);
  };

  return (
    <DashboardLayout activeTab="profile">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>Profile Settings</h2>
      </div>

      <div className="admin-card" style={{ maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--admin-border)' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--admin-gold)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 'bold' }}>
            CO
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--admin-text)' }}>Carlos Ozuna</h3>
            <p style={{ margin: 0, color: 'var(--admin-text-muted)' }}>Administrator</p>
          </div>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label className="admin-label">Full Name</label>
            <input type="text" className="admin-input" defaultValue="Carlos Ozuna" required />
          </div>
          
          <div>
            <label className="admin-label">Email Address</label>
            <input type="email" className="admin-input" defaultValue="cmozunap@gmail.com" required />
          </div>

          <div>
            <label className="admin-label">New Password (Leave blank to keep current)</label>
            <input type="password" className="admin-input" placeholder="••••••••" />
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button type="submit" className="admin-btn" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
