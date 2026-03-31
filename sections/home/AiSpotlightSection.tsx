'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';

const AI_TILES = [
  {
    icon: '🤖',
    title: 'LLM Integration & Fine-tuning',
    body: 'Deploy GPT-4, Claude, Gemini, or open-source models into your product with custom fine-tuning and retrieval-augmented generation pipelines.',
  },
  {
    icon: '⚡',
    title: 'AI Agents & Automation',
    body: 'Build multi-step autonomous agents that handle complex business workflows — from customer support to data processing pipelines.',
  },
  {
    icon: '📊',
    title: 'Predictive Analytics & ML',
    body: 'Turn your data into actionable intelligence with custom ML models, forecasting systems, and intelligent recommendation engines.',
  },
];

function AiNeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 460;
    const height = 420;
    const layerX = [80, 180, 300, 390];
    const nodesPerLayer = [4, 6, 6, 4];
    const startY = 60;
    const spacingY = (height - 120) / 6;

    let rafId: number;
    let t = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      t += 0.02;

      const allNodes: { x: number; y: number; layer: number; idx: number }[] = [];
      layerX.forEach((lx, layer) => {
        const count = nodesPerLayer[layer];
        const totalH = (count - 1) * spacingY;
        const start = startY + (height - 140 - totalH) / 2;
        for (let i = 0; i < count; i++) {
          allNodes.push({
            x: lx,
            y: start + i * spacingY,
            layer,
            idx: i,
          });
        }
      });

      for (let l = 0; l < layerX.length - 1; l++) {
        const fromLayer = allNodes.filter((n) => n.layer === l);
        const toLayer = allNodes.filter((n) => n.layer === l + 1);
        fromLayer.forEach((from, fi) => {
          toLayer.forEach((to, ti) => {
            const offset = fi * 0.3 + ti * 0.2 + t;
            const alpha = 0.12 + 0.08 * Math.sin(offset);
            ctx.strokeStyle = `rgba(74, 222, 128, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
          });
        });
      }

      allNodes.forEach((n, i) => {
        const glow = 0.4 + 0.3 * Math.sin(t + i * 0.4);
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 10);
        gradient.addColorStop(0, `rgba(74, 222, 128, ${glow})`);
        gradient.addColorStop(0.6, 'rgba(74, 222, 128, 0.1)');
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(34, 197, 94, 0.9)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      const labels = ['Input', 'Hidden', 'Hidden', 'Output'];
      ctx.fillStyle = 'rgba(74, 222, 128, 0.4)';
      ctx.font = '11px system-ui';
      ctx.textAlign = 'center';
      layerX.forEach((lx, i) => {
        ctx.fillText(labels[i], lx, height - 20);
      });

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={460}
      height={420}
      className="rounded-2xl border border-corematrix-border bg-corematrix-card"
      aria-hidden
    />
  );
}

export function AiSpotlightSection() {
  return (
    <section
      id="ai-spotlight"
      aria-labelledby="ai-spotlight-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-16 lg:py-24"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="reveal">
            <p className="section-label text-corematrix-green400">AI-FIRST COMPANY</p>
            <h2
              id="ai-spotlight-heading"
              className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
            >
              We Don&apos;t Just Talk AI — We Ship It
            </h2>
            <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">
              Every solution we deliver is designed with AI capabilities at its core. We help
              businesses integrate large language models, build autonomous agents, and create
              intelligent systems that learn and adapt.
            </p>
            <div className="mt-8 space-y-4">
              {AI_TILES.map((tile) => (
                <div
                  key={tile.title}
                  className="flex items-start gap-4 rounded-xl border border-corematrix-border bg-corematrix-card p-5 transition-colors hover:border-corematrix-border2"
                >
                  <span className="text-2xl" aria-hidden>
                    {tile.icon}
                  </span>
                  <div>
                    <h3 className="font-display font-semibold text-corematrix-textPrimary">
                      {tile.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-corematrix-textSecondary">
                      {tile.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/services"
              className="mt-8 inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              Explore AI Services →
            </Link>
          </div>
          <div className="reveal reveal-delay-2 flex justify-center lg:justify-end">
            <AiNeuralCanvas />
          </div>
        </div>
      </Container>
    </section>
  );
}
