# svi2-pro User LoRAs Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Steps use `- [ ]` checkboxes.

**Goal:** Let a user pick already-downloaded LoRA(s) (separate high-noise / low-noise + per-LoRA weight) in the svi2-pro render UI and have them applied during rendering, reusing the worker's existing LoRA machinery.

**Architecture:** svi2-pro bypasses the host's generic run plumbing — its web app POSTs `{presetId, params}` to the extension's `/render/start`, and the rust shim forwards `params` **opaquely** to the worker RPC `svi2.video.render.start`. So the worker + extension web own most of this. The only host work is generic: persist+expose the artifact `role` on the foundry install ledger so the picker can filter to LoRAs, and tag civitai LoRA downloads as `role=Lora`. Boundary-clean: host changes are generic (no svi2/extension literals); LoRA application is extension-local.

**Tech stack:** Rust (sqlx/sqlite migration, axum DTO), TypeScript/React (svi2-pro/web — its own store/services, vanilla bundle), Python (svi2-pro worker, pytest), vitest.

**Decisions (from design):** picker filters to true LoRAs via a persisted `role` (host change); user LoRAs are exposed **separately for high-noise and low-noise** experts.

---

## Key contracts (verified)

- Foundry install ledger: table `model_store_installed_artifacts` (migrations/014). Written by `orchestrator.rs::record_install` → `InstalledArtifactRecord` → `InstallMap::record` (INSERT). `target.role: DependencyRole` is available in `record_install` but currently discarded.
- List endpoint: `GET /api/v1/model-store/installed` → `InstalledArtifactDto` (handlers/model_store/installed.rs); already includes `install_path` (resolved `sink_root/job_id/filename`).
- `DependencyRole` (Primary/Vae/.../Lora/...) + `Modality` (Llm/.../Other) in `crates/nexus-models-store/src/types.rs`. `Modality` has NO `Lora` variant yet.
- Civitai resolver `build_civitai_family` (crates/nexus-api/src/handlers/model_store/resolve.rs) sets the single artifact `role = DependencyRole::Primary` and `modality_from_str("lora") → Modality::Other`.
- Worker `lora.py`: `load_lora_pairs(path) -> dict[module,(A,B,scale)]`, `wrap_module_with_lora(module, pairs) -> {wrapped_count, missing_count, missing}`, scale = weight. `_build_expert(dit_path, lora_path, distill_lora_path=None)` in pipeline_svi2.py builds high/low experts; `validate_render_params(params)` normalizes inputs; `_render_start` registers handler.
- svi2 web: `RenderParams` + `render_request_store.tsx` (updateParam/startRenderJob) + `render_client.ts` (`startRender` POST `/render/start`). Params flow opaquely to worker.

---

## Task 1: Host — `Modality::Lora` + civitai resolver tags LoRA role/modality

**Files:**
- Modify: `crates/nexus-models-store/src/types.rs` (Modality enum)
- Modify: `crates/nexus-api/src/handlers/model_store/resolve.rs` (modality_from_str + build_civitai_family role)
- Modify: `apps/web/src/services/model_store.ts` (Modality union)

- [ ] **Step 1: Failing test** — append to the `tests` module in `crates/nexus-api/src/handlers/model_store/resolve.rs`:

```rust
    #[test]
    fn civitai_lora_family_tags_role_and_modality() {
        let json = r#"{ "id": 7, "modelId": 3, "name": "n",
            "model": { "type": "LORA" },
            "files": [ { "name": "x.safetensors", "sizeKB": 1.0,
                "hashes": { "SHA256": "AB" },
                "downloadUrl": "https://civitai.com/api/download/models/7",
                "primary": true } ] }"#;
        let resolved = nexus_civitai::parse_version_response(json).unwrap();
        let f = build_civitai_family(&resolved).unwrap();
        assert_eq!(f.repository.modality, nexus_models_store::types::Modality::Lora);
        assert_eq!(f.artifacts[0].role, nexus_models_store::types::DependencyRole::Lora);
    }
```

- [ ] **Step 2: Run → FAIL** `cargo test -p nexus-api civitai_lora_family_tags_role_and_modality` (no `Modality::Lora`).

- [ ] **Step 3: Add `Lora` to `Modality`** — `crates/nexus-models-store/src/types.rs`, in the `Modality` enum, before `#[serde(other)] Other`:

```rust
    Lora,
```

- [ ] **Step 4: Tag role + modality in the resolver** — `resolve.rs`:
  - In `modality_from_str`, add arm: `"lora" => Modality::Lora,`
  - In `build_civitai_family`, set the artifact's `role` based on modality. Compute once: `let role = if r.modality() == "lora" { DependencyRole::Lora } else { DependencyRole::Primary };` and use `role` for the artifact's `role` field (instead of hardcoded `DependencyRole::Primary`).

- [ ] **Step 5: Run → PASS** `cargo test -p nexus-api -p nexus-models-store resolve`. Also `cargo test -p nexus-models-store` (ensure no Modality match arms broke — search for exhaustive matches on Modality; it's `#[non_exhaustive]` so external matches have `_`, but internal ones in normalize/search may need a `Modality::Lora` arm — fix any non-exhaustive-match compile errors, mapping Lora to the closest string e.g. "lora").

- [ ] **Step 6: TS Modality union** — `apps/web/src/services/model_store.ts`, add `"lora"` to the `Modality` type union.

- [ ] **Step 7: Commit**
```bash
git add crates/nexus-models-store/src/types.rs crates/nexus-api/src/handlers/model_store/resolve.rs apps/web/src/services/model_store.ts
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" commit -m "feat(model-store): Modality::Lora + tag civitai LoRA role/modality in resolver"
```

---

## Task 2: Host — persist + expose artifact `role` on the install ledger

**Files:**
- Create: `migrations/0NN_installed_artifact_role.sql` (use the next free number — `ls migrations/` and pick highest+1)
- Modify: `crates/nexus-models-store/src/downloads/install_map.rs` (record struct, INSERT, SELECT, row struct, parse)
- Modify: `crates/nexus-models-store/src/downloads/orchestrator.rs` (`record_install` — capture `target.role`)
- Modify: `crates/nexus-api/src/handlers/model_store/installed.rs` (DTO + from_row)
- Modify: `apps/web/src/services/model_store.ts` (`InstalledArtifact` interface + `role`)

- [ ] **Step 1: Migration** — create `migrations/0NN_installed_artifact_role.sql`:

```sql
ALTER TABLE model_store_installed_artifacts ADD COLUMN role TEXT NOT NULL DEFAULT 'other';
```
(Confirm how migrations are registered — check `crates/nexus-storage/src/sqlite/migrations.rs`; add the new file to the embedded list if migrations are explicitly enumerated there.)

- [ ] **Step 2: `InstalledArtifactRecord` + `record()`** — `install_map.rs`:
  - Add `pub role: nexus_models_store::types::DependencyRole,` — i.e. `crate::types::DependencyRole` — to `InstalledArtifactRecord`.
  - In `record()` INSERT: add `role` column + bind. Use a helper `role_as_str(role)` (there is already `role_as_str` used by the job-artifacts INSERT in store.rs — reuse or mirror it; it maps DependencyRole → snake_case str). Bind `role_as_str(record.role)`.
  - In `InstalledArtifactRow`: add `pub role: String,`.
  - In the SELECT(s) in `list_all` / `find_by_artifact` / any row read: add `role` to the column list and to `parse_row` (default `"other"` if NULL).

- [ ] **Step 3: Capture `target.role` in `record_install`** — `orchestrator.rs`, where `InstalledArtifactRecord { .. }` is built (~line 677): add `role: target.role,`.

- [ ] **Step 4: Expose on the DTO** — `installed.rs`:
  - `InstalledArtifactDto`: add `pub role: String,`.
  - `from_row`: set `role: row.role` (the row now carries it).

- [ ] **Step 5: Frontend type** — `apps/web/src/services/model_store.ts`, `InstalledArtifact` interface: add `role: string;`.

- [ ] **Step 6: Test** — in `install_map.rs` `#[cfg(test)]`, add a round-trip: record an artifact with `role = DependencyRole::Lora`, list it, assert the row's `role == "lora"`. (Mirror existing install_map tests — they set up a temp sqlite + run migrations. Ensure the new migration is applied in the test harness.)

Run: `cargo test -p nexus-models-store install_map` then `cargo build`.

- [ ] **Step 7: Commit**
```bash
git add migrations/ crates/nexus-models-store/ crates/nexus-api/src/handlers/model_store/installed.rs apps/web/src/services/model_store.ts
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" commit -m "feat(model-store): persist + expose artifact role on install ledger"
```

---

## Task 3: Worker — apply user LoRA (high/low) with weight + mismatch warning

**Files:**
- Modify: `extensions/builtin/svi2-pro/worker/src/svi2_video_worker/pipeline_svi2.py`
- Test: `extensions/builtin/svi2-pro/worker/tests/test_user_lora.py` (new)

> Run worker tests from `extensions/builtin/svi2-pro/worker`: `uv run pytest tests/test_user_lora.py -q` (or the repo's established pytest invocation — check README/pyproject; if `uv` unavailable use `python -m pytest`).

- [ ] **Step 1: Failing test** — `tests/test_user_lora.py`:

```python
from svi2_video_worker.pipeline_svi2 import validate_render_params

def test_user_lora_params_normalized_and_clamped():
    p = validate_render_params({
        "user_lora_high_path": "/m/a.safetensors",
        "user_lora_low_path": "/m/b.safetensors",
        "user_lora_high_weight": 5.0,
        "user_lora_low_weight": -1.0,
    })
    assert p["user_lora_high_path"] == "/m/a.safetensors"
    assert p["user_lora_low_path"] == "/m/b.safetensors"
    assert p["user_lora_high_weight"] == 2.0   # clamped to max 2
    assert p["user_lora_low_weight"] == 0.0    # clamped to min 0

def test_user_lora_defaults_none():
    p = validate_render_params({})
    assert p["user_lora_high_path"] is None
    assert p["user_lora_low_path"] is None
    assert p["user_lora_high_weight"] == 1.0
    assert p["user_lora_low_weight"] == 1.0
```

- [ ] **Step 2: Run → FAIL** (keys absent).

- [ ] **Step 3: Extend `validate_render_params`** — add to its returned dict (mirror the existing `distill_lora_*` handling):

```python
        "user_lora_high_path": params.get("user_lora_high_path") or None,
        "user_lora_low_path": params.get("user_lora_low_path") or None,
        "user_lora_high_weight": _clamp01_2(params.get("user_lora_high_weight")),
        "user_lora_low_weight": _clamp01_2(params.get("user_lora_low_weight")),
```
And a module-level helper:
```python
def _clamp01_2(v: object) -> float:
    try:
        f = float(v) if v is not None else 1.0
    except (TypeError, ValueError):
        f = 1.0
    return max(0.0, min(2.0, f))
```

- [ ] **Step 4: Thread into `_build_expert`** — extend its signature with `user_lora_path: Optional[Path] = None, user_lora_weight: float = 1.0`. After the existing svi + distill wrapping, add:

```python
    if user_lora_path is not None and user_lora_path.exists():
        upairs = load_lora_pairs(user_lora_path)
        if user_lora_weight != 1.0:
            upairs = {k: (a, b, s * user_lora_weight) for k, (a, b, s) in upairs.items()}
        user_audit = wrap_module_with_lora(dit, upairs)
        if isinstance(lora_audit, dict):
            lora_audit["user"] = user_audit
        else:
            lora_audit = {"svi": lora_audit, "user": user_audit}
```

- [ ] **Step 5: Pass high/low through `_build_experts`** — where `high`/`low` experts are built (~line 484), pass the high path/weight to the high expert and the low path/weight to the low expert:

```python
    uh = params.get("user_lora_high_path"); ul = params.get("user_lora_low_path")
    high = _build_expert(dit_high, _resolve(models_dir, "svi-lora-high"), distill_high,
                         Path(uh) if uh else None, params.get("user_lora_high_weight", 1.0))
    low = _build_expert(dit_low, _resolve(models_dir, "svi-lora-low"), distill_low,
                        Path(ul) if ul else None, params.get("user_lora_low_weight", 1.0))
```

- [ ] **Step 6: Mismatch warning** — where the render result/report is assembled (the audit dict already records `high.lora_audit`/`low.lora_audit`), add: if a user LoRA was supplied but its `user_audit["wrapped_count"] == 0`, append a human warning string into the result's warnings list (find how the render result returns warnings/report; if none exists, add a `warnings: list[str]` to the returned dict). Message e.g. `"user LoRA (high) did not match the model (0 modules applied) — likely a non-Wan2.2 LoRA"`.

- [ ] **Step 7: Apply-logic test** — add a test that builds a tiny `torch.nn.Module` with a couple Linear submodules, writes a minimal LoRA `.safetensors` matching one module, and asserts `wrap_module_with_lora` returns `wrapped_count >= 1`; and that a non-matching LoRA yields `wrapped_count == 0`. (If constructing a real DiT is too heavy, unit-test `load_lora_pairs` scaling + `wrap_module_with_lora` on a stub module — the existing worker tests show the pattern.)

Run: `uv run pytest tests/test_user_lora.py -q` → PASS.

- [ ] **Step 8: Commit**
```bash
git add extensions/builtin/svi2-pro/worker/
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" commit -m "feat(svi2-pro/worker): apply user LoRA (high/low) with weight + mismatch warning"
```

---

## Task 4: svi2-pro web — LoRA pickers (high/low) + weight, wired to render params

**Files:** (all under `extensions/builtin/svi2-pro/web/src/`)
- Modify: the `RenderParams` type (services/types.ts or domain) — add `user_lora_high_path?`, `user_lora_low_path?`, `user_lora_high_weight?`, `user_lora_low_weight?`.
- Create: a `LoraPicker` component (dropdown of installed LoRAs + weight slider) — one instance for high, one for low.
- Modify: a service to fetch installed LoRAs.
- Modify: `store/render_request_store.tsx` + the form view to render the two pickers and bind values.
- Test: a vitest for the installed-LoRA fetch/filter + the picker.

> Run svi2 web tests from `extensions/builtin/svi2-pro/web`. If its node_modules is missing in the worktree, junction it from the main repo (`cmd //c mklink /J node_modules D:\Workspace\repos\nexus-dnn\extensions\builtin\svi2-pro\web\node_modules`) and run vitest directly: `node node_modules/vitest/vitest.mjs run <path>` (pnpm install-sync fails on junction). Type-check via `node node_modules/typescript/bin/tsc --noEmit -p tsconfig.json` if a tsconfig exists.

- [ ] **Step 1: Installed-LoRA fetcher (failing test first)** — add a service fn that GETs the host endpoint `/api/v1/model-store/installed` and returns artifacts filtered to `role === "lora"` and `state`/format sane. (The svi2 web uses same-origin `/api`; mirror its existing apiFetch/client pattern.) Test: given a fake response with mixed roles, the fn returns only `role==="lora"` entries with their `install_path` + `family_id` + `filename`.

```ts
export interface InstalledLora { artifact_id: string; family_id: string; filename: string; install_path: string; }
export function filterLoras(rows: Array<{ role: string; install_path: string | null; artifact_id: string; family_id: string; filename: string }>): InstalledLora[] {
  return rows
    .filter((r) => r.role === "lora" && !!r.install_path)
    .map((r) => ({ artifact_id: r.artifact_id, family_id: r.family_id, filename: r.filename, install_path: r.install_path as string }));
}
```
(Plus a thin `fetchInstalledLoras()` that calls the endpoint and runs `filterLoras`.)

- [ ] **Step 2: Run the filter test → PASS** (pure fn).

- [ ] **Step 3: `LoraPicker` component** — props `{ label, value: string | null, weight: number, options: InstalledLora[], onChange(path|null), onWeight(n) }`. Renders a `<select>` (None + each LoRA by `filename`/`family_id`) + a weight `<input type=range min=0 max=2 step=0.05>`. Matches svi2 web's existing field styling.

- [ ] **Step 4: Wire into the render store + form** — load installed LoRAs on mount (useEffect → fetchInstalledLoras); render two `LoraPicker`s ("LoRA — high noise", "LoRA — low noise"); on change set `params.user_lora_high_path`/`user_lora_high_weight` (and low) via `updateParam`. Because the store POSTs `params` opaquely, these flow to the worker with no further wiring.

- [ ] **Step 5: Verify** — `node node_modules/vitest/vitest.mjs run <new test>` PASS; tsc clean. (No backend change needed for the values to reach the worker.)

- [ ] **Step 6: Commit**
```bash
git add extensions/builtin/svi2-pro/web/src/
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" commit -m "feat(svi2-pro/web): high/low LoRA pickers wired to render params"
```

---

## Task 5: Rebuild svi2 web dist + final review

**Files:** `extensions/builtin/svi2-pro/web/dist/*` (committed bundle)

- [ ] **Step 1: Build the bundle** — from `extensions/builtin/svi2-pro/web`: run the build (`node node_modules/vite/bin/vite.js build` with its config, or the package.json build script invoked via node to avoid pnpm install-sync). Confirm `dist/` updates.

- [ ] **Step 2: Commit dist**
```bash
git add extensions/builtin/svi2-pro/web/dist
git -c user.name="Lazar Dilov" -c user.email="ldilov@yahoo.com" commit -m "chore(svi2-pro/web): rebuild dist with LoRA pickers"
```

- [ ] **Step 3: Full verify**
```bash
cargo build
cargo test -p nexus-models-store -p nexus-api
cd extensions/builtin/svi2-pro/worker && uv run pytest -q
```

- [ ] **Step 4: Boundary grep** — host changes stay generic:
```bash
grep -rn "svi2\|local-llm" crates/nexus-models-store/src/downloads/install_map.rs crates/nexus-api/src/handlers/model_store/installed.rs migrations/0NN_installed_artifact_role.sql || echo "clean"
```
Expected: clean (no extension ids in host changes).

- [ ] **Step 5: Final code review** (subagent-driven final reviewer), then superpowers:finishing-a-development-branch.

---

## Self-review (against design)

- Pick a downloaded LoRA in a recipe → Tasks 2 (role persisted/exposed) + 4 (pickers read `/installed`, filter role=lora, send `install_path`).
- High/low separate → Tasks 3 (worker high/low args) + 4 (two pickers).
- Worker applies via existing lora.py → Task 3 (reuses load_lora_pairs/wrap_module_with_lora + scale).
- Filter to LoRAs via role → Tasks 1 (civitai tags role=Lora) + 2 (persist/expose role).
- Mismatch safety → Task 3 step 6 (wrapped_count==0 warning).
- Boundary: host changes (types, resolver, install ledger, installed DTO) are generic — Task 5 grep guard. LoRA application is svi2-local.

**Known limitations (v1):** direct-URL LoRAs (non-civitai) record `role=primary` so won't appear in the LoRA-filtered picker — civitai is the supported LoRA source for v1. Modality is not persisted on the install ledger (role is the discriminator); `Modality::Lora` is used for foundry card labels only. Arch-mismatched LoRAs no-op with a surfaced warning rather than a hard error.
