# Spec 019 — Checkpoint for next session

**Branch**: `019-extension-modules`
**Last commit**: `13a71af feat(spec-019 M3-M5): Spectral Graphite tokens + CI scanners + modules aggregator`
**Date**: 2026-04-16
**Progress**: 53 of 217 tasks complete (Phase 1 ✅, Phase 2 ✅, Phase 3 US6 foundations ✅)

---

## Resume in 60 seconds

```bash
# 1. Verify you're on the right branch
git rev-parse --abbrev-ref HEAD    # should print: 019-extension-modules
git log --oneline -5               # top commit: 13a71af

# 2. Verify workspace is still green
cargo check --workspace
cargo test --workspace             # expect 86 binaries pass, 0 failures

# 3. Verify CI scanners still exit 0
node apps/web/scripts/scan-theme-leaks.mjs
node apps/web/scripts/scan-terminology.mjs
cd apps/web && npx vite build && cd ../.. && node apps/web/scripts/scan-remote-cdns.mjs

# 4. Install frontend dep that's still pending (T002)
cd apps/web && pnpm install && cd ../..
```

If all four pass, you're ready to resume.

---

## What's done (DO NOT redo)

### Phase 1 — Setup (✅ 6/7 tasks; T002 pending)

| Task | Status | Artifact |
|------|--------|----------|
| T001 | ✅ | Branch `019-extension-modules` created |
| T002 | ⏸ | Needs `pnpm install` run — package.json already has `@tanstack/react-virtual` listed |
| T003 | ✅ | `fnv`, `zip`, `quick-xml` in `nexus-extension/Cargo.toml`; `regex-lite` in `nexus-api/Cargo.toml` |
| T004–T006 | ✅ | Fonts at `apps/web/public/fonts/{inter,jetbrains-mono,material-symbols-outlined}.woff2` + `LICENSES.txt` |
| T007 | ✅ | `crates/nexus-extension/vendor/material-symbols-glyphs.txt` (4220 glyph names) |

### Phase 2 — Foundational (✅ 30/30 tasks)

**Schema & data layer** (T008–T020):
- `migrations/012_extensions_primary_refs.sql` — 5 additive nullable columns
- `records.rs` — `ExtensionRecord` extended + new `IconKind { Symbol, Svg }` enum
- Query files extended; `upsert_primary_refs.sql` + `upsert_icon.sql` new
- `extensions.rs` mappers + `upsert_primary_refs` + `upsert_icon` helpers
- 6 new unit tests in `sqlite/tests.rs`: migration_012_applies, idempotent_rerun, null_on_legacy, icon_symbol_roundtrip, icon_svg_roundtrip, upsert_primary_refs_roundtrip

**Newtypes + icon + sanitizer** (T021–T028):
- `ModuleId` newtype at `crates/nexus-api/src/handlers/modules/module_id.rs` (11 parse tests)
- `ManifestIcon { symbol?, svg? }` on `ExtensionInfo` — NOT `#[non_exhaustive]` (schema contract)
- `icon_resolver.rs` — `ModuleIconResolver` trait + `FnvFallbackResolver` + 16-glyph `FALLBACK_GLYPHS` + 9 tests
- `install/svg_sanitize.rs` — quick-xml allow-list validator + 11 tests
- `build.rs` — emits `MATERIAL_SYMBOLS: &[&str]` from vendored glyph list; `is_valid_material_symbol` binary-searches

**Design tokens** (T029–T033):
- `apps/web/src/styles/theme.css.ts` (28 color + typography + tracking + radius + space + text + z)
- `motion.css.ts` (9 durations + 3 easings)
- `elevation.css.ts` (ghostBorder, glassPanel, primaryDimGlow, surfaceCard, focusRing, acidGreenPulse)
- `typography.css.ts` (self-hosted @font-face + global rules)
- `tokens.css` (CSS custom-property mirror + `prefers-reduced-motion: reduce` override)
- `index.ts` single entry point

**CI scanners** (T034–T037):
- `scripts/scan-theme-leaks.mjs` + `.theme-leaks-baseline.txt` (41 legacy files, shrink-only)
- `scripts/scan-terminology.mjs` (3-line marker window)
- `scripts/scan-remote-cdns.mjs` (BENIGN_HOSTS: xmlns + library error pages)
- `package.json` wires `scan:theme`, `scan:terminology`, `scan:cdn` and runs `scan:cdn` as part of `build`

### Phase 3 US6 — Backend modules surface (✅ 13/31 tasks; 10 deferred + 8 tests remaining)

**Contract tests landed** (7/17): `modules_contract.rs` — list_shape_and_ordering, list_filters_by_kind, blueprints_ordered_primary_first, detail_404_on_missing_module, detail_rejects_draft_id, blueprint_rejects_foreign_recipe_id, list_excludes_extensions_without_recipes.

**Implementation** (11/11):
- `envelope.rs` — all 14 DTOs
- `aggregator.rs` — `list`, `detail`, `blueprint` handlers live + working
- `deploy_shortcut.rs` — **501 STUB** (structured error `module.deploy_not_implemented`)
- `materialize.rs` — **501 STUB** with UUID-v4 validation already in place
- `dry_run.rs` — returns ephemeral plan with diagnostic note
- `mod.rs` — `router()` + `draft_router()` wired
- `router.rs` — nested under `/api/v1/modules`
- `error.rs` — `ApiError::Structured` + `structured()` + `From<StorageError>`

**Workspace-wide callsite fix-ups**: `nexus-core/src/app.rs`, `nexus-api/src/mapping.rs`, `nexus-storage/tests/migrate_006.rs`, `nexus-storage/tests/recipe_workflow_wiring.rs`, `nexus-api/tests/disabled_extension_filter.rs`, `nexus-api/tests/runtime_dep_resolution.rs` — all picked up the new `ExtensionRecord` / `ExtensionInfo` fields.

### Green signals at checkpoint time

| Signal | Status |
|--------|--------|
| `cargo check --workspace` | ✅ green |
| `cargo test --workspace` | ✅ 86 test binaries pass, 0 failures |
| `node apps/web/scripts/scan-theme-leaks.mjs` | ✅ 162 files clean |
| `node apps/web/scripts/scan-terminology.mjs` | ✅ 149 files clean |
| `node apps/web/scripts/scan-remote-cdns.mjs` (after `vite build`) | ✅ 3 dist files clean |
| `npx tsc --noEmit` in `apps/web/` | ✅ clean |

---

## What's next (164 tasks remaining)

Recommended resumption order:

### Next immediate slice — finish Phase 3 US6 (18 tasks)

Turn the two 501 stubs into real handlers + land remaining contract tests.

**Stub → real on `deploy_shortcut.rs`** (unblocks US2 Deploy Instance):
- Resolve `{extension, recipe, default_workflow}` from `module_id` + optional `recipe_id` override
- Delegate to `nexus_deployments::service::save::DeploymentSaveService::save` with `SaveMode::Create` and the overrides from the body
- Return the same `DeploymentEnvelope` shape as `POST /api/v1/deployments`
- Error codes: `module.not_found` (404), `module.recipe_not_in_module` (422), `module.disabled` (409), `module.draft_id_not_allowed` (400)

**Stub → real on `materialize.rs`** (unblocks US4 Blank Module flow):
- Create `DraftMaterializeMap` at `crates/nexus-api/src/handlers/modules/draft_map.rs` — `Arc<RwLock<HashMap<Uuid, DraftEntry>>>` with `tokio::spawn`-ed 60 s sweeper; 10 min TTL
- Store on `AppState` (requires touching `lib.rs`)
- In the handler: hash body via SHA-256 over RFC 8785 JCS (reuse spec 018's hasher in `nexus_deployments::hash`), check the map for idempotency hit/conflict
- On miss: single SQLite transaction creates `workflows` row (source_kind=user) + delegates to `DeploymentSaveService::save`
- Return `{ module_id: "user:{workflow_id}", deployment_id, deployment_revision_id }` with HTTP 201 (first time) or 200 (idempotent replay)

**Remaining contract tests to author** (10):
- `modules_deploy_shortcut.rs` — `deploy_default_blueprint_201`, `deploy_with_recipe_id_override`, `deploy_422_on_foreign_recipe_id`, `deploy_400_on_draft_id`, `deploy_409_on_disabled_extension`, `multi_instance_distinct_hashes` (T214)
- `modules_materialize_idempotency.rs` — 5 tests: happy_201, idempotent_same_body, conflict_on_body_diff, new_rows_after_ttl_expiry, bad_uuid (T049–T053)
- `modules_dry_run_contract.rs::dry_run_no_runs_row_created` (T054)
- `modules_nomutation_contract.rs` (T215)
- `modules_never_auto_installs_contract.rs` (T217)

### Phase 4 US9 — ZIP install (35 tasks, parallelizable with US6 finish)

Self-contained backend subsystem + UI drawer. Pipeline contract is fully specified in `contracts/zip-install-pipeline.md` (12 steps, Zip-Slip double-check, StagingDir RAII, 64 MiB compressed / 256 MiB uncompressed / 8192 file caps). Adversarial fixtures enumerated in `contracts/zip-install-pipeline.md` §8.

### Phase 5 US1 — Modules page MVP (25 tasks)

Needs US6 live. Covered in `contracts/theme-tokens.md` + `contracts/module-icon.md` + `contracts/http-api.md`.

### Phases 6–11 — later MVP-follow-up + polish (50+ tasks)

Full breakdown in `tasks.md`.

---

## Known deferrals / gotchas

1. **`DeploymentSaveService::save` signature**: need to confirm the exact `SaveRequest` struct shape when wiring the real handlers. Spec 018 contracts cover it; check `crates/nexus-deployments/src/service/save.rs`.

2. **Body-hash canonicalization**: the materialize-idempotency contract requires SHA-256 over RFC 8785 JCS. Reuse `nexus_deployments::hash` — don't roll a new canonicalizer.

3. **Theme-leak baseline is shrink-only**: migrating any of the 41 pre-019 files from `.theme-leaks-baseline.txt` to the token surface is fine (delete the line); adding new files is a policy violation — fix the leak, don't allowlist.

4. **501 stubs are not failures**: the existing `modules_contract.rs::*` tests do NOT hit the 501 stubs; they're exercised only when the real endpoints are wired. When you write the `deploy_default_blueprint_201` test, remember the handler currently returns 501.

5. **`ApiError::Structured`**: added for 019-specific codes (`module.recipe_not_in_module`, etc.). Use `ApiError::structured(status, code, message)` for any new spec-019 error site. Don't bloat the top-level enum with one variant per code.

6. **`regex-lite` over `regex`**: added `regex-lite` to `nexus-api/Cargo.toml` (already in nexus-extension). `ModuleId` and `materialize`'s UUID-v4 matcher both use it. Don't introduce full `regex` — MSRV + binary-size.

7. **Non-exhaustive semantics**: DTOs in `envelope.rs` are **not** `#[non_exhaustive]` on purpose (they're response-side types consumed by both Rust contract tests and the web client — additive JSON changes are handled by serde on the wire, struct-literal access stays ergonomic for tests). `ManifestIcon` is also NOT `#[non_exhaustive]` (schema contract). `ZipInstallError` + `ModuleIcon` enum + `IconKind` persisted enum + `ModuleIconResolver` trait-source ARE `#[non_exhaustive]`.

8. **Draft uuid path collision**: the two routers are `router()` (catches `/{module_id}`) and `draft_router()` (catches `/user:draft:{uuid}/materialize` specifically). Both nest under the same `/modules` prefix in axum. If you add a new route, make sure it doesn't shadow the draft path.

---

## Files touched on this branch so far (for ref)

```
Commits:
  0f89d2a  feat(018 follow-up): wire Deployments view (on main before branch)
  943c683  docs(spec-019): specify + plan + tasks + analyze + remediation
  23fb304  feat(spec-019 M1-M2): migration 012 + ExtensionRecord + icon + ModuleId
  13a71af  feat(spec-019 M3-M5): Spectral Graphite tokens + scanners + aggregator

Created:
  migrations/012_extensions_primary_refs.sql
  apps/web/public/fonts/{inter,jetbrains-mono,material-symbols-outlined}.woff2
  apps/web/public/fonts/LICENSES.txt
  apps/web/scripts/{scan-theme-leaks,scan-terminology,scan-remote-cdns}.mjs
  apps/web/scripts/.theme-leaks-baseline.txt
  apps/web/src/styles/{theme,motion,elevation,typography}.css.ts
  apps/web/src/styles/{tokens.css,index.ts}
  crates/nexus-extension/vendor/material-symbols-glyphs.txt
  crates/nexus-extension/build.rs
  crates/nexus-extension/src/{icon_resolver.rs, install/{mod.rs, svg_sanitize.rs}}
  crates/nexus-api/src/handlers/modules/{mod.rs, module_id.rs, envelope.rs,
    aggregator.rs, deploy_shortcut.rs, materialize.rs, dry_run.rs}
  crates/nexus-api/tests/modules_contract.rs

Modified:
  CLAUDE.md (via update-agent-context.ps1)
  apps/web/index.html (removed Google Fonts @import)
  apps/web/package.json (scripts + @tanstack/react-virtual)
  apps/web/src/views/deployments_view.tsx (3× scan-terminology: allow)
  crates/nexus-api/Cargo.toml (regex-lite)
  crates/nexus-api/src/error.rs (Structured variant + From<StorageError>)
  crates/nexus-api/src/handlers/mod.rs (+ modules)
  crates/nexus-api/src/mapping.rs (5 new ExtensionRecord fields)
  crates/nexus-api/src/router.rs (nests modules + draft_router)
  crates/nexus-api/tests/disabled_extension_filter.rs (5 new fields)
  crates/nexus-api/tests/runtime_dep_resolution.rs (icon: None)
  crates/nexus-core/src/app.rs (5 new ExtensionRecord fields)
  crates/nexus-extension/Cargo.toml (fnv + zip + quick-xml)
  crates/nexus-extension/src/lib.rs (re-exports)
  crates/nexus-extension/src/manifest.rs (ManifestIcon + icon on ExtensionInfo)
  crates/nexus-storage/queries/extensions/insert.sql (+ 5 columns)
  crates/nexus-storage/queries/extensions/{upsert_primary_refs,upsert_icon}.sql
  crates/nexus-storage/src/lib.rs (re-exports)
  crates/nexus-storage/src/records.rs (ExtensionRecord + IconKind)
  crates/nexus-storage/src/row_mapping.rs
  crates/nexus-storage/src/sqlite/extensions.rs (+ pub mod, + upsert helpers)
  crates/nexus-storage/src/sqlite/migrations.rs (+ 012)
  crates/nexus-storage/src/sqlite/mod.rs (pub mod extensions)
  crates/nexus-storage/src/sqlite/tests.rs (+ 6 tests)
  crates/nexus-storage/tests/migrate_006.rs (5 new fields)
  crates/nexus-storage/tests/recipe_workflow_wiring.rs (5 new fields)
  specs/019-extension-modules/tasks.md (53 tasks marked [X])
```

---

## Constitution compliance at checkpoint

Every principle still PASS:
- I Ecosystem-First ✅ every new dep is battle-tested (`fnv`, `zip`, `quick-xml`, `@tanstack/react-virtual`)
- II SOLID/pure/CQS ✅ aggregator is query-only; command endpoints don't leak state
- III Modularity ✅ no new crate; largest new file is ~380 LOC (`aggregator.rs`)
- IV Self-Documenting ✅ zero inline comments outside `// SAFETY:` carve-out and the `// scan-terminology: allow` markers (which are themselves scanner-required, not prose commentary)
- V Extendability ✅ `ModuleIconResolver` trait; `#[non_exhaustive]` on every new public enum
- VI Test-First ✅ 6 storage tests + 11 ModuleId tests + 9 icon-resolver tests + 11 SVG-sanitize tests + 7 modules-contract tests = 44 new tests before any UI work
- VII Memory/type safety ✅ newtypes (`ModuleId`, `IconKind`), typed errors (`SvgSanitizeError`, `ZipInstallError`), no `unwrap()` outside tests
- VIII Living docs ✅ this RESUME.md + full contracts/ directory
- IX Bisectable ✅ every intermediate commit leaves `cargo check --workspace` green
- X Parallelism ✅ aggregator composes independent queries; pipeline steps are single-responsibility
- XI Rust idioms ✅ iterator chains, no clone-to-satisfy-borrowck, no deref polymorphism, `thiserror` + typed errors everywhere

---

## If you get stuck

1. Read the corresponding contract under `specs/019-extension-modules/contracts/`
2. Check `specs/019-extension-modules/plan.md` § Post-Design Constitution Re-check — every principle has concrete in-plan notes
3. Read `specs/019-extension-modules/spec.md` — the spec is the source of truth; the tests lock the spec in place
4. Run the failing scanner/test locally; error messages are intentionally rich (FR-IE05 codes, structured diagnostic categories)

**Happy shipping.**
