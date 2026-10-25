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
  const isWork = location.pathname.startsWith('/work');
  const isRedHeader = isAbout || isWork;

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isRedHeader
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
            C<span className={isRedHeader ? 'text-black' : 'text-accent'}>OZUNA</span>
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-5 font-raleway">
          {isRedHeader ? (
            <>
              <Link
                to="/about-me"
                className={`text-[14px] uppercase tracking-[0.5px] transition-colors ${
                  isAbout
                    ? 'font-black text-[#020202]'
                    : 'font-extrabold text-white hover:text-black'
                }`}
              >
                About
              </Link>
              <span className="text-white/60 font-light">|</span>
              <Link
                to="/work"
                className={`text-[14px] uppercase tracking-[0.5px] transition-colors ${
                  isWork
                    ? 'font-black text-[#020202]'
                    : 'font-extrabold text-white hover:text-black'
                }`}
              >
                Work
              </Link>

              {/* Authentic Contact Me Button on Red Header */}
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
                className="ml-2 px-4 py-2 border border-white text-white hover:bg-white hover:text-[#ff1d25] font-raleway font-bold text-xs uppercase tracking-wider rounded transition-colors focus:outline-none cursor-pointer"
              >
                Contact Me
              </button>

              <div className="flex items-center pl-2">
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
              <Link
                to="/about-me"
                className={`text-[14px] font-extrabold uppercase tracking-[0.5px] transition-colors ${
                  isActive('/about-me')
                    ? 'text-accent'
                    : 'text-white hover:text-accent'
                }`}
              >
                About
              </Link>
              <Link
                to="/work"
                className={`text-[14px] font-extrabold uppercase tracking-[0.5px] transition-colors ${
                  isActive('/work')
                    ? 'text-accent'
                    : 'text-white hover:text-accent'
                }`}
              >
                Work
              </Link>

              {/* Contact Me Button on Home/Transparent Header */}
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
                className="ml-2 px-4 py-2 border border-white/80 hover:border-white text-white hover:bg-white hover:text-black font-raleway font-bold text-xs uppercase tracking-wider rounded transition-colors focus:outline-none cursor-pointer"
              >
                Contact Me
              </button>

              <div className="flex items-center pl-2">
                <a
                  href="https://www.behance.net/cozuna"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Carlos Ozuna on Behance"
                  aria-label="Carlos Ozuna on Behance"
                  className="text-white hover:text-accent transition-colors p-1"
                >
                  <BehanceIcon className="w-5 h-5 transition-transform hover:scale-110" />
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
              isRedHeader
                ? 'text-white bg-white/10 border-white/25'
                : 'text-white/80 hover:text-white bg-white/5 border-white/15'
            }`}
          >
            <BehanceIcon className="w-5 h-5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-lg border focus:outline-none ${
              isRedHeader
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
          className={`md:hidden border-b px-4 pt-3 pb-6 space-y-3 font-raleway ${
            isRedHeader
              ? 'bg-[#ff1d25] border-white/20 text-white'
              : 'bg-[#020202] border-white/10 text-white'
          }`}
        >
          <Link
            to="/about-me"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-[14px] font-extrabold uppercase tracking-[0.5px] ${
              isActive('/about-me')
                ? isRedHeader ? 'text-black bg-white/20' : 'text-accent'
                : isRedHeader ? 'text-white hover:text-black' : 'text-slate-200 hover:text-white'
            }`}
          >
            About
          </Link>
          <Link
            to="/work"
            onClick={() => setMobileMenuOpen(false)}
            className={`block px-3 py-2 rounded-md text-[14px] font-extrabold uppercase tracking-[0.5px] ${
              isActive('/work')
                ? isRedHeader ? 'text-black bg-white/20' : 'text-accent'
                : isRedHeader ? 'text-white hover:text-black' : 'text-slate-200 hover:text-white'
            }`}
          >
            Work
          </Link>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              window.dispatchEvent(new CustomEvent('open-contact-modal'));
            }}
            className={`w-full text-left block px-3 py-2 rounded-md text-[14px] font-extrabold uppercase tracking-[0.5px] ${
              isRedHeader ? 'text-white hover:text-black hover:bg-white/10' : 'text-slate-200 hover:text-white'
            }`}
          >
            Contact Me
          </button>
          <a
            href="https://www.behance.net/cozuna"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-3 px-3 py-2 text-[14px] font-extrabold uppercase tracking-[0.5px] rounded-md ${
              isRedHeader ? 'text-white hover:text-black' : 'text-slate-200 hover:text-white'
            }`}
          >
            <BehanceIcon className={`w-5 h-5 ${isRedHeader ? 'text-white' : 'text-accent'}`} />
            <span>Behance Portfolio &rarr;</span>
          </a>
        </div>
      )}
    </header>
  );
}
