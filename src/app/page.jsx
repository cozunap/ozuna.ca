export const runtime = 'edge';
import { supabase } from '../supabase.js';
import HomeClient from './HomeClient.jsx';

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

export default async function HomePage() {
  const content = await getHomeContent();
  return <HomeClient content={content} />;
}
