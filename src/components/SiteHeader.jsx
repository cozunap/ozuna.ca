'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../lib/i18n/LanguageContext.jsx';

export default function SiteHeader() {
  const pathname = usePathname();
  const { lang, setLang, t, isFr } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // On project detail pages (/work/something), the background is white/light, so we use dark charcoal text.
  // On home (/), work (/work), and about (/about), there is a dark hero banner, so white text is used.
  const isLightPage = pathname && pathname.startsWith('/work/') && pathname !== '/work';

  const toggleLanguage = () => {
    setLang(isFr ? 'en' : 'fr');
  };

  return (
    <header className={`site-nav-header ${isLightPage ? 'nav-dark-text' : ''}`}>
      <nav className="site-nav-inner">
        {/* LOGO */}
        <a href="/" className="logo" aria-label="Carlos Ozuna Portfolio">
          <span className="logo-first">Carlos</span>
          <span className="logo-last">Ozuna</span>
          <span className="logo-dot">.</span>
        </a>

        {/* DESKTOP NAV LINKS & LANGUAGE TOGGLE */}
        <div className="nav-desktop-actions">
          <div className="nav-links">
            <a href="/work">{t.nav.work}</a>
            <a href="/about">{t.nav.about}</a>
          </div>

          {/* ELEGANT CANADIAN FRENCH / ENGLISH TOGGLE */}
          <div className="lang-switcher-wrap">
            <button
              type="button"
              onClick={toggleLanguage}
              className={`lang-switch-btn ${isLightPage ? 'lang-switch-dark' : 'lang-switch-light'}`}
              aria-label={t.nav.ariaToggleLang}
              title={isFr ? 'English' : 'Français canadien'}
            >
              <span className={`lang-pill ${!isFr ? 'active' : ''}`}>EN</span>
              <span className="lang-divider">/</span>
              <span className={`lang-pill ${isFr ? 'active' : ''}`}>FR</span>
            </button>
          </div>
        </div>

        {/* MOBILE ACTIONS: LANGUAGE PILL + HAMBURGER */}
        <div className="nav-mobile-actions">
          <button
            type="button"
            onClick={toggleLanguage}
            className={`lang-switch-btn ${isLightPage ? 'lang-switch-dark' : 'lang-switch-light'}`}
            aria-label={t.nav.ariaToggleLang}
          >
            <span className={`lang-pill ${!isFr ? 'active' : ''}`}>EN</span>
            <span className="lang-divider">/</span>
            <span className={`lang-pill ${isFr ? 'active' : ''}`}>FR</span>
          </button>

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
