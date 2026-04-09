import { siteConfig } from '@/config/site';
import type { ServiceLandingConfig } from '@/lib/seo-service-types';
import { SERVICE_STUBS } from '@/lib/seo-service-stubs';

const CORE: Record<string, ServiceLandingConfig> = {
  'ai-product-development': {
    slug: 'ai-product-development',
    title: 'AI Product Development Services — Corematrix',
    description:
      'End-to-end AI product engineering: LLM apps, agents, RAG, computer vision, and production ML — from strategy through deployment and monitoring.',
    canonicalPath: '/services/ai-product-development',
    ogTitle: 'AI Product Development | Corematrix',
    h1: 'AI Product Development & Intelligent Systems',
    badge: 'AI engineering',
    intro:
      'We design and ship production AI systems that survive real traffic: retrieval pipelines, evaluation, safety guardrails, and observability — not demos that fall over in week two.',
    stackTags: ['#LLM', '#RAG', '#LangChain', '#Python', '#Next.js', '#MLOps'],
    serviceType: 'AI Software Development',
    serviceSchemaDescription:
      'Custom AI product development including large language model integration, autonomous agents, RAG systems, and machine learning deployment.',
    breadcrumbLabel: 'AI product development',
    sections: [
      {
        heading: 'What we deliver',
        body:
          'LLM-powered products, multi-agent workflows, document and contract intelligence, support automation, forecasting models, and computer vision — integrated with your identity, data, and release process.',
      },
      {
        heading: 'How we work with your team',
        body:
          'We start with discovery and a thin vertical slice to production, then expand. You get weekly demos, clear acceptance criteria, and documentation your engineers can own — including runbooks and evaluation metrics.',
      },
      {
        heading: 'Outcomes you can measure',
        body:
          'Faster processing, higher automation rates, lower cost per ticket or document, and models monitored for drift and abuse — tied to the KPIs your leadership actually tracks.',
      },
    ],
    related: [
      { label: 'Web application development', path: '/services/custom-web-application-development' },
      { label: 'SaaS platform development', path: '/services/saas-platform-development' },
      { label: 'All services', path: '/services' },
    ],
    caseStudies: [
      { label: 'AI contract intelligence platform', path: '/portfolio/ai-contract-intelligence-platform' },
      { label: 'AI customer support agent', path: '/portfolio/ai-customer-support-agent' },
    ],
  },

  'custom-web-application-development': {
    slug: 'custom-web-application-development',
    title: 'Custom Web Application Development — Corematrix',
    description:
      'High-performance web apps with Next.js, React, and TypeScript — Core Web Vitals, accessibility, SEO-ready architecture, and APIs that scale.',
    canonicalPath: '/services/custom-web-application-development',
    h1: 'Custom Web Application Development',
    badge: 'Web engineering',
    intro:
      'From marketing sites to complex dashboards, we build web software that loads fast, ranks well, and stays maintainable as your product grows.',
    stackTags: ['#Next.js', '#React', '#TypeScript', '#Node.js', '#Tailwind'],
    serviceType: 'Web Application Development',
    serviceSchemaDescription:
      'Custom web application development using modern JavaScript frameworks, performance optimization, and cloud deployment.',
    breadcrumbLabel: 'Web applications',
    sections: [
      {
        heading: 'Product-grade frontends',
        body:
          'Server and client components where each fits, design systems, responsive layouts, and accessible patterns — so your UI stays consistent as features multiply.',
      },
      {
        heading: 'APIs and integrations',
        body:
          'REST, GraphQL, or tRPC backends, webhooks, and third-party integrations (payments, CRM, auth) with clear contracts and error handling.',
      },
      {
        heading: 'Launch and scale',
        body:
          'CI/CD, staging environments, logging, and performance budgets — so releases are boring in the best way.',
      },
    ],
    related: [
      { label: 'AI product development', path: '/services/ai-product-development' },
      { label: 'SaaS platform development', path: '/services/saas-platform-development' },
      { label: 'All services', path: '/services' },
    ],
    caseStudies: [
      { label: 'HIPAA telehealth platform', path: '/portfolio/hipaa-telehealth-platform' },
      { label: 'Adaptive learning platform', path: '/portfolio/adaptive-learning-platform' },
    ],
  },

  'saas-platform-development': {
    slug: 'saas-platform-development',
    title: 'SaaS Platform Development — Corematrix',
    description:
      'Multi-tenant SaaS architecture, Stripe billing, RBAC, usage metering, and admin tooling — from MVP to enterprise-ready platforms.',
    canonicalPath: '/services/saas-platform-development',
    h1: 'SaaS Platform Development',
    badge: 'SaaS & platforms',
    intro:
      'We build subscription products with the primitives investors and enterprise buyers expect: tenancy isolation, billing, roles, analytics, and operational dashboards.',
    stackTags: ['#MultiTenant', '#Stripe', '#PostgreSQL', '#RBAC', '#Next.js'],
    serviceType: 'SaaS Development',
    serviceSchemaDescription:
      'Multi-tenant SaaS platform engineering including billing, access control, and cloud infrastructure.',
    breadcrumbLabel: 'SaaS platforms',
    sections: [
      {
        heading: 'Tenant-ready foundations',
        body:
          'Data isolation strategies, org and user models, invitation flows, and audit trails — designed before feature velocity paints you into a corner.',
      },
      {
        heading: 'Monetization and growth',
        body:
          'Plans, trials, usage-based billing, invoices, and dunning hooks — wired to your product events so finance and product stay aligned.',
      },
      {
        heading: 'Enterprise expectations',
        body:
          'SSO readiness, export and reporting, security review artifacts, and runbooks — so procurement stops being a surprise project.',
      },
    ],
    related: [
      { label: 'Web application development', path: '/services/custom-web-application-development' },
      { label: 'Dedicated development teams', path: '/services/dedicated-development-teams' },
      { label: 'All services', path: '/services' },
    ],
    caseStudies: [
      { label: 'SaaS analytics platform', path: '/portfolio/saas-analytics-platform' },
      { label: 'AI route optimisation SaaS', path: '/portfolio/ai-route-optimisation-saas' },
    ],
  },

  'mobile-app-development': {
    slug: 'mobile-app-development',
    title: 'Mobile App Development — Corematrix',
    description:
      'Cross-platform mobile apps with React Native — native-feel UX, secure auth, offline-aware flows, and store-ready release discipline.',
    canonicalPath: '/services/mobile-app-development',
    h1: 'Mobile App Development',
    badge: 'Mobile',
    intro:
      'We ship iOS and Android from a shared codebase when it makes sense — with performance profiling, push, deep links, and app store submission handled end to end.',
    stackTags: ['#ReactNative', '#iOS', '#Android', '#TypeScript'],
    serviceType: 'Mobile Application Development',
    serviceSchemaDescription:
      'Cross-platform mobile application development for iOS and Android using React Native and native integrations.',
    breadcrumbLabel: 'Mobile apps',
    sections: [
      {
        heading: 'Experience and performance',
        body:
          'Navigation patterns, gestures, lists, and media that feel native — with attention to startup time, memory, and battery on real devices.',
      },
      {
        heading: 'Security and compliance',
        body:
          'Secure storage, biometrics, certificate pinning where needed, and integration with your backend auth model.',
      },
      {
        heading: 'Shipping to stores',
        body:
          'Build pipelines, beta distribution, store listings, and iteration after launch based on crash and analytics data.',
      },
    ],
    related: [
      { label: 'Web application development', path: '/services/custom-web-application-development' },
      { label: 'AI product development', path: '/services/ai-product-development' },
      { label: 'All services', path: '/services' },
    ],
    caseStudies: [
      { label: 'AI personal finance app', path: '/portfolio/ai-personal-finance-app' },
    ],
  },

  'dedicated-development-teams': {
    slug: 'dedicated-development-teams',
    title: 'Dedicated Development Teams — Corematrix',
    description:
      'Embedded engineers and squads that work in your tools and cadence — staff augmentation and long-term product teams without recruiting overhead.',
    canonicalPath: '/services/dedicated-development-teams',
    h1: 'Dedicated Development Teams',
    badge: 'Teams & outsourcing',
    intro:
      'Extend your capacity with senior engineers who behave like part of your org: your standups, your repo, your roadmap — with clear ownership and communication.',
    stackTags: ['#DedicatedTeam', '#StaffAugmentation', '#Agile', '#Remote'],
    serviceType: 'Software Development Staffing',
    serviceSchemaDescription:
      'Dedicated software development teams and staff augmentation for AI, web, mobile, and cloud projects.',
    breadcrumbLabel: 'Dedicated teams',
    sections: [
      {
        heading: 'Models that match how you work',
        body:
          'Full squads with tech lead, individual senior contributors, or hybrid pods — aligned to your release train and code review culture.',
      },
      {
        heading: 'Onboarding that sticks',
        body:
          'Short ramp plans, pairing, and documentation so productivity shows up in the first sprint — not the fourth.',
      },
      {
        heading: 'Governance without bureaucracy',
        body:
          'Clear SLAs, security expectations, and IP assignment — so legal and engineering both sleep at night.',
      },
    ],
    related: [
      { label: 'SaaS platform development', path: '/services/saas-platform-development' },
      { label: 'AI product development', path: '/services/ai-product-development' },
      { label: 'All services', path: '/services' },
    ],
    caseStudies: [{ label: 'Browse portfolio', path: '/portfolio' }],
  },

  'ai-automation-workflow-intelligence': {
    slug: 'ai-automation-workflow-intelligence',
    title: 'AI Automation & Workflow Intelligence — Corematrix',
    description:
      'Intelligent document processing, approval workflows, and RAG-powered operations that cut manual work by double digits — with audit trails and human-in-the-loop where it matters.',
    canonicalPath: '/services/ai-automation-workflow-intelligence',
    h1: 'AI Automation & Workflow Intelligence',
    badge: 'AI operations',
    intro:
      'We replace brittle scripts with pipelines that understand context: extract, classify, route, and escalate — wired to your CRM, ERP, and ticketing tools so teams stop copy-pasting between systems.',
    stackTags: ['#RAG', '#LangChain', '#n8n', '#Python', '#APIs'],
    serviceType: 'AI Automation Services',
    serviceSchemaDescription:
      'AI-powered workflow automation, intelligent document processing, and business process orchestration.',
    breadcrumbLabel: 'AI automation & workflows',
    sections: [
      {
        heading: 'Where automation pays off first',
        body:
          'High-volume intake: contracts, invoices, support queues, and onboarding packets. We map states, exceptions, and SLAs, then automate the boring 80% while surfacing edge cases for reviewers.',
      },
      {
        heading: 'Architecture you can operate',
        body:
          'Observable queues, idempotent workers, versioned prompts, and evaluation sets — so when regulations or formats change, you adjust without a rewrite.',
      },
      {
        heading: 'Proof in metrics',
        body:
          'Cycle time, cost per case, error rate, and reviewer hours — baselined before launch and tracked in dashboards your ops lead actually uses.',
      },
    ],
    related: [
      { label: 'AI product development', path: '/services/ai-product-development' },
      { label: 'Conversational AI & chatbots', path: '/services/conversational-ai-chatbots' },
      { label: 'API & integrations', path: '/services/api-development-system-integrations' },
    ],
    caseStudies: [
      { label: 'AI contract intelligence platform', path: '/portfolio/ai-contract-intelligence-platform' },
      { label: 'Enterprise internal ops platform', path: '/portfolio/enterprise-internal-ops-platform' },
    ],
  },

  'machine-learning-predictive-analytics': {
    slug: 'machine-learning-predictive-analytics',
    title: 'Machine Learning & Predictive Analytics — Corematrix',
    description:
      'Custom ML for forecasting, churn, anomalies, recommendations, and pricing — from notebooks to production APIs with monitoring and retraining discipline.',
    canonicalPath: '/services/machine-learning-predictive-analytics',
    h1: 'Machine Learning & Predictive Analytics',
    badge: 'ML & data',
    intro:
      'We turn historical data into models that ship: feature pipelines, offline evaluation, deployment, and drift checks — not slide-deck accuracy that dies in prod.',
    stackTags: ['#PyTorch', '#TensorFlow', '#MLOps', '#Python', '#PostgreSQL'],
    serviceType: 'Machine Learning Consulting',
    serviceSchemaDescription:
      'Custom machine learning model development, predictive analytics, and MLOps for business applications.',
    breadcrumbLabel: 'ML & predictive analytics',
    sections: [
      {
        heading: 'Problems we model well',
        body:
          'Demand and revenue forecasting, churn and LTV, anomaly and fraud signals, recommendation and ranking, and dynamic pricing — scoped to data you already have or can collect cleanly.',
      },
      {
        heading: 'Production, not prototypes',
        body:
          'Batch and online inference, feature stores where warranted, model registry, and retraining triggers — with documentation your data team can extend.',
      },
      {
        heading: 'Governance and trust',
        body:
          'Bias and stability reviews for high-stakes use cases, explainability where required, and clear handoff between data science and engineering.',
      },
    ],
    related: [
      { label: 'AI product development', path: '/services/ai-product-development' },
      { label: 'SaaS platform development', path: '/services/saas-platform-development' },
    ],
    caseStudies: [
      { label: 'PropTech AI valuation engine', path: '/portfolio/proptech-ai-valuation-engine' },
      { label: 'SaaS analytics platform', path: '/portfolio/saas-analytics-platform' },
    ],
  },

  'conversational-ai-chatbots': {
    slug: 'conversational-ai-chatbots',
    title: 'Conversational AI & Intelligent Chatbots — Corematrix',
    description:
      'LLM assistants for support and internal knowledge — RAG, tool use, guardrails, and escalation paths that resolve most tickets without sacrificing trust.',
    canonicalPath: '/services/conversational-ai-chatbots',
    h1: 'Conversational AI & Intelligent Chatbots',
    badge: 'LLM assistants',
    intro:
      'We build bots that read your policies and tickets, call your APIs when allowed, and hand off cleanly when they should — with logging and evaluation so quality improves every sprint.',
    stackTags: ['#LLM', '#RAG', '#LangChain', '#Embeddings', '#FastAPI'],
    serviceType: 'Conversational AI Development',
    serviceSchemaDescription:
      'Intelligent chatbots and conversational AI using large language models and retrieval-augmented generation.',
    breadcrumbLabel: 'Conversational AI & chatbots',
    sections: [
      {
        heading: 'Support and internal Q&A',
        body:
          'Customer-facing resolution flows, order and account lookup, and internal assistants over wikis, PDFs, and tickets — with source citations and permission-aware retrieval.',
      },
      {
        heading: 'Safety and control',
        body:
          'Prompt boundaries, PII handling, content policies, human handoff rules, and regression tests on real conversation samples.',
      },
      {
        heading: 'Integration footprint',
        body:
          'Zendesk, Intercom, Slack, Teams, or your own widget — authenticated users, webhooks, and analytics on deflection and CSAT.',
      },
    ],
    related: [
      { label: 'AI product development', path: '/services/ai-product-development' },
      { label: 'AI automation & workflows', path: '/services/ai-automation-workflow-intelligence' },
    ],
    caseStudies: [{ label: 'AI customer support agent', path: '/portfolio/ai-customer-support-agent' }],
  },

  'ui-ux-product-design': {
    slug: 'ui-ux-product-design',
    title: 'UI/UX & Product Design — Corematrix',
    description:
      'Research-backed UX, Figma systems, and dev-ready handoff — accessible, consistent interfaces for web and mobile products.',
    canonicalPath: '/services/ui-ux-product-design',
    h1: 'UI/UX Design & Product Design',
    badge: 'Design',
    intro:
      'We design flows people finish: IA, wireframes, high-fidelity UI, and component libraries aligned to your engineering stack so implementation stays fast and on-brand.',
    stackTags: ['#Figma', '#DesignSystem', '#UXResearch', '#Accessibility', '#WCAG'],
    serviceType: 'UX Design Service',
    serviceSchemaDescription:
      'User experience design, interface design, design systems, and accessibility for digital products.',
    breadcrumbLabel: 'UI/UX & product design',
    sections: [
      {
        heading: 'Discovery and validation',
        body:
          'Interviews, journey maps, and usability tests on prototypes — so we solve the right problem before pixels multiply.',
      },
      {
        heading: 'Systems, not one-offs',
        body:
          'Tokens, components, and documentation that match React / Next.js patterns your team already uses — reducing rework between design and code.',
      },
      {
        heading: 'Inclusive by default',
        body:
          'Contrast, focus, keyboard paths, and semantic structure baked in — not patched as an afterthought before launch.',
      },
    ],
    related: [
      { label: 'Web application development', path: '/services/custom-web-application-development' },
      { label: 'Mobile app development', path: '/services/mobile-app-development' },
    ],
    caseStudies: [{ label: 'Adaptive learning platform', path: '/portfolio/adaptive-learning-platform' }],
  },

  'api-development-system-integrations': {
    slug: 'api-development-system-integrations',
    title: 'API Development & System Integrations — Corematrix',
    description:
      'REST, GraphQL, and event-driven APIs — Stripe, Salesforce, HubSpot, and custom microservices with docs, auth, and reliability patterns.',
    canonicalPath: '/services/api-development-system-integrations',
    h1: 'API Development & System Integrations',
    badge: 'APIs & integrations',
    intro:
      'We connect your product to the rest of the stack: stable contracts, versioning, retries, and observability — so partners and internal teams integrate without fire drills.',
    stackTags: ['#REST', '#GraphQL', '#tRPC', '#Webhooks', '#Node.js'],
    serviceType: 'API Development Service',
    serviceSchemaDescription:
      'Custom API development, system integration, and microservices for business software.',
    breadcrumbLabel: 'APIs & integrations',
    sections: [
      {
        heading: 'Design-first contracts',
        body:
          'OpenAPI or schema-first GraphQL, error models, pagination, and idempotency — documented for humans and generated clients where useful.',
      },
      {
        heading: 'SaaS and enterprise connectors',
        body:
          'Billing, CRM, marketing, identity, and warehouse sync — with OAuth, scoped credentials, and audit-friendly logging.',
      },
      {
        heading: 'Operational maturity',
        body:
          'Rate limits, circuit breakers, tracing, and on-call runbooks — because integrations fail at 2 a.m., not in demos.',
      },
    ],
    related: [
      { label: 'Web application development', path: '/services/custom-web-application-development' },
      { label: 'SaaS platform development', path: '/services/saas-platform-development' },
      { label: 'DevOps & infrastructure', path: '/services/devops-security-infrastructure' },
    ],
    caseStudies: [{ label: 'SaaS analytics platform', path: '/portfolio/saas-analytics-platform' }],
  },

  'ecommerce-marketplace-development': {
    slug: 'ecommerce-marketplace-development',
    title: 'eCommerce & Marketplace Development — Corematrix',
    description:
      'Headless commerce, custom checkout, multi-vendor marketplaces, and Stripe-backed subscriptions — tuned for conversion and ops.',
    canonicalPath: '/services/ecommerce-marketplace-development',
    h1: 'eCommerce & Marketplace Development',
    badge: 'Commerce',
    intro:
      'We build storefronts and seller tools that scale: catalog, inventory, payouts, disputes, and admin dashboards — without locking you into a template that breaks at volume.',
    stackTags: ['#Next.js', '#Stripe', '#Headless', '#Marketplace'],
    serviceType: 'eCommerce Development',
    serviceSchemaDescription:
      'Custom eCommerce and marketplace platform development with modern web technology.',
    breadcrumbLabel: 'eCommerce & marketplaces',
    sections: [
      {
        heading: 'Headless and composable',
        body:
          'Next.js frontends with Stripe, CMS, and PIM integrations — fast PDPs, SEO-friendly listings, and cart flows tuned for your funnel.',
      },
      {
        heading: 'Marketplace mechanics',
        body:
          'Vendor onboarding, commissions, payouts, moderation, and dispute workflows — with roles and reporting for operators.',
      },
      {
        heading: 'Growth hooks',
        body:
          'Recommendations, bundles, and experiments when you are ready — instrumented so merchandising decisions are data-backed.',
      },
    ],
    related: [
      { label: 'Web application development', path: '/services/custom-web-application-development' },
      { label: 'Performance & cloud', path: '/services/performance-engineering-cloud-migration' },
    ],
  },

  'performance-engineering-cloud-migration': {
    slug: 'performance-engineering-cloud-migration',
    title: 'Performance Engineering & Cloud Migration — Corematrix',
    description:
      'Audits, refactors, and cloud-native migrations on AWS and GCP — faster apps, lower cost, and runbooks your team can own.',
    canonicalPath: '/services/performance-engineering-cloud-migration',
    h1: 'Performance Engineering & Cloud Migration',
    badge: 'Platform',
    intro:
      'We find what actually hurts latency and cost — then fix it with caching, query and bundle work, containers, and IaC — without a big-bang rewrite unless you need one.',
    stackTags: ['#AWS', '#GCP', '#Docker', '#K8s', '#Terraform'],
    serviceType: 'Cloud Migration Service',
    serviceSchemaDescription:
      'Application performance optimization, cloud migration, and infrastructure modernization.',
    breadcrumbLabel: 'Performance & cloud migration',
    sections: [
      {
        heading: 'Evidence-based tuning',
        body:
          'Real user metrics, traces, and load tests — prioritized backlog so the first fixes pay for the engagement.',
      },
      {
        heading: 'Migration paths',
        body:
          'Lift-and-shift when deadlines demand it, strangler patterns when you want zero-downtime cutovers, and greenfield services when legacy cannot keep up.',
      },
      {
        heading: 'Cost and reliability',
        body:
          'Right-sized compute, autoscaling, backups, and alerting — with Terraform or your chosen IaC so changes are reviewable.',
      },
    ],
    related: [
      { label: 'DevOps & infrastructure', path: '/services/devops-security-infrastructure' },
      { label: 'Web application development', path: '/services/custom-web-application-development' },
    ],
    caseStudies: [{ label: 'Enterprise internal ops platform', path: '/portfolio/enterprise-internal-ops-platform' }],
  },

  'enterprise-software-development': {
    slug: 'enterprise-software-development',
    title: 'Enterprise Software Development — Corematrix',
    description:
      'Mission-critical internal platforms, ERP extensions, and integrations with SAP, Salesforce, and Microsoft — SSO, audit, and long maintainability.',
    canonicalPath: '/services/enterprise-software-development',
    h1: 'Enterprise Software Development',
    badge: 'Enterprise',
    intro:
      'We build software that procurement and IT can stand behind: RBAC, SSO, audit logs, and documentation that survives team turnover.',
    stackTags: ['#Enterprise', '#SSO', '#RBAC', '#ERP', '#Integrations'],
    serviceType: 'Enterprise Software Development',
    serviceSchemaDescription:
      'Custom enterprise software development including integrations with major ERP and CRM systems.',
    breadcrumbLabel: 'Enterprise software',
    sections: [
      {
        heading: 'Complex domains',
        body:
          'Workflow engines, approvals, reporting, and data platforms — modeled with stakeholders so edge cases are explicit, not surprises in UAT.',
      },
      {
        heading: 'Identity and compliance',
        body:
          'SAML/OIDC, directory sync, least-privilege roles, and retention policies aligned to your security review.',
      },
      {
        heading: 'Roadmap with you',
        body:
          'Phased delivery, change management, and training — so adoption follows launch instead of fighting it.',
      },
    ],
    related: [
      { label: 'SaaS platform development', path: '/services/saas-platform-development' },
      { label: 'Dedicated development teams', path: '/services/dedicated-development-teams' },
    ],
    caseStudies: [{ label: 'Enterprise internal ops platform', path: '/portfolio/enterprise-internal-ops-platform' }],
  },

  'devops-security-infrastructure': {
    slug: 'devops-security-infrastructure',
    title: 'DevOps, Security & Infrastructure — Corematrix',
    description:
      'CI/CD, Terraform, Kubernetes, scanning, and observability — ship faster with guardrails instead of heroics.',
    canonicalPath: '/services/devops-security-infrastructure',
    h1: 'DevOps, Security & Infrastructure Engineering',
    badge: 'DevOps',
    intro:
      'We automate the path to production: pipelines, environments, secrets, and monitors — so releases are frequent and incidents are short.',
    stackTags: ['#DevOps', '#Terraform', '#CI/CD', '#Kubernetes', '#Security'],
    serviceType: 'DevOps Consulting',
    serviceSchemaDescription:
      'DevOps engineering, cloud infrastructure, CI/CD pipelines, and security automation.',
    breadcrumbLabel: 'DevOps & infrastructure',
    sections: [
      {
        heading: 'Pipeline and environments',
        body:
          'Build, test, deploy, and rollback — preview apps for PRs, promoted artifacts to prod, and secrets managers instead of env files in chat.',
      },
      {
        heading: 'Security in the loop',
        body:
          'Dependency and container scanning, IaC policy checks, and least-privilege IAM — wired so failures block deploys that would fail audit.',
      },
      {
        heading: 'Operations you can see',
        body:
          'Dashboards, SLOs, paging, and postmortems — on-call that is boring because the system tells you what broke and why.',
      },
    ],
    related: [
      { label: 'Performance & cloud migration', path: '/services/performance-engineering-cloud-migration' },
      { label: 'SaaS platform development', path: '/services/saas-platform-development' },
    ],
    caseStudies: [{ label: 'SaaS analytics platform', path: '/portfolio/saas-analytics-platform' }],
  },

  'staff-augmentation-specialists': {
    slug: 'staff-augmentation-specialists',
    title: 'Staff Augmentation & Specialist Contractors — Corematrix',
    description:
      'Senior Next.js, AI/ML, and DevOps specialists embedded fast — flexible contracts, no recruiting drag, quality bar matches our product teams.',
    canonicalPath: '/services/staff-augmentation-specialists',
    h1: 'Staff Augmentation & Specialist Contractors',
    badge: 'Staffing',
    intro:
      'When you need a narrow skill for a phase — not a permanent requisition — we place engineers who have already shipped similar systems and know how to work async.',
    stackTags: ['#StaffAugmentation', '#Next.js', '#AI', '#DevOps'],
    serviceType: 'IT Staff Augmentation',
    serviceSchemaDescription:
      'Software engineering staff augmentation and specialist contractor placement.',
    breadcrumbLabel: 'Staff augmentation',
    sections: [
      {
        heading: 'Roles we place',
        body:
          'Full-stack and frontend leads, LLM and ML engineers, platform and SRE, and tech leads for short-staffed squads.',
      },
      {
        heading: 'How engagement works',
        body:
          'Time-and-materials or monthly blocks, your tools and ceremonies, and clear output metrics — with optional Corematrix oversight if you want a safety net.',
      },
      {
        heading: 'When it makes sense',
        body:
          'Launch crunch, skill gaps, parental leave coverage, or a bet you are not ready to hire FTE for — we stay flexible as scope shifts.',
      },
    ],
    related: [
      { label: 'Dedicated development teams', path: '/services/dedicated-development-teams' },
      { label: 'Offshore development centre', path: '/services/offshore-development-centre' },
    ],
    caseStudies: [{ label: 'Browse portfolio', path: '/portfolio' }],
  },

  'offshore-development-centre': {
    slug: 'offshore-development-centre',
    title: 'Offshore Development Centre (ODC) — Corematrix',
    description:
      'Scale 10–50+ engineers with one partner: governance, security, and delivery standards aligned to how serious product orgs actually work.',
    canonicalPath: '/services/offshore-development-centre',
    h1: 'Offshore Development Centre (ODC)',
    badge: 'Scale',
    intro:
      'We stand up a dedicated engineering cell under Corematrix — not anonymous bodies — with shared tooling, code quality bars, and leadership that reports in your timezone.',
    stackTags: ['#ODC', '#Offshore', '#Scale', '#DedicatedTeam'],
    serviceType: 'Offshore Software Development',
    serviceSchemaDescription:
      'Offshore development centre and scaled engineering team services for enterprises.',
    breadcrumbLabel: 'Offshore development centre',
    sections: [
      {
        heading: 'Structure',
        body:
          'Pods with leads, shared platform practices, and hiring profiles matched to your stack — AI, web, mobile, and cloud under one umbrella.',
      },
      {
        heading: 'Transparency',
        body:
          'Shared boards, sprint reviews, and engineering metrics you can compare to in-house teams — no black-box outsourcing.',
      },
      {
        heading: 'Commercial models',
        body:
          'Capacity-based or outcome-oriented agreements — structured so growth in headcount does not mean growth in chaos.',
      },
    ],
    related: [
      { label: 'Dedicated development teams', path: '/services/dedicated-development-teams' },
      { label: 'Staff augmentation', path: '/services/staff-augmentation-specialists' },
    ],
    caseStudies: [{ label: 'Browse portfolio', path: '/portfolio' }],
  },
};

export const SERVICE_LANDING: Record<string, ServiceLandingConfig> = {
  ...CORE,
  ...SERVICE_STUBS,
};

export function getServiceLandingSchema(cfg: ServiceLandingConfig) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: cfg.h1,
    description: cfg.serviceSchemaDescription,
    serviceType: cfg.serviceType,
    provider: {
      '@type': 'Organization' as const,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: `${siteConfig.url}${cfg.canonicalPath}`,
  } as const;
}
