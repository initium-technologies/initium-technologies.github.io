import Site from '@/components/Site';
import ProductHero from '@/components/ProductHero';
import CivShot from '@/components/CivShot';
import StepCards from '@/components/StepCards';
import { civ } from '@/content/civ';
import { findMedia } from '@/lib/media';

export const metadata = civ.meta;

/* IRIS CIV tells one story, top to bottom: the 60-second promise, then the concept of operations (four steps; the
   last one holds what every officer sees, the interactive screen), then a description on a mid-grey panel. Hero image: public/media/iris-civ/hero.* */
export default function IrisCivPage() {
  return (
    <Site>
      <ProductHero
        name={civ.name}
        fullName={civ.fullName}
        explainer={civ.explainer}
        label={civ.heroLabel}
        media={findMedia('iris-civ/hero')}
        focus={civ.heroFocus}
        cover
      />

      {/* The 60 is exactly as tall as the three lines beside it (globals.css .civ-stat). */}
      <section className="civ-stat" aria-label="Response time">
        <p className="civ-stat__value">
          {civ.stat.value}
          <span className="civ-stat__unit section-label">{civ.stat.unit}</span>
        </p>
        <p className="civ-stat__text">
          {civ.stat.lines.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </p>
      </section>

      <section className="product-section product-section--flush" aria-labelledby="civ-flow">
        <h2 className="product-section__label product-section__label--major section-label" id="civ-flow">{civ.flowLabel}</h2>
        {/* The four steps as touching full-width bands. Images: public/media/iris-civ/step-1…3.*; band 04 holds the
            officer screen. */}
        <StepCards steps={civ.steps} media="iris-civ" last={<CivShot image={civ.seesImage} points={civ.sees} hint={civ.seesHint} />} />
      </section>

      <section className="product-section product-desc grey" aria-labelledby="civ-description">
        <h2 className="product-section__label section-label" id="civ-description">{civ.description.label}</h2>
        <div className="product-desc__body">
          <p className="product-desc__lead">{civ.description.lead}</p>
          <p className="product-desc__text">{civ.description.text}</p>
        </div>
      </section>
    </Site>
  );
}
