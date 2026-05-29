import argparse
from pathlib import Path

from .installer import download_artifacts, resolve_artifacts


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        description="Install SVI2-Pro video generation artifacts."
    )
    parser.add_argument(
        "--profile",
        default="rtx50-fp8",
        help="Backend profile name (default: rtx50-fp8)",
    )
    parser.add_argument(
        "--dest",
        default="./models",
        help="Destination directory for artifacts (default: ./models)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="List artifacts without downloading",
    )

    args = parser.parse_args(argv)

    versions_path = (
        Path(__file__).resolve().parents[3]
        / "backends"
        / args.profile
        / "versions.yaml"
    )

    if not versions_path.exists():
        print(f"Error: versions.yaml not found at {versions_path}", flush=True)
        return 2

    artifacts = resolve_artifacts(versions_path)

    for artifact in artifacts:
        print(f"{artifact.id}", flush=True)

    if args.dry_run:
        return 0

    dest_dir = Path(args.dest)
    download_artifacts(artifacts, dest_dir)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
