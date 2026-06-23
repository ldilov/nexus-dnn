# P7: EmotionTTS migrated onto host contract — Implementation Plan (nexus-dnn, 2026-06-23)

> All shared shapes/numbers/routes per 2026-06-23-recipes-00-CONTRACTS.md — this plan does not re-derive them.

## Goal

Delete the hardcoded EmotionTTS binding compiler (`RecipeField` enum + `targets()` fan-out table + `CURATED_NODES`/`CURATED_EDGES` + `WORKFLOW_TEMPLATE_ID`) and drive recipe value-resolution + validation through the host `nexus-recipe` compiler. EmotionTTS keeps its own runner (`router/runs.rs`, batch/test_line) for real TTS synthesis; it calls the host compiler for **value resolution + validation only**. Done = for the same control values, the resolved node configs + workflow inputs emitted by the host compiler are **identical** to what the deleted hardcoded table produced (compiler parity), the hardcoded table is gone, and the boundary grep is clean. Byte-identical audio is explicitly NOT the test.

## Current state (verified)

Re-read against current code (HEAD edb5b870, 2026-06-23). Anchors corrected vs the 2026-06-14 design where they drifted.

- **The hardcoded binding compiler** lives in `extensions/builtin/emotion-tts/rust/src/workflow_binding.rs`:
  - `WORKFLOW_TEMPLATE_ID = "emotiontts_dialogue_batch@0.1.0"` (line 8).
  - `CURATED_NODES` (7 node_id/operator_id pairs, lines 10-18) and `CURATED_EDGES` (7 edges, lines 20-28). Node ids use the `*_1` suffix (`synthesize_1`, `postprocess_1`, `preview_mix_1`, etc.).
  - `RecipeField` enum (`workflow_binding.rs:57-75` — 15 variants at lines 60-74) + `targets()` fan-out table (lines 79-102). **`OutputFormat` is the only 2-target fan-out** (`postprocess_1.config.output_format` + `export_bundle_1.config.output_format`); the other 14 are single-target. `RecipeField::ALL` at 104-120.
  - Extension-local `WorkflowDocument`/`Node`/`Edge` types (lines 30-55) with **flat** `config: BTreeMap<String, Value>` — structurally different from the host `nexus_workflow::Workflow` (`NodeInstance.config: Option<Value>`, `inputs: HashMap<String, NodeInput>`).
  - `parse_path` (317-344) is the **EmotionTTS-private single-key resolver** (CONTRACTS C5): accepts only `input:<key>` or `node:<id>.config.<key>` with a **single** key segment (no nested pointers). It is **deleted** in P7 (no phase references it); the host-canonical replacement is `nexus_recipe::parse_target` (C5), which adds nested-pointer support as net-new P2 work. `read`/`write`/`bind_recipe_field`/`is_field_mappable`/`mappable_fields`/`unmappable_fields`/`default_workflow`/`default_config_for`/`compute_customised`/`refresh_customised` are the rest of the public surface.

- **CRITICAL DRIFT — the binding compiler is NOT in the run path.** `router/runs.rs::create_run_impl` (line 348) reads a flat `CreateRunBody` DTO (lines 290-316: `script`, `parser_mode`, `output_format`, `speed_factor`, `speed_mode`, `seed_strategy`, `base_seed`, `cache_policy`, `global_emotion`, `generation`, `prebuilt_segments`) and writes those values straight into a `RunRow`, then enqueues. It never instantiates a `WorkflowDocument`, never calls `bind_recipe_field`. `bind_recipe_field` + `write` have **zero production callers** — only `router/workflows.rs` and tests. So the run path drives off the DTO, not the compiler.

- **The compiler IS consumed by `router/workflows.rs`** (GET `/workflow`, PUT `/workflow`, GET `/workflow/default`, GET `/workflow/catalog`): it serializes `WorkflowDocument`, `mappable_fields()`, `unmappable_fields()`, and (in `/catalog`) the full `RecipeField` + `targets()` table to the frontend (lines 113-185). Imports at workflows.rs:15-18.

- **Frontend consumers**: `web/src/services/workflows_client.ts` (the `RecipeField` TS union lines 3-18, `WorkflowResponse.mappableFields/unmappableFields`, `getWorkflow`/`putWorkflow`/`getDefaultWorkflow` — note there is **no** `getCatalog` client fn today), `web/src/views/recipe/recipe.view.tsx`, `web/src/views/recipe/recipe.ui.tsx`. The `dist/emotion-tts.js` bundle must be rebuilt after any web change.

- **Recipe YAML** (`recipes/emotional_dialogue_batch.yaml`) binds fields under a `run.*` namespace (`bind: run.script`, `run.output_format`, `run.global_emotion`, `run.generation`, …) that maps 1:1 onto `CreateRunBody` field names — NOT onto `RecipeField` variants and NOT onto `parse_path`'s `input:`/`node:` grammar. Three disjoint vocabularies coexist. The YAML workflow file (`workflows/emotional_dialogue_batch.yaml`) uses **un-suffixed** node ids (`batch_synthesize`, `audio_postprocess`, `audio_preview_mix`) and a `from: <node>:<port>` dataflow grammar — incompatible with both the Rust `*_1` ids and `parse_path`. **Do not conflate these representations.**

- **Tests**: `rust/tests/workflow_binding_test.rs` (5 tests using `bind_recipe_field`/`RecipeField`/`Node`/`Edge`) + inline `#[cfg(test)] mod tests` at workflow_binding.rs:346-402. Both must be updated/removed in lockstep with any change.

- **Upstream dependency status**: `crates/nexus-recipe` **does not exist yet** (verified absent). `compile_recipe_run`, `ResolvedRun`, `RecipeProjection`, `parse_target`, the full `BindingError` enum, and the public `validate_node_config` wrapper are net-new (P1/P2/P3); **`nexus_workflow::WorkflowVersionSnapshot` is produced by P0** (canonical crate path per CONTRACTS C2). This phase **consumes** all of them. `check_node_config` is still private at `crates/nexus-workflow/src/validation.rs:245`.

- **Boundary**: `workflow_binding.rs` is fully extension-local (defines its own `WorkflowDocument`, no host imports) so deleting it touches no host crate. It owns no DB migration.

## Approach

This is a transcription + rewiring phase, not a host-infrastructure phase. The honest migration (design §7) has three moves:

1. **Transcribe the Rust fan-out table into projection data.** The fan-out knowledge in `RecipeField::targets()` is encoded today as Rust constants. P7 re-expresses it as `controls[].bindings` in the EmotionTTS recipe projection (the `nexus-recipe` projection authored in P1/P6), so the host compiler can perform the same fan-out from declared data. The canonical example is `OutputFormat → [postprocess_1.config.output_format, export_bundle_1.config.output_format]` (the only multi-target control).

2. **Rewire the run/metadata paths through the host compiler.** Replace the EmotionTTS-private resolver usage with `compile_recipe_run(projection, snapshot, control_values, preset_id) -> ResolvedRun`. EmotionTTS feeds the resulting `resolved_inputs` / `resolved_workflow` into its own runner (`router/runs.rs`) instead of reading flat `CreateRunBody` fields. The metadata endpoints (`router/workflows.rs`) that exposed `mappable_fields`/`targets()` are re-sourced from the projection bindings (or removed if P4's generic `/recipes/{id}/form` supersedes them).

3. **Delete the hardcoded table** (`RecipeField`, `targets()`, `CURATED_*`, `WORKFLOW_TEMPLATE_ID`, and the EmotionTTS-private `WorkflowDocument`/`parse_path` resolver) once nothing references it, updating tests + frontend in lockstep.

Because the compiler is currently decoupled from the run path, the **lowest-risk and highest-value parity assertion** is a direct comparison: build a parity test fixture that runs a set of control values through (a) the old `bind_recipe_field` table (captured as golden output before deletion) and (b) the new `compile_recipe_run` over the transcribed projection, and assert the resolved configs/inputs are identical. Capture the golden BEFORE deleting the table.

The parity surface to preserve precisely: the 15 `RecipeField → target-path` mappings and the per-node default config seeded by `default_config_for` (workflow_binding.rs:155-184), because those defaults are what `targets()` write paths point at.

## Changes (ordered steps)

> Prerequisite check (cold-start): confirm `crates/nexus-recipe` exists and exports `compile_recipe_run`/`ResolvedRun`/`RecipeProjection`/`parse_target`/the full `BindingError` enum (CONTRACTS C3/C4/C5), that `nexus_workflow::WorkflowVersionSnapshot` + `WorkflowVersionSnapshot::from_record` are present (CONTRACTS C2, P0), that `nexus_workflow::validate_node_config` is public, and that an EmotionTTS recipe projection (with `controls[].bindings`) pinned to a host `workflow_version` with concrete node ids is reachable. If any are missing, P0–P3/P6 are incomplete — STOP and surface the blocker; do not stub host types inside the extension.

1. **Capture parity golden BEFORE any deletion.**
   File: `extensions/builtin/emotion-tts/rust/tests/binding_parity_test.rs` (new).
   Add a `#[test]` (RED-then-frozen) that, for a representative matrix of control values (script text; `output_format` ∈ {wav, mp3, flac}; `speed_factor`; `speed_mode`; each `global_emotion_*`; `seed_strategy`; `base_seed`; `cache_policy`; all the include/create bool flags), calls the **current** `default_workflow()` + `bind_recipe_field(...)` for every field and serializes the resulting node configs + inputs to a canonical JSON string. Snapshot that to a golden file `tests/fixtures/binding_parity_golden.json`. This pins the exact pre-migration resolved shape. Why: the table is about to be deleted; the golden is the parity oracle.

2. **Transcribe the fan-out into the EmotionTTS recipe projection `controls[].bindings`.**
   **STATED PRECONDITION (consumed from P1, CONTRACTS C8 → C2):** the EmotionTTS recipe is pinned to a host `(workflow_id, workflow_version)` whose `WorkflowVersionSnapshot` carries a concrete `nexus_workflow::Workflow` with **known node ids**. Before authoring any binding, **confirm the actual node ids in that pinned snapshot** (read `snapshot.workflow` for the pinned version P1 backfilled). This is imperative, not advisory: there is **no** "default to `*_1` and regenerate at runtime" fallback — author `controls[].bindings` against the snapshot's actual node ids, and capture the golden (step 1) against **that** snapshot. If the pinned snapshot uses the un-suffixed YAML ids (`batch_synthesize`, `audio_postprocess`, …) rather than the Rust `*_1` ids, the bindings and the golden use the snapshot ids — the snapshot is the single source of truth for node identity.
   File: the EmotionTTS recipe projection (authored under the P1/P6 projection model — e.g. `extensions/builtin/emotion-tts/recipes/emotional_dialogue_batch.yaml` extended with a `projection:` block, or wherever P1 lands the projection JSON for this recipe). For each of the 15 fields, add a `control` with `bindings` equal to its `targets()` entry, using the **host-canonical** grammar (`input:<name>` / `node:<id>.config.<pointer>`). Critically, `output_format` gets **both** targets (the postprocess + export node-config targets, per the pinned snapshot's node ids). Why: this is the data form of the deleted Rust table.

3. **Add a compile-only call site in the EmotionTTS runner.**
   File: `extensions/builtin/emotion-tts/rust/src/router/runs.rs`.
   In `create_run_impl` (and `test_line`), after validating `CreateRunBody`, build a `ControlValues` map from the flat DTO fields (script→`script` control, `output_format`→`output_format` control, etc., 1:1 with the projection `control_id`s), load the recipe's pinned `WorkflowVersionSnapshot` + projection, and call `nexus_recipe::compile_recipe_run(&projection, &snapshot, &control_values, preset_id)`. **The synthesis job MUST be assembled FROM the returned `ResolvedRun.resolved_inputs` / `resolved_workflow`** — the runner reads the resolved node configs/inputs to populate the job, and does NOT fall back to reading the flat `CreateRunBody` fields for any value that the compiler resolves (fanned-out targets, preset/default overlays). The flat DTO is the *input to compilation*, not the *source of the enqueued job*. On `BindingError`, map to `EmotionTtsError::validation(...)` (preserve the existing 422 contract). Why: this proves the compiled→real-execution chain (not just compiler-golden parity); the runner still does the real synthesis.

4. **Re-source `router/workflows.rs` metadata from the projection (or retire it).**
   File: `extensions/builtin/emotion-tts/rust/src/router/workflows.rs`.
   The `/workflow`, `/workflow/default`, `/workflow/catalog` responses currently emit `RecipeField`, `targets()`, `mappable_fields`, `unmappable_fields`. Two options (decide per P4 status):
   - (a) If P4's generic `GET /api/v1/recipes/{id}/form` is live and the EmotionTTS web UI has migrated to it, **delete** the `mappable_fields`/`unmappable_fields`/`catalog` surface here and remove the imports from workflow_binding.
   - (b) Otherwise, re-derive `mappable`/`unmappable` from the projection bindings (a field is mappable when all its binding targets resolve against the pinned snapshot) using a host helper, with **no** reference to `RecipeField`/`targets()`.
   Why: these endpoints are the only non-test consumers of the table; they must stop depending on it.

5. **Update the frontend in lockstep.**
   Files: `extensions/builtin/emotion-tts/web/src/services/workflows_client.ts`, `web/src/views/recipe/recipe.view.tsx`, `web/src/views/recipe/recipe.ui.tsx`.
   Remove the hand-maintained `RecipeField` TS union (workflows_client.ts:3-18) and `mappableFields`/`unmappableFields` typings if step 4(a) is chosen; otherwise repoint them at the projection-derived response shape. **Preserve EmotionTTS's bespoke UI shape (FR-12, CONTRACTS C8):** this is a data-source swap, not a UI teardown — the existing custom UI MUST stay **script-first and preset-rich** (script editor primary, preset selector + presets intact). Do NOT replace it with the bare generated form. Rebuild the bundle: `pnpm build` in `extensions/builtin/emotion-tts/web`, regenerating `dist/emotion-tts.js`. Why: the TS types mirror the deleted Rust enum and the dist bundle is shipped.

6. **Delete the hardcoded table and resolver.**
   File: `extensions/builtin/emotion-tts/rust/src/workflow_binding.rs`.
   Remove `RecipeField`, `targets()`, `RecipeField::ALL`, `CURATED_NODES`, `CURATED_EDGES`, `WORKFLOW_TEMPLATE_ID`, and the EmotionTTS-private resolver (`parse_path`, `read`, `write`, `bind_recipe_field`, `is_field_mappable`, `mappable_fields`, `unmappable_fields`, `default_workflow`, `default_config_for`, `compute_customised`, `refresh_customised`) and the local `WorkflowDocument`/`Node`/`Edge` types — unless a small piece (e.g. `WorkflowDocument` persistence shape via `storage::repo_traits::WorkflowRow`) is still needed by an un-migrated surface, in which case keep only that minimal struct and flag the remainder for deletion. If the whole module becomes empty, drop `pub mod workflow_binding;` from `rust/src/lib.rs:21`. Why: this is the deletion the acceptance criteria require.

7. **Remove/replace the old binding tests.**
   Files: `rust/tests/workflow_binding_test.rs`, inline `#[cfg(test)]` block at workflow_binding.rs:346-402.
   Delete the tests that exercise `bind_recipe_field`/`RecipeField` (they reference deleted symbols and will not compile). The parity coverage now lives in `binding_parity_test.rs` (step 1, repointed in step 8). Why: lockstep with the deletion.

8. **Repoint the parity test at the host compiler (GREEN).**
   File: `extensions/builtin/emotion-tts/rust/tests/binding_parity_test.rs`.
   Replace the table side of the comparison: run the same control-value matrix through `compile_recipe_run` over the transcribed projection + pinned snapshot, canonicalize the resolved node configs/inputs the same way, and assert equality against `tests/fixtures/binding_parity_golden.json`. Why: this is the compiler-parity acceptance test.

9. **Verify boundary grep is clean and run the suites.**
   Run `cargo test -p emotion-tts-extension` (or the crate's actual package name) and the host `cargo test -p nexus-recipe --test boundary_test` (the boundary test introduced in P1/P6). Confirm `grep -rn "RecipeField\|CURATED_NODES\|WORKFLOW_TEMPLATE_ID\|bind_recipe_field" extensions/builtin/emotion-tts/rust/src` returns zero. Run web `vitest` + `pnpm build`. Why: closes the acceptance gates.

## TDD test plan

Write RED first, then implement.

**Rust (cargo test, package `emotion-tts-extension`)**

- `binding_parity_golden_captures_all_15_fields` (RED→frozen, step 1): asserts the captured golden JSON contains a non-empty resolved config/inputs entry for every one of the 15 `RecipeField` mappings, including both `output_format` targets. GREEN = run against the live `bind_recipe_field` table once, snapshot the file.
- `compile_recipe_run_matches_hardcoded_golden` (RED, step 8): for the full control-value matrix, asserts `compile_recipe_run(projection, snapshot, values, None)` resolved node configs + inputs canonicalize byte-equal to `binding_parity_golden.json`. GREEN = projection transcription (step 2) + compile call (covered by `nexus-recipe`).
- `output_format_fans_out_to_postprocess_and_export` (RED): asserts a single `output_format` control value lands on **both** of its declared targets (the postprocess + export node-config targets, named by the pinned snapshot's node ids) in the resolved workflow. GREEN = the two-target binding in the projection (step 2).
- `default_values_match_default_config_for` (RED): asserts that with no user overrides, the compiled resolved configs equal the per-node defaults the old `default_config_for` seeded (mp3 output, speed 1.0, base_seed 42, global_mode none, preview enabled, create_zip true, etc.). GREEN = defaults carried in the projection control `default_value`s.
- `binding_error_maps_to_422` (RED): asserts that any `nexus_recipe::BindingError` variant surfaced by `compile_recipe_run` (e.g. `LockedOverride`, `HiddenControlNotSettable`, `UnknownControl`, `SchemaViolation`) becomes `EmotionTtsError::validation` (status 422) at the runner boundary, per CONTRACTS C4 — the full enum maps to 422, not a hand-picked subset. GREEN = error mapping in `create_run_impl` (step 3).
- `runner_builds_synthesis_job_from_resolved_outputs` (RED, step 3): asserts the synthesis job the runner enqueues is built **from `ResolvedRun.resolved_inputs` / `resolved_workflow`** (the compiler output), **not** from the flat `CreateRunBody` fields. Concretely: drive a control value whose effect only shows up post-compile (e.g. a preset/default that the flat DTO does not carry verbatim, or the `output_format` fan-out reaching the export node config) and assert the enqueued job reflects the **resolved** value at the node-config/input it was fanned into — proving the compiled→real-execution chain, not merely compiler-golden parity. A guard sub-assertion: the runner does not read the corresponding flat `CreateRunBody` field directly for that value. GREEN = step 3 rewires `create_run_impl`/`test_line` to source the job from `ResolvedRun`.
- Compile-failure guard (RED): after step 6, the crate must compile with **zero** references to deleted symbols — enforced implicitly (the old `workflow_binding_test.rs` is deleted in step 7).

**Web (vitest, `extensions/builtin/emotion-tts/web`)**

- `recipe_view_renders_without_recipefield_union` (RED): asserts `recipe.view.tsx`/`recipe.ui.tsx` render the recipe form sourced from the projection/form response, with no import of the removed `RecipeField` TS union. GREEN = step 5. Stub `scrollIntoView`/`matchMedia` per jsdom gotchas; co-locate as `*.test.tsx`.
- `emotiontts_ui_stays_script_first_and_preset_rich` (RED→guard, FR-12 / CONTRACTS C8): asserts EmotionTTS's existing custom UI keeps its **script-first, preset-rich** shape post-migration — the script editor remains the primary/first input surface and the preset selector + multiple presets remain present and selectable. The migration rewires resolution onto the host compiler but MUST NOT flatten EmotionTTS's bespoke UI into the bare generated form. GREEN = step 5 preserves the script-first layout + preset affordances while swapping the data source.

**Boundary (cargo test)**

- `cargo test -p nexus-recipe --test boundary_test` (from P1/P6) must stay green — P7 adds no extension-id literals or node-id-shaped constants to host crates. P7 introduces none, but re-run to confirm.

## Acceptance criteria

- **Compiler parity (sharpened):** for the full control-value matrix, the resolved node configs + workflow inputs produced by `nexus_recipe::compile_recipe_run` over the transcribed EmotionTTS projection are byte-identical (after canonical JSON sort) to the golden captured from the deleted `bind_recipe_field`/`targets()` table — including the `output_format` 2-target fan-out and all `default_config_for` defaults.
- **Hardcoded table gone:** `RecipeField`, `targets()`, `RecipeField::ALL`, `CURATED_NODES`, `CURATED_EDGES`, `WORKFLOW_TEMPLATE_ID`, the EmotionTTS-private `parse_path`/`bind_recipe_field` resolver, and (if fully unused) the local `WorkflowDocument` type are deleted; `pub mod workflow_binding;` removed if the module is empty.
- **EmotionTTS keeps its own runner:** `router/runs.rs` batch/test_line still performs real synthesis; it calls the host compiler for resolution + validation only (no host run-engine execution of EmotionTTS).
- **Runner consumes the compiler output:** the enqueued synthesis job is built from `ResolvedRun.resolved_inputs` / `resolved_workflow`, not from the flat `CreateRunBody` — the compiled→real-execution chain is proven by `runner_builds_synthesis_job_from_resolved_outputs`, not only by golden parity.
- **Boundary grep clean:** zero `RecipeField`/`CURATED_*`/`WORKFLOW_TEMPLATE_ID`/`bind_recipe_field` references remain in `extensions/builtin/emotion-tts/rust/src`; host crates carry no EmotionTTS literals; `nexus-recipe` boundary test green.
- **Frontend updated + bundle rebuilt:** `workflows_client.ts` no longer hand-maintains the `RecipeField` union; `dist/emotion-tts.js` regenerated; vitest green.
- **EmotionTTS UI stays script-first/preset-rich (FR-12, CONTRACTS C8):** the bespoke EmotionTTS custom UI keeps its script-first, preset-rich shape post-migration (not flattened into the generated form); asserted by `emotiontts_ui_stays_script_first_and_preset_rich`.
- NOT required: byte-identical audio through the host run engine (host engine is a placeholder skeleton).

## Dependencies & sequencing

- **Upstream (must be complete before P7 starts):**
  - **P2** — `crates/nexus-recipe` exists with `compile_recipe_run(projection, snapshot, control_values, preset_id) -> Result<ResolvedRun, BindingError>`, the host-model writer (fan-out onto `nexus_workflow::Workflow`), public `nexus_workflow::validate_node_config`, and `ResolvedRun`.
  - **P3** — `create_run_from_resolved` consumption point + the `nexus_workflow::WorkflowVersionSnapshot` type and its `from_record(record, operators)` assembly path (P0, CONTRACTS C2) and pinned-recipe plumbing (P1) the runner loads from.
  - **P1** — recipe projection model + the EmotionTTS recipe pinned to a host `workflow_version`, plus the projection document EmotionTTS's `controls[].bindings` are authored into.
  - (P6 supplies the generic recipe write API + form endpoint; needed only if step 4(a)/step 5 migrate the EmotionTTS web UI to `/recipes/{id}/form`.)
- **Intra-phase order:** step 1 (capture golden) MUST precede step 6 (deletion). Steps 2→3→4→5 are the rewire; step 6 deletes; steps 7→8 retest; step 9 verifies. Do not delete before the golden is captured and the compile path is wired.

## Cross-phase contracts

**CONSUMES (from upstream phases — must match exactly):**

- `nexus_recipe::compile_recipe_run(projection: &RecipeProjection, snapshot: &WorkflowVersionSnapshot, control_values: &ControlValues, preset_id: Option<&str>) -> Result<ResolvedRun, BindingError>` (P2).
- `ResolvedRun { workflow_id, workflow_version, resolved_workflow /* frozen host Workflow graph */, resolved_inputs, applied_controls }` (P2, CONTRACTS C3).
- `RecipeProjection` with `controls[].bindings: Vec<String>` using grammar `input:<name>` | `node:<node_id>.config.<pointer>` (P1/P2, CONTRACTS C6).
- **`nexus_workflow::WorkflowVersionSnapshot`** — the canonical crate path (CONTRACTS C2, **produced by P0**), carrying `workflow: nexus_workflow::Workflow` + `operators` + `canonical_hash` + `operator_schema_hashes`. The EmotionTTS recipe pins a `(workflow_id, workflow_version)` (P1); the runner assembles the snapshot via P0's `WorkflowVersionSnapshot::from_record(record, operators)` (passing the registry operator slice), NOT a P2 local stand-in (deleted per C2). P7 reads `snapshot.workflow`'s node ids as the source of truth for bindings (step 2 precondition).
- **`nexus_recipe::parse_target(raw) -> Result<BindingTarget, BindingError>`** — the host-canonical binding-grammar parser (CONTRACTS C5). This is the public symbol that replaces the deleted EmotionTTS-private `parse_path`; P7 references `parse_target` only (no `parse_path`).
- **The full `nexus_recipe::BindingError` enum** (CONTRACTS C4) — P7 maps every variant (`UnknownControl`, `UnknownPreset`, `LockedOverride`, `HiddenControlNotSettable`, `UnknownTarget`, `PathResolveFailed`, `TypeMismatch`, `SchemaViolation`, `OperatorSchemaDrift`, `MissingRequired`, `Workflow(..)`) surfaced by `compile_recipe_run` to `EmotionTtsError::validation` → `422` (the host HTTP mapping in C4); P7 does not invent its own binding-error type.
- `nexus_workflow::validate_node_config(node, op_def) -> Result<(), WorkflowError>` public wrapper (P2).
- EmotionTTS recipe pinned `(workflow_id, workflow_version)` whose node ids match the bindings' `node:<id>` segments (P1 pin-backfill); confirmed against `snapshot.workflow` before authoring bindings (step 2).

**PRODUCES (this phase):**

- EmotionTTS recipe projection `controls[].bindings` transcribing the 15-field fan-out (notably `output_format` → 2 targets). Reference data for any future generic-form rendering.
- Compile-only integration in `router/runs.rs`: `CreateRunBody`/`TestLineBody` → `ControlValues` → `compile_recipe_run` → runner. Establishes the extension-uses-host-compiler precedent for svi2-pro/local-llm (explicitly out of scope here).
- Parity golden `tests/fixtures/binding_parity_golden.json` + `binding_parity_test.rs`.

**No DB migration, no new route, no new host table** — P7 is extension-side transcription/rewiring.

## Boundary discipline

- `workflow_binding.rs` and all P7 edits are **extension-local** (`extensions/builtin/emotion-tts/`). Deleting the table touches **no** host crate.
- The host compiler P7 calls (`nexus-recipe`) is generic by `control_id` + path string — P7 must not push any EmotionTTS-specific node id or literal into it. All EmotionTTS specifics (the 15 controls, the `*_1` node ids, the 2-target `output_format`) live in the **extension's projection data**, never in host code.
- No new extension-id literals enter host crates; no host crate gains an EmotionTTS import. `crates/nexus-recipe --test boundary_test` (P1/P6) stays green.
- Frontend edits are confined to `extensions/builtin/emotion-tts/web/` — the host `apps/web` shell is untouched.
- House rule: keep body comments ≤2 lines (write-time hook); run Edits from repo root so the comment-write hook resolves its path. Do not add EmotionTTS literals to `apps/web/src/catalog/recipe_catalog.tsx`.

## Risks & mitigations

- **Compiler decoupled from run path today** → migrating the run path to the compiler is net-new wiring, not a swap. Mitigation: step 3 introduces the compile call site incrementally; the golden parity test (steps 1/8) guarantees resolved-value equivalence independent of the run path.
- **Node-id vocabulary mismatch** (`*_1` Rust ids vs un-suffixed YAML-workflow ids vs `run.*` recipe binds). Mitigation: resolved by the **stated precondition** in step 2 — the projection bindings AND the parity golden are authored against the node ids present in the **pinned `WorkflowVersionSnapshot`** (CONTRACTS C2), confirmed first. There is no ambiguous `*_1` default; the snapshot's node ids are the single source of truth, so the golden cannot be captured against a node-id shape that diverges from the bindings.
- **Golden captured against deleted code** → capture the golden in step 1 while the table still exists; commit the fixture; only then delete (step 6).
- **Frontend/dist drift** → the shipped `dist/emotion-tts.js` is stale until rebuilt; step 5/9 rebuild and re-run vitest.
- **Upstream not ready** → P7 hard-depends on P2/P3/P1. The cold-start prerequisite check (top of Changes) STOPs rather than stubbing host types in the extension (which would violate the boundary).
- **`global_emotion`/`generation` shape** — these flat DTO fields are objects, not scalars; mapping them to single `control_id`s with object `default_value`s must preserve the nested structure the operators expect. Mitigation: include object-valued controls in the parity matrix (step 1) so the golden pins their resolved shape.

## Out of scope

- Making the host run engine execute EmotionTTS for real (it stays a placeholder; EmotionTTS keeps `router/runs.rs`).
- Migrating svi2-pro (`operator_invoke`) or local-llm (`/chat` RPC) onto the host contract.
- Building `nexus-recipe`, the compiler, `create_run_from_resolved`, versioning, or the projection schema (P0–P3/P6).
- The generic `RecipeForm` / `GET /recipes/{id}/form` host UI (P4) — referenced only as the optional target for retiring EmotionTTS's `/workflow/catalog` metadata.
- Reconciling the separate YAML workflow file vs the Rust-synthesized default workflow into one representation beyond what the pinned snapshot requires.
- Byte-identical audio verification.
