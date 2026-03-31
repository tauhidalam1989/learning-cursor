import NotFoundClient from '@/components/not-found/NotFoundClient';

export const metadata = {
  title: '404 — Page Not Found | Corematrix',
  description:
    "The page you're looking for doesn't exist. Return to Corematrix — AI development, web apps, SaaS platforms, and dedicated engineering teams.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundClient />;
}
