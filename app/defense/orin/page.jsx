import ProductPage from '@/components/ProductPage';
import LiveEarth from '@/components/LiveEarth';
import { orin } from '@/content/products';

export const metadata = orin.meta;

/* The live Earth (NOAA GOES-19, every 10 minutes) fills the hero behind the name. */
export default function OrinPage() {
  return <ProductPage product={orin} backdrop={<LiveEarth />} />;
}
