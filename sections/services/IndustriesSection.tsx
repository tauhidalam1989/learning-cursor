import { Container } from '@/components/ui/Container';

type Industry = { icon: string; name: string; description: string };

const INDUSTRIES: Industry[] = [
  {
    icon: '🏥',
    name: 'Healthcare & MedTech',
    description:
      'HIPAA-compliant platforms, patient portals, telehealth apps, clinical AI, and medical data pipelines.',
  },
  {
    icon: '💰',
    name: 'Fintech & Banking',
    description:
      'Payment platforms, trading systems, fraud detection AI, KYC automation, and regulatory compliance tools.',
  },
  {
    icon: '🛍️',
    name: 'eCommerce & Retail',
    description:
      'Custom storefronts, AI recommendation engines, inventory management, and omnichannel commerce platforms.',
  },
  {
    icon: '🎓',
    name: 'EdTech & E-Learning',
    description:
      'LMS platforms, AI tutoring systems, adaptive learning engines, and assessment automation tools.',
  },
  {
    icon: '🏗️',
    name: 'Real Estate & PropTech',
    description:
      'Property listing platforms, AI valuation tools, CRM systems, and smart building management software.',
  },
  {
    icon: '🚚',
    name: 'Logistics & Supply Chain',
    description:
      'Route optimization AI, inventory forecasting, fleet management, and real-time shipment tracking.',
  },
  {
    icon: '🤝',
    name: 'HR Tech & Recruitment',
    description:
      'ATS platforms, AI resume screening, employee engagement tools, and workforce analytics dashboards.',
  },
  {
    icon: '🌐',
    name: 'SaaS & B2B Tech',
    description:
      'Multi-tenant platforms, developer tools, API products, billing systems, and growth infrastructure.',
  },
];

export function IndustriesSection() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <div className="text-center">
          <p className="section-label text-corematrix-green400">INDUSTRIES WE SERVE</p>
          <h2
            id="industries-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            Built for the Sectors Where Technology Matters Most
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-base leading-relaxed text-corematrix-textSecondary">
            From healthcare to fintech, we deliver solutions tailored to your industry’s unique needs.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-border sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((industry) => (
            <div
              key={industry.name}
              className="cursor-default bg-corematrix-card p-8 transition-colors hover:bg-corematrix-card2"
            >
              <span className="mb-3 block text-3xl" aria-hidden>
                {industry.icon}
              </span>
              <h3 className="mb-1.5 font-display text-sm font-bold text-corematrix-textPrimary">
                {industry.name}
              </h3>
              <p className="text-xs font-light leading-snug text-corematrix-textMuted">
                {industry.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
