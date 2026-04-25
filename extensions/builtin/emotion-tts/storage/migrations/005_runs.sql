CREATE TABLE IF NOT EXISTS ext_emotion_tts__runs (
    run_id                          TEXT PRIMARY KEY NOT NULL,
    deployment_id                   TEXT NOT NULL,
    kind                            TEXT NOT NULL
                                         CHECK (kind IN ('batch', 'test_line', 'resume')),
    status                          TEXT NOT NULL DEFAULT 'queued'
                                         CHECK (status IN ('queued', 'running', 'completed', 'failed', 'cancelled', 'partial')),
    script_snapshot                 TEXT NOT NULL,
    parser_mode                     TEXT NOT NULL DEFAULT 'dialogue'
                                         CHECK (parser_mode IN ('dialogue', 'raw_text', 'advanced_tagged')),
    generation_settings_json        TEXT NOT NULL,
    global_emotion_snapshot_json    TEXT,
    output_format                   TEXT NOT NULL
                                         CHECK (output_format IN ('wav', 'mp3', 'flac')),
    speed_factor                    REAL NOT NULL DEFAULT 1.0,
    speed_mode                      TEXT NOT NULL DEFAULT 'preserve_pitch',
    cache_policy                    TEXT NOT NULL DEFAULT 'use_cache'
                                         CHECK (cache_policy IN ('use_cache', 'force_regenerate', 'read_only_cache')),
    seed_strategy                   TEXT NOT NULL DEFAULT 'increment_per_line',
    base_seed                       INTEGER NOT NULL DEFAULT 42,
    original_run_id                 TEXT,
    runtime_install_id              TEXT,
    runtime_version                 TEXT,
    model_version                   TEXT,
    extension_version               TEXT NOT NULL,
    queued_at                       INTEGER NOT NULL,
    started_at                      INTEGER,
    finished_at                     INTEGER,
    error_category                  TEXT,
    error_detail                    TEXT
);

CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_runs_deployment_queued
    ON ext_emotion_tts__runs (deployment_id, queued_at DESC);

CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_runs_status
    ON ext_emotion_tts__runs (status);

CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_runs_original
    ON ext_emotion_tts__runs (original_run_id);
