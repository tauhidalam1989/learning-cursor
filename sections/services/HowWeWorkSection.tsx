import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/common/SectionHeader';

const steps = [
  { number: '01', title: 'Requirement & Business Analysis' },
  { number: '02', title: 'Solution Architecture' },
  { number: '03', title: 'Design & Development' },
  { number: '04', title: 'Testing & Deployment' },
  { number: '05', title: 'Ongoing Support & Scaling' },
];

/**
 * "How We Work" - 5-step process. Large faded numbers, titles below.
 * Dark theme. Centered heading and description.
 */
export function HowWeWorkSection() {
  return (
    <section id="how-we-work" aria-labelledby="how-we-work-heading" className="bg-transparent py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionHeader  title="How We Work" description="We follow agile methodologies to ensure transparency, efficiency and timely delivery at every stage." />

        <div className="mt-12 grid gap-8 sm:mt-16 sm:grid-cols-2 lg:mt-20 lg:grid-cols-5">
          {steps.map((step) => (
            <div key={step.number} className="relative flex items-center">
              {/* Large faint number (background) for lg and up */}
              <span
                aria-hidden
                className="hidden lg:block absolute left-0 -translate-y-2/4 text-[140px] font-bold text-[#149253] opacity-40 leading-none select-none"
                style={{ top: '50%', transform: 'translateY(-50%)' }}
              >
                {step.number}
              </span>

              {/* Mobile/Tablet number (small, visible above title) */}
              <span className="lg:hidden block text-4xl font-bold text-[#149253]/30 sm:text-5xl">
                {step.number}
              </span>

              {/* Title */}
              <h3
                className="ml-0 lg:ml-[120px] text-base font-bold text-white sm:text-lg"
                style={{ lineHeight: '136%' }}
              >
                {step.title}
              </h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
