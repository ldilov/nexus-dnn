import asyncio

from trellis2_worker.main import Worker, base_release_memory


def test_base_release_memory_torch_free_returns_zeros():
    stats = base_release_memory()
    assert stats == {"vram_used_mb": 0, "vram_total_mb": 0, "freed_mb": 0}


def test_release_memory_handler_registered_and_callable():
    worker = Worker(profile="fake")
    handler = worker._handlers["runtime.release_memory"]
    stats = asyncio.new_event_loop().run_until_complete(handler(None))
    assert set(stats) == {"vram_used_mb", "vram_total_mb", "freed_mb"}


def test_intrinsic_methods_registered():
    worker = Worker(profile="fake")
    for method in ("handshake", "trellis2.runtime.health", "shutdown", "runtime.release_memory"):
        assert method in worker._handlers
