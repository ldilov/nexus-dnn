# emotion-tts-worker

IndexTTS-2 synthesis worker for the EmotionTTS Nexus extension (spec 031).
Speaks JSON-RPC/NDJSON over stdio to the host-side Rust shim.

Managed by `uv` and built by `hatchling`. Not intended to be installed
manually — the host Extension Dependency Installer (spec 035) provisions
the embedded interpreter and runs `uv sync` against this project.
