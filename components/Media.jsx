import Placeholder from './Placeholder';
import Video from './Video';

/* Renders a resolved media slot (from lib/media findMedia): a looping video, an image, or the labelled
   placeholder when no file exists yet. `cover` fills the positioned parent; `ratio` sets the box shape. */
export default function Media({ media, label, ratio, cover = false, alt = '', className = '' }) {
  if (!media) return <Placeholder label={label} ratio={ratio} cover={cover} className={className} />;
  const cls = `media ${cover ? 'is-cover' : ''} ${className}`;
  const style = !cover && ratio ? { aspectRatio: ratio } : undefined;
  if (media.video) return <Video src={media.src} label={alt || label} className={cls} style={style} />;
  return <img className={cls} src={media.src} alt={alt} style={style} loading={cover ? 'eager' : 'lazy'} />;
}
