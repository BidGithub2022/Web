/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static export
  images: {
    unoptimized: true  // Required for static export
  },
  trailingSlash: true,  // Recommended for static export
}

module.exports = nextConfig