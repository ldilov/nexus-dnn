# SVI2 — NVFP4 correctness gate + Wan2.2 performance roadmap

_Date: 2026-06-22 · Source: multi-AI brainstorm (Codex gpt-5.5 + Claude pattern/paradox lens), grounded in the real `fp8_loader.py`, `wan22/flow_match.py`, `attention_backend.py`._

## 0. Headline

**`nvfp4 → always garbage` is a weight-decode/layout bug, not a sigma-schedule bug.** Both
models converged on this independently. The dgx-fix34 distilled-sigma preset was a
misattribution: a flow-match schedule cannot change the decoded weights, so it cannot be
the cause of weights that are wrong. Keep the preset for distilled models, but do not count
it as progress on NVFP4.

The "0.92 correlation = vindicated" reading is the trap. Correlation is invariant to scale
and offset (`corr(w, a·w+b)=1`), so it is **blind to the two most likely bugs**: a global
`weight_scale_2` slip and a per-block scale transpose/swizzle. And 0.92 is itself
catastrophic: rel-error ≈ √(1−r²) ≈ **39%/layer**, compounded across ~200 quantized GEMMs
(~40 blocks × 5–7 linears) × N denoise steps → noise. FP8 works because its dequant *is*
the validated bf16 path (one per-tensor scale, no layout contract); NVFP4 adds four
unchecked convention contracts (block axis, swizzle, two-level scale order, nibble/bias),
**none gated by a numeric check** — until now.

## 1. Fix NVFP4 (P0 — blocks everything quant-related)

### 1.1 Per-Layer Numeric Gate — `scripts/nvfp4_numeric_gate.py` (DONE)
Decodes one real DiT linear under every permutation (nibble order × scale axis ×
`weight_scale_2` mode = up to 12) and ranks by **relative-L2 vs the FP8/bf16 oracle** — the
metric correlation can't fake. Reports rel-L2, weight-cosine, rms-ratio, a single-activation
matmul rel-L2 + `median(y/y_ref)` scale ratio, and a per-block error heatmap (hot stripes ⇒
transpose/swizzle). Fails (non-zero exit) if best rel-L2 > threshold. No GPU render needed.

Run on dgx:
```bash
python extensions/builtin/svi2-pro/scripts/nvfp4_numeric_gate.py \
  --nvfp4 /path/wan22_dit.nvfp4.safetensors \
  --oracle /path/wan22_dit.fp8_e4m3.safetensors \
  --inhouse        # also diffs the in-house nvfp4_loader decode
```

Reading the output:
- **best rel-L2 ≪ 1% but in-house decode rel-L2 large** → in-house loader picked the wrong
  convention; the gate's BEST row tells you the right one. Highest-probability outcome.
- **even BEST rel-L2 large + scale ratio ≈ 2× / 0.5×** → `weight_scale_2` direct-vs-reciprocal
  (Two-Level Scale Slip).
- **even BEST large + hot diagonal/striped error map** → Block-Scale Transpose / Swizzle Gap.
- **even BEST large + scrambled (no structure)** → E2M1 table or byte-packing layout wrong.

### 1.2 Wire the gate into load (after the convention is pinned)
Add a load-time assertion in the real `nvfp4_loader.py`: dequant block-0 qkv, compare to a
shipped per-layer oracle stat (rms + a few sampled elements), refuse to load if rel-L2 >
threshold. A 92%-right loader that ships is worse than one that refuses.

### 1.3 Regime-bisect (decisive, cheap, no fix written first)
Run the **same** NVFP4 weights through a **40-step non-distilled base, CFG off**:
- merely degraded ⇒ decode bug + distill has zero error budget (Distillation-Quant Collision).
- still pure noise ⇒ decode error is large/global (scale slip), not just block scramble.

### 1.4 Stay on dequant-to-bf16; no hardware FP4 GEMM yet
CUTLASS/cuBLASLt FP4 needs swizzled scales — extra failure modes on top of an unsolved
decode. Earn hardware FP4 only after 1.1 is green, then validate layer-by-layer against the
bf16 reference.

### 1.5 LoRA-on-quantized caveat
SVI motion LoRAs are bf16-additive and were trained against the **correct** bf16 base. Added
onto a mis-decoded base they push activations further off-manifold. Re-test LoRA only after
the base decode passes the gate — don't debug them against broken weights.

## 2. Schedulers / solvers (P1 — quality at low step counts)

Current: Euler flow-match only (first order). Additions, in priority:
1. **DPM++ 2M** — first solver after Euler; best quality-per-step, simple multistep state.
   Biggest win at 15–25 steps.
2. **UniPC multistep** — Wan/ComfyUI default; strong at moderate steps. Needs flow-match
   sigma support + Wan `shift=5` handling.
3. **DPM++ 3M / 2M-SDE** — after 2M validated; SDE adds texture but stochasticity can hurt
   temporal coherence in video.
4. **Sigma spacing options** — Karras / exponential / beta alongside native flow spacing.
   Test matrix: Euler+native, DPM++2M+Karras, DPM++2M+exponential, UniPC+native, UniPC+Karras.

**Distilled (lightx2v 4-step):** solver choice matters far less than matching the training
trajectory. Keep `set_fixed_sigmas` exactly; avoid multistep solvers (trained around a
specific sampler path). Do NOT chase samplers for the distilled NVFP4 garbage — that's §1.

## 3. Prompt encoding — UMT5-XXL (~11 GB) (P1 — latency + VRAM)

Ranked by win:
1. **Skip the text encoder when CFG=1 and embeddings are cached** — biggest latency win for
   distilled CFG-off runs; no negative branch needed.
2. **CPU-offload the encoder after encoding** — biggest VRAM win; load→encode→offload so 11 GB
   isn't resident during denoise.
3. **Prompt/embedding cache** keyed by `(model_id, tokenizer_id, text, max_len, dtype)`,
   positive + negative cached separately; pinned CPU bf16 store, moved to GPU only for denoise.
4. **FP8/int8 the text encoder** — good VRAM win, medium risk; TE quant hurts final video less
   than DiT quant but can weaken prompt adherence. (`batch_encode_text` already exists.)

## 4. Attention (P2 — throughput at long sequences)

Registry already has sdpa/flash2/flash3_fp4/sage2/sage3_fp4; auto-chain is conservative
(flash2→sdpa). Additions:
1. **Sequence-length routing** in auto-chain: short seq → flash2/sdpa; long seq on Blackwell →
   sage2 (after numeric validation). Don't auto-promote to FP4 attention silently — quantized
   attention errors hit colour/motion visibly.
2. **Video-aware sparse attention** (Sparse VideoGen / STA sliding-tile / radial-anchor):
   local spatial window + temporal anchors. ~1.5–3× attention speedup at long token counts
   (49/81/121-frame clips); negligible on short clips. Prototype as block masks first; real
   speedup needs FlashAttention block-sparse, not SDPA arbitrary masks.
3. **Layer-selective sparsity** — keep early/global blocks dense, sparsify mid/high-res-heavy
   blocks. Validate motion consistency + identity at same seed before/after.

## 5. Compute perf (P2)

1. **Per-row (per-token) FP8 activation scaling** — the Blackwell `_scaled_mm` colour-smudge
   comes from the **per-tensor** activation `amax/448`; per-tensor under-scales important
   channels. Per-row activation scale + per-row/col weight scale, gated by per-layer output
   cosine vs the bf16 matmul. **This also unlocks FP8 _speed_ safely**, not just NVFP4 hygiene
   — today `SVI2_FP8_COMPUTE=bf16` is correct-but-slow precisely because scaled_mm is unsafe.
2. **torch.compile the DiT forward** — fixed latent shape/dtype/attention backend; watch graph
   breaks from custom attention + loader paths. Compare first-run vs steady-state denoise.
3. **CUDA graphs for the denoise step** — stable shape/CFG-mode; static sigma buffers updated
   in-place, no allocations in the captured region, graph-safe attention backend.
4. **MoE high/low-noise expert offload by sigma range** — preload high-noise expert for early
   steps, async-move low-noise before the boundary (Wan template `switch_boundary≈0.9`), evict
   inactive. Threshold from the template, not guessed per step.
5. **VAE tiling** — spatial tiling + overlap-blend (optional temporal chunking) to kill the
   decode-OOM gate; verify no seams/flicker frame-to-frame.

## Sequence

```
P0  NVFP4 numeric gate (DONE) -> run on dgx -> pin convention -> wire load-time assert -> regime-bisect
P1  DPM++ 2M + UniPC samplers           ||  skip-TE-at-cfg1 + prompt/neg cache + UMT5 CPU offload
P2  per-row fp8 activation scaling -> torch.compile/CUDA-graph DiT -> seq-len attn routing -> sparse video attn -> VAE tiling
```

Do NOT touch P1/P2 quant-adjacent items (per-row fp8, FP4 attention) as a "fix" for the NVFP4
garbage — that is the Prettier-Noise Trap. Green gate first.
