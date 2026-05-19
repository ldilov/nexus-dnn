from __future__ import annotations

import pytest

pytest.importorskip("PIL")
pytest.importorskip("numpy")

from ltx_video_worker.pipeline_ltxv097 import _cover_crop, _load_input_image


def _white_square_on_black(w: int, h: int, sq: int):
    from PIL import Image, ImageDraw

    img = Image.new("RGB", (w, h), (0, 0, 0))
    d = ImageDraw.Draw(img)
    cx, cy = w // 2, h // 2
    d.rectangle(
        [cx - sq // 2, cy - sq // 2, cx + sq // 2, cy + sq // 2],
        fill=(255, 255, 255),
    )
    return img


def _white_bbox_aspect(img) -> float:
    import numpy as np

    a = np.asarray(img.convert("L"))
    ys, xs = np.where(a > 200)
    bw = xs.max() - xs.min() + 1
    bh = ys.max() - ys.min() + 1
    return bw / bh


def test_cover_crop_exact_target_dims_for_mismatched_aspect():
    # 3:2 source -> 16:9 target (the real nun-portrait -> 960x540 case).
    src = _white_square_on_black(1536, 1024, 400)
    out = _cover_crop(src, 960, 540)
    assert out.size == (960, 540)


def test_cover_crop_does_not_distort_subject():
    # A centered SQUARE must stay ~square (a naive stretch would skew
    # its aspect to ~16/9 / (3/2) = ~1.19). Cover-crop preserves it.
    src = _white_square_on_black(1536, 1024, 400)
    out = _cover_crop(src, 960, 540)
    ar = _white_bbox_aspect(out)
    assert 0.93 < ar < 1.07, f"subject distorted: bbox aspect {ar:.3f}"


def test_cover_crop_portrait_into_landscape_preserves_aspect():
    src = _white_square_on_black(720, 1280, 240)  # 9:16 -> 16:9
    out = _cover_crop(src, 960, 540)
    assert out.size == (960, 540)
    ar = _white_bbox_aspect(out)
    assert 0.90 < ar < 1.10, f"subject distorted: bbox aspect {ar:.3f}"


def test_load_input_image_missing_path_is_solid_target():
    img = _load_input_image(None, 960, 540)
    assert img.size == (960, 540)


def test_load_input_image_exact_size_passthrough(tmp_path):
    from PIL import Image

    p = tmp_path / "exact.png"
    Image.new("RGB", (960, 540), (10, 20, 30)).save(p)
    img = _load_input_image(str(p), 960, 540)
    assert img.size == (960, 540)


def test_load_input_image_cover_crops_mismatched_file(tmp_path):
    from PIL import Image

    p = tmp_path / "ref.png"
    Image.new("RGB", (1536, 1024), (200, 30, 30)).save(p)
    img = _load_input_image(str(p), 960, 540)
    assert img.size == (960, 540)
