# 📚 nexus-dnn Documentation

nexus-dnn is a local-first, extensible AI workflow platform for composing, executing, and debugging multimodal pipelines across image, video, audio, and LLM tasks. It provides a developer-grade Rust runtime that treats generative workflows as structured, reproducible software pipelines.

---

## ⚡ Getting Started

| Document | Description |
|----------|-------------|
| [📋 Requirements](requirements.md) | What to install before building — uv, Rust, Node, GPU drivers, per-extension prerequisites |
| [⚡ Getting Started](getting-started.md) | Install, build, run your first workflow in under 10 minutes |

---

## 📖 Guides

| Document | Description |
|----------|-------------|
| [🏗️ Architecture](architecture.md) | System layers, crate map, request flows, data directory layout |
| [🔧 Configuration](configuration.md) | Environment variables, CLI flags, logging, data directory |
| [📊 Workflow Authoring](workflow-authoring.md) | Writing and validating workflow YAML definitions |
| [🔌 Extension Development](extension-guide.md) | Building custom operators, recipes, and extensions |

---

## 🔬 Deep Dives

| Document | Description |
|----------|-------------|
| [📋 Schemas Explained](schemas-explained.md) | What is an operator, recipe, workflow, UI contribution — in plain language |
| [🔌 How Extensions Work](extension-internals.md) | Architecture, lifecycle state machine, protocol internals, UI contribution model |
| [🗄️ Database Schema](database-schema.md) | Every table, every column, indexes, relationships, data flow diagrams |

---

## 📋 Reference

| Document | Description |
|----------|-------------|
| [📋 API Reference](api-reference.md) | All HTTP and WebSocket endpoint specifications |
| [📡 Worker Protocol](worker-protocol.md) | JSON-RPC 2.0 host-worker communication contract |
| [📊 Data Model](data-model.md) | Entities, relationships, state machines, enums |
| [🐍 Python SDK](python-sdk.md) | Python worker SDK usage, BaseWorker, ExecutionContext |

---

> 🔗 **Back to project root:** [README.md](../README.md)
