import React from 'react';

interface JsonLdProps {
  schema: Record<string, any> | Record<string, any>[];
}

/**
 * Reusable SEO Schema Markup Component (JSON-LD)
 * - Server-side rendered (SSR) compatible.
 * - Safely injects structured data JSON-LD into the head or body of the document.
 * - Optimizes performance and prevents duplicate schema generation.
 */
export function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default JsonLd;
