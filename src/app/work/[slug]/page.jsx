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

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const result = await getProjectBySlug(slug);

  if (!result || !result.project) {
    notFound();
  }

  const { project, related } = result;
  const { title, category, description, image_url, pdf_url, link } = project;

  return (
    <>
      <article className="section" style={{ paddingTop: '5rem' }}>
        <header className="container" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 4rem auto' }}>
          <h1 className="title-giant" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, marginBottom: '0.5rem' }}>
            {title}
          </h1>
          {category && (
            <p style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '2rem' }}>
              {category}
            </p>
          )}

          {description && description.trim() !== '' && (
            <div 
              className="project-description" 
              style={{ fontSize: '1.125rem', color: 'var(--navy)', lineHeight: 1.8, marginBottom: '2.5rem', textAlign: 'left' }}
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}

          {link && link.trim() !== '' && link.trim() !== '#' && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-gold" style={{ fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '1rem 3rem' }}>
              GO TO WEBSITE
            </a>
          )}
        </header>

        {pdf_url && (
          <div className="container" style={{ marginBottom: '4rem' }}>
            <h3 style={{ textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '1.25rem', marginBottom: '2rem', fontFamily: "'Inter', sans-serif" }}>
              Interactive Flipbook
            </h3>
            <div className="_df_book" source={encodeURI(pdf_url)} id="pdf-flipbook" style={{ height: '600px', width: '100%' }}></div>
          </div>
        )}

        <div className="container">
          {image_url && (
            <img 
              src={image_url} 
              alt={`${title} Cover`} 
              style={{ width: '100%', height: 'auto', borderRadius: '4px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }} 
            />
          )}
        </div>
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
