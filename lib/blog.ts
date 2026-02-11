/**
 * Blog detail helpers — migrated to read from Payload CMS instead of Prisma.
 *
 * Notes:
 * - Returns content as an HTML string (the existing frontend uses
 *   dangerouslySetInnerHTML to render `content`).
 * - This file preserves the `BlogDetail` contract used by the detail page.
 */
import { siteUrl } from '@/lib/seo';

const BASE =
  process.env.PAYLOAD_SERVER_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'http://localhost:3000';

export interface BlogDetail {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content: string; // HTML
  coverImage?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

function slateNodesToHtml(nodes: any[]): string {
  if (!Array.isArray(nodes)) return String(nodes ?? '');
  // Very small converter: handle paragraphs and plain text children.
  return nodes
    .map((node) => {
      if (node.type === 'p') {
        const text = Array.isArray(node.children)
          ? node.children.map((c: any) => c.text ?? '').join('')
          : '';
        return `<p>${escapeHtml(text)}</p>`;
      }
      // Fallback: stringify text children
      if (node.children && Array.isArray(node.children)) {
        return `<div>${node.children.map((c: any) => escapeHtml(c.text ?? '')).join('')}</div>`;
      }
      return `<div>${escapeHtml(String(node.text ?? ''))}</div>`;
    })
    .join('');
}

function escapeHtml(str: string) {
  return str.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));
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

export async function getPostBySlug(slug: string): Promise<BlogDetail | null> {
  try {
    const json = await fetchCollection('/api/payload/api/cms-blog', {
      'where[slug][equals]': String(slug),
      limit: '1',
    });
    const docs = json?.docs ?? json?.results ?? [];
    const p = docs[0];
    if (!p) return null;

    const contentHtml = p.content ? slateNodesToHtml(p.content) : '';
    const rawCover = p.coverImage?.url ?? p.coverImage ?? null;
    const cover =
      typeof rawCover === 'string' && rawCover.startsWith('/')
        ? `${siteUrl}${rawCover}`
        : rawCover;

    return {
      id: String(p.id),
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt ?? null,
      content: contentHtml,
      coverImage: cover,
      seoTitle: p.seoTitle ?? null,
      seoDescription: p.seoDescription ?? null,
      publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString() : null,
      createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : new Date().toISOString(),
      updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : new Date().toISOString(),
    };
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('getPostBySlug: failed to fetch from Payload', (err as any)?.message ?? err);
    return null;
  }
}

