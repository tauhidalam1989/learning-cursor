'use client';

type TeamMember = {
  initials: string;
  name: string;
  role_en: string;
  role_ar: string;
  bio_en: string;
  bio_ar: string;
  avatarBg: string;
};

import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/config/site';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

const TEAM: TeamMember[] = [
  {
    initials: 'TA',
    name: 'Tauhid Alam',
    role_en: 'Chief Executive Officer (CEO) & Founder',
    role_ar: 'الرئيس التنفيذي (CEO) والمؤسس',
    bio_en: '15+ years leading product and engineering at enterprise scale. Former tech lead at two unicorn SaaS companies. Obsessed with AI and clean architecture.',
    bio_ar: 'خبرة تزيد عن 15 عاماً في قيادة المنتجات والهندسة البرمجية على نطاق المؤسسات الكبرى. قائد تقني سابق في شركتين برمجيتين بلغت قيمتهما المليار دولار. شغوف بالذكاء الاصطناعي والبنية البرمجية النظيفة.',
    avatarBg: 'bg-[#0c3048]',
  },
  {
    initials: 'NA',
    name: 'Nadeem Akhter',
    role_en: 'Chief Technology Officer (CTO)',
    role_ar: 'الرئيس التقني (CTO)',
    bio_en: 'A hands-on technology leader with 16+ years of experience in distributed systems, high-performance computing, and enterprise architecture. Directs Corematrix\'s technical vision and AI innovation.',
    bio_ar: 'قائد تقني متميز يتمتع بخبرة تزيد عن 12 عاماً في الأنظمة الموزعة، الحوسبة عالية الأداء، وهندسة المؤسسات الكبرى. يوجه الرؤية التقنية ومبادرات ابتكار الذكاء الاصطناعي في كورماتريكس.',
    avatarBg: 'bg-[#0c3048]',
  },
  {
    initials: 'JA',
    name: 'Jainish Ali',
    role_en: 'Chief Solution Architect',
    role_ar: 'الرئيس التنفيذي للحلول',
    bio_en: 'Specializes in designing highly scalable, secure, and resilient cloud architectures and microservices. Bridges the gap between complex business needs and cutting-edge software solutions.',
    bio_ar: 'متخصص في تصميم بنيات سحابية وخدمات مصغرة (microservices) آمنة وقابلة للتوسع بشكل كبير. يربط بين احتياجات الأعمال المعقدة والحلول البرمجية المتطورة.',
    avatarBg: 'bg-[#0c3048]',
  },
  {
    initials: 'VS',
    name: 'Vijay Sharma',
    role_en: 'Director Of Delivery & Operations',
    role_ar: 'مدير التسليم والعمليات',
    bio_en: 'Agile delivery expert with a proven track record of managing complex software and AI integration projects. Ensures seamless execution, cross-functional collaboration, and timely delivery.',
    bio_ar: 'خبير في إدارة المشاريع بنهج أجايل (Agile) مع سجل حافل بالنجاح في إدارة مشاريع البرمجيات المعقدة وتكامل الذكاء الاصطناعي. يضمن التنفيذ السلس والتعاون المشترك والتسليم في الوقت المحدد.',
    avatarBg: 'bg-[#0c3048]',
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
              className="group overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card transition-all duration-300 hover:-translate-y-1 hover:border-corematrix-border2 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)] reveal"
            >
              <div
                className={`relative aspect-square w-full overflow-hidden ${member.avatarBg}`}
              >
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 0, transparent 50%)',
                    backgroundSize: '12px 12px',
                  }}
                  aria-hidden
                />
                <div
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(255,255,255,0.08)_0%,transparent_60%)]"
                  aria-hidden
                />
                <div className="relative z-10 flex h-full items-center justify-center font-display text-[2.2rem] font-extrabold text-white/90">
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
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
