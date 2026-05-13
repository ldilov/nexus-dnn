"""Tests for worker input-safety helpers.

These cover the boundary checks the worker RPC handlers rely on:
``sanitize_run_id``, ``sanitize_workdir``, ``ensure_dict``, and
``truncate_for_log``. The goal is fail-fast on malformed inputs so a
crafted JSON-RPC call can't escape the runs-dir sandbox or hang a
later handler with ``AttributeError``.
"""

from __future__ import annotations

from pathlib import Path

import pytest

from ltx_video_worker.io_safety import (
    ensure_dict,
    sanitize_run_id,
    sanitize_workdir,
    truncate_for_log,
)


# --- sanitize_run_id --------------------------------------------------------


@pytest.mark.parametrize(
    "ok",
    [
        "01JABCDEFGHJKMNPQRSTVWXYZ0",  # ULID shape
        "run_a1b2c3d4e5f6",            # uuid hex fallback
        "run_test_001",                # test fixture pattern
        "abc-def_123",                 # mixed dash/underscore
        "A",                           # minimal
        "0" * 64,                      # max length
    ],
)
def test_sanitize_run_id_accepts_valid(ok: str) -> None:
    assert sanitize_run_id(ok) == ok


@pytest.mark.parametrize(
    "bad",
    [
        "../escape",       # path traversal
        "with/slash",      # forward slash
        "with\\back",      # backslash
        "with.dot",        # dot — disallowed for path-component safety
        "with space",      # whitespace
        "",                # empty
        "0" * 65,          # too long
        "x\x00null",       # null byte
    ],
)
def test_sanitize_run_id_rejects_invalid(bad: str) -> None:
    with pytest.raises(ValueError):
        sanitize_run_id(bad)


def test_sanitize_run_id_uses_fallback_when_input_missing() -> None:
    assert sanitize_run_id(None, fallback="run_fallback") == "run_fallback"
    assert sanitize_run_id("", fallback="run_fallback") == "run_fallback"


def test_sanitize_run_id_rejects_non_string_without_fallback() -> None:
    with pytest.raises(ValueError):
        sanitize_run_id(42)


# --- sanitize_workdir -------------------------------------------------------


def test_sanitize_workdir_returns_fallback_for_none(tmp_path: Path) -> None:
    fb = tmp_path / "fallback"
    assert sanitize_workdir(None, fallback=fb) == fb


def test_sanitize_workdir_returns_fallback_for_empty_string(tmp_path: Path) -> None:
    fb = tmp_path / "fallback"
    assert sanitize_workdir("", fallback=fb) == fb
    assert sanitize_workdir("   ", fallback=fb) == fb


def test_sanitize_workdir_accepts_clean_relative_path(tmp_path: Path) -> None:
    fb = tmp_path / "fb"
    assert sanitize_workdir("runs/abc/work", fallback=fb) == Path("runs/abc/work")


def test_sanitize_workdir_accepts_clean_absolute_path(tmp_path: Path) -> None:
    fb = tmp_path / "fb"
    abs_path = tmp_path / "some" / "where"
    assert sanitize_workdir(str(abs_path), fallback=fb) == abs_path


@pytest.mark.parametrize(
    "bad",
    [
        "../escape",
        "good/../escape",
        "/abs/../escape",
        "a/b/c/..",
    ],
)
def test_sanitize_workdir_rejects_path_traversal(bad: str, tmp_path: Path) -> None:
    with pytest.raises(ValueError, match=r"\.\."):
        sanitize_workdir(bad, fallback=tmp_path)


def test_sanitize_workdir_rejects_non_string(tmp_path: Path) -> None:
    with pytest.raises(ValueError, match="must be a string"):
        sanitize_workdir(42, fallback=tmp_path)


# --- ensure_dict ------------------------------------------------------------


def test_ensure_dict_returns_value_when_dict() -> None:
    assert ensure_dict({"a": 1}, name="plan") == {"a": 1}


def test_ensure_dict_returns_default_for_falsy() -> None:
    assert ensure_dict(None, name="plan") == {}
    assert ensure_dict({}, name="plan", default={"k": "v"}) == {"k": "v"}


def test_ensure_dict_rejects_non_dict_non_falsy() -> None:
    with pytest.raises(ValueError, match="plan"):
        ensure_dict("not-a-dict", name="plan")
    with pytest.raises(ValueError, match="plan"):
        ensure_dict([1, 2, 3], name="plan")


# --- truncate_for_log -------------------------------------------------------


def test_truncate_for_log_passthrough_under_cap() -> None:
    short = "x" * 100
    assert truncate_for_log(short) == short


def test_truncate_for_log_truncates_long_messages() -> None:
    long = "x" * 5000
    out = truncate_for_log(long, max_chars=2048)
    assert len(out) < 5000
    assert out.endswith("chars]")
    assert "truncated" in out


def test_truncate_for_log_respects_custom_cap() -> None:
    out = truncate_for_log("y" * 1000, max_chars=200)
    assert len(out) < 300
    assert "truncated" in out
