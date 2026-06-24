# P7 CORRECTED — EmotionTTS onto host compiler (2026-06-24)

> Supersedes the approach in `2026-06-23-recipes-P7-emotiontts-parity.md` where it
> conflicts. That plan was authored against a HEAD where `nexus-recipe` did not exist
> and assumed the recipe's projection + a config-write snapshot were pre-shipped by P1.
> Verified against current code (HEAD `3d8f6747`), neither holds. Two forks decided by
> the user (2026-06-24): **run-path semantic parity** + **generic host projection seam**.

## Why the original plan is stale (verified)

1. **Pinned snapshot ≠ the Rust table's machine.** Host workflow
   `workflows/emotional_dialogue_batch.yaml` uses **un-suffixed** node ids
   (`script_parse`, `mapping_resolve`, `emotion_resolve`, `batch_synthesize`,
   `audio_postprocess`, `audio_preview_mix`, `export_bundle`), delivers values via
   **input ports** (`from: input:<name>`), and every node has `config: {}`. The deleted
   `bind_recipe_field` table writes `*_1` node **configs**. `output_format` already fans
   out to postprocess+preview **via dataflow edges**. → byte-equal golden vs
   `bind_recipe_field` is impossible (different machines).
2. **No projection authored/persisted.** P1 `backfill_recipe_pins`
   (`crates/nexus-api/src/handlers/recipe_status.rs:59`) sets only the pin; boot seeding
   `persist_recipe_records` hardcodes `projection: None` (`crates/nexus-core/src/app.rs:886`).
   Host `RecipeFile` (`crates/nexus-extension/src/recipe.rs:8`) has **no** projection field.
   P6 write API is **user-only**; EmotionTTS recipe is `author_kind='extension'`.
3. **Run path is the truth.** `create_run_impl` (`extensions/builtin/emotion-tts/rust/src/router/runs.rs:348`)
   reads flat `CreateRunBody` → `RunRow` ~1:1 (script_snapshot, parser_mode,
   generation_settings_json, global_emotion_snapshot_json, output_format, speed_factor,
   speed_mode, cache_policy, seed_strategy, base_seed). The `RecipeField` table is dead in
   the run path (only `router/workflows.rs` metadata consumes it).
4. **Compiler rejects undeclared input ports.** `check_input_values`
   (`crates/nexus-recipe/src/compiler.rs:247`) → `UnknownTarget` for any `input:<name>`
   not in `snapshot.workflow.inputs`. Snapshot declares 8 ports; 5 RunRow fields
   (speed_mode, seed_strategy, base_seed, cache_policy, generation) have no port.

## Corrected goal

Drive EmotionTTS recipe value-resolution + validation through `nexus_recipe::compile_recipe_run`,
sourcing the enqueued `RunRow` from `ResolvedRun.resolved_inputs` (not the flat DTO). Delete the
hardcoded `RecipeField`/`targets()`/`CURATED_*`/`WORKFLOW_TEMPLATE_ID`/`bind_recipe_field`/`parse_path`
table. **Parity = run-path parity:** for the same control values, the new compile path yields the
same effective `RunRow` as today's flat-DTO path. Byte-identical audio is NOT tested. EmotionTTS keeps
its own runner + bespoke script-first/preset-rich UI (FR-12).

## Slices (TDD RED-first, sequential, shared tree, per-slice review)

### S1 — Generic host seam: extension-declared projection persisted at boot
- `crates/nexus-extension/src/recipe.rs`: add `projection: Option<serde_json::Value>` to `RecipeFile`
  (generic raw JSON; any extension may declare one).
- `crates/nexus-core/src/app.rs::persist_recipe_records`: when present, serialize → `RecipeRecord.projection`,
  set `projection_schema_version` from the block (`schema_version`), keep `author_kind='extension'`.
- Tests: recipe-file parse picks up `projection`; storage round-trip / seeding persists it.
- Boundary: generic by shape; zero ext-id literals. Host already reads `recipe.bindings` generically.

### S2 — Author EmotionTTS projection DATA + declare missing input ports
- `extensions/builtin/emotion-tts/workflows/emotional_dialogue_batch.yaml`: add 5 input ports
  (`speed_mode` enum, `seed_strategy` enum, `base_seed` number/int, `cache_policy` enum,
  `generation` object) so the compiler accepts the input bindings (resolved_inputs carriers).
  Confirm `validate_workflow` tolerates declared-but-unconsumed inputs (test).
- `extensions/builtin/emotion-tts/recipes/emotional_dialogue_batch.yaml`: add `projection:` block —
  controls (script, parser_mode, output_format, speed_factor, speed_mode, seed_strategy, base_seed,
  cache_policy, global_emotion, generation), each `bindings: ["input:<name>"]`; sections; presets
  (preserve preset richness); output `{primary_artifact: audio, preview_style: player}`.
- Test (emotion-tts-extension): build pinned snapshot from the YAML workflow + operators,
  `compile_recipe_run(projection, snapshot, values, None)` → resolved_inputs carries every field;
  defaults match; binding errors as expected.

### S3 — Run-path parity golden + rewire runner
- Capture golden of TODAY's path: control-value matrix → `RunRow` values from current `create_run_impl`.
- RED: new path (DTO → `ControlValues` → `compile_recipe_run` → `resolved_inputs` → `RunRow`) ==
  golden; `runner_builds_synthesis_job_from_resolved_outputs` (RunRow sourced from resolved_inputs,
  guard: not read from body for compiler-resolved fields); `binding_error_maps_to_422`.
- GREEN: rewire `create_run_impl` + `test_line` — load recipe projection + pinned snapshot, build
  ControlValues from DTO, compile, source RunRow from resolved_inputs; `BindingError → EmotionTtsError::validation` (422).
  `prebuilt_segments` stays a runner-only bypass (not a control).

### S4 — Delete table + workflows.rs metadata + frontend (lockstep)
- Delete `RecipeField`, `targets()`, `RecipeField::ALL`, `CURATED_NODES`, `CURATED_EDGES`,
  `WORKFLOW_TEMPLATE_ID`, `parse_path`, `read`, `write`, `bind_recipe_field`, `is_field_mappable`,
  `mappable_fields`, `unmappable_fields`, `default_workflow`, `default_config_for`,
  `compute_customised`, `refresh_customised`, local `WorkflowDocument`/`Node`/`Edge`. Drop
  `pub mod workflow_binding;` if empty.
- `router/workflows.rs`: retire/re-source `/workflow`,`/default`,`/catalog` (option b — derive from
  projection or drop mappable/unmappable + banner). Keep UI script-first/preset-rich.
- Frontend: `web/src/services/workflows_client.ts` drop `RecipeField` union + mappable/unmappable;
  `recipe.view.tsx`/`recipe.ui.tsx` adjust; rebuild `dist/emotion-tts.js`; vitest green.
- Delete `rust/tests/workflow_binding_test.rs` + inline `#[cfg(test)]` block.

### S5 — Verify
- `grep -rn "RecipeField\|CURATED_NODES\|WORKFLOW_TEMPLATE_ID\|bind_recipe_field" extensions/builtin/emotion-tts/rust/src` → 0.
- `cargo test -p emotion-tts-extension`, `cargo test -p nexus-recipe --test boundary_test`,
  `cargo test -p nexus-extension -p nexus-storage`, host build, web vitest + `pnpm build`.

## Boundary
All EmotionTTS specifics (controls, node/port names, presets) live in extension projection DATA. Host
S1 change is generic by shape. No ext-id literal enters a host crate. `apps/web` shell untouched.
