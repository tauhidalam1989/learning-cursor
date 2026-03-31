import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { LATEST_POSTS } from '@/data/blogData';

// TODO: Replace with CMS fetch for latest 6 published posts
export function LatestPostsSection() {
  return (
    <section
      id="latest-posts"
      aria-labelledby="latest-posts-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="section-label text-corematrix-green400">LATEST</p>
            <h2
              id="latest-posts-heading"
              className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
            >
              Fresh Off the Press
            </h2>
          </div>
          <Link
            href="/blog"
            className="rounded-lg border border-corematrix-border px-5 py-2.5 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
          >
            View All Articles →
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {LATEST_POSTS.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex gap-5 rounded-2xl border border-corematrix-border bg-corematrix-card p-6 transition-all hover:-translate-y-0.5 hover:border-corematrix-border2 hover:bg-corematrix-card2"
            >
              <span className="mt-1 flex h-11 w-11 flex-shrink-0 font-display text-[2rem] font-extrabold leading-none text-corematrix-textDim">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[0.65rem] font-bold uppercase tracking-wider text-corematrix-green700">
                  {post.categoryLabel}
                </p>
                <h3 className="mt-1 font-display text-base font-bold leading-snug text-corematrix-textPrimary hover:text-corematrix-green400">
                  {post.title}
                </h3>
                <p className="mt-2 text-xs text-corematrix-textDim">
                  {post.author.name} · {post.publishedAt} · {post.readTime} min
                  read
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg border border-corematrix-border px-8 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
          >
            View All 48 Articles →
          </Link>
        </div>
      </Container>
    </section>
  );
}
