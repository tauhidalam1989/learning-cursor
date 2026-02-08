'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { navLinks, navCta } from './nav-config';

const currentYear = new Date().getFullYear();

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About us', href: '/about' },
  { label: 'Service', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Portfolio', href: '/portfolio' },
];

const services = [
  { label: 'Web applications', href: '/services#web-applications' },
  { label: 'Enterprise Software', href: '/services#enterprise-software' },
  { label: 'SaaS Platforms', href: '/services#saas-platforms' },
  { label: 'API & System Integration', href: '/services#api-integration' },
  { label: 'Cloud Migration & Setup', href: '/services#cloud-migration' },
];

const additionalLinks = [
  { label: 'Feedback', href: '/feedback' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: '404', href: '/404' },
];

/**
 * Footer component: Multi-column layout with brand, links, services, and newsletter.
 * Matches Figma design with dark green theme and white text.
 */
export function Footer() {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer
      className="bg-gradient-to-r from-[#02140f] via-[#032916] to-[#02140f] py-14 text-white sm:py-16 lg:py-20"
      role="contentinfo"
      aria-label="Site footer"
      style={{
        borderTopWidth: 2,
        borderTopStyle: 'solid',
        borderImageSource: 'linear-gradient(90deg, #010D07 0%, #026835 49.04%, #010D07 98.56%)',
        borderImageSlice: 1,
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-12">
          {/* Column 1: Brand/About */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/logo.png" alt="Corematrix" width={160} height={36} priority />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/70 max-w-[240px]">
              COREMATRIX is a technology-driven IT services company focused on building intelligent, secure, and scalable solutions.
            </p>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-white" style={{ letterSpacing: '0.12em' }}>
              FOLLOW US
            </p>
            <div className="mt-4 flex gap-3">
              {/* Social icons: SVGs with white circular background */}
              <a href="#twitter" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#02140f] hover:brightness-95" aria-label="Twitter">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M22 5.92c-.63.28-1.3.48-2 .57a3.47 3.47 0 0 0-6 2v.28A9.86 9.86 0 0 1 3 4.87a3.47 3.47 0 0 0 1.07 4.63 3.39 3.39 0 0 1-1.57-.43v.04a3.47 3.47 0 0 0 2.78 3.4 3.5 3.5 0 0 1-1.56.06 3.47 3.47 0 0 0 3.24 2.41A6.95 6.95 0 0 1 2 18.58a9.82 9.82 0 0 0 5.31 1.56c6.38 0 9.87-5.28 9.87-9.86v-.45A7.06 7.06 0 0 0 22 5.92z" />
                </svg>
              </a>
              <a href="#facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#02140f] hover:brightness-95" aria-label="Facebook">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M22 12a10 10 0 1 0-11.5 9.88v-6.99H8.9v-2.9h1.6V9.4c0-1.58.94-2.46 2.38-2.46.69 0 1.42.12 1.42.12v1.56h-.8c-.79 0-1.05.5-1.05 1.02v1.23h1.78l-.28 2.9h-1.5v6.99A10 10 0 0 0 22 12z" />
                </svg>
              </a>
              <a href="#instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#02140f] hover:brightness-95" aria-label="Instagram">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.5A4.5 4.5 0 1 0 16.5 13 4.5 4.5 0 0 0 12 8.5zm5.5-3a1 1 0 1 0 1 1 1 1 0 0 0-1-1z" />
                </svg>
              </a>
              <a href="#linkedin" className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#02140f] hover:brightness-95" aria-label="LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 17.34V10.9H5.67v6.44h2.67zM7 9.58a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zM18.33 17.34V13c0-2.1-1.12-3.07-2.62-3.07-1.2 0-1.73.66-2.03 1.12v6.29h2.67v-3.5c0-.93.18-1.83 1.33-1.83 1.12 0 1.12 1.05 1.12 1.95v3.18h2.66z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white" style={{ fontFamily: 'var(--font-display)' }}>
              QUICK LINKS
            </h3>
            <nav className="mt-4" aria-label="Footer quick links">
              <ul className="space-y-3" role="list">
                {quickLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-white/70 transition-colors hover:text-[#149253] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#149253] focus-visible:ring-offset-2 focus-visible:ring-offset-[#02140f]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white" style={{ fontFamily: 'var(--font-display)' }}>
              SERVICES
            </h3>
            <nav className="mt-4" aria-label="Footer services">
              <ul className="space-y-3" role="list">
                {services.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-white/70 transition-colors hover:text-[#149253] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#149253] focus-visible:ring-offset-2 focus-visible:ring-offset-[#02140f]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 4: Additional Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white" style={{ fontFamily: 'var(--font-display)' }}>
              QUICK LINKS
            </h3>
            <nav className="mt-4" aria-label="Footer additional links">
              <ul className="space-y-3" role="list">
                {additionalLinks.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-sm text-white/70 transition-colors hover:text-[#149253] focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#149253] focus-visible:ring-offset-2 focus-visible:ring-offset-[#02140f]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 5: Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white" style={{ fontFamily: 'var(--font-display)' }}>
              NEWSLETTER
            </h3>
            <form onSubmit={handleNewsletterSubmit} className="mt-4">
              <label htmlFor="newsletter-email" className="sr-only">
                Enter your email address
              </label>
              <div className="flex gap-3">
                <input
                  type="email"
                  id="newsletter-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  required
                  className="flex-1 rounded-lg border border-white/10 bg-[#02140f]/40 px-4 py-2 text-sm text-white placeholder-white/50 backdrop-blur-sm transition-all focus:border-[#149253] focus:outline-none focus:ring-2 focus:ring-[#149253]/20"
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#149253] text-white transition-all hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#149253] focus-visible:ring-offset-2 focus-visible:ring-offset-[#02140f]"
                  aria-label="Subscribe to newsletter"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M22 2L11 13" />
                    <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
            </form>
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white/6 pt-8">
          <p className="text-center text-sm text-white/60">
            © {currentYear} Corematrix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
