CREATE TABLE IF NOT EXISTS ext_emotion_tts__character_mappings (
    mapping_id                          TEXT PRIMARY KEY NOT NULL,
    deployment_id                       TEXT NOT NULL,
    character_name                      TEXT NOT NULL,
    character_name_lower                TEXT NOT NULL,
    speaker_voice_asset_id              TEXT NOT NULL,
    default_emotion_mode                TEXT NOT NULL DEFAULT 'none'
                                             CHECK (default_emotion_mode IN ('none', 'audio_ref', 'vector_preset', 'qwen_template')),
    default_emotion_voice_asset_id      TEXT,
    default_vector_preset_id            TEXT,
    default_qwen_template               TEXT,
    default_speed_factor                REAL,
    default_generation_overrides_json   TEXT NOT NULL DEFAULT '{}',
    is_active                           INTEGER NOT NULL DEFAULT 1
                                             CHECK (is_active IN (0, 1)),
    notes                               TEXT,
    created_at                          INTEGER NOT NULL,
    updated_at                          INTEGER NOT NULL,
    UNIQUE (deployment_id, character_name_lower)
);

CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_character_mappings_deployment
    ON ext_emotion_tts__character_mappings (deployment_id);

CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_character_mappings_speaker
    ON ext_emotion_tts__character_mappings (speaker_voice_asset_id);
