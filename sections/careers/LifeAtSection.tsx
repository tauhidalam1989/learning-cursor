'use client';

import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { LIFE_CELLS } from '@/data/careersData';
import { useLanguage } from '@/context/LanguageContext';

// Explicitly typed translation maps for i18n
const cellTranslations: Record<string, string> = {
  'Deep Work Sessions': 'جلسات العمل العميق',
  'Weekly Team Standups': 'الاجتماعات الأسبوعية للفريق',
  'Hackathon Fridays': 'جمعة الهاكاثون الأسبوعية',
  'Learning Sessions': 'جلسات التعلم ومشاركة المعرفة',
  'Product Demos': 'عروض توضيحية للمنتجات',
  'AI Research Club': 'نادي أبحاث الذكاء الاصطناعي',
};

function getCellTheme(label: string) {
  switch (label) {
    case 'Deep Work Sessions':
      return {
        bg: 'from-cyan-950/45 to-corematrix-card2',
        border: 'border-cyan-500/15',
        iconColor: 'text-cyan-400',
        hoverBorder: 'hover:border-cyan-500/45',
        hoverGlow: 'hover:shadow-[0_0_25px_rgba(6,182,212,0.15)]',
        titleColor: 'text-cyan-300',
      };
    case 'Weekly Team Standups':
      return {
        bg: 'from-amber-950/45 to-corematrix-card2',
        border: 'border-amber-500/15',
        iconColor: 'text-amber-400',
        hoverBorder: 'hover:border-amber-500/45',
        hoverGlow: 'hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]',
        titleColor: 'text-amber-300',
      };
    case 'Hackathon Fridays':
      return {
        bg: 'from-purple-950/45 to-corematrix-card2',
        border: 'border-purple-500/15',
        iconColor: 'text-purple-400',
        hoverBorder: 'hover:border-purple-500/45',
        hoverGlow: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]',
        titleColor: 'text-purple-300',
      };
    case 'Learning Sessions':
      return {
        bg: 'from-indigo-950/45 to-corematrix-card2',
        border: 'border-indigo-500/15',
        iconColor: 'text-indigo-400',
        hoverBorder: 'hover:border-indigo-500/45',
        hoverGlow: 'hover:shadow-[0_0_25px_rgba(99,102,241,0.15)]',
        titleColor: 'text-indigo-300',
      };
    case 'Product Demos':
      return {
        bg: 'from-rose-950/45 to-corematrix-card2',
        border: 'border-rose-500/15',
        iconColor: 'text-rose-400',
        hoverBorder: 'hover:border-rose-500/45',
        hoverGlow: 'hover:shadow-[0_0_25px_rgba(244,63,94,0.15)]',
        titleColor: 'text-rose-300',
      };
    case 'AI Research Club':
    default:
      return {
        bg: 'from-emerald-950/45 to-corematrix-card2',
        border: 'border-emerald-500/15',
        iconColor: 'text-emerald-400',
        hoverBorder: 'hover:border-emerald-500/45',
        hoverGlow: 'hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]',
        titleColor: 'text-emerald-300',
      };
  }
}

export function LifeAtSection() {
  const { t } = useLanguage();

  return (
    <section
      id="careers-life"
      aria-labelledby="careers-life-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <MarketingSectionHeader
          align="left"
          label={t('LIFE AT COREMATRIX', 'الحياة في كورماتريكس')}
          title={t('The Way We Work, Day to Day', 'طريقة عملنا يوماً بيوم')}
          titleId="careers-life-heading"
        />

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {LIFE_CELLS.map((cell) => {
            const theme = getCellTheme(cell.label);
            return (
              <div
                key={cell.label}
                className={`group relative flex min-h-[10rem] cursor-default items-center justify-center overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${theme.border} ${theme.hoverBorder} ${theme.hoverGlow} ${
                  cell.span === 'tall' ? 'lg:row-span-2 lg:min-h-[22rem]' : ''
                } ${cell.span === 'wide' ? 'col-span-2' : ''}`}
              >
                {/* TODO: Replace placeholder with <Image src={cell.image} alt={cell.label} fill className="object-cover" /> */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${theme.bg} opacity-[0.95]`}
                  aria-hidden
                />
                <div
                  className="life-cell-pattern pointer-events-none absolute inset-0 opacity-[0.05]"
                  aria-hidden
                />
                <span className={`relative z-10 text-3xl transition-all duration-300 group-hover:scale-110 ${theme.iconColor}`} aria-hidden>
                  <i className={cell.icon} />
                </span>
                <span className={`absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-corematrix-bg0/80 to-transparent p-3 font-display text-xs font-bold text-corematrix-textSecondary transition-colors duration-300 group-hover:${theme.titleColor}`}>
                  {t(cell.label, cellTranslations[cell.label] ?? cell.label)}
                </span>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
