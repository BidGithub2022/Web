/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this if you're behind a proxy
  poweredByHeader: false,
  // If you need to handle the proxy
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Forwarded-Proto',
            value: 'https',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
