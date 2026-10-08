'use client';

import React, { useState } from 'react';

export default function ProjectGalleryView({ images, title }) {
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  if (!images || images.length === 0) return null;

  const handlePrev = (e) => {
    e?.stopPropagation();
    setActiveModalIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setActiveModalIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeModalIndex === null) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setActiveModalIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalIndex]);

  return (
    <div className="project-gallery-container" style={{ margin: '4rem 0' }}>
      {/* 2 COLUMNS GRID */}
      <div 
        className="project-gallery-grid-2col" 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          alignItems: 'stretch'
        }}
      >
        {images.map((imgSrc, idx) => (
          <div 
            key={`${imgSrc}-${idx}`}
            onClick={() => setActiveModalIndex(idx)}
            className="gallery-card"
            style={{
              cursor: 'zoom-in',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
              transition: 'transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s cubic-bezier(.4,0,.2,1)',
              position: 'relative'
            }}
          >
            <div style={{ position: 'relative', width: '100%', paddingTop: '65%', overflow: 'hidden', background: '#f8fafc' }}>
              <img 
                src={imgSrc} 
                alt={`${title} #${idx + 1}`}
                loading="lazy"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '0.75rem',
                  transition: 'transform 0.35s ease'
                }}
              />
            </div>
            <div style={{ padding: '0.85rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                {idx + 1} / {images.length}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--gold, #b89a5a)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                View Fullscreen 🔍
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL WITH PREV / NEXT ARROWS */}
      {activeModalIndex !== null && (
        <div 
          onClick={() => setActiveModalIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(15, 17, 23, 0.96)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '2rem',
            userSelect: 'none'
          }}
        >
          {/* TOP BAR / COUNTER & CLOSE */}
          <div 
            style={{
              position: 'absolute',
              top: '1.5rem',
              left: '2rem',
              right: '2rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#fff',
              zIndex: 100000
            }}
          >
            <div style={{ fontSize: '1rem', fontWeight: 600, color: '#e2e8f0', letterSpacing: '0.05em' }}>
              {activeModalIndex + 1} / {images.length} • {title}
            </div>

            <button 
              onClick={() => setActiveModalIndex(null)}
              aria-label="Close modal"
              style={{
                background: 'rgba(255,255,255,0.15)',
                border: 'none',
                color: '#fff',
                fontSize: '1.25rem',
                cursor: 'pointer',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.2s ease'
              }}
            >
              ✕
            </button>
          </div>

          {/* PREVIOUS ARROW BUTTON */}
          <button 
            onClick={handlePrev}
            aria-label="Previous image"
            style={{
              position: 'absolute',
              left: '2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#fff',
              fontSize: '2rem',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 100000,
              transition: 'background 0.2s ease, transform 0.2s ease'
            }}
          >
            ‹
          </button>

          {/* ACTIVE IMAGE */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              maxWidth: '85vw', 
              maxHeight: '80vh', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <img 
              src={images[activeModalIndex]} 
              alt={`${title} #${activeModalIndex + 1}`}
              style={{
                maxWidth: '85vw',
                maxHeight: '80vh',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
              }}
            />
          </div>

          {/* NEXT ARROW BUTTON */}
          <button 
            onClick={handleNext}
            aria-label="Next image"
            style={{
              position: 'absolute',
              right: '2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.15)',
              border: 'none',
              color: '#fff',
              fontSize: '2rem',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 100000,
              transition: 'background 0.2s ease, transform 0.2s ease'
            }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
