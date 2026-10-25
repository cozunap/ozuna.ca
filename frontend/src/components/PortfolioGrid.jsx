// src/components/PortfolioGrid.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers } from 'lucide-react';

export default function PortfolioGrid({ items = [] }) {
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filters = [
    { label: 'ALL', value: 'ALL' },
    { label: 'GRAPHIC DESIGN', value: 'GRAPHIC DESIGN' },
    { label: 'WEB DESIGN', value: 'WEB DESIGN' }
  ];

  // Exact database string matching rule (case-insensitive normalized)
  const filteredItems = items.filter((item) => {
    if (activeFilter === 'ALL') return true;
    return (item.category || '').trim().toUpperCase() === activeFilter;
  });

  return (
    <section id="portfolio" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <span className="text-accent font-bold text-xs uppercase tracking-widest flex items-center gap-2 mb-2">
            <Layers size={14} /> Selected Works
          </span>
          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight uppercase text-white">
            Portfolio Showcase
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 bg-card p-1.5 rounded-2xl border border-subtle">
          {filters.map((f) => {
            const isActive = activeFilter === f.value;
            return (
              <button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-accent text-white shadow-lg shadow-accent/30'
                    : 'text-slate-400 hover:text-white hover:bg-surface'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Portfolio Cards */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              layout
              // Strict React Key: Always globally unique database UUID
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              className="portfolio-card group bg-card rounded-2xl overflow-hidden border border-subtle flex flex-col"
            >
              {/* Image Container with Zoom */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&auto=format&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dominant/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-dominant/80 backdrop-blur-md border border-white/10 text-white">
                    {item.category}
                  </span>
                </div>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-4 right-4 p-2.5 rounded-full bg-accent text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg"
                    title="Visit Project"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>

              {/* Card Meta Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-muted mb-2">
                    <span>{item.client || 'Client Project'}</span>
                    {item.year && <span>{item.year}</span>}
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="mt-2 text-sm text-slate-400 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>

                {item.link && (
                  <div className="mt-4 pt-4 border-t border-subtle/50 flex items-center justify-between text-xs font-semibold text-accent">
                    <span className="uppercase tracking-wider">Explore Live</span>
                    <ExternalLink size={14} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredItems.length === 0 && (
        <div className="py-20 text-center text-muted">
          <p className="text-lg">No projects found in this category.</p>
        </div>
      )}
    </section>
  );
}
