import asyncio

from svi2_video_worker.presets import load_presets, presets_path, register_preset_handlers


class _Worker:
    def __init__(self):
        self.handlers = {}

    def register(self, method, handler):
        self.handlers[method] = handler


def test_presets_path_resolves_to_data_file():
    p = presets_path()
    assert p.name == "render_presets.json"
    assert p.exists()


def test_load_presets_returns_all_eleven():
    data = load_presets()
    assert data["version"] == 1
    assert len(data["presets"]) == 11


def test_register_preset_handlers_exposes_list_method():
    w = _Worker()
    register_preset_handlers(w)
    assert "svi2.presets.list" in w.handlers
    result = asyncio.get_event_loop().run_until_complete(w.handlers["svi2.presets.list"](None))
    ids = {p["id"] for p in result["presets"]}
    assert "svi-canonical" in ids
    assert len(ids) == 11
