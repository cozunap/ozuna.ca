'use client';

import React from 'react';
import WorkGalleryClient from './WorkGalleryClient.jsx';
import { useLanguage } from '../../lib/i18n/LanguageContext.jsx';

export default function WorkPageClient({ projects }) {
  const { t } = useLanguage();

  return (
    <div>
      <section 
        className="sticky-hero-banner" 
        style={{
          backgroundImage: "url('/assets/images/portfolio-header-bg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="sticky-hero-overlay"></div>
        <div className="container sticky-hero-content">
          <h1 className="title-giant text-white" style={{ marginBottom: '1rem' }}>
            {t.work.heroTitle}
          </h1>
          <p className="subtitle text-white" style={{ margin: '0 auto', opacity: 0.9, maxWidth: '850px' }}>
            {t.work.heroSubtitle}
          </p>
        </div>
      </section>

      <div className="page-content-wrapper">
        <section className="section" style={{ paddingTop: '4rem' }}>
          <div className="container">
            <WorkGalleryClient projects={projects} />
          </div>
        </section>
      </div>
    </div>
  );
}
