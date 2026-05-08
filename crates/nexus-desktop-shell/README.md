# nexus-desktop-shell

Generic desktop shell crate for the nexus-dnn Tauri binary (spec 042 — Neo-Terminal Desktop Shell).

## Purpose

This crate owns the **host-shaped** desktop concerns:

- Window lifecycle (close-to-tray on every platform; `RunEvent::ExitRequested` intercept on macOS so dock-quit hides instead of terminates).
- System tray menu (`Open nexus-dnn` + `Quit`) wired in `setup()`.
- Custom titlebar helpers (drag region, breadcrumb).
- IPC command dispatcher — registers every `cmd_*` declared in
  [`specs/042-neo-terminal-shell/contracts/ipc-commands.md`](../../specs/042-neo-terminal-shell/contracts/ipc-commands.md).
- Typed `IpcError` envelope shared across all commands.

Per **Principle XIII** (Host ↔ Extension Boundary), this crate must remain
generic. There are zero extension-id literals in this code — the dispatcher
routes by command name, not by domain.

## Lifecycle

```text
build()                       ─┐
  └── invoke_handler(register) ── attaches every cmd_* in src/ipc/*
  └── on_window_event           ── CloseRequested → window.hide() + prevent_close()
  └── setup(install_tray)       ── tray menu + on_menu_event handler
  └── run(handle_run_events)    ── ExitRequested → api.prevent_exit()
```

The `tauri::Builder` is consumed once by `run()`; the binary at
`apps/web/src-tauri/` calls `nexus_desktop_shell::run()` from its `lib.rs`.

## Command surface index

The IPC dispatcher in [`src/ipc/mod.rs`](src/ipc/mod.rs) registers the
following commands (one module per command group):

| Module | Commands |
|---|---|
| `ipc::run_events` | `cmd_run_events_subscribe`, `cmd_run_events_query_window`, `cmd_run_events_bucketed` |
| `ipc::runtime_tuning` | `cmd_runtime_tuning_patch` |
| `ipc::window` | `cmd_window_show`, `cmd_window_hide`, `cmd_window_focus`, `cmd_window_set_titlebar_breadcrumb` |
| `ipc::tray` | `cmd_tray_set_state` |
| `ipc::block` | `cmd_block_register_mnemonic` |
| `ipc::pulse_floor` | `cmd_pulse_floor_metrics_subscribe` |

Bodies are stubbed (`IpcError::not_implemented`) in Phase 2 (T021–T025) — full
implementations land in Phase 3 (US1) when the embedded `nexus-api` host is
linked in (T032).

## Capability requirements

The Tauri binary at [`apps/web/src-tauri/`](../../apps/web/src-tauri/) declares
the capabilities consumed by this shell in
[`capabilities/default.json`](../../apps/web/src-tauri/capabilities/default.json).

Required permissions:

- `core:default` (baseline)
- `core:window:default` plus `allow-start-dragging`, `allow-show`, `allow-hide`,
  `allow-set-focus`, `allow-toggle-maximize`, `allow-minimize`, `allow-close`
  (custom-titlebar drag region + window controls)
- `core:event:default` (event channel for streamed `RunEvent` batches)
- `core:tray:default` (system-tray menu)
- The custom `cmd_*` allowlist enumerated above

Adding a new IPC command implies extending both the dispatcher (this crate)
**and** the capability file — they must stay in sync.
