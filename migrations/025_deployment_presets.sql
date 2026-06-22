-- Migration 025: Host-owned, recipe-keyed deployment presets.
-- payload_json stores the Export envelope. recipe_key scopes presets to a module binding family.

CREATE TABLE IF NOT EXISTS deployment_presets (
    id                         TEXT PRIMARY KEY NOT NULL,
    recipe_key                 TEXT NOT NULL,
    source_extension_id        TEXT,
    name                       TEXT NOT NULL,
    description                TEXT,
    payload_json               TEXT NOT NULL,
    integrity_digest           TEXT NOT NULL,
    created_from_deployment_id TEXT,
    created_at                 TEXT NOT NULL,
    updated_at                 TEXT NOT NULL,
    UNIQUE (recipe_key, name)
);

CREATE INDEX IF NOT EXISTS idx_deployment_presets_recipe_key
    ON deployment_presets(recipe_key);
