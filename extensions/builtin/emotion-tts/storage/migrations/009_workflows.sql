CREATE TABLE IF NOT EXISTS ext_emotion_tts__workflows (
    deployment_id   TEXT PRIMARY KEY NOT NULL,
    document_json   TEXT NOT NULL,
    customised      INTEGER NOT NULL DEFAULT 0
                        CHECK (customised IN (0, 1)),
    updated_at      INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_workflows_customised
    ON ext_emotion_tts__workflows (customised);
