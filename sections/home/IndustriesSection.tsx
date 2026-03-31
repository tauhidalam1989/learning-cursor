import { Container } from '@/components/ui/Container';

const INDUSTRIES = [
  { icon: '🏥', name: 'Healthcare & MedTech' },
  { icon: '💰', name: 'Fintech & Banking' },
  { icon: '🛍️', name: 'eCommerce & Retail' },
  { icon: '🎓', name: 'EdTech & E-Learning' },
  { icon: '🏗️', name: 'Real Estate & PropTech' },
  { icon: '🚚', name: 'Logistics & Supply Chain' },
  { icon: '🤝', name: 'HR Tech & Recruitment' },
  { icon: '🌐', name: 'SaaS & Technology' },
];

export function IndustriesSection() {
  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-16 lg:py-24"
    >
      <Container>
        <div className="text-center">
          <p className="section-label text-corematrix-green400">INDUSTRIES</p>
          <h2
            id="industries-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            We Know Your Industry
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-base leading-relaxed text-corematrix-textSecondary">
            Deep domain expertise across sectors that demand reliable, intelligent technology.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {INDUSTRIES.map((ind) => (
            <article
              key={ind.name}
              className="reveal flex items-center gap-3 rounded-xl border border-corematrix-border bg-corematrix-card px-5 py-5 transition-all hover:translate-x-1 hover:border-corematrix-border2 hover:bg-corematrix-card2"
            >
              <span className="text-2xl" aria-hidden>
                {ind.icon}
              </span>
              <span className="font-medium text-corematrix-textPrimary">{ind.name}</span>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
