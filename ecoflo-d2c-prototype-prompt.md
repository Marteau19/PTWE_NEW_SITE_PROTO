# Claude Code prompt: Ecoflo D2C website prototype

> Paste everything below into Claude Code. The canonical brand reference is in
> `BRAND.md` (place it at the repo root). Follow it exactly for colors, logo
> usage, clearance, and do-nots. Photography uses Unsplash placeholders,
> structured so brand photos can be swapped in later.

---

## Role and goal

Build an aspirational, front-end-only marketing website prototype for **Ecoflo**, Premier Tech Water & Environment's residential septic and wastewater treatment brand. This is a high-fidelity prototype for an internal stakeholder presentation. **Mock data only, no backend, no real integrations.**

The bar: a modern, slick, emotionally engaging direct-to-consumer experience that pushes creative limits for a manufacturing company. Think **Tesla.com** (minimal, bold, product-as-hero, generous whitespace, big confident type) crossed with **Sunrun.com** (turnkey residential service narrative, "we handle everything" promise).

Creative hook to exploit: the Ecoflo system is literally invisible, buried underground. Lean into that. The technology disappears so the homeowner's life gets simpler.

The single most important message to land: **the turnkey solution ("one partner, every step")**. Ecoflo handles the entire journey from soil test to lifetime maintenance. The homeowner never juggles contractors again. This narrative must be prominent, not a footnote.

---

## Brand identity (canonical specs in BRAND.md)

Keep the existing Ecoflo brand DNA, then elevate the execution. Read `BRAND.md` and follow it exactly. Summary below.

**Colors**
- Ecoflo green (primary): `#64A70B` (RGB 100, 167, 11; Pantone 369 C). Used for accents, CTAs, the wordmark, key stats.
- Ecoflo green dark (hover/depth): `#4E8208`
- Ecoflo green tint (soft backgrounds): `#EAF3DE`
- Premier Tech navy (headings/ink): `#041E42` (RGB 4, 30, 66; Pantone 282 C). This is the official parent-brand navy and the heading color.
- Body text: `#3A4A50`
- Background white: `#FFFFFF`
- Warm off-white (alternating sections): `#F7F6F1`

**Typography**
- Plus Jakarta Sans (load from Google Fonts) for everything
- Headings: large, tight tracking, weight 600 to 800, in the navy
- Body: weight 400, generous line-height (1.7)
- Sentence case for body; headlines can be bold and large like Tesla

**Voice and proof points (use these as real copy, in English)**
- Positioning headline to feature: **"Grounded by design. Elevated by experience."**
- Trusted since 1995, **30 years of making a difference**
- **100,000+** property owners across North America trust Ecoflo
- Filters made of **100% natural, renewable, compostable** coconut husk fragments
- **No energy required** for treatment (a genuine differentiator, use it)
- Acts as a physical barrier that removes pollutants and protects the property and environment

**Logo (rules in BRAND.md)**
- Use the official logo at `/public/brand/ecoflo-logo.png` (high-res, transparent background). Render it as an `<img>`; do not redraw it.
- For dark or green backgrounds (hero, navy footer), use `/public/brand/ecoflo-logo-white.png` if present. If only the color PNG exists, apply a CSS filter (`brightness(0) invert(1)`) to produce a clean white version, and verify it reads correctly.
- If no logo file is present at all, fall back to the wordmark as styled text "ECOFLO" in Ecoflo green, bold, with a small registered-trademark mark.
- Never change the logo color, deform it, outline it, or place it on a background that hurts readability. Respect clearance space of X/3 around it (X = cap height).

---

## Tech stack

- **React + Vite + TypeScript**
- **Tailwind CSS** (configure the brand palette above as theme tokens: `eco-green`, `eco-navy`, etc.)
- **Framer Motion** for all scroll animations, transitions, and reveals (non-negotiable, this carries the wow factor)
- **react-leaflet** + Leaflet, using **CartoDB Voyager** tiles (no API token needed) for the Service Point map
- **react-countup** (or a custom requestAnimationFrame counter) for the animated stats
- Mock data lives in `/src/data/` as typed TS files
- Single-page vertical scroll experience (one main route); keep components modular in `/src/sections/`
- Fully responsive: mobile-first, looks great on phone and desktop
- Deploy target: **Vercel**. Initialize a **git** repo and commit per section.

---

## Visual assets

Photography uses **Unsplash** placeholders (`https://images.unsplash.com/...`) themed around: natural landscapes, water, rural and lakeside homes and cottages, hands holding soil or organic material, green nature. Structure every `<img>` with a `data-asset` attribute so brand photography can be swapped in later without touching layout. If a specific image URL fails to load, fall back to a tasteful solid or subtle two-tone block using the brand palette. Never leave a broken image.

## Design references

If a `/references/` folder is present in the repo, **open and study the screenshots inside it before building**. They are captures of Tesla.com and Sunrun.com showing the target look and feel: spacing, type scale, hero treatment, section rhythm, transitions. Match that level of polish and restraint, adapted to the Ecoflo brand. Do not copy their content or layout literally; absorb the quality bar. Do not attempt to fetch tesla.com or sunrun.com over the network; the screenshots are the reference.

---

## Page structure (single scroll, top to bottom)

### 1. Navigation
Sticky, transparent over the hero, turns solid white on scroll. Ecoflo wordmark left. Minimal links: How it works, Our solution, Find a Service Point, About. One primary green CTA button: **"Get started"**. Smooth-scroll to sections.

### 2. Hero (full viewport)
- Full-bleed natural background (landscape with a home, or water). Subtle slow zoom (Ken Burns) or gentle parallax.
- Big bold headline: **"Grounded by design. Elevated by experience."**
- Subhead: one line on the invisible, worry-free septic system.
- Single primary CTA: **"Get started"**. Secondary ghost link: "See how it works".
- A subtle scroll-cue at the bottom.
- Keep it Tesla-minimal: very little text, lots of space, confident type.

### 3. The problem, then the turnkey solution (TOP PRIORITY SECTION)
This section must make the turnkey promise unmistakable.
- Intro: the homeowner headache, framed honestly. Juggling multiple contractors, soil testers, installers, maintenance crews, paperwork. Stress and uncertainty.
- Resolution: **"One partner. Every step."** Ecoflo manages the entire lifecycle so the homeowner does nothing but live their life.
- Present it as a clean flow that visually collapses the "many contractors" mess into "one Ecoflo." Animate the consolidation on scroll: multiple scattered icons converging into a single Ecoflo mark.

### 4. Impact counter (wow moment, animated stats)
- A bold full-width band, Ecoflo green or navy background.
- Centerpiece: **live odometer-style counter of litres of wastewater filtered**, ticking up in real time. Seed with an impressive illustrative figure (e.g. start near `2,500,000,000` litres) and increment continuously at a believable rate (roughly +700 litres/second) using requestAnimationFrame, with a smooth rolling-digit animation. Label it clearly as an illustrative figure.
- Supporting stat tiles, each counting up when scrolled into view (Framer Motion `whileInView` + react-countup):
  - **100,000+** systems installed
  - **30** years of proven performance
  - **0 kWh** energy used to treat your water (ties to the "no energy" differentiator)
  - **[N]** active Service Points (derive from the map data count)

### 5. The journey (turnkey, scroll-driven reveal)
Four steps that build progressively as the user scrolls. Each step: icon, title, one-line description. Connect them with an animated line that draws as you scroll.
1. **Soil test and design**: we assess your land and design the right system
2. **Installation**: delivered and installed by your local Service Point
3. **It disappears**: the system goes underground, your yard stays your yard
4. **Lifetime care**: proactive maintenance, monitoring, and support, handled for you

Reinforce that all four are delivered by Ecoflo, not third parties.

### 6. The signature transition: the system disappears
This is the standout creative moment. A scroll-pinned sequence:
- As the user scrolls, an illustrated or photographic Ecoflo unit lowers into the ground, soil fills in, and grass and landscape grow over it until the system is completely invisible and the yard looks pristine.
- Use Framer Motion `useScroll` + transforms (translateY, opacity, scale, clip-path or layered images) tied to scroll progress within a tall pinned container.
- Payoff line appears at the end: **"The best technology is the kind you never think about."**
- If full photographic execution is too heavy, implement it with layered SVG or illustration shapes (unit, soil layers, grass) animated on scroll. Keep it smooth and performant.

### 7. App teaser inside an iPhone (accessibility via app)
Show that the Ecoflo experience is in the homeowner's pocket.
- Render a clean **iPhone frame** (CSS device mockup, no external lib needed) on one side, marketing copy on the other.
- Inside the screen, show a Tesla-app-inspired minimal dashboard for the Ecoflo app:
  - System status: "All good" with a green indicator
  - Litres treated this month
  - Next scheduled maintenance date
  - A "Contact your Service Point" button
  - A simple project timeline (Soil test, Installed, Active care) with checkmarks
- Subtle animation: the screen content fades and slides in, the status indicator gently pulses.
- Copy emphasis: everything tracked, transparent, in one app. No phone calls, no chasing.

### 8. Service Point map (wow moment, interactive)
- Full-width interactive map (react-leaflet + CartoDB Voyager tiles).
- Plot about 20 mock Service Points across the two target regions:
  - **North America**: Quebec (Montreal, Quebec City, Sherbrooke, Trois-Rivieres, Gatineau), Ontario (Ottawa, Toronto), Atlantic Canada (Halifax, Moncton), US Northeast (Burlington VT, Portland ME, Albany NY)
  - **Europe**: UK zones (Manchester for North, Birmingham for Midlands, London for South, Exeter for South West), France (Paris, Lyon, Bordeaux, Nantes, Rennes)
- Generate a typed mock dataset in `/src/data/servicePoints.ts`: each point has name, region, approximate lat/lng, and a `coverageRadiusKm` between 150 and 250.
- Custom markers in Ecoflo green that **pulse** (animated ring). On load or on scroll-into-view, animate the **coverage radius circles** expanding outward from each point.
- Click a marker: small branded popup with the Service Point name, region, and "turnkey service available here".
- Above the map: headline like **"A local team near you, everywhere we operate."** Reinforce the local plus turnkey angle.
- Disable scroll-zoom for scroll comfort; allow click and drag. Set a default view that frames both NA and Europe, or provide two toggle buttons (North America / Europe) that fly the map to each region.

### 9. Trust and compliance
- Brief testimonial cards (mock homeowners), a row of certification and compliance badges (placeholders), and a line on environmental protection and regulatory compliance. Keep it clean and credible.

### 10. Final CTA
- Strong closing band. Headline: **"Ready for a septic system you'll never have to think about?"**
- Primary CTA: **"Find your Service Point"** (scrolls to the map) and **"Get started"**.

### 11. Footer
Ecoflo wordmark, "30 years of making a difference", minimal link columns, a Premier Tech Water & Environment line, copyright. Clean and understated.

---

## Animation and feel guidance

- Section reveals: subtle fade plus rise on scroll-into-view (Framer Motion `whileInView`, staggered children).
- Generous whitespace, large type, calm pacing. Premium, not busy.
- Smooth scroll. No aggressive scroll-jacking except the one pinned "disappear" sequence in section 6.
- Respect `prefers-reduced-motion`: disable heavy motion and counters for users who opt out.
- 60fps target. Prefer transforms and opacity over layout-triggering properties.

---

## How to proceed

1. Scaffold the Vite + React + TS + Tailwind project, configure the brand palette and Plus Jakarta Sans, init git, make the first commit.
2. Show me the planned component and file structure and the section build order before going deep, then build section by section, committing after each.
3. Flag any step that is unusually heavy (the section 6 pinned sequence is the main one) before spending a lot on it.
4. Use mock data throughout, clearly labeled. No backend.
5. End with run instructions (`npm install`, `npm run dev`) and Vercel deploy steps.

Build something that makes the room go quiet for a second. That is the goal.
