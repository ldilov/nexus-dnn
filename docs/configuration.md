# 🔧 Configuration

nexus-dnn is configured through environment variables and CLI flags. All settings have sensible defaults so the platform runs out of the box with zero configuration.

---

## ⚡ Quick Reference

| Variable | CLI Flag | Default | Description |
|----------|----------|---------|-------------|
| `NEXUS_DATA_DIR` | `--data-dir` | `~/.nexus` | Root data directory for all persistent state |
| `NEXUS_PORT` | `--port` | `3000` | HTTP/WebSocket API server port |
| `NEXUS_LOG_LEVEL` | `--log-level` | `info` | Default log level for all crates |
| `RUST_LOG` | — | — | Per-crate log level overrides |

> 💡 **Tip:** CLI flags take precedence over environment variables.

---

## 📁 Data Directory

The data directory holds all persistent state. By default it lives at `~/.nexus/`.

```
~/.nexus/
├── db/nexus.db          # SQLite metadata database
├── artifacts/           # Content-addressed blob storage
│   ├── blobs/
│   ├── manifests/
│   ├── temp/
│   └── cache/
├── extensions/          # Installed extension packages
└── logs/               # Log files (when file logging is enabled)
```

| Subdirectory | Contents |
|--------------|----------|
| `db/` | SQLite database with workflow definitions, run records, extension metadata |
| `artifacts/blobs/` | SHA-256 addressed output blobs from node executions |
| `artifacts/manifests/` | JSON manifests linking blobs to their run lineage |
| `artifacts/temp/` | Staging area for in-progress blob writes |
| `artifacts/cache/` | Derived artifacts cached for faster re-access |
| `extensions/` | Each child directory is an extension package containing a `manifest.yaml` |
| `logs/` | Structured runtime logs |

### Moving the Data Directory

Set `NEXUS_DATA_DIR` to relocate all persistent state:

```bash
NEXUS_DATA_DIR=/opt/nexus-data ./target/release/nexus-dnn
```

Or via CLI flag:

```bash
./target/release/nexus-dnn --data-dir /opt/nexus-data
```

> ⚠️ **Warning:** The host does not migrate data between directories. Copy the contents manually if you need to preserve existing state.

---

## 📊 Logging

nexus-dnn uses the `tracing` framework. The `NEXUS_LOG_LEVEL` variable sets the default level for all crates. For fine-grained control, use `RUST_LOG` with per-crate directives.

### Default Level

```bash
NEXUS_LOG_LEVEL=debug ./target/release/nexus-dnn
```

### Per-Crate Levels

`RUST_LOG` accepts a comma-separated list of `target=level` pairs:

```bash
RUST_LOG=nexus_core=debug,nexus_worker=trace,tower_http=info cargo run
```

### Common Configurations

| Scenario | Command |
|----------|---------|
| Quiet production | `NEXUS_LOG_LEVEL=warn` |
| Debug workflow engine | `RUST_LOG=nexus_workflow=debug,nexus_scheduler=debug` |
| Trace worker communication | `RUST_LOG=nexus_worker=trace,nexus_protocol=trace` |
| Debug HTTP requests | `RUST_LOG=tower_http=debug` |
| Full debug (verbose) | `RUST_LOG=debug` |

> 💡 **Tip:** `RUST_LOG` overrides `NEXUS_LOG_LEVEL` when both are set. Use `NEXUS_LOG_LEVEL` for a simple baseline and `RUST_LOG` when you need surgical control.

---

## 🔗 Related Documentation

| Document | Description |
|----------|-------------|
| [⚡ Getting Started](getting-started.md) | Build and run your first workflow |
| [🏗️ Architecture](architecture.md) | System layers, crate map, data directory layout |

---

> 🔗 [Back to Documentation Hub](README.md) | [Back to Project Root](../README.md)
