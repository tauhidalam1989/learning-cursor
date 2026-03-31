import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/config/site';

export function ContactNudge() {
  return (
    <section
      aria-labelledby="contact-nudge-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-14"
    >
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h4
              id="contact-nudge-heading"
              className="font-display text-lg font-bold text-corematrix-textPrimary"
            >
              Still Can&apos;t Find What You Need?
            </h4>
            <p className="mt-2 text-sm text-corematrix-textSecondary">
              Our team responds to every message within 24 hours.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              Send Us a Message →
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 text-sm text-corematrix-textMuted transition hover:text-corematrix-green400"
            >
              <span aria-hidden>📧</span>
              {siteConfig.email}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
