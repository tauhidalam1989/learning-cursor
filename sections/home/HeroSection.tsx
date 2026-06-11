'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import heroAiRobot from '@/public/images/hero-ai-robot.png';


export function HeroSection() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen overflow-hidden bg-corematrix-bg1"
    >
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-corematrix-green700 opacity-10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-corematrix-green700 opacity-10 blur-3xl"
        aria-hidden
      />
      <div className="noise-overlay absolute inset-0 z-0" aria-hidden />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-16 sm:px-8 lg:px-12">
        <div className="grid min-h-[calc(100vh-8rem)] grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-8">
            <div
              className="inline-flex animate-fade-up-in items-center gap-2 rounded-full border border-corematrix-green700 bg-corematrix-green900/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-corematrix-green400"
              style={{ animationDelay: '0s', animationFillMode: 'both' }}
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-corematrix-green400" />
              {t("AI-First Technology Company", "شركة تقنية ترتكز على الذكاء الاصطناعي")}
            </div>

            <h1
              id="hero-heading"
              className="animate-fade-up-in font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-corematrix-textPrimary md:text-5xl lg:text-6xl"
              style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
            >
              {t("Build Smarter with", "ابنِ بذكاء أكبر مع")}
              <br />
              <em className="not-italic text-corematrix-green400">
                {t("AI-Powered", "حلول رقمية مبتكرة")}
              </em>{" "}
              {t("Digital Solutions", "تعمل بالذكاء الاصطناعي")}
            </h1>

            <p
              className="animate-fade-up-in max-w-[560px] text-base text-corematrix-textSecondary sm:text-lg"
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              {t(
                "We design, build, and deploy intelligent software — from custom AI products and full-stack web apps to enterprise systems that drive real, measurable growth.",
                "نحن نصمم ونبني وننشر برمجيات ذكية — من منتجات الذكاء الاصطناعي المخصصة وتطبيقات الويب المتكاملة إلى أنظمة المؤسسات التي تدفع نمواً حقيقياً وقابلاً للقياس."
              )}
            </p>

            <div
              className="animate-fade-up-in flex flex-wrap gap-4"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
              >
                {t("Explore AI Services →", "استكشف خدمات الذكاء الاصطناعي ←")}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-corematrix-border2 bg-transparent px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green700 hover:bg-corematrix-green900/20"
              >
                {t("Start Your Project", "ابدأ مشروعك")}
              </Link>
            </div>

            <div
              className="animate-fade-up-in flex flex-wrap gap-6 text-sm font-medium"
              style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            >
              <span className="flex items-center gap-2 text-amber-200/90">
                <i className="fas fa-bolt text-amber-400" aria-hidden="true" />
                {t("50+ Projects Delivered", "توصيل أكثر من 50 مشروعاً")}
              </span>
              <span className="flex items-center gap-2 text-purple-200/90">
                <i className="fas fa-robot text-purple-400" aria-hidden="true" />
                {t("AI-First Approach", "نهج يرتكز على الذكاء الاصطناعي")}
              </span>
              <span className="flex items-center gap-2 text-cyan-200/90">
                <i className="fas fa-globe text-cyan-400" aria-hidden="true" />
                {t("Global Clients", "عملاء عالميون")}
              </span>
              <span className="flex items-center gap-2 text-rose-200/90">
                <i className="fas fa-star text-rose-400" aria-hidden="true" />
                {t("98% Satisfaction", "نسبة رضا 98%")}
              </span>
            </div>
          </div>

          <div className="relative flex w-full min-w-0 justify-center lg:justify-end lg:-mt-28">
            <div className="relative w-full max-w-[520px]">
              <Image
                src={heroAiRobot}
                alt="Stylized AI robot on a glowing platform with holographic charts and graphs"
                width={1024}
                height={682}
                className="h-auto w-full rounded-xl border border-corematrix-border bg-black object-contain"
                sizes="(max-width: 1024px) 100vw, 520px"
                priority
              />
              <div className="absolute -bottom-4 left-4 rounded-xl border border-corematrix-border2 bg-corematrix-card2 px-4 py-3 shadow-lg">
                <span className="text-corematrix-textSecondary">
                  {t("AI systems", "أنظمة الذكاء الاصطناعي")}{" "}
                  <span className="text-corematrix-green400">{t("online", "نشطة")}</span>{" "}
                  {t("& running", "وتعمل")}
                </span>
                <span className="ml-2 inline-block h-2 w-2 animate-pulse rounded-full bg-corematrix-green400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

