'use client';

import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';

export type LocationDetail = { icon: string; text: string };

export function LocationSection() {
  const { t } = useLanguage();

  const LOCATION_DETAILS: LocationDetail[] = [
    { icon: 'fas fa-clock', text: t('Overlap hours available for all major time zones', 'ساعات تداخل عمل متاحة لجميع المناطق الزمنية الرئيسية') },
    {
      icon: 'fas fa-comments',
      text: t('Async-first: Slack, Notion, Linear — your tools, our workflow', 'العمل اللامتزامن أولاً: Slack وNotion وLinear — أدواتك المفضلة، هي بيئة عملنا'),
    },
    { icon: 'fas fa-video', text: t('Weekly video calls on Google Meet or Zoom', 'مكالمات فيديو أسبوعية عبر Google Meet أو Zoom') },
    { icon: 'fas fa-lock', text: t('GDPR-compliant data handling for EU clients', 'معالجة البيانات بما يتوافق مع GDPR لعملائنا في الاتحاد الأوروبي') },
    { icon: 'fas fa-file-contract', text: t('NDA signed before any sensitive project discussions', 'توقيع اتفاقية عدم إفصاح قبل أي مناقشة حساسة تتعلق بالمشروع') },
  ];

  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="relative h-[340px] overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card">
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              aria-hidden
            >
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="map-grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="#1a3525"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-grid)" />
              </svg>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="map-ring map-ring-1" aria-hidden />
              <div className="map-ring map-ring-2" aria-hidden />
              <div className="map-ring map-ring-3" aria-hidden />
              <span
                className="relative z-10 float-anim text-4xl text-corematrix-green400"
                aria-hidden
              >
                <i className="fas fa-map-marker-alt" />
              </span>
              <p className="mt-3 font-display text-sm font-bold text-corematrix-textPrimary">
                {t('Remote-First', 'العمل عن بعد أولاً')}
              </p>
              <p className="text-xs text-corematrix-textMuted">
                {t('Team across multiple time zones', 'فريق عمل موزع عبر مناطق زمنية متعددة')}
              </p>
            </div>
          </div>

          <div className="reveal">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-corematrix-green700/20 bg-corematrix-green900/20 px-3 py-1 text-[0.65rem] font-semibold text-corematrix-green700">
              <i className="fas fa-globe" aria-hidden="true" /> {t('Global Presence', 'حضور عالمي')}
            </span>
            <h3 className="mt-4 font-display text-2xl font-bold text-corematrix-textPrimary">
              {t('We Work Across Every Time Zone', 'نحن نعمل عبر مختلف المناطق الزمنية')}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">
              {t(
                "Our team is distributed across multiple regions. We design our workflows for async collaboration with overlap hours that work for your schedule — whether you're in San Francisco, London, or Singapore.",
                "يتوزع فريقنا عبر مناطق جغرافية متعددة. نحن نصمم أساليب وسير عملنا للتعاون اللامتزامن مع توفير ساعات تداخل وتوافق تناسب جدولك الزمني بالكامل — سواء كنت في سان فرانسيسكو، أو لندن، أو سنغافورة."
              )}
            </p>
            <ul className="mt-6 space-y-4">
              {LOCATION_DETAILS.map((d) => (
                <li key={d.text} className="flex items-center gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-corematrix-green700/[0.15] bg-corematrix-green900/20 text-sm text-corematrix-green400">
                    <i className={d.icon} aria-hidden="true" />
                  </div>
                  <span className="text-sm text-corematrix-textSecondary">
                    {d.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
