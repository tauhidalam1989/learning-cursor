const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const slugify = (s) =>
  s
    .toString()
    .toLowerCase()
    .replace(/[’'"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const posts = [
  {
    title: 'How IT Consultancy Drives Digital Transformation for Modern Businesses',
    excerpt:
      'Digital transformation is essential for growth. Learn how IT consultancy helps businesses modernize operations and stay competitive.',
    seoTitle:
      'How IT Consultancy Drives Digital Transformation | IT Consulting Guide 2026',
    seoDescription:
      'Discover how IT consultancy accelerates digital transformation, improves efficiency, and helps modern businesses scale with modern technology.',
    content:
      '## Introduction\n\nDigital transformation is no longer optional for modern businesses. Organizations that fail to evolve risk falling behind competitors who leverage technology for efficiency and innovation. IT consultancy acts as a strategic partner in guiding businesses through this transformation.\n\n## Aligning Technology with Business Strategy\n\nMany companies adopt technology without a clear roadmap. IT consultants evaluate goals, workflows, and growth plans to design solutions that directly support business objectives. This alignment ensures investments deliver measurable ROI rather than unnecessary complexity.\n\n## Modernizing Infrastructure\n\nLegacy systems limit scalability and performance. Consultants help organizations migrate to cloud platforms, upgrade infrastructure, and implement scalable architectures. Modern infrastructure improves agility and reduces operational costs.\n\n## Automation and Efficiency\n\nAutomation eliminates repetitive tasks and streamlines workflows. IT consultants implement tools that integrate systems and reduce human error. Teams gain more time to focus on strategic initiatives.\n\n## Cybersecurity and Compliance\n\nDigital expansion increases security risks. Consultants implement proactive cybersecurity frameworks, regular audits, and compliance strategies to protect sensitive data and maintain trust.\n\n## Driving Innovation\n\nEmerging technologies such as AI and analytics unlock new opportunities. Consultants help businesses experiment responsibly and implement innovation with minimal disruption.\n\n## Conclusion\n\nDigital transformation is an ongoing journey. With expert IT consultancy, organizations gain the guidance and expertise needed to evolve confidently and sustainably.',
  },
  {
    title: 'Top 7 IT Challenges Companies Face — and How to Solve Them',
    excerpt: 'Businesses face growing IT challenges. Discover practical solutions from expert consultants.',
    seoTitle: 'Top IT Challenges Companies Face and How to Solve Them | 2026 Guide',
    seoDescription:
      'Explore the biggest IT challenges businesses face and expert solutions to improve security, scalability, and efficiency.',
    content:
      '## Introduction\n\nTechnology drives modern business, yet organizations face persistent IT challenges that limit growth. Understanding these issues is the first step toward solving them.\n\n## 1. Cybersecurity Threats\n\nRising cyberattacks require layered security, employee training, and monitoring systems.\n\n## 2. Legacy Infrastructure\n\nOutdated systems reduce efficiency. Cloud migration improves speed and flexibility.\n\n## 3. Data Management\n\nDisorganized data leads to poor decisions. Structured governance improves insights.\n\n## 4. Integration Issues\n\nDisconnected tools create inefficiencies. API integrations centralize workflows.\n\n## 5. Scalability\n\nGrowth requires flexible infrastructure. Cloud platforms allow seamless expansion.\n\n## 6. Skill Gaps\n\nConsultants fill expertise gaps and provide specialized knowledge.\n\n## 7. Compliance\n\nRegulatory requirements demand structured frameworks and audits.\n\n## Conclusion\n\nAddressing these challenges strategically turns IT into a competitive advantage.',
  },
  {
    title: 'Why Every Growing Business Needs an IT Consulting Partner in 2026',
    excerpt: 'Growing businesses require expert IT guidance to scale efficiently and securely.',
    seoTitle: 'Why Growing Businesses Need IT Consulting Partners in 2026',
    seoDescription:
      'Learn why IT consulting partners are essential for business growth, innovation, and cybersecurity in 2026.',
    content:
      '## Introduction\n\nIn 2026, rapid technological evolution demands expert guidance. Businesses without strategic IT support risk inefficiency.\n\n## Strategic Planning\n\nConsultants align technology investments with long-term growth goals.\n\n## Faster Innovation\n\nExpert support accelerates adoption of emerging technologies.\n\n## Cybersecurity Protection\n\nProactive defenses protect businesses from threats.\n\n## Scalability\n\nFlexible infrastructure supports expansion.\n\n## Conclusion\n\nAn IT consulting partner becomes a long-term asset for sustainable success.',
  },
  {
    title: 'From Strategy to Execution: The Role of IT Consultants in Business Success',
    excerpt: 'IT consultants transform strategic visions into practical execution.',
    seoTitle: 'Role of IT Consultants in Business Success | Strategy to Execution',
    seoDescription:
      'Discover how IT consultants bridge strategy and execution to deliver measurable business success.',
    content:
      '## Introduction\n\nExecution determines success. IT consultants convert plans into action.\n\n## Analysis and Planning\n\nConsultants evaluate processes and design roadmaps.\n\n## Implementation\n\nProject management ensures alignment and efficiency.\n\n## Monitoring\n\nContinuous optimization guarantees performance.\n\n## Conclusion\n\nConsultants transform strategy into measurable outcomes.',
  },
  {
    title: 'Cloud, AI, and Automation: Key Trends Shaping the Future of IT Consulting',
    excerpt: 'Emerging technologies are redefining IT consulting services.',
    seoTitle: 'Cloud, AI and Automation Trends in IT Consulting | Future Guide',
    seoDescription:
      'Explore how cloud computing, AI, and automation shape the future of IT consulting and business innovation.',
    content:
      '## Introduction\n\nTechnology trends reshape consulting services.\n\n## Cloud Computing\n\nScalable infrastructure drives flexibility.\n\n## Artificial Intelligence\n\nAI improves analytics and decision-making.\n\n## Automation\n\nAutomation increases efficiency and reduces cost.\n\n## Conclusion\n\nBusinesses embracing these trends gain competitive advantage.',
  },
  {
    title: 'How to Choose the Right IT Consultancy Firm for Your Business',
    excerpt: 'Selecting the right IT consultancy ensures long-term success.',
    seoTitle: 'How to Choose the Right IT Consultancy Firm | Expert Guide',
    seoDescription:
      'Learn how to select the best IT consultancy firm for your business needs and long-term growth.',
    content:
      '## Introduction\n\nChoosing the right partner is critical.\n\n## Experience\n\nProven expertise ensures reliability.\n\n## Industry Knowledge\n\nSpecialized understanding improves results.\n\n## Communication\n\nStrong collaboration drives success.\n\n## Scalability\n\nPartners must grow with you.\n\n## Conclusion\n\nA strong consulting relationship creates lasting value.',
  },
  {
    title: 'Boosting Efficiency and Security with Expert IT Consulting Services',
    excerpt: 'Expert IT consulting improves efficiency and strengthens security.',
    seoTitle: 'Boost Efficiency and Security with IT Consulting Services',
    seoDescription:
      'Discover how IT consulting services enhance operational efficiency and cybersecurity for modern businesses.',
    content:
      '## Introduction\n\nEfficiency and security are business priorities.\n\n## Operational Optimization\n\nConsultants streamline workflows and automate tasks.\n\n## Security Frameworks\n\nAdvanced protection safeguards assets.\n\n## Continuous Monitoring\n\nRegular audits maintain resilience.\n\n## Conclusion\n\nCombining efficiency and security enables confident growth.',
  },
].map((p) => ({
  ...p,
  slug: slugify(p.title),
  status: 'PUBLISHED',
  publishedAt: new Date(),
}));

async function main() {
  for (const p of posts) {
    await prisma.blogPost.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        coverImage: p.imageSrc ?? null,
        seoTitle: p.seoTitle ?? null,
        seoDescription: p.seoDescription ?? null,
        status: p.status,
        publishedAt: p.publishedAt,
      },
      create: {
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        coverImage: p.imageSrc ?? null,
        seoTitle: p.seoTitle ?? null,
        seoDescription: p.seoDescription ?? null,
        status: p.status,
        publishedAt: p.publishedAt,
      },
    });
    console.log('Upserted', p.slug);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

