export const runtime = 'edge';
import { supabase } from '../../supabase.js';

export const revalidate = 0;

export const metadata = {
  title: 'About Me – Carlos Ozuna | Senior Graphic Designer & Web Developer',
  description: "Hi there! I'm a graphic designer with 20+ years of experience crafting visuals for brands, print media, agencies, and digital platforms.",
};

async function getAboutContent() {
  const defaultContent = {
    heroTitle: 'About',
    heroSubtitle: 'A little bit about who I am and what I do.',
    headline: "Let's Create Something Great Together",
    intro: "Hi there! I'm a graphic designer with 20+ years of experience crafting visuals for brands, print media, agencies, and digital platforms. I thrive on collaboration, and my favourite part of the job is turning ideas into designs that truly connect with people.",
    whatIBringTitle: "What I Bring:",
    skills: [
      "Mastery of Adobe tools (Photoshop, InDesign, Illustrator, WordPress y CSS3) to create polished, versatile work.",
      "A deep understanding of print and digital design—from magazines and promotional materials to social campaigns and email marketing.",
      "A humble, team-first mindset: I listen closely, adapt quickly, and believe feedback makes every project stronger.",
      "Fluent communication in English, French, and Spanish, which helps me collaborate smoothly across cultures."
    ],
    approachTitle: "My Approach:",
    approachText: "Over the years, I've learned that great design starts with empathy. I ask questions, respect deadlines, and keep things simple and purposeful. Whether it's a logo, a brochure, or a digital ad, my goal is to deliver work that feels both meaningful and effortless.",
    closingText: "If you're looking for a professional graphic designer who loves design (and is excited by well-chosen typography or an engaging layout!), let's talk. I'm open to full-time, freelance, or contract positions where I can contribute, learn, and grow with a caring team.",
    thanksText: "Thanks for your time—I'd be honoured to help bring your company to the next level.",
    contactTitle: "Contact Carlos Ozuna",
    cvLink: "/carlos-ozuna-cv.pdf",
    contactEmail: "contact@ozuna.ca"
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
    <div className="about-original-page">
      {/* HERO BANNER SECTION */}
      <section 
        className="sticky-hero-banner" 
        style={{
          backgroundImage: "url('/assets/images/portfolio-header-bg.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="sticky-hero-overlay"></div>
        <div className="container sticky-hero-content">
          <h1 className="title-giant text-white" style={{ marginBottom: '1rem' }}>{content.heroTitle || 'About'}</h1>
          <p className="subtitle text-white" style={{ margin: '0 auto', opacity: 0.9 }}>{content.heroSubtitle}</p>
        </div>
      </section>

      {/* BODY CONTENT MATCHING OZUNA.CA/ABOUT-ME/ */}
      <div className="page-content-wrapper">
        <section className="about-content-section">
          <div className="container about-container">

            {/* WATERMARK & OUTLINE "ABOUT" HEADINGS */}
            <div className="about-header-titles">
              <h2 className="about-outline-title">about</h2>
              <h2 className="about-watermark-title">about</h2>
              
              <div className="about-down-icon-wrap">
                <a href="#about-contact-section" className="about-down-icon" aria-label="Scroll to contact">
                  <svg viewBox="0 0 612 792" fill="currentColor">
                    <path d="M304.8,477.3c12.2-12.3,23.5-23.7,34.8-35c47.1-47.1,94.3-94.2,141.4-141.3c1.1-1.1,2.3-2.3,3.6-3.3 c3.3-2.4,7.5-2.1,10.2,0.8c2.7,2.8,3,7.1,0.6,10.3c-0.9,1.2-2,2.2-3.1,3.3c-58.9,58.8-117.8,117.7-176.7,176.5 c-1.4,1.4-2.8,2.9-4.2,4.3c-4,4-8.4,4-12.5-0.1c-13.7-13.7-27.3-27.5-41-41.2c-46.1-46.2-92.2-92.4-138.3-138.5 c-1.1-1.1-2.4-2.3-3.3-3.6c-2.2-3.2-1.7-7.3,1-9.9c2.6-2.6,7-3,10-0.8c1.2,0.9,2.2,2,3.3,3.1c57,57,113.9,114.1,170.9,171.2 C302.6,474.1,303.5,475.6,304.8,477.3z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* EDITORIAL TEXT BODY */}
            <div className="about-text-body">
              <p className="about-lead-intro">
                <strong>{content.headline || "Let's Create Something Great Together"}</strong>
                <br />
                {content.intro}
              </p>

              <p className="about-subheading-bold">
                <strong>{content.whatIBringTitle || "What I Bring:"}</strong>
              </p>

              <ul className="about-skills-list">
                {content.skills?.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>

              <p className="about-approach-para">
                <strong>{content.approachTitle || "My Approach:"}</strong>
                <br />
                {content.approachText}
              </p>

              <p className="about-closing-para">
                {content.closingText}
              </p>

              <p className="about-thanks-para">
                {content.thanksText}
              </p>
            </div>

            {/* CIRCULAR BADGE / BRAND EMBLEM */}
            <div className="about-emblem-wrap">
              <div className="about-emblem-badge">
                <svg className="rotating-text-path" viewBox="0 0 300 300" width="180" height="180">
                  <path id="circlePath" fill="none" d="M 150, 150 m -100, 0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0" />
                  <text fill="var(--charcoal)" fontSize="14" letterSpacing="3" fontWeight="700">
                    <textPath href="#circlePath" startOffset="0%">
                      PORTFOLIO OF CARLOS OZUNA • PORTFOLIO OF CARLOS OZUNA •
                    </textPath>
                  </text>
                </svg>
                <div className="about-emblem-center-dot"></div>
              </div>
            </div>

            {/* CONTACT CARLOS OZUNA SECTION */}
            <div id="about-contact-section" className="about-contact-block">
              <h2 className="about-contact-heading">{content.contactTitle || "Contact Carlos Ozuna"}</h2>
              
              <ul className="about-contact-links-list">
                <li>
                  <a href={content.cvLink || "/carlos-ozuna-cv.pdf"} target="_blank" rel="noopener noreferrer">
                    Download my CV.
                  </a>
                </li>
                <li>
                  <a href="/work">
                    See Carlos Ozuna&apos;s work
                  </a>
                </li>
                <li>
                  <a href={`mailto:${content.contactEmail || "contact@ozuna.ca"}`}>
                    contact me
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
