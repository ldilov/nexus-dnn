# Roadmap — `nexus.3d.faceavatar` (identity-faithful single-photo → 3D head)

**Status:** proposal / not started. **Date:** 2026-06-27. **Author context:** spun out of the TRELLIS.2 (`nexus.3d.trellis2`) work after confirming TRELLIS cannot preserve a real person's likeness.

> This is a roadmap for a SEPARATE extension, not a change to trellis2. It captures the
> decision-grade research so a future session can start cold.

---

## 1. Why a new extension

`nexus.3d.trellis2` is a **shape generator**: given a photo it invents a *generic plausible* head and **generates (hallucinates) its own texture**. It does not reconstruct a specific person's identity, and projecting the real photo onto its generic geometry is only a cosmetic band-aid (front-face texture improves; silhouette/proportions stay wrong, so likeness breaks off-frontal). See the trellis2 "TEXTURE PROJECTION" notes.

**Goal of this extension:** turn ONE (or a few) photo(s) of a real person into a 3D head/bust that actually *resembles that person* — identity-preserving, not a generic look-alike.

## 2. The honest ceiling (set expectations up front)

- **No OSS method gives scan-grade 360° likeness from a single photo.** Achievable today = a recognizable **frontal-to-three-quarter bust** with correct coloration and roughly-right proportions.
- **Unseen geometry is always hallucinated** (sides, back of head, ears, hair behind the photo). Only multiple real views (photogrammetry / few-shot) observe them.
- **Hair** remains unsolved for clean mesh output across the board.
- True 360°, animation-grade, indistinguishable-from-real fidelity needs **several real photos** — out of single-photo scope.

If the product needs more than a frontal hero bust, plan for a **multi-photo / few-shot intake** path (see Phase 4).

## 3. Candidate models (ranked, from 2025-2026 survey)

| # | Method | Output | Identity | License | GB10 risk | Effort | Repo |
|---|--------|--------|----------|---------|-----------|--------|------|
| **1** | **Arc2Avatar** | FLAME-correspondent Gaussian → mesh-exportable | **Best** — optimizes toward the person's ArcFace recognition embedding | FLAME (non-commercial) | MED | Med (per-image optim ~mins) | github.com/dimgerogiannis/Arc2Avatar |
| **2** | **ID-Sculpt / Portrait3D** | Textured head **mesh** | ID-aware geometry + real-photo back-projection inpainted to the back | FLAME (NC) | MED-HIGH | Med (SDS, fiddly) | github.com/jinkun-hao/ID-Sculpt |
| **3** | **MICA + HRN/DECA** | FLAME **mesh** + photo-projected UV | Metric face geometry (best shape error) + real texture; fast, deterministic | FLAME / MICA (NC) | MED | Low-Med | github.com/Zielon/MICA + github.com/youngLBW/HRN |
| 4 | **LAM** | Gaussian splats (animatable) | Good front; not ArcFace-optimized | **Apache-2.0** (code; FLAME rides along) | MED | Med | github.com/aigc3d/LAM |
| 5 | **Hunyuan3D-2.1** | Textured mesh + PBR | Better texture than TRELLIS; **geometry still generic** | Tencent (excludes EU/UK/KR) | MED-HIGH | Med-High | github.com/Tencent-Hunyuan/Hunyuan3D-2.1 |
| — | **GAGAvatar** | Gaussian splats | Good; render-only | **MIT** (FLAME rides along) | MED | Med | github.com/xg-chu/GAGAvatar |
| — | **Pixel3DMM** | FLAME params/mesh | 2025 SOTA-class FLAME fit | FLAME (NC) | MED | Med | github.com/SimonGiebenhain/pixel3dmm |

## 4. Two cross-cutting gates (decide BEFORE building)

### 4a. License gate — FLAME is non-commercial
**Nearly every high-identity method depends on FLAME (Max Planck), which is research/non-commercial only.** It rides through DECA, EMOCA, MICA, Arc2Avatar, ID-Sculpt, GAGAvatar, LAM, Pixel3DMM.
- **Non-commercial / personal use** → FLAME branch is fine; pick on quality.
- **Commercial use** → the whole FLAME branch needs separate licensing. Permissive-CODE options (LAM Apache, GAGAvatar MIT) still pull FLAME weights. The only identity-adjacent commercial-ish path is **Hunyuan3D-2.1** (regional license, weaker identity).
- **ACTION:** confirm the intended use with the user before committing to a FLAME-based model. This decision selects the model.

### 4b. GB10 / aarch64 feasibility
Deploy target: DGX Spark / GB10 — aarch64, Blackwell **sm_121**, CUDA 13.x, torch 2.12, 128GB unified.
- No prebuilt aarch64 wheels for `nvdiffrast`, `pytorch3d`, gaussian-splat rasterizers — all **build from source** with `--no-build-isolation`, `TORCH_CUDA_ARCH_LIST="12.1"`.
- **nvdiffrast is already proven on this box** (trellis2 vendored a prebuilt `_nvdiffrast_c` sm_121 wheel). So the rasterizer-dependent methods are MED, not HIGH.
- **AVOID the PanoHead / EG3D / StyleGAN line** — custom CUDA ops (`upfirdn2d`, `bias_act`) are the worst aarch64 bring-up + slow PTI per image.
- Reuse the trellis2 GB10 build playbook (devel CUDA base, ninja on PATH, vendored wheels under `binaries/linux-aarch64/`, uv `override-dependencies` + `environments` pin).

## 5. Recommended architecture (mirror trellis2)

Build it as a first-party builtin extension, same shape as `nexus.3d.trellis2` (boundary-clean):
- `extensions/builtin/faceavatar/`
  - `manifest.yaml` — `model_artifact` steps for the chosen weights (FLAME, ArcFace/insightface, the method's checkpoints), `package_set` (torch 2.12/cu132 + vendored sm_121 rasterizer wheels), backend_runtimes (gb10 + fake).
  - `worker/` — Python stdio JSON-RPC worker (copy trellis2's worker skeleton: rpc.py, params.py, pipeline, fake backend, vram.py). Vendor the chosen method's code under `worker/src/<method>/`.
  - `rust/` — thin shim (copy trellis2 rust: render route, dispatcher, media resolve, storage). Reuse the parameterized `GenerationTask.method` + generate.* notification pattern.
  - `web/` — generate surface (upload photo → avatar → GLB/splat preview). Reuse trellis2 web skeleton + ModelViewer.
  - `storage/` — `ext_faceavatar__jobs` table.
- Sole host coupling via `crates/nexus-builtins` (register the provider). NO extension-specific code in host paths.
- Output: prefer **mesh (GLB)** for parity with the existing 3D viewer. If the chosen method outputs Gaussian splats (LAM/GAGAvatar), add a splat→mesh step (Poisson/TSDF on rendered depth) OR a splat viewer — decide per model.

## 6. Phased plan

**P0 — GB10 model spike (CONTRACT AUTHORITY, like trellis2 P0).** Pick the model per the license gate (default **Arc2Avatar** for non-commercial likeness; **MICA+HRN** if determinism/speed matter more; **Hunyuan3D-2.1** if commercial). On a scratch devel container: build its CUDA deps for sm_121, download weights, run ONE photo → 3D end-to-end on the Spark. Capture: VRAM, runtime, exact build recipe, every gotcha. **Do not design the contract until one real render works.** (This is the trellis2 lesson — the GPU path is the only truth; local tests are torch-free.)

**P0.5 — Freeze the wire contract.** RPC method, params (image ref + method knobs), notifications (reuse `*.progress/done/error`), output artifact (GLB or splat), DTO. Vendor the method package + sm_121 wheels.

**P1-P4 (parallelizable after P0.5, mirror trellis2):**
- P1 worker: load model, photo→avatar, export, fake backend, params validation.
- P2 rust shim: routes + dispatcher + media + storage.
- P3 web: upload + generate + preview + history.
- P4 install/manifest: model_artifact downloads, package_set, Dockerfile build, uv lock.

**P5 — Review gate** (rust + python + security reviewers; adversarial pass) → fix CRIT/HIGH.

**P6 — Deploy + live render** on GB10 (`just dgx-deploy`), self-trigger via API to verify identity quality before handing to the user.

**P7 — Polish:** texture back-projection of the real photo onto the avatar (most methods do this; if not, reuse the trellis2 `texture_projection.py` we already vendored), expression/neutral toggle, optional few-shot intake.

**Phase 4 / stretch — multi-photo path.** If single-photo likeness is insufficient: accept 3-20 photos → few-shot Gaussian (Avat3r / FastGHA) or COLMAP MVS. This is the only route to genuinely faithful free-form geometry.

## 7. Risks / open questions

- **License** (§4a) — blocks commercial use of the best models. MUST resolve first.
- **Per-image optimization latency** — Arc2Avatar/ID-Sculpt are optimization-based (minutes/photo), not feed-forward. If interactive latency matters, prefer feed-forward MICA+HRN or LAM.
- **Splat vs mesh** — LAM/GAGAvatar output splats; needs a meshing step or a splat viewer for the nexus pipeline.
- **Hair + back of head** — hallucinated; manage expectations / crop to bust.
- **GB10 build chain** — each CUDA dep is a from-source compile gamble; budget P0 time for it.
- **insightface/ArcFace** weights + FLAME assets are separate gated downloads — wire as `model_artifact` steps with non-gated mirrors where possible (trellis2 did this for dinov3 → kiennt120 mirror).

## 8. References

Arc2Avatar https://github.com/dimgerogiannis/Arc2Avatar (project https://arc2avatar.github.io/) ·
ID-Sculpt https://github.com/jinkun-hao/ID-Sculpt (arXiv 2406.16710) ·
MICA https://github.com/Zielon/MICA · DECA https://github.com/yfeng95/DECA · HRN https://github.com/youngLBW/HRN ·
Pixel3DMM https://github.com/SimonGiebenhain/pixel3dmm · LAM https://github.com/aigc3d/LAM ·
GAGAvatar https://github.com/xg-chu/GAGAvatar · Avat3r https://tobias-kirschstein.github.io/avat3r/ ·
FaceLift https://github.com/weijielyu/FaceLift · Hunyuan3D-2.1 https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1 ·
FLAME-Universe (license map) https://github.com/TimoBolkart/FLAME-Universe ·
PanoHead (AVOID for GB10) https://github.com/SizheAn/PanoHead
