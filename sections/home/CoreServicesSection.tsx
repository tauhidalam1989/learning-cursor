import { Container } from '@/components/ui/Container';
import { ServiceCard } from '@/components/sections/ServiceCard';
import { SectionHeader } from '@/components/common/SectionHeader';
import Image from 'next/image';

const services = [
  {
    icon: <Image src="/images/service-1.png" alt="web apps" width={40} height={40} />,
    title: 'Web Applications',
    description:
      'Custom web apps built for performance, security, and great UX across devices.',
  },
  {
    icon: <Image src="/images/service-2.png" alt="enterprise" width={40} height={40} />,
    title: 'Enterprise Software',
    description:
      'Robust enterprise solutions that scale with your organization and processes.',
  },
  {
    icon: <Image src="/images/service-3.png" alt="saas" width={40} height={40} />,
    title: 'SaaS Platforms',
    description:
      'Design and build SaaS products from MVP to full-scale platforms for growth.',
  },
  {
    icon: <Image src="/images/service-4.png" alt="api" width={40} height={40} />,
    title: 'API & Integrations',
    description:
      'Secure APIs and third-party integrations to connect and automate your systems.',
  },
];

export function CoreServicesSection() {
  return (
    <section
      id="core-services"
      aria-labelledby="core-services-heading"
      className="py-12 sm:py-16 lg:py-20 bg-transparent"
    >
      <Container>
        <SectionHeader
          label="WHAT WE DO"
          title="The Core Services"
          description="We craft scalable, secure software solutions that work seamlessly across the web, SaaS, and enterprise systems - because you need technology that just gets on with it."
        />

        <div className="mt-12 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {services.map((s) => (
            <ServiceCard key={s.title} icon={s.icon} title={s.title} description={s.description} />
          ))}
        </div>
      </Container>
    </section>
  );
}

