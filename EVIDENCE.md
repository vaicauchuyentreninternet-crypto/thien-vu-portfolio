# Technical evidence & engineering results

**Portfolio:** Nguyễn Thiên Vũ  
**Experience:** ANCARAT, late 2023–present  
**Specialization:** Automation Engineering · Applied AI · E-commerce Systems

## 1. GenLogin automation — operating results

| Indicator | Achieved result | Technical context |
|---|---|---|
| Product processing time | **~60 → <7 minutes/product** | One flow handling product intake, imagery, classification, AI content and attributes; more than **88% shorter** completion time |
| Parallel output | **200+ complete products/day** | Multiple concurrent GenLogin browser profiles |
| Exception rate | **24/749 = 3.20%** | Exceptions automatically return to the execution queue for retry |
| Team reference | **~50 descriptions/day by 4 people** | Manual activity focused on product descriptions; the automated pipeline covers a full catalog record |
| Engineering delivery | **200+ automation projects, 20+ rapid builds** | Browser automation, internal tools, code and no-code implementations |

**Execution design:** source data → SKU/fields → media processing → product categorization → AI-generated content → attributes → validation → publication. Error and validation branches preserve tasks for retry. Concurrent browser profiles expand throughput subject to API capacity and host resources.

## 2. GenLogin source inventory

The supplied `TOOL GEN.zip` contains **19 GenLogin workflows**, with a combined **2,489 graph nodes** and **51 JavaScript/Eval actions**. A selection includes:

| Workflow | Source node count | Main responsibility |
|---|---:|---|
| Catalog publisher | 853 | End-to-end catalog publishing |
| Product data scraper | 307 | Product information extraction |
| AI catalog content & quality | 176 | Content generation, conditions, validation |
| Media upload | 170 | Product assets and imagery |
| Inventory reconciliation | 133 | Inventory matching and review |
| Quantity update | 120 | Quantity-related browser operations |
| Batch image preparation | 113 | Image handling and preparation |
| FAQ publisher | 107 | Structured FAQ publishing |
| LLM content preparation | 104 | AI-assisted content preparation |

The `AZ PROJECT.genlogin` workflow connects back-office product data, AI content steps, JavaScript execution, variables, conditions and file operations.

## 3. Catalog, web and data engineering

- **2,000+ catalog products**, **1,600+ variants**, **200+ attribute groups** and **20 primary filters** across e-commerce catalog organization.
- **200K+ structured rows** and **10M+ data points** in customer reporting, revenue analysis, segmentation and dashboards.
- Responsive ANCARAT commercial and editorial web development with **HTML, CSS, JavaScript, GTM and GA4**.
- SKU- and product-based media organization, product-image handling and categorization as part of automation work.

**Selected public pages:**

- Gold craft catalog: https://ancarat.com/pages/ab1
- Con Rồng Cháu Tiên: https://ancarat.com/pages/con-rong-chau-tien-ancarat
- Như Ý by An — An Nguyệt: https://ancarat.com/pages/an-nguyet
- Vietnamese Women gift campaign: https://ancarat.com/pages/qua-tang-vang-1-phan

## 4. Applied AI & local tools

- **ChatGPT / Gemini:** AI-assisted product content with SKU/data mapping, condition checks and output verification.
- **Hermes Agent:** Windows gateway configuration, scheduled task, local Chromium/browser operation and Discord integration.
- **Ollama + Qwen:** local model setup on a 32 GB RAM / RTX 3060 Ti 8 GB workstation; GPU and context configuration.
- **Docker + OpenHands Agent Canvas:** local engineering-agent environment and workflow experimentation.
- **Power Automate:** forms, business reporting, email/QR tasks and operational notifications.

## 5. Career and marketing execution

- **ANCARAT, late 2023–present:** e-commerce technology, workflow engineering, data operations and web delivery.
- **One year of senior-level full-stack marketing:** campaign planning, market research, editorial production and optimization, plus automated social posting.
- **Van Lang University, Ho Chi Minh City.**

## Public source hygiene

This portfolio publishes aggregated project details, selected product websites and technical workflow summaries. GenLogin credentials, browser profiles, tokens, internal customer data and private company endpoints stay in the internal execution environment.


## GenLogin source graph interactions

The portfolio's six interactive graphs are extracted from five `.genlogin` exports: `upload gold` (853 source notes, 1,102 edges), `AZ PROJECT` (176, 256), `up so luuong web` (120, 165), `CHECK MINUS` (133, 219), and `DANG FQA` (107, 149). Each note shown in the component preserves its exported ID and action; success/fail links are selected directly from the source graph. The Gold publishing example includes the connected retry loop from `XUOIW` through `l_WRD`, `fJ-Gk`, `NfSOY`, `Tx_PV` and back to `9oJYI`.

The companion `genlogin-flow-sample-data.json` contains the exact public-facing configuration used to render the graph.
