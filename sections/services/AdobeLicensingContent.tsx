'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { TwoColumnFaqSection } from '@/components/shared/TwoColumnFaqSection';
import { MarketingCtaBand } from '@/components/shared/MarketingCtaBand';
import { useLanguage } from '@/context/LanguageContext';

type WhyFeature = {
  icon: string;
  title: string;
  body: string;
  iconBg: string;
  titleClass: string;
};
type Program = {
  badge: string;
  name: string;
  subtitle: string;
  body: string;
  featured: boolean;
  cardClass: string;
  badgeClass: string;
  titleClass: string;
  gradientBar: string;
};
type Product = {
  icon: string;
  title: string;
  apps: string;
  description: string;
  tags: string[];
  iconBg: string;
  accentText: string;
  hoverClass: string;
};
type Sector = {
  icon: string;
  title: string;
  subtitle: string;
  iconColor: string;
  iconBg: string;
  cardBg: string;
  cardBorder: string;
  hoverBorder: string;
  hoverBg: string;
  hoverGlow: string;
  headingColor: string;
};
type ProcessStep = {
  num: string;
  title: string;
  body: string;
  numColor: string;
  bgClass: string;
  hoverBorder: string;
  hoverBg: string;
  hoverGlow: string;
};
type ValueAddedService = {
  title: string;
  body: string;
  icon: string;
  iconBg: string;
  hoverClass: string;
  titleClass: string;
};
type FaqItem = { q: string; a: string };

const WHY_FEATURES: readonly WhyFeature[] = [
  {
    icon: 'fas fa-check-circle',
    title: 'Official Adobe Partner',
    body:
      '100% genuine licenses with full compliance assurance — every seat is backed by Adobe certification.',
    iconBg: 'border-purple-500/20 bg-purple-950/40 text-purple-400',
    titleClass: 'group-hover:text-purple-400',
  },
  {
    icon: 'fas fa-bolt',
    title: 'VIP & ETLA Options',
    body:
      'Flexible VIP plans or multi-year ETLA agreements tailored to your scale and procurement model.',
    iconBg: 'border-sky-500/20 bg-sky-950/40 text-sky-400',
    titleClass: 'group-hover:text-sky-400',
  },
  {
    icon: 'fas fa-shield-alt',
    title: 'Full Compliance Coverage',
    body:
      'License health checks and audits so your organization stays compliant and cost-optimized.',
    iconBg: 'border-amber-500/20 bg-amber-950/40 text-amber-400',
    titleClass: 'group-hover:text-amber-400',
  },
  {
    icon: 'fas fa-cogs',
    title: 'Seamless User Management',
    body:
      'Centralized control through Adobe Admin Console with SSO integration and deployment support.',
    iconBg: 'border-rose-500/20 bg-rose-950/40 text-rose-400',
    titleClass: 'group-hover:text-rose-400',
  },
  {
    icon: 'fas fa-globe',
    title: 'Global Support',
    body:
      'Experts across time zones for deployment, renewals, and ongoing license optimization.',
    iconBg: 'border-teal-500/20 bg-teal-950/40 text-teal-400',
    titleClass: 'group-hover:text-teal-400',
  },
  {
    icon: 'fas fa-chart-line',
    title: 'End-to-End Delivery',
    body:
      'From requirements and provisioning to admin training and renewals — we own the full lifecycle.',
    iconBg: 'border-orange-500/20 bg-orange-950/40 text-orange-400',
    titleClass: 'group-hover:text-orange-400',
  },
];

const PROGRAMS: readonly Program[] = [
  {
    badge: 'SMB',
    name: 'Adobe VIP (SMB)',
    subtitle: 'Value Incentive Plan',
    body:
      'Best for SMBs: flexible seat management with annual billing — scale seats as your team changes.',
    featured: false,
    cardClass: 'hover:border-purple-500/35 hover:shadow-[0_0_40px_rgba(168,85,247,0.08)] border-corematrix-border',
    badgeClass: 'border-purple-500/20 bg-purple-950/40 text-purple-400',
    titleClass: 'group-hover:text-purple-400',
    gradientBar: 'from-purple-700 via-purple-400 to-purple-500',
  },
  {
    badge: 'Most Popular',
    name: 'Adobe VIP Marketplace',
    subtitle: 'Marketplace Edition',
    body:
      'Streamlined provisioning, consolidated billing, and scalability for growing organizations and partners.',
    featured: true,
    cardClass: 'border-corematrix-green400/35 ring-1 ring-corematrix-green400/20 hover:border-corematrix-green400/50 hover:shadow-[0_0_40px_rgba(34,197,94,0.08)]',
    badgeClass: 'border-corematrix-green700/40 bg-corematrix-green900/40 text-corematrix-green400',
    titleClass: 'group-hover:text-corematrix-green400',
    gradientBar: 'from-corematrix-green700 via-corematrix-green400 to-corematrix-green500',
  },
  {
    badge: 'Enterprise',
    name: 'Adobe ETLA (Enterprise)',
    subtitle: 'Enterprise Term License Agreement',
    body:
      'Multi-year predictability, advanced admin controls, enterprise support, and usage reporting at scale.',
    featured: false,
    cardClass: 'hover:border-sky-500/35 hover:shadow-[0_0_40px_rgba(14,165,233,0.08)] border-corematrix-border',
    badgeClass: 'border-sky-500/20 bg-sky-950/40 text-sky-400',
    titleClass: 'group-hover:text-sky-400',
    gradientBar: 'from-sky-700 via-sky-400 to-sky-500',
  },
];

const PRODUCTS: readonly Product[] = [
  {
    icon: 'fas fa-palette',
    title: 'Creative Cloud Suite',
    apps: 'All-Apps or Single-App',
    description:
      'Photoshop, Illustrator, InDesign, Premiere Pro, After Effects, Lightroom, XD, and more — suite or targeted apps.',
    tags: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects'],
    iconBg: 'border-purple-500/25 bg-purple-950/45 text-purple-400',
    accentText: 'text-purple-400',
    hoverClass: 'hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.06)]',
  },
  {
    icon: 'fas fa-file-alt',
    title: 'Document Solutions',
    apps: 'Acrobat + Sign',
    description:
      'Acrobat Pro for secure PDF workflows plus Adobe Sign for compliant e-signatures across your business.',
    tags: ['Acrobat Pro', 'Adobe Sign', 'PDF'],
    iconBg: 'border-sky-500/25 bg-sky-950/45 text-sky-400',
    accentText: 'text-sky-400',
    hoverClass: 'hover:border-sky-500/30 hover:shadow-[0_0_30px_rgba(14,165,233,0.06)]',
  },
  {
    icon: 'fas fa-images',
    title: 'Adobe Stock',
    apps: 'Royalty-free assets',
    description:
      'Stock images, vectors, templates, and video integrated with your Creative Cloud workflow.',
    tags: ['Images', 'Vectors', 'Video'],
    iconBg: 'border-amber-500/25 bg-amber-950/45 text-amber-400',
    accentText: 'text-amber-400',
    hoverClass: 'hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.06)]',
  },
  {
    icon: 'fas fa-cube',
    title: 'Substance 3D',
    apps: '3D design collection',
    description:
      'Texturing, rendering, and modeling tools for creative and product teams — Substance 3D Collection.',
    tags: ['3D', 'Texturing', 'Rendering'],
    iconBg: 'border-rose-500/25 bg-rose-950/45 text-rose-400',
    accentText: 'text-rose-400',
    hoverClass: 'hover:border-rose-500/30 hover:shadow-[0_0_30px_rgba(244,63,94,0.06)]',
  },
];

const SECTORS: readonly Sector[] = [
  {
    icon: 'fas fa-building',
    title: 'Corporate',
    subtitle: 'ETLA, Admin Console, usage reporting',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10',
    cardBg: 'bg-cyan-950/20',
    cardBorder: 'border-cyan-500/15',
    hoverBorder: 'hover:border-cyan-500/45',
    hoverBg: 'hover:bg-cyan-950/35',
    hoverGlow: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]',
    headingColor: 'text-cyan-300',
  },
  {
    icon: 'fas fa-landmark',
    title: 'Government',
    subtitle: 'Compliant procurement and transparent invoicing',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10',
    cardBg: 'bg-amber-950/20',
    cardBorder: 'border-amber-500/15',
    hoverBorder: 'hover:border-amber-500/45',
    hoverBg: 'hover:bg-amber-950/35',
    hoverGlow: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]',
    headingColor: 'text-amber-300',
  },
  {
    icon: 'fas fa-graduation-cap',
    title: 'Education',
    subtitle: 'Discounted licensing for labs, classrooms, and faculty',
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-500/10',
    cardBg: 'bg-indigo-950/20',
    cardBorder: 'border-indigo-500/15',
    hoverBorder: 'hover:border-indigo-500/45',
    hoverBg: 'hover:bg-indigo-950/35',
    hoverGlow: 'hover:shadow-[0_0_25px_rgba(99,102,241,0.15)]',
    headingColor: 'text-indigo-300',
  },
  {
    icon: 'fas fa-rocket',
    title: 'Startups',
    subtitle: 'Flexible VIP seats that scale with you',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10',
    cardBg: 'bg-purple-950/20',
    cardBorder: 'border-purple-500/15',
    hoverBorder: 'hover:border-purple-500/45',
    hoverBg: 'hover:bg-purple-950/35',
    hoverGlow: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]',
    headingColor: 'text-purple-300',
  },
  {
    icon: 'fas fa-film',
    title: 'Media Agencies',
    subtitle: 'Creative Cloud at team scale',
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-500/10',
    cardBg: 'bg-rose-950/20',
    cardBorder: 'border-rose-500/15',
    hoverBorder: 'hover:border-rose-500/45',
    hoverBg: 'hover:bg-rose-950/35',
    hoverGlow: 'hover:shadow-[0_0_25px_rgba(244,63,94,0.15)]',
    headingColor: 'text-rose-300',
  },
  {
    icon: 'fas fa-briefcase',
    title: 'Professional Services',
    subtitle: 'Document workflows and e-sign compliance',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    cardBg: 'bg-emerald-950/20',
    cardBorder: 'border-emerald-500/15',
    hoverBorder: 'hover:border-emerald-500/45',
    hoverBg: 'hover:bg-emerald-950/35',
    hoverGlow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]',
    headingColor: 'text-emerald-300',
  },
];

const PROCESS: readonly ProcessStep[] = [
  {
    num: '01',
    title: 'Requirement Analysis',
    body: 'We map current and future software needs across teams, projects, and regions.',
    numColor: 'text-purple-400',
    bgClass: 'bg-purple-950/30 border-purple-500/20',
    hoverBorder: 'group-hover:border-purple-500',
    hoverBg: 'group-hover:bg-purple-700',
    hoverGlow: 'group-hover:shadow-[0_0_24px_rgba(168,85,247,0.25)]',
  },
  {
    num: '02',
    title: 'Tailored Quotation',
    body: 'A clear Adobe license plan with transparent pricing and flexible commercial terms.',
    numColor: 'text-sky-400',
    bgClass: 'bg-sky-950/30 border-sky-500/20',
    hoverBorder: 'group-hover:border-sky-500',
    hoverBg: 'group-hover:bg-sky-700',
    hoverGlow: 'group-hover:shadow-[0_0_24px_rgba(14,165,233,0.25)]',
  },
  {
    num: '03',
    title: 'License Provisioning',
    body: 'Fast activation through Adobe Admin Console — typically within hours of confirmation.',
    numColor: 'text-amber-400',
    bgClass: 'bg-amber-950/30 border-amber-500/20',
    hoverBorder: 'group-hover:border-amber-500',
    hoverBg: 'group-hover:bg-amber-700',
    hoverGlow: 'group-hover:shadow-[0_0_24px_rgba(245,158,11,0.25)]',
  },
  {
    num: '04',
    title: 'Deployment Support',
    body: 'User assignment, SSO, and Admin Console setup with guidance for your IT team.',
    numColor: 'text-rose-400',
    bgClass: 'bg-rose-950/30 border-rose-500/20',
    hoverBorder: 'group-hover:border-rose-500',
    hoverBg: 'group-hover:bg-rose-700',
    hoverGlow: 'group-hover:shadow-[0_0_24px_rgba(244,63,94,0.25)]',
  },
  {
    num: '05',
    title: 'Renewal & Optimization',
    body: 'Usage tracking and cost reviews ahead of every renewal cycle.',
    numColor: 'text-teal-400',
    bgClass: 'bg-teal-950/30 border-teal-500/20',
    hoverBorder: 'group-hover:border-teal-500',
    hoverBg: 'group-hover:bg-teal-700',
    hoverGlow: 'group-hover:shadow-[0_0_24px_rgba(20,184,166,0.25)]',
  },
];

const VALUE_ADDED: readonly ValueAddedService[] = [
  {
    title: 'License Health Check',
    body: 'Validate compliance, eliminate shelfware, and right-size spend.',
    icon: 'fas fa-heartbeat',
    iconBg: 'border-purple-500/25 bg-purple-950/45 text-purple-400',
    hoverClass: 'hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.06)]',
    titleClass: 'text-purple-400 group-hover:text-purple-300',
  },
  {
    title: 'Admin Console Training',
    body: 'Hands-on sessions so IT can manage users, groups, and reporting confidently.',
    icon: 'fas fa-chalkboard-teacher',
    iconBg: 'border-sky-500/25 bg-sky-950/45 text-sky-400',
    hoverClass: 'hover:border-sky-500/30 hover:shadow-[0_0_30px_rgba(14,165,233,0.06)]',
    titleClass: 'text-sky-400 group-hover:text-sky-300',
  },
  {
    title: 'Migration Assistance',
    body: 'Move from individual IDs to business or enterprise identities with minimal disruption.',
    icon: 'fas fa-exchange-alt',
    iconBg: 'border-amber-500/25 bg-amber-950/45 text-amber-400',
    hoverClass: 'hover:border-amber-500/30 hover:shadow-[0_0_30px_rgba(245,158,11,0.06)]',
    titleClass: 'text-amber-400 group-hover:text-amber-300',
  },
  {
    title: 'SSO Setup',
    body: 'Enterprise single sign-on aligned with your identity provider.',
    icon: 'fas fa-key',
    iconBg: 'border-rose-500/25 bg-rose-950/45 text-rose-400',
    hoverClass: 'hover:border-rose-500/30 hover:shadow-[0_0_30px_rgba(244,63,94,0.06)]',
    titleClass: 'text-rose-400 group-hover:text-rose-300',
  },
  {
    title: 'Creative Team Enablement',
    body: 'Libraries, templates, and brand-consistent workflows for creative teams.',
    icon: 'fas fa-paint-brush',
    iconBg: 'border-teal-500/25 bg-teal-950/45 text-teal-400',
    hoverClass: 'hover:border-teal-500/30 hover:shadow-[0_0_30px_rgba(20,184,166,0.06)]',
    titleClass: 'text-teal-400 group-hover:text-teal-300',
  },
  {
    title: 'Compliance Reporting',
    body: 'Usage and entitlement reports for procurement, IT, and finance alignment.',
    icon: 'fas fa-chart-bar',
    iconBg: 'border-orange-500/25 bg-orange-950/45 text-orange-400',
    hoverClass: 'hover:border-orange-500/30 hover:shadow-[0_0_30px_rgba(249,115,22,0.06)]',
    titleClass: 'text-orange-400 group-hover:text-orange-300',
  },
];

const FAQ_ITEMS: readonly FaqItem[] = [
  {
    q: 'Should we choose VIP or ETLA?',
    a:
      'VIP fits SMBs that want annual flexibility and easy seat changes. ETLA suits large organizations that need multi-year predictability, deeper controls, and enterprise-grade support.',
  },
  {
    q: 'Can you migrate us from individual Adobe IDs to enterprise IDs?',
    a:
      'Yes. We support identity migration, user reassignment, and Admin Console configuration with minimal disruption to your teams.',
  },
  {
    q: 'How fast can licenses be provisioned?',
    a:
      'In most cases, provisioning completes within hours of order confirmation. We can guide same-day onboarding with your IT team.',
  },
  {
    q: 'Can Adobe licensing integrate with our existing IT stack?',
    a:
      'Yes — including SSO, directory sync, and enterprise identity patterns so authentication works across your Adobe tools.',
  },
  {
    q: 'Do you provide post-purchase support and renewals?',
    a:
      'We offer ongoing support: usage tracking, optimization, renewal management, compliance reviews, and Admin Console guidance through the contract lifecycle.',
  },
];

// Explicitly typed translation maps for i18n
const whyTitleTranslations: Record<string, string> = {
  'Official Adobe Partner': 'شريك أدوبي المعتمد',
  'VIP & ETLA Options': 'خيارات VIP و ETLA',
  'Full Compliance Coverage': 'تغطية الامتثال الكامل',
  'Seamless User Management': 'إدارة مستخدمين سلسة',
  'Global Support': 'دعم عالمي',
  'End-to-End Delivery': 'تسليم متكامل من البداية للنهاية',
};

const whyBodyTranslations: Record<string, string> = {
  '100% genuine licenses with full compliance assurance — every seat is backed by Adobe certification.':
    'تراخيص أصلية بنسبة 100% مع ضمان الامتثال الكامل — كل ترخيص مدعوم بشهادة أدوبي.',
  'Flexible VIP plans or multi-year ETLA agreements tailored to your scale and procurement model.':
    'خطط VIP مرنة أو اتفاقيات ETLA متعددة السنوات مصممة خصيصاً لتناسب حجم مؤسستك ونموذج الشراء لديك.',
  'License health checks and audits so your organization stays compliant and cost-optimized.':
    'عمليات فحص وتدقيق لصحة التراخيص لضمان بقاء مؤسستك ممتثلة وخاضعة لأمثل التكاليف.',
  'Centralized control through Adobe Admin Console with SSO integration and deployment support.':
    'تحكم مركزي من خلال وحدة تحكم مسؤول أدوبي مع تكامل SSO ودعم النشر.',
  'Experts across time zones for deployment, renewals, and ongoing license optimization.':
    'خبراء متواجدون عبر مناطق زمنية مختلفة لعمليات النشر، التجديد، والتحسين المستمر للتراخيص.',
  'From requirements and provisioning to admin training and renewals — we own the full lifecycle.':
    'من دراسة المتطلبات وتوفير التراخيص إلى تدريب المسؤولين والتجديدات — نتولى دورة الحياة الكاملة.',
};

const programBadgeTranslations: Record<string, string> = {
  'SMB': 'الشركات الصغيرة والمتوسطة',
  'Most Popular': 'الأكثر شعبية',
  'Enterprise': 'المؤسسات الكبرى',
};

const programNameTranslations: Record<string, string> = {
  'Adobe VIP (SMB)': 'أدوبي VIP (SMB)',
  'Adobe VIP Marketplace': 'أدوبي VIP ماركتبليس',
  'Adobe ETLA (Enterprise)': 'أدوبي ETLA للمؤسسات',
};

const programSubtitleTranslations: Record<string, string> = {
  'Value Incentive Plan': 'خطة تحفيز القيمة',
  'Marketplace Edition': 'إصدار الماركتبليس',
  'Enterprise Term License Agreement': 'اتفاقية ترخيص محددة المدة للمؤسسات',
};

const programBodyTranslations: Record<string, string> = {
  'Best for SMBs: flexible seat management with annual billing — scale seats as your team changes.':
    'الأفضل للمؤسسات الصغيرة والمتوسطة: إدارة مرنة للتراخيص مع فوترة سنوية — إمكانية تعديل التراخيص حسب تغيرات فريقك.',
  'Streamlined provisioning, consolidated billing, and scalability for growing organizations and partners.':
    'توفير تراخيص مبسط، فوترة موحدة، وقابلية للتوسع للمؤسسات والشركاء الناميين.',
  'Multi-year predictability, advanced admin controls, enterprise support, and usage reporting at scale.':
    'قدرة على التنبؤ بالتكاليف لسنوات متعددة، ضوابط إدارة متقدمة، دعم للمؤسسات الكبرى، وتقارير الاستخدام على نطاق واسع.',
};

const productTitleTranslations: Record<string, string> = {
  'Creative Cloud Suite': 'مجموعة Creative Cloud الكاملة',
  'Document Solutions': 'حلول المستندات',
  'Adobe Stock': 'أدوبي ستوك (Adobe Stock)',
  'Substance 3D': 'Substance 3D للتصميم ثلاثي الأبعاد',
};

const productAppsTranslations: Record<string, string> = {
  'All-Apps or Single-App': 'كل التطبيقات أو تطبيق منفرد',
  'Acrobat + Sign': 'أكروبات + التوقيع الإلكتروني',
  'Royalty-free assets': 'أصول خالية من حقوق الملكية',
  '3D design collection': 'مجموعة التصميم ثلاثي الأبعاد',
};

const productDescTranslations: Record<string, string> = {
  'Photoshop, Illustrator, InDesign, Premiere Pro, After Effects, Lightroom, XD, and more — suite or targeted apps.':
    'Photoshop و Illustrator و InDesign و Premiere Pro و After Effects و Lightroom و XD والمزيد — المجموعة الكاملة أو تطبيقات محددة.',
  'Acrobat Pro for secure PDF workflows plus Adobe Sign for compliant e-signatures across your business.':
    'Acrobat Pro لسير عمل PDF آمن بالإضافة إلى Adobe Sign للتوقيعات الإلكترونية المتوافقة مع القوانين عبر أعمالك.',
  'Stock images, vectors, templates, and video integrated with your Creative Cloud workflow.':
    'صور متجهة، قوالب، وفيديوهات مدمجة مباشرة مع سير عمل Creative Cloud الخاص بك.',
  'Texturing, rendering, and modeling tools for creative and product teams — Substance 3D Collection.':
    'أدوات الإكساء والرندر والنمذجة للفرق الإبداعية وفرق تطوير المنتجات — مجموعة Substance 3D.',
};

const tagTranslations: Record<string, string> = {
  'Photoshop': 'فوتوشوب',
  'Illustrator': 'إليستريتور',
  'Premiere Pro': 'بريمير برو',
  'After Effects': 'أفتر إفكتس',
  'Acrobat Pro': 'أكروبات برو',
  'Adobe Sign': 'أدوبي ساين',
  'PDF': 'بي دي إف',
  'Images': 'صور',
  'Vectors': 'فيكتورز',
  'Video': 'فيديو',
  '3D': 'ثلاثي الأبعاد',
  'Texturing': 'تلوين وإكساء',
  'Rendering': 'رندر ومعالجة',
};

const sectorTitleTranslations: Record<string, string> = {
  'Corporate': 'الشركات والمؤسسات',
  'Government': 'القطاع الحكومي',
  'Education': 'التعليم والأكاديميات',
  'Startups': 'الشركات الناشئة',
  'Media Agencies': 'الوكالات الإعلامية',
  'Professional Services': 'الخدمات المهنية',
};

const sectorSubtitleTranslations: Record<string, string> = {
  'ETLA, Admin Console, usage reporting': 'اتفاقيات ETLA، وحدة تحكم المسؤولين، تقارير الاستخدام',
  'Compliant procurement and transparent invoicing': 'شراء متوافق مع اللوائح وفواتير شفافة',
  'Discounted licensing for labs, classrooms, and faculty': 'تراخيص مخفضة للمختبرات، الفصول الدراسية، وأعضاء هيئة التدريس',
  'Flexible VIP seats that scale with you': 'تراخيص VIP مرنة تتوسع معك مع نمو عملك',
  'Creative Cloud at team scale': 'مجموعة Creative Cloud مخصصة لحجم الفرق الإبداعية',
  'Document workflows and e-sign compliance': 'سير عمل المستندات والامتثال للتوقيع الإلكتروني',
};

const processTitleTranslations: Record<string, string> = {
  'Requirement Analysis': 'تحليل المتطلبات',
  'Tailored Quotation': 'عرض سعر مخصص',
  'License Provisioning': 'توفير وتفعيل التراخيص',
  'Deployment Support': 'دعم عملية النشر',
  'Renewal & Optimization': 'التجديد والتحسين',
};

const processBodyTranslations: Record<string, string> = {
  'We map current and future software needs across teams, projects, and regions.':
    'نقوم برسم خريطة لاحتياجات البرامج الحالية والمستقبلية عبر الفرق والمشاريع والمناطق الجغرافية.',
  'A clear Adobe license plan with transparent pricing and flexible commercial terms.':
    'خطة ترخيص أدوبي واضحة مع تسعير شفاف وشروط تجارية مرنة.',
  'Fast activation through Adobe Admin Console — typically within hours of confirmation.':
    'تفعيل سريع من خلال وحدة تحكم مسؤول أدوبي — عادةً في غضون ساعات من التأكيد.',
  'User assignment, SSO, and Admin Console setup with guidance for your IT team.':
    'تخصيص المستخدمين، وإعداد SSO ووحدة تحكم المسؤول مع إرشادات لفريق تقنية المعلومات لديك.',
  'Usage tracking and cost reviews ahead of every renewal cycle.':
    'تتبع الاستخدام ومراجعة التكاليف قبل كل دورة تجديد لضمان الفاعلية.',
};

const valueTitleTranslations: Record<string, string> = {
  'License Health Check': 'فحص صحة التراخيص',
  'Admin Console Training': 'التدريب على وحدة تحكم المسؤول',
  'Migration Assistance': 'المساعدة في الانتقال والترحيل',
  'SSO Setup': 'إعداد تسجيل الدخول الموحد (SSO)',
  'Creative Team Enablement': 'تمكين الفرق الإبداعية',
  'Compliance Reporting': 'تقارير الامتثال والترخيص',
};

const valueBodyTranslations: Record<string, string> = {
  'Validate compliance, eliminate shelfware, and right-size spend.':
    'التحقق من الامتثال، التخلص من التراخيص غير المستخدمة، وضبط الإنفاق بالحجم المناسب.',
  'Hands-on sessions so IT can manage users, groups, and reporting confidently.':
    'جلسات عملية حتى يتمكن فريق تقنية المعلومات من إدارة المستخدمين والمجموعات والتقارير بثقة.',
  'Move from individual IDs to business or enterprise identities with minimal disruption.':
    'الانتقال من حسابات أدوبي الفردية إلى هويات الأعمال أو المؤسسات بأقل قدر من التأثير على العمل.',
  'Enterprise single sign-on aligned with your identity provider.':
    'تسجيل الدخول الموحد للمؤسسات متوافق ومتكامل مع موفر الهوية الخاص بك.',
  'Libraries, templates, and brand-consistent workflows for creative teams.':
    'مكتبات وقوالب وسير عمل متسق مع العلامة التجارية لتمكين الفرق الإبداعية.',
  'Usage and entitlement reports for procurement, IT, and finance alignment.':
    'تقارير الاستخدام والاستحقاقات لمواءمة المشتريات وتقنية المعلومات والإدارات المالية.',
};

const faqQuestionTranslations: Record<string, string> = {
  'Should we choose VIP or ETLA?': 'هل نختار خطة VIP أم اتفاقية ETLA؟',
  'Can you migrate us from individual Adobe IDs to enterprise IDs?': 'هل يمكنكم نقلنا من معرفات أدوبي الفردية إلى معرفات المؤسسات؟',
  'How fast can licenses be provisioned?': 'ما مدى سرعة توفير وتفعيل التراخيص؟',
  'Can Adobe licensing integrate with our existing IT stack?': 'هل يمكن دمج تراخيص أدوبي مع البنية التحتية لتقنية المعلومات الحالية لدينا؟',
  'Do you provide post-purchase support and renewals?': 'هل تقدمون الدعم الفني بعد الشراء وإدارة التجديدات؟',
};

const faqAnswerTranslations: Record<string, string> = {
  'VIP fits SMBs that want annual flexibility and easy seat changes. ETLA suits large organizations that need multi-year predictability, deeper controls, and enterprise-grade support.':
    'تناسب خطط VIP الشركات الصغيرة والمتوسطة التي تريد مرونة سنوية وتغييراً سهلاً في عدد التراخيص. بينما تناسب اتفاقيات ETLA المؤسسات الكبرى التي تحتاج إلى استقرار مالي لسنوات متعددة، وتحكم أعمق، ودعم على مستوى المؤسسات.',
  'Yes. We support identity migration, user reassignment, and Admin Console configuration with minimal disruption to your teams.':
    'نعم. نحن ندعم ترحيل الهويات وإعادة تعيين المستخدمين وتهيئة وحدة تحكم المسؤول مع ضمان الحد الأدنى من التأثير على عمل فرقك.',
  'In most cases, provisioning completes within hours of order confirmation. We can guide same-day onboarding with your IT team.':
    'في معظم الحالات، يكتمل توفير التراخيص في غضون ساعات قليلة من تأكيد الطلب. يمكننا مرافقة فريق تقنية المعلومات لديك لبدء العمل في نفس اليوم.',
  'Yes — including SSO, directory sync, and enterprise identity patterns so authentication works across your Adobe tools.':
    'نعم — بما في ذلك تسجيل الدخول الموحد (SSO)، ومزامنة الدليل النشط، وأنماط هوية المؤسسة بحيث يعمل نظام تسجيل الدخول عبر جميع أدوات أدوبي الخاصة بك.',
  'We offer ongoing support: usage tracking, optimization, renewal management, compliance reviews, and Admin Console guidance through the contract lifecycle.':
    'نحن نقدم دعماً مستمراً: تتبع الاستخدام، وتحسين النفقات، وإدارة التجديدات، ومراجعة الامتثال، وإرشادات وحدة تحكم المسؤول طوال دورة حياة العقد.',
};

const TAG_THEMES = [
  { bg: 'bg-cyan-950/20', text: 'text-cyan-300', border: 'border-cyan-500/20' },
  { bg: 'bg-amber-950/20', text: 'text-amber-300', border: 'border-amber-500/20' },
  { bg: 'bg-indigo-950/20', text: 'text-indigo-300', border: 'border-indigo-500/20' },
  { bg: 'bg-purple-950/20', text: 'text-purple-300', border: 'border-purple-500/20' },
  { bg: 'bg-orange-950/20', text: 'text-orange-300', border: 'border-orange-500/20' },
  { bg: 'bg-sky-950/20', text: 'text-sky-300', border: 'border-sky-500/20' },
  { bg: 'bg-rose-950/20', text: 'text-rose-300', border: 'border-rose-500/20' },
  { bg: 'bg-emerald-950/20', text: 'text-emerald-300', border: 'border-emerald-500/20' },
];

function getTagTheme(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % TAG_THEMES.length;
  return TAG_THEMES[index];
}

export function AdobeLicensingContent() {
  const { t, language } = useLanguage();

  const translatedFaqs = FAQ_ITEMS.map((item) => ({
    q: t(item.q, faqQuestionTranslations[item.q] ?? item.q),
    a: t(item.a, faqAnswerTranslations[item.a] ?? item.a),
  }));

  return (
    <>
      {/* Hero */}
      <section
        id="adobe-licensing-hero"
        aria-labelledby="adobe-licensing-heading"
        className="relative min-h-[78vh] overflow-hidden bg-corematrix-bg1 pt-12 pb-12 sm:pt-12"
      >
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.12]"
          aria-hidden
        >
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="al-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a3525" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#al-grid)" />
          </svg>
        </div>
        <div
          className="pointer-events-none absolute -right-24 -top-44 h-[560px] w-[560px] rounded-full bg-corematrix-green700 opacity-[0.10] blur-[120px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-[420px] w-[420px] rounded-full bg-corematrix-green700 opacity-[0.06] blur-[100px]"
          aria-hidden
        />

        <Container className="relative z-10">
          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-corematrix-textDim">
            <Link href="/" className="hover:text-corematrix-textMuted">
              {t('Home', 'الرئيسية')}
            </Link>
            <span aria-hidden>›</span>
            <Link href="/services" className="hover:text-corematrix-textMuted">
              {t('Services', 'الخدمات')}
            </Link>
            <span aria-hidden>›</span>
            <span className="text-corematrix-green400">{t('Adobe Licensing', 'تراخيص أدوبي')}</span>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-corematrix-green700 bg-corematrix-green900/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-corematrix-green400">
            <span className="h-1.5 w-1.5 rounded-full bg-corematrix-green400" />
            {t('Adobe Certified Partner', 'شريك أدوبي المعتمد')}
          </div>

          <h1
            id="adobe-licensing-heading"
            className="max-w-[900px] font-display text-[clamp(2.5rem,4.5vw,4.2rem)] font-extrabold leading-[1.05] tracking-tight text-corematrix-textPrimary"
          >
            {t('Genuine ', 'حلول ')}
            <em className="not-italic text-corematrix-green400">
              {t('Adobe Licensing Solutions', 'تراخيص أدوبي الأصلية')}
            </em>
            {t(' for Your Business', ' لشركتك')}
          </h1>

          <p className="mt-6 max-w-[640px] text-base font-light leading-relaxed text-corematrix-textSecondary">
            {t(
              'Compliant, cost-aware Adobe programs for teams and enterprises worldwide — from program selection and provisioning to renewals and optimization.',
              'برامج أدوبي المتوافقة والواعية بالتكاليف للفرق والمؤسسات في جميع أنحاء العالم — من اختيار البرنامج والتوفير إلى التجديد والتحسين.'
            )}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              {t('Get a Quote →', 'احصل على عرض سعر →')}
            </Link>
            <a
              href="#programs"
              className="inline-flex items-center justify-center rounded-lg border border-corematrix-border2 bg-transparent px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green700 hover:bg-corematrix-green900/20"
            >
              {t('View Programs', 'عرض البرامج')}
            </a>
          </div>
        </Container>
      </section>

      {/* Why Corematrix */}
      <section
        aria-labelledby="why-corematrix-heading"
        className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
      >
        <Container>
          <div className="mx-auto mb-12 flex max-w-[800px] flex-col items-center text-center">
            <p className="section-label text-corematrix-green400">{t('WHY COREMATRIX', 'لماذا كورماتريكس')}</p>
            <h2
              id="why-corematrix-heading"
              className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
            >
              {t('Why Corematrix for Adobe Licensing?', 'لماذا كورماتريكس لترخيص أدوبي؟')}
            </h2>
            <p className="mt-4 max-w-[640px] text-base leading-relaxed text-corematrix-textSecondary">
              {t(
                "We don't just sell licenses — we guide selection, deployment, compliance, and renewals across the full lifecycle.",
                'نحن لا نبيع التراخيص فحسب — بل نوجهك في اختيارها ونشرها وامتثالها وتجديدها طوال دورة حياتها الكاملة.'
              )}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-corematrix-border bg-corematrix-border sm:grid-cols-2 lg:grid-cols-3">
            {WHY_FEATURES.map((f) => (
              <div
                key={f.title}
                className="group bg-corematrix-card2 p-8 transition-colors hover:bg-corematrix-card"
              >
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl border text-xl transition-all group-hover:scale-110 ${f.iconBg}`}>
                  <i className={f.icon} aria-hidden="true" />
                </div>
                <h3 className={`font-display text-base font-bold text-corematrix-textPrimary transition-colors ${f.titleClass}`}>
                  {t(f.title, whyTitleTranslations[f.title] ?? f.title)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-corematrix-textMuted">
                  {t(f.body, whyBodyTranslations[f.body] ?? f.body)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Licensing Programs */}
      <section
        id="programs"
        aria-labelledby="programs-heading"
        className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
      >
        <Container>
          <div className="mx-auto mb-12 flex max-w-[800px] flex-col items-center text-center">
            <p className="section-label text-corematrix-green400">{t('LICENSING PROGRAMS', 'برامج الترخيص')}</p>
            <h2
              id="programs-heading"
              className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
            >
              {t('Licensing Programs', 'برامج الترخيص')}
            </h2>
            <p className="mt-4 max-w-[640px] text-base leading-relaxed text-corematrix-textSecondary">
              {t(
                'From growing teams to global enterprises — we align you with the right Adobe commercial model.',
                'من الفرق النامية إلى المؤسسات العالمية — نوجهك نحو النموذج التجاري المناسب من أدوبي.'
              )}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PROGRAMS.map((p) => (
              <div
                key={p.name}
                className={`group relative overflow-hidden rounded-xl border bg-corematrix-card2 p-8 transition-all hover:-translate-y-0.5 ${p.cardClass}`}
              >
                <div
                  className={`absolute left-0 right-0 top-0 h-1 bg-gradient-to-r ${p.gradientBar}`}
                  aria-hidden
                />
                <span className={`inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${p.badgeClass}`}>
                  {t(p.badge, programBadgeTranslations[p.badge] ?? p.badge)}
                </span>
                <h3 className={`mt-4 font-display text-xl font-bold text-corematrix-textPrimary transition-colors ${p.titleClass}`}>
                  {t(p.name, programNameTranslations[p.name] ?? p.name)}
                </h3>
                <p className="text-xs text-corematrix-textDim">
                  {t(p.subtitle, programSubtitleTranslations[p.subtitle] ?? p.subtitle)}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-corematrix-textMuted">
                  {t(p.body, programBodyTranslations[p.body] ?? p.body)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Adobe Products */}
      <section aria-labelledby="products-heading" className="border-t border-corematrix-border bg-corematrix-bg0 py-24">
        <Container>
          <div className="mx-auto mb-12 flex max-w-[800px] flex-col items-center text-center">
            <p className="section-label text-corematrix-green400">{t('ADOBE PRODUCTS', 'منتجات أدوبي')}</p>
            <h2
              id="products-heading"
              className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
            >
              {t('Adobe Products', 'منتجات أدوبي')}
            </h2>
            <p className="mt-4 max-w-[640px] text-base leading-relaxed text-corematrix-textSecondary">
              {t(
                'Creative, document, stock, and 3D — licensed to match how your teams work.',
                'الإبداع، والمستندات، ومخزون الصور، وثلاثي الأبعاد — مرخصة لتناسب طريقة عمل فرقك.'
              )}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {PRODUCTS.map((p) => (
              <div
                key={p.title}
                className={`rounded-xl border border-corematrix-border bg-corematrix-card2 p-6 transition-all ${p.hoverClass}`}
              >
                <div className="flex gap-4">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border text-base ${p.iconBg}`}
                    aria-hidden
                  >
                    <i className={p.icon} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-bold text-corematrix-textPrimary">
                      {t(p.title, productTitleTranslations[p.title] ?? p.title)}
                    </h3>
                    <p className={`text-xs font-medium ${p.accentText}`}>
                      {t(p.apps, productAppsTranslations[p.apps] ?? p.apps)}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-corematrix-textMuted">
                  {t(p.description, productDescTranslations[p.description] ?? p.description)}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((tag) => {
                    const theme = getTagTheme(tag);
                    return (
                      <span
                        key={tag}
                        className={`rounded border px-2 py-0.5 text-xs transition-colors duration-300 ${theme.bg} ${theme.border} ${theme.text}`}
                      >
                        {t(tag, tagTranslations[tag] ?? tag)}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Who We Serve */}
      <section
        aria-labelledby="who-we-serve-heading"
        className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
      >
        <Container>
          <div className="mx-auto mb-12 flex max-w-[800px] flex-col items-center text-center">
            <p className="section-label text-corematrix-green400">{t('WHO WE SERVE', 'من نخدم')}</p>
            <h2
              id="who-we-serve-heading"
              className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
            >
              {t('Who We Serve', 'الجهات التي نخدمها')}
            </h2>
            <p className="mt-4 max-w-[640px] text-base leading-relaxed text-corematrix-textSecondary">
              {t(
                'Procurement, compliance, and operations — tailored by sector.',
                'المشتريات، والامتثال، والعمليات — مخصصة ومبوبة حسب القطاع.'
              )}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SECTORS.map((s) => (
              <div
                key={s.title}
                className={`group flex items-start gap-4 rounded-xl border px-5 py-5 transition-all duration-300 hover:-translate-y-1 ${s.cardBg} ${s.cardBorder} ${s.hoverBg} ${s.hoverBorder} ${s.hoverGlow}`}
              >
                <span className={`shrink-0 flex h-10 w-10 items-center justify-center rounded-lg text-lg transition-all duration-300 group-hover:scale-110 ${s.iconBg} ${s.iconColor}`} aria-hidden="true">
                  <i className={s.icon} />
                </span>
                <div>
                  <p className={`font-display text-sm font-bold text-corematrix-textPrimary transition-colors duration-300 group-hover:${s.headingColor}`}>
                    {t(s.title, sectorTitleTranslations[s.title] ?? s.title)}
                  </p>
                  <p className="mt-1 text-xs font-light leading-relaxed text-corematrix-textMuted/90 transition-colors duration-300 group-hover:text-corematrix-textPrimary/80">
                    {t(s.subtitle, sectorSubtitleTranslations[s.subtitle] ?? s.subtitle)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Process */}
      <section
        aria-labelledby="process-heading"
        className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
      >
        <Container>
          <div className="mx-auto mb-12 flex max-w-[800px] flex-col items-center text-center">
            <p className="section-label text-corematrix-green400">{t('OUR PROCESS', 'خطوات عملنا')}</p>
            <h2
              id="process-heading"
              className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
            >
              {t('Our Process', 'طريقة عملنا')}
            </h2>
            <p className="mt-4 max-w-[640px] text-base leading-relaxed text-corematrix-textSecondary">
              {t(
                'Transparent steps from first conversation to optimized renewals.',
                'خطوات شفافة تبدأ من المحادثة الأولى وحتى التجديدات المحسنة.'
              )}
            </p>
          </div>

          <div className="relative mt-14">
            <div
              className="absolute left-[6%] right-[6%] top-7 hidden h-px bg-gradient-to-r from-transparent via-corematrix-border2 via-corematrix-green700 to-transparent lg:block"
              aria-hidden
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {PROCESS.map((step, i) => (
                <div
                  key={step.num}
                  className="group flex flex-col items-center px-2 text-center"
                >
                  <div className={`relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 font-display text-lg font-extrabold transition-all ${step.bgClass} ${step.numColor} ${step.hoverBorder} ${step.hoverBg} group-hover:text-white ${step.hoverGlow}`}>
                    {step.num}
                  </div>
                  <h3 className="font-display text-base font-semibold text-corematrix-textPrimary sm:text-lg">
                    {t(step.title, processTitleTranslations[step.title] ?? step.title)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-corematrix-textSecondary">
                    {t(step.body, processBodyTranslations[step.body] ?? step.body)}
                  </p>
                  {i < PROCESS.length - 1 && (
                    <span className="mt-4 text-corematrix-textDim lg:hidden" aria-hidden>
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-corematrix-textMuted">
            {t('Requirement Analysis', 'تحليل المتطلبات')}{' '}
            <span className="text-white mx-1">{language === 'ar' ? '←' : '→'}</span>{' '}
            {t('Tailored Quotation', 'عرض سعر مخصص')}{' '}
            <span className="text-white mx-1">{language === 'ar' ? '←' : '→'}</span>{' '}
            {t('License Provisioning', 'توفير التراخيص')}{' '}
            <span className="text-white mx-1">{language === 'ar' ? '←' : '→'}</span>{' '}
            {t('Deployment Support', 'دعم النشر')}{' '}
            <span className="text-white mx-1">{language === 'ar' ? '←' : '→'}</span>{' '}
            {t('Renewal & Optimization', 'التجديد والتحسين')}
          </p>
        </Container>
      </section>

      {/* Value-added */}
      <section
        aria-labelledby="value-added-heading"
        className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
      >
        <Container>
          <div className="mx-auto mb-12 flex max-w-[800px] flex-col items-center text-center">
            <p className="section-label text-corematrix-green400">{t('VALUE-ADDED SERVICES', 'خدمات القيمة المضافة')}</p>
            <h2
              id="value-added-heading"
              className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
            >
              {t('Value-Added Services', 'خدمات ذات قيمة مضافة')}
            </h2>
            <p className="mt-4 max-w-[640px] text-base leading-relaxed text-corematrix-textSecondary">
              {t(
                'Practical services that help you extract full value from every license.',
                'خدمات عملية تساعدك على تحقيق الاستفادة القصوى من كل ترخيص.'
              )}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUE_ADDED.map((v) => (
              <div
                key={v.title}
                className={`group rounded-xl border border-corematrix-border bg-corematrix-card2 p-6 transition-all ${v.hoverClass}`}
              >
                <div className="flex gap-4 items-center mb-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border text-base ${v.iconBg}`} aria-hidden="true">
                    <i className={v.icon} />
                  </div>
                  <h3 className={`font-display text-base font-bold text-corematrix-textPrimary transition-colors ${v.titleClass}`}>
                    {t(v.title, valueTitleTranslations[v.title] ?? v.title)}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-corematrix-textMuted">
                  {t(v.body, valueBodyTranslations[v.body] ?? v.body)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <TwoColumnFaqSection
        sectionId="adobe-licensing-faq"
        headingId="adobe-licensing-faq-heading"
        label={t('FAQ', 'الأسئلة الشائعة')}
        title={t('Frequently Asked Questions', 'الأسئلة الأكثر تكراراً')}
        description={t(
          'Licensing models, migration, speed, IT integration, and ongoing support.',
          'نماذج التراخيص، عمليات الانتقال والترحيل، سرعة التفعيل، التكامل مع تقنية المعلومات، والدعم المستمر.'
        )}
        items={translatedFaqs}
        cta={
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
          >
            {t('Ask About Licensing →', 'اسأل عن التراخيص ←')}
          </Link>
        }
      />

      <MarketingCtaBand
        headingId="adobe-cta-heading"
        sectionClassName="bg-corematrix-bg2"
        glow="adobe"
        label={t('READY TO GET STARTED?', 'جاهز للبدء والتفعيل؟')}
        title={t('Ready to Get the Right Adobe License?', 'جاهز للحصول على ترخيص أدوبي الأنسب؟')}
        titleClassName="mx-auto mb-5 max-w-[700px] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight text-corematrix-textPrimary"
        description={
          <p className="mx-auto mb-8 max-w-[600px] text-base leading-relaxed text-corematrix-textSecondary">
            {t(
              "Tell us about your teams and timelines — we'll recommend the right program and handle provisioning with you.",
              'أخبرنا عن فرق العمل والجدول الزمني لديكم — سنوصي بالبرنامج الأنسب ونتولى عملية التوفير والتفعيل معك.'
            )}
          </p>
        }
        actionsWrapperClassName="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-8 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
        >
          {t('Get a Quote →', 'احصل على عرض سعر →')}
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg border border-corematrix-border2 px-8 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green700 hover:bg-corematrix-green900/20"
        >
          {t('Talk to Us', 'تحدث معنا')}
        </Link>
      </MarketingCtaBand>
    </>
  );
}
