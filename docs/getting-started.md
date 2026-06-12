# 🚀 Getting Started

This guide is the shortest trustworthy path to a running local `nexus-dnn` instance.

## 1. Install prerequisites

| Tool | Needed for | Notes |
|------|------------|-------|
| Rust stable | host build | `rustup` recommended |
| Node.js 20+ | frontend and desktop workflows | required for `apps/web` tasks |
| pnpm 8+ | frontend package manager | via `corepack` is fine |
| `uv` | Python-worker extensions | strongly recommended even if you only start with host-only flows |

If you plan to use GPU-heavy built-in extensions, also read [requirements.md](requirements.md) and [platform-support.md](platform-support.md).

## 2. Clone the repo

```bash
git clone <your-fork-or-origin-url> nexus-dnn
cd nexus-dnn
```

## 3. Choose a local run mode

### Host only

```bash
cargo host
```

Use this when you want the browser UI and the embedded frontend bundle with the fewest moving parts.

### Host + TUI

```bash
cargo dev
```

Use this when you want the browser UI and the streaming terminal console together.

### Desktop shell

```bash
cd apps/web
pnpm install
pnpm tauri dev
```

Use this when you want the Tauri desktop wrapper instead of just the browser surface.

## 4. Open the UI

The host currently binds on `0.0.0.0:$NEXUS_PORT` and defaults to port `3000`.

Open:

- [http://127.0.0.1:3000](http://127.0.0.1:3000)

## 5. Verify the API

```bash
curl http://127.0.0.1:3000/api/v1/health
```

Expected response shape:

```json
{
  "data": {
    "status": "ok",
    "details": {
      "...": "extra health information may appear here"
    }
  },
  "meta": {
    "timestamp": "2026-06-12T00:00:00Z"
  },
  "error": null
}
```

The important bit is `data.status == "ok"`.

## 6. Optional: rebuild the embedded frontend

The host serves `apps/web/dist`. If you are editing frontend code or want to refresh the embedded bundle:

```bash
cd apps/web
pnpm install
pnpm build
```

## 7. Know where state lives

By default the host uses `~/.nexus/`.

```text
~/.nexus/
├── config.toml
├── db/
├── artifacts/
├── extensions/
└── logs/
```

Override the root with `NEXUS_DATA_DIR` or `--data-dir`.

## Common local commands

| Goal | Command |
|------|---------|
| Host only | `cargo host` |
| Host + TUI | `cargo dev` |
| TUI-attached workflow | `cargo dev-tui` |
| Frontend tests | `cd apps/web && pnpm test` |
| Rust tests | `cargo test` |
| Lint Rust | `cargo clippy` |

## Troubleshooting

| Problem | Likely fix |
|---------|------------|
| Port `3000` already used | start with `cargo host -- --port 4000` |
| Browser opens but extension install fails | install `uv` and re-run |
| GPU extension fails early | check [requirements.md](requirements.md) and your NVIDIA driver/runtime path |
| Desktop shell does not launch | run `pnpm install` inside `apps/web` first |
| UI looks stale after frontend edits | rebuild with `pnpm build` in `apps/web` |

## Next reads

- [platform-support.md](platform-support.md)
- [architecture.md](architecture.md)
- [configuration.md](configuration.md)
- [extension-internals.md](extension-internals.md)
