CREATE TABLE IF NOT EXISTS ext_emotion_tts__utterances (
    utterance_id                        TEXT PRIMARY KEY NOT NULL,
    run_id                              TEXT NOT NULL,
    global_index                        INTEGER NOT NULL,
    character_display                   TEXT NOT NULL,
    character_sanitised                 TEXT NOT NULL,
    character_index                     INTEGER NOT NULL,
    text                                TEXT NOT NULL,
    source_line_number                  INTEGER NOT NULL,
    inline_overrides_json               TEXT NOT NULL DEFAULT '{}',
    legacy_emotion_ref                  TEXT,
    resolved_mapping_id                 TEXT,
    resolved_speaker_voice_asset_id     TEXT,
    resolved_emotion_mode               TEXT
                                             CHECK (resolved_emotion_mode IS NULL OR resolved_emotion_mode IN ('none', 'audio_ref', 'emotion_vector', 'qwen_template')),
    resolved_emotion_payload_json       TEXT,
    resolved_seed                       INTEGER,
    resolved_generation_json            TEXT,
    content_hash                        TEXT,
    status                              TEXT NOT NULL DEFAULT 'queued'
                                             CHECK (status IN ('queued', 'running', 'completed', 'failed', 'cancelled')),
    source_run_id                       TEXT,
    audio_artifact_ref                  TEXT,
    cache_hit                           INTEGER NOT NULL DEFAULT 0
                                             CHECK (cache_hit IN (0, 1)),
    duration_ms                         INTEGER,
    started_at                          INTEGER,
    finished_at                         INTEGER,
    failure_category                    TEXT,
    failure_detail                      TEXT,
    UNIQUE (run_id, global_index)
);

CREATE INDEX IF NOT EXISTS idx_utterances_run
    ON ext_emotion_tts__utterances (run_id, global_index);

CREATE INDEX IF NOT EXISTS idx_utterances_status
    ON ext_emotion_tts__utterances (status);

CREATE INDEX IF NOT EXISTS idx_utterances_content_hash
    ON ext_emotion_tts__utterances (content_hash);
