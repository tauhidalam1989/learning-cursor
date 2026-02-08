import type { BlogPost } from '@/types';

/**
 * Single source of blog posts for the site.
 * Used by: FeaturedBlogSection (home), BlogListSection (blog page), and any other blog UI.
 * Replace with API/CMS fetch in production.
 */
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'getting-started-with-growth',
    title: 'Dummy text of the printing',
    excerpt:
      'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    publishedAt: '2024-01-15',
    author: 'Jane Doe',
    imageSrc: '/blog-featured.jpg',
    imageAlt: 'Featured blog post image',
  },
  {
    id: '2',
    slug: 'brand-identity-tips',
    title: '5 brand identity tips that actually work',
    excerpt:
      'How to build a recognizable brand without blowing the budget.',
    publishedAt: '2024-01-08',
    author: 'John Smith',
    imageSrc: '/blog-1.jpg',
    imageAlt: 'Blog post one image',
  },
  {
    id: '3',
    slug: 'measuring-marketing-roi',
    title: 'Measuring marketing ROI in 2024',
    excerpt:
      'The metrics and tools we use to prove impact to stakeholders.',
    publishedAt: '2024-01-01',
    author: 'Jane Doe',
    imageSrc: '/blog-2.jpg',
    imageAlt: 'Blog post two image',
  },
  {
    id: '4',
    slug: 'lorem-ipsum-featured',
    title: 'Featured Blog Post Title',
    excerpt:
      'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    publishedAt: '2024-01-20',
    imageSrc: '/blog-featured.jpg',
    imageAlt: 'Featured blog post image',
  },
  {
    id: '5',
    slug: 'brand-identity-tips',
    title: '5 brand identity tips that actually work',
    excerpt:
      'How to build a recognizable brand without blowing the budget.',
    publishedAt: '2024-01-08',
    author: 'John Smith',
    imageSrc: '/blog-1.jpg',
    imageAlt: 'Blog post one image',
  },
  {
    id: '6',
    slug: 'measuring-marketing-roi',
    title: 'Measuring marketing ROI in 2024',
    excerpt:
      'The metrics and tools we use to prove impact to stakeholders.',
    publishedAt: '2024-01-01',
    author: 'Jane Doe',
    imageSrc: '/blog-2.jpg',
    imageAlt: 'Blog post two image',
  },
  {
    id: '7',
    slug: 'lorem-ipsum-featured',
    title: 'Featured Blog Post Title',
    excerpt:
      'Lorem ipsum is simply dummy text of the printing and typesetting industry.',
    publishedAt: '2024-01-20',
    imageSrc: '/blog-featured.jpg',
    imageAlt: 'Featured blog post image',
  }
];

/**
 * Get all blog posts (for blog listing page).
 */
export function getAllBlogPosts(): BlogPost[] {
  return [...blogPosts];
}

/**
 * Get latest posts for featured section: first as featured, next two as side posts.
 * Pass limit to change how many "recent" posts (default 3).
 */
export function getLatestBlogPosts(limit = 3): BlogPost[] {
  return blogPosts.slice(0, limit);
}

/**
 * Get one featured post and two recent posts for home page layout.
 */
export function getFeaturedBlogBlock(): {
  featured: BlogPost;
  recent: BlogPost[];
} {
  const [featured, ...recent] = blogPosts;
  return {
    featured: featured ?? blogPosts[0],
    recent: recent.slice(0, 2),
  };
}
