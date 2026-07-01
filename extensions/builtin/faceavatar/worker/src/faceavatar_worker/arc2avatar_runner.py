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


def _mesh_adjacency(faces: np.ndarray, nv: int):
    """Symmetric vertex adjacency (CSR) + degree vector for Laplacian smoothing."""
    import scipy.sparse as sp

    e = np.vstack([faces[:, [0, 1]], faces[:, [1, 2]], faces[:, [2, 0]]])
    adj = sp.coo_matrix(
        (np.ones(len(e) * 2), (np.r_[e[:, 0], e[:, 1]], np.r_[e[:, 1], e[:, 0]])),
        shape=(nv, nv),
    ).tocsr()
    deg = np.asarray(adj.sum(1)).ravel()
    deg[deg == 0] = 1.0
    return adj, deg


def _boundary_vertex_mask(faces: np.ndarray, nv: int, dilate: int = 1) -> np.ndarray:
    """Vertices on an open mesh boundary (edges used by a single face), optionally
    dilated by ``dilate`` one-rings. Freezing these during the shape fit keeps the
    FLAME neck ring canonical so the downstream graft weld has a clean seam."""
    edges = np.sort(
        np.vstack([faces[:, [0, 1]], faces[:, [1, 2]], faces[:, [2, 0]]]), axis=1
    )
    uniq, counts = np.unique(edges, axis=0, return_counts=True)
    boundary_edges = uniq[counts == 1]
    mask = np.zeros(nv, dtype=bool)
    if len(boundary_edges):
        mask[boundary_edges.ravel()] = True
    if dilate > 0 and mask.any():
        adj, _ = _mesh_adjacency(faces, nv)
        for _ in range(dilate):
            mask = mask | (np.asarray(adj @ mask.astype(np.float64)).ravel() > 0)
    return mask


def _fit_template_to_gaussians(
    verts: np.ndarray,
    faces: np.ndarray,
    vnormals: np.ndarray,
    gxyz: np.ndarray,
    *,
    iters: int = 3,
    k: int = 12,
    max_disp_frac: float = 0.06,
    normal_bias: float = 0.75,
    smooth_iters: int = 8,
) -> np.ndarray:
    """Non-rigidly fit a fixed-topology template to a Gaussian-splat surface.

    Arc2Avatar initializes its 3DGS from the same FLAME template we load, so the
    cloud and template already share a canonical frame (no global alignment
    needed — the same reason nearest-gaussian color transfer works). Each
    iteration nudges every free vertex toward the local median gaussian (robust to
    speckle), biases the step along the surface normal to preserve the tangential
    parameterization, clamps it to ``max_disp_frac`` of the template's bbox
    diagonal, Laplacian-smooths the displacement field, and holds the boundary
    (neck) ring fixed. The result carries the subject's identity shape on clean
    FLAME topology — unlike marching cubes, which would discard the known
    landmarks / neck ring the graft weld depends on (and has no aarch64 wheel)."""
    verts = np.asarray(verts, np.float64).copy()
    faces = np.asarray(faces)
    vnormals = np.asarray(vnormals, np.float64)
    nv = len(verts)
    k = max(1, min(k, len(gxyz)))
    diag = float(np.linalg.norm(verts.max(0) - verts.min(0))) or 1.0
    max_disp = max_disp_frac * diag
    free = (~_boundary_vertex_mask(faces, nv))[:, None].astype(np.float64)
    adj, deg = _mesh_adjacency(faces, nv)
    tree = cKDTree(gxyz)
    for _ in range(iters):
        _, idx = tree.query(verts, k=k)
        idx = np.atleast_2d(idx.T).T if k == 1 else idx
        target = np.median(gxyz[idx], axis=1)
        d = target - verts
        dn = np.sum(d * vnormals, axis=1, keepdims=True) * vnormals
        d = normal_bias * dn + (1.0 - normal_bias) * d
        mag = np.linalg.norm(d, axis=1, keepdims=True)
        d = d * np.minimum(1.0, max_disp / np.maximum(mag, 1e-9))
        d = d * free
        for _s in range(smooth_iters):
            d = 0.5 * d + 0.5 * (adj @ d) / deg[:, None]
            d = d * free
        verts = verts + d
    return verts


def _load_template_mesh():
    """Load the vendored FLAME template mesh (long-masked preferred)."""
    for cand in ("long_masked_template.ply", "masked_template.ply"):
        p = VENDOR / "scene" / "template" / cand
        if p.exists():
            m = trimesh.load(str(p), force="mesh", process=False)
            if getattr(m, "faces", None) is not None and len(m.faces) > 0:
                return m
    raise RuntimeError("FLAME template mesh not found in vendored scene/template")


def _transfer_and_smooth_colors(
    verts: np.ndarray, faces: np.ndarray, gxyz: np.ndarray, grgb: np.ndarray,
    *, k: int = 16, smooth_iters: int = 12,
) -> np.ndarray:
    """kNN-median gaussian color per vertex (median rejects rainbow speckle), then
    Laplacian-smoothed over the mesh for clean skin. Returns clamped [0,1] RGB."""
    nv = len(verts)
    k = max(1, min(k, len(gxyz)))
    _, idx = cKDTree(gxyz).query(verts, k=k)
    idx = np.atleast_2d(idx.T).T if k == 1 else idx
    colors = np.median(grgb[idx], axis=1)
    adj, deg = _mesh_adjacency(faces, nv)
    for _ in range(smooth_iters):
        colors = 0.4 * colors + 0.6 * (adj @ colors) / deg[:, None]
    return np.clip(colors, 0, 1)


def splat_to_glb(splat_ply: Path, out_glb: Path, *, fit_shape: bool = True) -> dict:
    """Convert an Arc2Avatar 3DGS point cloud to a vertex-colored mesh GLB.

    The FLAME template topology is non-rigidly fit to the optimized gaussian
    surface so the head carries the subject's identity shape on clean topology
    (disable with ``fit_shape=False`` or env ``FACEAVATAR_FIT_SHAPE=0`` to fall
    back to the raw template), then gaussian color is transferred by robust kNN +
    Laplacian smoothing. No open3d (no aarch64 wheel)."""
    g = PlyData.read(str(splat_ply))["vertex"]
    gxyz = np.stack([g["x"], g["y"], g["z"]], 1).astype(np.float64)
    grgb = np.clip(
        np.stack([g["f_dc_0"], g["f_dc_1"], g["f_dc_2"]], 1) * SH_C0 + 0.5, 0, 1
    )
    opacity = 1.0 / (1.0 + np.exp(-np.asarray(g["opacity"])))
    keep = opacity > 0.3
    gxyz, grgb = gxyz[keep], grgb[keep]

    template = _load_template_mesh()
    verts = np.asarray(template.vertices, np.float64)
    faces = np.asarray(template.faces)
    nv = len(verts)

    do_fit = fit_shape and os.environ.get("FACEAVATAR_FIT_SHAPE", "1") != "0" and len(gxyz) >= 32
    if do_fit:
        vnormals = np.asarray(template.vertex_normals, np.float64)
        fitted = _fit_template_to_gaussians(verts, faces, vnormals, gxyz)
        mean_disp = float(np.linalg.norm(fitted - verts, axis=1).mean())
        verts = fitted
    else:
        mean_disp = 0.0

    colors = _transfer_and_smooth_colors(verts, faces, gxyz, grgb)
    vc = (np.clip(colors, 0, 1) * 255.0).astype(np.uint8)
    vc = np.concatenate([vc, np.full((nv, 1), 255, np.uint8)], 1)
    mesh = trimesh.Trimesh(vertices=verts, faces=faces, vertex_colors=vc, process=False)
    out_glb = Path(out_glb)
    out_glb.parent.mkdir(parents=True, exist_ok=True)
    mesh.export(str(out_glb))
    return {"vertices": int(nv), "faces": int(len(faces)),
            "gaussians": int(len(gxyz)), "bytes": out_glb.stat().st_size,
            "shape_fit": bool(do_fit), "mean_displacement": round(mean_disp, 6)}


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


def _vertex_colors_rgb(mesh) -> np.ndarray:
    """Per-vertex RGB in [0,1] for any mesh, sampling a texture into vertex colors
    when the mesh carries a ``TextureVisuals``. Falls back to neutral grey when a
    mesh has neither usable vertex colors nor a sampleable texture."""
    vis = getattr(mesh, "visual", None)
    if vis is not None and not hasattr(vis, "vertex_colors"):
        try:
            mesh.visual = vis.to_color()
        except Exception:
            return np.full((len(mesh.vertices), 3), 0.6)
    vc = getattr(getattr(mesh, "visual", None), "vertex_colors", None)
    if vc is None or len(vc) != len(mesh.vertices):
        return np.full((len(mesh.vertices), 3), 0.6)
    return np.asarray(vc, np.float64)[:, :3] / 255.0


def _to_rgba_u8(rgb: np.ndarray) -> np.ndarray:
    """[0,1] RGB → opaque uint8 RGBA vertex-color array."""
    u8 = (np.clip(np.asarray(rgb), 0, 1) * 255.0).astype(np.uint8)
    return np.concatenate([u8, np.full((len(u8), 1), 255, np.uint8)], 1)


def _ring_falloff(adj, deg, ring: np.ndarray, iters: int) -> np.ndarray:
    """Harmonic decay field: 1 on the ring, smoothly falling to ~0 into the
    interior over ~``iters`` one-rings (Dirichlet BC solved by Jacobi iteration).
    This bounds a seam band so the far interior (the identity face) is untouched —
    unlike a plain max-diffusion, which saturates the whole mesh to 1."""
    ring_f = ring.astype(np.float64)
    w = ring_f.copy()
    for _ in range(max(1, iters)):
        w = ring_f + (1.0 - ring_f) * (np.asarray(adj @ w).ravel() / deg)
    return np.clip(w, 0.0, 1.0)


def _weld_head_to_body(head, body, blend_ring: float = 0.35):
    """Flush the head's open neck ring onto the base body surface and propagate that
    displacement inward over a band whose reach scales with ``blend_ring`` (0..1),
    so the identity head meets the body without a floating gap or hard offset. The
    displacement is harmonically extended inward then bounded by a ring-falloff, so
    the far interior (the face) stays put. Topologies stay separate — a true stitch
    across two generators' meshes is GPU R&D (spec §1 honest ceiling); this is the
    geometric weld approximation. Returns a new head mesh (input untouched)."""
    verts = np.asarray(head.vertices, np.float64).copy()
    faces = np.asarray(head.faces)
    nv = len(verts)
    ring = _boundary_vertex_mask(faces, nv, dilate=0)
    body_verts = np.asarray(getattr(body, "vertices", np.empty((0, 3))), np.float64)
    if not ring.any() or len(body_verts) == 0:
        return head
    _, nn = cKDTree(body_verts).query(verts[ring])
    disp0 = np.zeros_like(verts)
    disp0[ring] = body_verts[nn] - verts[ring]
    adj, deg = _mesh_adjacency(faces, nv)
    iters = max(2, int(round(np.clip(blend_ring, 0.0, 1.0) * 20)))
    ring_col = ring[:, None]
    prop = disp0.copy()
    for _ in range(iters):
        prop = np.where(ring_col, disp0, (adj @ prop) / deg[:, None])
    w = _ring_falloff(adj, deg, ring, iters)[:, None]
    out = head.copy()
    out.vertices = verts + prop * w
    return out


def _blend_seam_colors(head, body, blend_ring: float = 0.35) -> np.ndarray:
    """Fade the head's neck-band vertex colors toward the nearby body colors so the
    two generators' albedo roughly match across the seam, bounded by a ring-falloff
    so the identity face keeps its own color. This is an approximate texture blend —
    a true cross-generator albedo rebake is deferred (spec §4.6). Returns new RGBA
    uint8 vertex colors for the head."""
    verts = np.asarray(head.vertices, np.float64)
    faces = np.asarray(head.faces)
    nv = len(verts)
    hv = _vertex_colors_rgb(head)
    ring = _boundary_vertex_mask(faces, nv, dilate=0)
    body_verts = np.asarray(getattr(body, "vertices", np.empty((0, 3))), np.float64)
    if not ring.any() or len(body_verts) == 0:
        return _to_rgba_u8(hv)
    body_col = _vertex_colors_rgb(body.copy())
    adj, deg = _mesh_adjacency(faces, nv)
    iters = max(2, int(round(np.clip(blend_ring, 0.0, 1.0) * 12)))
    w = _ring_falloff(adj, deg, ring, iters)[:, None]
    _, nn = cKDTree(body_verts).query(verts)
    blended = (1.0 - w) * hv + w * body_col[nn]
    return _to_rgba_u8(blended)


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
              seam: str = "neck", keep_hair: bool = True,
              blend_ring: float = 0.35, texture_blend: bool = True,
              workdir: str = None, models_dir: str = None,
              progress: ProgressFn = None) -> dict:
    """Base GLB + photo -> base body with the identity head welded on. The head's
    neck ring is flushed onto the body and blended inward over ``blend_ring``, and
    (when ``texture_blend``) its seam-band colors fade toward the body's, replacing
    the v1 floating bbox composite. Keeps the base mesh's lower region (hair/back/
    body). The two shells stay separate meshes so the base keeps its own texture."""
    workdir = Path(workdir or (Path(out_glb).parent / "_run"))
    head_glb = Path(out_glb).parent / "_identity_head.glb"
    gen = run_generate(image_path, str(head_glb), iters, str(workdir), models_dir, progress)
    blend_ring = 0.35 if blend_ring is None else float(np.clip(blend_ring, 0.0, 1.0))

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

    head = _weld_head_to_body(head, body, blend_ring)
    if texture_blend:
        head.visual.vertex_colors = _blend_seam_colors(head, body, blend_ring)

    # Export as a Scene: concatenating a textured base with a vertex-colored head
    # collapses both to a single flat grey material, so keep them as distinct meshes.
    scene = trimesh.Scene()
    scene.add_geometry(body, geom_name="base_body")
    scene.add_geometry(head, geom_name="identity_head")
    out_glb = Path(out_glb)
    scene.export(str(out_glb))
    return {"mesh_glb": str(out_glb), "base_glb": base_glb, "seam": seam,
            "head_vertices": gen["vertices"], "welded": True,
            "blend_ring": blend_ring, "texture_blend": bool(texture_blend),
            "bytes": out_glb.stat().st_size}


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
