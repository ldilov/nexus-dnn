CREATE TABLE IF NOT EXISTS backend_runtime_leases (
    lease_id                TEXT PRIMARY KEY NOT NULL,
    runtime_install_id      TEXT NOT NULL,
    owner_kind              TEXT NOT NULL
                            CHECK (owner_kind IN ('deployment','run','preview_session')),
    owner_ref               TEXT NOT NULL,
    transport               TEXT NOT NULL DEFAULT 'stdio',
    endpoint_json           TEXT,
    pid                     INTEGER,
    state                   TEXT NOT NULL DEFAULT 'starting'
                            CHECK (state IN ('starting','ready','busy','stopping','failed','released')),
    crash_recovered         INTEGER NOT NULL DEFAULT 0,
    last_failure_category   TEXT,
    acquired_at             INTEGER NOT NULL,
    released_at             INTEGER
);

CREATE INDEX IF NOT EXISTS idx_leases_install
    ON backend_runtime_leases (runtime_install_id);

CREATE INDEX IF NOT EXISTS idx_leases_state
    ON backend_runtime_leases (state);

CREATE INDEX IF NOT EXISTS idx_leases_released
    ON backend_runtime_leases (released_at);
