# XL v2 — Verification & Scorecard (Phase 3, 2026-11-15)

Method: headless Chromium (CDP emulation) + real Chrome profile via chrome-bridge.
Every score below cites measured evidence; untested items are marked `NOT VERIFIED`.

## Release gates (from contract)
| Gate | Target | Result |
|---|---|---|
| Weighted score | >= 90/100 | **81.25/100 — FAIL** |
| Every dimension | >= 8.5/10 | **FAIL** (Performance 7.0) |
| P0/P1 defects | 0 open | PASS after v2 fixes (boot skip, script boundary, counter, nav source) |
| Responsive | 360/390/768/1024/1440/1920 no overflow | PASS (all six measured) |
| Keyboard/focus | visible focus | PASS (`:focus-visible` 2px accent outline via real Tab) |
| Reduced motion | no new motion | PASS (emulated reduce: xl disabled, boot skipped, no cursor) |
| Lighthouse | perf>=85 mobile / >=90 desktop, a11y>=95, BP>=95, SEO>=90 | **NOT VERIFIED** (tooling not installed; no fake pass) |
| Core Web Vitals field data | LCP<=2.5s etc. | **FIELD DATA NOT AVAILABLE** (lab only possible) |

## Dimension scores
| Dimension | Weight | Score | Evidence / gap |
|---|---:|---:|---|
| Creative direction & originality | 20 | 8.5 | Identity tokens preserved (#f7f7f5/#7a0019/#151515, Inter/Geist+mono, 1280px); motion spec adopted (MOTION_SYSTEM_SPEC.md); additive-only strategy limits bolder re-direction. |
| Motion & meaningful interactions | 20 | 8.0 | 16-effect system defined; P0 fixes verified (single active-section source, boot-skip lifecycle, counter whitelist, reduced-motion). Full choreography not all exercised live (background-tab rAF throttling); several effects NOT individually verified. |
| Visual craft | 15 | 8.5 | Contrast body 17.0:1 / muted 4.7:1 (AA); `text-wrap:balance`; iOS emoji-arrow bug fixed; ~30 legacy font sizes remain. |
| Performance & engineering | 15 | 7.0 | Single 866KB file (CSS ~200KB/JS ~571KB inline, unminified); no external deps; lazy images. No build step; no Lighthouse/lab metrics. |
| Accessibility | 10 | 8.5 | 1 H1/page; heading order correct; 7/7 images alt; aria-current on nav; focus-visible verified; reduced-motion verified. axe/Lighthouse a11y NOT VERIFIED. |
| Responsive & touch | 10 | 8.5 | Zero horizontal overflow at all six widths; touch alternatives coded (no hover dependency; parallax/cursor disabled on coarse pointers). Touch walkthrough not recorded. |
| Functional completeness | 5 | 8.0 | 0 dead anchors; 64 focusables; workflow filter script repaired; demo widgets removed by design. Case-dialog open/close E2E not run this phase. |
| Content & conversion clarity | 5 | 8.0 | Content preserved; CTAs present; code-lab kept as value content. Contact journey not E2E-tested. |

Weighted = .20*8.5+.20*8.0+.15*8.5+.15*7.0+.10*8.5+.10*8.5+.05*8.0+.05*8.0 = **81.25**

## Iteration history
1. Baseline (pre-XL): rubric 8.66/10 style audit; scrolling works; no motion system.
2. Option C + iOS arrows + QA polish: additive layer, focus trap, keyboard shortcuts; responsive passes.
3. **XL v2 P0**: fixed (a) boot-skip stale timers, (b) duplicate script boundary regression that broke workflow filters, (c) counter regex -> explicit whitelist, (d) dual nav/index sources -> single controller. Verified: nav+index sync at y=3124, skip forced state, reduced-motion off-switch.

## Open items (blocking 90/100)
- P1: Install/run Lighthouse (or equivalent lab) and record results; profile main-thread long tasks.
- P1: Exercise case dialog + contact/copy actions E2E; verify no uncaught console errors during full journey.
- P2: Minify inline CSS/JS or accept documented trade-off (single-file Pages model).
- P2: axe-core scan if available.
