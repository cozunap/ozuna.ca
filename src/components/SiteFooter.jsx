'use client';

import React from 'react';
import { useLanguage } from '../lib/i18n/LanguageContext.jsx';

export default function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="site-footer" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ margin: '0 0 0.5rem 0', letterSpacing: '0.04em', fontSize: '0.95rem', opacity: 0.9 }}>
          {t.footer.rights}
        </p>
        <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.6, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          {t.footer.basedIn}
        </p>
      </div>
    </footer>
  );
}
