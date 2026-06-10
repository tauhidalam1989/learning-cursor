'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

type AiTile = {
  icon: string;
  title_en: string;
  title_ar: string;
  body_en: string;
  body_ar: string;
  iconColor: string;
  iconBg: string;
  cardBg: string;
  cardBorder: string;
  hoverBorder: string;
  hoverBg: string;
  hoverGlow: string;
};

const AI_TILES: AiTile[] = [
  {
    icon: 'fas fa-robot',
    title_en: 'LLM Integration & Fine-tuning',
    title_ar: 'تكامل وضبط النماذج اللغوية الكبيرة (LLM)',
    body_en:
      'Deploy GPT-4, Claude, Gemini, or open-source models into your product with custom fine-tuning and retrieval-augmented generation pipelines.',
    body_ar:
      'انشر نماذج GPT-4 أو Claude أو Gemini أو النماذج مفتوحة المصدر في منتجك مع الضبط الدقيق المخصص وخطوط أنابيب توليد الاسترجاع المعزز (RAG).',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
    cardBg: 'bg-purple-950/20',
    cardBorder: 'border-purple-500/15',
    hoverBorder: 'hover:border-purple-500/40',
    hoverBg: 'hover:bg-purple-950/35',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]',
  },
  {
    icon: 'fas fa-bolt',
    title_en: 'AI Agents & Automation',
    title_ar: 'وكلاء الذكاء الاصطناعي والأتمتة',
    body_en:
      'Build multi-step autonomous agents that handle complex business workflows — from customer support to data processing pipelines.',
    body_ar:
      'ابنِ وكلاء مستقلين متعددي الخطوات يتعاملون مع تدفقات العمل المعقدة للمؤسسات — من دعم العملاء إلى خطوط أنابيب معالجة البيانات.',
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-500/10 border-amber-500/20',
    cardBg: 'bg-amber-950/20',
    cardBorder: 'border-amber-500/15',
    hoverBorder: 'hover:border-amber-500/40',
    hoverBg: 'hover:bg-amber-950/35',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]',
  },
  {
    icon: 'fas fa-chart-bar',
    title_en: 'Predictive Analytics & ML',
    title_ar: 'التحليلات التنبؤية وتعلم الآلة (ML)',
    body_en:
      'Turn your data into actionable intelligence with custom ML models, forecasting systems, and intelligent recommendation engines.',
    body_ar:
      'حوّل بياناتك إلى معلومات استخباراتية قابلة للتنفيذ باستخدام نماذج تعلم الآلة المخصصة، وأنظمة التنبؤ، ومحركات التوصية الذكية.',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
    cardBg: 'bg-cyan-950/20',
    cardBorder: 'border-cyan-500/15',
    hoverBorder: 'hover:border-cyan-500/40',
    hoverBg: 'hover:bg-cyan-950/35',
    hoverGlow: 'hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]',
  },
];

export function AiSpotlightSection() {
  const { language, t } = useLanguage();

  return (
    <section
      id="ai-spotlight"
      aria-labelledby="ai-spotlight-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-12 sm:py-16 lg:py-24"
    >
      <Container>
        <div className="grid min-w-0 gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="reveal min-w-0">
            <MarketingSectionHeader
              align="left"
              descriptionMax="none"
              label={t("AI-FIRST COMPANY", "شركة ترتكز على الذكاء الاصطناعي")}
              title={t("We Don't Just Talk AI — We Ship It", "نحن لا نتحدث عن الذكاء الاصطناعي فحسب — بل ننشره")}
              titleId="ai-spotlight-heading"
              description={t(
                "Every solution we deliver is designed with AI capabilities at its core. We help businesses integrate large language models, build autonomous agents, and create intelligent systems that learn and adapt.",
                "كل حل نقدمه مصمم بقدرات الذكاء الاصطناعي في جوهر. نحن نساعد الشركات على دمج النماذج اللغوية الكبيرة، وبناء وكلاء مستقلين، وإنشاء أنظمة ذكية تتعلم وتتكيف."
              )}
            />
            <div className="mt-8 space-y-4">
              {AI_TILES.map((tile) => (
                <div
                  key={tile.title_en}
                  className={`flex min-w-0 items-start gap-3 rounded-xl border p-4 transition-all duration-300 hover:-translate-y-0.5 sm:gap-4 sm:p-5 ${tile.cardBorder} ${tile.cardBg} ${tile.hoverBorder} ${tile.hoverBg} ${tile.hoverGlow}`}
                >
                  <div className={`shrink-0 flex h-9 w-9 items-center justify-center rounded-lg border text-base mt-0.5 ${tile.iconBg} ${tile.iconColor}`} aria-hidden="true">
                    <i className={tile.icon} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-semibold text-corematrix-textPrimary">
                      {language === 'ar' ? tile.title_ar : tile.title_en}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-corematrix-textSecondary">
                      {language === 'ar' ? tile.body_ar : tile.body_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/services"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              {t("Explore AI Services →", "استكشف خدمات الذكاء الاصطناعي ←")}
            </Link>
          </div>
          <div className="reveal reveal-delay-2 flex w-full min-w-0 justify-center lg:justify-end">
            <div className="w-full max-w-[460px] min-w-0">
              <Image
                src="/images/ai-spotlight-illustration.png"
                alt="Isometric illustration of a laptop with a robot, AI cube, brain, and media icons on a circuit-board floor"
                width={1024}
                height={1024}
                className="h-auto w-full rounded-2xl border border-corematrix-border bg-black object-contain"
                sizes="(max-width: 1024px) 100vw, 460px"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

