/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
    ],
  },
  async rewrites() {
    return [
      { source: '/favicon.ico', destination: '/icon.svg' },
      { source: '/favicon.png', destination: '/icon.svg' },
    ]
  },
}

module.exports = nextConfig

