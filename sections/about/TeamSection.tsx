'use client';

type TeamMember = {
  initials: string;
  name: string;
  role_en: string;
  role_ar: string;
  bio_en: string;
  bio_ar: string;
  avatarGradient: string;
};

import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/config/site';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

const TEAM: TeamMember[] = [
  {
    initials: 'TA',
    name: 'Tauhid Alam',
    role_en: 'CEO & Founder',
    role_ar: 'الرئيس التنفيذي والمؤسس',
    bio_en: '15+ years leading product and engineering at enterprise scale. Former tech lead at two unicorn SaaS companies. Obsessed with AI and clean architecture.',
    bio_ar: 'خبرة تزيد عن 15 عاماً في قيادة المنتجات والهندسة البرمجية على نطاق المؤسسات الكبرى. قائد تقني سابق في شركتين برمجيتين بلغت قيمتهما المليار دولار. شغوف بالذكاء الاصطناعي والبنية البرمجية النظيفة.',
    avatarGradient: 'from-corematrix-green900 to-corematrix-card2',
  },
  {
    initials: 'NA',
    name: 'Nadeem Akhter',
    role_en: 'Chief Technology Officer',
    role_ar: 'الرئيس التقني',
    bio_en: 'C# & .NET specialist with a background in computational linguistics and distributed systems. Built production RAG systems serving millions of queries.',
    bio_ar: 'متخصص في لغة C# ومنصة .NET ولديه خلفية في اللغويات الحاسوبية والأنظمة الموزعة. قام ببناء أنظمة RAG إنتاجية تخدم ملايين الاستعلامات.',
    avatarGradient: 'from-[#052e16] to-[#0d2b1a]',
  },
  {
    initials: 'JA',
    name: 'Jainish Ali',
    role_en: 'Solution Architect',
    role_ar: 'مهندس حلول',
    bio_en: 'Full-stack architect specializing in Next.js and Node.js at scale. Led engineering teams of 20+ at fast-growing SaaS companies across two continents.',
    bio_ar: 'مهندس حلول متكاملة (Full-stack) متخصص في تقنيات Next.js و Node.js على نطاق واسع. قاد فرق هندسية تضم أكثر من 20 مطوراً في شركات SaaS سريعة النمو عبر قارتين.',
    avatarGradient: 'from-[#073d1a] to-[#0a1f12]',
  },
  {
    initials: 'VS',
    name: 'Vijay Sharma',
    role_en: 'Project Manager',
    role_ar: 'مدير المشاريع',
    bio_en: 'UI developer with a background in UX/UI design. Specialized in React, Next.js, and Tailwind CSS. Built production RAG systems serving millions of queries.',
    bio_ar: 'مطور واجهات مستخدم مع خلفية في تصميم تجربة وواجهة المستخدم (UX/UI). متخصص في مكتبة React وإطار عمل Next.js وتقنية Tailwind CSS.',
    avatarGradient: 'from-[#041a0b] to-[#0f2318]',
  },
];

export function TeamSection() {
  const { t, language } = useLanguage();

  return (
    <section
      id="team"
      aria-labelledby="team-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t("OUR TEAM", "فريقنا")}
          title={t("Meet the People Behind Corematrix", "تعرف على الأشخاص وراء كورماتريكس")}
          titleId="team-heading"
          description={t("Engineers, AI specialists, and product thinkers who ship software that matters.", "مهندسون ومتخصصون في الذكاء الاصطناعي ومفكرو منتجات يشحنون برمجيات تصنع فرقاً حقيقياً.")}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((member) => (
            <article
              key={member.name}
              className="group overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card transition-all duration-300 hover:-translate-y-1 hover:border-corematrix-border2 hover:shadow-[0_0_40px_rgba(34,197,94,0.08)] reveal"
            >
              <div
                className={`relative aspect-square w-full overflow-hidden bg-gradient-to-br ${member.avatarGradient}`}
              >
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, #22c55e 0, #22c55e 1px, transparent 0, transparent 50%)',
                    backgroundSize: '12px 12px',
                  }}
                  aria-hidden
                />
                <div
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(34,197,94,0.18)_0%,transparent_60%)]"
                  aria-hidden
                />
                <div className="relative z-10 flex h-full items-center justify-center font-display text-[2.2rem] font-extrabold text-corematrix-green700">
                  {member.initials}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-sm font-bold text-corematrix-textPrimary">
                  {member.name}
                </h3>
                <p className="mt-0.5 mb-2 text-xs font-semibold text-corematrix-green400">
                  {language === 'ar' ? member.role_ar : member.role_en}
                </p>
                <p className="mb-3 text-xs font-light leading-relaxed text-corematrix-textMuted">
                  {language === 'ar' ? member.bio_ar : member.bio_en}
                </p>
                {/* <div className="flex gap-2">
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-corematrix-border bg-corematrix-card2 text-[0.65rem] text-corematrix-textMuted transition-all hover:border-corematrix-green700 hover:bg-corematrix-green900/30 hover:text-corematrix-green400"
                    aria-label="LinkedIn"
                  >
                    in
                  </a>
                  <a
                    href={siteConfig.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-corematrix-border bg-corematrix-card2 text-[0.65rem] text-corematrix-textMuted transition-all hover:border-corematrix-green700 hover:bg-corematrix-green900/30 hover:text-corematrix-green400"
                    aria-label="Twitter"
                  >
                    𝕏
                  </a>
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-corematrix-border bg-corematrix-card2 text-[0.65rem] text-corematrix-textMuted transition-all hover:border-corematrix-green700 hover:bg-corematrix-green900/30 hover:text-corematrix-green400"
                    aria-label="GitHub"
                  >
                    gh
                  </a>
                </div> */}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
