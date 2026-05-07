# Feature Specification: llama.cpp Throughput Tier-1 Knobs

**Feature Branch**: `039-llamacpp-throughput-tier1`
**Created**: 2026-05-07
**Status**: Draft
**Input**: User description: Add three Tier-1 throughput knobs to the Local LLM ModelLoadDialog and RuntimeTuning surface based on the deep-research findings of 2026-05-07 — (1) "Reuse KV cache" toggle (`--cache-reuse`) for shared-prefix re-use across multi-turn chat and RAG, (2) "Persist prompt cache to RAM" toggle (`--cram` + `--checkpoint-every-n-tokens`) for up to 93 % TTFT reduction on cached requests, (3) MoE offload slider (`--n-cpu-moe`) gated on detected MoE models with VRAM-budget read-out and auto-bump of `n_batch`/`n_ubatch`. Backend extends `RuntimeTuning` (Rust) with four optional fields and adds `is_moe` + `expert_layer_count` to the AvailableModel DTO via GGUF metadata extraction at install time. Frontend adds the controls to `runtime_tuning_form.tsx` with help tooltips and a VRAM-budget calculation helper. Boundary discipline: backend stays in `extensions/builtin/local-llm/`; frontend stays in `apps/web/src/layout/local_llm/`; the generic `apps/web/src/components/chat/` is not touched.

## Overview

Specs 028, 030, 037 and 038 built out the Local LLM chat surface and the Spectral-Graphite ModelLoadDialog. The current `RuntimeTuningForm` exposes 13 llama.cpp knobs (n_gpu_layers, threads, flash_attn, ctx_size, KV-cache quant, mmap, mlock, n_batch, n_ubatch, n_parallel, cont_batching, seed) — these match the per-load inputs LM Studio shows operators today.

A 2026-05-07 research pass against current `llama-server` documentation, recent GitHub issues, and 2025-2026 community benchmarks identified three Tier-1 knobs **missing** from the form whose absence costs the operator real throughput:

1. **`--cache-reuse N`** — reuses KV state for shared prefixes via KV-shifting. With chat-style multi-turn or RAG-style stable system prompts, this skips the dominant cost of inference (prefill is ~95 % of RAG inference time per Wang et al. 2026). Off in current builds; the operator has no way to turn it on.
2. **`--cram MB` + `--checkpoint-every-n-tokens N`** — host-memory prompt caching. Persists prefilled state into RAM and reuses it across requests, reporting up to ~93 % TTFT (time-to-first-token) reduction on cached requests in the upstream llama.cpp benchmarks.
3. **`--n-cpu-moe N`** — MoE-aware offload. Pushes the expert FFN tensors to CPU RAM while keeping attention on GPU. The 2025 release that finally made GPT-OSS-120B and Qwen3-235B usable on consumer GPUs (RTX 3090 / 4090). It has a non-obvious correctness footgun: when `--n-cpu-moe > 0`, the server's `GGML_OP_OFFLOAD_MIN_BATCH` default (32) prevents GPU prefill from triggering; operators who don't also bump `--batch-size` and `--ubatch-size` to ≥ 2048 see prefill collapse to slow CPU rates. The form must auto-handle this.

The existing form does not surface these. This spec adds them with operator-friendly defaults, model-aware gating (Gemma 3 cache-reuse breakage; MoE detection from GGUF metadata), and a VRAM-budget read-out so the MoE slider has visible feedback.

The `RuntimeTuning` Rust struct and its TypeScript mirror gain four optional fields. The `AvailableModel` DTO gains two MoE-detection fields populated at install-time GGUF metadata extraction; the existing `installed_artifacts` table is extended via additive migration. The generic `ChatSurface` and the chat bubble are not touched — this spec is confined to the LLM extension's tree and the LLM-specific layout folder under `apps/web/src/layout/local_llm/`.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Reuse KV cache across chat turns (Priority: P1)

An operator has loaded a small chat-tuned model. They send three turns to the same thread. Without intervention the runtime re-prefills the (stable) system prompt + recent history every turn. The operator opens the model load dialog, flips on **Reuse KV cache**, picks a min-chunk size (default 256), and re-loads the model. From that point forward, prefill on each subsequent turn skips the shared prefix; perceived time-to-first-token on follow-up turns drops materially. If the active model is on the known-broken list (Gemma 3 family, Qwen3-Next SWA hybrid), the toggle is disabled with an inline note explaining why, and the operator may opt-in via an "I know what I'm doing — enable anyway" override.

**Why this priority**: prefill is the dominant cost for chat. The knob already exists in `llama-server`; it is silently off because nothing in our UI surfaces it. P1 because it is a one-click win that meaningfully shortens every subsequent turn.

**Independent Test**: With a non-Gemma chat model loaded and **Reuse KV cache** off, the operator measures TTFT on three sequential turns (a fresh thread, then two follow-ups). The second and third TTFT are similar to the first (no reuse). They re-load with the toggle on (chunk 256) and repeat. The second and third TTFT drop noticeably; the first turn is unchanged. The toggle's persisted state survives a thread switch and a page reload. With a Gemma 3 model loaded the toggle is disabled by default, and the warning copy is visible.

**Acceptance Scenarios**:

1. **Given** the load dialog is open with a chat model that is NOT on the broken list, **When** the operator flips **Reuse KV cache** on, **Then** a "Min chunk" numeric input appears next to the toggle (default `256`, range `64..2048`), and the form's emitted `RuntimeTuning` payload contains `cache_reuse: 256`.
2. **Given** the toggle is on with a custom min-chunk value, **When** the operator clicks Load, **Then** the spawned `llama-server` invocation includes `--cache-reuse 256` in its argv.
3. **Given** the active model's `family_id` matches a known-broken pattern (e.g. starts with `gemma-3-` or includes `qwen3-next`), **When** the load dialog renders, **Then** the toggle is disabled by default, an inline warning chip explains the regression, and an "enable anyway" affordance is present that, once clicked, unlocks the toggle and persists the override on the form's local state.
4. **Given** the toggle is off, **When** the operator clicks Load, **Then** `--cache-reuse` does NOT appear in the spawned argv (and the existing default of 0 / off applies).

---

### User Story 2 — Persist prompt cache to RAM for RAG workloads (Priority: P1)

An operator runs a RAG-style workload — every request shares a long system prompt, then differs in the user question. Without prompt caching the runtime re-prefills the entire shared prefix on every request. The operator opens the load dialog, expands the **Performance / Advanced** section, flips on **Persist prompt cache to RAM**, accepts the defaults (1 GB cache, 8 192-token checkpoint), and re-loads. From that point the second and subsequent same-prefix requests skip the prefill almost entirely; TTFT drops sharply.

**Why this priority**: ~95 % of RAG inference time is prefill. Host-memory prompt caching is the single largest TTFT win available short of switching engines. P1 because the upstream feature is stable and the operator has no way to turn it on today.

**Independent Test**: With the toggle off, the operator runs five requests that share a long stable prefix; the TTFT for each request is roughly equal (no caching). They re-load with the toggle on (defaults), repeat, and observe that the first request's TTFT is similar to before, but the next four drop sharply (the ~93 % TTFT reduction the upstream benchmarks report). The two numeric controls (cache size in MB, checkpoint interval in tokens) are within the **Performance / Advanced** collapsible details, never inside the **Memory** section.

**Acceptance Scenarios**:

1. **Given** the load dialog is open and the **Performance / Advanced** details element is expanded, **When** the operator toggles **Persist prompt cache to RAM** on, **Then** two numeric inputs appear inline below the toggle: "Cache size" (MB, default `1024`, range `256..32768`) and "Checkpoint every" (tokens, default `8192`, range `1024..65536`). When the toggle is off, neither input is rendered.
2. **Given** the toggle is on with the defaults, **When** the operator clicks Load, **Then** the spawned `llama-server` argv contains `--cram 1024` and `--checkpoint-every-n-tokens 8192`.
3. **Given** the toggle is on with custom values (e.g. `4096` MB and `16384` tokens), **When** the operator clicks Load, **Then** the argv reflects the custom values exactly.
4. **Given** the toggle is off, **When** the operator clicks Load, **Then** neither `--cram` nor `--checkpoint-every-n-tokens` appears in the argv.
5. **Given** the toggle is on, **When** the operator opens the form again later for the same family/variant, **Then** the persisted last-tuning storage replays the toggle as on with the same values (so the operator does not have to opt back in every time).

---

### User Story 3 — MoE offload for large MoE models on consumer GPUs (Priority: P1)

An operator wants to run GPT-OSS-120B or Qwen3-235B-A22B on a single consumer GPU (e.g. RTX 3090 / 4090). The model does not fit in VRAM with full GPU offload. They open the load dialog and the form detects (from the model's GGUF metadata) that it is an MoE model. A **MoE offload** slider appears in the form, ranged from `0` to the model's expert-layer count. Next to the slider, a live read-out shows estimated VRAM use vs available headroom. As the operator drags the slider up, expert FFN layers move from GPU to CPU RAM; the read-out shrinks. To prevent the well-known PP collapse caused by `GGML_OP_OFFLOAD_MIN_BATCH=32` interacting with `--n-cpu-moe > 0`, the form auto-bumps `n_batch` and `n_ubatch` to at least `2048` whenever the slider is above `0`, with a visible inline note explaining the auto-adjustment.

**Why this priority**: this is the only practical way to run 100B+ MoE models on consumer hardware today. Without auto-bumped batch sizes the prefill silently collapses to slow CPU rates and operators blame us. P1 because the failure mode is non-obvious; the form must hide that footgun.

**Independent Test**: Load a non-MoE model (e.g. Llama 8B). The form does NOT show the MoE offload slider. Load a known MoE GGUF (Mixtral 8x7B fixture or a real GPT-OSS-120B). The slider appears with a default of `0` and an upper bound matching the model's expert-layer count. Drag the slider to `28`. The VRAM-budget read-out updates to reflect the lower estimated GPU usage. The form's `n_batch` and `n_ubatch` snap to `2048` (or the operator's higher value, whichever is greater) with a visible note. Clicking Load yields an argv that includes `--n-cpu-moe 28 --batch-size 2048 --ubatch-size 2048`.

**Acceptance Scenarios**:

1. **Given** the active model's `is_moe` is `false`, **When** the load dialog renders, **Then** the **MoE offload** slider is NOT rendered anywhere in the form.
2. **Given** the active model's `is_moe` is `true` and `expert_layer_count` is known (e.g. `40`), **When** the load dialog renders, **Then** the slider appears with `min=0`, `max=40`, default `0`, with HelpTooltip copy explaining what the knob does and recommending typical values for common GPUs.
3. **Given** `is_moe` is true but `expert_layer_count` is missing/null, **When** the load dialog renders, **Then** the slider falls back to `max=64` and shows a small "exact layer count unknown" note (mirroring the existing GPU offload fallback pattern).
4. **Given** the slider is at `0`, **When** the operator clicks Load, **Then** `--n-cpu-moe` does NOT appear in the argv, and `n_batch`/`n_ubatch` are NOT auto-bumped.
5. **Given** the operator drags the slider to any value `> 0`, **When** the form re-renders, **Then** `n_batch` snaps to `max(current_n_batch, 2048)`, `n_ubatch` snaps to `max(current_n_ubatch, 2048)`, and a visible "auto-adjusted for MoE offload" note appears next to the two batch-size controls.
6. **Given** the slider is at `28`, **When** the operator clicks Load, **Then** the argv contains exactly `--n-cpu-moe 28`, `--batch-size 2048` (or higher if the operator manually set higher), and `--ubatch-size 2048` (same rule).
7. **Given** the slider is at `12` and the model is `13.5 GB` and `n_gpu_layers` is at its current value, **When** the operator hovers the slider, **Then** the VRAM-budget read-out shows estimated GPU bytes used vs estimated total GPU bytes available (when host VRAM is known) — formatted as "~ 18.4 GB / 24 GB GPU used" — and updates live as the slider drags.
8. **Given** the operator persists a tuning with `n_cpu_moe = 28`, **When** they re-open the form for the same model, **Then** the slider replays at `28` and the auto-bumped batch sizes are also persisted (no surprise reset).

---

### User Story 4 — GGUF metadata extraction at install time (Priority: P1)

When a model is installed to the host's artifact store, the install pipeline reads the GGUF header and extracts at minimum: `is_moe` (boolean) and `expert_layer_count` (optional u32 — null when the GGUF doesn't expose it). These are stored in the existing `installed_artifacts` table via additive schema migration. They flow through `list_available_models` into the `AvailableModel` DTO, then into the frontend, then into the form's gating logic.

**Why this priority**: Story 3 is dead without this. The form cannot gate the MoE slider without knowing whether the model is MoE; the operator cannot be expected to tag this manually.

**Independent Test**: Install a known MoE GGUF (Mixtral 8x7B, GPT-OSS-120B, or a small Qwen3-MoE) and a known dense GGUF (Llama-8B, Mistral-7B). After install, query `GET /api/v1/extensions/nexus.local-llm/chat/available_models`. The MoE rows have `is_moe: true` and `expert_layer_count: <integer>` (or `null` if the metadata didn't expose it). The dense rows have `is_moe: false` and `expert_layer_count: null`. The frontend's TS interface mirrors the same fields.

**Acceptance Scenarios**:

1. **Given** an MoE GGUF is being installed, **When** the install pipeline reads the GGUF header, **Then** the `installed_artifacts` row has `is_moe = 1` (or `true`) and `expert_layer_count` populated from the GGUF metadata key (or `NULL` if unreadable).
2. **Given** a dense (non-MoE) GGUF is installed, **When** the install pipeline reads the GGUF header, **Then** the row has `is_moe = 0` and `expert_layer_count` = `NULL`.
3. **Given** an existing artifact installed before this change, **When** the host first reads it after upgrade, **Then** an idempotent re-probe extracts the missing `is_moe` / `expert_layer_count` values and writes them; subsequent reads use the cached values.
4. **Given** the `list_available_models` response shape, **When** consumed by the frontend, **Then** the TS `AvailableModel` interface contains `is_moe: boolean` and `expert_layer_count: number | null`, and the form uses them for gating.

---

### User Story 5 — Sampler-quality additions (DRY + min-p + profile presets) (Priority: P2)

The Tier-1 throughput knobs are about throughput. The deep-research report identified three sampler additions that bring **real quality benefit at near-zero throughput cost** and that the existing form does not expose. The user explicitly accepted these as in-scope under a "real benefit only" filter:

1. **DRY (Don't Repeat Yourself)** — exponential repetition penalty that penalizes only actual repeating sequences, not natural recurrence (a character's name, a code identifier). Strictly better than the classic `--repeat-penalty` for long-context chat. Recommended community defaults: `multiplier=0.8`, `base=1.75`, `allowed-length=2`.
2. **min-p** — modern replacement for top-p. Most 2025 sampler guides recommend it as the primary nucleus filter for both creative and factual workloads. Tiny code addition; the form already exposes top-p, so adding min-p alongside is incremental.
3. **Profile presets** — pre-filled sampler combinations the operator can pick instead of dialling each knob individually. Three presets: **Chat (default)**, **Code / factual** (tight top-k 40, low temperature, no XTC, min-p 0.1), **Creative** (DRY on, min-p 0.02, higher temperature). Switching presets writes to the same form state — operators can fine-tune from a preset, not start blank.

**Why this priority**: P2 because the spec's primary goal is throughput, not output quality. These additions are explicitly framed as "while we're here, this is cheap and good." XTC, top-nσ, dynatemp, mirostat, logit-bias, and the rest of the modern sampler family are NOT in scope (they are subjective, niche, or model-specific — see Out of Scope).

**Independent Test**: Operator opens the dialog with no model loaded. They click the "Creative" preset chip → the form's local state updates to show DRY enabled, min-p 0.02, temperature 1.0 (or current default), repeat-penalty disabled. They click "Code / factual" → DRY off, top-k clamped to 40, min-p 0.1, temperature 0.2. They click "Chat" → defaults restored. Manually fine-tuning any knob does NOT clear the active preset chip but DOES mark it as "modified" with a small dot indicator.

**Acceptance Scenarios**:

1. **Given** the load dialog is open with the Performance / Advanced section expanded, **When** the operator scrolls to a new "Sampler quality" group, **Then** the group renders three preset chips (Chat / Code & factual / Creative) plus per-knob controls below.
2. **Given** the operator clicks the "Creative" chip, **When** the form re-renders, **Then** DRY is on with `multiplier=0.8 / base=1.75 / allowed-length=2`, `min-p=0.02`, `top-k=40`, `temperature=1.0`. Other knobs not in the Creative preset's scope are unchanged.
3. **Given** the operator clicks the "Code & factual" chip, **When** the form re-renders, **Then** DRY is off, `min-p=0.10`, `top-k=40`, `temperature=0.2`.
4. **Given** the operator picked the Creative preset and then manually drags `temperature` to `0.5`, **When** the form re-renders, **Then** the Creative chip remains highlighted but a "modified" dot indicator appears next to it; clicking the chip re-applies the preset (resetting the manual change after a confirmation).
5. **Given** DRY is enabled with the defaults, **When** the operator clicks Load, **Then** the spawned `llama-server` argv contains `--dry-multiplier 0.8 --dry-base 1.75 --dry-allowed-length 2`.
6. **Given** `min-p > 0`, **When** the operator clicks Load, **Then** the argv contains `--min-p {value}`. The existing top-p controls remain functional and orthogonal.

---

### User Story 6 — Counter-intuitive pitfalls surface as inline warnings (Priority: P1)

The deep-research report identified seven counter-intuitive pitfalls in the llama.cpp 2025-2026 release. Most of them are silent: the operator picks a setting that LOOKS correct, the runtime accepts it, and throughput silently collapses or quality silently degrades. The form must surface these as **inline warnings (or guardrails) at the moment of input**, not as docstrings the operator never reads.

**Why this priority**: P1 because the cost of a silent regression is operator trust. If a user enables `flash-attn` + `cache_type_k=q8_0` on a Gemma 3 model and watches GPU utilization drop to 20-30%, they blame us, not Gemma's flash-attn implementation.

**Independent Test**: For each of the six in-scope pitfalls (one — containerized Metal — is environmental and out of scope), trip the trigger condition and verify the warning surfaces. Specifically:

1. Load a Gemma 3 model, set `flash_attn=true` + `cache_type_k=q8_0` → form shows an amber warning chip and offers a one-click "Force fp16 KV" override.
2. Drag `top_k` to `0` → form clamps to 40 with an info note explaining the slowdown.
3. Set `n_parallel=2` with no other concurrent users → form shows a yellow note "Slots reserve KV memory; not real concurrent batching for single-user chat."
4. With Gemma 3 / Qwen3-Next loaded, override the cache-reuse safety lock → form auto-applies `--swa-full` to the spawned argv (or warns if that flag isn't yet exposed at the runtime level).
5. Set `n_gpu_layers=0` and `n_batch=2048` → form shows a yellow note "CPU-only workloads regress above batch size 1024 (issue #6075)."

**Acceptance Scenarios**:

1. **Given** the active model's `family_id` matches `gemma-3-*`, **When** the operator sets `flash_attn=true` AND `cache_type_k=q8_0` (or `cache_type_v=q8_0`), **Then** the form renders an amber warning chip near the KV cache controls reading `Flash Attention + Q8 KV is known to collapse Gemma 3 GPU utilization. Recommend FP16 KV.` with a "Force FP16 KV" button that flips both KV types back to `fp16`.
2. **Given** the operator drags the `top_k` slider toward 0, **When** the value reaches 0 or below, **Then** the form clamps the value to 40 and shows a transient info chip `top_k=0 disables filtering and causes a measured ~2-5× slowdown (llama.cpp #15223). Clamped to 40.`
3. **Given** the operator sets `n_parallel > 1`, **When** the form re-renders, **Then** an info chip appears next to the slot count: `Each slot reserves a full KV cache (≈ ctx_size × KV bytes). n_parallel > 1 is for multi-user serving — not real concurrent batching for single-user chat.`
4. **Given** the active model is Gemma 3 OR Qwen3-Next AND the operator has overridden the cache-reuse lock to enable `--cache-reuse`, **When** the operator clicks Load, **Then** the spawned argv ALSO includes `--swa-full` to mitigate the SWA regression. A small note in the form documents this auto-application.
5. **Given** `n_gpu_layers === 0` AND `n_batch > 1024`, **When** the form re-renders, **Then** an amber chip appears below the batch controls: `CPU-only workloads regress above batch size 1024 (llama.cpp #6075). Lower n_batch unless you have profiled otherwise.`
6. **Given** the operator dismisses any warning chip, **When** the form re-renders later for the same trigger condition, **Then** the chip re-appears (warnings are not permanently dismissable — the trigger is the source of truth, not the operator's mood).

---

### User Story 7 — Boundary discipline + auditability (Priority: P2)

A reviewer audits the change. They confirm by grep that:

- All extension-specific Rust changes live under `extensions/builtin/local-llm/`. The two host crates whose generic surfaces are extended — `crates/nexus-model-metadata/` (GGUF MoE indicators) and `crates/nexus-models-store/` (`InstalledArtifact` row + DTO surface) — and host migration `migrations/021_installed_artifact_moe_metadata.sql` are intentional generic-data extensions (the `model_store_installed_artifacts` table is host-owned per migrations 014/015 from spec 028; the new columns serve any future model-loading extension). Per Principle XIII.4, these host crates and the migration MUST remain free of extension-id literals (`local-llm`, `nexus.local-llm`).
- All frontend changes live under `apps/web/src/layout/local_llm/` and the extension's `services/local_llm_chat.ts` interface mirror. The generic `apps/web/src/components/chat/` directory is unmodified.
- No raw hex / rgba CSS values are introduced; the new tooltip and warning chips use existing `vars.*` design tokens with `color-mix(in oklch, ...)` for transparency.
- No inline `//` code comments are added in new code; no AI-attribution markers anywhere.

**Why this priority**: P2 because it does not affect runtime behaviour but is a hard constraint for merge into `main`. The host ↔ extension boundary rule is non-negotiable.

**Independent Test**: After implementation, run:

- `git diff main..HEAD --stat | grep -v '^extensions/builtin/local-llm\|^apps/web/src/layout/local_llm\|^apps/web/src/services/local_llm_chat\|^crates/nexus-model-metadata\|^crates/nexus-models-store\|^migrations/021\|^specs/039\|^docs/'` — must be empty (no out-of-scope files touched). The host-crate and migration paths are explicitly permitted because the new columns + DTO fields are generic; their boundary discipline is enforced by the next bullet.
- `grep -rn 'local-llm\|local_llm\|nexus.local-llm' crates/nexus-model-metadata/ crates/nexus-models-store/ migrations/021_installed_artifact_moe_metadata.sql` — must remain empty (Principle XIII.1: host-side surfaces stay generic).
- `grep -rn 'local-llm\|local_llm' apps/web/src/components/chat/` — must remain empty.
- `grep -rnE 'rgba\(|#[0-9a-fA-F]{3,8}\b' apps/web/src/layout/local_llm/runtime_tuning_form.css.ts` — every match must be inside a `color-mix(...)` or `linear-gradient(...)` / `radial-gradient(...)` string.

---

## Functional Requirements

### Backend (Rust)

Most backend work lives inside `extensions/builtin/local-llm/` (RuntimeTuning struct, `runtime_to_args` mapping, AvailableModelDto). The GGUF-metadata fields described in FR-004 / FR-005 / FR-006 / FR-007 land in the host crates `crates/nexus-model-metadata/` (extraction) and `crates/nexus-models-store/` (`InstalledArtifact` row + storage I/O) plus a new host migration `migrations/021_installed_artifact_moe_metadata.sql`, because the `model_store_installed_artifacts` table is host-owned (migrations 014/015 from spec 028) and the new columns are generic enough to serve any future model-loading extension. Both host crates remain free of extension-id literals per Principle XIII.1.

- **FR-001 — RuntimeTuning struct fields.** The `RuntimeTuning` struct gains four optional fields, all `serde(default)` and serde-skipped when `None`:
  - `cache_reuse: Option<u32>`
  - `cram_mb: Option<u32>`
  - `checkpoint_every_n_tokens: Option<u32>`
  - `n_cpu_moe: Option<u32>`
- **FR-002 — runtime_to_args mapping.**
  - `cache_reuse: Some(n)` → `--cache-reuse {n}`. `None` → no flag.
  - `cram_mb: Some(n)` → `--cram {n}`. `None` → no flag.
  - `checkpoint_every_n_tokens: Some(n)` → `--checkpoint-every-n-tokens {n}`. `None` → no flag.
  - `n_cpu_moe: Some(n)` and `n > 0` → `--n-cpu-moe {n}`. `None` or `Some(0)` → no flag.
  - The four flags are independent — any subset may be present in a single request.
- **FR-003 — sensible_defaults unchanged.** The existing `sensible_defaults(layer_count, has_cuda)` does NOT populate the four new fields by default. Operators opt in via the form; defaults remain the upstream `llama-server` defaults.
- **FR-004 — installed_artifacts schema migration.** A new additive migration adds two nullable columns to the existing `installed_artifacts` table: `is_moe INTEGER` (boolean stored as 0/1, default `NULL`) and `expert_layer_count INTEGER` (default `NULL`). Migration ID and filename follow the extension's existing migration sequence.
- **FR-005 — GGUF metadata extraction at install.** When an artifact is installed (or, on host upgrade, on first read of an existing artifact), the GGUF header is read and `is_moe` + `expert_layer_count` are written to the row. Detection looks for the standard GGUF MoE indicators (e.g. `*.expert_count`, `*.expert_used_count`, or architecture-specific MoE tensor names). If metadata is missing or unreadable, both columns remain `NULL` and the operator sees the fallback path on the frontend.
- **FR-006 — AvailableModel DTO.** The `AvailableModel` DTO returned by `list_available_models` (and any peer endpoints that surface installed artifacts) gains two fields: `is_moe: bool` and `expert_layer_count: Option<u32>`. JSON shape mirrors snake_case.
- **FR-007 — Idempotent re-probe.** Reading an artifact whose `is_moe` is `NULL` triggers a one-time re-probe that fills both columns. Subsequent reads use the cached value without re-opening the GGUF.
- **FR-008 — Tests required (Rust).**
  - `runtime_to_args_emits_cache_reuse_when_set` and the negative `_omits_when_none`.
  - Same shape for `--cram`, `--checkpoint-every-n-tokens`, and `--n-cpu-moe`.
  - `runtime_to_args_omits_n_cpu_moe_when_zero` (treats `Some(0)` as off).
  - `gguf_extract_marks_mixtral_fixture_as_moe` — fixture-driven test using a small Mixtral-shaped GGUF that asserts `is_moe = true` and `expert_layer_count` is populated.
  - `gguf_extract_marks_dense_fixture_as_not_moe` — same shape with a dense GGUF.
  - `installed_artifacts_migration_is_additive_and_reversible` — migration round-trip test against an in-memory SQLite.

### Frontend (TypeScript, inside `apps/web/src/layout/local_llm/`)

- **FR-010 — RuntimeTuning TS interface mirror.** The TS interface in `apps/web/src/services/local_llm_chat.ts` adds the same four optional fields as FR-001 with the same names and types. Pre-existing `audit-allow: boundary` annotations remain unchanged.
- **FR-011 — AvailableModel TS interface.** Adds `is_moe: boolean` and `expert_layer_count: number | null`.
- **FR-012 — Cache-reuse toggle UI.** Inside the **Memory** section of `runtime_tuning_form.tsx`, a new toggle "Reuse KV cache" appears with a HelpTooltip. When on, a numeric input "Min chunk" appears inline (default `256`, min `64`, max `2048`). When the active model matches a known-broken pattern (Gemma 3 family, Qwen3-Next SWA hybrid), the toggle is disabled by default with an inline amber warning chip and an "enable anyway" override that, when clicked, unlocks the toggle.
- **FR-013 — Persist-prompt-cache toggle UI.** Inside the **Performance / Advanced** collapsible details element, a new toggle "Persist prompt cache to RAM" appears with a HelpTooltip. When on, two numeric inputs render inline: "Cache size" (MB, default `1024`, min `256`, max `32768`) and "Checkpoint every" (tokens, default `8192`, min `1024`, max `65536`).
- **FR-014 — MoE offload slider UI.** Gated on `model.is_moe === true`. Renders inside the **Performance / Advanced** section. Slider min `0`, max `model.expert_layer_count ?? 64` (with a small "exact layer count unknown" note when the fallback is in effect). Default `0`. HelpTooltip copy explains the knob and recommends typical values per common GPU classes (e.g. "RTX 3090: try 28 for 100B MoE; RTX 4090: try 16; full GPU offload only feasible on 48 GB+").
- **FR-015 — VRAM budget read-out.** Adjacent to the MoE slider, a read-only chip shows a live estimate in the form "~ X.X GB / Y GB GPU used" when host VRAM is known, or "~ X.X GB GPU used" when not. Hovering the slider updates the read-out live. The estimate uses a pure helper described in FR-016.
- **FR-016 — VRAM budget calculation helper.** A pure TS function (no React, no I/O):
  - Inputs: `modelSizeBytes`, `nGpuLayers`, `totalLayers` (from metadata or fallback), `nCpuMoe`, `expertLayerCount`, `hostVramBytes` (optional).
  - Outputs: `{ gpuBytesUsed: number, gpuBytesRemaining: number | null }`.
  - Approximation: `gpuBytesUsed ≈ modelSizeBytes × (nGpuLayers / totalLayers) × (1 − (nCpuMoe / max(1, expertLayerCount)) × moeFractionOfModel)` where `moeFractionOfModel` is a constant rough estimate (start at `0.85` for MoE models per published Mixtral/GPT-OSS analyses; document the assumption inline). Returns `gpuBytesRemaining = hostVramBytes - gpuBytesUsed` when `hostVramBytes` is known, else `null`.
  - The formula is APPROXIMATE — the read-out copy includes a `~` to reflect this. Golden tests pin the formula's outputs at known fixture inputs.
- **FR-017 — Auto-bump n_batch / n_ubatch when MoE offload > 0.** When the form's `n_cpu_moe > 0`, the form's local state is updated such that `n_batch ← max(n_batch, 2048)` and `n_ubatch ← max(n_ubatch, 2048)`. A visible inline "Bumped to 2048 for MoE offload" callout appears next to the two batch controls; the callout disappears when the operator's manual values already exceed 2048 or when MoE offload is back at 0. Auto-bump fires when the slider crosses the 0-to-positive transition; sliding within the positive range does NOT re-snap operator-overridden higher values back down.
- **FR-018 — Form persistence.** The new fields are persisted in the existing `lastTuningByFamily` localStorage shape (already keyed by family_id). On re-opening the dialog for the same family, the toggles, slider, and numeric inputs replay at their last-used values.
- **FR-019 — Tests required (frontend).**
  - `cache_reuse_toggle_emits_correct_runtime_tuning_shape`
  - `cache_reuse_toggle_disabled_for_gemma_3_with_override_chip_visible`
  - `cache_reuse_toggle_unlocks_after_unsafe_override`
  - `prompt_cache_toggle_lives_in_advanced_section_not_memory`
  - `prompt_cache_toggle_emits_cram_and_checkpoint_fields`
  - `moe_slider_hidden_when_model_is_not_moe`
  - `moe_slider_renders_with_expert_layer_count_max`
  - `moe_slider_falls_back_to_64_when_count_unknown`
  - `vram_budget_helper_golden_inputs` — table-driven coverage of representative `(modelSize, nGpuLayers, totalLayers, nCpuMoe, expertLayerCount, hostVram)` tuples.
  - `auto_bump_fires_when_n_cpu_moe_crosses_zero`
  - `auto_bump_does_not_lower_operator_overridden_higher_values`
  - `form_persistence_replays_new_fields_on_reopen`

### Sampler-quality (DRY + min-p + presets)

- **FR-021 — RuntimeTuning sampler fields (Rust + TS mirror).** The `RuntimeTuning` struct gains five additional optional fields, all `serde(default)`:
  - `min_p: Option<f32>`
  - `dry_multiplier: Option<f32>`
  - `dry_base: Option<f32>`
  - `dry_allowed_length: Option<u32>`
  - `dry_penalty_last_n: Option<i32>` (negative or `-1` means "use ctx_size")
- **FR-022 — runtime_to_args mapping for samplers.**
  - `min_p: Some(p)` and `p > 0.0` → `--min-p {p}`. `None` or `Some(0.0)` → no flag.
  - DRY fields emit `--dry-multiplier`, `--dry-base`, `--dry-allowed-length`, `--dry-penalty-last-n` only when present. `dry_multiplier = 0.0` is treated as off and suppresses ALL DRY flags (matching upstream semantics).
- **FR-023 — Profile preset chips (frontend only).** A new "Sampler quality" group inside the form's Performance / Advanced section renders three chips: **Chat (default)**, **Code & factual**, **Creative**. Clicking a chip writes the chip's preset values into the form's local state. The chip presets are:
  - **Chat (default)**: no DRY, no min-p, top-k 40, temperature unchanged.
  - **Code & factual**: no DRY, `min_p = 0.10`, `top_k = 40`, `temperature = 0.2` (or current default if lower), `repeat_penalty` cleared.
  - **Creative**: `dry_multiplier = 0.8`, `dry_base = 1.75`, `dry_allowed_length = 2`, `min_p = 0.02`, `top_k = 40`, `temperature = 1.0` (or current default if higher).
  Selecting a chip sets a local `activePreset` flag; manual edits to any of the preset's fields mark the chip with a "modified" dot. Clicking a chip while modified prompts a confirmation; clicking confirm re-applies the preset clean.
- **FR-024 — Tests required (Rust).**
  - `runtime_to_args_emits_min_p_when_positive` and `_omits_when_zero_or_none`.
  - `runtime_to_args_emits_dry_quartet_when_multiplier_positive`.
  - `runtime_to_args_omits_all_dry_flags_when_multiplier_zero`.
- **FR-025 — Tests required (frontend).**
  - `creative_preset_chip_writes_dry_multiplier_and_min_p`.
  - `code_preset_chip_clamps_top_k_to_40_and_drops_dry`.
  - `chat_preset_chip_resets_to_defaults`.
  - `manual_edit_marks_preset_as_modified`.
  - `re_clicking_modified_preset_prompts_for_confirmation`.

### Counter-intuitive pitfall warnings

- **FR-026 — Gemma 3 + flash_attn + KV-q8_0 incompatibility (frontend).** When the active model's `family_id` matches `gemma-3-*` AND `flash_attn === true` AND (`cache_type_k === "q8_0"` OR `cache_type_v === "q8_0"`), the form renders an amber warning chip near the KV cache controls with copy: `Flash Attention + Q8 KV is known to collapse Gemma 3 GPU utilization (drops to 20-30%). Recommend FP16 KV.` plus a "Force FP16 KV" button that sets both `cache_type_k` and `cache_type_v` to `fp16`. Warning is NOT permanently dismissable.
- **FR-027 — `top_k = 0` clamp + slowdown warning (frontend).** The `top_k` numeric input clamps its minimum to `40` (not the historical `0`). If the operator types `0` or a negative value, the form snaps to `40` and surfaces a transient info chip: `top_k=0 disables filtering and causes a measured ~2-5× slowdown (llama.cpp #15223). Clamped to 40.` Manual override below 40 requires an explicit "I know what I'm doing" toggle (off by default).
- **FR-028 — `n_parallel > 1` advisory (frontend).** When `n_parallel > 1`, the form renders a yellow info chip next to the slot input: `Each slot reserves a full KV cache (≈ ctx_size × KV bytes per slot). n_parallel > 1 is for multi-user serving — not real concurrent batching for single-user chat.` This is informational, not a block.
- **FR-029 — `--swa-full` auto-applied when cache-reuse override is on for Gemma / Qwen3-Next.** When the operator enables `cache_reuse` via the unsafe-override path on a known-broken model (Gemma 3 or Qwen3-Next), the spawned argv ALSO includes `--swa-full`. The form documents this with a small inline note next to the override checkbox: `--swa-full will be added automatically to mitigate the SWA regression on this model family.`
  - Backend: extend `RuntimeTuning` with `swa_full: Option<bool>`. The form sets it to `Some(true)` when the override path is taken; `runtime_to_args` emits `--swa-full` when `swa_full == Some(true)`.
- **FR-030 — CPU-only batch-size regression warning (frontend).** When `n_gpu_layers === 0` AND `n_batch > 1024`, the form renders an amber chip below the batch controls: `CPU-only workloads regress above batch size 1024 (llama.cpp #6075). Lower n_batch unless you have profiled otherwise.` Informational; does not auto-clamp (operator may have a profiled reason).
- **FR-031 — Tests required (frontend).**
  - `gemma3_flash_attn_q8_kv_warning_renders_with_force_fp16_button`.
  - `force_fp16_button_flips_both_cache_types_to_fp16`.
  - `top_k_input_clamps_to_40_when_user_types_zero`.
  - `top_k_below_40_requires_explicit_override_toggle`.
  - `n_parallel_above_one_renders_advisory_chip`.
  - `swa_full_emitted_when_cache_reuse_overridden_on_gemma3`.
  - `swa_full_not_emitted_when_cache_reuse_off`.
  - `cpu_only_high_batch_warning_renders`.

### Cross-cutting

- **FR-020 — Documentation.** A short ADR-style note in `docs/superpowers/plans/` (or wherever this feature's checkpoint lands) summarising the three throughput knobs, the sampler-quality additions, the seven counter-intuitive pitfalls (six in-scope + the environmental Metal-in-container note for awareness), the gates / overrides / auto-applied flags, and the auto-bump rationale, with citations to the deep-research report sources.

## Success Criteria

- **SC-001** — On a model that supports cache reuse, with the toggle on (chunk 256), the perceived TTFT on follow-up turns of the same chat thread drops by at least 30 % compared to the toggle being off, holding all other inputs constant.
- **SC-002** — With **Persist prompt cache to RAM** on (defaults), the second of five consecutive RAG-style requests with a shared system prompt has TTFT at least 50 % lower than the first request's TTFT, holding all other inputs constant.
- **SC-003** — On a 100B+ MoE model that does not fit fully in VRAM, the operator can load the model and produce a non-zero token-per-second stream by adjusting only the MoE offload slider in the dialog, with no manual editing of `n_batch` / `n_ubatch` and no command-line invocation.
- **SC-004** — On a non-MoE model, the operator never sees the MoE offload slider in the dialog. The presence/absence of the slider is determined entirely by the `is_moe` field of the AvailableModel DTO; no hand-editing is required.
- **SC-005** — On a Gemma 3 model, the operator cannot accidentally enable cache reuse — the toggle is disabled by default and an inline warning explains why. They may enable it via an explicit override; the override state is visible.
- **SC-006** — Reviewing the diff on a fresh pair of eyes confirms no out-of-scope files were touched (boundary grep returns empty) and no new raw hex / rgba values appear in the form's vanilla-extract module.
- **SC-007** — All Rust + frontend unit tests listed in FR-008 / FR-019 / FR-024 / FR-025 / FR-031 pass green; no pre-existing test regresses.
- **SC-008** — On a Gemma 3 model with `flash_attn=true` + `cache_type_k=q8_0`, the operator never has to read upstream issue trackers to discover the GPU-utilization collapse — the form surfaces the warning + a one-click FP16-KV override at the moment of input.
- **SC-009** — On any session, the operator cannot accidentally set `top_k=0`. The input clamps to 40 by default and the slowdown rationale is visible inline.
- **SC-010** — On Gemma 3 / Qwen3-Next with cache-reuse overridden on, the spawned `llama-server` invocation includes `--swa-full` automatically; the operator does not have to remember that flag.
- **SC-011** — Switching between the three sampler presets (Chat / Code & factual / Creative) is a single click. The form's emitted `RuntimeTuning` payload reflects the preset's intended sampler combination without further edits.

## Assumptions

- The Rust extension's existing `RuntimeTuning` struct is the single source of truth for load-time CLI flags. The four new fields stay on this struct rather than being scattered across new structs.
- The `installed_artifacts` table is the right home for `is_moe` / `expert_layer_count` — it already stores other GGUF-derived metadata (size, format, max_context); the new columns continue that pattern.
- GGUF metadata extraction at install time is the right phase (not at load time). Reading the header is cheap; doing it once at install means the AvailableModel DTO is always populated without per-request I/O.
- A single localStorage shape (`lastTuningByFamily`) holds all per-family form state, including the new fields. No new storage namespace needed.
- The known-broken-models list (Gemma 3 family, Qwen3-Next SWA hybrid) is a static array maintained alongside the form. Adding new entries is a one-line change. The list is intentionally conservative — operators who run a model not on the list and discover breakage can still flip the toggle off.
- The VRAM-budget formula is approximate, not authoritative. Operators are shown a `~` prefix to set expectations; a future spec may replace this with a real probe of CUDA / Metal driver state.
- The auto-bump rule (`n_batch / n_ubatch ≥ 2048` when `n_cpu_moe > 0`) is the documented mitigation for a real `llama-server` regression. A future llama.cpp release may remove the need; until then the auto-bump is correct.
- Spec 028 ("GGUF layer metadata") is in production — the install-time GGUF extraction codepath already exists and can be extended additively.
- DRY and min-p are in-scope under the user's "real benefit only" filter because (a) DRY is universally recommended over `--repeat-penalty` for chat repetition control and (b) min-p is the modern recommended replacement for top-p with near-zero implementation cost. XTC and the rest of the modern sampler family are out of scope until there's evidence of broad operator demand.
- The seven counter-intuitive pitfalls from the deep-research report are addressed inline at the moment of input. Six are in-scope as form warnings or auto-applied mitigations; one (containerized Metal) is environmental and is documented rather than warned-on. The pitfall list is treated as canonical — adding a new pitfall to the form is a one-line addition to the warning-rules table.

## Out of Scope

- Speculative decoding (`--spec-draft-model` and friends) — flagged as Tier 2 in the deep-research report and known to regress on small-active MoE (Qwen3-A3B etc.); deferred.
- XTC sampler (`--xtc-probability` / `--xtc-threshold`) — niche (creative writing only, hurts code/factual). Re-evaluate when there's evidence of broad operator demand.
- top-nσ, dynatemp, mirostat, logit-bias, samplers chain reorder, typical-p — niche or model-specific; deferred to a future quality-only spec.
- Multi-GPU knobs (`--main-gpu`, `--tensor-split`, `--split-mode tensor`) — deferred until the host exposes a multi-GPU enumeration capability the form can consume.
- Reasoning-model knobs (`--reasoning-format`, `--reasoning-budget`) — deferred to a separate reasoning-aware spec.
- LoRA adapter knobs (`--lora`, per-request adapter selection) — deferred; needs a dedicated LoRA-management UX.
- Replacing the approximate VRAM-budget formula with a real driver probe.
- Tier 3 knobs from the deep-research report (HTTP threads, NUMA, CPU affinity, polling).
- Backend deduplication of llama-server spawns when an existing lease matches the requested model — already partially addressed by spec 037's optimistic display + auto-bind skip.
- Live-tuning a running runtime. Operators must re-load to change any of these flags; the form's contract is per-load.
- **Containerized-Metal performance pitfall** (~40% slower than bare metal). This is environmental, not a flag — surfacing it via in-app warning would require detecting that the host runs inside a container which is non-trivial. Documented in Complexity Tracking + the deep-research checkpoint instead so operators reading the docs find it.
- **Speculative decoding regresses on small-active MoE** is documented but not actionable in this spec because spec decoding itself is out of scope. When spec decoding is added in a future spec, that spec will own the corresponding warning.

## Key Entities

- **RuntimeTuning** — the per-load tuning DTO (Rust struct + TS interface mirror). Single source of truth for CLI flag generation. Already exists; this spec adds **ten** optional fields total: four throughput knobs (cache_reuse, cram_mb, checkpoint_every_n_tokens, n_cpu_moe), five sampler-quality fields (min_p, dry_multiplier, dry_base, dry_allowed_length, dry_penalty_last_n), and one mitigation flag (swa_full).
- **AvailableModel** — the per-installed-artifact DTO returned by `list_available_models`. Already exists; this spec adds `is_moe` and `expert_layer_count`.
- **InstalledArtifact** — the persisted row in the `installed_artifacts` table. This spec adds two nullable columns.
- **VramBudgetEstimate** — a pure TS value object returned by the new helper. Inputs and outputs are documented in FR-016.
- **KnownBrokenModelMatcher** — a small client-side function that maps a model's `family_id` to a "known broken with cache-reuse" verdict. Uses simple string-prefix and substring rules; documented as a curated list. Also drives the `--swa-full` auto-application path (FR-029).
- **SamplerPreset** — a frontend-only entity. Three variants: `chat`, `code`, `creative`. Each has a fixed value-map applied to form state when its chip is selected. The selected preset is persisted alongside `lastTuningByFamily`.
- **WarningRule** — a frontend-only entity. Each rule pairs a trigger predicate (e.g. "active model is Gemma 3 AND flash_attn is on AND cache_type_k is q8_0") with a render specification (warning chip text, severity, optional inline action button). The rule list is curated in code; adding a new pitfall is a one-line addition.

## Dependencies

- Spec 028 (GGUF layer metadata) — install-time GGUF extraction codepath; this spec extends it with two more fields.
- Spec 030 (extension router mount) — the `list_available_models` HTTP route; unchanged in shape, only the response payload grows.
- Spec 037 (Spectral Graphite) — the `vars.*` token contract used by the new toggles, slider, and warning chips.
- Spec 038 (EmotionTTS Recipe Studio) — only as design-language reference; no functional dependency.
- The existing `RuntimeTuningForm` shipped in spec 037 (Phase 6) — this spec extends it.
- The HelpTooltip primitive (already in `apps/web/src/layout/local_llm/`) — used for every new control.
- The `sticky_model.ts` + `lastTuningByFamily` persistence shape from earlier 2026-05 work — extended without schema change (fields are simply present or absent).

## Complexity Tracking

- The MoE-offload + auto-bump interaction is the only non-trivial state coupling. A regression test (`auto_bump_fires_when_n_cpu_moe_crosses_zero`) plus a follow-up test for the inverse (`auto_bump_does_not_lower_operator_overridden_higher_values`) guard against the obvious mistakes. Surface this clearly in the form's HelpTooltip so operators understand why their batch sizes appear to "jump."
- The known-broken-models list for cache-reuse is a curated string-match. It must be kept narrow — false-positives lock operators out of a useful knob. Document the list inline in code with a one-line rationale per entry and a link to the upstream issue. Same matcher drives FR-029 (`--swa-full` auto-application).
- The VRAM-budget formula is intentionally approximate. The `~` prefix in the read-out copy and a one-line "Estimated; not a driver-level measurement" note in the HelpTooltip set expectations.
- The sampler-preset state machine is non-trivial: clicking a chip writes values, manual edits mark "modified", re-clicking the modified chip prompts confirmation. Test coverage (FR-025) exercises every transition. Operators should never feel that "the form changed something I didn't ask it to" — the modified-dot indicator is the contract.
- The warning-rule registry (FR-026 through FR-030) is intentionally a flat curated table. Adding a future pitfall is a one-line addition; the table format prevents the form from accumulating ad-hoc `if/else` branches.
- The `--swa-full` auto-application (FR-029) is the only place the form mutates argv beyond what the operator explicitly typed. The form documents this inline next to the override checkbox so the operator never has to wonder why argv contains a flag they didn't set.
- **Containerized Metal is documented but not warned-on** — the spec acknowledges the gap rather than papering over it. A future spec may add a runtime-environment probe.
- No multi-extension or host-tree changes; boundary discipline is straightforward.
