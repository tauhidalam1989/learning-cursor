import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

const items = [
  { id: 1, title: 'We build secure & scalable architecture', icon: '/images/benefit-1.png' },
  { id: 2, title: "We're all about using the latest tech stack", icon: '/images/benefit-2.png' },
  { id: 3, title: 'Business goals come first', icon: '/images/benefit-3.png' },
];

export function PartnerBenefitsSection() {
  return (
    <section className="bg-black py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-20">
          {/* Left column - features list */}
          <div>
            <h3
              className="mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 42,
                lineHeight: '106%',
                color: '#FFFFFF',
              }}
            >
              Why Partner with Corematrix?
            </h3>

            <div className="space-y-6">
              {items.map((it) => (
                <div key={it.id} className="benefit-item flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
                    <Image src={it.icon} alt="" width={40} height={40} className="object-contain" />
                  </div>
                  <div>
                    <p
                      className="text-white"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 500,
                        fontSize: 26,
                        lineHeight: '115.99999999999999%',
                      }}
                    >
                      {it.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - partner blurb */}
          <div>
            <h4
              className="mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 42,
                lineHeight: '106%',
                color: '#FFFFFF',
              }}
            >
              Your Trusted Long-Term Tech Partner
            </h4>
            <p
              className="mb-6"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 300,
                fontSize: 19,
                lineHeight: '178%',
                color: '#FFFFFF',
              }}
            >
              At Corematrix, we're more than just a service provider - we're your trusted technology partner for the long haul.
              We collaborate with you to build systems that drive real results.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md border border-transparent px-5 py-3 text-sm font-semibold text-white"
              style={{
                borderImageSource: 'linear-gradient(90deg,#026634 0%,#074526 100%)',
                borderImageSlice: 1,
                borderWidth: 1,
                borderStyle: 'solid',
              }}
            >
              LET'S GET STARTED
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

