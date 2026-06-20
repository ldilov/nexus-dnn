-- Migration 023 — Generic host-owned per-deployment, per-extension settings.
-- Opaque settings_json blob mirroring backend_runtime_settings (018). Host never parses it.

CREATE TABLE IF NOT EXISTS deployment_extension_settings (
    id                          TEXT PRIMARY KEY NOT NULL,
    deployment_id               TEXT NOT NULL REFERENCES deployments(id),
    extension_id                TEXT NOT NULL,
    settings_json               TEXT NOT NULL DEFAULT '{}',
    settings_schema_fingerprint TEXT,
    created_at                  TEXT NOT NULL,
    updated_at                  TEXT NOT NULL,
    UNIQUE (deployment_id, extension_id)
);

CREATE INDEX IF NOT EXISTS idx_dep_ext_settings_dep
    ON deployment_extension_settings(deployment_id);
