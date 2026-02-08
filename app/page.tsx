import { HeroSection } from '@/sections/home/HeroSection';
import { CoreServicesSection } from '@/sections/home/CoreServicesSection';
import { PartnerBenefitsSection } from '@/sections/home/PartnerBenefitsSection';
import { MissionSection } from '@/sections/home/MissionSection';
import { FaqSection } from '@/sections/home/FaqSection';
import { FeaturedBlogSection } from '@/sections/home/FeaturedBlogSection';
import { ContactFormSection } from '@/sections/common/ContactFormSection';
import { HomeGradientWrapper } from '@/components/common/HomeGradientWrapper';
import { defaultContactBlock } from '@/data/contact';

export default function HomePage() {
  return (
    <>
      <HomeGradientWrapper>
        <HeroSection />
        <CoreServicesSection />
        <MissionSection />
      </HomeGradientWrapper>

      <PartnerBenefitsSection />

      <HomeGradientWrapper>
        <FaqSection />
        <FeaturedBlogSection />
        <ContactFormSection block={defaultContactBlock} id="contact-form" />
      </HomeGradientWrapper>
    </>
  );
}

