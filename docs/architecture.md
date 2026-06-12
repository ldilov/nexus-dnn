# 🏗️ Architecture

`nexus-dnn` is a host-authoritative local AI platform. Extensions can add capability, but they do not become the control plane.

## Core Rule

> The host owns lifecycle, routing, storage, installs, runtime leases, and cross-extension policy.

That rule matters more than any individual crate or API path.

## System View

```mermaid
flowchart TB
    UI["🖥️ Browser UI / Tauri shell / TUI"]
    API["🌐 Host HTTP API + SSE + WS"]
    HOST["🛡️ Rust host runtime"]
    REG["🔌 Extension registry"]
    STORE["🗄️ SQLite + artifact store"]
    DEPS["📦 Dependency installer"]
    LEASES["⚙️ Backend runtime leases"]
    EXT["🧩 Extensions"]
    WORKERS["🐍 / 🦀 Workers"]

    UI --> API
    API --> HOST
    HOST --> REG
    HOST --> STORE
    HOST --> DEPS
    HOST --> LEASES
    REG --> EXT
    EXT --> WORKERS
    WORKERS --> LEASES
    WORKERS --> STORE
```

## What The Host Owns

| Concern | Host responsibility |
|---------|---------------------|
| API | Routes, envelopes, health, frontend serving, extension mount points |
| Extension lifecycle | Discovery, validation, enable/disable, dependency install, storage namespace application |
| Execution | Run creation, workflow persistence, artifact lineage, event fanout |
| Runtime management | Backend install catalogs, lease issuance, runtime process policy |
| UX composition | Mounting extension layouts and assets into host-owned surfaces |

## What Extensions Own

| Concern | Extension responsibility |
|---------|--------------------------|
| Domain logic | Operators, recipes, worker behavior |
| Optional API surface | Router implementation mounted by the host |
| Optional UI surface | Layout YAML, assets, custom elements, contribution metadata |
| Optional storage namespace | Extension-local tables defined declaratively and applied by the host |
| Optional backend runtime manifests | Runtime families and worker entrypoints the host can manage |

## Authority Boundary

```mermaid
sequenceDiagram
    participant Host as Host
    participant Ext as Extension
    participant Worker as Worker

    Host->>Ext: Discover manifest, storage, layouts, routes
    Host->>Host: Validate and register
    Host->>Ext: Mount under host-controlled paths
    Host->>Worker: Start worker or acquire runtime lease
    Worker-->>Host: Progress, outputs, diagnostics
    Ext-->>Host: Domain-specific behavior only
```

An extension can be powerful without being sovereign.

## Crate Map

These crates are the most important ones to understand first:

| Crate | Role |
|-------|------|
| `crates/nexus-core` | process startup, config loading, host composition |
| `crates/nexus-api` | HTTP router, SPA serving, extension dispatch, DTO envelopes |
| `crates/nexus-extension` | extension manifests, discovery, router-provider boundary |
| `crates/nexus-backend-runtimes` | runtime catalogs, installs, leases, backend orchestration |
| `crates/nexus-models-store` | host model catalog, downloads, install jobs |
| `crates/nexus-storage` | SQLite migrations and host persistence |
| `crates/nexus-run-events` | structured event stream substrate |
| `crates/nexus-desktop-shell` | desktop-shell control layer for the Tauri surface |

## Request Flow

### Host-owned path

```mermaid
sequenceDiagram
    participant UI as UI
    participant API as Host API
    participant Host as Host services
    participant DB as Host storage

    UI->>API: Request
    API->>Host: Validate + dispatch
    Host->>DB: Read/write
    DB-->>Host: Result
    Host-->>API: DTO
    API-->>UI: Envelope response
```

### Extension-routed path

```mermaid
sequenceDiagram
    participant UI as UI
    participant API as Host API
    participant Router as Generic extension router
    participant Ext as Extension router/service
    participant Worker as Worker/runtime

    UI->>API: /api/v1/extensions/{ext_id}/...
    API->>Router: Resolve ext_id
    Router->>Ext: Forward request
    Ext->>Worker: Domain operation
    Worker-->>Ext: Result
    Ext-->>API: Response
    API-->>UI: Host-served response
```

The host still owns the mount point, the HTTP server, and the extension registry even when the feature is extension-specific.

## Built-in Extension Reality

The current repo ships five first-party built-in extensions:

- `nexus.local-llm`
- `nexus.audio.emotiontts`
- `nexus.video.ltx23`
- `nexus.video.longcat`
- `nexus.video.svi2-pro`

Some ship only host-consumed layouts and contributions. Some also ship static web bundles and custom elements. Several declare backend runtimes. The host remains the common control layer for all of them.

## Storage Model

There are two storage tiers:

1. Host-owned storage
   Workflows, runs, artifacts, runtime install state, model-store state, and shared metadata.
2. Extension-owned namespaces
   Extension-specific tables, but only through host-applied storage declarations.

This is why extension data can be isolated without letting extensions mutate host persistence arbitrarily.

## Runtime Model

The runtime story is intentionally layered:

1. The host discovers runtime declarations.
2. The host resolves installation state and prerequisites.
3. The host starts or leases runtime processes.
4. Extensions consume those leases rather than silently launching unmanaged backends.

That design is already visible in the local-LLM and video stacks and is the foundation for future remote-worker work.

## Read Next

- [configuration.md](configuration.md)
- [extension-internals.md](extension-internals.md)
- [platform-support.md](platform-support.md)
- [roadmap.md](roadmap.md)
