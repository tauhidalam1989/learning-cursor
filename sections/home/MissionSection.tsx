import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/common/SectionHeader';

export function MissionSection() {
  return (
    <section
      id="mission"
      aria-labelledby="mission-heading"
      className="py-16 sm:py-20 bg-transparent"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <SectionHeader
              label="ABOUT COREMATRIX"
              title="Our Mission - Intelligent Digital Solutions For a New World"
              description="Corematrix is a team of tech folks passionate about building the digital solutions that our clients need to succeed in today's world. Our focus is on designing, developing, integrating, and scaling secure, scalable, and intelligent digital solutions that make a real difference."
              align="left"
            />

            <div className="mt-6">
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-md border-2 border-[#A7F3D0] bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-all hover:bg-[#A7F3D0]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A7F3D0] focus-visible:ring-offset-2"
              >
                TAKE A CLOSER LOOK
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[560px] overflow-hidden rounded-2xl border border-[#A7F3D0]/10 bg-gradient-to-br from-[#021E14]/60 to-[#063C2C]/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/about-vision.png"
                  alt="Vision illustration"
                  fill
                  className="object-cover"
                  quality={90}
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

