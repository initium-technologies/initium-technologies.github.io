import { Julius_Sans_One, Inter } from 'next/font/google';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://initiumtechnologies.com'),
  title: 'Initium — Edge compute for mission-critical sensing',
  description: 'Initium Technologies builds edge compute for mission-critical sensing: IRIS for the operator, MANTIS for the ship, ORIN for orbit, IRIS CIV for police.',
  openGraph: {
    siteName: 'Initium',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

/* The two fonts are bundled with the site at build time (next/font), not fetched from Google when the page opens, so
   every browser on every system (Windows included) gets the same files, with metric-matched fallbacks while they load.
   They reach the CSS as --font-julius and --font-inter (see app/tokens.css). */
const julius = Julius_Sans_One({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-julius' });
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });

/* Content Security Policy for the built site. GitHub Pages cannot send HTTP headers, so the policy travels in the page
   as a meta tag. Everything the site needs is first-party: 'self' covers scripts, styles, fonts, images, video, the
   satellite worker and its catalogue fetch; the data: image is the SVG pattern in globals.css. Next's inline bootstrap
   scripts and inline style attributes need 'unsafe-inline'. No form may ever submit anywhere (the Locus Terminal is
   theatre). Not applied in `npm run dev`, which needs eval and websockets for hot reload. */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "media-src 'self'",
  "connect-src 'self'",
  "worker-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join('; ');

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${julius.variable} ${inter.variable}`}>
      <head>
        {process.env.NODE_ENV === 'production' && <meta httpEquiv="Content-Security-Policy" content={csp} />}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>{children}</body>
    </html>
  );
}
