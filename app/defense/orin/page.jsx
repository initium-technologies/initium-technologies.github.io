import ProductPage from '@/components/ProductPage';
import { orin } from '@/content/products';

export const metadata = orin.meta;

/* Hero: the ORIN Hero video (public/media/orin/hero.mp4) plays full screen behind the name. */
export default function OrinPage() {
  return <ProductPage product={orin} />;
}
