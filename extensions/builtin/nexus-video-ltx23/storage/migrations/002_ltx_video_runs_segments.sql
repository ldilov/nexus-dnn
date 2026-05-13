CREATE TABLE IF NOT EXISTS ext_nexus_video_ltx23__runs (
    id TEXT PRIMARY KEY,
    project_id TEXT NOT NULL,
    status TEXT NOT NULL,
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
    error_code TEXT,
    error_message TEXT,
    final_artifact_id TEXT,
    created_at TEXT NOT NULL,
    started_at TEXT,
    completed_at TEXT,
    cancelled_at TEXT
);
CREATE INDEX IF NOT EXISTS ext_nexus_video_ltx23_idx_runs_project_id
  ON ext_nexus_video_ltx23__runs(project_id);
CREATE INDEX IF NOT EXISTS ext_nexus_video_ltx23_idx_runs_status
  ON ext_nexus_video_ltx23__runs(status);

CREATE TABLE IF NOT EXISTS ext_nexus_video_ltx23__segments (
    id TEXT PRIMARY KEY,
    run_id TEXT NOT NULL,
    segment_index INTEGER NOT NULL,
    status TEXT NOT NULL,
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
    error_code TEXT,
    error_message TEXT,
    started_at TEXT,
    completed_at TEXT,
    UNIQUE(run_id, segment_index)
);
CREATE INDEX IF NOT EXISTS ext_nexus_video_ltx23_idx_segments_run_id
  ON ext_nexus_video_ltx23__segments(run_id);
CREATE INDEX IF NOT EXISTS ext_nexus_video_ltx23_idx_segments_status
  ON ext_nexus_video_ltx23__segments(status);
