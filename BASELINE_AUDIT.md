# Phase 0 — Baseline Audit (2026-11-15)

Subject: https://vaicauchuyentreninternet-crypto.github.io/thien-vu-portfolio/ (local preview http://127.0.0.1:8769)
Stack: static single-file HTML/CSS/JS (no build step, no framework). Deployment: GitHub Pages.
Method: headless Chromium via CDP emulation, deterministic DOM probes. All numbers below were actually measured.

## Inventory (measured)
- Sections (24): hero, scale-signal, operational-impact, audited-evidence, automation-lab, live-system, work, glx, applied-ai, web-work, experience, live-build, capabilities, about, vision, (unnamed section), after-hours, contact + 8 case-blocks.
- Assets: 7 images, all with `alt`; portrait uses `fetchpriority=high`, rest `loading=lazy`.
- Links: 11 external links; internal anchors — **0 dead anchors** (verified against DOM ids).
- Interactive elements: 78 (links/buttons/inputs/tabindex). One hidden `#glx-copy` button reports empty innerText while its panel is closed — not a defect.
- Headings: 1 H1 per page; order H1→H2→H3 verified (headOrder sample).
- Payload: CSS ~200KB inline, JS ~571KB inline, total document ~866KB raw (single file, gzip-friendly).
- Removed in this round: SKU decoder widget, email/consent validator widget (+ orphan CSS/JS/copy).

## Known risks / opportunities (pre-upgrade)
- Motion exists but is ad-hoc across sections (no shared timing/easing vocabulary); Option C added an `xl-` additive layer without a written motion system.
- Single-file payload is large for first paint (no code-splitting possible in this deployment model).
- No Lighthouse available locally → will attempt CDP-based metrics; otherwise mark `NOT VERIFIED`.
- Accessibility: focus-visible present, reduced-motion honored in `xl-` layer; full keyboard walkthrough pending.

## Baseline evidence
- Desktop 1440×900: scrollWidth 1425 ≤ 1440 (no horizontal overflow).
- Mobile 390×844: scrollWidth 390 = 390 (no horizontal overflow).
- Screenshots: browser-use workspace shot (desktop) captured 2026-11-15.

## Verdict
Baseline is functional and coherent; main gap vs the acceptance contract is **motion/interaction intent** (needs the Interaction & Motion Design System) and **measurable verification** (Lighthouse/Core Web Vitals, keyboard/reduced-motion walkthroughs).
