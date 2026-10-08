'use client';

import React from 'react';
import { slugify } from '../../../utils/slugify.js';
import { useLanguage } from '../../../lib/i18n/LanguageContext.jsx';
import ProjectGalleryView from '../../../components/ProjectGalleryView.jsx';
import FlipbookViewer from '../../../components/FlipbookViewer.jsx';
import WebDesignScreensView from '../../../components/WebDesignScreensView.jsx';

export default function ProjectDetailClient({ project, related }) {
  const { t, isFr, getProjectText } = useLanguage();
  const { title, category: rawCategory, description: rawDescription, image_url, pdf_url, link } = project;

  // Localized title/category/description
  const localized = getProjectText(title, rawCategory, rawDescription);
  const displayCategory = localized.category || (isFr ? 'Design graphique' : 'Graphic Design');

  // Check if rawDescription or localized description contains gallery / screens / pdfs JSON
  let parsedDescription = localized.description || '';
  let galleryImages = [];
  let pdfDocuments = [];

  // Parse structured JSON if present in rawDescription
  try {
    if (rawDescription && (rawDescription.trim().startsWith('{') || rawDescription.trim().startsWith('['))) {
      const parsed = JSON.parse(rawDescription);
      if (parsed.gallery && Array.isArray(parsed.gallery)) {
        galleryImages = parsed.gallery;
      }
      if (parsed.pdfs && Array.isArray(parsed.pdfs)) {
        pdfDocuments = parsed.pdfs;
      }
      // If localized description provided a custom text in FR, use it, otherwise use parsed.text
      if (isFr && localized.description !== rawDescription) {
        parsedDescription = localized.description;
      } else if (parsed.text !== undefined) {
        parsedDescription = parsed.text;
      } else if (Array.isArray(parsed)) {
        galleryImages = parsed;
        parsedDescription = '';
      }
    }
  } catch (e) {
    // Standard text or html description
  }

  // Also parse pdf_url if it contains multiple URLs
  if (pdf_url) {
    if (pdf_url.startsWith('[') || pdf_url.includes(',')) {
      try {
        const parsedPdfs = JSON.parse(pdf_url);
        if (Array.isArray(parsedPdfs)) {
          pdfDocuments = [...new Set([...pdfDocuments, ...parsedPdfs])];
        }
      } catch {
        const splitPdfs = pdf_url.split(',').map(s => s.trim()).filter(Boolean);
        pdfDocuments = [...new Set([...pdfDocuments, ...splitPdfs])];
      }
    } else if (!pdfDocuments.includes(pdf_url)) {
      pdfDocuments.unshift(pdf_url);
    }
  }

  const isWebDesign = rawCategory === 'Web Design';

  return (
    <>
      <article className="section" style={{ paddingTop: '8rem' }}>
        <header className="container" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 3.5rem auto' }}>
          <h1 className="title-giant" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: '0.5rem' }}>
            {title}
          </h1>
          {displayCategory && (
            <p style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '2rem' }}>
              {displayCategory}
            </p>
          )}

          {parsedDescription && parsedDescription.trim() !== '' && (
            <div 
              className="project-description" 
              style={{ fontSize: '1.125rem', color: 'var(--charcoal)', lineHeight: 1.8, marginBottom: '2.5rem', textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem auto' }}
              dangerouslySetInnerHTML={{ __html: parsedDescription }}
            />
          )}

          {link && link.trim() !== '' && link.trim() !== '#' && (
            <div style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-gold" 
                style={{ fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '1rem 3rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <span>{t.work.goToWebsite}</span>
                <span>↗</span>
              </a>
            </div>
          )}
        </header>

        {/* INTERACTIVE PDF / FLIPBOOK VIEWER */}
        {(pdfDocuments.length > 0 || pdf_url) && (
          <div className="container">
            <FlipbookViewer pdfUrl={pdf_url} pdfs={pdfDocuments} title={title} />
          </div>
        )}

        {/* WEB DESIGN MULTI-SCREEN SHOWCASE */}
        {isWebDesign && (galleryImages.length > 0 || image_url) && (
          <div className="container">
            <WebDesignScreensView screens={galleryImages} title={title} coverImage={image_url} />
          </div>
        )}

        {/* MULTI-IMAGE GALLERY (e.g. Business Cards, Flyers, Graphic Design) */}
        {!isWebDesign && galleryImages.length > 0 && (
          <div className="container">
            <ProjectGalleryView images={galleryImages} title={title} />
          </div>
        )}

        {/* SINGLE COVER IMAGE */}
        {!isWebDesign && image_url && galleryImages.length === 0 && pdfDocuments.length === 0 && !pdf_url && (
          <div className="container" style={{ textAlign: 'center' }}>
            <img 
              src={image_url} 
              alt={`${title} Cover`} 
              style={{ width: '100%', maxWidth: '900px', height: 'auto', borderRadius: '0', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }} 
            />
          </div>
        )}
      </article>

      {related && related.length > 0 && (
        <section className="related-section">
          <div className="container">
            <h3 style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1.25rem', marginBottom: '3rem', fontFamily: "'Inter', sans-serif" }}>
              {t.work.relatedDesigns}
            </h3>
            <div className="related-grid">
              {related.map(rel => {
                return (
                  <a key={rel.id} href={`/work/${slugify(rel.title)}`} className="related-card" style={{ display: 'block', overflow: 'hidden', background: '#fff' }}>
                    <img 
                      src={rel.image_url || '/assets/images/placeholder.jpg'} 
                      alt={rel.title} 
                      loading="lazy" 
                      style={{ width: '100%', display: 'block' }} 
                    />
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
