# Project structure

Scalable, production-ready folder structure for a Next.js 14 App Router marketing website.

## Directory tree

```
learn/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (html, body, global metadata)
│   ├── page.tsx                  # Home (/)
│   ├── about/
│   │   └── page.tsx              # About (/about)
│   ├── services/
│   │   └── page.tsx              # Services (/services)
│   ├── blog/
│   │   └── page.tsx              # Blog (/blog)
│   └── contact/
│       └── page.tsx              # Contact (/contact)
├── components/                   # Reusable UI building blocks
│   ├── ui/                       # Primitives (Button, Container, etc.)
│   │   ├── Button.tsx
│   │   └── Container.tsx
│   └── common/                   # Shared chrome (Header, Footer, nav)
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── nav-config.ts
├── sections/                     # Page sections (composed for each route)
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   └── FeaturesSection.tsx
│   ├── about/
│   │   ├── AboutHeroSection.tsx
│   │   └── TeamSection.tsx
│   ├── services/
│   │   ├── ServicesHeroSection.tsx
│   │   └── ServicesListSection.tsx
│   ├── blog/
│   │   ├── BlogHeroSection.tsx
│   │   └── BlogListSection.tsx
│   ├── contact/
│   │   ├── ContactHeroSection.tsx
│   │   └── ContactFormSection.tsx
│   └── common/
│       └── CtaSection.tsx
├── layouts/                      # Composable layout wrappers
│   └── MarketingLayout.tsx       # Header + main + Footer
├── lib/                          # Utilities and shared logic
│   └── seo/                      # SEO utilities
│       └── index.ts              # defaultMetadata, buildPageMetadata
├── types/                        # TypeScript types and interfaces
│   └── index.ts                  # PageMetadata, NavLink, Service, BlogPost
├── styles/                       # Global and theme styles
│   └── globals.css               # Tailwind directives + base styles
├── public/                       # Static assets (served at /)
│   ├── images/                   # Images (next/image, og images)
│   └── assets/                   # Fonts, icons, other static files
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
└── next-env.d.ts
```

## Why each folder exists

| Folder | Purpose |
|--------|--------|
| **`app/`** | Next.js 14 App Router. Each `page.tsx` defines a route. `layout.tsx` wraps all pages with shared UI and default metadata. Keeps routing and entry points in one place. |
| **`components/`** | Reusable, presentational building blocks used across the site. **`ui/`** holds primitives (Button, Container, Input) that have no page-specific logic. **`common/`** holds shared chrome like Header and Footer and nav config, so one change updates every page. |
| **`sections/`** | Full-width, page-level sections (hero, features, CTA, contact form). Each section is composed from `components/` and can be mixed per page. Keeps pages thin (import sections, no layout markup) and makes sections reusable and testable. |
| **`layouts/`** | Composable layout wrappers (e.g. MarketingLayout: header + main + footer). Separate from `app/layout.tsx` so you can swap or nest layouts (e.g. blog vs marketing) without duplicating structure. |
| **`lib/`** | Shared utilities and helpers. **`lib/seo/`** holds default metadata, `buildPageMetadata()`, and any future SEO helpers (JSON-LD, sitemap helpers). Centralizes SEO so every page can use the same patterns. |
| **`types/`** | Shared TypeScript types and interfaces (e.g. PageMetadata, NavLink, Service, BlogPost). Single source of truth for contracts used by components, sections, and API/SEO code. |
| **`styles/`** | Global CSS and Tailwind entry. `globals.css` imports Tailwind layers and any CSS variables or base styles. Keeps styling entry points and theme in one place. |
| **`public/`** | Static files served at the root URL. **`public/images/`** for images (including OG images). **`public/assets/`** for fonts, icons, or other static assets. Next.js serves these without going through the app. |

## Data flow

- **Pages** (`app/*/page.tsx`) export `metadata` and render a stack of **sections**.
- **Sections** use **components** and optional **types**.
- **Layouts** wrap page content with Header/Footer and are used in **`app/layout.tsx`**.
- **SEO** is set in the root layout via `lib/seo` and overridden per page with `metadata` or `buildPageMetadata()`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
