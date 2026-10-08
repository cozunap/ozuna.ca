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
    // 100% Automatic Browser Language Detection Technology
    // No language selector in browser UI.
    let detected = 'en';

    if (typeof navigator !== 'undefined') {
      const browserLangs = (navigator.languages && navigator.languages.length > 0)
        ? navigator.languages
        : [navigator.language || navigator.userLanguage];

      const isFrenchBrowser = browserLangs.some((l) => {
        if (!l) return false;
        return l.toLowerCase().startsWith('fr');
      });

      if (isFrenchBrowser) {
        detected = 'fr';
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
