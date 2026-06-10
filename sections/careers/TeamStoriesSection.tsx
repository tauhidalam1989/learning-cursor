'use client';

import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { TEAM_STORIES } from '@/data/careersData';
import { useLanguage } from '@/context/LanguageContext';

// Explicitly typed translation maps for i18n
const nameTranslations: Record<string, string> = {
  'Marcus J.': 'ماركوس ج.',
  'Priya L.': 'بريا ل.',
  'Diana F.': 'ديانا ف.',
};

const roleTranslations: Record<string, string> = {
  'Head of Engineering': 'رئيس الهندسة',
  'Head of AI Products': 'رئيس منتجات الذكاء الاصطناعي',
  'Senior Full-Stack Engineer': 'كبير مهندسي Full-Stack',
};

const quoteTranslations: Record<string, string> = {
  "I've worked at three FAANG companies and two startups. Corematrix is the first place where engineering decisions are made by engineers, not committees. The speed at which we ship real software is genuinely rare.":
    'لقد عملت في ثلاث شركات تقنية كبرى (FAANG) وشركتين ناشئتين. كورماتريكس هو أول مكان تُتخذ فيه القرارات الهندسية من قبل المهندسين، وليس اللجان. إن السرعة التي نشحن بها برمجيات حقيقية نادرة حقاً.',
  "I came from an ML research background and was worried about losing technical depth at a services company. Instead, I shipped more production AI systems in my first year here than in three years at my previous job.":
    'لقد جئت من خلفية أبحاث تعلم الآلة (ML) وكنت قلقة من فقدان العمق التقني في شركة خدمات. بدلاً من ذلك، قمت بإطلاق وتفعيل أنظمة ذكاء اصطناعي في بيئة الإنتاج في عامي الأول هنا أكثر مما قمت به في ثلاث سنوات في وظيفتي السابقة.',
  "I was skeptical about joining a remote-first company — I'd had bad experiences before. Corematrix is different. The async culture is real, the documentation is genuinely useful, and I've never felt more productive.":
    'كنت متشككة بشأن الانضمام إلى شركة تعمل عن بعد بالكامل — فقد مررت بتجارب سيئة من قبل. لكن كورماتريكس مختلفة؛ ثقافة العمل غير المتزامن حقيقية، والتوثيق مفيد للغاية، ولم أشعر بإنتاجية أكبر من قبل مثل الآن.',
};

const tagTranslations: Record<string, string> = {
  'Next.js': 'Next.js',
  'Architecture': 'الهندسة المعمارية',
  'Remote': 'عن بعد',
  'LLMs': 'نماذج اللغة (LLMs)',
  'RAG': 'RAG',
  'Production AI': 'الذكاء الاصطناعي في الإنتاج',
  'React': 'React',
  'PostgreSQL': 'PostgreSQL',
  'Async Work': 'عمل غير متزامن',
};

export function TeamStoriesSection() {
  const { t } = useLanguage();

  return (
    <section
      id="careers-stories"
      aria-labelledby="careers-stories-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t('TEAM STORIES', 'قصص الفريق')}
          title={t('Hear It From the People Who Work Here', 'استمع إلى من يعملون هنا')}
          titleId="careers-stories-heading"
          description={t(
            'Real experiences from engineers and leaders who chose to build at Corematrix.',
            'تجارب واقعية من مهندسين وقادة اختاروا البناء في كورماتريكس.'
          )}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TEAM_STORIES.map((story) => (
            <div
              key={story.name}
              className="reveal overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card transition-all duration-300 hover:-translate-y-1 hover:border-corematrix-border2"
            >
              <div className="relative h-28 overflow-hidden border-b border-corematrix-border bg-gradient-to-br from-corematrix-green900/60 to-corematrix-card2">
                {/* TODO: Replace with <Image src={story.avatar} alt={story.name} fill className="object-cover" /> */}
                <span className="absolute inset-0 flex items-center justify-center font-display text-3xl font-extrabold text-corematrix-green700">
                  {story.initials}
                </span>
              </div>
              <div className="p-6">
                <p className="font-display text-sm font-bold text-corematrix-textPrimary">
                  {t(story.name, nameTranslations[story.name] ?? story.name)}
                </p>
                <p className="text-xs text-corematrix-textDim">
                  {t(story.role, roleTranslations[story.role] ?? story.role)} · {t('Joined', 'انضم في')} {story.joinedYear}
                </p>
                <blockquote className="mt-4 border-l-4 border-corematrix-green700 pl-4 text-sm italic text-corematrix-textSecondary">
                  &quot;{t(story.quote, quoteTranslations[story.quote] ?? story.quote)}&quot;
                </blockquote>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-corematrix-border bg-corematrix-card2 px-2.5 py-0.5 font-mono text-[0.68rem] text-corematrix-textDim"
                    >
                      {t(tag, tagTranslations[tag] ?? tag)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
