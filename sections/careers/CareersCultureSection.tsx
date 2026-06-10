'use client';

import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { CULTURE_VALUES } from '@/data/careersData';
import { useLanguage } from '@/context/LanguageContext';

type PerkItem = { icon: string; label: string };

const PERKS: readonly PerkItem[] = [
  { icon: 'fas fa-globe', label: '12 countries' },
  { icon: 'fas fa-laptop', label: 'Mac or Linux' },
  { icon: 'fas fa-book', label: '$1.5k/yr' },
  { icon: 'fas fa-clock', label: 'Flexible hours' },
  { icon: 'fas fa-medkit', label: 'Health coverage' },
  { icon: 'fas fa-umbrella-beach', label: 'Unlimited PTO' },
];

// Explicitly typed translation maps for i18n
const valueTitleTranslations: Record<string, string> = {
  "Build, Don't Just Talk": 'ابنِ، لا تكتفِ بالحديث',
  'Context Over Control': 'السياق بدلاً من السيطرة الإدارية',
  'Direct Feedback': 'الملاحظات المباشرة',
  'Grow or Stagnate': 'النمو أو الركود',
};

const valueDescTranslations: Record<string, string> = {
  'We ship every sprint. No "planning for planning" meetings.':
    'نحن نشحن ونطلق البرمجيات في كل سبرينت. لا توجد اجتماعات تخطيط من أجل التخطيط.',
  'You get full context so you can make great decisions independently.':
    'تحصل على السياق الكامل لتتمكن من اتخاذ قرارات رائعة بشكل مستقل.',
  'We give honest, timely feedback — to each other and from leadership.':
    'نحن نقدم ملاحظات صادقة وفي الوقت المناسب — لبعضنا البعض ومن القيادة.',
  'We expect and support continuous technical growth from everyone.':
    'نحن نتوقع وندعم النمو الفني المستمر من الجميع.',
};

const perkTranslations: Record<string, string> = {
  '12 countries': '12 دولة مختلفة',
  'Mac or Linux': 'Mac أو Linux',
  '$1.5k/yr': '1,500 دولار/سنوياً',
  'Flexible hours': 'ساعات عمل مرنة',
  'Health coverage': 'تأمين صحي شامل',
  'Unlimited PTO': 'إجازات غير محدودة مدفوعة',
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

function getValueTheme(num: string) {
  switch (num) {
    case '01':
      return {
        bg: 'bg-purple-950/20',
        border: 'border-purple-500/15',
        numColor: 'text-purple-400',
        titleColor: 'text-purple-300',
        hoverBorder: 'hover:border-purple-500/40',
        hoverBg: 'hover:bg-purple-950/30',
        hoverGlow: 'hover:shadow-[0_0_15px_rgba(168,85,247,0.1)]',
      };
    case '02':
      return {
        bg: 'bg-cyan-950/20',
        border: 'border-cyan-500/15',
        numColor: 'text-cyan-400',
        titleColor: 'text-cyan-300',
        hoverBorder: 'hover:border-cyan-500/40',
        hoverBg: 'hover:bg-cyan-950/30',
        hoverGlow: 'hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]',
      };
    case '03':
      return {
        bg: 'bg-amber-950/20',
        border: 'border-amber-500/15',
        numColor: 'text-amber-400',
        titleColor: 'text-amber-300',
        hoverBorder: 'hover:border-amber-500/40',
        hoverBg: 'hover:bg-amber-950/30',
        hoverGlow: 'hover:shadow-[0_0_15px_rgba(245,158,11,0.1)]',
      };
    case '04':
    default:
      return {
        bg: 'bg-indigo-950/20',
        border: 'border-indigo-500/15',
        numColor: 'text-indigo-400',
        titleColor: 'text-indigo-300',
        hoverBorder: 'hover:border-indigo-500/40',
        hoverBg: 'hover:bg-indigo-950/30',
        hoverGlow: 'hover:shadow-[0_0_15px_rgba(99,102,241,0.1)]',
      };
  }
}

export function CareersCultureSection() {
  const { t } = useLanguage();

  return (
    <section
      id="careers-culture"
      aria-labelledby="careers-culture-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <div>
            <MarketingSectionHeader
              align="left"
              descriptionMax="none"
              label={t('OUR CULTURE', 'ثقافتنا')}
              title={t('A Culture Built Around Doing Great Work', 'ثقافة مبنية حول القيام بعمل رائع')}
              titleId="careers-culture-heading"
            />
            <p className="mt-6 text-base leading-relaxed text-corematrix-textSecondary">
              {t(
                'We believe the best software comes from teams that have full context, minimal bureaucracy, and real ownership. Every engineer participates in architecture decisions and sees their work in production within weeks — not quarters.',
                'نحن نؤمن بأن أفضل البرامج تأتي من الفرق التي تمتلك السياق الكامل، والحد الأدنى من البيروقراطية، والتملك الحقيقي. يشارك كل مهندس في قرارات البنية الهندسية ويرى عمله في بيئة الإنتاج في غضون أسابيع — وليس فصولاً سنوية.'
              )}
            </p>
            <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">
              {t(
                'Our async-first processes mean you can focus on deep work. Documentation is thorough. Meetings are purposeful. And when we do sync, it\'s to solve real problems together.',
                'إن عملياتنا التي تركز على العمل غير المتزامن أولاً تعني أنه يمكنك التركيز على العمل العميق. التوثيق شامل. الاجتماعات هادفة ومحددة. وعندما نتزامن، يكون ذلك لحل مشاكل حقيقية معاً.'
              )}
            </p>
            <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">
              {t(
                'We hire adults, give them context, and trust them to do great work. Accountability without micromanagement.',
                'نحن نوظف أشخاصاً بالغين، ونمنحهم السياق الكامل، ونثق بهم للقيام بعمل رائع. المسؤولية دون التدخل الإداري الدقيق.'
              )}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {CULTURE_VALUES.map((v) => {
                const theme = getValueTheme(v.num);
                return (
                  <div
                    key={v.num}
                    className={`group rounded-xl border p-4 transition-all duration-300 hover:-translate-y-0.5 ${theme.bg} ${theme.border} ${theme.hoverBg} ${theme.hoverBorder} ${theme.hoverGlow}`}
                  >
                    <p className={`font-display text-xs font-bold transition-colors duration-300 ${theme.numColor}`}>
                      {v.num}
                    </p>
                    <h3 className={`mt-1 font-display text-sm font-bold text-corematrix-textPrimary transition-colors duration-300 group-hover:${theme.titleColor}`}>
                      {t(v.title, valueTitleTranslations[v.title] ?? v.title)}
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-corematrix-textMuted/90 transition-colors duration-300 group-hover:text-corematrix-textPrimary/80">
                      {t(v.description, valueDescTranslations[v.description] ?? v.description)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-9">
            <div
              className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent"
              aria-hidden
            />
            <p className="mb-6 font-display text-[0.68rem] font-bold uppercase tracking-[0.12em] text-corematrix-green400">
              {t('THE TEAM', 'الفريق')}
            </p>
            <div className="mb-6 grid grid-cols-4 gap-2">
              {['AK', 'SR', 'MJ', 'PL'].map((initials) => (
                <div
                  key={initials}
                  className="relative aspect-square overflow-hidden rounded-xl border border-corematrix-border2 bg-gradient-to-br from-corematrix-green900 to-corematrix-card2"
                >
                  {/* TODO: Replace with <Image src={member.avatar} alt={member.name} fill className="object-cover rounded-xl" /> */}
                  <span className="absolute inset-0 flex items-center justify-center font-display text-lg font-bold text-corematrix-green700">
                    {initials}
                  </span>
                </div>
              ))}
            </div>
            <blockquote className="border-l-4 border-corematrix-green700 pl-4 italic text-corematrix-textSecondary">
              {t(
                '"Engineering decisions are made by engineers here — no committees. The speed at which we ship is genuinely rare."',
                '"قرارات الهندسة يتخذها المهندسون هنا — لا توجد لجان. إن السرعة التي نشحن بها البرمجيات نادرة حقاً."'
              )}
            </blockquote>
            <cite className="mt-2 block text-sm text-corematrix-textDim">
              {t('— Marcus J., Head of Engineering', '— ماركوس ج.، رئيس الهندسة')}
            </cite>
            <div className="mt-4 flex flex-wrap gap-2">
              {PERKS.map((p) => {
                const theme = getTagTheme(p.label);
                return (
                  <span
                    key={p.label}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-all duration-300 hover:scale-105 cursor-default ${theme.bg} ${theme.border} ${theme.text}`}
                  >
                    <i className={`${p.icon} text-xs`} aria-hidden="true" />
                    {t(p.label, perkTranslations[p.label] ?? p.label)}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
