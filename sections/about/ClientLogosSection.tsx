'use client';

import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/context/LanguageContext';

const CLIENT_LOGOS = ['TECHCORP', 'NEXAFLOW', 'DATAZEN', 'BUILDIFY', 'SCALR', 'ORBITLAB'];

const LOGO_THEMES = [
  {
    bg: 'bg-cyan-950/15',
    text: 'text-cyan-400/60',
    hoverBg: 'hover:bg-cyan-950/35',
    hoverText: 'hover:text-cyan-300',
    hoverGlow: 'hover:shadow-[inset_0_0_20px_rgba(6,182,212,0.12)]',
  },
  {
    bg: 'bg-amber-950/15',
    text: 'text-amber-400/60',
    hoverBg: 'hover:bg-amber-950/35',
    hoverText: 'hover:text-amber-300',
    hoverGlow: 'hover:shadow-[inset_0_0_20px_rgba(245,158,11,0.12)]',
  },
  {
    bg: 'bg-indigo-950/15',
    text: 'text-indigo-400/60',
    hoverBg: 'hover:bg-indigo-950/35',
    hoverText: 'hover:text-indigo-300',
    hoverGlow: 'hover:shadow-[inset_0_0_20px_rgba(99,102,241,0.12)]',
  },
  {
    bg: 'bg-purple-950/15',
    text: 'text-purple-400/60',
    hoverBg: 'hover:bg-purple-950/35',
    hoverText: 'hover:text-purple-300',
    hoverGlow: 'hover:shadow-[inset_0_0_20px_rgba(168,85,247,0.12)]',
  },
  {
    bg: 'bg-rose-950/15',
    text: 'text-rose-400/60',
    hoverBg: 'hover:bg-rose-950/35',
    hoverText: 'hover:text-rose-300',
    hoverGlow: 'hover:shadow-[inset_0_0_20px_rgba(244,63,94,0.12)]',
  },
  {
    bg: 'bg-emerald-950/15',
    text: 'text-emerald-400/60',
    hoverBg: 'hover:bg-emerald-950/35',
    hoverText: 'hover:text-emerald-300',
    hoverGlow: 'hover:shadow-[inset_0_0_20px_rgba(16,185,129,0.12)]',
  },
];

export function ClientLogosSection() {
  const { t } = useLanguage();

  return (
    <section
      id="client-logos"
      aria-label={t("Trusted by teams at", "موضع ثقة لدى فرق العمل في")}
      className="border-t border-corematrix-border bg-corematrix-bg0 py-16"
    >
      <Container>
        <p className="mb-10 text-center font-display text-[0.68rem] font-bold uppercase tracking-[0.15em] text-corematrix-textDim">
          {t("TRUSTED BY TEAMS AT", "شريك تقني موثوق لدى فرق العمل في")}
        </p>
        <div className="reveal grid grid-cols-3 divide-x divide-y divide-corematrix-border overflow-hidden rounded-2xl border border-corematrix-border md:grid-cols-6">
          {CLIENT_LOGOS.map((logo, i) => {
            const theme = LOGO_THEMES[i % LOGO_THEMES.length];
            return (
              <div
                key={logo}
                className={`flex cursor-default items-center justify-center px-6 py-7 font-display text-sm font-bold tracking-[0.05em] transition-all duration-300 ${theme.bg} ${theme.text} ${theme.hoverBg} ${theme.hoverText} ${theme.hoverGlow}`}
              >
                {logo}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
