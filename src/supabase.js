import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ozzkgwkhiwwgiiuzpudq.supabase.co';
const supabaseKey = 'sb_publishable_c4WNjTKmupP-TM5304GriQ_YM9uXv8_';

export const supabase = createClient(supabaseUrl, supabaseKey);
