import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ozzkgwkhiwwgiiuzpudq.supabase.co';
const supabaseKey = 'sb_publishable_c4WNjTKmupP-TM5304GriQ_YM9uXv8_';
const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  const { data } = await supabase.from('portfolio_work').select('title, description').order('created_at', { ascending: false });
  console.log("Last 3 projects HTML:");
  data.slice(0, 3).forEach(d => {
    console.log(`\n--- ${d.title} ---`);
    console.log(d.description);
  });
}
check();
