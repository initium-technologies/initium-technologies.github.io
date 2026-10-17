import Nav from './Nav';
import Footer from './Footer';

/** Page shell: the nav, the page and the footer over the film grain. Every page uses the one black theme. */
export default function Site({ children }) {
  return (
    <div className="site">
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
