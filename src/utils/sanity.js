import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: 'yql4r6q3',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-05-02', 
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
