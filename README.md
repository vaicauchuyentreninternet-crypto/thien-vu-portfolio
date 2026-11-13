# Nguyễn Thiên Vũ — Automation Engineer | Applied AI & E-commerce Systems

A results-first portfolio built with HTML, CSS and JavaScript. The website is a single static `index.html` with integrated interactive tools and a downloadable résumé.

## Professional profile

- **ANCARAT — late 2023 to present:** automation engineering, e-commerce technology, websites, reporting and data operations.
- **One year of senior-level full-stack marketing:** market research, campaign planning, copywriting/editing and automated social publishing.
- **Focus:** browser automation, AI-integrated catalog operations, SKU-based image handling, web implementation and business reporting.
- **Education:** Van Lang University, Ho Chi Minh City.

## Measured outcomes

| Area | Result |
|---|---|
| Product completion time | From ~60 minutes to **under 7 minutes** per complete product in one GenLogin flow (**>88% less time**) |
| Parallel throughput | **200+ full products/day**, including image handling, classification, content and attributes |
| Error handling | **24/749 exceptions (3.20%)**, with automatic requeue and retry |
| Manual workload reference | A four-person team previously completed ~50 product descriptions/day |
| Automation delivery | **200+ automation projects**, **20+ rapid code/no-code builds** |
| Exported GenLogin workflows | **19 workflows, 2,489 nodes and 51 JavaScript/Eval steps** |
| E-commerce catalog | **2,000+ product records**, **1,600+ variants**, **200+ attribute groups**, **20 filters** |
| Data operations | **200K+ rows**, **10M+ data points** |

## Featured work

1. **GenLogin AI Catalog Automation** — product ingestion, images, taxonomy, AI content, attributes, validation, automatic retry and parallel browser profiles.
2. **E-commerce Catalog & Editorial Websites** — catalog taxonomy, SKU/variant mapping and responsive ANCARAT shopping experiences.
3. **Customer & Event Reporting Automation** — segmentation, dashboards, Forms/Power Automate, QR registration and operational reporting.
4. **Applied AI Environment** — ChatGPT/Gemini, Hermes Agent (Windows gateway, browser and Discord integration), Ollama/Qwen, Docker and OpenHands.

## Website interactions

- **SKU inspector:** decode supported SKU patterns and return structured product information.
- **Email & consent validator:** check email syntax and explicit opt-in immediately in the browser.
- **Node.js flow walkthrough:** visual step-by-step explanation of validation, credentials and an email-sending architecture.
- **Workflow explorer:** filter technical summaries of GenLogin workflows by application.

## Files

- `index.html` — responsive portfolio website, including UI and interactive JavaScript.
- `Nguyen_Thien_Vu_Resume.pdf` — one-page, results-first résumé.
- `EVIDENCE.md` — technical evidence, metric definitions and selected project references.
- `deploy_portfolio.ps1` — GitHub CLI deployment on Windows for Hermes or a local terminal.

## Preview & deploy

Open `index.html` in a browser, or run:

```bash
python -m http.server 8000
```

For GitHub Pages, publish the repository's `main` branch from the root folder. On Windows, the release includes a PowerShell deploy script; authorize GitHub using `gh auth login --web` and push without exposing tokens in source files.

**Portfolio:** https://github.com/vaicauchuyentreninternet-crypto/thien-vu-portfolio


## Interactive GenLogin workflow explorer

The `index.html` portfolio now includes a dark, clickable GenLogin graph with green success connectors, red failure routes, dashed recovery paths and an animated packet. Node configurations come from five actual `.genlogin` exports, with six selectable source-graph views. Select a note to inspect XPath, variable and file settings, If operands, and JavaScript excerpts.

See `GENLOGIN_COMPONENT_README.md` for component-only installation, node sources and interaction tests. The flow explorer is self-contained: the published `index.html` does not load the companion CSS, JS or JSON files.
