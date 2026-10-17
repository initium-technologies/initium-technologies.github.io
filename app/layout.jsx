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
  themeColor: '#0a0a0a',
};

const FONTS =
  'https://fonts.googleapis.com/css2?family=Saira:wdth,wght@125,300..500&family=Inter+Tight:wght@400..600&family=Inter:wght@400..500&family=Geist+Mono:wght@400..500&display=swap';

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={FONTS} />
      </head>
      <body>{children}</body>
    </html>
  );
}
