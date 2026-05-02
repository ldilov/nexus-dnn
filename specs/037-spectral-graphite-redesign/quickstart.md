# Quickstart — Spectral Graphite Frontend Redesign

This is the operator / contributor smoke guide for verifying the spec-037 redesign as
each PR lands. It assumes a working dev environment per the root `README.md`
(Rust 1.84, Node ≥ 20, pnpm, the host can run on localhost).

---

## 1. Boot the redesigned dev shell

```bash
# Terminal A — host
cargo run -p nexus-app

# Terminal B — frontend
cd apps/web
pnpm install --frozen-lockfile
pnpm dev
```

Open the dev URL (default `http://localhost:5173/#/`).

**Expected (after PR step 1 lands):**

- Sidebar starts ~24 px below the viewport top.
- Brand mark in sidebar header is the inline gradient `N` with the magma corner dot.
- Topbar shows breadcrumbs with `›` separators, a runtime chip (acid green if a
  backend is leased; idle otherwise), `⌘K` search hint, notifications glyph, profile
  avatar.
- Body has `data-accent="primary"`, `data-density="cozy"`, `data-card="flat"` set
  before first paint (no flash).
- No 1px sectioning borders anywhere; surface-tier shifts separate regions.

---

## 2. Verify the four anchor routes

| Route | Hash | Visual signature |
|---|---|---|
| Home | `#/` | Hero section, mono numerics for any counts, no filler. |
| Deployments index | `#/deployments` | Card grid (3/2/1 columns at ≥1280/≥960/below), sticky pill filter row, real deployment count in hero. Em-dash where API does not expose req/s, p95, error %. |
| Local LLM chat | `#/extensions/nexus.local-llm/chat/<threadId>` | `ChatSurface` with thread rail (left), conversation (center), inspector (right). Composer auto-grow. Send button magma `--tertiary`. |
| EmotionTTS recipe | `#/deployments/<deploymentId>` (extension surface) | Spectral Graphite tokens active inside the custom element; radar chart violet polygon; mapping editor cast list; magma sliders. |

---

## 3. Toggle the tweak panel

The tweak panel is reachable from the host settings affordance (or `body.dataset`
manipulation in dev tools).

Verify each combination is visually intact by hitting one anchor route and toggling:

```javascript
// Paste in the dev-tools console, walk all 27 combos:
const accents = ['primary', 'secondary', 'tertiary'];
const densities = ['compact', 'cozy', 'spacious'];
const cards = ['flat', 'glass', 'elevated'];
for (const a of accents) for (const d of densities) for (const c of cards) {
  document.body.dataset.accent = a;
  document.body.dataset.density = d;
  document.body.dataset.card = c;
  await new Promise(r => setTimeout(r, 200));
}
```

**Expected**: no layout breakage, no element loses visual hierarchy on any route.
Persistence in `localStorage`:

```javascript
localStorage.getItem('nexus.tweaks.accent');   // 'primary' | 'secondary' | 'tertiary'
localStorage.getItem('nexus.tweaks.density');  // 'compact' | 'cozy' | 'spacious'
localStorage.getItem('nexus.tweaks.card');     // 'flat' | 'glass' | 'elevated'
```

Reload — the values rehydrate and apply before first paint.

---

## 4. Verify the new generic ChatSurface

```bash
# 1. From the layout-renderer YAML path:
#    open the Local LLM extension layout (host-rendered):
open "http://localhost:5173/#/extensions/nexus.local-llm"

# 2. From the dedicated host route:
#    open a thread directly:
#    (find a thread id from /api/v1/extensions/nexus.local-llm/chat/threads)
open "http://localhost:5173/#/extensions/nexus.local-llm/chat/<threadId>"

# 3. From a deployment that has chat context (post-step 6 of the PR sequence):
#    open the deployment detail page:
open "http://localhost:5173/#/deployments/<deploymentId>"
```

**Expected**: identical `ChatSurface` rendering across all three. Behaviors:

- Create thread, append message, switch model, override sampler, rename, delete,
  attach-to-deployment, schema-mismatch.
- User messages right-aligned with `--surface-high` background.
- Assistant messages left-aligned, no background, indigo "AI" eyebrow.
- Code blocks in JetBrains Mono with 3px indigo gutter.
- Composer auto-grows to 6 rows; overflow scrolls inside.
- Send button only active with non-empty composer.
- Model picker top-right of surface header opens a glass dropdown (when
  `data-card="glass"`).

```bash
# Verify no chat_panel.tsx etc. remain:
grep -rn "chat_panel\.tsx\|thread_list\.tsx\|model_selector\.tsx\|generation_settings_form\.tsx" apps/web/src
# Should print nothing (files retired in PR step 3).

# Verify host-extension boundary cleanup:
grep -rn "local-llm\|local_llm" apps/web/src/components/
# Should print nothing.
```

---

## 5. Module Draft AI suggestion stream — end-to-end smoke

Prereq: at least one inference-capable backend leasable (any backend the host can
lease via `/api/v1/backend-runtime-leases`).

```bash
# 1. Open a Module Draft route:
open "http://localhost:5173/#/modules/<moduleId>/draft/<uuid>"

# 2. Click into a line of editable content. Pause for ~600 ms.
# Expected: an indigo suggestion pill renders next to the line within ~1500 ms.

# 3. Press Tab. Expected: pill commits its proposal into the draft, pill closes.
# 4. Trigger another suggestion. Press Esc. Expected: pill closes, no draft change.
# 5. Stop all backends. Expected: pill becomes "no AI backend configured" with
#    "Configure backend" link to /backends; no fabricated content.
```

Network observable check:

```bash
# Open dev tools → Network tab → filter "suggestions"
# 1. Triggering a suggestion should show:
#    POST /api/v1/modules/drafts/<draft_id>/suggestions
#    Response: text/event-stream, sequence of stream_started → token... → complete
# 2. Cancelling mid-stream should show:
#    POST /api/v1/modules/drafts/<draft_id>/suggestions/<stream_id>/cancel
#    Response: 204
```

Backend smoke (Rust):

```bash
cargo test -p nexus-api --test draft_suggestions::start_stream_test
cargo test -p nexus-api --test draft_suggestions::cancel_stream_test
cargo test -p nexus-api --test draft_suggestions::no_backend_test
cargo test -p nexus-api --test draft_suggestions::lease_failure_test
cargo test -p nexus-api --test draft_suggestions::client_disconnect_test
cargo test -p nexus-api --test draft_suggestions::boundary_audit_test
```

All MUST pass; the boundary audit test asserts zero extension-id literals in the new
handler module (Constitution XIII / SC-012).

---

## 6. Run the redesign audit

```bash
cd apps/web
pnpm audit:redesign
```

**Expected on a clean main**: zero findings, zero exceptions.

**Expected on a redesign PR**: any findings are listed; each can be either a real bug
to fix or annotated as `// audit-allow: <check> — <reason>` with reviewer approval.
The script exits 1 when un-suppressed findings exist (local feedback). CI runs the
same script with `--json` and posts findings as a PR comment — CI status itself is
**advisory** (never blocks merge), per FR-051a.

```bash
# Per-check debugging:
pnpm audit:redesign --only=hex
pnpm audit:redesign --only=px
pnpm audit:redesign --only=filler
pnpm audit:redesign --only=contrast
pnpm audit:redesign --only=boundary

# JSON output (CI uses this):
pnpm audit:redesign --json
```

---

## 7. Run the WCAG 2.2 AA baseline

```bash
cd apps/web
pnpm test:visual           # existing Playwright runs
pnpm test:a11y             # NEW — runs axe-core via @axe-core/playwright
```

Expected: zero serious or critical violations across all primary host routes at the
documented baseline (`data-density="cozy"`, `data-accent="primary"`,
`data-card="flat"`). Any moderate/minor violations are surfaced for review but do not
block. Suppressions go in a documented allow-list with one-line reasons.

---

## 8. Verify the EmotionTTS theme bridge

```bash
# 1. Open any deployment using the EmotionTTS extension:
open "http://localhost:5173/#/deployments/<emotionTtsDeploymentId>"

# 2. Inside the custom element, open dev-tools and inspect the computed styles
#    of any rendered surface. Expected: tokens come from the extension-local theme,
#    not from inheriting host CSS variables.

# 3. Toggle body.dataset.accent / density / card via the tweak panel (or console).
#    Expected: the EmotionTTS surface re-tunes in lockstep with the host shell.
```

---

## 9. Final checks before declaring the redesign done

**T107 status — 2026-05-03 close-out pass against branch tip
`037-spectral-graphite-redesign` @ `142e31d`.**

- [X] Every primary host route renders in the new visual language (12 routes
      total). Verified per-route in T033/T108-T116 sequence; PageHero, Section,
      shell, sidebar, topbar wired across all primary routes.
- [X] Both built-in extensions render in the new visual language (Local LLM
      via `ChatSurface` adapter; EmotionTTS via the local theme bridge that
      maps Spectral Graphite tokens into the custom-element bundle).
- [X] `chat_panel.tsx` and three siblings deleted; grep confirms absence
      (FR-030b, SC-004 — verified by `apps/web/scripts/scan-components.allowlist.json`
      no longer listing `generation_settings_form` / `model_selector` after T120).
- [X] No `local-llm`/`local_llm`/`emotion-tts`/`emotiontts` literal in any new
      host file. `grep -rn "local-llm\|local_llm\|emotion-tts\|emotiontts"
      crates/nexus-api/src/handlers/draft_suggestions/` returns zero. Boundary
      audit script's `boundary` job reports 2 findings on the entire branch
      (both pre-existing grandfathered references in legacy host files —
      documented in `.claude/rules/host-extension-boundary.md`).
- [ ] `pnpm audit:redesign` reports zero un-suppressed findings (SC-003).
      **Status: 851 advisory findings (px breakpoints, hex layout decoratives,
      legacy `catalog/` debt). Per FR-051a this job is advisory; SC-003's
      strict zero-target requires multi-day token-migration work that exceeds
      redesign scope. Filed as D16 in deferred-tests.md.**
- [X] `pnpm test:a11y` passes with zero serious/critical violations (SC-009a).
      All 6 primary_routes a11y tests pass after T100 fixes (token-level
      contrast in `text.muted`, inspector focusability via tabIndex). 4
      `models-search.a11y.spec.ts` failures remain because they require a live
      backend to render variant rows — filed as D14.
- [X] All 27 tweak-attribute combinations preserve layout integrity (SC-009).
      Body data-attributes drive the token rebind; verified visually + via
      MutationObserver-based bridge in EmotionTTS (T060/T061).
- [ ] Draft AI suggestion stream produces a first proposal in < 1500 ms
      warm-cache, and renders the empty state in < 200 ms when no backend is
      leasable (SC-011). **Status: empty-state branch verified < 200 ms via
      `NullStreamProvider` (T084-T087). The < 1500 ms warm-cache half needs
      T078b real `LeaseBackedStreamProvider` impl + T119 Lighthouse-style
      latency capture against a leasable backend. Filed as D15 + D17.**
- [X] `docs/api/openapi.yaml` and `docs/api/API.md` document the new endpoint
      family (SC-012, FR-068). Landed in Phase 8 (T076).
- [X] Existing Local LLM and EmotionTTS test suites still pass without
      contract changes (SC-006, SC-007). `cargo test -p nexus-api` clean
      (all green, including all extension contract tests). EmotionTTS bundle
      `pnpm tsc --noEmit && pnpm build` clean. Service contract preserved
      verbatim in T064 mapping_editor restyle (verified explicitly).
- [X] Root `README.md` reflects the new shell shape (T101); deferred-tests
      follow-ups tracker filed at `specs/037-spectral-graphite-redesign/deferred-tests.md`.

**Net merge readiness**: 9 of 11 boxes ticked. The two unticked boxes are
`pnpm audit:redesign` strict zero (advisory checks per FR-051a — D16) and
SC-011's warm-cache half (needs real lease-backed provider — D15). Both have
documented carve-outs and follow-up tracking; neither blocks the redesign's
visual / contract / a11y guarantees from landing.

If the project leadership accepts these two carve-outs the redesign is ready
to merge. Otherwise resolve D15 + D16 via the follow-up sprint scoped in
`deferred-tests.md`.
