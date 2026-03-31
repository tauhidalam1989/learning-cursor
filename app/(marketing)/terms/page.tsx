import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Corematrix Terms of Service. Terms and conditions for using our website and services.',
  alternates: {
    canonical: `${siteConfig.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <main className="pt-24 pb-20 px-[6vw] max-w-[760px] mx-auto">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 text-xs text-corematrix-textDim mb-6"
      >
        <a
          href="/"
          className="hover:text-corematrix-green400 transition-colors"
        >
          Home
        </a>
        <span aria-hidden>›</span>
        <span className="text-corematrix-green400">Terms of Service</span>
      </nav>

      <div className="inline-flex items-center gap-2 bg-corematrix-green900/20 border border-corematrix-green400/15 rounded-lg px-4 py-2 font-mono text-sm text-corematrix-green400 mb-5">
        Last Updated: March 2026
      </div>

      <h1
        className="font-display text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-tight text-corematrix-textPrimary mb-3"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Terms of Service
      </h1>

      <p className="text-sm text-corematrix-textMuted mb-10">
        Effective: 1 March 2026 · Last updated: 20 March 2026
      </p>

      <div className="bg-corematrix-card border border-corematrix-border border-l-[3px] border-l-corematrix-green700 rounded-r-xl p-5 text-sm text-corematrix-textMuted font-light leading-relaxed mb-10">
        <strong className="text-corematrix-green400">Summary:</strong> By using
        our website and services, you agree to these terms. We provide IT
        services in good faith and expect the same from our clients. Full legal
        detail is provided in each section below.
      </div>

      {[
        {
          num: '01',
          title: 'Acceptance of Terms',
          body: `By accessing or using the Corematrix website at ${siteConfig.url} or engaging our services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our website or services.`,
        },
        {
          num: '02',
          title: 'Services',
          body: 'Corematrix provides IT services including AI development, web application development, SaaS platform development, mobile app development, and dedicated engineering teams. Specific terms for individual engagements are governed by separate written agreements signed by both parties.',
        },
        {
          num: '03',
          title: 'Intellectual Property',
          body: 'All intellectual property created by Corematrix for a client under a paid engagement is assigned to the client upon full payment, as specified in our project agreements. Our proprietary frameworks, methodologies, and internal tooling remain the property of Corematrix.',
        },
        {
          num: '04',
          title: 'Limitation of Liability',
          body: 'To the maximum extent permitted by law, Corematrix shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability shall not exceed the amount paid by you for the specific service giving rise to the claim.',
        },
        {
          num: '05',
          title: 'Governing Law',
          body: 'These terms shall be governed by and construed in accordance with applicable international law. Any disputes shall be resolved through good-faith negotiation, followed by binding arbitration if necessary.',
        },
        {
          num: '06',
          title: 'Contact',
          body: '',
        },
      ].map((s) => (
        <section key={s.num} className="mb-10 scroll-mt-24">
          <div className="flex items-start gap-4 pb-5 mb-5 border-b border-corematrix-border">
            <span className="font-mono text-sm text-corematrix-green700 font-medium flex-shrink-0 mt-0.5 w-7">
              {s.num}
            </span>
            <h2
              className="font-display text-xl font-extrabold text-corematrix-textPrimary tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {s.title}
            </h2>
          </div>
          {s.body ? (
            <p className="text-sm text-corematrix-textMuted font-light leading-[1.8] pl-11">
              {s.body}
            </p>
          ) : (
            <p className="text-sm text-corematrix-textMuted font-light leading-[1.8] pl-11">
              Questions about these terms?{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-corematrix-green400 border-b border-corematrix-green400/25 hover:border-corematrix-green400 transition-colors"
              >
                {siteConfig.email}
              </a>
            </p>
          )}
        </section>
      ))}
    </main>
  );
}
