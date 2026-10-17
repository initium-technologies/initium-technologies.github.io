import ProductPage from '@/components/ProductPage';
import OrinGlobe from '@/components/OrinGlobe';
import { orin } from '@/content/products';

/* Temporary preview (2026-10-17): ORIN with the live 3D satellite globe behind the name (the ORIN video plays if WebGL
   is unavailable). /defense/orin/ keeps the video until this is approved. Not linked from the site. */
export const metadata = { title: 'ORIN preview: live satellites | Initium', robots: { index: false, follow: false } };

export default function OrinGlobePreview() {
  return <ProductPage product={orin} backdrop={<OrinGlobe fallbackVideo="/media/orin/hero.mp4" />} />;
}
