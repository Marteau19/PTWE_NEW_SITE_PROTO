# Ecoflo — D2C website prototype

A front-end-only, high-fidelity marketing prototype for **Ecoflo**, Premier Tech
Water & Environment's residential septic and wastewater treatment brand.

Built for an internal stakeholder presentation. **Mock data only — no backend,
no real integrations.** All figures and locations are illustrative.

> Positioning: _"Grounded by design. Elevated by experience."_
> Core promise: **one partner, every step** — from soil test to lifetime care.

## Tech stack

- **React + Vite + TypeScript**
- **Tailwind CSS** with the Ecoflo brand palette as theme tokens (`eco-green`, `eco-navy`, …)
- **Framer Motion** for all scroll reveals, transitions, and the pinned "disappear" sequence
- **react-leaflet + Leaflet** with **CartoDB Voyager** tiles (no API token) for the Service Point map
- **react-countup** + a custom requestAnimationFrame odometer for the animated stats
- **Plus Jakarta Sans** (Google Fonts)

## Page structure (single scroll)

1. Sticky navigation (transparent → solid on scroll)
2. Hero (parallax + Ken Burns)
3. The turnkey solution — scattered contractors converge into one Ecoflo mark
4. Impact counter — live litres odometer + count-up stat tiles
5. The journey — four steps with a line that draws on scroll
6. The signature "it disappears" pinned sequence
7. App teaser inside an iPhone frame
8. Interactive Service Point map (20 mock points, NA + Europe)
9. Trust & compliance
10. Final CTA
11. Footer

## Getting started

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
```

Other scripts:

```bash
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build locally
```

## Deploying to Vercel

This repo includes a `vercel.json` preconfigured for Vite.

**Option A — dashboard**
1. Push to GitHub (already wired to this repo).
2. In Vercel, **New Project → Import** this repository.
3. Framework preset: **Vite** (auto-detected). Build: `npm run build`, Output: `dist`.
4. **Deploy.**

**Option B — CLI**
```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

## Brand & assets

- Brand spec lives in [`BRAND.md`](./BRAND.md); Tailwind tokens mirror it.
- Official logo: `public/brand/ecoflo-logo.png` (white reverse via CSS filter on dark/green).
- Photography uses Unsplash placeholders. Every `<img>` carries a `data-asset`
  attribute so brand photography can be swapped in later without touching layout.
  Failed images fall back to tasteful brand-palette blocks (never a broken image).

## Notes

- Mock data is in `src/data/` (`servicePoints.ts`, `testimonials.ts`, `content.ts`).
- The litres counter and Service Point network are **illustrative**, labeled as such in the UI.
- Respects `prefers-reduced-motion`: counters, parallax, and the pinned sequence
  degrade to static layouts.
