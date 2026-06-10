'use client';

import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { useLanguage } from '@/context/LanguageContext';

type TechCategory = { label_en: string; label_ar: string; items: string[] };

const TECH_CATEGORIES: TechCategory[] = [
  {
    label_en: 'AI & Machine Learning',
    label_ar: 'الذكاء الاصطناعي وتعلم الآلة',
    items: [
      'OpenAI API',
      'LangChain',
      'LlamaIndex',
      'Pinecone',
      'Hugging Face',
      'PyTorch',
      'TensorFlow',
      'Claude API',
      'Gemini',
      'Mistral',
      'RAG Pipelines',
      'Vector DBs',
    ],
  },
  {
    label_en: 'Frontend & Web',
    label_ar: 'واجهات المستخدم وتطبيقات الويب',
    items: [
      'Next.js 14',
      'React 18',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'React Native',
      'Flutter',
      'Remix',
      'tRPC',
      'GraphQL',
      'Zustand',
      'React Query',
    ],
  },
  {
    label_en: 'Backend & Infrastructure',
    label_ar: 'الأنظمة الخلفية والبنية التحتية',
    items: [
      'Node.js',
      'Python',
      'FastAPI',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Docker',
      'Kubernetes',
      'AWS',
      'GCP',
      'Supabase',
      'Vercel',
    ],
  },
];

const TAG_THEMES = [
  { bg: 'bg-cyan-950/20', text: 'text-cyan-300', border: 'border-cyan-500/20' },
  { bg: 'bg-amber-950/20', text: 'text-amber-300', border: 'border-amber-500/20' },
  { bg: 'bg-indigo-950/20', text: 'text-indigo-300', border: 'border-indigo-500/20' },
  { bg: 'bg-purple-950/20', text: 'text-purple-300', border: 'border-purple-500/20' },
  { bg: 'bg-orange-950/20', text: 'text-orange-300', border: 'border-orange-500/20' },
  { bg: 'bg-sky-950/20', text: 'text-sky-300', border: 'border-sky-500/20' },
  { bg: 'bg-rose-950/20', text: 'text-rose-300', border: 'border-rose-500/20' },
  { bg: 'bg-emerald-950/20', text: 'text-emerald-300', border: 'border-emerald-500/20' },
];

function getTagTheme(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % TAG_THEMES.length;
  return TAG_THEMES[index];
}

export function TechStackSection() {
  const { t, language } = useLanguage();

  return (
    <section
      id="tech-stack"
      aria-labelledby="tech-stack-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t("TECH STACK", "التقنيات المستخدمة")}
          title={t("Technologies We Build With", "التقنيات التي نبني بها")}
          titleId="tech-stack-heading"
          description={t("Modern, battle-tested tools that power production systems worldwide.", "أدوات حديثة ومختبرة ميدانياً تعمل على تشغيل الأنظمة الإنتاجية في جميع أنواق العالم.")}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TECH_CATEGORIES.map((cat) => (
            <article
              key={cat.label_en}
              className="reveal rounded-2xl border border-corematrix-border bg-corematrix-card p-7 transition-all duration-300 hover:border-corematrix-green700/30 hover:shadow-[0_0_20px_rgba(20,146,83,0.04)]"
            >
              <div className="mb-5 flex items-center gap-3">
                <span className="font-display text-[0.68rem] font-bold uppercase tracking-[0.12em] text-corematrix-green400">
                  {language === 'ar' ? cat.label_ar : cat.label_en}
                </span>
                <div className="h-px flex-1 bg-corematrix-border" />
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => {
                  const theme = getTagTheme(item);
                  return (
                    <span
                      key={item}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-300 ${theme.bg} ${theme.border} ${theme.text} hover:scale-[1.03] cursor-default`}
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
