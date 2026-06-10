import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { FeedbackContent } from '@/sections/feedback/FeedbackContent';

export const metadata: Metadata = {
  title: 'Feedback',
  description: 'Share feedback with the Corematrix team.',
  alternates: { canonical: `${siteConfig.url}/feedback` },
};

export default function FeedbackPage() {
  return <FeedbackContent />;
}

