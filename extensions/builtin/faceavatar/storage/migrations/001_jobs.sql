-- trellis2 extension-owned storage (host-derived prefix: ext_trellis2__).
-- The host runs this DDL namespaced; it never reads/writes these tables.
CREATE TABLE IF NOT EXISTS ext_trellis2__generation_jobs (
    job_id              TEXT PRIMARY KEY NOT NULL,
    input_image_ref     TEXT NOT NULL,           -- host artifact id (soft FK)
    params_json         TEXT NOT NULL,
    status              TEXT NOT NULL DEFAULT 'queued',
    output_glb_ref      TEXT,                     -- host artifact id of the GLB
    metadata_json       TEXT,
    error_detail        TEXT,
    created_at          INTEGER NOT NULL,
    started_at          INTEGER,
    finished_at         INTEGER
);

CREATE INDEX IF NOT EXISTS ext_trellis2_idx_jobs_status
    ON ext_trellis2__generation_jobs (status);

CREATE INDEX IF NOT EXISTS ext_trellis2_idx_jobs_created
    ON ext_trellis2__generation_jobs (created_at);
