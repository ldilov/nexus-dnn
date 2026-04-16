---
description: "Task list for 019-extension-modules implementation"
---

# Tasks: Extension Modules Page — Spectral Graphite UI + Backend Module Surface

**Input**: Design documents from `/specs/019-extension-modules/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, contracts/ ✅ (7 files), quickstart.md ✅

**Tests**: Required. Constitution Principle VI (Test-First Verification) + plan Technical Context mandate contract tests before implementation. Tests are listed first per user story block.

**Organization**: Tasks grouped by user story (US1..US8 from spec.md + US9 for the ZIP-install flow introduced by clarification R-A). Each story is independently testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Parallelizable (different files, no dependencies on incomplete tasks)
- **[Story]**: `[US1]` .. `[US9]`; Setup, Foundational, and Polish phases carry no story label
- All paths are absolute or repo-root-relative

## Path Conventions

- Rust workspace: `crates/<crate-name>/src/...` and `crates/<crate-name>/tests/...`
- Migrations: `migrations/NNN_name.sql`
- Frontend: `apps/web/src/...`, `apps/web/tests/...`, `apps/web/public/...`
- Specs artifacts: `specs/019-extension-modules/...`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Branch creation, dependency installs, vendored assets.

- [X] T001 Create feature branch `019-extension-modules` from `main` via `git checkout -b 019-extension-modules`
- [ ] T002 [P] Install frontend dependency `@tanstack/react-virtual` via `pnpm add @tanstack/react-virtual` in `apps/web/`
- [X] T003 [P] Install Rust crate `fnv = "1"` and `zip = "2"` (MSRV-compatible) and `quick-xml = "0.36"` in `crates/nexus-extension/Cargo.toml`
- [X] T004 [P] Vendor self-hosted font `Inter-VariableFont_opsz,wght.woff2` to `apps/web/public/fonts/inter.woff2` and add SIL OFL-1.1 entry to `apps/web/public/fonts/LICENSES.txt`
- [X] T005 [P] Vendor self-hosted font `JetBrainsMono-VariableFont_wght.woff2` to `apps/web/public/fonts/jetbrains-mono.woff2` and add Apache-2.0 entry to `apps/web/public/fonts/LICENSES.txt`
- [X] T006 [P] Vendor self-hosted font `MaterialSymbolsOutlined[FILL,GRAD,opsz,wght].woff2` to `apps/web/public/fonts/material-symbols-outlined.woff2` and add Apache-2.0 entry to `apps/web/public/fonts/LICENSES.txt`
- [X] T007 [P] Vendor Material Symbols glyph-metadata CSS to `crates/nexus-extension/vendor/material-symbols.css` for compile-time allowlist generation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: SQL migration, data-layer plumbing, newtypes, design tokens, CI scanners. No user story may start until this phase is complete.

**⚠️ CRITICAL**: All tasks here block every user-story phase below.

### Schema & data layer

- [X] T008 Create migration file `migrations/012_extensions_primary_refs.sql` per `contracts/migration-012.md` §2 (5 additive nullable columns on `extensions`)
- [X] T009 Register migration 012 call in `crates/nexus-storage/src/sqlite/migrations.rs` with `ignore_duplicate_column = true`
- [X] T010 Extend `ExtensionRecord` in `crates/nexus-storage/src/records.rs` with `primary_recipe_id: Option<RecipeId>`, `default_workflow_id: Option<WorkflowId>`, `icon_kind: Option<IconKind>`, `icon_symbol: Option<String>`, `icon_svg: Option<String>` + new `IconKind` enum (Symbol | Svg)
- [X] T011 [P] Update `crates/nexus-storage/queries/extensions/insert.sql` to include the 5 new columns
- [X] T012 [P] Update `crates/nexus-storage/queries/extensions/list.sql` to project the 5 new columns
- [X] T013 [P] Update `crates/nexus-storage/queries/extensions/get_by_id.sql` to project the 5 new columns
- [X] T014 [P] Create `crates/nexus-storage/queries/extensions/upsert_primary_refs.sql`
- [X] T015 [P] Create `crates/nexus-storage/queries/extensions/upsert_icon.sql`
- [X] T016 Update `crates/nexus-storage/src/sqlite/extensions.rs` mappers to read/write the 5 new columns + add `upsert_primary_refs` and `upsert_icon` helpers
- [X] T017 Unit test `crates/nexus-storage/src/sqlite/tests.rs::migration_012_applies` — `PRAGMA table_info(extensions)` post-migration includes all 5 new columns
- [X] T018 [P] Unit test `crates/nexus-storage/src/sqlite/tests.rs::migration_012_idempotent_rerun` — re-running leaves schema identical
- [X] T019 [P] Unit test `crates/nexus-storage/src/sqlite/tests.rs::extensions_icon_symbol_roundtrip`
- [X] T020 [P] Unit test `crates/nexus-storage/src/sqlite/tests.rs::extensions_icon_svg_roundtrip`

### Newtypes & domain types

- [X] T021 [P] Create `ModuleId` newtype with regex validator in `crates/nexus-api/src/handlers/modules/module_id.rs` (accepts `ext:{id}` | `user:{uuid}` | `user:blank` | `user:draft:{uuid}`)
- [X] T022 [P] Unit test `crates/nexus-api/tests/module_id_parse.rs` covering every valid + invalid regex branch
- [X] T023 [P] Create `ManifestIcon` struct (`{ symbol?, svg? }`, `#[non_exhaustive]`, `#[serde(deny_unknown_fields, default)]`) in `crates/nexus-extension/src/manifest.rs`
- [X] T024 [P] Create `ModuleIconResolver` trait + `FnvFallbackResolver` impl in `crates/nexus-extension/src/icon_resolver.rs` with 16-glyph fallback set per `contracts/module-icon.md` §3
- [X] T025 [P] Unit test `crates/nexus-extension/tests/icon_resolver.rs::fnv_stable_across_runs` — same extension_id yields same glyph+hash over 1000 calls
- [X] T026 [P] Create `svg_sanitize` allow-list validator using `quick-xml` in `crates/nexus-extension/src/install/svg_sanitize.rs` — allowlist per FR-I03; reject-on-unknown; ≤ 2 KiB pre-parse gate
- [X] T027 [P] Build-script `crates/nexus-extension/build.rs` parses `vendor/material-symbols.css` and emits `MATERIAL_SYMBOLS: &[&str]` sorted array to `OUT_DIR/material_symbols_allowlist.rs`
- [X] T028 Wire Material Symbols allowlist into `crates/nexus-extension/src/manifest.rs::validate_icon` (binary search check)

### Design system tokens (Spectral Graphite)

- [X] T029 [P] Create `apps/web/src/styles/theme.css.ts` with the full Spectral Graphite palette per `contracts/theme-tokens.md` §2 (primary/secondary/tertiary/acid-green/error + graphite tiers + on-* companions)
- [X] T030 [P] Create `apps/web/src/styles/typography.css.ts` with `@font-face` declarations pointing to `/fonts/*.woff2` (self-hosted, no remote src) per `contracts/theme-tokens.md` §7 + tracking tokens
- [X] T031 [P] Create `apps/web/src/styles/elevation.css.ts` with `ghostBorder`, `glassPanel`, `primaryDimGlow` utilities per `contracts/theme-tokens.md` §4-5
- [X] T032 [P] Create `apps/web/src/styles/motion.css.ts` with duration + easing budgets per `contracts/theme-tokens.md` §6 (cardHoverLift, cardGlow, focusRing, tabCrossfade, sidebarSettle, drawerSlide, optimisticInsert, statusDotPulseCycle, viewingBannerEntrance)
- [X] T033 [P] Create `apps/web/src/styles/tokens.css` as CSS custom-property mirror of `theme.css.ts` + motion tokens + `@media (prefers-reduced-motion: reduce)` override collapsing all motion to `0s` per FR-040

### CI gates

- [X] T034 [P] Create `apps/web/scripts/scan-theme-leaks.mjs` implementing the grep-based leak detector per `contracts/theme-tokens.md` §8; exit non-zero on any hex/rgb/hsl/oklch/font-family literal outside `apps/web/src/styles/`
- [X] T035 [P] Create `apps/web/scripts/scan-terminology.mjs` implementing the "no visible 'Deployment' noun" detector per `contracts/theme-tokens.md` §10; allowed carve-out for the sidebar item label and URL/code identifiers
- [X] T036 [P] Create `apps/web/scripts/scan-remote-cdns.mjs` scanning `dist/**/*.{js,css,html}` for `fonts.googleapis.com`, `fonts.gstatic.com`, `lh3.googleusercontent.com`, `cdn.jsdelivr.net`, `cdn.tailwindcss.com`, and any non-`localhost` absolute URL
- [X] T037 Wire all three scanners into `apps/web/package.json` scripts (`scan:theme`, `scan:terminology`, `scan:cdn`) + run them as part of `build`

**Checkpoint**: Foundation ready — every user-story phase below can begin in parallel.

---

## Phase 3: User Story 6 — Backend "modules" read-surface + deploy shortcut (Priority: P1)

**Goal**: Deliver `GET /api/v1/modules`, `GET /api/v1/modules/{id}`, `GET /api/v1/modules/{id}/blueprint`, `POST /api/v1/modules/{id}/deployments`, `POST /api/v1/modules/{id}/blueprint/dry-run`, and `POST /api/v1/modules/user:draft:{uuid}/materialize`. Frontend stories US1..US4 depend on this phase.

**Independent Test**: `cargo test -p nexus-api --test modules_contract` passes; `curl http://localhost:3000/api/v1/modules` returns a well-shaped envelope for a seeded DB with ≥ 3 extensions.

### Tests for US6 (written FIRST per Principle VI)

- [X] T038 [P] [US6] Contract test `crates/nexus-api/tests/modules_contract.rs::list_shape_and_ordering` — asserts response shape + Extension-first-then-User ordering + `display_name ASC` per INV-019-6
- [X] T039 [P] [US6] Contract test `crates/nexus-api/tests/modules_contract.rs::list_filters_by_kind_and_q` — `kind=extension|user|all` + `q=` substring filter
- [X] T040 [P] [US6] Contract test `crates/nexus-api/tests/modules_contract.rs::blueprints_ordered_primary_first` — `blueprints[]` has `is_primary=true` at index 0 + sort-order fallback when `primary_recipe_id` is NULL
- [X] T041 [P] [US6] Contract test `crates/nexus-api/tests/modules_contract.rs::null_icon_renders_fallback` — no-manifest-icon extension returns `ModuleIcon::Fallback` with deterministic glyph
- [X] T042 [P] [US6] Contract test `crates/nexus-api/tests/modules_detail_contract.rs::detail_404_on_missing_module`
- [X] T043 [P] [US6] Contract test `crates/nexus-api/tests/modules_detail_contract.rs::detail_rejects_draft_id` — `GET /modules/user:draft:{uuid}` → HTTP 400 `module.draft_id_not_allowed`
- [ ] T044 [P] [US6] Contract test `crates/nexus-api/tests/modules_deploy_shortcut.rs::deploy_default_blueprint_201`
- [ ] T045 [P] [US6] Contract test `crates/nexus-api/tests/modules_deploy_shortcut.rs::deploy_with_recipe_id_override`
- [ ] T046 [P] [US6] Contract test `crates/nexus-api/tests/modules_deploy_shortcut.rs::deploy_422_on_foreign_recipe_id` — `module.recipe_not_in_module`
- [ ] T047 [P] [US6] Contract test `crates/nexus-api/tests/modules_deploy_shortcut.rs::deploy_400_on_draft_id`
- [ ] T048 [P] [US6] Contract test `crates/nexus-api/tests/modules_deploy_shortcut.rs::deploy_409_on_disabled_extension`
- [ ] T214 [P] [US6] Contract test `crates/nexus-api/tests/modules_deploy_shortcut.rs::multi_instance_distinct_hashes` — two POSTs to the same `module_id` with different `runtime_binding_overrides` + `model_binding_overrides` produce two deployments with distinct `effective_workflow_hash` values and independent lifecycle state (archive one does not affect the other) (SC-004, spec 018 User Story 4)
- [ ] T049 [P] [US6] Contract test `crates/nexus-api/tests/modules_materialize_idempotency.rs::materialize_happy_201` (SC-019)
- [ ] T050 [P] [US6] Contract test `crates/nexus-api/tests/modules_materialize_idempotency.rs::materialize_idempotent_same_body` (SC-020 — 2nd POST → 200, same ids, 0 new rows)
- [ ] T051 [P] [US6] Contract test `crates/nexus-api/tests/modules_materialize_idempotency.rs::materialize_409_on_body_diff`
- [ ] T052 [P] [US6] Contract test `crates/nexus-api/tests/modules_materialize_idempotency.rs::materialize_new_rows_after_ttl_expiry`
- [ ] T053 [P] [US6] Contract test `crates/nexus-api/tests/modules_materialize_idempotency.rs::materialize_400_on_bad_uuid`
- [ ] T054 [P] [US6] Contract test `crates/nexus-api/tests/modules_dry_run_contract.rs::dry_run_no_runs_row_created`
- [ ] T215 [P] [US6] Contract test `crates/nexus-api/tests/modules_nomutation_contract.rs` — for each of `GET /modules`, `GET /modules/{id}`, `GET /modules/{id}/blueprint`, `POST /modules/{id}/deployments`, `POST /modules/{id}/blueprint/dry-run`, `POST /modules/user:draft:{uuid}/materialize`: snapshot byte-hashes of all rows in `workflows`, `recipes`, `extensions`, and every non-new `deployments` row before the call; re-hash after; assert zero diff on base-source rows (SC-013, invariant INV-019-1/-2)
- [ ] T217 [P] [US6] Contract test `crates/nexus-api/tests/modules_never_auto_installs_contract.rs` — for every module-surface endpoint, assert the handler never creates an `extensions` install row, a `runtime_installs` row, a `runtime_settings` row, or spawns an install job; failing fixture case calls the endpoint on an extension whose runtime is absent, verifies the response is a `restore_state=restorable_with_degraded_features` diagnostic instead of a silent install (FR-031, carry-over of spec 018 SI-03)

### Implementation for US6

- [X] T055 [P] [US6] Create DTO types `ModuleSummary`, `ModuleDetail`, `ModuleIcon`, `RecipeRef`, `DeploymentCounts`, `CompatibilitySummary`, `BlueprintProjection`, `DryRunPlan` in `crates/nexus-api/src/handlers/modules/envelope.rs` (all `#[non_exhaustive]`, `#[serde(rename_all = "snake_case")]`)
- [X] T056 [P] [US6] Create `DraftMaterializeMap` with `tokio::sync::RwLock<HashMap<Uuid, DraftEntry>>` + 60 s sweeper + 10 min TTL in `crates/nexus-api/src/handlers/modules/draft_map.rs`
- [X] T057 [US6] Implement `list` handler in `crates/nexus-api/src/handlers/modules/aggregator.rs` with parallel `tokio::join!` over extensions + workflows + deployment-counts queries; compose `ModuleSummary[]` with FNV fallback for icons; sort per INV-019-6
- [X] T058 [US6] Implement `detail` handler in `crates/nexus-api/src/handlers/modules/aggregator.rs` (full `ModuleDetail` projection)
- [X] T059 [US6] Implement `blueprint` handler in `crates/nexus-api/src/handlers/modules/aggregator.rs` (`BlueprintProjection` with optional `recipe_id` query param; 422 on foreign recipe_id)
- [X] T060 [US6] Implement `create` in `crates/nexus-api/src/handlers/modules/deploy_shortcut.rs` that delegates to `DeploymentSaveService::save` with resolved blueprint + overrides; rejects `user:draft:*` path with 400
- [X] T061 [US6] Implement `run` in `crates/nexus-api/src/handlers/modules/dry_run.rs` producing an ephemeral plan (no `runs` row, no artifact)
- [X] T062 [US6] Implement `materialize` in `crates/nexus-api/src/handlers/modules/materialize.rs` with single-transaction `workflows` + `DeploymentSaveService::save` + body-hash idempotency per `contracts/draft-materialize.md` §2
- [X] T063 [US6] Wire all routes in `crates/nexus-api/src/router.rs` under `/api/v1/modules` and `/api/v1/modules/user:draft:{uuid}/materialize`
- [X] T064 [US6] Emit `module.deploy.instance` + `module.blueprint.viewed` + `module.viewed` events (local bus only per FR-TP01) in the respective handlers
- [X] T065 [P] [US6] Rust doc-comments on every public trait + DTO explaining invariants (Principle IV — `///` doc-comments only, no inline comments)

**Checkpoint**: Backend endpoints live + all 17 contract tests green. UI stories can now fetch real data.

---

## Phase 4: User Story 9 — Install Extension from ZIP (Priority: P1)

**Goal**: `POST /api/v1/extensions/install-from-zip` + `InstallExtensionDrawer` UI reachable from both the Modules page header (FR-IE01) and the Extensions sidebar page. Implements the R-A clarification (FR-IE01..FR-IE07).

**Independent Test**: Upload the happy fixture ZIP via curl → 201 with new `extension_id` + `module_id`; upload any adversarial fixture → 422 with the FR-IE05 code; staging dir cleaned up afterwards (SC-017, SC-018).

### Fixtures & tests for US9 (written FIRST)

- [ ] T066 [P] [US9] Create happy fixture `crates/nexus-extension/tests/fixtures/zips/happy/cinema-engine.zip` (valid manifest.toml at root, valid icon, ≤ 64 MiB)
- [ ] T067 [P] [US9] Create adversarial fixture `.../adv/path-traversal.zip` (entry `../../../etc/passwd`)
- [ ] T068 [P] [US9] Create adversarial fixture `.../adv/bomb-uncompressed.zip` (300 MiB uncompressed)
- [ ] T069 [P] [US9] Create adversarial fixture `.../adv/many-files.zip` (9000 entries)
- [ ] T070 [P] [US9] Create adversarial fixture `.../adv/no-manifest.zip`
- [ ] T071 [P] [US9] Create adversarial fixture `.../adv/svg-on-handler.zip` (icon.svg with `onload=` attribute)
- [ ] T072 [P] [US9] Create adversarial fixture `.../adv/exec-outside-assets.zip` (executable at root)
- [ ] T073 [P] [US9] Create adversarial fixture `.../adv/already-installed.zip` (extension_id collision)
- [ ] T074 [P] [US9] Contract test `crates/nexus-api/tests/install_from_zip_contract.rs::happy_201_creates_extension_and_module` (SC-017)
- [ ] T075 [P] [US9] Contract test `crates/nexus-api/tests/install_from_zip_contract.rs::rejects_zip_slip_422` (SC-018)
- [ ] T076 [P] [US9] Contract test `crates/nexus-api/tests/install_from_zip_contract.rs::rejects_size_limit_413`
- [ ] T077 [P] [US9] Contract test `crates/nexus-api/tests/install_from_zip_contract.rs::rejects_file_count_limit_422`
- [ ] T078 [P] [US9] Contract test `crates/nexus-api/tests/install_from_zip_contract.rs::rejects_missing_manifest_422`
- [ ] T079 [P] [US9] Contract test `crates/nexus-api/tests/install_from_zip_contract.rs::rejects_bad_svg_422`
- [ ] T080 [P] [US9] Contract test `crates/nexus-api/tests/install_from_zip_contract.rs::rejects_exec_outside_assets_422`
- [ ] T081 [P] [US9] Contract test `crates/nexus-api/tests/install_from_zip_contract.rs::rejects_already_installed_409`
- [ ] T082 [P] [US9] Contract test `crates/nexus-api/tests/install_from_zip_contract.rs::cleans_staging_on_every_failure` (SC-018 leftover-check)

### Implementation for US9 — backend pipeline

- [ ] T083 [P] [US9] Create `ZipInstallError` enum with all FR-IE05 variants in `crates/nexus-extension/src/install/error.rs` (`thiserror`)
- [ ] T084 [P] [US9] Create `ZipSizeLimits` struct + defaults (256 MiB uncompressed, 8192 file count, 64 MiB compressed) in `crates/nexus-extension/src/install/limits.rs`
- [ ] T085 [US9] Create `StagingDir` RAII guard with `Drop` cleanup + `.consume()` on success in `crates/nexus-extension/src/install/stage.rs`
- [ ] T086 [US9] Create `validate_zip.rs` in `crates/nexus-extension/src/install/validate_zip.rs` implementing steps 2–6 of `contracts/zip-install-pipeline.md` §2: parse central directory, Zip-Slip double-check (`enclosed_name()` + canonicalize prefix), require manifest at depth ≤ 2, size + file-count caps, executable-outside-assets gate with manifest peek
- [ ] T087 [US9] Create atomic-rename helper in `crates/nexus-extension/src/install/stage.rs::atomic_rename` that returns 409 on pre-existing target
- [ ] T088 [US9] Create `ZipInstallPipeline` orchestrator in `crates/nexus-extension/src/install/zip_install.rs` wiring all 12 steps per `contracts/zip-install-pipeline.md` §2; runs blocking I/O under `tokio::task::spawn_blocking`
- [ ] T089 [US9] Create `install/mod.rs` re-exporting public surface; register in `crates/nexus-extension/src/lib.rs`
- [ ] T090 [US9] Create axum multipart handler in `crates/nexus-api/src/handlers/extensions_install/zip_handler.rs` with per-route `RequestBodyLimitLayer::new(64 << 20)` + streaming upload to staging + calling `ZipInstallPipeline::install`; returns `ZipInstallResult` on 201
- [ ] T091 [US9] Wire `POST /api/v1/extensions/install-from-zip` route in `crates/nexus-api/src/router.rs`
- [ ] T092 [US9] Emit `module.installed` event on success (local bus, FR-TP01)

### Implementation for US9 — frontend drawer

- [ ] T093 [P] [US9] Add `installExtensionFromZip(file: File): Promise<ZipInstallResult>` to `apps/web/src/api/client.ts` (FormData, progress hooks)
- [ ] T094 [P] [US9] Create `apps/web/src/install/install_extension_drawer.tsx` with glass-panel right drawer + drag-and-drop zone + `<input type="file" accept=".zip">` + progress/error UI per FR-IE01..FR-IE07
- [ ] T095 [P] [US9] Create `apps/web/src/install/install_extension_drawer.css.ts` using theme tokens (no literals — CI-gated by T034)
- [ ] T096 [US9] Render drawer-open CTA `+ Install Extension` in the Modules page header (see T108 for page scaffold) — secondary button style
- [ ] T097 [US9] Render drawer-open CTA in the Extensions sidebar page header (existing `apps/web/src/views/extensions_gallery.tsx`) — primary button style
- [ ] T098 [US9] Optimistic module-card slide-in on success (200 ms transform per FR-041, suppressed under reduced motion) + background revalidation via `queryClient.invalidateQueries(['modules'])`
- [ ] T099 [P] [US9] Vitest unit test `apps/web/tests/install_extension_drawer.test.tsx` — drop → POST → success path
- [ ] T100 [P] [US9] Playwright e2e `apps/web/tests/e2e/zip_install.spec.ts` covering SC-017 (happy path) and SC-018 (three of the adversarial fixtures via file upload to verify error rendering)

**Checkpoint**: Users can install a ZIPped extension from the Modules page header or the Extensions sidebar page; every adversarial fixture returns a specific error code; staging never leaks.

---

## Phase 5: User Story 1 — Modules page as single entry point (Priority: P1) 🎯 MVP

**Goal**: Replace `Recipes` + `Workflows` sidebar items with a single `Modules` item; render the bento-grid Modules page with extension cards + User Modules group + Blank Module card; support search, facets, virtualization, legacy redirects.

**Independent Test**: Start the app → sidebar has `Home / Modules / Deployments / Runs / Artifacts / Extensions`. Visit `/#/modules` → grid renders one card per installed extension plus the User Modules group. Visit `/#/recipes` or `/#/workflows` → redirects to `/#/modules`. `grep l.id.includes\(` in `apps/web/src/App.tsx` returns zero matches (SC-015).

### Tests for US1 (written FIRST)

- [ ] T101 [P] [US1] Vitest unit test `apps/web/tests/modules_view.test.tsx::renders_all_installed_extensions_as_cards`
- [ ] T102 [P] [US1] Vitest unit test `apps/web/tests/modules_view.test.tsx::shows_user_modules_group_and_blank_card`
- [ ] T103 [P] [US1] Vitest unit test `apps/web/tests/modules_view.test.tsx::search_filters_by_name_and_tag`
- [ ] T104 [P] [US1] Vitest unit test `apps/web/tests/module_icon.test.tsx` covering all three `ModuleIcon` kinds (symbol, svg, fallback) + active-state `'FILL' 1`
- [ ] T105 [P] [US1] Playwright e2e `apps/web/tests/e2e/modules_navigation.spec.ts` asserting sidebar composition (SC-001) + legacy redirects `/recipes` → `/modules` and `/workflows/{id}` → `/modules/user:{id}/blueprint` (SC-012)

### Implementation for US1

- [ ] T106 [P] [US1] Create reusable `ModuleIcon` component in `apps/web/src/components/module_icon.tsx` handling `symbol | svg | fallback` with client-side SVG re-sanitization defense-in-depth per `contracts/module-icon.md` §5
- [ ] T107 [P] [US1] Create client-side SVG re-sanitizer in `apps/web/src/components/svg_sanitize_client.ts` (mirror of allow-list in `contracts/module-icon.md` §1)
- [ ] T108 [US1] Create `apps/web/src/modules/modules_view.tsx` — bento grid (12-col responsive), header with title + search + `+ Install Extension` CTA slot (wired to T096)
- [ ] T109 [P] [US1] Create `apps/web/src/modules/modules_view.css.ts` using theme tokens
- [ ] T110 [US1] Create `apps/web/src/modules/module_card.tsx` — primary-dim glow on hover (compositor-only, reduced-motion-suppressed), `View Blueprint` + `Deploy Instance` CTAs, `(N) ▾` suffix when `blueprints.length > 1` (T129 will add the picker UI)
- [ ] T111 [P] [US1] Create `apps/web/src/modules/module_card.css.ts`
- [ ] T112 [US1] Create `apps/web/src/modules/blank_module_card.tsx` with ghost-border + `"add_box"` glyph + `Start Building` CTA (wired to T150 draft flow)
- [ ] T113 [US1] Create `apps/web/src/modules/user_modules_group.tsx` with sectioned header + Blank Module card pinned at top
- [ ] T114 [US1] Create `apps/web/src/modules/modules_search.tsx` — search input + `Module kind` facet (Extension|User|All) + `Status` facet + Clear button
- [ ] T115 [US1] Wire `@tanstack/react-virtual` for grids > 60 cards in `modules_view.tsx`; below threshold, native CSS Grid
- [ ] T116 [P] [US1] Add `fetchModules(params): Promise<ModuleListEnvelope>` + `fetchModule(id)` to `apps/web/src/api/client.ts`
- [ ] T117 [US1] Update `apps/web/src/layout/sidebar.tsx` — remove `recipes` and `workflows` entries, add `modules` between `home` and `deployments` (`apps` icon)
- [ ] T118 [US1] Update `apps/web/src/App.tsx` — register `/#/modules` (→ `ModulesView`), `/#/modules/{id}` (→ `ModuleDetailView` from T211), and `/#/modules/{id}/blueprint` routes; remove the substring-heuristic icon code at lines 94–100 (SC-015)
- [ ] T119 [US1] Create `apps/web/src/modules/legacy_redirect.tsx` component + wire legacy hash routes `/recipes` → `/modules` and `/workflows/{id}` → `/modules/user:{id}/blueprint` using `history.replaceState`
- [ ] T120 [US1] Add first-visit deprecation banner component for legacy routes (dismissible, session-scoped)
- [ ] T209 [P] [US1] Vitest unit test `apps/web/tests/module_detail_view.test.tsx::renders_summary_and_deployments_list` covering FR-012 + FR-013
- [ ] T210 [P] [US1] Playwright e2e `apps/web/tests/e2e/module_detail_navigation.spec.ts` asserting click on module card title area routes to `/#/modules/{id}`, renders deployments list, and "View Blueprint" / "Deploy Instance" CTAs route correctly (FR-012..FR-014)
- [ ] T211 [US1] Create `apps/web/src/modules/module_detail_view.tsx` rendering header + blueprint summary (first 3 recipe steps) + compatibility chip row + full deployments-of-this-module list + `View Blueprint` and `Deploy Instance` CTAs per FR-012..FR-014; consumes `GET /api/v1/modules/{module_id}`
- [ ] T212 [P] [US1] Create `apps/web/src/modules/module_detail_view.css.ts` using theme tokens (no literals; CI-gated by T034)
- [ ] T213 [P] [US1] Playwright perf test `apps/web/tests/e2e/modules_fmp_budget.spec.ts` — seeds `apps/web/fixtures/modules-200.json` (200-module payload) via request-interception, measures FMP via Performance API marks, asserts ≤ 200 ms on warm cache and ≤ 1500 ms on cold (FR-010, SC-002)

**Checkpoint**: Modules page + detail view render; sidebar is reshaped; icons resolve from manifest + fallback; legacy routes redirect; 200-module perf budget holds. US1 is independently demoable and is the MVP.

---

## Phase 6: User Story 2 — Deploy a new instance with one click (Priority: P1)

**Goal**: `Deploy Instance` CTA on module cards triggers one network call to `POST /api/v1/modules/{module_id}/deployments` and navigates to the new Instance editor with Graph tab active. Multi-blueprint extensions show `(N) ▾` quick-pick.

**Independent Test**: Click `Deploy Instance` on a module card → HAR shows exactly one POST → URL routes to `/#/deployments/{new_id}` → the Instance editor renders on Graph tab (SC-003, SC-011).

### Tests for US2 (written FIRST)

- [ ] T121 [P] [US2] Vitest unit test `apps/web/tests/module_card.test.tsx::single_recipe_deploys_without_quickpick`
- [ ] T122 [P] [US2] Vitest unit test `apps/web/tests/module_card.test.tsx::multi_recipe_opens_quickpick_and_forwards_recipe_id`
- [ ] T123 [P] [US2] Playwright e2e `apps/web/tests/e2e/deploy_instance_flow.spec.ts` (SC-003)

### Implementation for US2

- [ ] T124 [P] [US2] Add `deployFromModule(module_id, body): Promise<DeploymentEnvelope>` to `apps/web/src/api/client.ts`
- [ ] T125 [US2] Wire `Deploy Instance` CTA click handler in `apps/web/src/modules/module_card.tsx` — POST + nav; disables button + shows spinner during POST
- [ ] T126 [US2] Handle 409 `module.disabled` (show tooltip) + 422 `module.recipe_not_in_module` (should never fire from the UI; assert-log)
- [ ] T127 [US2] Emit optimistic nav to `/#/deployments/{id}` as soon as the POST resolves (no extra fetch round-trip)
- [ ] T128 [P] [US2] Create `apps/web/src/modules/blueprint_quick_pick.tsx` — dropdown listing `blueprints[]` with `is_primary` marker + `primary-tinted` dot; keyboard navigable (arrow keys, Enter)
- [ ] T129 [US2] Wire `(N) ▾` button on `module_card.tsx` to open `BlueprintQuickPick`; selected `recipe_id` is forwarded in `POST /deployments` body; shared between `View Blueprint` and `Deploy Instance`

**Checkpoint**: One click → new Instance → editor open. Multi-blueprint modules let the user pick a non-primary blueprint before deploying.

---

## Phase 7: User Story 3 — Blueprint view (read-only) (Priority: P1)

**Goal**: `View Blueprint` opens `/modules/{id}/blueprint` with zero focusable form inputs; two CTAs (`Dry Run`, `Clone to Deployment`); recipe picker pill row when `blueprints.length > 1`; Instances-of-this-module list.

**Independent Test**: Open the view → axe scan returns zero focusable inputs (SC-005); click `Dry Run` → inline plan renders, no `runs` row created; click `Clone to Deployment` → behaves identically to `Deploy Instance`.

### Tests for US3 (written FIRST)

- [ ] T130 [P] [US3] Vitest unit test `apps/web/tests/blueprint_view.test.tsx::no_focusable_inputs`
- [ ] T131 [P] [US3] Vitest unit test `apps/web/tests/blueprint_view.test.tsx::renders_all_steps_with_op_codes_in_mono`
- [ ] T132 [P] [US3] Vitest unit test `apps/web/tests/blueprint_view.test.tsx::recipe_picker_pill_row_when_multi_blueprint`
- [ ] T133 [P] [US3] Playwright e2e `apps/web/tests/e2e/blueprint_readonly.spec.ts` (SC-005)

### Implementation for US3

- [ ] T134 [P] [US3] Add `fetchBlueprint(module_id, recipe_id?)` + `dryRunModuleBlueprint(module_id, body)` to `apps/web/src/api/client.ts`
- [ ] T135 [US3] Create `apps/web/src/modules/blueprint_view.tsx` — numbered step list (step number, op-code in `secondary` JBM, description in Inter body, 3-col defining-params grid in `tertiary` JBM); sticky header with two CTAs
- [ ] T136 [P] [US3] Create `apps/web/src/modules/blueprint_view.css.ts`
- [ ] T137 [US3] Create `apps/web/src/modules/blueprint_recipe_picker_pills.tsx` — horizontal pill row shown when `blueprints.length > 1`; primary first
- [ ] T138 [US3] Implement `Dry Run` CTA with inline plan render; loading spinner ≤ 500 ms; no persistence
- [ ] T139 [US3] Implement `Clone to Deployment` CTA — delegates to the US2 `deployFromModule` flow with the currently-viewed `recipe_id`
- [ ] T140 [US3] Create Instances-of-this-module list section at the bottom of the view (consumes `ModuleDetail.deployments`)
- [ ] T141 [US3] Register `/#/modules/{id}/blueprint` route in `App.tsx`
- [ ] T142 [US3] Handle `user:blank` module_id specially — Blueprint view routes redirect to `/#/modules`
- [ ] T216 [US3] Wire "Export .nx" secondary affordance in `apps/web/src/modules/blueprint_view.tsx` — visible only when `ModuleDetail.deployments.total > 0`; delegates to the existing `POST /api/v1/deployments/{id}/export` on the module's most-recently-created deployment; renders inline download; hidden otherwise (FR-018)

**Checkpoint**: Blueprint view renders read-only; Dry Run and Clone to Deployment work; Export .nx surfaces only for modules with ≥ 1 deployment; axe confirms zero focusable inputs.

---

## Phase 8: User Story 4 — Instance editor with 4 tabs + revision viewing + Blank Module materialize (Priority: P1)

**Goal**: Complete Instance editor shell with Recipe / Stage / Graph / Trace tablist, Recipe tab segmented `[Overlay | Blueprint]` control, revision picker with Viewing-mode + Make-current flow, Blank Module client-side draft + server-side materialize round-trip.

**Independent Test**: Open an Instance → switch between all 4 tabs → identity banner stays consistent. Edit on Recipe tab → Save Draft creates `auto_draft` revision without advancing current; Deploy Changes creates `save_as_version` and advances current (SC-006). Open revision picker → pick non-current → Viewing mode + banner + disabled affordances; click Make current with dirty draft → 2 POSTs in order (auto_draft, then save_as_version) + editor returns to Editing (SC-016). Click Blank Module 50 times without saving → zero new `workflows` rows; save the 51st → exactly one new `workflows` + one new `deployments` row; URL rewrites from `user:draft:{uuid}` to `user:{workflow_id}` without reload (SC-019, SC-020).

### Tests for US4 (written FIRST)

- [ ] T143 [P] [US4] Vitest unit test `apps/web/tests/instance_editor_reducer.test.ts::transitions_editing_to_viewing_preserves_draft`
- [ ] T144 [P] [US4] Vitest unit test `apps/web/tests/instance_editor_reducer.test.ts::back_to_current_restores_draft`
- [ ] T145 [P] [US4] Vitest unit test `apps/web/tests/instance_editor_reducer.test.ts::draft_mode_to_editing_on_materialize_ack`
- [ ] T146 [P] [US4] Vitest unit test `apps/web/tests/instance_editor_reducer.test.ts::make_current_blocks_on_incompatible_revision` (FR-RV06)
- [ ] T147 [P] [US4] Vitest unit test `apps/web/tests/draft_session.test.ts::session_storage_roundtrip_byte_identical`
- [ ] T148 [P] [US4] Vitest unit test `apps/web/tests/draft_session.test.ts::size_cap_512kib_surfaces_warning`
- [ ] T149 [P] [US4] Contract test `crates/nexus-api/tests/revision_view_revert_contract.rs::full_round_trip_with_dirty_draft` (SC-016)
- [ ] T150 [P] [US4] Playwright e2e `apps/web/tests/e2e/revision_view_revert.spec.ts` covering UI-state assertions (SC-016)
- [ ] T151 [P] [US4] Playwright e2e `apps/web/tests/e2e/blank_module_zero_orphan.spec.ts` covering 50-click-no-orphan + save 51st + URL rewrite (SC-019, SC-020)
- [ ] T152 [P] [US4] Playwright e2e `apps/web/tests/e2e/recipe_tab_segmented.spec.ts` (SC-023)

### Implementation for US4 — Blank Module draft infra

- [ ] T153 [P] [US4] Create `apps/web/src/modules/draft/draft_uuid.ts` — mint + regex-validate `user:draft:{uuid}` ids
- [ ] T154 [P] [US4] Create `apps/web/src/modules/draft/draft_session.ts` — sessionStorage mirroring with 500 ms debounce + 512 KiB cap + warning surface
- [ ] T155 [P] [US4] Create `apps/web/src/modules/draft/materialize_client.ts` — POST + `history.replaceState` + sessionStorage cleanup + `queryClient.invalidateQueries`
- [ ] T156 [P] [US4] Add `materializeDraft(uuid, body)` to `apps/web/src/api/client.ts`

### Implementation for US4 — editor shell + reducer

- [ ] T157 [US4] Create `apps/web/src/instance_editor/instance_editor_reducer.ts` + `InstanceEditorSession` type (editing | viewing | draft variants) + all transition cases per `contracts/revision-view-revert.md` §2
- [ ] T158 [US4] Create `apps/web/src/instance_editor/instance_editor_shell.tsx` — identity banner (Instance ID in JBM, acid-green dot, display_name, module badge, revision "▾") + tablist
- [ ] T159 [P] [US4] Create `apps/web/src/instance_editor/instance_editor_shell.css.ts`
- [ ] T160 [US4] Register `/#/deployments/{id}` and `/#/modules/user:draft:{uuid}` routes in `App.tsx`

### Implementation for US4 — tabs

- [ ] T161 [US4] Create `apps/web/src/instance_editor/recipe_tab.tsx` with segmented control `[Overlay | Blueprint]` (role=tablist, aria-selected, arrow-key nav, Cmd/Ctrl+B toggle); dirty-indicator dot on Overlay segment; overlay inputs disabled under Blueprint segment
- [ ] T162 [P] [US4] Create `apps/web/src/instance_editor/recipe_tab.css.ts`
- [ ] T163 [US4] Create `apps/web/src/instance_editor/stage_tab.tsx` wrapping existing `StageView` scoped to the deployment
- [ ] T164 [US4] Create `apps/web/src/instance_editor/graph_tab.tsx` wrapping existing `GraphView` scoped to the deployment
- [ ] T165 [US4] Create `apps/web/src/instance_editor/trace_tab.tsx` wrapping existing `RunTraceView` filtered by `deployment_run_links`

### Implementation for US4 — revision viewing + revert

- [ ] T166 [US4] Create `apps/web/src/instance_editor/revision_picker.tsx` — glass-panel popover anchored to identity banner "▾"; fetches `/deployments/{id}/revisions?limit=50&order=desc`; keyboard nav
- [ ] T167 [US4] Create `apps/web/src/instance_editor/viewing_mode_banner.tsx` per FR-RV02 — sticky, `secondary_container` background, "Back to current" + "Make this the current revision" CTAs; fires viewingBannerEntrance transform ≤ 160 ms
- [ ] T168 [US4] Create `apps/web/src/instance_editor/make_current_modal.tsx` per FR-RV05 — confirm with three buttons; focus trap; default focus on "Save draft & revert"
- [ ] T169 [US4] Implement write-affordance gating: in `viewing` mode all parameter inputs, Graph node drag handles, port reconnects, Save Draft, Deploy Changes, Recipe Overlay segment are disabled; Trace tab stays interactive
- [ ] T170 [US4] Implement Make-current POST flow per `contracts/revision-view-revert.md` §7 — copy-forward body equal to revision N's snapshot + `change_summary="reverted to revision N"`; handle the 2-POST path when dirty draft exists
- [ ] T171 [US4] Implement FR-RV06 compatibility block — disable Make-current CTA + surface dimension-specific warning when `compatibility_state ∈ {incompatible, missing}`

### Implementation for US4 — draft-mode editor presentation

- [ ] T172 [US4] Render draft-mode banner in `instance_editor_shell.tsx` (FR-BM02): `"Unsaved draft — first save will create a new User Module"` + Instance ID shown as `— (draft)` + revision `—`
- [ ] T173 [US4] Implement Discard Draft affordance per FR-BM06 — confirm modal, clear sessionStorage, nav to `/modules`

**Checkpoint**: Instance editor is fully wired — 4 tabs, Recipe segmented control, revision picker with Viewing mode and Make-current flow, Blank Module draft lifecycle end-to-end. All 10 US4 tests pass.

---

## Phase 9: User Story 7 — Deployments flat view gains module-provenance badges (Priority: P2)

**Goal**: Existing `DeploymentsView` continues to work; every row shows a module badge (extension icon + name); adds `Module = {id}` filter facet + `User Modules only` toggle.

**Independent Test**: Open `/#/deployments` with seeded mix of extension-backed + user-backed deployments → every row has a module badge; apply `User Modules only` → only user-backed rows remain; apply `Module = Cinema Engine` → only that module's deployments remain.

### Tests for US7 (written FIRST)

- [ ] T174 [P] [US7] Vitest unit test `apps/web/tests/deployments_view.test.tsx::every_row_has_module_badge`
- [ ] T175 [P] [US7] Vitest unit test `apps/web/tests/deployments_view.test.tsx::user_modules_only_toggle_filters`
- [ ] T176 [P] [US7] Playwright e2e `apps/web/tests/e2e/deployments_provenance.spec.ts`

### Implementation for US7

- [ ] T177 [P] [US7] Create `apps/web/src/modules/module_badge.tsx` — compact `<ModuleIcon size=16/> <name>` chip with click navigation to module detail
- [ ] T178 [US7] Integrate module badge into `apps/web/src/views/deployments_view.tsx` row renderer (looks up icon + name from a cached `GET /modules` response)
- [ ] T179 [US7] Add `Module = {id}` filter facet component
- [ ] T180 [US7] Add `User Modules only` toggle component
- [ ] T181 [US7] Add breadcrumb `← Back to Modules` on the Instance editor — navigates to module detail view, not the flat list

**Checkpoint**: Flat Deployments list gains provenance without breaking existing behavior.

---

## Phase 10: User Story 8 — Accessibility, reduced motion, keyboard navigation (Priority: P2)

**Goal**: Keyboard traversal works end-to-end; `role=tablist` on Instance editor tab bar and Recipe segmented control; `role=grid` on module bento; reduced-motion compliance; WCAG 2.2 AA contrast.

**Independent Test**: `axe-core` scan on every module-surface page returns zero serious/critical violations (SC-008); keyboard-only traversal reaches every interactive element (SC-009); under `prefers-reduced-motion: reduce` no glow transitions fire (SC-010, SC-022).

### Tests for US8 (written FIRST)

- [ ] T182 [P] [US8] Install `@axe-core/playwright` dev dep
- [ ] T183 [P] [US8] Playwright e2e `apps/web/tests/e2e/a11y_axe.spec.ts` scanning `/modules`, `/modules/ext:cinema-engine`, `/modules/ext:cinema-engine/blueprint`, `/deployments/{id}` (SC-008)
- [ ] T184 [P] [US8] Playwright e2e `apps/web/tests/e2e/keyboard_navigation.spec.ts` (SC-009) with pointer input disabled
- [ ] T185 [P] [US8] Playwright e2e `apps/web/tests/e2e/reduced_motion.spec.ts` emulating `prefers-reduced-motion: reduce` + asserting motion tokens collapse to `0s` (SC-010, SC-022)
- [ ] T186 [P] [US8] Playwright e2e `apps/web/tests/e2e/motion_budgets.spec.ts` reading motion tokens via `getComputedStyle` and asserting ±20 ms of budget (SC-022)

### Implementation for US8

- [ ] T187 [P] [US8] Apply `role=tablist` + `aria-selected` + arrow-key / Home / End handling to the Instance editor tab bar in `apps/web/src/instance_editor/instance_editor_shell.tsx`
- [ ] T188 [P] [US8] Apply `role=tablist` to the Recipe segmented control (done in T161 — this task audits)
- [ ] T189 [P] [US8] Apply `role=grid` + `aria-rowcount` + `aria-colcount` + arrow-key navigation to `apps/web/src/modules/modules_view.tsx`
- [ ] T190 [P] [US8] Audit status chips across the codebase and ensure every color-coded chip pairs color with a text label or icon (FR-045)
- [ ] T191 [P] [US8] Audit focus-ring styling across all CTAs (2 px `primary` outline + primary-dim glow, suppressed under reduced motion) — consolidated in `apps/web/src/styles/elevation.css.ts`
- [ ] T192 [P] [US8] Run manual contrast audit on the palette using `vars.color.onSurface` on `vars.color.surface` and the four accent colors on their `on-*` companions; adjust tokens if any pair fails 4.5:1 (normal text) or 3:1 (large text / UI)

**Checkpoint**: A11y scans pass; keyboard-only traversal reaches every surface; reduced-motion fully honored.

---

## Phase 11: User Story 5 — Spectral Graphite design system enforcement (Cross-cutting P1 gate — runs last by design)

**Note on phase ordering**: US5 is P1 in the spec, but its *enforcement* (CI scanners + visual-regression tests) is intentionally placed after all other UI phases because scans audit *completed* code. The *tokens* US5 depends on were delivered in Phase 2 (Foundational) and are already P1-blocking. Phase 11 is therefore a late-stage gate, not a priority violation — no UI story merges unless the scans in this phase are green.

**Goal**: Validate that US1..US4 + US7..US9 all consume the design tokens from Phase 2 and that no component file introduces a hex/rgb/hsl/oklch/font-family literal or remote CDN reference.

**Independent Test**: `pnpm scan:theme` exits 0 (SC-007); `pnpm scan:terminology` exits 0 (SC-014); `pnpm scan:cdn` on `dist/` exits 0 (SC-021); a Playwright interceptor observes zero non-localhost network requests across the full scripted session (SC-021).

### Tests for US5 (written FIRST — scans run against the partially-implemented codebase and serve as the enforcement gate)

- [ ] T193 [P] [US5] Playwright e2e `apps/web/tests/e2e/local_first_network.spec.ts` with a `page.route('**/*', ...)` interceptor failing on any non-localhost request (SC-021)
- [ ] T194 [P] [US5] Playwright e2e `apps/web/tests/e2e/terminology_compliance.spec.ts` asserting zero "Deployment" noun in JSX text of `/modules`, `/modules/{id}`, `/modules/{id}/blueprint`, `/deployments/{id}` (SC-014)

### Implementation for US5 — final cleanup passes

- [ ] T195 [US5] Run `pnpm scan:theme` → fix any leak surfaced (should land zero-leak by the time all UI stories complete; this task is the final audit pass)
- [ ] T196 [US5] Run `pnpm scan:terminology` → fix any visible "Deployment" noun surfaced — allowed carve-out is the sidebar item label + URL segments + API types + test fixtures
- [ ] T197 [US5] Run `pnpm build && pnpm scan:cdn` against `dist/` → fix any remote-host reference surfaced
- [ ] T198 [US5] Verify the current Google-Fonts `@import` (if any) is removed and every font is served from `/fonts/*.woff2` (FR-TP04)
- [ ] T199 [US5] Verify the `https://lh3.googleusercontent.com/…` avatar placeholders from the mockups are NOT present in the released code (FR-TP05) — avatars render as locally-computed initials or Material Symbol fallback

**Checkpoint**: All three scanners green; local-first posture locked in.

---

## Phase 12: Polish & Cross-Cutting Concerns

**Purpose**: Documentation, CI wiring, manual quickstart validation.

- [ ] T200 [P] Update `crates/nexus-extension/README.md` with a "ZIP install" section describing `POST /api/v1/extensions/install-from-zip` + pipeline steps + fixture layout
- [ ] T201 [P] Update `apps/web/README.md` with a "Spectral Graphite theme" section + "Modules page" section + "Blank Module draft lifecycle" section + "Install Extension from ZIP" section
- [ ] T202 [P] Update root `README.md` with a link to `specs/019-extension-modules/` and a bullet under "Recent changes" summarizing the Modules page + ZIP install additions (Principle VIII)
- [ ] T203 [P] Add CHANGELOG entry documenting the sunset of `/#/recipes` and `/#/workflows` routes (one release cycle before removal; FR-004)
- [ ] T204 [P] Run `cargo fmt --all` + `cargo clippy --workspace --all-targets -- -D warnings` and fix any regressions introduced by this feature
- [ ] T205 [P] Run `cargo test --workspace` and verify all 17 contract tests + 8 unit tests pass
- [ ] T206 [P] Run `pnpm --filter @nexus/web test` (Vitest) + `pnpm --filter @nexus/web test:e2e` (Playwright) and verify 100% pass
- [ ] T207 Execute `specs/019-extension-modules/quickstart.md` end-to-end manually on a freshly-built host; record any step that fails and file a follow-up issue per the quickstart's closing note
- [ ] T208 Update `specs/019-extension-modules/checklists/requirements.md` — tick every checkbox once its backing FR/SC has green tests

---

## Dependencies & Execution Order

### Phase dependencies (hard)

- Phase 1 (Setup) → has no dependencies
- Phase 2 (Foundational) → depends on Phase 1; **BLOCKS every user-story phase**
- Phase 3 US6 (backend) → depends on Phase 2; **BLOCKS US1/US2/US3/US4** (they fetch from these endpoints)
- Phase 4 US9 (ZIP install) → depends on Phase 2; **independent** of US1..US4 (may land in parallel)
- Phase 5 US1 → depends on Phase 2 + Phase 3
- Phase 6 US2 → depends on Phase 5 (uses ModuleCard) + Phase 3 (uses shortcut endpoint)
- Phase 7 US3 → depends on Phase 5 + Phase 3
- Phase 8 US4 → depends on Phase 3 (materialize endpoint, revision endpoints from 018) + Phase 5 (routes into editor from ModulesView); independent of US2/US3
- Phase 9 US7 → depends on Phase 5 (module badge component + `fetchModules` cache)
- Phase 10 US8 → depends on every UI phase being substantially complete (scans target real code)
- Phase 11 US5 → depends on every UI phase being substantially complete
- Phase 12 Polish → depends on all user-story phases green

### Task-level parallel opportunities within phases

- **Phase 1**: T002..T007 all `[P]` — can run together
- **Phase 2**: T011..T015, T017..T028, T029..T033, T034..T036 are all `[P]` and hit disjoint files
- **Phase 3 US6**: all contract tests T038..T054 are `[P]`; DTO/draft-map scaffolds T055, T056, T065 are `[P]` with handlers
- **Phase 4 US9**: all fixtures T066..T073 are `[P]`; all contract tests T074..T082 are `[P]`; frontend drawer tasks T093..T095, T099..T100 are `[P]` with backend
- **Phase 5 US1**: test tasks T101..T105 are `[P]`; icon component T106, T107 are `[P]`
- **Phase 7 US3**: all test tasks are `[P]`
- **Phase 8 US4**: all 10 test tasks T143..T152 are `[P]`; draft infra T153..T156 are `[P]`
- **Phase 10 US8**: all scans + aria audits are `[P]`
- **Phase 12 Polish**: every task except T207 (manual quickstart) is `[P]`

### Within each user story

- Tests (T038–T054 for US6, T074–T082 for US9, T101–T105 for US1, T121–T123 for US2, T130–T133 for US3, T143–T152 for US4, T174–T176 for US7, T182–T186 for US8, T193–T194 for US5) MUST be written and FAIL before implementation tasks in that story begin
- Backend handlers depend on DTOs + draft-map scaffolds
- Frontend components depend on API client additions
- Route wiring is the last implementation task per UI story

### Parallel team strategy

Once Phase 2 completes:

- **Developer A**: Phase 3 (US6 backend) — self-contained
- **Developer B**: Phase 4 (US9 ZIP install) — pipeline + drawer, parallel to US6
- **Developer C**: Phase 5 (US1 Modules page) — begins consuming Developer A's endpoints as soon as US6 mid-point delivers `GET /modules`
- Once Phase 5 lands, **Developers A+C** fork into Phase 6 (US2), Phase 7 (US3), Phase 8 (US4) — each a ~1 day story
- Phase 9 (US7), Phase 10 (US8), Phase 11 (US5) run at the end by any available developer

---

## Parallel Example: US4 (Instance editor + Blank Module)

```bash
# Launch all US4 tests together (10 parallel agents):
Task: "Vitest instance_editor_reducer.test.ts::transitions_editing_to_viewing_preserves_draft"
Task: "Vitest instance_editor_reducer.test.ts::back_to_current_restores_draft"
Task: "Vitest instance_editor_reducer.test.ts::draft_mode_to_editing_on_materialize_ack"
Task: "Vitest instance_editor_reducer.test.ts::make_current_blocks_on_incompatible_revision"
Task: "Vitest draft_session.test.ts::session_storage_roundtrip_byte_identical"
Task: "Vitest draft_session.test.ts::size_cap_512kib_surfaces_warning"
Task: "Rust contract test revision_view_revert_contract.rs::full_round_trip_with_dirty_draft"
Task: "Playwright e2e revision_view_revert.spec.ts"
Task: "Playwright e2e blank_module_zero_orphan.spec.ts"
Task: "Playwright e2e recipe_tab_segmented.spec.ts"

# Launch draft-infra scaffolds together (4 parallel agents):
Task: "Create apps/web/src/modules/draft/draft_uuid.ts"
Task: "Create apps/web/src/modules/draft/draft_session.ts"
Task: "Create apps/web/src/modules/draft/materialize_client.ts"
Task: "Add materializeDraft to apps/web/src/api/client.ts"
```

---

## Implementation Strategy

### MVP (US1 + its dependencies)

1. Phase 1 Setup → Phase 2 Foundational (blocks everything)
2. Phase 3 US6 (backend endpoints) — required for US1 to fetch modules
3. Phase 5 US1 (Modules page) — MVP user-visible outcome
4. **STOP and VALIDATE**: Modules page renders, legacy redirects work, sidebar reshaped

Demo-able. No deployment flow yet but the information architecture is in place.

### Incremental delivery

1. MVP (as above) → Deploy/Demo
2. + US9 (Install ZIP) → users can add extensions without restart → Deploy/Demo
3. + US2 (Deploy Instance) + US3 (Blueprint) → full module browsing + deploying flow → Deploy/Demo
4. + US4 (Instance editor + revision + Blank Module) → full editing round-trip → Deploy/Demo
5. + US7 (Deployments badges) + US8 (A11y) + US5 (design enforcement) + Polish → production-ready

### Blocked work

- Every UI story is blocked by US6 (backend); do NOT start UI stories until US6 contract tests are green.
- US8 (A11y) should not start until US1..US4 are substantially implemented — it audits real code.
- US5 (design enforcement) is a final gate — its scans MUST be green before merge.

---

## Notes

- [P] tasks = different files, no dependencies on incomplete work
- **[P] on same-file test tasks**: Several test tasks carry `[P]` but land in the same file (examples: T038–T041 in `modules_contract.rs`; T049–T053 in `modules_materialize_idempotency.rs`; T074–T082 in `install_from_zip_contract.rs`; T143–T146 in `instance_editor_reducer.test.ts`). `[P]` here means **logically parallel** — each test asserts a disjoint concern — not that they can be *authored* in parallel by multiple agents. A single agent should add each `#[test]` function sequentially to avoid merge conflicts on the file itself; review and CI execution of those tests remain parallel.
- [USN] label maps task to user story for traceability and independent testing
- Tests MUST fail before implementation (Principle VI)
- Commit after each task or logical group to preserve bisectability (Principle IX)
- Every commit MUST leave `cargo check --workspace` and `pnpm build` green (Principle IX)
- Avoid cross-story dependencies that break independence — stories should be slideable
- All `ALTER TABLE` / migration work is idempotent (Constitution Architectural Constraints)
- No `unwrap()` outside test files (Principle VII); use `thiserror` everywhere
- No inline comments outside the `// SAFETY:` carve-out (Principle IV)

---

## Task summary

| Phase | Tasks | Story | Priority |
|---|---|---|---|
| 1. Setup | T001–T007 (7) | — | — |
| 2. Foundational | T008–T037 (30) | — | — |
| 3. US6 Backend modules surface | T038–T065 + T214 + T215 + T217 (31) | US6 | P1 |
| 4. US9 ZIP install | T066–T100 (35) | US9 | P1 |
| 5. US1 Modules page | T101–T120 + T209–T213 (25) | US1 | P1 |
| 6. US2 Deploy Instance | T121–T129 (9) | US2 | P1 |
| 7. US3 Blueprint view | T130–T142 + T216 (14) | US3 | P1 |
| 8. US4 Instance editor + revisions + Blank Module | T143–T173 (31) | US4 | P1 |
| 9. US7 Deployments badges | T174–T181 (8) | US7 | P2 |
| 10. US8 A11y | T182–T192 (11) | US8 | P2 |
| 11. US5 Design enforcement (cross-cutting gate) | T193–T199 (7) | US5 | P1-gate |
| 12. Polish | T200–T208 (9) | — | — |
| **Total** | **217 tasks** (208 original + 9 remediation T209–T217) | | |

**Independent test criteria (per story)** — refer to each phase's "Independent Test" line; every story can be demoed after its phase completes without requiring later phases.

**Suggested MVP scope**: Phase 1 + Phase 2 + Phase 3 (US6) + Phase 5 (US1). Approximately 93 tasks; delivers the consolidated Modules page + Module detail view with extension cards, working backend, and perf/no-mutation regression tests.

**Format validation**: every task above follows `- [ ] T<N> [P?] [USN?] Description with file path`. Checkbox ✓, ID ✓, P marker where parallelizable ✓, Story label on every user-story-phase task ✓ (and absent from Setup/Foundational/Polish), file path in every description ✓.
