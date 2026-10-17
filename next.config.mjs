/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Build the whole site as plain HTML/CSS/JS files in out/, served by GitHub Pages.
  output: 'export',
  // /defense/iris/ → out/defense/iris/index.html, which GitHub Pages serves without extra rules.
  trailingSlash: true,
  // No Next.js badge in the corner of the local preview (it never appears on the built site anyway).
  devIndicators: false,
};

export default nextConfig;
