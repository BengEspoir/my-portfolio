import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const disabledSupabaseError = new Error(
  'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in frontend/.env.local.'
);

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.error(disabledSupabaseError.message);
}

function createDisabledQuery() {
  const query = {};
  const result = { data: null, error: disabledSupabaseError };
  const chain = () => query;

  [
    'select',
    'insert',
    'update',
    'upsert',
    'delete',
    'eq',
    'neq',
    'gt',
    'gte',
    'lt',
    'lte',
    'is',
    'in',
    'contains',
    'order',
    'limit',
    'range',
    'single',
    'maybeSingle',
    'match',
    'filter'
  ].forEach((method) => {
    query[method] = chain;
  });

  query.then = (resolve, reject) => Promise.resolve(result).then(resolve, reject);
  query.catch = (reject) => Promise.resolve(result).catch(reject);
  query.finally = (callback) => Promise.resolve(result).finally(callback);

  return query;
}

function createDisabledSupabaseClient() {
  return {
    from: () => createDisabledQuery(),
    channel: () => ({
      on: () => ({
        on: () => ({
          subscribe: () => ({ unsubscribe: () => {} })
        }),
        subscribe: () => ({ unsubscribe: () => {} })
      }),
      subscribe: () => ({ unsubscribe: () => {} })
    }),
    removeChannel: () => {},
    auth: {
      getSession: async () => ({ data: { session: null }, error: disabledSupabaseError }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } }
      }),
      signInWithOtp: async () => ({ data: null, error: disabledSupabaseError }),
      signInWithPassword: async () => ({ data: null, error: disabledSupabaseError }),
      signOut: async () => ({ error: null })
    },
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: disabledSupabaseError }),
        getPublicUrl: () => ({ data: { publicUrl: '' } })
      })
    }
  };
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createDisabledSupabaseClient();

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

  if (!supabaseUrl) return `/${cleanPath}`;
  
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${cleanPath}`;
}

/**
 * Returns an optimized public URL for an image using Supabase image transformations.
 */
export function getOptimizedUrl(path, options = {}, bucket = 'portfolio-assets') {
  if (!path) return '';
  if (!supabaseUrl) return getPublicUrl(path, bucket);
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
