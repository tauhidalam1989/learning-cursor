/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'corematrixs.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'www.corematrixs.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '5000',
        pathname: '/uploads/**',
      },
    ],
  },
  async rewrites() {
    return [
      { source: '/admin/:path*', destination: '/api/payload/admin/:path*' },
      { source: '/admin', destination: '/api/payload/admin' },
    ];
  },
};

module.exports = nextConfig;
