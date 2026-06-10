'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { TERMINAL_LINES } from '@/data/notFoundData';
import { useLanguage } from '@/context/LanguageContext';

type Particle = { x: number; y: number; vx: number; vy: number; r: number; phase: number };

export function NotFoundHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visibleLines, setVisibleLines] = useState(1);
  const { language, t } = useLanguage();
  const isAr = language === 'ar';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * (canvas.width || 800),
      y: Math.random() * (canvas.height || 600),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      phase: Math.random() * Math.PI * 2,
    }));

    let rafId: number;

    const draw = () => {
      const w = canvas.width || 800;
      const h = canvas.height || 600;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.strokeStyle = `rgba(34,197,94,${(1 - dist / 100) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.phase += 0.02;
        const glow = (Math.sin(p.phase) + 1) / 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(74,222,128,${glow * 0.4 + 0.1})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      });

      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const timers = TERMINAL_LINES.slice(1).map((_, i) =>
      setTimeout(() => setVisibleLines(i + 2), 800 + i * 700)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const visibleTerminalLines = TERMINAL_LINES.slice(0, visibleLines);

  return (
    <section
      aria-labelledby="not-found-heading"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-corematrix-bg0 px-[6vw] pb-20 pt-[68px] text-center"
    >
      {/* Grid SVG */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden>
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="nf-grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#1a3525"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#nf-grid)" />
        </svg>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
        aria-hidden
        role="presentation"
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-corematrix-green700 opacity-[0.12] blur-[150px] glow-pulse"
        aria-hidden
      />

      <div className="relative z-10">
        <div className="mb-8 inline-flex items-center gap-2.5 rounded-lg border border-corematrix-green400/20 bg-corematrix-green900/20 px-4 py-2 font-mono text-sm text-corematrix-green400">
          <span className="h-1.5 w-1.5 rounded-full bg-corematrix-green400 dot-pulse" />
          {t('ERROR_CODE: 404 · PAGE_NOT_FOUND', 'رمز الخطأ: 404 · لم يتم العثور على الصفحة')}
        </div>

        <div className="relative mb-8 select-none">
          <span className="relative block font-display text-[clamp(7rem,20vw,18rem)] font-extrabold leading-none tracking-[-0.06em] text-corematrix-textPrimary">
            <span className="bg-gradient-to-b from-corematrix-textPrimary to-corematrix-textPrimary/10 bg-clip-text text-transparent">
              404
            </span>
            <span
              aria-hidden
              className="absolute inset-0 glitch-before bg-gradient-to-b from-corematrix-textPrimary to-corematrix-textPrimary/10 bg-clip-text text-transparent [clip-path:polygon(0_0,100%_0,100%_33%,0_33%)]"
            >
              404
            </span>
            <span
              aria-hidden
              className="absolute inset-0 glitch-after bg-gradient-to-b from-corematrix-textPrimary to-corematrix-textPrimary/10 bg-clip-text text-transparent [clip-path:polygon(0_66%,100%_66%,100%_100%,0_100%)]"
            >
              404
            </span>
          </span>
        </div>

        <h1
          id="not-found-heading"
          className="mx-auto mb-6 max-w-[680px] font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-extrabold leading-[1.15] tracking-tight text-corematrix-textPrimary"
        >
          {t('Our AI Searched the ', 'قام نظام الذكاء الاصطناعي لدينا بالبحث في ')}
          <span className="not-italic text-corematrix-green400">
            {t('Entire Internet', 'الإنترنت بأكمله')}
          </span>
          {t(' — Nothing Found.', ' — ولم يجد شيئاً.')}
        </h1>

        <p className="mx-auto mb-10 max-w-[560px] font-light text-corematrix-textMuted leading-relaxed">
          {t("The page you're looking for doesn't exist or may have been moved. Use the links below to get back on track.", 'الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها. استخدم الروابط أدناه للعودة للمسار الصحيح.')}
        </p>

        <div className="mb-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
          >
            {t('Go Back Home', 'العودة للرئيسية')}
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
          >
            {t('Explore Services', 'استكشف الخدمات')}
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border border-corematrix-border px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green400/30 hover:text-corematrix-green400"
          >
            {t('Contact Us', 'اتصل بنا')}
          </Link>
        </div>

        <div
          aria-live="polite"
          className="mx-auto max-w-[500px] rounded-2xl border border-corematrix-border2 bg-corematrix-card2 p-6 text-left"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
            </span>
            <span className="font-mono text-xs text-corematrix-textDim">{t('corematrix.ai search', 'بحث كوري ماتريكس')}</span>
          </div>
          <div className="space-y-1 font-mono text-sm">
            {visibleTerminalLines.map((line) => {
              const text = isAr ? line.text_ar : line.text_en;
              const highlight = isAr ? line.highlight_ar : line.highlight_en;
              if (line.prefix === 'command') {
                return (
                  <div key={line.id}>
                    <span className="font-medium text-corematrix-green400">$ </span>
                    <span className="text-corematrix-textMuted">{text}</span>
                  </div>
                );
              }
              if (line.prefix === 'error') {
                return (
                  <div key={line.id} className="text-corematrix-textMuted">
                    <span className="text-red-400">✗ </span>
                    {text}
                    {highlight && (
                      <span className="text-amber-400"> {highlight}</span>
                    )}
                  </div>
                );
              }
              if (line.prefix === 'success') {
                return (
                  <div key={line.id}>
                    <span className="text-corematrix-green400">→ </span>
                    <span className="text-corematrix-textMuted">{text}</span>
                    {highlight && (
                      <Link
                        href="/"
                        className="font-medium text-corematrix-green400 hover:underline"
                      >
                        {highlight}
                      </Link>
                    )}
                  </div>
                );
              }
              if (line.prefix === 'cursor') {
                return (
                  <div key={line.id}>
                    <span className="font-medium text-corematrix-green400">$ </span>
                    <span className="term-cursor inline-block h-3.5 w-2 align-middle bg-corematrix-green400" />
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
