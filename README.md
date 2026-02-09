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

