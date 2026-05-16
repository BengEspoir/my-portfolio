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

/**
 * Returns an optimized public URL for an image using Supabase image transformations.
 */
export function getOptimizedUrl(path, options = {}, bucket = 'portfolio-assets') {
  if (!path) return '';
  if (path.startsWith('http') && !path.includes(supabaseUrl)) return path;

  const { width, height, quality = 80, format = 'webp' } = options;
  
  // If it's a full URL from our Supabase instance, extract the path
  let cleanPath = path;
  if (path.includes(`${supabaseUrl}/storage/v1/object/public/${bucket}/`)) {
    cleanPath = path.replace(`${supabaseUrl}/storage/v1/object/public/${bucket}/`, '');
  } else if (path.startsWith('/')) {
    cleanPath = path.substring(1);
  }

  const params = new URLSearchParams();
  if (width) params.append('width', width);
  if (height) params.append('height', height);
  if (quality) params.append('quality', quality);
  if (format) params.append('format', format);

  return `${supabaseUrl}/storage/v1/render/image/public/${bucket}/${cleanPath}?${params.toString()}`;
}
