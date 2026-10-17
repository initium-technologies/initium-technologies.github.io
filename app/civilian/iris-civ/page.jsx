import Site from '@/components/Site';
import ProductHero from '@/components/ProductHero';
import CivIcon from '@/components/CivIcons';
import { civ } from '@/content/civ';
import { findMedia } from '@/lib/media';

export const metadata = civ.meta;

/* IRIS CIV tells one story, top to bottom: the 60-second promise, how it works (four steps, the first three inside
   the 60 seconds), what every officer sees, why police use it, where it is used. Hero image: public/media/iris-civ/hero.* */
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

      <section className="civ-stat" aria-label="Response time">
        <p className="civ-stat__value">
          {civ.stat.value}
          <span className="civ-stat__unit section-label">{civ.stat.unit}</span>
        </p>
        <p className="civ-stat__text">{civ.stat.text}</p>
      </section>

      <section className="civ-section" aria-labelledby="civ-flow">
        <h2 className="civ-section__label section-label" id="civ-flow">{civ.flowLabel}</h2>
        <ol className="civ-flow">
          {civ.steps.map((s, i) => (
            <li className="civ-step" key={s.title}>
              <div className="civ-step__head">
                <span className="civ-step__icon">
                  <CivIcon name={s.icon} />
                </span>
                {i < civ.steps.length - 1 && <span className="civ-step__arrow" aria-hidden="true" />}
              </div>
              <span className="civ-step__tag mono-label">
                {String(i + 1).padStart(2, '0')} · {s.tag}
              </span>
              <h3 className="civ-step__title h3">{s.title}</h3>
              <p className="civ-step__text">{s.text}</p>
            </li>
          ))}
        </ol>
        {/* Spans steps 01–03: the call to a confirmed threat on every officer's screen. */}
        <div className="civ-bracket mono-label">
          <span>{civ.bracket}</span>
        </div>
      </section>

      <section className="civ-section" aria-labelledby="civ-sees">
        <h2 className="civ-section__label section-label" id="civ-sees">{civ.seesLabel}</h2>
        {/* The real screen, with numbered points that match the list underneath. */}
        <figure className="civ-shot">
          <img src={civ.seesImage.src} alt={civ.seesImage.alt} loading="lazy" />
          {civ.sees.map((s, i) => (
            <span className="civ-shot__pin" key={s.text} style={{ left: `${s.at[0]}%`, top: `${s.at[1]}%` }} aria-hidden="true">
              {i + 1}
            </span>
          ))}
        </figure>
        <ol className="civ-sees">
          {civ.sees.map((s, i) => (
            <li className="civ-sees__item" key={s.text}>
              <span className="civ-sees__num mono-label">{String(i + 1).padStart(2, '0')}</span>
              <CivIcon name={s.icon} />
              <span>{s.text}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="civ-section" aria-labelledby="civ-why">
        <h2 className="civ-section__label section-label" id="civ-why">{civ.pillarsLabel}</h2>
        <div className="civ-pillars">
          {civ.pillars.map((p) => (
            <div className="civ-pillar" key={p.title}>
              <CivIcon name={p.icon} />
              <h3 className="h3">{p.title}</h3>
              <p>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rows" aria-label={civ.useCasesLabel}>
        <span className="rows__label section-label">{civ.useCasesLabel}</span>
        {civ.useCases.map((u) => (
          <div className="row" key={u.name}>
            <h3 className="row__name h3">{u.name}</h3>
            <p className="row__text body">{u.text}</p>
          </div>
        ))}
      </section>

      <section className="banner">
        <h2 className="h1">{civ.banner}</h2>
      </section>
    </Site>
  );
}
