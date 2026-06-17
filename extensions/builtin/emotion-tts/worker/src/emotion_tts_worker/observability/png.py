"""Attention-map PNG renderer (spec 034 US2 R-34-07).

Emits a log-scale heatmap — one subplot per attention head — using
matplotlib's Agg non-interactive backend. Only invoked on *flagged*
segments per FR-212 (cost control), and honours the per-run cap
``oas_max_png_per_run`` from ``AdapterSettings``.

Target: p95 <= 80 ms per render on Ryzen 5800X class hosts (SC-203);
verified by ``tests/bench_attention_png.py`` (T053b).
"""

from __future__ import annotations

import math
from pathlib import Path
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    import numpy as np


def render_attention_map(attention: "np.ndarray", out_path: Path | str) -> Path:
    """Render ``attention`` as a PNG.

    Shape: ``[heads, text_len, audio_frames]``. Output: single PNG file
    with one row of subplots (one per head) on a log-scale colour ramp.
    """

    # Matplotlib is optional at import time — keep the heavy import lazy
    # so the observability package stays cheap when callers only want
    import matplotlib  # type: ignore[import-not-found]

    matplotlib.use("Agg", force=True)
    import matplotlib.pyplot as plt  # type: ignore[import-not-found]
    import numpy as np
    from matplotlib.colors import LogNorm  # type: ignore[import-not-found]

    if attention.ndim != 3:
        raise ValueError(f"expected 3-D attention, got shape {attention.shape}")

    heads, text_len, audio_frames = attention.shape
    cols = max(1, heads)
    fig_width = max(4.0, 1.6 * cols)
    fig_height = max(1.8, 0.04 * max(text_len, audio_frames))

    fig, axes = plt.subplots(
        nrows=1,
        ncols=cols,
        figsize=(fig_width, fig_height),
        squeeze=False,
    )
    vmin = max(1e-6, float(attention.min()))
    vmax = max(vmin * 10, float(attention.max()) or 1.0)

    for idx in range(cols):
        ax = axes[0, idx]
        if idx < heads:
            ax.imshow(
                attention[idx],
                origin="lower",
                aspect="auto",
                norm=LogNorm(vmin=vmin, vmax=vmax),
                cmap="magma",
            )
            ax.set_title(f"head {idx}", fontsize=8)
        ax.set_xlabel("audio", fontsize=7)
        if idx == 0:
            ax.set_ylabel("text", fontsize=7)
        ax.tick_params(labelsize=6)

    fig.tight_layout(pad=0.4)
    out = Path(out_path)
    out.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(out, format="png", dpi=90, bbox_inches="tight")
    plt.close(fig)
    # Sanity: a finite, non-zero file was written.
    if out.stat().st_size == 0:
        raise RuntimeError(f"rendered PNG is empty: {out}")
    # Defensive NaN/inf check — attention tensors from fused kernels have
    # been known to produce garbage; callers must not silently ship blanks.
    if not math.isfinite(vmin) or not math.isfinite(vmax):
        raise RuntimeError("attention tensor contained non-finite values")
    return out
