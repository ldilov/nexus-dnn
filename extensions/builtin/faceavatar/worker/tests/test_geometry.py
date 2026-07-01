"""Unit tests for the torch-free splat->mesh geometry: template boundary detection,
the non-rigid identity-shape fit (#2), and the graft seam weld + color blend (#1).

These exercise the pure numpy/trimesh/scipy helpers with synthetic meshes and point
clouds — no GPU, no Arc2Avatar, no vendored template — so the geometry is verified
offline. The end-to-end Arc2Avatar fit is GPU-only and verified on the box.
"""
from __future__ import annotations

import numpy as np
import pytest

trimesh = pytest.importorskip("trimesh")
pytest.importorskip("scipy")

from faceavatar_worker import arc2avatar_runner as R  # noqa: E402


def _open_cap(radius: float = 1.0, cut: float = 0.4, subdivisions: int = 3):
    """An icosphere with its top cap removed -> a mesh with one open boundary ring."""
    ico = trimesh.creation.icosphere(subdivisions=subdivisions, radius=radius)
    keep = np.where(ico.triangles_center[:, 1] < cut)[0]
    return ico.submesh([keep], append=True)


def _far_interior_vertex(verts: np.ndarray, ring: np.ndarray) -> int:
    """Index of the interior (non-ring) vertex farthest from the ring centroid —
    the point a seam-bounded weld/blend should leave essentially untouched."""
    centroid = verts[ring].mean(0)
    interior = np.where(~ring)[0]
    return int(interior[np.argmax(np.linalg.norm(verts[interior] - centroid, axis=1))])


def test_boundary_mask_flags_open_ring_not_closed_sphere():
    closed = trimesh.creation.icosphere(subdivisions=2)
    mask = R._boundary_vertex_mask(np.asarray(closed.faces), len(closed.vertices), dilate=0)
    assert mask.sum() == 0, "a closed sphere has no open boundary"

    cap = _open_cap()
    cmask = R._boundary_vertex_mask(np.asarray(cap.faces), len(cap.vertices), dilate=0)
    assert 0 < cmask.sum() < len(cap.vertices), "an open cap has a partial boundary ring"


def test_boundary_dilation_grows_the_ring():
    cap = _open_cap()
    faces = np.asarray(cap.faces)
    nv = len(cap.vertices)
    ring0 = R._boundary_vertex_mask(faces, nv, dilate=0).sum()
    ring1 = R._boundary_vertex_mask(faces, nv, dilate=1).sum()
    assert ring1 > ring0, "dilating by one ring should include the neighbours"


def test_fit_moves_template_toward_gaussian_surface_and_freezes_boundary():
    template = _open_cap(radius=1.0)
    verts = np.asarray(template.vertices, np.float64)
    faces = np.asarray(template.faces)
    vnormals = np.asarray(template.vertex_normals, np.float64)

    # Target surface: a larger sphere sampled densely in the same region.
    big = trimesh.creation.icosphere(subdivisions=4, radius=1.25)
    gxyz = np.asarray(big.vertices, np.float64)
    gxyz = gxyz[gxyz[:, 1] < 0.6]

    from scipy.spatial import cKDTree

    def mean_gap(v):
        d, _ = cKDTree(gxyz).query(v)
        return float(d.mean())

    before = mean_gap(verts)
    fitted = R._fit_template_to_gaussians(verts, faces, vnormals, gxyz, iters=4)
    after = mean_gap(fitted)

    assert after < before, "the fit must reduce the mean distance to the gaussian surface"
    assert fitted.shape == verts.shape, "topology (vertex count) must be preserved"

    boundary = R._boundary_vertex_mask(faces, len(verts), dilate=0)
    moved = np.linalg.norm(fitted - verts, axis=1)
    assert moved[boundary].max() < 1e-9, "boundary/neck ring must stay pinned"
    assert moved[~boundary].mean() > 1e-4, "interior vertices must actually move"


def test_fit_stays_close_when_gaussians_coincide_with_template():
    """kNN-median is a mild smoothing operator: on a dense real splat the nearest
    gaussians sit on the vertex so drift ~0, but on a sparsely-sampled surface
    curvature pulls the median slightly inward — assert it stays bounded/small."""
    template = _open_cap(radius=1.0)
    verts = np.asarray(template.vertices, np.float64)
    faces = np.asarray(template.faces)
    vnormals = np.asarray(template.vertex_normals, np.float64)
    diag = float(np.linalg.norm(verts.max(0) - verts.min(0)))
    fitted = R._fit_template_to_gaussians(verts, faces, vnormals, verts.copy(), iters=3)
    assert np.linalg.norm(fitted - verts, axis=1).max() < 0.03 * diag


def test_weld_flushes_head_ring_onto_body_and_spares_interior():
    head = _open_cap(radius=0.5)
    head.apply_translation([0.0, 1.5, 0.0])  # float the head above the body
    body = trimesh.creation.box(extents=[2.0, 1.0, 2.0])  # centred at origin

    hverts = np.asarray(head.vertices, np.float64)
    ring = R._boundary_vertex_mask(np.asarray(head.faces), len(hverts), dilate=0)
    from scipy.spatial import cKDTree
    bt = cKDTree(np.asarray(body.vertices, np.float64))
    gap_before = float(bt.query(hverts[ring])[0].mean())

    welded = R._weld_head_to_body(head, body, blend_ring=0.5)
    wverts = np.asarray(welded.vertices, np.float64)
    gap_after = float(bt.query(wverts[ring])[0].mean())

    assert gap_after < gap_before, "the ring must move toward the body surface"
    far = _far_interior_vertex(hverts, ring)
    apex_shift = np.linalg.norm(wverts[far] - hverts[far])
    ring_shift = np.linalg.norm(wverts[ring] - hverts[ring], axis=1).mean()
    assert apex_shift < ring_shift, "the far interior must move less than the ring"


def test_weld_is_a_noop_when_head_has_no_open_boundary():
    closed = trimesh.creation.icosphere(subdivisions=2, radius=0.5)
    body = trimesh.creation.box(extents=[2.0, 2.0, 2.0])
    welded = R._weld_head_to_body(closed, body, blend_ring=0.5)
    assert np.allclose(welded.vertices, closed.vertices), "no boundary -> nothing to weld"


def test_seam_color_blend_pulls_ring_toward_body_and_keeps_identity_inside():
    head = _open_cap(radius=0.5)
    nv = len(head.vertices)
    head.visual = trimesh.visual.ColorVisuals(
        head, vertex_colors=np.tile([255, 0, 0, 255], (nv, 1)).astype(np.uint8)
    )
    body = trimesh.creation.box(extents=[2.0, 1.0, 2.0])
    bnv = len(body.vertices)
    body.visual = trimesh.visual.ColorVisuals(
        body, vertex_colors=np.tile([0, 0, 255, 255], (bnv, 1)).astype(np.uint8)
    )

    rgba = R._blend_seam_colors(head, body, blend_ring=0.5)
    assert rgba.shape == (nv, 4)

    ring = R._boundary_vertex_mask(np.asarray(head.faces), nv, dilate=0)
    blue = rgba[:, 2].astype(float)
    red = rgba[:, 0].astype(float)
    assert blue[ring].mean() > blue[~ring].mean(), "the seam ring gains the body's blue"
    far = _far_interior_vertex(np.asarray(head.vertices, np.float64), ring)
    assert red[far] > 200, "the head interior keeps its identity albedo"


def _write_synthetic_splat(path, xyz, rgb):
    """Write a minimal 3DGS-style PLY (x,y,z,f_dc_0..2,opacity) with high opacity so
    every gaussian survives the opacity filter. Colors are encoded as SH DC coeffs."""
    plyfile = pytest.importorskip("plyfile")
    fdc = (np.asarray(rgb, np.float64) - 0.5) / R.SH_C0
    n = len(xyz)
    arr = np.zeros(n, dtype=[(k, "f4") for k in
                            ("x", "y", "z", "f_dc_0", "f_dc_1", "f_dc_2", "opacity")])
    arr["x"], arr["y"], arr["z"] = xyz[:, 0], xyz[:, 1], xyz[:, 2]
    arr["f_dc_0"], arr["f_dc_1"], arr["f_dc_2"] = fdc[:, 0], fdc[:, 1], fdc[:, 2]
    arr["opacity"] = 6.0
    plyfile.PlyData([plyfile.PlyElement.describe(arr, "vertex")]).write(str(path))


def test_splat_to_glb_end_to_end_with_real_template(tmp_path):
    """Full #2 path: a synthetic splat sampled on the FLAME template frame ->
    fit + color transfer -> a valid vertex-colored GLB. Skips where the vendored
    template is absent (e.g. CI without the GPU vendor tree)."""
    try:
        template = R._load_template_mesh()
    except Exception:
        pytest.skip("vendored FLAME template not present")

    tv = np.asarray(template.vertices, np.float64)
    rng = np.random.default_rng(0)
    sub = rng.choice(len(tv), size=min(4000, len(tv)), replace=False)
    cloud = tv[sub] + rng.normal(scale=1e-3, size=(len(sub), 3))
    span = tv.max(0) - tv.min(0)
    rgb = np.clip((tv[sub] - tv.min(0)) / np.where(span == 0, 1, span), 0, 1)
    splat = tmp_path / "point_cloud.ply"
    _write_synthetic_splat(splat, cloud, rgb)

    out = tmp_path / "head.glb"
    meta = R.splat_to_glb(splat, out, fit_shape=True)
    assert out.is_file() and out.stat().st_size > 0
    assert meta["shape_fit"] is True
    assert meta["vertices"] == len(tv)
    assert meta["gaussians"] == len(sub)
    reloaded = trimesh.load(str(out), force="mesh", process=False)
    assert len(reloaded.vertices) == len(tv)
