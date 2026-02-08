import { defaultContactBlock } from '@/data/contact';
import { pageBanners } from '@/data/banners';
import { PageBanner } from '@/sections/common/PageBanner';
import { TechnologySolutionsSection } from '@/sections/services/TechnologySolutionsSection';
import { ServiceCardsSection } from '@/sections/services/ServiceCardsSection';
import { HowWeWorkSection } from '@/sections/services/HowWeWorkSection';
import { WhyChooseSection } from '@/sections/services/WhyChooseSection';
import { ContactFormSection } from '@/sections/common/ContactFormSection';
import { HomeGradientWrapper } from '@/components/common/HomeGradientWrapper';

export const metadata = {
  title: 'Our Services',
  description: 'Explore the services we offer to help grow your business.',
};

export default function ServicesPage() {
  const banner = pageBanners.services;

  return (
    <>
      <PageBanner title={banner.title} breadcrumbs={banner.breadcrumbs} />
      <HomeGradientWrapper gradient="linear-gradient(to bottom, #010101, #012112)">
        <TechnologySolutionsSection />
        <ServiceCardsSection />
        <HowWeWorkSection />
      </HomeGradientWrapper>

      <HomeGradientWrapper gradient="linear-gradient(to bottom, #010101, #012112)">
        <WhyChooseSection />
        <ContactFormSection block={defaultContactBlock} id="contact-form" />
      </HomeGradientWrapper>
    </>
  );
}
