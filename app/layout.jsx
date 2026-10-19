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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${julius.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
