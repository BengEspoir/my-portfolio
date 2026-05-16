import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials missing. Check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Returns the public URL for an image in Supabase Storage.
 * If the path is already a full URL, it returns it as is.
 * If the path starts with '/', it prepends the Supabase storage base URL.
 */
export function getPublicUrl(path, bucket = 'portfolio-assets') {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${cleanPath}`;
}
