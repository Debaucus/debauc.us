import type { ImageMetadata } from 'astro';

export function getLocalImage(imagePath: string | null | undefined) {
  if (!imagePath) return null;

  // glob matching
  const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/media/*.{jpeg,jpg,png,gif,webp}');
  
  const filename = imagePath.split('/').pop();
  if (!filename) return null;

  const key = `/src/assets/media/${filename}`;
  
  return images[key];
}
