# Quickstart: Host Runtime Pool

**Feature**: 011-host-runtime-pool | **Audience**: QA engineer or returning developer

End-to-end manual walk-through exercising every user story. Run against a freshly built binary of the post-spec-011 version.

## Preconditions

- A pre-spec-011 database state (for US6 migration test): easiest way is to run spec 010 and install llama.cpp via the old `/api/v1/llm/backends/local-llm.llama.cpp/install` flow, then upgrade to the spec-011 binary. If starting clean, skip to US1.
- At least 8 GB free disk.
- NVIDIA GPU with CUDA 12+ optional; without it, install with `accelerator: "cpu"`.

## US2 first — workspace sanity (before runtime interaction)

```bash
# Crate no longer exists
ls crates/nexus-local-llm 2>&1
# Expected: No such file or directory

# Workspace members do not include it
grep "nexus-local-llm" Cargo.toml
# Expected: no hits

# Builds clean
cargo check --workspace
# Expected: Finished `dev` profile

# Grep guard
grep -rn "nexus_local_llm\|nexus-local-llm" crates/ extensions/ apps/ 2>&1
# Expected: zero hits (docs excluded)

# Host crate has no extension-coupling
cargo tree -p nexus-backend-runtimes | grep -iE "local-llm|video-gen"
# Expected: no hits
```

## US6 — Migration from pre-spec-011 state

1. Stop the pre-spec-011 binary.
2. Observe existing state:
   ```bash
   sqlite3 ~/.nexus-dnn/state.db "SELECT COUNT(*) FROM ext_local_llm_runtime_installs"
   # Expected: 1 (from prior install)
   ls ~/.nexus-dnn/extensions/local-llm/runtimes/
   # Expected: llamacpp/<version>/
   ```
3. Launch the spec-011 binary. Watch logs for `"running migration 008"`.
4. Verify:
   ```bash
   sqlite3 ~/.nexus-dnn/state.db "SELECT install_id, family, version, state, install_root FROM host_runtime_installs"
   # Expected: one row with install_root under ~/.nexus-dnn/runtimes/llama.cpp/...
   
   sqlite3 ~/.nexus-dnn/state.db ".tables" | grep migrated_008
   # Expected: ext_local_llm_runtime_installs_migrated_008 is present
   
   ls ~/.nexus-dnn/runtimes/llama.cpp/
   # Expected: <version>/ with llama-server binary
   ```
5. Restart the binary. Confirm migration 008 is **idempotent** — no new rows, no errors.

## US1 — Shared install across extensions

1. Open the app. Navigate to the top-level **Backends** entry in the sidebar.
2. If no llama.cpp install: click **Install llama.cpp**, pick accelerator, wait for completion. Otherwise skip.
3. `curl http://localhost:7878/api/v1/backends` — one install row, `dependents: ["local-llm"]`.
4. Enable a second extension declaring `runtime_dependencies: [{family: "llama.cpp", ...}]`. (For testing, a throwaway extension manifest with a single runtime dep works — nothing else need work.)
5. `curl http://localhost:7878/api/v1/backends` — same install row, `dependents: ["local-llm", "test-extension"]`.
6. Disk check: `du -sh ~/.nexus-dnn/runtimes/llama.cpp/<version>/` is the same size whether one extension is enabled or both. No duplication.

## US3 — Channel on lease

1. Spawn a lease via the local-llm extension (open Local Chat, select a model).
2. `curl http://localhost:7878/api/v1/backends | jq '.data.installs[0].active_leases'` — the lease appears with `channel.kind = "http_tcp"`, `channel.ready = false` at first.
3. Wait ~2 s (llama.cpp cold start on CPU). Observe `ready: true`.
4. `curl http://127.0.0.1:<port>/health` — `{"status":"ok"}`; this is the host-allocated port from the channel descriptor.
5. Kill the process externally: `kill <pid>`. Observe lease state flips to released; channel invalid; extension receives `ProcessExited` event on its channel.

## US4 — Reserved launch setting enforcement

Request spawn with a forbidden flag:

```bash
curl -X POST http://localhost:7878/api/v1/backends/ri_.../lease \
  -H 'Content-Type: application/json' \
  -H 'X-Extension-Id: local-llm' \
  -d '{"args": ["--port", "9999"], "bind_mode": "loopback"}'
```

Expected: 422 with `code: "RESERVED_LAUNCH_SETTING"`, `message` naming `--port`.

Now request with an *unknown* flag (must pass through):

```bash
curl -X POST http://localhost:7878/api/v1/backends/ri_.../lease \
  -H 'Content-Type: application/json' \
  -H 'X-Extension-Id: local-llm' \
  -d '{"args": ["--hypothetical-future-llama-flag", "42"], "bind_mode": "loopback"}'
```

Expected: 202 Accepted, lease spawns, flag forwarded verbatim (visible in `tracing` logs at debug level).

And a managed-spawn-disallowed flag:

```bash
curl -X POST .../lease -d '{"args": ["--help"], "bind_mode": "loopback"}'
```

Expected: 422 with `code: "MANAGED_SPAWN_DISALLOWED"`.

## US5 — Parameter catalog endpoint

```bash
curl http://localhost:7878/api/v1/backends/llama.cpp/parameters | jq '.data.total_entries'
# Expected: 213

curl http://localhost:7878/api/v1/backends/llama.cpp/parameters \
  | jq '.data.entries[] | select(.flags[] == "--port") | .policy'
# Expected: "host-injected"

curl http://localhost:7878/api/v1/backends/llama.cpp/parameters \
  | jq '.data.entries[] | select(.flags[] == "--ctx-size") | .policy'
# Expected: "extension-passthrough"

curl http://localhost:7878/api/v1/backends/foo-engine/parameters
# Expected: 404 FAMILY_UNKNOWN
```

## Deprecation surface — /llm/backends/*

```bash
curl -i http://localhost:7878/api/v1/llm/backends
# Expected: 200, body is the same as /api/v1/backends,
#           header: Deprecation: true
#           header: Sunset: <date 90 days from merge>
```

Server logs: `WARN deprecated route /api/v1/llm/backends hit`.

## Pass criteria

All scenarios above behave as expected. If any step diverges, open an issue tagged `spec/011-host-runtime-pool` with the failing step number and observed output.
