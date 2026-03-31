/**
 * Payload CMS configuration (TypeScript)
 *
 * Purpose:
 * - Connects Payload directly to the project's PostgreSQL database using
 *   the official Postgres adapter.
 * - Keeps Payload-managed tables/collections separate from Prisma-managed
 *   tables by using distinct collection slugs / table names.
 *
 * Notes:
 * - This file intentionally lives at the repository root as `payload.config.ts`.
 * - The runtime that initializes Payload (the Next.js API route under
 *   `/pages/api/payload/`) will import this file directly so TypeScript is
 *   preserved end-to-end.
 *
 * Important environment variables:
 * - DATABASE_URL: PostgreSQL connection string shared with Prisma (same DB).
 * - PAYLOAD_SECRET or PAYLOAD_SERVER_SECRET: secret for Payload encryption.
 */
import path from 'path';
import { postgresAdapter } from '@payloadcms/db-postgres';
// Note: rich text editor (Slate) can be enabled by installing
// `@payloadcms/richtext-slate` and importing `slateEditor`. We intentionally
// avoid adding the import here so the frontend React version stays untouched.

export default ({
  // Public facing URL (used in some admin links). Override in production.
  serverURL: process.env.PAYLOAD_SERVER_URL || 'http://localhost:3000',

  // Admin configuration: point to the collection that stores admin users.
  admin: {
    user: 'cms-users',
  },
  // Note: authentication for the admin UI is handled by Payload's built-in
  // auth (the `cms-users` collection). We additionally enforce that a logged
  // in Payload user must correspond to a Prisma `users` row with `role === 'admin'`
  // via Express middleware in `pages/api/payload/[[...slug]].ts`. This preserves
  // Payload's login UI while delegating role-based authorization to your
  // existing Prisma-backed user model.

  // Minimal example collection reserved for CMS admin users. Collection slugs
  // are prefixed with `cms-` so they don't collide with Prisma-managed tables.
  collections: [
    // Admin users for Payload
    {
      slug: 'cms-users',
      auth: true,
      admin: {
        useAsTitle: 'email',
        description: 'CMS admin users (separate from application users).',
      },
      access: {
        read: () => true,
      },
      fields: [
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          required: true,
          unique: true,
        },
        {
          name: 'password',
          label: 'Password',
          type: 'password',
          required: true,
        },
        {
          name: 'name',
          label: 'Full name',
          type: 'text',
        },
      ],
    },

    // Media/uploads collection used by Blog cover images. Prefixed to avoid
    // colliding with Prisma tables.
    {
      slug: 'cms-media',
      labels: {
        singular: 'Media',
        plural: 'Media',
      },
      admin: {
        description: 'Media uploads used by the CMS (images, files).',
      },
      upload: {
        staticDir: path.resolve(process.cwd(), 'public', 'uploads'),
      },
    },

    // Blog collection for CMS-managed blog posts. Draft/publish workflow is
    // enabled via `versions.drafts`.
    {
      slug: 'cms-blog',
      labels: {
        singular: 'Blog Post',
        plural: 'Blog Posts',
      },
      admin: {
        useAsTitle: 'title',
        description: 'Blog posts managed by editors in the CMS.',
      },
      versions: {
        drafts: true,
      },
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
        },
        {
          name: 'slug',
          label: 'Slug',
          type: 'text',
          required: true,
          unique: true,
          admin: {
            description: 'URL-friendly unique identifier (e.g. my-post-title).',
          },
        },
        {
          name: 'excerpt',
          label: 'Excerpt',
          type: 'textarea',
        },
        {
          name: 'content',
          label: 'Content',
          type: 'richText',
          // To enable the full Slate editor in the admin UI, install
          // `@payloadcms/richtext-slate` and configure `editor: slateEditor({})`
          // at the top of this file.
        },
        {
          name: 'coverImage',
          label: 'Cover Image',
          type: 'upload',
          relationTo: 'cms-media',
        },
        {
          name: 'seoTitle',
          label: 'SEO Title',
          type: 'text',
        },
        {
          name: 'seoDescription',
          label: 'SEO Description',
          type: 'textarea',
        },
        {
          name: 'status',
          label: 'Publish Status',
          type: 'select',
          options: [
            { label: 'Draft', value: 'DRAFT' },
            { label: 'Published', value: 'PUBLISHED' },
          ],
          defaultValue: 'DRAFT',
        },
        {
          name: 'publishedAt',
          label: 'Published Date',
          type: 'date',
        },
      ],
    },
    // Contact submissions collection — stores messages submitted from the site.
    {
      slug: 'cms-contacts',
      labels: {
        singular: 'Contact Submission',
        plural: 'Contact Submissions',
      },
      admin: {
        useAsTitle: 'email',
        description: 'Messages submitted from the public contact form.',
      },
      access: {
        // Allow public creation (site visitors). Reading of submissions should
        // be restricted to admin users only (default).
        create: () => true,
      },
      fields: [
        {
          name: 'fullName',
          label: 'Full name',
          type: 'text',
          required: true,
          admin: {
            description: 'Sender full name',
          },
          validate: (value: any) => {
            if (!value || String(value).trim().length < 2) return 'Please provide a valid name';
            return true;
          },
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          required: true,
          validate: (value: any) => {
            if (!value) return 'Email is required';
            // basic email regex
            if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(String(value))) return 'Enter a valid email';
            return true;
          },
        },
        {
          name: 'phoneCountry',
          label: 'Phone Country Code',
          type: 'text',
        },
        {
          name: 'phoneNumber',
          label: 'Phone Number',
          type: 'text',
          validate: (value: any) => {
            if (!value) return true;
            if (!/^\d{7,15}$/.test(String(value))) return 'Enter a valid phone number';
            return true;
          },
        },
        {
          name: 'company',
          label: 'Company',
          type: 'text',
        },
        {
          name: 'message',
          label: 'Message',
          type: 'textarea',
          required: true,
          validate: (value: any) => {
            if (!value || String(value).trim().length < 10) return 'Please provide more details';
            return true;
          },
        },
        {
          name: 'createdAt',
          label: 'Created At',
          type: 'date',
          admin: {
            position: 'sidebar',
          },
        },
      ],
    },
  ],

  // Database adapter: use official Postgres adapter and connect via the same
  // DATABASE_URL that Prisma uses. Payload will manage its own tables/schema.
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
      // If your Postgres provider requires SSL (e.g. production), enable it:
      // ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
    },
  }),

  // Local file uploads. Stores files under /public/uploads. Change for S3/etc.
  uploads: {
    staticDir: path.resolve(process.cwd(), 'public', 'uploads'),
  },

  // Run a small seed on first init to ensure there's at least one blog post to
  // inspect in the admin UI during development.
  onInit: async (
    payloadInstance: {
      find: (opts: { collection: string; limit: number }) => Promise<{ docs: unknown[] }>;
      create: (opts: { collection: string; data: Record<string, unknown> }) => Promise<unknown>;
    }
  ) => {
    try {
      const result = await payloadInstance.find({
        collection: 'cms-blog',
        limit: 1,
      });

      if (!result || result.docs.length === 0) {
        await payloadInstance.create({
          collection: 'cms-blog',
          data: {
            title: 'Hello from Payload',
            slug: 'hello-from-payload',
            excerpt: 'This is a seeded blog post created on CMS init.',
            // Minimal Slate-like node for rich text content. Admin editor will
            // render this as a paragraph if the rich text editor is enabled.
            content: [
              {
                type: 'p',
                children: [{ text: 'Welcome — this is a seeded post managed by Payload CMS.' }],
              },
            ],
            seoTitle: 'Hello from Payload',
            seoDescription: 'Seeded blog post to verify CMS integration.',
            status: 'PUBLISHED',
            publishedAt: new Date().toISOString(),
          },
        });
      }
    } catch (err) {
      // Log but don't crash startup if seeding fails (e.g., running migrations).
      // Payload init will still continue.
      // eslint-disable-next-line no-console
      console.warn('Payload seed error (non-fatal):', (err as any)?.message ?? err);
    }
  },

  // Generate TypeScript types for collections (safe to import elsewhere).
  typescript: {
    outputFile: path.resolve(process.cwd(), 'payload-types.ts'),
  },
});

