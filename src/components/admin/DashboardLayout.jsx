import React from 'react';

export default function DashboardLayout({ children, activeTab = 'dashboard' }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/admin/dashboard' },
    { id: 'projects', label: 'Projects', icon: '💼', path: '/admin/projects' },
    { id: 'pages', label: 'Pages (Home / About)', icon: '📄', path: '/admin/pages' },
    { id: 'categories', label: 'Categories', icon: '🏷️', path: '/admin/categories' },
    { id: 'profile', label: 'Profile', icon: '👤', path: '/admin/profile' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--admin-bg)' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', backgroundColor: '#081222', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontFamily: '"Playfair Display", serif', color: 'var(--admin-gold)', margin: 0, fontSize: '1.5rem' }}>
            <span>Carlos</span> Ozuna
          </h2>
        </div>
        
        <nav style={{ padding: '1.5rem 0', flex: 1 }}>
          {menuItems.map(item => (
            <a 
              key={item.id}
              href={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.5rem',
                color: activeTab === item.id ? 'var(--admin-gold)' : 'var(--admin-text-muted)',
                backgroundColor: activeTab === item.id ? 'rgba(184, 154, 90, 0.1)' : 'transparent',
                textDecoration: 'none',
                borderLeft: activeTab === item.id ? '3px solid var(--admin-gold)' : '3px solid transparent',
                fontWeight: activeTab === item.id ? '600' : '500',
                transition: 'all 0.2s'
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div style={{ padding: '1.5rem' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--admin-text-muted)', textDecoration: 'none', marginBottom: '1rem' }}>
            <span>🔗</span> View Site
          </a>
          <a href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ff6b6b', textDecoration: 'none' }}>
            <span>🚪</span> Logout
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <header style={{ height: '80px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 2rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
            {menuItems.find(m => m.id === activeTab)?.label || 'Dashboard'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ color: 'var(--admin-text-muted)', fontSize: '0.875rem' }}>Admin</span>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--admin-card)', border: '1px solid var(--admin-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              CO
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <div style={{ padding: '2rem', flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
