CREATE TABLE IF NOT EXISTS model_store_installed_artifacts (
    artifact_id       TEXT PRIMARY KEY,
    family_id         TEXT NOT NULL,
    variant_id        TEXT,
    format            TEXT NOT NULL,
    source_provider   TEXT NOT NULL,
    source_repo       TEXT NOT NULL,
    source_revision   TEXT,
    filename          TEXT NOT NULL,
    job_id            TEXT NOT NULL,
    sha256            TEXT,
    size_bytes        INTEGER,
    installed_at      TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_mstore_installed_family
    ON model_store_installed_artifacts(family_id);

CREATE INDEX IF NOT EXISTS idx_mstore_installed_variant
    ON model_store_installed_artifacts(variant_id);
