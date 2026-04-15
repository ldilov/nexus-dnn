# Implementation Plan: Graph Nodes — Canonical Workflow & Node System (enhance-in-place)

**Branch**: `feature/008-graph-nodes` (from `develop`) | **Date**: 2026-04-14 | **Spec**: [spec.md](./spec.md) (rev 2)
**Input**: Feature specification from `/specs/008-graph-nodes-v2/spec.md`
**Supersedes**: rev 1 of this plan (which proposed a parallel `nexus-workflow-v2` crate).

## Summary

Evolve the existing `nexus-workflow`, `nexus-api`, `nexus-run`, `nexus-storage`, and `nexus-extension` crates in place to deliver every capability demanded by `graph-nodes-system-requirements.md`. No parallel crate, no `/v2/*` routes, no dual-shipped extensions, no feature flag. A thin parser compatibility shim during Phase A lets old-shape YAML continue to parse while new types land; a one-release `PUT /:id/graph` route shim lets the frontend migrate in lockstep. Delivery is four phases in ~five weeks, each with its own acceptance criteria, and Phase D is a small shim-removal step.

## Technical Context

**Language/Version**: Rust 1.85+ (2024 edition) host, TypeScript 5.7 (strict mode) frontend, Python 3.12 managed worker venvs (local-llm).
**Primary Dependencies**: axum 0.8, tokio 1.48, sqlx 0.8 (SQLite), serde-saphyr 0.0.10, jsonschema 0.45, semver 1, blake3, thiserror 2, tracing 0.1, ts-rs (DTO codegen), proptest (dev). Frontend: React 19 + Compiler, @xyflow/react 12, vanilla-extract, nexus_sdk 0.2.0, dagre 1.
**Storage**: SQLite via the existing `nexus-storage` crate. Additive migrations 006-009. `node_executions → node_attempts` data migration in 009.
**Testing**: `cargo test` (unit + integration), JSON-schema round-trip tests with golden fixtures, Playwright E2E on the canvas + mutation flow, `proptest` for replay determinism.
**Target Platform**: Linux/macOS/Windows host (Rust static binary), Chromium/Firefox/Safari for the frontend.
**Project Type**: Monorepo (Rust backend, TypeScript frontend, YAML builtin extensions, JSON schemas).
**Performance Goals**: Mutation round-trip p95 < 80 ms on a 200-node workflow. Planner p95 < 200 ms on the same. Canvas drag/connect stays at 60 fps.
**Constraints**: Host-authoritative schema (`specVersion` on every new doc, absent = legacy 0.1 treated by shim). Deterministic mutation semantics. Offline-capable.
**Scale/Scope**: Workflows up to ~500 nodes + ~1000 edges + 20 subgraphs. Mutation log retention: last 50 versions per workflow plus all versions with a run.

## Constitution Check

Gates from `.specify/memory/constitution.md` (v1.2.0). Each must pass pre-Phase-0 and re-verified post-Phase-1.

| Principle | Compliance |
|---|---|
| **I. Ecosystem-First** | Reuses `serde-saphyr`, `jsonschema`, `semver`, `ts-rs`, `@xyflow/react`, `dagre`, `blake3`. No hand-rolled equivalents. |
| **II. Pure Functions, SOLID & Design Patterns** | `nexus-workflow` organized around `apply_command(state, cmd) -> (state', events)` and `validate(state) -> results` — both pure. Strategy for `NodeClass`, Observer for event bus, Repository trait for persistence, Builder for `WorkflowDocument`. |
| **III. Extendability** | Single operator contract (`operator.schema.json` v0.2); extension authors contribute operators without host source. Command enum extends cleanly; `node_class` is `Vec<String>` to accommodate extension-labelled subclasses. |
| **IV. Self-Documenting Code** | Module docs via doc attributes only; no inline `//` comments. Named types: `NodeAttempt`, `ResolvedInputSnapshot`, `MappingState::PartiallyMapped`. |
| **V. Git-Flow Branching** | `feature/008-graph-nodes` from `develop`. Conventional-commits; `Lazar Dilov <ldilov@yahoo.com>`. |
| **VI. Living Documentation** | `README.md` gets a "Graph Nodes" section on Phase B; spec folder holds the authoritative reference. |
| **VII. Clean Provenance** | No attribution markers. Only ts-rs' `// @generated` header (already accepted). |
| **VIII. Memory Safety** | No `unsafe`. All fallible ops return `Result<_, NodeSystemError>` (thiserror). Shared state: `Arc` + `tokio::sync::RwLock`. |
| **IX. Parallelism-First** | Layer-4 validation fans out to extension workers via `tokio::join!`. Planner dispatches independent runnable nodes in parallel. Event emission fire-and-forget on broadcast bus. |
| **X. Modern React Patterns** | Workflow loading uses `use()` + Suspense. No new manual memoization. Mutation submissions use React 19 async transitions. |

**Pre-Phase-0 gate: PASS.**

## Project Structure

### Documentation (this feature)

```text
specs/008-graph-nodes-v2/
├── spec.md                 # rev 2 — enhance-in-place
├── plan.md                 # this file — rev 2
├── research.md             # unchanged from rev 1 (decisions still valid; Q6 noted as moot)
├── data-model.md           # unchanged from rev 1; table names drop "_v2" suffix in implementation notes (schema is identical)
├── contracts/              # unchanged from rev 1 (schemas are the canonical shape)
│   ├── workflow.v2.schema.json      # copied to schemas/workflow.schema.json at T004
│   ├── operator.v2.schema.json      # copied to schemas/operator.schema.json
│   ├── recipe.v2.schema.json        # copied to schemas/recipe.schema.json
│   ├── ui-metadata.v2.schema.json   # copied to schemas/ui-metadata.schema.json
│   ├── graph-mutation-commands.schema.json
│   ├── validation-result.schema.json
│   ├── node-event.schema.json
│   └── api.v2.routes.md             # mental-map for reviewers; live API is under /workflows, not /v2
├── quickstart.md           # unchanged from rev 1; re-point `localhost:8080/v2/...` → `localhost:8080/...`
└── tasks.md                # rev 2 — in-place tasks
```

> **Note on folder name.** Kept as `008-graph-nodes-v2/` because it's already on disk; the branch name `feature/008-graph-nodes` drops the `-v2` since there is no v2 subsystem. The folder is a historical artifact, not a naming convention.

### Source Code (repository root)

```text
crates/
├── nexus-workflow/
│   ├── src/
│   │   ├── lib.rs
│   │   ├── model.rs              # WorkflowDocument, NodeInstance, NodeBinding, Subgraph, NodeInputSource, MappingState, AvailabilityState
│   │   ├── schema.rs             # loads 4 public JSON schemas + versioned parsing
│   │   ├── parser.rs             # YAML → model (with compat shim)
│   │   ├── writer.rs             # model → canonical YAML (always the new shape)
│   │   ├── validate/
│   │   │   ├── mod.rs            # 4-layer pipeline
│   │   │   ├── layer1_schema.rs
│   │   │   ├── layer2_semantics.rs   # cycle, required inputs, bindings, port compat
│   │   │   ├── layer3_config.rs
│   │   │   └── layer4_runtime.rs
│   │   ├── command/
│   │   │   ├── mod.rs            # MutationCommand enum + apply()
│   │   │   ├── topology.rs
│   │   │   ├── wiring.rs
│   │   │   ├── parameters.rs
│   │   │   └── structure.rs
│   │   ├── mapping.rs            # recipe mapping state recompute
│   │   ├── capability.rs         # per-workflow capability rollup
│   │   ├── cache.rs              # cache-key derivation
│   │   ├── version.rs            # blake3 chain
│   │   └── types.rs              # NodeSystemError, Severity, enums
│   └── tests/
│       ├── schema.rs, semantics.rs, compat.rs, mutation.rs, determinism.rs, mapping.rs
├── nexus-api/
│   ├── src/dto/workflows.rs      # DTOs grow; WorkflowNodeInputDto reshapes
│   ├── src/handlers/workflows.rs # + /mutate, /versions, /validate; PUT /graph becomes a shim
│   └── tests/contract.rs
├── nexus-run/
│   ├── src/engine.rs             # +attempt model, +cache derivation
│   └── tests/engine.rs
├── nexus-storage/
│   ├── queries/workflows/*.sql   # +version/mutation/attempt statements
│   └── migrations
│       ├── 006_workflow_core.sql
│       ├── 007_mutations_and_attempts.sql
│       ├── 008_recipe_bindings.sql
│       └── 009_capability_and_attempt_backfill.sql
└── nexus-extension/
    └── src/operator.rs           # reshaped (node_class, parameter_groups, capabilities)

schemas/
├── workflow.schema.json
├── operator.schema.json          # replaces operator-definition.json
├── recipe.schema.json            # replaces recipe-definition.json
└── ui-metadata.schema.json

apps/web/src/
├── api/generated/                # ts-rs writes in place; no /v2/ subfolder
├── hooks/use_workflow_editor.ts  # reducer dispatches typed mutation commands
├── hooks/use_mutations.ts        # NEW — typed command client
├── views/graph_view.tsx          # extended for subgraph collapse/expand, mapping badges
├── layout/right_inspector.tsx    # tabbed by parameterGroups
└── nodes/                        # unchanged — operator/boundary/reroute/note

extensions/builtin/local-llm/
├── manifest.yaml                 # upgraded in place
├── operators/*.yaml              # upgraded in place (parameterGroups + capabilities + nodeClass)
├── recipes/*.yaml                # upgraded in place (mapsTo per field)
└── workflows/*.yaml              # specVersion: "0.2" added
```

**Structure Decision**: monorepo in-place enhancement. All evolution happens within the existing crates; no parallel artifacts. New migrations append. Frontend retargets in a single release.

## Phase 0 — Research

Driven by the open questions in `spec.md §18`, decisions recorded in `research.md`. Inherits rev 1's decisions wholesale:

1. **Q1** Cache-key = `structural + model_load + inputs`.
2. **Q2** Workflow-version rollback only (no per-command undo in v0).
3. **Q3** Subgraphs are per-workflow; cross-workflow reuse is P2.
4. **Q4** Workflow inputs/outputs are first-class document fields; canvas renders synthetic boundary nodes only.
5. **Q5** Conversion operators: user-driven via `suggestedFix.kind = "insert_conversion_node"`.
6. ~~**Q6** ts-rs namespace strategy.~~ **Moot.** No `*V2Dto` suffix; DTOs grow in place.
7. **Q7** Deterministic `workflow_versions.id` = `blake3(parent_id || canonical(command) || second_ts)`.

**Gate**: no unresolved NEEDS CLARIFICATION carry into Phase 1.

## Phase 1 — Design & Contracts

Prerequisite: `research.md` complete.

1. **Entities → `data-model.md`** (already authored — unchanged semantics; tables drop the `_v2` suffix informally in naming but the schema is identical).
2. **Contracts → `contracts/`** (already authored — schemas are the canonical shape; filenames under `contracts/` still carry `.v2` as a historical artifact but get copied to `schemas/*.schema.json` by task T004).
3. **Quickstart → `quickstart.md`** (already authored — re-point `localhost:8080/v2/...` URLs to `localhost:8080/...` during the rev-2 doc pass).
4. **Agent context update**: run `./.specify/scripts/powershell/update-agent-context.ps1 -AgentType claude` on the new branch so `CLAUDE.md` reflects the enhance-in-place direction.

Post-Phase-1 gate re-check:

| Principle | Risk | Mitigation |
|---|---|---|
| III. Extendability | Single operator contract → all extensions rev together | Parser synthesizes default `parameterGroups`, `capabilities`, `nodeClass` for operator YAMLs missing those fields. Extensions upgrade incrementally per operator, not per release. |
| IX. Parallelism-First | Layer-4 fanout must not serialize extension adapter calls | `tokio::join!` with per-adapter timeout; unit test asserts total layer-4 time ≤ max(per-adapter time) + 50 ms budget on a fixture with three adapters. |

**Post-Phase-1 gate: PASS.**

## Complexity Tracking

No constitutional violations. Hotspots to monitor:

| Area | Risk | Mitigation |
|---|---|---|
| Parser compat shim | Creeps past Phase D | Pin `#[deprecated(note = "SHIM-008 — remove at Phase D")]` + CI grep; PR description for Phase D must cite the grep returning zero. |
| `PUT /:id/graph` shim semantic drift | Hidden corruption of edits | Property test replays 1k random payloads and asserts the shim's reconstructed command sequence yields the same final state as direct PUT. |
| Data migration 009 | One-way door | Idempotent, batched (1000 rows / tx), prints diff in dry-run. Keeps `node_executions` read-only for one release before drop. |
| DTO reshape lands atomic across backend + frontend | Build red mid-PR | Land `cargo test export_bindings` + `npx tsc --noEmit` as PR gate in CI; single PR touches both. |

---

**Ready for `/speckit.tasks`.** The updated `tasks.md` already reflects this plan.
