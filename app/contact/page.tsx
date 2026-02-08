import { defaultContactBlock } from '@/data/contact';
import { pageBanners } from '@/data/banners';
import { PageBanner } from '@/sections/common/PageBanner';
import { ContactFormSection } from '@/sections/common/ContactFormSection';

export const metadata = {
  title: 'Contact Us',
  description: "Get in touch with our team. We'd love to hear from you.",
};

export default function ContactPage() {
  const banner = pageBanners.contact;

  return (
    <>
      <PageBanner title={banner.title} breadcrumbs={banner.breadcrumbs} />
      <ContactFormSection block={defaultContactBlock} id="contact-form" />
    </>
  );
}
