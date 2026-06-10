import { siteUrl } from '@/lib/seo';

/**
 * Dynamic robots.txt route for Next.js App Router.
 * - Prevents search engine crawlers from indexing private admin, auth, dashboard, and API endpoints.
 * - Explicitly references the absolute canonical sitemap.xml location.
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  const content = `User-agent: *
Allow: /

Disallow: /admin/
Disallow: /login/
Disallow: /register/
Disallow: /forgot-password/
Disallow: /dashboard/
Disallow: /api/

Sitemap: ${siteUrl}/sitemap.xml
Host: ${siteUrl.replace(/^https?:\/\//, '')}
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate=3600',
    },
  });
}


