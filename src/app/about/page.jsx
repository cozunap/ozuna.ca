export const runtime = 'edge';
import { supabase } from '../../supabase.js';

export const revalidate = 0;

export const metadata = {
  title: 'About | Carlos Ozuna',
  description: 'Learn more about Carlos Ozuna, graphic designer and web developer with 20+ years of experience.',
};

async function getAboutContent() {
  const defaultContent = {
    heroTitle: 'About',
    heroSubtitle: 'A little bit about who I am and what I do.',
    headline: "Let's Create Something Great Together",
    intro: "Hi there! I'm a graphic designer with 20+ years of experience crafting visuals for brands, print media, agencies, and digital platforms. I thrive on collaboration, and my favourite part of the job is turning ideas into designs that truly connect with people.",
    body1: "Over the years, I've learned that great design starts with empathy. I ask questions, respect deadlines, and keep things simple and purposeful. Whether it's a logo, a brochure, or a digital ad, my goal is to deliver work that feels both meaningful and effortless.",
    body2: "If you're looking for a professional graphic designer who loves design (and is excited by well-chosen typography or an engaging layout!), let's talk. I'm open to full-time, freelance, or contract positions where I can contribute, learn, and grow with a caring team.",
    body3: "Thanks for your time—I'd be honoured to help bring your company to the next level.",
    contactTitle: 'Contact Carlos Ozuna',
    cvLink: '/carlos-ozuna-cv.pdf',
    contactEmail: 'contact@ozuna.ca'
  };

  try {
    const { data } = await supabase
      .from('portfolio_work')
      .select('description')
      .eq('title', '__page_about__')
      .eq('category', 'site_page')
      .maybeSingle();

    if (data?.description) {
      return { ...defaultContent, ...JSON.parse(data.description) };
    }
  } catch (e) {
    console.error('Error fetching about page settings:', e);
  }
  return defaultContent;
}

export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <div>
      <section 
        className="about-hero" 
        style={{
          position: 'relative',
          padding: '8rem 0',
          marginBottom: '4rem',
          backgroundImage: "url('/assets/images/portfolio-header-bg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top'
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', zIndex: 1 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <h1 className="title-giant text-white" style={{ marginBottom: '1rem' }}>{content.heroTitle}</h1>
          <p className="subtitle text-white" style={{ margin: '0 auto', opacity: 0.9 }}>{content.heroSubtitle}</p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.125rem', color: 'var(--navy)', lineHeight: 1.8, textAlign: 'center' }}>
        <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>
          {content.headline}
        </h3>
        <p style={{ marginBottom: '2.5rem' }}>{content.intro}</p>

        <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
          {content.body1 && (
            <p style={{ marginBottom: '1.5rem' }}>{content.body1}</p>
          )}
          {content.body2 && (
            <p style={{ marginBottom: '1.5rem' }}>{content.body2}</p>
          )}
          {content.body3 && (
            <p>{content.body3}</p>
          )}
        </div>
      </div>

      <div className="section-sm" style={{ background: '#f1f5f9', textAlign: 'center', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>{content.contactTitle}</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', maxWidth: '300px', margin: '0 auto' }}>
            <a href={content.cvLink || '/carlos-ozuna-cv.pdf'} download className="btn btn-outline" style={{ width: '100%', borderColor: 'var(--navy)' }}>
              Download My CV
            </a>
            <a href="/work" className="btn btn-outline" style={{ width: '100%', borderColor: 'var(--navy)' }}>
              See Carlos Ozuna's Work
            </a>
            <a href={`mailto:${content.contactEmail || 'contact@ozuna.ca'}`} className="btn btn-gold" style={{ width: '100%' }}>
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
