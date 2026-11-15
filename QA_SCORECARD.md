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

---

# Addendum — Phase 4 re-score (2026-11-15, XL v2 @ `8faaaaa` + Phase-4 fixes)

- Method: Lighthouse 13.6.0 lab (mobile + desktop, plain **and** gzip serving) + real-Chrome
  E2E via chrome-bridge. Full detail in `SCORECARD_V2.md`.
- Serving note: GitHub Pages gzips (`Content-Encoding: gzip`, live `Content-Length` 453,877 B),
  so the **gzip** column is the production-representative one.

## Scores (0–10)
| # | Criterion | Was | Now | Evidence |
|---|-----------|-----|-----|----------|
| 1 | First impression / visual system | 9.0 | 9.0 | Unchanged identity tokens; LH SEO/BP 100. |
| 2 | Typography & spacing rhythm | 8.5 | 8.5 | ~30 legacy font sizes documented, non-blocking. |
| 3 | Color & contrast | 9.2 | 9.2 | body 17.02:1, footer/meta 4.70:1, label-on-dark 5.95:1 (AA). |
| 4 | Motion with purpose | 8.7 | 8.7 | Boot Skip intro; reduced-motion off-switch re-verified. |
| 5 | Micro-interactions & feedback | 8.7 | 9.0 | E2E: case dialog (focus→close, ESC), copy-email feedback "Email copied", explorer node select. |
| 6 | Responsive everywhere | 9.6 | 9.6 | `scrollWidth == innerWidth` at 320/390/768/1440; CLS 0 in LH. |
| 7 | Performance | 7.2 | 8.5 | LH perf **100 desktop / 87 mobile** (gzip, production-like); plain-server mobile 68. |
| 8 | Accessibility | 8.8 | 9.5 | LH a11y **100** (was 96); fixed `aria-prohibited-attr` + 19 `label-content-name-mismatch`. |
| 9 | Content clarity & tone | 8.5 | 8.5 | Copy unchanged; contact journey E2E-passes. |
| 10 | Craft consistency | 8.4 | 8.5 | One radius/shadow/border system; XL additions `xl-` prefixed. |

**Average: 8.90 / 10** (was 8.66) — target ≥ 8.5 met; no critical defect.

## Fixed this round
1. `<pre id="code-lab-code">` invalid `aria-label` removed → `aria-prohibited-attr` clean.
2. Accessible-name mismatches: `.resume-link` label now contains its visible text;
   `.glx-node` buttons no longer override their visible label → audit clean (19 nodes).
3. `drawEdges()` forced reflow (measure-before-mutate).
4. `updateProgress()` per-scroll `scrollHeight` read cached (recomputed on resize).

## Still open
- Weighted release score 86.75 < 90 (contract gate) — the residue is the three 8.5 design
  dimensions; see `SCORECARD_V2.md` Phase 5.
- Core Web Vitals **field** data unavailable (lab only); touch walkthrough unrecorded.

---

# Addendum — Phase 5 (2026-11-15, minification)

- Inline CSS (CleanCSS L1) + JS (Terser whitespace-only) + embedded JSON minified:
  **852,630 → 811,486 B** raw; gzip document **446 → 439 KiB**.
- `unminified-css` / `unminified-javascript` Lighthouse audits: now clean.
- **Identity parity:** computed styles of 15 selectors (font-family/size/weight, colour,
  background, line-height, margin/padding, radius, letter-spacing, display, rect) compared
  original vs minified in real Chrome → **0 differences**; `scrollHeight` 20,545 both; same
  image set; same `js xl-enabled` / `boot-complete` classes.
- **Behaviour parity:** dialog open→focus `#case-close`→`aria-modal`, close button closes,
  copy-email feedback, GLX 18 nodes / 21 edges, node select + detail, **0 console errors** —
  identical on both versions.
- Lighthouse after minification: mobile **87** / desktop **100**, a11y 100, BP 100, SEO 100.

| # | Criterion | Was | Now | Evidence |
|---|-----------|-----|-----|----------|
| 7 | Performance | 8.5 | 9.0 | LH 100 desktop / 87 mobile gzip; audits clean; 439 KiB; CLS 0; TBT ≤100 ms. |
| 9 | Content clarity & tone | 8.5 | 8.5 | Case dialog renders 4 results · 2 before/after · 6 facts · 3 lessons · 3 decisions · 11 architecture steps · 2 artifacts. |

**Average: 8.90 / 10** (unchanged) — target ≥ 8.5 met; no critical defect.
Weighted release score moves 85.75 → **86.75**; the ≥90 contract gate stays open and now
clearly needs a design decision rather than engineering cleanup.
