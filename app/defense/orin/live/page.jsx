import ProductPage from '@/components/ProductPage';
import LiveEarth from '@/components/LiveEarth';
import { orin } from '@/content/products';

/* Temporary preview (2026-10-17): ORIN with the live NOAA GOES-19 Earth behind the name.
   Delete this folder once one option is chosen and moved onto /defense/orin. Not linked from the site. */
export const metadata = { title: 'ORIN preview: live Earth (NOAA GOES-19) | Initium', robots: { index: false, follow: false } };

export default function OrinPreview() {
  return <ProductPage product={orin} backdrop={<LiveEarth mode="goes" />} />;
}
