import Site from './Site';
import ProductHero from './ProductHero';
import KeyFunctions from './KeyFunctions';
import { findMedia } from '@/lib/media';

/* Media: public/media/<slug>/ (hero.* for the hero, 1.* 2.* 3.* for the key functions). */
export default function ProductPage({ product }) {
  const items = product.functions.map((it, i) => ({ ...it, media: findMedia(`${product.slug}/${i + 1}`) }));
  return (
    <Site>
      <ProductHero
        name={product.name}
        fullName={product.fullName}
        explainer={product.explainer}
        label={product.heroLabel}
        media={findMedia(`${product.slug}/hero`)}
      />
      <KeyFunctions items={items} />
    </Site>
  );
}
