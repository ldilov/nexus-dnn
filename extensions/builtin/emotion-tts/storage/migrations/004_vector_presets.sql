CREATE TABLE IF NOT EXISTS ext_emotion_tts__vector_presets (
    preset_id       TEXT PRIMARY KEY NOT NULL,
    deployment_id   TEXT NOT NULL,
    preset_name     TEXT NOT NULL,
    vector_json     TEXT NOT NULL,
    created_at      INTEGER NOT NULL,
    updated_at      INTEGER NOT NULL,
    UNIQUE (deployment_id, preset_name)
);

CREATE INDEX IF NOT EXISTS idx_vector_presets_deployment
    ON ext_emotion_tts__vector_presets (deployment_id);
