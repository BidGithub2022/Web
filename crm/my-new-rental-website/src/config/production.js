/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    
    // Image configuration
    export const productionConfig = {
      images: {
        logo: 'https://omsmartstay.com/images/Logo.jpeg',
        fallback: 'https://omsmartstay.com/images/Property-1.png',
        properties: [
          'https://omsmartstay.com/images/Property-1.png',
          'https://omsmartstay.com/images/Property-2.png',
          'https://omsmartstay.com/images/Property-3.png'
        ]
      }
    };
  
    // Asset prefix configuration
    assetPrefix: process.env.NODE_ENV === 'production' 
      ? 'https://omsmartstay.com' 
      : '',
  
    // Security and performance
    reactStrictMode: true,
    swcMinify: true,
    poweredByHeader: false,
  
    // Environment variables
    env: {
      // Development
      NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000/api'
        : 'https://omsmartstay.com/api',
      NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY || 'development_key',
      
      // Feature flags
      IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
      ENABLE_TEST_TOOLS: process.env.NODE_ENV === 'development',
    },
  
    // Development configurations
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  
    // Security headers
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
            // Add CORS headers for development
            ...(process.env.NODE_ENV === 'development' ? [
              {
                key: 'Access-Control-Allow-Origin',
                value: '*',
              },
              {
                key: 'Access-Control-Allow-Methods',
                value: 'GET, POST, PUT, DELETE, OPTIONS',
              },
              {
                key: 'Access-Control-Allow-Headers',
                value: 'X-API-Key, Authorization, Content-Type',
              },
            ] : []),
          ],
        },
      ];
    },
  
    // Webpack configuration for development tools
    webpack: (config, { dev }) => {
      if (dev) {
        // Add development-specific webpack configurations here
        config.devtool = 'cheap-module-source-map';
      }
      return config;
    },
  
    // Development server configuration
    async rewrites() {
      return process.env.NODE_ENV === 'development'
        ? [
            {
              source: '/api/:path*',
              destination: 'http://localhost:3000/api/:path*',
            },
          ]
        : [];
    },
  };
  
  module.exports = nextConfig;