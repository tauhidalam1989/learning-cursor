'use client';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';

type ServiceTile = {
  icon: string;
  title: string;
  tag: string;
  href?: string;
  iconColor: string;
  iconBg: string;
  cardBg: string;
  cardBorder: string;
  hoverBorder: string;
  hoverBg: string;
  hoverGlow: string;
  titleColor: string;
  tagColor: string;
};

const SERVICE_TILES: ServiceTile[] = [
  {
    icon: 'fas fa-brain',
    title: 'AI Development',
    tag: 'LLMs · Agents · ML',
    href: '/services/ai-product-development',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
    cardBg: 'bg-purple-950/20',
    cardBorder: 'border-purple-500/15',
    hoverBorder: 'hover:border-purple-500/40',
    hoverBg: 'hover:bg-purple-950/35',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(168,85,247,0.15)]',
    titleColor: 'text-purple-100',
    tagColor: 'text-purple-300/70',
  },
  {
    icon: 'fas fa-code',
    title: 'Web Applications',
    tag: 'Next.js · React · Node',
    href: '/services/custom-web-application-development',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
    cardBg: 'bg-cyan-950/20',
    cardBorder: 'border-cyan-500/15',
    hoverBorder: 'hover:border-cyan-500/40',
    hoverBg: 'hover:bg-cyan-950/35',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(6,182,212,0.15)]',
    titleColor: 'text-cyan-100',
    tagColor: 'text-cyan-300/70',
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'Mobile Apps',
    tag: 'iOS · Android · RN',
    href: '/services/mobile-app-development',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10 border-amber-500/20',
    cardBg: 'bg-amber-950/20',
    cardBorder: 'border-amber-500/15',
    hoverBorder: 'hover:border-amber-500/40',
    hoverBg: 'hover:bg-amber-950/35',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(245,158,11,0.15)]',
    titleColor: 'text-amber-100',
    tagColor: 'text-amber-300/70',
  },
  {
    icon: 'fas fa-cloud',
    title: 'SaaS Platforms',
    tag: 'Multi-tenant · Cloud',
    href: '/services/saas-platform-development',
    iconColor: 'text-indigo-400',
    iconBg: 'bg-indigo-500/10 border-indigo-500/20',
    cardBg: 'bg-indigo-950/20',
    cardBorder: 'border-indigo-500/15',
    hoverBorder: 'hover:border-indigo-500/40',
    hoverBg: 'hover:bg-indigo-950/35',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(99,102,241,0.15)]',
    titleColor: 'text-indigo-100',
    tagColor: 'text-indigo-300/70',
  },
  {
    icon: 'fas fa-cogs',
    title: 'AI Automation',
    tag: 'RAG · Pipelines · Flows',
    href: '/services/ai-product-development',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10 border-orange-500/20',
    cardBg: 'bg-orange-950/20',
    cardBorder: 'border-orange-500/15',
    hoverBorder: 'hover:border-orange-500/40',
    hoverBg: 'hover:bg-orange-950/35',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(249,115,22,0.15)]',
    titleColor: 'text-orange-100',
    tagColor: 'text-orange-300/70',
  },
  {
    icon: 'fas fa-users',
    title: 'Dedicated Teams',
    tag: 'Staffing · Outsourcing',
    href: '/services/dedicated-development-teams',
    iconColor: 'text-rose-400',
    iconBg: 'bg-rose-500/10 border-rose-500/20',
    cardBg: 'bg-rose-950/20',
    cardBorder: 'border-rose-500/15',
    hoverBorder: 'hover:border-rose-500/40',
    hoverBg: 'hover:bg-rose-950/35',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(244,63,94,0.15)]',
    titleColor: 'text-rose-100',
    tagColor: 'text-rose-300/70',
  },
  {
    icon: 'fas fa-scroll',
    title: 'Adobe Licensing',
    tag: 'VIP · ETLA · Compliance',
    href: '/services/adobe-licensing',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border-emerald-500/20',
    cardBg: 'bg-emerald-950/20',
    cardBorder: 'border-emerald-500/15',
    hoverBorder: 'hover:border-emerald-500/40',
    hoverBg: 'hover:bg-emerald-950/35',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(16,185,129,0.15)]',
    titleColor: 'text-emerald-100',
    tagColor: 'text-emerald-300/70',
  },
];

const NAV_PILLS = [
  {
    label: 'AI Development',
    href: '#ai-dev',
    classes: 'bg-purple-950/20 border-purple-500/15 text-purple-300 hover:bg-purple-950/40 hover:border-purple-500/45 hover:text-purple-200',
  },
  {
    label: 'Web Apps',
    href: '#web-dev',
    classes: 'bg-cyan-950/20 border-cyan-500/15 text-cyan-300 hover:bg-cyan-950/40 hover:border-cyan-500/45 hover:text-cyan-200',
  },
  {
    label: 'Mobile',
    href: '#web-dev',
    classes: 'bg-amber-950/20 border-amber-500/15 text-amber-300 hover:bg-amber-950/40 hover:border-amber-500/45 hover:text-amber-200',
  },
  {
    label: 'SaaS',
    href: '#saas',
    classes: 'bg-indigo-950/20 border-indigo-500/15 text-indigo-300 hover:bg-indigo-950/40 hover:border-indigo-500/45 hover:text-indigo-200',
  },
  {
    label: 'Dedicated Teams',
    href: '#teams',
    classes: 'bg-rose-950/20 border-rose-500/15 text-rose-300 hover:bg-rose-950/40 hover:border-rose-500/45 hover:text-rose-200',
  },
];

export function ServicesHeroSection() {
  const { t } = useLanguage();
  return (
    <section
      id="services-hero"
      aria-labelledby="services-hero-heading"
      className="relative min-h-[78vh] flex flex-col justify-center overflow-hidden bg-corematrix-bg1 pt-12 pb-16"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.15]" aria-hidden>
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="sgrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a3525" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#sgrid)" />
        </svg>
      </div>
      <div className="pointer-events-none absolute -right-24 -top-44 h-[700px] w-[700px] rounded-full bg-corematrix-green700 opacity-[0.10] blur-[130px]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-[500px] w-[500px] rounded-full bg-corematrix-green700 opacity-[0.05] blur-[120px]" aria-hidden />

      <Container className="relative z-10 grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-corematrix-textDim">
            <Link href="/" className="hover:text-corematrix-textMuted">
              {t('Home', 'الرئيسية')}
            </Link>
            <span aria-hidden>›</span>
            <span className="text-corematrix-green400">{t('Services', 'الخدمات')}</span>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-corematrix-green700 bg-corematrix-green900/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-corematrix-green400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-corematrix-green400" />
            {t('Full-Service AI & Tech Company', 'شركة ذكاء اصطناعي وتكنولوجيا شاملة')}
          </div>

          <h1
            id="services-hero-heading"
            className="font-display text-[clamp(2.5rem,4.5vw,4.2rem)] font-extrabold leading-[1.05] tracking-tight text-corematrix-textPrimary"
          >
            {t('Services That Turn', 'خدمات تحول')}
            <br />
            <em className="not-italic text-corematrix-green400">
              {t('Ideas Into', 'الأفكار إلى')}
            </em>
            {' '}
            {t('Intelligent Products', 'منتجات ذكية')}
          </h1>

          <p className="mt-6 max-w-[560px] text-base font-light leading-relaxed text-corematrix-textSecondary">
            {t(
              'From custom AI systems and LLM-powered applications to full-stack web platforms and dedicated engineering teams — we build technology that solves real business problems at scale.',
              'من أنظمة الذكاء الاصطناعي المخصصة وتطبيقات LLM إلى منصات الويب المتكاملة والفرق الهندسية المخصصة — نبني تقنيات تحل مشاكل الأعمال الحقيقية على نطاق واسع.'
            )}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#services"
              className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              {t('Explore All Services →', 'استكشاف جميع الخدمات →')}
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border border-corematrix-border2 bg-transparent px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green700 hover:bg-corematrix-green900/20"
            >
              {t('Get a Free Consultation', 'احصل على استشارة مجانية')}
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {NAV_PILLS.map((pill) => (
              <Link
                key={pill.label}
                href={pill.href}
                className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all duration-300 ${pill.classes}`}
              >
                {t(pill.label, {
                  'AI Development': 'تطوير الذكاء الاصطناعي',
                  'Web Apps': 'تطبيقات الويب',
                  'Mobile': 'موبايل',
                  'SaaS': 'SaaS',
                  'Dedicated Teams': 'فرق مخصصة',
                }[pill.label])}
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3">
          {SERVICE_TILES.map((tile) => {
            const cardClass =
              `reveal rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 ${tile.cardBorder} ${tile.cardBg} ${tile.hoverBorder} ${tile.hoverBg} ${tile.hoverGlow} ` +
              (tile.href ? 'block cursor-pointer' : 'cursor-default');
            const inner = (
              <>
                <span className={`shrink-0 flex h-9 w-9 items-center justify-center rounded-lg border text-base ${tile.iconBg} ${tile.iconColor}`} aria-hidden="true">
                  <i className={tile.icon} />
                </span>
                <h3 className={`mt-3 font-display text-sm font-bold ${tile.titleColor}`}>
                  {t(tile.title, {
                    'AI Development': 'تطوير الذكاء الاصطناعي',
                    'Web Applications': 'تطبيقات الويب',
                    'Mobile Apps': 'تطبيقات الموبايل',
                    'SaaS Platforms': 'منصات SaaS',
                    'AI Automation': 'أتمتة الذكاء الاصطناعي',
                    'Dedicated Teams': 'فرق مخصصة',
                    'Adobe Licensing': 'ترخيص أدوبي',
                  }[tile.title])}
                </h3>
                <p className={`mt-0.5 text-xs ${tile.tagColor}`}>
                  {t(tile.tag, {
                    'LLMs · Agents · ML': 'نماذج اللغة الكبيرة · الوكلاء · تعلم الآلة',
                    'Next.js · React · Node': 'Next.js · React · Node',
                    'iOS · Android · RN': 'iOS · Android · RN',
                    'Multi-tenant · Cloud': 'متعدد المستأجرين · سحابة',
                    'RAG · Pipelines · Flows': 'RAG · خطوط الأنابيب · التدفقات',
                    'Staffing · Outsourcing': 'التوظيف · التعهيد',
                    'VIP · ETLA · Compliance': 'VIP · ETLA · الامتثال',
                  }[tile.tag])}
                </p>
              </>
            );
            return tile.href ? (
              <Link key={tile.title} href={tile.href} className={cardClass}>
                {inner}
              </Link>
            ) : (
              <div key={tile.title} className={cardClass}>
                {inner}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
