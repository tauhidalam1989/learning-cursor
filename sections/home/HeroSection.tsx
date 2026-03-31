'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const CANVAS_W = 520;
const CANVAS_H = 480;
const NODE_COUNT = 35;
const CONNECT_DIST = 120;

function HeroNeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = CANVAS_W;
    const height = CANVAS_H;

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
    }));

    let rafId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const alpha = 0.15 * (1 - d / CONNECT_DIST);
            ctx.strokeStyle = `rgba(74, 222, 128, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      const t = performance.now() * 0.001;
      nodes.forEach((n, i) => {
        const glow = 0.4 + 0.3 * Math.sin(t + i * 0.5);
        const gradient = ctx.createRadialGradient(
          n.x, n.y, 0,
          n.x, n.y, 8
        );
        gradient.addColorStop(0, `rgba(74, 222, 128, ${glow})`);
        gradient.addColorStop(0.5, 'rgba(74, 222, 128, 0.15)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(34, 197, 94, 0.9)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
        ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_W}
      height={CANVAS_H}
      className="rounded-xl border border-corematrix-border bg-corematrix-card"
      aria-hidden
    />
  );
}

export function HeroSection() {
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
              AI-First Technology Company
            </div>

            <h1
              id="hero-heading"
              className="animate-fade-up-in font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-corematrix-textPrimary md:text-5xl lg:text-6xl"
              style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
            >
              Build Smarter with
              <br />
              <em className="not-italic text-corematrix-green400">AI-Powered</em> Digital Solutions
            </h1>

            <p
              className="animate-fade-up-in max-w-[560px] text-base text-corematrix-textSecondary sm:text-lg"
              style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
            >
              We design, build, and deploy intelligent software — from custom AI products
              and full-stack web apps to enterprise systems that drive real, measurable growth.
            </p>

            <div
              className="animate-fade-up-in flex flex-wrap gap-4"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
              >
                Explore AI Services →
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-corematrix-border2 bg-transparent px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green700 hover:bg-corematrix-green900/20"
              >
                Start Your Project
              </Link>
            </div>

            <div
              className="animate-fade-up-in flex flex-wrap gap-6 text-sm font-medium text-corematrix-textMuted"
              style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
            >
              <span className="flex items-center gap-2">
                <span aria-hidden>⚡</span>
                50+ Projects Delivered
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden>🤖</span>
                AI-First Approach
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden>🌍</span>
                Global Clients
              </span>
              <span className="flex items-center gap-2">
                <span aria-hidden>⭐</span>
                98% Satisfaction
              </span>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <HeroNeuralCanvas />
              <div className="absolute -bottom-4 left-4 rounded-xl border border-corematrix-border2 bg-corematrix-card2 px-4 py-3 shadow-lg">
                <span className="text-corematrix-textSecondary">
                  AI systems <span className="text-corematrix-green400">online</span> & running
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
