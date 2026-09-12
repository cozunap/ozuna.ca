import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ozzkgwkhiwwgiiuzpudq.supabase.co';
const supabaseKey = 'sb_publishable_c4WNjTKmupP-TM5304GriQ_YM9uXv8_';
const supabase = createClient(supabaseUrl, supabaseKey);

// Get the 3 most recently created or we can't sort by updated_at if it doesn't exist, let's sort by created_at 
// or just fetch all and find the one that has style tags.
supabase.from('portfolio_work').select('title, description').then(({data}) => {
  data.forEach(d => {
    if (d.description && d.description.includes('style=')) {
      console.log("Found styles in:", d.title);
      console.log(d.description.substring(0, 150));
    }
  });
});
