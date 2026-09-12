'use client';

import React, { useState } from 'react';
import { slugify } from '../../utils/slugify.js';

export default function WorkGalleryClient({ projects, categories }) {
  const [selectedCategory, setSelectedCategory] = useState('All Projects');

  const filteredProjects = selectedCategory === 'All Projects'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <>
      <div className="filter-group text-center" style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="gallery-grid" id="portfolio-grid">
        {filteredProjects.map((project) => (
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
            <p>{project.category || 'Graphic Design'}</p>
          </a>
        ))}
        {filteredProjects.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', gridColumn: '1/-1' }}>
            No projects found.
          </p>
        )}
      </div>
    </>
  );
}
