'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

export type FitItem = { text: string };

export function RightFitSection() {
  const { t } = useLanguage();

  const GOOD_FIT: FitItem[] = [
    {
      text: t(
        'Need AI capabilities built into your product — not bolted on later',
        'تحتاج إلى بناء ميزات ذكاء اصطناعي أصيلة في صميم منتجك — لا إضافتها لاحقاً كعنصر خارجي'
      ),
    },
    {
      text: t(
        'Want a long-term technical partner, not a one-off vendor',
        'تبحث عن شريك تقني طويل الأجل، وليس مجرد منفذ لمرة واحدة'
      ),
    },
    {
      text: t(
        'Value transparency, honest communication, and weekly progress updates',
        'تقدر الشفافية، والتواصل الصادق، وتحديثات التقدم الأسبوعية المنتظمة'
      ),
    },
    {
      text: t(
        'Have a budget of $15k+ for project work or 2-month+ retainer budget',
        'لديك ميزانية قدرها 15 ألف دولار فما فوق للمشروع أو ميزانية تغطي شهرين فأكثر من الاحتفاظ بالخدمات'
      ),
    },
    {
      text: t(
        'Are building with Next.js, React, Python, or want to migrate to modern stack',
        'تقوم بالتطوير باستخدام Next.js أو React أو Python، أو ترغب في الانتقال إلى بنية برمجية حديثة'
      ),
    },
    {
      text: t(
        'Need to scale your engineering team with senior specialists quickly',
        'ترغب في توسيع نطاق فريقك الهندسي بمتخصصين ومهندسين كبار بسرعة'
      ),
    },
  ];

  const BAD_FIT: FitItem[] = [
    {
      text: t(
        'Need .NET/C# development, WordPress themes, or low-code customizations',
        'تحتاج إلى تطوير .NET/C#، أو قوالب ووردبريس، أو تخصيصات منخفضة الكود (low-code)'
      ),
    },
    {
      text: t(
        'Want the cheapest possible option without regard for quality or process',
        'تريد الخيار الأرخص سعراً بغض النظر عن الجودة أو كفاءة سير العمل'
      ),
    },
    {
      text: t('Have a project budget under $5k', 'لديك ميزانية مشروع تقل عن 5 آلاف دولار'),
    },
    {
      text: t(
        'Need someone to just follow a spec without any strategic input',
        'تبحث عن شخص يتبع المواصفات المكتوبة بشكل أعمى ودون أي مدخلات أو آراء إستراتيجية'
      ),
    },
  ];

  return (
    <section
      id="right-fit"
      aria-labelledby="right-fit-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-2">
          <div className="reveal">
            <MarketingSectionHeader
              align="left"
              descriptionMax="none"
              label={t("RIGHT FIT?", "التوافق الأنسب؟")}
              title={t("Who We Work Best With", "من هم الشركاء الذين نعمل معهم بشكل أفضل")}
              titleId="right-fit-heading"
              description={t(
                "We're selective about the projects we take on — not because we're precious, but because we want every engagement to be a genuine success for both sides.",
                "نحن ننتقي المشاريع التي نقبلها — ليس لأننا متصنعون، ولكن لأننا نريد أن يكون كل تعاون وتعاقد نجاحاً حقيقياً وملموساً لكلا الطرفين."
              )}
            />
            <Link
              href="/services"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              {t("See All Our Services →", "شاهد جميع خدماتنا ←")}
            </Link>
          </div>

          <div className="reveal reveal-delay-2 space-y-5">
            <div className="overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-green900/[0.04]">
              <div className="flex items-start gap-3 border-b border-corematrix-border bg-corematrix-green900/[0.06] p-5">
                <span className="text-xl text-corematrix-green400" aria-hidden>
                  <i className="fas fa-check-circle" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-corematrix-textPrimary">
                    {t("We're a great fit if you...", "نحن نتوافق معك بشكل رائع إذا كنت...")}
                  </h3>
                  <p className="mt-1 text-xs text-corematrix-textMuted">
                    {t("These are the clients we do our best work with", "هؤلاء هم العملاء الذين نقدم معهم أفضل أعمالنا")}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-5">
                {GOOD_FIT.map((item) => (
                  <div key={item.text} className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-corematrix-green400" />
                    <span className="text-sm text-corematrix-textSecondary">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-corematrix-border bg-[rgba(239,68,68,0.04)]">
              <div className="flex items-start gap-3 border-b border-corematrix-border bg-[rgba(239,68,68,0.06)] p-5">
                <span className="text-xl text-red-400" aria-hidden>
                  <i className="fas fa-exclamation-triangle" />
                </span>
                <div>
                  <h3 className="font-display text-sm font-bold text-corematrix-textPrimary">
                    {t("Probably not a fit if...", "ربما لا نكون الشريك المناسب إذا...")}
                  </h3>
                  <p className="mt-1 text-xs text-corematrix-textMuted">
                    {t("We're honest so you don't waste time", "نحن صادقون وصريحون حتى لا تضيع وقتك الثمين")}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-5">
                {BAD_FIT.map((item) => (
                  <div key={item.text} className="flex items-start gap-2">
                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-red-400" />
                    <span className="text-sm text-corematrix-textMuted">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
