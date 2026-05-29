from svi2_video_worker.vae import VaeWrapper
from svi2_video_worker.text_encoder import TextEncoderWrapper


def test_vae_wrapper_interface():
    assert hasattr(VaeWrapper, "encode_image") and hasattr(VaeWrapper, "decode_latents")
    assert hasattr(VaeWrapper, "to_cpu") and hasattr(VaeWrapper, "to_cuda")


def test_text_encoder_interface():
    assert hasattr(TextEncoderWrapper, "encode_text")
    assert hasattr(TextEncoderWrapper, "to_cpu") and hasattr(TextEncoderWrapper, "to_cuda")


def test_wrappers_construct_without_loading(tmp_path):
    # constructing with a weights path must NOT load the model (lazy)
    v = VaeWrapper(weights_path=tmp_path / "vae.safetensors")
    t = TextEncoderWrapper(weights_path=tmp_path / "t5.safetensors")
    assert v is not None and t is not None
