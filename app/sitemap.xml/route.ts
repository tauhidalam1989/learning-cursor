import { siteUrl } from '@/lib/seo';
import { getAllBlogPosts } from '@/lib/posts';

/**
 * Dynamic sitemap.xml route for Next.js App Router.
 * - Includes common static routes and all published blog posts.
 * - Uses NEXT_PUBLIC_SITE_URL (via siteUrl) for canonical absolute URLs.
 */
export async function GET() {
  const pages = [
    { url: '/', priority: 1.0 },
    { url: '/blog', priority: 0.9 },
    { url: '/about', priority: 0.7 },
    { url: '/services', priority: 0.7 },
    { url: '/contact', priority: 0.7 },
  ];

  // Fetch blog posts from the DB
  let posts = [];
  try {
    posts = await getAllBlogPosts();
  } catch (err) {
    // If fetching posts fails, continue with static pages only.
    posts = [];
  }

  const urls = [
    ...pages.map((p) => {
      return `<url>
  <loc>${siteUrl}${p.url}</loc>
  <changefreq>weekly</changefreq>
  <priority>${p.priority}</priority>
</url>`;
    }),
    ...posts.map((post) => {
      const lastmod = post.publishedAt ? new Date(post.publishedAt).toISOString() : undefined;
      return `<url>
  <loc>${siteUrl}/blog/${post.slug}</loc>
  ${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>`;
    }),
  ].join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      // Cache for 24 hours at the CDN
      'Cache-Control': 's-maxage=86400, stale-while-revalidate=3600',
    },
  });
}

