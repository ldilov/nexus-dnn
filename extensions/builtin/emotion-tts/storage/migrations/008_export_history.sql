CREATE TABLE IF NOT EXISTS ext_emotion_tts__export_history (
    export_id                TEXT PRIMARY KEY NOT NULL,
    deployment_id            TEXT NOT NULL,
    run_id                   TEXT,
    zip_artifact_ref         TEXT NOT NULL,
    manifest_artifact_ref    TEXT,
    preview_artifact_ref     TEXT,
    output_format            TEXT NOT NULL
                                  CHECK (output_format IN ('wav', 'mp3', 'flac')),
    utterance_count          INTEGER NOT NULL
                                  CHECK (utterance_count >= 0),
    partial                  INTEGER NOT NULL DEFAULT 0
                                  CHECK (partial IN (0, 1)),
    created_at               INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_export_history_deployment
    ON ext_emotion_tts__export_history (deployment_id, created_at DESC);

CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_export_history_run
    ON ext_emotion_tts__export_history (run_id);
