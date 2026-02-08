import Image from 'next/image';
import { Container } from '@/components/ui/Container';

interface VisionMissionSectionProps {
  imageSrc?: string;
  imageAlt?: string;
}

/**
 * "Our Vision" and "Our Mission" two-column section with image panel.
 * Left: Vision + Mission text. Right: rounded image (globe/tech illustration).
 */
export function VisionMissionSection({
  imageSrc = '/about-vision.png',
  imageAlt = 'Hand holding a glowing holographic globe with technology icons',
}: VisionMissionSectionProps) {
  return (
    <section id="vision-mission" aria-labelledby="vision-mission-heading" className="bg-transparent py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h2
              id="vision-mission-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 39,
                fontWeight: 500,
                lineHeight: '106%',
                color: '#fff',
              }}
            >
              Our Vision
            </h2>
            <p
              className="mt-6 text-white/90"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 400,
                fontSize: 19,
                lineHeight: '178%',
                color: '#fff',
              }}
            >
              To be the trusted technology partner for businesses worldwide,
              empowering them to achieve more through intelligent digital
              solutions.
            </p>
            <h3
              className="mt-12 text-white"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 39,
                fontWeight: 500,
                lineHeight: '106%',
              }}
            >
              Our Mission
            </h3>
            <p
              className="mt-6 text-white/90"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 400,
                fontSize: 19,
                lineHeight: '178%',
                color: '#fff',
              }}
            >
              We design, build, and scale secure digital solutions that grow
              with your business – from web applications and SaaS platforms to
              enterprise software and system integrations.
            </p>
          </div>
          <div>
            <div style={{ maxWidth: 560 }} className="ml-auto">
              <div className="relative overflow-hidden rounded-2xl border border-[#149253]/20 shadow-[0_0_30px_rgba(20,146,83,0.08)]">
                <div className="relative aspect-[16/10] w-full">
                  <Image src={imageSrc} alt={imageAlt} fill className="object-cover" quality={90} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#021E14]/40 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
