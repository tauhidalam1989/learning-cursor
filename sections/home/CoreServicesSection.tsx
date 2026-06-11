'use client';

import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

type Service = {
  icon: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  tags: string[];
  iconColor: string;
  iconBg: string;
  iconBorder: string;
  glowLine: string;
};

const SERVICES: Service[] = [
  {
    icon: 'fas fa-brain',
    title_en: 'AI Product Development',
    title_ar: 'تطوير منتجات الذكاء الاصطناعي',
    description_en:
      'We build end-to-end AI products — LLM-powered apps, intelligent agents, computer vision, and NLP systems tailored to your business goals.',
    description_ar:
      'نحن نبني منتجات ذكاء اصطناعي متكاملة — تطبيقات قائمة على النماذج اللغوية الكبيرة، والوكلاء الأذكياء، والرؤية الحاسوبية، وأنظمة معالجة اللغة الطبيعية المخصصة لأهداف عملك.',
    tags: ['#LLM', '#GPT', '#NLP'],
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-950/40',
    iconBorder: 'border-purple-700/20',
    glowLine: 'via-purple-500',
  },
  {
    icon: 'fas fa-cogs',
    title_en: 'Custom AI & Automation',
    title_ar: 'الذكاء الاصطناعي المخصص والأتمتة',
    description_en:
      'Eliminate repetitive workflows with intelligent automation. We build RAG systems, custom AI pipelines, and process automation tools that cut costs and save time.',
    description_ar:
      'تخلص من سير العمل المتكرر باستخدام الأتمتة الذكية. نحن نبني أنظمة RAG، وخطوط أنابيب الذكاء الاصطناعي المخصصة، وأدوات أتمتة العمليات التي تقلل التكاليف وتوفر الوقت.',
    tags: ['#RAG', '#Agents', '#ML'],
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-950/40',
    iconBorder: 'border-amber-700/20',
    glowLine: 'via-amber-500',
  },
  {
    icon: 'fas fa-code',
    title_en: 'Web Application Development',
    title_ar: 'تطوير تطبيقات الويب',
    description_en:
      'High-performance web apps built with Next.js, React, and modern full-stack technologies — designed for speed, scalability, and exceptional UX.',
    description_ar:
      'تطبيقات ويب عالية الأداء تم بناؤها باستخدام Next.js و React وتقنيات التطوير الكاملة الحديثة — صُممت من أجل السرعة وقابلية التوسع وتجربة مستخدم استثنائية.',
    tags: ['#Next.js', '#React', '#TypeScript'],
    iconColor: 'text-sky-400',
    iconBg: 'bg-sky-950/40',
    iconBorder: 'border-sky-700/20',
    glowLine: 'via-sky-500',
  },
  {
    icon: 'fas fa-mobile-alt',
    title_en: 'Mobile App Development',
    title_ar: 'تطوير تطبيقات الهاتف المحمول',
    description_en:
      'Cross-platform mobile apps using React Native and Flutter — beautifully designed, fast, built for iOS and Android from a single codebase.',
    description_ar:
      'تطبيقات هاتف محمول متعددة المنصات باستخدام React Native و Flutter — مصممة بشكل جميل وسريع، ومبنية لنظامي iOS و Android من قاعدة كود واحدة.',
    tags: ['#ReactNative', '#Flutter', '#iOS'],
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-950/40',
    iconBorder: 'border-emerald-700/20',
    glowLine: 'via-emerald-500',
  },
  {
    icon: 'fas fa-cloud',
    title_en: 'SaaS Platform Development',
    title_ar: 'تطوير منصات البرمجيات كخدمة (SaaS)',
    description_en:
      'From MVP to full-scale multi-tenant SaaS — we architect, build, and scale subscription-based software products that grow with your business.',
    description_ar:
      'من منتج MVP الأولي إلى نظام SaaS متعدد المستأجرين واسع النطاق — نحن نصمم ونبني ونوسع منتجات برمجية قائمة على الاشتراك تنمو مع نمو عملك.',
    tags: ['#SaaS', '#Cloud', '#Architecture'],
    iconColor: 'text-pink-400',
    iconBg: 'bg-pink-950/40',
    iconBorder: 'border-pink-700/20',
    glowLine: 'via-pink-500',
  },
  {
    icon: 'fas fa-users',
    title_en: 'Dedicated Dev Teams',
    title_ar: 'فرق تطوير مخصصة',
    description_en:
      'Scale engineering capacity with vetted developers. Dedicated teams, staff augmentation, or full project outsourcing — transparent delivery, flexible contracts.',
    description_ar:
      'زد من طاقتك الهندسية مع مطورين معتمدين. فرق مخصصة، أو زيادة عدد الموظفين، أو تعهيد كامل للمشروع — تسليم شفاف، وعقود مرنة.',
    tags: ['#Outsourcing', '#Teams', '#Scale'],
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-950/40',
    iconBorder: 'border-cyan-700/20',
    glowLine: 'via-cyan-500',
  },
];

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

export function CoreServicesSection() {
  const { language, t } = useLanguage();

  return (
    <section
      id="core-services"
      aria-labelledby="core-services-heading"
      className="border-t border-corematrix-border bg-corematrix-bg1 py-16 lg:py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t("CORE SERVICES", "الخدمات الأساسية")}
          title={t("Everything You Need to Win with Technology", "كل ما تحتاجه للفوز بالتميز التقني")}
          titleId="core-services-heading"
          description={t(
            "From AI products to full-stack platforms — we engineer solutions that perform at scale.",
            "من منتجات الذكاء الاصطناعي إلى المنصات الكاملة — نحن نصمم حلولاً تعمل بنجاح على نطاق واسع."
          )}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <article
              key={s.title_en}
              className="group relative overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card p-7 transition-all duration-300 hover:-translate-y-1 card-glow reveal"
            >
              <div className={`absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent ${s.glowLine} to-transparent opacity-0 transition-opacity group-hover:opacity-100`} />
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg border ${s.iconBorder} ${s.iconBg} text-base ${s.iconColor}`}>
                <i className={s.icon} aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-corematrix-textPrimary">
                {language === 'ar' ? s.title_ar : s.title_en}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-corematrix-textSecondary">
                {language === 'ar' ? s.description_ar : s.description_en}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.tags.map((tag) => {
                  const theme = getTagTheme(tag);
                  return (
                    <span
                      key={tag}
                      className={`rounded border px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider transition-colors duration-200 cursor-default ${theme.bg} ${theme.text} ${theme.border}`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

