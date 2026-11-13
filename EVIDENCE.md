# Evidence ledger — portfolio edition 2026-11-13

## Source-backed from uploaded files

- **19 `.genlogin` workflows** inspected in TOOL GEN.zip.
- **2,489 total nodes**, **51 Eval / EvalV2 action nodes** counted directly from `script.flow.nodes[*].data.action`.
- Largest selected examples: catalog publisher 853 nodes; product scraper 307; catalog content + AI QA 176 (with 256 edges and 36 Eval/EvalV2 steps); media upload 170; inventory reconciliation 133; quantity updates 120; image preparation 113; FAQ publisher 107; LLM content preparation 104.
- `AZ PROJECT` describes a browser workflow connecting ANCARAT back-office product fields with ChatGPT/Gemini-style content actions, files, conditions and JavaScript execution. **Not externally run / tested by this audit.**
- Supplied source artifacts: ANCARAT gold craft HTML prototype, women’s-day GA4 ecommerce landing prototype, Như Ý / An Nguyệt demo HTML.

## Live public website references

- https://ancarat.com/pages/vang-my-nghe-ancarat — public commerce/catalog page observed in web search.
- https://ancarat.com/pages/an-nguyet — public collection chapter observed in web search.
- https://ancarat.com/pages/qua-tang-vang-1-phan — public campaign page found by web search.
- https://ancarat.com/pages/con-rong-chau-tien-ancarat — public editorial product page found by web search.
- Some direct page-fetch attempts returned a web-cache miss; discoverability via the search index was confirmed, but no browser production smoke test was conducted.

## Self-reported career scope (source: original résumé / portfolio)

- 200+ workflows/projects, 20+ code/no-code builds, 200K+ data rows, 10M+ data points. These are **not** independently auditable from the supplied ZIP alone. Keep them attributed as claimed operational scope rather than calculated efficiency improvement.
- 2,000+ catalog records, 1,600+ variants, 200+ attribute groups and 20 primary filters were described in the user's original résumé/portfolio; the uploaded GenLogin graphs alone do not prove these totals.

## Applied AI status

- **Exports inspected:** GenLogin ChatGPT/Gemini browser assistance and image batch automation.
- **Prior collaboration / output artifacts:** evidence-constrained 86-field SEO content schema, product descriptions and landing-page code. Output generation does not prove production CMS publishing.
- **R&D only:** local-first engineering agent concept and setup with Docker, OpenHands Agent Canvas, Ollama / Qwen and Hermes browser tooling. Do not claim deployed autonomous agent.

## Additional measurements needed before independently auditing ROI

For each operational case record before/after median handling time, task volume, exceptions, rate of rework, human approval time, run-success rate, and sample size/date range. Owner-reported single-flow elapsed-time change is summarized below, but independently audited staff-hour savings and terminal-failure outcomes still require those logs. A chart without a clear source would weaken trust.

## Source / privacy controls

Do not upload raw GenLogin exports, profile configuration, cookies, API keys, credentials, private ANCARAT backend screenshots, client records or private dashboard exports to public GitHub. This portfolio publishes only aggregated, sanitized workflow descriptions.

---

## Operational outcomes — owner-reported 2026-11-13

These are **runtime observations supplied directly by the system operator** after the original source-code audit. They are not measurements extracted from `.genlogin` source files or independently verified production logs. Keep their provenance clearly stated when quoting.

| Indicator | Reported observation | Careful interpretation |
|---|---|---|
| Completion time, single workflow | ~60 minutes/product before automation; **under 7 minutes/product** after automation | More than 53 minutes less elapsed processing time per product, or **>88.3% reduction** on the reported average. Not a verified reduction in payroll cost or human hours. |
| Concurrent capacity | **At least 200 completed product records/day** | Multiple concurrent GenLogin browser profiles; work extends to media, categorization, product copy and product attributes. Capacity depends on API quotas, ChatGPT account availability and host machine resources. |
| Manual team baseline | **~50 product descriptions/day by a four-person team** | Bot daily product count is at least 4x this baseline *in volume*, but tasks are **not like-for-like**. Manual scope = descriptions only; automation scope = broader catalog processing. Never infer a fourfold labor-productivity gain from this comparison. |
| Observed exceptions | **24 / 749 = 3.204272...% ≈ 3.20%** | Operator reports exceptions automatically re-enter the queue and are retried. **This is not the final product failure rate**, nor a verified terminal success rate. |
| Built-in verification | Operator reports testing/verification is integrated into the workflow | Exports contain conditional and failure-route structure, e.g. `AZ PROJECT` has 176 nodes, 256 edges, 20 `If` actions and multiple declared fail transitions; source alone does not prove the outcome of production retry runs. |

### What would upgrade these observations to independently auditable results

A redacted runtime dataset with unique product ID, workflow/profile ID, start/finish timestamps, attempt number, queued/running/retry/completed/terminal status, and records of validation. Match the **749** denominator to a defined observation window and unit (products, runs or errors). Retain paired measurements for the manual 60-minute baseline and for the under-seven-minute flow. Maintain separate **first-attempt exception**, **eventual success after retry**, **manual intervention** and **terminal failure** rates. Compare like-for-like tasks when calculating workforce efficiency.

### Public-release guardrails

Do not publish raw catalog, personnel, customer data, service endpoints, credential material, browser profile files or proprietary GenLogin workflows. Do not call 3.20% a "final failure rate", 96.8% a "final success rate", or >88.3% an independently audited labor saving. Public site can cite this summary while making clear it is operator-reported.

## Hermes Agent & Ollama — integration status (reported November 2026)

These observations derive from prior guided configuration sessions and are not present in the GenLogin exports.

- **Hermes Agent**: Windows CLI configuration completed; the `Hermes_Gateway` Scheduled Task was registered (`Status: Ready`) and its gateway process reported running (PID from the session). Local Chromium / `browser_exec` was prepared and a Discord channel was configured. This does not establish that Discord commands were successfully received and executed. Hermes itself is an upstream third-party framework from NousResearch; credit is for local deployment/integration.
- **Ollama**: local Windows Ollama/Qwen setup and resource planning; known workstation constraints were 32 GB RAM and RTX 3060 Ti 8 GB VRAM. Docker/OpenHands Agent Canvas and local-first agent architecture were explored separately. Do not represent this as custom LLM training, a new agent framework authored from scratch, or a released self-operating engineering agent.
- **Verification to collect**: redacted `hermes --version`, `hermes gateway status`, `ollama --version`, `ollama list`, model execution and Discord round-trip test logs; optionally a small reproducible test harness or sanitized configuration. No private token or bot credential should be checked into this repository.
