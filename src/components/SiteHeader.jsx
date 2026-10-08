'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function SiteHeader() {
  const pathname = usePathname();
  
  // On project detail pages (/work/something), the background is white/light, so we use dark charcoal text.
  // On home (/), work (/work), and about (/about), there is a dark hero banner, so white text is used.
  const isLightPage = pathname && pathname.startsWith('/work/') && pathname !== '/work';

  return (
    <nav className={`site-nav ${isLightPage ? 'nav-dark-text' : ''}`}>
      <a href="/" className="logo" aria-label="Carlos Ozuna Portfolio">
        <span className="logo-first">Carlos</span>
        <span className="logo-last">Ozuna</span>
        <span className="logo-dot">.</span>
      </a>
      <div className="nav-links">
        <a href="/work">Work</a>
        <a href="/about">About</a>
      </div>
    </nav>
  );
}
