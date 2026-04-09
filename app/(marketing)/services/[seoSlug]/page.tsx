import { notFound } from 'next/navigation';
import { SERVICE_LANDING } from '@/lib/seo-service-landings';
import { servicePageMetadata } from '@/lib/seo-page-metadata';
import { ServiceLandingPage } from '@/components/seo/ServiceLandingPage';

type Props = { params: { seoSlug: string } };

export function generateStaticParams() {
  return Object.keys(SERVICE_LANDING).map((seoSlug) => ({ seoSlug }));
}

export function generateMetadata({ params }: Props) {
  const cfg = SERVICE_LANDING[params.seoSlug];
  if (!cfg) return { title: 'Service | Corematrix' };
  return servicePageMetadata(cfg);
}

export default function ServiceSeoPage({ params }: Props) {
  const cfg = SERVICE_LANDING[params.seoSlug];
  if (!cfg) notFound();
  return <ServiceLandingPage config={cfg} />;
}
