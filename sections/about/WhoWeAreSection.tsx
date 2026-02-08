import { Container } from '@/components/ui/Container';

/**
 * Enhanced "Who Are We?" section — improved spacing, typography, and a two-column
 * "What We Do" list with accent bars to match the pixel-perfect design.
 */
export function WhoWeAreSection() {
  const whatWeDo = [
    'Web applications',
    'Enterprise software',
    'SaaS platforms',
    'API & System Integration',
  ];

  return (
    <section id="who-we-are" aria-labelledby="who-we-are-heading" className="bg-transparent py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
          {/* Left: Intro */}
          <div>
            

            <h2
              id="who-we-are-heading"
              className="mt-4 text-white"
              style={{ fontFamily: 'var(--font-display)', fontSize: 39, fontWeight: 500, lineHeight: '106%', letterSpacing: '0em' }}
            >
              Who are we?
            </h2>

            <p
              className="mt-6 text-white/80 max-w-[680px]"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 400,
                fontSize: 19,
                lineHeight: '178%',
                letterSpacing: '0em',
              }}
            >
              Corematrix is an IT services company that's always pushing the boundaries of what technology can do for businesses. We help companies like yours design, develop, and scale software systems that tackle real-world problems using the cutting-edge tech that's available today, and ready for tomorrow.
            </p>

            <p
              className="mt-6 text-white/80 max-w-[680px]"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 400,
                fontSize: 19,
                lineHeight: '178%',
                letterSpacing: '0em',
              }}
            >
              We genuinely believe that technology should be something that works for you, not the other way around. That's why we're all about creating tech that's useful, strong and forward-thinking.
            </p>
          </div>

          {/* Right: What We Do (two-column list with accent bars) */}
          <div>
            <h3 className="mt-4 text-white" style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 500 }}>
              What We Do
            </h3>

            <p className="mt-4 text-white/80" style={{ fontFamily: 'var(--font-sans)', fontWeight: 300, fontSize: 16, lineHeight: '1.78' }}>
              We take ideas and turn them into high-performance digital products and reliable IT systems that help businesses succeed with the help of our secure, scalable and cutting-edge technology solutions.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {whatWeDo.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className="mt-1 block h-6 w-1 rounded"
                    style={{ backgroundColor: '#149253' }}
                  />
                  <div>
                    <p
                      className="text-base font-medium text-white"
                      style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 19, lineHeight: '158%', letterSpacing: '0em' }}
                    >
                      {item}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
