# Implementation Plan: Vertical Slice MVP

**Branch**: `002-vertical-slice-mvp` | **Date**: 2026-04-11 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/002-vertical-slice-mvp/spec.md`

## Summary

Implement the first vertical slice MVP proving the core platform contract: installable extensions with recipe/UI contribution indexing, real Python worker execution through a stable protocol, end-to-end workflow execution with artifact provenance, live event streaming, a complete host API surface with consistent response envelopes, a professional token-based React frontend with three-zone shell, and a real image processing example extension. Builds on the `001-arch-core-setup` foundation.

## Technical Context

**Language/Version**: Rust (latest stable, 2024 edition) + React 19 + TypeScript 5.7
**Primary Dependencies (Rust)**: tokio 1.48, axum 0.8, sqlx 0.8, serde-saphyr 0.0.10, jsonschema 0.28, semver 1.0, thiserror 2.x, tracing 0.1, rust-embed 8.11
**Primary Dependencies (Frontend)**: @xyflow/react (React Flow), @dagrejs/dagre, @vanilla-extract/css + sprinkles + recipes + vite-plugin
**Primary Dependencies (Python)**: Pillow 12.2
**Storage**: SQLite (metadata via sqlx) + filesystem (artifact blobs)
**Testing**: cargo test + pytest + Vite/TypeScript type checking
**Target Platform**: Linux x64, Windows x64 (single machine)
**Project Type**: Platform runtime (daemon + API server + embedded web UI)
**Performance Goals**: Event latency <200ms, extension scan <5s, workflow execution <30s for example
**Constraints**: Self-contained binary, no external servers, ~/.nexus/ data directory
**Scale/Scope**: v0 — hundreds of extensions, thousands of runs, single user

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Evidence |
|-----------|--------|----------|
| I. Ecosystem-First | PASS | vanilla-extract, React Flow, dagre, Pillow — all battle-tested ecosystem packages. No reinventing. |
| II. Pure Functions, SOLID & Design Patterns | PASS | ApiResponse<T> envelope uses generics (Strategy). UI contribution model uses trait-based dispatch. Token system uses Builder pattern for themes. |
| III. Extendability | PASS | UI contribution model enables extension-contributed viewers, commands, widgets without modifying host. Recipe system extends workflow catalog. /tools projection is additive. |
| IV. Self-Documenting Code | PASS | No comments policy. |
| V. Git-Flow Branching | PASS | Working on feature branch 002-vertical-slice-mvp. |
| VI. Living Documentation | PASS | docs/ folder updated with new capabilities. |
| VII. Clean Provenance | PASS | No AI traces. |
| VIII. Memory Safety | PASS | All Rust code safe. Python workers isolated out-of-process. |
| IX. Parallelism-First | PASS | Extension scanning, worker health checks, event broadcasting all concurrent. Frontend API calls parallelized. |

## Project Structure

### Documentation (this feature)

```text
specs/002-vertical-slice-mvp/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── host-api-v2.md
│   ├── response-envelope.md
│   ├── ui-contribution-schema.md
│   └── recipe-schema.md
└── tasks.md
```

### Source Code Changes (building on existing codebase)

```text
crates/
├── nexus-extension/src/
│   ├── recipe.rs                    # NEW: Recipe parsing, indexing
│   ├── ui_contribution.rs           # NEW: UI contribution model (6 types)
│   ├── tool_projection.rs           # NEW: /tools normalized projection
│   └── registry.rs                  # MODIFIED: Add recipe + UI contribution indexing
├── nexus-api/src/
│   ├── envelope.rs                  # NEW: ApiResponse<T> consistent envelope
│   ├── handlers/
│   │   ├── system.rs                # NEW: /system/info endpoint
│   │   ├── tools.rs                 # NEW: /tools projection endpoint
│   │   ├── recipes.rs               # NEW: /recipes endpoints
│   │   ├── ui_contributions.rs      # NEW: /ui/contributions endpoints
│   │   ├── extensions.rs            # MODIFIED: Add enable/disable/refresh
│   │   ├── workflows.rs             # MODIFIED: Add /validate endpoint, PUT update
│   │   └── runs.rs                  # MODIFIED: Add retry endpoint
│   └── router.rs                    # MODIFIED: Mount new routes
├── nexus-run/src/
│   └── engine.rs                    # MODIFIED: Add retry support
├── nexus-storage/src/
│   ├── database.rs                  # MODIFIED: Add recipe, UI contribution, tool queries
│   └── records.rs                   # MODIFIED: Add RecipeRecord, UIContributionRecord
└── nexus-core/src/
    └── app.rs                       # MODIFIED: Wire new subsystems

schemas/
├── recipe-definition.json           # NEW: Recipe JSON Schema
├── ui-contribution.json             # NEW: UI contribution JSON Schema
└── tool-projection.json             # NEW: Tool projection schema

apps/web/
├── package.json                     # MODIFIED: Add vanilla-extract, React Flow, dagre
├── src/
│   ├── theme/
│   │   ├── tokens.css.ts            # NEW: Core + semantic design tokens
│   │   ├── dark-theme.css.ts        # NEW: Default dark theme values
│   │   ├── light-theme.css.ts       # NEW: Placeholder light theme
│   │   ├── sprinkles.css.ts         # NEW: Sprinkles atomic utilities
│   │   └── recipes.css.ts           # NEW: Component variant recipes
│   ├── layout/
│   │   ├── shell.tsx                # NEW: Three-zone shell (rail + canvas + inspector)
│   │   ├── left_rail.tsx            # NEW: Navigation rail
│   │   ├── top_bar.tsx              # NEW: Top bar (title, run controls, view switcher)
│   │   └── right_inspector.tsx      # NEW: Inspector panel
│   ├── views/
│   │   ├── stage_view.tsx           # REWRITE: Token-based stage view
│   │   ├── graph_view.tsx           # NEW: React Flow read-only DAG view
│   │   ├── run_trace_view.tsx       # NEW: Run trace with node states + progress
│   │   └── artifact_browser.tsx     # NEW: Artifact browser with viewer selection
│   ├── catalog/
│   │   ├── tool_catalog.tsx         # NEW: Tools (operators + recipes) catalog
│   │   ├── recipe_catalog.tsx       # NEW: Recipe catalog
│   │   └── extension_list.tsx       # REWRITE: Token-based extension list
│   ├── components/
│   │   ├── button.tsx               # NEW: Token-based button primitives
│   │   ├── input.tsx                # NEW: Token-based input primitives
│   │   ├── panel.tsx                # NEW: Token-based panel
│   │   └── status_badge.tsx         # NEW: Status/state badge component
│   └── api/
│       └── client.ts                # MODIFIED: Add new endpoints, envelope handling

extensions/examples/
└── image-basic/                     # NEW: Full image processing extension
    ├── manifest.yaml
    ├── operators/
    │   ├── resize.yaml
    │   └── grayscale.yaml
    ├── recipes/
    │   └── basic_transform.yaml
    ├── ui/
    │   ├── image_viewer.yaml
    │   └── run_transform_command.yaml
    ├── worker/
    │   ├── main.py
    │   └── requirements.txt
    └── workflows/
        └── basic_transform.yaml

migrations/
└── 002_recipes_contributions.sql    # NEW: Recipes + UI contributions tables
```

**Structure Decision**: Extends existing 11-crate workspace. New capabilities added as modules within existing crates (recipe.rs, ui_contribution.rs, tool_projection.rs in nexus-extension; new handler files in nexus-api). Frontend fully rewritten with vanilla-extract token system and React Flow graph view.

## Complexity Tracking

| Addition | Justification | Simpler Alternative Rejected Because |
|----------|---------------|--------------------------------------|
| vanilla-extract + sprinkles | Token system with type safety | Pure CSS variables lack compile-time token enforcement |
| React Flow + dagre | Read-only DAG view | Custom SVG reimplements zoom, pan, layout from scratch |
| 6 UI contribution types | Matches requirement doc 07 | Fewer types would not cover viewer + command + widget + inspector |
