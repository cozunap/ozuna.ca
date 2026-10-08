export const runtime = 'edge';
import { notFound } from 'next/navigation';
import { supabase } from '../../../supabase.js';
import { slugify } from '../../../utils/slugify.js';
import ProjectDetailClient from './ProjectDetailClient.jsx';

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

  return <ProjectDetailClient project={result.project} related={result.related} />;
}
