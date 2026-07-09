# SRS Computers

Marketing & product-showcase website for **SRS Computers**, a computer and electronics retailer in Perambalur, Tamil Nadu (est. 2009). It's a showcase, not a store — it presents the full product range and services and drives walk-ins to the physical showroom. There are no prices, no cart, no checkout, and no database; all content is static and compiled into the app.

Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server → http://localhost:3000
```

If port 3000 is busy, Next.js falls back to the next free port (3001, 3002, …).

### Other commands

```bash
npm run build    # production build
npm run start    # serve the production build (run `npm run build` first)
npm run lint     # next lint
```

There is no test suite in this repo.

## Project structure

```
app/                 Routes (App Router). Thin pages that compose components.
  page.tsx           Home
  products/          Product catalogue browser (search + category filters)
  about/ services/ contact/ brands/
  layout.tsx         Root layout: fonts, nav, footer, background, smooth scroll
  globals.css        Tailwind layers + reusable component classes
components/           Shared UI; components/home/ holds homepage sections
lib/
  site.ts            All business copy: contact, hours, nav, brands, FAQs, services
  catalogue.ts       All product data — ~300 products across 12 categories
public/
  products/          Product images, one <slug>.jpg per product
  gallery/           Storefront photos
tailwind.config.ts   Design tokens (brand cyan accent, ink/muted text, radii, shadows)
```

## How it works

### Content lives in `lib/`, not in the JSX

- **`lib/site.ts`** is the single place for business copy — contact details, address, opening hours, nav links, brand list, stats, testimonials, FAQs, services. Change copy here, not in components.
- **`lib/catalogue.ts`** is the single source of truth for every product. Products are grouped into 12 categories (laptops, monitors, desktops, components, printers, ink, cctv, networking, storage, accessories, power, biometric). Each product has a name, brand, description, image, and an optional category-adaptive `specs` list that renders as a grid in the product modal.

### Products page

`/products` is driven by a client component that supports:

- **Category filter pills** to jump between categories.
- **`?cat=<category-key>`** to deep-link straight to a filtered category (e.g. `/products?cat=cctv`).
- **`?search=<query>`** to show a flattened cross-category search view matching product name, brand, or description. The homepage search box routes here on Enter.

### Product images

Images live in `public/products/` as `<slug>.jpg`, named `<category>-<brand>-<model>` (e.g. `laptop-hp-15-fd0624tu.jpg`, `cctv-hikvision-2mp-colorvu-bullet.jpg`). Cards render them with `next/image` + `object-contain`; a missing or broken image degrades gracefully to a styled brand/name placeholder rather than breaking the layout. Prefer clean product photography on a plain background (no marketing-banner overlays), since the whole image is shown uncropped.

### Styling & motion

- Design tokens (the brand **cyan accent**, near-black `ink` / gray `muted` text, pastel `surface` card tints, custom radii and shadows) are defined in `tailwind.config.ts`. Reusable button/label/container classes live in `app/globals.css` under `@layer components`.
- The page background wash and drifting cyan aurora blobs are in `components/BackgroundGradient.tsx`.
- Scroll-reveal animations use the shared `components/Reveal.tsx` wrapper (framer-motion, respects reduced-motion). Lenis provides smooth scrolling site-wide via `components/SmoothScroll.tsx`.

## Design docs

`docs/superpowers/specs/` holds dated design specs for past feature work (search bar, catalogue rewrite, specs grid) — useful for the rationale behind a pattern before changing it.

## Notes

- The path alias `@/*` maps to the repo root.
- `CLAUDE.md` contains guidance for AI coding assistants working in this repo.
