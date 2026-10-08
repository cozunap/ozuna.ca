'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, projectTranslations } from './translations.js';

const LanguageContext = createContext({
  lang: 'en',
  setLang: () => {},
  t: translations.en,
  isFr: false,
  getProjectText: () => ({ category: '', description: '' })
});

export const LANGUAGE_COOKIE = 'ozuna_preferred_lang';

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState('en');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // 1. Check user explicit preference stored in localStorage or cookie
    let preferred = null;
    try {
      preferred = localStorage.getItem(LANGUAGE_COOKIE);
    } catch (e) {
      // ignore
    }

    if (!preferred) {
      // 2. Read browser language detection (French or Canadian French)
      // Browsers in Quebec/Canada typically supply 'fr-CA', 'fr', or 'fr-FR'
      if (typeof navigator !== 'undefined') {
        const browserLangs = navigator.languages || [navigator.language || navigator.userLanguage];
        const isFrenchBrowser = browserLangs.some((l) => {
          if (!l) return false;
          const clean = l.toLowerCase();
          return clean.startsWith('fr');
        });

        if (isFrenchBrowser) {
          preferred = 'fr';
        }
      }
    }

    if (preferred === 'fr' || preferred === 'en') {
      setLangState(preferred);
      document.documentElement.lang = preferred === 'fr' ? 'fr-CA' : 'en';
    } else {
      setLangState('en');
      document.documentElement.lang = 'en';
    }

    setIsInitialized(true);
  }, []);

  const setLang = (newLang) => {
    const valid = newLang === 'fr' ? 'fr' : 'en';
    setLangState(valid);
    try {
      localStorage.setItem(LANGUAGE_COOKIE, valid);
      document.cookie = `${LANGUAGE_COOKIE}=${valid}; path=/; max-age=31536000; SameSite=Lax`;
    } catch (e) {
      // ignore
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = valid === 'fr' ? 'fr-CA' : 'en';
    }
  };

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
    <LanguageContext.Provider value={{ lang, setLang, t: currentT, isFr, getProjectText, isInitialized }}>
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
