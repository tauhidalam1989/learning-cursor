import type { Metadata } from 'next';
import { AdobeLicensingContent } from '@/sections/services/AdobeLicensingContent';
import { siteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Adobe Licensing — Corematrix | Genuine Adobe Licensing Solutions',
  description:
    'Official Adobe partner: VIP, VIP Marketplace, and ETLA licensing with compliance, Admin Console support, and global delivery for businesses and enterprises.',
  keywords: [
    'Adobe licensing',
    'Adobe VIP',
    'Adobe ETLA',
    'Creative Cloud business',
    'Adobe reseller',
    'Adobe Admin Console',
  ],
  openGraph: {
    title: 'Adobe Licensing — Corematrix',
    description:
      'Genuine Adobe licensing programs with expert guidance — VIP, Marketplace, and ETLA for your organization.',
    url: `${siteUrl}/services/adobe-licensing`,
    siteName: 'Corematrix',
    type: 'website',
  },
  alternates: {
    canonical: `${siteUrl}/services/adobe-licensing`,
  },
};

export default function AdobeLicensingPage() {
  return <AdobeLicensingContent />;
}
