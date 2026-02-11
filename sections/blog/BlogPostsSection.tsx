 'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/common/SectionHeader';

type Props = {
  posts: Array<{
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    publishedAt: string;
    imageSrc?: string;
    imageAlt?: string;
    author?: string;
  }>;
};

export function BlogPostsSection({ posts: allPosts }: Props) {
  const allPostsLocal = allPosts ?? [];
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [slidesPerView, setSlidesPerView] = useState<number>(3);
  const [index, setIndex] = useState(0);

  // responsive cardPercent: desktop ~33.333% (3 visible), tablet 50% (2 visible), mobile 100% (1 visible)
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w >= 1024) {
        setSlidesPerView(3);
      } else if (w >= 768) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(1);
      }
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const posts = useMemo(() => allPostsLocal, [allPostsLocal]);

  // clamp index when slidesPerView changes
  useEffect(() => {
    const maxIndex = Math.max(0, posts.length - slidesPerView);
    if (index > maxIndex) setIndex(maxIndex);
  }, [slidesPerView, posts.length, index]);

  const visible = Math.min(posts.length, slidesPerView);
  const canSlide = posts.length > visible;
  const carouselActive = canSlide;
  const activeIndex = index + Math.floor(visible / 2);

  const SLIDE_WIDTH = 374; // px - fixed slide width to show exactly 3 cards

  const maxIndex = Math.max(0, posts.length - visible);
  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(maxIndex, i + 1));

  // pointer / swipe support for touch devices
  const startX = useRef<number | null>(null);
  const isPointerDown = useRef(false);
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onPointerDown = (e: PointerEvent) => {
      isPointerDown.current = true;
      startX.current = e.clientX;
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!isPointerDown.current || startX.current === null) return;
      const dx = e.clientX - startX.current;
      const threshold = 50;
      if (Math.abs(dx) > threshold) {
        if (dx < 0) next();
        else prev();
      }
      isPointerDown.current = false;
      startX.current = null;
    };
    const onPointerCancel = () => {
      isPointerDown.current = false;
      startX.current = null;
    };
    el.addEventListener('pointerdown', onPointerDown);
    el.addEventListener('pointerup', onPointerUp);
    el.addEventListener('pointercancel', onPointerCancel);
    return () => {
      el.removeEventListener('pointerdown', onPointerDown);
      el.removeEventListener('pointerup', onPointerUp);
      el.removeEventListener('pointercancel', onPointerCancel);
    };
  }, [next, prev]);

  return (
    <section
      id="blog-posts"
      aria-labelledby="blog-posts-heading"
      className="py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <div className="max-w-[1280px] mx-auto px-8 flex items-baseline justify-between gap-6">
          <SectionHeader
            title="The Future of Custom Software Development"
            description="Insights and articles from our team about building secure, scalable software."
            align="left"
          />
          {/* controls (pixel-perfect circular arrows) */}
          <div className="ml-auto hidden lg:flex gap-4 items-center">
            <button
              onClick={prev}
              disabled={!canSlide || index === 0}
              aria-label="Previous"
              className="h-11 w-11 rounded-full border-2 border-[#11996A] text-white/90 flex items-center justify-center bg-transparent hover:bg-white/20 disabled:opacity-40 transition"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" stroke="#11996A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              disabled={!canSlide || index === maxIndex}
              aria-label="Next"
              className="h-11 w-11 rounded-full border-2 border-[#11996A] text-white/90 flex items-center justify-center bg-transparent hover:bg-white/20 disabled:opacity-40 transition"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="#11996A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-8" ref={containerRef}>
          {carouselActive ? (
            // Carousel mode — render differently depending on visible count
            <>
              {visible === 1 ? (
                // Mobile: show only the active card
                <div className="flex justify-center">
                  {posts[index] && (
                    <div className="px-3" style={{ width: '100%', maxWidth: `${SLIDE_WIDTH}px` }}>
                      <Link href={`/blog/${posts[index].slug}`} className="group block">
                        <div className="overflow-visible bg-transparent">
                          <div className="p-3">
                            <div
                              className="relative w-full overflow-hidden rounded-[14px] ring-2 ring-[#11996A] ring-opacity-90 shadow-2xl"
                            >
                              <div className="aspect-[4/3] w-full relative bg-slate-200 overflow-hidden">
                                {posts[index].imageSrc && (
                                  <Image
                                    src={posts[index].imageSrc}
                                    alt={posts[index].imageAlt || posts[index].title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                  />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                              </div>
                            </div>
                          </div>
                          <div className="px-6 pb-6">
                            <h3
                              className="text-lg font-semibold text-white transition-colors group-hover:text-[#11996A] leading-tight"
                              style={{ fontFamily: 'var(--font-display)' }}
                            >
                              {posts[index].title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-white/70" style={{ fontFamily: 'var(--font-sans)' }}>
                              {posts[index].excerpt}
                            </p>
                            <div className="mt-4 flex items-center justify-between text-xs text-white/60">
                              <span>{posts[index].author || 'Team'}</span>
                              <span>{posts[index].publishedAt}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                // Tablet / Desktop: multi-card viewport (2 or 3 visible)
                <div
                  className="mx-auto"
                  style={{
                    width: `${visible * SLIDE_WIDTH}px`,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    className="flex transition-transform duration-500"
                    style={{
                      transform: `translateX(-${index * SLIDE_WIDTH}px)`,
                      width: `${posts.length * SLIDE_WIDTH}px`,
                    }}
                  >
                    {posts.map((post, i) => {
                      const isActive = i === activeIndex;
                      return (
                        <div
                          key={post.id}
                          className="px-3"
                          style={{ flex: `0 0 ${SLIDE_WIDTH}px`, width: `${SLIDE_WIDTH}px` }}
                        >
                          <Link href={`/blog/${post.slug}`} className="group block">
                            <div className="overflow-visible bg-transparent">
                              <div className="p-3">
                                <div
                                  className={`relative w-full overflow-hidden rounded-[14px] transition-shadow ${
                                    isActive ? 'ring-2 ring-[#11996A] ring-opacity-90 shadow-2xl' : 'shadow-xl'
                                  }`}
                                >
                                  <div className="aspect-[4/3] w-full relative bg-slate-200 overflow-hidden">
                                    {post.imageSrc && (
                                      <Image
                                        src={post.imageSrc}
                                        alt={post.imageAlt || post.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                      />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                                  </div>
                                </div>
                              </div>
                              <div className="px-6 pb-6">
                                <h3
                                  className="text-lg font-semibold text-white transition-colors group-hover:text-[#11996A] leading-tight"
                                  style={{ fontFamily: 'var(--font-display)' }}
                                >
                                  {post.title}
                                </h3>
                                <p className="mt-3 text-sm leading-relaxed text-white/70" style={{ fontFamily: 'var(--font-sans)' }}>
                                  {post.excerpt}
                                </p>
                                <div className="mt-4 flex items-center justify-between text-xs text-white/60">
                                  <span>{post.author || 'Team'}</span>
                                  <span>{post.publishedAt}</span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* pagination dots */}
              {canSlide && (
                <div className="mt-6 flex items-center justify-center gap-2">
                  {Array.from({ length: posts.length - visible + 1 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className={`transition-all rounded-full ${i === index ? 'bg-[#11996A] h-2 w-8' : 'bg-white/20 h-2 w-6'}`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            // Grid/centered mode (mobile/tablet or desktop when posts <= 3)
            <>
              {posts.length <= visible ? (
                <div className="flex justify-center gap-6">
                  {posts.map((post, i) => {
                    const isActive = i === activeIndex;
                    return (
                    <div key={post.id} className="px-3 w-full sm:w-1/2 lg:w-1/3 max-w-[374px]" style={{ maxWidth: '374px' }}>
                        <Link href={`/blog/${post.slug}`} className="group block">
                          <div className="overflow-hidden p-0 bg-transparent">
                            <div className="p-4">
                              <div className={`relative w-full overflow-hidden rounded-2xl ${isActive ? 'ring-2 ring-[#149253] ring-opacity-90' : ''}`}>
                                <div className="aspect-[4/3] w-full relative bg-slate-200">
                                  {post.imageSrc ? (
                                    <Image
                                      src={post.imageSrc}
                                      alt={post.imageAlt || post.title}
                                      fill
                                      className="object-cover transition-transform group-hover:scale-[1.02]"
                                    />
                                  ) : (
                                    <div className="w-full h-full bg-[#e6e6e6]" />
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                                </div>
                              </div>
                            </div>
                            <div className="px-6 pb-6 text-left">
                              <h3 className="text-lg font-medium text-white transition-colors group-hover:text-[#149253] leading-tight">
                                {post.title}
                              </h3>
                              <p className="mt-3 text-sm leading-relaxed text-white/70">
                                {post.excerpt}
                              </p>
                              <div className="mt-4 flex items-center justify-between text-xs text-white/60">
                                <span>{post.author || 'Team'}</span>
                                <span>{post.publishedAt}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <div key={post.id} className="px-3">
                      <Link href={`/blog/${post.slug}`} className="group block">
                        <div className="overflow-hidden p-0 bg-transparent">
                          <div className="p-4">
                            <div className="relative w-full overflow-hidden rounded-2xl">
                              <div className="aspect-[4/3] w-full relative bg-slate-200">
                                {post.imageSrc ? (
                                  <Image
                                    src={post.imageSrc}
                                    alt={post.imageAlt || post.title}
                                    fill
                                    className="object-cover transition-transform group-hover:scale-[1.02]"
                                  />
                                ) : (
                                  <div className="w-full h-full bg-[#e6e6e6]" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                              </div>
                            </div>
                          </div>
                          <div className="px-6 pb-6 text-left">
                            <h3 className="text-lg font-medium text-white transition-colors group-hover:text-[#149253] leading-tight">
                              {post.title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-white/70">
                              {post.excerpt}
                            </p>
                            <div className="mt-4 flex items-center justify-between text-xs text-white/60">
                              <span>{post.author || 'Team'}</span>
                              <span>{post.publishedAt}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </Container>
    </section>
  );
}
