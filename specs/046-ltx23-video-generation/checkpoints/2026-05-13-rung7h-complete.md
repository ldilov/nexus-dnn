# Rung 7H — Custom GGUF transformer loader — COMPLETE

**Date**: 2026-05-13
**HEAD at completion**: (commit pending — see git log after push)
**Worktree**: `D:\Workspace\repos\nexus-dnn\.claude\worktrees\unruffled-perlman-dd12e1`
**Branch**: `claude/unruffled-perlman-dd12e1`
**Previous checkpoint**: `2026-05-13-session-close.md` (HEAD `c85e3fc`)

## Rung scope

Implement the custom GGUF transformer loader designed to bypass the
diffusers 0.39.0.dev0 `from_single_file` utf-8-sniff regression
(documented in `verification/p0-t001-results.md`, Path 2). Goal: provide
the infrastructure so the LTX-2.3 GGUF family (community Q4_K_M /
Q5_K_M / Q6_K / Q8_0 single-file ports) can route through
`LTX2VideoTransformer3DModel` via diffusers-native `state_dict` injection
+ `GGUFQuantizer` runtime dequant.

## What landed

### New file

- `worker/src/ltx_video_worker/gguf_loader.py` (~290 LOC) — three layers:
  1. **`load_gguf_state_dict(path)`** — thin wrapper around
     `diffusers.models.model_loading_utils.load_gguf_checkpoint`. Single
     import boundary for the gguf surface; surfaces a clear
     `FileNotFoundError` instead of the deep diffusers stack trace.
  2. **`validate_state_dict_against_model(state_dict, model)`** — returns
     a `SchemaCheckReport` dataclass with matched / missing / extra /
     shape-mismatch counts plus a `quant_unsupported` list. Mirrors the
     diffusers `GGML_QUANT_SIZES` table to unpack packed byte shapes
     into logical shapes before comparison (so a Q4_K weight of byte
     shape `(4096, 144)` is compared against the model's
     `(4096, 256)` logical shape, not the raw bytes).
  3. **`load_gguf_transformer(gguf_path, base_config_dir, *, compute_dtype, strict_schema)`** —
     orchestrates the full bypass:
     - Reads the GGUF state-dict.
     - Validates against an empty-init `LTX2VideoTransformer3DModel`
       built from the base config (via accelerate's `init_empty_weights`).
     - Raises `GGUFSchemaMismatch` cleanly when the schemas diverge
       (the dominant real-world failure mode today).
     - Otherwise swaps `nn.Linear` → `GGUFLinear` via
       `_replace_with_gguf_linear` and installs each state-dict entry
       through `GGUFQuantizer.create_quantized_param` (quantized) or
       direct param assignment (F32/F16/BF16).
     - Attaches `model.hf_quantizer` so downstream code knows the
       model is quantized.

### Wiring

- `worker/src/ltx_video_worker/pipeline_diffusers.py`:
  - New helper `_resolve_gguf_transformer_override(model_dir)`:
    1. Honours `NEXUS_VIDEO_LTX23_TRANSFORMER_GGUF` env (absolute or
       model-dir-relative path to a single `.gguf` file).
    2. Falls back to `find_gguf_transformer(model_dir)` — a dir-scan
       that returns the single `.gguf` file in `model_dir` when
       exactly one is present (ambiguous → returns None, falls through
       to the standard safetensors path).
  - `_ensure_pipeline_loaded` calls the resolver after the base
    pipeline loads. If an override is found, the base `pipe.transformer`
    is replaced with the GGUF-loaded one. Sequential CPU offload + VAE
    tiling still apply downstream.

### Dependencies

- `worker/pyproject.toml`: added `gguf>=0.10` to the `[diffusers]` extra
  (justified by the comment block — reader half only; diffusers
  ships the runtime dequant ops).
- `worker/uv.lock` refreshed (`gguf==0.19.0` resolved).

### Tests

- `worker/tests/test_gguf_loader.py` — **19 new tests**, all green:
  - Byte-shape ↔ logical-shape conversion for unquantized and Q4_K/Q5_K
    quants (verified against the live `GGML_QUANT_SIZES` table).
  - State-dict shape normalization across mixed plain + GGUFParameter
    entries.
  - `SchemaCheckReport` clean / missing / extra / shape-mismatch /
    `quant_unsupported` paths.
  - `load_gguf_transformer` raises `GGUFSchemaMismatch` with a useful
    message when state-dict diverges (uses a fast monkey-patched
    `LTX2VideoTransformer3DModel` stand-in so the test stays GPU-free).
  - `find_gguf_transformer` discovery (zero / one / many / missing-dir).
  - `_resolve_gguf_transformer_override` env-absolute, env-relative,
    env-missing-path, no-env-with-dir-scan-fallback paths.

## Verification gate snapshot

| Check | Result |
|---|---|
| `cargo clippy -p nexus-video-ltx23-extension --all-targets -- -D warnings` | clean |
| `cargo test -p nexus-video-ltx23-extension --lib` | 34/34 |
| `bash scripts/audit-boundary.sh` | PASS |
| `uv run python -m pytest tests/ -q` | **50/50** (31 baseline + 19 new) |
| `pnpm build` | 369.75 KB JS / 4.45 KB CSS — unchanged |

## Real-GPU live smoke — NOT RUN

Deferred deliberately. The Abiray Q4_K_M GGUF that's downloaded on this
machine **does not match** today's `dg845/LTX-2.3-Distilled-Diffusers`
config (see "Schema-divergence finding" below). The loader will
correctly raise `GGUFSchemaMismatch` against it — that's the right
behaviour, but it's also not the "real video frames generated" smoke
the rung originally hoped for.

To exercise the loader end-to-end on real GPU, the next session needs
ONE of:

1. A GGUF re-quant of dg845's BF16 weights (community port → quant
   ports we already know work). Source repo to watch:
   `QuantStack/LTX-2.3-GGUF` (47k downloads — needs key-set audit
   against dg845 schema; if it's also dev-schema, same blocker).
2. A diffusers commit bump to a future ref that adopts the
   dev-schema (`scale_shift_table [N, 9]`, plus `prompt_*`/`av_ca_*`
   adaln modules). Track on the upstream diffusers PR queue.
3. A custom config.json synthesized to match the GGUF (manual
   architecture port — substantially larger work).

## Schema-divergence finding (important for the next session)

The Abiray `LTX-2.3-22B-DISTILLED-1.1-GGUF` family was quantized from
a **more recent / different Lightricks LTX-2.3 checkpoint** than the
dg845 community port targets. Concrete deltas:

| | Abiray GGUF | dg845 (current diffusers config) |
|---|---|---|
| Total transformer keys | 4444 | 4186 |
| `scale_shift_table` shape | `[4096, 9]` | `[2, 4096]` |
| `audio_scale_shift_table` | `[2048, 9]` | `[2, 2048]` |
| Top-level prefixes | `adaln_single`, `prompt_adaln_single`, `av_ca_*_adaln_single`, `patchify_proj`, `*_proj_out` | `time_embed`, `proj_in`, `proj_out` |
| Attention norm key naming | `attn1.k_norm` / `q_norm` | `attn1.norm_k` / `norm_q` |
| Extra modules in GGUF only | `prompt_scale_shift_table`, `av_ca_a2v_gate_*_adaln_single`, `scale_shift_table_a2v_ca_*` | not present |

This is a **structural divergence**, not a key rename — the dg845
config doesn't expose the extra `prompt_*` / `av_ca_*` adaln modules
at all, and `scale_shift_table` is rank-2 of [2, hidden] rather than
[hidden, 9]. The currently-pinned diffusers commit
`adff1cae9f3d4f79dcff6a3ceb02e0a56982f88c` matches dg845's schema —
which is why the dg845 BF16 path works end-to-end (P0-T001 success on
RTX 5070 Ti, prompt-matching first frame generated).

## Repo conventions reaffirmed

The new code adheres to all the conventions captured in the previous
session-close checkpoint. Specifically:

- All code lives under `extensions/builtin/nexus-video-ltx23/` —
  no host files touched. Boundary audit clean.
- Worker code is pure-Python with type annotations + dataclass-driven
  reports (per repo Python style rules).
- Lazy imports inside the loader keep the worker importable on a
  non-GPU host (CI-friendly). No torch/diffusers imports at module
  load time.
- No comments in the loader except where they explain *why* (the
  bypass rationale, the schema-divergence trap, the GGML byte-shape
  unpacking subtlety). No "what" comments.
- New tests use `pytest.MonkeyPatch` for env manipulation. No global
  state mutation. All test parameter shapes scaled down so the
  fixture stays fast.

## What's NOT done — for the NEXT session

(All deliberate scope — flagged so the next agent doesn't think any
of these are silently broken.)

1. **Real-GPU smoke against an Abiray or compatible GGUF.** Blocked
   by the schema-divergence finding above. Pick one of the three
   unblock paths.
2. **Foundry / model-foundry installer wiring.** No GGUF profile
   exists yet; the only way to opt in is `NEXUS_VIDEO_LTX23_TRANSFORMER_GGUF`
   env or a manually-dropped `.gguf` alongside the dg845 install.
   Adding a proper profile (e.g. `rtx40-gguf-q4`) + the install flow
   is a separate rung — touches `profile_install.rs`, `installer.py`,
   `runtime_selection.rs`, the web recipe form.
3. **Rung 7H-alt** (Lightricks FP8 ComfyUI-key-remap) is still open
   but hits the same schema-divergence wall on today's diffusers
   pin. Defer until a diffusers commit bump or fork lands.
4. **Memory-budget verification.** The whole point of GGUF Q4_K_M
   was 16 GB VRAM ceiling. Until 1+2+3 unblock, we can't measure.

## Next-session recommendation

**Rung 7I (retry-segment task abort)** — completely orthogonal to the
schema mess, smaller and self-contained, ships clean today. Then
revisit GGUF when an upstream diffusers commit lands that resolves
the dev-schema gap (track on the diffusers GitHub LTX PRs).
