CREATE TABLE IF NOT EXISTS ext_emotion_tts__voice_assets (
    voice_asset_id       TEXT PRIMARY KEY NOT NULL,
    deployment_id        TEXT NOT NULL,
    display_name         TEXT NOT NULL,
    kind                 TEXT NOT NULL
                              CHECK (kind IN ('speaker', 'emotion', 'mixed')),
    audio_artifact_ref   TEXT NOT NULL,
    content_sha256       TEXT NOT NULL,
    reference_text       TEXT,
    sample_rate          INTEGER,
    duration_ms          INTEGER,
    source_type          TEXT NOT NULL
                              CHECK (source_type IN ('upload', 'import', 'recording', 'artifact_ref')),
    notes                TEXT,
    is_active            INTEGER NOT NULL DEFAULT 1
                              CHECK (is_active IN (0, 1)),
    created_at           INTEGER NOT NULL,
    updated_at           INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_voice_assets_deployment
    ON ext_emotion_tts__voice_assets (deployment_id);

CREATE INDEX IF NOT EXISTS idx_voice_assets_content
    ON ext_emotion_tts__voice_assets (content_sha256);
