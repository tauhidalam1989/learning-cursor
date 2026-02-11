/**
 * Blog helpers (now backed by Payload CMS)
 *
 * These helpers call the local Payload API exposed at:
 *   /api/payload/api/cms-blog
 *
 * They are server-side functions (used by server components) and therefore
 * resolve data with `fetch()` from the same Next.js server process. The
 * base URL is derived from environment variables with sensible fallbacks.
 */

const BASE =
  process.env.PAYLOAD_SERVER_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'http://localhost:3000';
import { siteUrl } from '@/lib/seo';

type BlogPostType = {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  publishedAt: string;
  author?: string | undefined;
  imageSrc?: string | undefined;
  imageAlt?: string | undefined;
};

function mapPayloadPost(p: any): BlogPostType {
  const publishedAt = p.publishedAt ?? p.createdAt ?? new Date().toISOString();
  const raw = p.coverImage?.url ?? p.coverImage ?? undefined;
  // Ensure absolute URLs for Open Graph / sitemaps. If the upload `url` is
  // relative (starts with '/'), prefix with the canonical siteUrl.
  const imageSrc =
    typeof raw === 'string' && raw.startsWith('/')
      ? `${siteUrl}${raw}`
      : raw;
  return {
    id: String(p.id),
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? '',
    publishedAt: new Date(publishedAt).toISOString(),
    author: undefined,
    imageSrc,
    imageAlt: p.title,
  };
}

async function fetchCollection(path: string, params?: Record<string, string>) {
  const url = new URL(path, BASE);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  }
  const res = await fetch(url.toString(), { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Payload request failed: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

export async function getAllBlogPosts(): Promise<BlogPostType[]> {
  try {
    const json = await fetchCollection('/api/payload/api/cms-blog', {
      limit: '100',
      'where[status][equals]': 'PUBLISHED',
      sort: '-publishedAt',
    });
    const docs = json?.docs ?? json?.results ?? [];
    return docs.map(mapPayloadPost);
  } catch (err) {
    // On error return empty array and surface a console warning server-side.
    // This keeps the UI stable and preserves existing design.
    // eslint-disable-next-line no-console
    console.warn('getAllBlogPosts: failed to fetch from Payload', (err as any)?.message ?? err);
    return [];
  }
}

export async function getLatestBlogPosts(limit = 3): Promise<BlogPostType[]> {
  try {
    const json = await fetchCollection('/api/payload/api/cms-blog', {
      limit: String(limit),
      'where[status][equals]': 'PUBLISHED',
      sort: '-publishedAt',
    });
    const docs = json?.docs ?? json?.results ?? [];
    return docs.map(mapPayloadPost);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('getLatestBlogPosts: failed to fetch from Payload', (err as any)?.message ?? err);
    return [];
  }
}

export async function getFeaturedBlogBlock(): Promise<{ featured: BlogPostType | null; recent: BlogPostType[] }> {
  try {
    const json = await fetchCollection('/api/payload/api/cms-blog', {
      limit: '4',
      'where[status][equals]': 'PUBLISHED',
      sort: '-publishedAt',
    });
    const docs = json?.docs ?? json?.results ?? [];
    const posts = docs.map(mapPayloadPost);
    const featured = posts[0] ?? null;
    const recent = posts.slice(1);
    return { featured, recent };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('getFeaturedBlogBlock: failed to fetch from Payload', (err as any)?.message ?? err);
    return { featured: null, recent: [] };
  }
}

export async function getPostBySlug(slug: string) {
  try {
    const json = await fetchCollection('/api/payload/api/cms-blog', {
      'where[slug][equals]': String(slug),
      limit: '1',
    });
    const docs = json?.docs ?? json?.results ?? [];
    return docs[0] ?? null;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('getPostBySlug (posts): failed to fetch from Payload', (err as any)?.message ?? err);
    return null;
  }
}

