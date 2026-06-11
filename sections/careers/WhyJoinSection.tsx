'use client';

import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { WHY_CARDS } from '@/data/careersData';
import { useLanguage } from '@/context/LanguageContext';

// Explicitly typed translation maps for i18n
const cardTitleTranslations: Record<string, string> = {
  'AI-First Engineering Culture': 'ثقافة هندسية تركز على الذكاء الاصطناعي',
  'Real Ownership & Impact': 'تملك وتأثير حقيقيين',
  '100% Remote, Async-First': 'عمل عن بعد 100%، غير متزامن أولاً',
  'Serious Learning Investment': 'استثمار جاد في التعلم',
  'Competitive Compensation': 'تعويضات وراتب تنافسية',
  'No Bureaucracy, No BS': 'لا بيروقراطية، لا تعقيدات',
};

const cardBodyTranslations: Record<string, string> = {
  "We're not just adding AI features — it's woven into everything we build. You'll work with the latest LLM frameworks, RAG architectures, and agent systems in actual production, not just demos.":
    'نحن لا نضيف مجرد ميزات ذكاء اصطناعي — بل هي منسوجة في كل ما نبنيه. ستعمل مع أحدث أطر عمل LLM، وبنى RAG الهندسية، وأنظمة الوكلاء في الإنتاج الفعلي، وليس فقط في العروض التوضيحية.',
  "Engineers here don't execute tickets — they own outcomes. You'll have full context on every business decision, participate in architecture discussions, and see your work used by real users within weeks.":
    'المهندسون هنا لا ينفذون مجرد تذاكر عمل — بل يتملكون النتائج. ستحصل على السياق الكامل لكل قرار عمل، وتشارك في مناقشات البنية الهندسية، وترى عملك مستخدماً من قبل مستخدمين حقيقيين في غضون أسابيع.',
  "We've been remote from day one. Our processes are built for async — thorough documentation, deep work blocks, and no meetings without a clear agenda. Work from wherever you do your best work.":
    'لقد كنا نعمل عن بعد من اليوم الأول. تم بناء عملياتنا للعمل غير المتزامن — توثيق شامل، وفترات عمل عميق، وبلا اجتماعات دون جدول أعمال واضح. اعمل من أي مكان تؤدي فيه أفضل أعمالك.',
  "Every engineer gets a $1,500/yr learning budget for courses, conferences, books, and experiments. We encourage exploration time. The team's knowledge grows together, not in silos.":
    'يحصل كل مهندس على ميزانية تعلم بقيمة 1,500 دولار سنوياً للدورات والمؤتمرات والكتب والتجارب. نحن نشجع وقت الاستكشاف. تنمو معرفة الفريق معاً، وليس في معزل.',
  "We believe great work deserves great pay — full stop.":
    'نعتقد أن العمل الرائع يستحق مكافأة رائعة — بكل وضوح وبدون شروط.',
  "Flat structure. Short decision chains. No pointless standups. No status-update culture. We hire adults, give them context, and trust them to do great work. Accountability without micromanagement.":
    'هيكل مسطح. سلاسل اتخاذ قرار قصيرة. لا اجتماعات يومية بلا جدوى. لا ثقافة لتحديثات الحالة فحسب. نحن نوظف بالغين، ونمنحهم السياق الكامل، ونثق بهم للقيام بعمل رائع. المسؤولية دون التدخل الإداري الدقيق.',
};

const CARD_THEMES = [
  {
    // Purple
    border: 'border-purple-500/15 hover:border-purple-500/40',
    glow: 'hover:shadow-[0_0_35px_rgba(168,85,247,0.08)]',
    gradientBar: 'from-transparent via-purple-500 to-transparent',
    iconBg: 'border-purple-500/20 bg-purple-950/40 text-purple-400',
    titleColor: 'text-purple-400 group-hover:text-purple-300',
  },
  {
    // Sky
    border: 'border-sky-500/15 hover:border-sky-500/40',
    glow: 'hover:shadow-[0_0_35px_rgba(14,165,233,0.08)]',
    gradientBar: 'from-transparent via-sky-500 to-transparent',
    iconBg: 'border-sky-500/20 bg-sky-950/40 text-sky-400',
    titleColor: 'text-sky-400 group-hover:text-sky-300',
  },
  {
    // Amber
    border: 'border-amber-500/15 hover:border-amber-500/40',
    glow: 'hover:shadow-[0_0_35px_rgba(245,158,11,0.08)]',
    gradientBar: 'from-transparent via-amber-500 to-transparent',
    iconBg: 'border-amber-500/20 bg-amber-950/40 text-amber-400',
    titleColor: 'text-amber-400 group-hover:text-amber-300',
  },
  {
    // Rose
    border: 'border-rose-500/15 hover:border-rose-500/40',
    glow: 'hover:shadow-[0_0_35px_rgba(244,63,94,0.08)]',
    gradientBar: 'from-transparent via-rose-500 to-transparent',
    iconBg: 'border-rose-500/20 bg-rose-950/40 text-rose-400',
    titleColor: 'text-rose-400 group-hover:text-rose-300',
  },
  {
    // Teal
    border: 'border-teal-500/15 hover:border-teal-500/40',
    glow: 'hover:shadow-[0_0_35px_rgba(20,184,166,0.08)]',
    gradientBar: 'from-transparent via-teal-500 to-transparent',
    iconBg: 'border-teal-500/20 bg-teal-950/40 text-teal-400',
    titleColor: 'text-teal-400 group-hover:text-teal-300',
  },
  {
    // Indigo
    border: 'border-indigo-500/15 hover:border-indigo-500/40',
    glow: 'hover:shadow-[0_0_35px_rgba(99,102,241,0.08)]',
    gradientBar: 'from-transparent via-indigo-500 to-transparent',
    iconBg: 'border-indigo-500/20 bg-indigo-950/40 text-indigo-400',
    titleColor: 'text-indigo-400 group-hover:text-indigo-300',
  },
];

export function WhyJoinSection() {
  const { t } = useLanguage();

  return (
    <section
      id="why-join"
      aria-labelledby="why-join-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t('WHY COREMATRIX', 'لماذا كورماتريكس')}
          title={t('Why Engineers Choose to Build Here', 'لماذا يختار المهندسون البناء هنا')}
          titleId="why-join-heading"
          description={t(
            "We've built a culture where great work is the standard — not the exception.",
            'لقد بنينا ثقافة يكون فيها العمل الرائع هو المعيار الأساسي — وليس الاستثناء.'
          )}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_CARDS.map((card, idx) => {
            const theme = CARD_THEMES[idx % CARD_THEMES.length];
            return (
              <div
                key={card.title}
                className={`reveal group relative overflow-hidden rounded-2xl border bg-corematrix-card p-8 transition-all duration-300 hover:-translate-y-1 ${theme.border} ${theme.glow}`}
              >
                <div
                  className={`absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r ${theme.gradientBar} opacity-0 transition-opacity group-hover:opacity-100`}
                  aria-hidden
                />
                <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl border text-xl ${theme.iconBg}`}>
                  <i className={card.icon} />
                </div>
                <h3 className={`mb-2 font-display text-base font-extrabold tracking-tight transition-colors duration-300 ${theme.titleColor}`}>
                  {t(card.title, cardTitleTranslations[card.title] ?? card.title)}
                </h3>
                <p className="text-sm font-light leading-relaxed text-corematrix-textMuted">
                  {t(card.body, cardBodyTranslations[card.body] ?? card.body)}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
