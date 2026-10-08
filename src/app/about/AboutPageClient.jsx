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
  const emblemText = isFr ? t.about.emblemText : t.en.about.emblemText;

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

            {/* WATERMARK & OUTLINE "ABOUT" HEADINGS */}
            <div className="about-header-titles">
              <h2 className="about-outline-title">{watermark}</h2>
              <h2 className="about-watermark-title">{watermark}</h2>
              
              <div className="about-down-icon-wrap">
                <a href="#about-contact-section" className="about-down-icon" aria-label="Scroll to contact">
                  <svg viewBox="0 0 612 792" fill="currentColor">
                    <path d="M304.8,477.3c12.2-12.3,23.5-23.7,34.8-35c47.1-47.1,94.3-94.2,141.4-141.3c1.1-1.1,2.3-2.3,3.6-3.3 c3.3-2.4,7.5-2.1,10.2,0.8c2.7,2.8,3,7.1,0.6,10.3c-0.9,1.2-2,2.2-3.1,3.3c-58.9,58.8-117.8,117.7-176.7,176.5 c-1.4,1.4-2.8,2.9-4.2,4.3c-4,4-8.4,4-12.5-0.1c-13.7-13.7-27.3-27.5-41-41.2c-46.1-46.2-92.2-92.4-138.3-138.5 c-1.1-1.1-2.4-2.3-3.3-3.6c-2.2-3.2-1.7-7.3,1-9.9c2.6-2.6,7-3,10-0.8c1.2,0.9,2.2,2,3.3,3.1c57,57,113.9,114.1,170.9,171.2 C302.6,474.1,303.5,475.6,304.8,477.3z"/>
                  </svg>
                </a>
              </div>
            </div>

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
                <svg className="rotating-text-path" viewBox="0 0 300 300" width="180" height="180">
                  <path id="circlePath" fill="none" d="M 150, 150 m -100, 0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0" />
                  <text fill="var(--charcoal)" fontSize="13" letterSpacing="3" fontWeight="700">
                    <textPath href="#circlePath" startOffset="0%">
                      {emblemText}
                    </textPath>
                  </text>
                </svg>
                <div className="about-emblem-center-dot"></div>
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
