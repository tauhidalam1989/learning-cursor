'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import {
  FOOTER_QUICK_LINKS,
  FOOTER_SERVICES_LINKS,
  FOOTER_ADDITIONAL_LINKS,
  FOOTER_LEGAL_LINKS,
} from '@/config/nav';
import { useLanguage } from '@/context/LanguageContext';

/**
 * Footer component: Multi-column layout with brand, links, services, and newsletter.
 * Matches Figma design with dark green theme and white text.
 */
export function Footer() {
  const [email, setEmail] = useState('');
  const [nlLoading, setNlLoading] = useState(false);
  const [nlSubmitted, setNlSubmitted] = useState(false);
  const [nlError, setNlError] = useState<string | null>(null);
  const { t, language, setLanguage } = useLanguage();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setNlLoading(true);
    setNlError(null);
    try {
      const res = await fetch('/api/newsletters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res.status === 409) {
        setNlError(t('This email is already subscribed!', 'هذا البريد الإلكتروني مشترك بالفعل!'));
        setNlLoading(false);
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        setNlError(data.message || t('Something went wrong.', 'حدث خطأ ما.'));
        setNlLoading(false);
        return;
      }

      setNlSubmitted(true);
      setEmail('');
    } catch {
      setNlError(t('Network error. Please try again.', 'خطأ في الشبكة. يرجى المحاولة مرة أخرى.'));
    } finally {
      setNlLoading(false);
    }
  };

  return (
    <footer
      className="bg-gradient-to-r from-[#02140f] via-[#032916] to-[#02140f] pt-14 pb-6 text-white sm:pt-16 sm:pb-8 lg:pt-20 lg:pb-10"
      role="contentinfo"
      aria-label={t('Site footer', 'تذييل الموقع')}
      style={{
        borderTopWidth: 2,
        borderTopStyle: 'solid',
        borderImageSource: 'linear-gradient(90deg, #010D07 0%, #026835 49.04%, #010D07 98.56%)',
        borderImageSlice: 1,
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-12">
          {/* Column 1: Brand/About */}
          <div className="lg:col-span-3">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/logo.svg" alt={t('Corematrix logo', 'شعار كورماتريكس')} width={160} height={36} style={{ width: 'auto', height: 'auto' }} priority />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-[280px]">
              {t('COREMATRIX is a technology-driven IT services company focused on building intelligent, secure, and scalable solutions.', 'كورماتريكس هي شركة خدمات تقنية متطورة تركز على بناء حلول ذكية وآمنة وقابلة للتطوير.')}
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-white" style={{ letterSpacing: '0.12em' }}>
              {t('FOLLOW US', 'تابعنا')}
            </p>
            <div className="mt-4 flex gap-3">
              {/* Social icons: FontAwesome with green background and brand-colored icons */}
              <a href={siteConfig.twitter} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#052e16] border border-white/5 hover:border-[#1DA1F2]/30 hover:scale-110 transition-all duration-300" aria-label="Twitter">
                <i className="fab fa-twitter text-sm text-[#1DA1F2]" />
              </a>
              <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#052e16] border border-white/5 hover:border-[#1877F2]/30 hover:scale-110 transition-all duration-300" aria-label="Facebook">
                <i className="fab fa-facebook-f text-sm text-[#1877F2]" />
              </a>
              <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#052e16] border border-white/5 hover:border-[#ee2a7b]/30 hover:scale-110 transition-all duration-300" aria-label="Instagram">
                <i className="fab fa-instagram text-sm text-[#ee2a7b]" />
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#052e16] border border-white/5 hover:border-[#0077B5]/30 hover:scale-110 transition-all duration-300" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in text-sm text-[#0077B5]" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {t('QUICK LINKS', 'روابط سريعة')}
            </h3>
            <nav className="mt-4" aria-label={t('Footer quick links', 'روابط سريعة في التذييل')}>
              <ul className="space-y-3" role="list">
                {FOOTER_QUICK_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-white/70 transition-colors hover:text-[#149253] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#149253] focus-visible:ring-offset-2 focus-visible:ring-offset-[#02140f]"
                    >
                      {t(label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {t('SERVICES', 'خدماتنا')}
            </h3>
            <nav className="mt-4" aria-label={t('Footer services', 'الخدمات في التذييل')}>
              <ul className="space-y-3" role="list">
                {FOOTER_SERVICES_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-white/70 transition-colors hover:text-[#149253] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#149253] focus-visible:ring-offset-2 focus-visible:ring-offset-[#02140f]"
                    >
                      {t(label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 4: Additional Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {t('QUICK LINKS', 'روابط سريعة')}
            </h3>
            <nav className="mt-4" aria-label={t('Footer additional links', 'روابط إضافية')}>
              <ul className="space-y-3" role="list">
                {FOOTER_ADDITIONAL_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-white/70 transition-colors hover:text-[#149253] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#149253] focus-visible:ring-offset-2 focus-visible:ring-offset-[#02140f]"
                    >
                      {t(label)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 5: Newsletter */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white" style={{ fontFamily: 'var(--font-display)' }}>
              {t('NEWSLETTER', 'النشرة البريدية')}
            </h3>
            {nlSubmitted ? (
              <p className="mt-4 text-sm font-semibold text-[#149253]">
                {t("✓ You're subscribed! Check your inbox.", '✓ تم الاشتراك بنجاح! تحقق من بريدك الوارد.')}
              </p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="mt-4">
                <label htmlFor="newsletter-email" className="sr-only">
                  {t('Enter your email address', 'أدخل عنوان بريدك الإلكتروني')}
                </label>
                <div className="relative mt-4">
                  <input
                    type="email"
                    id="newsletter-email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setNlError(null); }}
                    placeholder={t('Enter your email address', 'أدخل عنوان بريدك الإلكتروني')}
                    required
                    className="h-12 w-full rounded-xl border border-white/10 bg-[#02140f]/40 px-4 pr-16 text-sm text-white placeholder-white/50 backdrop-blur-sm transition-all focus:border-[#149253] focus:outline-none focus:ring-2 focus:ring-[#149253]/20"
                  />
                  <button
                    type="submit"
                    disabled={nlLoading}
                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl bg-[#149253] text-white transition-all hover:brightness-105 disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#149253] focus-visible:ring-offset-2 focus-visible:ring-offset-[#02140f] cursor-pointer"
                    aria-label={t('Subscribe to newsletter', 'الاشتراك في النشرة البريدية')}
                  >
                    {nlLoading ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M22 2L11 13" />
                        <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {nlError && (
                  <p className="mt-2 text-xs font-medium text-amber-400">
                    <i className="fas fa-exclamation-circle mr-1" />
                    {nlError}
                  </p>
                )}
              </form>
            )}
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {t('Get product updates, engineering insights, and case studies—no spam. Unsubscribe anytime.', 'احصل على تحديثات المنتجات، الرؤى الهندسية، ودراسات الحالة — بدون بريد مزعج. يمكنك إلغاء الاشتراك في أي وقت.')}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-white/6 pt-6">
          <p className="text-sm text-white/60">
            © {siteConfig.currentYear} {language === 'ar' ? 'كورماتريكس' : siteConfig.name}. {t('All rights reserved.', 'جميع الحقوق محفوظة.')}
          </p>
          {FOOTER_LEGAL_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-sm text-white/60 transition-colors hover:text-[#149253] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#149253] focus-visible:ring-offset-2 focus-visible:ring-offset-[#02140f]"
            >
              {t(label)}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
