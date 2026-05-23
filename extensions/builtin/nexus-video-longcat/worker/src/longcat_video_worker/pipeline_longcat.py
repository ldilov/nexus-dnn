"""LongCat-Video pipeline adapter (stub).

Wraps the upstream four-method API
(`generate_t2v`, `generate_i2v`, `generate_vc`, `generate_refine`)
behind a uniform `render(...)` call so the host JSON-RPC layer
treats LongCat identically to LTX-2/LTX-2.3/LTXV-0.9.7 from
`pipeline_ltx2.py`.

Upstream pipeline signature reference (from
`longcat_video/pipeline_longcat_video.py`, probe 2026-05-23):

    class LongCatVideoPipeline:
        def __init__(self, tokenizer, text_encoder, vae,
                     scheduler, dit): ...
        def generate_t2v(self, prompt, negative_prompt=None,
                         height=480, width=832, num_frames=93,
                         num_inference_steps=50, use_distill=False,
                         guidance_scale=4.0, max_sequence_length=512,
                         ...): ...
        def generate_i2v(self, image, prompt, ...): ...
        def generate_vc(self, conditioning_video, prompt, ...): ...
        def generate_refine(self, low_res_video, prompt, ...): ...

Distill profile drives `use_distill=True`, `guidance_scale=1.0`,
`num_inference_steps=12`, `shift=12.0`.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Literal, Optional


RenderMode = Literal["t2v", "i2v", "vc", "refine"]


@dataclass
class LongCatRenderRequest:
    mode: RenderMode
    prompt: str
    negative_prompt: Optional[str] = None
    image_path: Optional[str] = None  # i2v only
    conditioning_video_path: Optional[str] = None  # vc only
    low_res_video_path: Optional[str] = None  # refine only
    height: int = 480
    width: int = 832
    num_frames: int = 93
    num_inference_steps: int = 50
    guidance_scale: float = 4.0
    use_distill: bool = False
    seed: Optional[int] = None
    max_sequence_length: int = 512
    # Offload knobs, pass-through to upstream LongCatVideoPipeline.generate_*
    # `offload_kv_cache=True` moves per-block (k_cache, v_cache) to CPU between
    # blocks during `forward_with_kv_cache` (continuation rendering).
    # See longcat_video/modules/longcat_video_dit.py:290,351 and
    # pipeline_longcat_video.py:330,895.
    offload_kv_cache: bool = False


def render(request: LongCatRenderRequest) -> object:
    """Dispatch to the matching upstream generate_* method.

    Returns the decoded video tensor (or numpy array, matching
    ``output_type='np'`` upstream default).
    """

    del request
    raise NotImplementedError(
        "LongCat pipeline stub; awaits build_dit + load_longcat_fp8 + "
        "vendored Wan VAE + UMT5-XXL text encoder wiring."
    )


def register_longcat_handlers(worker: Any, *, use_distill: bool = False) -> None:
    """Register the LongCat-Video render RPC handlers on ``worker``.

    Wires ``longcat.video.render.start`` to dispatch via :func:`render`.
    When ``use_distill`` is True the handler forces ``use_distill=True``
    and CFG=1.0 / 12 steps on the request payload before dispatch.

    Both real-profile branches in ``__main__.py`` call this; the actual
    pipeline body raises ``NotImplementedError`` until the vendored DiT
    + UMT5-XXL + Wan VAE wiring lands.
    """

    async def _render_start(params: dict[str, Any]) -> dict[str, Any]:
        if use_distill:
            params.setdefault("use_distill", True)
            params.setdefault("guidance_scale", 1.0)
            params.setdefault("num_inference_steps", 12)
        request = LongCatRenderRequest(
            mode=params.get("mode", "t2v"),
            prompt=params["prompt"],
            negative_prompt=params.get("negative_prompt"),
            image_path=params.get("image_path"),
            conditioning_video_path=params.get("conditioning_video_path"),
            low_res_video_path=params.get("low_res_video_path"),
            height=int(params.get("height", 480)),
            width=int(params.get("width", 832)),
            num_frames=int(params.get("num_frames", 93)),
            num_inference_steps=int(params.get("num_inference_steps", 50)),
            guidance_scale=float(params.get("guidance_scale", 4.0)),
            use_distill=bool(params.get("use_distill", use_distill)),
            seed=params.get("seed"),
            max_sequence_length=int(params.get("max_sequence_length", 512)),
            offload_kv_cache=bool(params.get("offload_kv_cache", False)),
        )
        try:
            return {"status": "ok", "result": str(render(request))}
        except NotImplementedError as e:
            return {
                "status": "error",
                "code": -32603,
                "message": f"pipeline not yet implemented: {e}",
            }

    worker.register("longcat.video.render.start", _render_start)
