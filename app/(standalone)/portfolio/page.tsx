import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import PortfolioClient from '@/app/(marketing)/portfolio/PortfolioClient';

export const metadata: Metadata = {
  title: "Portfolio — Corematrix | Links & Resources",
  description:
    "Explore Corematrix's official portfolio page with links to our projects, resources, and social media.",
  openGraph: {
    title: 'Portfolio — Corematrix',
    description: 'All the important links for Corematrix — projects, social media, and more.',
    url: `${siteConfig.url}/portfolio`,
    siteName: 'Corematrix',
    type: 'website',
  },
};

async function getPortfolioData() {
  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const res = await fetch(`${apiBase}/api/portfolio/public`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      return { profile: { companyName: 'Corematrix', title: '' }, items: [] };
    }
    const json = await res.json();
    // Backend returns { success: true, data: { profile, items } }
    const payload = json.data ?? json;
    return {
      profile: payload.profile ?? { companyName: 'Corematrix', title: '' },
      items: Array.isArray(payload.items) ? payload.items : [],
    };
  } catch (err) {
    console.error('Failed to fetch portfolio data:', err);
    return { profile: { companyName: 'Corematrix', title: '' }, items: [] };
  }
}

export default async function PortfolioPage() {
  const portfolioData = await getPortfolioData();
  return <PortfolioClient portfolioData={portfolioData} />;
}
