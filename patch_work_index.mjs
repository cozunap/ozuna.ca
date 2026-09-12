import fs from 'fs';

let content = fs.readFileSync('src/pages/work/index.astro', 'utf-8');

const newLogic = `---
export const prerender = false;
import Layout from '../../layouts/Layout.astro';
import { supabase } from '../../supabase.js';
import { slugify } from '../../utils/slugify.js';

let projects = [];
try {
  const { data } = await supabase
    .from('portfolio_work')
    .select('*')
    .order('created_at', { ascending: false });
  if (data) projects = data;
} catch (e) {
  console.error("Error fetching projects", e);
}

// Get unique categories for the filter
const categories = ['All Projects', ...new Set(projects.map(p => p.category).filter(Boolean))];
---`;

content = content.replace(/---\nimport Layout[\s\S]*?const categories = \['All Projects', ...new Set\(projects\.map\(p => p\.category\)\.filter\(Boolean\)\)\];\n---/, newLogic);

fs.writeFileSync('src/pages/work/index.astro', content);
console.log("Updated work/index.astro");
