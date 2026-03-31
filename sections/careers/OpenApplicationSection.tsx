'use client';

import { useState } from 'react';
import { siteConfig } from '@/config/site';
import { Container } from '@/components/ui/Container';

interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  portfolio: string;
  github: string;
  desiredRole: string;
  experience: string;
  message: string;
  agreePrivacy: boolean;
}

const INITIAL_FORM_DATA: ApplicationData = {
  firstName: '',
  lastName: '',
  email: '',
  portfolio: '',
  github: '',
  desiredRole: '',
  experience: '',
  message: '',
  agreePrivacy: false,
};

const ROLE_OPTIONS = [
  'AI/ML Engineer',
  'Full-Stack Engineer',
  'Backend Engineer',
  'Frontend Engineer',
  'React Native / Mobile',
  'LLM / Research Engineer',
  'Product Designer',
  'Product Manager',
  'DevOps / Platform',
  'Other',
] as const;

const EXPERIENCE_OPTIONS = [
  'Junior (0–2 years)',
  'Mid (2–5 years)',
  'Senior (5–10 years)',
  'Staff+ (10+ years)',
] as const;

const inputClass =
  'w-full rounded-xl border-[1.5px] border-corematrix-border bg-corematrix-card2 px-4 py-3 text-sm text-corematrix-textPrimary outline-none transition-all placeholder:text-corematrix-textDim focus:border-corematrix-green700 focus:shadow-[0_0_0_3px_rgba(22,163,74,0.1)]';

export function OpenApplicationSection() {
  const [formData, setFormData] = useState<ApplicationData>(INITIAL_FORM_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (updates: Partial<ApplicationData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const canSubmit =
    formData.firstName.trim() &&
    formData.email.trim() &&
    formData.message.trim().length >= 10 &&
    formData.agreePrivacy;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formType: 'application',
          fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
          email: formData.email.trim(),
          message: `[CAREER APPLICATION - ${formData.desiredRole || 'Open'}]\n\n${formData.message}\n\nGitHub: ${formData.github || '—'}\nPortfolio: ${formData.portfolio || '—'}\nExperience: ${formData.experience || '—'}`,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        throw new Error('Failed');
      }
    } catch {
      setError(
        `Something went wrong. Please email us directly at ${siteConfig.careersEmail}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section
        id="open-application"
        aria-labelledby="open-application-heading"
        className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
      >
        <Container>
          <div className="mx-auto max-w-xl rounded-3xl border border-corematrix-border bg-corematrix-card p-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-corematrix-green700 text-2xl text-white">
              ✓
            </div>
            <h2
              id="open-application-heading"
              className="font-display text-2xl font-bold text-corematrix-textPrimary"
            >
              Application Received!
            </h2>
            <p className="mt-4 text-base leading-relaxed text-corematrix-textSecondary">
              We&apos;ve received your application and will review it within 5 business days.
              We respond to every single one.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="open-application"
      aria-labelledby="open-application-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="section-label text-corematrix-green400">
              DON&apos;T SEE YOUR ROLE?
            </p>
            <h2
              id="open-application-heading"
              className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
            >
              Send an Open Application
            </h2>
            <p className="mt-6 text-base leading-relaxed text-corematrix-textSecondary">
              Don&apos;t see a role that fits? We welcome speculative applications. Tell us what
              you build, what you care about, and how you&apos;d like to contribute. We read every
              one and respond within 5 business days.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-corematrix-textSecondary">
              {[
                'Tell us what you build and what you care about',
                'Share links to your work — GitHub, portfolio, blog',
                'Be specific about the type of work you want to do',
                'A personal note beats a generic cover letter every time',
                'We respond to every application within 5 business days',
              ].map((tip) => (
                <li key={tip} className="flex items-start gap-3">
                  <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full border border-corematrix-green700 bg-corematrix-green900/30 flex items-center justify-center text-xs text-corematrix-green400">
                    ✓
                  </span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-corematrix-border bg-corematrix-card p-11">
            <div
              className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent"
              aria-hidden
            />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => update({ firstName: e.target.value })}
                  className={inputClass}
                  placeholder="Jane"
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
                  className={inputClass}
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => update({ email: e.target.value })}
                className={inputClass}
                placeholder="jane@example.com"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                  LinkedIn / Portfolio
                </label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => update({ portfolio: e.target.value })}
                  className={inputClass}
                  placeholder="https://linkedin.com/..."
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                  GitHub
                </label>
                <input
                  type="url"
                  value={formData.github}
                  onChange={(e) => update({ github: e.target.value })}
                  className={inputClass}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                  Desired Role / Specialisation
                </label>
                <select
                  value={formData.desiredRole}
                  onChange={(e) => update({ desiredRole: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  {ROLE_OPTIONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                  Years of Experience
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => update({ experience: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Select</option>
                  {EXPERIENCE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-2 block text-xs font-medium text-corematrix-textMuted">
                Message *
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => update({ message: e.target.value })}
                placeholder="Tell us about yourself, what you've built, and why you'd like to join Corematrix..."
                rows={5}
                className={`${inputClass} min-h-[110px] resize-y`}
              />
            </div>
            <div
              className="mt-4 cursor-pointer rounded-xl border border-dashed border-corematrix-border2 p-6 text-center transition-all hover:border-corematrix-green400/40 hover:bg-corematrix-green900/[0.03]"
              role="button"
              tabIndex={0}
              onClick={() => {}}
              onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
            >
              {/* TODO: Wire to Payload media or storage endpoint */}
              <p className="text-sm text-corematrix-textMuted">
                Drop CV or click to upload (optional)
              </p>
            </div>
            <label className="mt-4 flex cursor-pointer items-start gap-3">
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
              <p className="mt-4 text-sm font-light text-red-400">{error}</p>
            )}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit || submitting}
              className="mt-6 w-full rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Sending...
                </span>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
