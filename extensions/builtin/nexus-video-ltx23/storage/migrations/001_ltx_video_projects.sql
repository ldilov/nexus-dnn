CREATE TABLE IF NOT EXISTS ext_nexus_video_ltx23__projects (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    input_image_artifact_id TEXT,
    style_prompt TEXT,
    subject_prompt TEXT,
    negative_prompt TEXT,
    default_runtime_profile TEXT,
    settings_json TEXT NOT NULL DEFAULT '{}',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT
);
CREATE INDEX IF NOT EXISTS ext_nexus_video_ltx23_idx_projects_created_at
  ON ext_nexus_video_ltx23__projects(created_at);

CREATE TABLE IF NOT EXISTS ext_nexus_video_ltx23__style_profiles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    style_prompt TEXT NOT NULL,
    subject_prompt TEXT,
    negative_prompt TEXT,
    reference_image_artifact_id TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    deleted_at TEXT
);
