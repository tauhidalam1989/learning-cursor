import { siteUrl } from '@/lib/seo';

export async function GET() {
  const content = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
Host: ${siteUrl}
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate=3600',
    },
  });
}

