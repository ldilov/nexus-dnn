CREATE TABLE IF NOT EXISTS backend_runtime_catalog (
    runtime_id                TEXT PRIMARY KEY NOT NULL,
    display_name              TEXT NOT NULL,
    source_extension_id       TEXT NOT NULL,
    source_extension_version  TEXT NOT NULL,
    contribution_checksum     TEXT NOT NULL,
    runtime_family            TEXT NOT NULL,
    transport                 TEXT NOT NULL DEFAULT 'stdio',
    implementation_status     TEXT NOT NULL DEFAULT 'available'
                              CHECK (implementation_status IN ('available','unavailable','deprecated','abandoned')),
    version_manifest_path     TEXT NOT NULL,
    worker_entrypoint         TEXT NOT NULL,
    capability_tags_json      TEXT NOT NULL DEFAULT '[]',
    supported_roles_json      TEXT NOT NULL DEFAULT '[]',
    created_at                INTEGER NOT NULL,
    updated_at                INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_catalog_source_ext
    ON backend_runtime_catalog (source_extension_id);

CREATE INDEX IF NOT EXISTS idx_catalog_family_status
    ON backend_runtime_catalog (runtime_family, implementation_status);
