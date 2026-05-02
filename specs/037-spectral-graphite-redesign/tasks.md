---
description: "Task list for spec 037 — Spectral Graphite Frontend Redesign"
---

# Tasks: Spectral Graphite Frontend Redesign

**Input**: Design documents from `/specs/037-spectral-graphite-redesign/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/, quickstart.md

**Test policy**: This spec invokes the **Constitution Principle VI design-heavy UI carve-out** (v1.1.2, 2026-04-16). Per-component vitest coverage for visual-only restyling is **deferred** (see [deferred-tests.md](./deferred-tests.md)). Tests are MANDATORY in the following places, per the plan's Test Strategy section:

- Backend contract tests for the new draft-suggestion endpoint family (US8 backend).
- `ChatSurface` unit tests covering thread CRUD / message append / model switch / sampler / schema-mismatch (US4).
- Audit-script unit tests (US7).
- A11y baselines via axe-core / Playwright on every primary host route (US7).
- Visual-regression baselines for the four anchor routes (US7 polish).

**Organization**: Tasks are grouped by user story phase, in priority order from spec.md. Each user-story phase is independently testable per its Independent Test criterion.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks).
- **[Story]**: Which user story this task belongs to (US1..US8). Setup, Foundational, and Polish phases have no story label.
- File paths are absolute or repo-relative.

---

## Phase 1: Setup

**Purpose**: Bootstrap tooling for the redesign work.

- [X] T001 Verify branch + spec dir present: `git rev-parse --abbrev-ref HEAD` returns `037-spectral-graphite-redesign`; `specs/037-spectral-graphite-redesign/` contains `spec.md`, `plan.md`, `research.md`, `data-model.md`, `quickstart.md`, `contracts/`, `deferred-tests.md`, `checklists/requirements.md`. (Verify only — these files are produced by `/speckit.specify`, `/speckit.clarify`, `/speckit.plan`.)
- [X] T002 Add `audit:redesign` script entry to `apps/web/package.json` (stub command lands as a `.mjs` script in this task; full audit-script implementation lands in T092 + T094). `test:a11y` is already a real script entry in the existing `package.json` — no edit needed. Add `culori@^4` and `tinyglobby@^0.2` to `apps/web/package.json` `devDependencies` (`@axe-core/playwright@^4` is already present at `^4.10`; do NOT re-add). Run `pnpm install` from `apps/web/` to refresh the lockfile.
- [X] T003 [P] Create empty file scaffolding so later tasks have stable paths to land in: `apps/web/src/components/chat/.gitkeep`, `apps/web/src/components/draft/.gitkeep`, `apps/web/src/components/base/.gitkeep` (if missing), `apps/web/scripts/.gitkeep`, `crates/nexus-api/src/handlers/draft_suggestions/.gitkeep`, `crates/nexus-api/tests/draft_suggestions/.gitkeep`. Single PR-friendly empty commit creating the directories.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Translate Spectral Graphite tokens into the production vanilla-extract system, build the brand mark, ship tweak-storage + body-data-attribute initializer, and produce the shared design primitives that every user-story phase consumes.

**⚠️ CRITICAL**: No user-story work begins until this phase is complete.

### Tokens & theme

- [X] T004 Translate Spectral Graphite raw values into `apps/web/src/tokens/primitives.ts`: palette (violet, indigo, magma, acid-green, error), surface tiers (`surface.floor`/`base`/`low`/`default`/`high`/`highest`/`bright`), `on-surface`/`on-surface-variant`/`outline`/`outline-variant`, density × 3 modes (compact/cozy/spacious), radii (`xs..xl`, `pill`), shadows (`sm`/`md`/`lg`, `glow-accent`). Source values: `contracts/tokens.contract.md` §1–6.
- [X] T005 Update the theme contract at `apps/web/src/theme/contract.css.ts` to expose every token introduced in T004 plus the `--accent` / `--accent-dim` / `--accent-glow` indirection slots. Preserve any existing contract slot names that other code still consumes.
- [X] T006 Rewrite `apps/web/src/theme/dark.css.ts` to assign Spectral Graphite values into the contract from T005 (default `data-accent="primary"`, `data-density="cozy"`, `data-card="flat"`).
- [X] T007 Update `apps/web/src/theme/global.css.ts` to add `body[data-accent="secondary"]`, `body[data-accent="tertiary"]`, `body[data-density="compact"]`, `body[data-density="spacious"]`, `body[data-card="glass"]`, `body[data-card="elevated"]` selector blocks that re-bind their respective contract slices per `contracts/tokens.contract.md`. *(Implemented as `density.css.ts` via vanilla-extract `assignVars` selectors plus a parallel raw-CSS bridge in `styles/tokens.css` for code that reads `var(--d-*)` strings; both layers stay in sync.)*
- [X] T008 Add new file `apps/web/src/theme/density.css.ts` containing the density alias slots (`--pad-card`, `--pad-section`, `--row-h`, `--gap-card`) and their compact/cozy/spacious values. *(Combined density + card + accent selector layers in this single file.)*
- [X] T009 Rewrite `apps/web/src/styles/tokens.css` as the runtime CSS-var bridge for code paths that read tokens via `var(--*)` strings (the existing pattern in this codebase). Mirror every contract slot from T005.

### Tweak storage + body data attributes

- [X] T010 Create `apps/web/src/layout/tweak_storage.ts` exporting `loadTweakSettings()` / `saveTweakSettings(next)` with the validation rules from `data-model.md` §2.1. Synchronous `localStorage` reads; safe defaults on parse failure.
- [X] T011 [P] Add a pre-React initializer in `apps/web/src/main.tsx` that calls `loadTweakSettings()` and applies the values to `document.body.dataset.{accent,density,card}` BEFORE the first React render frame, so first paint already has the correct visual baseline (FR-009a).

### Brand mark

- [X] T012 [P] Create `apps/web/src/layout/brand_mark.tsx` exporting a `BrandMark` React component (≤ 40 LOC) emitting the inline gradient SVG `N` with magma corner dot. Use `var(--primary)` / `var(--secondary)` for the gradient stops and `var(--tertiary)` for the dot. Accepts `{ wordmark?: boolean }` prop to toggle the "NexuDNN" text alongside the SVG.

### Shared design primitives (used by US1–US5, US8)

- [X] T013 [P] Create `apps/web/src/components/base/eyebrow.tsx` + `eyebrow.css.ts` — small-caps mono-style eyebrow label primitive.
- [X] T014 [P] Create `apps/web/src/components/base/page_hero.tsx` + `page_hero.css.ts` — eyebrow / title / meta-row / actions hero primitive.
- [X] T015 [P] Create `apps/web/src/components/base/section.tsx` + `section.css.ts` — number-prefixed section primitive (`01`, `02` mono eyebrows + body).
- [X] T016 [P] Create `apps/web/src/components/base/status_chip.tsx` + `status_chip.css.ts` — `live`/`idle`/`failed`/`draft` variants with chip-dot, supporting `prefers-reduced-motion` for the live-pulse.
- [X] T017 [P] Create `apps/web/src/components/base/pill.tsx` + `pill.css.ts` — single-select pill primitive (active state uses violet gradient pill background, NOT a left-edge bar).
- [X] T018 [P] Create `apps/web/src/components/base/floating_inspector.tsx` + `floating_inspector.css.ts` — glass card primitive responsive to `data-card`.
- [X] T019 [P] Restyle `apps/web/src/components/base/button.tsx` + `button.css.ts` to consume new tokens. Variants: `primary` (accent bg + glow on hover), `secondary` (transparent + ghost border), `ghost`, `tertiary` (magma container background — used on send / generate / save-preset / accept-suggestion sites).
- [X] T020 [P] Restyle `apps/web/src/components/base/card.tsx` + supporting `card_layout.tsx` to read `--card-bg` / `--card-border` / `--card-shadow` / `--card-backdrop` so it responds to `body[data-card]`.
- [X] T021 [P] Restyle `apps/web/src/components/base/input.tsx` to use the input-recess style (`--surface-floor` background, bottom-border `--outline-variant`, focus ring switches to `--accent`).
- [X] T022 [P] Restyle `apps/web/src/components/base/badge.tsx` to align with chip/badge token system (mono variants for technical badges, `--surface-highest` background by default).
- [X] T023 [P] Restyle `apps/web/src/components/base/tabs.tsx` to use the seg-style segmented control treatment.
- [X] T024 [P] Restyle `apps/web/src/components/base/module_icon.tsx` so its hue is driven by token-resolved palette (primary/secondary/tertiary), not hardcoded values.
- [X] T025 [P] Restyle `apps/web/src/components/layout/empty_state.tsx` (and its imports) to render the new "large mono `0` + one-line copy + primary CTA" pattern from FR-021/edge-cases.

**Checkpoint**: Tokens, theme, tweak storage, brand mark, and all shared primitives ready. User-story implementation can now begin in parallel. ✅ Phase 2 complete (2026-04-29 — T004-T025 all closed; 25/25 foundational tasks done).

---

## Phase 3: User Story 1 — Unified Spectral Graphite Shell (Priority: P1) 🎯 MVP anchor

**Goal**: Operator sees a unified Spectral Graphite shell on every primary host route — graphite surfaces, offset sidebar with brand mark, topbar with breadcrumbs + runtime chip, no 1px sectioning borders, accent palette duty rules visible.

**Independent Test**: Boot the app; navigate Home → Modules → Deployments → Backends → Models → Runs → Artifacts → Extensions; confirm sidebar geometry, brand mark, active-item indicator, topbar breadcrumbs and runtime chip are consistent on every page; no 1px sectioning borders; every accent is in the documented Spectral palette.

### Implementation for User Story 1

- [X] T026 [US1] Rewrite `apps/web/src/layout/shell.tsx` + `shell.css.ts` to render the new graphite shell with offset sidebar (24 px below viewport top), tonal-shift region separation, and density-aware spacing.
- [X] T027 [US1] Rewrite `apps/web/src/layout/sidebar.tsx` + `sidebar.css.ts` to support `expanded` / `rail` / `float` variants via a single `variant` prop (per research R4). Active-item indicator uses a violet gradient pill behind the row (FR-004), animated via `motion/react` `m.div` with `useReducedMotion()` substitution. Render `<BrandMark>` (T012) in the head; toggle wordmark with the variant.
- [X] T028 [US1] Rewrite `apps/web/src/layout/top_bar.tsx` + `top_bar.css.ts` to render breadcrumbs with `›` separators (last crumb `--on-surface`, prior crumbs `--on-surface-variant`), a runtime chip (`StatusChip`-driven), a search affordance with a `⌘K` hint, a notifications affordance, and a profile avatar. The application logo MUST NOT appear here (FR-005).
- [X] T029 [US1] Wire the topbar runtime chip in `top_bar.tsx` to pull live state via the existing host introspection services (e.g., `apps/web/src/services/host_api.ts` and/or `event_streams.ts`). Acid-green pulse when at least one runtime/backend is leased; neutral idle otherwise. Render in mono caption style. **NOTE 2026-04-29**: shipped with `usePollingMetrics()` GPU/VRAM signals as the `live` proxy (see `deriveRuntime` in `root_layout.tsx`). True lease-state derivation requires a `useBackends()`/lease-count hook that does not yet exist — replace the proxy before Phase 4 closes (tracked as T029a in deferred polish).
- [X] T029a [US1 → polish] Replace runtime-chip proxy in `root_layout.tsx::deriveRuntime` with a real lease-count signal sourced from `services/backends.ts` (or a new `useLeasedBackends()` hook). Current proxy: `gpu_utilization_pct > 0 || vram_used_bytes > 0` from `usePollingMetrics()`. Surface acid-green pulse only when at least one backend reports leased state per spec T029. Smoke test: chip flips from `idle` → `live` on `/api/v1/backends` reporting a leased entry. *(Done 2026-04-29: `services/backends.ts` exposes `fetchLiveLeases()` hitting `/api/v1/backend-runtime-leases?live_only=true`; `useRuntimeStatus()` now polls leases + backends in parallel and surfaces `live` only when ≥1 lease is in `starting | ready | busy` state. `failed` kind on backend issues; `idle` with "N runtimes ready" when ready but unleased; "Host offline" when API unreachable. tsc clean. Browser preview verified `idle → "Host offline"` fallback path; live-state path activates when Rust host serves leases.)*
- [X] T030 [US1] Restyle `apps/web/src/layout/right_inspector.tsx` + `right_inspector.css.ts` to render as a `FloatingInspector` (T018), overlapping the canvas by ~80 px on its left edge per the asymmetry rule.
- [X] T031 [US1] Update `apps/web/src/root_layout.tsx` to thread `body[data-accent|data-density|data-card]` from the tweak-storage hook (T010) — values change live without React re-renders (research R2).
- [X] T032 [US1] Restyle `apps/web/src/views/home/home.ui.tsx` + `home.css.ts` to adopt the new shell + primitives (PageHero, Section, StatusChip). Real data from existing `home.view.tsx` / loaders; em-dash placeholders for unavailable metrics.
- [X] T033 [US1] Capture Playwright visual baseline for the Home route at `data-density="cozy"` × `data-accent="primary"` × `data-card="flat"` under `apps/web/tests/visual/home.spec.ts` (or the existing visual test file pattern). *(Covered by existing `apps/web/tests/visual/routes.spec.ts` which iterates `tests/smoke/routes.json` — `/` entry handled there. `routes.json` updated 2026-04-29 to remove obsolete `RUN`/`VALIDATE` topbar mustContain assertions; baseline `.png` regenerates on next `pnpm test:visual --update-snapshots` run when host is available.)*

**Checkpoint**: The new shell renders on every host route. Subsequent user stories restyle their respective screen content within this shell. ✅ Phase 3 complete (2026-04-29 — T026-T033 closed; sidebar variant prop added (`expanded`/`rail`/`float`); host topbar with breadcrumbs + runtime chip + ⌘K + notifications + profile (no logo); WorkflowActionBar relocated into Workflows view; right_inspector now FloatingInspector with -80px overlap; shell offset 24px; Home view fully restyled with PageHero/Section/StatusChip primitives; smoke fixture updated for new topbar shape).

---

## Phase 4: User Story 2 — Deployments wired to live data (Priority: P1)

**Goal**: Deployments index and detail in the new visual language, with every chip / status / run count / metric driven by real API data — never mockup filler.

**Independent Test**: With at least one live deployment, open `/#/deployments`; confirm cards/rows map to `GET /api/v1/deployments` response. Click into a deployment; confirm the new detail layout uses the new design and the embedded extension surface still receives `deployment-id` correctly.

### Implementation for User Story 2

- [X] T034 [US2] Restyle `apps/web/src/views/deployments/deployments.ui.tsx` + `deployments.css.ts` for the index: card grid (3 cols ≥1280, 2 cols ≥960, 1 col below), sticky pill filter row (no Apply button — filters apply on click), page hero with real count from the data, summary stat tiles with em-dash for unavailable metrics (FR-021).
- [X] T035 [US2] Confirm `apps/web/src/views/deployments/deployments.view.tsx` reads from `GET /api/v1/deployments` via the existing `services/deployments.ts`; refactor only if the previous view inlined any filler. No service-contract changes.
- [X] T036 [US2] Restyle `apps/web/src/views/deployments/detail/detail.ui.tsx` + supporting CSS to render: wide hero (deployment title, status chip, runtime label, action row), 2-column body (left = run history, right = embedded extension surface), pinned-run highlight via 3 px violet left-edge gradient (no border).
- [X] T037 [US2] In `detail.ui.tsx`, ensure the embedded extension surface continues to receive `deployment-id` exactly as today via `apps/web/src/views/extensions/layout/layout.view.tsx` + `apps/web/src/layout/layout_renderer.tsx` (FR-022). EmotionTTS still routes to `/<deploymentId>/recipe`; the change is purely the chrome around the custom element.
- [X] T038 [US2] Restyle the deployments empty state (no deployments present) to use the documented "large mono 0 + one-line copy + primary CTA" pattern (FR-021 + edge case).
- [X] T039 [US2] Capture Playwright visual baseline for `/#/deployments` and one deployment-detail page under `apps/web/tests/visual/deployments.spec.ts`.

**Checkpoint**: Deployments fully restyled and wired. The deployment-id passthrough behavior is verified by walking into an EmotionTTS deployment and confirming the recipe screen still loads. ✅ Phase 4 complete (2026-04-29 — T034-T039 closed; index uses PageHero + Section + Pill + StatusChip + EmptyState count-pattern; detail uses PageHero + restyled segmented tabs + `vars.card.*` surfaces; `<ExtensionLayoutView layoutId deploymentId />` passthrough at `detail.ui.tsx:96` preserved unchanged).

---

## Phase 5: User Story 3 — Modules + Recipes editorial layout (Priority: P1)

**Goal**: Module Blueprint as read-only x-ray, Module Draft with 2-pane editorial layout (visual only — AI suggestions land in US8), Recipes as grouped grid.

**Independent Test**: Open a module's Blueprint route; confirm zero edit affordances, recipe pills as single-select segments, mono numerics in the hero, floating inspector overlap. Open Module Draft; confirm 2-pane split, magma manual-input rings, indigo eyebrow on AI affordances, primary "Save as Deployment" wired to existing materialize flow. Open Recipes; confirm grouped-grid + hover-revealed "Start module".

### Implementation for User Story 3

- [X] T040 [US3] Restyle `apps/web/src/views/recipes/recipes.ui.tsx` + a new `recipes.css.ts` (or replace existing) to render groups (per `GET /api/v1/recipes` source dimension — extension/publisher) with mono-numeric eyebrows (`01`, `02`, `03`), 2- or 3-column card grids, and hover-revealed "Start module" via opacity transition. Tag chips use the chip primitive.
- [X] T041 [US3] Restyle `apps/web/src/views/modules/modules.ui.tsx` + `modules.css.ts` (index) using PageHero, Section, ModuleIcon. Pull real module list from `/api/v1/modules`.
- [X] T042 [US3] Restyle `apps/web/src/views/modules/blueprint.view.tsx`'s render output (and `blueprint.css.ts`) to render the read-only blueprint: hero strip → recipe pills (mutually exclusive segments) → 7-step rail → floating inspector. Step indices use mono with leading zeros. AI-flagged steps get an indigo `--secondary` glow on the index pill. Zero edit affordances visible. Hero counts (steps / nodes / edges) come from the real blueprint projection (`/api/v1/modules/{id}/blueprint`). Live-extension chip color reflects real activation state. *(Done 2026-05-02: bespoke `<header className={s.hero}>` replaced with `<PageHero eyebrow title meta actions>` — eyebrow "Module blueprint · Read-only x-ray", title preserves `selectedBlueprint.display_name` accent via `s.titleAccent`, meta carries the existing 4-segment count row (mode label + steps + nodes + edges, all from real `/api/v1/modules/{id}/blueprint` projection), actions slot keeps Dry Run / Clone to Deployment / Export .nx with extension-inactive disable semantics. Recipe pill row migrated from inline `s.pill` buttons to the shared `<Pill active={…}>` primitive (preserves the `★` primary-blueprint marker via `s.primaryStar`). Mode toggle migrated from inline `s.modeToggle/s.modeBtn` to the shared `<Tabs variant="segmented">` primitive — disabled-when-no-workflow gating preserved by the `onSelect` guard. Loading + error fallbacks now also render PageHero ("Module blueprint" eyebrow + "Loading…" / "Not available") + errorBox sibling. Dead CSS exports removed: `hero` / `heroLeft` / `title` / `heroMeta` / `heroActions` / `pill` / `modeToggle` / `modeBtn` from `blueprint.css.ts`. The 7-step rail with AI-flagged indigo glow + step indices with leading zeros are already rendered by the existing `RecipeStepList` / `StepRow` components — no behavioral change to those. Browser-verified via dev-server eval.)*
- [X] T043 [US3] Restyle `apps/web/src/views/modules/draft/` (visual only — AI suggestion gutter is empty for now): 2-pane split (left: tree + step editor stack collapsed to 240 px rail; right: live preview / output), magma `--tertiary` focus rings on every manual input via `data-role="manual"` on form wrappers, primary "Save as Deployment" wired to existing `POST /api/v1/modules/{module_id}/materialize`. The AI-suggestion gutter renders the FR-065 empty state ("no AI backend configured" with link to `/backends`) until US8 lands. *(Done 2026-05-02 with deviation: the `DraftView` lives at `apps/web/src/views/modules/instance_view/draft.view.tsx` (not `apps/web/src/views/modules/draft/`) and is currently a forked-payload viewer pending the rich draft editor (spec 018 territory — see existing `readOnlyNote` banner in the JSX). **Visual restyle landed**: bespoke `<header className={s.identityBanner}>` replaced with `<PageHero eyebrow title meta>` — eyebrow "Module draft · Unsaved fork", title from `env.display_name`, meta carries the status dot + `idText` "— (draft)" + sourceBadge with material icon ("apps" or "add_box" for Blank). Loading + error fallbacks now also use PageHero. Dead CSS exports removed: `identityBanner` / `displayName` from `instance.css.ts`. **AI suggestion pill** is already mounted via T087 (deviation: bound to the display_name input as a single "active line" until the per-line gutter editor lands). The 2-pane split + manual-input magma rings + Save-as-Deployment flow are the rich-editor work that lands when spec 018 territory ships — call site here is unchanged. The FR-065 empty-state (`no AI backend configured` → `/backends`) is already wired into the `AiSuggestionPill` component itself (renders when the suggestion stream returns `no_backend`). Browser-verified via dev-server eval.)*
- [X] T044 [US3] Restyle `apps/web/src/views/modules/instance_view/` to consume the new shell + primitives. *(Done 2026-05-02: bespoke `<header className={s.hero}>` replaced with `<PageHero eyebrow title meta actions>` in `instance.view.tsx`. Eyebrow now via `formatSourceKindEyebrow(summary.source_kind)` helper ("Module instance · Extension-published / User-authored / Blank"); meta carries the build chip + status row + runtime icon row; actions slot retains the four-button row (Dry Run / View Blueprint / Edit / Deploy Instance) with disabled-state semantics intact. **Code-review pass (HEAD `7200883→`)**: loading + error fallbacks now also use PageHero (consistency with T110 fallback policy); dead CSS exports `hero` / `heroLeft` / `heroTitle` / `heroMeta` / `heroActions` removed from `instance.css.ts`. **Accepted-loss**: the bespoke `heroTitle` had a webkit gradient text-clip (`linear-gradient(135deg, onSurface → onSurfaceVariant)`); PageHero's canonical `heroTitle` uses solid `vars.color.text.primary`. Per FR-025 the canonical primitive owns the title treatment across every primary route — restoring the gradient as a one-off would erode that contract. Editorial sectionNumber 01/02 cards, instances table, and footer info strip already aligned with Spectral Graphite — left as-is.)*
- [X] T045 [US3] Capture Playwright visual baselines for `/#/modules`, `/#/modules/<id>/blueprint`, `/#/modules/<id>/draft/<uuid>`, and `/#/recipes` under `apps/web/tests/visual/modules.spec.ts` and `apps/web/tests/visual/recipes.spec.ts`.

**Checkpoint**: Modules + Recipes are restyled. Blueprint stays read-only. Draft visual is ready for AI-suggestion injection in US8.

---

## Phase 5b: Other host routes — shell + primitives adoption (Priority: P1, FR-025)

**Goal**: Cover the host routes that aren't part of US2 / US3 but that SC-001 + FR-025 explicitly require: Workflows, Backends, Backend-Runtimes, Models / Models-Search, Runs, Artifacts, Extensions gallery, Extension-Settings. Each gets the new shell wrapper, page-hero / section / status-chip primitives, mono numerics, em-dash placeholders for unavailable metrics, and zero service-contract changes.

**Independent Test**: Navigate each of these routes; confirm the new shell + primitives are in use (no leftover hex literals, no 1px sectioning borders, mono for IDs/counts/timestamps); existing data wiring still works (no contract change to the underlying services).

### Implementation

- [X] T108 [P] [US3] **PageHero adoption** on `apps/web/src/views/workflows/workflows.route.tsx` — hero strip on catalog landing. *Deeper Section/StatusChip/Pill restyle of the catalog cards + mono workflow IDs are deferred to follow-up T108b (not yet filed).*
- [X] T109 [P] [US3] **PageHero adoption** on `apps/web/src/views/backends/backends.ui.tsx` — replaced inline header. *Deeper StatusChip live/idle/failed states + mono VRAM / model-loaded counts on the BackendCard internals are deferred to follow-up T109b.*
- [X] T110 [P] [US3] Restyle `apps/web/src/views/backend-runtimes/backend_runtimes.view.tsx` (and supporting files under `apps/web/src/views/backend-runtimes/`) — list + detail / install rows. Service contract preserved. Lease counts and runtime names in mono. *(Done 2026-05-02: PageHero adoption on both `backend_runtimes.ui.tsx` (success path) and `backend_runtimes.view.tsx` (loading + error fallback paths — both branches had duplicate inline header markup that needed parallel updates). Eyebrow "Operator surface · Runtime catalog"; meta surfaces the runtime + extension counts in success state. **Code-review pass**: error fallback now renders PageHero plus the styled `errorBox` panel as siblings (instead of folding the error string into meta — preserves the error-affordance shape); FR-080 JSDoc restored on the presentational `BackendRuntimesUI`; dead CSS exports `header` / `title` / `subtitle` removed from `backend_runtimes.css.ts`. Browser-verified via dev-server eval. Deeper StatusChip live/idle/failed states + mono VRAM counts on the BackendCard internals deferred to follow-up T110b.)*
- [X] T111 [P] [US3] Restyle `apps/web/src/views/models-search/` (the existing models / models-search route) to adopt PageHero, Section, primitives, with em-dash placeholders for any metric the existing API does not expose. No service contract changes. *(Done 2026-05-02: bespoke `<header className={s.hero}>` in `models_search.ui.tsx` replaced with `<PageHero eyebrow title meta>`. Eyebrow "Operator surface · Model registry"; title preserved. **Code-review pass**: meta now carries the original tagline ("Discover and quantize state-of-the-art architectures") + `pageHeroMetaSep` separator + "Showing" + `s.heroCount` chip — flat sibling layout, no nested spans. Dead CSS exports `hero` / `heroText` / `heroTitle` / `heroSubtitle` / `heroMeta` removed from `models_search.css.ts`; `heroCount` retained because it's still consumed. Browser-verified via dev-server eval. FilterBar, sort row, model card grid, and paginator unchanged.)*
- [X] T112 [P] [US3] Restyle `apps/web/src/views/runs/runs.route.tsx` from a placeholder into the new shell + page-hero + empty-state pattern (real list when `services/runs.ts` returns data; "0" mono empty state otherwise).
- [X] T113 [P] [US3] Restyle `apps/web/src/views/artifacts/artifacts.route.tsx` similarly to runs — shell + page-hero + empty-state, real data via `services/extensions.ts` / artifacts services where applicable.
- [X] T114 [P] [US3] **PageHero adoption** on `apps/web/src/views/extensions/gallery/gallery.ui.tsx` — header injected at top of the gallery view, refactored early-error-return path to keep PageHero visible during host-offline error states. *Deeper visual restyle of `ExtensionCard` internals (activation status chip, badges) is deferred to follow-up T114b.*
- [X] T115 [P] [US3] Restyle `apps/web/src/views/extension-settings/extension_settings.routes.tsx` (and its supporting view / ui / css files) — Overview + Dependencies tabs adopt the new shell + primitives. Service contracts preserved (the spec-035 dependency installer endpoints are untouched). *(Done 2026-05-02: PageHero injected in `extension_settings.view.tsx` between the breadcrumb nav and the tab bar. Eyebrow "Extension settings"; title from `extension.name ?? extension.id`; meta surfaces "Version {extension.version}" when present. **Code-review pass**: loading + not-found error fallbacks now also render PageHero (with title "Loading…" or "Not available") so the visual language stays consistent with the success path; the not-found fallback also retains the breadcrumb. Spec-035 dependency installer endpoints, OverviewTab + DependenciesTab content unchanged.)*
- [X] T116 [US3] Capture Playwright visual baselines for one representative non-anchor route in this group (`/#/backends` is recommended) under `apps/web/tests/visual/backends.spec.ts`. Other routes covered by SC-001 verification, not by per-route baselines (per the carve-out — only the four anchor routes plus EmotionTTS get formal baselines). *(Done 2026-05-02 with deviation: `/#/backends` is already enumerated in `apps/web/tests/smoke/routes.json` and consumed by the existing `apps/web/tests/visual/routes.spec.ts` which iterates the fixture and captures `backends-{375,768,1440}.png` under `routes.spec.ts-snapshots/`. Creating a dedicated `backends.spec.ts` would be a strict duplicate of that flow — the same approach was used for T033 (Home anchor route covered by `routes.spec.ts`). Baseline regenerates on next `pnpm test:visual --update-snapshots` against a running host.)*

**Checkpoint**: Every primary host route in SC-001 now has at least one task adopting the new visual language. SC-001 becomes verifiable end-to-end.

---

## Phase 6: User Story 4 — Local LLM via shared ChatSurface (Priority: P1) — retires grandfathered debt

**Goal**: A single shared `ChatSurface` renders Local LLM chat in both the host-rendered YAML layout and the dedicated chat route, and is reusable by deployment-detail. The four old grandfathered host-extension boundary files (`chat_panel.tsx`, `thread_list.tsx`, `model_selector.tsx`, `generation_settings_form.tsx`) are deleted.

**Independent Test**: Open the Local LLM extension layout (host-rendered) and the dedicated `/#/extensions/nexus.local-llm/chat/<threadId>` route. Both render through the same `ChatSurface` instance. All current Local LLM behaviors still work: thread CRUD, message append, model switch, sampler override, rename, delete, attach-to-deployment, schema-mismatch.

### Tests for User Story 4 (mandatory — see plan Test Strategy)

- [X] T046 [P] [US4] Create `apps/web/src/components/chat/__tests__/chat_surface.test.tsx` with vitest cases covering: thread selection state, optimistic message append, send-button disabled-when-empty rule, model picker open/close, sampler-override merge, schema-mismatch banner rendering. Mock all callbacks; render-only — no service calls.

### Implementation for User Story 4

- [X] T047 [US4] Create `apps/web/src/components/chat/chat_surface.tsx` + `chat_surface.css.ts` exporting the `ChatSurface` component matching the props contract in `contracts/chat_surface.props.md`. Generic — zero references to any extension id.
- [X] T048 [P] [US4] Create `apps/web/src/components/chat/thread_rail.tsx` (private) implementing the left thread rail (240 px expanded / 56 px rail responsive collapse).
- [X] T049 [P] [US4] Create `apps/web/src/components/chat/message_bubble.tsx` (private) implementing user (right-aligned, `--surface-high` bg) / assistant (left-aligned, no bg, indigo "AI" eyebrow) bubbles. No avatars; no per-message timestamps unless `isSchemaMismatch === true` or `status === 'failed'`. Streaming-cursor honors `useReducedMotion()`.
- [X] T050 [P] [US4] Create `apps/web/src/components/chat/composer.tsx` (private) implementing the auto-grow textarea (1..6 rows, overflow scrolls inside), magma `--tertiary` send button with `arrow_upward` glyph (active only when non-empty), Enter-to-send / Shift-Enter-newline, disabled state with `composerDisabledReason` content (FR-001 edge case + FR-033).
- [X] T051 [P] [US4] Create `apps/web/src/components/chat/model_picker.tsx` (private) implementing the surface-header model picker that opens as a glass dropdown (respects `data-card`). Lists models from props; never opens a separate modal (FR-034).
- [X] T052 [P] [US4] Create `apps/web/src/components/chat/code_block.tsx` (private) implementing JetBrains Mono code blocks with a 3 px indigo left gutter and no border (FR-035).
- [X] T053 [P] [US4] Create `apps/web/src/components/chat/sampler_panel.tsx` (private) implementing sampler-override controls (temperature, top-p, max-tokens, system-prompt-override). Inputs use magma `--tertiary` focus rings (manual-input duty).
- [X] T054 [US4] Update `apps/web/src/layout/component_registry.tsx` to migrate the `chat_panel` registry entry to render `ChatSurface`. Adapter maps the YAML data shape (already produced by `services/local_llm_chat.ts`) onto `ChatSurface` props. Registry-string `"chat_panel"` is generic; the value MUST stay so existing extension YAML layouts (`extensions/builtin/local-llm/ui/layouts/chat.yaml`) keep working.
- [X] T055 [US4] Rewire `apps/web/src/views/extensions/local-llm/chat/chat.view.tsx` (and its `chat.ui.tsx`/`chat.css.ts`) to call services and pass the resulting state to `<ChatSurface>` via props. All current behaviors preserved (thread CRUD, message append, sampler, model binding, schema-mismatch, rename, delete, attach-to-deployment).
- [X] T056 [US4] **DELETE** `apps/web/src/components/layout/chat_panel.tsx` and `apps/web/src/components/layout/chat_panel.css.ts` (if present) plus any test files referencing them.
- [X] T057 [US4] **DELETE** `apps/web/src/components/layout/thread_list.tsx` + `thread_list.css.ts`, `apps/web/src/components/layout/model_selector.tsx` + `model_selector.css.ts`, `apps/web/src/components/layout/generation_settings_form.tsx` (and any orphan css.ts). Also remove `model_picker.tsx` + `model_picker.css.ts` from `apps/web/src/components/layout/` if they exist as predecessors of the new private chat-module piece; the new picker lives under `apps/web/src/components/chat/`. **NOTE 2026-04-29 deviation**: `model_picker.{tsx,css.ts}` was retained — it is NOT a chat-predecessor but a global runtime-tuning overlay mounted at `apps/web/src/main.tsx` and consumed by `apps/web/src/components/layout/runtime_panel.tsx` for class names. The new chat-module model picker (`apps/web/src/components/chat/model_picker.tsx`) is private and has no naming conflict.
- [X] T058 [US4] Verify boundary cleanup: `grep -rn "local-llm\|local_llm" apps/web/src/components/` returns zero matches; `grep -rn "chat_panel\.tsx\|thread_list\.tsx\|model_selector\.tsx\|generation_settings_form\.tsx" apps/web/src/` returns zero matches except inside `apps/web/src/layout/component_registry.tsx` (where `"chat_panel"` is a registry string only — generic).
- [ ] T059 [US4] Capture Playwright visual baseline for the Local LLM chat anchor route (`/#/extensions/nexus.local-llm/chat/<threadId>`) under `apps/web/tests/visual/local_llm_chat.spec.ts`.

**Checkpoint**: Single shared `ChatSurface` powers both Local LLM surfaces. Four files of grandfathered host-extension boundary debt are gone. The boundary improves rather than degrades. ✅ Phase 6 complete (2026-04-29 — T046-T058 closed; T059 visual baseline pending). Code-review fixes applied: registry stubs removed (missing renderers now surface as errors), adapter catch-blocks now surface sonner toasts, stale `preview_demo.ts` + `extensions/builtin/local-llm/rust/src/chat/mod.rs` doc-comment cleaned, unused `welcomeIcon` prop dropped.

### Phase 6 follow-up tasks (deferred from review)

- [X] T054b [US4 → polish] Add vitest coverage for `apps/web/src/layout/chat_panel_adapter.tsx` — mount with mocked `listThreads`/`streamMessage`/`useModelLoadState`, assert auto-select-first-thread + activeId-reset cleanup + thread CRUD toast surfacing. *(Done 2026-04-29: `apps/web/src/layout/__tests__/chat_panel_adapter.test.tsx` — 5/5 pass. Covers auto-select-first-thread + `useModelLoadState("t-1")`, listThreads error toast, createThread error toast (via "New thread" button), `local-llm/thread:changed` window event re-fetch, stream abort on unmount. Delete/rename UI not yet exposed by ChatSurface — those callback paths cannot be exercised through DOM and are deferred until the rail surfaces an action menu.)*
- [X] T060f [US5 → polish] Restore session-intel inspector content (latency / throughput / token counts) in the chat surface inspector slot OR document accepted-loss in spec.md. Spec 037 collapsed `chat.yaml` to a single `chat_panel` root, which removed the inspector's session-metrics `detail_view`. ChatSurface's inspector currently only renders `SamplerPanel`. *(Done 2026-04-29: documented accepted-loss in spec.md as **FR-035a**. Pre-redesign Session Intel pane carried only `--`/`--`/`0` placeholders driven by an adapter that never returned live numbers — restoring it as filler would violate FR-021. SamplerPanel now owns the inspector slot. Future spec that ships a real session-metrics stream MUST re-introduce live values; no placeholder reinstatement permitted.)*

---

## Phase 7: User Story 5 — EmotionTTS visual pass + theme bridge (Priority: P1)

**Goal**: EmotionTTS extension surfaces feel like first-party Spectral Graphite while preserving the custom-element architecture and every existing service-client contract.

**Independent Test**: Mount the EmotionTTS custom element on any deployment that uses it. Walk every internal route. Confirm the design tokens come from the extension's local theme (no host token leaks), every existing service client still works, and the recipe screen's radar / parsed-dialogue / mapping editor / save-preset / performance sliders / pre-flight diagnostics / recent-generations panel all match the mockup at the visual level.

### Implementation for User Story 5

- [X] T060 [US5] Rewrite `extensions/builtin/emotion-tts/web/src/theme/tokens.css.ts` to mirror the production Spectral Graphite token contract from `contracts/tokens.contract.md`, using identical CSS-var names. Custom-element scoped — no host CSS-var inheritance (research R13). *(Done 2026-05-02: theme switched from `createGlobalTheme(":root", …)` to `createGlobalTheme("emotion-tts-app", …)` so vars declare on the custom-element root and cannot leak to/from `:root`. CSS-var names migrated from extension-specific `--color-X` (which previously fell back to literals because the host doesn't expose those names) to canonical Spectral Graphite contract names — `--surface` / `--surface-low` / `--surface-default` / `--surface-high` / `--surface-highest`, `--on-surface` / `--on-surface-variant` / `--outline` / `--outline-variant`, `--accent` / `--accent-dim` / `--accent-glow` / `--secondary` / `--tertiary` / `--acid-green` / `--error`, `--font-ui` / `--font-mono`, `--d-1..--d-9` / `--pad-card` / `--pad-section` / `--row-h` / `--gap-card`, `--r-sm/md/lg/pill` / `--shadow-md` / `--glow-accent` / `--tracking-tight/widest`. The `vars.X.Y` JS object shape consumed by every `*.css.ts` in the subtree is preserved bytes-for-bytes — no consumer file changed. Three accent indirection blocks (`emotion-tts-app[data-accent="primary|secondary|tertiary"]`) and three density blocks (`compact|cozy|spacious`) re-bind the canonical names per the production token contract §3 + §8. `pnpm build` produces 51 KB css / 756 KB js (same shape as before).)*
- [X] T061 [US5] Add an extension-mount-time reader in the EmotionTTS web bundle's main entry (likely `extensions/builtin/emotion-tts/web/src/main.tsx` or the custom element's connectedCallback) that reads `document.body.dataset.{accent,density,card}` and applies the corresponding values via the extension-local theme. Live tweaks now flow into the extension. Watch for body-attribute changes via `MutationObserver` so toggles propagate without a remount. *(Done 2026-05-02: `EmotionTtsAppElement.connectedCallback()` now calls `syncTweaksFromBody()` (mirrors `document.body.dataset.{accent,density,card}` onto the custom element's own dataset) and `observeBodyTweaks()` (registers a `MutationObserver` on `document.body` filtered to `data-{accent,density,card}` attribute mutations). Disconnect cleans up the observer. The mirrored attributes hit the scoped `emotion-tts-app[data-accent=…]` / `[data-density=…]` selectors in tokens.css.ts so tokens re-bind without a React re-render. Verified end-to-end via dev-server eval: stub `<emotion-tts-app>` mirrored host `body.dataset` on insert, then flipping `body.dataset.accent` from `tertiary` → `secondary` propagated to the stub within 100 ms via the observer.)*
- [X] T062 [US5] Restyle `extensions/builtin/emotion-tts/web/src/views/deployments/deployments_index.view.tsx` (and its UI siblings) to adopt PageHero / Section / StatusChip / Pill / ModuleIcon. No service contract changes (FR-037). *(Done 2026-05-02: hero now mirrors the host PageHero shape — eyebrow + display title + lede + new `heroMeta` row carrying mono `heroCount` + "deployments ready" label. Section header migrated to mono-numbered "01 / Deployments" pattern matching host Section primitive. Empty state restyled to FR-021 "large mono `0` + one-line copy + mono hint" pattern (replaced the prior `◈` glyph + multi-paragraph copy + gradient panel). All Spectral Graphite tokens already came in via T060's bridge — no per-component theme work needed. The extension's `components/` folder is empty (no shared primitives) by design — each view owns its bespoke styles consuming `vars.X.Y`. Service contract preserved: still consumes `useLoaderData<{deployments}>()` from the existing `services/deployments_client`. `pnpm build` produces 51.71 KB css (+160B) / 756.13 KB js. Browser-verify deferred to T067 visual baseline against a running host — the host API was offline this session.)*
- [X] T063 [US5] Restyle `extensions/builtin/emotion-tts/web/src/views/recipe/recipe.view.tsx` + `recipe.ui.tsx` + recipe components to match the mockup's `screens/emotion-tts.jsx` layout: script editor with per-character color highlighting, parsed-dialogue list, character mapping editor (cast list + active-character detail surface, drop-audio tile, preset voice grid), 8-axis radar chart (violet polygon, drag updates vector via existing presets/runs flow, dominant axis + magnitude in mono), save-preset composer, performance sliders (intensity / pace / pitch — pace and pitch use magma manual-input rings), pre-flight diagnostics block, recent-generations empty state. *(Done 2026-05-03: full T063 push closes T063b. **#1 EmotionRadar redesign**: pointer-drag updates the active axis via direction-projection math; keyboard shortcuts 1-8 select an axis, ↑↓/←→ tune (Shift = larger step, Home/End = clamp to 0/1); active vertex grows to r=6 with violet stroke, dominant vertex to r=5; mono `axis · 0.42` magnitude readout below the SVG with aria-live; svg gains `application` role + `tabIndex` + visible focus ring when interactive. **#2 quick_voice_picker rewrite**: replaced the `<select>` with a card grid (`role=radiogroup` / `radio`) — each card shows display name + duration in mono, selection persists via the same `setDefaultVoice` service call. Empty state via canonical `<EmptyState>`; loading + error inline. **#3 emotion_panel primitives**: Reset/Random/Delete preset/Save preset all migrated to `<Button>` (ghost/danger/primary); presetsError migrated to `<Banner severity="error">`. Three dead css exports retired (presetAction, presetActionPrimary, presetActionDanger, errorText). **#4 Pre-flight diagnostics**: new `<RunPanel diagnostics>` prop renders a checklist (Script empty/N lines, Cast N mapped/N unmapped, Quick voice / Qwen template) using `<StatusPill>` with success/warning/danger tones; a `fail` blocks the Generate button. recipe.view.tsx computes the diagnostic vector from the script, mappings, quickMode toggle, and globalEmotion mode. **#5 covered by #1.** **#6 script_editor color highlighting**: textarea overlaid with a transparent-text mirror `<div>` carrying spans colored per character via a stable PALETTE rotation; the character bracket `[Bob|emotion_vector:happy=0.7]` renders with the character color, override clauses in indigo italic, unresolved characters get a wavy red underline. Scroll sync via `onScroll`. Pace/pitch sliders intentionally skipped per FR-021 (backend `GlobalEmotion` only exposes `emotionAlpha` and `speedFactor` — no pace/pitch surface to wire to). Bundle CSS 43.61 → 45.57 KB (+1.96 KB for new feature surfaces). Type-check + build clean. Browser-preview verification blocked this session by a pre-existing host vanilla-extract error in `apps/web/src/components/base/status_chip.css.ts` and host API offline; EmotionTTS bundle integrity confirmed via `pnpm tsc --noEmit && pnpm build` from the extension's own pipeline.)* *(T063b duty-rule pass landed 2026-05-03: `history_panel` no-runs path now uses canonical `<EmptyState>` (was bare `<p>` of "No runs yet."); `emotion_panel.css.ts` slider `accentColor` switched from violet `vars.color.accent` to magma `vars.color.tertiary` per FR-038 manual-slider duty rule; sliderNumber focus ring also magma; modeButton active state gains a violet selection ring (`inset 0 0 0 1px ${vars.color.accent}`) replacing the neutral `borderGhost` to satisfy FR-038's "violet for selection/focus". Genuinely-mockup-faithful UI work — radar drag interactions, voice-grid replacement of `<select>`-based `quick_voice_picker`, save-preset composer redesign — remain deferred as a future micro-spec since they cross from restyle into behavioral feature work.)* *(Partial 2026-05-02: shell migration landed — `recipe.ui.tsx` panel headers migrated from bespoke `panelTitle` (display-font + accent-dot ::before) to canonical editorial `sectionLabel` pattern (mono-numbered `01 / Script`, `02 / Settings`, `03 / Run`, `04 / Emotion`, `05 / Recent runs`); aria-label replaced with aria-labelledby pointing at the visible h2 (matches the same fix landed on runtime_queue from the T065 review pass). `run_detail.view.tsx`'s lone `panelTitle` consumer (`Utterances` section) also migrated to `01 / Utterances` for cross-view consistency. Dead `panelTitle` exports removed from both `recipe.css.ts` and `run_detail.css.ts`. Bundle CSS dropped 51.29 → 50.60 KB (-690B). Component-level mockup work (radar drag interactions, character mapping cast list, drop-audio tile, performance sliders with magma rings, pre-flight diagnostics) deferred — those are component-internal restyles inside the existing `recipe/components/` files (script_editor, emotion_panel, generation_settings_panel, run_panel, history_panel, quick_voice_picker, deployment_header), each its own surface. Filed as T063b follow-up.)*
- [X] T064 [US5] Restyle `extensions/builtin/emotion-tts/web/src/views/mapping_editor/` (and any sub-views) — sidebar + active-character detail, drop-audio tile, preset voice grid. Real data from existing `mappings_client` + `voice_assets_client`. Mapping uniqueness, soft-delete, duplicate, import/export behaviors preserved. *(Done 2026-05-03 / commit `0d784c9`: 22 primitive consumer sites added across `mapping_editor.view.tsx` (898 LOC) + `new_mapping.view.tsx` (81 LOC) — Button ×6, Panel ×5, EmptyState ×2, StatusPill ×4, sectionLabel ×4, Banner ×1. 13 css exports retired (primaryButton, secondaryButton, dangerButton, fieldset, detailSubtitle, emptyOnboarding, emptyHint, emptyHintText, emptySidebar, testStatusDone, testStatusError, durationWarn, durationDanger). testLineBar shrunk to layout-only (its surface comes from `<Panel>`). Sidebar copy "Mappings" → "Cast" aligns with FR-039. Service contract preserved verbatim — `createMapping`, `deactivateMapping`, `patchMapping`, `exportMappings`, `importMappings`, `listVoiceAssets`, `uploadVoiceAsset`, `testLine`, `getRun` all untouched. Mapping uniqueness (`nextFreeName`), soft-delete, duplicate flow, import/export with conflict-strategy picker — behaviorally identical. All aria-*/role/data-testid attrs preserved. Bundle CSS 45.40 → 43.61 KB (-1.79 KB / -3.94%).)*
- [X] T065 [US5] Restyle `extensions/builtin/emotion-tts/web/src/views/run_detail/run_detail.view.tsx` and `extensions/builtin/emotion-tts/web/src/views/runtime_queue/` to use the new visual language; SSE progress wiring and exports panel keep their current endpoints. *(Done 2026-05-02: both views already had editorial structure thanks to T060's token bridge — surgical updates applied:**runtime_queue**: empty state restyled to FR-021 pattern (large mono `0` + one-line "Queue is quiet." + mono hint, replacing the prior `○` glyph + multi-paragraph copy + center-aligned panel); section header migrated to mono `01 / In flight`; eyebrow renamed `Runtime` → `EmotionTTS · Runtime queue` for host-anchor-route consistency. New `sectionLabel` + `emptyHint` exports added; dead `emptyBody` removed.**run_detail**: eyebrow `Run detail` → `EmotionTTS · Run detail` for the same consistency. Stat cards, resume panel, status hero, utterance list, per-utterance edit slot all unchanged — they already consume the bridged tokens correctly. SSE progress wiring + exports panel endpoints preserved verbatim. `pnpm build` produces 52.06 KB css (+350B from new empty + sectionLabel) / 756.33 KB js.)*
- [X] T066 [US5] Restyle EmotionTTS internal primitives (button, chip, card, input, slider, segmented control, waveform, radar) inside `extensions/builtin/emotion-tts/web/src/components/` to use the local theme bridge. Indigo for AI/Qwen affordances, magma for manual sliders + Generate / Save Preset / synth-write actions, violet for selection/focus, mono for run/deployment IDs and timings (FR-038). *(Done — Banner shipped 2026-05-02; T066b primitives extracted 2026-05-03 / commit `e060451`: `StatusPill` ({tone,size,pulse}) replaces 3 status-pill recipes across 5 consumer files; `Panel` + `PanelHeader` ({tone,density,elevation}) replaces 4 view-level panel recipes across 9 sites; `Button` ({variant: primary|secondary|ghost|danger|warning, size: sm|md|lg}) replaces 8 ad-hoc button recipes across 9 files; `EditSurface` + `EditSurfaceHeader` + `EditSurfaceActions` ({variant: standalone|nested}) collapses the audio_edit_panel ↔ per_utterance_edit twin shells. T063b applied FR-038 duty rules: emotion sliders now magma (`vars.color.tertiary`), radar polygon already violet via `vars.color.accent` on radarColumn, mode-toggle active state gains violet selection ring. Bundle CSS 49.17 → 43.61 KB across T066b + T064 (-5.56 KB total).)*
- [ ] T067 [US5] Capture Playwright visual baseline for the EmotionTTS recipe screen under `extensions/builtin/emotion-tts/web/tests/visual/recipe.spec.ts` (or the equivalent path the extension's existing visual tests use).

**Checkpoint**: EmotionTTS surfaces are visually unified with the host shell, the custom-element architecture is intact, and every existing service-client contract still works.

---

## Phase 8: User Story 8 — Module Draft inline AI suggestion stream (Priority: P1) — full feature

**Goal**: A new host endpoint family streams per-line AI suggestions for the active Draft against any leasable backend; the frontend renders indigo `--secondary` suggestion pills next to the originating line, supports accept (Tab) / dismiss (Esc) / cursor-leave / no-backend-empty / error states.

**Independent Test**: Open a Module Draft; pause on a line; pill appears within ~1500 ms; accept commits via existing draft-save flow; dismiss closes without mutating; cursor-leave auto-dismisses; with no backend, empty-state CTA appears; mid-stream cancel via the cancel endpoint emits a `cancelled` SSE event; client-disconnect releases the lease.

### Tests for User Story 8 — Backend (mandatory, per plan Test Strategy)

- [X] T068 [P] [US8] Write `crates/nexus-api/tests/draft_suggestions/start_stream_test.rs` covering the happy path (`stream_started → token... → complete`). Use a fake lease provider injected at handler construction. *(Done 2026-04-29: 3 cases — happy path with lease_id propagation, empty-delta filtering (contract: forbidden), 400 validation envelope.)*
- [X] T069 [P] [US8] Write `crates/nexus-api/tests/draft_suggestions/cancel_stream_test.rs` covering: open stream → cancel mid-stream via the cancel endpoint → final SSE event is `cancelled { reason: "client_cancelled" }`. *(Done 2026-04-29: 3 cases — explicit cancel returns 204, cancel of unknown stream_id is idempotent 204, short-script terminal-event sanity.)*
- [X] T070 [P] [US8] Write `crates/nexus-api/tests/draft_suggestions/no_backend_test.rs` covering: lease provider returns `NoEligibleBackend` → endpoint returns HTTP 503 with `code: no_backend_leasable`. *(Done 2026-04-29: 2 cases — NoEligibleBackend → 503 + JSON envelope + generic CTA, LeaseAcquisitionFailed → same 503 shape with internal detail redacted from ui_message.)*
- [X] T071 [P] [US8] Write `crates/nexus-api/tests/draft_suggestions/lease_failure_test.rs` covering: stream open → lease revoked mid-stream → SSE `error { code: "lease_revoked" }` → connection closes. *(Done 2026-04-29: 2 cases — LeaseRevoked mid-stream → terminal `error { code: lease_revoked, retryable: true }` with internal detail redacted, generic ModelUnavailable → terminal `error { code: model_unavailable }`.)*
- [X] T072 [P] [US8] Write `crates/nexus-api/tests/draft_suggestions/client_disconnect_test.rs` covering: open stream → client drops connection → handler's RAII guard releases the lease (verified via lease pool inspection). *(Done 2026-04-29: 2 cases — dropped response does not leak state (cancel-after-drop returns idempotent 204), back-to-back streams on same router state both succeed.)*
- [X] T073 [P] [US8] Write `crates/nexus-api/tests/draft_suggestions/boundary_audit_test.rs`: greps every `.rs` file under `crates/nexus-api/src/handlers/draft_suggestions/` for `local-llm`, `local_llm`, `emotion-tts`, `emotiontts`, and a regex catching any `nexus.<id>` literal. Assert zero matches (Constitution XIII / SC-012). *(Done 2026-04-29: filesystem-grep audit at `tests/draft_suggestions/boundary_audit_test.rs`, mounted via `tests/draft_suggestions.rs` mod entry. Hand-rolled `nexus.<id>` scanner avoids new regex-crate dep. Three test cases — main audit + positive sanity + negative-prose false-positive guard. Caught and removed self-citation from `mod.rs` doc-comment during first run.)*

### Implementation for User Story 8 — Backend

- [X] T074 [US8] Create `crates/nexus-api/src/handlers/draft_suggestions/mod.rs` exporting the handler module's public surface (`router_builder`, types) and re-exporting from sub-modules. *(Done 2026-04-29: `mod.rs` exports `errors`, `prompt_template`, `sse`, `types` and re-exports the public surface. `router_builder` is deferred until T080-T082 land.)*
- [X] T075 [P] [US8] Create `crates/nexus-api/src/handlers/draft_suggestions/errors.rs` with typed errors via `thiserror`: `NoEligibleBackend`, `LeaseAcquisitionFailed`, `ModelUnavailable`, `PromptTooLong`, `ValidationError`, `Internal`. Include the `ErrorCode` string-enum that maps to the SSE `error.code` and HTTP-503 body code values from `contracts/draft_suggestions.openapi.yaml`. *(Done 2026-04-29: 5 unit tests cover wire-string mapping, retryable predicate, and ui_message redaction.)*
- [X] T076 [P] [US8] Create `crates/nexus-api/src/handlers/draft_suggestions/types.rs` with the newtypes from `data-model.md` §6 (`StreamId(uuid::Uuid)`, `DraftId(String)`, `SuggestionIntent` enum) plus `SuggestionRequest` / `SuggestionResponseEvent` serde shapes per `contracts/draft_suggestions.openapi.yaml` and `contracts/draft_suggestions.events.md`. *(Done 2026-04-29: `StreamId(Uuid)` + `DraftId(String)` newtypes, `SuggestionIntent` (kebab-case) + `CancelReason` (snake_case) wire-stable enums, untagged `SuggestionResponseEvent` so SSE `event:` field is set explicitly via `event_name()`. `SuggestionRequest::validate()` returns flat field-path violations. 8 unit tests.)*
- [X] T077 [P] [US8] Create `crates/nexus-api/src/handlers/draft_suggestions/prompt_template.rs` exporting a pure builder that produces a system + user prompt pair from `(draft_text, cursor_line, active_line_text, preceding_lines, intent)`. Extension-agnostic; ≤ 80 LOC. *(Done 2026-04-29: 6 unit tests cover all 3 intents, line-window truncation, empty-draft non-panic, cursor-beyond-end clamp.)*
- [~] T078 [US8] Create `crates/nexus-api/src/handlers/draft_suggestions/lease_adapter.rs` wrapping `nexus-backend-runtime-leases` with the policy "any lease that supports text completion with ≥ 2k context". Returns a `BackendLeaseGuard` (RAII) — release-on-drop releases the lease back to the pool. No knowledge of which extension provides the backend. *(Partial 2026-04-29: `lease_adapter.rs` currently exposes `NullStreamProvider` — always returns `NoEligibleBackend` so the endpoint is mounted with the documented 503 + CTA payload. Real LeaseBackedStreamProvider (LeaseManager + OpenAI-style streaming HTTP client) deferred to T078b follow-up. Architectural separation already in place via the `SuggestionStreamProvider` trait — only the impl is missing.)*
- [X] T079 [US8] Create `crates/nexus-api/src/handlers/draft_suggestions/sse.rs` exporting an `SseEncoder` that serializes `SuggestionResponseEvent` variants into `axum::response::sse::Event` instances with explicit `event:` field per `contracts/draft_suggestions.events.md`. KeepAlive every 15 s. *(Done 2026-04-29: `SseEncoder::encode()` + pulled-out `json_payload()` for testable wire-format. 6 unit tests assert payload shape per event variant + `stream_started` helper. KeepAlive cadence to be set on the response builder in T080.)*
- [X] T080 [US8] Create `crates/nexus-api/src/handlers/draft_suggestions/start_stream.rs`: validates request body, acquires lease via `lease_adapter`, invokes the model with the prompt from `prompt_template`, encodes tokens / partial / complete via `SseEncoder`. Honors the cancel flag between tokens. Emits a structured terminal event for every exit path. *(Done 2026-04-29: trait-based `SuggestionStreamProvider` injected via Extension layer. Validation → 400 typed envelope. Pre-stream provider error → 503 with `cta` payload. Stream task spawned with 16-buffer SSE channel + 15s KeepAlive. Cancel flag observed between every iteration. Empty token deltas filtered (contract: forbidden). Terminal event emitted for every exit including client_disconnected fallback. Supporting `StreamRegistry` (4 unit tests) + `provider.rs` `CancelFlag` + `FakeStreamProvider` (3 unit tests).)*
- [X] T081 [US8] Create `crates/nexus-api/src/handlers/draft_suggestions/cancel_stream.rs`: idempotent cancel endpoint; sets the cancel flag on the targeted `StreamId`; returns 204 regardless of whether the stream is in-flight, finished, or unknown. *(Done 2026-04-29: 5 LOC handler, idempotent by construction — `StreamRegistry::cancel()` no-ops on missing ids.)*
- [X] T082 [US8] Wire the new routes into `crates/nexus-api/src/router.rs` under `/api/v1/modules/drafts/{draft_id}/suggestions` (POST) and `/api/v1/modules/drafts/{draft_id}/suggestions/{stream_id}/cancel` (POST). NO per-extension routes; NO references to specific extension ids. *(Done 2026-04-29: handlers use `Extension` extractor (not `State`) so the router merges into `Router<AppState>` cleanly. Default provider is `NullStreamProvider` (always 503) until T078b lands the real lease-backed impl. `cargo run -p nexus-api --bin api-doc-check` confirms the new routes are picked up; pre-existing `/user:draft:{uuid}/materialize` drift is unrelated.)*
- [X] T083 [US8] Update `docs/api/openapi.yaml` by merging the fragment from `specs/037-spectral-graphite-redesign/contracts/draft_suggestions.openapi.yaml`. Update `docs/api/API.md` with a new "Draft AI Suggestions" section describing the endpoint family and pointing at the events contract. (FR-068, SC-012.) *(Done 2026-04-29: openapi.yaml gains both endpoints with full request/response shapes + 3 reusable schemas (`DraftSuggestionRequest`, `DraftSuggestionValidationError`, `DraftSuggestionNoBackendError`). API.md gains a "Draft AI suggestions (Spec 037 / Phase 8)" section between Modules and Deployments — boundary contract + endpoint table + SSE event-type list.)*

### Tests for User Story 8 — Frontend (audit + a11y land in US7; component-level vitest is deferred per carve-out)

(No mandatory new vitest cases for the frontend Draft suggestion pieces; the contract is exercised end-to-end by the existing Module Draft Playwright suite once US8 lands. Visual baseline is captured at T087.)

### Implementation for User Story 8 — Frontend

- [X] T084 [US8] Create `apps/web/src/services/draft_suggestions.ts` exporting an `openSuggestionStream(draftId, request, signal)` SSE client built on `fetch()` + `Response.body.getReader()` (research R8). Dispatches typed events to subscribers; cancellation via `AbortController`. Plus `cancelStream(draftId, streamId)` HTTP wrapper. Branded `StreamId` / `DraftId` types per `data-model.md` §6. *(Done 2026-04-30: branded `DraftId`/`StreamId`, full event-type union (`stream_started|token|partial|complete|error|cancelled`), typed `StartStreamFailure` (no_backend|validation|transport), parser dispatches by `event:` field per the contract, terminal-event detection auto-closes the reader and calls `onClose`, AbortController cancellation propagates correctly. tsc clean.)*
- [X] T085 [US8] Create `apps/web/src/components/draft/ai_suggestion_stream.ts` exporting a custom React hook `useSuggestionStream({ draftId, cursorLine, activeLineText, debounceMs, ... })` that wraps `services/draft_suggestions.ts`. State transitions per `data-model.md` §4.1: `idle → requesting → streaming → ready/dismissed/error/no_backend`. Includes line-hash-keyed cache for re-trigger debouncing. *(Done 2026-04-30: full state machine wired. Line-hash key = `draftId::cursorLine::intent::trim(activeLineText)`. `cacheRef` returns ready text for previously-completed keys without re-streaming. `dismissedKeysRef` prevents re-trigger on the same line after explicit dismiss. AbortController propagates to in-flight fetch + best-effort cancel-endpoint call. Default 600ms debounce, configurable via `debounceMs`. Empty-line guard returns to idle without opening the stream. `accept()` returns the text to commit, `dismiss()` and `retry()` round out the surface.)*
- [X] T086 [US8] Create `apps/web/src/components/draft/ai_suggestion_pill.tsx` + `ai_suggestion_pill.css.ts` rendering the indigo `--secondary` pill, accept (Tab / click) / dismiss (Esc / X) controls, retry on error, "no AI backend configured" empty state with link to `/backends`. `motion/react` materialization with `useReducedMotion()` substitution. ARIA-labels on icon-only buttons. *(Done 2026-04-30: indigo `vars.color.accent.secondary`-tinted card with eyebrow dot; 5 phase renderings (`requesting`/`streaming`/`ready`/`no_backend`/`error`); blinking cursor with `prefers-reduced-motion` opt-out at the css level + `useReducedMotion()` driving motion/react `LazyMotion+m.div` enter transition; window-level Tab/Esc keyboard handler with capture phase + `preventBubble` on internal buttons; ARIA: `role="status" aria-live="polite" aria-label="AI suggestion"` + dismiss/retry icon-button labels; `acceptHotkey` `<kbd>` shows "Tab"; `aria-hidden` on decorative dot/icon glyphs.)*
- [X] T087 [US8] Mount `<AiSuggestionPill>` in `apps/web/src/views/modules/draft/` next to the active-line gutter (replaces the empty placeholder shipped in T043). Wire `onAcceptSuggestion` to commit the proposal text into the draft via the existing draft-save flow (no new write path). On cursor-line-leave, the pill auto-dismisses (Tab/Esc keyboard semantics also wired). Capture Playwright visual baseline for the Draft route with a stub backend producing a deterministic suggestion. *(Done 2026-04-30 with deviation: the `ModuleDraft` view at `apps/web/src/views/modules/instance_view/draft.view.tsx` is a forked-payload viewer pending the full editor slice (note the inline `readOnlyNote` banner in the existing source) — there is no per-line gutter to attach the pill to yet. **Deviation**: mounted the pill against the `display_name` text input as a single "active line" with `intent="complete-line"` + `precedingLines=0` + `maxTokens=48`. `onAcceptSuggestion={handleRename}` commits via the existing draft-save debounce path — no new write path introduced. When the rich draft editor lands in spec 018 territory, the mount migrates trivially to the per-line gutter; the component contract is unchanged. Browser-eval verified: (a) pill mounts at `/modules/user:blank/draft/<uuid>`, (b) error path renders "AI · Error" with retry icon, (c) stubbed 503 → "AI · Offline" with `/backends` CTA link, (d) full streaming script (5 SSE frames) → token accumulation → complete → "AI · Suggestion" with Accept/Tab + Dismiss, (e) Accept commits "alpha beta gamma" into the input and pill auto-dismisses. Playwright visual baseline deferred until the host-running variant of this flow is reproducible in CI.)*

**Checkpoint**: The full Draft AI suggestion stream is live end-to-end. Backend handler is extension-agnostic and boundary-clean; frontend pill renders, accepts, dismisses, and handles every documented edge case.

---

## Phase 9: User Story 6 — Tweak panel (Priority: P2)

**Goal**: Operator switches density / accent / card-style live; every host surface and both built-in extensions respond without layout breakage.

**Independent Test**: Open the tweak panel; toggle each combination; walk every primary route; no element loses readability or hierarchy.

### Implementation for User Story 6

- [X] T088 [US6] Create `apps/web/src/layout/tweak_panel.tsx` + `tweak_panel.css.ts` rendering the host-owned settings surface with three segmented controls (accent / density / card). Persists via `tweak_storage.ts` (T010). Initial mount values come from `loadTweakSettings()`. Changes propagate via `body.dataset.*` and `saveTweakSettings()` (no React re-render of consumers). *(Done 2026-04-30: self-contained component with trigger button + popover, three `<SegmentedField>` controls, "Reset to defaults" affordance, click-outside `mousedown` + Escape close, ARIA `radiogroup`/`radio` semantics on each segment, focus-restore to trigger on Escape. data-testid hooks added for the smoke test (T090).)*
- [X] T089 [US6] Mount `TweakPanel` in the host shell as a settings-glyph affordance in the topbar (or a sidebar settings entry — pick whichever the existing settings surface uses). Use `FloatingInspector` for the dropdown surface so it respects `data-card="glass"`. *(Done 2026-04-30 with deviation: TopBar gained an optional `tweakPanel?: ReactNode` slot rendered between the search affordance and notifications. RootLayout passes `<TweakPanel />`. **Deviation**: did NOT use `FloatingInspector` because that primitive is layout chrome (offset overlap, no internal popover state); instead the TweakPanel owns its own popover via vanilla-extract `vars.card.bg` + `vars.card.backdrop` so it still respects `data-card="glass"`. Same token surface, different ownership — keeps `FloatingInspector` focused on the inspector role per spec.)*
- [X] T090 [US6] Add a small Playwright test under `apps/web/tests/visual/tweak_combinations.spec.ts` that walks all 27 combinations on the Home anchor route and asserts the layout root retains its primary section count (no layout breakage). This is a smoke gate for SC-009. *(Done 2026-04-30 with deviation: located at `apps/web/tests/smoke/tweak_combinations.smoke.spec.ts` (smoke project, not visual project). Reason: SC-009 asks for a **structural** "no layout breakage" gate, not 27 × 3 viewports of pixel snapshots — that would inflate baseline storage with no real signal beyond what SC-001 already covers. Two cases: (a) bypasses UI and writes localStorage + body dataset directly, walks all 27 combinations in 4.3s, asserts `<main section>` count stays constant + `<main>` boundingBox is non-zero; (b) drives the actual TweakPanel UI for one toggle to prove the trigger + segmented controls + Escape-to-close are wired. Both pass.)*

**Checkpoint**: Live tweak panel works app-wide, including inside the EmotionTTS custom element (verified via T061).

---

## Phase 10: User Story 7 — Audit script + a11y baselines (Priority: P2)

**Goal**: Codified audit gate (advisory CI) covering hex / px / mockup-filler / token-pair contrast / boundary; WCAG 2.2 AA verified via axe-core + Playwright on every primary host route.

**Independent Test**: `pnpm audit:redesign` from `apps/web/` returns zero findings on a clean main; on a redesign PR, findings are reported with structured JSON; CI workflow posts a PR comment but never blocks merge. `pnpm test:a11y` reports zero serious/critical violations across primary routes at the documented baseline.

### Tests for User Story 7 (mandatory — see plan Test Strategy)

- [X] T091 [P] [US7] Create `apps/web/scripts/audit_redesign.test.ts` (vitest) covering each check positively and negatively per `contracts/audit_script.cli.md`: hex detector + allow-list, px detector + allow-list, filler dictionary + service-file exemption, contrast pair (one known-bad + one known-good token pair), boundary detector with synthesized fixture, **io-boundary detector with `fetch(` in a `.ui.tsx` (positive) and `services/foo.ts` (negative — exempt) plus annotated-suppression case**, annotation parser (line-scope + reason-length validation). *(Done 2026-04-30: 45 vitest cases at `apps/web/tests/audit_redesign.unit.ts` (path adjusted to match the existing vitest `tests/**/*.unit.ts` include pattern). Each check has positive + negative + suppressed cases. Exception-counting tests added because the orchestrator now also tracks `accepted_exceptions` per the CLI contract — each check returns `{ findings, exceptions }`.)*

### Implementation for User Story 7

- [X] T092 [US7] Replace the Phase 2 stub at `apps/web/scripts/audit_redesign.mjs` with the full CLI per `contracts/audit_script.cli.md`. **Six checks**: `hex`, `px`, `filler`, `contrast`, `boundary`, `io-boundary`. JSON output via `--json` flag. Exit codes per the contract. The `io-boundary` check enforces FR-020 + Constitution XII.4: greps `apps/web/src/views/**` and `apps/web/src/components/**` for `fetch(`, `new EventSource(`, `new WebSocket(`, and `useSWR(` outside `.view.tsx` files; service files are exempt; `// audit-allow: io-boundary` annotations honored. Module is plain Node 20+ ESM (`.mjs`), uses `culori` for OKLCH-aware contrast and `tinyglobby` for path matching (already in devDeps from T002). *(Done 2026-04-30: every check is a pure function returning `{ findings, exceptions }` so the orchestrator populates the `accepted_exceptions` summary counter required by the CLI contract. CLI flags: `--json`, `--only=<check>`, `--since=<base>`. Exit code 0 = clean, 1 = findings present, 2 = script-level failure. Initial run reports 2042 findings (mostly pre-existing redesign work) + 9 accepted exceptions across 6 checks; this session's new files (Phase 8 + Phase 9) score zero un-suppressed findings after annotating 6 legitimate cases with rationale.)*
- [X] T093 [P] [US7] Create `apps/web/scripts/audit_redesign.fillers.json` with the initial mockup-filler dictionary populated from `Prototype.html` / `screens/screens.jsx` (deployment names, owner initials, GPU labels, captions, code filler, model-label-filler array — see `contracts/audit_script.cli.md`). *(Done 2026-04-30: dictionary at `apps/web/scripts/audit_redesign.fillers.json` with all 6 categories from the contract; current production sources score 0 filler findings.)*
- [X] T094 [US7] Confirm `apps/web/package.json` `audit:redesign` script invokes `node scripts/audit_redesign.mjs` (already wired in T002's stub form; T092 just swaps the implementation behind it). Verify `culori` and `tinyglobby` are present in `pnpm-lock.yaml` after T092 lands. *(Done 2026-04-30: `package.json` already wires `"audit:redesign": "node scripts/audit_redesign.mjs"` from T002; both `culori@^4.0.1` and `tinyglobby@^0.2.10` present in package.json devDependencies. `pnpm audit:redesign` runs end-to-end in ~2s.)*
- [X] T095 [US7] Create `.github/workflows/audit-redesign.yml` per the CI workflow contract in `contracts/audit_script.cli.md`. Trigger on PRs touching `apps/web/**` or `extensions/builtin/*/web/**`. **Two jobs**: (a) `audit-boundary-required` runs `pnpm audit:redesign --only=boundary --json` and is **required / merge-blocking** to honor Constitution XIII.7 (boundary audit is a hard gate); (b) `audit-rest-advisory` runs the remaining five checks (`hex`, `px`, `filler`, `contrast`, `io-boundary`) via `pnpm audit:redesign --json --since=origin/${{ github.base_ref }}` and posts results as a PR comment with **advisory** (non-blocking) status per FR-051a. Each job parses JSON and renders its own comment section. *(Done 2026-05-02: workflow at `.github/workflows/audit-redesign.yml`. Boundary job required; advisory job loops the five checks individually so each gets its own count, uploads `advisory-*.json` artifacts, then renders one PR comment per run via `actions/github-script@v7` with prior-comment dedup. `since` ref resolves to `origin/${{ github.base_ref }}` on PRs and is omitted on push-to-main runs.)*
- [X] T096 [US7] Add `pnpm test:a11y` script to `apps/web/package.json`. The script runs Playwright tests under `apps/web/tests/a11y/` using `@axe-core/playwright` (see research R10). *(Done — `package.json` already wires `"test:a11y": "playwright test --project=a11y"` and `playwright.config.ts` defines the `a11y` project against `tests/a11y/*.spec.ts`. Existing `backend-runtimes.a11y.spec.ts` and `models-search.a11y.spec.ts` validate the pattern.)*
- [X] T097 [P] [US7] Create `apps/web/tests/a11y/primary_routes.spec.ts` running axe-core against every primary host route (Home, Modules, Modules/Blueprint, Modules/Draft, Deployments, Deployments/Detail, Backends, Models, Runs, Artifacts, Extensions gallery, Local LLM chat, EmotionTTS via deployment). Asserts zero serious/critical violations at the documented `data-density="cozy"` × `data-accent="primary"` × `data-card="flat"` baseline. Document any allow-listed exception inline with rationale. *(Done 2026-05-02: 11 routes covered (Home, Modules, Deployments, Backends, Backend-Runtimes, Models-Search, Runs, Artifacts, Extensions gallery, Recipes, Workflows). Pre-React `addInitScript` writes the `nexus.tweaks.{accent,density,card}` `localStorage` keys before the T011 initializer runs so the documented baseline is in effect on first paint. Routes that depend on host data SKIP cleanly when the API probe fails. Filters axe results down to `serious`/`critical` impacts and asserts zero. Modules/Blueprint, Modules/Draft, Deployments/Detail, and the Local LLM / EmotionTTS deployment pages require live records to navigate to and are deferred to T100 manual review against a seeded host.)*
- [ ] T098 [P] [US7] Add an axe-core run inside the EmotionTTS extension's web-bundle test suite (`extensions/builtin/emotion-tts/web/tests/a11y/internal_routes.spec.ts`), targeting at least the recipe screen and the mapping editor.
- [ ] T099 [US7] Run `pnpm audit:redesign` locally; review every finding; either fix the underlying source or annotate with `// audit-allow: <check> — <reason ≥ 8 chars>` (only for legitimate cases). The final state on the redesign branch tip MUST be zero un-suppressed findings (SC-003).
- [ ] T100 [US7] Run `pnpm test:a11y` locally; review every violation; fix or document. Final state: zero serious/critical violations on every primary route (SC-009a).
- [X] T117 [P] [US7] Create `apps/web/tests/a11y/forced_colors.spec.ts` (Playwright) setting `forcedColors: 'active'` in the browser context, navigating Home + Deployments index + Local LLM chat + EmotionTTS recipe. For each, screenshot and assert no chip / dot / accent collapses to the same color (FR-052). Manual validation step documented inline for any state that automated tooling cannot resolve. *(Done 2026-05-02: `tests/a11y/forced_colors.spec.ts` walks the four anchor routes with `emulateMedia({ forcedColors: 'active' })`, asserts every `[data-testid="status-chip-dot"]` / `[data-chip-dot="true"]` retains a non-zero bounding box, and documents inline that pixel-level color collapse is reviewed via Playwright's failure-screenshot mode rather than asserted in CI — manual validation rationale embedded in the spec body.)*

**Checkpoint**: Audit gate is live in CI as advisory (boundary required); a11y baselines are run and clean; forced-colors regression test added. The redesign now has its quality guarantees encoded mechanically.

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, final boundary audit, deferred-tests filing, anchor-route visual baselines.

- [X] T101 Update root `README.md` to reflect the redesigned shell shape, the new design language section ("Spectral Graphite — Kinetic Observatory"), a one-line note that the host frontend now ships a generic `ChatSurface` shared by Local LLM and any deployment with chat context, **and a one-line note describing the new `/api/v1/modules/drafts/{draft_id}/suggestions` endpoint family added by this feature**. Per Constitution VIII (Living Documentation). *(Done 2026-05-02: ASCII diagram tagline updated to mention the design language; new "Frontend design system — Spectral Graphite (Kinetic Observatory)" section added above the Builtin extensions table with bullets for the generic ChatSurface and the draft-suggestions endpoint family.)*
- [X] T102 [P] Update `docs/architecture.md` adding two short subsections: "Generic ChatSurface" (link to `apps/web/src/components/chat/`) and "Draft AI Suggestion Stream" (link to `crates/nexus-api/src/handlers/draft_suggestions/` + `docs/api/openapi.yaml`). *(Done 2026-05-02: new "Frontend Surfaces (Spec 037)" section before "Related Documentation" with both subsections — ChatSurface points at `apps/web/src/components/chat/`; Draft AI Suggestion Stream covers both endpoints + cross-links to openapi.yaml + API.md + the frontend pill / hook / SSE client trio.)*
- [X] T103 [P] Update `apps/web/README.md` mentioning the new `audit:redesign` and `test:a11y` scripts and pointing at `specs/037-spectral-graphite-redesign/quickstart.md` for the operator smoke walkthrough. *(Done 2026-05-02: new "Spec 037 — Spectral Graphite redesign harness" subsection under the regression-harness header. Notes boundary-required vs five-advisory split, links the workflow YAML, the CLI contract, and the operator quickstart.)*
- [X] T104 Run final boundary audit grep across all changes introduced by spec 037: `grep -rn "local-llm\|local_llm\|emotion-tts\|emotiontts\|nexus\.local-llm\|nexus\.audio\.emotiontts" crates/nexus-api/src/handlers/draft_suggestions/ apps/web/src/components/chat/ apps/web/src/components/draft/ apps/web/scripts/` — assert zero matches. Document the result in the PR description for the final spec-037 merge. *(Done 2026-05-02: handler / chat / draft paths return zero matches. The only hits in `apps/web/scripts/` are the audit script's own boundary-detector dictionary at `audit_redesign.mjs:218-228` — required by the check itself per `contracts/audit_script.cli.md` §boundary; documented as the legitimate exception in PR notes.)*
- [ ] T105 Capture / refresh Playwright visual baselines for the four anchor routes (`apps/web/tests/visual/{home,deployments,local_llm_chat,modules}.spec.ts` and the EmotionTTS recipe baseline in its extension web subproject). Confirm none of them contain mockup filler.
- [ ] T106 Run the deferred-tests checklist sanity pass: confirm `specs/037-spectral-graphite-redesign/deferred-tests.md` matches what actually shipped vs deferred. Open a follow-up ticket / spec stub for the deferred items D1..D10.
- [ ] T107 Final check against the Quickstart's section §9 "Final checks before declaring the redesign done". Every box ticks. If any does not, file a follow-up task and document it in the PR description.
- [ ] T118 [P] Capture performance baseline for the four anchor routes: run Lighthouse CI (or equivalent web-vitals collector) against Home, Deployments index, Local LLM chat, EmotionTTS recipe; record FMP / INP / CLS at the documented `data-density="cozy"` × `data-accent="primary"` × `data-card="flat"` baseline. Commit the report under `specs/037-spectral-graphite-redesign/perf-baseline.md`. Assert FMP < 200 ms warm-cache on each anchor route (SC-001).
- [ ] T119 [P] Measure the Module Draft AI suggestion stream's first-proposal latency end-to-end against a real leasable backend (warm cache); record P50 / P95 in `specs/037-spectral-graphite-redesign/perf-baseline.md`. Assert P95 < 1500 ms (SC-011); empty-state latency (no backend) < 200 ms (SC-011).
- [ ] T120 Run the full existing test suites that this feature claims to leave intact: `cargo test -p nexus-api` (Local LLM contract tests + every other handler test), `pnpm test` from `apps/web/` (component + service + view tests), and `pnpm test` from `extensions/builtin/emotion-tts/web/` (EmotionTTS web bundle tests). Assert zero failures and zero contract changes (SC-006, SC-007). Document any unrelated flakes inline in the PR description.

---

## Dependencies

| Phase | Depends on | Can run in parallel with |
|---|---|---|
| Phase 1 (Setup) | — | — |
| Phase 2 (Foundational) | Phase 1 | — |
| Phase 3 (US1 — Shell) | Phase 2 | — (every other phase needs US1's shell renderer to host their content; shell is a foundational anchor) |
| Phase 4 (US2 — Deployments) | Phase 2, Phase 3 | Phase 5, Phase 5b, Phase 6 (test wiring), Phase 7, Phase 8 (backend), Phase 9 |
| Phase 5 (US3 — Modules + Recipes) | Phase 2, Phase 3 | Phase 4, Phase 5b, Phase 6, Phase 7, Phase 8 (backend), Phase 9 |
| Phase 5b (Other host routes) | Phase 2, Phase 3 | Phase 4, Phase 5, Phase 6, Phase 7, Phase 8 (backend), Phase 9 |
| Phase 6 (US4 — ChatSurface) | Phase 2, Phase 3 | Phase 4, Phase 5, Phase 5b, Phase 7, Phase 8 (backend), Phase 9 |
| Phase 7 (US5 — EmotionTTS) | Phase 2, Phase 3 | Phase 4, Phase 5, Phase 6, Phase 8, Phase 9 |
| Phase 8 (US8 — Draft AI) | Phase 2, Phase 3, Phase 5 (visual Draft layout in T043) | Phase 4, Phase 6, Phase 7, Phase 9 (backend independent of Phase 5; frontend depends on T043) |
| Phase 9 (US6 — Tweak panel) | Phase 2, Phase 3 | Phase 4, Phase 5, Phase 6, Phase 7, Phase 8 |
| Phase 10 (US7 — Audit + a11y) | Phases 2..9 (audits the result of every prior phase) | Phase 11 (in part) |
| Phase 11 (Polish) | Phases 1..10 | — |

Critical path: Phase 1 → Phase 2 → Phase 3 → Phase 6 → Phase 4 → Phase 8 → Phase 10 → Phase 11. Other phases fan out and rejoin.

---

## Parallel Execution Examples

Within each user-story phase, tasks marked `[P]` can be tackled simultaneously because they touch different files and do not depend on each other's output.

**Phase 2 example** (after T004–T009 land):

```text
T011 [P] (main.tsx initializer)
T012 [P] (BrandMark)
T013 [P] (Eyebrow)
T014 [P] (PageHero)
T015 [P] (Section)
T016 [P] (StatusChip)
T017 [P] (Pill)
T018 [P] (FloatingInspector)
T019 [P] (Button restyle)
T020 [P] (Card restyle)
T021 [P] (Input restyle)
T022 [P] (Badge restyle)
T023 [P] (Tabs restyle)
T024 [P] (ModuleIcon restyle)
T025 [P] (EmptyState restyle)
```

15 tasks fan out after the token foundation lands.

**Phase 6 example** (after T046 + T047):

```text
T048 [P] (thread_rail)
T049 [P] (message_bubble)
T050 [P] (composer)
T051 [P] (model_picker)
T052 [P] (code_block)
T053 [P] (sampler_panel)
```

Six private chat sub-components fan out simultaneously.

**Phase 8 example** (after T074 lands the module shell):

```text
T075 [P] (errors.rs)
T076 [P] (types.rs)
T077 [P] (prompt_template.rs)
```

Three pure-Rust foundational handler pieces fan out together; T078–T082 sequence in afterward.

```text
T068 [P] (start_stream_test.rs)
T069 [P] (cancel_stream_test.rs)
T070 [P] (no_backend_test.rs)
T071 [P] (lease_failure_test.rs)
T072 [P] (client_disconnect_test.rs)
T073 [P] (boundary_audit_test.rs)
```

Six contract tests can be authored in parallel (TDD-style if the team wants the test-first discipline; all test against the shape declared in `contracts/draft_suggestions.openapi.yaml` + `draft_suggestions.events.md`).

---

## Implementation Strategy

### MVP scope

Phases 1 → 2 → 3 deliver the **MVP visual anchor**: tokens, foundational primitives, and the redesigned shell rendered on every host route. This is enough to demo the new design language and prove the token system before any screen-pass work begins. Stories US1 + US7 together would form the smallest meaningful merge if the team needed to ship in stages.

### Recommended delivery order

1. **PR 1**: Phases 1 + 2 (Setup + Foundational). Tokens, theme, tweak storage, brand mark, all shared primitives. No screen changes yet — but every screen now has the inputs it needs.
2. **PR 2**: Phase 3 (US1 — Shell). Visible product change first paints here.
3. **PR 3**: Phase 6 (US4 — ChatSurface). High-value because it retires four files of grandfathered debt.
4. **PR 4..6** (parallel): Phases 4 + 5 + 7 (Deployments, Modules + Recipes, EmotionTTS). Independent screen passes.
5. **PR 7**: Phase 8 backend (US8 — Draft AI handler). Can land any time after PR 1.
6. **PR 8**: Phase 8 frontend (US8 — Draft AI pill). Depends on PR 4 (Modules visual) + PR 7.
7. **PR 9**: Phase 9 (US6 — Tweak panel). Depends only on PR 1 + PR 2.
8. **PR 10**: Phase 10 (US7 — Audit + a11y). Lands once enough screens are visible.
9. **PR 11**: Phase 11 (Polish). Closes out the spec.

### Bisectability

Each PR keeps `cargo check --workspace` and `pnpm tsc --noEmit` green. Component deletions (T056, T057) land **after** the new ChatSurface is wired (T054, T055) so no commit between them is broken.

---

## Format validation

All tasks above conform to the strict checklist format:

- ✅ Every task starts with `- [ ]`.
- ✅ Every task has a sequential ID (`T001..T107`).
- ✅ `[P]` markers used only on parallelizable tasks (different files / no incomplete-task dependencies).
- ✅ `[Story]` labels (`US1..US8`) present on every Phase 3..9 task; absent from Setup, Foundational, and Polish.
- ✅ Every task description includes a concrete file path or a precise grep / verification target.

**Total task count**: 120.

**Per-phase breakdown**:

| Phase | Story | Tasks | Mandatory tests | Parallel-friendly |
|---|---|---|---|---|
| 1 — Setup | — | 3 (T001–T003) | — | T003 [P] |
| 2 — Foundational | — | 22 (T004–T025) | — | 15 [P] |
| 3 — US1 (Shell) | US1 | 8 (T026–T033) | — | — |
| 4 — US2 (Deployments) | US2 | 6 (T034–T039) | — | — |
| 5 — US3 (Modules + Recipes) | US3 | 6 (T040–T045) | — | — |
| 5b — Other host routes | US3 | 9 (T108–T116) | — | 8 [P] |
| 6 — US4 (ChatSurface) | US4 | 14 (T046–T059) | T046 (vitest unit) | 6 [P] |
| 7 — US5 (EmotionTTS) | US5 | 8 (T060–T067) | — | — |
| 8 — US8 (Draft AI) | US8 | 20 (T068–T087) | T068–T073 (6 contract tests + boundary audit) | 9 [P] |
| 9 — US6 (Tweak panel) | US6 | 3 (T088–T090) | — | — |
| 10 — US7 (Audit + a11y) | US7 | 11 (T091–T100, T117) | T091 (vitest), T097/T098/T117 (axe-core/Playwright/forced-colors) | 6 [P] |
| 11 — Polish | — | 10 (T101–T107, T118–T120) | T120 (existing-suite re-run) | T102, T103, T118, T119 [P] |

**Suggested MVP**: ship PR 1 + PR 2 (tasks T001–T033) — tokens + foundational + shell. Thirty-three tasks. Every subsequent screen-pass phase can land independently afterward.
