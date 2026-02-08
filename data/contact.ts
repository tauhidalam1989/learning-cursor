import type { ContactBlock } from '@/types';

/**
 * Default contact block content for the Contact Form section.
 * Use this on the home page, contact page, or any page that shows the form.
 * Override per-page by passing a different block to ContactFormSection.
 */
export const defaultContactBlock: ContactBlock = {
  sectionLabel: 'CONTACT US',
  heading: "Let's Talk About Your Project",
  paragraph:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  contactItems: [
    {
      type: 'email',
      value: 'corematrix123@gmail.com',
      href: 'mailto:corematrix123@gmail.com',
    },
    {
      type: 'phone',
      value: '+224 494 4994',
      href: 'tel:+2244944994',
    },
    {
      type: 'address',
      value:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
  ],
  submitButtonLabel: 'SUBMIT',
};
