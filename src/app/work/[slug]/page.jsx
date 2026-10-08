export const runtime = 'edge';
import { notFound } from 'next/navigation';
import { supabase } from '../../../supabase.js';
import { slugify } from '../../../utils/slugify.js';

export const revalidate = 0;

async function getProjectBySlug(slug) {
  try {
    const { data: allProjects, error } = await supabase
      .from('portfolio_work')
      .select('*')
      .neq('category', 'site_page')
      .order('created_at', { ascending: false });

    if (error || !allProjects) return null;

    const project = allProjects.find(p => slugify(p.title) === slug);
    if (!project) return null;

    const related = allProjects
      .filter(p => p.id !== project.id)
      .slice(0, 4);

    return { project, related };
  } catch (e) {
    console.error('Error fetching project:', e);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const result = await getProjectBySlug(slug);
  if (!result?.project) return { title: 'Project Not Found | Carlos Ozuna' };

  return {
    title: `${result.project.title} | Portfolio`,
    description: result.project.category || 'Carlos Ozuna Portfolio',
  };
}

import ProjectGalleryView from '../../../components/ProjectGalleryView.jsx';
import FlipbookViewer from '../../../components/FlipbookViewer.jsx';
import WebDesignScreensView from '../../../components/WebDesignScreensView.jsx';

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const result = await getProjectBySlug(slug);

  if (!result || !result.project) {
    notFound();
  }

  const { project, related } = result;
  const { title, category, description, image_url, pdf_url, link } = project;

  // Check if description contains gallery / screens JSON
  let parsedDescription = description || '';
  let galleryImages = [];

  try {
    if (description && (description.trim().startsWith('{') || description.trim().startsWith('['))) {
      const parsed = JSON.parse(description);
      if (parsed.gallery && Array.isArray(parsed.gallery)) {
        galleryImages = parsed.gallery;
        parsedDescription = parsed.text || '';
      } else if (Array.isArray(parsed)) {
        galleryImages = parsed;
        parsedDescription = '';
      }
    }
  } catch (e) {
    // Standard text or html description
  }

  const isWebDesign = category === 'Web Design';

  return (
    <>
      <article className="section" style={{ paddingTop: '8rem' }}>
        <header className="container" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 3.5rem auto' }}>
          <h1 className="title-giant" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: '0.5rem' }}>
            {title}
          </h1>
          {category && (
            <p style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '2rem' }}>
              {category}
            </p>
          )}

          {parsedDescription && parsedDescription.trim() !== '' && (
            <div 
              className="project-description" 
              style={{ fontSize: '1.125rem', color: 'var(--charcoal)', lineHeight: 1.8, marginBottom: '2.5rem', textAlign: 'center', maxWidth: '750px', margin: '0 auto 2.5rem auto' }}
              dangerouslySetInnerHTML={{ __html: parsedDescription }}
            />
          )}

          {link && link.trim() !== '' && link.trim() !== '#' && (
            <div style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
              <a 
                href={link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-gold" 
                style={{ fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '1rem 3rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
              >
                <span>GO TO WEBSITE</span>
                <span>↗</span>
              </a>
            </div>
          )}
        </header>

        {/* INTERACTIVE PDF / FLIPBOOK VIEWER */}
        {pdf_url && (
          <div className="container">
            <FlipbookViewer pdfUrl={pdf_url} title={title} />
          </div>
        )}

        {/* WEB DESIGN MULTI-SCREEN SHOWCASE */}
        {isWebDesign && (galleryImages.length > 0 || image_url) && !pdf_url && (
          <div className="container">
            <WebDesignScreensView screens={galleryImages} title={title} coverImage={image_url} />
          </div>
        )}

        {/* MULTI-IMAGE GALLERY (e.g. Business Cards, Flyers, Graphic Design) */}
        {!isWebDesign && galleryImages.length > 0 && (
          <div className="container">
            <ProjectGalleryView images={galleryImages} title={title} />
          </div>
        )}

        {/* SINGLE COVER IMAGE (for standard Graphic Design items without multi-gallery) */}
        {!isWebDesign && image_url && galleryImages.length === 0 && !pdf_url && (
          <div className="container" style={{ textAlign: 'center' }}>
            <img 
              src={image_url} 
              alt={`${title} Cover`} 
              style={{ width: '100%', maxWidth: '900px', height: 'auto', borderRadius: '6px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }} 
            />
          </div>
        )}
      </article>

      {related.length > 0 && (
        <section className="related-section">
          <div className="container">
            <h3 style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1.25rem', marginBottom: '3rem', fontFamily: "'Inter', sans-serif" }}>
              Related Designs
            </h3>
            <div className="related-grid">
              {related.map(rel => (
                <a key={rel.id} href={`/work/${slugify(rel.title)}`} className="related-card" style={{ display: 'block', overflow: 'hidden', borderRadius: '4px', background: '#fff' }}>
                  <img 
                    src={rel.image_url || '/assets/images/placeholder.jpg'} 
                    alt={rel.title} 
                    loading="lazy" 
                    style={{ width: '100%', display: 'block' }} 
                  />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
