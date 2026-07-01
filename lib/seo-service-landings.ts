import { siteConfig } from '@/config/site';
import type { ServiceLandingConfig } from '@/lib/seo-service-types';
import { SERVICE_STUBS } from '@/lib/seo-service-stubs';

const CORE: Record<string, ServiceLandingConfig> = {
    'ai-product-development': {
        slug: 'ai-product-development',
        title: 'AI Product Development Services — Corematrix',
        titleAr: 'خدمات تطوير منتجات الذكاء الاصطناعي — Corematrix',
        description:
            'End-to-end AI product engineering: LLM apps, agents, RAG, computer vision, and production ML — from strategy through deployment and monitoring.',
        descriptionAr:
            'هندسة منتجات الذكاء الاصطناعي المتكاملة: تطبيقات النماذج اللغوية الكبيرة، الوكلاء، أنظمة RAG، الرؤية الحاسوبية، والتعلم الآلي في الإنتاج — من الاستراتيجية إلى النشر والمراقبة.',
        canonicalPath: '/services/ai-product-development',
        ogTitle: 'AI Product Development | Corematrix',
        ogTitleAr: 'تطوير منتجات الذكاء الاصطناعي | Corematrix',
        h1: 'AI Product Development & Intelligent Systems',
        h1Ar: 'تطوير منتجات الذكاء الاصطناعي والأنظمة الذكية',
        badge: 'AI engineering',
        badgeAr: 'هندسة الذكاء الاصطناعي',
        intro:
            'We design and ship production AI systems that survive real traffic: retrieval pipelines, evaluation, safety guardrails, and observability — not demos that fall over in week two.',
        introAr:
            'نقوم بتصميم وشحن أنظمة ذكاء اصطناعي إنتاجية تتحمل ضغط العمل الفعلي: خطوط معالجة الاسترجاع، التقييم، حواجز الحماية والأمان، والمراقبة — وليس مجرد عروض توضيحية تسقط في الأسبوع الثاني.',
        stackTags: ['#LLM', '#RAG', '#LangChain', '#Python', '#Next.js', '#MLOps'],
        serviceType: 'AI Software Development',
        serviceTypeAr: 'تطوير برمجيات الذكاء الاصطناعي',
        serviceSchemaDescription:
            'Custom AI product development including large language model integration, autonomous agents, RAG systems, and machine learning deployment.',
        serviceSchemaDescriptionAr:
            'تطوير مخصص لمنتجات الذكاء الاصطناعي بما في ذلك دمج النماذج اللغوية الكبيرة، والوكلاء المستقلين، وأنظمة RAG، ونشر نماذج التعلم الآلي.',
        breadcrumbLabel: 'AI product development',
        breadcrumbLabelAr: 'تطوير منتجات الذكاء الاصطناعي',
        sections: [
            {
                heading: 'What we deliver',
                headingAr: 'ما نقدمه',
                body:
                    'LLM-powered products, multi-agent workflows, document and contract intelligence, support automation, forecasting models, and computer vision — integrated with your identity, data, and release process.',
                bodyAr:
                    'منتجات مدعومة بالنماذج اللغوية الكبيرة، تدفقات عمل متعددة الوكلاء، ذكاء الوثائق والعقود، أتمتة الدعم الفني، نماذج التنبؤ، والرؤية الحاسوبية — متكاملة مع هويتك، وبياناتك، وعملية الإصدار الخاصة بك.',
            },
            {
                heading: 'How we work with your team',
                headingAr: 'كيف نعمل مع فريقك',
                body:
                    'We start with discovery and a thin vertical slice to production, then expand. You get weekly demos, clear acceptance criteria, and documentation your engineers can own — including runbooks and evaluation metrics.',
                bodyAr:
                    'نبدأ بالاكتشاف وبناء شريحة عمودية رقيقة للإنتاج، ثم نتوسع. ستحصل على عروض توضيحية أسبوعية، ومعايير قبول واضحة، ووثائق يمكن لمهندسيكم امتلاكها وتطويرها — بما في ذلك كتيبات التشغيل ومقاييس التقييم.',
            },
            {
                heading: 'Outcomes you can measure',
                headingAr: 'نتائج يمكنك قياسها',
                body:
                    'Faster processing, higher automation rates, lower cost per ticket or document, and models monitored for drift and abuse — tied to the KPIs your leadership actually tracks.',
                bodyAr:
                    'معالجة أسرع، معدلات أتمتة أعلى، تكلفة أقل لكل تذكرة أو مستند، ونماذج تخضع للمراقبة المستمرة لرصد الانحراف أو سوء الاستخدام — مرتبطة بمؤشرات الأداء الرئيسية التي تهم القيادة بالفعل.',
            },
        ],
        related: [
            { label: 'Web application development', labelAr: 'تطوير تطبيقات الويب المخصصة', path: '/services/custom-web-application-development' },
            { label: 'SaaS platform development', labelAr: 'تطوير منصات SaaS', path: '/services/saas-platform-development' },
            { label: 'All services', labelAr: 'جميع الخدمات', path: '/services' },
        ],
        caseStudies: [
            { label: 'AI contract intelligence platform', labelAr: 'منصة الذكاء الاصطناعي لتحليل العقود', path: '/portfolio/ai-contract-intelligence-platform' },
            { label: 'AI customer support agent', labelAr: 'وكيل دعم العملاء بالذكاء الاصطناعي', path: '/portfolio/ai-customer-support-agent' },
        ],
    },

    'custom-web-application-development': {
        slug: 'custom-web-application-development',
        title: 'Custom Web Application Development — Corematrix',
        titleAr: 'تطوير تطبيقات الويب المخصصة — Corematrix',
        description:
            'High-performance web apps with Next.js, React, and TypeScript — Core Web Vitals, accessibility, SEO-ready architecture, and APIs that scale.',
        descriptionAr:
            'تطبيقات ويب عالية الأداء باستخدام Next.js و React و TypeScript — تحسين مؤشرات الويب الحيوية، إمكانية الوصول، بنية جاهزة لتحسين محركات البحث (SEO)، وواجهات برمجة تطبيقات قابلة للتوسع.',
        canonicalPath: '/services/custom-web-application-development',
        h1: 'Custom Web Application Development',
        h1Ar: 'تطوير تطبيقات الويب المخصصة',
        badge: 'Web engineering',
        badgeAr: 'هندسة الويب',
        intro:
            'From marketing sites to complex dashboards, we build web software that loads fast, ranks well, and stays maintainable as your product grows.',
        introAr:
            'من المواقع التسويقية إلى لوحات التحكم المعقدة، نبني برمجيات ويب سريعة التحميل، وتتصدر نتائج البحث، وتبقى سهلة الصيانة مع نمو منتجك.',
        stackTags: ['#Next.js', '#React', '#TypeScript', '#Node.js', '#Tailwind'],
        serviceType: 'Web Application Development',
        serviceTypeAr: 'تطوير تطبيقات الويب المخصصة',
        serviceSchemaDescription:
            'Custom web application development using modern JavaScript frameworks, performance optimization, and cloud deployment.',
        serviceSchemaDescriptionAr:
            'تطوير مخصص لتطبيقات الويب باستخدام أطر عمل برمجية حديثة، تحسين الأداء، والنشر السحابي.',
        breadcrumbLabel: 'Web applications',
        breadcrumbLabelAr: 'تطبيقات الويب',
        sections: [
            {
                heading: 'Product-grade frontends',
                headingAr: 'واجهات أمامية بمستوى المنتجات العالمية',
                body:
                    'Server and client components where each fits, design systems, responsive layouts, and accessible patterns — so your UI stays consistent as features multiply.',
                bodyAr:
                    'مكونات الخادم والعميل حيثما يناسب كل منها، وأنظمة التصميم، والتخطيطات المتجاوبة، وأنماط إمكانية الوصول — حتى تظل واجهة المستخدم الخاصة بك متسقة مع تضاعف الميزات.',
            },
            {
                heading: 'APIs and integrations',
                headingAr: 'واجهات البرمجيات والتكامل',
                body:
                    'REST, GraphQL, or tRPC backends, webhooks, and third-party integrations (payments, CRM, auth) with clear contracts and error handling.',
                bodyAr:
                    'خلفيات REST أو GraphQL أو tRPC، وخطافات الويب (Webhooks)، وتكاملات الطرف الثالث (الدفع، إدارة علاقات العملاء CRM، المصادقة) مع عقود واضحة ومعالجة قوية للأخطاء.',
            },
            {
                heading: 'Launch and scale',
                headingAr: 'الإطلاق والتوسع',
                body:
                    'CI/CD, staging environments, logging, and performance budgets — so releases are boring in the best way.',
                bodyAr:
                    'التكامل المستمر والنشر المستمر (CI/CD)، بيئات الاختبار، تسجيل الأحداث، وميزانيات الأداء — لتكون الإصدارات سلسة وآمنة بأفضل طريقة ممكنة.',
            },
        ],
        related: [
            { label: 'AI product development', labelAr: 'تطوير منتجات الذكاء الاصطناعي', path: '/services/ai-product-development' },
            { label: 'SaaS platform development', labelAr: 'تطوير منصات SaaS', path: '/services/saas-platform-development' },
            { label: 'All services', labelAr: 'جميع الخدمات', path: '/services' },
        ],
        caseStudies: [
            { label: 'HIPAA telehealth platform', labelAr: 'منصة الرعاية الصحية المتوافقة مع HIPAA', path: '/portfolio/hipaa-telehealth-platform' },
            { label: 'Adaptive learning platform', labelAr: 'منصة التعلم التكيفي المخصصة', path: '/portfolio/adaptive-learning-platform' },
        ],
    },

    'saas-platform-development': {
        slug: 'saas-platform-development',
        title: 'SaaS Platform Development — Corematrix',
        titleAr: 'تطوير منصات SaaS — Corematrix',
        description:
            'Multi-tenant SaaS architecture, Stripe billing, RBAC, usage metering, and admin tooling — from MVP to enterprise-ready platforms.',
        descriptionAr:
            'بنية تحتية لمنصات SaaS متعددة المستأجرين، فوترة Stripe، التحكم في الوصول المستند إلى الأدوار (RBAC)، قياس الاستخدام، وأدوات الإدارة — من النموذج الأولي إلى المنصات الجاهزة للمؤسسات الكبرى.',
        canonicalPath: '/services/saas-platform-development',
        h1: 'SaaS Platform Development',
        h1Ar: 'تطوير منصات البرمجيات كخدمة (SaaS)',
        badge: 'SaaS & platforms',
        badgeAr: 'منصات البرمجيات كخدمة',
        intro:
            'We build subscription products with the primitives investors and enterprise buyers expect: tenancy isolation, billing, roles, analytics, and operational dashboards.',
        introAr:
            'نبني منتجات الاشتراك بالأسس والمعايير التي يتوقعها المستثمرون ومشتري المؤسسات الكبرى: عزل المستأجرين، الفوترة، الأدوار، التحليلات، ولوحات التشغيل العملياتية.',
        stackTags: ['#MultiTenant', '#Stripe', '#PostgreSQL', '#RBAC', '#Next.js'],
        serviceType: 'SaaS Development',
        serviceTypeAr: 'تطوير منصات SaaS',
        serviceSchemaDescription:
            'Multi-tenant SaaS platform engineering including billing, access control, and cloud infrastructure.',
        serviceSchemaDescriptionAr:
            'هندسة منصات SaaS متعددة المستأجرين بما في ذلك الفوترة، وإدارة الوصول، والبنية التحتية السحابية.',
        breadcrumbLabel: 'SaaS platforms',
        breadcrumbLabelAr: 'منصات SaaS',
        sections: [
            {
                heading: 'Tenant-ready foundations',
                headingAr: 'أسس جاهزة للمستأجرين',
                body:
                    'Data isolation strategies, org and user models, invitation flows, and audit trails — designed before feature velocity paints you into a corner.',
                bodyAr:
                    'استراتيجيات عزل البيانات، نماذج المؤسسات والمستخدمين، تدفقات الدعوات، ومسارات التدقيق — مصممة مسبقاً قبل أن تقيدك سرعة الميزات في زاوية صعبة.',
            },
            {
                heading: 'Monetization and growth',
                headingAr: 'تحقيق الدخل والنمو',
                body:
                    'Plans, trials, usage-based billing, invoices, and dunning hooks — wired to your product events so finance and product stay aligned.',
                bodyAr:
                    'الخطط، الفترات التجريبية، الفوترة القائمة على الاستخدام، الفواتير، وخطافات تذكير الدفع — متصلة بأحداث منتجك ليبقى القسم المالي والمنتج متوائمين.',
            },
            {
                heading: 'Enterprise expectations',
                headingAr: 'متطلبات وتوقعات المؤسسات',
                body:
                    'SSO readiness, export and reporting, security review artifacts, and runbooks — so procurement stops being a surprise project.',
                bodyAr:
                    'الجاهزية لتسجيل الدخول الموحد (SSO)، التصدير والتقارير، وثائق المراجعة الأمنية، وكتيبات التشغيل — لكي لا تكون المشتريات مشروعاً مفاجئاً.',
            },
        ],
        related: [
            { label: 'Web application development', labelAr: 'تطوير تطبيقات الويب المخصصة', path: '/services/custom-web-application-development' },
            { label: 'Dedicated development teams', labelAr: 'فرق التطوير المخصصة', path: '/services/dedicated-development-teams' },
            { label: 'All services', labelAr: 'جميع الخدمات', path: '/services' },
        ],
        caseStudies: [
            { label: 'SaaS analytics platform', labelAr: 'منصة تحليلات البرمجيات كخدمة (SaaS)', path: '/portfolio/saas-analytics-platform' },
            { label: 'AI route optimisation SaaS', labelAr: 'برنامج SaaS لتحسين مسارات التوزيع بالذكاء الاصطناعي', path: '/portfolio/ai-route-optimisation-saas' },
        ],
    },

    'mobile-app-development': {
        slug: 'mobile-app-development',
        title: 'Mobile App Development — Corematrix',
        titleAr: 'تطوير تطبيقات الهاتف المحمول — Corematrix',
        description:
            'Cross-platform mobile apps with React Native — native-feel UX, secure auth, offline-aware flows, and store-ready release discipline.',
        descriptionAr:
            'تطبيقات الهاتف المحمول العابرة للمنصات باستخدام React Native — تجربة مستخدم ذات إحساس أصيل، مصادقة آمنة، تدفقات تدعم العمل دون اتصال، وانضباط النشر في المتاجر.',
        canonicalPath: '/services/mobile-app-development',
        h1: 'Mobile App Development',
        h1Ar: 'تطوير تطبيقات الهاتف المحمول',
        badge: 'Mobile',
        badgeAr: 'الهاتف المحمول',
        intro:
            'We ship iOS and Android from a shared codebase when it makes sense — with performance profiling, push, deep links, and app store submission handled end to end.',
        introAr:
            'نقوم بشحن تطبيقات iOS و Android من قاعدة كود مشتركة عندما يكون ذلك منطقياً — مع تحليل الأداء، الإشعارات، الروابط العميقة، والتعامل الكامل مع تقديم التطبيقات للمتاجر من البداية للنهاية.',
        stackTags: ['#ReactNative', '#iOS', '#Android', '#TypeScript'],
        serviceType: 'Mobile Application Development',
        serviceTypeAr: 'تطوير تطبيقات الهاتف المحمول',
        serviceSchemaDescription:
            'Cross-platform mobile application development for iOS and Android using React Native and native integrations.',
        serviceSchemaDescriptionAr:
            'تطوير تطبيقات هاتف محمول عابرة للمنصات لنظامي iOS و Android باستخدام React Native والتكاملات الأصيلة.',
        breadcrumbLabel: 'Mobile apps',
        breadcrumbLabelAr: 'تطبيقات الهاتف',
        sections: [
            {
                heading: 'Experience and performance',
                headingAr: 'التجربة والأداء المتميز',
                body:
                    'Navigation patterns, gestures, lists, and media that feel native — with attention to startup time, memory, and battery on real devices.',
                bodyAr:
                    'أنماط التنقل، الإيماءات، القوائم، والوسائط التي تمنح إحساساً أصيلاً بالسرعة والنعومة — مع الاهتمام بوقت التشغيل والذاكرة والبطارية على الأجهزة الحقيقية.',
            },
            {
                heading: 'Security and compliance',
                headingAr: 'الأمن والامتثال',
                body:
                    'Secure storage, biometrics, certificate pinning where needed, and integration with your backend auth model.',
                bodyAr:
                    'التخزين الآمن، المقاييس الحيوية (البصمة والوجه)، وتثبيت الشهادات الأمنية عند الحاجة، والتكامل التام مع نموذج مصادقة الواجهة الخلفية الخاصة بك.',
            },
            {
                heading: 'Shipping to stores',
                headingAr: 'الشحن والتقديم للمتاجر',
                body:
                    'Build pipelines, beta distribution, store listings, and iteration after launch based on crash and analytics data.',
                bodyAr:
                    'مسارات البناء التلقائي، التوزيع التجريبي للاختبار، وتجهيز صفحات المتاجر، والتحديث المستمر بعد الإطلاق بناءً على بيانات التحليلات والأعطال.',
            },
        ],
        related: [
            { label: 'Web application development', labelAr: 'تطوير تطبيقات الويب المخصصة', path: '/services/custom-web-application-development' },
            { label: 'AI product development', labelAr: 'تطوير منتجات الذكاء الاصطناعي', path: '/services/ai-product-development' },
            { label: 'All services', labelAr: 'جميع الخدمات', path: '/services' },
        ],
        caseStudies: [
            { label: 'AI personal finance app', labelAr: 'تطبيق التمويل الشخصي بالذكاء الاصطناعي', path: '/portfolio/ai-personal-finance-app' },
        ],
    },

    'dedicated-development-teams': {
        slug: 'dedicated-development-teams',
        title: 'Dedicated Development Teams — Corematrix',
        titleAr: 'فرق التطوير المخصصة — Corematrix',
        description:
            'Embedded engineers and squads that work in your tools and cadence — staff augmentation and long-term product teams without recruiting overhead.',
        descriptionAr:
            'مهندسون وفرق عمل متخصصة مدمجة تعمل بأدواتك وإيقاع عملك — تعزيز الكوادر البرمجية وبناء فرق تطوير طويلة المدى بدون تكاليف التوظيف الإدارية.',
        canonicalPath: '/services/dedicated-development-teams',
        h1: 'Dedicated Development Teams',
        h1Ar: 'فرق التطوير والبرمجة المخصصة',
        badge: 'Teams & outsourcing',
        badgeAr: 'الفرق والتعاقدات الخارجية',
        intro:
            'Extend your capacity with senior engineers who behave like part of your org: your standups, your repo, your roadmap — with clear ownership and communication.',
        introAr:
            'عزز قدرتك الإنتاجية بمهندسين كبار يتصرفون كجزء لا يتجزأ من مؤسستك: اجتماعاتك اليومية، مستودع الأكواد الخاص بك، خريطة طريقك — بملكيات واتصالات واضحة.',
        stackTags: ['#DedicatedTeam', '#StaffAugmentation', '#Agile', '#Remote'],
        serviceType: 'Software Development Staffing',
        serviceTypeAr: 'توظيف ودعم كوادر تطوير البرمجيات',
        serviceSchemaDescription:
            'Dedicated software development teams and staff augmentation for AI, web, mobile, and cloud projects.',
        serviceSchemaDescriptionAr:
            'فرق تطوير برمجيات مخصصة وتعزيز الكوادر البرمجية لمشاريع الذكاء الاصطناعي، الويب، المحمول، والسحابية.',
        breadcrumbLabel: 'Dedicated teams',
        breadcrumbLabelAr: 'الفرق المخصصة',
        sections: [
            {
                heading: 'Models that match how you work',
                headingAr: 'نماذج تتوافق تماماً مع طريقة عملك',
                body:
                    'Full squads with tech lead, individual senior contributors, or hybrid pods — aligned to your release train and code review culture.',
                bodyAr:
                    'فرق عمل كاملة مع قائد تقني، أو مساهمين فنيين كبار مستقلين، أو وحدات هجينة — متوافقة تماماً مع دورة الإصدارات وثقافة مراجعة الأكواد الخاصة بك.',
            },
            {
                heading: 'Onboarding that sticks',
                headingAr: 'دمج سريع ومستدام',
                body:
                    'Short ramp plans, pairing, and documentation so productivity shows up in the first sprint — not the fourth.',
                bodyAr:
                    'خطط تهيئة قصيرة، وتوجيه ثنائي، وتوثيق شامل يضمن ظهور الإنتاجية في دورة التطوير الأولى (السبيرنت الأول) — وليس الرابع.',
            },
            {
                heading: 'Governance without bureaucracy',
                headingAr: 'حوكمة سلسة دون بيروقراطية',
                body:
                    'Clear SLAs, security expectations, and IP assignment — so legal and engineering both sleep at night.',
                bodyAr:
                    'اتفاقيات مستوى خدمة (SLAs) واضحة، وتوقعات أمنية محددة، ونقل كامل للملكية الفكرية — ليرتاح الفريق القانوني والهندسي معاً.',
            },
        ],
        related: [
            { label: 'SaaS platform development', labelAr: 'تطوير منصات SaaS', path: '/services/saas-platform-development' },
            { label: 'AI product development', labelAr: 'تطوير منتجات الذكاء الاصطناعي', path: '/services/ai-product-development' },
            { label: 'All services', labelAr: 'جميع الخدمات', path: '/services' },
        ],
        caseStudies: [{ label: 'Browse portfolio', labelAr: 'تصفح معرض أعمالنا', path: '/portfolio' }],
    },

    'ai-automation-workflow-intelligence': {
        slug: 'ai-automation-workflow-intelligence',
        title: 'AI Automation & Workflow Intelligence — Corematrix',
        titleAr: 'أتمتة الذكاء الاصطناعي وذكاء تدفقات العمل — Corematrix',
        description:
            'Intelligent document processing, approval workflows, and RAG-powered operations that cut manual work by double digits — with audit trails and human-in-the-loop where it matters.',
        descriptionAr:
            'معالجة المستندات الذكية، تدفقات عمل الموافقات، والعمليات المدعومة بنظام RAG التي تخفض العمل اليدوي بنسب ثنائية الأرقام — مع مسارات تدقيق ومراجعة بشرية.',
        canonicalPath: '/services/ai-automation-workflow-intelligence',
        h1: 'AI Automation & Workflow Intelligence',
        h1Ar: 'أتمتة الذكاء الاصطناعي وذكاء تدفق العمل',
        badge: 'AI operations',
        badgeAr: 'عمليات الذكاء الاصطناعي',
        intro:
            'We replace brittle scripts with pipelines that understand context: extract, classify, route, and escalate — wired to your CRM, ERP, and ticketing tools so teams stop copy-pasting between systems.',
        introAr:
            'نستبدل السكربتات الهشة بخطوط معالجة تفهم السياق: الاستخراج، التصنيف، التوجيه، والتصعيد — متصلة بأدوات إدارة علاقات العملاء وتذاكر الدعم لتتوقف الفرق عن نسخ ولصق البيانات.',
        stackTags: ['#RAG', '#LangChain', '#n8n', '#Python', '#APIs'],
        serviceType: 'AI Automation Services',
        serviceTypeAr: 'خدمات أتمتة الذكاء الاصطناعي',
        serviceSchemaDescription:
            'AI-powered workflow automation, intelligent document processing, and business process orchestration.',
        serviceSchemaDescriptionAr:
            'أتمتة تدفق العمل المدعومة بالذكاء الاصطناعي، المعالجة الذكية للمستندات، وإدارة العمليات التجارية.',
        breadcrumbLabel: 'AI automation & workflows',
        breadcrumbLabelAr: 'أتمتة الذكاء الاصطناعي وتدفقات العمل',
        sections: [
            {
                heading: 'Where automation pays off first',
                headingAr: 'أين تحقق الأتمتة أعلى عائد أولاً',
                body:
                    'High-volume intake: contracts, invoices, support queues, and onboarding packets. We map states, exceptions, and SLAs, then automate the boring 80% while surfacing edge cases for reviewers.',
                bodyAr:
                    'العمليات ذات الحجم الكبير: العقود، الفواتير، قوائم الانتظار للدعم، وحزم تهيئة العملاء الجدد. نقوم برسم الحالات والاستثناءات واتفاقيات الخدمة، ثم نؤتمت الـ 80% الروتينية مع إظهار الحالات الخاصة للمراجعين.',
            },
            {
                heading: 'Architecture you can operate',
                headingAr: 'بنية تحتية يمكنك تشغيلها وإدارتها',
                body:
                    'Observable queues, idempotent workers, versioned prompts, and evaluation sets — so when regulations or formats change, you adjust without a rewrite.',
                bodyAr:
                    'قوائم انتظار قابلة للمراقبة، معالجات متكررة آمنة، توجيهات إصدارات النماذج، ومجموعات تقييم — حتى عندما تتغير القوانين أو التنسيقات، تقوم بالتعديل دون الحاجة لإعادة كتابة الكود.',
            },
            {
                heading: 'Proof in metrics',
                headingAr: 'إثبات بالأرقام والمقاييس',
                body:
                    'Cycle time, cost per case, error rate, and reviewer hours — baselined before launch and tracked in dashboards your ops lead actually uses.',
                bodyAr:
                    'وقت الدورة، التكلفة لكل حالة، معدل الخطأ، وساعات عمل المراجعين — يتم قياسها قبل الإطلاق وتتبعها في لوحات تحكم يستخدمها مدير العمليات فعلياً.',
            },
        ],
        related: [
            { label: 'AI product development', labelAr: 'تطوير منتجات الذكاء الاصطناعي', path: '/services/ai-product-development' },
            { label: 'Conversational AI & chatbots', labelAr: 'الذكاء الاصطناعي التفاعلي وروبوتات الدردشة', path: '/services/conversational-ai-chatbots' },
            { label: 'API & integrations', labelAr: 'تطوير واجهات البرمجيات والتكامل', path: '/services/api-development-system-integrations' },
        ],
        caseStudies: [
            { label: 'AI contract intelligence platform', labelAr: 'منصة الذكاء الاصطناعي لتحليل العقود', path: '/portfolio/ai-contract-intelligence-platform' },
            { label: 'Enterprise internal ops platform', labelAr: 'منصة العمليات الداخلية للمؤسسات', path: '/portfolio/enterprise-internal-ops-platform' },
        ],
    },

    'machine-learning-predictive-analytics': {
        slug: 'machine-learning-predictive-analytics',
        title: 'Machine Learning & Predictive Analytics — Corematrix',
        titleAr: 'التعلم الآلي والتحليلات التنبؤية — Corematrix',
        description:
            'Custom ML for forecasting, churn, anomalies, recommendations, and pricing — from notebooks to production APIs with monitoring and retraining discipline.',
        descriptionAr:
            'تعلم آلي مخصص للتنبؤ، وتحليل معدل المغادرة (Churn)، واكتشاف الشذوذ، والتوصيات، والتسعير — من دفاتر الملاحظات إلى واجهات البرمجيات في الإنتاج مع المراقبة وإعادة التدريب.',
        canonicalPath: '/services/machine-learning-predictive-analytics',
        h1: 'Machine Learning & Predictive Analytics',
        h1Ar: 'التعلم الآلي والتحليلات التنبؤية',
        badge: 'ML & data',
        badgeAr: 'التعلم الآلي والبيانات',
        intro:
            'We turn historical data into models that ship: feature pipelines, offline evaluation, deployment, and drift checks — not slide-deck accuracy that dies in prod.',
        introAr:
            'نحول البيانات التاريخية إلى نماذج تعمل وتنتج: خطوط معالجة الميزات، التقييم دون اتصال بالإنترنت، النشر، والتحقق من انحراف النموذج — وليس مجرد دقة نظرية تموت في بيئة الإنتاج.',
        stackTags: ['#PyTorch', '#TensorFlow', '#MLOps', '#Python', '#PostgreSQL'],
        serviceType: 'Machine Learning Consulting',
        serviceTypeAr: 'استشارات التعلم الآلي',
        serviceSchemaDescription:
            'Custom machine learning model development, predictive analytics, and MLOps for business applications.',
        serviceSchemaDescriptionAr:
            'تطوير نماذج تعلم آلي مخصصة، تحليلات تنبؤية، وعمليات التعلم الآلي (MLOps) للتطبيقات التجارية.',
        breadcrumbLabel: 'ML & predictive analytics',
        breadcrumbLabelAr: 'التعلم الآلي والتحليلات التنبؤية',
        sections: [
            {
                heading: 'Problems we model well',
                headingAr: 'المشكلات التي ننمذجها ببراعة',
                body:
                    'Demand and revenue forecasting, churn and LTV, anomaly and fraud signals, recommendation and ranking, and dynamic pricing — scoped to data you already have or can collect cleanly.',
                bodyAr:
                    'التنبؤ بالطلب والإيرادات، تحليل مغادرة العملاء والقيمة الدائمة، إشارات الاحتيال والشذوذ، التوصية والترتيب، والتسعير الديناميكي — بما يتناسب مع البيانات المتوفرة لديك أو التي يمكن جمعها بدقة.',
            },
            {
                heading: 'Production, not prototypes',
                headingAr: 'بيئة الإنتاج وليس مجرد نماذج أولية',
                body:
                    'Batch and online inference, feature stores where warranted, model registry, and retraining triggers — with documentation your data team can extend.',
                bodyAr:
                    'الاستدلال الفوري والدفعي، مخازن الميزات عند الحاجة، سجل النماذج، ومحفزات إعادة التدريب — مع توثيق شامل يمكن لفريق البيانات لديك تمديده وتطويره.',
            },
            {
                heading: 'Governance and trust',
                headingAr: 'الحوكمة والموثوقية',
                body:
                    'Bias and stability reviews for high-stakes use cases, explainability where required, and clear handoff between data science and engineering.',
                bodyAr:
                    'مراجعات التحيز والاستقرار لحالات الاستخدام عالية الحساسية، التفسيرية حيثما كانت مطلوبة، والتسليم الواضح والمنظم بين علماء البيانات والمهندسين.',
            },
        ],
        related: [
            { label: 'AI product development', labelAr: 'تطوير منتجات الذكاء الاصطناعي', path: '/services/ai-product-development' },
            { label: 'SaaS platform development', labelAr: 'تطوير منصات SaaS', path: '/services/saas-platform-development' },
        ],
        caseStudies: [
            { label: 'PropTech AI valuation engine', labelAr: 'محرك تقييم العقارات بالذكاء الاصطناعي (PropTech)', path: '/portfolio/proptech-ai-valuation-engine' },
            { label: 'SaaS analytics platform', labelAr: 'منصة تحليلات البرمجيات كخدمة (SaaS)', path: '/portfolio/saas-analytics-platform' },
        ],
    },

    'conversational-ai-chatbots': {
        slug: 'conversational-ai-chatbots',
        title: 'Conversational AI & Intelligent Chatbots — Corematrix',
        titleAr: 'الذكاء الاصطناعي التفاعلي وروبوتات الدردشة الذكية — Corematrix',
        description:
            'LLM assistants for support and internal knowledge — RAG, tool use, guardrails, and escalation paths that resolve most tickets without sacrificing trust.',
        descriptionAr:
            'مساعدون مدعومون بالنماذج اللغوية الكبيرة للدعم والمعرفة الداخلية — أنظمة RAG، استخدام الأدوات، حواجز الحماية والأمان، ومسارات التصعيد التي تحل معظم التذاكر دون التضحية بالثقة.',
        canonicalPath: '/services/conversational-ai-chatbots',
        h1: 'Conversational AI & Intelligent Chatbots',
        h1Ar: 'الذكاء الاصطناعي التفاعلي وروبوتات الدردشة الذكية',
        badge: 'LLM assistants',
        badgeAr: 'مساعدو النماذج اللغوية الكبيرة',
        intro:
            'We build bots that read your policies and tickets, call your APIs when allowed, and hand off cleanly when they should — with logging and evaluation so quality improves every sprint.',
        introAr:
            'نبني روبوتات تقرأ سياساتك وتذاكرك، وتستدعي واجهات البرمجيات الخاصة بك عند السماح لها، وتنتقل للدعم البشري بسلاسة عند الضرورة — مع تسجيل الأحداث والتقييم المستمر لضمان تطور الجودة في كل دورة.',
        stackTags: ['#LLM', '#RAG', '#LangChain', '#Embeddings', '#FastAPI'],
        serviceType: 'Conversational AI Development',
        serviceTypeAr: 'تطوير الذكاء الاصطناعي التفاعلي',
        serviceSchemaDescription:
            'Intelligent chatbots and conversational AI using large language models and retrieval-augmented generation.',
        serviceSchemaDescriptionAr:
            'روبوتات دردشة ذكية وذكاء اصطناعي تفاعلي باستخدام النماذج اللغوية الكبيرة وتوليد الاسترجاع المعزز (RAG).',
        breadcrumbLabel: 'Conversational AI & chatbots',
        breadcrumbLabelAr: 'الذكاء الاصطناعي التفاعلي والدردشة',
        sections: [
            {
                heading: 'Support and internal Q&A',
                headingAr: 'الدعم والأسئلة الشائعة الداخلية',
                body:
                    'Customer-facing resolution flows, order and account lookup, and internal assistants over wikis, PDFs, and tickets — with source citations and permission-aware retrieval.',
                bodyAr:
                    'تدفقات حل مشاكل العملاء، الاستعلام عن الحساب والطلبات، والمساعدون الداخليون للبحث في مستندات الويكي وملفات PDF والتذاكر — مع الاستشهاد بالمصادر واسترجاع متوافق مع الصلاحيات والأذونات.',
            },
            {
                heading: 'Safety and control',
                headingAr: 'الأمان والتحكم',
                body:
                    'Prompt boundaries, PII handling, content policies, human handoff rules, and regression tests on real conversation samples.',
                bodyAr:
                    'حدود التوجيه الذكي، معالجة معلومات الهوية الشخصية (PII)، سياسات المحتوى، قواعد التمرير البشري، واختبارات التراجع على عينات محادثات حقيقية.',
            },
            {
                heading: 'Integration footprint',
                headingAr: 'التكامل والتوافق',
                body:
                    'Zendesk, Intercom, Slack, Teams, or your own widget — authenticated users, webhooks, and analytics on deflection and CSAT.',
                bodyAr:
                    'منصات Zendesk أو Intercom أو Slack أو Teams أو واجهتك المخصصة — مستخدمون موثقون، خطاطيف ويب، وتحليلات حول التذاكر التي تم حلها تلقائياً ورضا العملاء (CSAT).',
            },
        ],
        related: [
            { label: 'AI product development', labelAr: 'تطوير منتجات الذكاء الاصطناعي', path: '/services/ai-product-development' },
            { label: 'AI automation & workflows', labelAr: 'أتمتة الذكاء الاصطناعي وتدفقات العمل', path: '/services/ai-automation-workflow-intelligence' },
        ],
        caseStudies: [{ label: 'AI customer support agent', labelAr: 'وكيل دعم العملاء بالذكاء الاصطناعي', path: '/portfolio/ai-customer-support-agent' }],
    },

    'ui-ux-product-design': {
        slug: 'ui-ux-product-design',
        title: 'UI/UX & Product Design — Corematrix',
        titleAr: 'تصميم واجهة المستخدم وتجربة المستخدم وتصميم المنتجات — Corematrix',
        description:
            'Research-backed UX, Figma systems, and dev-ready handoff — accessible, consistent interfaces for web and mobile products.',
        descriptionAr:
            'تجربة مستخدم مدعومة بالأبحاث، أنظمة Figma، وتسليم جاهز للمطورين — واجهات سهلة الوصول ومتسقة لتطبيقات الويب والهواتف المحمولة.',
        canonicalPath: '/services/ui-ux-product-design',
        h1: 'UI/UX Design & Product Design',
        h1Ar: 'تصميم واجهة وتجربة المستخدم وتصميم المنتجات',
        badge: 'Design',
        badgeAr: 'التصميم',
        intro:
            'We design flows people finish: IA, wireframes, high-fidelity UI, and component libraries aligned to your engineering stack so implementation stays fast and on-brand.',
        introAr:
            'نصمم تدفقات يكملها المستخدمون بنجاح: بنية المعلومات، المخططات الهيكلية، الواجهات عالية الجودة، ومكتبات المكونات المتوافقة مع البنية البرمجية لفريقك لتسريع التنفيذ.',
        stackTags: ['#Figma', '#DesignSystem', '#UXResearch', '#Accessibility', '#WCAG'],
        serviceType: 'UX Design Service',
        serviceTypeAr: 'خدمات تصميم تجربة المستخدم',
        serviceSchemaDescription:
            'User experience design, interface design, design systems, and accessibility for digital products.',
        serviceSchemaDescriptionAr:
            'تصميم تجربة المستخدم، تصميم الواجهات، أنظمة التصميم، وإمكانية الوصول للمنتجات الرقمية.',
        breadcrumbLabel: 'UI/UX & product design',
        breadcrumbLabelAr: 'تصميم الواجهات وتجربة المستخدم',
        sections: [
            {
                heading: 'Discovery and validation',
                headingAr: 'الاكتشاف والتحقق',
                body:
                    'Interviews, journey maps, and usability tests on prototypes — so we solve the right problem before pixels multiply.',
                bodyAr:
                    'المقابلات، خرائط رحلة المستخدم، واختبارات القابلية للاستخدام على النماذج الأولية — حتى نضمن حل المشكلة الصحيحة قبل كتابة السطور البرمجية الأولى.',
            },
            {
                heading: 'Systems, not one-offs',
                headingAr: 'أنظمة متكاملة وليست حلولاً منفردة',
                body:
                    'Tokens, components, and documentation that match React / Next.js patterns your team already uses — reducing rework between design and code.',
                bodyAr:
                    'المتغيرات (Tokens)، المكونات، والتوثيق الذي يطابق أنماط React / Next.js التي يستخدمها فريقك بالفعل — مما يقلل من إعادة العمل بين التصميم والتطوير.',
            },
            {
                heading: 'Inclusive by default',
                headingAr: 'شاملة وسهلة الوصول افتراضياً',
                body:
                    'Contrast, focus, keyboard paths, and semantic structure baked in — not patched as an afterthought before launch.',
                bodyAr:
                    'التباين، التركيز البصري، مسارات لوحة المفاتيح، والتركيبة الهيكلية الدلالية المدمجة في التصميم — وليس كإضافات ترقيعية متأخرة قبل الإطلاق.',
            },
        ],
        related: [
            { label: 'Web application development', labelAr: 'تطوير تطبيقات الويب المخصصة', path: '/services/custom-web-application-development' },
            { label: 'Mobile app development', labelAr: 'تطوير تطبيقات الهاتف المحمول', path: '/services/mobile-app-development' },
        ],
        caseStudies: [{ label: 'Adaptive learning platform', labelAr: 'منصة التعلم التكيفي المخصصة', path: '/portfolio/adaptive-learning-platform' }],
    },

    'api-development-system-integrations': {
        slug: 'api-development-system-integrations',
        title: 'API Development & System Integrations — Corematrix',
        titleAr: 'تطوير واجهات البرمجيات وتكامل الأنظمة — Corematrix',
        description:
            'REST, GraphQL, and event-driven APIs — Stripe, Salesforce, HubSpot, and custom microservices with docs, auth, and reliability patterns.',
        descriptionAr:
            'واجهات برمجة تطبيقات REST و GraphQL والأنظمة المعتمدة على الأحداث — Stripe و Salesforce و HubSpot والخدمات المصغرة المخصصة مع التوثيق والمصادقة والموثوقية.',
        canonicalPath: '/services/api-development-system-integrations',
        h1: 'API Development & System Integrations',
        h1Ar: 'تطوير واجهات البرمجيات وتكامل الأنظمة',
        badge: 'APIs & integrations',
        badgeAr: 'الواجهات والتكامل',
        intro:
            'We connect your product to the rest of the stack: stable contracts, versioning, retries, and observability — so partners and internal teams integrate without fire drills.',
        introAr:
            'نربط منتجك ببقية البنية البرمجية للمؤسسة: عقود مستقرة، إصدارات محددة، تكرار المحاولة تلقائياً، ومراقبة شاملة — ليدمج الشركاء والفرق الداخلية دون أي مشاكل مفاجئة.',
        stackTags: ['#REST', '#GraphQL', '#tRPC', '#Webhooks', '#Node.js'],
        serviceType: 'API Development Service',
        serviceTypeAr: 'خدمات تطوير واجهات البرمجيات APIs',
        serviceSchemaDescription:
            'Custom API development, system integration, and microservices for business software.',
        serviceSchemaDescriptionAr:
            'تطوير واجهات برمجية مخصصة، تكامل الأنظمة، والخدمات المصغرة لبرمجيات الأعمال.',
        breadcrumbLabel: 'APIs & integrations',
        breadcrumbLabelAr: 'الواجهات وتكامل الأنظمة',
        sections: [
            {
                heading: 'Design-first contracts',
                headingAr: 'عقود تركز على التصميم أولاً',
                body:
                    'OpenAPI or schema-first GraphQL, error models, pagination, and idempotency — documented for humans and generated clients where useful.',
                bodyAr:
                    'تنسيقات OpenAPI أو GraphQL القائمة على المخطط، نماذج الأخطاء، تقسيم الصفحات، وضمان عدم تكرار العمليات — موثقة للبشر مع توليد العملاء البرمجيين عند الحاجة.',
            },
            {
                heading: 'SaaS and enterprise connectors',
                headingAr: 'روابط منصات SaaS والمؤسسات',
                body:
                    'Billing, CRM, marketing, identity, and warehouse sync — with OAuth, scoped credentials, and audit-friendly logging.',
                bodyAr:
                    'الفوترة، إدارة علاقات العملاء CRM، التسويق، الهوية، ومزامنة مستودعات البيانات — مع بروتوكول المصادقة المفتوحة OAuth، والصلاحيات المحدودة، والتسجيل المتوافق مع التدقيق.',
            },
            {
                heading: 'Operational maturity',
                headingAr: 'النضج العملياتي والتشغيلي',
                body:
                    'Rate limits, circuit breakers, tracing, and on-call runbooks — because integrations fail at 2 a.m., not in demos.',
                bodyAr:
                    'تحديد معدلات الطلب، قواطع التيار البرمجية لمنع التكديس، تتبع المسارات، وكتيبات التشغيل للطوارئ — لأن الأنظمة قد تفشل في منتصف الليل وليس أثناء العروض التوضيحية.',
            },
        ],
        related: [
            { label: 'Web application development', labelAr: 'تطوير تطبيقات الويب المخصصة', path: '/services/custom-web-application-development' },
            { label: 'SaaS platform development', labelAr: 'تطوير منصات SaaS', path: '/services/saas-platform-development' },
            { label: 'DevOps & infrastructure', labelAr: 'العمليات السحابية والبنية التحتية', path: '/services/devops-security-infrastructure' },
        ],
        caseStudies: [{ label: 'SaaS analytics platform', labelAr: 'منصة تحليلات البرمجيات كخدمة (SaaS)', path: '/portfolio/saas-analytics-platform' }],
    },

    'ecommerce-marketplace-development': {
        slug: 'ecommerce-marketplace-development',
        title: 'eCommerce & Marketplace Development — Corematrix',
        titleAr: 'تطوير التجارة الإلكترونية والمنصات التفاعلية — Corematrix',
        description:
            'Headless commerce, custom checkout, multi-vendor marketplaces, and Stripe-backed subscriptions — tuned for conversion and ops.',
        descriptionAr:
            'تجارة إلكترونية مفصولة (Headless)، إتمام دفع مخصص، منصات تفاعلية متعددة البائعين، واشتراكات مدعومة بـ Stripe — محسنة للتحويل والعمليات.',
        canonicalPath: '/services/ecommerce-marketplace-development',
        h1: 'eCommerce & Marketplace Development',
        h1Ar: 'تطوير التجارة الإلكترونية والمنصات التفاعلية',
        badge: 'Commerce',
        badgeAr: 'التجارة الإلكترونية',
        intro:
            'We build storefronts and seller tools that scale: catalog, inventory, payouts, disputes, and admin dashboards — without locking you into a template that breaks at volume.',
        introAr:
            'نبني واجهات متاجر وأدوات بائعين تتوسع بمرونة: الكتالوج، المخزون، المدفوعات، النزاعات، ولوحات التحكم الإدارية — دون تقييدك بقالب برمجى يتوقف عن العمل مع تزايد المبيعات.',
        stackTags: ['#Next.js', '#Stripe', '#Headless', '#Marketplace'],
        serviceType: 'eCommerce Development',
        serviceTypeAr: 'تطوير التجارة الإلكترونية',
        serviceSchemaDescription:
            'Custom eCommerce and marketplace platform development with modern web technology.',
        serviceSchemaDescriptionAr:
            'تطوير مخصص للتجارة الإلكترونية والمنصات التفاعلية المتعددة البائعين باستخدام تقنيات الويب الحديثة.',
        breadcrumbLabel: 'eCommerce & marketplaces',
        breadcrumbLabelAr: 'التجارة الإلكترونية والأسواق الرقمية',
        sections: [
            {
                heading: 'Headless and composable',
                headingAr: 'منفصل وقابل للتشكيل (Headless)',
                body:
                    'Next.js frontends with Stripe, CMS, and PIM integrations — fast PDPs, SEO-friendly listings, and cart flows tuned for your funnel.',
                bodyAr:
                    'واجهات أمامية بـ Next.js مع تكاملات Stripe ونظام إدارة المحتوى (CMS) ونظام إدارة معلومات المنتجات (PIM) — صفحات منتجات سريعة للغاية وتوافق كامل مع محركات البحث.',
            },
            {
                heading: 'Marketplace mechanics',
                headingAr: 'آليات عمل الأسواق الرقمية',
                body:
                    'Vendor onboarding, commissions, payouts, moderation, and dispute workflows — with roles and reporting for operators.',
                bodyAr:
                    'تهيئة البائعين الجدد، العمولات، دفع المستحقات، الإشراف، وتدفقات النزاعات والشكاوى — مع أدوار وتقارير مخصصة لمديري المنصة.',
            },
            {
                heading: 'Growth hooks',
                headingAr: 'ميزات تعزيز النمو والتحليلات',
                body:
                    'Recommendations, bundles, and experiments when you are ready — instrumented so merchandising decisions are data-backed.',
                bodyAr:
                    'التوصيات الذكية، حزم المنتجات، والتجارب واختبارات A/B عندما تصبح جاهزاً — مجهزة بالكامل لتكون قرارات البيع معتمدة على البيانات.',
            },
        ],
        related: [
            { label: 'Web application development', labelAr: 'تطوير تطبيقات الويب المخصصة', path: '/services/custom-web-application-development' },
            { label: 'Performance & cloud', labelAr: 'هندسة الأداء والتحول السحابي', path: '/services/performance-engineering-cloud-migration' },
        ],
    },

    'performance-engineering-cloud-migration': {
        slug: 'performance-engineering-cloud-migration',
        title: 'Performance Engineering & Cloud Migration — Corematrix',
        titleAr: 'هندسة الأداء والتحول السحابي — Corematrix',
        description:
            'Audits, refactors, and cloud-native migrations on AWS and GCP — faster apps, lower cost, and runbooks your team can own.',
        descriptionAr:
            'مراجعة الأكواد، وإعادة هيكلتها، وعمليات الهجرة السحابية الأصلية على AWS و GCP — تطبيقات أسرع، تكاليف أقل، وكتيبات تشغيل يمتلكها فريقك.',
        canonicalPath: '/services/performance-engineering-cloud-migration',
        h1: 'Performance Engineering & Cloud Migration',
        h1Ar: 'هندسة الأداء والتحول السحابي',
        badge: 'Platform',
        badgeAr: 'المنصة والأنظمة السحابية',
        intro:
            'We find what actually hurts latency and cost — then fix it with caching, query and bundle work, containers, and IaC — without a big-bang rewrite unless you need one.',
        introAr:
            'نحدد المشكلات التي تؤثر فعلياً على سرعة الاستجابة والتكلفة — ثم نصلحها بالذاكرة المؤقتة، وتحسين الاستعلامات والملفات، والحاويات، والبنية التحتية ككود (IaC) — دون إعادة كتابة كل شيء من الصفر إلا إذا كنت تحتاج لذلك.',
        stackTags: ['#AWS', '#GCP', '#Docker', '#K8s', '#Terraform'],
        serviceType: 'Cloud Migration Service',
        serviceTypeAr: 'خدمات التحول السحابي',
        serviceSchemaDescription:
            'Application performance optimization, cloud migration, and infrastructure modernization.',
        serviceSchemaDescriptionAr:
            'تحسين أداء التطبيقات، الهجرة والتحول السحابي، وتحديث البنية التحتية.',
        breadcrumbLabel: 'Performance & cloud migration',
        breadcrumbLabelAr: 'الأداء والتحول السحابي',
        sections: [
            {
                heading: 'Evidence-based tuning',
                headingAr: 'ضبط مبني على الأدلة والبراهين',
                body:
                    'Real user metrics, traces, and load tests — prioritized backlog so the first fixes pay for the engagement.',
                bodyAr:
                    'قياسات تفاعل المستخدم الحقيقية، تتبع المسارات الفني، واختبارات تحمل الضغط — مع قائمة أولويات تضمن سداد تكلفة العمل من أولى عمليات الإصلاح.',
            },
            {
                heading: 'Migration paths',
                headingAr: 'مسارات التحول والهجرة',
                body:
                    'Lift-and-shift when deadlines demand it, strangler patterns when you want zero-downtime cutovers, and greenfield services when legacy cannot keep up.',
                bodyAr:
                    'التحويل المباشر السريع عندما تضغط المواعيد النهائية، أو أنماط الاستبدال التدريجي لضمان عدم توقف الخدمة ثانية واحدة، أو بناء خدمات جديدة تماماً عندما لا تفي الأنظمة القديمة بالغرض.',
            },
            {
                heading: 'Cost and reliability',
                headingAr: 'التكلفة والموثوقية المستدامة',
                body:
                    'Right-sized compute, autoscaling, backups, and alerting — with Terraform or your chosen IaC so changes are reviewable.',
                bodyAr:
                    'حجم معالجة مناسب، توسع تلقائي مرن، نسخ احتياطية، وتنبيهات مستمرة — مع أدوات Terraform لتكون كافة التغييرات قابلة للمراجعة البرمجية.',
            },
        ],
        related: [
            { label: 'DevOps & infrastructure', labelAr: 'العمليات السحابية والبنية التحتية', path: '/services/devops-security-infrastructure' },
            { label: 'Web application development', labelAr: 'تطوير تطبيقات الويب المخصصة', path: '/services/custom-web-application-development' },
        ],
        caseStudies: [{ label: 'Enterprise internal ops platform', labelAr: 'منصة العمليات الداخلية للمؤسسات', path: '/portfolio/enterprise-internal-ops-platform' }],
    },

    'enterprise-software-development': {
        slug: 'enterprise-software-development',
        title: 'Enterprise Software Development — Corematrix',
        titleAr: 'تطوير برمجيات المؤسسات — Corematrix',
        description:
            'Mission-critical internal platforms, ERP extensions, and integrations with SAP, Salesforce, and Microsoft — SSO, audit, and long maintainability.',
        descriptionAr:
            'منصات داخلية حيوية، وتمديدات أنظمة تخطيط موارد المؤسسات (ERP)، والتكامل مع SAP و Salesforce و Microsoft — تسجيل دخول موحد (SSO)، وتدقيق، وصيانة طويلة المدى.',
        canonicalPath: '/services/enterprise-software-development',
        h1: 'Enterprise Software Development',
        h1Ar: 'تطوير برمجيات ونظم المؤسسات',
        badge: 'Enterprise',
        badgeAr: 'المؤسسات والشركات الكبرى',
        intro:
            'We build software that procurement and IT can stand behind: RBAC, SSO, audit logs, and documentation that survives team turnover.',
        introAr:
            'نبني برمجيات تقف وراءها أقسام المشتريات وتكنولوجيا المعلومات بثقة: صلاحيات دقيقة، تسجيل دخول موحد، سجلات تدقيق، وتوثيق ينجو من تغيرات وتدوير الفرق.',
        stackTags: ['#Enterprise', '#SSO', '#RBAC', '#ERP', '#Integrations'],
        serviceType: 'Enterprise Software Development',
        serviceTypeAr: 'تطوير البرمجيات للمؤسسات الكبرى',
        serviceSchemaDescription:
            'Custom enterprise software development including integrations with major ERP and CRM systems.',
        serviceSchemaDescriptionAr:
            'تطوير برمجيات مخصصة للمؤسسات بما في ذلك التكامل مع أنظمة ERP و CRM الرئيسية.',
        breadcrumbLabel: 'Enterprise software',
        breadcrumbLabelAr: 'برمجيات المؤسسات',
        sections: [
            {
                heading: 'Complex domains',
                headingAr: 'مجالات عمل معقدة',
                body:
                    'Workflow engines, approvals, reporting, and data platforms — modeled with stakeholders so edge cases are explicit, not surprises in UAT.',
                bodyAr:
                    'محركات تدفق العمل، الموافقات، التقارير، ومنصات البيانات — تتم نمذجتها مع أصحاب المصلحة لتكون الحالات الاستثنائية واضحة ومحددة سلفاً.',
            },
            {
                heading: 'Identity and compliance',
                headingAr: 'الهوية والامتثال التنظيمي',
                body:
                    'SAML/OIDC, directory sync, least-privilege roles, and retention policies aligned to your security review.',
                bodyAr:
                    'بروتوكولات SAML/OIDC، مزامنة الأدلة النشطة، أدوار الحد الأدنى من الصلاحيات، وسياسات الاحتفاظ بالبيانات المتوافقة تماماً مع مراجعاتك الأمنية.',
            },
            {
                heading: 'Roadmap with you',
                headingAr: 'خريطة طريق تشاركك النجاح',
                body:
                    'Phased delivery, change management, and training — so adoption follows launch instead of fighting it.',
                bodyAr:
                    'التسليم على مراحل مدروسة، إدارة التغيير، والتدريب الفعال — لكي يتبع تبني واستخدام النظام مرحلة إطلاقه دون مقاومة من فرق العمل.',
            },
        ],
        related: [
            { label: 'SaaS platform development', labelAr: 'تطوير منصات SaaS', path: '/services/saas-platform-development' },
            { label: 'Dedicated development teams', labelAr: 'فرق التطوير المخصصة', path: '/services/dedicated-development-teams' },
        ],
        caseStudies: [{ label: 'Enterprise internal ops platform', labelAr: 'منصة العمليات الداخلية للمؤسسات', path: '/portfolio/enterprise-internal-ops-platform' }],
    },

    'devops-security-infrastructure': {
        slug: 'devops-security-infrastructure',
        title: 'DevOps, Security & Infrastructure — Corematrix',
        titleAr: 'العمليات السحابية والأمن والبنية التحتية — Corematrix',
        description:
            'CI/CD, Terraform, Kubernetes, scanning, and observability — ship faster with guardrails instead of heroics.',
        descriptionAr:
            'التكامل والنشر المستمر (CI/CD)، أدوات Terraform، نظام Kubernetes، الفحص الأمني، والمراقبة الفنية — شحن برمجيات أسرع بحواجز حماية بدلاً من البطولات الفردية.',
        canonicalPath: '/services/devops-security-infrastructure',
        h1: 'DevOps, Security & Infrastructure Engineering',
        h1Ar: 'هندسة العمليات السحابية والأمن والبنية التحتية',
        badge: 'DevOps',
        badgeAr: 'العمليات السحابية (DevOps)',
        intro:
            'We automate the path to production: pipelines, environments, secrets, and monitors — so releases are frequent and incidents are short.',
        introAr:
            'نؤتمت الطريق الكامل إلى الإنتاج: خطوط المعالجة، البيئات، إدارة الأسرار والمفاتيح، والمراقبين التقنيين — لتكون الإصدارات متكررة وسلسة والحوادث قصيرة ونادرة.',
        stackTags: ['#DevOps', '#Terraform', '#CI/CD', '#Kubernetes', '#Security'],
        serviceType: 'DevOps Consulting',
        serviceTypeAr: 'استشارات هندسة العمليات السحابية (DevOps)',
        serviceSchemaDescription:
            'DevOps engineering, cloud infrastructure, CI/CD pipelines, and security automation.',
        serviceSchemaDescriptionAr:
            'هندسة العمليات السحابية، البنية التحتية، خطوط معالجة CI/CD، وأتمتة الأمن والحماية.',
        breadcrumbLabel: 'DevOps & infrastructure',
        breadcrumbLabelAr: 'العمليات السحابية والبنية التحتية',
        sections: [
            {
                heading: 'Pipeline and environments',
                headingAr: 'خطوط المعالجة والبيئات',
                body:
                    'Build, test, deploy, and rollback — preview apps for PRs, promoted artifacts to prod, and secrets managers instead of env files in chat.',
                bodyAr:
                    'البناء، الاختبار، النشر، والتراجع التلقائي — تطبيقات معاينة وتجربة سريعة للطلبات البرمجية، وترقية الملفات للإنتاج، وإدارة الأسرار بطرق آمنة بدلاً من مشاركتها في غرف الدردشة.',
            },
            {
                heading: 'Security in the loop',
                headingAr: 'الأمن المدمج في العمليات',
                body:
                    'Dependency and container scanning, IaC policy checks, and least-privilege IAM — wired so failures block deploys that would fail audit.',
                bodyAr:
                    'الفحص الدوري للملفات والحاويات البرمجية، التحقق من سياسات البنية التحتية ككود (IaC)، وإدارة صلاحيات الهوية والأذونات بالحد الأدنى المطلوب لمنع أي نفاذ غير مصرح به.',
            },
            {
                heading: 'Operations you can see',
                headingAr: 'عمليات تشغيلية بوضوح تام',
                body:
                    'Dashboards, SLOs, paging, and postmortems — on-call that is boring because the system tells you what broke and why.',
                bodyAr:
                    'لوحات القيادة والمؤشرات، أهداف مستوى الخدمة (SLOs)، أنظمة استدعاء الطوارئ الفنية، وتحليلات ما بعد الأعطال — ليكون الاستدعاء الطارئ نادراً وواضح السبب والحل.',
            },
        ],
        related: [
            { label: 'Performance & cloud migration', labelAr: 'هندسة الأداء والتحول السحابي', path: '/services/performance-engineering-cloud-migration' },
            { label: 'SaaS platform development', labelAr: 'تطوير منصات SaaS', path: '/services/saas-platform-development' },
        ],
        caseStudies: [{ label: 'SaaS analytics platform', labelAr: 'منصة تحليلات البرمجيات كخدمة (SaaS)', path: '/portfolio/saas-analytics-platform' }],
    },

    'staff-augmentation-specialists': {
        slug: 'staff-augmentation-specialists',
        title: 'Staff Augmentation & Specialist Contractors — Corematrix',
        titleAr: 'تعزيز الكوادر البرمجية والمقاولين المتخصصين — Corematrix',
        description:
            'Senior Next.js, AI/ML, and DevOps specialists embedded fast — flexible contracts, no recruiting drag, quality bar matches our product teams.',
        descriptionAr:
            'أخصائيون ومطورون كبار في Next.js والذكاء الاصطناعي/التعلم الآلي والعمليات السحابية يتم دمجهم سريعاً — عقود مرنة، بدون أعباء التوظيف، وبمستوى جودة يطابق فرق التطوير لدينا.',
        canonicalPath: '/services/staff-augmentation-specialists',
        h1: 'Staff Augmentation & Specialist Contractors',
        h1Ar: 'تعزيز الكوادر البرمجية والمقاولين المتخصصين',
        badge: 'Staffing',
        badgeAr: 'تعزيز الكوادر',
        intro:
            'When you need a narrow skill for a phase — not a permanent requisition — we place engineers who have already shipped similar systems and know how to work async.',
        introAr:
            'عندما تحتاج إلى مهارة فنية دقيقة لمرحلة معينة من مشروعك — دون التزام دائم بالتوظيف — نوفر لك مهندسين قاموا بالفعل بشحن أنظمة مماثلة ويعرفون كيفية العمل عن بعد بشكل ممتاز.',
        stackTags: ['#StaffAugmentation', '#Next.js', '#AI', '#DevOps'],
        serviceType: 'IT Staff Augmentation',
        serviceTypeAr: 'تعزيز الكوادر وتوفير المتخصصين',
        serviceSchemaDescription:
            'Software engineering staff augmentation and specialist contractor placement.',
        serviceSchemaDescriptionAr:
            'تعزيز كوادر هندسة البرمجيات وتعيين المقاولين المتخصصين للمشاريع الفنية.',
        breadcrumbLabel: 'Staff augmentation',
        breadcrumbLabelAr: 'تعزيز الكوادر',
        sections: [
            {
                heading: 'Roles we place',
                headingAr: 'الأدوار التي نوفرها',
                body:
                    'Full-stack and frontend leads, LLM and ML engineers, platform and SRE, and tech leads for short-staffed squads.',
                bodyAr:
                    'قادة التطوير للواجهات الأمامية والتطبيقات الكاملة، مهندسو النماذج اللغوية الكبيرة والتعلم الآلي، مهندسو البنية التحتية السحابية والعمليات، والمهندسون التقنيون للفرق سريعة النمو.',
            },
            {
                heading: 'How engagement works',
                headingAr: 'كيف تسير فترة التعاقد',
                body:
                    'Time-and-materials or monthly blocks, your tools and ceremonies, and clear output metrics — with optional Corematrix oversight if you want a safety net.',
                bodyAr:
                    'مبنية على الوقت والمواد أو كتل تعاقدية شهرية مرنة، العمل مباشرة بأدواتك واجتماعاتك، ومقاييس إنتاجية واضحة — مع إشراف إضافي اختياري من Corematrix كشبكة أمان.',
            },
            {
                heading: 'When it makes sense',
                headingAr: 'متى يكون هذا الخيار مثالياً',
                body:
                    'Launch crunch, skill gaps, parental leave coverage, or a bet you are not ready to hire FTE for — we stay flexible as scope shifts.',
                bodyAr:
                    'أوقات ضغط الإطلاق، الفجوات المهارية المفاجئة، تغطية إجازات الموظفين، أو اختبار فكرة جديدة لست مستعداً بعد لتوظيف فريق دائم لها — نبقى مرنين مع تغير النطاق.',
            },
        ],
        related: [
            { label: 'Dedicated development teams', labelAr: 'فرق التطوير المخصصة', path: '/services/dedicated-development-teams' },
            { label: 'Offshore development centre', labelAr: 'مركز التطوير الخارجي المخصص', path: '/services/offshore-development-centre' },
        ],
        caseStudies: [{ label: 'Browse portfolio', labelAr: 'تصفح معرض أعمالنا', path: '/portfolio' }],
    },

    'offshore-development-centre': {
        slug: 'offshore-development-centre',
        title: 'Offshore Development Centre (ODC) — Corematrix',
        titleAr: 'مركز التطوير الخارجي المخصص (ODC) — Corematrix',
        description:
            'Scale 10–50+ engineers with one partner: governance, security, and delivery standards aligned to how serious product orgs actually work.',
        descriptionAr:
            'توسيع طاقتك الهندسية بـ 10 إلى 50+ مهندس مع شريك واحد: حوكمة، أمن، ومعايير تسليم تتوافق تماماً مع كيفية عمل أرقى المؤسسات التقنية.',
        canonicalPath: '/services/offshore-development-centre',
        h1: 'Offshore Development Centre (ODC)',
        h1Ar: 'مركز التطوير الخارجي المخصص (ODC)',
        badge: 'Scale',
        badgeAr: 'التوسع',
        intro:
            'We stand up a dedicated engineering cell under Corematrix — not anonymous bodies — with shared tooling, code quality bars, and leadership that reports in your timezone.',
        introAr:
            'نقوم بإنشاء وتجهيز وحدة هندسية مخصصة بالكامل تحت مظلة وإشراف Corematrix — وليس مجرد مطورين مجهولين — مع أدوات عمل مشتركة، وجودة أكواد ممتازة، وقيادة تتصل مباشرة في منطقتك الزمنية.',
        stackTags: ['#ODC', '#Offshore', '#Scale', '#DedicatedTeam'],
        serviceType: 'Offshore Software Development',
        serviceTypeAr: 'خدمات مركز التطوير الخارجي ODC',
        serviceSchemaDescription:
            'Offshore development centre and scaled engineering team services for enterprises.',
        serviceSchemaDescriptionAr:
            'مركز تطوير خارجي مخصص وخدمات فرق هندسية مجهزة بالكامل للمؤسسات والشركات الكبرى.',
        breadcrumbLabel: 'Offshore development centre',
        breadcrumbLabelAr: 'مركز التطوير الخارجي',
        sections: [
            {
                heading: 'Structure',
                headingAr: 'الهيكل والتركيبة الفنية',
                body:
                    'Pods with leads, shared platform practices, and hiring profiles matched to your stack — AI, web, mobile, and cloud under one umbrella.',
                bodyAr:
                    'وحدات عمل برمجية مع قادة فنيين، وممارسات بنية تحتية مشتركة، وملفات توظيف مطابقة تماماً لتقنياتك — الذكاء الاصطناعي، الويب، الهاتف المحمول، والسحابية تحت سقف واحد.',
            },
            {
                heading: 'Transparency',
                headingAr: 'الشفافية والوضوح التام',
                body:
                    'Shared boards, sprint reviews, and engineering metrics you can compare to in-house teams — no black-box outsourcing.',
                bodyAr:
                    'لوحات عمل مشتركة، مراجعات دورية متكررة للسبيرنت، ومقاييس هندسية دقيقة يمكنك مقارنتها مباشرة بالفرق الداخلية لديك — لا غموض ولا تعتيم.',
            },
            {
                heading: 'Commercial models',
                headingAr: 'النماذج التجارية والتعاقدية',
                body:
                    'Capacity-based or outcome-oriented agreements — structured so growth in headcount does not mean growth in chaos.',
                bodyAr:
                    'اتفاقيات قائمة على السعة والقدرة الإنتاجية أو موجهة نحو نتائج محددة مسبقاً — مصممة بعناية لكي لا يعني نمو عدد المطورين نمواً في الفوضى والاضطراب.',
            },
        ],
        related: [
            { label: 'Dedicated development teams', labelAr: 'فرق التطوير المخصصة', path: '/services/dedicated-development-teams' },
            { label: 'Staff augmentation', labelAr: 'تعزيز الكوادر البرمجية', path: '/services/staff-augmentation-specialists' },
        ],
        caseStudies: [{ label: 'Browse portfolio', labelAr: 'تصفح معرض أعمالنا', path: '/portfolio' }],
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
