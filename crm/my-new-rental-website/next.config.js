/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the standalone output
  // output: 'standalone',
  
  images: {
    unoptimized: true,
    domains: ['localhost', 'omsmartstay.com'],
  },

  // Production settings
  productionBrowserSourceMaps: true,
  
  // Asset prefix (if you're using a CDN, otherwise remove this)
  // assetPrefix: process.env.NODE_ENV === 'production' ? 'https://omsmartstay.com' : '',

  // Enable React strict mode
  reactStrictMode: true,
};

module.exports = nextConfig;