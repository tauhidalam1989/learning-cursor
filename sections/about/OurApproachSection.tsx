import { Container } from '@/components/ui/Container';

const approachItems = [
  {
    title: 'Getting to the heart of the problem',
    description:
      'We start by understanding your business challenges and goals before proposing solutions.',
    icon: '/images/benefit-1.png',
  },
  {
    title: 'Building for scale',
    description:
      'Our architecture is designed to grow with you, from startup to enterprise.',
    icon: '/images/benefit-2.png',
  },
  {
    title: 'Partnership-focused delivery',
    description:
      'We work alongside your team with clear communication and transparent timelines.',
    icon: '/images/benefit-3.png',
  },
  {
    title: 'Continuous improvement',
    description:
      'We iterate based on feedback and evolving needs to deliver lasting value.',
    icon: '/images/benefit-4.png',
  },
];

import { IconBadge } from '@/components/common/IconBadge';

function IconCircle({ src }: { src: string }) {
  return (
    <div className="mx-auto mb-4">
      <IconBadge src={src} size={64} />
    </div>
  );
}

/**
 * "Our Approach" section - centered heading, description, 4-column feature grid.
 * Dark theme. Each item: circular icon, title, description.
 */
export function OurApproachSection() {
  return (
    <section
      id="our-approach"
      aria-labelledby="our-approach-heading"
      className="bg-transparent py-16 sm:py-20"
      style={{
        borderTopWidth: 2,
        borderTopStyle: 'solid',
        borderImageSource: 'linear-gradient(90deg, #010D07 0%, #026835 49.04%, #010D07 98.56%)',
        borderImageSlice: 1,
      }}
    >
      <Container>
        <div className="text-center">
          <h2
            id="our-approach-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 39,
              lineHeight: '106%',
              color: '#fff',
              textAlign: 'center',
            }}
          >
            Our Approach
          </h2>

          <p
            className="mx-auto mt-6 max-w-2xl"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 300,
              fontSize: 17,
              lineHeight: '178%',
              color: '#fff',
              textAlign: 'center',
            }}
          >
            We do things our way, and that means taking a business-first approach with a focus on clarity, results and value that lasts.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {approachItems.map((item, idx) => {
            // show a vertical separator to the left of columns (responsive)
            const separatorClasses = [
              // For >=sm (2-column layout) add separator for the second column (odd indexes)
              idx % 2 === 1 ? 'sm:border-l sm:border-white/10 sm:pl-6 sm:ml-6' : '',
              // For >=lg (4-column layout) add separator for all columns except the first
              idx !== 0 ? 'lg:border-l lg:border-white/10 lg:pl-8 lg:ml-8' : '',
            ]
              .filter(Boolean)
              .join(' ');

            return (
              <article
                key={item.title}
                className={`flex flex-col items-center text-center ${separatorClasses}`}
              >
                <IconCircle src={item.icon} />
                <h3
                  className="mt-2 text-white"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 21,
                    lineHeight: '136%',
                    textAlign: 'center',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="mt-2 text-white/70"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 300,
                    fontSize: 14,
                    lineHeight: '156%',
                    textAlign: 'center',
                  }}
                >
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
