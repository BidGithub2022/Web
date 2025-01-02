/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  
  // Your existing image configuration
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

  // Your existing asset prefix
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://omsmartstay.com' : '',

  // Add these new configurations for better security and performance
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: false,

  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://omsmartstay.com/api',
  },

  // For development only - remove these in production if not needed
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Add security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig