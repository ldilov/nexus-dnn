# Extension Dependencies — the `dependencies:` Manifest Block

Spec 035 introduces a generic, host-managed dependency installer. An extension declares
what it needs (language runtime, third-party packages, system binaries, model weights,
worker handshake) as a typed step graph in its `manifest.yaml`. The host walks that
graph, downloads/verifies/installs each step, and surfaces progress to the user — without
the extension shipping a single line of install code.

This page is the canonical contract reference. For a tutorial-style introduction, see
the [extension-author quickstart](../../specs/035-extension-dependency-installer/quickstart.md).
For the full spec, see [spec.md](../../specs/035-extension-dependency-installer/spec.md).

---

## Why a single contract

Before spec 035, every extension that needed an embedded Python + ffmpeg + model
weights had to write its own install logic, its own UI, its own progress reporter. Each
re-invented the same primitives (sha256 verify, archive extract, HuggingFace download).
The host had no clean way to surface "this extension is missing X" to the user.

With spec 035, the host provides:

- A **typed step graph** declared in YAML
- A **handler registry** keyed by step `type` — the host has 5 built-in handlers covering
  the common cases; new step types are one new handler in `HandlerRegistry`
- A generic **`fetch_artifact`** primitive (HTTP streaming + sha256 + 4 archive formats
  + Range resume + atomic placement)
- A generic **install runner** that walks the topo-sorted graph, emits progress events,
  and offers per-step retry / cancel
- A generic **`/extensions/:id/settings` UI** with a Dependencies tab that renders any
  extension's plan from the same response shape
- A "Setup required" badge on the gallery card that appears whenever an extension's
  declared deps aren't satisfied

Extensions write zero install/UI code. They write a manifest block.

---

## The contract at a glance

```yaml
# inside an extension's manifest.yaml

dependencies:
  steps:
    - id: <unique-snake_case-id>
      type: <discriminator>          # registered StepHandler::step_type()
      requires: [<other-step-id>]    # DAG edges; must be acyclic
      spec: { ... }                  # opaque to the host; validated only by the matching handler
```

Every step has the same four fields. The host validates the graph (id uniqueness,
requires resolution, cycle detection, type-known) at extension load. Per-step `spec`
shapes are validated by the matching handler — the host never reads `spec` field names.

---

## Built-in step types

### `runtime`

Installs a language runtime (Python today; Node, JVM, .NET, cargo, conda land as new
handlers later — same step type, same schema).

```yaml
- id: python
  type: runtime
  spec:
    family: python                          # python | node | jvm | dotnet | cargo | conda | ...
    version: ">=3.11,<3.13"                 # semver range
    accelerator_profiles: [cpu, cuda12, cuda13]  # informational
```

**Output**: a directory containing the runtime, ready for downstream package and
binary steps to consume. The resolved profile is stamped into the artifact's metadata
so a downstream `model_artifact` step can match on it via `matches_runtime_step:`.

### `package_set`

Resolves and installs third-party packages declared in a manifest file inside the
extension dir. v1 supports `manager: uv`; future managers (`npm`/`pnpm`/`mvn`/
`gradle`/`dotnet`/`cargo`) are new match arms in the same handler.

```yaml
- id: pkgs
  type: package_set
  requires: [python]
  spec:
    manager: uv
    manifest_path: "worker/pyproject.toml"
    lock_path: "worker/uv.lock"             # optional pinned lockfile
    target: extension_local                  # only value supported in v1
```

**Output**: a venv at `<host_data>/extensions/<ext-id>/runtime/packages/.venv`. A
`.synced.json` marker file records the sha256 of the source manifest; `probe()` uses
this to detect drift and re-install only when the manifest actually changed.

### `system_binary`

Downloads a prebuilt binary from a URL the extension supplies, verifies its sha256,
extracts it, and places it under a content-addressed path.

```yaml
- id: ffmpeg
  type: system_binary
  spec:
    id: ffmpeg
    version: ">=4.0"                        # informational
    sources:
      - platform: windows-x64
        url: "https://..."
        sha256: "<64-hex>"
        size: 12345678
        archive: zip                         # zip | tar.gz | tar.xz | tar.bz2 | none
      - platform: linux-x64
        url: "https://..."
        sha256: "..."
        size: 11234567
        archive: tar.xz
      # ... declare a source per supported platform
```

**Supported platforms**: `windows-x64`, `linux-x64`, `linux-arm64`, `darwin-x64`,
`darwin-arm64`. If the host's platform tuple has no matching source, the step's
`probe()` returns `Unsupported` and the dep panel shows a clear "this extension does
not support your platform" error.

**Output**: extracted binary at `<host_data>/extensions/<ext-id>/runtime/binaries/<id>/<sha256-prefix>/`.
Content-addressing keeps reinstalls atomic.

### `model_artifact`

Routes through the host's existing model store. The host knows how to download the
requested family from HuggingFace, verifies sha256, lands bytes in `<host_data>/models/`.
**Models always live under the host's model store, never inside an extension's
directory.**

```yaml
- id: models
  type: model_artifact
  requires: [python]                        # need runtime profile resolved first
  spec:
    family_id: "indextts/2.0"               # catalog id known to the model store
    acceleration_match: matches_runtime_step:python  # pick variant matching upstream profile
    # OR a literal:
    # acceleration_match: cuda13
```

**Output**: a path inside the host's model store dir; the extension's worker receives
this path at lease-acquire time via the existing host APIs.

### `validation`

Terminal step. Spawns the worker entrypoint, runs the spec-032 lease handshake, and
declares the install successful only if the worker comes up clean.

```yaml
- id: validate
  type: validation
  requires: [python, pkgs, ffmpeg, models]
  spec:
    kind: worker_handshake                   # only value supported in v1
    timeout_seconds: 60
```

**Output**: handshake report. The runner emits `extension_install_completed` after
this step succeeds.

---

## Disk layout

The host owns these paths. Extensions are given paths at runtime; they read but never
write outside paths the host hands them.

```text
<host_data>/
  extensions/<ext-id>/
    runtime/
      python/                              # owned by RuntimeHandler
      packages/.venv/                      # owned by PackageSetHandler
      packages/.synced.json                # PackageSetHandler drift marker
      binaries/<id>/<sha256-prefix>/       # owned by SystemBinaryHandler
    install.log                            # rolling install log
  models/                                  # owned by model store; referenced only
    <family>/<version>/...
```

---

## HTTP API

Four routes, all parameterised by extension id. Zero extension-id literals in route
paths.

| Method | Path                                                            | Purpose |
|--------|-----------------------------------------------------------------|---------|
| `GET`  | `/api/v1/extensions/{id}/dependencies`                          | Re-runs `probe()` per step, returns current state. Cheap; safe on focus/mount. |
| `POST` | `/api/v1/extensions/{id}/install`                               | Spawns runner from first incomplete step. Returns `install_run_id` immediately; progress flows via WebSocket. |
| `POST` | `/api/v1/extensions/{id}/install/steps/{step_id}/retry`         | Re-runs single step regardless of status. Downstream untouched. |
| `POST` | `/api/v1/extensions/{id}/install/cancel`                        | Cooperative cancel via the runner's cancellation token. |

Full schemas: [contracts/http-api.openapi.yaml](../../specs/035-extension-dependency-installer/contracts/http-api.openapi.yaml).

---

## SSE / WebSocket events

Subscribe via the existing `/api/v1/events` WebSocket. Five `extension_install_*`
event types are emitted on the bus during an active install:

- `extension_install_step_started`
- `extension_install_step_progress` (download bytes, package counts, etc.)
- `extension_install_step_completed`
- `extension_install_step_failed`
- `extension_install_completed` (terminal)

Frontend filters by `extension_id` field. Wire format:
[contracts/sse-events.md](../../specs/035-extension-dependency-installer/contracts/sse-events.md).

---

## Activation flow

When a fresh `nexus-dnn` discovers your extension and its `dependencies.steps[]` are
not satisfied:

1. Extension shows in the gallery with a **`Setup required`** badge (pulsing dot).
2. Card's primary CTA changes from the toggle to **`Set up`** — deep-links to
   `/extensions/<id>/settings?tab=dependencies`.
3. User clicks → Dependencies tab renders one row per step with status pill,
   subtitle, requires chips, and a per-row CTA appropriate to the step's status.
4. User clicks **Install all** → runner walks the graph; UI updates per row via SSE.
5. After the terminal `validation` step succeeds, the gallery card flips back to
   the toggle and the extension activates normally.

If a step fails mid-run, the user can **Retry** that step alone or click **Cancel** to
stop the runner cooperatively. Per FR-053a, **Install only this** is disabled when
upstream `requires` aren't satisfied (with a tooltip naming the missing upstream).

---

## Migrating from `runtime_dependencies[]`

The legacy `runtime_dependencies:` block is auto-translated into a single synthetic
`runtime`-typed step at parse time for one release window. To migrate:

```yaml
# Before
runtime_dependencies:
  - family: "indextts"
    version: ">=0.1.0"
    acceleration: [cpu, cuda12]

# After
dependencies:
  steps:
    - id: runtime
      type: runtime
      spec:
        family: indextts
        version: ">=0.1.0"
        accelerator_profiles: [cpu, cuda12]
    # plus any additional steps your extension needs (packages, binaries, models, validation)
```

The explicit `dependencies:` block wins when both are present. After your extension
ships the new block, the legacy field can be removed.

---

## Extending the contract — adding a new step type

The schema doesn't change. Adding `conda_env` (or any future runtime kind) is a
**single-PR change to the host**:

1. Implement `StepHandler` for `CondaEnvHandler` in `crates/nexus-extension-deps/src/handlers/conda_env.rs`
2. Register it in `HandlerRegistry::default()`
3. Add a `STEP_TYPE_PRESENTATION` entry to the frontend map (icon + subtitle template)

The manifest grammar accepts `type: conda_env` automatically. Existing extensions are
unaffected.

See the [`StepHandler` trait reference](../../specs/035-extension-dependency-installer/contracts/step-handler-trait.rs.md)
for authoring rules (validate purity, probe idempotency, run cancellation, progress
emission).

---

## Boundary discipline

The host code in `crates/nexus-extension-deps/`, `crates/nexus-api/src/handlers/extension_dependencies/`,
and `apps/web/src/views/extension-settings/` contains **zero** extension-id literals
and **zero** step-type-specific control flow outside the matching handler module.
Verified by:

- The shared boundary script at `extensions/builtin/emotion-tts/scripts/audit-boundary.sh`
- A Rust-level boundary test: `cargo test -p nexus-extension-deps --test boundary_test`
  asserts (a) no extension-id literals anywhere in the crate, and (b) no
  pattern-matching on the opaque `spec: Value` outside `src/handlers/` (FR-005
  spec-opacity guard).

Constitutional Principle V (Extendability via Adapter Contracts) and Principle XIII
(Host ↔ Extension Boundary) hold mechanically.
