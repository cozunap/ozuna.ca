import React from 'react';
import DashboardLayout from './DashboardLayout.jsx';

export default function Placeholder({ title, activeTab }) {
  return (
    <DashboardLayout activeTab={activeTab}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ margin: 0 }}>{title}</h2>
      </div>
      <div className="admin-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h3 style={{ color: 'var(--admin-gold)', fontSize: '1.5rem', marginBottom: '1rem' }}>Coming in Phase 2</h3>
        <p style={{ color: 'var(--admin-text-muted)', margin: 0, maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
          This page is a placeholder. It will be fully functional once we connect the Firebase database in the next phase.
        </p>
      </div>
    </DashboardLayout>
  );
}
