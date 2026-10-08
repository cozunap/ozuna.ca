'use client';

import React, { useState, useEffect } from 'react';

export default function FlipbookViewer({ pdfUrl, pdfs, title }) {
  const [isFullscreenModal, setIsFullscreenModal] = useState(false);
  const [activePdfIndex, setActivePdfIndex] = useState(0);

  // Normalize list of PDFs
  const pdfList = React.useMemo(() => {
    let list = [];
    if (Array.isArray(pdfs) && pdfs.length > 0) {
      list = pdfs.filter(Boolean);
    } else if (pdfUrl) {
      if (typeof pdfUrl === 'string' && (pdfUrl.startsWith('[') || pdfUrl.includes(','))) {
        try {
          const parsed = JSON.parse(pdfUrl);
          if (Array.isArray(parsed)) list = parsed;
        } catch {
          list = pdfUrl.split(',').map(s => s.trim()).filter(Boolean);
        }
      } else {
        list = [pdfUrl];
      }
    }
    return list;
  }, [pdfUrl, pdfs]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreenModal) {
        setIsFullscreenModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreenModal]);

  if (pdfList.length === 0) return null;

  const currentPdf = pdfList[activePdfIndex] || pdfList[0];

  // Clean and prepare PDF URL parameters for optimal fit
  const embeddedSrc = `${currentPdf}#view=FitH&toolbar=1&navpanes=1&scrollbar=1`;
  const fullscreenSrc = `${currentPdf}#view=Fit&toolbar=1&navpanes=1&scrollbar=1`;

  const handleOpenWindow = () => {
    window.open(`${currentPdf}#view=Fit`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pdf-catalog-container" style={{ margin: '3.5rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1.25rem', fontFamily: "'Inter', sans-serif", color: 'var(--charcoal)', marginBottom: '0.5rem' }}>
          Interactive Catalog / Booklet
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
          {pdfList.length > 1 ? `Viewing document ${activePdfIndex + 1} of ${pdfList.length}` : 'View full publication or expand to full screen below.'}
        </p>

        {pdfList.length > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            {pdfList.map((doc, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePdfIndex(idx)}
                style={{
                  padding: '0.5rem 1.25rem',
                  fontSize: '0.85rem',
                  borderRadius: '30px',
                  border: activePdfIndex === idx ? '2px solid var(--gold, #b89a5a)' : '1px solid #cbd5e1',
                  background: activePdfIndex === idx ? 'var(--gold, #b89a5a)' : '#fff',
                  color: activePdfIndex === idx ? '#fff' : 'var(--charcoal)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                Vol. {idx + 1} / Part {idx + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* IN-PAGE EMBEDDED VIEWER */}
      <div 
        style={{
          width: '100%',
          height: '780px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          background: '#2b2b2b',
          position: 'relative'
        }}
      >
        <iframe 
          src={embeddedSrc}
          title={`${title} PDF Booklet`}
          width="100%"
          height="100%"
          style={{ border: 'none', display: 'block' }}
        />
      </div>

      {/* CONTROLS */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
        <button 
          type="button"
          onClick={() => setIsFullscreenModal(true)}
          className="btn btn-gold"
          style={{ fontSize: '0.85rem', letterSpacing: '0.08em', padding: '0.85rem 2rem', cursor: 'pointer' }}
        >
          Expand Fullscreen Modal ⛶
        </button>

        <button 
          type="button"
          onClick={handleOpenWindow}
          className="btn btn-outline"
          style={{ fontSize: '0.85rem', letterSpacing: '0.08em', padding: '0.85rem 2rem', borderColor: 'var(--charcoal)', cursor: 'pointer' }}
        >
          Open PDF in New Window ↗
        </button>

        <a 
          href={pdfUrl} 
          download 
          className="btn btn-outline"
          style={{ fontSize: '0.85rem', letterSpacing: '0.08em', padding: '0.85rem 2rem', borderColor: 'var(--charcoal)' }}
        >
          Download PDF ⬇
        </a>
      </div>

      {/* 100% HEIGHT FULLSCREEN OVERLAY MODAL */}
      {isFullscreenModal && (
        <div 
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'rgba(15, 17, 23, 0.95)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            height: '100vh',
            padding: 0,
            margin: 0
          }}
        >
          {/* TOP BAR */}
          <div 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 2rem',
              backgroundColor: '#1a1d24',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              color: '#fff'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontWeight: 600, fontSize: '1rem' }}>{title}</span>
              <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>• Full Document View</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <a 
                href={pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: '#fff', fontSize: '0.85rem', opacity: 0.8, textDecoration: 'underline' }}
              >
                Open in Browser Tab ↗
              </a>
              <button 
                type="button"
                onClick={() => setIsFullscreenModal(false)}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  color: '#fff',
                  borderRadius: '4px',
                  padding: '0.4rem 1rem',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
              >
                Close (ESC) ✕
              </button>
            </div>
          </div>

          {/* 100% HEIGHT IFRAME */}
          <div style={{ flex: 1, width: '100%', height: 'calc(100vh - 55px)' }}>
            <iframe 
              src={fullscreenSrc}
              title={`${title} Fullscreen Booklet`}
              width="100%"
              height="100%"
              style={{ border: 'none', display: 'block', width: '100%', height: '100%' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
