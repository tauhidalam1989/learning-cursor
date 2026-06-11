'use client';

import { Container } from '@/components/ui/Container';
import StatCounter from '@/components/shared/StatCounter';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

export type TrustStat = {
  count: number;
  suffix: string;
  label: string;
  sub: string;
};

const TRUST_THEMES = [
  {
    // Stat 1: Amber
    card: 'border-amber-500/20 bg-amber-950/10 hover:border-amber-400/50 hover:bg-amber-950/20 shadow-[0_4px_20px_rgba(245,158,11,0.05)]',
    numClass: 'mb-2 block font-display text-[3rem] font-extrabold leading-none tracking-[-0.05em] text-amber-400 group-hover:text-amber-300 transition-colors duration-300',
    labelClass: 'text-sm font-semibold text-amber-400/80 group-hover:text-amber-300 transition-colors duration-300 leading-snug',
    subClass: 'text-[0.68rem] text-amber-300/60 group-hover:text-amber-200/80 transition-colors duration-300 mt-1',
  },
  {
    // Stat 2: Emerald
    card: 'border-emerald-500/20 bg-emerald-950/10 hover:border-emerald-400/50 hover:bg-emerald-950/20 shadow-[0_4px_20px_rgba(16,185,129,0.05)]',
    numClass: 'mb-2 block font-display text-[3rem] font-extrabold leading-none tracking-[-0.05em] text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300',
    labelClass: 'text-sm font-semibold text-emerald-400/80 group-hover:text-emerald-300 transition-colors duration-300 leading-snug',
    subClass: 'text-[0.68rem] text-emerald-300/60 group-hover:text-emerald-200/80 transition-colors duration-300 mt-1',
  },
  {
    // Stat 3: Sky
    card: 'border-sky-500/20 bg-sky-950/10 hover:border-sky-400/50 hover:bg-sky-950/20 shadow-[0_4px_20px_rgba(14,165,233,0.05)]',
    numClass: 'mb-2 block font-display text-[3rem] font-extrabold leading-none tracking-[-0.05em] text-sky-400 group-hover:text-sky-300 transition-colors duration-300',
    labelClass: 'text-sm font-semibold text-sky-400/80 group-hover:text-sky-300 transition-colors duration-300 leading-snug',
    subClass: 'text-[0.68rem] text-sky-300/60 group-hover:text-sky-200/80 transition-colors duration-300 mt-1',
  },
  {
    // Stat 4: Purple
    card: 'border-purple-500/20 bg-purple-950/10 hover:border-purple-400/50 hover:bg-purple-950/20 shadow-[0_4px_20px_rgba(168,85,247,0.05)]',
    numClass: 'mb-2 block font-display text-[3rem] font-extrabold leading-none tracking-[-0.05em] text-purple-400 group-hover:text-purple-300 transition-colors duration-300',
    labelClass: 'text-sm font-semibold text-purple-400/80 group-hover:text-purple-300 transition-colors duration-300 leading-snug',
    subClass: 'text-[0.68rem] text-purple-300/60 group-hover:text-purple-200/80 transition-colors duration-300 mt-1',
  },
];

export function ContactTrustSection() {
  const { t } = useLanguage();

  const TRUST_STATS: TrustStat[] = [
    {
      count: 50,
      suffix: '+',
      label: t('Projects Delivered', 'مشاريع تم تسليمها'),
      sub: t('Across 12+ countries', 'عبر أكثر من 12 دولة'),
    },
    {
      count: 98,
      suffix: '%',
      label: t('Client Retention', 'معدل استمرار العملاء'),
      sub: t('They keep coming back', 'يعودون دائماً للعمل معنا'),
    },
    {
      count: 24,
      suffix: 'h',
      label: t('Response Time', 'وقت الاستجابة'),
      sub: t('Max on business days', 'الحد الأقصى في أيام العمل'),
    },
    {
      count: 5,
      suffix: '+',
      label: t('Years Building', 'سنوات من التطوير'),
      sub: t('AI-first since 2022', 'التركيز على الذكاء الاصطناعي منذ 2022'),
    },
  ];

  return (
    <section
      id="contact-trust"
      aria-labelledby="contact-trust-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t("WHY TRUST US", "لماذا تثق بنا")}
          title={t("Numbers That Speak For Themselves", "أرقام وحقائق تتحدث عن نفسها")}
          titleId="contact-trust-heading"
          description={t("Trust built through consistent delivery and client success.", "ثقة بنيناها عبر الالتزام الدائم بالتسليم المستمر ونجاح عملائنا.")}
        />

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {TRUST_STATS.map((stat, idx) => {
            const theme = TRUST_THEMES[idx % TRUST_THEMES.length];
            return (
              <div
                key={stat.label}
                className={`group flex flex-col items-center rounded-2xl border p-10 text-center transition-all duration-300 ${theme.card}`}
              >
                <StatCounter
                  count={stat.count}
                  suffix={stat.suffix}
                  label={stat.label}
                  sub={stat.sub}
                  numClassName={theme.numClass}
                  labelClassName={theme.labelClass}
                  subClassName={theme.subClass}
                />
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
