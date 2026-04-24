CREATE TABLE IF NOT EXISTS ext_emotion_tts__deployments (
    deployment_id                      TEXT PRIMARY KEY NOT NULL,
    host_extension_instance_ref        TEXT NOT NULL,
    display_name                       TEXT NOT NULL,
    backend_runtime_preference         TEXT,
    default_output_format              TEXT NOT NULL DEFAULT 'mp3'
                                            CHECK (default_output_format IN ('wav', 'mp3', 'flac')),
    default_speed_factor               REAL NOT NULL DEFAULT 1.0
                                            CHECK (default_speed_factor BETWEEN 0.5 AND 2.0),
    default_generation_overrides_json  TEXT NOT NULL DEFAULT '{}',
    most_recent_run_id                 TEXT,
    created_at                         INTEGER NOT NULL,
    updated_at                         INTEGER NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_deployments_name
    ON ext_emotion_tts__deployments (display_name);

CREATE INDEX IF NOT EXISTS idx_deployments_updated
    ON ext_emotion_tts__deployments (updated_at DESC);
