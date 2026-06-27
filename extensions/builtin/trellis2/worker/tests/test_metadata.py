from trellis2_worker.metadata import build_metadata


def test_build_metadata_full_shape():
    meta = build_metadata(
        profile="gb10-flash",
        attention_backend="flash_attn",
        compute_cap="12.1",
        native_sm121=True,
        load_s=61.4,
        run_s=208.2,
        vertices=120_000,
        faces=240_000,
        fallbacks=[],
        dinov3_model="facebook/dinov3-vitl16-pretrain-lvd1689m",
        residency="balanced",
        tf32=True,
    )
    assert meta["attention_backend"] == "flash_attn"
    assert meta["compute_cap"] == "12.1"
    assert meta["native_sm121"] is True
    assert meta["stage_timings"] == {"load_s": 61.4, "run_s": 208.2}
    assert meta["mesh"] == {"vertices": 120_000, "faces": 240_000}
    assert meta["fallbacks"] == []
    assert meta["profile"] == "gb10-flash"
    assert meta["models"]["trellis"] == "microsoft/TRELLIS.2-4B"
    assert meta["models"]["dinov3"] == "facebook/dinov3-vitl16-pretrain-lvd1689m"
    assert meta["perf"] == {"residency": "balanced", "tf32": True}


def test_perf_profile_reflects_low_vram_and_disabled_tf32():
    meta = build_metadata(
        profile="gb10-flash",
        attention_backend="flash_attn",
        compute_cap="12.1",
        native_sm121=True,
        load_s=1.0,
        run_s=2.0,
        vertices=1,
        faces=1,
        fallbacks=[],
        residency="low_vram",
        tf32=False,
    )
    assert meta["perf"] == {"residency": "low_vram", "tf32": False}


def test_perf_profile_defaults_to_balanced_tf32_on():
    meta = build_metadata(
        profile="fake",
        attention_backend="none",
        compute_cap="0.0",
        native_sm121=False,
        load_s=0.0,
        run_s=0.0,
        vertices=1,
        faces=1,
        fallbacks=[],
    )
    assert meta["perf"] == {"residency": "balanced", "tf32": True}


def test_fallbacks_list_is_copied_not_aliased():
    src = ["a"]
    meta = build_metadata(
        profile="fake",
        attention_backend="none",
        compute_cap="0.0",
        native_sm121=False,
        load_s=0.0,
        run_s=0.0,
        vertices=3,
        faces=1,
        fallbacks=src,
    )
    src.append("b")
    assert meta["fallbacks"] == ["a"]
