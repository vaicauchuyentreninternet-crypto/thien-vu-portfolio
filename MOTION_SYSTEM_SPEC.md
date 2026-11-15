# Interaction & Motion Design System — Portfolio (XL Motion Specification)

Source: ChatGPT brief "Interaction & Motion Design System" (Round 2), 2026-11-15.
Status: Phase 1 design contract. Implementation tracked in `XL_TRACKER.md`.

## Art direction (one paragraph)
Editorial Engineering × Interactive Storytelling. Keep the original identity untouched
(#f7f7f5 paper, #7a0019 accent, #151515 ink, white surface; Inter/Geist + mono; max-width 1280px).
Motion is a storytelling tool: it guides attention, signals state, and rewards exploration —
never decoration. Peaks (hero/boot, GenLogin Explorer, Live Code Lab, Aim Trainer) alternate
with calm sections that rely on typography, whitespace, counters and small states.

## 1. Motion vocabulary
Easings (only two):
- Primary: `cubic-bezier(.22,.61,.36,1)` — reveals, magnetic, parallax transitions, navigation, dialog entrance.
- Secondary: `cubic-bezier(.4,0,.2,1)` — hover feedback, dialog close, counters, button states.
- Exception: `linear` only for scroll-linked progress, code playback, cursor-follow.
- No elastic/bounce/spring overshoot.

Duration scale:
| Group | ms | Use |
|---|---|---|
| Instant | 0–100 | state updates, active states |
| Micro | 120–180 | buttons, nodes, status feedback |
| Interaction | 200–350 | hover, spotlight, dialog |
| Transition | 400–500 | magnetic return, small scene changes |
| Reveal | 600–800 | headings, content, sections |
| Sequence | 1.5–2.5s | boot / opening story |

Stagger: standard **70ms** (allowed 60–90ms), max 4 elements per beat. Never stagger all 17 sections in one continuous chain.

Peak vs Calm:
- PEAK (20–30%): hero/boot, automation-lab, live-system, work, glx, live-build, aim trainer.
- CALM (70–80%): evidence, applied-ai, web-work, experience, capabilities, about, vision, after-hours, contact.
- Golden rule: **one dominant effect per viewport, at most one secondary.** Cursor, magnetic, spotlight, parallax and reveal must never compete.

## 2. Interaction library (16 effects)
Group A — Global/navigation: (01) boot→hero choreography ~2s + 650ms hero, primary; (02) scroll progress hairline scaleX linear; (03) smart nav + working index active state 180–260ms secondary; (04) anchor travel 550–850ms primary; (05) reveal choreography opacity+translateY≤20px 680ms stagger 70ms primary; (06) evidence counters count-up 900–1100ms secondary, format preserved; (07) hero depth parallax ≤0.08–0.105× scroll distance linear (disabled on coarse pointers).

Group B — Cursor/spatial: (08) dual custom cursor dot+ring, ring 37→55px 280ms secondary (desktop only); (09) magnetic + action feedback translate ≤6px, return 480ms; copied state 160ms; (10) spotlight hover radial gradient following pointer 260–300ms secondary.

Group C — Interactive tools: (11) workflow node selection active/path highlight 160–220ms primary (cost: high on large graphs); (12) SKU lab interaction — removed from build (demo dropped 2026-11-15), do NOT restore; (13) live code playback line reveal 25–40ms/line linear; (14) aim trainer response target/hit/score 120–180ms secondary.

Group D — Dialog/feedback: (15) case dialog fade+translateY≤12px open 260ms close 180ms backdrop blur ≤2px; (16) interaction status feedback via live region, instant state update + optional 160ms visual.

Every effect requires: reduced-motion alternative (static/instant), touch alternative, and known performance cost.

## 3. Section allocation
scale-signal: counters+reveal (peak nhẹ) · operational-impact: metric reveal (calm) · audited-evidence: evidence reveal+counter (calm) · automation-lab: control-flow interaction+spotlight (peak) · live-system: node selection+progress (peak) · work: index/case interaction+magnetic (peak) · glx: interactive graph+node focus (peak) · applied-ai: editorial reveal (calm) · web-work: case preview+spotlight (calm) · experience: timeline reveal+stagger (calm) · live-build: code playback+log (peak) · capabilities: group reveal+hover (calm) · about: narrative reveal+stagger (calm) · vision: typography reveal, no parallax (calm) · after-hours: controlled ambient (calm) · contact: CTA feedback+copy confirmation (calm).

## 4. Coordination
Layers: L1 Global (progress/cursor/status) · L2 Scroll orchestration (nav/reveal/counters/parallax, one scheduler) · L3 Pointer (magnetic/spotlight/cursor, precise-pointer only) · L4 Focused experiences (genlogin/code/aim/dialog, only when active/visible).
Perf rules: animate transform/opacity only; progress uses scaleX; pointer updates rAF-batched; one scroll scheduler; IntersectionObserver with unobserve; counters whitelist only; graph updates selected node + related edges only; aim loop only when active+visible; backdrop blur ≤2px; no re-render whole DOM on hover; `will-change` only transiently.
Non-overlap: no magnetic on parent+child simultaneously; spotlight background only; cursor never replaces keyboard focus; parallax paused while interacting with graph; counters never replay; dialog open pauses background motion; user scroll/touch cancels running scroll tweens.

## 5. Implementation matrix
P0 (immediate, low risk): progress hairline upgrade, smart nav + work index sync, section reveal allowlist, desktop-only cursor, magnetic ≤6px, spotlight selected cards, `#xl-status` live region, reduced-motion/touch behavior.
P1: boot skip lifecycle; GenLogin 2,489-node performance; Live Code Lab + Aim Trainer; case dialog + keyboard accessibility.
P2: profiling on weak hardware; Lighthouse + axe audit.

## 6. Three known defects to fix (from code review)
1. **Boot Skip leaves stale callbacks** — XL skip hides boot via queueMicrotask while original `finishBoot()` setTimeout chain still mutates classes and calls `runHeroMetrics()`. Fix: single boot lifecycle, cancel all boot timeouts on skip, one `bootFinished` flag, metrics run once.
2. **Counter detection via text regex** — currently scans strong/b/span/output for patterns like 19, 200+, 2,489 and may animate non-KPI numbers. Fix: explicit whitelist `<strong data-xl-count="200" data-xl-format="plus">200+</strong>`; never scan text nodes; don't touch `[data-count]`/`[data-hero-count]`; run once; preserve original format after finish.
3. **Two sources of truth for active section** — `#nav` and `#work-index` compute independently and can disagree. Fix: one `activeSectionController` (single IntersectionObserver) updating nav, index, anchor navigation and keyboard shortcuts; no separate scroll listeners.

## 7. Definition of Done (per iteration)
Visual consistency (no palette/font/spacing drift) · motion consistency (two easings, correct duration vocabulary) · responsive 1440/768/390/320 no overflow · reduced-motion: no new motion · keyboard: no focus theft, no conflict with inputs/games · touch: no hover dependency, no scroll blocking · performance: no idle animation loops · core features: all sections, 8 case dialogs and original tools keep working · console: no uncaught errors, no duplicate listeners/timers · regression: only permitted areas changed.
