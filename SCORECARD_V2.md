# XL v2 — Verification & Scorecard (Phase 4, 2026-11-15)

Method: Lighthouse 13.6.0 lab runs (headless Chromium) + real Chrome via chrome-bridge
(`pine` profile) for E2E. Two serving modes measured because the single-file page is
served **gzipped by GitHub Pages** (`Content-Encoding: gzip`, live `Content-Length`
453,877 B) but the local `python http.server` preview is not:

- **plain** = `http://127.0.0.1:8769/index.html` (no compression — pessimistic lab)
- **gzip** = `http://127.0.0.1:8770/index.html` (local gzip server, byte-for-byte same
  compression path as Pages — production-representative)

## Release gates (from contract)
| Gate | Target | Result |
|---|---|---|
| Weighted score | >= 90/100 | **85.75/100 — FAIL** (rubric floor 85 met) |
| Every dimension | >= 8.5/10 | **FAIL** — Content & conversion 8.0 is the only sub-8.5 dimension |
| P0/P1 defects | 0 open | PASS (v2 fixes verified; 2 a11y + 2 perf defects fixed this phase) |
| Responsive | 360/390/768/1024/1440/1920 no overflow | PASS (all six measured) |
| Keyboard/focus | visible focus | PASS (`:focus-visible` 2px accent, real Tab) |
| Reduced motion | no new motion | PASS (emulated reduce: xl off, boot skipped, no cursor) |
| Lighthouse perf | >=85 mobile / >=90 desktop | **PASS** — mobile **87**, desktop **100** (gzip); plain-server mobile 68 / desktop 98 |
| Lighthouse a11y | >=95 | **PASS — 100** (both modes; was 96) |
| Lighthouse BP / SEO | >=95 / >=90 | **PASS — 100 / 100** |
| Core Web Vitals field data | LCP<=2.5s etc. | LAB ONLY (no field data; reported as lab) |

## Lighthouse numbers (post-fix, this phase)
| Metric | mobile gzip | desktop gzip |
|---|---|---|
| Performance | **87** | **100** |
| Accessibility | **100** | **100** |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |
| FCP | 3.1 s | 0.6 s |
| LCP | 3.2 s | 0.7 s |
| TBT | 100 ms | 0 ms |
| CLS | 0 | 0 |
| Speed Index | 3.1 s | 0.6 s |
| TTI | 3.3 s | 0.7 s |
| Transfer | 446 KiB | 446 KiB |
| Main-thread work | 2.8 s | 0.8 s |

Mobile perf is network-bound in the lab: LH mobile throttles to 1.6 Mbit/s, so 446 KiB
alone is ~2.2 s. On real 4G/5G this is sub-second.

## Defects fixed this phase (verified by re-run)
1. `aria-prohibited-attr` — `<pre id="code-lab-code">` carried `aria-label` on a generic
   role. Removed; the surrounding tab/heading already describes the panel. **a11y 96 → 100.**
2. `label-content-name-mismatch` (19 nodes) — `.resume-link` accessible name now contains
   its visible text; `.glx-node` buttons no longer carry an `aria-label` that contradicted
   their visible label. **audit now clean.**
3. Forced reflow in `drawEdges()` — `map.clientWidth/scrollHeight` read *after*
   `svg.replaceChildren()`; measurement moved ahead of the DOM mutation.
4. Per-scroll layout read — `updateProgress()` read `documentElement.scrollHeight` on
   every scroll event; now cached and recomputed on `resize`.

## E2E (real Chrome, `pine` profile, preview 8769)
- Case dialog: click `.case-link[data-case=genlogin]` → `open=true`, focus moves to
  `#case-close`, `aria-modal=true`; trusted `Escape` → `open=false`. **PASS**
- Contact: click `#contact-copy-email` → `#contact-copy-feedback` = "Email copied". **PASS**
- GenLogin explorer: 18 nodes / 21 edges rendered; node click → detail opens,
  `is-selected` set. **PASS**
- Code-lab walkthrough types into `#code-lab-code` on scroll-into-view. **PASS**
- `window.__errs` after a full journey (reload + scroll + dialog + copy + explorer):
  **0 errors**; console hook empty. **PASS**

## Dimension scores
| Dimension | Weight | Score | Evidence / gap |
|---|---:|---:|---|
| Creative direction & originality | 20 | 8.5 | Identity tokens preserved (#f7f7f5/#7a0019/#151515, Inter/Geist+mono, 1280px); motion spec adopted; additive-only strategy limits bolder re-direction. |
| Motion & meaningful interactions | 20 | 8.5 | 16-effect system; P0 fixes verified; core journeys now E2E-exercised (dialog, copy, explorer, code-lab, reduced-motion). Background-tab rAF throttling still unverified. |
| Visual craft | 15 | 8.5 | Contrast body 17.0:1 / muted 4.7:1 (AA); `text-wrap:balance`; ~30 legacy font sizes remain. |
| Performance & engineering | 15 | 8.5 | LH 100 desktop / 87 mobile(gzip); CLS 0; TBT ≤100 ms. Gaps: 65% of CSS reported unused (64,692 B), CSS+JS unminified (~37 KiB savable), one 94 ms forced reflow in the explorer layout. |
| Accessibility | 10 | 9.5 | LH a11y **100** both modes; 1 H1/page; heading order correct; 7/7 images alt; `aria-current`; focus-visible; reduced-motion. No axe-core run. |
| Responsive & touch | 10 | 8.5 | Zero horizontal overflow at six widths; touch alternatives coded; cursor/parallax off on coarse pointers. Touch walkthrough not recorded. |
| Functional completeness | 5 | 8.5 | 0 dead anchors; 64 focusables; E2E journeys clean. Gap: workflow-index markup absent → orphan CSS/JS remains (see open items). |
| Content & conversion clarity | 5 | 8.0 | Content preserved; CTAs present; contact journey E2E-passes. Case studies still thin on outcomes. |

Weighted = .20·8.5+.20·8.5+.15·8.5+.15·8.5+.10·9.5+.10·8.5+.05·8.5+.05·8.0 = **85.75**

## Iteration history
1. Baseline (pre-XL): rubric 8.66/10 style audit; scrolling works; no motion system.
2. Option C + iOS arrows + QA polish: additive layer, focus trap, keyboard shortcuts.
3. XL v2 P0: boot-skip lifecycle, script-boundary repair, counter whitelist, single active-section source.
4. **Phase 4**: real Lighthouse (2 modes × 2 form factors), a11y 96→100, 2 perf defects fixed, full E2E journey with 0 console errors.

## Open items
- **P1 (blocking 90):** weighted 85.75 < 90. Lifts available: strip 64.7 KB unused CSS,
  minify CSS/JS (~37 KB), remove the 94 ms explorer reflow, restore/remove the missing
  workflow-index block.
- **P1:** Core Web Vitals field data (CrUX) — needs real traffic on the pushed Pages URL.
- **P2:** axe-core scan (LH a11y 100 is a strong proxy, not a substitute).
- **P2:** Touch/coarse-pointer walkthrough not recorded.
