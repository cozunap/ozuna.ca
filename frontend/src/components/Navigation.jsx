// src/components/Navigation.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import BehanceIcon from './icons/BehanceIcon';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about-me' },
    { name: 'Work', href: '/work' },
    { name: 'Contact', href: '/contact' }
  ];

  const isHome = location.pathname === '/';
  const isAbout = location.pathname === '/about-me';

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isAbout
          ? 'bg-[#ff1d25] border-b border-red-700/30 shadow-md text-white'
          : isHome
          ? 'bg-transparent border-b border-transparent shadow-none'
          : 'glass-nav bg-[#020202]/90 backdrop-blur-md border-b border-subtle/50'
      }`}
    >
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
            C<span className={isAbout ? 'text-black' : 'text-accent'}>OZUNA</span>
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-5">
          {isAbout ? (
            <>
              <Link
                to="/about-me"
                className="text-sm font-black text-[#020202] uppercase tracking-wider"
              >
                About
              </Link>
              <span className="text-white/60 font-light">|</span>
              <Link
                to="/work"
                className="text-sm font-bold text-white hover:text-black uppercase tracking-wider transition-colors"
              >
                Work
              </Link>

              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
                className="border border-white text-white hover:bg-white hover:text-[#ff1d25] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ml-2"
              >
                Contact Me
              </button>

              <div className="flex items-center pl-3">
                <a
                  href="https://www.behance.net/cozuna"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Carlos Ozuna on Behance"
                  aria-label="Carlos Ozuna on Behance"
                  className="text-white hover:text-[#011437] transition-colors p-1"
                >
                  <BehanceIcon className="w-5 h-5 transition-transform hover:scale-110" />
                </a>
              </div>
            </>
          ) : (
            <>
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

              <div className="flex items-center gap-3 pl-4 border-l border-subtle/60">
                <a
                  href="https://www.behance.net/cozuna"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Carlos Ozuna on Behance"
                  aria-label="Carlos Ozuna on Behance"
                  className={`p-2 rounded-lg border transition-all flex items-center justify-center group ${
                    isHome
                      ? 'text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border-white/15 hover:border-[#0057ff]'
                      : 'text-slate-400 hover:text-white bg-surface border-subtle hover:border-[#0057ff]'
                  }`}
                >
                  <BehanceIcon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </a>
              </div>
            </>
          )}
        </nav>

        {/* Mobile Action Buttons */}
        <div className="flex md:hidden items-center gap-2.5">
          {/* Mobile Behance Logo */}
          <a
            href="https://www.behance.net/cozuna"
            target="_blank"
            rel="noopener noreferrer"
            title="Carlos Ozuna on Behance"
            aria-label="Carlos Ozuna on Behance"
            className={`p-2 rounded-lg border ${
              isAbout
                ? 'text-white bg-white/10 border-white/25'
                : isHome
                ? 'text-white/80 hover:text-white bg-white/5 border-white/15'
                : 'text-slate-400 hover:text-white bg-surface border-subtle'
            }`}
          >
            <BehanceIcon className="w-5 h-5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg border focus:outline-none ${
              isAbout
                ? 'text-white bg-white/10 border-white/25'
                : 'text-slate-300 hover:text-white bg-card border-subtle'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-b px-4 pt-3 pb-6 space-y-3 ${
            isAbout
              ? 'bg-[#ff1d25] border-white/20 text-white'
              : 'bg-card border-subtle text-slate-100'
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-semibold uppercase ${
                isActive(link.href)
                  ? isAbout ? 'text-white bg-white/20' : 'text-accent bg-surface'
                  : isAbout ? 'text-white/85 hover:text-white hover:bg-white/10' : 'text-slate-300 hover:text-white hover:bg-surface'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://www.behance.net/cozuna"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-3 py-2 text-base font-semibold uppercase rounded-md ${
              isAbout ? 'text-white hover:bg-white/10' : 'text-slate-300 hover:text-white hover:bg-surface'
            }`}
          >
            <BehanceIcon className={`w-5 h-5 ${isAbout ? 'text-white' : 'text-accent'}`} />
            <span>Behance Portfolio &rarr;</span>
          </a>
        </div>
      )}
    </header>
  );
}
