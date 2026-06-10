"""``python -m local_llm_worker`` — boots the real local-llm ServiceWorker."""
from __future__ import annotations

import sys
from pathlib import Path


def main() -> None:
    extension_dir = Path(__file__).resolve().parents[2]
    if str(extension_dir) not in sys.path:
        sys.path.insert(0, str(extension_dir))
    from worker.main import create_worker

    create_worker().run()


if __name__ == "__main__":
    main()
