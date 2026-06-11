'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

type CultureItem = {
  icon: string;
  title_en: string;
  title_ar: string;
  body_en: string;
  body_ar: string;
  iconColor: string;
  iconBg: string;
  hoverColor: string;
  hoverBorder: string;
};

const CULTURE_ITEMS: CultureItem[] = [
  {
    icon: 'fas fa-brain',
    title_en: 'Learning Budget',
    title_ar: 'ميزانية التعلم والتدريب',
    body_en: 'Every engineer gets a personal learning budget for courses, conferences, and experiments.',
    body_ar: 'يحصل كل مهندس لدينا على ميزانية تعلم شخصية مخصصة للدورات والمؤتمرات والتجارب التقنية.',
    iconColor: 'text-purple-400',
    iconBg: 'bg-purple-900/40 border-purple-700/20',
    hoverColor: 'group-hover:text-purple-400',
    hoverBorder: 'hover:border-purple-500/50',
  },
  {
    icon: 'fas fa-globe',
    title_en: 'Remote-First',
    title_ar: 'العمل عن بعد أولاً',
    body_en: 'Fully remote with async-first communication. Work from anywhere, overlap where it matters.',
    body_ar: 'بيئة عمل تعتمد تماماً عن بعد مع اتصالات غير متزامنة. اعمل من أي مكان وتواجد حيثما يلزم.',
    iconColor: 'text-cyan-400',
    iconBg: 'bg-cyan-900/40 border-cyan-700/20',
    hoverColor: 'group-hover:text-cyan-400',
    hoverBorder: 'hover:border-cyan-500/50',
  },
  {
    icon: 'fas fa-rocket',
    title_en: 'Ownership Culture',
    title_ar: 'ثقافة المسؤولية والملكّية',
    body_en: 'Engineers own features end to end — from architecture decisions to production monitoring.',
    body_ar: 'يمتلك مهندسونا الميزات من البداية إلى النهاية — بدءاً من قرارات البنية الهندسية إلى مراقبة الأنظمة الإنتاجية.',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-900/40 border-orange-700/20',
    hoverColor: 'group-hover:text-orange-400',
    hoverBorder: 'hover:border-orange-500/50',
  },
  {
    icon: 'fas fa-chart-line',
    title_en: 'Transparent by Default',
    title_ar: 'الشفافية هي الأصل',
    body_en: 'Company metrics, client feedback, and engineering decisions are shared openly across the team.',
    body_ar: 'تتم مشاركة مؤشرات الشركة، وآراء وملاحظات العملاء، والقرارات الهندسية بشكل علني عبر كامل الفريق.',
    iconColor: 'text-sky-400',
    iconBg: 'bg-sky-900/40 border-sky-700/20',
    hoverColor: 'group-hover:text-sky-400',
    hoverBorder: 'hover:border-sky-500/50',
  },
];

export function CultureSection() {
  const { t, language } = useLanguage();

  return (
    <section
      id="culture"
      aria-labelledby="culture-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <div>
            <MarketingSectionHeader
              align="left"
              descriptionMax="none"
              label={t("CULTURE & TEAM", "ثقافتنا وفريقنا")}
              title={t("Where Great Engineers Do Their Best Work", "البيئة الحاضنة لأفضل إنجازات المهندسين")}
              titleId="culture-heading"
              description={t("We've built a culture where curiosity is rewarded, ownership is expected, and every team member has the context to make great decisions.", "لقد بنينا ثقافة يُكافأ فيها الفضول المعرفي، وتُتوقع فيها تحمل المسؤولية الكاملة، ويتمتع كل عضو في الفريق بالخلفية اللازمة لاتخاذ قرارات ممتازة.")}
            />
            <div className="mt-8 grid grid-cols-2 gap-4">
              {CULTURE_ITEMS.map((item) => (
                <article
                  key={item.title_en}
                  className={`group reveal rounded-2xl border border-corematrix-border bg-corematrix-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.015)] ${item.hoverBorder}`}
                >
                  <span className={`shrink-0 flex h-9 w-9 items-center justify-center rounded-lg border text-base ${item.iconBg} ${item.iconColor} transition-all duration-300 group-hover:scale-105`} aria-hidden="true">
                    <i className={item.icon} />
                  </span>
                  <h3 className={`mt-3 font-display font-semibold text-corematrix-textPrimary transition-colors duration-300 ${item.hoverColor}`}>
                    {language === 'ar' ? item.title_ar : item.title_en}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-corematrix-textSecondary">
                    {language === 'ar' ? item.body_ar : item.body_en}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <article className="reveal reveal-delay-2 rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-10 lg:sticky lg:top-24">
            <h3 className="font-display text-2xl font-extrabold leading-snug text-corematrix-textPrimary">
              {t("We're Building Something Worth Joining", "نحن نبني شيئاً يستحق الانضمام إليه")}
            </h3>
            <p className="mt-4 font-light leading-relaxed text-corematrix-textMuted">
              {t("Our team grows when we find people who share our values — technical excellence, radical transparency, and a genuine desire to build software that matters.", "ينمو فريقنا عندما نجد أشخاصاً يشاركوننا قيمنا — التميز التقني، الشفافية المطلقة، والرغبة الصادقة في بناء برمجيات تصنع فرقاً حقيقياً.")}
            </p>
            <p className="mt-3 font-light leading-relaxed text-corematrix-textMuted">
              {t("We offer competitive compensation, meaningful equity for early joiners, flexible hours, and a learning budget that actually gets used.", "نحن نقدم حوافز ومكافآت تنافسية، وحصص ملكية ذات مغزى للمنضمين الأوائل، وساعات عمل مرنة، وميزانية تعلم تُستخدم بالفعل للاستفادة القصوى منها.")}
            </p>
            <p className="mt-3 font-light leading-relaxed text-corematrix-textMuted">
              {t("If you're an engineer, designer, or product thinker who wants to work on hard problems with a team that cares — we'd love to hear from you.", "إذا كنت مهندساً أو مصمماً أو مفكراً في المنتجات ترغب في العمل على حل المشكلات المعقدة مع فريق يهتم حقاً — يسعدنا جداً أن نسمع منك.")}
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-xl border border-corematrix-green400/20 bg-corematrix-green900/20 p-4">
              <span
                className="h-2 w-2 flex-shrink-0 rounded-full bg-corematrix-green400 dot-pulse"
                aria-hidden
              />
              <span className="text-sm text-corematrix-textSecondary">
                {t("We're actively hiring — ", "نحن نوظف بنشاط حالياً — ")}{' '}
                <Link
                  href="/careers"
                  className="font-semibold text-yellow-400 hover:underline"
                >
                  {t("View open roles →", "عرض الوظائف الشاغرة ←")}
                </Link>
              </span>
            </div>
          </article>
        </div>
      </Container>
    </section>
  );
}
