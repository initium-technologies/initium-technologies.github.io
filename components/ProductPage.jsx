import Site from './Site';
import ProductHero from './ProductHero';
import KeyFunctions from './KeyFunctions';
import LocustTerminal from './LocustTerminal';
import StepTabs from './StepTabs';
import SpecTable from './SpecTable';
import { findMedia } from '@/lib/media';

/* Hidden for now (Sanjeev, 2026-10-16): the key functions (IRIS, MANTIS). Set to true to bring them back; their copy
   is still in content/products.js. The Locus Terminal (ORIN, MANTIS) always shows. */
const SHOW_DETAILS = false;

/* Product page (IRIS, MANTIS, ORIN): the hero image fills the screen behind the name, then whichever of these the
   product's copy has: a short intro (MANTIS, ORIN), a concept of operations (tabs over sliding cards, after Anduril's Fury page), a description and an environment
   spec table (IRIS), the Locus Terminal (ORIN).
   Media: public/media/<slug>/ (hero.* behind the name; 1.* 2.* 3.* for the key functions). */
export default function ProductPage({ product, backdrop = null }) {
  const items = (product.functions || []).map((it, i) => ({ ...it, media: findMedia(`${product.slug}/${i + 1}`) }));
  return (
    <Site>
      <ProductHero
        name={product.name}
        fullName={product.fullName}
        explainer={product.explainer}
        label={product.heroLabel}
        media={findMedia(`${product.slug}/hero`)}
        crop={product.heroCrop}
        focus={product.heroFocus}
        backdrop={backdrop}
        cover
      />
      {product.intro && (
        <section className="product-intro" aria-label={`About ${product.name}`}>
          <p>{product.intro}</p>
        </section>
      )}
      {product.concept && (
        <section className="product-section" aria-labelledby={`${product.slug}-concept`}>
          <h2 className="product-section__label product-section__label--major section-label" id={`${product.slug}-concept`}>
            {product.concept.label}
          </h2>
          <div className="step-tabs-band">
            <StepTabs
              label={product.concept.label}
              steps={product.concept.steps.map((st, i) => ({ ...st, media: findMedia(`${product.slug}/step-${i + 1}`) }))}
            />
          </div>
        </section>
      )}
      {product.description && (
        <section className="product-section product-desc grey" aria-labelledby={`${product.slug}-description`}>
          <h2 className="product-section__label section-label" id={`${product.slug}-description`}>
            {product.description.label}
          </h2>
          <div className="product-desc__body">
            <p className="product-desc__lead">{product.description.lead}</p>
            <p className="product-desc__text">{product.description.text}</p>
          </div>
        </section>
      )}
      {product.specs && <SpecTable specs={product.specs} id={`${product.slug}-specs`} />}
      {SHOW_DETAILS && items.length > 0 && <KeyFunctions items={items} />}
      {product.terminal && <LocustTerminal terminal={product.terminal} />}
    </Site>
  );
}
