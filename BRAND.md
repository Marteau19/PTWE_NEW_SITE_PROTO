# BRAND.md: Ecoflo / Premier Tech brand reference

Canonical brand spec for the Ecoflo D2C website prototype. Follow exactly.
Source: official Ecoflo and Premier Tech graphic standards (Premier Tech Ltd., 2020).

---

## Colors

### Ecoflo green (primary brand color)
| Spec | Value |
|---|---|
| HEX | `#64A70B` |
| RGB | 100, 167, 11 |
| Pantone | 369 C (coated) / 376 U (uncoated) |
| CMYK coated | 58 / 0 / 100 / 4 |
| CMYK uncoated | 55 / 0 / 100 / 3 |

Use for: the Ecoflo wordmark, primary CTAs, key stats, accents, active states, map markers.

### Premier Tech navy (headings / ink)
| Spec | Value |
|---|---|
| HEX | `#041E42` |
| RGB | 4, 30, 66 |
| Pantone | 282 C |
| CMYK coated | 100 / 73 / 0 / 73 |

Use for: headings, body ink, dark section backgrounds, footer. This is the official parent-brand navy and the heading color across Ecoflo materials.

### Supporting palette (for the prototype)
| Token | HEX | Use |
|---|---|---|
| Green dark | `#4E8208` | hover, pressed states, depth |
| Green tint | `#EAF3DE` | soft section backgrounds, chips |
| Body text | `#3A4A50` | paragraph text |
| White | `#FFFFFF` | primary background |
| Warm off-white | `#F7F6F1` | alternating section background |

Tailwind token suggestion: `eco-green`, `eco-green-dark`, `eco-green-tint`, `eco-navy`, `eco-body`, `eco-offwhite`.

---

## Logo usage

### Approved versions
- Color: Ecoflo green wordmark on white or light background
- Reverse: white wordmark on the Ecoflo green block, on navy, or on dark photography
- Black and white: black wordmark (single-color contexts only)

### Clearance space
Maintain clear space of **X/3** on all sides, where **X** is the cap height of the wordmark. Nothing intrudes into this margin.

### Minimum sizes
- With registered or trademark symbol: 9 mm (0.375 in) high
- Without symbol: 3 mm (0.125 in) high
- On web, keep the wordmark comfortably above these equivalents; never render it cramped.

### Do not
- Do not change the logo color
- Do not deform or stretch it
- Do not add an outline
- Do not place it on a busy or low-contrast background that hurts readability

### Logo files
Use `/public/brand/ecoflo-logo.png` (color, transparent background, high-res). For dark or green backgrounds, use `/public/brand/ecoflo-logo-white.png` if available, or apply a CSS filter to produce a clean white version. Render as an image; never redraw the wordmark.

### Fallback (no logo file present)
Render the wordmark as styled text "ECOFLO" in Ecoflo green (`#64A70B`), bold, with a small registered-trademark mark. Pair with a "30 years of making a difference" lockup where the layout calls for it.

---

## Typography

- Primary typeface: **Plus Jakarta Sans** (Google Fonts) for all text.
- Headings: weight 600 to 800, tight tracking, navy (`#041E42`). Large and confident, Tesla-style.
- Body: weight 400, line-height 1.7, body color (`#3A4A50`).
- Sentence case for body. Headlines may be bold and oversized.

---

## Voice and messaging

**Positioning headline:** "Grounded by design. Elevated by experience."

**Core promise:** the turnkey solution. One partner, every step, from soil test to lifetime maintenance. The homeowner never juggles contractors again.

**Proof points (approved copy):**
- Trusted since 1995. 30 years of making a difference.
- 100,000+ property owners across North America trust Ecoflo.
- Filters made of 100% natural, renewable, compostable coconut husk fragments.
- No energy required for treatment.
- A physical barrier that removes pollutants and protects the property and environment.

**Tone:** sustainable, natural, calm, worry-free, credible. Premium without being cold. The product is invisible by design, and that is the point.

---

## Brand relationship

- **Ecoflo** is the consumer-facing product and service brand.
- **Premier Tech Water & Environment (PTWE)** is the business unit.
- **Premier Tech (PT)** is the parent group; its navy is the shared ink color.
- A discreet "A Premier Tech brand" or "Premier Tech Water & Environment" line in the footer is appropriate. Do not let parent branding compete with Ecoflo in the main content.
