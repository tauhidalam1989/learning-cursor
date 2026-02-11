import { defaultContactBlock } from '@/data/contact';
import { pageBanners } from '@/data/banners';
import { PageBanner } from '@/sections/common/PageBanner';
import { BlogPostsSection } from '@/sections/blog/BlogPostsSection';
import { BlogTwoColumnSection } from '@/sections/blog/BlogTwoColumnSection';
import { ContactFormSection } from '@/sections/common/ContactFormSection';
import { HomeGradientWrapper } from '@/components/common/HomeGradientWrapper';
import { getLatestBlogPosts } from '@/lib/posts';

export const metadata = {
  title: 'Blog',
  description: 'Insights, updates, and articles from our team.',
};

export default async function BlogPage() {
  const banner = pageBanners.blog;
  const posts = await getLatestBlogPosts(10);

  return (
    <>
      <PageBanner title={banner.title} breadcrumbs={banner.breadcrumbs} />
      <HomeGradientWrapper>
        <BlogPostsSection posts={posts} />
        <BlogTwoColumnSection />
        <ContactFormSection block={defaultContactBlock} id="contact-form" />
      </HomeGradientWrapper>
    </>
  );
}
