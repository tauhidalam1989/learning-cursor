import Link from 'next/link';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { TwoColumnFaqSection } from '@/components/shared/TwoColumnFaqSection';
import { MarketingCtaBand } from '@/components/shared/MarketingCtaBand';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://corematrix.com';

export const metadata: Metadata = {
  title: 'Adobe Licensing — Corematrix | Genuine Adobe Licensing Solutions',
  description:
    'Official Adobe partner: VIP, VIP Marketplace, and ETLA licensing with compliance, Admin Console support, and global delivery for businesses and enterprises.',
  keywords: [
    'Adobe licensing',
    'Adobe VIP',
    'Adobe ETLA',
    'Creative Cloud business',
    'Adobe reseller',
    'Adobe Admin Console',
  ],
  openGraph: {
    title: 'Adobe Licensing — Corematrix',
    description:
      'Genuine Adobe licensing programs with expert guidance — VIP, Marketplace, and ETLA for your organization.',
    url: `${siteUrl}/services/adobe-licensing`,
    siteName: 'Corematrix',
    type: 'website',
  },
};

const WHY_FEATURES = [
  {
    icon: '✓',
    title: 'Official Adobe Partner',
    body:
      '100% genuine licenses with full compliance assurance — every seat is backed by Adobe certification.',
  },
  {
    icon: '⚡',
    title: 'VIP & ETLA Options',
    body:
      'Flexible VIP plans or multi-year ETLA agreements tailored to your scale and procurement model.',
  },
  {
    icon: '🛡',
    title: 'Full Compliance Coverage',
    body:
      'License health checks and audits so your organization stays compliant and cost-optimized.',
  },
  {
    icon: '⚙️',
    title: 'Seamless User Management',
    body:
      'Centralized control through Adobe Admin Console with SSO integration and deployment support.',
  },
  {
    icon: '🌍',
    title: 'Global Support',
    body:
      'Experts across time zones for deployment, renewals, and ongoing license optimization.',
  },
  {
    icon: '📊',
    title: 'End-to-End Delivery',
    body:
      'From requirements and provisioning to admin training and renewals — we own the full lifecycle.',
  },
] as const;

const PROGRAMS = [
  {
    badge: 'SMB',
    name: 'Adobe VIP (SMB)',
    subtitle: 'Value Incentive Plan',
    body:
      'Best for SMBs: flexible seat management with annual billing — scale seats as your team changes.',
    featured: false,
  },
  {
    badge: 'Most Popular',
    name: 'Adobe VIP Marketplace',
    subtitle: 'Marketplace Edition',
    body:
      'Streamlined provisioning, consolidated billing, and scalability for growing organizations and partners.',
    featured: true,
  },
  {
    badge: 'Enterprise',
    name: 'Adobe ETLA (Enterprise)',
    subtitle: 'Enterprise Term License Agreement',
    body:
      'Multi-year predictability, advanced admin controls, enterprise support, and usage reporting at scale.',
    featured: false,
  },
] as const;

const PRODUCTS = [
  {
    icon: '🎨',
    title: 'Creative Cloud Suite',
    apps: 'All-Apps or Single-App',
    description:
      'Photoshop, Illustrator, InDesign, Premiere Pro, After Effects, Lightroom, XD, and more — suite or targeted apps.',
    tags: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects'],
  },
  {
    icon: '📄',
    title: 'Document Solutions',
    apps: 'Acrobat + Sign',
    description:
      'Acrobat Pro for secure PDF workflows plus Adobe Sign for compliant e-signatures across your business.',
    tags: ['Acrobat Pro', 'Adobe Sign', 'PDF'],
  },
  {
    icon: '📸',
    title: 'Adobe Stock',
    apps: 'Royalty-free assets',
    description:
      'Stock images, vectors, templates, and video integrated with your Creative Cloud workflow.',
    tags: ['Images', 'Vectors', 'Video'],
  },
  {
    icon: '🧊',
    title: 'Substance 3D',
    apps: '3D design collection',
    description:
      'Texturing, rendering, and modeling tools for creative and product teams — Substance 3D Collection.',
    tags: ['3D', 'Texturing', 'Rendering'],
  },
] as const;

const SECTORS = [
  { icon: '🏢', title: 'Corporate', subtitle: 'ETLA, Admin Console, usage reporting' },
  { icon: '🏛', title: 'Government', subtitle: 'Compliant procurement and transparent invoicing' },
  { icon: '🎓', title: 'Education', subtitle: 'Discounted licensing for labs, classrooms, and faculty' },
  { icon: '🚀', title: 'Startups', subtitle: 'Flexible VIP seats that scale with you' },
  { icon: '🎬', title: 'Media Agencies', subtitle: 'Creative Cloud at team scale' },
  { icon: '💼', title: 'Professional Services', subtitle: 'Document workflows and e-sign compliance' },
] as const;

const PROCESS = [
  {
    num: '01',
    title: 'Requirement Analysis',
    body: 'We map current and future software needs across teams, projects, and regions.',
  },
  {
    num: '02',
    title: 'Tailored Quotation',
    body: 'A clear Adobe license plan with transparent pricing and flexible commercial terms.',
  },
  {
    num: '03',
    title: 'License Provisioning',
    body: 'Fast activation through Adobe Admin Console — typically within hours of confirmation.',
  },
  {
    num: '04',
    title: 'Deployment Support',
    body: 'User assignment, SSO, and Admin Console setup with guidance for your IT team.',
  },
  {
    num: '05',
    title: 'Renewal & Optimization',
    body: 'Usage tracking and cost reviews ahead of every renewal cycle.',
  },
] as const;

const VALUE_ADDED = [
  {
    title: 'License Health Check',
    body: 'Validate compliance, eliminate shelfware, and right-size spend.',
  },
  {
    title: 'Admin Console Training',
    body: 'Hands-on sessions so IT can manage users, groups, and reporting confidently.',
  },
  {
    title: 'Migration Assistance',
    body: 'Move from individual IDs to business or enterprise identities with minimal disruption.',
  },
  {
    title: 'SSO Setup',
    body: 'Enterprise single sign-on aligned with your identity provider.',
  },
  {
    title: 'Creative Team Enablement',
    body: 'Libraries, templates, and brand-consistent workflows for creative teams.',
  },
  {
    title: 'Compliance Reporting',
    body: 'Usage and entitlement reports for procurement, IT, and finance alignment.',
  },
] as const;

const FAQ_ITEMS = [
  {
    q: 'Should we choose VIP or ETLA?',
    a:
      'VIP fits SMBs that want annual flexibility and easy seat changes. ETLA suits large organizations that need multi-year predictability, deeper controls, and enterprise-grade support.',
  },
  {
    q: 'Can you migrate us from individual Adobe IDs to enterprise IDs?',
    a:
      'Yes. We support identity migration, user reassignment, and Admin Console configuration with minimal disruption to your teams.',
  },
  {
    q: 'How fast can licenses be provisioned?',
    a:
      'In most cases, provisioning completes within hours of order confirmation. We can guide same-day onboarding with your IT team.',
  },
  {
    q: 'Can Adobe licensing integrate with our existing IT stack?',
    a:
      'Yes — including SSO, directory sync, and enterprise identity patterns so authentication works across your Adobe tools.',
  },
  {
    q: 'Do you provide post-purchase support and renewals?',
    a:
      'We offer ongoing support: usage tracking, optimization, renewal management, compliance reviews, and Admin Console guidance through the contract lifecycle.',
  },
] as const;

export default function AdobeLicensingPage() {
  return (
    <>
      {/* Hero */}
      <section
        id="adobe-licensing-hero"
        aria-labelledby="adobe-licensing-heading"
        className="relative min-h-[78vh] overflow-hidden bg-corematrix-bg1 pt-32 pb-20 sm:pt-36"
      >
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.12]"
          aria-hidden
        >
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="al-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a3525" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#al-grid)" />
          </svg>
        </div>
        <div
          className="pointer-events-none absolute -right-24 -top-44 h-[560px] w-[560px] rounded-full bg-corematrix-green700 opacity-[0.10] blur-[120px]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-20 h-[420px] w-[420px] rounded-full bg-corematrix-green700 opacity-[0.06] blur-[100px]"
          aria-hidden
        />

        <Container className="relative z-10">
          <div className="mb-6 flex items-center gap-2 text-xs font-medium text-corematrix-textDim">
            <Link href="/" className="hover:text-corematrix-textMuted">
              Home
            </Link>
            <span aria-hidden>›</span>
            <Link href="/services" className="hover:text-corematrix-textMuted">
              Services
            </Link>
            <span aria-hidden>›</span>
            <span className="text-corematrix-green400">Adobe Licensing</span>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-corematrix-green700 bg-corematrix-green900/30 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-corematrix-green400">
            <span className="h-1.5 w-1.5 rounded-full bg-corematrix-green400" />
            Adobe Certified Partner
          </div>

          <h1
            id="adobe-licensing-heading"
            className="max-w-[900px] font-display text-[clamp(2.5rem,4.5vw,4.2rem)] font-extrabold leading-[1.05] tracking-tight text-corematrix-textPrimary"
          >
            Genuine Adobe Licensing Solutions for Your Business
          </h1>

          <p className="mt-6 max-w-[640px] text-base font-light leading-relaxed text-corematrix-textSecondary">
            Compliant, cost-aware Adobe programs for teams and enterprises worldwide — from program
            selection and provisioning to renewals and optimization.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              Get a Quote →
            </Link>
            <a
              href="#programs"
              className="inline-flex items-center justify-center rounded-lg border border-corematrix-border2 bg-transparent px-6 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green700 hover:bg-corematrix-green900/20"
            >
              View Programs
            </a>
          </div>
        </Container>
      </section>

      {/* Why Corematrix */}
      <section
        aria-labelledby="why-corematrix-heading"
        className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
      >
        <Container>
          <p className="section-label text-corematrix-green400">WHY COREMATRIX</p>
          <h2
            id="why-corematrix-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            Why Corematrix for Adobe Licensing?
          </h2>
          <p className="mt-4 max-w-[640px] text-base leading-relaxed text-corematrix-textSecondary">
            We don&apos;t just sell licenses — we guide selection, deployment, compliance, and
            renewals across the full lifecycle.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-corematrix-border bg-corematrix-border sm:grid-cols-2 lg:grid-cols-3">
            {WHY_FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-corematrix-card2 p-8 transition-colors hover:bg-corematrix-card"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-corematrix-green700/30 bg-corematrix-green900/30 text-lg text-corematrix-green400">
                  {f.icon}
                </div>
                <h3 className="font-display text-base font-bold text-corematrix-textPrimary">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-corematrix-textMuted">{f.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Licensing Programs */}
      <section
        id="programs"
        aria-labelledby="programs-heading"
        className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
      >
        <Container>
          <p className="section-label text-corematrix-green400">LICENSING PROGRAMS</p>
          <h2
            id="programs-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            Licensing Programs
          </h2>
          <p className="mt-4 max-w-[640px] text-base leading-relaxed text-corematrix-textSecondary">
            From growing teams to global enterprises — we align you with the right Adobe commercial
            model.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PROGRAMS.map((p) => (
              <div
                key={p.name}
                className={`relative overflow-hidden rounded-xl border bg-corematrix-card2 p-8 transition-all hover:-translate-y-0.5 hover:border-corematrix-border2 ${
                  p.featured
                    ? 'border-corematrix-green400/35 ring-1 ring-corematrix-green400/20'
                    : 'border-corematrix-border'
                }`}
              >
                {p.featured && (
                  <div
                    className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-corematrix-green700 via-corematrix-green400 to-corematrix-green500"
                    aria-hidden
                  />
                )}
                <span className="inline-block rounded-full border border-corematrix-green700/40 bg-corematrix-green900/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-corematrix-green400">
                  {p.badge}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold text-corematrix-textPrimary">
                  {p.name}
                </h3>
                <p className="text-xs text-corematrix-textDim">{p.subtitle}</p>
                <p className="mt-4 text-sm leading-relaxed text-corematrix-textMuted">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Adobe Products */}
      <section aria-labelledby="products-heading" className="border-t border-corematrix-border bg-corematrix-bg0 py-24">
        <Container>
          <p className="section-label text-corematrix-green400">ADOBE PRODUCTS</p>
          <h2
            id="products-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            Adobe Products
          </h2>
          <p className="mt-4 max-w-[640px] text-base leading-relaxed text-corematrix-textSecondary">
            Creative, document, stock, and 3D — licensed to match how your teams work.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {PRODUCTS.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-corematrix-border bg-corematrix-card2 p-6 transition-colors hover:border-corematrix-border2"
              >
                <div className="flex gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-corematrix-green700/25 bg-corematrix-green900/25 text-2xl"
                    aria-hidden
                  >
                    {p.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-bold text-corematrix-textPrimary">
                      {p.title}
                    </h3>
                    <p className="text-xs font-medium text-corematrix-green400">{p.apps}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-corematrix-textMuted">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded border border-corematrix-border bg-corematrix-bg1 px-2 py-0.5 text-xs text-corematrix-textDim"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Who We Serve */}
      <section
        aria-labelledby="who-we-serve-heading"
        className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
      >
        <Container>
          <p className="section-label text-corematrix-green400">WHO WE SERVE</p>
          <h2
            id="who-we-serve-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            Who We Serve
          </h2>
          <p className="mt-4 max-w-[640px] text-base leading-relaxed text-corematrix-textSecondary">
            Procurement, compliance, and operations — tailored by sector.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SECTORS.map((s) => (
              <div
                key={s.title}
                className="flex items-start gap-4 rounded-xl border border-corematrix-border bg-corematrix-card2 px-5 py-4 transition-colors hover:border-corematrix-border2 hover:bg-corematrix-card"
              >
                <span className="text-2xl" aria-hidden>
                  {s.icon}
                </span>
                <div>
                  <p className="font-display text-sm font-bold text-corematrix-textPrimary">
                    {s.title}
                  </p>
                  <p className="mt-0.5 text-xs text-corematrix-textMuted">{s.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Process */}
      <section
        aria-labelledby="process-heading"
        className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
      >
        <Container>
          <p className="section-label text-corematrix-green400">OUR PROCESS</p>
          <h2
            id="process-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            Our Process
          </h2>
          <p className="mt-4 max-w-[640px] text-base leading-relaxed text-corematrix-textSecondary">
            Transparent steps from first conversation to optimized renewals.
          </p>

          <div className="relative mt-14">
            <div
              className="absolute left-[6%] right-[6%] top-7 hidden h-px bg-gradient-to-r from-transparent via-corematrix-border2 via-corematrix-green700 to-transparent lg:block"
              aria-hidden
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {PROCESS.map((step, i) => (
                <div
                  key={step.num}
                  className="group flex flex-col items-center px-2 text-center"
                >
                  <div className="relative z-10 mb-4 flex h-14 w-14 items-center justify-center rounded-full border-2 border-corematrix-border2 bg-corematrix-card2 font-display text-lg font-extrabold text-corematrix-green400 transition-all group-hover:border-corematrix-green500 group-hover:bg-corematrix-green700 group-hover:text-white group-hover:shadow-[0_0_24px_rgba(34,197,94,0.25)]">
                    {step.num}
                  </div>
                  <h3 className="font-display text-base font-semibold text-corematrix-textPrimary sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-corematrix-textSecondary">
                    {step.body}
                  </p>
                  {i < PROCESS.length - 1 && (
                    <span className="mt-4 text-corematrix-textDim lg:hidden" aria-hidden>
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <p className="mt-10 text-center text-sm text-corematrix-textMuted">
            Requirement Analysis → Tailored Quotation → License Provisioning → Deployment Support →
            Renewal &amp; Optimization
          </p>
        </Container>
      </section>

      {/* Value-added */}
      <section
        aria-labelledby="value-added-heading"
        className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
      >
        <Container>
          <p className="section-label text-corematrix-green400">VALUE-ADDED SERVICES</p>
          <h2
            id="value-added-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            Value-Added Services
          </h2>
          <p className="mt-4 max-w-[640px] text-base leading-relaxed text-corematrix-textSecondary">
            Practical services that help you extract full value from every license.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {VALUE_ADDED.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-corematrix-border bg-corematrix-card2 p-6 transition-colors hover:bg-corematrix-card"
              >
                <h3 className="font-display text-base font-bold text-corematrix-textPrimary">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-corematrix-textMuted">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <TwoColumnFaqSection
        sectionId="adobe-licensing-faq"
        headingId="adobe-licensing-faq-heading"
        title="Frequently Asked Questions"
        description="Licensing models, migration, speed, IT integration, and ongoing support."
        items={FAQ_ITEMS}
        cta={
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
          >
            Ask About Licensing →
          </Link>
        }
      />

      <MarketingCtaBand
        headingId="adobe-cta-heading"
        sectionClassName="bg-corematrix-bg2"
        glow="adobe"
        label="READY TO GET STARTED?"
        title="Ready to Get the Right Adobe License?"
        titleClassName="mx-auto mb-5 max-w-[700px] text-[clamp(2rem,4vw,3.2rem)] font-extrabold tracking-tight text-corematrix-textPrimary"
        description={
          <p className="mx-auto mb-8 max-w-[600px] text-base leading-relaxed text-corematrix-textSecondary">
            Tell us about your teams and timelines — we&apos;ll recommend the right program and handle
            provisioning with you.
          </p>
        }
        actionsWrapperClassName="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-8 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
        >
          Get a Quote →
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-lg border border-corematrix-border2 px-8 py-3 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-green700 hover:bg-corematrix-green900/20"
        >
          Talk to Us
        </Link>
      </MarketingCtaBand>
    </>
  );
}
