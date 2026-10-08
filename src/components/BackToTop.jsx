'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '../lib/i18n/LanguageContext.jsx';

export default function BackToTop() {
  const { isFr } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop || window.scrollY;
      if (scrolled > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisible, { passive: true });
    toggleVisible();
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="back-to-top-btn"
      aria-label={isFr ? "Retour en haut" : "Back to top"}
      title={isFr ? "Haut de page" : "Back to top"}
    >
      <span className="back-to-top-icon">↑</span>
    </button>
  );
}
