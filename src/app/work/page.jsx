export const runtime = 'edge';
import { supabase } from '../../supabase.js';
import WorkGalleryClient from './WorkGalleryClient.jsx';

export const revalidate = 0;

export const metadata = {
  title: 'Work | Carlos Ozuna',
  description: 'A curated gallery of graphic design, branding, and web development projects.',
};

async function getAllProjects() {
  try {
    const { data, error } = await supabase
      .from('portfolio_work')
      .select('*')
      .neq('category', 'site_page')
      .order('created_at', { ascending: false });

    if (error || !data) return [];
    return data;
  } catch (e) {
    console.error('Error fetching projects:', e);
    return [];
  }
}

export default async function WorkPage() {
  const projects = await getAllProjects();
  const categories = ['All Projects', ...new Set(projects.map(p => p.category).filter(Boolean))];

  return (
    <div>
      <section 
        className="portfolio-hero" 
        style={{
          position: 'relative',
          padding: '8rem 0',
          marginBottom: '4rem',
          backgroundImage: "url('/assets/images/portfolio-header-bg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', zIndex: 1 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <h1 className="title-giant text-white" style={{ marginBottom: '1rem' }}>Portfolio</h1>
          <p className="subtitle text-white" style={{ margin: '0 auto', opacity: 0.9 }}>
            A curated gallery of my latest graphic design, branding, and web development projects.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <WorkGalleryClient projects={projects} categories={categories} />
        </div>
      </section>
    </div>
  );
}
