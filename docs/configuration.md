# 🔧 Configuration

This page reflects the current host configuration behavior in `crates/nexus-core/src/config.rs`.

## Priority Order

Configuration resolves in this order:

1. CLI flags
2. Environment variables
3. `config.toml`
4. Built-in defaults

## CLI And Environment Reference

| CLI flag | Environment variable | Default | Meaning |
|----------|----------------------|---------|---------|
| `--config` | `NEXUS_CONFIG` | `<data-dir>/config.toml` | config file path |
| `--data-dir` | `NEXUS_DATA_DIR` | `~/.nexus` | root for persistent state |
| `--port` | `NEXUS_PORT` | `3000` | host HTTP port |
| `--log-level` | `NEXUS_LOG_LEVEL` | `info,tower_http=debug` | tracing filter baseline |
| `--debug-async` | `NEXUS_DEBUG_ASYNC` | `false` | async diagnostics toggle |
| `--with-tui` | — | `false` | launch the TUI as a child process |
| `--tui-bin <PATH>` | — | auto-discovered | override the `nexus` TUI binary |

Additional TUI settings:

| Environment variable | Meaning |
|----------------------|---------|
| `NEXUS_TUI_RING_BUFFER_CAPACITY` | event ring-buffer size |
| `NEXUS_TUI_TRACING_BRIDGE_ENABLED` | enable/disable tracing bridge |
| `NEXUS_TUI_TRACING_BRIDGE_EXTRA_SENSITIVE_PATTERNS` | comma-separated redaction patterns |
| `NEXUS_BUILTIN_EXTENSIONS_DIR` | override built-in extension source directory |

## Example `config.toml`

By default the host looks for `~/.nexus/config.toml`.

```toml
data_dir = "D:/nexus-data"
port = 3100
log_level = "info,tower_http=debug"
debug_async = false

[tui]
ring_buffer_capacity = 50000

[tui.tracing_bridge]
enabled = true
extra_sensitive_patterns = ["hf_token", "authorization"]
```

## Runtime Defaults

| Setting | Current default |
|---------|-----------------|
| Data dir | `~/.nexus` |
| Port | `3000` |
| Log filter | `info,tower_http=debug` |
| Built-in extension dir | `<workspace>/extensions/builtin` unless overridden |

## Data Directory Layout

```text
~/.nexus/
├── config.toml
├── db/
│   └── nexus.db
├── artifacts/
├── extensions/
├── logs/
└── ... extension/runtime-managed subdirectories
```

## Important Behavior Notes

- The host listener binds to `0.0.0.0:<port>`.
- The local browser/TUI helpers still use `127.0.0.1:<port>` when they connect back to the host.
- The config file is optional. If it is absent, startup continues with defaults.
- If you explicitly point `--config` or `NEXUS_CONFIG` at a missing file, startup fails.

## Common Examples

### Run on another port

```bash
cargo host -- --port 4000
```

### Move the data directory

```bash
cargo host -- --data-dir D:/nexus-data
```

### Start host and TUI together

```bash
cargo dev -- --port 3100
```

### Override built-in extensions during development

```powershell
$env:NEXUS_BUILTIN_EXTENSIONS_DIR="D:\\Workspace\\repos\\nexus-dnn\\extensions\\builtin"
cargo host
```

## Where To Look For More

- [environment-variables.md](environment-variables.md) — full reference of every env var (host, extensions, workers, frontend, tooling)
- [getting-started.md](getting-started.md)
- [architecture.md](architecture.md)
- [requirements.md](requirements.md)
