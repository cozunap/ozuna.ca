'use client';

import React, { useState } from 'react';
import { slugify } from '../../utils/slugify.js';
import { useLanguage } from '../../lib/i18n/LanguageContext.jsx';

export default function WorkGalleryClient({ projects, categories }) {
  const { t, isFr, getProjectText } = useLanguage();
  const [selectedCategoryKey, setSelectedCategoryKey] = useState('ALL');

  // Localized category filter labels
  const categoryFilters = [
    { key: 'ALL', label: t.work.allProjects, matchCategory: null },
    { key: 'GRAPHIC', label: t.work.graphicDesign, matchCategory: 'Graphic Design' },
    { key: 'WEB', label: t.work.webDesign, matchCategory: 'Web Design' }
  ];

  const filteredProjects = selectedCategoryKey === 'ALL'
    ? projects
    : projects.filter(p => {
        const currentFilter = categoryFilters.find(f => f.key === selectedCategoryKey);
        return p.category === currentFilter?.matchCategory;
      });

  return (
    <>
      <div className="filter-group">
        {categoryFilters.map((cat) => (
          <button
            key={cat.key}
            type="button"
            className={`filter-btn ${selectedCategoryKey === cat.key ? 'active' : ''}`}
            onClick={() => setSelectedCategoryKey(cat.key)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="gallery-grid" id="portfolio-grid">
        {filteredProjects.map((project) => {
          const localized = getProjectText(project.title, project.category, project.description);
          return (
            <a key={project.id} href={`/work/${slugify(project.title)}`} className="gallery-card">
              <div className="gallery-image-wrap">
                <img 
                  src={project.image_url || '/assets/images/placeholder.jpg'} 
                  alt={project.title} 
                  className="gallery-image" 
                  loading="lazy" 
                />
              </div>
              <h3>{project.title}</h3>
              <p>{localized.category || (isFr ? 'Design graphique' : 'Graphic Design')}</p>
            </a>
          );
        })}

        {filteredProjects.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', gridColumn: '1/-1' }}>
            {t.work.noProjects}
          </p>
        )}
      </div>
    </>
  );
}
