-- spec 007 — runtime installs and settings for the local-llm extension

BEGIN;

CREATE TABLE IF NOT EXISTS ext_local_llm_runtime_installs (
    runtime_install_id      TEXT PRIMARY KEY NOT NULL,
    backend                 TEXT NOT NULL CHECK (backend IN ('llama.cpp', 'tensorrt_llm')),
    release_id              TEXT NOT NULL,
    platform                TEXT NOT NULL CHECK (platform IN ('windows-x64', 'linux-x64')),
    accelerator_profile     TEXT NOT NULL CHECK (accelerator_profile IN ('cpu', 'cuda12', 'cuda13')),
    source_url              TEXT NOT NULL,
    checksum_sha256         TEXT,
    install_path            TEXT NOT NULL,
    binary_path             TEXT NOT NULL,
    status                  TEXT NOT NULL CHECK (status IN ('installed_unvalidated', 'ready', 'broken', 'updating')),
    installed_at            INTEGER NOT NULL,
    validated_at            INTEGER,
    last_failure_category   TEXT,
    created_at              INTEGER NOT NULL,
    updated_at              INTEGER NOT NULL,
    UNIQUE (backend, release_id, platform, accelerator_profile)
);

CREATE INDEX IF NOT EXISTS idx_ext_local_llm_runtime_installs_profile
    ON ext_local_llm_runtime_installs (backend, platform, accelerator_profile);

CREATE INDEX IF NOT EXISTS idx_ext_local_llm_runtime_installs_status
    ON ext_local_llm_runtime_installs (status);

CREATE TABLE IF NOT EXISTS ext_local_llm_runtime_settings (
    runtime_settings_id     TEXT PRIMARY KEY NOT NULL,
    backend                 TEXT NOT NULL UNIQUE CHECK (backend IN ('llama.cpp', 'tensorrt_llm')),
    install_ref             TEXT REFERENCES ext_local_llm_runtime_installs (runtime_install_id) ON DELETE SET NULL,
    threads                 INTEGER NOT NULL CHECK (threads BETWEEN 1 AND 1024),
    threads_batch           INTEGER NOT NULL CHECK (threads_batch BETWEEN 1 AND 1024),
    default_context         INTEGER NOT NULL CHECK (default_context BETWEEN 128 AND 1048576),
    parallel_requests       INTEGER NOT NULL CHECK (parallel_requests BETWEEN 1 AND 64),
    bind_address            TEXT NOT NULL DEFAULT '127.0.0.1',
    port_mode               TEXT NOT NULL CHECK (port_mode IN ('auto', 'fixed')),
    fixed_port              INTEGER CHECK (fixed_port IS NULL OR fixed_port BETWEEN 1 AND 65535),
    extra_args_json         TEXT NOT NULL DEFAULT '[]',
    created_at              INTEGER NOT NULL,
    updated_at              INTEGER NOT NULL,
    CHECK ((port_mode = 'auto' AND fixed_port IS NULL)
        OR (port_mode = 'fixed' AND fixed_port IS NOT NULL))
);

CREATE TABLE IF NOT EXISTS ext_local_llm_runtime_logs (
    id                      INTEGER PRIMARY KEY AUTOINCREMENT,
    timestamp               INTEGER NOT NULL,
    source                  TEXT NOT NULL,
    runtime_id              TEXT,
    deployment_id           TEXT,
    severity                TEXT NOT NULL CHECK (severity IN ('info', 'warn', 'error')),
    namespace               TEXT NOT NULL,
    message                 TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ext_local_llm_runtime_logs_timestamp
    ON ext_local_llm_runtime_logs (timestamp DESC);

CREATE INDEX IF NOT EXISTS idx_ext_local_llm_runtime_logs_source
    ON ext_local_llm_runtime_logs (source, timestamp DESC);

COMMIT;
