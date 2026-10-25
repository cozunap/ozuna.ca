// src/components/Navigation.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about-me' },
    { name: 'Work', href: '/work' },
    { name: 'Contact', href: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src="/images/cozuna-red-logo.svg"
            alt="Carlos Ozuna Red Logo"
            className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'inline-block';
            }}
          />
          <span className="hidden text-2xl font-black tracking-tight text-white font-heading">
            C<span className="text-accent">OZUNA</span>
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
                isActive(link.href)
                  ? 'text-accent border-b-2 border-accent pb-1'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <a
            href="https://www.behance.net/cozuna"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold uppercase tracking-wider text-slate-300 hover:text-white flex items-center gap-1"
          >
            Behance <ExternalLink size={14} />
          </a>

          <Link
            to="/contact"
            className="btn-accent px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest"
          >
            Contact Me
          </Link>

          <Link
            to="/admin"
            title="CMS Admin Dashboard"
            className="text-slate-400 hover:text-white p-2 rounded-lg bg-surface border border-subtle hover:border-accent transition-all"
          >
            <ShieldCheck size={18} />
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            to="/admin"
            className="text-slate-400 p-2 rounded-lg bg-surface border border-subtle"
          >
            <ShieldCheck size={18} />
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white bg-card border border-subtle focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-subtle px-4 pt-3 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-semibold uppercase ${
                isActive(link.href)
                  ? 'text-accent bg-surface'
                  : 'text-slate-300 hover:text-white hover:bg-surface'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://www.behance.net/cozuna"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 text-slate-300 hover:text-white text-base font-semibold uppercase"
          >
            Behance &rarr;
          </a>
          <Link
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center btn-accent py-3 rounded-xl font-bold uppercase tracking-wider text-sm mt-4"
          >
            Contact Me
          </Link>
        </div>
      )}
    </header>
  );
}
