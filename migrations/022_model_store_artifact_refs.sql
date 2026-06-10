CREATE TABLE IF NOT EXISTS model_store_artifact_refs (
    job_id        TEXT NOT NULL,
    extension_id  TEXT NOT NULL,
    created_at    TEXT NOT NULL,
    UNIQUE(job_id, extension_id)
);

CREATE INDEX IF NOT EXISTS idx_mstore_refs_job
    ON model_store_artifact_refs(job_id);

CREATE INDEX IF NOT EXISTS idx_mstore_refs_extension
    ON model_store_artifact_refs(extension_id);
