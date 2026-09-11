import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ozzkgwkhiwwgiiuzpudq.supabase.co';
const supabaseKey = 'sb_publishable_c4WNjTKmupP-TM5304GriQ_YM9uXv8_';
const supabase = createClient(supabaseUrl, supabaseKey);

supabase.from('portfolio_work').select('id, title, description').eq('title', 'Turpone Foods').single().then(({data, error}) => {
  if (error) console.error("Error:", error);
  else console.log("Data:", data);
});
