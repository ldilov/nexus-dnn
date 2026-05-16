# Blueprint: Native NVFP4 + GGUF + partial-load for nexus-video-ltx23

**Repo:** D:/Workspace/repos/nexus-dnn  · **Branch base:** `claude/crazy-jackson-5dc2c3` @ `9ffb733` (ff-merges to local `main`, **never pushed**)
**Mode:** direct/local (no `gh`, no PR/CI) — every step: TDD, `cargo test -p nexus-video-ltx23-extension --lib` + `cargo clippy --all-targets -D warnings` + worker `pytest --ignore=tests/test_gguf_loader.py` + `bash extensions/builtin/nexus-video-ltx23/scripts/audit-boundary.sh` all green, `git commit -F` (block-no-verify hook scans `-m`), ff-merge worktree→local main so the venv-editable worker (→ main `worker/src`) picks it up, **do not push**.
**Invariants after every step:** boundary audit PASS (no LTX literals in host scan paths); prefer pre-quantized over on-the-fly always; no regression in the 4 existing guard/budget commits; worker venv binding respected (commit+ff-merge before any real-GPU run).

## Objective

`rtx50-nvfp4` must mean *real* NVIDIA NVFP4 on Blackwell, not bitsandbytes NF4 (current misnomer). Deliver: (1) a fast non-bnb **GGUF Q4** path validated end-to-end; (2) a **real NVFP4 backend** (checkpoint + Blackwell FP4 runtime wired as a distinct quant backend); (3) a **partial-load** mechanism so the NVFP4 transformer + activations + VAE + Gemma-3 fit 16 GB with zero shared-VRAM spill; (4) honest **profile/quant relabel**.

## Dependency graph

```
G1 ─→ G2                          (GGUF track — earliest win)
N1 ─→ N2 ─→ N3 ─→ N4 ─→ N5        (NVFP4 core build — serial)
N1-NOGO (branch off N1 if no FP4 runtime)
H1 (web-label-only, after N3)
GATES: lightweight verify @ N2 exit; adversarial REVIEW @ N3 and N4 exit
```
**Parallel:** G1/G2 file-edits are disjoint from N1, BUT G1's base-tree spike and N1's venv import-probe both mutate-by-import the SAME worker venv — **serialize those venv-touching sub-tasks** (file edits may still interleave; venv probes must not run concurrently).
**Naming correctness is folded into N3** (introduce `Nvfp4` + `Nf4Bnb` right the first time — no later Rust rename). H1 is web-label-only.
**Model tier:** N1, N3, N4 = strongest model. G1, G2, H1, N2 = default.

---

## Step G1 — GGUF profile: pair Q4 transformer with a lean base tree

**Context brief:** Abiray ships a single transformer-only `LTX-2.3-22B-distilled-1.1-Q4_K_M.gguf` (16.5 GB). Worker selects GGUF only via env `NEXUS_VIDEO_LTX23_TRANSFORMER_GGUF` or one `.gguf` in the resolved `model_dir`; it then loads a full base tree and *replaces* the transformer (base transformer loaded-then-discarded — wasteful). Goal: a first-class GGUF path the resolver can pick per-profile without manual env/restart, loading only the needed base components.

**Tasks:**
- **Fork probe first (≤30 min, no product code):** confirm whether diffusers `from_pretrained` supports excluding/replacing a component WITHOUT materialising the base transformer. If YES → G1 includes the skip optimisation. If NO (likely — `from_pretrained` materialises the whole tree) → **G1 scope = resolver wiring only; document the load-then-discard tax explicitly; it is NOT a failure.** Record the probe result in the commit message + a checkpoint.
- Add a GGUF model-resolution path in `pipeline_diffusers.py`: a profile (e.g. `rtx50-gguf`) resolves to `{base_tree, gguf_transformer_path}`. Reuse `_resolve_gguf_transformer_override`.
- Pick the leanest non-bnb base for VAE/Gemma-3/scheduler: compare `rockapaper` fp8 text-encoder tree vs dg845; pick smallest that loads cleanly. **(Venv-touching — must not run concurrently with N1's probe.)** Record the choice.
- Rust: add the GGUF profile/quant value to `schemas.rs` + `runtime_selection.rs` + `compatibility.rs` (frame ceiling only) keeping host-boundary clean.

**Verify:** new worker tests for the GGUF resolution path (mirror `test_diffusers_resolver.py`); cargo+clippy+pytest+boundary green.
**Exit criteria:** a profile resolves to (base tree + Abiray GGUF) deterministically in a unit test; no env var required. The skip-optimisation is EITHER implemented (probe YES) OR explicitly documented as a known tax (probe NO) — both are valid exits.
**Rollback:** revert the commit; GGUF remains env-only as today.

## Step G2 — GGUF real-GPU validation (recurring benchmark)

**Context brief:** Depends on G1. Validate the GGUF Q4 path end-to-end on the RTX 5070 Ti against the canonical benchmark (see `memory/reference_nvfp4_16gb_benchmark.md`): 2-scene continuation, draft 832×480, 8 steps, seg 4 s/24 fps, `max_gpu_vram_gib=15`. Host is user-launched; coordinate restart (do not kill it).

**Tasks:** ff-merge G1 to local main → ask user to restart host → submit minimal benchmark → monitor via `nvidia-smi` (GPU telemetry is authoritative; host log burst-buffers) + API `progress_percent`.
**Verify:** status=completed; peak GPU < 15 GiB; **zero Windows shared-GPU-memory growth**; valid 2-scene video; record s/step + wall time AND (if G1 probe was NO) the load-then-discard tax as a known measured cost — not a failure.
**Exit criteria:** one completed GGUF render with the VRAM + continuity criteria met, timing recorded; base-transformer-tax status (implemented-skip vs known-tax) documented in the checkpoint.
**Rollback:** N/A (validation only). If it fails, file findings; GGUF path stays behind the flag.

## Step N1 — NVFP4 feasibility spike (strongest model; decision doc only)

**Context brief:** No NVFP4 weights on disk; worker `_build_pipeline_quant_config` only knows `bitsandbytes_4bit/8bit`. RTX 5070 Ti is sm_120 (Blackwell, native FP4 GEMM). Must determine which FP4 runtime the *installed* torch/diffusers supports.

**Tasks (no product code change):**
- In the worker venv: probe `torch.__version__`, `diffusers.__version__`, sm/compute-cap, and which of these import + support NVFP4: `diffusers` `PipelineQuantizationConfig` backends (`quanto`, `torchao`), NVIDIA ModelOpt (`nvidia-modelopt`), `torchao.float4`/`mxfp4`. Record exact API + version constraints.
- Identify a source for an NVFP4 LTX-2.3 checkpoint: (a) an existing community NVFP4 build (HF search), or (b) convert dg845 via the chosen toolchain (ModelOpt PTQ / torchao). Estimate size + conversion cost.
- Decide the backend + checkpoint strategy. Write `specs/046-ltx23-video-generation/checkpoints/2026-05-1x-nvfp4-feasibility.md` with a go/no-go + chosen path + risks.

**Verify:** decision doc exists with measured version/API facts and a concrete N2 input spec. (Venv import-probe — must not run concurrently with G1's base-tree spike.)
**Exit criteria:** unambiguous chosen FP4 backend + checkpoint acquisition plan, OR a clear NO-GO triggering N1-NOGO.
**Rollback:** N/A (research).

### Step N1-NOGO — branch if no usable Blackwell FP4 runtime

**Trigger:** N1 finds neither diffusers(quanto/torchao) nor NVIDIA ModelOpt in the installed stack supports NVFP4 on sm_120.
**Tasks (no code):** document exactly which package+version would be required and the upgrade's blast radius (the grandfathered `transformers<5.0` pin, bnb compat, lockfile). **STOP — do not perform any torch/diffusers/transformers upgrade.** Surface the upgrade decision to the user with the risk written out; the upgrade, if approved, becomes its own separate blueprint (do not fold it here).
**Exit criteria:** user has the upgrade go/no-go in hand; N2–N5 remain blocked until then.

## Step N2 — Acquire / convert the NVFP4 checkpoint (pre-quantized preferred)

**Context brief:** Per N1's decision. Memory rule: always prefer a pre-quantized on-disk checkpoint over on-the-fly. Land an NVFP4 LTX-2.3 tree under `~/.nexus/models/<owner>/<name>/` validated render-equivalent to dg845 (same `model_index.json` structure + transformer config keys — same gate OzzyGT passed).

**Tasks:** download or convert per N1; verify the tree (`model_index.json` + transformer `config.json` arch keys identical to dg845; presence of an NVFP4 quantization marker); record size + path.
**Verify (LIGHTWEIGHT GATE — must pass + be checkpoint-recorded before N3 starts):** equivalence check script (mirror the OzzyGT validation: `model_index.json` structure + transformer `config.json` arch keys identical to dg845) passes; NVFP4 quant marker present; on-disk size + absolute path recorded in a checkpoint. This gate exists because N2 is where on-the-fly / wrong-tree mistakes land.
**Exit criteria:** validated NVFP4 diffusers tree on disk, equivalence + size/path checkpoint-recorded, gate green.
**Rollback:** delete the partial download/convert; N3 blocked until redone.

## Step N3 — Wire NVFP4 as a distinct quant backend (strongest model; REVIEW GATE)

**Context brief:** Add NVFP4 as its own backend in `_build_pipeline_quant_config` (NOT bitsandbytes). Extend Rust `ModelQuant` + `runtime_selection` + `compatibility.rs` so `rtx50-nvfp4` maps to the real NVFP4 backend; `_dir_is_prequantized` must recognise the NVFP4 marker and skip on-the-fly. Keep the bnb path intact under its own value.

**Tasks:**
- Worker: `_build_pipeline_quant_config` gains an `nvfp4` branch using N1's chosen API; `_dir_is_prequantized` detects the NVFP4 quant marker; resolver `_prequantized_family_for("rtx50-nvfp4")` → the N2 tree.
- Rust (naming done RIGHT the first time — no later rename step): introduce BOTH `ModelQuant::Nvfp4` (real NVFP4) AND rename the bnb value to `Nf4Bnb` in `schemas.rs`, with a serde alias so the old `"nf4"` wire value still deserialises (back-compat test required). `default_quant_for_profile` rtx50-nvfp4 → `Nvfp4`; bnb path keeps `Nf4Bnb`. Update `runtime_selection.rs` + `compatibility.rs` consistently in THIS step so H1 carries zero Rust-file overlap.
- TDD: serde round-trips incl. old-`"nf4"`-alias back-compat, resolver routing, dir-detection, quant-config branch (mock).
**Verify:** cargo+clippy+pytest+boundary green; **adversarial code review** (`octo:review` or rust-reviewer+code-reviewer sub-agents) — fix all HIGH/CRITICAL before proceeding.
**Exit criteria:** unit-level: nvfp4 profile resolves to the real NVFP4 backend + pre-quant tree, bnb untouched, review clean.
**Rollback:** revert the commit; nvfp4 falls back to prior bnb behaviour (still works).

## Step N4 — Partial-load so NVFP4 fits 16 GB (strongest model; REVIEW GATE)

**Context brief:** Even at 4-bit, 22B transformer + activations + VAE + Gemma-3 may exceed 16 GB fully resident. Build on existing `max_gpu_vram_gib` (set_per_process_memory_fraction, physical denominator) + `OffloadMode`. Add true partial placement: accelerate `device_map` + `max_memory` (transformer split GPU/CPU under a hard GPU ceiling) OR block-level offload — whichever the NVFP4 runtime supports. Must never silently spill to shared VRAM.

**Tasks:**
- **Probe first (no product code):** verify the N3-chosen NVFP4 backend is compatible with accelerate `device_map`/`max_memory` sharding (torchao/ModelOpt FP4 wrapping frequently breaks accelerate sharding). If compatible → device_map path below. If NEITHER device_map NOR block-level offload works under NVFP4 → N4 scope = sequential-offload-only with a documented residency risk, and **escalate to the user** (do not silently ship a config that can't fit 16 GB).
- Worker: when nvfp4 + a partial mode, dispatch via `device_map="auto"`/`max_memory={0:"<N>GiB",cpu:...}` (N = resolved `max_gpu_vram_gib`) so the transformer is pinned just under physical VRAM; remaining layers paged from CPU. Reuse the physical-VRAM denominator.
- Rust: extend `OffloadMode` or add a `partial`/`device_map` variant; `default_offload_mode_for_profile` rtx50-nvfp4 → the partial mode; compatibility guard updates; propagate via `build_advanced_block`.
- TDD: offload-dispatch tests (mock pipe/torch) for the device_map path + Auto resolution + retry payload.
**Verify:** cargo+clippy+pytest+boundary green; **adversarial review gate** (HIGH/CRITICAL fixed).
**Exit criteria:** unit-level partial-load dispatch verified; budget math correct against physical VRAM.
**Rollback:** revert; nvfp4 uses prior offload mode.

## Step H1 — Honest user-facing labels (web-only; zero Rust overlap)

**Context brief:** Depends on N3 (which already did the Rust `Nvfp4`/`Nf4Bnb` rename + serde back-compat). H1 is now **web-label-only** — no `schemas.rs`/`runtime_selection.rs`/`compatibility.rs` edits (those are N3's, removing the file-collision the review flagged). Just make the operator-facing UI honest.

**Tasks:** update `web/src/api.ts` types + `web/src/App.tsx` labels so the UI distinguishes "NVFP4 (NVIDIA FP4, Blackwell)" from "NF4 (bitsandbytes)"; rebuild + commit `dist/`. Update `reference_*` memory note. Pure UI clarity, no behaviour change, no Rust touch.
**Verify:** `pnpm tsc --noEmit` + `pnpm build` clean; dist committed; cargo/pytest unaffected (no Rust/py change); boundary PASS.
**Exit criteria:** UI labels reflect reality; zero Rust/worker file overlap with N3; no behaviour change.
**Rollback:** revert; labels stay as-is.

## Step N5 — NVFP4 real-GPU validation (recurring benchmark)

**Context brief:** Depends on N3+N4 (+H1). ff-merge to local main, coordinate host restart, run the canonical nvfp4 16 GB 2-scene benchmark.
**Tasks:** submit benchmark; monitor `nvidia-smi` + API; confirm the real NVFP4 backend is active in the worker log (not bnb).
**Verify:** status=completed; `runtime.weights_resident` shows NVFP4; peak GPU < 15 GiB; **zero shared-VRAM spill**; coherent 2-scene continuity; record s/step vs the bnb baseline.
**Exit criteria:** one completed real-NVFP4 render meeting all VRAM + quality + naming criteria; benchmark memory updated.
**Rollback:** N/A. On failure, file a findings checkpoint; nvfp4 reverts to the validated GGUF or bnb path.

---

## Anti-patterns to avoid (carried from this project's history)

- Re-introducing the removed `experimental_nvfp4_opt_in` gate (a prior regression).
- On-the-fly quant of the 89 GB bf16 when a pre-quant tree exists.
- Editing files via relative `cd` (shell cwd resets here — always absolute paths; the test-file-into-wrong-repo incident).
- Trusting host-log timestamps for phase timing (it burst-buffers — use `nvidia-smi` + API `progress_percent`).
- `git commit -m` with multi-paragraph bodies (block-no-verify hook scans `-m`; use `-F`).
- Killing the user's host process to "restart" it — always coordinate.
- Pushing — everything stays local until explicitly authorised.

## Open risks

- N1 may find the installed torch/diffusers lacks any usable Blackwell FP4 runtime → adds a torch/diffusers upgrade sub-plan (high blast radius; gate carefully).
- NVFP4 community LTX-2.3 checkpoint may not exist → conversion (ModelOpt/torchao PTQ) is non-trivial and may not be render-equivalent.
- The cold-load + per-render worker-reload problem (see `2026-05-16-coldload-gap-profiling.md`) is orthogonal and still gates *observable* turnaround — a warm-worker fix should be a sibling plan, not folded in here.
