import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { GlassCard } from '@/components/common/GlassCard';

const benefits = [
  'Business-focused IT solutions',
  'Modern, scalable technology stack',
  'Experienced technical team',
  'Clear communication & timelines',
  'Long-term support partnership',
];

/**
 * "Why Choose COREMATRIX" - two column: image left, "What Sets Us Apart" right with list + CTAs.
 */
export function WhyChooseSection({
  imageSrc = '/why-choose.png',
  imageAlt = 'Why choose Corematrix',
}: {
  imageSrc?: string;
  imageAlt?: string;
}) {
  return (
    <section id="why-choose" aria-labelledby="why-choose-heading" className="bg-transparent py-20 sm:py-24 lg:py-28">
      <Container>
        <SectionHeader
          title="Why Choose COREMATRIX"
          description="We deliver custom web and enterprise applications built with a strong focus on performance, security, and scalability."
          align="center"
        />

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left image card */}
          <div className="flex items-center">
            <div className="w-full max-w-[560px]">
              <div className="rounded-[28px] overflow-hidden bg-white shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                <div className="relative aspect-[4/3] w-full bg-[#07120b]">
                  <Image src={imageSrc} alt={imageAlt} fill className="object-cover" quality={90} />
                </div>
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div>
            <h3
              className="text-white"
              style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 400, lineHeight: '106%' }}
            >
              What Sets Us Apart
            </h3>

            <p
              className="mt-3 text-white/80 max-w-[620px]"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 19, lineHeight: '178%' }}
            >
              We deliver custom web and enterprise applications built with a strong focus on performance, security, and scalability.
            </p>

            <ul className="mt-8 space-y-6" role="list">
              {benefits.map((item) => (
                <li key={item} className="flex items-start gap-5">
                  <span className="mt-1 block h-6 w-1.5 rounded bg-[#149253]" aria-hidden />
                  <span
                    className="text-lg text-white"
                    style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 20, lineHeight: '158%' }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-[#149253] px-8 py-3 text-base font-semibold uppercase text-white transition-all hover:brightness-105"
              >
                CONTACT US
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-md border border-[#149253] bg-transparent px-8 py-3 text-base font-semibold uppercase text-white transition-all hover:bg-[#149253]/10"
              >
                PORTFOLIO
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
