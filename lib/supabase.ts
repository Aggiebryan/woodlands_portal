
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pzjeitfwdzdefuwqqjaz.supabase.co';

// The Supabase Anon/Publishable Key provided for the project.
// We use process.env.SUPABASE_ANON_KEY if available, otherwise fallback to the provided key.
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_K9eSDnPrzTjS0g2s-h-TbA__1M6__pQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
