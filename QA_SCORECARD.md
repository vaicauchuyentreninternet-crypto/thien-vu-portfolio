# QA Scorecard — Portfolio (Nguyễn Thiên Vũ)

- Date: 2026-11-15
- Version: live main `8c425b8` + polish (`text-wrap:balance`, theme-color)
- URL: https://vaicauchuyentreninternet-crypto.github.io/thien-vu-portfolio/
- Method: deterministic checks in headless Chromium (DOM/contrast/overflow) + mobile emulation (390×844), rubric `ui-ux-review-rubric`.

## Scores (0–10)

| # | Criterion | Score | Evidence |
|---|-----------|-------|----------|
| 1 | First impression / visual system | 9.0 | Distinct editorial light system (#f7f7f5 ink on paper, maroon accent #7a0019); not a generic card layout. Identity tokens preserved from original. |
| 2 | Typography & spacing rhythm | 8.5 | Clear hierarchy H1→H2→H3, one H1/page, clamp-based fluid sizes; added `text-wrap:balance`. Minor noise: ~30 distinct font-sizes inherited from legacy sections (documented, non-blocking). |
| 3 | Color & contrast | 9.2 | Measured: body 17.02:1, footer/meta 4.70:1, `.label` on dark 5.95:1 — all ≥ WCAG AA. |
| 4 | Motion with purpose | 8.7 | Boot intro has visible **Skip intro** button; reveal animations short with custom easing; `prefers-reduced-motion` honored inside the XL layer (verified present). |
| 5 | Micro-interactions & feedback | 8.7 | Hover/focus-visible states on nav/links/buttons; XL layer adds magnetic buttons, spotlight hover, focus trap + ESC in dialog; consistent loading/empty handling via existing components. |
| 6 | Responsive everywhere | 9.6 | `scrollWidth == innerWidth` at 320 / 390 / 768 / 1440; internal scrolling for tables/dialog. |
| 7 | Performance | 7.2 | Single self-contained HTML (~866KB raw, no external JS/CSS/fonts) — offline-friendly but heavy first paint; below-fold images already `loading=lazy`, portrait uses `fetchpriority=high`. Non-critical. |
| 8 | Accessibility | 8.8 | 1 H1/page, correct heading order, skip-intro focusable button, focus-visible outlines, decorative SVG arrows marked `aria-hidden`. |
| 9 | Content clarity & tone | 8.5 | English brand voice (intentional for this portfolio), labeled data points; Vietnamese used in product/nav labels consistent with owner's market. |
| 10 | Craft consistency | 8.4 | One radius/shadow/border system from original tokens; XL additions prefix-scoped (`xl-`) and non-destructive. |

**Average: 8.66 / 10** — target ≥ 8.5 met. No critical defect found.

## Fixes applied this round
1. iOS emoji arrows → inline SVG nav arrows + text-presentation selector (all 16 arrow usages).
2. `text-wrap:balance` on headings; `theme-color` meta.
3. Option C additive motion/interaction layer installed (commit `5ea86e4`), identity tokens untouched.

## Known non-blocking items
- Single-file weight (~866KB) could be split/minified later; acceptable now.
- Legacy sections carry ~30 font-sizes; unifying them risks touching the frozen identity — defer.
