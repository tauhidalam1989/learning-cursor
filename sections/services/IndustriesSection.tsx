'use client';

import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

type Industry = {
  icon: string;
  name: string;
  description: string;
  iconColor: string;
  iconBg: string;
  cardBg: string;
  cardBorder: string;
  hoverBorder: string;
  hoverBg: string;
  hoverGlow: string;
  headingColor: string;
};

const INDUSTRIES: Industry[] = [
  {
    icon: 'fas fa-hospital',
    name: 'Healthcare & MedTech',
    description:
      'HIPAA-compliant platforms, patient portals, telehealth apps, clinical AI, and medical data pipelines.',
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
    icon: 'fas fa-wallet',
    name: 'Fintech & Banking',
    description:
      'Payment platforms, trading systems, fraud detection AI, KYC automation, and regulatory compliance tools.',
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
    icon: 'fas fa-shopping-bag',
    name: 'eCommerce & Retail',
    description:
      'Custom storefronts, AI recommendation engines, inventory management, and omnichannel commerce platforms.',
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
    icon: 'fas fa-graduation-cap',
    name: 'EdTech & E-Learning',
    description:
      'LMS platforms, AI tutoring systems, adaptive learning engines, and assessment automation tools.',
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
    icon: 'fas fa-building',
    name: 'Real Estate & PropTech',
    description:
      'Property listing platforms, AI valuation tools, CRM systems, and smart building management software.',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10',
    cardBg: 'bg-orange-950/20',
    cardBorder: 'border-orange-500/15',
    hoverBorder: 'hover:border-orange-500/45',
    hoverBg: 'hover:bg-orange-950/35',
    hoverGlow: 'hover:shadow-[0_0_25px_rgba(249,115,22,0.15)]',
    headingColor: 'text-orange-300',
  },
  {
    icon: 'fas fa-truck',
    name: 'Logistics & Supply Chain',
    description:
      'Route optimization AI, inventory forecasting, fleet management, and real-time shipment tracking.',
    iconColor: 'text-sky-400',
    iconBg: 'bg-sky-500/10',
    cardBg: 'bg-sky-950/20',
    cardBorder: 'border-sky-500/15',
    hoverBorder: 'hover:border-sky-500/45',
    hoverBg: 'hover:bg-sky-950/35',
    hoverGlow: 'hover:shadow-[0_0_25px_rgba(14,165,233,0.15)]',
    headingColor: 'text-sky-300',
  },
  {
    icon: 'fas fa-handshake',
    name: 'HR Tech & Recruitment',
    description:
      'ATS platforms, AI resume screening, employee engagement tools, and workforce analytics dashboards.',
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
    icon: 'fas fa-network-wired',
    name: 'SaaS & B2B Tech',
    description:
      'Multi-tenant platforms, developer tools, API products, billing systems, and growth infrastructure.',
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

// Translation maps for i18n
const nameTranslations: Record<string, string> = {
  'Healthcare & MedTech': 'الرعاية الصحية والتكنولوجيا الطبية',
  'Fintech & Banking': 'التكنولوجيا المالية والخدمات المصرفية',
  'eCommerce & Retail': 'التجارة الإلكترونية والتجزئة',
  'EdTech & E-Learning': 'تكنولوجيا التعليم والتعلم الإلكتروني',
  'Real Estate & PropTech': 'العقارات وتكنولوجيا العقار',
  'Logistics & Supply Chain': 'الخدمات اللوجستية وسلاسل الإمداد',
  'HR Tech & Recruitment': 'تكنولوجيا الموارد البشرية والتوظيف',
  'SaaS & B2B Tech': 'البرمجيات كخدمة والتكنولوجيا الموجهة للأعمال',
};

const descriptionTranslations: Record<string, string> = {
  'HIPAA-compliant platforms, patient portals, telehealth apps, clinical AI, and medical data pipelines.':
    'منصات متوافقة مع HIPAA، بوابات المرضى، تطبيقات الطب عن بعد، الذكاء الاصطناعي السريري، وخطوط البيانات الطبية.',
  'Payment platforms, trading systems, fraud detection AI, KYC automation, and regulatory compliance tools.':
    'منصات الدفع، أنظمة التداول، الذكاء الاصطناعي للكشف عن الاحتيال، أتمتة إعرف عميلك (KYC)، وأدوات الامتثال التنظيمي.',
  'Custom storefronts, AI recommendation engines, inventory management, and omnichannel commerce platforms.':
    'واجهات متاجر مخصصة، محركات توصية بالذكاء الاصطناعي، إدارة المخزون، ومنصات التجارة متعددة القنوات.',
  'LMS platforms, AI tutoring systems, adaptive learning engines, and assessment automation tools.':
    'منصات LMS، أنظمة التدريس بالذكاء الاصطناعي، محركات التعلم التكيفي، وأدوات أتمتة التقييم.',
  'Property listing platforms, AI valuation tools, CRM systems, and smart building management software.':
    'منصات عرض العقارات، أدوات التقييم بالذكاء الاصطناعي، أنظمة CRM، وبرامج إدارة المباني الذكية.',
  'Route optimization AI, inventory forecasting, fleet management, and real-time shipment tracking.':
    'الذكاء الاصطناعي لتحسين المسارات، التنبؤ بالمخزون، إدارة الأساطيل، وتتبع الشحنات في الوقت الفعلي.',
  'ATS platforms, AI resume screening, employee engagement tools, and workforce analytics dashboards.':
    'منصات ATS، فحص السير الذاتية بالذكاء الاصطناعي، أدوات تفاعل الموظفين، ولوحات تحليلات القوى العاملة.',
  'Multi-tenant platforms, developer tools, API products, billing systems, and growth infrastructure.':
    'منصات متعددة المستأجرين، أدوات المطورين، منتجات واجهة برمجة التطبيقات (API)، أنظمة الفوترة، وبنية النمو التحتية.',
};

export function IndustriesSection() {
  const { t } = useLanguage();

  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t('INDUSTRIES WE SERVE', 'القطاعات التي نخدمها')}
          title={t('Built for the Sectors Where Technology Matters Most', 'مبني للقطاعات التي تكون فيها التكنولوجيا أكثر أهمية')}
          titleId="industries-heading"
          description={t(
            "From healthcare to fintech, we deliver solutions tailored to your industry's unique needs.",
            'من الرعاية الصحية إلى التكنولوجيا المالية، نقدم حلولاً مخصصة لتلبية الاحتياجات الفريدة لقطاعك.'
          )}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {INDUSTRIES.map((industry) => (
            <div
              key={industry.name}
              className={`group cursor-default rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 ${industry.cardBg} ${industry.cardBorder} ${industry.hoverBg} ${industry.hoverBorder} ${industry.hoverGlow}`}
            >
              <span className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg text-lg transition-all duration-300 group-hover:scale-110 ${industry.iconBg} ${industry.iconColor}`} aria-hidden="true">
                <i className={industry.icon} />
              </span>
              <h3 className={`mb-2 font-display text-sm font-bold text-corematrix-textPrimary transition-colors duration-300 group-hover:${industry.headingColor}`}>
                {t(industry.name, nameTranslations[industry.name] ?? industry.name)}
              </h3>
              <p className="text-sm font-light leading-relaxed text-corematrix-textMuted/90 transition-colors duration-300 group-hover:text-corematrix-textPrimary/80">
                {t(industry.description, descriptionTranslations[industry.description] ?? industry.description)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
