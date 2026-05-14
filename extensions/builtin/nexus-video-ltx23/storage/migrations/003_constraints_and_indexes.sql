-- Migration 003: tighten the segment/run schema after the /octo:review pass.
--
-- Goals:
--   1. Add FK between segments and runs with CASCADE delete (was missing,
--      so orphaned segments would accumulate when the run row is dropped).
--   2. CHECK constraints on the `status` columns so a typo in a writer
--      can't silently land a malformed value (the COALESCE-on-timestamp
--      logic in update_run_status keys off exact match).
--   3. Length CHECK on error_code + error_message so the worker can't
--      bypass the host-side `truncate_status_msg` cap by writing
--      directly via a future code path.
--   4. Composite indexes for the common list_segments + retry-target
--      lookup patterns.
--
-- SQLite can't ALTER TABLE ADD CONSTRAINT, so this migration uses the
-- canonical "create new, copy, drop old, rename" pattern. Wrapped in a
-- transaction by the migration runner; foreign_keys is disabled during
-- the rebuild so the temporary state of orphaned-by-rebuild rows
-- doesn't trip the new FK on insert.

PRAGMA foreign_keys = OFF;

-- ── runs ──────────────────────────────────────────────────────────────────
CREATE TABLE ext_nexus_video_ltx23__runs_new (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN (
        'queued', 'waiting_for_runtime', 'rendering', 'joining',
        'encoding', 'completed', 'cancelled', 'failed'
    )),
    runtime_profile TEXT,
    runtime_id TEXT,
    runtime_install_id TEXT,
    runtime_lease_id TEXT,
    requested_duration_seconds REAL NOT NULL,
    planned_duration_seconds REAL,
    width INTEGER NOT NULL,
    height INTEGER NOT NULL,
    base_fps INTEGER NOT NULL,
    output_fps INTEGER NOT NULL,
    segment_count INTEGER NOT NULL DEFAULT 0,
    seed INTEGER,
    quality_preset TEXT NOT NULL,
    render_mode TEXT NOT NULL,
    request_json TEXT NOT NULL,
    plan_json TEXT,
    error_code TEXT CHECK (error_code IS NULL OR length(error_code) <= 64),
    error_message TEXT CHECK (error_message IS NULL OR length(error_message) <= 2048),
    final_artifact_id TEXT,
    created_at TEXT NOT NULL,
    started_at TEXT,
    completed_at TEXT,
    cancelled_at TEXT
);

INSERT INTO ext_nexus_video_ltx23__runs_new
SELECT id, project_id, status, runtime_profile, runtime_id, runtime_install_id,
       runtime_lease_id, requested_duration_seconds, planned_duration_seconds,
       width, height, base_fps, output_fps, segment_count, seed, quality_preset,
       render_mode, request_json, plan_json,
       -- Truncate any pre-existing oversized values rather than fail the
       -- migration. The new CHECK rejects future writes; existing rows
       -- get trimmed to the allowed length.
       CASE WHEN error_code IS NOT NULL AND length(error_code) > 64
            THEN substr(error_code, 1, 64) ELSE error_code END,
       CASE WHEN error_message IS NOT NULL AND length(error_message) > 2048
            THEN substr(error_message, 1, 2048) ELSE error_message END,
       final_artifact_id, created_at, started_at, completed_at, cancelled_at
FROM ext_nexus_video_ltx23__runs;

DROP TABLE ext_nexus_video_ltx23__runs;
ALTER TABLE ext_nexus_video_ltx23__runs_new RENAME TO ext_nexus_video_ltx23__runs;

CREATE INDEX ext_nexus_video_ltx23_idx_runs_project_id
  ON ext_nexus_video_ltx23__runs(project_id);
CREATE INDEX ext_nexus_video_ltx23_idx_runs_status
  ON ext_nexus_video_ltx23__runs(status);
CREATE INDEX ext_nexus_video_ltx23_idx_runs_created_at
  ON ext_nexus_video_ltx23__runs(created_at);

-- ── segments ──────────────────────────────────────────────────────────────
CREATE TABLE ext_nexus_video_ltx23__segments_new (
    id TEXT PRIMARY KEY,
    run_id TEXT NOT NULL REFERENCES ext_nexus_video_ltx23__runs(id)
        ON DELETE CASCADE,
    segment_index INTEGER NOT NULL,
    status TEXT NOT NULL CHECK (status IN (
        'queued', 'rendering', 'completed', 'failed', 'cancelled', 'skipped'
    )),
    start_time_seconds REAL NOT NULL,
    duration_seconds REAL NOT NULL,
    overlap_seconds REAL NOT NULL DEFAULT 0,
    frame_count INTEGER NOT NULL,
    seed INTEGER,
    prompt TEXT,
    negative_prompt TEXT,
    input_start_frame_artifact_id TEXT,
    raw_video_artifact_id TEXT,
    last_frame_artifact_id TEXT,
    preview_artifact_id TEXT,
    log_artifact_id TEXT,
    error_code TEXT CHECK (error_code IS NULL OR length(error_code) <= 64),
    error_message TEXT CHECK (error_message IS NULL OR length(error_message) <= 2048),
    started_at TEXT,
    completed_at TEXT,
    UNIQUE(run_id, segment_index)
);

INSERT INTO ext_nexus_video_ltx23__segments_new
SELECT id, run_id, segment_index, status, start_time_seconds, duration_seconds,
       overlap_seconds, frame_count, seed, prompt, negative_prompt,
       input_start_frame_artifact_id, raw_video_artifact_id, last_frame_artifact_id,
       preview_artifact_id, log_artifact_id,
       CASE WHEN error_code IS NOT NULL AND length(error_code) > 64
            THEN substr(error_code, 1, 64) ELSE error_code END,
       CASE WHEN error_message IS NOT NULL AND length(error_message) > 2048
            THEN substr(error_message, 1, 2048) ELSE error_message END,
       started_at, completed_at
FROM ext_nexus_video_ltx23__segments
-- Drop orphaned segments whose run_id no longer points to a real run.
-- Pre-FK era these could accumulate; we don't want them tripping the
-- new FK constraint on copy.
WHERE run_id IN (SELECT id FROM ext_nexus_video_ltx23__runs);

DROP TABLE ext_nexus_video_ltx23__segments;
ALTER TABLE ext_nexus_video_ltx23__segments_new RENAME TO ext_nexus_video_ltx23__segments;

-- Composite indexes covering the actual query patterns:
--   list_segments → run_id ASC, segment_index ASC (sort served by index)
--   retry-target lookup → (run_id, status='failed')
CREATE INDEX ext_nexus_video_ltx23_idx_segments_run_id_index
  ON ext_nexus_video_ltx23__segments(run_id, segment_index);
CREATE INDEX ext_nexus_video_ltx23_idx_segments_run_id_status
  ON ext_nexus_video_ltx23__segments(run_id, status);

PRAGMA foreign_keys = ON;
