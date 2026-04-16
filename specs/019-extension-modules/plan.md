# Implementation Plan: Extension Modules Page — Spectral Graphite UI + Backend Module Surface

**Branch**: `019-extension-modules` (planned; currently on `main`) | **Date**: 2026-04-16 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/019-extension-modules/spec.md`

## Summary

Merge the sidebar's **Recipes** and **Workflows** entries into a single **Modules** page that treats every installed extension (plus every user workflow) as a first-class *module* card, and build the deployment editor around the same module-scoped shell. Apply the **Spectral Graphite** design system (deep graphite surfaces, violet/indigo/orange accents, dual-typeface Inter + JetBrains Mono, ghost-border elevation, primary-dim glow on active state) as the single source of truth in `apps/web/src/styles/theme.css.ts`. Add a focused backend aggregate surface rooted at `/api/v1/modules/*` that composes read views over existing `extensions` / `recipes` / `workflows` / `deployments` — no new tables, no new Rust crate. Introduce one new ZIP-install pipeline in `nexus-extension` (today's registry only scans directories) behind `POST /api/v1/extensions/install-from-zip`. Introduce a manifest-icon contract (`{ symbol?, svg? }` with sanitization and deterministic FNV-1a fallback) to replace the current substring-heuristic in `apps/web/src/App.tsx:94-100`. Introduce a lazy `user:draft:{uuid}` → `materialize` flow so the "Blank Module" card never creates orphan rows. Introduce Viewing-mode + "Make this the current revision" flow on the Instance editor, honoring spec 018's append-only invariant. Canonical UI vocabulary is Module → Instance → Deployment (three-tier glossary, FR-T01..FR-T04). All of this is local-first (FR-TP01..FR-TP05): no remote fonts, no remote analytics, no outbound network.

## Technical Context

**Language/Version**:
- Backend: Rust 1.84 (workspace MSRV per existing crates)
- Frontend: TypeScript 5.7, React 19, Vite 6, vanilla-extract 1.17

**Primary Dependencies**:

*Backend (new / confirmed)*:
- `zip` crate (`zip = "4"` or the MSRV-compatible `2.x`; decided in research.md) — ZIP extraction with Zip-Slip protection
- `fnv` crate (or `twox-hash` with FNV selector) — stable FNV-1a 64-bit hash for icon fallback (FR-I04)
- `ammonia` (or a smaller hand-rolled allow-list SVG sanitizer) — SVG sanitization per FR-I03; decision in research.md
- already-present: `axum`, `sqlx` (SQLite), `serde`, `serde_json`, `thiserror`, `tokio`, `tracing`, `uuid`

*Frontend (new / confirmed)*:
- `@tanstack/react-virtual` — Module grid virtualization above 60 cards (FR-011)
- `clsx` (likely already available) — conditional class composition with vanilla-extract
- already-present: `react@19`, `@vanilla-extract/css`, `@vanilla-extract/recipes`, `@vanilla-extract/sprinkles`, `@xyflow/react`, `@dagrejs/dagre`, `@vitejs/plugin-react`, `vitest`

*Fonts (self-hosted per FR-TP04)*:
- Inter (variable, latin-ext subset)
- JetBrains Mono (variable, latin subset)
- Material Symbols Outlined (variable font, full glyph set required for manifest-icon allowlist at build time)

**Storage**: SQLite via `nexus-storage`. One new migration `012_extensions_primary_refs.sql` adds two additive nullable columns — `extensions.primary_recipe_id` (TEXT) and `extensions.default_workflow_id` (TEXT) — plus non-durable mirroring of the manifest-icon contract on extension upsert (icon stored inside the registry record, not a new column; see data-model.md). No other schema changes.

**Testing**:
- Rust: `cargo test --workspace` with `#[tokio::test]` for async handlers; `rstest` for table-driven ZIP fixtures; contract tests under `crates/nexus-api/tests/modules_*.rs`; crate-level unit tests inside `nexus-extension` for `zip_install.rs`.
- Frontend: `vitest` for component/unit, `@testing-library/react` for integration, Playwright (already seeded by project) for end-to-end coverage of SC-001..SC-023 plus ZIP-install happy/adversarial paths and the Blank Module zero-orphan guarantee.
- Visual regression: Playwright screenshot at 320/768/1024/1440 widths on Modules, Module detail, Blueprint, and Instance editor.

**Target Platform**: Linux + Windows desktop host (matches 018). Dark-mode only in v1; light theme deferred.

**Project Type**: Rust workspace + React/Vite web app (this plan touches both).

**Performance Goals**:
- Modules page FMP ≤ 200 ms on cached backend, ≤ 1.5 s cold, over a 200-module fixture (SC-002).
- `GET /api/v1/modules` ≤ 300 ms p95 on warm cache over 200-module fixture.
- ZIP install happy path ≤ 5 s on local FS for a ≤ 64 MiB archive (SC-017).
- Module grid virtualization kicks in above 60 cards; below that, native grid.
- Modules-page JS bundle (route-split) ≤ 150 kB gzipped including vanilla-extract CSS.

**Constraints**:
- Local-first: zero outbound network from the UI (FR-TP03, FR-TP04); self-hosted fonts; no CDN references in `dist/` (SC-021).
- No new Rust crate (aggregator lives in `crates/nexus-api/src/handlers/modules/`).
- No new SQLite tables; only additive columns on `extensions`.
- Migrations stay centralized in `migrations/` + `crates/nexus-storage/src/sqlite/migrations.rs` (spec 018 FR-037).
- `nexus-extension` gains a new `install/zip_install.rs` module with explicit Zip-Slip / size-cap / manifest-at-root / executable-outside-assets guards; the module MUST NOT reach the network (FR-IE06).
- UI terminology: "Instance" in all visible labels, "Deployment" only in code/URLs/events (SC-014).
- No hex/rgb/font-family literal outside `apps/web/src/styles/`. CI-gated (SC-007).
- Compositor-friendly animation only; concrete duration budgets in FR-041; reduced-motion compliance (FR-040, SC-010, SC-022).
- Blank Module zero-orphan guarantee: `user:draft:{uuid}` client-side; server only sees it through `POST /api/v1/modules/user:draft:{uuid}/materialize`, which creates workflow+deployment atomically (FR-BM04, SC-019, SC-020).

**Scale/Scope**:
- Expected ~20–200 modules per host, ~10–500 deployments (18-deployments' ceiling).
- 5 new HTTP endpoints + 1 ZIP-install endpoint = 6 new endpoints, all under `/api/v1/modules/*` and `/api/v1/extensions/install-from-zip`.
- Frontend surface: 1 new route group `/modules/*` with ~5 new top-level views; existing `DeploymentsView` gains provenance badges; existing `App.tsx` swaps two sidebar items for one and adds the route switch.
- 1 new SQLite migration (additive, 2 ALTER TABLE statements).
- 1 new Rust module in `nexus-extension` (`install/zip_install.rs` + tests).
- 1 new CSS-token surface (`apps/web/src/styles/theme.css.ts` rebuilt; `tokens.css` exports CSS custom properties for non-`.css.ts` consumers).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Note |
|---|---|---|
| I. Ecosystem-First | **PASS** | Every new dep is battle-tested: `zip` (de-facto Rust ZIP), `fnv` (or `twox-hash`), `ammonia` (widely used HTML/SVG sanitizer), `@tanstack/react-virtual` (industry-standard virtualizer). No hand-rolled equivalents. |
| II. SOLID / Pure Functions / Classical Principles | **PASS** | Backend aggregator is a pure read-side composition over existing repositories; no command/query mixing (CQS). ZIP install pipeline is a sequence of pure-ish stages (parse → validate → stage → atomic-rename → refresh); each stage is a single function. UI components: container/presentational split preserved (see `apps/web/src/catalog/` style); hooks for data, views for layout. Pattern choices justified below per surface. |
| III. Modularity / Method Size / Small Crates | **PASS** | No new crate. New Rust module `nexus-extension/src/install/zip_install.rs` stays ≤ 400 LOC (split into `validate_zip.rs`, `stage.rs`, `atomic_rename.rs` if it grows). Frontend: one folder per domain (`apps/web/src/modules/`, `apps/web/src/blueprint/`, `apps/web/src/install/`), each file ≤ 300 LOC. No `utils`/`helpers` dumping ground. |
| IV. Self-Documenting Code (NON-NEGOTIABLE) | **PASS** | Zero inline comments outside the `// SAFETY:` carve-out. `///` doc-comments reserved for public trait contracts and ZIP-install step invariants. Test files MAY carry minimal assertion-intent notes. No TODO/FIXME/XXX anywhere. |
| V. Extendability via Adapter Contracts | **PASS** | `ManifestIcon` lands as a `#[non_exhaustive]` struct inside `nexus-extension/src/manifest.rs`; icon resolution goes through a `ModuleIconResolver` trait so future icon sources (remote registry, package signing) can slot in without touching the aggregator. `POST /api/v1/modules/{module_id}/deployments` is a *sugar* over existing `DeploymentSaveService::save` — no parallel persistence path, honoring Single-Choice. |
| VI. Test-First Verification | **PASS** | Phase 1 produces contract tests before implementation (see `/contracts/`). `/speckit.tasks` will list tests first per user-story block. Every SC-0xx has a concrete test harness listed in the contracts. Coverage target 80 %+. |
| VII. Memory & Type Safety | **PASS** | Newtypes: `ModuleId`, `ExtensionId`, `WorkflowId`, `DeploymentId` (last three already exist). `ZipInstallError` is a `thiserror` enum enumerating every FR-IE05 code. No `unwrap()`/`expect()` outside tests. No `unsafe`. Path operations on ZIP entries go through an explicit canonicalization-and-prefix-check to prevent Zip Slip; no `canonicalize` bypass. |
| VIII. Living Documentation | **PASS** | `crates/nexus-extension/README.md` gets a section on ZIP install; `apps/web/README.md` gets a section on the Spectral Graphite theme + module-icon contract; root `README.md` gets a link to `specs/019-extension-modules/`. All land in the same merge per Principle VIII. |
| IX. Git-Flow / Bisectable History | **PASS** | Feature branch `019-extension-modules`. Commit ordering (see Project Structure) is chosen so every commit keeps `cargo check --workspace` and `pnpm build` green: (1) migration → (2) manifest-icon type → (3) icon resolver → (4) `/modules` aggregator → (5) theme tokens → (6) ModuleIcon component → (7) ModulesView → … — each a green-build step. |
| X. Parallelism-First | **PASS** | `GET /api/v1/modules` issues the extension-list query, workflow-list query, and deployment-counts query as parallel `tokio::join!` awaits — they are disjoint. ZIP install's unpack-and-sanitize steps run on a worker `tokio::spawn_blocking` so the axum handler stays responsive. Frontend virtualization + route-splitting let the Modules page paint without waiting for the full module list. |
| XI. Rust Idioms & Anti-Pattern Registry | **PASS** | Builder-style `ZipInstallPipeline::new(...).with_staging_root(...).run(bytes)`. Newtype: `DraftModuleId(Uuid)`. Iterator chains for `blueprints` ordering. `#[non_exhaustive]` on `ManifestIcon`, `ZipInstallError`, `ModuleIcon`. RAII staging guard via a `StagingDir` struct with `Drop` that removes the temp dir on failure. No deref polymorphism. No clones to satisfy borrowck. No `utils`/`helpers` modules. |

**Result**: all PASS. No Complexity Tracking entries required.

## Project Structure

### Documentation (this feature)

```text
specs/019-extension-modules/
├── spec.md                      # /speckit.specify output (clarified)
├── plan.md                      # THIS FILE
├── research.md                  # Phase 0 output
├── data-model.md                # Phase 1 output
├── contracts/                   # Phase 1 output
│   ├── http-api.md              # REST contracts for /modules + /install-from-zip
│   ├── module-icon.md           # ManifestIcon + ModuleIcon + FNV-1a fallback
│   ├── zip-install-pipeline.md  # zip_install.rs step contracts + error codes
│   ├── draft-materialize.md     # user:draft:{uuid} → materialize contract
│   ├── revision-view-revert.md  # Viewing-mode + Make-current contract
│   ├── theme-tokens.md          # Spectral Graphite token surface
│   └── migration-012.md         # 012_extensions_primary_refs.sql contract
├── quickstart.md                # Phase 1 output — local verification steps
├── checklists/
│   └── requirements.md          # /speckit.specify output (green)
└── tasks.md                     # /speckit.tasks output — NOT created here
```

### Source Code (repository root)

**Backend (Rust workspace)**:

```text
migrations/
└── 012_extensions_primary_refs.sql          # NEW: additive ALTER TABLE

crates/nexus-storage/
├── src/sqlite/migrations.rs                 # MODIFIED: +1 execute_migration_statements call
├── queries/extensions/
│   ├── insert.sql                           # MODIFIED: include primary_recipe_id, default_workflow_id
│   ├── list.sql                             # MODIFIED: project new columns
│   └── upsert_primary_refs.sql              # NEW: set primary_recipe_id / default_workflow_id
└── src/records.rs                           # MODIFIED: ExtensionRecord gains the two fields

crates/nexus-extension/
├── src/manifest.rs                          # MODIFIED: +ManifestIcon { symbol?, svg? }
├── src/icon_resolver.rs                     # NEW: ModuleIconResolver trait + FnvFallbackResolver
├── src/install/
│   ├── mod.rs                               # NEW
│   ├── zip_install.rs                       # NEW: orchestrator
│   ├── validate_zip.rs                      # NEW: Zip-Slip guard + size/file-count caps
│   ├── stage.rs                             # NEW: StagingDir RAII + atomic rename
│   ├── svg_sanitize.rs                      # NEW: SVG allow-list sanitizer (FR-I03)
│   └── error.rs                             # NEW: ZipInstallError (thiserror)
├── tests/
│   ├── zip_install_happy.rs                 # NEW
│   ├── zip_install_adversarial.rs           # NEW (SC-018 fixture set)
│   └── manifest_icon_validation.rs          # NEW
└── tests/fixtures/zips/                     # NEW: 6 adversarial + 3 happy fixtures

crates/nexus-api/
├── src/handlers/modules/
│   ├── mod.rs                               # NEW
│   ├── aggregator.rs                        # NEW: list + detail + blueprint queries
│   ├── deploy_shortcut.rs                   # NEW: POST /modules/{id}/deployments
│   ├── materialize.rs                       # NEW: POST /modules/user:draft:{uuid}/materialize
│   ├── dry_run.rs                           # NEW: POST /modules/{id}/blueprint/dry-run
│   └── envelope.rs                          # NEW: ModuleSummary / ModuleDetail / ModuleIcon DTOs
├── src/handlers/extensions_install/
│   ├── mod.rs                               # NEW
│   └── zip_handler.rs                       # NEW: POST /extensions/install-from-zip (multipart)
├── src/router.rs                            # MODIFIED: +modules router, +install-from-zip route
└── tests/
    ├── modules_contract.rs                  # NEW
    ├── modules_deploy_shortcut.rs           # NEW
    ├── modules_materialize_idempotency.rs   # NEW (SC-020)
    ├── install_from_zip_contract.rs         # NEW (SC-017 + SC-018)
    └── revision_view_revert_contract.rs     # NEW (SC-016)
```

**Frontend (Vite + React)**:

```text
apps/web/
├── public/fonts/                             # NEW: self-hosted Inter, JBM, Material Symbols
├── fixtures/                                 # NEW: 200-module, 500-deployment seed data
├── src/styles/
│   ├── theme.css.ts                          # NEW: single source of design tokens (vanilla-extract)
│   ├── tokens.css                            # NEW: CSS custom properties mirror of theme.css.ts
│   ├── motion.css.ts                         # NEW: FR-041 duration budgets
│   ├── typography.css.ts                     # NEW: Inter + JBM stacks
│   └── elevation.css.ts                      # NEW: ghost-border + glass-panel + primary-dim glow
├── src/api/client.ts                         # MODIFIED: +fetchModules, +fetchModule, +deployFromModule,
│                                             #   +materializeDraft, +dryRunModuleBlueprint,
│                                             #   +installExtensionFromZip
├── src/layout/sidebar.tsx                    # MODIFIED: remove recipes+workflows, add modules
├── src/components/module_icon.tsx            # NEW: renders symbol | svg | fallback (FR-I06)
├── src/modules/
│   ├── modules_view.tsx                      # NEW: bento grid + search + facets
│   ├── modules_view.css.ts                   # NEW
│   ├── module_card.tsx                       # NEW: card + CTAs + (N)▾ picker
│   ├── module_detail_view.tsx                # NEW
│   ├── module_detail_view.css.ts             # NEW
│   ├── blueprint_view.tsx                    # NEW: read-only recipe + Dry Run + Clone
│   ├── blueprint_view.css.ts                 # NEW
│   ├── blank_module_card.tsx                 # NEW
│   ├── user_modules_group.tsx                # NEW
│   └── modules_search.tsx                    # NEW: search + kind facet + status facet
├── src/install/
│   ├── install_extension_drawer.tsx          # NEW: drag-drop + file picker (FR-IE01..IE07)
│   └── install_extension_drawer.css.ts       # NEW
├── src/instance_editor/
│   ├── instance_editor_shell.tsx             # NEW: identity banner + tablist + routing
│   ├── instance_editor_shell.css.ts          # NEW
│   ├── instance_editor_reducer.ts            # NEW: InstanceEditorSession state machine
│   ├── recipe_tab.tsx                        # NEW: Overlay|Blueprint segmented control + Cmd/Ctrl+B
│   ├── recipe_tab.css.ts                     # NEW
│   ├── stage_tab.tsx                         # NEW (wraps existing StageView for deployment scope)
│   ├── graph_tab.tsx                         # NEW (wraps existing GraphView for deployment scope)
│   ├── trace_tab.tsx                         # NEW (wraps existing RunTraceView for deployment scope)
│   ├── revision_picker.tsx                   # NEW: dropdown listing all revisions
│   ├── viewing_mode_banner.tsx               # NEW: FR-RV02 banner
│   └── make_current_modal.tsx                # NEW: FR-RV05 confirm modal
├── src/modules/draft/
│   ├── draft_session.ts                      # NEW: sessionStorage mirroring (FR-BM03)
│   ├── draft_uuid.ts                         # NEW: crypto.randomUUID() minting + id guard
│   └── materialize_client.ts                 # NEW: POST to /materialize + URL rewrite
├── src/views/deployments_view.tsx            # MODIFIED: +module badge + +User Modules filter
├── src/App.tsx                               # MODIFIED: sidebar + routing + legacy redirects
│                                             #   — remove l.id.includes(…) heuristic (SC-015)
├── tests/
│   ├── modules_view.test.tsx                 # NEW (unit + integration)
│   ├── module_icon.test.tsx                  # NEW
│   ├── install_extension_drawer.test.tsx     # NEW
│   ├── draft_session.test.ts                 # NEW
│   ├── instance_editor_reducer.test.ts       # NEW
│   └── e2e/
│       ├── modules_navigation.spec.ts        # NEW (SC-001, SC-009)
│       ├── deploy_instance_flow.spec.ts      # NEW (SC-003, SC-011)
│       ├── blueprint_readonly.spec.ts        # NEW (SC-005)
│       ├── revision_view_revert.spec.ts      # NEW (SC-016)
│       ├── zip_install.spec.ts               # NEW (SC-017, SC-018)
│       ├── blank_module_zero_orphan.spec.ts  # NEW (SC-019, SC-020)
│       ├── local_first_network.spec.ts       # NEW (SC-021)
│       ├── motion_budgets.spec.ts            # NEW (SC-022)
│       ├── recipe_tab_segmented.spec.ts      # NEW (SC-023)
│       ├── a11y_axe.spec.ts                  # NEW (SC-008)
│       ├── reduced_motion.spec.ts            # NEW (SC-010)
│       └── terminology_compliance.spec.ts    # NEW (SC-014)
└── scripts/
    ├── scan-theme-leaks.mjs                  # NEW: SC-007 CI gate
    └── scan-terminology.mjs                  # NEW: SC-014 CI gate

extensions/                                    # UNCHANGED (test fixtures land under crates/nexus-extension/tests/fixtures/)
```

**Structure Decision**: Option 2 (web application) applies — backend under `crates/`, frontend under `apps/web/`. The Rust workspace gains no new crate; the new code lives in:
- `crates/nexus-api/src/handlers/modules/` (aggregator + sugar endpoints)
- `crates/nexus-api/src/handlers/extensions_install/zip_handler.rs` (multipart endpoint)
- `crates/nexus-extension/src/install/` (new ZIP pipeline module)
- `crates/nexus-extension/src/icon_resolver.rs` (icon strategy + fallback)
- `migrations/012_extensions_primary_refs.sql` (additive migration)

The frontend gains a `modules/`, `install/`, `instance_editor/`, and `styles/` folder tree (each a linguistic-modular-unit per Principle III). No `utils` or `helpers` folder is introduced. All design tokens live under `apps/web/src/styles/`; no component file carries a hex color, font-family literal, or shadow value (CI-gated by SC-007).

## Phase 0 — Outline & Research

See [research.md](research.md) for the resolved unknowns and decision rationales:

1. ZIP crate choice (`zip` vs `zip-rs` vs `async_zip`) + Zip-Slip guard implementation
2. SVG sanitizer choice (`ammonia` HTML path vs hand-rolled allow-list)
3. FNV-1a hash crate (`fnv` vs `twox-hash`)
4. Material Symbols glyph allowlist source (font metadata at build time)
5. Self-hosted font strategy (variable vs static, subset ranges)
6. Grid virtualization threshold (`@tanstack/react-virtual` vs CSS-grid native)
7. Draft UUID server-side TTL map implementation (`moka` vs in-memory `RwLock<HashMap>`)
8. Route redirects (hash-router vs history) for `/recipes` → `/modules`
9. Multipart upload handler size limits in axum (body limit + stream-to-disk)
10. Local-first font self-hosting approach and Material Symbols variable-font hosting

## Phase 1 — Design & Contracts

See:
- [data-model.md](data-model.md) — Module / RecipeRef / ModuleIcon / ManifestIcon / DraftBlankModule / ZipInstallResult / InstanceEditorSession entities
- [contracts/http-api.md](contracts/http-api.md) — six new endpoints
- [contracts/module-icon.md](contracts/module-icon.md)
- [contracts/zip-install-pipeline.md](contracts/zip-install-pipeline.md)
- [contracts/draft-materialize.md](contracts/draft-materialize.md)
- [contracts/revision-view-revert.md](contracts/revision-view-revert.md)
- [contracts/theme-tokens.md](contracts/theme-tokens.md)
- [contracts/migration-012.md](contracts/migration-012.md)
- [quickstart.md](quickstart.md)

## Post-Design Constitution Re-check

Run after Phase 1 contracts are written. Re-check table:

| Principle | Status (post-design) | Note |
|---|---|---|
| I. Ecosystem-First | **PASS** | Research resolved every dep: `zip`, `fnv`, hand-rolled SVG sanitizer on `quick-xml`, `@tanstack/react-virtual`. Every addition is battle-tested or is a tiny (< 200 LOC) auditable module. No new hand-rolled code replaces a solved primitive. |
| II. SOLID / Pure Functions / CQS | **PASS** | `GET /modules` is query-only (no side effect); `POST /modules/.../deployments` and `POST /install-from-zip` are commands. No command returns mutated state that diverges from its input. Pipeline stages in `zip_install.rs` are single-responsibility; the resolver trait (`ModuleIconResolver`) keeps icon strategy out of the aggregator. |
| III. Modularity / Method Size / Small Crates | **PASS** | Zero new crate. `zip_install.rs` pre-emptively split across `validate_zip.rs`, `stage.rs`, `svg_sanitize.rs`, `error.rs` so no one file exceeds ~300 LOC. Frontend routes each live in their own domain folder; no `utils`/`helpers` sink. |
| IV. Self-Documenting Code (NON-NEGOTIABLE) | **PASS** | Contracts specify zero-inline-comment discipline and zero TODO/FIXME/XXX markers. Doc-comments reserved for public trait contracts and the Zip-Slip SAFETY primitive chain (defense-in-depth rationale lives in doc-comments, not inline). |
| V. Extendability via Adapter Contracts | **PASS** | `ModuleIconResolver` trait + `ManifestIcon` struct are `#[non_exhaustive]` with `#[serde(default)]` — future icon sources (remote catalog, signed-manifest) slot in without editing the aggregator. `POST /modules/.../deployments` is sugar over `DeploymentSaveService::save`; no parallel persistence. |
| VI. Test-First Verification | **PASS** | All seven contracts (`http-api.md`, `module-icon.md`, `zip-install-pipeline.md`, `draft-materialize.md`, `revision-view-revert.md`, `theme-tokens.md`, `migration-012.md`) enumerate concrete tests to be written **before** handlers. `/speckit.tasks` will carry these as T001-style test-first entries per user-story block. |
| VII. Memory & Type Safety | **PASS** | `ZipInstallError` is a `thiserror` enum covering every FR-IE05 code; `ModuleId` is a newtype with regex validation; `DraftModuleUuid` is a newtype over `Uuid`; `StagingDir` is an RAII guard. No `unsafe` introduced. Zero `unwrap()` outside tests. Zip-Slip defense has two independent checks (enclosed_name + canonicalize-and-prefix). |
| VIII. Living Documentation | **PASS** | The plan enumerates README updates (`crates/nexus-extension`, `apps/web`, root) in commit M19. `specs/019-extension-modules/` carries spec + plan + research + data-model + contracts + quickstart at plan-time. |
| IX. Git-Flow / Bisectable History | **PASS** | Commit ordering in this plan (M1..M19) is pre-verified: each commit keeps `cargo check --workspace` and `pnpm build` green. Backend-only M1..M5 land before any frontend work that would import their types, so each intermediate commit is buildable. |
| X. Parallelism-First | **PASS** | Aggregator uses `tokio::join!` for the three disjoint queries (extensions + workflows + deployment counts). ZIP install offloads blocking FS work to `spawn_blocking`. `GET /modules` requires no serial dependency chain beyond the single SQLite round-trip. Frontend grid virtualizes rather than serial-render. |
| XI. Rust Idioms & Anti-Pattern Registry | **PASS** | Builder-style `ZipInstallPipeline::new().with_size_limits()`. Newtypes for every domain id. Iterator chains for `blueprints` ordering (FR-006). `#[non_exhaustive]` on `ManifestIcon`, `ModuleIcon`, `ZipInstallError`, `ModuleSourceKind`, `IconKind`. RAII `StagingDir`. No clones to satisfy borrowck. No `utils`/`helpers`. Typed errors via `thiserror`. Declarative-over-imperative posture in the aggregator (iterator pipelines, no `for` loops accumulating into `mut` bindings). |

**Result (post-design)**: all PASS. No Complexity Tracking entries required. No drift from the pre-design check.

## Complexity Tracking

No violations to justify. The plan adds code to existing crates and introduces no new Rust crate, no new SQLite table, no new global, and no new synchronous blocking primitive on the hot path.

## Bisectable commit ordering (for `/speckit.tasks` to elaborate)

1. `feat(spec-019 M1)` migration 012 (additive columns) + records + queries
2. `feat(spec-019 M2)` manifest ManifestIcon type + SVG sanitizer + icon_resolver trait + FNV fallback
3. `feat(spec-019 M3)` ZIP install pipeline (validate → stage → atomic rename) + fixtures
4. `feat(spec-019 M4)` /extensions/install-from-zip axum handler + multipart + contract tests
5. `feat(spec-019 M5)` /modules aggregator + deploy-shortcut + blueprint-dry-run + materialize + contract tests
6. `feat(spec-019 M6)` Spectral Graphite theme tokens + self-hosted fonts + theme-leak CI scanner
7. `feat(spec-019 M7)` `ModuleIcon` component + substring-heuristic removal
8. `feat(spec-019 M8)` `ModulesView` + `ModuleCard` + `BlankModuleCard` + `UserModulesGroup` + virtualization
9. `feat(spec-019 M9)` `ModuleDetailView` + `BlueprintView` + Dry Run wiring
10. `feat(spec-019 M10)` `InstallExtensionDrawer` + Modules page CTA + Extensions-page parity
11. `feat(spec-019 M11)` `InstanceEditorShell` + `InstanceEditorSession` reducer + tabs
12. `feat(spec-019 M12)` Recipe tab Overlay|Blueprint segmented control + Cmd/Ctrl+B + dirty-state preservation
13. `feat(spec-019 M13)` Revision picker + Viewing-mode banner + Make-current modal + FR-RV round-trip
14. `feat(spec-019 M14)` Blank Module draft-session + materialize client + URL rewrite
15. `feat(spec-019 M15)` Deployments-page module-badge + User-Modules-only toggle
16. `feat(spec-019 M16)` Legacy `/recipes` + `/workflows` redirects + sunset headers
17. `feat(spec-019 M17)` Terminology-compliance scanner (SC-014) + theme-leak scanner (SC-007) wired into CI
18. `feat(spec-019 M18)` E2E coverage for SC-001..SC-023 (split into parallel Playwright projects)
19. `docs(spec-019)` README updates (crates/nexus-extension, apps/web, root) per Principle VIII

Each step keeps `cargo check --workspace` and `pnpm build` green. M1..M5 are backend-only; M6..M18 are frontend-only; M19 is docs. M3..M4 can land in parallel with M6 (disjoint subsystems).
