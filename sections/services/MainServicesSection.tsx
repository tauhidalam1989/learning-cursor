'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { useFilterListener } from '@/hooks/usePortalFilter';
import type { FilterId } from './ServiceFilterNav';

export type ServiceCard = {
  icon: string;
  title: string;
  description: string;
  tags: string[];
  linkLabel: string;
  category: 'ai' | 'web' | 'saas' | 'teams';
};

export type FeaturedService = {
  badge: string;
  title: string;
  description: string;
  features: string[];
};

export type ServiceCategory = {
  id: string;
  label: string;
  anchorId: string;
  filterKey: 'ai' | 'web' | 'saas' | 'teams';
  featured?: FeaturedService;
  cards: ServiceCard[];
};

const AI_FEATURED: FeaturedService = {
  badge: '⭐ Most In-Demand Service',
  title: 'AI Product Development & Custom Intelligent Systems',
  description:
    'We build production-ready AI products from the ground up — LLM-powered applications, autonomous AI agents, computer vision systems, and custom ML models that integrate seamlessly into your existing technology stack and drive measurable ROI.',
  features: [
    'End-to-end AI product development (strategy → architecture → deployment)',
    'LLM integration: GPT-4, Claude, Gemini, Llama, and custom fine-tuned models',
    'RAG pipeline design and implementation with Pinecone, pgvector, Weaviate',
    'Multi-agent AI systems with tool use, memory, and autonomous decision-making',
    'Computer vision, NLP, and predictive analytics systems',
    'AI safety, evaluation frameworks, and production monitoring',
  ],
};

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'ai',
    label: 'AI & Intelligent Systems',
    anchorId: 'ai-dev',
    filterKey: 'ai',
    featured: AI_FEATURED,
    cards: [
      {
        icon: '⚙️',
        title: 'AI Automation & Workflow Intelligence',
        description:
          'Replace manual processes with intelligent AI pipelines that learn and adapt. We reduce operational costs by an average of 60% while eliminating human error at scale — from document processing to multi-step approval workflows.',
        tags: ['#RAG', '#Pipelines', '#n8n', '#LangChain'],
        linkLabel: 'Get a consultation',
        category: 'ai',
      },
      {
        icon: '🔬',
        title: 'Machine Learning & Predictive Analytics',
        description:
          'Turn your existing data into a strategic asset. Custom ML models for demand forecasting, churn prediction, anomaly detection, recommendation engines, and intelligent pricing — giving your business a genuine data-driven competitive edge.',
        tags: ['#PyTorch', '#TensorFlow', '#MLOps', '#Forecasting'],
        linkLabel: 'Explore ML services',
        category: 'ai',
      },
      {
        icon: '🤖',
        title: 'Conversational AI & Intelligent Chatbots',
        description:
          'AI assistants that understand your business deeply. From customer support bots that resolve 80% of tickets automatically, to internal knowledge assistants that search your entire document library using natural language.',
        tags: ['#LLM', '#LangChain', '#RAG', '#Embeddings'],
        linkLabel: 'Build your chatbot',
        category: 'ai',
      },
    ],
  },
  {
    id: 'web',
    label: 'Web & Mobile Development',
    anchorId: 'web-dev',
    filterKey: 'web',
    cards: [
      {
        icon: '💻',
        title: 'Custom Web Application Development',
        description:
          'High-performance web applications built with Next.js 14, React 18, TypeScript, and Tailwind CSS. Pixel-perfect UIs with exceptional Core Web Vitals scores, full accessibility compliance, and SEO-ready architecture.',
        tags: ['#Next.js', '#React', '#TypeScript', '#Node.js'],
        linkLabel: 'Start your web project',
        category: 'web',
      },
      {
        icon: '📱',
        title: 'Cross-Platform Mobile App Development',
        description:
          'Ship to iOS and Android simultaneously without compromising on quality. React Native and Flutter apps that feel completely native — beautiful animations, 60fps scrolling, offline support, and deep OS integrations.',
        tags: ['#ReactNative', '#Flutter', '#iOS', '#Android'],
        linkLabel: 'Build your mobile app',
        category: 'web',
      },
      {
        icon: '🎨',
        title: 'UI/UX Design & Product Design',
        description:
          'Beautiful, functional product design grounded in user research. End-to-end design delivery — wireframes, information architecture, high-fidelity Figma prototypes, design systems, and component libraries ready for production handoff.',
        tags: ['#Figma', '#DesignSystem', '#UXResearch', '#Accessibility'],
        linkLabel: 'See our design work',
        category: 'web',
      },
      {
        icon: '🔗',
        title: 'API Development & System Integrations',
        description:
          'Connect your entire technology ecosystem with robust, well-documented APIs. RESTful and GraphQL APIs, third-party integrations (Stripe, Salesforce, HubSpot, and 100+ more), and event-driven microservices that scale reliably.',
        tags: ['#REST', '#GraphQL', '#tRPC', '#Webhooks'],
        linkLabel: 'Discuss your integration',
        category: 'web',
      },
      {
        icon: '🛒',
        title: 'eCommerce & Marketplace Development',
        description:
          'Custom eCommerce platforms that outperform off-the-shelf solutions. Headless commerce with Next.js and Stripe, custom inventory systems, multi-vendor marketplaces, and AI-powered recommendation engines that increase average order value.',
        tags: ['#Shopify', '#Stripe', '#Headless', '#Marketplace'],
        linkLabel: 'Launch your store',
        category: 'web',
      },
      {
        icon: '⚡',
        title: 'Performance Engineering & Cloud Migration',
        description:
          'Legacy systems and slow applications cost you users and revenue. We audit, refactor, and migrate your infrastructure to modern cloud-native architectures — dramatically improving performance, reducing costs, and adding the scalability your business demands.',
        tags: ['#AWS', '#GCP', '#Docker', '#K8s'],
        linkLabel: 'Modernize your stack',
        category: 'web',
      },
    ],
  },
  {
    id: 'saas',
    label: 'SaaS & Enterprise Platform Development',
    anchorId: 'saas',
    filterKey: 'saas',
    cards: [
      {
        icon: '☁️',
        title: 'SaaS Platform Architecture & Development',
        description:
          'From validated idea to fundable SaaS product — we architect and build multi-tenant platforms that scale. Subscription billing with Stripe, RBAC, usage metering, analytics dashboards, and white-labelling capabilities ready from day one.',
        tags: ['#MultiTenant', '#Stripe', '#RBAC', '#Supabase'],
        linkLabel: 'Build your SaaS',
        category: 'saas',
      },
      {
        icon: '🏢',
        title: 'Enterprise Software Development',
        description:
          'Complex, mission-critical enterprise systems built for the long haul. Custom ERP modules, workflow management, internal tools, and data platforms that integrate with your existing SAP, Salesforce, or Microsoft ecosystem.',
        tags: ['#Enterprise', '#ERP', '#CRM', '#SSO'],
        linkLabel: 'Talk enterprise',
        category: 'saas',
      },
      {
        icon: '🛡️',
        title: 'DevOps, Security & Infrastructure Engineering',
        description:
          'Ship faster and sleep better. Robust CI/CD pipelines, infrastructure-as-code with Terraform, container orchestration with Kubernetes, automated security scanning, and monitoring stacks — so your team focuses on features, not fires.',
        tags: ['#DevOps', '#Terraform', '#CI/CD', '#Security'],
        linkLabel: 'Secure your infrastructure',
        category: 'saas',
      },
    ],
  },
  {
    id: 'teams',
    label: 'Dedicated Teams & Outsourcing',
    anchorId: 'teams',
    filterKey: 'teams',
    cards: [
      {
        icon: '👥',
        title: 'Dedicated Development Team Model',
        description:
          'Extend your engineering capacity with a pre-vetted team that integrates completely into your workflow. Your dedicated team attends your standups, uses your tools, and ships on your roadmap — with the ownership mentality of an in-house hire.',
        tags: ['#DedicatedTeam', '#Embedded', '#Agile'],
        linkLabel: 'Build your team',
        category: 'teams',
      },
      {
        icon: '🔍',
        title: 'Staff Augmentation & Specialist Contractors',
        description:
          'Need a senior Next.js engineer, an AI/ML specialist, or a DevOps expert for a specific project phase? Pre-vetted specialists placed into your team on flexible contracts — fast onboarding, no recruitment overhead, zero compromise on quality.',
        tags: ['#Staffing', '#Augmentation', '#Specialists'],
        linkLabel: 'Find your specialist',
        category: 'teams',
      },
      {
        icon: '🌐',
        title: 'Offshore Development Centre (ODC)',
        description:
          'Build a full offshore engineering hub under the Corematrix umbrella — with the speed and cost-efficiency of offshore development, but with the transparency and quality standards of a Tier-1 technology partner. Ideal for scaling 10–50+ engineers.',
        tags: ['#ODC', '#Offshore', '#Scale', '#CostEffective'],
        linkLabel: 'Explore ODC model',
        category: 'teams',
      },
    ],
  },
];

export function MainServicesSection() {
  const filter = useFilterListener('serviceFilter') as FilterId;

  return (
    <section
      id="services"
      aria-labelledby="main-services-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 pt-20 pb-24"
    >
      <Container>
        {SERVICE_CATEGORIES.map((category) => {
          const show = filter === 'all' || filter === category.filterKey;
          if (!show) return null;

          return (
            <div key={category.id} data-category={category.filterKey} className="mb-16 last:mb-0">
              <div id={category.anchorId} className="scroll-mt-24" />
              <div className="mb-6 flex items-center gap-4">
                <span className="font-display text-[0.68rem] font-bold uppercase tracking-[0.15em] text-corematrix-green400">
                  {category.label}
                </span>
                <div className="h-px flex-1 bg-corematrix-border" />
              </div>

              {category.featured && (
                <div className="reveal relative mb-8 overflow-hidden rounded-3xl border border-corematrix-border2 bg-corematrix-card2 lg:grid lg:grid-cols-2">
                  <div className="absolute left-0 right-0 top-0 z-10 h-[3px] bg-gradient-to-r from-transparent via-corematrix-green500 to-transparent" />
                  <div className="relative p-8 lg:p-10">
                    <span className="inline-block rounded-full border border-corematrix-green700/30 bg-corematrix-green900/20 px-3 py-1 text-xs font-semibold text-corematrix-green400">
                      {category.featured.badge}
                    </span>
                    <h2 className="mt-4 font-display text-2xl font-bold text-corematrix-textPrimary">
                      {category.featured.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-corematrix-textSecondary">
                      {category.featured.description}
                    </p>
                    <ul className="mt-6 space-y-3">
                      {category.featured.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-corematrix-green400" />
                          <span className="text-sm text-corematrix-textSecondary">{f}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
                      >
                        Get a consultation →
                      </Link>
                      <Link
                        href="#case-studies"
                        className="inline-flex items-center justify-center rounded-lg border border-corematrix-border2 px-5 py-2.5 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green700"
                      >
                        See case studies
                      </Link>
                    </div>
                  </div>
                  <div className="flex min-h-[280px] min-w-0 items-center justify-center overflow-hidden border-t border-corematrix-border bg-corematrix-bg2 p-6 sm:p-10 lg:min-h-[360px] lg:border-l lg:border-t-0">
                    <Image
                      src="/images/services-featured-ai.png"
                      alt="Illustration of a smartphone with an AI robot, people working on laptops, and icons connected by data paths"
                      width={1024}
                      height={682}
                      className="h-auto w-full max-w-xl rounded-lg border border-corematrix-border bg-black object-contain"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {category.cards.map((card) => (
                  <article
                    key={card.title}
                    className="group relative flex flex-col gap-0 overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card p-7 transition-all duration-300 card-glow hover:-translate-y-1 reveal"
                  >
                    <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="mb-5 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-corematrix-green700/20 bg-corematrix-green900/40 text-xl">
                      {card.icon}
                    </div>
                    <h3 className="font-display text-base font-bold text-corematrix-textPrimary">
                      {card.title}
                    </h3>
                    <p className="mt-2 flex-1 font-light leading-relaxed text-corematrix-textMuted">
                      {card.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-corematrix-green700/20 bg-corematrix-green900/20 px-2 py-1 font-mono text-xs text-corematrix-green700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      href="/contact"
                      className="mt-4 flex items-center gap-2 text-sm font-semibold text-corematrix-green400 transition-all hover:gap-3"
                    >
                      {card.linkLabel} →
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </Container>
    </section>
  );
}
