import { defaultContactBlock } from '@/data/contact';
import { pageBanners } from '@/data/banners';
import { PageBanner } from '@/sections/common/PageBanner';
import { BlogPostsSection } from '@/sections/blog/BlogPostsSection';
import { BlogTwoColumnSection } from '@/sections/blog/BlogTwoColumnSection';
import { ContactFormSection } from '@/sections/common/ContactFormSection';
import { HomeGradientWrapper } from '@/components/common/HomeGradientWrapper';

export const metadata = {
  title: 'Blog',
  description: 'Insights, updates, and articles from our team.',
};

export default function BlogPage() {
  const banner = pageBanners.blog;

  return (
    <>
      <PageBanner title={banner.title} breadcrumbs={banner.breadcrumbs} />
      <HomeGradientWrapper>
        <BlogPostsSection />
        <BlogTwoColumnSection />
        <ContactFormSection block={defaultContactBlock} id="contact-form" />
      </HomeGradientWrapper>
    </>
  );
}
