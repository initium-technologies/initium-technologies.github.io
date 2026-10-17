import Nav from './Nav';
import Footer from './Footer';

/** Page shell: sets the theme on <html> before paint (inline script) and on the wrapper, mounts the nav and footer. */
export default function Site({ theme = 'dark', children }) {
  const safe = ['dark', 'light', 'ops'].includes(theme) ? theme : 'dark';
  return (
    <div className="site" data-theme={safe}>
      <script
        dangerouslySetInnerHTML={{ __html: `document.documentElement.setAttribute('data-theme','${safe}');` }}
      />
      <Nav theme={safe} />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
