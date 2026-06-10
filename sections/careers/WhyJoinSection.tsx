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
          {WHY_CARDS.map((card) => (
            <div
              key={card.title}
              className="reveal group relative overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card p-8 transition-all duration-300 card-glow hover:-translate-y-1"
            >
              <div
                className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-corematrix-green700/20 bg-corematrix-green900/40 text-xl text-corematrix-green400">
                <i className={card.icon} />
              </div>
              <h3 className="mb-2 font-display text-base font-extrabold tracking-tight text-corematrix-textPrimary">
                {t(card.title, cardTitleTranslations[card.title] ?? card.title)}
              </h3>
              <p className="text-sm font-light leading-relaxed text-corematrix-textMuted">
                {t(card.body, cardBodyTranslations[card.body] ?? card.body)}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
