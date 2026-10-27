// src/components/PortfolioGrid.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Download,
  Layers,
  FileText
} from 'lucide-react';
import fallbackItems from '../work_items.json';

const cacheBust = (src) => {
  if (!src) return '/images/cozuna-contact.jpeg';
  if (src.startsWith('data:') || src.startsWith('blob:')) return src;
  return src.includes('?') ? src : `${src}?v=20261026_1`;
};

// Helper: build 2-page spreads from a list of page images for booklets
const buildSpreads = (pages = []) => {
  if (!pages || pages.length === 0) return [];
  const spreads = [];
  // Spread 0: Cover page
  spreads.push({
    index: 0,
    label: 'Front Cover',
    left: null,
    right: { pageNum: 1, src: pages[0] }
  });

  // Inside 2-page spreads
  let p = 1;
  let spreadIndex = 1;
  while (p < pages.length) {
    const leftPage = { pageNum: p + 1, src: pages[p] };
    const rightPage = p + 1 < pages.length ? { pageNum: p + 2, src: pages[p + 1] } : null;
    spreads.push({
      index: spreadIndex,
      label: rightPage
        ? `Pages ${leftPage.pageNum} – ${rightPage.pageNum}`
        : `Page ${leftPage.pageNum} (Back Cover)`,
      left: leftPage,
      right: rightPage
    });
    p += 2;
    spreadIndex++;
  }
  return spreads;
};

export default function PortfolioGrid({ items = [] }) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentSpreadIndex, setCurrentSpreadIndex] = useState(0);
  const [viewMode, setViewMode] = useState('spread'); // 'spread' | 'single'

  // Use provided items or authentic fallback
  const portfolioList = items && items.length > 0 ? items : fallbackItems;

  const filters = [
    { label: 'All', value: 'ALL' },
    { label: 'Graphic Design', value: 'GRAPHIC DESIGN' },
    { label: 'Web Design', value: 'WEB DESIGN' }
  ];

  // Exact category matching
  const filteredItems = portfolioList.filter((item) => {
    if (activeFilter === 'ALL') return true;
    const cat = (item.category || '').trim().toUpperCase().replace(/[-_]/g, ' ');
    return cat === activeFilter;
  });

  // Reset indices when switching projects
  const selectProject = (index) => {
    setSelectedItemIndex(index);
    setCurrentImageIndex(0);
    setCurrentSpreadIndex(0);
    setViewMode('spread');
  };

  // URL slug detector
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pathPart = window.location.pathname.replace(/^\/work\/?/, '').replace(/^\//, '');
    const projectSlug = params.get('project') || window.location.hash.replace('#', '') || pathPart;
    if (projectSlug && projectSlug !== 'work' && projectSlug !== 'about-me' && projectSlug !== 'contact') {
      const idx = filteredItems.findIndex(
        (p) => (p.slug || '').toLowerCase() === projectSlug.toLowerCase() || p.id === projectSlug
      );
      if (idx !== -1) {
        setSelectedItemIndex(idx);
        setCurrentImageIndex(0);
        setCurrentSpreadIndex(0);
      }
    }
  }, [portfolioList]);

  const activeItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  // Active project's gallery images
  const galleryImages =
    activeItem && activeItem.gallery && activeItem.gallery.length > 0
      ? activeItem.gallery
      : activeItem
      ? [activeItem.image]
      : [];

  const isFlipbook = activeItem?.displayType === 'flipbook';
  const spreads = isFlipbook ? buildSpreads(galleryImages) : [];
  const currentSpread = spreads[currentSpreadIndex] || spreads[0];
  const currentImage = galleryImages[currentImageIndex] || activeItem?.image;

  // Navigation handlers
  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  };

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  };

  const prevSpread = (e) => {
    if (e) e.stopPropagation();
    setCurrentSpreadIndex((prev) => (prev > 0 ? prev - 1 : spreads.length - 1));
  };

  const nextSpread = (e) => {
    if (e) e.stopPropagation();
    setCurrentSpreadIndex((prev) => (prev < spreads.length - 1 ? prev + 1 : 0));
  };

  const prevProject = (e) => {
    if (e) e.stopPropagation();
    const newIdx = selectedItemIndex > 0 ? selectedItemIndex - 1 : filteredItems.length - 1;
    selectProject(newIdx);
  };

  const nextProject = (e) => {
    if (e) e.stopPropagation();
    const newIdx = selectedItemIndex < filteredItems.length - 1 ? selectedItemIndex + 1 : 0;
    selectProject(newIdx);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedItemIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedItemIndex(null);
      } else if (e.key === 'ArrowLeft') {
        if (isFlipbook && viewMode === 'spread') prevSpread();
        else prevImage();
      } else if (e.key === 'ArrowRight') {
        if (isFlipbook && viewMode === 'spread') nextSpread();
        else nextImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex, isFlipbook, viewMode, currentSpreadIndex, currentImageIndex, spreads.length, galleryImages.length]);

  return (
    <div className="w-full bg-white">
      {/* 1. Authentic Hero Section matching ozuna.ca/work/ (.elementor-element-f99cd2f) */}
      <section
        className="relative w-full bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage: 'url("/images/cozuna-contact.jpeg")',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-[#020202]/80" />

        <div className="relative max-w-5xl mx-auto px-4 py-20 sm:py-24 text-center z-10 flex flex-col items-center justify-center">
          <h1
            className="font-raleway text-[50px] sm:text-[60px] md:text-[65px] font-black text-transparent select-none z-10 tracking-tight"
            style={{
              WebkitTextStroke: '1px #ffffff',
              stroke: '#ffffff'
            }}
          >
            Work
          </h1>

          <div
            aria-hidden="true"
            className="font-raleway text-[70px] sm:text-[85px] md:text-[95px] font-black uppercase text-white/[0.14] select-none pointer-events-none -mt-[50px] sm:-mt-[60px] md:-mt-[68px] z-0 tracking-wider"
          >
            Work
          </div>
        </div>
      </section>

      {/* 2. Portfolio Section with Authentic Filters and 3-Column Grid */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mb-10">
          {filters.map((f) => {
            const isActive = activeFilter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                onClick={() => setActiveFilter(f.value)}
                className={`font-raleway text-[14px] uppercase tracking-[1px] transition-colors duration-200 focus:outline-none ${
                  isActive
                    ? 'text-[#a40404] font-bold cursor-default'
                    : 'text-[#ff1d25] font-medium hover:text-[#a40404] cursor-pointer'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* 3. 3-Column Grid (.elementor-grid-3 gap 15px) */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[15px]"
        >
          <AnimatePresence>
            {filteredItems.map((item, index) => {
              const itemIsFlipbook = item.displayType === 'flipbook';
              const imgCount = item.gallery?.length || 1;
              return (
                <motion.article
                  layout
                  key={item.id || item.slug}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  onClick={() => selectProject(index)}
                  className="group relative aspect-square w-full overflow-hidden bg-[#111111] cursor-pointer rounded-none"
                >
                  {/* Project Image */}
                  <img
                    src={cacheBust(item.image)}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  {/* Corner Badge: Flipbook vs Gallery */}
                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    {itemIsFlipbook ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#a40404]/90 text-white text-[10px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm border border-white/20">
                        <BookOpen size={12} /> Flipbook ({imgCount}p)
                      </span>
                    ) : (
                      imgCount > 1 && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-black/70 text-white/90 text-[10px] font-semibold uppercase tracking-wider shadow backdrop-blur-sm border border-white/10">
                          <Layers size={11} /> {imgCount} Images
                        </span>
                      )
                    )}
                  </div>

                  {/* Cobalt Blue Overlay on Hover (rgba(0, 58, 167, 0.84)) */}
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                    style={{ backgroundColor: 'rgba(0, 58, 167, 0.84)' }}
                  >
                    <h3 className="font-raleway text-[16px] font-extrabold text-white uppercase tracking-[2px] leading-tight select-none px-2 mb-2">
                      {item.title}
                    </h3>

                    {itemIsFlipbook ? (
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-white bg-black/50 px-3 py-1 rounded-full border border-white/20">
                        <BookOpen size={13} className="text-yellow-400" /> Read Interactive Flipbook
                      </span>
                    ) : (
                      imgCount > 1 && (
                        <span className="text-[11px] font-bold tracking-widest uppercase text-white/90 bg-black/40 px-3 py-1 rounded-full">
                          {imgCount} Images in Gallery
                        </span>
                      )
                    )}
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="py-24 text-center text-slate-500 font-raleway">
            <p className="text-base uppercase tracking-wider">No projects found in this category.</p>
          </div>
        )}
      </section>

      {/* 4. Interactive Showcase Modal (Dual Mode: PDF Flipbook Spread or Image Lightbox) */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-3 sm:p-6 lg:p-8"
            onClick={() => setSelectedItemIndex(null)}
          >
            {/* Modal Container: Modern, elegant, clean glass styling */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-6xl max-h-[92vh] w-full bg-[#0d0f12] border border-white/[0.12] rounded-2xl overflow-hidden flex flex-col shadow-[0_25px_70px_rgba(0,0,0,0.85)] ring-1 ring-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/[0.08] bg-[#13161c]/90 backdrop-blur-md">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[10px] sm:text-[11px] uppercase font-black tracking-widest text-[#ff1d25] font-raleway shrink-0 px-2.5 py-0.5 rounded-full bg-[#ff1d25]/10 border border-[#ff1d25]/20">
                    {activeItem.category}
                  </span>
                  <span className="text-white/20 text-xs shrink-0">•</span>
                  <h2 className="text-white font-raleway text-sm sm:text-base font-extrabold uppercase tracking-wide truncate">
                    {activeItem.title}
                  </h2>

                  {/* Status Indicator */}
                  {isFlipbook ? (
                    <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] text-amber-300 bg-amber-500/10 border border-amber-500/25 px-2.5 py-0.5 rounded-full font-raleway font-semibold shrink-0">
                      <BookOpen size={12} /> {currentSpread?.label} of {spreads.length - 1} spreads ({galleryImages.length} pgs)
                    </span>
                  ) : (
                    galleryImages.length > 1 && (
                      <span className="hidden sm:inline-block text-[11px] text-white/60 bg-white/[0.06] border border-white/[0.08] px-2.5 py-0.5 rounded-full font-raleway font-semibold shrink-0">
                        Image {currentImageIndex + 1} of {galleryImages.length}
                      </span>
                    )
                  )}
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  {/* View Mode Toggle for Flipbooks */}
                  {isFlipbook && (
                    <div className="hidden sm:flex items-center bg-white/[0.05] border border-white/[0.08] rounded-lg p-0.5 text-xs">
                      <button
                        type="button"
                        onClick={() => setViewMode('spread')}
                        className={`px-3 py-1 rounded-md font-semibold transition-all ${
                          viewMode === 'spread'
                            ? 'bg-[#ff1d25] text-white shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                        title="2-Page Book Spread View"
                      >
                        Book Spread
                      </button>
                      <button
                        type="button"
                        onClick={() => setViewMode('single')}
                        className={`px-3 py-1 rounded-md font-semibold transition-all ${
                          viewMode === 'single'
                            ? 'bg-[#ff1d25] text-white shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                        title="Single Page View"
                      >
                        Single Page
                      </button>
                    </div>
                  )}

                  {/* PDF Download Button */}
                  {(activeItem.pdfUrl || (isFlipbook && '/images/Roberto-Clemente-Booklet.pdf')) && (
                    <a
                      href={activeItem.pdfUrl || '/images/Roberto-Clemente-Booklet.pdf'}
                      download="Roberto-Clemente-Booklet.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Download Complete PDF Publication"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ff1d25]/15 hover:bg-[#ff1d25] text-white border border-[#ff1d25]/40 text-xs font-bold uppercase tracking-wider transition-all"
                    >
                      <Download size={13} />
                      <span className="hidden sm:inline">PDF</span>
                    </a>
                  )}

                  {/* External Link */}
                  {(activeItem.link || activeItem.href) && (
                    <a
                      href={activeItem.link || activeItem.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit Original Project"
                      className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                    >
                      <ExternalLink size={17} />
                    </a>
                  )}

                  <button
                    type="button"
                    onClick={() => setSelectedItemIndex(null)}
                    aria-label="Close modal"
                    className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all"
                  >
                    <X size={19} />
                  </button>
                </div>
              </div>

              {/* Main Stage */}
              {isFlipbook && viewMode === 'spread' ? (
                /* 4A. INTERACTIVE 2-PAGE SPREAD FLIPBOOK VIEWER */
                <div className="relative flex-1 min-h-0 flex flex-col items-center justify-center p-3 sm:p-6 bg-[#090b0e] overflow-hidden select-none">
                  {/* Subtle ambient stage glow */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

                  {/* Book Stage Container */}
                  <div className="relative z-10 w-full max-w-4xl h-full flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`spread-${currentSpreadIndex}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="relative flex items-center justify-center shadow-2xl rounded-sm overflow-hidden border border-white/10 max-h-full"
                        style={{
                          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0,0,0,0.8)'
                        }}
                      >
                        {/* If Cover Page (Spread 0) */}
                        {currentSpread.index === 0 ? (
                          <div className="relative flex items-center justify-center bg-[#151515] max-h-full">
                            {/* Realistic Left Binding Spine Edge */}
                            <div className="w-4 sm:w-6 h-full bg-gradient-to-r from-[#222] via-[#333] to-[#111] shadow-inner border-r border-black/50" />
                            <div className="relative max-h-full overflow-hidden flex items-center justify-center">
                              <img
                                src={cacheBust(currentSpread.right.src)}
                                alt="Booklet Cover"
                                className="max-h-[52vh] sm:max-h-[58vh] max-w-full w-auto object-contain block"
                              />
                              <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-white uppercase tracking-wider backdrop-blur-sm">
                                Cover Page
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Open 2-Page Publication Spread */
                          <div className="flex items-center justify-center bg-[#181818] divide-x divide-black/60 max-h-full">
                            {/* Left Page */}
                            <div className="relative max-h-full flex-1 overflow-hidden group flex items-center justify-center">
                              {currentSpread.left ? (
                                <>
                                  <img
                                    src={cacheBust(currentSpread.left.src)}
                                    alt={`Page ${currentSpread.left.pageNum}`}
                                    className="max-h-[52vh] sm:max-h-[58vh] max-w-full w-auto object-contain block"
                                  />
                                  {/* Realistic Book Spine Crease & Shadow on right edge */}
                                  <div className="absolute inset-y-0 right-0 w-8 pointer-events-none bg-gradient-to-l from-black/50 via-black/15 to-transparent" />
                                  <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-white/90">
                                    Page {currentSpread.left.pageNum}
                                  </div>
                                </>
                              ) : (
                                <div className="w-64 h-96 bg-[#181818]" />
                              )}
                            </div>

                            {/* Right Page */}
                            <div className="relative max-h-full flex-1 overflow-hidden group flex items-center justify-center">
                              {currentSpread.right ? (
                                <>
                                  <img
                                    src={cacheBust(currentSpread.right.src)}
                                    alt={`Page ${currentSpread.right.pageNum}`}
                                    className="max-h-[52vh] sm:max-h-[58vh] max-w-full w-auto object-contain block"
                                  />
                                  {/* Realistic Book Spine Crease & Shadow on left edge */}
                                  <div className="absolute inset-y-0 left-0 w-8 pointer-events-none bg-gradient-to-r from-black/50 via-black/15 to-transparent" />
                                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-mono text-white/90">
                                    Page {currentSpread.right.pageNum}
                                  </div>
                                </>
                              ) : (
                                <div className="w-64 h-96 bg-[#181818]" />
                              )}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Previous Spread Button */}
                    <button
                      type="button"
                      aria-label="Previous spread"
                      onClick={prevSpread}
                      className="absolute -left-2 sm:left-2 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-[#ff1d25] text-white border border-white/20 transition-all shadow-xl z-20 hover:scale-105 backdrop-blur-md"
                    >
                      <ChevronLeft size={22} />
                    </button>

                    {/* Next Spread Button */}
                    <button
                      type="button"
                      aria-label="Next spread"
                      onClick={nextSpread}
                      className="absolute -right-2 sm:right-2 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-[#ff1d25] text-white border border-white/20 transition-all shadow-xl z-20 hover:scale-105 backdrop-blur-md"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </div>

                  {/* Spread Bar & Fast Navigation */}
                  <div className="mt-3 sm:mt-4 flex items-center justify-center gap-3 text-xs font-raleway z-10 shrink-0">
                    <button
                      type="button"
                      onClick={prevSpread}
                      className="px-3.5 py-1.5 bg-white/[0.07] hover:bg-white/[0.14] rounded-lg text-white font-medium transition-colors border border-white/[0.08]"
                    >
                      ← Prev Spread
                    </button>
                    <span className="font-bold text-white/90 tracking-wider px-2">
                      {currentSpread?.label}
                    </span>
                    <button
                      type="button"
                      onClick={nextSpread}
                      className="px-3.5 py-1.5 bg-white/[0.07] hover:bg-white/[0.14] rounded-lg text-white font-medium transition-colors border border-white/[0.08]"
                    >
                      Next Spread →
                    </button>
                  </div>
                </div>
              ) : (
                /* 4B. SINGLE-IMAGE LIGHTBOX STAGE (Full Uncropped Image View) */
                <div className="relative flex-1 min-h-0 w-full flex items-center justify-center p-3 sm:p-6 bg-[#090b0e] overflow-hidden">
                  {/* Subtle ambient light gradient */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_75%)] pointer-events-none" />

                  <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImage}
                        src={cacheBust(currentImage)}
                        alt={`${activeItem.title} - ${currentImageIndex + 1}`}
                        initial={{ opacity: 0, scale: 0.985 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="max-h-full max-w-full w-auto h-auto object-contain rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.7)] select-none border border-white/[0.06]"
                        style={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </AnimatePresence>
                  </div>

                  {/* Previous Image in Gallery */}
                  {galleryImages.length > 1 && (
                    <button
                      type="button"
                      aria-label="Previous gallery image"
                      onClick={prevImage}
                      className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-[#ff1d25] text-white border border-white/20 transition-all shadow-xl backdrop-blur-md hover:scale-105 z-20"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}

                  {/* Next Image in Gallery */}
                  {galleryImages.length > 1 && (
                    <button
                      type="button"
                      aria-label="Next gallery image"
                      onClick={nextImage}
                      className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-[#ff1d25] text-white border border-white/20 transition-all shadow-xl backdrop-blur-md hover:scale-105 z-20"
                    >
                      <ChevronRight size={20} />
                    </button>
                  )}
                </div>
              )}

              {/* Thumbnails Navigator Bar */}
              {galleryImages.length > 1 && (
                <div className="bg-[#0f1217] border-t border-white/[0.08] px-5 py-3 overflow-x-auto flex items-center gap-3 dark-scrollbar">
                  {isFlipbook && viewMode === 'spread'
                    ? spreads.map((spd, sIdx) => {
                        const isCurrent = sIdx === currentSpreadIndex;
                        return (
                          <button
                            key={`spread-thumb-${sIdx}`}
                            type="button"
                            onClick={() => setCurrentSpreadIndex(sIdx)}
                            className={`relative shrink-0 h-14 sm:h-16 px-2 rounded-lg flex items-center gap-1.5 bg-[#171a21] border transition-all duration-200 cursor-pointer ${
                              isCurrent
                                ? 'border-[#ff1d25] ring-2 ring-[#ff1d25]/60 scale-105 opacity-100 shadow-md'
                                : 'border-white/10 opacity-50 hover:opacity-90'
                            }`}
                          >
                            {spd.left && (
                              <img
                                src={cacheBust(spd.left.src)}
                                alt=""
                                className="h-full w-auto object-contain rounded-xs"
                              />
                            )}
                            {spd.right && (
                              <img
                                src={cacheBust(spd.right.src)}
                                alt=""
                                className="h-full w-auto object-contain rounded-xs"
                              />
                            )}
                            <span className="text-[9px] font-bold uppercase text-white/80 block whitespace-nowrap pl-1">
                              {spd.index === 0 ? 'Cover' : `${spd.left?.pageNum}-${spd.right?.pageNum || ''}`}
                            </span>
                          </button>
                        );
                      })
                    : galleryImages.map((imgSrc, idx) => {
                        const isCurrent = idx === currentImageIndex;
                        return (
                          <button
                            key={`${activeItem.id || activeItem.slug}-thumb-${idx}-${imgSrc}`}
                            type="button"
                            onClick={() => setCurrentImageIndex(idx)}
                            className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden transition-all duration-200 cursor-pointer ${
                              isCurrent
                                ? 'ring-2 ring-[#ff1d25] scale-105 opacity-100 shadow-lg'
                                : 'opacity-40 hover:opacity-85 ring-1 ring-white/10'
                            }`}
                          >
                            <img
                              src={cacheBust(imgSrc)}
                              alt=""
                              className="w-full h-full object-cover"
                              loading="eager"
                            />
                            <span className="absolute bottom-0 inset-x-0 bg-black/80 backdrop-blur-xs text-[9px] font-mono text-center text-white/90 py-0.5">
                              {idx + 1}
                            </span>
                          </button>
                        );
                      })}
                </div>
              )}

              {/* Bottom Caption & Details Bar */}
              <div className="px-6 py-4 bg-[#13161c]/95 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-raleway">
                <div className="text-slate-300 max-w-2xl">
                  {activeItem.description && (
                    <p className="line-clamp-2 leading-relaxed text-slate-300">
                      {activeItem.description}
                    </p>
                  )}
                  {activeItem.client && (
                    <span className="text-[11px] text-slate-400 mt-0.5 block">
                      Client: <strong className="text-white">{activeItem.client}</strong>
                      {activeItem.year && ` • ${activeItem.year}`}
                      {isFlipbook && ` • Format: 2-Page Publication Flipbook`}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider shrink-0 self-end sm:self-auto">
                  <button
                    type="button"
                    onClick={prevProject}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    ← Prev Project
                  </button>
                  <span className="text-white/20">|</span>
                  <button
                    type="button"
                    onClick={nextProject}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    Next Project →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
