# Changelog

## [Unreleased]

### Refined — Spec 019 semantic model correction (2026-04-16)

- **Instances are read-only**. The "Instance editor" surface is retired and replaced with an "Instance view" that renders the module's default payload across 4 tabs (Recipe, Stage, Graph, Trace) with zero focusable form controls.
- **Drafts are the universal fork mechanism**. Clicking "Edit" on any Instance view mints a client-side UUID, copies the instance's resolved payload into sessionStorage, and routes to `/#/modules/{source_module_id}/draft/{uuid}`. The existing materialize endpoint handles both Blank Module forks (creates a new `workflows` row) and instance-derived forks (sets `source.extension_id` or `source.workflow_id` directly on the new deployment).
- **Revision picker + Make-current flow move to the Deployment editor spec**. Instance views have no revisions — revisions belong to Deployments.
- **Constitution v1.1.2**: Principle VI gains a design-heavy-UI carve-out permitting per-spec deferral of vitest/Playwright frontend test files, with backend contract tests still mandatory. First invocation: spec 019.
- **New FRs**: FR-050..FR-054 codify the Edit → Draft → materialize pipeline and the read-only enforcement layers.
- **Retired FRs**: FR-021 (Recipe overlay segmented control), FR-022 (Stage tab editable bindings), FR-025 (Save Draft / Deploy Changes on Instance editor), FR-BM06 (Discard replaced by universal FR-052), FR-RV01..FR-RV06 (move to Deployment editor spec).
- **Tasks**: 13 previously-checked tasks in Phase 8 marked `[~OBS]` (superseded by the refinement); new Phase 8R adds T400..T409 for the refined work.

### Added — Spec 019 Extension Modules + Spectral Graphite UI

- `GET /api/v1/modules`, `GET /api/v1/modules/{id}`,
  `GET /api/v1/modules/{id}/blueprint` — aggregate read surface composing
  extensions + recipes + workflows + deployments into a unified "module"
  identity (FR-027..FR-031).
- `POST /api/v1/modules/{id}/deployments` — one-click deploy shortcut that
  delegates to `DeploymentSaveService::save` with resolved blueprint +
  caller overrides (FR-028, SC-003).
- `POST /api/v1/modules/{id}/blueprint/dry-run` — ephemeral plan, no runs
  row persisted (FR-029).
- `POST /api/v1/modules/user:draft:{uuid}/materialize` — creates a User
  Module workflow + initial deployment in a single transaction; body-hash
  idempotent for 10 min (FR-BM04, SC-019/020).
- `POST /api/v1/extensions/install-from-zip` — streaming multipart upload
  with Zip-Slip double-check, size/count caps, manifest validation, and
  SVG allow-list sanitizer. 10 failure modes map 1:1 to FR-IE05 codes.
- Migration `012_extensions_primary_refs.sql` — 5 additive nullable
  columns on `extensions` (`primary_recipe_id`, `default_workflow_id`,
  `icon_kind`, `icon_symbol`, `icon_svg`).
- `ModuleInstalled` event on the local bus (FR-TP01; never crosses
  process boundaries to external systems).
- Spectral Graphite design token surface under
  `apps/web/src/styles/` — single source of truth for colors, typography,
  motion, and elevation. Three CI scanners enforce it
  (`pnpm scan:theme`, `pnpm scan:terminology`, `pnpm scan:cdn`).
- Self-hosted Inter, JetBrains Mono, and Material Symbols fonts under
  `apps/web/public/fonts/`. Zero remote font references.

### Changed

- Sidebar: `Modules` replaces the separate `Recipes` + `Workflows`
  entries. The existing substring-based icon heuristic in `App.tsx` is
  removed (SC-015).
- `DeploymentsView` gains a `User modules only` toggle, module filter
  facet, and a module provenance badge on every row.
- Frontend build now runs `scan:cdn` against `dist/` as a post-build
  step; `scan:theme` + `scan:terminology` run on every file edit.

### Deprecated

- `/#/recipes` and `/#/workflows/{id}` routes now redirect to
  `/#/modules` and `/#/modules/user:{id}/blueprint` respectively. These
  routes emit a deprecation banner on first visit and will be removed in
  the release following this one (FR-004).

### Security

- SVG icons (both manifest-declared and client-side-rendered) pass
  through a strict allow-list validator — `<script>`, `on*` handlers,
  `<foreignObject>`, and `xlink:*` attributes cause the whole icon to
  fail, never partial strip (FR-I03).
- ZIP install pipeline enforces a 64 MiB compressed body limit at the
  axum layer plus 256 MiB uncompressed + 8192 entry caps inside the
  pipeline. Zip-Slip is double-checked via both `enclosed_name()` and a
  component-level scan.
- All module-surface endpoints carry byte-identity guarantees on
  base-source rows (`workflows`, `recipes`, `extensions`, pre-existing
  `deployments`) — contract test `modules_nomutation_contract.rs`
  enforces INV-019-1/-2.
