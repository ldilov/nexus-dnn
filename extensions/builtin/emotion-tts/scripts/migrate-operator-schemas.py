"""One-shot migration — rewrap legacy operator/recipe YAMLs into the current schema.

Legacy shape was flat:
    id: "emotiontts.audio.postprocess@1.0.0"
    display_name: "..."
    inputs: [...]
    outputs: [...]

Current schema requires:
    spec_version: "0.1"
    operator:
      id: "emotiontts.audio.postprocess"
      version: "1.0.0"
      display_name: "..."
      description: "..."
    inputs: [{name, type, required, default?}]
    outputs: [{name, type}]

Recipe equivalent uses the ``recipe:`` wrapper with id/version/display_name/summary/category.

Run once from the repo root:
    python extensions/builtin/emotion-tts/scripts/migrate-operator-schemas.py
"""

from __future__ import annotations

from pathlib import Path

import yaml

ROOT = Path(__file__).resolve().parent.parent
OPS = ROOT / "operators"
RECIPES = ROOT / "recipes"

SCHEMA_ALLOWED_TYPES = {
    "string",
    "number",
    "integer",
    "boolean",
    "object",
    "array",
    "enum",
}


def split_versioned_id(raw: str) -> tuple[str, str]:
    if "@" in raw:
        base, version = raw.rsplit("@", 1)
    else:
        base, version = raw, "1.0.0"
    return base, version


def clean_inputs(raw: list[dict]) -> list[dict]:
    cleaned: list[dict] = []
    for item in raw:
        entry = {
            "name": str(item["name"]),
            "type": str(item.get("type", "string")),
        }
        # Schema demands `required` on every input.
        entry["required"] = bool(item.get("required", False))
        if "default" in item:
            entry["default"] = item["default"]
        # `values` on enums is not allowed by the current schema; drop it.
        cleaned.append(entry)
    return cleaned


def clean_outputs(raw: list[dict]) -> list[dict]:
    return [
        {"name": str(item["name"]), "type": str(item.get("type", "string"))}
        for item in raw
    ]


def migrate_operator(path: Path) -> None:
    with path.open("r", encoding="utf-8") as fh:
        data = yaml.safe_load(fh) or {}
    if "operator" in data and "spec_version" in data:
        return  # already migrated
    base, version = split_versioned_id(str(data["id"]))
    out: dict = {
        "spec_version": "0.1",
        "operator": {
            "id": base,
            "version": version,
        },
    }
    if "display_name" in data:
        out["operator"]["display_name"] = data["display_name"]
    if "description" in data:
        out["operator"]["description"] = data["description"]
    if "category" in data:
        out["operator"]["category"] = data["category"]
    if "inputs" in data:
        out["inputs"] = clean_inputs(data["inputs"])
    if "outputs" in data:
        out["outputs"] = clean_outputs(data["outputs"])
    with path.open("w", encoding="utf-8") as fh:
        yaml.safe_dump(out, fh, sort_keys=False, default_flow_style=False)


def migrate_recipe(path: Path) -> None:
    with path.open("r", encoding="utf-8") as fh:
        data = yaml.safe_load(fh) or {}
    if "recipe" in data and "spec_version" in data:
        return
    out: dict = {
        "spec_version": "0.1",
        "recipe": {
            "id": str(data.get("id", path.stem)),
            "version": str(data.get("version", "1.0.0")),
            "display_name": str(data.get("display_name", path.stem)),
            "summary": str(
                data.get("description") or data.get("summary") or data.get("display_name", "")
            ),
            "category": str(data.get("category", "tts.dialogue")),
        },
    }
    if "input_summary" in data:
        out["recipe"]["input_summary"] = data["input_summary"]
    if "thumbnail" in data:
        out["recipe"]["thumbnail"] = data["thumbnail"]
    # Preserve the workflow reference + any fields the host parses permissively
    # under workflow_template by tucking them into a loose block the schema
    for key, value in data.items():
        if key in {"id", "version", "display_name", "summary", "description", "category"}:
            continue
        out[key] = value
    with path.open("w", encoding="utf-8") as fh:
        yaml.safe_dump(out, fh, sort_keys=False, default_flow_style=False)


def main() -> None:
    for op_file in sorted(OPS.glob("*.yaml")):
        migrate_operator(op_file)
        print(f"migrated operator: {op_file.name}")
    for recipe_file in sorted(RECIPES.glob("*.yaml")):
        migrate_recipe(recipe_file)
        print(f"migrated recipe:   {recipe_file.name}")


if __name__ == "__main__":
    main()
