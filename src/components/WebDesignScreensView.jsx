'use client';

import React, { useState } from 'react';

export default function WebDesignScreensView({ screens, title, coverImage }) {
  const [activeModalImg, setActiveModalImg] = useState(null);

  // Combine cover image and subsequent screens if both exist and cover isn't already in screens
  const allScreens = React.useMemo(() => {
    let list = [];
    if (coverImage && !screens.includes(coverImage)) {
      list.push({ src: coverImage, label: 'Main Overview / Hero' });
    }
    screens.forEach((src, idx) => {
      list.push({ src, label: `Screen ${idx + 1}` });
    });
    return list;
  }, [screens, coverImage]);

  if (allScreens.length === 0) return null;

  return (
    <div className="web-screens-showcase" style={{ margin: '3.5rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '1.25rem', fontFamily: "'Inter', sans-serif", color: 'var(--charcoal)', marginBottom: '0.5rem' }}>
          Website Pages & UI Screens
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
          Scroll through all responsive pages designed for this platform. Click any screen to zoom.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        {allScreens.map((item, idx) => (
          <div 
            key={`${item.src}-${idx}`}
            className="web-screen-device-mockup"
            style={{
              background: '#fff',
              borderRadius: '12px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 12px 35px -10px rgba(0, 0, 0, 0.08)',
              overflow: 'hidden',
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* CLEAN BROWSER WINDOW TOP BAR */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1.25rem',
                background: '#f8fafc',
                borderBottom: '1px solid #e2e8f0'
              }}
            >
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56', display: 'inline-block' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e', display: 'inline-block' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f', display: 'inline-block' }} />
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                {item.label}
              </span>
              <button 
                onClick={() => setActiveModalImg(item.src)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '0.75rem',
                  color: 'var(--charcoal)',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}
              >
                Expand 🔍
              </button>
            </div>

            {/* SCREENSHOT IMAGE */}
            <div 
              onClick={() => setActiveModalImg(item.src)}
              style={{ cursor: 'zoom-in', background: '#f1f5f9', overflow: 'hidden' }}
            >
              <img 
                src={item.src} 
                alt={`${title} - ${item.label}`}
                loading="lazy"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  transition: 'transform 0.4s ease'
                }}
              />
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
            backgroundColor: 'rgba(23, 25, 35, 0.94)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '2rem',
            cursor: 'zoom-out'
          }}
        >
          <button 
            onClick={() => setActiveModalImg(null)}
            aria-label="Close"
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
            alt="Expanded view"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '94vw',
              maxHeight: '92vh',
              objectFit: 'contain',
              borderRadius: '6px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.6)'
            }}
          />
        </div>
      )}
    </div>
  );
}
