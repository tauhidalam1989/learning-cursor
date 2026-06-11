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

const CHANNELS_THEMES = [
  {
    // Email: Cyan
    card: 'border-cyan-500/20 bg-cyan-950/10 hover:border-cyan-400/50 hover:bg-cyan-950/20 shadow-[0_4px_20px_rgba(6,182,212,0.05)]',
    iconColor: 'text-cyan-400 group-hover:scale-110 duration-300',
    statusBadge: 'border-cyan-500/25 bg-cyan-950/30 text-cyan-400',
    subtitleColor: 'text-cyan-400 group-hover:text-cyan-300 transition-colors',
    descriptionColor: 'text-cyan-300/70 group-hover:text-cyan-200/90 transition-colors',
    actionLink: 'text-cyan-400 hover:text-cyan-300',
    topBorder: 'via-cyan-500',
  },
  {
    // Phone & WhatsApp: Emerald
    card: 'border-emerald-500/20 bg-emerald-950/10 hover:border-emerald-400/50 hover:bg-emerald-950/20 shadow-[0_4px_20px_rgba(16,185,129,0.05)]',
    iconColor: 'text-emerald-400 group-hover:scale-110 duration-300',
    statusBadge: 'border-emerald-500/25 bg-emerald-950/30 text-emerald-400',
    subtitleColor: 'text-emerald-400 group-hover:text-emerald-300 transition-colors',
    descriptionColor: 'text-emerald-300/70 group-hover:text-emerald-200/90 transition-colors',
    actionLink: 'text-emerald-400 hover:text-emerald-300',
    topBorder: 'via-emerald-500',
  },
  {
    // LinkedIn: Sky
    card: 'border-sky-500/20 bg-sky-950/10 hover:border-sky-400/50 hover:bg-sky-950/20 shadow-[0_4px_20px_rgba(14,165,233,0.05)]',
    iconColor: 'text-sky-400 group-hover:scale-110 duration-300',
    statusBadge: 'border-sky-500/25 bg-sky-950/30 text-sky-400',
    subtitleColor: 'text-sky-400 group-hover:text-sky-300 transition-colors',
    descriptionColor: 'text-sky-300/70 group-hover:text-sky-200/90 transition-colors',
    actionLink: 'text-sky-400 hover:text-sky-300',
    topBorder: 'via-sky-500',
  },
];

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
          {CHANNELS.map((ch, idx) => {
            const theme = CHANNELS_THEMES[idx % CHANNELS_THEMES.length];
            return (
              <div
                key={ch.title}
                className={`group relative overflow-hidden rounded-2xl border p-9 text-center transition-all duration-300 hover:-translate-y-1 ${theme.card}`}
              >
                <div
                  className={`absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent ${theme.topBorder} to-transparent opacity-0 transition-opacity group-hover:opacity-100`}
                  aria-hidden
                />
                
                <span className={`absolute top-4 end-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.65rem] font-semibold transition-colors duration-300 ${theme.statusBadge}`}>
                  {ch.statusLabel}
                </span>

                <span className={`mb-4 block text-4xl transition-transform ${theme.iconColor}`} aria-hidden>
                  <i className={ch.icon} aria-hidden="true" />
                </span>

                <p className={`mb-3 text-sm font-semibold transition-colors ${theme.subtitleColor}`}>
                  {ch.subtitle}
                </p>
                <p className={`mb-5 text-sm font-light leading-relaxed transition-colors ${theme.descriptionColor}`}>
                  {ch.description}
                </p>
                <Link
                  href={ch.actionHref}
                  className={`inline-flex items-center gap-2 text-sm font-semibold transition-all hover:gap-3 ${theme.actionLink}`}
                >
                  {ch.actionLabel} {t('→', '←')}
                </Link>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
