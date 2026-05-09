# nexus-tui

`nexus-tui` is the streaming terminal console for nexus-dnn host events. It
ships as a workspace member providing the `nexus` binary and the
`nexus_tui` library.

> **Spec**: [044-tui-streaming-console](../../specs/044-tui-streaming-console/spec.md)
> &nbsp;|&nbsp; **Plan**: [plan.md](../../specs/044-tui-streaming-console/plan.md)
> &nbsp;|&nbsp; **Quickstart**: [quickstart.md](../../specs/044-tui-streaming-console/quickstart.md)

## Run

```bash
# Connect to a running host on the default port
cargo run -p nexus-tui --release

# Or point at a remote / non-default host
cargo run -p nexus-tui --release -- --host-url http://127.0.0.1:3000 --level info

# Skip the startup probe (e.g. when starting nexus alongside the host)
cargo run -p nexus-tui --release -- --no-probe
```

CLI flags:

| Flag | Description | Default |
|---|---|---|
| `--host-url` | Base URL of the nexus host. Also reads `NEXUS_HOST_URL`. | `http://127.0.0.1:3000` |
| `--level` | Initial severity floor (`debug`, `info`, `warn`, `error`, `fatal`). | `info` |
| `--ring-buffer` | In-memory event-history capacity. | `50_000` |
| `--no-probe` | Skip the host reachability probe at startup. | off |
| `--with-host` | Spawn `nexus-dnn` as a child process and tear it down on TUI exit. Looks for the binary next to `nexus`; override with `--host-bin`. Stdout + stderr go to `~/.nexus/host.log`. | off |
| `--host-bin <PATH>` | Override path to the `nexus-dnn` binary used by `--with-host`. | (auto-discover) |
| `--no-mouse` | Disable SGR 1006 mouse capture (click triage + right-click menu). | off |
| `--no-glyphs` | Replace Unicode severity + source-category glyphs with ASCII proxies. Box-drawing + Braille glyphs are unaffected. | off |
| `--cursor-choreography` | Opt into save/restore cursor overlay for above-prompt ambient lines. Default off — fragile across emulators. | off |

### One-command workflow

Workspace-level cargo aliases live in `.cargo/config.toml`:

| Alias | Expands to | What it does |
|---|---|---|
| `cargo dev` | `cargo run -p nexus-core --bin nexus-dnn -- --with-tui` | Host primary, spawns TUI as child (recommended) |
| `cargo dev-tui` | `cargo run -p nexus-tui --bin nexus -- --with-host` | TUI primary, spawns host as child |
| `cargo host` | `cargo run -p nexus-core --bin nexus-dnn` | Host only, no TUI |
| `cargo tui` | `cargo run -p nexus-tui --bin nexus` | TUI only, attaches to a running host |

Pass-through args work as expected:

```bash
cargo dev --port 4000        # host on :4000 with TUI
cargo dev --log-level debug  # host emits debug-level events
cargo tui --no-glyphs        # ASCII-only glyph rendering
```

Two equivalent shapes for the single-command flow — pick whichever feels
right for your terminal habits.

**Host-orchestrated (recommended):** the host (`nexus-dnn`) is the long-
lived service; it spawns the TUI as a child after the HTTP server binds.
The host's stdout tracing layer is suppressed (file logging in
`~/.nexus/logs/nexus-dnn.log` continues), so the TUI gets a clean
terminal:

```bash
# Build both binaries once (after any change to crates/nexus-core/ or crates/nexus-tui/)
cargo build -p nexus-core --bin nexus-dnn -p nexus-tui --bin nexus

# Start everything from the host
cargo dev
# (equivalent to: cargo run -p nexus-core --bin nexus-dnn -- --with-tui)
```

On `Ctrl+D` / `/quit` in the TUI, the host shuts down too.

**TUI-orchestrated:** the TUI is primary; it spawns `nexus-dnn` as a
child process and tears it down on TUI exit. Stdout + stderr go to
`~/.nexus/host.log`:

```bash
cargo dev-tui
# (equivalent to: cargo run -p nexus-tui -- --with-host)
```

| Direction | Primary binary | Spawns | Host stdout |
|---|---|---|---|
| `--with-tui` | `nexus-dnn` | `nexus` (TUI) as child | Suppressed; file logging in `~/.nexus/logs/` |
| `--with-host` | `nexus` (TUI) | `nexus-dnn` (host) as child | Captured to `~/.nexus/host.log` |

## Slash commands

```text
/level <debug|info|warn|error|fatal>   set severity floor
/grep <regex>                          display-grep on summary text
/source <glob>                         source-glob filter (e.g. deploy:*)
/follow run:<id>|deploy:<id>|ext:<id>  narrow to a single target
/clear-filter                          drop all filters
/pause /resume                         toggle ambient display
/inspect <event-id>                    structured drill-down
/last [N] [level]                      back-walk recent matching events
/snapshot @file:<path>                 write a debug artifact
/open <route>                          focus the desktop UI on a route
/where                                 host context summary
/help                                  inline menu
/quit                                  clean exit (also Ctrl+D)
```

Tab completion auto-suggests command names, log levels, source-category
glob prefixes, and `@file:` paths.

## Module map

```text
src/
├── main.rs              clap CLI → runtime::run
├── lib.rs               module gather + public re-exports
├── runtime.rs           SSE / consumer / sparkline / controller / editor task topology
├── controller.rs        slash-command dispatch + shared-state mutators
├── snapshot.rs          /snapshot artifact writer (atomic temp+rename)
├── stream/
│   ├── client.rs        SSE consumer with reconnect + Last-Event-ID + gap detection
│   ├── ring_buffer.rs   bounded FIFO + id-index
│   ├── filter.rs        FilterState (level / source-glob / grep / follow / paused)
│   ├── rate_guard.rs    per-source 200/s + 2s repeat collapse
│   ├── hold_queue.rs    ambient hold during command output
│   ├── significance.rs  Severity composition + classify(event)
│   └── source_category.rs / event_id.rs / event_line.rs / severity.rs
├── render/
│   ├── event_line.rs    one-line ANSI render with critical border
│   ├── inspector.rs     7-section /inspect block (┃ gutter)
│   ├── brand.rs         block-art "N" banner
│   ├── sparkline.rs     8-cell Braille event-rate
│   └── gutter.rs        ambient │ + inspector ┃ glyphs
├── repl/
│   ├── ansi.rs          palette + truecolor / 256 / 16 + osc8_hyperlink
│   ├── prompt.rs        AmbientPrompt impl reedline::Prompt
│   ├── editor.rs        reedline factory + read_one wrapper
│   ├── slash.rs         parser + ParsedCommand + slash_command_names
│   ├── inspect.rs       find_event_by_id_str + last_n_at_or_above
│   ├── completion.rs    SlashCompleter + file_complete
│   └── queue.rs         CommandQueue + Ctrl+C drain semantics
├── inspector/
│   ├── correlation.rs   walk_correlation (depth ≤ 3)
│   └── heuristics.rs    11 patterns, first-match-wins
├── mouse/
│   ├── capture.rs       SGR 1006 detection + bypass-modifier predicate
│   ├── targets.rs       ClickRegistry (row, col-range) → ClickTarget
│   ├── dispatch.rs      pure ClickTarget → ClickAction mapper
│   └── menu.rs          right-click context menu items + render
└── terminal/
    └── guard.rs         RAII raw-mode toggle (panic-safe Drop)
```

## Architecture

The runtime spawns five concurrent tokio tasks (Constitution X
Parallelism-First):

1. **Per-endpoint SSE loops** — `/api/v1/events/sse` and
   `/api/host/runs/events`. Reconnect with exponential backoff capped at
   5 s. Resume via `Last-Event-ID`. Emit gap banners on detected skips.
2. **Consumer task** — drains the SSE channel and applies the FR-076
   pre-display pipeline:
   `ring_buffer.push → filter.is_visible → rate_guard → hold_queue → render`.
3. **Sparkline tick** — 1 Hz interval keeping the prompt redraw alive on
   idle.
4. **Controller task** — pulls slash commands off an mpsc channel and
   mutates the shared `FilterState` / `HoldQueue` / `PromptState` /
   `RingBuffer` through `Arc<RwLock>` + `Arc<Mutex>` handles. `/where`,
   `/help`, `/inspect`, `/last`, `/snapshot`, `/open` are all executed
   here.
5. **Editor task** — `tokio::task::spawn_blocking` reedline `read_line`
   loop. Parses input through `parse_slash` and dispatches the result
   to the controller. Ctrl+C signals interrupt; Ctrl+D exits cleanly.

## Testing

```bash
cargo test -p nexus-tui                    # unit + integration suites
INSTA_UPDATE=always cargo test -p nexus-tui  # accept snapshot diffs
cargo clippy -p nexus-tui --all-targets -- -D warnings
cargo fmt -p nexus-tui
```

Snapshot tests (`insta`) cover event-line rendering across truecolor /
256-color / 16-color, sparkline rate windows, and the inspector block.

## Design system

Output uses the project's Spectral Graphite palette — violet primary,
periwinkle secondary, tertiary orange dot, with severity-tinted glyphs
and per-source hash-derived shades. The renderer downsamples cleanly to
256-color and 16-color terminals.
