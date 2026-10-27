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

      {/* 4. Fullscreen Immersive Gallery (95vh Clean Minimal Design matching cozuna.com) */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-2 sm:p-4 md:p-6"
            onClick={() => setSelectedItemIndex(null)}
          >
            {/* Minimalist Top Close & Actions Bar */}
            <div
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 flex items-center gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              {/* PDF Download Button */}
              {(activeItem.pdfUrl || (isFlipbook && '/images/Roberto-Clemente-Booklet.pdf')) && (
                <a
                  href={activeItem.pdfUrl || '/images/Roberto-Clemente-Booklet.pdf'}
                  download="Roberto-Clemente-Booklet.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Download Complete PDF Publication"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#ff1d25] text-white border border-white/20 text-xs font-bold uppercase tracking-wider transition-all backdrop-blur-md"
                >
                  <Download size={13} />
                  <span>PDF</span>
                </a>
              )}

              {/* View Mode Toggle for Flipbooks */}
              {isFlipbook && (
                <div className="flex items-center bg-white/10 border border-white/20 rounded-full p-1 text-xs backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setViewMode('spread')}
                    className={`px-3 py-1 rounded-full font-semibold transition-all ${
                      viewMode === 'spread'
                        ? 'bg-[#ff1d25] text-white shadow-md'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Spread
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('single')}
                    className={`px-3 py-1 rounded-full font-semibold transition-all ${
                      viewMode === 'single'
                        ? 'bg-[#ff1d25] text-white shadow-md'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Single
                  </button>
                </div>
              )}

              {/* External Link */}
              {(activeItem.link || activeItem.href) && (
                <a
                  href={activeItem.link || activeItem.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Visit Original Project"
                  className="p-2.5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur-md"
                >
                  <ExternalLink size={18} />
                </a>
              )}

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedItemIndex(null)}
                aria-label="Close modal"
                className="p-2.5 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all backdrop-blur-md"
              >
                <X size={20} />
              </button>
            </div>

            {/* Left Chevron Button */}
            {galleryImages.length > 1 && (
              <button
                type="button"
                aria-label="Previous image"
                onClick={(e) => {
                  e.stopPropagation();
                  isFlipbook && viewMode === 'spread' ? prevSpread(e) : prevImage(e);
                }}
                className="absolute left-2 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-50 text-white/60 hover:text-white bg-black/40 hover:bg-black/80 rounded-full p-3 sm:p-4 transition-all hover:scale-110 backdrop-blur-sm"
              >
                <ChevronLeft size={28} className="sm:w-9 sm:h-9" />
              </button>
            )}

            {/* Right Chevron Button */}
            {galleryImages.length > 1 && (
              <button
                type="button"
                aria-label="Next image"
                onClick={(e) => {
                  e.stopPropagation();
                  isFlipbook && viewMode === 'spread' ? nextSpread(e) : nextImage(e);
                }}
                className="absolute right-2 sm:right-6 md:right-10 top-1/2 -translate-y-1/2 z-50 text-white/60 hover:text-white bg-black/40 hover:bg-black/80 rounded-full p-3 sm:p-4 transition-all hover:scale-110 backdrop-blur-sm"
              >
                <ChevronRight size={28} className="sm:w-9 sm:h-9" />
              </button>
            )}

            {/* 95vh Stage Container: Clean, Minimal, Full-Bleed Showcase */}
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-[95vh] max-w-7xl flex flex-col items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {isFlipbook && viewMode === 'spread' ? (
                /* 4A. INTERACTIVE 2-PAGE SPREAD FLIPBOOK VIEWER (95vh) */
                <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden select-none">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`spread-${currentSpreadIndex}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="relative flex items-center justify-center max-h-[85vh] max-w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                    >
                      {currentSpread.index === 0 ? (
                        <div className="relative flex items-center justify-center bg-[#151515] max-h-[85vh]">
                          <div className="w-4 sm:w-6 h-full bg-gradient-to-r from-[#222] via-[#333] to-[#111] shadow-inner border-r border-black/50" />
                          <img
                            src={cacheBust(currentSpread.right.src)}
                            alt="Booklet Cover"
                            className="max-h-[85vh] max-w-full w-auto object-contain block"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center bg-[#181818] divide-x divide-black/60 max-h-[85vh]">
                          <div className="relative max-h-[85vh] flex-1 overflow-hidden group flex items-center justify-center">
                            {currentSpread.left && (
                              <img
                                src={cacheBust(currentSpread.left.src)}
                                alt={`Page ${currentSpread.left.pageNum}`}
                                className="max-h-[85vh] max-w-full w-auto object-contain block"
                              />
                            )}
                          </div>
                          <div className="relative max-h-[85vh] flex-1 overflow-hidden group flex items-center justify-center">
                            {currentSpread.right && (
                              <img
                                src={cacheBust(currentSpread.right.src)}
                                alt={`Page ${currentSpread.right.pageNum}`}
                                className="max-h-[85vh] max-w-full w-auto object-contain block"
                              />
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Spread Indicator */}
                  <div className="mt-3 text-white/60 font-medium tracking-widest text-xs uppercase font-mono">
                    {currentSpread?.label} ({currentSpreadIndex + 1} / {spreads.length})
                  </div>
                </div>
              ) : (
                /* 4B. SINGLE-IMAGE VIEW (95vh, Full Uncropped View with Rounded Corners) */
                <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
                  <div className="relative w-full h-[88vh] flex items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImage}
                        src={cacheBust(currentImage)}
                        alt={`${activeItem.title} - ${currentImageIndex + 1}`}
                        initial={{ opacity: 0, scale: 0.985 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="max-h-full max-w-full w-auto h-auto object-contain rounded-2xl shadow-2xl select-none"
                        style={{
                          maxHeight: '100%',
                          maxWidth: '100%',
                          objectFit: 'contain'
                        }}
                      />
                    </AnimatePresence>
                  </div>

                  {/* Counter: 1 / 43 (matching cozuna.com design) */}
                  {galleryImages.length > 1 && (
                    <div className="mt-2 text-zinc-400 font-medium tracking-widest text-sm font-mono select-none">
                      {currentImageIndex + 1} / {galleryImages.length}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
