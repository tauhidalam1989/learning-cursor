import Link from 'next/link';
import { Container } from '@/components/ui/Container';
import { siteConfig } from '@/config/site';

export type Channel = {
  icon: string;
  statusLabel: string;
  title: string;
  subtitle: string;
  description: string;
  actionLabel: string;
  actionHref: string;
};

const CHANNELS: Channel[] = [
  {
    icon: '📧',
    statusLabel: 'Monitored daily',
    title: 'Email',
    subtitle: 'Best for formal inquiries',
    description:
      'Send us a detailed project brief, RFP, or just a quick hello. We read every email personally and respond with substance — never with a template or automated reply.',
    actionLabel: siteConfig.email,
    actionHref: `mailto:${siteConfig.email}`,
  },
  {
    icon: '📞',
    statusLabel: 'WhatsApp enabled',
    title: 'Phone & WhatsApp',
    subtitle: 'Best for urgent conversations',
    description:
      'Need to talk to someone right now? Call or WhatsApp us directly. Available Monday to Friday, 9am–6pm GMT. Saturday mornings by appointment.',
    actionLabel: siteConfig.phone,
    actionHref: siteConfig.phoneTel,
  },
  {
    icon: '💼',
    statusLabel: 'Active daily',
    title: 'LinkedIn',
    subtitle: 'Best for professional networking',
    description:
      'Connect with our team or follow our company page for engineering insights, team updates, and deep-dives on AI and modern software architecture.',
    actionLabel: 'View our LinkedIn',
    actionHref: siteConfig.linkedin,
  },
];

export function ContactChannelsSection() {
  return (
    <section
      id="contact-channels"
      aria-labelledby="contact-channels-heading"
      className="border-t border-corematrix-border bg-corematrix-bg0 py-24"
    >
      <Container>
        <div className="text-center">
          <p className="section-label text-corematrix-green400">
            OTHER WAYS TO REACH US
          </p>
          <h2
            id="contact-channels-heading"
            className="section-heading mt-3 text-3xl font-bold sm:text-4xl"
          >
            Prefer a Different Channel? We&apos;re Everywhere
          </h2>
          <p className="mx-auto mt-4 max-w-[680px] text-base leading-relaxed text-corematrix-textSecondary">
            Choose the channel that works best for you.
          </p>
        </div>

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
              <span className="mb-4 block text-5xl" aria-hidden>
                {ch.icon}
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
                {ch.actionLabel} →
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
