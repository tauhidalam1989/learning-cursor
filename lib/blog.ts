import type { BlogPost } from '@/types/blog';
import { apiEndpoint } from '@/lib/apiBase';

const API_BASE =
  typeof window === 'undefined'
    ? apiEndpoint('/api/blogs')
    : '/api/blogs';

export interface BlogDetail {
  id: string;
  slug: string;
  category: string;
  coverImage?: string | null;
  tags: string[];
  title_en: string;
  title_ar: string;
  excerpt_en?: string | null;
  excerpt_ar?: string | null;
  content_en: string; // HTML string
  content_ar: string; // HTML string
  authorName_en: string;
  authorName_ar: string;
  authorRole_en: string;
  authorRole_ar: string;
  authorInitials: string;
  publishedAt: string;
  status: string;
  // SEO
  metaTitle_en?: string | null;
  metaTitle_ar?: string | null;
  metaDescription_en?: string | null;
  metaDescription_ar?: string | null;
}

// Convert DB post format to expected frontend BlogPost structure dynamically
export function mapDbPostToBlogPost(dbPost: any, language: 'en' | 'ar'): BlogPost {
  const isAr = language === 'ar';
  return {
    slug: dbPost.slug,
    title: isAr ? (dbPost.title_ar || dbPost.title_en) : dbPost.title_en,
    excerpt: isAr ? (dbPost.excerpt_ar || dbPost.excerpt_en || '') : (dbPost.excerpt_en || ''),
    category: dbPost.category,
    categoryLabel: dbPost.category === 'ai' ? (isAr ? 'تطوير الذكاء الاصطناعي' : 'AI Dev') : 
                   dbPost.category === 'nextjs' ? 'Next.js' : 
                   dbPost.category === 'saas' ? 'SaaS' : 
                   dbPost.category === 'devops' ? 'DevOps' : 
                   dbPost.category === 'mobile' ? (isAr ? 'تطوير الجوال' : 'Mobile Dev') : (isAr ? 'تعليمي' : 'Tutorial'),
    tags: dbPost.tags || [],
    author: {
      initials: dbPost.authorInitials || 'AD',
      name: isAr ? (dbPost.authorName_ar || dbPost.authorName_en) : dbPost.authorName_en,
      role: isAr ? (dbPost.authorRole_ar || dbPost.authorRole_en) : dbPost.authorRole_en,
    },
    publishedAt: new Date(dbPost.publishedAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    readTime: Math.max(3, Math.ceil((dbPost.content_en || '').split(/\s+/).length / 200)), // dynamic read time
    emoji: '📝',
    coverImage: dbPost.coverImage,
    featured: dbPost.status === 'PUBLISHED',
  };
}

export async function getPostBySlug(slug: string): Promise<BlogDetail | null> {
  const url = `${API_BASE}/${slug}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('getPostBySlug: failed to fetch blog post:', err);
    return null;
  }
}

export async function getAllDbPosts(language: 'en' | 'ar'): Promise<BlogPost[]> {
  try {
    const res = await fetch(API_BASE, { cache: 'no-store' });
    if (!res.ok) throw new Error('API down');
    const dbPosts = await res.json();
    // Only return published blogs
    const published = dbPosts.filter((p: any) => p.status === 'PUBLISHED');
    return published.map((p: any) => mapDbPostToBlogPost(p, language));
  } catch (err) {
    console.warn('getAllDbPosts: failed to fetch from dynamic DB API', err);
    return [];
  }
}
