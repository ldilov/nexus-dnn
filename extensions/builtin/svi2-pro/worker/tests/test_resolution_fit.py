from __future__ import annotations

import pytest

from svi2_video_worker.resolution import fit_to_resolution

Image = pytest.importorskip("PIL.Image")


def _solid(w: int, h: int, color: tuple[int, int, int] = (10, 20, 30)):
    return Image.new("RGB", (w, h), color)


def test_landscape_source_to_landscape_box_exact_dims():
    out = fit_to_resolution(_solid(1920, 1080), 832, 480)
    assert out.size == (832, 480)


def test_portrait_source_to_landscape_box_no_stretch():
    # 9:16 source into 832x480 (16:9) — cover-crop must not squash; output is
    # exactly the box and a centre vertical slice of the upscaled source.
    out = fit_to_resolution(_solid(540, 960), 832, 480)
    assert out.size == (832, 480)


def test_square_source_to_portrait_box():
    out = fit_to_resolution(_solid(1024, 1024), 480, 832)
    assert out.size == (480, 832)


def test_exact_match_is_passthrough():
    src = _solid(832, 480)
    out = fit_to_resolution(src, 832, 480)
    assert out is src


def test_tiny_source_upscaled_to_box():
    out = fit_to_resolution(_solid(100, 50), 832, 480)
    assert out.size == (832, 480)


def test_centre_crop_keeps_centre_content():
    # Left half black, right half white in a wide source; cropping to a tall box
    # must keep a centred vertical strip — straddling the black/white seam.
    img = Image.new("RGB", (800, 400), (0, 0, 0))
    for x in range(400, 800):
        for y in range(400):
            img.putpixel((x, y), (255, 255, 255))
    out = fit_to_resolution(img, 100, 400)
    px = out.load()
    assert px[10, 200] == (0, 0, 0)
    assert px[90, 200] == (255, 255, 255)
