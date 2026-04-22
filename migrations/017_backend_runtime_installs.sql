CREATE TABLE IF NOT EXISTS backend_runtime_installs (
    runtime_install_id      TEXT PRIMARY KEY NOT NULL,
    runtime_id              TEXT NOT NULL,
    release_id              TEXT NOT NULL,
    platform                TEXT NOT NULL,
    accelerator_profile     TEXT NOT NULL,
    install_path            TEXT NOT NULL,
    entrypoint_path         TEXT,
    artifact_hash           TEXT,
    status                  TEXT NOT NULL DEFAULT 'pending'
                            CHECK (status IN ('pending','downloading','validating','validated','failed','abandoned')),
    current_phase           TEXT,
    validated_at            INTEGER,
    last_failure_category   TEXT,
    last_failure_detail     TEXT,
    created_at              INTEGER NOT NULL,
    updated_at              INTEGER NOT NULL,
    UNIQUE (runtime_id, release_id, platform, accelerator_profile)
);

CREATE INDEX IF NOT EXISTS idx_installs_runtime
    ON backend_runtime_installs (runtime_id);

CREATE INDEX IF NOT EXISTS idx_installs_status
    ON backend_runtime_installs (status);
