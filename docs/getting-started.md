# ⚡ Getting Started with nexus-dnn

This tutorial walks you through installing, building, and running the nexus-dnn platform, installing an extension, executing a workflow, and watching live events — all in under 10 minutes.

```
Clone → Build → Start → Verify → Install Extension → Run Workflow → Watch Events
```

---

## 📋 Prerequisites

| Tool | Version | Check Command |
|------|---------|---------------|
| Rust toolchain | latest stable | `rustc --version` |
| Python | 3.11+ | `python --version` |
| Node.js | 20+ | `node --version` |

> 💡 **Tip:** Run `rustup update stable` to ensure you have the latest Rust toolchain.

---

## 🏗️ Build

```bash
git clone <repo-url> nexus-dnn
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
  "status": "healthy",
  "version": "0.1.0"
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
  -H "Content-Type: application/yaml" \
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
| [🏗️ Architecture](architecture.md) | System layers, crate map, request flows |
| [🔧 Configuration](configuration.md) | Environment variables, CLI flags, logging |
| 📖 Workflow Authoring | _Coming soon_ — YAML workflow format and validation |
| 🔌 Extension Development | _Coming soon_ — Build custom operators |
| 📋 API Reference | _Coming soon_ — Full HTTP/WebSocket API |
| 🐍 Python SDK | _Coming soon_ — Worker SDK for Python extensions |

---

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| `cargo build` fails with "npm not found" | Install Node.js 20+ |
| Port 3000 already in use | Set `NEXUS_PORT=4000` environment variable |
| Extension not discovered | Ensure `manifest.yaml` exists at the extension root |
| Worker handshake fails | Check Python 3.11+ is installed and on PATH |
| Database error on start | Delete `~/.nexus/db/` to reinitialize |

> ⚠️ **Warning:** Deleting `~/.nexus/db/` removes all workflow and run metadata. Back up before deleting.

---

> 🔗 [Back to Documentation Hub](README.md) | [Back to Project Root](../README.md)
