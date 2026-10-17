import ProductPage from '@/components/ProductPage';
import { orin } from '@/content/products';

/* Temporary preview (2026-10-17): ORIN with the Earth Orin video (public/media/orin/hero.mp4) behind the name instead of
   the live NOAA Earth on /defense/orin/. Delete this folder once one is chosen. Not linked from the site. */
export const metadata = { title: 'ORIN preview: video | Initium', robots: { index: false, follow: false } };

export default function OrinVideoPreview() {
  return <ProductPage product={orin} />;
}
