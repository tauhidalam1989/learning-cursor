import { createPageMetadata } from '@/lib/seo';
import { defaultContactBlock } from '@/data/contact';
import { pageBanners } from '@/data/banners';
import { PageBanner } from '@/sections/common/PageBanner';
import { WhoWeAreSection } from '@/sections/about/WhoWeAreSection';
import { OurApproachSection } from '@/sections/about/OurApproachSection';
import { HomeGradientWrapper } from '@/components/common/HomeGradientWrapper';
import { VisionMissionSection } from '@/sections/about/VisionMissionSection';
import { ContactFormSection } from '@/sections/common/ContactFormSection';

export const metadata = createPageMetadata({
  title: 'About Us',
  description: 'Learn about our company, mission, and team.',
  path: '/about',
  keywords: ['about', 'company', 'team', 'mission'],
});

export default function AboutPage() {
  const banner = pageBanners.about;

  return (
    <>
      <PageBanner title={banner.title} breadcrumbs={banner.breadcrumbs} />
      <HomeGradientWrapper>
        <WhoWeAreSection />
        <OurApproachSection />
      </HomeGradientWrapper>
      <HomeGradientWrapper>
        <VisionMissionSection />
        <ContactFormSection block={defaultContactBlock} id="contact-form" />
      </HomeGradientWrapper>
    </>
  );
}
