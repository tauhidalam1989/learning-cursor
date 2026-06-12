'use client';

import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';

export type LocationDetail = { icon: string; text: string };

const LOCATION_THEMES = [
  {
    iconColor: 'text-amber-400',
    iconBg: 'bg-amber-950/20 border-amber-500/20',
  },
  {
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-950/20 border-emerald-500/20',
  },
  {
    iconColor: 'text-sky-400',
    iconBg: 'bg-sky-950/20 border-sky-500/20',
  },
  {
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-950/20 border-cyan-500/20',
  },
  {
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-950/20 border-purple-500/20',
  },
];

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
          <div className="relative h-[340px] overflow-hidden rounded-2xl border border-corematrix-green700/30 bg-corematrix-card p-3">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231637.65715450005!2d46.36683473977439!3d24.886436490787712!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2eefc4386172a1%3A0xce82245f54f7e4db!2sSuper%20Office!5e0!3m2!1sen!2sin!4v1781181208217!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className="rounded-xl border border-corematrix-border/50"
              style={{ border: 0, filter: 'grayscale(1) invert(0.92) sepia(0.8) saturate(2.5) hue-rotate(85deg) contrast(1.15) brightness(0.95)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t('Google Map - Super Office Riyadh', 'خريطة جوجل - مكتب سوبر بالرياض')}
            />
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
              {LOCATION_DETAILS.map((d, idx) => {
                const theme = LOCATION_THEMES[idx % LOCATION_THEMES.length];
                return (
                  <li key={d.text} className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border text-sm ${theme.iconBg} ${theme.iconColor}`}>
                      <i className={d.icon} aria-hidden="true" />
                    </div>
                    <span className="text-sm text-corematrix-textSecondary">
                      {d.text}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
