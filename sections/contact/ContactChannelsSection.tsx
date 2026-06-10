'use client';

import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { siteConfig } from '@/config/site';
import { useLanguage } from '@/context/LanguageContext';

export type Channel = {
  icon: string;
  statusLabel: string;
  title: string;
  subtitle: string;
  description: string;
  actionLabel: string;
  actionHref: string;
};

export function ContactChannelsSection() {
  const { t } = useLanguage();

  const CHANNELS: Channel[] = [
    {
      icon: 'fas fa-envelope',
      statusLabel: t('Monitored daily', 'متابع يومياً'),
      title: t('Email', 'البريد الإلكتروني'),
      subtitle: t('Best for formal inquiries', 'الأفضل للاستفسارات الرسمية'),
      description: t(
        'Send us a detailed project brief, RFP, or just a quick hello. We read every email personally and respond with substance — never with a template or automated reply.',
        'أرسل لنا ملخصاً تفصيلياً عن المشروع، أو طلب تقديم عروض (RFP)، أو مجرد تحية سريعة. نحن نقرأ كل بريد إلكتروني شخصياً ونرد بشكل جوهري وواقعي — لا نستخدم أبداً قوالب جاهزة أو ردوداً تلقائية.'
      ),
      actionLabel: siteConfig.email,
      actionHref: `mailto:${siteConfig.email}`,
    },
    {
      icon: 'fas fa-phone-alt',
      statusLabel: t('WhatsApp enabled', 'متاح عبر الواتساب'),
      title: t('Phone & WhatsApp', 'الهاتف والواتساب'),
      subtitle: t('Best for urgent conversations', 'الأفضل للمحادثات العاجلة'),
      description: t(
        'Need to talk to someone right now? Call or WhatsApp us directly. Available Monday to Friday, 9am–6pm GMT. Saturday mornings by appointment.',
        'هل تحتاج إلى التحدث مع شخص ما في هذه اللحظة؟ اتصل بنا أو راسلنا عبر الواتساب مباشرة. متاحون من الاثنين إلى الجمعة، من الساعة 9 صباحاً حتى 6 مساءً بتوقيت غرينتش. وصباح السبت بموعد مسبق.'
      ),
      actionLabel: siteConfig.phone,
      actionHref: siteConfig.phoneTel,
    },
    {
      icon: 'fab fa-linkedin',
      statusLabel: t('Active daily', 'نشط يومياً'),
      title: t('LinkedIn', 'لينكد إن'),
      subtitle: t('Best for professional networking', 'الأفضل للتواصل المهني'),
      description: t(
        'Connect with our team or follow our company page for engineering insights, team updates, and deep-dives on AI and modern software architecture.',
        'تواصل مع فريقنا أو تابع صفحة شركتنا للحصول على رؤى هندسية دقيقة، وتحديثات الفريق، والدراسات العميقة حول الذكاء الاصطناعي وهندسة البرمجيات الحديثة.'
      ),
      actionLabel: t('View our LinkedIn', 'شاهد صفحتنا على لينكد إن'),
      actionHref: siteConfig.linkedin,
    },
  ];

  return (
    <section
      id="contact-channels"
      aria-labelledby="contact-channels-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label={t("OTHER WAYS TO REACH US", "طرق أخرى للتواصل معنا")}
          title={t("Prefer a Different Channel? We're Everywhere", "هل تفضل قناة أخرى؟ نحن متواجدون في كل مكان")}
          titleId="contact-channels-heading"
          description={t("Choose the channel that works best for you.", "اختر القناة والوسيلة الأكثر ملاءمة وسهولة بالنسبة لك.")}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CHANNELS.map((ch) => (
            <div
              key={ch.title}
              className="reveal group relative overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card p-9 text-center transition-all duration-300 hover:-translate-y-1 card-glow"
            >
              <div
                className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-corematrix-green700 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden
              />
              <span className="mb-4 block text-4xl text-corematrix-green400" aria-hidden>
                <i className={ch.icon} aria-hidden="true" />
              </span>
              <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-corematrix-green700/20 bg-corematrix-green900/20 px-3 py-1 font-mono text-[0.65rem] font-semibold text-corematrix-green700">
                {ch.statusLabel}
              </span>
              <h3 className="font-display text-lg font-extrabold text-corematrix-textPrimary">
                {ch.title}
              </h3>
              <p className="mb-3 text-sm font-semibold text-corematrix-green400">
                {ch.subtitle}
              </p>
              <p className="mb-5 text-sm font-light leading-relaxed text-corematrix-textMuted">
                {ch.description}
              </p>
              <Link
                href={ch.actionHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-corematrix-green400 transition-all hover:gap-3"
              >
                {ch.actionLabel} {t('→', '←')}
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
