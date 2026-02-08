import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { SectionHeader } from '@/components/common/SectionHeader';

const services = [
  {
    icon: <Image src="/images/service-1.png" alt="Web applications" width={40} height={40} className="object-contain" />,
    title: 'Custom Web Applications',
    description:
      'Tailored web applications built for your unique business needs, with a focus on performance and user experience.',
  },
  {
    icon: <Image src="/images/service-2.png" alt="Enterprise software" width={40} height={40} className="object-contain" />,
    title: 'Enterprise Software Solutions',
    description:
      'Robust enterprise solutions that streamline operations, improve efficiency, and scale with your organization.',
  },
  {
    icon: <Image src="/images/service-3.png" alt="SaaS product" width={40} height={40} className="object-contain" />,
    title: 'SaaS Product Development',
    description:
      'Scalable SaaS platforms from MVP to full-scale product, designed for growth and seamless user experiences.',
  },
  {
    icon: <Image src="/images/service-4.png" alt="API integration" width={40} height={40} className="object-contain" />,
    title: 'API & Third-Party Integrations',
    description:
      'Secure API development and seamless integrations that connect your systems and automate workflows.',
  },
];

/**
 * Four service feature cards with dark glass-style design.
 * Used on Service page.
 */
export function ServiceCardsSection() {
  return (
    <section id="service-cards" aria-labelledby="service-cards-heading" className="bg-transparent py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mt-2 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {services.map((s) => (
            <ServiceCard key={s.title} icon={s.icon} title={s.title} description={s.description} />
          ))}
        </div>
      </Container>
    </section>
  );
}
