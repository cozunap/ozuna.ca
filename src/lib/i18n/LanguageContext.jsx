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
    let preferred = null;

    // 1. Check cookie first (synced with server middleware detection)
    try {
      const match = document.cookie.match(new RegExp('(^|;\\s*)' + LANGUAGE_COOKIE + '=([^;]*)'));
      if (match && (match[2] === 'fr' || match[2] === 'en')) {
        preferred = match[2];
      }
    } catch (e) {
      // ignore
    }

    // 2. Check localStorage
    if (!preferred) {
      try {
        const stored = localStorage.getItem(LANGUAGE_COOKIE);
        if (stored === 'fr' || stored === 'en') {
          preferred = stored;
        }
      } catch (e) {
        // ignore
      }
    }

    // 3. Read navigator browser language detection (Canadian French / French priority)
    // If the browser primary or preferred language starts with 'fr' (e.g. fr-CA, fr-FR, fr),
    // default directly to FR.
    if (!preferred && typeof navigator !== 'undefined') {
      const browserLangs = navigator.languages && navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language || navigator.userLanguage];

      // Check the user's primary languages
      const isFrenchBrowser = browserLangs.some((l) => {
        if (!l) return false;
        return l.toLowerCase().startsWith('fr');
      });

      if (isFrenchBrowser) {
        preferred = 'fr';
      }
    }

    // Apply resolved language or fallback to English
    const finalLang = preferred === 'fr' ? 'fr' : 'en';
    setLangState(finalLang);

    if (typeof document !== 'undefined') {
      document.documentElement.lang = finalLang === 'fr' ? 'fr-CA' : 'en';
      // Persist so subsequent page navigations are instant
      try {
        localStorage.setItem(LANGUAGE_COOKIE, finalLang);
        document.cookie = `${LANGUAGE_COOKIE}=${finalLang}; path=/; max-age=31536000; SameSite=Lax`;
      } catch (e) {
        // ignore
      }
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
