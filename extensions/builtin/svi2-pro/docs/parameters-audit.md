# svi2-pro — Generation Parameter Audit

Exhaustive inventory of EVERY parameter that participates in the generation
process, with documentation + UI-exposure status. "Internal" = not user-tunable
(architecture/constant/host-set); everything else has a UI plan in
[fields.md](fields.md).

Status legend: **EXPOSED** = documented + planned for UI · **PLAN** = should be
exposed, gap noted · **INTERNAL** = deliberately not exposed (reason given).

## A. Render request params (`validate_render_params`)

All documented in [fields.md](fields.md). Status EXPOSED unless noted.

| Param | Source | Status |
|---|---|---|
| ref_image_path, last_image_path, prompts, negative_prompt | pipeline_svi2.py | EXPOSED |
| num_clips, frames_per_clip, width, height, fps | pipeline_svi2.py | EXPOSED |
| output_path, models_dir, device | pipeline_svi2.py | EXPOSED (device/models_dir host-managed) |
| num_inference_steps, cfg_scale, sigma_shift, switch_boundary | pipeline_svi2.py | EXPOSED |
| seed_multiplier | pipeline_svi2.py | EXPOSED |
| pixel_re_encode, stitch_mode, num_overlap_frame, num_motion_latent, num_motion_frame | pipeline_svi2.py / svi_chain.py | EXPOSED |
| ref_pad_num, ref_pad_free_clips, ref_pad_schedule | svi_chain.py | EXPOSED (advanced) |
| adain_factor | svi_chain.py | EXPOSED (advanced) |
| image_cond_noise_scale, image_cond_noise_schedule, image_cond_noise_bg_protect | svi_chain.py | EXPOSED (advanced) |
| motion_scale_t/_h/_w, motion_scale_schedule | wan22/dit.py | EXPOSED (advanced) |
| interpolate_fps, interpolate_method, rife_bin, rife_model, rife_weights | interpolate.py | EXPOSED |
| blocks_to_swap, teacache_thresh | wan22/dit.py | EXPOSED (perf) |
| distill_lora_high/_low, dit_high_path, dit_low_path, fixed_sigmas | pipeline_svi2.py | EXPOSED (distill) |

> **Worker-API vs smoke-CLI:** all section-A params are EXPOSED on the worker
> render API — the UI calls that API directly, so all are UI-reachable. The
> `gpu_smoke.py` operator CLI currently wires only a subset: `negative_prompt`,
> `seed_multiplier`, `motion_scale_h`, and `motion_scale_w` have NO smoke flag
> yet (worker defaults always used from the CLI). UI exposure is unaffected;
> these are PLAN-at-CLI (add `--negative-prompt`, `--seed-multiplier`,
> `--motion-scale-h/-w` for operator A/B). Watch the `negative_prompt`
> empty-string trap: passing `""` overrides the Chinese default with empty
> rather than restoring it.

## B. Qwen anchor-edit params (gpu_smoke + qwen_edit.py)

| Param | Source | Status |
|---|---|---|
| qwen_edit_prompt, qwen_steps, qwen_cfg, qwen_flow_shift, qwen_edited_out, qwen_sd_bin, qwen_models_dir | gpu_smoke.py | EXPOSED |
| sampling_method (euler) | qwen_edit.py | PLAN — builder kwarg, not a CLI flag yet; expose as advanced if users want non-euler |
| offload_to_cpu (true), diffusion_fa (true) | qwen_edit.py | PLAN — builder kwargs; expose as advanced VRAM toggles for the edit step |

## C. Environment levers

| Env | Source | Status |
|---|---|---|
| SVI2_FP8_COMPUTE (bf16) | fp8_loader.py | EXPOSED (env) |
| SVI2_ATTENTION (auto/sdpa/flash2/flash3_fp4/sage2/sage3_fp4) | attention_backend.py | EXPOSED (env) — enum values now documented in fields.md |
| SVI2_ATTENTION_STRICT | attention_backend.py | PLAN → now documented (fields.md env): fail-hard if the requested backend is unavailable instead of silently falling back. Advanced/debug. |
| SVI2_VRAM_TRACE | vram.py | INTERNAL (debug) — enables per-step VRAM breadcrumb logging. Operator debug flag, not a render control. Documented as debug in fields.md. |
| NEXUS_VIDEO_SVI2_RUNTIME | __main__.py | INTERNAL (host) — selects the worker profile (fake / rtx50-fp8). Set by the host runtime, not the end user. |
| PYTORCH_CUDA_ALLOC_CONF | __main__.py | INTERNAL — set to `expandable_segments:True` by the worker at startup (no-op on Windows). Not user-facing. |
| SVI2_VERSIONS_YAML | installer.py | INTERNAL (install) — install/versions manifest path; host-managed, not a render param. |
| NEXUS_HOST_DATA_DIR | installer.py | INTERNAL (install) — models destination dir for headless install; host-set, install-time only, not a render param. |

> **Auto-chain note (`SVI2_ATTENTION=auto`):** the auto selector tries only
> `flash2 → sdpa` (`attention_backend.py` `_AUTO_CHAIN`). It NEVER auto-promotes
> to the quantized backends (`sage2`, `sage3_fp4`, `flash3_fp4`) — those require
> explicit `SVI2_ATTENTION=<name>`. Legacy aliases `flash`→flash2, `flash3`→
> flash3_fp4, `sage`→sage2, `sage3`→sage3_fp4 are accepted (`_ALIASES`). A UI
> backend picker must NOT present sage/flash3 as part of "auto".

## D. Internal generation constants (deliberately NOT exposed)

These shape generation but are fixed architecture / framework constants. Exposing
them would let a user produce a non-functional model — keep internal.

| Param | Source | Why internal |
|---|---|---|
| `_WAN22_A14B_CONFIG` — dim 5120, ffn_dim 13824, num_layers 40, num_heads 40, in_dim 36, out_dim 16, freq_dim 256, text_dim 4096, patch_size (1,2,2), eps 1e-6, has_image_input, require_clip_embedding | pipeline_svi2.py | Fixed Wan2.2-A14B architecture. Changing any breaks weight loading. |
| Scheduler `template` (Wan) | flow_match.py | Wan-specific sigma schedule; fixed for the model family. |
| Scheduler `denoising_strength` (1.0) | flow_match.py | Hardcoded 1.0 (full denoise) for i2v. **Becomes user-facing only if a V2V/init-video mode is added** (then it's the V2V strength). Tracked as future. |
| Scheduler `num_train_timesteps` (1000) | flow_match.py | Training constant. |
| Expert `_TIMESTEP_SCALE` | expert_router.py | Maps switch_boundary (0–1) to timestep space; switch_boundary IS the exposed knob. |
| LoRA `scale` = `raw_alpha / rank` (else 1.0) | lora.py:115-116 | Blend weight is DERIVED from each LoRA file's own `.alpha` tensor ÷ rank — there is NO hardcoded `alpha=1` in code; `_build_expert` passes no override. A user-supplied distill LoRA with a different alpha/rank ratio changes the blend automatically. A "lora strength" multiplier on top would be PLAN-future. |
| `nan_to_num(nan=0.0, posinf=0.0, neginf=0.0)` L1 NaN recovery | pipeline_svi2.py:325,327 | Applied to `noise_pred` + `latent` every denoise step to suppress fp8 overflow (clip to 0.0) instead of crashing. Generation-stability guard, not user-tunable. Note: zeroing mid-denoise differs subtly from an epsilon clamp — intentional, fixed. |
| `tea_slot` 0/1, `_TIMESTEP_SCALE`, mask `repeats=4`, `sigma_min/max` 0/1 | pipeline_svi2.py / expert_router.py / flow_match.py | Cache slot indices, timestep scaling, VAE temporal-stride mask expansion, Wan sigma bounds — all architecture-derived constants. |
| Attention `sm`/`dtype` gating, `seq` length | attention_backend.py | Auto from GPU + render shape; not user-set. |
| RIFE internal model/scale | rife/, rife_torch.py | Interpolation engine internals; user sees only fps + method. |
| VAE tiling params | vae.py | Auto; not currently a render knob (potential future VRAM lever for decode). |

## E. Gaps closed by this audit

1. `SVI2_ATTENTION_STRICT`, `SVI2_VRAM_TRACE` — added to fields.md env section.
2. `SVI2_ATTENTION` enum values (sdpa/flash2/flash3_fp4/sage2/sage3_fp4) — documented.
3. Qwen `sampling_method` / `offload_to_cpu` / `diffusion_fa` — flagged PLAN (builder kwargs, not yet CLI/UI).
4. Scheduler `denoising_strength` — flagged future (V2V mode).
5. LoRA blend — corrected: scale is file-derived (`raw_alpha/rank`), not a hardcoded `alpha=1`.
6. Review round (independent re-scan): added `NEXUS_HOST_DATA_DIR`, `nan_to_num` L1 recovery, `tea_slot`/`_TIMESTEP_SCALE`/mask-`repeats=4`/`sigma_min/max` constants; documented the `auto`-chain backend exclusion + legacy aliases; documented the `negative_prompt` empty-override trap and `seed_multiplier` clip-0=0 behaviour; clarified worker-API-exposed vs smoke-CLI-wired (negative_prompt, seed_multiplier, motion_scale_h/w are PLAN-at-CLI).

## F. Future-exposure candidates (not internal, just not built yet)

| Param | Needs |
|---|---|
| `denoising_strength` | a V2V / `init_video` render mode |
| LoRA strength (svi + distill alpha) | a per-LoRA strength control |
| Qwen `sampling_method` / `offload` / `fa` | CLI flags + UI advanced panel for the edit step |
| VAE tiling | a decode-VRAM lever for very large frames |
