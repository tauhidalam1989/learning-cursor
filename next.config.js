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
    const rawBackendUrl =
      process.env.BACKEND_URL ||
      process.env.API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://127.0.0.1:5000';
    const backendUrl = rawBackendUrl.replace(/\/$/, '');

    return [
      { source: '/admin/:path*', destination: '/api/payload/admin/:path*' },
      { source: '/admin', destination: '/api/payload/admin' },
      // Proxy static upload files to Express server
      { source: '/uploads/:path*', destination: `${backendUrl}/uploads/:path*` },
      // Payload CMS internal APIs & Contact submission
      { source: '/api/payload/:path*', destination: '/api/payload/:path*' },
      { source: '/api/contact/submit', destination: '/api/contact/submit' },
      // Universal proxy for Express backend APIs to 127.0.0.1
      { source: '/api/:path*', destination: `${backendUrl}/api/:path*` },
    ];
  },
};

module.exports = nextConfig;
