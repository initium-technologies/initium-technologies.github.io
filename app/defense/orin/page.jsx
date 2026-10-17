import ProductPage from '@/components/ProductPage';
import { orin } from '@/content/products';

export const metadata = orin.meta;

export default function OrinPage() {
  return <ProductPage product={orin} />;
}
