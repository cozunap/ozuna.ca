// src/admin/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight, AlertCircle, Shield } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState('cmozunap@gmail.com');
  const [password, setPassword] = useState('OzunaMaster2026!');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      localStorage.setItem('ozuna_token', data.token);
      localStorage.setItem('ozuna_user', JSON.stringify(data.user));
      navigate('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dominant flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-card border border-subtle rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20 text-accent">
            <Shield size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black font-heading text-white tracking-tight">
              OZUNA<span className="text-accent">.CA</span>
            </h1>
            <p className="text-xs text-muted uppercase tracking-wider font-semibold">
              Admin & CMS Portal
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-center gap-2">
            <AlertCircle size={18} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Username / Email
            </label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-surface border border-subtle rounded-xl text-white text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="cmozunap@gmail.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-surface border border-subtle rounded-xl text-white text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-accent py-3.5 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-subtle/50 text-center">
          <p className="text-xs text-muted">
            Pre-seeded master credentials: <code className="text-slate-300">cmozunap@gmail.com</code>
          </p>
        </div>
      </div>
    </div>
  );
}
