'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

type TabId = 'ai' | 'frontend' | 'backend' | 'cloud' | 'data';

type TechTab = {
  id: TabId;
  label: string;
  emoji: string;
  heading: string;
  body: string;
  points: { title: string; detail: string }[];
  stackLabel: string;
  stackItems: string;
};

const TABS: TechTab[] = [
  {
    id: 'ai',
    label: '🧠 AI & ML',
    emoji: '🧠',
    heading: 'AI & Machine Learning',
    body: 'Our AI team has shipped LLM-powered products used by thousands of daily active users, RAG pipelines processing millions of documents, and autonomous agents handling complex multi-step workflows entirely without human intervention.',
    points: [
      { title: 'LLM Integration', detail: 'GPT-4, Claude, Gemini, Mistral, and custom fine-tuned models with fallback logic, cost monitoring, and response caching' },
      { title: 'RAG Architecture', detail: 'Pinecone, Weaviate, pgvector — chunking strategies, embedding models, hybrid search, and re-ranking for production-quality retrieval' },
      { title: 'Agent Frameworks', detail: 'LangChain, LlamaIndex, CrewAI, and custom agent loops with tool calling, memory management, and guardrails' },
      { title: 'MLOps', detail: 'Model versioning, A/B testing, drift detection, and automated retraining pipelines on AWS SageMaker and GCP Vertex AI' },
    ],
    stackLabel: 'AI Stack',
    stackItems: 'OpenAI · Anthropic · LangChain · LlamaIndex · Pinecone · PyTorch · HuggingFace · Mistral',
  },
  {
    id: 'frontend',
    label: '💻 Frontend',
    emoji: '💻',
    heading: 'Frontend & Web Development',
    body: "We build frontends that score 95+ on Google PageSpeed, pass WCAG 2.1 AA accessibility, and look exceptional on every screen. Our default stack is Next.js 14 with App Router, TypeScript, and Tailwind CSS — powering the world's best web products.",
    points: [
      { title: 'Next.js 14 (App Router)', detail: 'Server components, streaming, parallel routes, and full RSC architecture for maximum performance and SEO' },
      { title: 'Animations & Interactions', detail: 'Framer Motion for production-grade animations, GSAP for complex sequences, and CSS-first micro-interactions' },
      { title: 'Design Systems', detail: 'Radix UI primitives with custom theming, Storybook documentation, and comprehensive component libraries maintained long-term' },
      { title: 'Testing', detail: 'Vitest, Playwright E2E, React Testing Library, and CI-integrated visual regression testing' },
    ],
    stackLabel: 'Frontend Stack',
    stackItems: 'Next.js · React 18 · TypeScript · Tailwind CSS · Framer Motion · Radix UI · tRPC',
  },
  {
    id: 'backend',
    label: '⚙️ Backend',
    emoji: '⚙️',
    heading: 'Backend Engineering',
    body: 'Scalable, well-tested backend systems that handle millions of requests. APIs that developers love to use, databases that stay fast under load, and event-driven architectures that decouple cleanly and scale horizontally.',
    points: [
      { title: 'API Design', detail: 'RESTful APIs, GraphQL with DataLoader, tRPC for type-safe full-stack, and real-time with WebSockets or Server-Sent Events' },
      { title: 'Databases', detail: 'PostgreSQL with Prisma ORM, MongoDB for documents, Redis for caching/queuing, and TimescaleDB for time-series data' },
      { title: 'Python Backends', detail: 'FastAPI for high-performance APIs, Celery for distributed task queues, and SQLAlchemy with Alembic for migrations' },
      { title: 'Auth & Security', detail: 'NextAuth.js, JWT with refresh rotation, OAuth2, RBAC middleware, rate limiting, and OWASP security hardening' },
    ],
    stackLabel: 'Backend Stack',
    stackItems: 'Node.js · Python · FastAPI · PostgreSQL · MongoDB · Redis · Prisma · GraphQL',
  },
  {
    id: 'cloud',
    label: '☁️ Cloud & DevOps',
    emoji: '☁️',
    heading: 'Cloud Infrastructure & DevOps',
    body: 'Infrastructure that ships reliably, scales automatically, and costs only what you use. We provision cloud environments as code, set up CI/CD pipelines that give developers confidence, and build observability stacks that catch problems before users do.',
    points: [
      { title: 'IaC', detail: 'Terraform and Pulumi for reproducible, version-controlled infrastructure on AWS and GCP' },
      { title: 'Containers', detail: 'Docker for packaging, Kubernetes (EKS/GKE) for orchestration, Helm charts for deployment management' },
      { title: 'CI/CD', detail: 'GitHub Actions, GitLab CI pipelines with automated testing, security scanning, and blue-green deployments' },
      { title: 'Observability', detail: 'Datadog, Grafana, Prometheus, OpenTelemetry distributed tracing, and PagerDuty alerting' },
    ],
    stackLabel: 'Cloud Stack',
    stackItems: 'AWS · GCP · Docker · Kubernetes · Terraform · GitHub Actions · Vercel · Supabase',
  },
  {
    id: 'data',
    label: '📊 Data',
    emoji: '📊',
    heading: 'Data Engineering & Analytics',
    body: 'Turn scattered data into actionable intelligence. Data pipelines that consolidate your sources, warehouses that make analytics fast, and dashboards that give every stakeholder the metrics they need — without waiting for an engineer to run a query.',
    points: [
      { title: 'Data Pipelines', detail: 'Apache Airflow, dbt, and custom ETL/ELT pipelines that ingest, transform, and load reliably at scale' },
      { title: 'Warehousing', detail: 'Snowflake, BigQuery, and Redshift with dimensional modelling, query optimization, and access control' },
      { title: 'BI & Dashboards', detail: 'Custom analytics dashboards with Recharts/D3.js, Metabase, or Grafana — embedded directly in your product' },
      { title: 'Real-time Analytics', detail: 'Kafka for event streaming, ClickHouse for OLAP queries, and Redis for sub-millisecond counters' },
    ],
    stackLabel: 'Data Stack',
    stackItems: 'PostgreSQL · BigQuery · Snowflake · dbt · Airflow · Kafka · ClickHouse · Redshift',
  },
];

export function TechSolutionsSection() {
  const [activeTab, setActiveTab] = useState<TabId>('ai');
  const tab = TABS.find((t) => t.id === activeTab) ?? TABS[0];

  return (
    <section
      id="tech-solutions"
      aria-labelledby="tech-solutions-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <div className="text-center">
          <p className="section-label text-corematrix-green400">TECHNOLOGY SOLUTIONS</p>
          <h2
            id="tech-solutions-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            Deep Expertise Across Every Layer of the Stack
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-base leading-relaxed text-corematrix-textSecondary">
            From AI and frontend to backend, cloud, and data — we build with the tools that power
            production systems worldwide.
          </p>
        </div>

        <div className="mb-12 mt-12 flex overflow-hidden rounded-xl border border-corematrix-border bg-corematrix-bg0">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 border-r border-corematrix-border px-5 py-3.5 text-center text-sm font-medium transition-all last:border-r-0 ${
                activeTab === t.id
                  ? 'bg-corematrix-green900/20 font-semibold text-corematrix-green400'
                  : 'cursor-pointer text-corematrix-textMuted hover:bg-corematrix-green900/[0.04] hover:text-corematrix-textPrimary'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-corematrix-textPrimary">
              {tab.heading}
            </h3>
            <p className="mt-4 text-sm font-light leading-relaxed text-corematrix-textMuted">
              {tab.body}
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              {tab.points.map((p) => (
                <li key={p.title} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-corematrix-green400" />
                  <div>
                    <p className="font-display text-sm font-bold text-corematrix-textPrimary">
                      {p.title}
                    </p>
                    <p className="mt-0.5 text-xs text-corematrix-textMuted">{p.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              Discuss your stack →
            </Link>
          </div>
          <div className="relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card p-9 text-center">
            <div
              className="pointer-events-none absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-corematrix-green700 opacity-[0.12] blur-[60px]"
              aria-hidden
            />
            <span className="relative z-10 mb-4 text-6xl" aria-hidden>
              {tab.emoji}
            </span>
            <p className="relative z-10 mb-2 font-display text-sm font-bold text-corematrix-textPrimary">
              {tab.stackLabel}
            </p>
            <p className="relative z-10 max-w-[220px] text-xs font-light leading-relaxed text-corematrix-textMuted">
              {tab.stackItems}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
