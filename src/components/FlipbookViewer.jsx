'use client';

import React from 'react';

export default function FlipbookViewer({ pdfUrl, title }) {
  if (!pdfUrl) return null;

  return (
    <div className="pdf-catalog-container" style={{ margin: '3.5rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1.25rem', fontFamily: "'Inter', sans-serif", color: 'var(--charcoal)', marginBottom: '0.5rem' }}>
          Interactive Catalog / Booklet
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
          View full publication or download high-resolution copy below.
        </p>
      </div>

      <div 
        style={{
          width: '100%',
          height: '700px',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          border: '1px solid #e2e8f0',
          background: '#f8fafc',
          position: 'relative'
        }}
      >
        <iframe 
          src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
          title={`${title} PDF Booklet`}
          width="100%"
          height="100%"
          style={{ border: 'none', display: 'block' }}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
        <a 
          href={pdfUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-gold"
          style={{ fontSize: '0.85rem', letterSpacing: '0.08em', padding: '0.85rem 2rem' }}
        >
          Open PDF in New Window ↗
        </a>
        <a 
          href={pdfUrl} 
          download 
          className="btn btn-outline"
          style={{ fontSize: '0.85rem', letterSpacing: '0.08em', padding: '0.85rem 2rem', borderColor: 'var(--charcoal)' }}
        >
          Download PDF ⬇
        </a>
      </div>
    </div>
  );
}
