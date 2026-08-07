import React from 'react';
import { getPublishedProducts, getProductCategories } from '@/lib/products';
import ProductsClient from './ProductsClient';

export const revalidate = 10;

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getPublishedProducts(),
    getProductCategories()
  ]);

  return <ProductsClient products={products} categories={categories} />;
}
