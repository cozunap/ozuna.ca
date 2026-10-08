'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, projectTranslations } from './translations.js';

const LanguageContext = createContext({
  lang: 'en',
  t: translations.en,
  isFr: false,
  getProjectText: () => ({ category: '', description: '' })
});

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Clean up any stale cookies that might have forced French during testing
    try {
      document.cookie = 'ozuna_preferred_lang=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      localStorage.removeItem('ozuna_preferred_lang');
    } catch (e) {
      // ignore
    }

    // 100% Strict Primary Browser Language Detection
    // Inspect user's primary languages in ordered preference:
    let detected = 'en';

    if (typeof navigator !== 'undefined') {
      const primaryLang = (
        (navigator.languages && navigator.languages[0]) ||
        navigator.language ||
        navigator.userLanguage ||
        ''
      ).toLowerCase();

      // Only activate French if the user's PRIMARY (top-ranked) language starts with 'fr'
      if (primaryLang.startsWith('fr')) {
        detected = 'fr';
      } else {
        detected = 'en';
      }
    }

    setLang(detected);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = detected === 'fr' ? 'fr-CA' : 'en';
    }

    setIsInitialized(true);
  }, []);

  const currentT = translations[lang] || translations.en;
  const isFr = lang === 'fr';

  const getProjectText = (title, originalCategory, originalDescription) => {
    if (!isFr) {
      return {
        category: originalCategory,
        description: originalDescription
      };
    }

    const frProject = projectTranslations.fr[title];
    return {
      category: frProject?.category || (originalCategory === 'Web Design' ? 'Design Web' : 'Design graphique'),
      description: frProject?.description || originalDescription
    };
  };

  return (
    <LanguageContext.Provider value={{ lang, t: currentT, isFr, getProjectText, isInitialized }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
