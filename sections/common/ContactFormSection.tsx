 'use client';

import { useState } from 'react';
import { countryCodes } from '@/data/countryCodes';
import { Container } from '@/components/ui/Container';
import { FormInput } from '@/components/ui/FormInput';
import { FormTextarea } from '@/components/ui/FormTextarea';
import { FormCard } from '@/components/sections/FormCard';
import type { ContactBlock, ContactItemType } from '@/types';

const SERVICE_OPTIONS = [
  'AI Product Development',
  'Custom AI & Automation',
  'Web Application Development',
  'Mobile App Development',
  'SaaS Platform Development',
  'Dedicated Dev Team',
  'Other',
];

/* Icons for contact items by type */
function ContactIcon({ type }: { type: ContactItemType }) {
  const className = 'h-5 w-5 text-[#149253]';
  if (type === 'email') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    );
  }
  if (type === 'phone') {
    return (
      <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    );
  }
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

export interface ContactFormSectionProps {
  /** Block content: label, heading, paragraph, contact items, submit button text. */
  block: ContactBlock;
  /** Optional section id for accessibility and anchor links. */
  id?: string;
  /** Optional callback when form is submitted. */
  onSubmit?: (data: Record<string, string>) => void;
}

/**
 * Reusable Contact Form section – use on home, contact page, or anywhere.
 * Content is fully dynamic via the `block` prop (e.g. from data/contact).
 */
export function ContactFormSection({
  block,
  id = 'contact-form',
  onSubmit,
}: ContactFormSectionProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneCountry: '+91',
    phoneNumber: '',
    company: '',
    service: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // validate all fields
    const newErrors: Record<string, string> = {};
    ['fullName', 'email', 'phoneNumber', 'message'].forEach((field) => {
      const val = (formData as Record<string, string>)[field] || '';
      const err = validateField(field, val);
      if (err) newErrors[field] = err;
    });
    setErrors(newErrors);
    setTouched({ fullName: true, email: true, phoneNumber: true, message: true });
    if (Object.values(newErrors).some(Boolean)) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formType: 'contact', ...formData }),
      });
      if (res.status === 201) {
        onSubmit?.(formData);
        setSubmitted(true);
        // reset form
        setFormData({
          fullName: '',
          email: '',
          phoneCountry: '+91',
          phoneNumber: '',
          company: '',
          service: '',
          message: '',
        });
        setErrors({});
        setTouched({});
      } else if (res.status === 400) {
        const data = await res.json();
        setErrors((prev) => ({ ...prev, ...(data?.errors ?? {}) }));
      } else {
        const data = await res.json().catch(() => ({}));
        setErrors((prev) => ({ ...prev, submit: data?.error ?? 'Submission failed. Please try again.' }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, submit: 'Network error. Please try again.' }));
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let newVal = value;
    // prevent leading spaces in full name
    if (name === 'fullName') {
      newVal = newVal.replace(/^\s+/, '');
    }
    // allow only digits for phoneNumber (no letters or special chars)
    if (name === 'phoneNumber') {
      newVal = newVal.replace(/[^\d]/g, '');
    }
    setFormData((prev) => ({
      ...prev,
      [name]: newVal,
    }));
  };

  const submitLabel = block.submitButtonLabel ?? 'SUBMIT';
  // form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateField = (name: string, value: string) => {
    if (name === 'fullName') {
      if (!value.trim()) return 'Full name is required';
      if (/^\s/.test(value)) return 'Full name cannot start with a space';
      if (value.trim().length < 2) return 'Please enter a valid name';
      return '';
    }
    if (name === 'email') {
      if (!value.trim()) return 'Email is required';
      // stricter email regex
      if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) return 'Enter a valid email';
      return '';
    }
    if (name === 'phoneNumber') {
      if (!value.trim()) return 'Phone number is required';
      // only digits allowed; min 7 max 15
      if (!/^\d{7,15}$/.test(value)) return 'Enter a valid phone number';
      return '';
    }
    if (name === 'message') {
      if (!value.trim()) return 'Message is required';
      if (value.trim().length < 10) return 'Please provide more details';
      return '';
    }
    return '';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    const err = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: err }));
  };

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
    className="relative overflow-hidden py-16 sm:py-20"
      style={{
        background: 'linear-gradient(180deg, #010101 0%, #012112 100%)',
        borderTopWidth: 2,
        borderTopStyle: 'solid',
        borderImageSource: 'linear-gradient(90deg, #010D07 0%, #026835 49.04%, #010D07 98.56%)',
        borderImageSlice: 1,
      }}
    >
      <div
        className="absolute right-0 top-0 h-[400px] w-[400px] -translate-y-1/2 translate-x-1/4 rounded-full bg-[#149253] opacity-5 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 h-[300px] w-[300px] translate-y-1/2 -translate-x-1/4 rounded-full bg-[#149253] opacity-5 blur-3xl"
        aria-hidden="true"
      />

      <Container>
          <div className="relative z-10 grid gap-8 lg:grid-cols-[45%_55%] lg:gap-16">
          {/* Left: Dynamic content from block */}
          <div className="flex flex-col">
            <p
              className="sm:text-sm"
                style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 23,
                lineHeight: '106%',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: '#149253',
              }}
            >
              {block.sectionLabel}
            </p>
            <h2
              id={`${id}-heading`}
              className="mt-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 400,
                fontSize: 56,
                lineHeight: '106%',
                color: '#FFFFFF',
              }}
            >
              {block.heading}
            </h2>
            <p
              className="mt-6"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 300,
                fontSize: 19,
                lineHeight: '178%',
                color: '#FFFFFF',
              }}
            >
              {block.paragraph}
            </p>
            <div className="mt-10 space-y-6">
              {block.contactItems.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center">
                    <ContactIcon type={item.type} />
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-base leading-relaxed hover:text-[#149253] transition-colors"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 400,
                        fontSize: 18,
                        color: '#FFFFFF',
                      }}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p
                      className="leading-relaxed"
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontWeight: 400,
                        fontSize: 18,
                        color: '#FFFFFF',
                      }}
                    >
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form card (static structure, submit label from block) */}
          <div className="flex items-start">
            <FormCard>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <FormInput
                  label="Full Name"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'err-fullName' : undefined}
                  className={errors.fullName ? 'ring-2 ring-red-500' : ''}
                  required
                />
                {errors.fullName && touched.fullName && (
                  <p id="err-fullName" className="text-sm text-red-400 mt-4">
                    {errors.fullName}
                  </p>
                )}

                <FormInput
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'err-email' : undefined}
                  className={errors.email ? 'ring-2 ring-red-500' : ''}
                  required
                />
                {errors.email && touched.email && (
                  <p id="err-email" className="text-sm text-red-400 mt-4">
                    {errors.email}
                  </p>
                )}

                <div className="flex flex-col">
                  <label
                    htmlFor="service"
                    className="mb-2 text-base font-medium text-white sm:text-lg"
                  >
                    Service
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="h-12 w-full rounded-lg bg-[#101A15] px-4 text-base text-white placeholder-[#A0A0A0] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] focus:outline-none focus:ring-2 focus:ring-[#149253]/30 focus:ring-offset-2 focus:ring-offset-[#142819]"
                  >
                    <option value="">Select a service</option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <label
                      htmlFor="phoneNumber"
                      className="mb-2 text-base font-medium text-white sm:text-lg"
                    >
                      Phone Number
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex items-center gap-2 w-full">
                      <select
                          id="phoneCountry"
                          name="phoneCountry"
                          value={formData.phoneCountry}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        className="h-12 w-28 rounded-lg bg-[#101A15] px-3 text-base text-white placeholder-[#A0A0A0] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] focus:outline-none focus:ring-2 focus:ring-[#149253]/30 focus:ring-offset-2 focus:ring-offset-[#142819] flex-none"
                          aria-label="Select country code"
                        >
                          {countryCodes.map((c) => (
                            <option key={c.iso} value={c.code}>
                              {`${c.code}`}
                            </option>
                          ))}
                        </select>

                        <input
                          id="phoneNumber"
                          name="phoneNumber"
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-invalid={!!errors.phoneNumber}
                          aria-describedby={errors.phoneNumber ? 'err-phoneNumber' : undefined}
                          inputMode="tel"
                          className={`flex-1 min-w-0 rounded-lg bg-[#101A15] px-4 text-base text-white placeholder-[#A0A0A0] shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-all focus:outline-none focus:ring-2 focus:ring-[#149253]/30 focus:ring-offset-2 focus:ring-offset-[#142819] ${errors.phoneNumber ? 'ring-2 ring-red-500' : ''}`}
                          style={{ minHeight: 48 }}
                        />
                      </div>
                    </div>
                    {errors.phoneNumber && touched.phoneNumber && (
                      <p id="err-phoneNumber" className="text-sm text-red-400 mt-4">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                  <FormInput
                    label="Company Name"
                    id="company"
                    name="company"
                    placeholder="Enter Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-invalid={!!errors.company}
                    aria-describedby={errors.company ? 'err-company' : undefined}
                    className={errors.company ? 'ring-2 ring-red-500' : ''}
                  />
                  {errors.company && touched.company && (
                    <p id="err-company" className="text-sm text-red-400 mt-4">
                      {errors.company}
                    </p>
                  )}
                </div>

                <FormTextarea
                  label="Message"
                  id="message"
                  name="message"
                  placeholder="Enter Message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'err-message' : undefined}
                  className={`${errors.message ? 'ring-2 ring-red-500' : ''} min-h-[140px]`}
                  required
                />
                {errors.message && touched.message && (
                  <p id="err-message" className="text-sm text-red-400 mt-4">
                    {errors.message}
                  </p>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting || Object.values(errors).some(Boolean)}
                    className={`mx-auto block text-white transition-all ${submitting ? 'opacity-60 cursor-wait' : ''} ${Object.values(errors).some(Boolean) ? 'cursor-not-allowed' : ''}`}
                    style={{
                      width: 176,
                      height: 46,
                      borderRadius: 5,
                      background: Object.values(errors).some(Boolean)
                        ? 'linear-gradient(90deg,#083a2b 0%,#042a1f 100%)'
                        : 'linear-gradient(90deg,#016C36 0%,#084225 100%)',
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      fontSize: 15,
                      lineHeight: '145%',
                      textAlign: 'center',
                      textTransform: 'uppercase',
                    }}
                  >
                    {submitting ? 'Sending...' : submitLabel}
                  </button>
                </div>
              </form>
            </FormCard>
          </div>
        </div>
      </Container>
    </section>
  );
}
