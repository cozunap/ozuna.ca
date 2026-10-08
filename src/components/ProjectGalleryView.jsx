'use client';

import React, { useState } from 'react';

export default function ProjectGalleryView({ images, title }) {
  const [activeModalImg, setActiveModalImg] = useState(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="project-gallery-container" style={{ margin: '4rem 0' }}>
      <div 
        className="project-gallery-grid" 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.75rem',
          alignItems: 'stretch'
        }}
      >
        {images.map((imgSrc, idx) => (
          <div 
            key={`${imgSrc}-${idx}`}
            onClick={() => setActiveModalImg(imgSrc)}
            className="gallery-card"
            style={{
              cursor: 'zoom-in',
              borderRadius: '6px',
              overflow: 'hidden',
              background: '#fff',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
              transition: 'transform 0.25s cubic-bezier(.4,0,.2,1), box-shadow 0.25s cubic-bezier(.4,0,.2,1)',
              position: 'relative'
            }}
          >
            <div style={{ position: 'relative', width: '100%', paddingTop: '65%', overflow: 'hidden', background: '#f8fafc' }}>
              <img 
                src={imgSrc} 
                alt={`${title} design #${idx + 1}`}
                loading="lazy"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: '0.75rem',
                  transition: 'transform 0.4s ease'
                }}
              />
            </div>
            <div style={{ padding: '0.75rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                Item {idx + 1} of {images.length}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--charcoal)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Expand 🔍
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* LIGHTBOX MODAL */}
      {activeModalImg && (
        <div 
          onClick={() => setActiveModalImg(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(23, 25, 35, 0.92)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '2rem',
            cursor: 'zoom-out'
          }}
        >
          <button 
            onClick={() => setActiveModalImg(null)}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: '1.5rem',
              right: '2rem',
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: '2.5rem',
              cursor: 'pointer',
              lineHeight: 1
            }}
          >
            &times;
          </button>
          <img 
            src={activeModalImg} 
            alt="Full preview"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '92vw',
              maxHeight: '88vh',
              objectFit: 'contain',
              borderRadius: '6px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
            }}
          />
        </div>
      )}
    </div>
  );
}
