# Operating measurements — GenLogin catalog automation

**Reported on:** 2026-11-13  
**Evidence class:** system-owner report; browser-workflow source inspected separately; raw runtime log unavailable for independent verification.

## Published claims (English)

> Reduced average per-product processing time from roughly one hour to under seven minutes in a single GenLogin workflow instance, a reduction of over 88%. Running multiple browser profiles concurrently, the automation handles at least 200 complete products per day — including images, categorization, copy and attributes. In an observation sample of 749, 24 exception events were reported (approximately 3.20%); exceptions are automatically returned to a retry queue. Throughput depends on API/model-account quotas and machine capacity.

## Calculations

- **Observed exceptions:** 24 / 749 * 100 = 3.204272...%, displayed as 3.20%.
- **Elapsed-time reduction (lower bound):** (60 - 7) / 60 * 100 = 88.3333...%. Because new time is **below** 7 minutes, actual reduction is **greater than 88.33%**, using the reported averages.
- **Elapsed-time speedup (lower bound):** 60 / 7 = 8.5714x; because new time is below 7 minutes, speedup is **greater than 8.57x**. This is per-item elapsed processing, not workforce output.
- **Daily volume comparison:** >=200 / 50 = >=4x product counts, across **different task scopes**. Do not claim 4x equivalent labor productivity.

## Architecture and verification

Source-inspected graph: `AZ PROJECT.genlogin`, 176 nodes / 256 edges; it contains conditional, failure and JavaScript actions. The operator states the system also contains test/verification flows and automatic queue retries. These do not establish complete eventual-delivery success rates without run history.

## Future evidence pack

For internal validation collect 30-day redacted execution logs; unique SKU, profile, start/end, attempts, state transitions, terminal state, any manual fixes and per-product scope. Record baseline manual workflow task coverage to compare like for like. Keep internal logs private.

Local AI setup described on the site is integration/R&D and has **no claimed throughput**. The GenLogin productivity metrics are separate and must not be attributed to Hermes Agent, Ollama, Qwen or OpenHands.
