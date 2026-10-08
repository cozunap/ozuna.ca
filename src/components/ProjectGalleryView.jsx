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
    <div className="project-gallery-container" style={{ margin: '3rem 0', width: '100%' }}>
      {/* STRICT 2-COLUMN GRID - PURE IMAGES ONLY, NO TEXT OR NUMBERS */}
      <div 
        className="gallery-two-col-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(1rem, 2.5vw, 2.5rem)',
          maxWidth: '1400px',
          margin: '0 auto',
          width: '100%'
        }}
      >
        {images.map((imgSrc, idx) => (
          <div 
            key={`${imgSrc}-${idx}`}
            onClick={() => setActiveModalIndex(idx)}
            className="gallery-card-clean"
            style={{
              cursor: 'zoom-in',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#fff',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s cubic-bezier(.4,0,.2,1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0
            }}
          >
            <img 
              src={imgSrc} 
              alt=""
              loading="lazy"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                transition: 'transform 0.35s ease'
              }}
            />
          </div>
        ))}
      </div>

      {/* LIGHTBOX SLIDER MODAL WITH ARROWS */}
      {activeModalIndex !== null && (
        <div 
          onClick={() => setActiveModalIndex(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(10, 12, 16, 0.96)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999999,
            padding: '1.5rem',
            userSelect: 'none'
          }}
        >
          {/* CLOSE BUTTON */}
          <button 
            onClick={() => setActiveModalIndex(null)}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '2rem',
              background: 'rgba(255,255,255,0.12)',
              border: 'none',
              color: '#fff',
              fontSize: '1.5rem',
              cursor: 'pointer',
              borderRadius: '50%',
              width: '46px',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000000,
              transition: 'background 0.2s ease'
            }}
          >
            ✕
          </button>

          {/* PREVIOUS SLIDE ARROW */}
          <button 
            onClick={handlePrev}
            aria-label="Previous image"
            style={{
              position: 'absolute',
              left: 'clamp(1rem, 3vw, 2.5rem)',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.14)',
              border: 'none',
              color: '#fff',
              fontSize: '2.5rem',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 1000000,
              transition: 'background 0.2s ease, transform 0.2s ease'
            }}
          >
            ‹
          </button>

          {/* ACTIVE SLIDE IMAGE */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              maxWidth: '88vw', 
              maxHeight: '88vh', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}
          >
            <img 
              src={images[activeModalIndex]} 
              alt=""
              style={{
                maxWidth: '88vw',
                maxHeight: '88vh',
                objectFit: 'contain',
                borderRadius: '6px',
                boxShadow: '0 25px 60px rgba(0,0,0,0.7)'
              }}
            />
          </div>

          {/* NEXT SLIDE ARROW */}
          <button 
            onClick={handleNext}
            aria-label="Next image"
            style={{
              position: 'absolute',
              right: 'clamp(1rem, 3vw, 2.5rem)',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.14)',
              border: 'none',
              color: '#fff',
              fontSize: '2.5rem',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 1000000,
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
