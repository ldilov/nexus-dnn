CREATE TABLE IF NOT EXISTS download_jobs (
    job_id               TEXT PRIMARY KEY,
    family_id            TEXT NOT NULL,
    source_provider      TEXT NOT NULL,
    source_repo          TEXT NOT NULL,
    requested_kind       TEXT NOT NULL CHECK (requested_kind IN ('primary', 'variant', 'bundle')),
    include_dependencies INTEGER NOT NULL DEFAULT 0,
    state                TEXT NOT NULL CHECK (state IN (
                            'queued', 'downloading', 'paused', 'downloaded',
                            'failed', 'incompatible', 'auth_required'
                         )),
    progress_bytes       INTEGER NOT NULL DEFAULT 0,
    total_bytes          INTEGER,
    error_reason         TEXT,
    warnings_json        TEXT NOT NULL DEFAULT '[]',
    created_at           TEXT NOT NULL,
    started_at           TEXT,
    finished_at          TEXT
);

CREATE TABLE IF NOT EXISTS download_job_artifacts (
    job_id            TEXT NOT NULL REFERENCES download_jobs(job_id) ON DELETE CASCADE,
    artifact_id       TEXT NOT NULL,
    filename          TEXT NOT NULL,
    role              TEXT NOT NULL,
    download_url      TEXT NOT NULL,
    expected_bytes    INTEGER,
    downloaded_bytes  INTEGER NOT NULL DEFAULT 0,
    sha256            TEXT,
    state             TEXT NOT NULL CHECK (state IN (
                         'queued', 'downloading', 'downloaded', 'failed', 'skipped'
                      )),
    PRIMARY KEY (job_id, artifact_id)
);

CREATE INDEX IF NOT EXISTS idx_download_jobs_state      ON download_jobs(state);
CREATE INDEX IF NOT EXISTS idx_download_jobs_family     ON download_jobs(family_id);
CREATE INDEX IF NOT EXISTS idx_dl_job_artifacts_state   ON download_job_artifacts(state);
