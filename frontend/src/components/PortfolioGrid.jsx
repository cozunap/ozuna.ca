// src/components/PortfolioGrid.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import fallbackItems from '../work_items.json';

export default function PortfolioGrid({ items = [] }) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // Reset image index when switching projects
  const selectProject = (index) => {
    setSelectedItemIndex(index);
    setCurrentImageIndex(0);
  };

  // URL slug, hash, or query param detector (e.g. /work/degan-tax, ?project=degan-tax, or #degan-tax)
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
      }
    }
  }, [portfolioList]);

  const activeItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  // Active project's gallery images (with fallback to single image)
  const galleryImages =
    activeItem && activeItem.gallery && activeItem.gallery.length > 0
      ? activeItem.gallery
      : activeItem
      ? [activeItem.image]
      : [];

  const currentImage = galleryImages[currentImageIndex] || activeItem?.image;

  // Next / Prev Image inside current project gallery
  const prevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  };

  const nextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  };

  // Switch to Next / Prev Project
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

  // Handle keyboard navigation for modal lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedItemIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedItemIndex(null);
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex, currentImageIndex, galleryImages.length]);

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
        {/* Dark Overlay (#020202 with 80% opacity) */}
        <div className="absolute inset-0 bg-[#020202]/80" />

        {/* Hero Title Container */}
        <div className="relative max-w-5xl mx-auto px-4 py-20 sm:py-24 text-center z-10 flex flex-col items-center justify-center">
          {/* Outlined "Work" Title */}
          <h1
            className="font-raleway text-[50px] sm:text-[60px] md:text-[65px] font-black text-transparent select-none z-10 tracking-tight"
            style={{
              WebkitTextStroke: '1px #ffffff',
              stroke: '#ffffff'
            }}
          >
            Work
          </h1>

          {/* Faint "WORK" Watermark overlapping behind */}
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
        {/* Category Filters (.elementor-portfolio__filters) */}
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
            {filteredItems.map((item, index) => (
              <motion.article
                layout
                // Strict React Key: Always globally unique identifier (UUID or stable id)
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
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = '/images/cozuna-contact.jpeg';
                  }}
                />

                {/* Cobalt Blue Overlay on Hover (rgba(0, 58, 167, 0.84)) */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                  style={{ backgroundColor: 'rgba(0, 58, 167, 0.84)' }}
                >
                  <h3 className="font-raleway text-[16px] font-extrabold text-white uppercase tracking-[2px] leading-tight select-none px-2 mb-2">
                    {item.title}
                  </h3>
                  {item.gallery && item.gallery.length > 1 && (
                    <span className="text-[11px] font-bold tracking-widest uppercase text-white/90 bg-black/40 px-3 py-1 rounded-full">
                      {item.gallery.length} Images in Gallery
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="py-24 text-center text-slate-500 font-raleway">
            <p className="text-base uppercase tracking-wider">No projects found in this category.</p>
          </div>
        )}
      </section>

      {/* 4. Full-Featured Interactive Gallery Lightbox */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-2 sm:p-6"
            onClick={() => setSelectedItemIndex(null)}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[96vh] w-full bg-[#111] border border-white/10 rounded-xl overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#161616]">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[11px] uppercase font-extrabold tracking-wider text-[#ff1d25] font-raleway shrink-0">
                    {activeItem.category}
                  </span>
                  <span className="text-white/30 text-xs shrink-0">•</span>
                  <h2 className="text-white font-raleway text-sm sm:text-base font-extrabold uppercase tracking-wide truncate">
                    {activeItem.title}
                  </h2>
                  {galleryImages.length > 1 && (
                    <span className="hidden sm:inline-block text-[11px] text-white/70 bg-white/10 px-2.5 py-0.5 rounded-full font-raleway font-semibold shrink-0">
                      Image {currentImageIndex + 1} of {galleryImages.length}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {(activeItem.link || activeItem.href) && (
                    <a
                      href={activeItem.link || activeItem.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Visit Original Project"
                      className="p-1.5 text-white/70 hover:text-white transition-colors"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedItemIndex(null)}
                    aria-label="Close lightbox"
                    className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Main Image Stage */}
              <div className="relative flex-1 flex items-center justify-center p-3 sm:p-5 bg-black overflow-hidden min-h-[300px] max-h-[60vh] sm:max-h-[66vh]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={currentImage}
                    alt={`${activeItem.title} - ${currentImageIndex + 1}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="max-h-full max-w-full object-contain rounded shadow-lg select-none"
                    onError={(e) => {
                      e.currentTarget.src = activeItem.image;
                    }}
                  />
                </AnimatePresence>

                {/* Previous Image in Gallery */}
                {galleryImages.length > 1 && (
                  <button
                    type="button"
                    aria-label="Previous gallery image"
                    onClick={prevImage}
                    className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-[#ff1d25] text-white border border-white/20 transition-all shadow-xl"
                  >
                    <ChevronLeft size={22} />
                  </button>
                )}

                {/* Next Image in Gallery */}
                {galleryImages.length > 1 && (
                  <button
                    type="button"
                    aria-label="Next gallery image"
                    onClick={nextImage}
                    className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/70 hover:bg-[#ff1d25] text-white border border-white/20 transition-all shadow-xl"
                  >
                    <ChevronRight size={22} />
                  </button>
                )}
              </div>

              {/* Interactive Thumbnail Carousel Strip (when project has multiple images) */}
              {galleryImages.length > 1 && (
                <div className="bg-[#141414] border-t border-white/10 px-4 py-2.5 overflow-x-auto flex items-center gap-2.5 scrollbar-thin scrollbar-thumb-white/20">
                  {galleryImages.map((imgSrc, idx) => {
                    const isCurrent = idx === currentImageIndex;
                    return (
                      <button
                        key={imgSrc + idx}
                        type="button"
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded overflow-hidden transition-all duration-200 cursor-pointer ${
                          isCurrent
                            ? 'ring-2 ring-[#ff1d25] scale-105 opacity-100'
                            : 'opacity-50 hover:opacity-90 hover:scale-100 ring-1 ring-white/10'
                        }`}
                      >
                        <img
                          src={imgSrc}
                          alt=""
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Bottom Caption & Project Details Bar */}
              <div className="px-5 py-3 bg-[#181818] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-raleway">
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
