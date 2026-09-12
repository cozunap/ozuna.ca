export const runtime = 'edge';
import { supabase } from '../supabase.js';
import { slugify } from '../utils/slugify.js';

export const revalidate = 0;

async function getHomeContent() {
  const defaultContent = {
    heroTitleLine1: 'Elevating Brands',
    heroTitleLine2: 'through Design.',
    heroSubtitle: 'I am a graphic designer & web developer specializing in premium digital experiences, brand identity, and scalable design systems.',
    btn1Text: 'View Portfolio',
    btn1Link: '/work',
    btn2Text: 'About Me',
    btn2Link: '/about',
    sectionTitle: 'Selected Works'
  };

  try {
    const { data } = await supabase
      .from('portfolio_work')
      .select('description')
      .eq('title', '__page_home__')
      .eq('category', 'site_page')
      .maybeSingle();

    if (data?.description) {
      return { ...defaultContent, ...JSON.parse(data.description) };
    }
  } catch (e) {
    console.error('Error fetching home page settings:', e);
  }
  return defaultContent;
}

async function getFeaturedProjects() {
  try {
    const { data, error } = await supabase
      .from('portfolio_work')
      .select('*')
      .neq('category', 'site_page')
      .order('created_at', { ascending: false });

    if (error || !data) return [];

    let projects = data.filter(p => p.featured).slice(0, 3);
    if (projects.length < 3) {
      const remaining = data.filter(p => !p.featured).slice(0, 3 - projects.length);
      projects = [...projects, ...remaining];
    }
    return projects;
  } catch (e) {
    console.error('Error fetching projects:', e);
    return [];
  }
}

export default async function HomePage() {
  const [content, projects] = await Promise.all([
    getHomeContent(),
    getFeaturedProjects()
  ]);

  return (
    <div>
      <section className="hero-video-section">
        <div className="hero-video-bg">
          <video autoPlay loop muted playsInline className="hero-video-element">
            <source src="/assets/videos/designer-working.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="hero-overlay"></div>
        
        <div className="container hero-content text-center">
          <h1 className="title-giant text-white">
            {content.heroTitleLine1} <br />
            <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>{content.heroTitleLine2}</span>
          </h1>
          <p className="subtitle text-white" style={{ margin: '0 auto 3rem auto', opacity: 0.9 }}>
            {content.heroSubtitle}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href={content.btn1Link || '/work'} className="btn btn-gold">{content.btn1Text || 'View Portfolio'}</a>
            <a href={content.btn2Link || '/about'} className="btn btn-outline-white">{content.btn2Text || 'About Me'}</a>
          </div>
        </div>
      </section>

      <section className="section container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
          <h2 className="title-section" style={{ margin: 0 }}>{content.sectionTitle || 'Selected Works'}</h2>
          <a href="/work" style={{ color: 'var(--gold)', fontWeight: 600, fontSize: '1.1rem' }}>
            View all works &rarr;
          </a>
        </div>
        
        <div className="gallery-grid">
          {projects.map((project) => (
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
          {projects.length === 0 && (
            <p style={{ color: 'var(--text-muted)', gridColumn: '1/-1' }}>No projects added yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
