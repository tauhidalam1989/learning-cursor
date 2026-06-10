import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';

export function ContactNudge() {
  const { t } = useLanguage();
  
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
              {t("Still Can't Find What You Need?", "ألم تجد ما تبحث عنه بعد؟")}
            </h4>
            <p className="mt-2 text-sm text-corematrix-textSecondary">
              {t("Our team responds to every message within 24 hours.", "يجيب فريقنا على كل رسالة في غضون 24 ساعة.")}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-corematrix-green700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-corematrix-green500"
            >
              {t("Send Us a Message →", "أرسل لنا رسالة ←")}
            </Link>
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-2 text-sm text-corematrix-textMuted transition hover:text-corematrix-green400"
            >
              <i className="fas fa-envelope text-corematrix-green400" aria-hidden="true" />
              {siteConfig.email}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

