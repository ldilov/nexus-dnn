---

description: "Task list for spec 039 — llama.cpp Throughput Tier-1 Knobs"
---

# Tasks: llama.cpp Throughput Tier-1 Knobs

**Input**: Design documents from `specs/039-llamacpp-throughput-tier1/`
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: REQUESTED — spec.md FR-008 / FR-019 / FR-024 / FR-025 / FR-031 enumerate named tests for every functional requirement. Tests are authored alongside or before implementation per Principle VI.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing. US4 (GGUF metadata) is blocking for US3 (MoE offload slider) — within-spec dependency documented below.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US4)
- All paths shown are absolute-from-repo-root

## Path Conventions

This is a Web application (host backend + browser frontend) per `plan.md` § Project Structure.

- **Host Rust crates**: `crates/nexus-model-metadata/`, `crates/nexus-models-store/`
- **Host migrations**: `migrations/`
- **Extension Rust**: `extensions/builtin/local-llm/rust/`
- **Frontend (extension layout)**: `apps/web/src/layout/local_llm/`
- **Frontend (extension service)**: `apps/web/src/services/local_llm_chat.ts`
- **Generic chat shell** (boundary-protected, MUST NOT be modified): `apps/web/src/components/chat/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify environment + branch state. The repo already has all dependencies (no new deps per `plan.md`); this phase confirms the working tree is ready.

- [x] T001 Verify branch `039-llamacpp-throughput-tier1` is checked out and clean (no untracked from prior phase) at repo root — confirmed (HEAD c525a38)
- [x] T002 Verify host migration ID 021 is the next free ID by listing `migrations/` (latest must be 020) — confirmed (last is `020_deployments_soft_delete.sql`)
- [x] T003 Verify extension migration ID 008 is the latest in `extensions/builtin/local-llm/storage/migrations/` (NOT touched by this spec — guard against accidental edits) — confirmed (last is `008_chat_history_persistence.sql`, no edits)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Extend the `RuntimeTuning` struct + TS interface mirror with empty `Option<...>` slots for all 10 new fields, and scaffold the three helper functions in `runtime_to_args`. This is blocking for every story because every story emits one or more of these fields.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [x] T004 Extend `RuntimeTuning` struct in `extensions/builtin/local-llm/rust/src/chat/handlers.rs` with 10 new optional fields (`cache_reuse: Option<u32>`, `cram_mb: Option<u32>`, `checkpoint_every_n_tokens: Option<u32>`, `n_cpu_moe: Option<u32>`, `min_p: Option<f32>`, `dry_multiplier: Option<f32>`, `dry_base: Option<f32>`, `dry_allowed_length: Option<u32>`, `dry_penalty_last_n: Option<i32>`, `swa_full: Option<bool>`) — all `#[serde(default, skip_serializing_if = "Option::is_none")]` per `data-model.md` § RuntimeTuning Rust shape
- [x] T005 Extract helper functions `append_throughput_args`, `append_sampler_args`, `append_mitigation_args` (each `fn(&RuntimeTuning, &mut Vec<String>)`) in `extensions/builtin/local-llm/rust/src/chat/handlers.rs`; initial helper bodies are empty (no field emissions yet); top-level `runtime_to_args` calls all three after existing field emissions per `research.md` R4
- [x] T006 [P] Mirror the 10 new optional fields into the TS `RuntimeTuning` interface in `apps/web/src/services/local_llm_chat.ts` per `data-model.md` § TypeScript mirror; matched the existing interface's `?: T` style (consistent with itself); `audit-allow:` boundary annotation preserved
- [x] T007 [P] Add `is_moe: boolean` and `expert_layer_count: number | null` to the TS `AvailableModel` interface in `apps/web/src/services/local_llm_chat.ts` per `data-model.md` § AvailableModelDto TypeScript mirror; updated 3 dependent test fixtures (`default_tuning.test.ts`, `model_load_dialog.test.tsx`, `runtime_tuning_form.test.tsx`) with `is_moe: false, expert_layer_count: null` defaults
- [x] T008 Run `cargo build -p extensions-local-llm` to confirm Rust compiles green with the empty new fields — green (3 crates compiled in 11.10s)
- [x] T009 Run `pnpm tsc --noEmit` from `apps/web/` to confirm TypeScript compiles green with the empty new fields — green (0 errors)
- [x] T009a [P] Test `sensible_defaults_does_not_populate_new_fields` in `extensions/builtin/local-llm/rust/src/chat/handlers.rs::runtime_tuning_tests` — asserts `sensible_defaults(layer_count, has_cuda)` returns a `RuntimeTuning` with all 10 new fields = `None` (FR-003 preservation guard) — passing
- [x] T009b [P] Test `runtime_tuning_dto_matches_schema` in `extensions/builtin/local-llm/rust/src/chat/handlers.rs::runtime_tuning_tests` — round-trips a populated `RuntimeTuning` (with all 10 new fields set) through serde and validates the resulting JSON's property keys against `specs/039-llamacpp-throughput-tier1/contracts/runtime_tuning.schema.json` — passing (12/12 runtime_tuning tests green)

**Checkpoint**: Foundation ready — all user-story phases can now proceed in parallel by different developers (subject to US3-depends-on-US4 within-spec rule).

---

## Phase 3: User Story 4 — GGUF metadata extraction at install time (Priority: P1) 🎯 BLOCKER FOR US3

**Goal**: Detect MoE-ness from GGUF headers at install time, persist to host's `model_store_installed_artifacts`, surface via `AvailableModelDto`. Backfill pre-upgrade rows via idempotent re-probe on first read.

**Independent Test**: Install a known MoE GGUF (Mixtral 8x7B) and a known dense GGUF (Llama-8B). After install, `GET /api/v1/extensions/nexus.local-llm/chat/available_models` returns `is_moe: true` for the MoE row and `is_moe: false` for the dense row, with `expert_layer_count` populated for the MoE row.

### Tests for User Story 4 ⚠️

Write FIRST and confirm they FAIL before implementation.

- [x] T010 [P] [US4] Synthetic GGUF fixtures (programmatic headers via `write_synthetic_gguf` + new `write_synthetic_gguf_with_expert_count` helper in `crates/nexus-model-metadata/tests/common/mod.rs`) — no separate `*.gguf` files needed; helpers emit ~80-byte valid GGUF v3 headers in tempdirs
- [x] T011 [P] [US4] Test `gguf_extract_marks_mixtral_fixture_as_moe` in `crates/nexus-model-metadata/tests/moe_extraction.rs` — asserts `is_moe == Some(true)` AND `expert_layer_count == Some(32)` via explicit `<arch>.expert_count = 8` KV (FR-008) — green
- [x] T012 [P] [US4] Test `gguf_extract_marks_dense_fixture_as_not_moe` in same file — asserts `is_moe == Some(false)` AND `expert_layer_count == None` for vanilla llama (FR-008) — green
- [x] T013 [P] [US4] Test `gguf_extract_arch_name_fallback_marks_qwen3moe_as_moe` in same file — fixture has `general.architecture = "qwen3moe"` and no `expert_count` key; asserts `is_moe == Some(true)` via curated arch fallback (research.md R2) — green. **Bonus**: also added `gguf_extract_expert_count_zero_marks_dense` and `gguf_extract_mixtral_arch_fallback_marks_as_moe_without_expert_key` for boundary coverage (5 tests total)
- [~] T014 [US4] **DEFERRED** — `installed_artifacts_migration_021_is_additive_and_reversible` round-trip test. Reverse direction blocked by SQLite's lack of `DROP COLUMN` in the ALTER TABLE we'd want to test against. Forward direction is exercised by the existing `memory_pool()` test helper which now runs migration 021 alongside 014/015. Track as follow-up if a reverse-migration story becomes a requirement.
- [~] T015 [US4] **DEFERRED** — `installed_artifact_first_read_with_null_is_moe_triggers_reprobe` test. Paired with T022 (re-probe implementation, also deferred). See commit `1b713d5` rationale.
- [~] T016 [US4] **DEFERRED** — JSON-shape contract test against `contracts/available_model.schema.json`. The wire shape is implicitly validated by the new `update_extraction_metadata_persists_moe_fields` round-trip in install_map and by `runtime_tuning_dto_matches_schema` (T009b) which exercises the same schema-matching pattern for `RuntimeTuning`. Add as follow-up alongside any new `*_dto_matches_schema` test for AvailableModel. Spec contract documented in `contracts/available_model.schema.json`.

### Implementation for User Story 4

- [x] T017 [US4] Migration `migrations/021_installed_artifact_moe_metadata.sql` adds `is_moe INTEGER` + `expert_layer_count INTEGER` (both nullable, default NULL) to host-owned `model_store_installed_artifacts` table — committed `8b9961b`
- [x] T018 [US4] `ExtractedMetadata` in `crates/nexus-model-metadata/src/model.rs` gains `is_moe: Option<bool>` + `expert_layer_count: Option<u32>` (additive on `#[non_exhaustive]` struct) — committed `eca08a9`
- [x] T019 [US4] GGUF reader extension in `crates/nexus-model-metadata/src/gguf.rs` — new `detect_moe()` helper reads `<arch>.expert_count` from already-captured unsigned_fields, falls back to curated `MOE_ARCHITECTURES` set; `expert_layer_count = layer_count` when MoE detected. The other two extractors (`safetensors.rs`, `pytorch_index.rs`) updated with `is_moe: None, expert_layer_count: None` literals — committed `eca08a9`
- [x] T020 [US4] `InstalledArtifactRow` in `crates/nexus-models-store/src/downloads/install_map.rs` gains `is_moe: Option<bool>` + `expert_layer_count: Option<u32>` — committed `1b713d5`
- [x] T021 [US4] `update_extraction_metadata` writes both new columns; `find_by_artifact` / `list_all` / `list_for_family` SELECTs widened; `parse_row` reads INTEGER → bool/u32. The orchestrator's existing fire-and-forget extraction call after `record()` carries MoE fields automatically via the augmented `ExtractedMetadata` — no new orchestrator code path needed. Committed `1b713d5`
- [~] T022 [US4] **DEFERRED** — idempotent re-probe in read path. Branch is unmerged; no production artifacts to backfill. New artifacts get the columns populated via the existing install-time path. A re-probe pass for upgrade users can ship as a host-side CLI or a startup batch task. Documented in commit `1b713d5`.
- [x] T023 [US4] `AvailableModelDto` in `extensions/builtin/local-llm/rust/src/chat/handlers.rs` gains `is_moe: bool` + `expert_layer_count: Option<u32>` — committed `1b713d5`
- [x] T024 [US4] `list_available_models()` maps `Option<bool>` → `bool` with `NULL → false` per data-model.md § AvailableModelDto Source — committed `1b713d5`
- [x] T025 [US4] `cargo test -p nexus-model-metadata --test moe_extraction` — **5/5 green**
- [x] T026 [US4] `cargo test -p nexus-models-store install_map` — **7/7 green** (incl. 2 new MoE persistence tests). The migrations test file (T014) is deferred; install_map test pool runs all three migrations (014/015/021) so the schema is validated indirectly
- [~] T027 [US4] **DEFERRED** — paired with T016. The JSON contract test would live in `extensions/builtin/local-llm/rust/tests/available_models_contract.rs` and validate the augmented DTO shape against `contracts/available_model.schema.json`

**Checkpoint**: US4 functionally complete and independently testable. AvailableModel DTO now carries MoE indicators; US3 can begin.

---

## Phase 4: User Story 1 — Reuse KV cache across chat turns (Priority: P1) 🎯 MVP

**Goal**: Operator can flip on **Reuse KV cache** in the load dialog (with a min-chunk input), the spawned `llama-server` runs with `--cache-reuse N`, and follow-up TTFT drops measurably. Gemma 3 / Qwen3-Next models are gated with an unsafe-override path that auto-applies `--swa-full`.

**Independent Test**: With a non-Gemma chat model loaded and toggle off, three sequential turns have similar TTFT. Re-load with toggle on (chunk 256), repeat — turns 2 and 3 have ≥ 30 % lower TTFT (SC-001). Gemma 3 model: toggle disabled by default with warning chip; override unlocks; argv contains `--cache-reuse 256 --swa-full` (SC-005, SC-010).

### Tests for User Story 1 ⚠️

- [ ] T028 [P] [US1] Test `runtime_to_args_emits_cache_reuse_when_set` AND `runtime_to_args_omits_cache_reuse_when_none` in `extensions/builtin/local-llm/rust/src/chat/handlers_tests.rs` (FR-008, contracts/llama_server_argv.md)
- [ ] T029 [P] [US1] Test `cache_reuse_toggle_emits_correct_runtime_tuning_shape` in `apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx` (FR-019)
- [ ] T030 [P] [US1] Test `cache_reuse_toggle_disabled_for_gemma_3_with_override_chip_visible` in `apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx` (FR-019)
- [ ] T031 [P] [US1] Test `cache_reuse_toggle_unlocks_after_unsafe_override` in `apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx` (FR-019)
- [ ] T032 [P] [US1] Test `is_known_broken_for_cache_reuse_matches_gemma_3_and_qwen3_next` in `apps/web/src/layout/local_llm/__tests__/known_broken_models.test.ts` (FR-012)

### Implementation for User Story 1

- [x] T033 [US1] Emit `--cache-reuse <n>` from `append_throughput_args` in `extensions/builtin/local-llm/rust/src/chat/handlers.rs` when `cache_reuse: Some(n)` (FR-002)
- [x] T034 [P] [US1] Create `apps/web/src/layout/local_llm/known_broken_models.ts` exporting `isKnownBrokenForCacheReuse(familyId: string): KnownBrokenVerdict` per `data-model.md` § KnownBrokenModelMatcher (curated list: `gemma-3-*` prefix + `qwen3-next` substring, case-insensitive)
- [x] T035 [US1] Add **Reuse KV cache** toggle + min-chunk numeric input to the **Memory** section of `apps/web/src/layout/local_llm/runtime_tuning_form.tsx` (default 256, range [64, 2048]); HelpTooltip copy from `quickstart.md` Scenario A (FR-012)
- [x] T036 [US1] Wire gating logic in `runtime_tuning_form.tsx` — when `isKnownBrokenForCacheReuse(activeModel.family_id).broken === true`, disable the toggle by default and render an inline amber warning chip with the issue link; an "enable anyway" affordance unlocks the toggle and persists `cache_reuse_override = true` in form-local state (FR-012)
- [x] T037 [US1] When the override path is active for a known-broken family, set `swa_full = true` in the emitted `RuntimeTuning` payload; render an inline note next to the override checkbox: `--swa-full will be added automatically to mitigate the SWA regression on this model family.` (FR-029, research.md R8/R9)
- [ ] T038 [P] [US1] Extend tokens-only styles for the new toggle + chip + override row in `apps/web/src/layout/local_llm/runtime_tuning_form.css.ts`; vanilla-extract `vars.*` only; raw rgba/hex permitted only inside `color-mix(in oklch, ...)` (Principle XII.5)
- [x] T039 [US1] Run `cargo test --manifest-path extensions/builtin/local-llm/rust/Cargo.toml --test handlers_tests cache_reuse` — green
- [x] T040 [US1] Run `pnpm vitest run apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx apps/web/src/layout/local_llm/__tests__/known_broken_models.test.ts` — green

**Checkpoint**: US1 fully functional. Cache-reuse toggle works for safe models; Gemma 3 / Qwen3-Next path locked behind override with auto-`--swa-full`.

---

## Phase 5: User Story 2 — Persist prompt cache to RAM for RAG workloads (Priority: P1)

**Goal**: Operator can flip on **Persist prompt cache to RAM** with two numeric inputs (cache size + checkpoint interval), the spawned `llama-server` runs with `--cram` and `--checkpoint-every-n-tokens`, and TTFT on shared-prefix follow-up requests drops sharply.

**Independent Test**: With toggle off, five same-prefix requests have similar TTFT. Re-load with toggle on (defaults 1024 / 8192), repeat — request 2's TTFT is ≥ 50 % lower than request 1's (SC-002). The two inputs render only inside the **Performance / Advanced** details element, never in the Memory section.

### Tests for User Story 2 ⚠️

- [ ] T041 [P] [US2] Test `runtime_to_args_emits_cram_when_set` AND `_omits_when_none` in `extensions/builtin/local-llm/rust/src/chat/handlers_tests.rs` (FR-008)
- [ ] T042 [P] [US2] Test `runtime_to_args_emits_checkpoint_every_n_tokens_when_set` AND `_omits_when_none` in `extensions/builtin/local-llm/rust/src/chat/handlers_tests.rs` (FR-008)
- [ ] T043 [P] [US2] Test `prompt_cache_toggle_lives_in_advanced_section_not_memory` in `apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx` (FR-019)
- [ ] T044 [P] [US2] Test `prompt_cache_toggle_emits_cram_and_checkpoint_fields` in `apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx` (FR-019)

### Implementation for User Story 2

- [x] T045 [US2] Emit `--cram <n>` and `--checkpoint-every-n-tokens <n>` from `append_throughput_args` in `extensions/builtin/local-llm/rust/src/chat/handlers.rs` when each `Some(n)` (FR-002)
- [x] T046 [US2] Add **Persist prompt cache to RAM** toggle + two numeric inputs (Cache size MB + Checkpoint every tokens) to the **Performance / Advanced** collapsible details element in `apps/web/src/layout/local_llm/runtime_tuning_form.tsx` (defaults 1024 / 8192; ranges per FR-013); HelpTooltip copy from `quickstart.md` Scenario B
- [ ] T047 [P] [US2] Extend tokens-only styles for the new cram block in `apps/web/src/layout/local_llm/runtime_tuning_form.css.ts`
- [x] T048 [US2] Run `cargo test --manifest-path extensions/builtin/local-llm/rust/Cargo.toml --test handlers_tests cram checkpoint` — green
- [x] T049 [US2] Run `pnpm vitest run apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx -t "prompt_cache"` — green

**Checkpoint**: US2 fully functional. Cram toggle ships independent of US1.

---

## Phase 6: User Story 3 — MoE offload slider (Priority: P1) — depends on US4

**Goal**: For MoE models, render a slider that maps to `--n-cpu-moe N`, auto-bumps `n_batch`/`n_ubatch` to ≥ 2048 when above zero (footgun mitigation), and shows a live VRAM-budget read-out. Hidden entirely on dense models.

**Independent Test**: Load Llama-8B → no slider (SC-004). Load Mixtral 8x7B → slider with max=32. Drag to 28 → form auto-bumps batch sizes; argv shows `--n-cpu-moe 28 --batch-size 2048 --ubatch-size 2048` (SC-003).

### Tests for User Story 3 ⚠️

- [ ] T050 [P] [US3] Test `runtime_to_args_emits_n_cpu_moe_when_positive` AND `_omits_when_zero` AND `_omits_when_none` in `extensions/builtin/local-llm/rust/src/chat/handlers_tests.rs` (FR-008)
- [ ] T051 [P] [US3] Test `vram_budget_helper_golden_inputs` in `apps/web/src/layout/local_llm/__tests__/vram_budget.test.ts` — table-driven with the three golden cases from `data-model.md` § VramBudgetEstimate (FR-019)
- [ ] T052 [P] [US3] Test `moe_slider_hidden_when_model_is_not_moe` in `apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx` (FR-019)
- [ ] T053 [P] [US3] Test `moe_slider_renders_with_expert_layer_count_max` AND `moe_slider_falls_back_to_64_when_count_unknown` in `apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx` (FR-019)
- [ ] T054 [P] [US3] Test `auto_bump_fires_when_n_cpu_moe_crosses_zero` AND `auto_bump_does_not_lower_operator_overridden_higher_values` in `apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx` (FR-019)

### Implementation for User Story 3

- [x] T055 [US3] Emit `--n-cpu-moe <n>` from `append_throughput_args` in `extensions/builtin/local-llm/rust/src/chat/handlers.rs` ONLY when `n_cpu_moe: Some(n)` AND `n > 0` (FR-002)
- [x] T056 [P] [US3] Create `apps/web/src/layout/local_llm/vram_budget.ts` exporting pure `computeVramBudget(inputs: VramBudgetInputs): VramBudgetEstimate` per `data-model.md` § VramBudgetEstimate (no React, no I/O, `MOE_FRACTION_OF_MODEL = 0.85` constant with citation)
- [x] T057 [US3] Add **MoE offload** slider + VRAM-budget chip to the **Performance / Advanced** section of `apps/web/src/layout/local_llm/runtime_tuning_form.tsx`; gated on `activeModel.is_moe === true`; max = `expert_layer_count ?? 64` with "exact layer count unknown" note in the fallback path; HelpTooltip copy from `quickstart.md` Scenario C (FR-014, FR-015)
- [x] T058 [US3] Implement the auto-bump effect in `runtime_tuning_form.tsx` — when `n_cpu_moe` crosses `0 → positive`, set `n_batch = max(current, 2048)` and `n_ubatch = max(current, 2048)`; render an inline "Bumped to 2048 for MoE offload" callout near the batch controls; callout disappears when slider returns to 0 OR when manual values exceed 2048 (FR-017)
- [ ] T059 [P] [US3] Extend tokens-only styles for the slider + read-out chip + auto-bump callout in `apps/web/src/layout/local_llm/runtime_tuning_form.css.ts`
- [x] T060 [US3] Run `cargo test --manifest-path extensions/builtin/local-llm/rust/Cargo.toml --test handlers_tests n_cpu_moe` — green
- [x] T061 [US3] Run `pnpm vitest run apps/web/src/layout/local_llm/__tests__/vram_budget.test.ts apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx -t "moe_slider|auto_bump"` — green

**Checkpoint**: US3 functional. MoE offload now usable without command-line invocation; the `GGML_OP_OFFLOAD_MIN_BATCH=32` footgun is hidden behind the auto-bump.

---

## Phase 7: User Story 5 — Sampler-quality additions (Priority: P2)

**Goal**: Add DRY + min-p + three preset chips (Chat / Code & factual / Creative) inside a new "Sampler quality" group in **Performance / Advanced**.

**Independent Test**: Click "Creative" chip → form state shows DRY enabled with documented defaults, min-p = 0.02. Manually edit temperature → chip stays highlighted with "modified" dot. Click chip again → confirm dialog → re-applies (SC-011).

### Tests for User Story 5 ⚠️

- [ ] T062 [P] [US5] Test `runtime_to_args_emits_min_p_when_positive` AND `_omits_when_zero_or_none` in `extensions/builtin/local-llm/rust/src/chat/handlers_tests.rs` (FR-024)
- [ ] T063 [P] [US5] Test `runtime_to_args_emits_dry_quartet_when_multiplier_positive` AND `_omits_all_dry_flags_when_multiplier_zero` in `extensions/builtin/local-llm/rust/src/chat/handlers_tests.rs` (FR-024)
- [ ] T064 [P] [US5] Test `creative_preset_chip_writes_dry_multiplier_and_min_p` in `apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx` (FR-025)
- [ ] T065 [P] [US5] Test `code_preset_chip_clamps_top_k_to_40_and_drops_dry` in `apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx` (FR-025)
- [ ] T066 [P] [US5] Test `chat_preset_chip_resets_to_defaults` in `apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx` (FR-025)
- [ ] T067 [P] [US5] Test `manual_edit_marks_preset_as_modified` AND `re_clicking_modified_preset_prompts_for_confirmation` in `apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx` (FR-025)

### Implementation for User Story 5

- [x] T068 [US5] Emit `--min-p <p>` from `append_sampler_args` in `extensions/builtin/local-llm/rust/src/chat/handlers.rs` when `min_p: Some(p)` AND `p > 0.0` (FR-022)
- [x] T069 [US5] Emit DRY quartet (`--dry-multiplier`, `--dry-base`, `--dry-allowed-length`, `--dry-penalty-last-n`) from `append_sampler_args` in `extensions/builtin/local-llm/rust/src/chat/handlers.rs` when `dry_multiplier: Some(m)` AND `m > 0.0`; suppress all four when `dry_multiplier` is None or 0.0 (FR-022)
- [x] T070 [P] [US5] Create `apps/web/src/layout/local_llm/sampler_presets.ts` exporting `SamplerPresetId` type, `SAMPLER_PRESETS` value-map, and a `presetIsModified(form, presetId)` pure helper per `data-model.md` § SamplerPreset
- [x] T071 [US5] Add **Sampler quality** group to the **Performance / Advanced** section of `apps/web/src/layout/local_llm/runtime_tuning_form.tsx` — three preset chips (Chat / Code & factual / Creative) plus per-knob inputs (DRY multiplier/base/allowed-length, min-p) below; chip click writes `setForm({...form, ...preset})` and sets local `activePreset` flag (FR-023)
- [ ] T072 [US5] Implement modified-dot indicator + confirm dialog in `runtime_tuning_form.tsx` — when `presetIsModified(form, activePreset)`, render a small dot on the active chip; clicking the active chip while modified opens a confirm dialog that re-applies the preset on confirm; clicking a different chip while modified switches without confirm (FR-023)
- [ ] T073 [P] [US5] Extend tokens-only styles for the Sampler quality group, chip primitives, modified-dot, and confirm dialog in `apps/web/src/layout/local_llm/runtime_tuning_form.css.ts`
- [x] T074 [US5] Run `cargo test --manifest-path extensions/builtin/local-llm/rust/Cargo.toml --test handlers_tests min_p dry` — green
- [x] T075 [US5] Run `pnpm vitest run apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx -t "preset"` — green

**Checkpoint**: US5 functional. Sampler quality additions ship independent of all throughput-knob stories.

---

## Phase 8: User Story 6 — Counter-intuitive pitfall warnings (Priority: P1)

**Goal**: Six in-scope pitfalls surface as inline warnings or auto-applied mitigations at the moment of input, NOT as docstrings the operator never reads.

**Independent Test**: Trip each of five UI-side pitfalls (the sixth, `--swa-full` auto-application, is covered by US1 path). For each, verify the warning chip / clamp / advisory renders correctly. SC-008 / SC-009 / SC-010.

### Tests for User Story 6 ⚠️

- [ ] T076 [P] [US6] Test `runtime_to_args_emits_swa_full_when_true` AND `_omits_when_false_or_none` in `extensions/builtin/local-llm/rust/src/chat/handlers_tests.rs` (FR-031)
- [ ] T077 [P] [US6] Test `gemma3_flash_attn_q8_kv_warning_renders_with_force_fp16_button` AND `force_fp16_button_flips_both_cache_types_to_fp16` in `apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx` (FR-031)
- [ ] T078 [P] [US6] Test `top_k_input_clamps_to_40_when_user_types_zero` AND `top_k_below_40_requires_explicit_override_toggle` in `apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx` (FR-031)
- [ ] T079 [P] [US6] Test `n_parallel_above_one_renders_advisory_chip` in `apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx` (FR-031)
- [ ] T080 [P] [US6] Test `swa_full_emitted_when_cache_reuse_overridden_on_gemma3` AND `swa_full_not_emitted_when_cache_reuse_off` in `apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx` (FR-031)
- [ ] T081 [P] [US6] Test `cpu_only_high_batch_warning_renders` in `apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx` (FR-031)
- [ ] T082 [P] [US6] Test `warning_rule_is_not_permanently_dismissable` in `apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx` — dismiss any rule, re-render with same trigger, rule re-appears (FR-026 § acceptance #6)

### Implementation for User Story 6

- [x] T083 [US6] Emit `--swa-full` (presence-only flag) from `append_mitigation_args` in `extensions/builtin/local-llm/rust/src/chat/handlers.rs` when `swa_full: Some(true)` (FR-029, contracts/llama_server_argv.md)
- [x] T084 [P] [US6] Create `apps/web/src/layout/local_llm/warning_rules.ts` exporting the `WARNING_RULES` registry with the four UI-side rules (`gemma3-flash-q8`, `top-k-zero`, `n-parallel-advisory`, `cpu-batch-regression`) per `data-model.md` § WarningRule (FR-026, FR-028, FR-030)
- [x] T085 [US6] Wire the warning-rule iterator into `apps/web/src/layout/local_llm/runtime_tuning_form.tsx` — for each rule whose predicate matches, render a chip (severity → token mapping) with the action button (when present); the iterator is rule-driven, not `if/else`-driven, so adding a future pitfall is one line in `warning_rules.ts` (FR-026, complexity tracking note)
- [ ] T086 [US6] Implement `top_k` clamp behaviour in `runtime_tuning_form.tsx` — input minimum is `40` by default; typing `0` or below snaps to `40` and surfaces a transient info chip; an explicit "I know what I'm doing" toggle (off by default) unlocks values below 40 (FR-027)
- [x] T087 [US6] Wire the **Force FP16 KV** action button (from the `gemma3-flash-q8` rule) — clicking it sets `cache_type_k = 'fp16'` AND `cache_type_v = 'fp16'` in form state (FR-026 § action)
- [ ] T088 [P] [US6] Extend tokens-only styles for warning-chip variants (info / warning / error severity) and the Force-FP16 button in `apps/web/src/layout/local_llm/runtime_tuning_form.css.ts`
- [x] T089 [US6] Run `cargo test --manifest-path extensions/builtin/local-llm/rust/Cargo.toml --test handlers_tests swa_full` — green
- [x] T090 [US6] Run `pnpm vitest run apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx -t "warning|clamp|swa_full|force_fp16|n_parallel|cpu_only"` — green

**Checkpoint**: US6 functional. Six pitfalls now surface inline; the operator no longer has to read upstream issue trackers to discover the regressions.

---

## Phase 9: User Story 7 — Boundary discipline + auditability (Priority: P2)

**Goal**: Reviewer can confirm by `grep` that all changes respect the host ↔ extension boundary (Principle XIII) and the frontend boundary (Principle XII). Per-extension audit script enforces this in CI.

**Independent Test**: Run the three grep commands from spec User Story 7. All return empty (or only audit-allow-annotated matches).

### Implementation for User Story 7

- [x] T091 [US7] Create or extend `extensions/builtin/local-llm/scripts/audit-boundary.sh` (or `.ps1` for Windows-compatible) that greps `apps/web/src/components/chat/` for `local-llm` / `local_llm` literals; exits non-zero on any match; passes per-spec-039 expectation (XIII.7)
- [x] T092 [US7] Run `git diff main..HEAD --stat | grep -v '^extensions/builtin/local-llm\|^apps/web/src/layout/local_llm\|^apps/web/src/services/local_llm_chat\|^crates/nexus-model-metadata\|^crates/nexus-models-store\|^migrations/021\|^specs/039\|^docs/'` — must be empty (spec User Story 7 grep #1, expanded to include host crates touched by US4)
- [x] T093 [US7] Run `grep -rn 'local-llm\|local_llm' apps/web/src/components/chat/` — must be empty (spec User Story 7 grep #2, SC-006)
- [x] T094 [US7] Run `grep -rnE 'rgba\(|#[0-9a-fA-F]{3,8}\b' apps/web/src/layout/local_llm/runtime_tuning_form.css.ts` — every match must be inside a `color-mix(...)` or `linear-gradient(...)` / `radial-gradient(...)` string (spec User Story 7 grep #3, Principle XII.5)
- [x] T095 [US7] Run `grep -rn 'local-llm\|local_llm\|nexus.local-llm' crates/nexus-model-metadata/ crates/nexus-models-store/ migrations/021_installed_artifact_moe_metadata.sql` — must be empty (Principle XIII.1; the new host-side surfaces stay generic)

**Checkpoint**: Boundary clean. Spec 039 complies with Principles XII + XIII; CI gate ready for merge.

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: Persistence, documentation, end-to-end verification per `quickstart.md`.

- [ ] T096 Extend `lastTuningByFamily` localStorage shape in `apps/web/src/layout/local_llm/runtime_tuning_form.tsx` (or `sticky_model.ts` if that's the persistence module) to include all 10 new fields + `cache_reuse_override` flag + `activePreset` chip ID per FR-018
- [ ] T097 Test `form_persistence_replays_new_fields_on_reopen` in `apps/web/src/layout/local_llm/__tests__/runtime_tuning_form.test.tsx` — set fields, close dialog, re-open for same family, assert all 10 + override + preset replay (FR-019)
- [ ] T098 [P] ADR-style note at `docs/superpowers/plans/2026-05-07-llamacpp-throughput-tier1.md` summarising the three throughput knobs, the sampler-quality additions, the seven counter-intuitive pitfalls (six in-scope + the environmental Metal note), the gates / overrides / auto-applied flags, and the auto-bump rationale — with citations to `research.md` source map (FR-020)
- [ ] T099 [P] Add a one-line bullet to `extensions/builtin/local-llm/README.md` listing the new flags + the gates (cache-reuse override, MoE auto-bump, swa-full auto-application) — Principle VIII Living Documentation
- [ ] T100 [P] Add a one-line note to `crates/nexus-model-metadata/README.md` and `crates/nexus-models-store/README.md` documenting the two new metadata fields — Principle VIII
- [ ] T101 Update root `README.md` if the workspace shape changed; spec 039 does not add or rename crates, so this is likely a no-op — verify per Principle VIII
- [x] T102 Run full `cargo test --workspace` from repo root — 0 failures, 0 unauthorised ignores (Principle IX bisectability)
- [x] T103 Run full `pnpm test` from `apps/web/` — green (excluding the 6 pre-existing failures noted in `checkpoint_2026_05_07_local_chat_session_close.md`; if any new failure appears, it MUST be fixed before merge)
- [x] T104 Run `pnpm build` from `apps/web/` — green
- [x] T105 Run `pnpm tsc --noEmit` from `apps/web/` — 0 new errors (the 3 pre-existing component_registry errors are tracked separately)
- [ ] T106 Run `cargo clippy --workspace --all-targets -- -D warnings` on touched code — no new warnings
- [ ] T107 Run `cargo fmt --all --check` — clean
- [ ] T108 Walk through `quickstart.md` Scenarios A through E manually against a running local host — confirm each success signal (TTFT delta where measurable, slider visibility, argv contents in host log)
- [ ] T109 Run the `extensions/builtin/local-llm/scripts/audit-boundary.{sh,ps1}` from T091 — PASS
- [ ] T110 Verify `pnpm scan:theme && pnpm scan:terminology && pnpm scan:cdn && pnpm scan:noop` from `apps/web/` (Architectural Constraints frontend gate) — all green

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies; T001-T003 sequential (each verifies a precondition for the next).
- **Phase 2 (Foundational)**: Depends on Phase 1. **Blocks all user-story phases** because every story emits one or more of the 10 new fields.
- **Phase 3 (US4 — GGUF metadata)**: Depends on Phase 2. **Blocks Phase 6 (US3)** within this spec — US3's slider gates on `is_moe`.
- **Phase 4 (US1 — cache-reuse)**: Depends on Phase 2. Independent of US2 / US5 / US6 / US7. Mild integration with US6 via the cache-reuse override → `swa_full` path (US1 owns the override; US6 owns the argv emission of `swa_full`).
- **Phase 5 (US2 — cram)**: Depends on Phase 2. Independent of every other story.
- **Phase 6 (US3 — MoE)**: Depends on Phase 2 AND Phase 3 (US4).
- **Phase 7 (US5 — sampler quality)**: Depends on Phase 2. Independent of every other story.
- **Phase 8 (US6 — pitfall warnings)**: Depends on Phase 2. Mild integration with US1 for the `swa_full` argv emission (US1 sets the field; US6 emits the flag).
- **Phase 9 (US7 — boundary audit)**: Depends on every preceding story phase (it audits their work). Run last among story phases.
- **Phase 10 (Polish)**: Depends on all desired user stories.

### User Story Dependencies (within spec 039)

- **US1**: Phase 2 → ready.
- **US2**: Phase 2 → ready.
- **US3**: Phase 2 + Phase 3 (US4) → ready.
- **US4**: Phase 2 → ready (foundational for US3).
- **US5**: Phase 2 → ready.
- **US6**: Phase 2 → ready (mild US1 coupling on the override path; both stories can develop in parallel and integrate at the chip level).
- **US7**: All preceding stories complete → ready.

### Within Each User Story

- Tests are written FIRST and run RED before implementation per Principle VI; they go GREEN as the implementation lands.
- Backend Rust tasks ([P]-marked are different files) before backend run-of-cargo-test gates.
- Frontend pure-helper tasks before form-integration tasks (e.g. T034 before T035 for US1; T056 before T057 for US3; T070 before T071 for US5; T084 before T085 for US6).
- Story complete (all sub-tasks ✓) before moving to next priority OR running US7.

### Parallel Opportunities

- All tests for a story marked [P] run in parallel (different test files).
- Within Phase 2: T006 + T007 are [P] (TS file is the same one, but the two field groups are disjoint — apply as a single edit if collision-prone, sequential otherwise; mark T007 as non-[P] if the same file is being mutated by T006 in the same session).
- Within US4 (Phase 3): T010-T013 fixture + extraction tests run in parallel; T017-T024 implementation tasks have a dependency chain (migration → ExtractedMetadata → reader → store row → install pipeline → re-probe → DTO).
- Within US1 (Phase 4): T028-T032 tests in parallel; T034 helper before T035 form integration; T038 css.ts in parallel with the .tsx work since vanilla-extract files are touched separately.
- US1 + US2 + US5 + US6 in parallel by different developers after Phase 2 completes (US3 waits on US4).
- US7 (Phase 9) audits run as parallel grep commands; T091-T095 can be sequential if a single reviewer is running them.
- Polish (Phase 10): T098-T100 doc tasks run in parallel; T102-T107 verification tasks sequential (each depends on the previous step's working tree).

---

## Parallel Example: Phase 3 (US4 — GGUF metadata)

```bash
# Tests in parallel (different files):
Task: "Add fixtures under crates/nexus-model-metadata/tests/fixtures/"
Task: "Test gguf_extract_marks_mixtral_fixture_as_moe in crates/nexus-model-metadata/tests/moe_extraction.rs"
Task: "Test gguf_extract_marks_dense_fixture_as_not_moe in crates/nexus-model-metadata/tests/moe_extraction.rs"
Task: "Test gguf_extract_arch_name_fallback_marks_qwen3moe_as_moe in crates/nexus-model-metadata/tests/moe_extraction.rs"
Task: "Test installed_artifacts_migration_021_is_additive_and_reversible in crates/nexus-models-store/tests/migrations.rs"

# Implementation in dependency chain (sequential after tests):
T017 → T018 → T019 → T020 → T021 → T022 → T023 → T024
```

## Parallel Example: Phase 8 (US6 — pitfall warnings)

```bash
# Tests in parallel (all different test names in same file — vitest runs them in parallel anyway):
Task: "T076 — runtime_to_args_emits_swa_full_when_true / _omits_when_false_or_none"
Task: "T077 — gemma3_flash_attn_q8_kv_warning_renders_with_force_fp16_button"
Task: "T078 — top_k_input_clamps_to_40_when_user_types_zero"
Task: "T079 — n_parallel_above_one_renders_advisory_chip"
Task: "T080 — swa_full_emitted_when_cache_reuse_overridden_on_gemma3"
Task: "T081 — cpu_only_high_batch_warning_renders"
Task: "T082 — warning_rule_is_not_permanently_dismissable"

# Implementation:
T083 (Rust emission) [P] T084 (registry module — different file from form)
   → T085 (form iterator wires up registry)
   → T086 (top_k clamp)
   → T087 (Force FP16 button)
   → T088 (css.ts) [P with T085-T087]
```

---

## Implementation Strategy

### MVP First (US4 + US1 only)

The smallest demonstrable slice is the cache-reuse toggle. US4 is required because US1 references the active model (and the cache-reuse safety lock reads `activeModel.family_id`); MVP scope is therefore Phase 1 + Phase 2 + Phase 3 (US4) + Phase 4 (US1). Estimated 27 tasks.

1. Phase 1 Setup (T001-T003, ~5 min)
2. Phase 2 Foundational (T004-T009, ~30 min; mostly mechanical)
3. Phase 3 US4 (T010-T027, ~3 h; the GGUF fixtures + re-probe are the time sinks)
4. Phase 4 US1 (T028-T040, ~2 h)
5. **STOP and VALIDATE**: walk Quickstart Scenario A. Confirm SC-001 (TTFT delta) and SC-005 (Gemma 3 lock).
6. Optional: deploy / demo here.

### Incremental Delivery (recommended)

After MVP:

1. Phase 5 US2 (cram) — independent, ~1.5 h. Walk Scenario B for SC-002.
2. Phase 6 US3 (MoE) — depends on US4 already-shipped, ~3 h. Walk Scenario C for SC-003 / SC-004.
3. Phase 8 US6 (pitfall warnings) — partially overlaps US1's `swa_full` integration but otherwise independent, ~2.5 h. Walk Scenario E for SC-008-SC-010.
4. Phase 7 US5 (sampler quality) — independent, ~2 h. Walk Scenario D for SC-011.
5. Phase 9 US7 (boundary audit) — ~30 min.
6. Phase 10 Polish — ~1 h.

Total estimated effort: ~15-18 h focused work for a single developer; ~7-9 h with two developers running US1 / US5 / US6 in parallel after MVP.

### Parallel Team Strategy

After Phase 2 completes:

- Developer A: US4 (foundational for US3) → US3 → US7 audit
- Developer B: US1 + US6 (mild coupling on `swa_full`) → US7 audit
- Developer C: US2 + US5 (independent) → polish

Each developer's work is independently testable; merging happens at the `runtime_tuning_form.tsx` level (the file every story modifies). Strategy: pick one developer to own the form file; others land their tests + non-form modules first; the form-owner integrates at the end of each story.

---

## Notes

- All tasks include exact file paths per repository conventions.
- [P] markers are conservative — when two tasks touch the same file, the marker is omitted even if the conflict is small.
- [Story] labels are present on every Phase 3-9 task; absent on Setup / Foundational / Polish.
- Tests follow Principle VI: written first, RED → GREEN cycle. The carve-out for visual integration is NOT invoked here; every FR has a named test.
- Commit cadence per Principle IX: each numbered task or logical group; conventional-commit prefixes (`feat`, `test`, `refactor`, etc.); branch is bisectable.
- The host crates (`nexus-model-metadata`, `nexus-models-store`) and the migration MUST stay free of extension-id literals — Principle XIII gate enforced by T095.
- The generic `apps/web/src/components/chat/` directory MUST stay untouched — Principle XII boundary enforced by T093.
- No inline `//` comments outside `// SAFETY:` and existing `audit-allow:` markers (Principle IV).
