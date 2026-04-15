CREATE TABLE IF NOT EXISTS host_runtime_installs (
    install_id            TEXT PRIMARY KEY NOT NULL,
    family                TEXT NOT NULL,
    version               TEXT NOT NULL,
    accelerator           TEXT NOT NULL,
    install_root          TEXT NOT NULL,
    binary_paths          TEXT NOT NULL,
    state                 TEXT NOT NULL,
    validation_result     TEXT,
    last_failure_category TEXT,
    source_url            TEXT,
    checksum              TEXT,
    created_at            TEXT NOT NULL,
    updated_at            TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS host_runtime_idx_installs_family_state
    ON host_runtime_installs(family, state);

CREATE TABLE IF NOT EXISTS host_runtime_leases (
    lease_id              TEXT PRIMARY KEY NOT NULL,
    install_id            TEXT NOT NULL REFERENCES host_runtime_installs(install_id),
    extension_id          TEXT NOT NULL,
    pid                   INTEGER,
    port                  INTEGER,
    channel_kind          TEXT NOT NULL,
    channel_address       TEXT NOT NULL,
    api_dialects          TEXT NOT NULL,
    ready                 INTEGER NOT NULL DEFAULT 0,
    created_at            TEXT NOT NULL,
    released_at           TEXT
);

CREATE INDEX IF NOT EXISTS host_runtime_idx_leases_install
    ON host_runtime_leases(install_id);

CREATE INDEX IF NOT EXISTS host_runtime_idx_leases_extension
    ON host_runtime_leases(extension_id);

CREATE TABLE IF NOT EXISTS host_runtime_state_log (
    id                    INTEGER PRIMARY KEY AUTOINCREMENT,
    install_id            TEXT NOT NULL,
    from_state            TEXT,
    to_state              TEXT NOT NULL,
    trigger               TEXT NOT NULL,
    detail                TEXT,
    occurred_at           TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS host_runtime_idx_state_log_install
    ON host_runtime_state_log(install_id);
