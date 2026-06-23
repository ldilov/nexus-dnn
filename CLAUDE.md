# nexus-dnn — agent guide

Local-first AI runtime (Tauri + React shell, Rust host crates, builtin extensions). Dark "Spectral Graphite" design language (`/nexudnn-design` skill).

## DGX Spark deployment

The live host runs as the `nexusdnn` container on the DGX Spark (`nemo-gx`, GB10 aarch64, `192.168.50.22`). Deploy + remote ops are recipes in the project [`justfile`](justfile) — scripts are embedded, no external files. SSH key defaults to `~/.ssh/.dgx_session_key` (override `DGX_KEY`/`DGX_HOST`/`DGX_USER`).

```bash
just dgx-probe              # recon: deploy-checkout git state, dockerfile, containers (read-only)
just dgx-inspect [name]     # exact run config of a container (default nexusdnn) — replicate before a swap
just dgx-deploy             # build from origin/main + swap nexusdnn; auto-bumps dgx-fixNN tag
just dgx-deploy dgx-fix42 main   # explicit tag + branch
just dgx-ps                 # list containers
just dgx-logs nexusdnn 300 1     # tail logs (follow)
just dgx-ssh "df -h /"      # one-off remote command (keep it $-free; see below)
just dgx-push <src> <dest>  # / dgx-pull — file transfer
```

`dgx-deploy` flow: `fetch` → `checkout -B <branch> origin/<branch>` → build image with `--build-arg NEXUS_BUILD_ID=<sha>` (UI cache-bust, required) → **build-first, swap only on success** (old container serves until the new image is ready) → health-check `localhost:3000`. Keeps name `nexusdnn` + port 3000 so the cloudflared tunnel survives. Current live tag: `dgx-fix41`.

### Deploy gotchas (baked into the recipes)
- **`git-lfs` post-checkout hook** exits non-zero over non-login ssh (git-lfs off PATH) though the branch switch succeeds → the recipe bypasses hooks (`core.hooksPath=/tmp/__nohooks`) and validates `HEAD == origin/<branch>` instead.
- **`dgx-ssh` expands `$`/backtick/`!` LOCALLY** (the recipe runs under `set -u` before the ssh hop). Keep one-off commands `$`-free; for anything with `$()`/braces use `dgx-deploy`/`dgx-probe` (heredoc-over-ssh) or `_dgx-exec` (base64-hopped).
- The aarch64 build is long (Rust + web). `dgx-deploy` streams in the foreground; to background it: `nohup bash -c 'just dgx-deploy' > deploy.log 2>&1 &`.

## Host ↔ extension boundary (non-negotiable)

The host is a generic runtime; extensions are domain consumers. **No extension-specific logic/types/routes/table-names in host paths** (`crates/nexus-*`, `apps/web/` outside the generic extension renderer, root `migrations/`). Full rule: [`.claude/rules/host-extension-boundary.md`](.claude/rules/host-extension-boundary.md). Sole sanctioned coupling point: `crates/nexus-builtins`.

## Web build / verify (extension + shell frontends)

Vanilla-extract + vitest. `pnpm exec`/`pnpm build` trip the pnpm-11 ignored-builds gate — call the local binaries directly:

```bash
cd extensions/builtin/<ext>/web   # or apps/web
node node_modules/typescript/bin/tsc --noEmit
node node_modules/.bin/biome lint src         # CI gate is `biome lint`, NOT `biome check` (check flags repo-wide CRLF)
node node_modules/vitest/vitest.mjs run [path]
```

Only `extensions/builtin/emotion-tts/web` has `node_modules` installed in fresh worktrees; svi2-pro/apps-web need install first. Files are CRLF — `git diff` shows real changes only; don't chase CRLF noise from `biome check`.
