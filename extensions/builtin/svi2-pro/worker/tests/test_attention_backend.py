import pytest

torch = pytest.importorskip("torch")
from svi2_video_worker.attention_backend import scaled_attention, FLASH_AVAILABLE


def test_sdpa_path_shape():
    q = torch.randn(1, 8, 64, 40)
    k = torch.randn(1, 8, 64, 40)
    v = torch.randn(1, 8, 64, 40)
    out = scaled_attention(q, k, v, force_sdpa=True)
    assert out.shape == q.shape


def test_flash_flag_is_bool():
    assert isinstance(FLASH_AVAILABLE, bool)
