/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: '/admin/:path*', destination: '/api/payload/admin/:path*' },
      { source: '/admin', destination: '/api/payload/admin' },
    ];
  },
};

module.exports = nextConfig;
