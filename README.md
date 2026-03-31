# Corematrix — Marketing Website

AI-first IT services marketing website built with Next.js 14, TypeScript, Tailwind CSS, and Payload CMS.

---

## Overview

Corematrix is a technology-driven IT services company marketing site. It showcases AI development, web applications, SaaS platforms, and dedicated development teams. The site includes a blog powered by Payload CMS, a contact form, portfolio, careers, and privacy policy pages.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router) |
| UI | React 18, TypeScript (strict) |
| Styling | Tailwind CSS, PostCSS |
| CMS | Payload CMS (Postgres) |
| Database | PostgreSQL (Prisma + Payload) |
| Fonts | Google Fonts via `next/font` |
| Animation | Framer Motion |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env` and configure:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `PAYLOAD_SECRET` | Strong random secret for Payload sessions |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (e.g. `https://corematrix.com`) |
| `PAYLOAD_SERVER_URL` | Optional; defaults to dev URL |
| `ENFORCE_HTTPS` | Set `true` in production behind HTTPS |
| `DATABASE_SSL` | Set `true` if Postgres requires SSL |

### 3. Database setup

```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Run development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

### 5. Build for production

```bash
npm run build
npm start
```

---

## Project Structure

```
├── app/
│   ├── (marketing)/          # Marketing route group
│   │   ├── page.tsx          # Home
│   │   ├── layout.tsx
│   │   ├── about/
│   │   ├── services/
│   │   ├── blog/
│   │   │   └── [slug]/
│   │   ├── contact/
│   │   ├── careers/
│   │   ├── portfolio/
│   │   └── privacy/
│   ├── api/contact/          # Contact form API
│   ├── sitemap.xml/          # Dynamic sitemap
│   ├── robots.txt/           # Robots route
│   └── not-found.tsx         # 404 page
├── components/
│   ├── common/               # Navbar, Footer, buttons, inputs
│   ├── ui/                   # Reusable UI atoms
│   ├── blog/
│   ├── portfolio/
│   ├── privacy/
│   └── not-found/
├── sections/                 # Page sections by area
│   ├── home/
│   ├── about/
│   ├── services/
│   ├── blog/
│   ├── contact/
│   ├── careers/
│   ├── portfolio/
│   ├── privacy/
│   └── common/
├── layouts/
│   └── MarketingLayout.tsx   # Navbar + main + Footer
├── data/                     # Static content & config
│   ├── contact.ts
│   ├── blogData.ts
│   ├── portfolioData.ts
│   ├── careersData.ts
│   ├── privacyData.ts
│   ├── notFoundData.ts
│   └── banners.ts
├── lib/                      # Utilities, SEO, auth, posts
├── styles/
│   └── globals.css
├── payload.config.ts
└── prisma/
```

---

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home |
| `/about` | About us, team, values |
| `/services` | AI, web, SaaS, dedicated teams |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog post (Payload CMS) |
| `/contact` | Contact form & channels |
| `/careers` | Open roles, culture, benefits |
| `/portfolio` | Case studies & projects |
| `/privacy` | Privacy policy |
| `/admin` | Payload CMS admin UI |

### API & special routes

| Route | Description |
|-------|-------------|
| `POST /api/contact` | Contact form submission |
| `GET /sitemap.xml` | Dynamic sitemap |
| `GET /robots.txt` | Robots file |
| `/admin` | Payload admin (Express) |

---

## Page Composition

### Home (`/`)

HeroSection → TechStackMarquee → CoreServicesSection → AiSpotlightSection → ProcessSection → WhyCorematrixSection → IndustriesSection → TestimonialsSection → FaqSection → CtaBannerSection → ContactFormSection

### About (`/about`)

AboutHeroSection → WhoWeAreSection → MissionVisionSection → CoreValuesSection → OurApproachSection → TeamSection → TechStackSection → ImpactNumbersSection → CultureSection → ClientLogosSection → AboutFaqSection → AboutCtaSection

### Services (`/services`)

ServicesHeroSection → ServiceFilterNav → MainServicesSection → TechSolutionsSection → HowWeWorkSection → EngagementModelsSection → IndustriesSection → CaseStudiesSection → WhyChooseSection → ServiceTestimonialsSection → ServicesFaqSection → ServicesCtaSection

### Blog (`/blog`)

BlogHeroSection → BlogCategoryNav → FeaturedPostSection → BlogPostsSection → ArticleSeriesSection → BlogNewsletterSection → TrendingTopicsSection → LatestPostsSection → BlogCtaSection

### Contact (`/contact`)

ContactHeroSection → ContactFormSection → WhatHappensNextSection → ContactChannelsSection → RightFitSection → LocationSection → ContactTrustSection → ContactFaqSection → ContactCtaSection

### Careers (`/careers`)

CareersHeroSection → CareersMarquee → WhyJoinSection → CareersCultureSection → BenefitsSection → InterviewProcessSection → OpenRolesSection → TeamStoriesSection → LifeAtSection → OpenApplicationSection → CareersFaqSection → CareersCtaSection

### Portfolio (`/portfolio`)

PortfolioHeroSection → PortfolioFilterNav → FeaturedCaseStudy → ProjectsGridSection → PortfolioImpactSection → PortfolioTestimonials → IndustriesServedSection → PortfolioTechSection → HowWeDeliverSection → PortfolioCtaSection

---

## Payload CMS

- **Admin UI**: `/admin`
- **Collections**: `cms-users`, `cms-media`, `cms-blog`, `cms-contacts`
- **Blog**: Draft/publish workflow, rich text, cover images
- **Contact form**: Submits to `cms-contacts`

---

## SEO

- Dynamic sitemap (`/sitemap.xml`) with static pages + blog posts
- `robots.txt` with sitemap reference
- JSON-LD on key pages (Organization, Service, Blog, ContactPage, etc.)
- Centralized metadata helpers in `lib/seo/index.ts`
- Canonical URLs and Open Graph via `NEXT_PUBLIC_SITE_URL`

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Finding content & components

```bash
# Component by name
rg "HeroSection" -n

# Specific text
rg "Get in touch" -n
```

Likely locations:

- Pages: `app/(marketing)/**/page.tsx`
- Sections: `sections/**`
- Components: `components/**`
- Content: `data/**`

---

## Notes

- **Terms page**: Footer links to `/terms`; page not yet implemented.
- **Feedback page**: Footer links to `/feedback`; page not yet implemented.
- **Blog series**: ArticleSeriesSection links to `/blog/series/[slug]`; route not yet implemented.
- **Portfolio detail**: Project cards link to `/portfolio/[slug]`; route not yet implemented.
- **Social links**: Footer and TeamSection use placeholder hash links (`#twitter`, `#linkedin`, etc.); replace with real profile URLs.
