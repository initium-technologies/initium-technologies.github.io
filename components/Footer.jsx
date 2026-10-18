import Link from 'next/link';
import { Wordmark } from './Icons';
import { footer, site } from '@/content/site';

/* Black footer: brand top-left, then Defense · Civilian · Company · Social spread to the right edge; Made in America +
   legal bottom-left, contact bottom-right. */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <Link href="/" className="footer__brand" aria-label="Initium home">
            <Wordmark />
          </Link>
          <div className="footer__cols">
            {footer.groups.map((g) => (
              <div className="footer__col" key={g.title}>
                <span className="footer__label section-label">{g.title}</span>
                <ul>
                  {g.links.map((l) => (
                    <li key={l.name}>
                      {l.external ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer">
                          {l.name}
                        </a>
                      ) : (
                        <Link href={l.href}>{l.name}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__legal">
            <span className="footer__made">{footer.madeIn}</span>
            <ul className="footer__legal-links" aria-label="Legal">
              {footer.legal.map((l) => (
                <li key={l.name}>
                  <Link href={l.href}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer__contact">
            <span className="footer__label section-label">Contact</span>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
