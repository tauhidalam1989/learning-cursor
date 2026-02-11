/**
 * Next.js configuration tweaks for Payload integration.
 *
 * This file adds rewrites so the Payload admin UI (served by the API route
 * at `/api/payload`) is reachable under the top-level `/admin` path. This
 * preserves the current frontend routes while mounting the CMS admin UI at
 * /admin as requested.
 *
 * Keep this file minimal — don't change other Next.js settings here to avoid
 * impacting the existing frontend.
 */
module.exports = {
  async rewrites() {
    return [
      { source: '/admin/:path*', destination: '/api/payload/admin/:path*' },
      { source: '/admin', destination: '/api/payload/admin' },
    ];
  },
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
