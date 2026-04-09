import { siteUrl } from '@/lib/seo';
import { getAllBlogPosts } from '@/lib/posts';
import { PROJECTS, FEATURED_PROJECT } from '@/data/portfolioData';
import { getAllServiceLandingSlugs } from '@/lib/service-seo-routes';

/**
 * Dynamic sitemap.xml route for Next.js App Router.
 * - Includes common static routes, portfolio slugs, and all published blog posts.
 * - Uses NEXT_PUBLIC_SITE_URL (via siteUrl) for canonical absolute URLs.
 */
export async function GET() {
  const pages = [
    { url: '/', priority: 1.0 },
    { url: '/blog', priority: 0.9 },
    { url: '/about', priority: 0.7 },
    { url: '/services', priority: 0.7 },
    { url: '/services/adobe-licensing', priority: 0.65 },
    { url: '/contact', priority: 0.7 },
    { url: '/careers', priority: 0.7 },
    { url: '/portfolio', priority: 0.8 },
    { url: '/privacy', priority: 0.3 },
    { url: '/terms', priority: 0.3 },
    { url: '/feedback', priority: 0.3 },
  ];

  const portfolioSlugs = [...PROJECTS, FEATURED_PROJECT].map((p) => ({
    url: `/portfolio/${p.slug}`,
    priority: 0.6,
  }));

  const serviceLandingUrls = getAllServiceLandingSlugs().map((slug) => ({
    url: `/services/${slug}`,
    priority: 0.65,
  }));

  // Fetch blog posts from the DB
  let posts: Awaited<ReturnType<typeof getAllBlogPosts>> = [];
  try {
    posts = await getAllBlogPosts();
  } catch (err) {
    // If fetching posts fails, continue with static pages only.
    posts = [];
  }

  const now = new Date().toISOString();
  const urls = [
    ...pages.map((p) => {
      return `<url>
  <loc>${siteUrl}${p.url}</loc>
  <lastmod>${now}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>${p.priority}</priority>
</url>`;
    }),
    ...portfolioSlugs.map((p) => {
      return `<url>
  <loc>${siteUrl}${p.url}</loc>
  <lastmod>${now}</lastmod>
  <changefreq>monthly</changefreq>
  <priority>${p.priority}</priority>
</url>`;
    }),
    ...serviceLandingUrls.map((p) => {
      return `<url>
  <loc>${siteUrl}${p.url}</loc>
  <lastmod>${now}</lastmod>
  <changefreq>monthly</changefreq>
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

