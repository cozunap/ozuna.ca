export const runtime = 'edge';
import { supabase } from '../../supabase.js';
import WorkPageClient from './WorkPageClient.jsx';

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
  return <WorkPageClient projects={projects} />;
}
