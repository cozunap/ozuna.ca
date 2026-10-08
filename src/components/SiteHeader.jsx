'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../lib/i18n/LanguageContext.jsx';

export default function SiteHeader() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // On project detail pages (/work/something), the background is white/light, so we use dark charcoal text.
  // On home (/), work (/work), and about (/about), there is a dark hero banner, so white text is used.
  const isLightPage = pathname && pathname.startsWith('/work/') && pathname !== '/work';

  return (
    <header className={`site-nav-header ${isLightPage ? 'nav-dark-text' : ''} ${isScrolled ? 'nav-is-sticky' : ''}`}>
      <nav className="site-nav-inner">
        {/* LOGO */}
        <a href="/" className="logo" aria-label="Carlos Ozuna Portfolio">
          <span className="logo-first">Carlos</span>
          <span className="logo-last">Ozuna</span>
          <span className="logo-dot">.</span>
        </a>

        {/* DESKTOP NAV LINKS */}
        <div className="nav-desktop-actions">
          <div className="nav-links">
            <a href="/work">{t.nav.work}</a>
            <a href="/about">{t.nav.about}</a>
          </div>
        </div>

        {/* MOBILE ACTIONS (HAMBURGER TOGGLE) */}
        <div className="nav-mobile-actions">
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={t.nav.ariaToggleMenu}
            aria-expanded={mobileMenuOpen}
          >
            <span className={`hamburger-bar ${mobileMenuOpen ? 'bar-open-top' : ''}`} />
            <span className={`hamburger-bar ${mobileMenuOpen ? 'bar-open-mid' : ''}`} />
            <span className={`hamburger-bar ${mobileMenuOpen ? 'bar-open-bot' : ''}`} />
          </button>
        </div>
      </nav>

      {/* MOBILE OVERLAY MENU */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <div className="mobile-nav-links">
            <a 
              href="/work" 
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-nav-link"
            >
              {t.nav.work}
            </a>
            <a 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="mobile-nav-link"
            >
              {t.nav.about}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
