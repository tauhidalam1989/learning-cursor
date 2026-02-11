# Marketing Website — README

## Overview

A Next.js (app router) marketing website built with TypeScript and Tailwind CSS. Pages: Home, About, Services, Blog, Contact. The site is composed from reusable `sections` and `components` and includes SEO helpers, design tokens, and accessibility best practices.

## Tech stack

- Next.js 14 (app router)
- React 18
- TypeScript (strict)
- Tailwind CSS + PostCSS
- Google fonts via `next/font`

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Dev server:

```bash
npm run dev
```

3. Build and start:

```bash
npm run build
npm start
```

Environment:
- Set NEXT_PUBLIC_SITE_URL for correct canonical / Open Graph URLs (default falls back to https://example.com).

## Project layout (high level)

- `app/` — Next.js app routes and root layout
- `components/` — shared UI atoms and common components (Navbar, Footer, buttons, inputs, cards)
- `sections/` — page-specific sections (Hero, Mission, Services, Blog sections, Contact form)
- `layouts/` — shared marketing layout (`MarketingLayout`)
- `data/` — static content (banners, contact blocks, blog data)
- `lib/` — utilities (SEO metadata builder)
- `styles/` — global CSS, design tokens
- `tailwind.config.ts`, `postcss.config.js`, `tsconfig.json`

## Visual site map (pages → section composition)

/
├─ Home (app/page.tsx)
│  ├─ HomeGradientWrapper
│  │  ├─ HeroSection
│  │  ├─ CoreServicesSection
│  │  └─ MissionSection
│  ├─ PartnerBenefitsSection
│  └─ HomeGradientWrapper
│     ├─ FaqSection
│     ├─ FeaturedBlogSection
│     └─ ContactFormSection (uses data/contact.defaultContactBlock)
/
/about (app/about/page.tsx)
├─ PageBanner (pageBanners.about)
├─ HomeGradientWrapper
│  ├─ WhoWeAreSection
│  └─ OurApproachSection
└─ HomeGradientWrapper
   ├─ VisionMissionSection
   └─ ContactFormSection

/services (app/services/page.tsx)
├─ PageBanner (pageBanners.services)
├─ HomeGradientWrapper (dark gradient)
│  ├─ TechnologySolutionsSection
│  ├─ ServiceCardsSection
│  └─ HowWeWorkSection
└─ HomeGradientWrapper (dark gradient)
   ├─ WhyChooseSection
   └─ ContactFormSection

/blog (app/blog/page.tsx)
├─ PageBanner (pageBanners.blog)
├─ HomeGradientWrapper
│  ├─ BlogPostsSection
│  └─ BlogTwoColumnSection
└─ ContactFormSection

/contact (app/contact/page.tsx)
├─ PageBanner (pageBanners.contact)
└─ ContactFormSection

Note: many sections are implemented under `sections/` and some shared pieces under `components/sections/`.

## All routes / endpoints

- GET / (Home)
- GET /about
- GET /services
- GET /blog
- GET /contact

There are no server API routes found under `app/api` or `pages/api` in this codebase.

## Major components & notable files

- `layouts/MarketingLayout.tsx` — page chrome: Navbar + main + Footer
- `components/common/Navbar.tsx` — top navigation
- `components/common/Footer.tsx` — footer
- `components/common/HomeGradientWrapper.tsx` — visual wrapper used on many pages
- `components/common/PageBanner.tsx` — banner used atop content pages
- `sections/home/HeroSection.tsx`
- `sections/home/CoreServicesSection.tsx`
- `sections/home/MissionSection.tsx`
- `sections/home/PartnerBenefitsSection.tsx`
- `sections/home/FeaturedBlogSection.tsx`
- `sections/home/FaqSection.tsx`
- `sections/services/TechnologySolutionsSection.tsx`
- `sections/services/ServiceCardsSection.tsx`
- `sections/services/HowWeWorkSection.tsx`
- `sections/services/WhyChooseSection.tsx`
- `sections/blog/BlogPostsSection.tsx`
- `sections/blog/BlogTwoColumnSection.tsx`
- `sections/common/ContactFormSection.tsx`
- `lib/seo/index.ts` — SEO metadata utilities
- `data/banners.ts`, `data/contact.ts`, `data/blog.ts` — content
- `styles/globals.css`, `tailwind.config.ts` — styling and tokens

## Finding where a specific text or component is defined

Use ripgrep (rg) or your editor search. Examples:

```bash
# Find a component file by name
rg "HeroSection" -n

# Find where a specific string appears (e.g. a heading or copy)
rg "Get in touch with our team" -n
```

Or open these likely locations:
- Page-level composition: `app/*.tsx`
- Sections: `sections/**`
- Shared components: `components/**`
- Static content: `data/**`

## Notes & next steps I can do for you

- Create a dedicated `README.md` (done).
- Generate a site map diagram (SVG/PNG) or Visual Studio Code workspace tasks.
- List all components with file paths in a CSV or JSON.
- Search for a specific text/component and return exact file locations — tell me the text or component name to find.

---
README generated automatically — edits welcome.

## Recent backend & SEO updates

Summary of production-ready SEO and admin-preparation changes made:

- SEO
  - Added dynamic sitemap route: `GET /sitemap.xml` (app/sitemap.xml/route.ts) which includes static pages and all published blog posts. Uses `NEXT_PUBLIC_SITE_URL` for absolute URLs and sets CDN-friendly cache headers.
  - Added `GET /robots.txt` (app/robots.txt/route.ts) pointing to the sitemap and host.
  - Centralized site base URL export `siteUrl` and metadata helpers in `lib/seo/index.ts`. Blog post metadata now uses the shared `createPageMetadata(...)` helper for consistent canonical and Open Graph URLs.
  - Reminder: set `NEXT_PUBLIC_SITE_URL` in production for correct canonical/Open Graph links.

- Admin / Auth (backend only)
  - Prisma schema extended (prisma/schema.prisma):
    - Enhanced `User` model with `hashedPassword`, `emailVerified`, `lastLogin`, `twoFactorEnabled`, `isActive`, and `role` (admin/editor/viewer).
    - Added `Account` (OAuth/provider linkage), `Session` (DB-backed sessions), and `RolePermission` (role → permission mapping).
  - Added server-side auth helpers: `lib/auth.ts` (password hashing/verification, session creation/revocation, user helpers). These are utilities only — no UI or endpoints were implemented.
  - Design notes: role/permission table allows RBAC without schema changes; Account/Session models make it straightforward to plug in NextAuth-like adapters or custom JWT/session strategies later.

How to apply DB changes (local dev)

1. Install and generate the Prisma client:

```bash
npm install
npx prisma generate
```

2. Create and run a migration (example dev command):

```bash
npx prisma migrate dev --name add-auth-and-roles
```

Notes for production
- Consider switching to Postgres for production and using native enums if desired.
- Use a strong password hashing algorithm (Argon2 recommended) in production.
- Implement backend RBAC enforcement for admin endpoints; the admin UI should never be the sole enforcement.

If you'd like, I can add example secure server routes for user management and role/permission CRUD (backend only).  

## Payload CMS integration (recent changes)

- Admin UI: Payload CMS is mounted at `/admin` (served by an embedded Express app under `pages/api/payload/[[...slug]].ts`). The Next.js `next.config.js` rewrites map `/admin` to the embedded Payload server.
- Database: Payload connects directly to your database using the official Postgres adapter (`@payloadcms/db-postgres`). Set `DATABASE_URL` (see `.env.example`) to point Payload (and, if desired, Prisma) at the same Postgres instance.
- Collections added:
  - `cms-users` — admin users (Payload auth)
  - `cms-media` — uploaded media (covers)
  - `cms-blog` — CMS-managed blog posts (drafts + publish workflow enabled)
  - `cms-contacts` — public contact submissions
- Admin access: Payload provides the login UI. We added Express middleware that verifies the authenticated Payload user exists in the Prisma `users` table and has `role === 'admin'` before allowing access to `/admin`.
- Contact form: The site contact form now posts to `/api/contact/submit` which validates input server-side and creates `cms-contacts` entries in Payload.
- Seeding: On Payload init the app seeds a set of example blog posts (idempotent) so the CMS and frontend listings show content immediately.
- SEO: Sitemap (`GET /sitemap.xml`) and per-post metadata are integrated with CMS data. `lib/seo/createPageMetadata` is used with CMS post data (absolute OG image URLs are enforced).

## How to run (notes for CMS)

1. Install dependencies (includes Payload + adapter):

```bash
npm install
```

2. Set environment variables (see `.env.example`):
  - `DATABASE_URL` — Postgres connection string
  - `PAYLOAD_SECRET` — strong random secret for Payload sessions
  - `NEXT_PUBLIC_SITE_URL` — public site URL used for canonical/OG links

3. Start dev server:

```bash
npm run dev
```

4. Visit:
  - `/admin` — Payload admin UI
  - `/blog` and `/blog/:slug` — site blog pages (now powered by Payload)
  - `/api/contact/submit` — contact submission endpoint (used by frontend)

Notes:
- Prisma is left intact for custom backend logic. If you want Prisma to use the same Postgres DB in development/production, update `prisma/schema.prisma` datasource to `DATABASE_URL`, then run `npx prisma migrate dev` and `npx prisma generate`.
- If you encounter a build-time import error for Payload's internal config path (e.g. `payload/config`), the project loads the Payload config as a plain object at runtime to avoid Next.js build-time ESM/exports issues.
- To enable the full Slate rich text editor in the admin UI, install `@payloadcms/richtext-slate` and follow the editor configuration; note peer dependency constraints with React versions.

