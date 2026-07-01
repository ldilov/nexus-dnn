"""Runs the vendored Arc2Avatar optimization and converts its Gaussian splat to a
mesh GLB. Self-contained so it can be exercised standalone on the GPU box (a CLI is
provided) before the stdio worker imports it.

train.py uses cwd-relative asset/output paths, and the vendored tree is read-only in
the deployed image, so every run gets a fresh writable workdir whose asset/code dirs
are symlinks into the vendored package; only ``subjects/`` is written.
"""
from __future__ import annotations

import os
import shutil
import subprocess
import sys
from pathlib import Path
from typing import Callable, Optional

import numpy as np
import trimesh
from plyfile import PlyData
from scipy.spatial import cKDTree

VENDOR = Path(os.environ.get("FACEAVATAR_VENDOR_DIR")
              or Path(__file__).resolve().parent.parent / "arc2avatar")
SH_C0 = 0.28209479177387814

# Symlinked into each run workdir so train.py's cwd-relative imports + asset paths
# resolve while keeping the vendored package itself untouched.
_LINK_NAMES = (
    "arc2face", "guidance", "scene", "lora_diffusion", "arguments", "utils",
    "gaussian_renderer", "init", "configs", "train.py", "download_models.py",
)

ProgressFn = Optional[Callable[[str, float], None]]


def _emit(progress: ProgressFn, stage: str, frac: float) -> None:
    if progress is not None:
        progress(stage, frac)


def ensure_models(models_dir: Path) -> Path:
    """Populate ``models_dir`` with antelopev2 + arc2face + encoder (once) by running
    the vendored ``download_models.py`` against it. Network is required on first call;
    subsequent calls are a no-op. Returns ``models_dir``."""
    models_dir = Path(models_dir)
    models_dir.mkdir(parents=True, exist_ok=True)
    if (models_dir / "antelopev2").is_dir() and (models_dir / "arc2face").is_dir():
        return models_dir
    staging = models_dir.parent / "_dl_models"
    staging.mkdir(parents=True, exist_ok=True)
    link = staging / "models"
    if not link.exists():
        link.symlink_to(models_dir, target_is_directory=True)
    subprocess.run(
        [sys.executable, str(VENDOR / "download_models.py")],
        cwd=str(staging), check=True,
    )
    return models_dir


def _setup_workdir(workdir: Path, models_dir: Path) -> None:
    workdir.mkdir(parents=True, exist_ok=True)
    for name in _LINK_NAMES:
        dst = workdir / name
        if not dst.exists():
            dst.symlink_to(VENDOR / name)
    models_link = workdir / "models"
    if not models_link.exists():
        models_link.symlink_to(Path(models_dir), target_is_directory=True)


def _write_run_config(workdir: Path, subject_rel: str, iters: int) -> Path:
    """Copy the vendored config and override subject/iterations and disable the
    process-video export (newer imageio's TiffWriter rejects ``fps`` and crashes the
    run *after* the splat is saved)."""
    cfg = workdir / "run_config.yaml"
    text = (VENDOR / "configs" / "config.yaml").read_text(encoding="utf-8")
    out_lines = []
    saw_save_video = False
    for line in text.splitlines():
        s = line.strip()
        indent = line[: len(line) - len(line.lstrip())]
        if s.startswith("iterations:"):
            line = f"{indent}iterations: {iters}"
        elif s.startswith("save_process:"):
            line = f"{indent}save_process: False"
        elif s.startswith("save_video:"):
            line = f"{indent}save_video: False"
            saw_save_video = True
        out_lines.append(line)
    if not saw_save_video:
        out_lines.append("save_video: False")
    cfg.write_text("\n".join(out_lines) + "\n", encoding="utf-8")
    return cfg


def splat_to_glb(splat_ply: Path, out_glb: Path) -> dict:
    """Convert an Arc2Avatar 3DGS point cloud to a vertex-colored mesh GLB using the
    FLAME template topology and nearest-gaussian color transfer (no open3d, which has
    no aarch64 wheel)."""
    import scipy.sparse as sp

    g = PlyData.read(str(splat_ply))["vertex"]
    gxyz = np.stack([g["x"], g["y"], g["z"]], 1).astype(np.float64)
    grgb = np.clip(
        np.stack([g["f_dc_0"], g["f_dc_1"], g["f_dc_2"]], 1) * SH_C0 + 0.5, 0, 1
    )
    opacity = 1.0 / (1.0 + np.exp(-np.asarray(g["opacity"])))
    keep = opacity > 0.3
    gxyz, grgb = gxyz[keep], grgb[keep]

    template = None
    for cand in ("long_masked_template.ply", "masked_template.ply"):
        p = VENDOR / "scene" / "template" / cand
        if p.exists():
            m = trimesh.load(str(p), force="mesh", process=False)
            if getattr(m, "faces", None) is not None and len(m.faces) > 0:
                template = m
                break
    if template is None:
        raise RuntimeError("FLAME template mesh not found in vendored scene/template")

    # k-NN MEDIAN color transfer (median rejects outlier gaussians that otherwise
    # paint rainbow speckle), then Laplacian-smooth over the mesh for clean skin.
    verts = np.asarray(template.vertices, np.float64)
    faces = np.asarray(template.faces)
    nv = len(verts)
    _, idx = cKDTree(gxyz).query(verts, k=16)
    colors = np.median(grgb[idx], axis=1)
    e = np.vstack([faces[:, [0, 1]], faces[:, [1, 2]], faces[:, [2, 0]]])
    adj = sp.coo_matrix(
        (np.ones(len(e) * 2), (np.r_[e[:, 0], e[:, 1]], np.r_[e[:, 1], e[:, 0]])),
        shape=(nv, nv),
    ).tocsr()
    deg = np.asarray(adj.sum(1)).ravel()
    deg[deg == 0] = 1
    for _ in range(12):
        colors = 0.4 * colors + 0.6 * (adj @ colors) / deg[:, None]

    vc = (np.clip(colors, 0, 1) * 255.0).astype(np.uint8)
    vc = np.concatenate([vc, np.full((nv, 1), 255, np.uint8)], 1)
    mesh = trimesh.Trimesh(vertices=verts, faces=faces, vertex_colors=vc, process=False)
    out_glb = Path(out_glb)
    out_glb.parent.mkdir(parents=True, exist_ok=True)
    mesh.export(str(out_glb))
    return {"vertices": int(len(verts)), "faces": int(len(template.faces)),
            "gaussians": int(len(gxyz)), "bytes": out_glb.stat().st_size}


def _run_optimization(image_path: Path, workdir: Path, models_dir: Path,
                      iters: int, progress: ProgressFn) -> Path:
    _setup_workdir(workdir, models_dir)
    subj = workdir / "subjects" / "spike"
    subj.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(image_path, subj / "face.jpg")
    cfg = _write_run_config(workdir, "subjects/spike", iters)

    env = dict(os.environ)
    env.setdefault("HF_HOME", str(workdir.parent / "hf_cache"))
    env["PYTHONPATH"] = str(workdir) + os.pathsep + env.get("PYTHONPATH", "")
    env["TORCH_CUDA_ARCH_LIST"] = "12.1"

    _emit(progress, "optimizing", 0.05)
    proc = subprocess.Popen(
        [sys.executable, "train.py", "--opt", str(cfg),
         "--subject", "subjects/spike", "--batch_size", "1"],
        cwd=str(workdir), env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
        text=True, bufsize=1,
    )
    import collections
    tail = collections.deque(maxlen=80)
    for line in proc.stdout:  # surface coarse progress from train.py tqdm/markers
        tail.append(line.rstrip())
        ll = line.strip()
        if "Training progress" in ll and "%" in ll:
            try:
                pct = int(ll.split("%")[0].split()[-1])
                _emit(progress, "optimizing", 0.05 + 0.9 * pct / 100.0)
            except (ValueError, IndexError):
                pass
        elif "Saving Gaussians" in ll or "training complete" in ll:
            _emit(progress, "saving", 0.96)
    rc = proc.wait()
    if rc != 0:
        raise RuntimeError(
            f"Arc2Avatar train.py exited {rc}\n--- last output ---\n" + "\n".join(tail)
        )

    pc_root = subj / "splat" / "point_cloud"
    plys = sorted(pc_root.glob("iteration_*/point_cloud.ply"),
                  key=lambda p: int(p.parent.name.split("_")[1]))
    if not plys:
        raise RuntimeError("optimization produced no point_cloud.ply")
    return plys[-1]


def run_generate(image_path: str, out_glb: str, iters: int = 2000,
                 workdir: str = None, models_dir: str = None,
                 progress: ProgressFn = None) -> dict:
    """One photo -> identity head GLB. Returns metadata incl. ``mesh_glb``."""
    workdir = Path(workdir or (Path(out_glb).parent / "_run"))
    models_dir = ensure_models(Path(models_dir or (workdir.parent / "models")))
    splat = _run_optimization(Path(image_path), workdir, models_dir, iters, progress)
    _emit(progress, "meshing", 0.97)
    meta = splat_to_glb(splat, Path(out_glb))
    meta.update({"mesh_glb": str(out_glb), "splat_ply": str(splat), "iterations": iters})
    _emit(progress, "done", 1.0)
    return meta


def _align_head_to_base(head: trimesh.Trimesh, base: trimesh.Trimesh,
                        seam: str) -> trimesh.Trimesh:
    """Scale + position the identity head onto the base mesh's head region (top of the
    base bbox). v1 approximation: bbox-scale + translate, no seam weld."""
    hmin, hmax = head.bounds
    bmin, bmax = base.bounds
    base_h = float(bmax[1] - bmin[1])
    head_h = float(hmax[1] - hmin[1]) or 1.0
    head_frac = 0.45 if seam == "neck" else 0.35
    scale = (base_h * head_frac) / head_h
    head = head.copy()
    head.apply_scale(scale)
    hmin2, hmax2 = head.bounds
    target_top = np.array([(bmin[0] + bmax[0]) / 2.0, bmax[1], (bmin[2] + bmax[2]) / 2.0])
    head_top = np.array([(hmin2[0] + hmax2[0]) / 2.0, hmax2[1], (hmin2[2] + hmax2[2]) / 2.0])
    head.apply_translation(target_top - head_top)
    return head


def run_graft(base_glb: str, image_path: str, out_glb: str, iters: int = 2000,
              seam: str = "neck", keep_hair: bool = True, workdir: str = None,
              models_dir: str = None, progress: ProgressFn = None) -> dict:
    """Base GLB + photo -> base body with the identity head grafted on (v1: bbox-aligned
    composite, no seam blend). Keeps the base mesh's lower region (hair/back/body)."""
    workdir = Path(workdir or (Path(out_glb).parent / "_run"))
    head_glb = Path(out_glb).parent / "_identity_head.glb"
    gen = run_generate(image_path, str(head_glb), iters, str(workdir), models_dir, progress)

    base = trimesh.load(base_glb, force="mesh", process=False)
    head = trimesh.load(str(head_glb), force="mesh", process=False)
    head = _align_head_to_base(head, base, seam)

    bmin, bmax = base.bounds
    cut_frac = 0.62 if seam == "neck" else 0.72
    cut_y = float(bmin[1] + cut_frac * (bmax[1] - bmin[1]))
    try:
        body = base.slice_plane(plane_origin=[0, cut_y, 0], plane_normal=[0, -1, 0])
        if body is None or len(getattr(body, "faces", [])) == 0:
            body = base
    except Exception:
        body = base

    # Export as a Scene: concatenating a textured base with a vertex-colored head
    # collapses both to a single flat grey material, so keep them as distinct meshes.
    scene = trimesh.Scene()
    scene.add_geometry(body, geom_name="base_body")
    scene.add_geometry(head, geom_name="identity_head")
    out_glb = Path(out_glb)
    scene.export(str(out_glb))
    return {"mesh_glb": str(out_glb), "base_glb": base_glb, "seam": seam,
            "head_vertices": gen["vertices"], "bytes": out_glb.stat().st_size}


if __name__ == "__main__":
    import argparse
    import json

    ap = argparse.ArgumentParser()
    ap.add_argument("--image", required=True)
    ap.add_argument("--out", required=True)
    ap.add_argument("--iters", type=int, default=1000)
    ap.add_argument("--base-glb", default=None)
    ap.add_argument("--models-dir", default=None)
    ap.add_argument("--workdir", default=None)
    a = ap.parse_args()

    def _p(stage, frac):
        print(f"[progress] {stage} {frac:.2f}", flush=True)

    if a.base_glb:
        out = run_graft(a.base_glb, a.image, a.out, a.iters, workdir=a.workdir,
                        models_dir=a.models_dir, progress=_p)
    else:
        out = run_generate(a.image, a.out, a.iters, a.workdir, a.models_dir, _p)
    print("RESULT " + json.dumps(out))
