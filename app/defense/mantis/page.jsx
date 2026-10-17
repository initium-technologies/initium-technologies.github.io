import ProductPage from '@/components/ProductPage';
import { mantis } from '@/content/products';

export const metadata = mantis.meta;

export default function MantisPage() {
  return <ProductPage product={mantis} />;
}
