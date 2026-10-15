/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  async rewrites() {
    return [
      { source: '/weddings/estimate', destination: '/wedding-calculator/index.html' },
      { source: '/weddings/proposal', destination: '/wedding-calculator/proposal.html' },
      { source: '/weddings/studio', destination: '/wedding-calculator/status.html' },
    ];
  },
  async headers() {
    return [
      { source: '/weddings/proposal', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }, { key: 'Referrer-Policy', value: 'no-referrer' }] },
      { source: '/weddings/studio', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
      { source: '/wedding-calculator/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }] },
    ];
  },
};

module.exports = nextConfig;
