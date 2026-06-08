CREATE TABLE IF NOT EXISTS ext_svi2_pro__render_jobs (
    job_id              TEXT PRIMARY KEY NOT NULL,
    preset_id           TEXT,
    params_json         TEXT NOT NULL,
    status              TEXT NOT NULL DEFAULT 'queued'
                             CHECK (status IN ('queued', 'running', 'completed', 'failed', 'cancelled')),
    output_path         TEXT,
    render_report_json  TEXT,
    error_category      TEXT,
    error_detail        TEXT,
    extension_version   TEXT NOT NULL,
    created_at          INTEGER NOT NULL,
    started_at          INTEGER,
    finished_at         INTEGER
);

CREATE INDEX IF NOT EXISTS ext_svi2_pro_idx_render_jobs_created
    ON ext_svi2_pro__render_jobs (created_at DESC);

CREATE INDEX IF NOT EXISTS ext_svi2_pro_idx_render_jobs_status
    ON ext_svi2_pro__render_jobs (status);
