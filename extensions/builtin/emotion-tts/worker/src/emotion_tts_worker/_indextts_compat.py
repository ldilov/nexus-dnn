"""Cross-platform compatibility shims for upstream IndexTTS.

IndexTTS v1.5.0 declares `wetextprocessing` as a dependency, which
transitively requires `pynini`. `pynini` ships only Linux wheels and its
sdist relies on GCC-only compiler flags (`-Wno-register`) that MSVC
rejects with `D8021`. Result: the upstream package set will not install
on Windows.

We replace `wetextprocessing` with `wetext` (declared as a direct dep in
this worker's `pyproject.toml`, with a uv override-dependency that drops
`wetextprocessing` from the resolution graph). `wetext` is pure-Python
and ships Windows wheels for its native dep `kaldifst`.

IndexTTS already uses `wetext` on Darwin via `TextNormalizer.load()` —
see `indextts/utils/front.py`. This shim extends that branch to every
platform by replacing the method at import time. The behaviour is
unchanged on macOS; on Windows and Linux it now matches macOS instead
of attempting to import `tn.chinese.normalizer` / `tn.english.normalizer`.

Side effects: idempotent. Calling the patcher twice replaces the bound
method with an identical callable.
"""

from __future__ import annotations


def _load_via_wetext(self) -> None:
    if self.zh_normalizer is not None and self.en_normalizer is not None:
        return
    from wetext import Normalizer

    self.zh_normalizer = Normalizer(remove_erhua=False, lang="zh", operator="tn")
    self.en_normalizer = Normalizer(lang="en", operator="tn")


def patch_indextts_text_normalizer() -> None:
    """Replace `indextts.utils.front.TextNormalizer.load` with a
    wetext-backed implementation that works on every platform IndexTTS
    targets, including Windows."""
    import indextts.utils.front as _front

    _front.TextNormalizer.load = _load_via_wetext
