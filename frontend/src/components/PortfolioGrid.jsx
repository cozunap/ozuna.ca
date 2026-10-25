// src/components/PortfolioGrid.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import fallbackItems from '../work_items.json';

export default function PortfolioGrid({ items = [] }) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

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

  // Handle keyboard navigation for modal lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedItemIndex === null) return;
      if (e.key === 'Escape') {
        setSelectedItemIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setSelectedItemIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'ArrowRight') {
        setSelectedItemIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedItemIndex, filteredItems.length]);

  const activeItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

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
                onClick={() => setSelectedItemIndex(index)}
                className="group relative aspect-square w-full overflow-hidden bg-[#111111] cursor-pointer rounded-none"
              >
                {/* Project Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to local image or unsplash
                    e.currentTarget.src = '/images/cozuna-contact.jpeg';
                  }}
                />

                {/* Cobalt Blue Overlay on Hover (rgba(0, 58, 167, 0.84)) */}
                <div
                  className="absolute inset-0 flex items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
                  style={{ backgroundColor: 'rgba(0, 58, 167, 0.84)' }}
                >
                  <h3 className="font-raleway text-[16px] font-extrabold text-white uppercase tracking-[2px] leading-tight select-none px-2">
                    {item.title}
                  </h3>
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

      {/* 4. Full-Screen Interactive Lightbox Viewer */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setSelectedItemIndex(null)}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl max-h-[90vh] w-full bg-[#111] border border-white/10 rounded-lg overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#181818]">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] uppercase font-bold tracking-wider text-[#ff1d25] font-raleway">
                    {activeItem.category}
                  </span>
                  <span className="text-white/30 text-xs">•</span>
                  <h2 className="text-white font-raleway text-sm sm:text-base font-extrabold uppercase tracking-wide truncate max-w-md">
                    {activeItem.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
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

              {/* High-Resolution Media Canvas */}
              <div className="relative flex-1 flex items-center justify-center p-4 sm:p-6 bg-black overflow-auto min-h-[350px] max-h-[75vh]">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="max-h-[68vh] max-w-full object-contain rounded shadow-lg"
                />

                {/* Previous Button */}
                <button
                  type="button"
                  aria-label="Previous project"
                  onClick={() =>
                    setSelectedItemIndex((prev) =>
                      prev > 0 ? prev - 1 : filteredItems.length - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#ff1d25] text-white border border-white/20 transition-all shadow-lg"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Next Button */}
                <button
                  type="button"
                  aria-label="Next project"
                  onClick={() =>
                    setSelectedItemIndex((prev) =>
                      prev < filteredItems.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-[#ff1d25] text-white border border-white/20 transition-all shadow-lg"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Bottom Caption Bar */}
              <div className="px-6 py-3 bg-[#181818] border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-raleway">
                <span>
                  Project {selectedItemIndex + 1} of {filteredItems.length}
                </span>
                <span className="hidden sm:inline text-slate-500">
                  Use Left / Right arrow keys or Escape to navigate
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
