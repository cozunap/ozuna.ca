'use client';

import React from 'react';
import { useLanguage } from '../lib/i18n/LanguageContext.jsx';

export default function HomeClient({ content }) {
  const { t, isFr } = useLanguage();

  // If in French Canada mode, use the curated Canadian French translations.
  // Otherwise, fallback to database custom values or default English.
  const title1 = isFr ? t.home.heroTitleLine1 : (content.heroTitleLine1 || t.home.heroTitleLine1);
  const title2 = isFr ? t.home.heroTitleLine2 : (content.heroTitleLine2 || t.home.heroTitleLine2);
  const subtitle = isFr ? t.home.heroSubtitle : (content.heroSubtitle || t.home.heroSubtitle);
  const btn1Text = isFr ? t.home.btnPortfolio : (content.btn1Text || t.home.btnPortfolio);
  const btn2Text = isFr ? t.home.btnAbout : (content.btn2Text || t.home.btnAbout);

  return (
    <div>
      <section className="hero-video-section">
        <div className="hero-video-bg">
          <video autoPlay loop muted playsInline className="hero-video-element">
            <source src="/assets/videos/designer-working.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay"></div>
        
        <div className="container hero-content text-center">
          <h1 className="title-giant text-white">
            {title1} <br />
            <span style={{ color: 'rgba(255, 255, 255, 0.85)', fontStyle: 'italic', fontWeight: 300 }}>
              {title2}
            </span>
          </h1>
          <p className="subtitle text-white" style={{ margin: '0 auto 3rem auto', opacity: 0.9, maxWidth: '850px' }}>
            {subtitle}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={content.btn1Link || '/work'} className="btn btn-gold">
              {btn1Text}
            </a>
            <a href={content.btn2Link || '/about'} className="btn btn-outline-white">
              {btn2Text}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
