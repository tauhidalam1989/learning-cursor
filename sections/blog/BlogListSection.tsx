import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getAllBlogPosts } from '@/data/blog';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Blog listing section: shows latest posts from data/blog.
 * Single source of truth – same data as FeaturedBlogSection.
 */
export function BlogListSection() {
  const posts = getAllBlogPosts();

  if (posts.length === 0) {
    return (
      <section className="py-16 lg:py-24">
        <Container>
          <h2 className="mb-12 text-3xl font-bold text-gray-900">
            Latest posts
          </h2>
          <p className="text-gray-600">No posts yet. Check back soon.</p>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="blog-list"
      aria-labelledby="blog-list-heading"
      className="py-16 lg:py-24"
    >
      <Container>
        <h2
          id="blog-list-heading"
          className="mb-12 text-3xl font-bold text-gray-900"
        >
          Latest posts
        </h2>
        <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" role="list">
          {posts.map((post) => (
            <li key={post.id}>
              <article className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <time
                  dateTime={post.publishedAt}
                  className="text-sm text-gray-500"
                >
                  {formatDate(post.publishedAt)}
                </time>
                <h3 className="mt-2 text-lg font-semibold text-gray-900">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="transition-colors hover:text-gray-600 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-gray-600">{post.excerpt}</p>
                {post.author && (
                  <p className="mt-4 text-sm text-gray-500">By {post.author}</p>
                )}
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
