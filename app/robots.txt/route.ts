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

# Block WordPress admin
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php

# Block system files
Disallow: /xmlrpc.php
Disallow: /cgi-bin/

# Block internal search
Disallow: /?s=

# Block staging folders
Disallow: /staging/
Disallow: /stage/
Disallow: /dev/
Disallow: /test/
Disallow: /beta/
Disallow: /backup/
Disallow: /old/
Disallow: /demo/

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate=3600',
    },
  });
}


