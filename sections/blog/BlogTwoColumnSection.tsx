import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getFeaturedBlogBlock, getAllBlogPosts } from '@/data/blog';
import { SectionHeader } from '@/components/common/SectionHeader';
import { GlassCard } from '@/components/common/GlassCard';

function formatRelativeDate(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  if (diff === 0) return 'Today';
  if (diff === 1) return '1 day ago';
  if (diff < 7) return `${diff} days ago`;
  if (diff < 14) return '1 week ago';
  return `${Math.floor(diff / 7)} weeks ago`;
}

/**
 * Blog section 2: Large featured card left, 3 smaller summaries right.
 * Dark theme. Uses data/blog.
 */
export function BlogTwoColumnSection() {
  const { featured, recent } = getFeaturedBlogBlock();
  const allPosts = getAllBlogPosts();
  const sidePosts = recent.length >= 3 ? recent.slice(0, 3) : allPosts.slice(1, 4);

  return (
    <section
      id="blog-two-column"
      aria-labelledby="blog-two-column-heading"
      className="py-16 sm:py-20 lg:py-24 bg-transparent"
    >
      <Container>
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          <div className="mt-10 grid gap-12 lg:mt-12 lg:grid-cols-2 lg:gap-12">
            {/* Large featured card (left) */}
            <article >
                <div className="lg:w-100 py-2">
              <h2 id="blog-two-column-heading" className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                        {featured.title}
              </h2>
              <p className="mt-4 text-sm text-white/70 max-w-[640px]" style={{ fontFamily: 'var(--font-sans)' }}>
                        {featured.excerpt}
              </p>
            </div>
              <Link href={`/blog/${featured.slug}`} className="group block">
                <div className="relative overflow-visible">
                  <div
                    className="rounded-[18px] overflow-hidden shadow-2xl"
                    style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}
                  >
                    <div className="relative aspect-[4/3] w-full bg-slate-200">
                      {featured.imageSrc && (
                        <Image
                          src={featured.imageSrc}
                          alt={featured.imageAlt || featured.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                          sizes="(max-width: 1024px) 100vw, 66vw"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                  </div>
                </div>
              </Link>
            </article>

            {/* Right column: three compact summaries */}
            <div className="flex flex-col gap-8">
              {sidePosts.map((post) => (
                <article key={post.id} className="group">
                  <Link href={`/blog/${post.slug}`} className="flex items-center justify-between gap-4">
                    <div className="flex-1 pr-4">
                      <h4 className="text-lg font-semibold text-white group-hover:text-[#11996A]" style={{ fontFamily: 'var(--font-display)' }}>
                        {post.title}
                      </h4>
                      <p className="mt-2 text-sm text-white/70">{post.excerpt}</p>
                      <div className="mt-3 flex items-center gap-4 text-xs text-white/60">
                        <span className="text-[#11996A]">{'Explore More'}</span>
                        <span className="opacity-60">|</span>
                        <span>{formatRelativeDate(post.publishedAt)}</span>
                      </div>
                    </div>
                    <div className="relative h-20 w-20 flex-shrink-0 rounded-lg bg-white/5 overflow-hidden">
                      {post.imageSrc ? (
                        <Image
                          src={post.imageSrc}
                          alt={post.imageAlt || post.title}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#e6e6e6]" />
                      )}
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
