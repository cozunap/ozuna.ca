export const runtime = 'edge';
import { supabase } from '../../supabase.js';
import AboutPageClient from './AboutPageClient.jsx';

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
  return <AboutPageClient content={content} />;
}
