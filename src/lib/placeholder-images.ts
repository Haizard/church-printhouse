import data from '@/app/lib/placeholder-images.json';
import LocalHeroImage from '@/images/_B4A1507.jpg';
import type { StaticImageData } from 'next/image';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string | StaticImageData;
  imageHint: string;
};

const localHeroOverrides: Partial<Record<string, StaticImageData>> = {
  'hero-1': LocalHeroImage,
  'hero-2': LocalHeroImage,
  'hero-3': LocalHeroImage,
  'hero-4': LocalHeroImage,
  'hero-church': LocalHeroImage,
};

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages.map((image) => ({
  ...image,
  imageUrl: localHeroOverrides[image.id] ?? image.imageUrl,
}));
