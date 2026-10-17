import Site from '@/components/Site';
import HomeHero from '@/components/HomeHero';
import ProductTile from '@/components/ProductTile';
import { home, site } from '@/content/site';
import { findMedia } from '@/lib/media';

export const metadata = {
  title: `Initium — ${site.tagline}`,
  description: `${site.company} builds edge compute for mission-critical sensing.`,
};

/* Media: public/media/home/ (hero.*, orin-tile.*, iris-tile.*, mantis-tile.*, iris-civ-tile.*). */
export default function HomePage() {
  return (
    <Site>
      <HomeHero media={findMedia('home/hero')} />
      <section className="home-products" aria-label="Products">
        <span className="home-products__label section-label">Products</span>
        <div className="home-grid">
          {home.tiles.map(({ key, ...t }) => (
            <ProductTile key={key} {...t} media={findMedia(`home/${t.media}-tile`)} className={`t-${key}`} />
          ))}
        </div>
      </section>
    </Site>
  );
}
