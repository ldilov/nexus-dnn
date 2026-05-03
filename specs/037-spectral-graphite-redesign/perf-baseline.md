# Performance baseline — Spec 037

This document captures the SC-001 (FMP < 200 ms) and SC-011 (Draft AI
suggestion stream P95 < 1500 ms) measurements for the redesign tip.

## Measurement methodology

### SC-001 — FMP < 200 ms warm-cache (T118)

Tool: Lighthouse CI (or equivalent web-vitals collector running headless
against the dev server with cache warmed once before measurement).

Anchor routes:

- Home (`/`)
- Deployments index (`/#/deployments`)
- Local LLM chat (`/#/extensions/nexus.local-llm/chat/<threadId>`)
- EmotionTTS recipe (`/extensions/nexus.audio.emotiontts/<deploymentId>/recipe`)

Baseline tweak attributes (matches T097 a11y baseline):

- `body[data-density="cozy"]`
- `body[data-accent="primary"]`
- `body[data-card="flat"]`

Measurement protocol:

1. Cold-load the route once to warm the asset cache and SWR cache.
2. Reload via Lighthouse / web-vitals collector with throttling disabled
   (representative desktop dev box per spec language).
3. Record FMP (First Meaningful Paint), INP (Interaction to Next Paint),
   and CLS (Cumulative Layout Shift) per route.
4. Assert FMP < 200 ms warm-cache on each anchor route.

### SC-011 — Suggestion stream first-proposal P95 < 1500 ms (T119)

Tool: a network-observable instrumentation hook that records the
timestamp of the SSE `stream_started` event and the first `delta` event
emitted by the Module Draft suggestion stream.

Protocol:

1. Open a Module Draft route (`/#/modules/:moduleId/draft/:draftId`).
2. Position the cursor on a previously-untouched editable line.
3. Wait for the debounce (default 600 ms).
4. Record the wall-clock time from the request `POST` until the first
   `delta` event reaches the client.
5. Repeat 50× per anchor backend; report P50, P95, max.

Empty-state target: when no backend is leasable, the Draft surface must
render the documented empty state in < 200 ms with no spinner / no
fabricated content.

## Recorded measurements

### Status — 2026-05-03 close-out

**Both measurements deferred to post-merge.** Documented in
`deferred-tests.md` as **D17**.

#### Why deferred

- **SC-001** requires Lighthouse CI infrastructure that the redesign
  branch does not currently set up. The `pnpm` toolchain ships
  `playwright`, `vitest`, axe-core, but no Lighthouse runner. Adding
  Lighthouse CI is a separate infrastructure spec (proper config,
  artifact retention, baseline storage, CI gating) — out of scope for
  the visual / token / boundary redesign work that defines spec 037.
- **SC-011** requires a real `LeaseBackedStreamProvider` (T078b) and a
  warm leasable backend. T078b is documented as **D15** deferred (see
  `deferred-tests.md`). Without it, the suggestion endpoint family is
  wired but always returns the empty-state 503; the warm-cache
  measurement target has nothing to measure against.

#### What ships now

- The empty-state branch latency is verifiable today and is well under
  200 ms — `NullStreamProvider` returns `NoEligibleBackend` immediately
  via the existing handler shell. Verified by Phase 8 contract tests.
- Visual / a11y / token-contract guarantees do not depend on these two
  measurements.

#### Re-attachment

When D15 (T078b) lands, run T119 against a leasable backend and append
P50 / P95 / max to this document. When the team agrees on a Lighthouse
CI infrastructure spec, run T118 against the four anchor routes and
append FMP / INP / CLS per route.

## Anchor route screenshots & deltas

Captured by the visual-regression Playwright suites in:

- `apps/web/tests/visual/routes.spec.ts` — generic per-route iterator
  (already in place since T045 / Phase 6).
- `apps/web/tests/visual/local_llm_chat.spec.ts` — T059 dedicated
  anchor-route capture.
- `extensions/builtin/emotion-tts/web/tests/visual/recipe.spec.ts` —
  T067 EmotionTTS recipe capture.

Refresh per the protocol in `quickstart.md` §3 once the host backend is
available with seeded data (a deployment, a Local LLM thread, an
EmotionTTS deployment with a mapped voice).
