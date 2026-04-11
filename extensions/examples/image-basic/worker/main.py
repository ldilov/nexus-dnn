import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "sdk" / "python"))

from PIL import Image
from nexus_sdk.worker import BaseWorker


def resize_handler(
    inputs: dict,
    config: dict,
    context: "WorkerContext",
) -> dict:
    context.send_progress(10, "Loading image...")
    image_ref: str = inputs.get("image", {}).get("artifact_ref", "")
    image_path: str = image_ref.replace("artifact://", "")

    img: Image.Image = Image.open(image_path)
    width: int = config.get("width", img.width)
    height: int = config.get("height", img.height)
    resample_method: str = config.get("resample_method", "lanczos")

    resample_map: dict[str, int] = {
        "lanczos": Image.LANCZOS,
        "bilinear": Image.BILINEAR,
        "bicubic": Image.BICUBIC,
        "nearest": Image.NEAREST,
    }
    resample: int = resample_map.get(resample_method, Image.LANCZOS)

    context.send_progress(50, f"Resizing to {width}x{height}...")
    resized: Image.Image = img.resize((width, height), resample)

    write_ref: str = context.output_targets.get("image_out", {}).get("artifact_write_ref", "")
    output_path: str = write_ref.replace("artifact-write://", "")
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    resized.save(output_path, format="PNG")

    context.send_progress(100, "Resize complete")
    return {
        "status": "completed",
        "outputs": {
            "image_out": {
                "artifact_ref": write_ref.replace("artifact-write://", "artifact://"),
                "type": "image/rgb",
            }
        },
        "metrics": {"duration_ms": 100},
    }


def grayscale_handler(
    inputs: dict,
    config: dict,
    context: "WorkerContext",
) -> dict:
    context.send_progress(10, "Loading image...")
    image_ref: str = inputs.get("image", {}).get("artifact_ref", "")
    image_path: str = image_ref.replace("artifact://", "")

    img: Image.Image = Image.open(image_path)

    context.send_progress(50, "Converting to grayscale...")
    grayscale: Image.Image = img.convert("L")

    write_ref: str = context.output_targets.get("image_out", {}).get("artifact_write_ref", "")
    output_path: str = write_ref.replace("artifact-write://", "")
    Path(output_path).parent.mkdir(parents=True, exist_ok=True)
    grayscale.save(output_path, format="PNG")

    context.send_progress(100, "Grayscale conversion complete")
    return {
        "status": "completed",
        "outputs": {
            "image_out": {
                "artifact_ref": write_ref.replace("artifact-write://", "artifact://"),
                "type": "image/grayscale",
            }
        },
        "metrics": {"duration_ms": 50},
    }


worker: BaseWorker = BaseWorker(
    extension_id="example.image.basic",
    extension_version="0.1.0",
    worker_name="image-basic-worker",
)
worker.register_operator("image.resize", "1.0.0", resize_handler)
worker.register_operator("image.grayscale", "1.0.0", grayscale_handler)
worker.run()
