/**
 * Re-export the common ContactFormSection for backwards compatibility.
 * Prefer importing from '@/sections/common/ContactFormSection' with a block from '@/data/contact'.
 */
import { defaultContactBlock } from '@/data/contact';
import { ContactFormSection as CommonContactFormSection } from '@/sections/common/ContactFormSection';

export function ContactFormSection() {
  return (
    <CommonContactFormSection block={defaultContactBlock} id="contact-form" />
  );
}
