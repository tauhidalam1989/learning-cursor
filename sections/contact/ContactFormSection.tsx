'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/config/site';

export type FormStep = 1 | 2 | 3 | 4;

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  services: string[];
  timeline: string;
  budget: number;
  codebase: string;
  description: string;
  source: string;
  requestNda: boolean;
  agreePrivacy: boolean;
}

export type ContactDetail = { icon: string; label: string; value: string; href?: string };

const CONTACT_DETAILS: ContactDetail[] = [
  {
    icon: '📧',
    label: 'Email',
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: '📞',
    label: 'Phone & WhatsApp',
    value: siteConfig.phone,
    href: siteConfig.phoneTel,
  },
  { icon: '🌍', label: 'Location', value: siteConfig.location },
  { icon: '⏰', label: 'Response Time', value: 'Within 24 hours on business days' },
];

export type AvailSlot = { day: string; time: string; status: 'available' | 'limited' | 'closed' };

const AVAILABILITY: AvailSlot[] = [
  { day: 'Monday – Friday', time: '9am – 6pm GMT', status: 'available' },
  { day: 'Saturday', time: '10am – 2pm GMT', status: 'limited' },
  { day: 'Sunday', time: 'Closed', status: 'closed' },
];

const ROLES = [
  'Founder / CEO',
  'CTO / Tech Lead',
  'Product Manager',
  'Engineering Manager',
  'Developer',
  'Designer',
  'Other',
] as const;

const SERVICES = [
  '🧠 AI Development',
  '⚙️ AI Automation',
  '💻 Web Application',
  '📱 Mobile App',
  '☁️ SaaS Platform',
  '🏢 Enterprise Software',
  '👥 Dedicated Team',
  '🛡️ DevOps / Cloud',
  '🎨 UI/UX Design',
  '📊 Data & Analytics',
] as const;

const TIMELINES = [
  { emoji: '⚡', label: 'ASAP', sub: 'Start within 2 wks' },
  { emoji: '📅', label: '1–3 Months', sub: 'Planning stage' },
  { emoji: '🗓️', label: '3–6 Months', sub: 'Future planning' },
  { emoji: '💭', label: 'Exploring', sub: 'Just researching' },
] as const;

const CODEBASE_OPTIONS = [
  'No — starting from scratch',
  'Yes — needs new features',
  'Yes — needs redesign/refactor',
  'Yes — needs AI integration',
  'Unsure',
] as const;

const SOURCE_OPTIONS = [
  'Google Search',
  'LinkedIn',
  'Twitter/X',
  'Referral',
  'GitHub',
  'Blog',
  'Other',
] as const;

const BUDGET_MIN = 5000;
const BUDGET_MAX = 500000;
const BUDGET_STEP = 5000;

const INITIAL_FORM_DATA: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  role: '',
  services: [],
  timeline: '',
  budget: 25000,
  codebase: '',
  description: '',
  source: '',
  requestNda: false,
  agreePrivacy: false,
};

function formatBudget(value: number): string {
  if (value >= 500000) return '$500k+';
  if (value >= 1000) return `$${value / 1000}k`;
  return `$${value.toLocaleString()}`;
}

export function ContactFormSection() {
  const [step, setStep] = useState<FormStep>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const update = useCallback((updates: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  }, []);

  const toggleService = useCallback((s: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(s)
        ? prev.services.filter((x) => x !== s)
        : [...prev.services, s],
    }));
  }, []);

  const canProceedStep1 = Boolean(
    formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)
  );

  const canProceedStep2 = formData.services.length > 0 && formData.timeline;

  const canProceedStep3 = Boolean(formData.description.trim().length >= 10);

  const canSubmit =
    canProceedStep1 &&
    canProceedStep2 &&
    canProceedStep3 &&
    formData.agreePrivacy;

  const buildMessage = useCallback(() => {
    const parts: string[] = [formData.description];
    if (formData.services.length) {
      parts.push(`\n\nServices: ${formData.services.join(', ')}`);
    }
    if (formData.timeline) parts.push(`\nTimeline: ${formData.timeline}`);
    parts.push(`\nBudget: ${formatBudget(formData.budget)}`);
    if (formData.codebase) parts.push(`\nCodebase: ${formData.codebase}`);
    if (formData.role) parts.push(`\nRole: ${formData.role}`);
    if (formData.source) parts.push(`\nHow found us: ${formData.source}`);
    if (formData.requestNda) parts.push('\nNDA requested: Yes');
    return parts.join('');
  }, [formData]);

  const handleSubmit = async () => {
    setError(null);
    setSubmitting(true);
    try {
      const phoneDigits = formData.phone.replace(/\D/g, '');
      const res = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'contact',
          fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
          email: formData.email.trim(),
          phoneCountry: '+224',
          phoneNumber: phoneDigits || undefined,
          company: formData.company.trim() || undefined,
          message: buildMessage(),
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error ?? 'Submission failed');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again or email us directly.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section
        id="contact-form"
        aria-labelledby="contact-form-heading"
        className="border-t border-corematrix-border bg-corematrix-bg0 py-20"
      >
        <Container>
          <div className="mx-auto max-w-2xl rounded-3xl border border-corematrix-border bg-corematrix-card p-12 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-corematrix-green700 text-4xl text-white">
              ✓
            </div>
            <h2
              id="contact-form-heading"
              className="font-display text-2xl font-bold text-corematrix-textPrimary"
            >
              Message Sent Successfully!
            </h2>
            <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">
              Thank you for reaching out. We&apos;ve received your project details and will respond
              within 24 hours with a genuine technical perspective tailored to your needs.
            </p>
            <Link
              href="/services"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              Explore Our Services →
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  const steps: { n: FormStep; label: string }[] = [
    { n: 1, label: 'About You' },
    { n: 2, label: 'Your Project' },
    { n: 3, label: 'Details' },
    { n: 4, label: 'Send' },
  ];

  const budgetPct =
    ((formData.budget - BUDGET_MIN) / (BUDGET_MAX - BUDGET_MIN)) * 100;

  return (
    <section
      id="contact-form"
      aria-labelledby="contact-form-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-20"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-[1fr_1.6fr]">
          <div className="reveal">
            <h2
              id="contact-form-heading"
              className="font-display text-2xl font-bold text-corematrix-textPrimary"
            >
              Get in Touch
            </h2>
            <p className="mt-3 text-sm text-corematrix-textSecondary">
              Fill out the form and we&apos;ll get back within 24 hours.
            </p>
            <div className="mt-6 space-y-4">
              {CONTACT_DETAILS.map((d) => (
                <div key={d.label} className="flex items-start gap-3">
                  <span className="text-lg" aria-hidden>
                    {d.icon}
                  </span>
                  <div>
                    <p className="text-xs font-bold text-corematrix-textDim">{d.label}</p>
                    {d.href ? (
                      <a
                        href={d.href}
                        className="text-sm text-corematrix-textSecondary hover:text-corematrix-green400"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="text-sm text-corematrix-textSecondary">{d.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              {[
                { label: '𝕏', href: siteConfig.twitter, aria: 'Twitter' },
                { label: 'in', href: siteConfig.linkedin, aria: 'LinkedIn' },
                { label: 'octocat', href: siteConfig.github, aria: 'GitHub' },
                { label: 'ig', href: siteConfig.instagram, aria: 'Instagram' },
              ].map(({ label, href, aria }) => (
                <a
                  key={aria}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-corematrix-border bg-corematrix-card text-xs font-bold text-corematrix-textMuted transition-all hover:border-corematrix-green700 hover:bg-corematrix-green900/30 hover:text-corematrix-green400"
                  aria-label={aria}
                >
                  {label}
                </a>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-corematrix-border bg-corematrix-card p-5">
              <p className="mb-4 font-display text-xs font-bold text-corematrix-textPrimary">
                Availability
              </p>
              {AVAILABILITY.map((a) => (
                <div key={a.day} className="flex items-center justify-between py-2 text-sm">
                  <span className="text-corematrix-textSecondary">
                    {a.day} · {a.time}
                  </span>
                  <span
                    className={`h-2 w-2 rounded-full ${
                      a.status === 'available'
                        ? 'bg-corematrix-green400 dot-pulse'
                        : a.status === 'limited'
                          ? 'bg-yellow-400'
                          : 'bg-red-400'
                    }`}
                    aria-hidden
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="relative overflow-hidden rounded-3xl border border-corematrix-border bg-corematrix-card p-8 sm:p-11">
              <div
                className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green500 to-transparent"
                aria-hidden
              />

              <div className="mb-8 flex items-center gap-2">
                {steps.map((s, i) => (
                  <div key={s.n} className="flex items-center">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full border-2 font-display text-sm font-bold transition-all ${
                        step > s.n
                          ? 'border-corematrix-green700 bg-corematrix-green900 text-corematrix-green400'
                          : step === s.n
                            ? 'border-corematrix-green500 bg-corematrix-green700 text-white'
                            : 'border-corematrix-border2 bg-corematrix-card2 text-corematrix-green400'
                      }`}
                    >
                      {step > s.n ? '✓' : s.n}
                    </div>
                    <span className="ml-2 hidden text-xs font-medium text-corematrix-textMuted sm:inline">
                      {s.label}
                    </span>
                    {i < steps.length - 1 && (
                      <div
                        className={`mx-2 h-px w-6 sm:w-8 ${
                          step > s.n ? 'bg-corematrix-green700' : 'bg-corematrix-border2'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => update({ firstName: e.target.value })}
                        className="w-full rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary placeholder-corematrix-textDim focus:border-corematrix-green500 focus:outline-none focus:ring-1 focus:ring-corematrix-green500"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => update({ lastName: e.target.value })}
                        className="w-full rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary placeholder-corematrix-textDim focus:border-corematrix-green500 focus:outline-none focus:ring-1 focus:ring-corematrix-green500"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => update({ email: e.target.value })}
                      className="w-full rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary placeholder-corematrix-textDim focus:border-corematrix-green500 focus:outline-none focus:ring-1 focus:ring-corematrix-green500"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          update({ phone: e.target.value.replace(/[^\d\s+-]/g, '') })
                        }
                        className="w-full rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary placeholder-corematrix-textDim focus:border-corematrix-green500 focus:outline-none focus:ring-1 focus:ring-corematrix-green500"
                        placeholder={siteConfig.phone}
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => update({ company: e.target.value })}
                        className="w-full rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary placeholder-corematrix-textDim focus:border-corematrix-green500 focus:outline-none focus:ring-1 focus:ring-corematrix-green500"
                        placeholder="Acme Inc"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                      Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => update({ role: e.target.value })}
                      className="w-full rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary focus:border-corematrix-green500 focus:outline-none focus:ring-1 focus:ring-corematrix-green500"
                    >
                      <option value="">Select your role</option>
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="mb-3 block text-xs font-medium text-corematrix-textMuted">
                      Services Needed *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleService(s)}
                          className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${
                            formData.services.includes(s)
                              ? 'border-corematrix-green400/30 bg-corematrix-green900/20 text-corematrix-green400 font-semibold'
                              : 'border-corematrix-border bg-corematrix-card2 text-corematrix-textMuted hover:border-corematrix-border2 hover:text-corematrix-textPrimary'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="mb-3 block text-xs font-medium text-corematrix-textMuted">
                      Timeline *
                    </label>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {TIMELINES.map((t) => (
                        <button
                          key={t.label}
                          type="button"
                          onClick={() => update({ timeline: t.label })}
                          className={`rounded-xl border p-4 text-left transition-all ${
                            formData.timeline === t.label
                              ? 'border-corematrix-green400/25 bg-corematrix-green900/20 shadow-[0_0_16px_rgba(34,197,94,0.07)]'
                              : 'border-corematrix-border bg-corematrix-card2 hover:border-corematrix-border2'
                          }`}
                        >
                          <span className="text-xl" aria-hidden>
                            {t.emoji}
                          </span>
                          <p className="mt-2 font-display text-xs font-bold text-corematrix-textPrimary">
                            {t.label}
                          </p>
                          <p className="mt-0.5 text-[0.65rem] text-corematrix-textDim">
                            {t.sub}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                      Budget (USD)
                    </label>
                    <p className="mb-2 font-display text-lg font-bold text-corematrix-green400">
                      {formatBudget(formData.budget)}
                    </p>
                    <input
                      type="range"
                      min={BUDGET_MIN}
                      max={BUDGET_MAX}
                      step={BUDGET_STEP}
                      value={formData.budget}
                      onChange={(e) => update({ budget: Number(e.target.value) })}
                      className="budget-slider w-full"
                      style={{
                        background: `linear-gradient(to right, #22c55e 0%, #22c55e ${budgetPct}%, #1a3525 ${budgetPct}%, #1a3525 100%)`,
                      }}
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                      Existing Codebase?
                    </label>
                    <select
                      value={formData.codebase}
                      onChange={(e) => update({ codebase: e.target.value })}
                      className="w-full rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary focus:border-corematrix-green500 focus:outline-none focus:ring-1 focus:ring-corematrix-green500"
                    >
                      <option value="">Select an option</option>
                      {CODEBASE_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                      Project Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => update({ description: e.target.value })}
                      placeholder="Tell us about your project — what problem are you solving, who are your users, what does success look like?"
                      rows={5}
                      className="min-h-[120px] w-full rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary placeholder-corematrix-textDim focus:border-corematrix-green500 focus:outline-none focus:ring-1 focus:ring-corematrix-green500"
                    />
                  </div>
                  <div
                    className="cursor-pointer rounded-xl border border-dashed border-corematrix-border2 p-6 text-center transition-all hover:border-corematrix-green400/40 hover:bg-corematrix-green900/[0.03]"
                    role="button"
                    tabIndex={0}
                    onClick={() => setFileName('document.pdf')}
                    onKeyDown={(e) => e.key === 'Enter' && setFileName('document.pdf')}
                  >
                    {/* TODO: Wire to your file upload endpoint or Payload media collection */}
                    {fileName ? (
                      <p className="text-sm text-corematrix-green400">{fileName}</p>
                    ) : (
                      <p className="text-sm text-corematrix-textMuted">
                        Drop files or click to upload (optional)
                      </p>
                    )}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-5">
                  <div className="rounded-xl border border-corematrix-border2 bg-corematrix-card2 p-5">
                    <p className="font-display text-xs font-bold text-corematrix-textPrimary mb-3">
                      What happens next
                    </p>
                    <ol className="space-y-2 text-xs text-corematrix-textMuted">
                      <li>1. We review your brief</li>
                      <li>2. Personal response within 24h</li>
                      <li>3. Free discovery call if there&apos;s a fit</li>
                      <li>4. Detailed proposal within 48–72h</li>
                    </ol>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                      How did you find us?
                    </label>
                    <select
                      value={formData.source}
                      onChange={(e) => update({ source: e.target.value })}
                      className="w-full rounded-lg border border-corematrix-border bg-corematrix-bg0 px-4 py-3 text-sm text-corematrix-textPrimary focus:border-corematrix-green500 focus:outline-none focus:ring-1 focus:ring-corematrix-green500"
                    >
                      <option value="">Select</option>
                      {SOURCE_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.requestNda}
                      onChange={(e) => update({ requestNda: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-corematrix-border bg-corematrix-bg0 text-corematrix-green700 focus:ring-corematrix-green500"
                    />
                    <span className="text-sm text-corematrix-textSecondary">
                      I&apos;d like to sign an NDA before discussing project details
                    </span>
                  </label>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={formData.agreePrivacy}
                      onChange={(e) => update({ agreePrivacy: e.target.checked })}
                      className="mt-1 h-4 w-4 rounded border-corematrix-border bg-corematrix-bg0 text-corematrix-green700 focus:ring-corematrix-green500"
                    />
                    <span className="text-sm text-corematrix-textSecondary">
                      I agree to Corematrix&apos;s Privacy Policy and consent to being contacted. *
                    </span>
                  </label>
                  {error && (
                    <p className="text-sm font-light text-red-400">{error}</p>
                  )}
                </div>
              )}

              <div className="mt-8 flex justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => (s - 1) as FormStep)}
                    className="rounded-lg border border-corematrix-border px-6 py-2.5 text-sm font-semibold text-corematrix-textPrimary transition hover:border-corematrix-border2"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => (s + 1) as FormStep)}
                    disabled={
                      (step === 1 && !canProceedStep1) ||
                      (step === 2 && !canProceedStep2) ||
                      (step === 3 && !canProceedStep3)
                    }
                    className="rounded-lg bg-corematrix-green700 px-6 py-2.5 text-sm font-semibold text-white uppercase transition hover:bg-corematrix-green500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={!canSubmit || submitting}
                    className="rounded-lg bg-corematrix-green700 px-8 py-2.5 text-sm font-semibold text-white uppercase transition hover:bg-corematrix-green500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
