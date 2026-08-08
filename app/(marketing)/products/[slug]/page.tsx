import React from 'react';
import { getProductBySlug } from '@/lib/products';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

export const revalidate = 10;

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return {};

  return {
    title: product.metaTitle || product.heroTitle || product.title,
    description: product.metaDescription || product.heroDescription || product.shortDescription,
    keywords: product.metaKeywords,
  };
}

export default async function ProductDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  return <ProductDetailClient product={product} slug={slug} />;
}
