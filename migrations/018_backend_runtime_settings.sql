CREATE TABLE IF NOT EXISTS backend_runtime_settings (
    runtime_settings_id     TEXT PRIMARY KEY NOT NULL,
    runtime_id              TEXT NOT NULL UNIQUE,
    default_device          TEXT,
    default_model_family_id TEXT,
    -- Forward-compat columns (spec-032 A-11). v1 codepaths MUST NOT read these.
    keep_warm_default       INTEGER NOT NULL DEFAULT 1,
    idle_timeout_seconds    INTEGER NOT NULL DEFAULT 0,
    env_overrides_json      TEXT NOT NULL DEFAULT '{}',
    created_at              INTEGER NOT NULL,
    updated_at              INTEGER NOT NULL
);
