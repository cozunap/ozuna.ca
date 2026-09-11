import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://ozzkgwkhiwwgiiuzpudq.supabase.co', 'sb_publishable_c4WNjTKmupP-TM5304GriQ_YM9uXv8_');

async function migrate() {
  const workDir = path.join(process.cwd(), 'src/content/work');
  const files = fs.readdirSync(workDir).filter(f => f.endsWith('.md'));
  
  for (const file of files) {
    const content = fs.readFileSync(path.join(workDir, file), 'utf-8');
    const { data } = matter(content);
    
    // Map category string to human readable
    let category = data.category === 'graphic' ? 'Graphic Design' : data.category === 'web' ? 'Web Design' : 'Other';
    
    const { error } = await supabase.from('portfolio_work').insert([{
      title: data.title || file.replace('.md', ''),
      category: category,
      description: data.description || '',
      image_url: data.image || '',
      pdf_url: data.pdfFile || ''
    }]);
    
    if (error) {
      console.error('Error inserting', file, error.message);
    } else {
      console.log('Migrated', file);
    }
  }
  console.log('Migration complete!');
}

migrate();
