import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { TermsContent } from '@/sections/terms/TermsContent';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Corematrix Terms of Service. Terms and conditions for using our website and services.',
  alternates: {
    canonical: `${siteConfig.url}/terms-and-conditions`,
  },
};

export default function TermsAndConditionsPage() {
  return <TermsContent />;
}
