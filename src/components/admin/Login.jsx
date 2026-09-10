import React, { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy login for now
    if(email === 'cmozunap@gmail.com' && password === 'c@2094Op#') {
      window.location.href = '/admin/dashboard';
    } else {
      setError('Invalid credentials for preview. Try cmozunap@gmail.com / c@2094Op#');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="admin-card" style={{ width: '100%', maxWidth: '420px', padding: '3rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.5rem', color: 'var(--admin-gold)', margin: '0 0 0.5rem 0' }}>
            <span>Carlos</span> Ozuna
          </h1>
          <p style={{ color: 'var(--admin-text-muted)', margin: 0 }}>Admin Login</p>
        </div>
        
        {error && (
          <div style={{ backgroundColor: 'rgba(255,0,0,0.1)', color: '#ff6b6b', padding: '0.75rem', borderRadius: '6px', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label className="admin-label">Email Address</label>
            <input 
              type="email" 
              className="admin-input" 
              placeholder="cmozunap@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="admin-label">Password</label>
            <input 
              type="password" 
              className="admin-input" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="admin-btn" style={{ width: '100%', marginTop: '0.5rem' }}>
            Sign In
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="/" style={{ color: 'var(--admin-text-muted)', textDecoration: 'none', fontSize: '0.875rem' }}>
            &larr; Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
