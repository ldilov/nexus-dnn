CREATE TABLE IF NOT EXISTS host_model_installs (
    install_id             TEXT PRIMARY KEY NOT NULL,
    family                 TEXT NOT NULL,
    version                TEXT NOT NULL,
    quantization           TEXT,
    variant                TEXT NOT NULL DEFAULT 'default',
    install_root           TEXT NOT NULL,
    files_manifest         TEXT NOT NULL,
    sha256_root            TEXT NOT NULL,
    source_revision        TEXT NOT NULL,
    state                  TEXT NOT NULL,
    last_failure_category  TEXT,
    source_kind            TEXT NOT NULL,
    source_url             TEXT,
    license_spdx           TEXT,
    license_url            TEXT,
    provenance_note        TEXT,
    private_model          INTEGER NOT NULL DEFAULT 0,
    owner_extension_id     TEXT,
    created_at             TEXT NOT NULL,
    updated_at             TEXT NOT NULL,
    CHECK (
        (private_model = 0 AND owner_extension_id IS NULL)
        OR
        (private_model = 1 AND owner_extension_id IS NOT NULL)
    ),
    CHECK (
        state IN ('queued', 'downloading', 'verifying', 'ready', 'corrupt', 'reclaimed', 'failed')
    ),
    CHECK (
        source_kind IN ('huggingface', 'direct_url', 'local_import', 'bundled')
    )
);

CREATE UNIQUE INDEX IF NOT EXISTS host_model_installs_identity
    ON host_model_installs (
        family,
        version,
        COALESCE(quantization, ''),
        variant,
        sha256_root,
        private_model,
        COALESCE(owner_extension_id, '')
    );

CREATE INDEX IF NOT EXISTS host_model_installs_state
    ON host_model_installs (state);

CREATE INDEX IF NOT EXISTS host_model_installs_family_version
    ON host_model_installs (family, version);

CREATE TABLE IF NOT EXISTS host_model_leases (
    lease_id               TEXT PRIMARY KEY NOT NULL,
    install_id             TEXT NOT NULL REFERENCES host_model_installs(install_id),
    extension_id           TEXT NOT NULL,
    device                 TEXT NOT NULL,
    vram_reserved_bytes    INTEGER NOT NULL DEFAULT 0,
    acquired_at            TEXT NOT NULL,
    released_at            TEXT
);

CREATE INDEX IF NOT EXISTS host_model_leases_device_active
    ON host_model_leases (device, released_at);

CREATE INDEX IF NOT EXISTS host_model_leases_install
    ON host_model_leases (install_id);

CREATE INDEX IF NOT EXISTS host_model_leases_extension
    ON host_model_leases (extension_id);
