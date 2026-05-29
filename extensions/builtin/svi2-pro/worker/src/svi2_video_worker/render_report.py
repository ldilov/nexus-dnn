import json
from pathlib import Path


def write_render_report(out_dir: Path, data: dict) -> str:
    """Write render report JSON to out_dir/render_report.json.
    
    Args:
        out_dir: Directory to write the report to.
        data: Dictionary containing render metadata.
        
    Returns:
        Path string to the written report.
    """
    out_dir = Path(out_dir)
    out_dir.mkdir(parents=True, exist_ok=True)
    report_path = out_dir / "render_report.json"
    report_path.write_text(json.dumps(data, indent=2))
    return str(report_path)
