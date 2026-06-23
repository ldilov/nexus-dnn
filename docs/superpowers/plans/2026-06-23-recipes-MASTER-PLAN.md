# Workflow-Driven Recipes — Master Program Plan (P0–P8)

Date: 2026-06-23 · Status: **Planned & reconciled — ready for phased execution** · Base: `main` HEAD `edb5b870`

Turns Nexus workflows into ComfyUI-style shareable creator apps: workflows stay the executable truth, recipes
become **pinned, validated projections** over one workflow version, and UI is a generated/custom surface that
drives the graph only through validated bindings.

## Document set

| file | role |
|---|---|
| `2026-06-14-workflow-driven-recipes-implementation-design.md` | the grounded design (the "why" + §refs) |
| `2026-06-14-workflow-driven-recipes-package/` | the product package (FR/OR, UX, voice/video examples) |
| [`2026-06-23-recipes-00-CONTRACTS.md`](2026-06-23-recipes-00-CONTRACTS.md) | **shared cross-phase contracts — every plan cites it verbatim** |
| `2026-06-23-recipes-P{0..8}-*.md` | nine per-phase, TDD-ready, cold-executable implementation plans |
| this file | program index, sequencing, coverage matrix, risk register, reconciliation log |

How these plans were produced: 8 parallel readers verified the 9-day-stale design against current code (95KB
seam map) → 9 planners authored per-phase plans grounded in that seam → 3 adversarial reviewers (cross-phase
consistency, grounding accuracy, completeness) → a CONTRACTS doc + 88 reconciliation edits resolved every
CRITICAL/HIGH/MEDIUM finding → final coherence verifier: **COHERENT**.

## The current-state correction this program is built on

The design's most important job was disproving the naive "submit → run engine executes" story. Verified facts:

- **Workflow DAG + validation is real and reusable.** `validate_workflow` (`nexus-workflow`) does cycle/topo/
  port-type/operator-resolve **and** per-node JSON-Schema config validation (`check_node_config`, draft-07).
- **The host run engine is a SKELETON.** `execute_step` writes a literal `b"placeholder"` artifact
  (`nexus-run/src/engine.rs`). **Real execution is extension-side** (EmotionTTS's own runner). The program's
  compiler does **resolution + validation, not execution**; acceptance is measured on resolved values.
- **The recipe layer is dead metadata.** `RecipeRecord` holds a bare-stem `workflow_template_ref` + an opaque
  `bindings` JSON; routes are GET-only; nothing executes/validates/fans-out a binding.
- **Workflow "versioning" is a single mutable string** with two in-place overwrite paths and no history table.
- **Submit ignores recipes.** `POST /runs` takes only `workflow_id`; `POST /deployments/{id}/runs` hashes an
  opaque `inputs` blob and never validates/maps/fans it out.

So the keystone is a **new host crate `crates/nexus-recipe`** (binding compiler) sitting on top of **immutable
workflow versioning** (new `workflow_versions` table).

## Phase DAG

```
P0 versioning ─┬─▶ P1 projection model + pin-backfill + recipe-table migration
               │        │
               │        ▼
               │     P2 COMPILER (keystone: host-model writer, public node-config wrapper, ResolvedRun)
               │        │
               │        ├─▶ P3 submit (2 routes) + run-engine consumption (create_run_from_resolved) ─▶ P4 form
               │        ├─▶ P5 preset packs
               │        └─▶ P6 recipe builder (+ write API) ─▶ P7 EmotionTTS parity
               └────────────────────────▶ P8 outdated / upgrade / share   (needs P0,P1,P5,P6)
```

**Critical path:** P0 → P1 → P2 → P3 → P4 (a recipe running end-to-end from a generated form). P5/P6/P7/P8
branch off and can parallelize once P2 (and P3 for P6/P7/P8) land.

## Phases

| phase | title | depends | key deliverable | acceptance (sharpened) | plan |
|---|---|---|---|---|---|
| **P0** | Immutable workflow versioning | — | `workflow_versions` table (+per-node `operator_schema_hashes`), `workflows` head-pointer, `WorkflowVersionSnapshot` + `from_record`, both write-paths append, redefined revert/re-persist, version read APIs | migration green; user edit → new immutable row; re-scan appends only on change; revert re-points; snapshot is the single producer | [P0](2026-06-23-recipes-P0-versioning.md) |
| **P1** | Projection model + pin-backfill + recipe-table migration | P0 | `nexus-recipe` skeleton, projection JSON model (+`custom_ui`), recipe pin + cached `status` + `assess_status` + refresh hook, pin-backfill, nullable-ext-id/`author_kind`/guarded-delete migration | projection round-trips; status unit-tested + refreshes on version change; extension recipes pinned (or `broken+needs-re-pin`); user-recipe insert possible | [P1](2026-06-23-recipes-P1-projection-model.md) |
| **P2** | Binding compiler (**keystone**) | P1 | `compile_recipe_run → ResolvedRun`; net-new host-model writer (`input:` + nested `node:.config.`); layer defaults→preset→user; `validate_workflow` + new pub `validate_node_config` + input value-check; full `BindingError`; `ValueSource` | full compiler test suite green; zero ext-id literals / hardcoded node ids | [P2](2026-06-23-recipes-P2-binding-compiler.md) |
| **P3** | Submit routes + run-engine consumption | P2 | `POST /recipes/{id}/run` + extended `POST /deployments/{id}/runs`; `create_run_from_resolved` + frozen-graph `execute_run`; promotes `handlers/recipes/` dir; stands up nexus-api boundary test; owns FR-10 submit contract | both routes run a validated recipe; engine plans from frozen graph; revision-pin precedence; legacy custom UI still runs | [P3](2026-06-23-recipes-P3-submit-consumption.md) |
| **P4** | Generated baseline RecipeForm | P3 | generic `RecipeForm` + `GET /recipes/{id}/form` (server-resolved hints); renders `projection.output` (FR-3); reusable `RecipePinnedGraph` (OR-4) | a recipe runs end-to-end from the generated form; output panel honors projection.output | [P4](2026-06-23-recipes-P4-generated-form.md) |
| **P5** | Preset packs (extension/recipe/user) | P0,P1,P2 | presets as a projection layer evaluated by the SAME compiler (consumes `ValueSource`); explain-this-preset + diff-vs-defaults over `applied_controls` | presets validated identically to manual runs; hidden=reject, locked-user=reject | [P5](2026-06-23-recipes-P5-preset-packs.md) |
| **P6** | No-code Recipe Builder + write API | P2,P3 | builder wizard; `POST/PUT/DELETE /recipes` (user recipes, save gated by compiler); `exposable-targets` endpoint (route adjacent to P0's versions subtree) | non-dev creates+saves a runnable recipe; extension re-scan leaves user recipes intact | [P6](2026-06-23-recipes-P6-recipe-builder.md) |
| **P7** | EmotionTTS migrated onto host contract | P2,P3 | transcribe hardcoded `RecipeField/targets()` fan-out into projection `bindings`; delete the table; runner consumes compiler output | compiler parity (resolved configs/inputs identical to a pre-deletion golden); table gone; boundary grep clean | [P7](2026-06-23-recipes-P7-emotiontts-parity.md) |
| **P8** | Outdated/upgrade assistant + shareability bundle | P0,P1,P5,P6 | status badge (from `status` only); upgrade diff (`UpgradeRisk` Safe/Outdated/Breaking) + migration copy; `RecipeBundle` export/import (JCS-sha256 integrity + secret redaction) | outdated surfaced from status; migration copy works; bundle round-trips | [P8](2026-06-23-recipes-P8-outdated-upgrade-share.md) |

## New artifacts (program-wide)

- **Crate:** `crates/nexus-recipe` (host, generic; `nexus-api` adds a host→host path dep).
- **Tables / migrations (ledger, CONTRACTS C1):** `026_workflow_versions` (P0), `027_recipes_projection` (P1),
  `028_run_resolved_graph` (P3). P5 = none; P6 = `029` *only if needed*; P8 = `030` *only if needed*. Every
  migration is hand-registered in `migrations.rs` — a dropped `.sql` is inert.
- **Key types (one canonical location each):** `nexus_workflow::WorkflowVersionSnapshot` (P0),
  `nexus_recipe::{RecipeProjection, RecipeStatus, ResolvedRun, ValueSource, BindingError, BindingTarget}` (P1/P2),
  `parse_target` grammar (P2).
- **Routes (all generic-by-`{id}`):** `/workflows/{id}/versions[/{version}][/exposable-targets]` (P0+P6);
  `/recipes/{id}/{run,form}`, `/recipes` write API, `/recipes/{id}/{presets,upgrade-preview,upgrade,bundle}`,
  `/recipes/import` (P3–P8) — all under one `recipes::router()`.

## Requirement coverage matrix

| req | owner | req | owner |
|---|---|---|---|
| FR-1 workflow-backed recipes | P0+P1+P3 | FR-8 no-code builder | P6 |
| FR-2 many recipes per workflow | P1 | FR-9 generated UI baseline | P4 |
| FR-3 projection metadata (+output render, +`custom_ui`) | P1 stores, **P4 renders** | FR-10 / FR-10.1 custom-UI contract | **P3** (submit) + P7 |
| FR-4 safe preset fan-out | P2+P5 | FR-11 / FR-12 voice adoption | P7 (**video deferred**, C9) |
| FR-5 user-authored presets | P5+P6 | OR-1 validate at save **and** run | P3+P5+P6 |
| FR-6 hidden/locked internals | P2 | OR-2 deterministic export | P8 |
| FR-7 outdated visibility + **risk summary** | P1 (status+refresh) + **P8** (risk) | OR-3 back-compat migration | P1+P7 |
| OR-4 inspectability (graph/bindings/fan-out/version) | P1+P4 (`RecipePinnedGraph`)+P5+P8 | | |

## Consolidated risk register (top)

| risk | mitigation | phase |
|---|---|---|
| Run engine is a skeleton — "submit→run" executes nothing real | compiler = resolution+validation; `create_run_from_resolved` freezes the graph; real exec stays extension-side; acceptance on resolved values | P2/P3/P7 |
| Operator changed at same `id@version` | per-node `operator_schema_hashes` in the snapshot → drift = `broken` | P0/P8 |
| Migration dropped-but-unregistered (the known root-bug class) | ledger + explicit `include_str!` registration step + per-migration test | P0/P1/P3 |
| P0 breaks user-edit preservation / revert / boot re-persist | redefined under immutable versions (user-pinned head; revert re-points; re-scan appends) | P0 |
| Extension re-scan wipes user recipes (shared table) | `delete_recipes_by_extension` scoped to `author_kind='extension'` + regression test | P1/P6 |
| Existing extension recipes pin nothing → instant `broken` | P1 pin-backfill; unresolvable → `broken+needs-re-pin`, legacy display keeps working | P1 |
| Bundle import = arbitrary-deserialize attack surface | schema + integrity recompute + operator-resolvability + secret redaction + reject-before-write + immutable-only-if-absent | P8 |
| EmotionTTS parity golden un-satisfiable if node-id pin shape wrong | P1 records the pinned node-id shape explicitly; P7 consumes it as a precondition + captures golden against that snapshot | P1/P7 |

## Review reconciliation log (all resolved)

Two CRITICAL + ~14 HIGH/MEDIUM/LOW cross-phase findings, all fixed in the reconciled plans (verifier: COHERENT):

- **CRITICAL** migration 026 triple-claim → ledger 026/027/028 (CONTRACTS C1).
- **CRITICAL** `WorkflowVersionSnapshot` no producer → P0 owns it; P2 stand-in deleted (C2).
- **HIGH** per-node `operator_schema_hash` granularity → snapshot carries `BTreeMap<node_id,hash>` (C2).
- **HIGH** `get_workflow_version` + snapshot assembly → P0 owns both; P3 hedge removed (C2).
- **HIGH** hidden-control reject vs ignore → `HiddenControlNotSettable` reject, P2+P5 aligned (C4).
- **HIGH** status refresh-on-version-change unowned → P1 helper + P0 call sites (C6).
- **HIGH** FR-3 output stored-but-not-rendered → P4 `ResultPanel` (C8); FR-10 custom-UI contract → P3 (C8).
- **MEDIUM** route ownership, `recipes/` module promotion (P3), `ValueSource` single owner (P2), `RecipeStatus`
  vs `CompatStatus`, FR-7 risk summary (P8), OR-4 dedup (`RecipePinnedGraph` owned by P4), nexus-api boundary
  test (P3 stands up; others extend) — all pinned in CONTRACTS C5–C8 and the per-phase plans.

## Executing this program

1. Each phase already has its own cold-executable plan with a RED-first TDD test list, ordered steps with
   verified anchors, and acceptance criteria. Run them in DAG order; the critical path is P0→P1→P2→P3→P4.
2. Before coding any phase, re-read [CONTRACTS](2026-06-23-recipes-00-CONTRACTS.md) — it is authoritative for
   every shared shape/number/route. Do not re-derive a shared decision from `main`.
3. **Boundary gates (merge blockers):** `crates/nexus-recipe` + all new handlers stay generic (zero ext-id
   literals, zero hardcoded node ids); migrations are host-generic; EmotionTTS specifics live in projection
   DATA. Two boundary tests: `cargo test -p nexus-recipe --test boundary_test` + the nexus-api-side test.
4. Per house rules: gitflow branches off `develop` (`feature/recipes-p0-versioning`, …); slim conventional
   commits; no AI attribution; don't push until asked.

**Recommended start: P0** (immutable workflow versioning) — the dependency root with no upstream.
