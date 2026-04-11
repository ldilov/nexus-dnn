# Quickstart: nexus-dnn

## Prerequisites

- Rust toolchain (latest stable): `rustup update stable`
- Python 3.11+ (for running example extensions)
- Node.js 20+ (for frontend scaffold, optional)

## Build

```bash
git clone <repo-url> nexus-dnn
cd nexus-dnn
cargo build --release
```

The binary is at `target/release/nexus-dnn`.

## First Run

```bash
./target/release/nexus-dnn
```

On first start, the host:
1. Creates `~/.nexus/` with subdirectories (db, artifacts, extensions, logs)
2. Initializes the SQLite metadata database
3. Scans `~/.nexus/extensions/` for installed extensions
4. Starts the HTTP API server (default: `http://localhost:3000`)
5. Prints startup confirmation with subsystem health

## Install an Example Extension

```bash
cp -r extensions/examples/hello-world ~/.nexus/extensions/
```

The host discovers it on next start (or via rescan API).

## Verify

```bash
curl http://localhost:3000/api/v1/health
curl http://localhost:3000/api/v1/extensions
curl http://localhost:3000/api/v1/operators
```

## Run a Workflow

```bash
curl -X POST http://localhost:3000/api/v1/workflows \
  -H "Content-Type: application/yaml" \
  --data-binary @examples/echo-workflow.yaml

curl -X POST http://localhost:3000/api/v1/runs \
  -H "Content-Type: application/json" \
  -d '{"workflow_id": "<id-from-above>", "inputs": {"text": {"value": "hello"}}}'

curl http://localhost:3000/api/v1/runs/<run-id>
```

## Watch Live Events

```bash
websocat ws://localhost:3000/api/v1/events
```

## Frontend (Optional)

```bash
cd apps/web
npm install
npm run dev
```

Open `http://localhost:5173` to see the scaffold UI.

## Configuration

| Environment Variable | Default | Description |
|---------------------|---------|-------------|
| `NEXUS_DATA_DIR` | `~/.nexus` | Data directory location |
| `NEXUS_PORT` | `3000` | API server port |
| `NEXUS_LOG_LEVEL` | `info` | Log level (trace, debug, info, warn, error) |
| `RUST_LOG` | — | Per-crate log levels (e.g., `nexus_core=debug`) |

## Development

```bash
cargo test                    # Run all tests
cargo clippy                  # Lint
cargo fmt --check             # Format check
cargo run                     # Run in development mode
```
