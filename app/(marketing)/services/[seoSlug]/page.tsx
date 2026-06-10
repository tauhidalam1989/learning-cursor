import { notFound } from 'next/navigation';
import { SERVICE_LANDING } from '@/lib/seo-service-landings';
import { servicePageMetadata } from '@/lib/seo-page-metadata';
import { ServiceLandingPage } from '@/components/seo/ServiceLandingPage';
import { DynamicServiceLanding } from '@/components/seo/DynamicServiceLanding';
import { createPageMetadata, siteUrl } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, dynamicServiceJsonLd, faqPageJsonLd } from '@/lib/seo/jsonld';
import { apiEndpoint } from '@/lib/apiBase';

type Props = { params: Promise<{ seoSlug: string }> };

// Force dynamic execution for non-static parameters
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

async function getDbService(slug: string) {
  try {
    const res = await fetch(apiEndpoint(`/api/services/${slug}`), {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export function generateStaticParams() {
  return Object.keys(SERVICE_LANDING).map((seoSlug) => ({ seoSlug }));
}

export async function generateMetadata({ params }: Props) {
  const { seoSlug } = await params;
  const cfg = SERVICE_LANDING[seoSlug];
  if (cfg) {
    return servicePageMetadata(cfg);
  }

  // Fallback to database service
  const dbService = await getDbService(seoSlug);
  if (!dbService) {
    return { title: 'Service | Corematrix' };
  }

  // Use dynamic SEO metadata as requested by user
  return createPageMetadata({
    title: dbService.metaTitle_en || dbService.title_en,
    description: dbService.metaDescription_en || dbService.description_en,
    path: `/services/${dbService.detailSlug}`,
  });
}

export default async function ServiceSeoPage({ params }: Props) {
  const { seoSlug } = await params;
  const cfg = SERVICE_LANDING[seoSlug];
  if (cfg) {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: cfg.h1,
      description: cfg.description,
      url: `${siteUrl}${cfg.canonicalPath}`,
      provider: {
        '@type': 'Organization',
        name: 'Corematrix',
        url: siteUrl,
      }
    };
    const breadcrumbSchema = breadcrumbJsonLd([
      { name: 'Home', item: siteUrl },
      { name: 'Services', item: `${siteUrl}/services` },
      { name: cfg.breadcrumbLabel, item: `${siteUrl}${cfg.canonicalPath}` }
    ]);
    return (
      <>
        <JsonLd schema={serviceSchema} />
        <JsonLd schema={breadcrumbSchema} />
        <ServiceLandingPage config={cfg} />
      </>
    );
  }

  const dbService = await getDbService(seoSlug);
  if (!dbService) {
    notFound();
  }

  const serviceSchema = dynamicServiceJsonLd(dbService);
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: 'Home', item: siteUrl },
    { name: 'Services', item: `${siteUrl}/services` },
    { name: dbService.title_en, item: `${siteUrl}/services/${dbService.detailSlug}` }
  ]);

  // Parse FAQs if present in dynamic CMS data
  let resolvedFaqs: { q: string; a: string }[] = [];
  try {
    const rawFaqs = typeof dbService.faqs === 'string' ? JSON.parse(dbService.faqs) : dbService.faqs;
    if (Array.isArray(rawFaqs)) {
      resolvedFaqs = rawFaqs
        .map((item: any) => {
          const q = item.q_en || item.questionEn || item.q || item.question;
          const a = item.a_en || item.answerEn || item.a || item.answer;
          return { q, a };
        })
        .filter((item: any) => item.q && item.a);
    }
  } catch (e) {
    // Graceful skip on format issues
  }

  return (
    <>
      <JsonLd schema={serviceSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {resolvedFaqs.length > 0 && <JsonLd schema={faqPageJsonLd(resolvedFaqs)} />}
      <DynamicServiceLanding service={dbService} />
    </>
  );
}

