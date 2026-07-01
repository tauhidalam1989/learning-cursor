'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_SERVICES_DROPDOWN } from '@/config/nav';
import { useLanguage } from '@/context/LanguageContext';

const THEME_TEMPLATES = [
  {
    cardClass: 'border-cyan-500/20 bg-cyan-950/10 hover:border-cyan-400/50 hover:bg-cyan-950/20 text-cyan-400 hover:text-cyan-300 shadow-[0_2px_10px_rgba(6,182,212,0.02)]',
    iconBg: 'bg-cyan-950/30 border-cyan-800/20 text-cyan-400',
  },
  {
    cardClass: 'border-emerald-500/20 bg-emerald-950/10 hover:border-emerald-400/50 hover:bg-emerald-950/20 text-emerald-400 hover:text-emerald-300 shadow-[0_2px_10px_rgba(16,185,129,0.02)]',
    iconBg: 'bg-emerald-950/30 border-emerald-800/20 text-emerald-400',
  },
  {
    cardClass: 'border-sky-500/20 bg-sky-950/10 hover:border-sky-400/50 hover:bg-sky-950/20 text-sky-400 hover:text-sky-300 shadow-[0_2px_10px_rgba(14,165,233,0.02)]',
    iconBg: 'bg-sky-950/30 border-sky-800/20 text-sky-400',
  },
  {
    cardClass: 'border-amber-500/20 bg-amber-950/10 hover:border-amber-400/50 hover:bg-amber-950/20 text-amber-400 hover:text-amber-300 shadow-[0_2px_10px_rgba(245,158,11,0.02)]',
    iconBg: 'bg-amber-950/30 border-amber-800/20 text-amber-400',
  },
  {
    cardClass: 'border-purple-500/20 bg-purple-950/10 hover:border-purple-400/50 hover:bg-purple-950/20 text-purple-400 hover:text-purple-300 shadow-[0_2px_10px_rgba(168,85,247,0.02)]',
    iconBg: 'bg-purple-950/30 border-purple-800/20 text-purple-400',
  },
  {
    cardClass: 'border-rose-500/20 bg-rose-950/10 hover:border-rose-400/50 hover:bg-rose-950/20 text-rose-400 hover:text-rose-300 shadow-[0_2px_10px_rgba(244,63,94,0.02)]',
    iconBg: 'bg-rose-950/30 border-rose-800/20 text-rose-400',
  },
  {
    cardClass: 'border-teal-500/20 bg-teal-950/10 hover:border-teal-400/50 hover:bg-teal-950/20 text-teal-400 hover:text-teal-300 shadow-[0_2px_10px_rgba(20,184,166,0.02)]',
    iconBg: 'bg-teal-950/30 border-teal-800/20 text-teal-400',
  },
];

const renderIcon = (iconClass: string, className = "text-sm") => {
  if (!iconClass) return null;
  const trimmed = iconClass.trim();
  if (
    trimmed.startsWith('fa-') ||
    trimmed.startsWith('fas ') ||
    trimmed.startsWith('fab ') ||
    trimmed.startsWith('far ') ||
    trimmed.startsWith('fal ') ||
    trimmed.startsWith('fad ')
  ) {
    return <i className={`${trimmed} ${className}`} />;
  }
  return <span className="text-base leading-none">{trimmed}</span>;
};

const MEGA_SERVICES_THEMES = [
  {
    icon: 'fas fa-brain',
    titleEn: 'AI Product Development',
    titleAr: 'تطوير منتجات الذكاء الاصطناعي',
    href: '/services/ai-product-development',
    cardClass: 'border-cyan-500/20 bg-cyan-950/10 hover:border-cyan-400/50 hover:bg-cyan-950/20 text-cyan-400 hover:text-cyan-300 shadow-[0_2px_10px_rgba(6,182,212,0.02)]',
    iconBg: 'bg-cyan-950/30 border-cyan-800/20 text-cyan-400',
  },
  {
    icon: 'fas fa-laptop-code',
    titleEn: 'Web Application Development',
    titleAr: 'تطوير تطبيقات الويب المخصصة',
    href: '/services/custom-web-application-development',
    cardClass: 'border-emerald-500/20 bg-emerald-950/10 hover:border-emerald-400/50 hover:bg-emerald-950/20 text-emerald-400 hover:text-emerald-300 shadow-[0_2px_10px_rgba(16,185,129,0.02)]',
    iconBg: 'bg-emerald-950/30 border-emerald-800/20 text-emerald-400',
  },
  {
    icon: 'fas fa-cloud',
    titleEn: 'SaaS Platform Development',
    titleAr: 'تطوير منصات SaaS',
    href: '/services/saas-platform-development',
    cardClass: 'border-sky-500/20 bg-sky-950/10 hover:border-sky-400/50 hover:bg-sky-950/20 text-sky-400 hover:text-sky-300 shadow-[0_2px_10px_rgba(14,165,233,0.02)]',
    iconBg: 'bg-sky-950/30 border-sky-800/20 text-sky-400',
  },
  {
    icon: 'fas fa-mobile-alt',
    titleEn: 'Mobile App Development',
    titleAr: 'تطوير تطبيقات الهاتف المحمول',
    href: '/services/mobile-app-development',
    cardClass: 'border-amber-500/20 bg-amber-950/10 hover:border-amber-400/50 hover:bg-amber-950/20 text-amber-400 hover:text-amber-300 shadow-[0_2px_10px_rgba(245,158,11,0.02)]',
    iconBg: 'bg-amber-950/30 border-amber-800/20 text-amber-400',
  },
  {
    icon: 'fas fa-users',
    titleEn: 'Dedicated Development Teams',
    titleAr: 'فرق التطوير المخصصة',
    href: '/services/dedicated-development-teams',
    cardClass: 'border-purple-500/20 bg-purple-950/10 hover:border-purple-400/50 hover:bg-purple-950/20 text-purple-400 hover:text-purple-300 shadow-[0_2px_10px_rgba(168,85,247,0.02)]',
    iconBg: 'bg-purple-950/30 border-purple-800/20 text-purple-400',
  },
  {
    icon: 'fas fa-cogs',
    titleEn: 'AI Automation & Workflows',
    titleAr: 'أتمتة الذكاء الاصطناعي وتدفقات العمل',
    href: '/services/ai-automation-workflow-intelligence',
    cardClass: 'border-rose-500/20 bg-rose-950/10 hover:border-rose-400/50 hover:bg-rose-950/20 text-rose-400 hover:text-rose-300 shadow-[0_2px_10px_rgba(244,63,94,0.02)]',
    iconBg: 'bg-rose-950/30 border-rose-800/20 text-rose-400',
  },
  {
    icon: 'fas fa-chart-line',
    titleEn: 'ML & Predictive Analytics',
    titleAr: 'التعلم الآلي والتحليلات التنبؤية',
    href: '/services/machine-learning-predictive-analytics',
    cardClass: 'border-teal-500/20 bg-teal-950/10 hover:border-teal-400/50 hover:bg-teal-950/20 text-teal-400 hover:text-teal-300 shadow-[0_2px_10px_rgba(20,184,166,0.02)]',
    iconBg: 'bg-teal-950/30 border-teal-800/20 text-teal-400',
  },
];

export function ServicesNavItemDesktop() {
  const pathname = usePathname() || '/';
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    let active = true;
    async function getServices() {
      try {
        const res = await fetch('/api/services');
        if (res.ok && active) {
          const data = await res.json();
          const sorted = (data || [])
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
            .slice(0, 8);
          if (sorted.length > 0) {
            setServices(sorted);
          }
        }
      } catch (err) {
        console.error('Error fetching header services:', err);
      }
    }
    getServices();
    return () => {
      active = false;
    };
  }, []);

  const servicesActive =
    pathname === '/services' || pathname.startsWith('/services/');

  const handleClose = () => setIsOpen(false);

  const resolvedList = services.length > 0
    ? services.map((s, idx) => {
        const theme = THEME_TEMPLATES[idx % THEME_TEMPLATES.length];
        return {
          icon: s.cardIcon || s.icon || 'fas fa-cog',
          titleEn: s.title_en || s.title || '',
          titleAr: s.title_ar || s.title_en || s.title || '',
          href: `/services/${s.detailSlug}`,
          cardClass: theme.cardClass,
          iconBg: theme.iconBg
        };
      })
    : MEGA_SERVICES_THEMES;

  return (
    <div
      className="group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        aria-haspopup="menu"
        onClick={() => setIsOpen((prev) => !prev)}
        className={
          `inline-flex items-center gap-1 px-3 py-2 text-sm font-medium uppercase tracking-wider transition-all ` +
          (servicesActive ? 'text-[#149253]' : 'text-white/80 hover:text-[#149253]')
        }
      >
        {t('SERVICE', 'الخدمات')}
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        role="menu"
        aria-label={t('Services', 'الخدمات')}
        className={`absolute left-0 right-0 top-[50px] z-50 w-full pt-[30px] transition-all duration-200 ${
          isOpen
            ? 'visible opacity-100 translate-y-0'
            : 'invisible opacity-0 -translate-y-1 pointer-events-none'
        }`}
      >
        <div className="border-y border-white/10 bg-gradient-to-b from-[#02140f]/98 via-[#02140f]/98 to-[#010b08]/98 shadow-[0_24px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl py-8 text-left">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-10">
              
              {/* Column 1: About Corematrix Services (span-3) */}
              <div className="col-span-3 flex flex-col justify-between border-r border-white/5 pr-8 rtl:border-r-0 rtl:border-l rtl:pr-0 rtl:pl-8 rtl:text-right">
                <div>
                  <p className="font-display text-[0.7rem] font-bold uppercase tracking-widest text-[#149253]">
                    {t('Corematrix Services', 'خدمات كورماتريكس')}
                  </p>
                  <h4 className="mt-2 font-display text-base font-extrabold text-white tracking-tight">
                    {t('Engineering the Future', 'هندسة المستقبل')}
                  </h4>
                  <p className="mt-3 text-xs font-light leading-relaxed text-white/70">
                    {t(
                      'We construct production-ready AI products, cloud ecosystems, and performant web interfaces that survive real-world scale and traffic.',
                      'نقوم ببناء منتجات ذكاء اصطناعي جاهزة للإنتاج، وأنظمة سحابية متكاملة، وواجهات ويب عالية الأداء تتحمل التشغيل الفعلي على نطاق واسع.'
                    )}
                  </p>
                </div>
                
                <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-950/15 p-3.5 text-center">
                  <span className="h-1.5 w-1.5 inline-block rounded-full bg-emerald-400 dot-pulse" />
                  <p className="mt-0.5 font-display text-xs font-bold text-emerald-400">
                    {t('AI-First Innovation', 'الابتكار الموجه للذكاء الاصطناعي')}
                  </p>
                  <p className="mt-0.5 text-[0.65rem] text-emerald-300/70">
                    {t('Deploying intelligent solutions globally', 'نشر الحلول الذكية على مستوى العالم')}
                  </p>
                </div>
              </div>
 
              {/* Column 2: Service list in cards (span-6) */}
              <div className="col-span-6 flex flex-col rtl:text-right">
                <p className="font-display text-[0.7rem] font-bold uppercase tracking-widest text-white/40 mb-3">
                  {t('Solutions', 'الحلول والخدمات')}
                </p>
                <div className="grid grid-cols-2 gap-3 max-h-[290px] overflow-y-auto pl-1 pr-2 custom-scrollbar">
                  {resolvedList.map((s) => {
                    return (
                      <Link
                        key={s.href}
                        role="menuitem"
                        href={s.href}
                        onClick={handleClose}
                        className={`flex items-center gap-3 rounded-xl border p-3 text-xs font-bold transition-all duration-300 ${s.cardClass}`}
                      >
                        <span className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border text-sm transition-transform duration-300 ${s.iconBg}`}>
                          {renderIcon(s.icon)}
                        </span>
                        <span className="leading-snug">{language === 'ar' ? s.titleAr : s.titleEn}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Column 3: Quick Navigation (span-3) */}
              <div className="col-span-3 flex flex-col justify-between border-l border-white/5 pl-8 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-8 rtl:text-right">
                <div>
                  <p className="font-display text-[0.7rem] font-bold uppercase tracking-widest text-white/40 mb-3">
                    {t('Navigation', 'التنقل')}
                  </p>
                  <div className="space-y-2">
                    <Link
                      role="menuitem"
                      href="/services"
                      onClick={handleClose}
                      className="block text-xs font-bold text-[#149253] hover:text-[#149253]/80 transition-colors"
                    >
                      {t('All Services', 'كل الخدمات')}
                    </Link>
                    <Link
                      role="menuitem"
                      href="/services/adobe-licensing"
                      onClick={handleClose}
                      className="block text-xs font-semibold text-white/80 hover:text-[#149253] transition-colors"
                    >
                      {t('Adobe Licensing', 'ترخيص أدوبي')}
                    </Link>
                  </div>
                </div>

                <div className="mt-4 border-t border-white/5 pt-4">
                  <p className="text-[0.7rem] text-white/60 leading-relaxed">
                    {t('Have a specific integration requirement?', 'هل لديك متطلبات تكامل مخصصة؟')}
                  </p>
                  <Link
                    href="/contact"
                    onClick={handleClose}
                    className="mt-3 inline-flex w-full items-center justify-center rounded-lg bg-[#149253] py-2 text-xs font-bold text-white transition hover:bg-[#149253]/90 shadow-lg hover:shadow-[#149253]/20 hover:scale-[1.01] duration-300"
                  >
                    {t('Get in Touch →', 'تواصل معنا ←')}
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ServicesNavItemMobile({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname() || '/';
  const { t, language } = useLanguage();
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    let active = true;
    async function getServices() {
      try {
        const res = await fetch('/api/services');
        if (res.ok && active) {
          const data = await res.json();
          const sorted = (data || [])
            .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
            .slice(0, 8);
          if (sorted.length > 0) {
            setServices(sorted);
          }
        }
      } catch (err) {
        console.error('Error fetching header services:', err);
      }
    }
    getServices();
    return () => {
      active = false;
    };
  }, []);

  const resolvedList = services.length > 0
    ? services.map((s, idx) => {
        const theme = THEME_TEMPLATES[idx % THEME_TEMPLATES.length];
        return {
          icon: s.cardIcon || s.icon || 'fas fa-cog',
          titleEn: s.title_en || s.title || '',
          titleAr: s.title_ar || s.title_en || s.title || '',
          href: `/services/${s.detailSlug}`,
          cardClass: theme.cardClass,
          iconBg: theme.iconBg
        };
      })
    : MEGA_SERVICES_THEMES;

  return (
    <li className="rounded-xl border border-white/8 bg-white/[0.02] overflow-hidden list-none">
      {/* Accordion Trigger for mobile services dropdown */}
      <button
        type="button"
        onClick={() => setIsMobileExpanded((prev) => !prev)}
        className="flex w-full items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-wider text-white/60 focus:outline-none"
      >
        <span>{t('SERVICE', 'الخدمات')}</span>
        <svg
          className={`h-4 w-4 text-white/40 transition-transform duration-200 ${isMobileExpanded ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Accordion Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isMobileExpanded ? 'max-h-[900px] border-t border-white/5 py-4' : 'max-h-0 overflow-hidden pointer-events-none'
        }`}
      >
        {/* Solutions section */}
        <div className="px-4">
          <p className="font-display text-[0.65rem] font-bold uppercase tracking-widest text-white/40 mb-3">
            {t('Solutions', 'الحلول والخدمات')}
          </p>
          <div className="space-y-2">
            {resolvedList.map((s) => {
              return (
                <Link
                  key={s.href}
                  href={s.href}
                  onClick={onNavigate}
                  className={`flex items-center gap-3 rounded-xl border p-2.5 text-xs font-bold transition-all duration-300 ${s.cardClass}`}
                >
                  <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg border text-xs ${s.iconBg}`}>
                    {renderIcon(s.icon, "text-xs")}
                  </span>
                  <span>{language === 'ar' ? s.titleAr : s.titleEn}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Quick Navigation & CTA */}
        <div className="mt-4 border-t border-white/5 pt-4 px-4">
          <p className="font-display text-[0.65rem] font-bold uppercase tracking-widest text-white/40 mb-3">
            {t('Navigation', 'التنقل')}
          </p>
          <div className="flex flex-col gap-2.5 pl-2 rtl:pl-0 rtl:pr-2">
            <Link
              href="/services"
              onClick={onNavigate}
              className={`text-xs font-bold ${pathname === '/services' ? 'text-[#149253]' : 'text-white/80 hover:text-[#149253]'}`}
            >
              {t('All Services', 'كل الخدمات')}
            </Link>
            <Link
              href="/services/adobe-licensing"
              onClick={onNavigate}
              className={`text-xs font-semibold ${pathname === '/services/adobe-licensing' ? 'text-[#149253]' : 'text-white/85 hover:text-[#149253]'}`}
            >
              {t('Adobe Licensing', 'ترخيص أدوبي')}
            </Link>
          </div>

          <Link
            href="/contact"
            onClick={onNavigate}
            className="mt-4 flex w-full items-center justify-center rounded-lg bg-[#149253] py-2 text-xs font-bold text-white transition hover:bg-[#149253]/90 shadow-md"
          >
            {t('Get in Touch →', 'تواصل معنا ←')}
          </Link>
        </div>
      </div>
    </li>
  );
}
