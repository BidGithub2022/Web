/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['localhost', 'omsmartstay.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Add this for production
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://omsmartstay.com' : '',
}

module.exports = nextConfig