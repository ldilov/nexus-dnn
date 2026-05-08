# nexus-web src-tauri

The Tauri 2.x binary for the nexus-dnn desktop shell (spec 042 — Neo-Terminal Desktop Shell).

This sub-crate is intentionally thin. The crate is a member of the workspace; its `main.rs` calls into [`nexus-desktop-shell`](../../../crates/nexus-desktop-shell/) which owns every Tauri concern (window lifecycle, system tray, custom titlebar, IPC dispatcher).

Files in this directory:

- [`Cargo.toml`](Cargo.toml) — workspace member, depends on `nexus-desktop-shell`.
- [`tauri.conf.json`](tauri.conf.json) — window config (`decorations: false`, `transparent: true`, `titleBarStyle: "Overlay"` for macOS), `beforeDevCommand`, distribution metadata.
- [`build.rs`](build.rs) — Tauri build hook.
- [`src/main.rs`](src/main.rs) / [`src/lib.rs`](src/lib.rs) — single-line entry that delegates to `nexus_desktop_shell::run()`.
- [`capabilities/default.json`](capabilities/default.json) — Tauri capability allowlist (window, event, tray, custom commands).

## Prerequisites

- **Rust 1.84+** (workspace MSRV).
- **Node ≥ 20** + **pnpm 9+**.
- **Tauri CLI 2.x** — install once with `cargo install tauri-cli --version "^2"`.
- OS-specific deps as documented in [`specs/042-neo-terminal-shell/quickstart.md`](../../../specs/042-neo-terminal-shell/quickstart.md):
  - macOS: Xcode CLT.
  - Windows: MSVC build tools + WebView2 runtime.
  - Linux: `webkit2gtk-4.1-dev` and `libayatana-appindicator3-dev` (system-tray support is degraded on bare Sway / minimal Wayland sessions).

## Running locally

The Tauri CLI **must** be invoked from this directory, not from the workspace root, because the CLI walks upward looking for the closest `Cargo.lock` — running it from the root surfaces an unrelated workspace lockfile and the build aborts. See Tauri issue [#2643](https://github.com/tauri-apps/tauri/issues/2643).

```bash
cd apps/web

# Dev build with hot-reload — spawns Vite via beforeDevCommand and rebuilds Rust on change
pnpm tauri dev

# Confirm the CLI is reachable
pnpm tauri --version          # prints 2.x
```

When `pnpm tauri dev` starts:

1. The `beforeDevCommand` (`pnpm --filter web dev`) launches Vite on port 5173.
2. Tauri rebuilds this crate and `nexus-desktop-shell` (first build ~3-5 min, subsequent rebuilds ~10-30 s).
3. The native window opens at the custom titlebar; the system-tray icon appears (Linux: only on AppIndicator-capable desktops).
4. The frontend's `services/ipc_adapter.ts` adapter detects `window.isTauri === true` and routes RPC through `invoke()` and `Channel<EventBatch>` instead of the browser-dev HTTP/SSE fallback.

## Building distribution bundles

```bash
cd apps/web
pnpm tauri build
```

Outputs platform-specific bundles to `apps/web/src-tauri/target/release/bundle/`:

| Platform | Artifacts |
|---|---|
| macOS | `.dmg` (signed if cert configured), `.app` |
| Windows | `.exe` (NSIS installer), `.msi` |
| Linux | `.AppImage`, `.deb` |

Code signing and notarisation are not configured in this repo — set the appropriate `signingIdentity` / `certificateThumbprint` fields in `tauri.conf.json` before shipping public artifacts.

## Linux degraded behaviour

System-tray support requires the desktop environment to expose `libayatana-appindicator3`. KDE Plasma and GNOME Shell with the AppIndicator extension work; bare Sway, minimal Wayland sessions, and headless containers do not. On those environments the window-close-to-tray behaviour from US1 (FR-002) degrades to a regular window close — documented as a degraded-behaviour tier per FR-003.

## Where to look next

- Custom titlebar markup: [`apps/web/src/components/titlebar/`](../src/components/titlebar/).
- IPC commands: [`crates/nexus-desktop-shell/src/ipc/`](../../../crates/nexus-desktop-shell/src/ipc/).
- Quickstart smoke walkthrough: [`specs/042-neo-terminal-shell/screenshots/README.md`](../../../specs/042-neo-terminal-shell/screenshots/README.md).
