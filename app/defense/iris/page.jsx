import ProductPage from '@/components/ProductPage';
import { iris } from '@/content/products';

export const metadata = iris.meta;

export default function IrisPage() {
  return <ProductPage product={iris} />;
}
