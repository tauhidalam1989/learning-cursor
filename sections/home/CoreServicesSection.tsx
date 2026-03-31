import { Container } from '@/components/ui/Container';

type Service = {
  icon: string;
  title: string;
  description: string;
  tags: string[];
};

const SERVICES: Service[] = [
  {
    icon: '🧠',
    title: 'AI Product Development',
    description:
      'We build end-to-end AI products — LLM-powered apps, intelligent agents, computer vision, and NLP systems tailored to your business goals.',
    tags: ['#LLM', '#GPT', '#NLP'],
  },
  {
    icon: '⚙️',
    title: 'Custom AI & Automation',
    description:
      'Eliminate repetitive workflows with intelligent automation. We build RAG systems, custom AI pipelines, and process automation tools that cut costs and save time.',
    tags: ['#RAG', '#Agents', '#ML'],
  },
  {
    icon: '💻',
    title: 'Web Application Development',
    description:
      'High-performance web apps built with Next.js, React, and modern full-stack technologies — designed for speed, scalability, and exceptional UX.',
    tags: ['#Next.js', '#React', '#TypeScript'],
  },
  {
    icon: '📱',
    title: 'Mobile App Development',
    description:
      'Cross-platform mobile apps using React Native and Flutter — beautifully designed, fast, built for iOS and Android from a single codebase.',
    tags: ['#ReactNative', '#Flutter', '#iOS'],
  },
  {
    icon: '☁️',
    title: 'SaaS Platform Development',
    description:
      'From MVP to full-scale multi-tenant SaaS — we architect, build, and scale subscription-based software products that grow with your business.',
    tags: ['#SaaS', '#Cloud', '#Architecture'],
  },
  {
    icon: '👥',
    title: 'Dedicated Dev Teams',
    description:
      'Scale engineering capacity with vetted developers. Dedicated teams, staff augmentation, or full project outsourcing — transparent delivery, flexible contracts.',
    tags: ['#Outsourcing', '#Teams', '#Scale'],
  },
];

export function CoreServicesSection() {
  return (
    <section
      id="core-services"
      aria-labelledby="core-services-heading"
      className="border-t border-corematrix-border bg-corematrix-bg1 py-16 lg:py-24"
    >
      <Container>
        <div className="text-center">
          <p className="section-label text-corematrix-green400">CORE SERVICES</p>
          <h2
            id="core-services-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            Everything You Need to Win with Technology
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-base leading-relaxed text-corematrix-textSecondary">
            From AI products to full-stack platforms — we engineer solutions that perform at scale.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card p-7 transition-all duration-300 hover:-translate-y-1 card-glow reveal"
            >
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-corematrix-green700/20 bg-corematrix-green900/40 text-xl">
                {s.icon}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-corematrix-textPrimary">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-corematrix-textSecondary">
                {s.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-corematrix-green700/20 bg-corematrix-green900/20 px-2 py-0.5 font-mono text-xs text-corematrix-green700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
