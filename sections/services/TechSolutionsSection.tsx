'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

type TabId = 'ai' | 'frontend' | 'backend' | 'cloud' | 'data';

type TechTab = {
  id: TabId;
  label: string;
  icon: string;
  heading: string;
  body: string;
  points: { title: string; detail: string }[];
  stackLabel: string;
  stackItems: string;
  activeBtn: string;
  inactiveBtn: string;
  iconColor: string;
  badgeBg: string;
  dotColor: string;
  glowColor: string;
  cardBg: string;
  cardBorder: string;
};

const TABS: TechTab[] = [
  {
    id: 'ai',
    label: 'AI & ML',
    icon: 'fas fa-brain',
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
    activeBtn: 'bg-purple-500/20 font-semibold text-purple-300 shadow-[inset_0_1px_0_0_rgba(168,85,247,0.2)]',
    inactiveBtn: 'bg-purple-500/[0.04] text-purple-400/70 hover:bg-purple-500/[0.12] hover:text-purple-300',
    iconColor: 'text-purple-400',
    badgeBg: 'bg-purple-500/10 border-purple-500/20',
    dotColor: 'bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]',
    glowColor: 'bg-purple-500',
    cardBg: 'bg-purple-950/20',
    cardBorder: 'border-purple-500/15',
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: 'fas fa-code',
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
    activeBtn: 'bg-cyan-500/20 font-semibold text-cyan-300 shadow-[inset_0_1px_0_0_rgba(6,182,212,0.2)]',
    inactiveBtn: 'bg-cyan-500/[0.04] text-cyan-400/70 hover:bg-cyan-500/[0.12] hover:text-cyan-300',
    iconColor: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/10 border-cyan-500/20',
    dotColor: 'bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.5)]',
    glowColor: 'bg-cyan-500',
    cardBg: 'bg-cyan-950/20',
    cardBorder: 'border-cyan-500/15',
  },
  {
    id: 'backend',
    label: 'Backend',
    icon: 'fas fa-cogs',
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
    activeBtn: 'bg-amber-500/20 font-semibold text-amber-300 shadow-[inset_0_1px_0_0_rgba(245,158,11,0.2)]',
    inactiveBtn: 'bg-amber-500/[0.04] text-amber-400/70 hover:bg-amber-500/[0.12] hover:text-amber-300',
    iconColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/10 border-amber-500/20',
    dotColor: 'bg-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.5)]',
    glowColor: 'bg-amber-500',
    cardBg: 'bg-amber-950/20',
    cardBorder: 'border-amber-500/15',
  },
  {
    id: 'cloud',
    label: 'Cloud & DevOps',
    icon: 'fas fa-cloud',
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
    activeBtn: 'bg-indigo-500/20 font-semibold text-indigo-300 shadow-[inset_0_1px_0_0_rgba(99,102,241,0.2)]',
    inactiveBtn: 'bg-indigo-500/[0.04] text-indigo-400/70 hover:bg-indigo-500/[0.12] hover:text-indigo-300',
    iconColor: 'text-indigo-400',
    badgeBg: 'bg-indigo-500/10 border-indigo-500/20',
    dotColor: 'bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.5)]',
    glowColor: 'bg-indigo-500',
    cardBg: 'bg-indigo-950/20',
    cardBorder: 'border-indigo-500/15',
  },
  {
    id: 'data',
    label: 'Data',
    icon: 'fas fa-chart-line',
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
    activeBtn: 'bg-emerald-500/20 font-semibold text-emerald-300 shadow-[inset_0_1px_0_0_rgba(16,185,129,0.2)]',
    inactiveBtn: 'bg-emerald-500/[0.04] text-emerald-400/70 hover:bg-emerald-500/[0.12] hover:text-emerald-300',
    iconColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 border-emerald-500/20',
    dotColor: 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
    glowColor: 'bg-emerald-500',
    cardBg: 'bg-emerald-950/20',
    cardBorder: 'border-emerald-500/15',
  },
];
const bodyTranslations: Record<string, string> = {
  'Our AI team has shipped LLM-powered products used by thousands of daily active users, RAG pipelines processing millions of documents, and autonomous agents handling complex multi-step workflows entirely without human intervention.':
    'فريق الذكاء الاصطناعي لدينا أطلق منتجات مدعومة بنماذج LLM يستخدمها آلاف المستخدمين اليوميين، خطوط معالجة RAG التي تتعامل مع ملايين الوثائق، وعوامل مستقلة تدير سير عمل متعدد الخطوات بالكامل بدون تدخل بشري.',
  "We build frontends that score 95+ on Google PageSpeed, pass WCAG 2.1 AA accessibility, and look exceptional on every screen. Our default stack is Next.js 14 with App Router, TypeScript, and Tailwind CSS — powering the world's best web products.":
    'نبني واجهات أمامية تحصل على أعلى من 95 في Google PageSpeed، تتوافق مع WCAG 2.1 AA، وتبدو رائعة على كل شاشة. مجموعة الأدوات الافتراضية لدينا هي Next.js 14 مع App Router، TypeScript، و Tailwind CSS — التي تشغل أفضل منتجات الويب في العالم.',
  'Scalable, well-tested backend systems that handle millions of requests. APIs that developers love to use, databases that stay fast under load, and event-driven architectures that decouple cleanly and scale horizontally.':
    'أنظمة خلفية قابلة للتوسع ومختبرة جيدًا تعالج ملايين الطلبات. واجهات برمجة التطبيقات التي يحب المطورون استخدامها، قواعد بيانات تبقى سريعة تحت الضغط، وهندسة معمارية مدفوعة بالأحداث تفصل المكونات وتوسع أفقياً.',
  'Infrastructure that ships reliably, scales automatically, and costs only what you use. We provision cloud environments as code, set up CI/CD pipelines that give developers confidence, and build observability stacks that catch problems before users do.':
    'بنية تحتية تُنشر بثقة، تتوسع تلقائيًا، وتكلف فقط ما تستخدمه. نقوم بتهيئة بيئات السحابة ككود، نُعد خطوط CI/CD التي تمنح المطرفين الثقة، ونبني أنظمة مراقبة تكتشف المشكلات قبل أن يمررها المستخدمون.',
  'Turn scattered data into actionable intelligence. Data pipelines that consolidate your sources, warehouses that make analytics fast, and dashboards that give every stakeholder the metrics they need — without waiting for an engineer to run a query.':
    'تحويل البيانات المتفرقة إلى intelligence قابلة للتنفيذ. خطوط بيانات توحد مصادر البيانات، مستودعات تجعل التحليل سريعًا، ولوحات معلومات توفر لجميع أصحاب المصلحة المقاييس التي يحتاجونها — دون انتظار مهندس لتشغيل استعلام.',
};

export function TechSolutionsSection() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabId>('ai');
  const tab = TABS.find((t) => t.id === activeTab) ?? TABS[0];

  return (
    <section
      id="tech-solutions"
      aria-labelledby="tech-solutions-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t('TECHNOLOGY SOLUTIONS', 'حلول التقنية')}
          title={t('Deep Expertise Across Every Layer of the Stack', 'خبرة عميقة عبر كل طبقة من التقنية')}
          titleId="tech-solutions-heading"
          description={t(
            'From AI and frontend to backend, cloud, and data — we build with the tools that power production systems worldwide.',
            'من الذكاء الاصطناعي والواجهة إلى الخلفية، السحابة والبيانات — نبني باستخدام الأدوات التي تشغل أنظمة الإنتاج حول العالم.'
          )}
        />

        <div className="mb-12 mt-12 flex overflow-hidden rounded-xl border border-corematrix-border bg-corematrix-bg0">
          {TABS.map((tItem) => (
            <button
              key={tItem.id}
              type="button"
              onClick={() => setActiveTab(tItem.id)}
              className={`flex-1 border-r border-corematrix-border px-5 py-3.5 text-center text-sm font-medium transition-all duration-300 last:border-r-0 flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === tItem.id ? tItem.activeBtn : tItem.inactiveBtn
              }`}
            >
              <i className={`${tItem.icon} text-base`} aria-hidden="true" />
              {t(tItem.label, {
                'AI & ML': 'الذكاء الاصطناعي وتعلم الآلة',
                Frontend: 'الواجهة الأمامية',
                Backend: 'الواجهة الخلفية',
                'Cloud & DevOps': 'السحابة و DevOps',
                Data: 'البيانات',
              }[tItem.label])}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-corematrix-textPrimary">
              {t(tab.heading, {
                'AI & Machine Learning': 'الذكاء الاصطناعي وتعلم الآلة',
                'Frontend & Web Development': 'توقير الواجهة الأمامية والويب',
                'Backend Engineering': 'هندسة الواجهة الخلفية',
                'Cloud Infrastructure & DevOps': 'البنية التحتية السحابية و DevOps',
                'Data Engineering & Analytics': 'هندسة البيانات والتحليل',
              }[tab.heading])}
            </h3>
            <p className="mt-4 text-sm font-light leading-relaxed text-corematrix-textMuted">
              {t(tab.body, bodyTranslations[tab.body] ?? tab.body)}
            </p>
            <ul className="mt-6 flex flex-col gap-4">
              {tab.points.map((p) => (
                <li key={p.title} className="flex items-start gap-3">
                  <span className={`mt-1.5 h-2 w-2 flex-shrink-0 rounded-full ${tab.dotColor}`} />
                  <div>
                    <p className="font-display text-sm font-bold text-corematrix-textPrimary">
                      {t(p.title, {
                        'LLM Integration': 'تكامل LLM',
                        'RAG Architecture': 'هندسة RAG',
                        'Agent Frameworks': 'أطر الوكلاء',
                        MLOps: 'MLOps',
                        'Next.js 14 (App Router)': 'Next.js 14 (App Router)',
                        'Animations & Interactions': 'الرسوم المتحركة والتفاعلات',
                        'Design Systems': 'أنظمة التصميم',
                        Testing: 'الاختبار',
                        'API Design': 'تصميم API',
                        Databases: 'قواعد البيانات',
                        'Python Backends': 'الواجهات الخلفية بايثون',
                        'Auth & Security': 'المصادقة والأمان',
                        IaC: 'IaC',
                        Containers: 'الحاويات',
                        'CI/CD': 'CI/CD',
                        Observability: 'المراقبة',
                        'Data Pipelines': 'خطوط بيانات',
                        Warehousing: 'مستودعات البيانات',
                        'BI & Dashboards': 'BI ولوحات البيانات',
                        'Real-time Analytics': 'تحليلات في الوقت الحقيقي',
                      }[p.title] || p.title)}
                    </p>
                    <p className="mt-0.5 text-xs text-corematrix-textMuted">
                      {t(p.detail, {
                        'GPT-4, Claude, Gemini, Mistral, and custom fine-tuned models with fallback logic, cost monitoring, and response caching':
                          'GPT-4، Claude، Gemini، Mistral، ونماذج مخصصة مُدربة بدقة مع منطق احتياطي، مراقبة التكلفة، وتخزين ردود الذاكرة المؤقتة',
                        'Pinecone, Weaviate, pgvector — chunking strategies, embedding models, hybrid search, and re-ranking for production-quality retrieval':
                          'Pinecone، Weaviate، pgvector — استراتيجيات التقسيم، نماذج التضمين، بحث هجين، وإعادة الترتيب لاسترداد عالي الجودة في الإنتاج',
                        'LangChain, LlamaIndex, CrewAI, and custom agent loops with tool calling, memory management, and guardrails':
                          'LangChain، LlamaIndex، CrewAI، وحلقات وكيل مخصصة مع استدعاء الأدوات، إدارة الذاكرة، وحواجز الأمان',
                        'Model versioning, A/B testing, drift detection, and automated retraining pipelines on AWS SageMaker and GCP Vertex AI':
                          'إصدار النماذج، اختبار A/B، اكتشاف الانجراف، وخطوط إعادة تدريب تلقائية على AWS SageMaker و GCP Vertex AI',
                        'Server components, streaming, parallel routes, and full RSC architecture for maximum performance and SEO':
                          'مكونات الخادم، البث، المسارات المتوازية، وهندسة RSC كاملة لأقصى أداء وتحسين محركات البحث',
                        'Framer Motion for production-grade animations, GSAP for complex sequences, and CSS-first micro-interactions':
                          'Framer Motion للرسوم المتحركة عالية الجودة، GSAP للتسلسلات المعقدة، وتفاعلات موكرو CSS أولاً',
                        'Radix UI primitives with custom theming, Storybook documentation, and comprehensive component libraries maintained long-term':
                          'عناصر Radix UI مع تخصيص السمات، توثيق Storybook، ومكتبة مكونات شاملة تُصان على المدى الطويل',
                        'Vitest, Playwright E2E, React Testing Library, and CI-integrated visual regression testing':
                          'Vitest، Playwright E2E، React Testing Library، واختبار الانحدار البصري المتكامل مع CI',
                      }[p.detail] || p.detail)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              {t('Discuss your stack →', 'ناقش تقنيتك →')}
            </Link>
          </div>
          <div className={`relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-2xl border p-9 text-center transition-all duration-300 ${tab.cardBorder} ${tab.cardBg}`}>
            <div
              className={`pointer-events-none absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.12] blur-[60px] ${tab.glowColor}`}
              aria-hidden
            />
            <span className={`relative z-10 mb-4 text-5xl ${tab.iconColor}`} aria-hidden="true">
              <i className={tab.icon} />
            </span>
            <p className="relative z-10 mb-2 font-display text-sm font-bold text-corematrix-textPrimary">
              {t(tab.stackLabel, {
                'AI Stack': 'مجموعة AI',
                'Frontend Stack': 'مجموعة الواجهة',
                'Backend Stack': 'مجموعة الخلفية',
                'Cloud Stack': 'مجموعة السحابة',
                'Data Stack': 'مجموعة البيانات',
              }[tab.stackLabel])}
            </p>
            <p className="relative z-10 max-w-[220px] text-xs font-light leading-relaxed text-corematrix-textMuted">
              {t(tab.stackItems, {
                'OpenAI · Anthropic · LangChain · LlamaIndex · Pinecone · PyTorch · HuggingFace · Mistral':
                  'OpenAI · Anthropic · LangChain · LlamaIndex · Pinecone · PyTorch · HuggingFace · Mistral',
                'Next.js · React 18 · TypeScript · Tailwind CSS · Framer Motion · Radix UI · tRPC':
                  'Next.js · React 18 · TypeScript · Tailwind CSS · Framer Motion · Radix UI · tRPC',
                'Node.js · Python · FastAPI · PostgreSQL · MongoDB · Redis · Prisma · GraphQL':
                  'Node.js · Python · FastAPI · PostgreSQL · MongoDB · Redis · Prisma · GraphQL',
                'AWS · GCP · Docker · Kubernetes · Terraform · GitHub Actions · Vercel · Supabase':
                  'AWS · GCP · Docker · Kubernetes · Terraform · GitHub Actions · Vercel · Supabase',
                'PostgreSQL · BigQuery · Snowflake · dbt · Airflow · Kafka · ClickHouse · Redshift':
                  'PostgreSQL · BigQuery · Snowflake · dbt · Airflow · Kafka · ClickHouse · Redshift',
              }[tab.stackItems] || tab.stackItems)}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
