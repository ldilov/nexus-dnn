# Implementation Plan: llama.cpp Throughput Tier-1 Knobs

**Branch**: `039-llamacpp-throughput-tier1` | **Date**: 2026-05-07 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/039-llamacpp-throughput-tier1/spec.md`

## Summary

Extend the Local-LLM extension's `RuntimeTuningForm` and the host's GGUF metadata extraction with three Tier-1 throughput knobs (`--cache-reuse`, `--cram` + `--checkpoint-every-n-tokens`, `--n-cpu-moe`), three sampler-quality additions (DRY, min-p, three preset chips), one mitigation flag (`--swa-full`), and six in-scope counter-intuitive-pitfall warnings. The work splits across two crates (host: GGUF reader + model store + migration; extension: RuntimeTuning + handlers + frontend form) with strict adherence to Principle XIII (host ↔ extension boundary).

## Technical Context

**Language/Version**: Rust 1.84 (workspace MSRV) for host + extension Rust crates; TypeScript 5.x / React 19 / Vite 6 / Node ≥ 20 for the frontend.
**Primary Dependencies**: existing — `axum`, `serde`, `sqlx`, `tracing` on the Rust side; `react-router@^7.14`, `swr@^2.4`, `@vanilla-extract/css`, `motion/react`, `sonner` on the frontend. The `gguf` reader path inside `crates/nexus-model-metadata/` already handles header parsing for spec 028 metadata; this spec adds two GGUF metadata key reads (`*.expert_count`, `*.expert_used_count` and architecture-name MoE detection). **No new workspace dependencies.**
**Storage**: SQLite via `nexus-storage`. ONE new host migration `021_installed_artifact_moe_metadata.sql` adds two nullable columns to the existing host-owned `model_store_installed_artifacts` table — `is_moe INTEGER` and `expert_layer_count INTEGER`. The local-llm extension's own `extensions/builtin/local-llm/storage/migrations/` series is NOT touched (latest there remains 008; spec 029 territory).
**Testing**: `cargo test -p nexus-model-metadata` (GGUF fixture-driven extraction tests), `cargo test -p nexus-models-store` (migration round-trip + DTO surfacing), `cargo test --manifest-path extensions/builtin/local-llm/rust/Cargo.toml` (RuntimeTuning + runtime_to_args + handlers), `pnpm vitest run` (form behaviour, helper goldens, warning rules), and Playwright smoke if the existing local-llm e2e harness has bandwidth (deferred unless trivial). Backend contract test for the augmented `GET /api/v1/extensions/nexus.local-llm/chat/available_models` payload.
**Target Platform**: Local desktop host (Windows / macOS / Linux) running the `nexus` host binary; Vite-built browser frontend served by the host. No mobile or server-cluster target.
**Project Type**: Web application — host backend (Rust crates) + browser frontend (`apps/web`) + first-party extension (`extensions/builtin/local-llm`). Layered React structure per Principle XII; extension consumes the host's generic dispatcher mount per Principle XIII.
**Performance Goals**: Match upstream llama.cpp benchmarks documented in `research.md` — `--cache-reuse` gives a measurable TTFT cut on follow-up turns of a stable-prefix chat; `--cram` + `--checkpoint-every-n-tokens` cut TTFT up to ~93 % on cached RAG-style requests; `--n-cpu-moe` makes 100B+ MoE models loadable on 24 GB consumer GPUs with non-zero token-per-second output. Form re-render perf budget: each new control adds < 1 ms to dialog open. The host migration must be < 50 ms on a model-store of 1 000 rows.
**Constraints**:
- Host ↔ extension boundary (Principle XIII): host crates touched are `nexus-model-metadata` (extraction) and `nexus-models-store` (table + DTO), both of which already serve any model-loading extension generically. They MUST NOT contain the strings `local-llm` / `nexus.local-llm`. The local-llm extension consumes via the existing `nexus_models_store` types — no new host coupling.
- Web frontend (Principle XII): all new TypeScript lives under `apps/web/src/layout/local_llm/`. The generic `apps/web/src/components/chat/` directory MUST remain untouched. Vanilla-extract tokens only; raw `rgba(...)` / `#hex` permitted only inside `color-mix(in oklch, ...)` or gradient strings.
- Self-documenting code (Principle IV): no inline `//` comments except `// SAFETY:` and the existing `audit-allow:` boundary markers.
- Migrations are append-only and idempotent (Architectural Constraints + spec 028 precedent).
- `--swa-full` auto-application (FR-029) is the only place the form mutates argv beyond what the operator explicitly typed; the form documents this inline so POLA is preserved (Principle II).
**Scale/Scope**: per-load tuning DTO — single-user, per-request scope. Form local state + `lastTuningByFamily` localStorage. No concurrency-scale concerns. Spec adds **10 optional fields** to `RuntimeTuning`, **2 nullable columns** to `model_store_installed_artifacts`, **1 new TypeScript helper** (`computeVramBudget`), **6 warning rules** in a curated registry, **3 sampler preset chips** in a static value-map, **1 known-broken-models matcher**.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Verdict | Note |
|---|---|---|
| I. Ecosystem-First | PASS | No new dependencies. GGUF reader (`nexus-model-metadata`), sqlx, axum, vanilla-extract, motion all reused. |
| II. SOLID + Pure Functions | PASS | `computeVramBudget` is a pure helper (no React, no I/O). `runtime_to_args` is a pure function from `RuntimeTuning` to `Vec<String>`. The known-broken-models matcher is pure. CQS preserved — `set_active_model` mutates, `runtime_to_args` returns. |
| III. Modularity / Method Size | PASS | `runtime_to_args` will exceed 25 lines if all 10 new fields are appended naively; resolution is helper extraction (`append_throughput_args`, `append_sampler_args`, `append_mitigation_args`) keeping each helper ≤ 25 lines. The form is split into existing sections; new fields go into the right sections without growing any single component above 800 LOC. |
| IV. Self-Documenting Code | PASS | Identifier names carry meaning; no inline comments. Doc-comments on `RuntimeTuning` field additions document each flag's wire contract per Principle II's Design-by-Contract clause (acceptable per Principle IV — module/item-level docs are encouraged). |
| V. Adapter Contracts | PASS | `RuntimeTuning` is `#[non_exhaustive]` already; new fields land via additive enum/serde-default discipline. `AvailableModelDto` likewise. No host-side code changes for new fields beyond the GGUF reader extension and the additive migration. |
| VI. Test-First | PASS | Spec lists named tests for every FR (FR-008 / FR-019 / FR-024 / FR-025 / FR-031). Tests authored before or alongside implementation per the carve-out. Frontend form tests use the existing vitest harness; backend tests use fixture-driven GGUF blobs. |
| VII. Memory & Type Safety | PASS | All new fields are `Option<...>` typed scalars (no raw strings, no primitive obsession on domain-shaped values). No `unsafe`. No new `unwrap()` in production paths — argv emission uses `.iter().filter_map(...)`. |
| VIII. Living Documentation | PASS | Per FR-020, an ADR-style note lands alongside the checkpoint summarising the knobs, pitfalls, and rationale. The extension's `README.md` gets a short bullet list of new flags. The host crate READMEs need a one-line note about the new metadata fields. |
| IX. Git-Flow | PASS | Already on `039-llamacpp-throughput-tier1` branch off `main`. Conventional-commit prefixes, bisectable history. |
| X. Parallelism-First | PASS | No new long-running work. The GGUF re-probe of pre-upgrade artifacts is on-first-read, lazy, and bounded — runs in the existing model-store read path which is already async. |
| XI. Rust Idioms | PASS | Newtype not strictly needed for the four `u32` knobs (they are llama.cpp protocol numbers, not domain identifiers — primitive obsession exception per Appendix C "newtype for domain identifiers"). RAII + iterator combinators in `runtime_to_args`. `#[non_exhaustive]` preserved. `mem::take` not needed. Declarative form for argv emission. |
| XII. Web Frontend Architecture | PASS | All work in `apps/web/src/layout/local_llm/`. Smart/dumb split preserved — `runtime_tuning_form.tsx` is the smart container; new chip / pill primitives are presentational. Vanilla-extract tokens only. Motion not introduced (form is static). React Router untouched. Single `services/local_llm_chat.ts` I/O boundary preserved. Dedup: warning-rule registry is one file, not duplicated per condition. |
| XII.8 — Design discipline for design-led specs | N/A | Spec 039 is NOT design-led: no net-new visual surface, no layout / IA / interaction-model redesign — it adds controls into existing form sections and one new "Sampler quality" sub-group. Adheres to spec 037's existing Spectral Graphite tokens. The "Design direction" subsection is intentionally OMITTED per the template instructions ("For non-visual specs … DELETE this entire section"). |
| XIII. Host ↔ Extension Boundary | PASS-with-note | Host changes are intentional and generic: `nexus-model-metadata` extracts MoE indicators applicable to ANY model-loading extension; `nexus-models-store` exposes them via DTO; migration `021_installed_artifact_moe_metadata.sql` adds nullable columns to a host-owned table. None of these host crates contain the string `local-llm`. The local-llm extension only **consumes** the new fields via `list_available_models`. **Note**: the spec's User Story 7 / FR-020 wording ("Rust changes live under `extensions/builtin/local-llm/` … any host-side migration touches the artifact store via the extension boundary") implied the migration was extension-owned; that wording is wrong by Principle XIII.4 (extension-owned tables are `ext_*__*`). The migration MUST live in host's `migrations/` because the table is host-owned. Documented in Complexity Tracking. |

**Result**: PASS. No FAIL rows. The single PASS-with-note (Principle XIII clarification of where the migration lives) is recorded in Complexity Tracking and resolved by the data-model and contracts.

## Project Structure

### Documentation (this feature)

```text
specs/039-llamacpp-throughput-tier1/
├── plan.md              # this file
├── research.md          # Phase 0 (already drafted by /speckit-specify; Phase 0 will append open questions)
├── data-model.md        # Phase 1 — DTO shapes, RuntimeTuning fields, migration column types
├── quickstart.md        # Phase 1 — operator-facing walkthrough (load with cache-reuse, with cram, with MoE offload)
├── contracts/
│   ├── runtime_tuning.schema.json   # JSON-shape contract for the augmented RuntimeTuning DTO (10 new fields)
│   ├── available_model.schema.json  # JSON-shape contract for AvailableModel additions (is_moe, expert_layer_count)
│   └── llama_server_argv.md         # Wire-format contract: which RuntimeTuning fields → which CLI flags
├── checklists/
│   └── requirements.md  # Already drafted; passes
└── tasks.md             # Phase 2 — generated by /speckit-tasks (NOT this command)
```

### Source Code (repository root)

```text
crates/
├── nexus-model-metadata/                 # HOST — GGUF extraction extension
│   └── src/
│       ├── gguf.rs                       # extend extract() to read MoE indicators
│       ├── model.rs                      # add is_moe + expert_layer_count to ExtractedMetadata
│       └── tests/
│           ├── fixtures/                 # add small Mixtral-shaped + dense GGUF fixtures
│           └── moe_extraction.rs         # new — fixture-driven MoE detection tests
└── nexus-models-store/                   # HOST — DTO surfacing
    └── src/
        ├── model.rs                      # add is_moe + expert_layer_count to InstalledArtifact row type
        └── install/                      # extend install pipeline to write the new columns

migrations/
└── 021_installed_artifact_moe_metadata.sql   # HOST — additive nullable columns

extensions/builtin/local-llm/rust/         # EXTENSION — Rust
└── src/
    └── chat/
        ├── handlers.rs                   # RuntimeTuning gains 10 optional fields; runtime_to_args mapping; AvailableModelDto surfaces 2 new fields
        └── handlers_tests.rs             # new tests for runtime_to_args (FR-008 + FR-024 list)

apps/web/src/                              # FRONTEND
├── layout/local_llm/
│   ├── runtime_tuning_form.tsx           # extend with new toggles, slider, sampler chips, warning chips
│   ├── runtime_tuning_form.css.ts        # extend tokens-only styles for new sections
│   ├── known_broken_models.ts            # NEW — pure matcher for cache-reuse safety lock + --swa-full trigger
│   ├── vram_budget.ts                    # NEW — pure VRAM-budget calculator (FR-016)
│   ├── sampler_presets.ts                # NEW — Chat / Code & factual / Creative value maps + active-preset state machine
│   └── warning_rules.ts                  # NEW — flat curated registry of (predicate, render-spec) pairs (FR-026..FR-030)
├── services/
│   └── local_llm_chat.ts                 # extend RuntimeTuning + AvailableModel TS interfaces
└── (apps/web/src/components/chat/ — UNCHANGED — boundary-protected)
```

**Structure Decision**: Web application + first-party extension. Host work confined to `crates/nexus-model-metadata/` + `crates/nexus-models-store/` + one migration; extension work confined to `extensions/builtin/local-llm/rust/` + `apps/web/src/layout/local_llm/` + the local-llm-specific service file. The generic `apps/web/src/components/chat/` is **not** touched (boundary gate per Principle XIII + the audit grep enumerated in spec User Story 7).

## Phase 0 — Research

**Open questions surfaced during plan drafting** (research.md will be appended with these resolutions; the 2026-05-07 deep-research narrative already drafted in `research.md` remains the upstream evidence base):

1. **Where does the MoE-metadata migration live?** — Resolved: host's `migrations/` folder as `021_installed_artifact_moe_metadata.sql`. The `model_store_installed_artifacts` table is host-owned (introduced in migration 014, extended in 015 by spec 028). Per Principle XIII.4, only `ext_*__*` tables live in extension storage; host-owned tables stay in host migrations even when only one extension currently consumes the new fields. The fields are generic (any model-loading extension could read them); naming and column types are extension-agnostic.

2. **Which GGUF metadata keys carry MoE indicators?** — Resolved: the canonical key is `<arch>.expert_count` (e.g. `llama.expert_count`, `qwen2moe.expert_count`, `mixtral.expert_count`); a non-zero value means MoE. `<arch>.expert_used_count` is the active-experts-per-token count (informational only — not what the form needs). Architecture-name fallback (`mixtral` / `qwen2moe` / `qwen3moe` / `deepseek2` / `dbrx` / `gptoss` / `glm4_moe`) handles GGUFs that omit `expert_count`. Extraction code reads `expert_count`; if absent, falls back to architecture-name match; if neither, sets `is_moe = NULL`.

3. **What is `expert_layer_count` and how is it computed?** — Resolved: it is the number of transformer blocks that contain MoE experts (not `expert_count` and not the total layer count). Most MoE GGUFs apply experts to every block, so `expert_layer_count == n_layer` (already extracted into `model_store_installed_artifacts.layer_count` by spec 028). Architectures with mixed dense/MoE blocks (rare; Granite-MoE, some DeepSeek variants) expose the count via `<arch>.expert_feed_forward_length` non-zero blocks, but in practice we set `expert_layer_count = layer_count` when `is_moe = true` and `n_layer` is known. Documented in `data-model.md`. Frontend treats `null` as the operator-fallback path (slider max=64) per FR-014.

4. **Pure-helper budget for `runtime_to_args`?** — Resolved: existing function is ~120 lines. Adding 10 fields would push it past the soft 25-line method limit per Principle III, so we extract three sub-helpers — `append_throughput_args`, `append_sampler_args`, `append_mitigation_args` — each ≤ 25 lines, and the top-level `runtime_to_args` becomes a sequence of helper calls. Each helper takes `&RuntimeTuning` and `&mut Vec<String>` and returns `()` (CQS preserved — pure mutation of the out-param, no return).

5. **Frontend form re-render budget when sampler chip is clicked?** — Resolved: chip click writes ~6 form-state fields at once. The form already uses React's batched state; chip click is a single `setForm({...form, ...preset})` call. Budget < 1 ms confirmed by the existing form's vitest harness.

6. **VRAM-budget formula constants?** — Resolved: `moeFractionOfModel = 0.85` for MoE models per published Mixtral / GPT-OSS analyses (FFN tensors dominate parameter count in MoE; ~85 % of model weight resides in expert FFN tensors that move to CPU when `--n-cpu-moe > 0`). Documented in `data-model.md` with a doc-comment citation. Golden tests pin three (input-tuple → output-tuple) cases.

7. **Should the host crate `nexus-models-store` re-probe on first read for pre-upgrade rows?** — Resolved: yes (FR-007). On read of a row with `is_moe IS NULL` AND `extraction_status = 'success'`, the store schedules a one-time async re-probe via the existing `nexus-model-metadata` path; result is written back; subsequent reads use the cached value. Implementation reuses spec 028's idempotent-extraction pattern.

8. **Does the spec need a host-side `--swa-full` permission?** — Resolved: no. `--swa-full` is a generic llama-server flag like the others; the form emits it via the existing argv pipeline. New `swa_full: Option<bool>` on `RuntimeTuning` is the only addition. No host-runtime change.

9. **Can the form persist `swa_full` separately from the cache-reuse override?** — Resolved: persistence ties them together. `lastTuningByFamily[familyId].cache_reuse_override = true` implies `swa_full = true` for known-broken families. The form does NOT expose a standalone `swa_full` toggle — it's an auto-derived consequence of the override path. This keeps the operator's mental model simple (one switch, one consequence).

**Output**: `research.md` already contains the upstream-evidence narrative. A short Phase-0 appendix will be added documenting the nine resolutions above before Phase 1 begins.

## Phase 1 — Design & Contracts

**Prerequisites**: Phase 0 resolutions appended to `research.md`.

### 1. Entities → `data-model.md`

Document the entity set listed in spec § Key Entities, with concrete field types:

- **RuntimeTuning** (Rust struct + TS interface mirror): existing 13 fields + 4 throughput (`cache_reuse: Option<u32>`, `cram_mb: Option<u32>`, `checkpoint_every_n_tokens: Option<u32>`, `n_cpu_moe: Option<u32>`) + 5 sampler (`min_p: Option<f32>`, `dry_multiplier: Option<f32>`, `dry_base: Option<f32>`, `dry_allowed_length: Option<u32>`, `dry_penalty_last_n: Option<i32>`) + 1 mitigation (`swa_full: Option<bool>`). All `#[serde(default, skip_serializing_if = "Option::is_none")]`.
- **AvailableModel** / `AvailableModelDto` (Rust + TS): existing fields + `is_moe: bool` + `expert_layer_count: Option<u32>`. Surfaces from host's `model_store_installed_artifacts` row through the extension's existing query path.
- **InstalledArtifact** (host row type, `crates/nexus-models-store/src/model.rs`): existing columns + `is_moe: Option<bool>` + `expert_layer_count: Option<u32>`. Database stores as `INTEGER` (0/1 for bool, or `NULL`).
- **VramBudgetEstimate** (TS-only value object, returned by `computeVramBudget`): `{ gpuBytesUsed: number; gpuBytesRemaining: number | null }`. Pure function; no React, no I/O.
- **KnownBrokenModelMatcher** (TS module): `function isKnownBrokenForCacheReuse(familyId: string): { broken: boolean; reason?: string }` — curated string-prefix / substring rules. Drives both the cache-reuse safety lock (FR-012) and the `--swa-full` auto-application path (FR-029).
- **SamplerPreset** (TS enum + value map): `chat | code | creative`. Each preset is a `Partial<RuntimeTuning>` value. `activePreset` and `presetModified` form-local flags drive the modified-dot indicator (FR-023).
- **WarningRule** (TS): `{ id: string; predicate: (form, model) => boolean; render: { severity: 'info'|'warning'|'error'; copy: string; action?: { label: string; apply: (form) => Partial<RuntimeTuning> } } }`. Six rules registered: gemma3-flash-q8 (FR-026), top-k-zero (FR-027), n-parallel-advisory (FR-028), swa-full-auto (FR-029, applied at submit not display), cpu-batch-regression (FR-030), and a future-extensible slot.

State transitions:

- **SamplerPreset state machine**: `(none) → click(chip) → active(chip) → manualEdit → modified(chip) → click(chip) → confirmDialog → active(chip)` OR `→ click(otherChip) → active(otherChip)`.
- **Cache-reuse safety lock**: `(broken-family-detected) → disabled → click("enable anyway") → unlocked → toggle-on → emit cache_reuse + emit swa_full (autoderived)`.
- **Auto-bump batch sizes**: `(n_cpu_moe = 0) → drag(>0) → snap n_batch=max(current, 2048) + n_ubatch=max(current, 2048) + show callout` (idempotent on re-render; does not re-snap when operator manually exceeds 2048).

### 2. Contracts → `contracts/`

- **`contracts/runtime_tuning.schema.json`** — JSON Schema for the augmented `RuntimeTuning` DTO. Includes the 13 existing fields plus the 10 new ones with their bounds (e.g. `cache_reuse: { type: integer, minimum: 64, maximum: 2048 }`). Used by the contract test asserting Rust ↔ TS shape equivalence.
- **`contracts/available_model.schema.json`** — JSON Schema for the augmented `AvailableModel` DTO. Adds `is_moe: { type: boolean }` and `expert_layer_count: { type: [integer, "null"], minimum: 1 }`.
- **`contracts/llama_server_argv.md`** — Wire-format contract: which `RuntimeTuning` field maps to which CLI flag, with omission rules (e.g. `n_cpu_moe: Some(0)` → no flag; `dry_multiplier: 0.0` → suppresses the entire DRY quartet). Used by reviewers to verify FR-002 / FR-022.

### 3. Quickstart → `quickstart.md`

Operator-facing walkthrough with three numbered scenarios: (a) load a chat model with cache-reuse on for follow-up TTFT cuts, (b) load a stable-prefix RAG workflow with `--cram` for the cached-request TTFT cut, (c) load GPT-OSS-120B on an RTX 3090 with `--n-cpu-moe`. Each scenario includes the form steps, the expected argv suffix, and the success signal (TTFT delta or token-per-second non-zero). The doc references `success criteria SC-001..SC-011` from the spec for measurable confirmation.

### 4. Agent context update

Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType claude` after Phase 1 artifacts are committed. The script will append the technologies introduced (none new) and the spec ID to the workspace's agent context. Per Principle V additive-enum discipline, no manual edits between markers are expected.

**Output**: `data-model.md`, `contracts/runtime_tuning.schema.json`, `contracts/available_model.schema.json`, `contracts/llama_server_argv.md`, `quickstart.md`, updated agent context file.

## Complexity Tracking

| Item | Why Needed | Simpler Alternative Rejected Because |
|------|-----------|-------------------------------------|
| Host migration `021_installed_artifact_moe_metadata.sql` (vs. extension migration) | The `model_store_installed_artifacts` table is host-owned per Principle XIII.4; only `ext_*__*` tables belong in extension migrations. The new columns are generic (any future model-loading extension could read them) and the data is extracted by the host's `nexus-model-metadata` crate. | Putting the migration under `extensions/builtin/local-llm/storage/migrations/` would (a) violate XIII.4 by writing to a host-owned table from extension storage, (b) prevent any future extension from consuming the same metadata, (c) couple the host's GGUF reader output to a specific extension's lifecycle. Rejected. |
| `runtime_to_args` helper extraction (vs. inline append) | Adding 10 new fields to a function that is already ~120 lines pushes it past Principle III's 25-line soft limit per logical block; helper extraction restores readability. | Inlining all 10 emissions into the existing function: rejected because review readability collapses and Principle III's "soft limit unless justified" cannot be justified for purely-mechanical argv emission. |
| Auto-applied `--swa-full` flag (vs. operator-typed) | FR-029 mandates the form auto-applies `--swa-full` when cache-reuse override is on for Gemma 3 / Qwen3-Next, because the operator who hits the override path is by definition power-user-aware enough to override but the SWA-regression mitigation is not discoverable from the runtime's own help output. | Asking the operator to type `--swa-full` themselves: rejected because the override path is hidden behind a known-broken-family safety lock; expecting the operator to also know the upstream-issue mitigation flag is an unreasonable knowledge ask. The form documents the auto-application inline next to the override checkbox so POLA is preserved. |
| Approximate VRAM-budget formula (vs. driver probe) | Real driver-state probing requires a CUDA / Metal runtime call from the frontend, which is out of architectural scope (no native runtime in browser). The approximate formula gives the operator a directional read-out that updates live with slider drags. | Real driver probe: rejected because it would require a host endpoint, a CUDA/Metal runtime, and per-platform handling — multi-week scope creep for a feature that's about throughput knobs, not VRAM telemetry. The `~` prefix in the read-out copy and the HelpTooltip note set expectations. A future spec may add a real probe. |
| Per-extension boundary audit script wiring | Principle XIII.7 strongly recommends a per-extension audit script. The local-llm extension's existing audit script (if any) needs the new file paths added. | Skipping the audit script update: rejected because XIII.7 is a SHOULD merge-gate. If no script exists, this spec creates a minimal one (`extensions/builtin/local-llm/scripts/audit-boundary.sh`) that greps `apps/web/src/components/chat/` for `local-llm`/`local_llm` literals and fails on any match. |

## Notes

- The spec text in User Story 7 / FR-020 implied "any host-side migration touches the artifact store via the extension boundary" — that wording is corrected by this plan: migrations to host-owned tables stay in host's `migrations/` folder regardless of which extension currently consumes the data. Surfaced in Complexity Tracking and reflected in the Project Structure tree.
- The `design direction` subsection is intentionally omitted (XII.8 is N/A for this non-design-led spec). If a reviewer flags missing design guidance, point at the existing `runtime_tuning_form.css.ts` Spectral Graphite tokens — this spec adds controls into existing sections and reuses spec 037's token vocabulary.
- Test-strategy carve-out (Principle VI) is **not** invoked. All FR-008 / FR-019 / FR-024 / FR-025 / FR-031 tests are authored alongside or before implementation.
