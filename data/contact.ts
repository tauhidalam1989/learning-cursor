import type { ContactBlock } from '@/types';
import { siteConfig } from '@/config/site';

/**
 * Default contact block content for the Contact Form section.
 * Use this on the home page, contact page, or any page that shows the form.
 * Override per-page by passing a different block to ContactFormSection.
 */
export const defaultContactBlock: ContactBlock = {
  sectionLabel: 'CONTACT US',
  heading: "Let's Talk About Your Project",
  paragraph:
    'Whether you have a project in mind or just want to explore possibilities — we\'re here to help.',
  contactItems: [
    {
      type: 'email',
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
    },
    {
      type: 'phone',
      value: siteConfig.phone,
      href: siteConfig.phoneTel,
    },
    {
      type: 'address',
      value: 'Available globally · Remote-first',
    },
  ],
  submitButtonLabel: 'SUBMIT',
};
