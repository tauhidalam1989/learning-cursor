import { siteUrl } from '@/lib/seo';
import { PROJECTS, FEATURED_PROJECT } from '@/data/portfolioData';
import { getAllServiceLandingSlugs } from '@/lib/service-seo-routes';
import { apiEndpoint } from '@/lib/apiBase';

/**
 * Dynamic, high-performance sitemap.xml route for Next.js App Router.
 * - Dynamically fetches all published Blogs, Careers, and Services from the CMS/Admin database.
 * - Handles static routes and their aliases with designated SEO priorities.
 * - Uses NEXT_PUBLIC_SITE_URL for absolute canonical mapping.
 * - Recovers gracefully from database or network connectivity errors.
 */
export const dynamic = 'force-dynamic';

export async function GET() {
  // 1. Static Pages with SEO Changefreq and Priority Mapping
  const pages = [
    { url: '/', priority: 1.0, changefreq: 'daily' },
    { url: '/about', priority: 0.8, changefreq: 'monthly' },
    { url: '/blog', priority: 0.8, changefreq: 'weekly' },
    { url: '/careers', priority: 0.7, changefreq: 'weekly' },
    { url: '/services', priority: 0.9, changefreq: 'weekly' },
    { url: '/services/adobe-licensing', priority: 0.65, changefreq: 'weekly' },
    { url: '/contact', priority: 0.7, changefreq: 'weekly' },
    { url: '/portfolio', priority: 0.8, changefreq: 'monthly' },
    { url: '/feedback', priority: 0.3, changefreq: 'monthly' },
    
    // Core functional legal pages
    { url: '/privacy', priority: 0.4, changefreq: 'monthly' },
    { url: '/terms', priority: 0.4, changefreq: 'monthly' },
    
    // Aliases matching user requests
    { url: '/privacy-policy', priority: 0.4, changefreq: 'monthly' },
    { url: '/terms-and-conditions', priority: 0.4, changefreq: 'monthly' },
  ];

  // 2. Static Portfolio Projects
  const portfolioSlugs = [...PROJECTS, FEATURED_PROJECT].map((p) => ({
    url: `/portfolio/${p.slug}`,
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: new Date().toISOString(),
  }));

  // 3. Static Services Landing Pages
  const staticServices = getAllServiceLandingSlugs().map((slug) => ({
    url: `/services/${slug}`,
    priority: 0.8,
    changefreq: 'weekly',
    lastmod: new Date().toISOString(),
  }));

  // 4. Fetch Dynamic Published Blogs from Database REST API
  let dynamicBlogs: any[] = [];
  try {
    const res = await fetch(apiEndpoint('/api/blogs'), { cache: 'no-store' });
    if (res.ok) {
      const posts = await res.json();
      dynamicBlogs = posts
        .filter((post: any) => post.status === 'PUBLISHED')
        .map((post: any) => ({
          url: `/blog/${post.slug}`,
          priority: 0.7,
          changefreq: 'weekly',
          lastmod: post.updatedAt || post.publishedAt || new Date().toISOString(),
        }));
    } else {
      console.warn(`Sitemap: Blogs API returned non-OK status ${res.status}`);
    }
  } catch (err) {
    console.error('Sitemap: Failed to fetch dynamic blogs from database:', err);
  }

  // 5. Fetch Dynamic Active Careers from Database REST API
  let dynamicCareers: any[] = [];
  try {
    const res = await fetch(apiEndpoint('/api/careers'), { cache: 'no-store' });
    if (res.ok) {
      const careers = await res.json();
      dynamicCareers = careers.map((career: any) => ({
        url: `/careers/${career.id}`,
        priority: 0.6,
        changefreq: 'weekly',
        lastmod: career.updatedAt || career.createdAt || new Date().toISOString(),
      }));
    } else {
      console.warn(`Sitemap: Careers API returned non-OK status ${res.status}`);
    }
  } catch (err) {
    console.error('Sitemap: Failed to fetch dynamic careers from database:', err);
  }

  // 6. Fetch Dynamic Published Services from Database REST API
  let dynamicServices: any[] = [];
  try {
    const res = await fetch(apiEndpoint('/api/services'), { cache: 'no-store' });
    if (res.ok) {
      const services = await res.json();
      dynamicServices = services
        .filter((svc: any) => svc.isPublished)
        .map((svc: any) => ({
          url: `/services/${svc.detailSlug}`,
          priority: 0.8,
          changefreq: 'weekly',
          lastmod: svc.updatedAt || svc.publishedAt || new Date().toISOString(),
        }));
    } else {
      console.warn(`Sitemap: Services API returned non-OK status ${res.status}`);
    }
  } catch (err) {
    console.error('Sitemap: Failed to fetch dynamic services from database:', err);
  }

  const now = new Date().toISOString();

  // Combine all sitemap nodes
  const allEntries = [
    ...pages.map((p) => ({
      url: p.url,
      priority: p.priority,
      changefreq: p.changefreq,
      lastmod: now,
    })),
    ...portfolioSlugs,
    ...staticServices,
    ...dynamicBlogs,
    ...dynamicCareers,
    ...dynamicServices,
  ];

  // Helper to ensure correct ISO String timestamps in XML
  const formatLastmod = (dateStr: string) => {
    try {
      return new Date(dateStr).toISOString();
    } catch {
      return now;
    }
  };

  const xmlEntries = allEntries
    .map((entry) => {
      return `<url>
  <loc>${siteUrl}${entry.url}</loc>
  <lastmod>${formatLastmod(entry.lastmod)}</lastmod>
  <changefreq>${entry.changefreq}</changefreq>
  <priority>${entry.priority.toFixed(1)}</priority>
</url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
      // Sensible stale-while-revalidate caching policy to optimize response times
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=600',
    },
  });
}


