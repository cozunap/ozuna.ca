import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ozzkgwkhiwwgiiuzpudq.supabase.co';
const supabaseKey = 'sb_publishable_c4WNjTKmupP-TM5304GriQ_YM9uXv8_';

// Cloudflare Workers Fetch API specification strictly prohibits 'body' on GET/HEAD requests.
// @supabase/postgrest-js passes `body: undefined`, which in Cloudflare throws:
// "TypeError: Request with a GET or HEAD method cannot have a body."
const safeFetch = (url, options = {}) => {
  if (options && (options.method === 'GET' || options.method === 'HEAD')) {
    delete options.body;
  }
  return fetch(url, options);
};

export const supabase = createClient(supabaseUrl, supabaseKey, {
  global: {
    fetch: safeFetch
  }
});

