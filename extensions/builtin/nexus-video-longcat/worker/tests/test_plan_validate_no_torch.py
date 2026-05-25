from __future__ import annotations

import ast
import importlib.util
from pathlib import Path

import pytest


def _module_source() -> str:
    spec = importlib.util.find_spec("longcat_video_worker.plan_validate")
    if spec is None or spec.origin is None:
        pytest.fail("longcat_video_worker.plan_validate module not found")
    return Path(spec.origin).read_text(encoding="utf-8")


def test_plan_validate_module_has_zero_torch_imports() -> None:
    source = _module_source()
    tree = ast.parse(source)
    offenders: list[str] = []
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                if alias.name == "torch" or alias.name.startswith("torch."):
                    offenders.append(f"import {alias.name}")
        elif isinstance(node, ast.ImportFrom):
            mod = node.module or ""
            if mod == "torch" or mod.startswith("torch."):
                offenders.append(f"from {mod} import ...")
    assert offenders == [], f"plan_validate must not import torch: {offenders}"


def test_plan_validate_module_has_zero_numpy_imports() -> None:
    source = _module_source()
    tree = ast.parse(source)
    offenders: list[str] = []
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            for alias in node.names:
                if alias.name == "numpy" or alias.name.startswith("numpy."):
                    offenders.append(f"import {alias.name}")
        elif isinstance(node, ast.ImportFrom):
            mod = node.module or ""
            if mod == "numpy" or mod.startswith("numpy."):
                offenders.append(f"from {mod} import ...")
    assert offenders == [], f"plan_validate must not import numpy: {offenders}"
