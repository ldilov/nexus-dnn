from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[2]

_EXPECTED_STAGES = ["anchor", "qwen_edit", "diffusion", "stitch", "interpolate", "mux"]


def _workflow() -> dict:
    return yaml.safe_load((ROOT / "workflows" / "svi2_render.yaml").read_text())["workflow"]


def test_workflow_declares_render_pipeline_stages_in_order():
    wf = _workflow()
    stage_ids = [s["id"] for s in wf["stages"]]
    assert stage_ids == _EXPECTED_STAGES


def test_workflow_nodes_map_to_declared_stages():
    wf = _workflow()
    stage_ids = {s["id"] for s in wf["stages"]}
    for node in wf["nodes"]:
        assert node["stage"] in stage_ids, node["id"]


def test_workflow_edges_reference_existing_nodes():
    wf = _workflow()
    node_ids = {n["id"] for n in wf["nodes"]}
    for edge in wf["edges"]:
        assert edge["sourceNode"] in node_ids
        assert edge["targetNode"] in node_ids


def test_recipe_invokes_registered_operator():
    recipe = yaml.safe_load((ROOT / "recipes" / "svi2_render.yaml").read_text())
    operator_id = recipe["actions"][0]["operator_invoke"]["operator"]
    op = yaml.safe_load((ROOT / "operators" / "svi2_render.yaml").read_text())
    assert op["id"] == operator_id
    manifest = yaml.safe_load((ROOT / "manifest.yaml").read_text())
    files = {o["file"] for o in manifest["operators"]}
    assert "operators/svi2_render.yaml" in files
