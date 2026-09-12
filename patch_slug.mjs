import fs from 'fs';

let content = fs.readFileSync('src/pages/work/[slug].astro', 'utf-8');

// We need to:
// 1. Add export const prerender = false;
// 2. Remove getStaticPaths
// 3. Fetch the project based on the slug in Astro.params

const newLogic = `---
export const prerender = false;
import Layout from '../../layouts/Layout.astro';
import { supabase } from '../../supabase.js';
import { slugify } from '../../utils/slugify.js';

const { slug } = Astro.params;

// Fetch all projects to find the matching slug and get related ones
const { data: allProjects } = await supabase
  .from('portfolio_work')
  .select('*')
  .order('created_at', { ascending: false });

if (!allProjects) {
  return Astro.redirect('/404');
}

const project = allProjects.find(p => slugify(p.title) === slug);

if (!project) {
  return Astro.redirect('/404');
}

const { title, category, description, image_url, pdf_url, link } = project;

// Get 4 related projects (excluding current)
const related = allProjects.filter(p => p.id !== project.id).slice(0, 4);
---`;

// Replace everything up to --- (closing of frontmatter)
content = content.replace(/---\nimport Layout[\s\S]*?const related = allProjects.filter\(p => p\.id !== project\.id\)\.slice\(0, 4\);\n---/, newLogic);

fs.writeFileSync('src/pages/work/[slug].astro', content);
console.log("Updated [slug].astro");
