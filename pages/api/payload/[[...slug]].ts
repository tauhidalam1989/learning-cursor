/**
 * Next.js API route that hosts Payload CMS.
 *
 * Architecture notes:
 * - We create an Express app and initialize Payload into it. The Express app
 *   is wrapped by `serverless-http` so the same app can be used inside the
 *   Next.js serverless API route (`pages/api/...`), allowing Payload to run
 *   inside the existing Next.js process.
 * - Payload connects directly to Postgres using the adapter configured in
 *   `payload.config.ts` and therefore shares the same database as Prisma.
 * - The admin UI is proxied at /admin via a Next.js rewrite (see next.config.js).
 *
 * Important:
 * - Initialization is idempotent: we guard against re-initializing Payload on
 *   HMR during development by storing the initialized app on the global object.
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import express from 'express';
import serverless from 'serverless-http';
import payload from 'payload';
import config from '../../../payload.config';
import prisma from '@/lib/db';

// Holder for the wrapped handler so subsequent requests reuse the same app.
let cachedHandler: any = (global as any).__payloadServerHandler;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!cachedHandler) {
    const app = express();
    // Basic body parsing for payload endpoints.
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Initialize Payload only once. Payload expects the config object built by
    // `payload.config.ts` (imported above).
    if (!(global as any).__payloadInitialized) {
      await payload.init({
        // Use the imported config object directly so we don't need to compile the
        // config separately at runtime.
        config,
        secret: process.env.PAYLOAD_SECRET || process.env.PAYLOAD_SERVER_SECRET || 'dev-secret',
        express: app,
      } as any);

      (global as any).__payloadInitialized = true;
    }

    // Security: tell Express we're behind a proxy (Vercel, Cloudflare, etc.)
    // so secure cookies set by Payload (when `secure: true`) work correctly.
    app.set('trust proxy', 1);

    // Wrap the express app with serverless-http and cache the handler on the
    // global object so HMR/development doesn't re-create it.
    cachedHandler = serverless(app);
    (global as any).__payloadServerHandler = cachedHandler;
  }

  // Delegate the incoming Next.js API request to the wrapped express handler.
  return cachedHandler(req, res);
}

