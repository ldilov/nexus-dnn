# ⚡ Getting Started with nexus-dnn

This tutorial walks you through installing, building, and running the nexus-dnn platform, installing an extension, executing a workflow, and watching live events — all in under 10 minutes.

```
Clone → Build → Start → Verify → Install Extension → Run Workflow → Watch Events
```

---

## 📋 Prerequisites

| Tool | Version | Check Command | Required for |
|------|---------|---------------|---|
| Rust toolchain | latest stable | `rustc --version` | building the host |
| Node.js | 20+ | `node --version` | building the web frontend |
| pnpm | 8+ | `pnpm --version` | frontend deps |
| **uv** | 0.5+ | `uv --version` | **every extension with a Python worker** (mandatory) |
| ffmpeg | 4+ | `ffmpeg -version` | optional — host auto-downloads when missing |
| NVIDIA driver | per profile | `nvidia-smi` | only for GPU runtime profiles |

> 💡 **Tip:** Run `rustup update stable` to ensure you have the latest Rust toolchain.
> 🔧 **Install uv** (mandatory): `curl -LsSf https://astral.sh/uv/install.sh | sh` on Unix, or `irm https://astral.sh/uv/install.ps1 | iex` in PowerShell on Windows. The host's dependency installer fails fast if `uv` is missing from both the embedded Python runtime AND your `PATH`.

You don't need Python on your system PATH — the host downloads a
self-contained `python-build-standalone` build (currently 3.11.13)
into each extension's data directory on first activation.

> 📚 For the full hardware matrix (GPU driver versions per profile,
> disk/VRAM budgets, NVFP4-on-Ada caveats), see
> [`requirements.md`](requirements.md).

---

## 🏗️ Build

```bash
git clone https://github.com/your-org/nexus-dnn.git
cd nexus-dnn
cargo build --release
```

This builds the Rust host runtime and the React frontend, bundling everything into a single binary at `./target/release/nexus-dnn`.

---

## 🚀 Start the Platform

```bash
./target/release/nexus-dnn
```

On first start the host:

1. Creates the `~/.nexus/` data directory
2. Initializes the SQLite metadata database
3. Scans for installed extensions
4. Starts the HTTP/WebSocket API on port **3000**
5. Serves the web UI at the same port

---

## ✅ Verify

```bash
curl http://localhost:3000/api/v1/health
```

Expected response:

```json
{
  "status": "ok",
  "uptime_secs": 3,
  "extensions_loaded": 0,
  "workers_active": 0
}
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the web UI.

---

## 📦 Install the Hello World Extension

Copy the bundled example extension into the data directory:

```bash
cp -r extensions/examples/hello-world ~/.nexus/extensions/
```

Restart the host, then verify the extension was discovered:

```bash
curl http://localhost:3000/api/v1/extensions
```

```json
[
  {
    "id": "nexus.utility.hello-world",
    "version": "0.1.0",
    "name": "Hello World"
  }
]
```

Verify the operator is registered:

```bash
curl http://localhost:3000/api/v1/operators
```

```json
[
  {
    "id": "echo",
    "version": "1.0.0",
    "extension": "nexus.utility.hello-world"
  }
]
```

---

## 🔌 Submit a Workflow

```bash
curl -X POST http://localhost:3000/api/v1/workflows \
  -H "Content-Type: text/plain" \
  --data-binary @extensions/examples/hello-world/workflows/echo-workflow.yaml
```

Expected response:

```json
{
  "id": "echo-basic",
  "version": "0.1.0",
  "title": "Echo Workflow"
}
```

---

## 🚀 Execute a Run

```bash
curl -X POST http://localhost:3000/api/v1/runs \
  -H "Content-Type: application/json" \
  -d '{"workflow_id": "echo-basic"}'
```

```json
{
  "run_id": "a1b2c3d4-...",
  "status": "pending"
}
```

Check the result:

```bash
curl http://localhost:3000/api/v1/runs/a1b2c3d4-...
```

```json
{
  "run_id": "a1b2c3d4-...",
  "status": "completed",
  "outputs": {
    "result": ">>> Hello, nexus!"
  }
}
```

---

## 📊 Watch Live Events (Optional)

Open a WebSocket connection to the event stream:

```bash
websocat ws://localhost:3000/api/v1/events
```

During a run you will see events such as:

- **run.started** — a new run begins execution
- **node.scheduled** — a node is assigned to a worker
- **node.progress** — the worker reports incremental progress
- **node.completed** — a node finishes and produces artifacts
- **run.completed** — the entire run has finished

> 💡 **Tip:** Install `websocat` via `cargo install websocat` if you don't have it.

---

## 🔗 What's Next?

| Document | Description |
|----------|-------------|
| [Architecture](architecture.md) | System layers, crate map, request flows |
| [Configuration](configuration.md) | Environment variables, CLI flags, logging |
| [Workflow Authoring](workflow-authoring.md) | YAML workflow format, ports, stages, validation |
| [Extension Development](extension-guide.md) | Build custom operators, recipes, UI contributions |
| [Extension UI Guide](extension-ui-guide.md) | Compose host components in YAML for your extension |
| [API Reference](api-reference.md) | Full HTTP and WebSocket API surface |
| [Python SDK](python-sdk.md) | Worker SDK for Python extensions |

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| `cargo build` fails with "npm not found" | Install Node.js 20+ |
| Port 3000 already in use | Set `NEXUS_PORT=4000` environment variable |
| Extension not discovered | Ensure `manifest.yaml` exists at the extension root |
| Dependency install fails with `uv binary not found` | Install uv — see Prerequisites |
| Worker handshake fails | Check host log for the embedded Python path; the dependency installer should auto-download a python-build-standalone tarball on first activation |
| Database error on start | Delete `~/.nexus/db/` to reinitialize |
| Extension's GPU profile times out / errors on weights load | Check `nvidia-smi` reports a driver compatible with the profile's CUDA version (see [requirements.md](requirements.md)) |

> ⚠️ **Warning:** Deleting `~/.nexus/db/` removes all workflow and run metadata. Back up before deleting.

---

> 🔗 [Back to Documentation Hub](README.md) | [Back to Project Root](../README.md)
