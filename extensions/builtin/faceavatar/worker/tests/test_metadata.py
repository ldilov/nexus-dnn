from faceavatar_worker.metadata import (
    MODEL_ARC2AVATAR,
    MODEL_ARCFACE,
    MODEL_FLAME,
    build_metadata,
)


def _build(**overrides):
    base = dict(
        profile="fake",
        operator="generate_head",
        attention_backend="none",
        compute_cap="0.0",
        native_sm121=False,
        load_s=0.0,
        run_s=0.0,
        vertices=3,
        faces=1,
        fallbacks=[],
    )
    base.update(overrides)
    return build_metadata(**base)


def test_metadata_has_frozen_keys():
    meta = _build()
    for key in (
        "operator",
        "attention_backend",
        "compute_cap",
        "native_sm121",
        "stage_timings",
        "mesh",
        "fallbacks",
        "profile",
        "models",
        "perf",
    ):
        assert key in meta, key


def test_metadata_models_block_is_identity_stack():
    meta = _build()
    assert meta["models"]["flame"] == MODEL_FLAME
    assert meta["models"]["arcface"] == MODEL_ARCFACE
    assert meta["models"]["arc2avatar"] == MODEL_ARC2AVATAR


def test_metadata_stage_timings_rounded():
    meta = _build(load_s=1.23456, run_s=9.87654)
    assert meta["stage_timings"]["load_s"] == 1.235
    assert meta["stage_timings"]["run_s"] == 9.877


def test_metadata_operator_threaded_through():
    assert _build(operator="graft_head")["operator"] == "graft_head"


def test_metadata_extra_merged():
    meta = _build(extra={"seam": "neck", "align": "landmark"})
    assert meta["seam"] == "neck"
    assert meta["align"] == "landmark"


def test_metadata_perf_block():
    meta = _build(residency="low_vram", tf32=False)
    assert meta["perf"] == {"residency": "low_vram", "tf32": False}
