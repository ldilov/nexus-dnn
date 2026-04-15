# Implementation Plan: Workflow Extension Catalog

**Branch**: `009-workflow-extension-catalog` | **Date**: 2026-04-14 | **Spec**: [spec.md](./spec.md)

## Summary

Bring the Workflows browser to parity with the Recipes browser: persist the contributing extension on every shipped workflow, expose that attribution through the API, and replace the flat workflow grid in `apps/web/src/catalog/workflow_catalog.tsx` with a grouped, searchable, filterable catalog that mirrors `recipe_catalog.tsx`. Stop the "auto-open first workflow" behavior so the catalog is always the first surface when the user visits Workflows. Reuse the existing search/filter UX rather than building a second one — lift the shared pieces into a `catalog_controls` module so Workflows and Recipes consume the same component.

## Technical Context

**Language/Version**: Rust 1.85+ (2024 edition) host; TypeScript 5.7 (strict) frontend.
**Primary Dependencies**: sqlx 0.8, axum 0.8, serde, ts-rs (backend). React 19 + Compiler, vanilla-extract, @xyflow/react 12 (frontend, already installed).
**Storage**: SQLite via `nexus-storage`. One additive migration (`006_workflow_extension_attribution.sql`) adds `extension_id`, `extension_version`, `extension_version_first_seen` columns to `workflows`, backfills from extension manifests at first boot, indexes by `extension_id`.
**Testing**: `cargo test` per crate, Playwright E2E for the catalog (grouping, selection-first, search).
**Target Platform**: Linux/macOS/Windows host, Chromium/Firefox/Safari for the web UI.
**Project Type**: Monorepo — Rust backend (`crates/nexus-*`), TypeScript frontend (`apps/web`), YAML-shipped extensions (`extensions/builtin/*`).
**Performance Goals**: Search feels instantaneous (p95 < 100 ms) on a 500-item combined catalog (SC-006).
**Constraints**: Backward compat with existing workflow rows, runs, artifacts, lineage (FR-022). Unknown-origin workflows become "User" (FR-023). Spectral Graphite visuals (FR-021).
**Scale/Scope**: Hundreds of workflows across ~tens of extensions (per spec §Assumptions).

## Constitution Check

Gates from `.specify/memory/constitution.md` (v1.2.0):

| Principle | How this plan complies |
|---|---|
| **I. Ecosystem-First** | Reuses existing `nexus-extension` registry, `nexus-storage` SQLite stack, `ts-rs` codegen, vanilla-extract tokens — no hand-rolled alternatives. |
| **II. Pure Functions, SOLID & Patterns** | Catalog state (search query + filters + selection) modeled as a pure reducer; grouping is a pure function `groupByExtension(items, extensions)`. Strategy pattern for status derivation (`deriveStatus(workflow) -> Stable \| Modified \| User`). |
| **III. Extendability** | The catalog consumes the same extension registry already used by Recipes. A future "Tools" catalog can reuse the same `<CatalogShell>` component. |
| **IV. Self-Documenting Code** | Doc attributes only. Named types: `WorkflowStatus::Modified`, `CatalogGroup::UserWorkflows`. |
| **V. Git-Flow Branching** | `009-workflow-extension-catalog` from `develop`. Conventional commits, `Lazar Dilov <ldilov@yahoo.com>`. |
| **VI. Living Documentation** | README gets a brief "Workflow Catalog" note; spec folder holds the authoritative reference. |
| **VII. Clean Provenance** | No attribution markers beyond ts-rs' `// @generated`. |
| **VIII. Memory Safety** | No `unsafe`. All fallible paths return `Result<_, StorageError>` / structured `ApiError`. |
| **IX. Parallelism-First** | Catalog load issues `GET /workflows` and `GET /extensions` concurrently via `Promise.all`. Backfill migration runs per extension in parallel via `tokio::join!`. |
| **X. Modern React Patterns** | `use()` + Suspense for the initial catalog load. No manual `useMemo`/`useCallback`/`React.memo` introduced. `useEffectEvent` for the search-debounce read path. |

**Pre-Phase-0 gate: PASS** — no violations.

## Project Structure

### Source changes

```text
crates/
├── nexus-storage/
│   ├── migrations/006_workflow_extension_attribution.sql   # NEW
│   ├── queries/workflows/{insert,update,list,get_by_id}.sql  # extended with 3 new columns
│   ├── src/records.rs::WorkflowRecord                      # +extension_id, +extension_version, +extension_version_first_seen
│   └── src/row_mapping.rs::map_workflow_row                # read new columns
├── nexus-core/src/app.rs::persist_workflow_records         # stamp extension id/version on first insert
├── nexus-api/
│   ├── src/dto/workflows.rs::WorkflowDto + WorkflowSummaryDto  # expose attribution + derived status
│   └── src/handlers/workflows.rs                           # response shape grows; no new route
└── nexus-workflow/src/parser.rs                            # already understands extension manifest; no change needed

apps/web/src/
├── catalog/
│   ├── catalog_shell.tsx             # NEW — shared grouped layout (header + body + controls)
│   ├── catalog_shell.css.ts          # NEW
│   ├── catalog_controls.tsx          # NEW — shared search input + status/extension filters
│   ├── catalog_controls.css.ts       # NEW
│   ├── workflow_catalog.tsx          # rewritten: consumes catalog_shell + catalog_controls
│   ├── recipe_catalog.tsx            # refactored to share catalog_shell + catalog_controls
│   └── catalog.css.ts                # tokens consolidated
├── hooks/use_catalog_state.ts        # NEW — pure reducer: { query, statusFilters, extensionFilter, selected }
├── layout/workspace_shell.tsx        # do not auto-select first workflow when switching to Workflows tab
└── App.tsx                           # route "workflows" renders the catalog first, editor only when a workflow is selected
```

No new crate, no new route — response shapes grow on the existing `GET /workflows` and `GET /extensions` endpoints.

### Documentation (this feature)

```text
specs/009-workflow-extension-catalog/
├── spec.md        # already authored
├── plan.md        # this file
├── tasks.md       # next (Phase 2 output)
└── checklists/    # existing
```

data-model.md, research.md, contracts/, and quickstart.md are skipped intentionally — the data-model change is a 3-column ALTER captured fully in §4 below; no open research questions; no external contracts change (same routes, additive DTO fields); quickstart is the spec's own Independent Test per user story.

## Phase 0 — Research

No open questions. The feature is a UX upgrade plus one additive migration; every decision is prescribed by FR-001…FR-023. Skipped.

## Phase 1 — Design & Contracts

Condensed since the feature is shallow:

### Data model delta

```sql
-- migrations/006_workflow_extension_attribution.sql
ALTER TABLE workflows ADD COLUMN extension_id TEXT REFERENCES extensions(id);
ALTER TABLE workflows ADD COLUMN extension_version TEXT;
ALTER TABLE workflows ADD COLUMN extension_version_first_seen TEXT;
CREATE INDEX IF NOT EXISTS idx_workflows_extension ON workflows(extension_id);
```

All three columns nullable — a NULL `extension_id` means the workflow is user-authored (FR-002 / FR-023).

### Backfill strategy

At first boot after the migration:
1. `nexus-core::persist_workflow_records` already enumerates extensions and the workflows each ships. Extend it so when it UPSERTs a shipped workflow row, it also stamps `extension_id = <ext.id>`, `extension_version = <ext.version>`, `extension_version_first_seen = COALESCE(existing, now())`.
2. Existing rows with `user_edited_at IS NOT NULL` (already protected from re-persistence) get a one-shot best-effort backfill: look up the extension whose seed workflow has the same `id`; if found, stamp attribution; otherwise leave NULL (FR-023).
3. Idempotent: re-running at boot is a no-op when attribution is already stamped and equal.

### API shape delta

Additive only:

```ts
// Workflow DTO grows
interface WorkflowDto {
  // … existing fields unchanged …
  extension_id: string | null;
  extension_version: string | null;
  extension_version_first_seen: string | null;
  status: "stable" | "modified" | "user";   // derived on the server
  node_count: number;                        // derived; FR-018
  stage_count: number;                       // derived
}
```

`status` is derived: `extension_id === null → "user"`; `user_edited_at !== null → "modified"`; else `"stable"`.

### Frontend design

- `catalog_shell.tsx` owns the grouped layout: reads `groups: CatalogGroup[]` + `extensions: Record<id, ExtensionSummary>` + `selected: string | null`. Renders group headers with name, version, workflow count, and a "reveal folder / copy path" affordance (FR-019).
- `catalog_controls.tsx` owns the search input + status/extension filters, exposing an `onChange(state)` callback. Keyboard: `/` focuses search, `Esc` clears (SC-005).
- `use_catalog_state.ts` is a pure reducer (`{query, statusFilters, extensionFilter, selected}` state, actions: `setQuery`, `toggleStatus`, `setExtensionFilter`, `select`, `clearAll`). Persists to `sessionStorage` so tab-switch doesn't lose state (FR-015).
- `App.tsx` route for Workflows: renders `<WorkflowCatalog />` until `selected !== null`, then `<WorkflowEditor workflow_id={selected} />`. Back button returns to catalog without destroying the editor's scroll/zoom (FR-015 — keep the ReactFlowProvider mounted, hide it with `display: none` when the catalog is shown).

### Post-Phase-1 gate re-check

Risk: principle X (Modern React Patterns) could regress if the state reducer over-computes on every keystroke. Mitigation: `use_catalog_state.ts` derives the visible list via `useMemo`-free reducer output cached by reference equality on query/filters; the React Compiler handles the rest. **PASS.**

## Complexity Tracking

No violations. Only hotspot is the backfill step's correctness against already-edited workflows — covered by T010 tests.
