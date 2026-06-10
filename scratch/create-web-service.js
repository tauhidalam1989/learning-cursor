const http = require('http');

const adminCredentials = [
  { username: 'admin@corematrix.co', password: 'Admin@123' },
  { username: 'admin@corematrix.co', password: 'admin123' }
];

function request(url, options, bodyData = null) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const reqOptions = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
      path: parsedUrl.pathname,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (bodyData) {
      req.write(JSON.stringify(bodyData));
    }
    req.end();
  });
}

async function run() {
  let token = null;
  let loginError = null;

  // Try admin credentials one by one
  for (const creds of adminCredentials) {
    try {
      console.log(`Attempting backend login with ${creds.username}...`);
      const response = await request('http://localhost:5000/api/auth/login', { method: 'POST' }, creds);
      if (response && response.token) {
        token = response.token;
        console.log('Login successful! Obtained authorization token.');
        break;
      }
    } catch (err) {
      loginError = err;
    }
  }

  if (!token) {
    console.error('Failed to log in to the admin backend:', loginError ? loginError.message : 'Unknown error');
    process.exit(1);
  }

  // Build a highly detailed, professional service config
  const serviceData = {
    category: 'web',
    icon: 'fas fa-code',
    title_en: 'Web Application Development',
    title_ar: 'تطوير تطبيقات الويب المتقدمة',
    description_en: 'Modern, blazing-fast, and secure custom web application engineering with React, Next.js, and Node.js.',
    description_ar: 'هندسة تطبيقات ويب مخصصة حديثة وسريعة وآمنة للغاية باستخدام رياكت، ونكست جي إس، ونود جي إس.',
    linkLabel_en: 'Explore custom web apps',
    linkLabel_ar: 'استكشف تطبيقات الويب المخصصة',
    detailSlug: 'web-application-development',
    badge_en: 'Full-Stack Ecosystems',
    badge_ar: 'أنظمة متكاملة المطور',
    
    // HERO SECTION
    heroTitle: 'Bespoke Web Applications Built to Scale',
    heroTitleAr: 'تطبيقات ويب مخصصة مبنية للتوسع والسرعة',
    heroTagline: 'Web Engineering & Development',
    heroTaglineAr: 'هندسة وتطوير الويب',
    heroIntroduction: 'We design and construct high-performance, responsive web systems that power corporate operations with clean, premium code.',
    heroIntroductionAr: 'نحن نصمم ونشيد أنظمة ويب عالية الأداء ومتجاوبة بالكامل تدعم العمليات المؤسسية بأكواد برمجية نظيفة وفاخرة.',
    cardIcon: 'fas fa-code',
    isPublished: true,

    // ABOUT SECTION
    aboutSectionTitle: 'Headless, Secure & Scalable Architecture',
    aboutSectionTitleAr: 'بنية تحتية منفصلة الواجهة، آمنة وقابلة للتوسع',
    aboutSectionDescription: 'Corematrix engineers leverage microservices, cloud-native deployments, and bleeding-edge frontend stacks to build scalable web applications. We prioritize pixel-perfect designs, lightning-speed loading times, and resilient API routing.\n\nOur solutions fit perfectly into your IT environment and guarantee zero downtime.',
    aboutSectionDescriptionAr: 'يستفيد مهندسو كورماتريكس من الخدمات المصغرة، والعمليات السحابية الأصلية، ومجموعات الواجهة الأمامية الحديثة لبناء تطبيقات ويب مرنة. نضع الأولوية للتصاميم الدقيقة، وسرعة التحميل الخارقة، وتوجيه واجهات برمجة التطبيقات المرن.\n\nحلولنا تتناسب تماماً مع بيئة تقنية المعلومات الخاصة بك وتضمن استمرارية التشغيل الكاملة.',
    aboutSectionBottomNote: 'All systems undergo rigorous automated security checks prior to deployment.',
    aboutSectionBottomNoteAr: 'تخضع جميع الأنظمة لاختبارات أمان مؤتمتة صارمة قبل النشر النهائي.',

    // SOLUTIONS / CAPABILITIES
    capabilitiesSectionTitle: 'Full-Scale Web Capabilities',
    capabilitiesSectionTitleAr: 'قدرات تطوير الويب الشاملة',
    capabilities: JSON.stringify([
      {
        title_en: 'React & Next.js Systems',
        title_ar: 'أنظمة رياكت ونكست جي إس',
        description_en: 'State-of-the-art server components, dynamic rendering, and optimal search engine optimization.',
        description_en_ar: 'مكونات خادم متطورة، وتصيير ديناميكي، وتحسين فائق لمحركات البحث.',
        icon: 'fab fa-react'
      },
      {
        title_en: 'Headless E-Commerce Hubs',
        title_ar: 'مراكز التجارة الإلكترونية المنفصلة',
        description_en: 'Custom commerce layouts with Shopify, Stripe payments, and complex warehouse checkouts.',
        description_en_ar: 'مخططات تجارة مخصصة مع شوبيفاي، بوابات دفع سترايب، وإدارة الخروج المعقدة للمستودعات.',
        icon: 'fas fa-shopping-cart'
      },
      {
        title_en: 'Real-Time Enterprise Dashboards',
        title_ar: 'لوحات تحكم الشركات في الوقت الفعلي',
        description_en: 'Interactive charts, live web-sockets, and metered subscription metrics.',
        description_en_ar: 'مخططات تفاعلية، قنوات اتصال فورية بالويب، ومقاييس اشتراكات دقيقة.',
        icon: 'fas fa-chart-line'
      }
    ]),

    // ABOUT PILLARS
    aboutPillars: JSON.stringify([
      {
        title_en: 'Zero Lag Interfaces',
        title_ar: 'واجهات مستخدم فورية الاستجابة',
        description_en: 'Under 1.2s Core Web Vitals threshold.',
        description_ar: 'سرعة استجابة فائقة تحت حاجز 1.2 ثانية.'
      },
      {
        title_en: 'Enterprise-Grade Security',
        title_ar: 'أمان بمستويات مؤسسية',
        description_en: 'Integrated OAuth2, JWT, and encrypted database rows.',
        description_ar: 'دمج مصادقة OAuth2، ورموز JWT، وتشفير قواعد البيانات.'
      }
    ]),

    // WHY CHOOSE US
    whyChooseUsSectionTitle: 'Why Choose Corematrix for Web?',
    whyChooseUsSectionTitleAr: 'لماذا تختار كورماتريكس لتطوير الويب؟',
    whyChooseUsDescription: 'We do not build simple template websites. We engineer tailor-made high-performance software systems.',
    whyChooseUsDescriptionAr: 'نحن لا نبني مواقع إنترنت تقليدية قائمة على القوالب. بل نقوم بهندسة أنظمة برمجية مخصصة وعالية الأداء.',
    whyChooseUs: JSON.stringify([
      {
        title_en: 'Senior Engineering Only',
        title_ar: 'كبار المهندسين فقط',
        description_en: 'Every project is staffed exclusively with engineers who have 6+ years of experience.',
        description_ar: 'يتم تشكيل فريق كل مشروع حصرياً من مهندسين يمتلكون خبرة تزيد عن 6 سنوات.',
        icon: 'fas fa-user-shield'
      },
      {
        title_en: 'Rethought API Latencies',
        title_ar: 'تقليل زمن استجابة API',
        description_en: 'We optimize GraphQL query resolutions and Redis caching layer to guarantee sub-100ms APIs.',
        description_ar: 'نقوم بتحسين استعلامات GraphQL وطبقة تخزين راديس المؤقتة لضمان استجابة أقل من 100 مللي ثانية.',
        icon: 'fas fa-bolt'
      }
    ]),

    // CRITICAL WHY
    criticalSectionTitle: 'Why Scalable Custom Web Apps Matter?',
    criticalSectionTitleAr: 'لماذا تعد تطبيقات الويب المخصصة بالغة الأهمية؟',
    criticalSectionDescription: 'Generic page builder tools restrict growth, harm SEO, and expose security loopholes. Custom engineering is a long-term commercial investment.',
    criticalSectionDescriptionAr: 'أدوات بناء المواقع العامة تحد من النمو، وتضر بتحسين محركات البحث، وتكشف عن ثغرات أمنية. الهندسة المخصصة هي استثمار تجاري طويل الأجل.',
    criticalSectionButtonText: 'Get Started',
    criticalSectionButtonTextAr: 'ابدأ الآن',
    criticalRightTitle: 'Primary Anchors',
    criticalRightTitleAr: 'الركائز الأساسية',
    criticalCards: JSON.stringify([
      {
        title_en: 'Absolute Ownership',
        title_ar: 'ملكية مطلقة للكود',
        description_en: '100% intellectual property ownership. No software lock-ins.',
        description_ar: 'ملكية فكرية كاملة للأكواد بنسبة 100% بدون أي قيود برمجية.',
        icon: 'fas fa-lock'
      },
      {
        title_en: 'Infinite Flexibility',
        title_ar: 'مرونة لا نهائية',
        description_en: 'Integrate easily with ERPs, CRMs, and custom hardware APIs.',
        description_ar: 'تكامل سهل وسلس مع أنظمة ERP وCRM وواجهات برمجة الأجهزة المخصصة.',
        icon: 'fas fa-infinity'
      }
    ]),

    // FAQS
    faqs: JSON.stringify([
      {
        questionEn: 'Do you provide maintenance and updates after launch?',
        questionAr: 'هل تقدمون الدعم والصيانة والتحسينات بعد الإطلاق؟',
        answerEn: 'Yes, we offer flexible post-launch support SLA packages including active security patches and scaling adjustments.',
        answerAr: 'نعم، نحن نقدم باقات اتفاقية مستوى خدمة (SLA) مرنة للدعم بعد الإطلاق تشمل تحديثات الأمان النشطة وتوسعة الموارد.'
      },
      {
        questionEn: 'How long does a custom web application take to develop?',
        questionAr: 'كم من الوقت يستغرق تطوير تطبيق ويب مخصص؟',
        answerEn: 'Usually between 6 to 12 weeks depending on system features, API complexities, and visual custom pipelines.',
        answerAr: 'يتراوح عادة بين 6 إلى 12 أسبوعاً بناءً على ميزات النظام، وتعقيدات واجهات البرمجة، والواجهات البصرية المخصصة.'
      }
    ]),

    // TAGS
    tags_en: JSON.stringify(['React', 'Next.js', 'Node.js', 'Tailwind', 'PostgreSQL']),
    tags_ar: JSON.stringify(['رياكت', 'نكست جي إس', 'نود جي إس', 'تايلوند', 'بوستجريس'])
  };

  try {
    console.log('Sending request to create the dynamic service...');
    const result = await request('http://localhost:5000/api/services', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }, serviceData);
    
    console.log('----------------------------------------------------');
    console.log('SUCCESS: Service created successfully in the database!');
    console.log(`Title (EN): ${result.service.title_en}`);
    console.log(`Detail Slug: ${result.service.detailSlug}`);
    console.log('----------------------------------------------------');
  } catch (err) {
    console.error('Failed to create service:', err.message);
    process.exit(1);
  }
}

run();
