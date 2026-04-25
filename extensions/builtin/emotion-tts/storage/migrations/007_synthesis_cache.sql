CREATE TABLE IF NOT EXISTS ext_emotion_tts__synthesis_cache (
    content_hash         TEXT PRIMARY KEY NOT NULL
                              CHECK (length(content_hash) = 64),
    audio_artifact_ref   TEXT NOT NULL,
    extension_version    TEXT NOT NULL,
    runtime_version      TEXT NOT NULL,
    model_version        TEXT NOT NULL,
    size_bytes           INTEGER NOT NULL
                              CHECK (size_bytes >= 0),
    hit_count            INTEGER NOT NULL DEFAULT 0,
    created_at           INTEGER NOT NULL,
    last_hit_at          INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_cache_last_hit
    ON ext_emotion_tts__synthesis_cache (last_hit_at ASC);
