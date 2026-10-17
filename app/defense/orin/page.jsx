import Site from '@/components/Site';
import ProductHero from '@/components/ProductHero';
import LocustTerminal from '@/components/LocustTerminal';
import { orin } from '@/content/products';
import { findMedia } from '@/lib/media';

export const metadata = orin.meta;

/* Media slot: public/media/orin-hero.mp4 plays edge to edge behind the name. */
export default function OrinPage() {
  return (
    <Site>
      <ProductHero name={orin.name} fullName={orin.fullName} label={orin.heroLabel} media={findMedia('orin/hero')} cover />
      <LocustTerminal terminal={orin.terminal} />
    </Site>
  );
}
