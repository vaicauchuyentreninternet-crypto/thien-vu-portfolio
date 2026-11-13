# Nguyễn Thiên Vũ — Automation Engineering, Applied AI & Web Systems

A single-file HTML/CSS/JS portfolio. No build pipeline, backend, or third-party JS dependency is required. Upload `index.html` and `Nguyen_Thien_Vu_Resume.pdf` to the repository root and enable GitHub Pages (Deploy from branch, root) if desired.

## Operational outcome update (November 13, 2026)

- Added a standalone results section and expanded GenLogin case study with **~60 minutes -> <7 minutes per complete product** in one workflow, **at least 200 full products/day** with concurrent browser profiles, and **24 exceptions out of 749 observations (~3.20%)** sent back to an automatic retry queue.
- Explained the manual reference point: **four people produce ~50 descriptions/day**, whereas bot capacity covers images, classification, content and attributes. This comparison is not an apples-to-apples labor-efficiency experiment.
- The 24/749 figure counts observed exceptions, **not terminal product failures**. Owner-reported operational outcomes are distinct from source-inspected node counts.
- Replaced generic animated throughput percentages with illustrated stage numbers, avoiding fabricated operational telemetry.

## Portfolio improvements (November 2026)

- Repositioned around **automation engineering**, AI-assisted operations and commerce-focused web systems.
- Added a real GenLogin case study and filterable workflow inventory; counts derived from 19 actual exported workflows (2,489 nodes; 51 Eval/JavaScript actions).
- Added source-grounded AI practice, an 86-field product content/SEO design (prototype) and clearly marked local-agent R&D.
- Added real, usable browser-side SKU parser and email consent validation sandbox.
- Reworded the animated Node.js code/terminal as a **visual walkthrough**, not a running backend.
- Added GitHub link and live ANCARAT pages; moved gaming content after professional experience.
- Replaced numeric counter HTML defaults with actual numbers, plus `noscript` access rules.

## Evidence and limitations

See `EVIDENCE.md` for the precise difference between audited artifacts, self-reported career scale and in-progress experiments. **Do not publish original `.genlogin` files** because they contain internal URLs, workflow metadata, variable names, and possibly client configuration. The public architecture drawing is sanitized. The updated GenLogin case presents operator-reported elapsed processing time, daily volume and observed exception incidence. These are **not independently audited runtime logs**, and do not prove audited labor-hour savings, final failure rate or revenue impact.

The on-page SKU tool is a tiny, intentionally incomplete decoder. It does not call the production catalog and must never be used to make operational decisions. The email opt-in test is client-side only, sends nothing, and stores nothing.

## Run locally

Open `index.html` in a browser or serve the folder with:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`. The original site uses inline webp assets and does not require bundling.

## Deploy

1. Replace the root files in `github.com/vaicauchuyentreninternet-crypto/thien-vu-portfolio` with these files.
2. Publish via the repository's existing deployment pipeline or GitHub Pages settings.
3. Smoke-test desktop and mobile, anchor links, case modals, source link and the two working inputs.
4. Confirm live ANCARAT URLs and verify any metrics before a public release.

No commits or remote pushes were performed as part of this local deliverable.

## Hermes Agent and Ollama experience (Nov 2026 update)

- **Hermes Agent**: configured a third-party agent framework on Windows; registered a Scheduled Task for `Hermes_Gateway`, observed its gateway process running, configured local Chromium browser execution and a Discord channel. This is **tool installation, configuration and integration**, not authorship of the Hermes codebase. End-to-end Discord task success is not independently demonstrated.
- **Ollama / Qwen**: installed/configured local inference and explored GPU memory, context size and model routing on an RTX 3060 Ti 8 GB / 32 GB RAM workstation. Combined with Docker/OpenHands Agent Canvas for local-first engineering-agent R&D. No autonomous production deployment, benchmark or unmeasured throughput claimed.
- The visual style and page structure are unchanged. Two detailed technical notes replaced one vague R&D note in the Applied AI section. The original-style résumé is preserved, with only the supplemental AI experience copy updated.

## Windows deployment package

Use `deploy_portfolio.ps1` for authenticated Git deployment with GitHub CLI, **not** browser file uploads.

```powershell
winget install --id GitHub.cli -e
gh auth login --hostname github.com --git-protocol https --web
gh auth setup-git
powershell -NoProfile -ExecutionPolicy Bypass -File .\deploy_portfolio.ps1 -RepoDir "D:\AI-AGENT\Projects\thien-vu-portfolio"
```

The script stops if local uncommitted changes exist, updates `main` only by fast-forward, validates the origin URL, stages only public portfolio files and never force-pushes. For a scoped PAT instead of web login, add `-AuthMethod Token`; the token is prompted invisibly and held in process memory only until the push finishes. Do not send it through AI chat or Discord.

For Hermes with an existing matching V2 `index.html`, apply only `hermes-ollama-from-v2.patch` using `git apply --check`, then `git apply` and commit. The patch targets SHA-256 `7fd3060b026744ea83d2de315cd2f0d65843ab8e4a45e626f1b2444e788ec9d4`; do not apply if Hermes's file differs.
