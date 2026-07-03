# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Next.js 14 (App Router) + TypeScript + Tailwind marketing/showcase website for **SRS Computers**, a computer & electronics retailer in Perambalur, Tamil Nadu. It's a product showcase, not e-commerce — no prices, no cart/checkout, no CMS or database. All content is static and compiled into the app.

## Commands

```bash
npm run dev      # start dev server (localhost:3000, falls back to next free port if busy)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # next lint
```

There is no test suite in this repo.

## Architecture

### Content lives in `lib/`, not scattered through components

- **`lib/site.ts`** — every piece of business copy: contact info, address, hours, nav links, brand list, stats, testimonials, FAQs, services, "old way vs SRS way" comparison copy. When copy changes, it changes here, not in the JSX.
- **`lib/catalogue.ts`** — the single source of truth for **all product data** (~300 products across 12 categories: laptops, monitors, desktops, components, printers, ink, cctv, networking, storage, accessories, power, biometric). Each category is a `Category` object (`key`, `label`, `blurb`, `products[]`) built as its own `const`, then assembled into the exported `CATEGORIES[]` array at the bottom of the file. The `img(slug)` helper builds `/products/<slug>.jpg` paths — don't hand-write image paths.
  - `Product.specs` is an optional array of `{ label, value }` pairs rendered as a grid in `ProductModal`. Spec fields are category-adaptive (e.g. laptops get Processor/RAM/Storage/Display/OS/Warranty; CCTV gets Resolution/Camera Type/Night Vision/Audio/Connectivity) — match the existing pattern for a category rather than inventing new field sets.

### Product images

- Live in `public/products/<slug>.jpg`. Naming convention: `<category-key>-<brand-slug>-<model-slug>.jpg` (e.g. `laptop-hp-15-fd0624tu.jpg`, `cctv-hikvision-2mp-colorvu-bullet.jpg`).
- `ProductCard` and `ProductModal` render images with `next/image` + `object-contain` in a roughly square box, and catch load failures with `onError` → a styled brand/name placeholder. A missing/broken image never breaks the UI, it just degrades to a placeholder — so image coverage should be checked explicitly (diff `img()` slugs referenced in `lib/catalogue.ts` against files in `public/products/`), not assumed from a working build.
- Prefer clean, mostly-unobstructed product photography (plain background). Avoid marketing/infographic-style images where large text banners or badges cover most of the product — they render poorly in the `object-contain` card.

### Routing & pages (`app/`)

Thin pages that compose components: `app/page.tsx` (home), `app/products/page.tsx`, `app/about`, `app/services`, `app/contact`. Page-specific sections live under `components/home/`; components used across multiple pages live at the top of `components/`.

`BrowseProducts.tsx` (client component) drives `/products`: category filter pills plus two URL-param-driven modes read via `useSearchParams`:
- `?cat=<category-key>` deep-links to a filtered category (validated against `CATEGORIES` keys).
- `?search=<query>` switches to a flattened cross-category search view (matches name/brand/desc).

Because it uses `useSearchParams`, it must stay wrapped in `<Suspense>` where it's rendered (already done in `app/products/page.tsx`) — don't remove that boundary.

### Motion & animation conventions

- `components/Reveal.tsx` is the shared scroll-reveal wrapper (`framer-motion` + `useInView`, respects `prefers-reduced-motion`, degrades to a plain `div` for reduced motion). Reuse it for "fade up on scroll" rather than writing ad-hoc `motion.div` blocks.
- `components/SmoothScroll.tsx` wraps the whole app with Lenis for smooth scrolling; `html { scroll-behavior: auto }` is intentional (Lenis owns scroll behavior).
- Grid/list reveals (e.g. product cards in `BrowseProducts.tsx`) use `AnimatePresence` + `motion.div layout` with staggered `delay: (i % 4) * 0.05` — matches the 4-column grid so stagger resets each row.

### Styling

- Tailwind config (`tailwind.config.ts`) defines the design tokens: `accent` (cyan brand color), `ink`/`muted` (near-black/gray text), `surface` (pastel card tints: mint/sky/rose/green), custom radii (`pill`, `card`, `xl2`) and shadows (`nav`, `card`, `soft`, `glow`).
- Reusable classes are defined in `app/globals.css` under `@layer components`: `.container-x` (page width + gutters), `.btn-accent` / `.btn-ghost` / `.btn-dark` (pill buttons), `.eyebrow` (small caps label), `.h-display`, `.frosted` (backdrop blur for nav/pills). Prefer these over redefining the same utility combinations inline.
- Path alias `@/*` maps to the repo root (see `tsconfig.json`).

### Reference docs

`docs/superpowers/specs/` contains dated design specs for past feature work (e.g. the search bar, catalogue rewrite, and specs-grid upgrade) — check here for the rationale behind a pattern before changing it.
