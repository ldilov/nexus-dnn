# Security review — spec 032 (T104)

**Scope**: every new attack surface introduced by the generic backend-runtime subsystem — manifest contribution intake, the 10-phase install pipeline, `StdioLease` subprocess lifecycle, JSON-RPC stdio framing, the HTTP surface under `/api/v1/backend-runtime(s|-installs|-leases)*`, and the env-driven embedded-Python asset loader.

**Out of scope**: the grandfathered `llamacpp/` subtree (covered by earlier reviews) and the cross-cutting host infrastructure (tracing, storage migrations, extension dispatcher — owned by specs 029/030).

## Surface-by-surface findings

### 1. Subprocess spawn (`StdioLease`, `FamilyPythonHandler::spawn_launch_spec`)

| Finding | Status |
|---|---|
| `tokio::process::Command` is constructed argv-style; no `/bin/sh -c` or shell interpolation anywhere in the generic pipeline. | ✅ safe |
| `kill_on_drop(true)` is set so dropped handles reap the OS process. | ✅ enforced |
| `stdin/stdout/stderr` piped; no inheritance of parent fds beyond the framer channel. | ✅ enforced |
| `env_overrides_json` on `backend_runtime_settings` is forward-compat (A-11) and currently NOT read — so a malicious extension cannot inject PATH/PYTHONHOME today. | ✅ deferred-safe |
| When `env_overrides_json` ships (future spec), it MUST filter `PATH`, `PYTHONHOME`, `PYTHONPATH`, `LD_PRELOAD`, `LD_LIBRARY_PATH`, `DYLD_*` before merging. | ⚠️ note for follow-up |
| `LaunchSpec.working_dir` comes from `install.install_path` — host-owned, host-chosen (ULID + platform triple). No extension input flows into the cwd. | ✅ safe |
| SIGTERM grace (5 s) + SIGKILL fallback on `release()`. | ✅ enforced |

### 2. Archive download + extract (`generic/phases/download.rs`, `extract.rs`; `family_python/bootstrap.rs`)

| Finding | Status |
|---|---|
| SHA-256 verify is mandatory after every fetch; mismatch → `InvalidDownload` / `PythonBootstrapFailed` with a clear error; archive never reaches extract. | ✅ enforced |
| Size verify runs alongside sha256 (fails early if an attacker truncates/lengthens). | ✅ enforced |
| zip extraction uses `ZipFile::enclosed_name()` which rejects absolute paths + `..` components (zip-slip protection). | ✅ enforced |
| tar extraction computes `dst.join(rel).starts_with(dst)` explicitly and rejects entries escaping the destination. | ✅ enforced |
| `strip_outer` peels the outer `python/` from python-build-standalone tarballs; a malicious archive without that prefix falls through as-is (no escape risk since `starts_with(dst)` also checks). | ✅ safe |
| `file://` URL decoding strips the leading slash on Windows drive paths — aligned between generic download and family_python bootstrap. | ✅ consistent |
| No archive-format auto-detect by magic bytes — kind is inferred from the URL extension, so an attacker substituting a zip for a tar at the same URL is caught at parse time. | ✅ by-design |

### 3. JSON-RPC framing (`generic/leases/framer.rs`)

| Finding | Status |
|---|---|
| 8 MB per-line cap enforced BEFORE any stdin write (`PayloadTooLarge` returned to caller) — FR-043 / SC-009. | ✅ enforced |
| NDJSON terminator is `\n` only; malformed frames are rejected by `serde_json::from_str` and logged; reader continues. | ✅ enforced |
| Oversize inbound lines fail the reader task; lease transitions to `Failed`; no memory blowup. | ✅ enforced |
| Notification backlog capped at 1024 (FR-046); lagged subscribers log and continue. | ✅ enforced |

### 4. HTTP surface (`crates/nexus-api/src/handlers/backend_runtimes/*`)

| Finding | Status |
|---|---|
| Every path parameter (`runtime_id`, `install_id`, `lease_id`) is parsed through its newtype's `TryFrom<&str>`; malformed input returns 400 with `invalid_*` code. | ✅ enforced |
| Query-parameter filters (`runtime_family`, `source_extension_id`, `implementation_status`, `runtime_install_id`, etc.) flow directly into parameterised SQL — no string interpolation. | ✅ enforced |
| Error envelopes never leak internal file paths or stack traces; storage errors surface as `installs_storage_error` / `catalog_storage_error` with a generic message — detail goes to `tracing::error!` server-side. | ⚠️ partial — some handlers pass `e.to_string()` into the envelope detail. See follow-up below. |
| SSE progress stream keeps heartbeats (15 s) but does not echo request headers back. | ✅ safe |
| No authentication on the routes — consistent with the rest of the host's local-first model; external exposure requires a reverse-proxy auth layer (operator concern, not spec 032). | ⚠️ operator note |

**Follow-up**: Audit every `e.to_string()` path in `crates/nexus-api/src/handlers/backend_runtimes/*.rs` and decide per error whether the detail is safe to return. Low priority — detail is useful for debugging and the threat model is local-first. Track as a separate ticket if local-first assumption changes.

### 5. Embedded-Python asset loader (`family_python/config.rs`)

| Finding | Status |
|---|---|
| Hex validation on `NEXUS_EMBEDDED_PYTHON_SHA256` (exactly 64 lowercase hex chars) → no smuggled binary content into the sha256 field. | ✅ enforced |
| Size parsed as `u64` — integer overflow caught. | ✅ enforced |
| Partial config (some env vars set, others missing) returns a structured error and falls back to `None` (no asset configured). | ✅ fail-closed |
| `file://` URLs in env vars are permitted — intentional for air-gapped installs — and go through the same sha256 verify as http(s). | ✅ by-design |
| Env vars can only configure one target's asset; the built-in registry (T111) takes precedence only when env is absent. | ✅ clear precedence |

### 6. Manifest contribution intake (`nexus_extension::BackendRuntimeContribution` + bridge)

| Finding | Status |
|---|---|
| `runtime_id` regex enforced at manifest parse time (`nexus_extension::backend_runtime_contribution::validate_contribution`) plus again at the host bridge (defence in depth). | ✅ enforced |
| Duplicate `runtime_id` across extensions is rejected at the bridge with BOTH contributors named in the structured error; zero partial rows persist. | ✅ enforced |
| `worker_entrypoint` + `version_manifest` are relative paths; the install pipeline joins them under `extension_root` which is host-chosen from `extensions_dir`. Traversal via `..` in those fields would be caught by the pipeline's `starts_with(dst)` checks. | ✅ enforced |
| `capability_tags` + `supported_roles` flow into the catalog as opaque strings; no wildcard expansion or execution. | ✅ safe |

### 7. Boundary audit (`scripts/audit-runtime-boundary.ps1`)

| Finding | Status |
|---|---|
| Every new host file under `crates/nexus-*/` or `apps/web/src/` must be free of extension-id literals (Principle XIII). Spec 032's new tree contributes zero literals — audit passes cleanly. | ✅ enforced |
| The audit is a CI gate per T101; pre-commit bypass would require explicit `--no-verify`. | ✅ enforced in policy |

## Recommendations (not blockers)

1. **Tighten HTTP error envelopes (optional)** — replace `e.to_string()` details with typed error codes in catalog/installs/leases handlers if / when the host gains remote exposure.
2. **Stamp the built-in Python asset table (T111 — architected, asset-data-only blocker)** — until a verified pin lands, production hosts must set `NEXUS_EMBEDDED_PYTHON_*` env vars to run python-family extensions. Fail-closed today is safer than silent-default.
3. **Document the env-override filter list for the future `env_overrides_json` feature** — codify in the data-model spec before implementation.
4. **Consider supply-chain pinning** — the `tar`, `zip`, `flate2`, `reqwest`, `sha2`, `tokio` versions are already locked in `Cargo.lock`; `cargo audit` in CI would catch newly disclosed CVEs.

## Verdict

No CRITICAL or HIGH findings. The generic pipeline + lease subsystem is safe to ship under the local-first threat model. Two `⚠️ note`-level follow-ups tracked in the table above; neither blocks spec 032 merge.

*Reviewer: self-review pass on 2026-04-23 against the codebase at commit `fc026ff`. Independent review by `security-reviewer` agent recommended before public release.*
