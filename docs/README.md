# 📚 nexus-dnn Docs

This documentation set has been revised to reflect the current host-first architecture of the repo as of June 2026.

## Start Here

| Document | Why read it first |
|----------|-------------------|
| [getting-started.md](getting-started.md) | Fastest way to install, run, and verify a local instance |
| [platform-support.md](platform-support.md) | What hardware and operating-system paths are validated today |
| [architecture.md](architecture.md) | How the host, extensions, workers, and runtimes fit together |
| [configuration.md](configuration.md) | Real CLI flags, env vars, config file behavior, and data-dir layout |

## Core Concepts

| Document | Focus |
|----------|-------|
| [extension-internals.md](extension-internals.md) | How extension discovery, mounting, storage, and host authority work |
| [extension-guide.md](extension-guide.md) | Practical authoring guidance for new extensions |
| [data-model.md](data-model.md) | Current logical entities and ownership boundaries |
| [database-schema.md](database-schema.md) | What lives in host SQLite vs extension-owned namespaces |

## API And Interfaces

| Document | Focus |
|----------|-------|
| [api-reference.md](api-reference.md) | Human-friendly map of the live API surface |
| [api/API.md](api/API.md) | Deep route-by-route reference and maintenance notes |
| [worker-protocol.md](worker-protocol.md) | Host/worker transport contract |

## Product Direction

| Document | Focus |
|----------|-------|
| [roadmap.md](roadmap.md) | Current future direction: MCP control, remote workers, Extensions SDK |
| [requirements.md](requirements.md) | Host and extension prerequisites, GPU caveats, disk budgets |

## Notes On Scope

- `docs/` is the recommended entrypoint for humans.
- `specs/` contains feature contracts, design exploration, and verification evidence.
- If a historical doc in `specs/` conflicts with these top-level docs, treat source code and these revised docs as authoritative.

Back to the repo root: [README.md](../README.md)
