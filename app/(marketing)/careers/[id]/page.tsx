import { notFound } from 'next/navigation';
import { getDbCareerById } from '@/lib/careers';
import { createPageMetadata, siteUrl } from '@/lib/seo';
import { DynamicCareerDetailClient } from '@/components/careers/DynamicCareerDetailClient';
import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd, jobPostingJsonLd } from '@/lib/seo/jsonld';

type Props = {
  params: Promise<{ id: string }>;
};

// Force dynamic execution for non-static parameters
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const job = await getDbCareerById(id);
  if (!job) {
    return { title: 'Career opening not found' };
  }
  return createPageMetadata({
    title: `${job.title_en} — Open Careers at Corematrix`,
    description: job.description_en.substring(0, 160),
    path: `/careers/${job.id}`,
  });
}

export default async function CareerDetailPage({ params }: Props) {
  const { id } = await params;
  const job = await getDbCareerById(id);

  if (!job) {
    notFound();
  }

  const jobSchema = jobPostingJsonLd(job);
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: 'Home', item: siteUrl },
    { name: 'Careers', item: `${siteUrl}/careers` },
    { name: job.title_en, item: `${siteUrl}/careers/${job.id}` }
  ]);

  return (
    <>
      <JsonLd schema={jobSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <DynamicCareerDetailClient job={job} />
    </>
  );
}

