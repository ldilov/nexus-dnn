# Spec 046 — Data Model

All extension tables under `ext_nexus_video_ltx23__` (computed by host from extension id slug via `prefix_mode: host_derived`).

## Tables

### `ext_nexus_video_ltx23__projects`

A user-facing project — a saved configuration the user can re-render with different prompts/durations. Soft-deleted via `deleted_at`.

| column | type | notes |
|---|---|---|
| id | TEXT PK | `vidproj_<ulid>` |
| title | TEXT NOT NULL | user-supplied |
| description | TEXT | optional |
| input_image_artifact_id | TEXT | soft FK to host artifact store |
| style_prompt | TEXT | persists style lock |
| subject_prompt | TEXT | persists subject lock |
| negative_prompt | TEXT | |
| default_runtime_profile | TEXT | `auto` / `rtx50-nvfp4` / `rtx50-fp8` / `rtx40-fp8` |
| settings_json | TEXT NOT NULL DEFAULT '{}' | reserved for advanced fields |
| created_at | TEXT NOT NULL | ISO 8601 |
| updated_at | TEXT NOT NULL | |
| deleted_at | TEXT | soft-delete marker |

Index: `created_at`.

### `ext_nexus_video_ltx23__style_profiles`

Reusable style/subject/negative locks library. Not required for v1 vertical slice but migrated up-front per spec template.

| column | type | notes |
|---|---|---|
| id | TEXT PK | |
| title | TEXT NOT NULL | |
| style_prompt | TEXT NOT NULL | |
| subject_prompt | TEXT | |
| negative_prompt | TEXT | |
| reference_image_artifact_id | TEXT | soft FK |
| created_at | TEXT NOT NULL | |
| updated_at | TEXT NOT NULL | |
| deleted_at | TEXT | |

### `ext_nexus_video_ltx23__runs`

One row per render run.

| column | type | notes |
|---|---|---|
| id | TEXT PK | `run_<ulid>` |
| project_id | TEXT NOT NULL | soft FK to projects |
| status | TEXT NOT NULL | `queued` / `planning` / `waiting_for_runtime` / `rendering` / `joining` / `interpolating` / `encoding` / `completed` / `failed_retryable` / `failed` / `cancelled` |
| runtime_profile | TEXT | resolved profile (e.g. `rtx40-fp8`) |
| runtime_id | TEXT | as returned by lease |
| runtime_install_id | TEXT | as returned by lease |
| runtime_lease_id | TEXT | active lease |
| requested_duration_seconds | REAL NOT NULL | from user input |
| planned_duration_seconds | REAL | from RenderPlan |
| width | INTEGER NOT NULL | |
| height | INTEGER NOT NULL | |
| base_fps | INTEGER NOT NULL | |
| output_fps | INTEGER NOT NULL | |
| segment_count | INTEGER NOT NULL DEFAULT 0 | |
| seed | INTEGER | base seed |
| quality_preset | TEXT NOT NULL | `draft` / `balanced_16gb` / `quality_16gb` / `high` |
| render_mode | TEXT NOT NULL | `external_segments` for v1 |
| request_json | TEXT NOT NULL | full original request body |
| plan_json | TEXT | full RenderPlan |
| error_code | TEXT | from failure taxonomy |
| error_message | TEXT | |
| final_artifact_id | TEXT | soft FK to host artifact store, set on completion |
| created_at | TEXT NOT NULL | |
| started_at | TEXT | |
| completed_at | TEXT | |
| cancelled_at | TEXT | |

Indexes: `project_id`, `status`.

### `ext_nexus_video_ltx23__segments`

One row per segment per run.

| column | type | notes |
|---|---|---|
| id | TEXT PK | `seg_<ulid>` |
| run_id | TEXT NOT NULL | soft FK to runs |
| segment_index | INTEGER NOT NULL | 0-based |
| status | TEXT NOT NULL | `pending` / `running` / `completed` / `failed` / `skipped` / `retrying` |
| start_time_seconds | REAL NOT NULL | offset into final video |
| duration_seconds | REAL NOT NULL | |
| overlap_seconds | REAL NOT NULL DEFAULT 0 | continuity overlap |
| frame_count | INTEGER NOT NULL | LTX frame count = 8n+1 |
| seed | INTEGER | derived per segment, persisted BEFORE render starts (continuity contract) |
| prompt | TEXT | per-segment action prompt (style_lock + subject_lock omitted, materialised by runtime) |
| negative_prompt | TEXT | |
| input_start_frame_artifact_id | TEXT | continuity: last frame of segment N-1 |
| raw_video_artifact_id | TEXT | per-segment MP4 |
| last_frame_artifact_id | TEXT | continuity output |
| preview_artifact_id | TEXT | small webp / jpeg |
| log_artifact_id | TEXT | runtime log dump |
| error_code | TEXT | |
| error_message | TEXT | |
| started_at | TEXT | |
| completed_at | TEXT | |

Unique: `(run_id, segment_index)`. Indexes: `run_id`, `status`.

## In-memory DTOs (Rust)

### `CreateRenderRequest`

```rust
pub struct CreateRenderRequest {
    pub project_id: Option<String>,
    pub input_image_artifact_id: Option<String>,
    pub prompt: String,
    pub negative_prompt: Option<String>,
    pub style_prompt: Option<String>,
    pub duration_seconds: f32,
    pub runtime_profile: RuntimeProfilePreference,
    pub quality_preset: QualityPreset,
    pub width: Option<u32>,
    pub height: Option<u32>,
    pub base_fps: Option<u32>,
    pub output_fps: Option<u32>,
    pub seed: Option<u64>,
}

pub enum RuntimeProfilePreference {
    Auto,
    Rtx50Nvfp4,
    Rtx50Fp8,
    Rtx40Fp8,
}

pub enum QualityPreset {
    Draft,
    Balanced16gb,
    Quality16gb,
    High,
}
```

### `RenderPlan`

```rust
pub struct RenderPlan {
    pub mode: RenderMode,
    pub width: u32,
    pub height: u32,
    pub base_fps: u32,
    pub output_fps: u32,
    pub requested_duration_seconds: f32,
    pub planned_duration_seconds: f32,
    pub segment_count: u32,
    pub segments: Vec<RenderSegmentPlan>,
    pub runtime_profile: String,
    pub gpu_memory_budget_mb: u32,
    pub interpolation: InterpolationMethod,
    pub warnings: Vec<PlanWarning>,
    pub vram_risk: VramRisk,
}

pub enum RenderMode {
    ExternalSegments,
}

pub struct RenderSegmentPlan {
    pub index: u32,
    pub start_time_seconds: f32,
    pub duration_seconds: f32,
    pub overlap_seconds: f32,
    pub frame_count: u32,
    pub seed: u64,
    pub action_prompt: Option<String>,
}

pub enum InterpolationMethod {
    Rife2x,
    None,
}

pub enum VramRisk {
    Safe,
    Moderate,
    Risky,
    LikelyToFail,
    Unsupported,
}

pub struct PlanWarning {
    pub code: String,
    pub message: String,
}
```

## Continuity contract (D2.1 enforced via data model)

The continuity guarantee is implemented by these invariants:

1. **Seed**: `segments.seed` is computed from `runs.seed` + `segment_index` and persisted BEFORE the segment starts rendering. Re-rendering a segment after restart uses the same seed value.
2. **Input frame**: `segments.input_start_frame_artifact_id` for segment N (N > 0) MUST equal `segments.last_frame_artifact_id` of segment N-1. This is set by the event forwarder when segment N-1 completes.
3. **Restart resumption**: when the supervisor restarts the runtime mid-run, the new runtime process is invoked with the next `pending` segment's persisted seed + persisted input frame. No in-memory state crosses the restart boundary.
4. **Forced-restart test (P3)**: forcibly kill the runtime between segments 3 and 4 of a 9-segment render. Re-acquire lease, resume from segment 4. Compare final MP4 frame-by-frame with a control run; assert no visual discontinuity at the 45s mark beyond a threshold (RMSE < 5).

## State machine — run statuses

```text
queued
  ↓
planning
  ↓
waiting_for_runtime  ←  (lease retry on transient runtime errors)
  ↓
rendering  ←→  (segment N completes, segment N+1 starts; supervisor may restart runtime here)
  ↓
joining     (post-segment join interpolation)
  ↓
interpolating  (final FPS bump)
  ↓
encoding    (final MP4)
  ↓
completed | failed | failed_retryable | cancelled
```

Cancellation can occur from any non-terminal state. The transition writes `cancelled_at` and releases the lease.

## Artifact registrations

Every artifact registered with the host artifact store carries:

| field | example |
|---|---|
| owner_extension_id | `nexus.video.ltx23` |
| owner_run_id | `run_<ulid>` |
| kind | `image/png` (segment last-frame), `video/mp4` (segment raw), `video/mp4` (final), `application/json` (render plan, runtime log), `text/plain` (runtime log) |
| duration_ms | for video artifacts |
| width / height | for image + video artifacts |
| frame_count | for video artifacts |
