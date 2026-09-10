import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://whegihzalfnmabgxsxxf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoZWdpaHphbGZubWFiZ3hzeHhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MjczMTMsImV4cCI6MjA5NDEwMzMxM30.TsfQUQ2H-N0ix6cb2MPl7G3pnrKc8tXdAKlg-p1U3jA';

export const supabase = createClient(supabaseUrl, supabaseKey);
