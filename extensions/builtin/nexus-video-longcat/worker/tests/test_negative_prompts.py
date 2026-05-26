from __future__ import annotations

from longcat_video_worker import negative_prompts as np


def test_catalog_categories_present():
    assert "melt" in np.ALL_CATEGORIES
    assert "deform" in np.ALL_CATEGORIES
    assert "identity_drift" in np.ALL_CATEGORIES
    assert "motion_artifact" in np.ALL_CATEGORIES


def test_compose_merges_categories():
    out = np.compose(["melt", "deform"])
    assert "melting" in out
    assert "deformed" in out


def test_compose_dedupes_tokens():
    out = np.compose(["melt", "melt"])
    assert out.count("melting") == 1


def test_compose_with_user_negative_prefix():
    out = np.compose(["melt"], user_negative="low quality, blurry")
    parts = [p.strip() for p in out.split(",")]
    assert parts[0] == "low quality"
    assert parts[1] == "blurry"
    assert "melting" in parts


def test_compose_empty_categories_returns_user_negative():
    out = np.compose([], user_negative="low quality")
    assert out == "low quality"


def test_compose_unknown_category_ignored():
    out = np.compose(["does_not_exist", "melt"])
    assert "melting" in out


def test_compose_is_deterministic_order():
    a = np.compose(["melt", "deform"])
    b = np.compose(["melt", "deform"])
    assert a == b
