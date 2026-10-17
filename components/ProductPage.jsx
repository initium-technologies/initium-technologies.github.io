import Site from './Site';
import ProductHero from './ProductHero';
import KeyFunctions from './KeyFunctions';
import LocustTerminal from './LocustTerminal';
import { findMedia } from '@/lib/media';

/* Hidden for now (Sanjeev, 2026-10-16): the key functions (IRIS, MANTIS) and the Locust Terminal (ORIN).
   Set to true to bring them back; their copy is still in content/products.js. */
const SHOW_DETAILS = false;

/* Product page (IRIS, MANTIS, ORIN): the hero image fills the screen behind the name, then a short text block.
   Media: public/media/<slug>/ (hero.* behind the name; 1.* 2.* 3.* for the key functions). */
export default function ProductPage({ product }) {
  const items = (product.functions || []).map((it, i) => ({ ...it, media: findMedia(`${product.slug}/${i + 1}`) }));
  return (
    <Site>
      <ProductHero
        name={product.name}
        fullName={product.fullName}
        explainer={product.explainer}
        label={product.heroLabel}
        media={findMedia(`${product.slug}/hero`)}
        cover
      />
      {product.intro && (
        <section className="product-intro" aria-label={`About ${product.name}`}>
          <p>{product.intro}</p>
        </section>
      )}
      {SHOW_DETAILS && items.length > 0 && <KeyFunctions items={items} />}
      {SHOW_DETAILS && product.terminal && <LocustTerminal terminal={product.terminal} />}
    </Site>
  );
}
