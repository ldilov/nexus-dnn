# EmotionTTS Extension (spec 031)

Deployable Nexus extension that turns multi-character dialogue scripts into per-utterance audio artifacts plus a ZIP bundle, driven by the upstream **IndexTTS-2** model running in a host-managed Python subprocess over JSON-RPC/stdio.

## Architecture

```
  ┌─────────────────────────────────────────────────────────┐
  │ Host (Rust, nexus-api / nexus-backend-runtimes)         │
  │  • Generic backend-runtime catalog (spec 032)           │
  │  • Generic /extensions/:layoutId dispatcher (spec 030)  │
  │  • Model store, artifact store, lease manager           │
  └─────────────────────────────────────────────────────────┘
             │ ExtensionRouterProvider │ BackendRuntimeLease
             ▼                         ▼
  ┌────────────────────────┐  ┌──────────────────────────────┐
  │ rust/                  │  │ worker/                       │
  │  • Router provider     │  │  • IndexTTS-2 adapter         │
  │  • Storage repos       │  │  • NDJSON RPC loop            │
  │  • Operators (7)       │  │  • Cooperative cancel         │
  │  • Backend client      │  │  • ffmpeg post-process        │
  │  • Queue / resume      │  │                               │
  └────────────────────────┘  └──────────────────────────────┘
             │                           │
             ▼                           ▼
  ┌────────────────────────┐  ┌──────────────────────────────┐
  │ storage/migrations/    │  │ backends/indextts/            │
  │  • ext_emotion_tts__*  │  │  • backend-runtime.yaml       │
  │  • 8 tables            │  │  • versions.yaml (asset pins) │
  └────────────────────────┘  └──────────────────────────────┘
             ▲
             │
  ┌────────────────────────┐
  │ web/                   │
  │  • recipe view         │
  │  • emotion radar       │
  │  • run panel           │
  └────────────────────────┘
```

## Project layout

| Path                        | Owned by      | Purpose                                                   |
| --------------------------- | ------------- | --------------------------------------------------------- |
| `manifest.yaml`             | extension     | Identity, capabilities, storage namespace, runtime contrib |
| `rust/`                     | extension     | Router provider, storage repos, operators, backend client |
| `worker/`                   | extension     | Python IndexTTS-2 synthesis worker (stdio JSON-RPC)       |
| `storage/migrations/`       | extension     | SQLite DDL for `ext_emotion_tts__*` tables                |
| `backends/indextts/`        | extension     | Runtime descriptor + per-platform asset pins              |
| `web/`                      | extension     | React/Vite bundle loaded by the generic extension shell   |
| `recipes/`, `workflows/`, `operators/` | extension | YAML contribution files                        |
| `scripts/audit-boundary.*`  | extension     | Per-extension boundary audit (parity with host audit)     |

## Dev onramp

See [quickstart.md](../../../specs/031-emotiontts-extension/quickstart.md) for the 10-minute onramp.

Short version:

```bash
# 1. Rust crate (builds standalone; not a workspace member)
cd rust && cargo check

# 2. Python worker (uv only; upstream forbids pip/conda)
cd ../worker && uv sync --all-extras

# 3. Frontend bundle
cd ../web && pnpm install && pnpm build

# 4. Boundary audit (Windows)
powershell -ExecutionPolicy Bypass -File ../scripts/audit-boundary.ps1
# or Linux/CI
bash ../scripts/audit-boundary.sh
```

## Host prerequisites

Spec 032 ships everything this extension consumes:

- `RuntimeFamily::Python` variant in the host catalog.
- `BackendRuntimeLease` trait (stdio transport) acquired via `POST /api/v1/backend-runtime-installs/:id/start`.
- Generic backend-runtime catalog: `GET /api/v1/backend-runtimes`, `POST /:id/install`.
- Generic `/extensions/:layoutId` frontend dispatcher (spec 030).

## Constitutional discipline

- **Principle XIII** — every file lives under this directory. Zero extension-id literals in `crates/` or `apps/web/src/`. `scripts/audit-boundary.*` enforces.
- **Principle IV** — no inline comments. Doc-comments on public APIs only.
- **Principle VI (design-heavy carve-out)** — recipe UI defers per-component tests to a post-v1 hardening sprint (see [research.md R-08](../../../specs/031-emotiontts-extension/research.md)).

## References

- Spec folder: [specs/031-emotiontts-extension/](../../../specs/031-emotiontts-extension/)
- Upstream: <https://github.com/index-tts/index-tts>
- Model: <https://huggingface.co/IndexTeam/IndexTTS-2>
