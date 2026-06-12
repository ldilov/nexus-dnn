# nexus-dnn

> Local-first AI orchestration with a host-authoritative Rust runtime, extension-driven capabilities, and first-party support for local LLM, audio, and video workflows.

## 🚀 Run It Locally First

### 1. Install prerequisites

| What | Minimum |
|------|---------|
| Rust | stable |
| Node.js | 20+ |
| pnpm | 8+ |
| `uv` | latest recommended |

`uv` matters because several built-in extensions use host-managed Python environments.

### 2. Clone and start

```bash
git clone <your-fork-or-origin-url> nexus-dnn
cd nexus-dnn

# Host only: browser UI served from the embedded frontend bundle
cargo host

# or

cargo run -p nexus-core --bin nexus-dnn
```

Open [http://127.0.0.1:3000](http://127.0.0.1:3000).

### 3. Verify the host is healthy

```bash
curl http://127.0.0.1:3000/api/v1/health
```

Expected shape:

```json
{
  "data": {
    "status": "ok",
    "details": {
      "...": "additional live health fields may appear here"
    }
  },
  "meta": {
    "timestamp": "2026-06-12T00:00:00Z"
  },
  "error": null
}
```

> `nexus-dnn` currently listens on `0.0.0.0:$NEXUS_PORT`, but local usage should still prefer `127.0.0.1`.

### 4. Useful local launch modes

| Goal | Command |
|------|---------|
| Host only | `cargo host` |
| Host + TUI | `cargo dev` |
| TUI drives host | `cargo dev-tui` |
| Desktop shell | `cd apps/web && pnpm install && pnpm tauri dev` |
| Rebuild embedded web app | `cd apps/web && pnpm install && pnpm build` |

The host serves the already-built web bundle from `apps/web/dist`, so frontend install/build is mainly for frontend or desktop-shell development.

## ✨ What nexus-dnn Is For

nexus-dnn is a local-first platform for running AI features as structured host-managed systems instead of ad-hoc scripts. The host owns process lifecycle, storage, installs, API routing, workflows, model/runtime leasing, and extension boundaries. Extensions add domain capability without taking control away from the host.

Today that means the repo can host:

- Local chat and RAG workflows
- Host-managed backend runtime leasing
- Emotional TTS pipelines
- Image-to-video and long-video generation flows
- Extension-owned UI surfaces mounted inside the host app

## 🧭 System At A Glance

```mermaid
flowchart LR
    UI["🖥️ Web UI / Tauri / TUI"] --> HOST["🛡️ nexus-dnn host"]
    HOST --> API["HTTP + SSE + WS"]
    HOST --> REG["Extension registry"]
    HOST --> DEPS["Dependency installer"]
    HOST --> STORE["SQLite + artifact store"]
    HOST --> RUNTIMES["Backend runtime leases"]
    REG --> EXT["Built-in + external extensions"]
    EXT --> WORKERS["Native / Python workers"]
    WORKERS --> RUNTIMES
    WORKERS --> STORE
```

### Host authority is the core design rule

| Area | Authority |
|------|-----------|
| HTTP listener, health, API envelopes | Host |
| Extension discovery, validation, enable/disable | Host |
| Dependency install plans | Host |
| Runtime processes and leases | Host |
| Workflow storage, runs, artifacts | Host |
| Extension-specific logic and UX | Extension, but only through host-owned surfaces |

## 🖼️ UI Screenshots

<table>
<tr>
<td align="center" width="50%">

**Extensions gallery**

![Extensions](docs/screenshots/extensions.png)

</td>
<td align="center" width="50%">

**Models browser**

![Models](docs/screenshots/models.png)

</td>
</tr>
<tr>
<td align="center" width="50%">

**Deployments**

![Deployments](docs/screenshots/deployments.png)

</td>
<td align="center" width="50%">

**Backend runtimes**

![Backend runtimes](docs/screenshots/backends-shared.png)

</td>
</tr>
<tr>
<td align="center" width="50%">

**Dependency installer**

![Dependency installer](docs/screenshots/depsinstall.png)

</td>
<td align="center" width="50%">

**Modules**

![Modules](docs/screenshots/modules.png)

</td>
</tr>
<tr>
<td align="center" width="50%">

**SVI2 recipe**

![SVI2 recipe](docs/screenshots/svi2recipe.png)

</td>
<td align="center" width="50%">

**SVI2 recipe graph**

![SVI2 recipe graph](docs/screenshots/svi2-graph.png)

</td>
</tr>
</table>

## 🔌 Built-in Extensions

| Extension | Status | What it adds |
|-----------|--------|--------------|
| `nexus.local-llm` | 🟢 active product surface | Local chat, RAG, backend-runtime integration, model/browser layouts |
| `nexus.audio.emotiontts` | 🟢 active product surface | Emotional dialogue TTS, voice assets, batch runs, audio editing |
| `nexus.video.ltx23` | 🟢 active product surface | LTX 2.3 image-to-video with host-managed runtime profiles |
| `nexus.video.longcat` | 🟡 active extension, still evolving | LongCat-based long-video generation paths |
| `nexus.video.svi2-pro` | 🟡 advanced / high-requirement path | SVI 2.0 Pro image-to-video for Blackwell-focused setups |

Several of these extensions ship more than operators:

- Dependency graphs
- Backend runtime manifests
- Storage migrations
- YAML layouts
- Static web assets and custom elements
- Extension routers mounted under `/api/v1/extensions/{ext_id}/...`

## 🔄 How The Host And Extensions Communicate

```mermaid
sequenceDiagram
    participant User as User Surface
    participant Host as Host App
    participant Ext as Extension Registry/Router
    participant Worker as Native or Python Worker
    participant Runtime as Backend Runtime Lease
    participant Store as Storage + Artifacts

    User->>Host: UI action / API request
    Host->>Ext: Resolve extension metadata or route
    Ext->>Host: Manifest, layouts, storage, router, runtime declarations
    Host->>Worker: JSON-RPC / typed host service calls
    Worker->>Runtime: Acquire or use host-managed lease
    Worker->>Store: Read/write artifacts through host-owned paths
    Worker-->>Host: Results, progress, errors
    Host-->>User: REST/SSE/WS updates + rendered UI
```

The important boundary is that extensions do not become mini-hosts. They can contribute routes, UIs, and workers, but the host still owns mounting, serving, validation, and lifecycle.

## 🧪 Tested Machine Snapshot

The strongest recent validation evidence in the repo is centered on a Windows workstation rather than a broad cross-platform certification matrix.

| Area | Evidence in repo |
|------|------------------|
| OS | Windows |
| GPU | NVIDIA GeForce RTX 5070 Ti |
| VRAM | ~15.9 GiB |
| Driver family | 570.65+ |
| Python evidence | 3.12.11 |
| Torch evidence | 2.12.0 + CUDA 13.2 |

For the detailed support notes and caveats, read [docs/platform-support.md](docs/platform-support.md) and [docs/requirements.md](docs/requirements.md).

## 📚 Documentation Map

Start here:

- [docs/getting-started.md](docs/getting-started.md) — install, run, verify, and choose the right local launch mode
- [docs/platform-support.md](docs/platform-support.md) — what is validated today, what is experimental, and hardware expectations
- [docs/architecture.md](docs/architecture.md) — host authority, crate map, runtime model, and data flow
- [docs/extension-internals.md](docs/extension-internals.md) — how extensions are discovered, mounted, and constrained
- [docs/configuration.md](docs/configuration.md) — CLI flags, env vars, config file, and data directories

Reference and deeper dives:

- [docs/api-reference.md](docs/api-reference.md)
- [docs/extension-guide.md](docs/extension-guide.md)
- [docs/data-model.md](docs/data-model.md)
- [docs/database-schema.md](docs/database-schema.md)
- [docs/README.md](docs/README.md)

## 🛣️ Future Roadmap

The next platform-level milestones should reinforce host authority instead of weakening it.

1. **MCP control**
   The host should expose and govern tool/runtime control surfaces in a first-class way, instead of scattering capability across ad-hoc extension UX.
2. **Remote workers**
   Worker execution should be able to move off-box while still preserving host-owned leases, auditability, and policy checks.
3. **Extensions SDK**
   Extension authoring should become a clearer supported product surface, with stable contracts, better scaffolding, and thinner accidental complexity.

See [docs/roadmap.md](docs/roadmap.md) for the expanded roadmap.

## 🧱 Repo Shape

```text
apps/web/                  React web frontend + desktop shell frontend
crates/                    Rust workspace crates
extensions/builtin/        First-party extensions
docs/                      User and architecture documentation
specs/                     Detailed feature specs and verification artifacts
graphify-out/              Generated codebase graph and reports
```

## 🔍 Verification Commands

```bash
cargo test
cargo clippy
cd apps/web && pnpm test
```

## 📄 License

GPL-3.0. See [LICENSE](LICENSE).
