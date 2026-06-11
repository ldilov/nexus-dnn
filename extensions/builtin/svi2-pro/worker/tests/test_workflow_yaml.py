from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parents[2]

_EXPECTED_STAGES = ["anchor", "qwen_edit", "diffusion", "stitch", "interpolate", "mux"]


def _workflow() -> dict:
    return yaml.safe_load((ROOT / "workflows" / "svi2_render.yaml").read_text())["workflow"]


def _manifest() -> dict:
    return yaml.safe_load((ROOT / "manifest.yaml").read_text())


def _operator_ids() -> set[str]:
    ids: set[str] = set()
    for entry in _manifest()["operators"]:
        op = yaml.safe_load((ROOT / entry["file"]).read_text())["operator"]
        ids.add(op["id"])
    return ids


def test_workflow_declares_render_pipeline_stages_in_order():
    wf = _workflow()
    stage_ids = [s["id"] for s in wf["stages"]]
    assert stage_ids == _EXPECTED_STAGES


def test_workflow_nodes_map_to_declared_stages():
    wf = _workflow()
    stage_ids = {s["id"] for s in wf["stages"]}
    for node in wf["nodes"]:
        assert node["stage"] in stage_ids, node["id"]


def test_every_node_has_a_registered_operator():
    # The host parser requires `operator` on every node and derives the DAG
    # edges from `inputs.from`; the operator ref is `<id>@<version>`.
    wf = _workflow()
    registered = _operator_ids()
    for node in wf["nodes"]:
        ref = node["operator"]
        assert "@" in ref, node["id"]
        op_id = ref.split("@", 1)[0]
        assert op_id in registered, op_id


def test_node_input_refs_resolve_to_inputs_or_nodes():
    wf = _workflow()
    node_ids = {n["id"] for n in wf["nodes"]}
    input_names = {i["name"] for i in wf["inputs"]}
    for node in wf["nodes"]:
        for port in (node.get("inputs") or {}).values():
            ref = port["from"]
            head, _, tail = ref.partition(":")
            if head == "input":
                assert tail in input_names, ref
            else:
                assert head in node_ids, ref


def test_outputs_reference_existing_nodes():
    wf = _workflow()
    node_ids = {n["id"] for n in wf["nodes"]}
    for out in wf["outputs"]:
        assert out["from"].partition(":")[0] in node_ids, out["name"]


def test_recipe_declares_workflow_template_and_render_action():
    recipe = yaml.safe_load((ROOT / "recipes" / "svi2_render.yaml").read_text())
    assert recipe["workflow_template"] == "workflows/svi2_render.yaml"
    operator_id = recipe["actions"][0]["operator_invoke"]["operator"]
    op = yaml.safe_load((ROOT / "operators" / "video_render.yaml").read_text())["operator"]
    assert op["id"] == operator_id


def test_stage_operators_registered_in_manifest():
    files = {o["file"] for o in _manifest()["operators"]}
    for name in (
        "anchor_encode",
        "qwen_edit",
        "clip_diffusion",
        "stitch",
        "interpolate",
        "mux",
    ):
        assert f"operators/{name}.yaml" in files
