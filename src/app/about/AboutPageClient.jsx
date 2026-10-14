'use client';

import React from 'react';
import { useLanguage } from '../../lib/i18n/LanguageContext.jsx';

export default function AboutPageClient({ content }) {
  const { t, isFr } = useLanguage();

  const heroTitle = isFr ? t.about.heroTitle : (content.heroTitle || t.about.heroTitle);
  const heroSubtitle = isFr ? t.about.heroSubtitle : (content.heroSubtitle || t.about.heroSubtitle);
  const watermark = isFr ? t.about.watermark : 'about';
  const headline = isFr ? t.about.headline : (content.headline || t.about.headline);
  const intro = isFr ? t.about.intro : (content.intro || t.about.intro);
  const whatIBringTitle = isFr ? t.about.whatIBringTitle : (content.whatIBringTitle || t.about.whatIBringTitle);
  const skills = isFr ? t.about.skills : (content.skills || t.about.skills);
  const approachTitle = isFr ? t.about.approachTitle : (content.approachTitle || t.about.approachTitle);
  const approachText = isFr ? t.about.approachText : (content.approachText || t.about.approachText);
  const closingText = isFr ? t.about.closingText : (content.closingText || t.about.closingText);
  const thanksText = isFr ? t.about.thanksText : (content.thanksText || t.about.thanksText);
  const contactTitle = isFr ? t.about.contactTitle : (content.contactTitle || t.about.contactTitle);
  const downloadCv = isFr ? t.about.downloadCv : "Download my CV.";
  const seeWork = isFr ? t.about.seeWork : "See Carlos Ozuna's work";
  const contactMe = isFr ? t.about.contactMe : "contact me";
  const emblemText = isFr 
    ? (t.about.emblemText || "PORTFOLIO DE CARLOS OZUNA • MONTRÉAL CANADA • ") 
    : (t.about.emblemText || "PORTFOLIO OF CARLOS OZUNA • PORTFOLIO OF CARLOS OZUNA • ");

  return (
    <div className="about-original-page">
      {/* HERO BANNER SECTION */}
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
            {heroTitle}
          </h1>
          <p className="subtitle text-white" style={{ margin: '0 auto', opacity: 0.9, maxWidth: '850px' }}>
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* BODY CONTENT MATCHING OZUNA.CA/ABOUT-ME/ */}
      <div className="page-content-wrapper">
        <section className="about-content-section">
          <div className="container about-container">



            {/* EDITORIAL TEXT BODY */}
            <div className="about-text-body">
              <p className="about-lead-intro">
                <strong>{headline}</strong>
                <br />
                {intro}
              </p>

              <p className="about-subheading-bold">
                <strong>{whatIBringTitle}</strong>
              </p>

              <ul className="about-skills-list">
                {skills?.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>

              <p className="about-approach-para">
                <strong>{approachTitle}</strong>
                <br />
                {approachText}
              </p>

              <p className="about-closing-para">
                {closingText}
              </p>

              <p className="about-thanks-para">
                {thanksText}
              </p>
            </div>

            {/* CIRCULAR BADGE / BRAND EMBLEM */}
            <div className="about-emblem-wrap">
              <div className="about-emblem-badge">
                <svg className="rotating-text-path" viewBox="0 0 300 300" width="220" height="220">
                  <path id="circlePath" fill="none" d="M 150, 150 m -108, 0 a 108,108 0 1,1 216,0 a 108,108 0 1,1 -216,0" />
                  <text fill="var(--charcoal)" fontSize="15" letterSpacing="4" fontWeight="800" fontFamily="'Archivo Black', 'Arial Black', sans-serif">
                    <textPath href="#circlePath" startOffset="0%">
                      {emblemText}
                    </textPath>
                  </text>
                </svg>
                <div className="about-emblem-cq-logo">
                  <img 
                    src="/assets/images/cq-brand-logo.svg" 
                    alt="Carlos Ozuna CQ Logo" 
                    width="110" 
                    height="110"
                    style={{ display: 'block', width: '110px', height: 'auto' }}
                  />
                </div>
              </div>
            </div>

            {/* CONTACT CARLOS OZUNA SECTION */}
            <div id="about-contact-section" className="about-contact-block">
              <h2 className="about-contact-heading">{contactTitle}</h2>
              
              <ul className="about-contact-links-list">
                <li>
                  <a href={content.cvLink || "/carlos-ozuna-cv.pdf"} target="_blank" rel="noopener noreferrer">
                    {downloadCv}
                  </a>
                </li>
                <li>
                  <a href="/work">
                    {seeWork}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${content.contactEmail || "contact@ozuna.ca"}`}>
                    {contactMe}
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
