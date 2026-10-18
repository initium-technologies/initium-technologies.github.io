import Media from './Media';

/* Product hero. Standard: name and one-liner up top, the hero media (21:9) directly underneath inside the
   margins. `cover`: the media fills the whole section edge to edge and the name sits over it (ORIN). */
export default function ProductHero({ name, fullName, explainer, label, media = null, cover = false, focus, backdrop = null, short = false }) {
  return (
    <section className={`hero ${short ? 'hero--short' : ''} ${cover ? 'hero--cover' : ''} ${backdrop ? 'hero--backdrop' : ''}`}>
      {/* `backdrop` (e.g. the live Earth) replaces the hero image when given. */}
      {cover && (backdrop || <Media media={media} label={label} cover focus={focus} alt="" />)}
      <div className="hero__row">
        <h1 className="hero__name display-xl" data-initial={name[0]}>{name}</h1>
        <div className="hero__side">
          <span className="section-label">{fullName}</span>
          {explainer && <p className="body-l">{explainer}</p>}
        </div>
      </div>
      {!cover && label && (
        <div className="hero__media">
          <Media media={media} label={label} ratio="21 / 9" alt="" />
        </div>
      )}
    </section>
  );
}
