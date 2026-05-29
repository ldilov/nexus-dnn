from svi2_video_worker.expert_router import ExpertSelector


def test_one_way_switch_at_boundary():
    sel = ExpertSelector(boundary=0.875)
    assert sel.select(timestep=999) == "high"
    assert sel.select(timestep=900) == "high"
    assert sel.select(timestep=870) == "low"   # crossed
    assert sel.select(timestep=950) == "low"    # stays low (one-way)


def test_boundary_uses_scaled_threshold():
    sel = ExpertSelector(boundary=0.875)
    assert sel.threshold == 875.0


def test_reset_returns_to_high():
    sel = ExpertSelector(boundary=0.875)
    sel.select(timestep=100)
    assert sel.select(timestep=999) == "low"   # latched
    sel.reset()
    assert sel.select(timestep=999) == "high"
