import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { getLatestBlogPosts } from '@/data/blog';
import { SectionHeader } from '@/components/common/SectionHeader';
import { GlassCard } from '@/components/common/GlassCard';

export function FeaturedBlogSection() {
  const posts = getLatestBlogPosts(3);
  const [featured, ...others] = posts;

  return (
    <section id="featured-blog" className="bg-transparent py-12 sm:py-16 lg:py-20">
      <Container>
        <SectionHeader
          label="FEATURED BLOG"
          title="Dive into Our Top Blogs"
          description="Insights and updates from our team — analysis, tutorials, and case studies."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Featured (50%) */}
          <div>
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="group block">
                <GlassCard className="overflow-hidden p-0">
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={featured.imageSrc || '/blog-featured.jpg'}
                      alt={featured.imageAlt || featured.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h4 className="text-2xl font-semibold text-white leading-tight">{featured.title}</h4>
                    <p className="mt-3 text-base text-white/80 max-w-3xl">{featured.excerpt}</p>
                    <div className="mt-4">
                      <span className="text-sm font-semibold text-[#149253]">Explore</span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            )}
          </div>

          {/* Right: Two stacked items (each 50% height) */}
          <div className="grid auto-rows-fr gap-6">
            {others.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`} className="group block">
                <div className="flex gap-4 items-start rounded-xl overflow-hidden">
                  <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={p.imageSrc || '/blog-1.jpg'}
                      alt={p.imageAlt || p.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="112px"
                    />
                  </div>
                  <div>
                    <h5 className="text-base font-semibold text-white">{p.title}</h5>
                    <p className="mt-2 text-sm text-white/70 max-w-[320px]">{p.excerpt}</p>
                    <div className="mt-2">
                      <span className="text-sm font-semibold text-[#149253]">Explore</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

