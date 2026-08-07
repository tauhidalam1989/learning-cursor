'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export interface ProductFaqItem {
  question?: string;
  question_en?: string;
  questionAr?: string;
  question_ar?: string;
  answer?: string;
  answer_en?: string;
  answerAr?: string;
  answer_ar?: string;
}

export default function ProductFaqAccordion({ faqs }: { faqs: ProductFaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { language } = useLanguage();
  const isAr = language === 'ar';

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="divide-y divide-corematrix-border/50 border-t border-b border-corematrix-border/50">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        const qText = isAr
          ? (faq.questionAr || faq.question_ar || faq.question || faq.question_en || '')
          : (faq.question || faq.question_en || faq.questionAr || faq.question_ar || '');
        const aText = isAr
          ? (faq.answerAr || faq.answer_ar || faq.answer || faq.answer_en || '')
          : (faq.answer || faq.answer_en || faq.answerAr || faq.answer_ar || '');

        return (
          <div key={i} className="group transition-colors">
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between py-4 text-left transition-colors cursor-pointer group-hover:text-corematrix-green400"
            >
              <span className={`pr-4 text-sm md:text-base font-semibold leading-snug tracking-tight transition-colors ${isOpen ? 'text-corematrix-green400' : 'text-white group-hover:text-corematrix-green400'}`}>
                {qText}
              </span>
              <div className="ml-4 flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-transform duration-300">
                <svg
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-corematrix-green400' : 'text-zinc-500 group-hover:text-corematrix-green400'
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0 pb-0'
              }`}
            >
              <div className="overflow-hidden">
                <p className="text-xs md:text-sm leading-relaxed text-corematrix-textMuted">
                  {aText}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
