'use client';

import Link from 'next/link';
import {
  TwoColumnFaqSection,
  FAQ_GRID_HOME,
} from '@/components/shared/TwoColumnFaqSection';
import type { FaqItem } from '@/types/shared';
import { useLanguage } from '@/context/LanguageContext';

type LocalFaqItem = {
  q_en: string;
  q_ar: string;
  a_en: string;
  a_ar: string;
};

const FAQ_ITEMS: LocalFaqItem[] = [
  {
    q_en: 'What AI services does Corematrix offer?',
    q_ar: 'ما هي خدمات الذكاء الاصطناعي التي تقدمها كورماتريكس؟',
    a_en: 'We offer end-to-end AI development including LLM integration, AI agent development, custom ML models, computer vision, NLP, RAG pipelines, and AI-powered automation workflows.',
    a_ar: 'نحن نقدم تطوير متكامل للذكاء الاصطناعي بما في ذلك تكامل النماذج اللغوية الكبيرة (LLM)، وتطوير وكلاء الذكاء الاصطناعي، ونماذج تعلم الآلة المخصصة، والرؤية الحاسوبية، ومعالجة اللغة الطبيعية، وخطوط أنابيب RAG، وسير عمل الأتمتة المدعومة بالذكاء الاصطناعي.',
  },
  {
    q_en: 'Do you build with Next.js and modern tech stacks?',
    q_ar: 'هل تقومون بالبناء باستخدام Next.js وحزم التقنيات الحديثة؟',
    a_en: 'Yes — our default web stack is Next.js 14+ (App Router), React, TypeScript, and Tailwind CSS, with Node.js or Python backends. We adapt to project requirements.',
    a_ar: 'نعم — حزمة الويب الافتراضية لدينا هي Next.js 14+ (App Router)، و React، و TypeScript، و Tailwind CSS، مع خلفيات Node.js أو Python. نحن نتكيف مع متطلبات المشروع.',
  },
  {
    q_en: 'How long does a typical project take?',
    q_ar: 'كم من الوقت يستغرق المشروع النموذجي؟',
    a_en: 'An MVP typically takes 6–12 weeks. Full-scale products range from 3–6 months. We work in sprints with weekly deliverables so you see continuous progress throughout.',
    a_ar: 'يستغرق منتج MVP الأولي عادةً من 6 إلى 12 أسبوعاً. تتراوح المنتجات كاملة النطاق من 3 إلى 6 أشهر. نحن نعمل في فترات قصيرة (sprints) مع تسليمات أسبوعية حتى ترى تقدماً مستمراً طوال الوقت.',
  },
  {
    q_en: 'Can you integrate AI into our existing product?',
    q_ar: 'هل يمكنكم دمج الذكاء الاصطناعي في منتجنا الحالي؟',
    a_en: 'Absolutely. We specialize in retrofitting AI capabilities — LLM features, automation layers, recommendation engines — into existing products without disruption.',
    a_ar: 'بالتأكيد. نحن متخصصون في تجهيز قدرات الذكاء الاصطناعي — ميزات LLM، وطبقات الأتمتة، ومحركات التوصية — في المنتجات الحالية دون أي تعطيل.',
  },
  {
    q_en: 'Do you provide post-launch support?',
    q_ar: 'هل تقدمون الدعم بعد الإطلاق؟',
    a_en: 'Yes. We offer flexible support packages covering bug fixes, feature additions, performance monitoring, infrastructure management, and AI model updates.',
    a_ar: 'نعم. نحن نقدم حزم دعم مرنة تغطي إصلاح الأخطاء، وإضافة الميزات، ومراقبة الأداء، وإدارة البنية التحتية، وتحديثات نماذج الذكاء الاصطناعي.',
  },
  {
    q_en: 'How does the dedicated team model work?',
    q_ar: 'كيف يعمل نموذج الفريق المخصص؟',
    a_en: 'You get pre-vetted developers embedded in your workflow — using your tools, attending your standups, delivering on your roadmap. Full transparency, flexible contracts, no lock-in.',
    a_ar: 'تحصل على مطورين معتمدين مسبقاً مدمجين في سير عملك — يستخدمون أدواتك، ويحضرون اجتماعاتك اليومية، ويسلمون على خارطة طريقك. شفافية كاملة، عقود مرنة، ودون التزام طويل المدى.',
  },
];

export function FaqSection() {
  const { language, t } = useLanguage();

  const mappedItems: FaqItem[] = FAQ_ITEMS.map((item) => ({
    q: language === 'ar' ? item.q_ar : item.q_en,
    a: language === 'ar' ? item.a_ar : item.a_en,
  }));

  return (
    <TwoColumnFaqSection
      sectionId="faq"
      headingId="faq-heading"
      title={t("You've Got Questions.", "لديك أسئلة؟")}
      description={t("We believe in radical transparency — no jargon, no vague answers.", "نحن نؤمن بالشفافية المطلقة — لا توجد مصطلحات معقدة ولا إجابات غامضة.")}
      items={mappedItems}
      sectionClassName="border-t border-corematrix-border bg-corematrix-bg0 py-16 lg:py-24"
      gridClassName={FAQ_GRID_HOME}
      faqVariant="compact"
      cta={
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
        >
          {t("Talk to Us →", "تحدث إلينا ←")}
        </Link>
      }
    />
  );
}

