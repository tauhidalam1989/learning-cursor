'use client';

import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

type MvvCard = { icon: string; title_en: string; title_ar: string; body_en: string; body_ar: string };

const MVV_CARDS: MvvCard[] = [
  {
    icon: 'fas fa-bullseye',
    title_en: 'Our Mission',
    title_ar: 'مهمتنا',
    body_en: 'To design, build, and deploy intelligent digital solutions that create tangible, measurable business value — empowering startups and enterprises to compete in an AI-driven world.',
    body_ar: 'تصميم وبناء ونشر حلول رقمية ذكية تخلق قيمة تجارية ملموسة وقابلة للقياس — لتمكين الشركات الناشئة والمؤسسات من المنافسة في عالم يقوده الذكاء الاصطناعي.',
  },
  {
    icon: 'fas fa-compass',
    title_en: 'Our Vision',
    title_ar: 'رؤيتنا',
    body_en: "To be the world's most trusted AI-first engineering partner — where technical excellence meets strategic thinking, and every solution we ship drives real transformation.",
    body_ar: 'أن نكون شريك الهندسة الرقمية الأول والأكثر ثقة عالمياً في الذكاء الاصطناعي — حيث يلتقي التميز التقني مع التفكير الاستراتيجي، وحيث يقود كل حل نشحنه تحولاً حقيقياً.',
  },
  {
    icon: 'fas fa-lightbulb',
    title_en: 'Our Purpose',
    title_ar: 'هدفنا الأسمى',
    body_en: "Technology for its own sake solves nothing. We exist to bridge the gap between cutting-edge AI capability and the business problems that actually matter to real people.",
    body_ar: 'التكنولوجيا لأجل التكنولوجيا لا تحل شيئاً. نحن موجودون لسد الفجوة بين قدرات الذكاء الاصطناعي المتطورة ومشكلات الأعمال التي تهم الناس الحقيقيين بالفعل.',
  },
];

export function MissionVisionSection() {
  const { t, language } = useLanguage();

  return (
    <section
      id="mission-vision"
      aria-labelledby="mission-vision-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t("WHAT DRIVES US", "ما يدفعنا للأمام")}
          title={t("Mission, Vision & Purpose", "المهمة والرؤية والهدف")}
          titleId="mission-vision-heading"
          description={t("Three pillars that guide every decision we make — from how we hire to how we build.", "ثلاث ركائز توجه كل قرار نتخذه — من كيفية التوظيف إلى كيفية البناء والتطوير.")}
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {MVV_CARDS.map((card) => (
            <article
              key={card.title_en}
              className="group relative overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card p-8 transition-all duration-300 card-glow hover:-translate-y-1 reveal"
            >
              <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-[14px] border border-corematrix-green700/20 bg-corematrix-green900/40 text-xl text-corematrix-green400">
                <i className={card.icon} aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-semibold text-corematrix-textPrimary">
                {language === 'ar' ? card.title_ar : card.title_en}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-corematrix-textSecondary">
                {language === 'ar' ? card.body_ar : card.body_en}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
