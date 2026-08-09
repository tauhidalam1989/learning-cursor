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
      // Static upload files from Express backend
      { source: '/uploads/:path*', destination: `${backendUrl}/uploads/:path*` },
      // Express backend endpoints
      { source: '/api/services', destination: `${backendUrl}/api/services` },
      { source: '/api/services/:path*', destination: `${backendUrl}/api/services/:path*` },
      { source: '/api/service-categories', destination: `${backendUrl}/api/service-categories` },
      { source: '/api/service-categories/:path*', destination: `${backendUrl}/api/service-categories/:path*` },
      { source: '/api/auth/:path*', destination: `${backendUrl}/api/auth/:path*` },
      { source: '/api/applications', destination: `${backendUrl}/api/applications` },
      { source: '/api/applications/:path*', destination: `${backendUrl}/api/applications/:path*` },
      { source: '/api/newsletters', destination: `${backendUrl}/api/newsletters` },
      { source: '/api/newsletters/:path*', destination: `${backendUrl}/api/newsletters/:path*` },
      { source: '/api/careers', destination: `${backendUrl}/api/careers` },
      { source: '/api/careers/:path*', destination: `${backendUrl}/api/careers/:path*` },
      { source: '/api/blogs', destination: `${backendUrl}/api/blogs` },
      { source: '/api/blogs/:path*', destination: `${backendUrl}/api/blogs/:path*` },
      { source: '/api/portfolio', destination: `${backendUrl}/api/portfolio` },
      { source: '/api/portfolio/:path*', destination: `${backendUrl}/api/portfolio/:path*` },
      { source: '/api/client-partner', destination: `${backendUrl}/api/client-partner` },
      { source: '/api/client-partner/:path*', destination: `${backendUrl}/api/client-partner/:path*` },
      { source: '/api/product-categories', destination: `${backendUrl}/api/product-categories` },
      { source: '/api/product-categories/:path*', destination: `${backendUrl}/api/product-categories/:path*` },
      { source: '/api/products', destination: `${backendUrl}/api/products` },
      { source: '/api/products/:path*', destination: `${backendUrl}/api/products/:path*` },
    ];
  },
};

module.exports = nextConfig;
