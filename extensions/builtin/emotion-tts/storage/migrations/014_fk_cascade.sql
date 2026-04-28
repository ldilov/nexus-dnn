-- 014_fk_cascade.sql
-- Adds `FOREIGN KEY (deployment_id) REFERENCES ext_emotion_tts__deployments(deployment_id)
-- ON DELETE CASCADE` to every emotion-tts child table that carries a
-- `deployment_id`, plus `FOREIGN KEY (run_id) REFERENCES ext_emotion_tts__runs(run_id)
-- ON DELETE CASCADE` on `utterances`.
--
-- SQLite has no `ALTER TABLE ADD CONSTRAINT FOREIGN KEY`, so each table is
-- rebuilt with the full original schema (including columns added by later
-- ALTER migrations) plus the new FK clause. Indexes are recreated.
--
-- The ambient `PRAGMA foreign_keys` toggle in this script is local to the
-- transaction — the host's connection pool always runs with FK enforcement
-- ON (see crates/nexus-storage/src/sqlite/mod.rs).
--
-- WHY THE PRAGMAS ARE NOT A NO-OP: SQLite's docs say `PRAGMA foreign_keys`
-- cannot be changed *inside* an open transaction. The migration runner
-- (extensions/.../register.rs invokes `sqlx::raw_sql(...).execute(pool)`)
-- does NOT wrap the file in an outer transaction, so the leading
-- `PRAGMA foreign_keys = OFF` executes BEFORE `BEGIN TRANSACTION` opens —
-- enforcement is genuinely off for the rebuild span. The trailing
-- `PRAGMA foreign_keys = ON` likewise runs AFTER `COMMIT`. Both PRAGMAs
-- take effect.
--
-- Idempotency: the migration runner gates re-application via
-- `ext_emotion_tts__schema_versions`, so this script runs at most once
-- per database. The `DROP TABLE IF EXISTS *_new` guards below are
-- belt-and-braces in case someone runs the SQL out-of-band (test
-- harness mistake, manual recovery).
--
-- Tables rebuilt:
--   * ext_emotion_tts__voice_assets        (cols from 002 + 012)
--   * ext_emotion_tts__character_mappings  (cols from 003)
--   * ext_emotion_tts__vector_presets      (cols from 004)
--   * ext_emotion_tts__runs                (cols from 005)
--   * ext_emotion_tts__utterances          (cols from 006; FK to runs)
--   * ext_emotion_tts__export_history      (cols from 008)
--   * ext_emotion_tts__workflows           (cols from 009)
--
-- `ext_emotion_tts__synthesis_cache` (007) intentionally has no
-- `deployment_id` (cross-deployment dedup); skipped.
PRAGMA foreign_keys = OFF;

BEGIN TRANSACTION;

-- voice_assets ---------------------------------------------------------------
DROP TABLE IF EXISTS ext_emotion_tts__voice_assets__new;
CREATE TABLE ext_emotion_tts__voice_assets__new (
    voice_asset_id              TEXT PRIMARY KEY NOT NULL,
    deployment_id               TEXT NOT NULL,
    display_name                TEXT NOT NULL,
    kind                        TEXT NOT NULL
                                     CHECK (kind IN ('speaker', 'emotion', 'mixed')),
    audio_artifact_ref          TEXT NOT NULL,
    content_sha256              TEXT NOT NULL,
    reference_text              TEXT,
    sample_rate                 INTEGER,
    duration_ms                 INTEGER,
    source_type                 TEXT NOT NULL
                                     CHECK (source_type IN ('upload', 'import', 'recording', 'artifact_ref')),
    notes                       TEXT,
    is_active                   INTEGER NOT NULL DEFAULT 1
                                     CHECK (is_active IN (0, 1)),
    created_at                  INTEGER NOT NULL,
    updated_at                  INTEGER NOT NULL,
    preprocessed_artifact_ref   TEXT,
    preprocessing_report_json   TEXT,
    FOREIGN KEY (deployment_id)
        REFERENCES ext_emotion_tts__deployments(deployment_id) ON DELETE CASCADE
);
INSERT INTO ext_emotion_tts__voice_assets__new
    (voice_asset_id, deployment_id, display_name, kind, audio_artifact_ref,
     content_sha256, reference_text, sample_rate, duration_ms, source_type,
     notes, is_active, created_at, updated_at,
     preprocessed_artifact_ref, preprocessing_report_json)
SELECT
    voice_asset_id, deployment_id, display_name, kind, audio_artifact_ref,
    content_sha256, reference_text, sample_rate, duration_ms, source_type,
    notes, is_active, created_at, updated_at,
    preprocessed_artifact_ref, preprocessing_report_json
FROM ext_emotion_tts__voice_assets;
DROP TABLE ext_emotion_tts__voice_assets;
ALTER TABLE ext_emotion_tts__voice_assets__new RENAME TO ext_emotion_tts__voice_assets;
CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_voice_assets_deployment
    ON ext_emotion_tts__voice_assets (deployment_id);
CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_voice_assets_content
    ON ext_emotion_tts__voice_assets (content_sha256);

-- character_mappings ---------------------------------------------------------
DROP TABLE IF EXISTS ext_emotion_tts__character_mappings__new;
CREATE TABLE ext_emotion_tts__character_mappings__new (
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
    UNIQUE (deployment_id, character_name_lower),
    FOREIGN KEY (deployment_id)
        REFERENCES ext_emotion_tts__deployments(deployment_id) ON DELETE CASCADE
);
INSERT INTO ext_emotion_tts__character_mappings__new
SELECT * FROM ext_emotion_tts__character_mappings;
DROP TABLE ext_emotion_tts__character_mappings;
ALTER TABLE ext_emotion_tts__character_mappings__new RENAME TO ext_emotion_tts__character_mappings;
CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_character_mappings_deployment
    ON ext_emotion_tts__character_mappings (deployment_id);
CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_character_mappings_speaker
    ON ext_emotion_tts__character_mappings (speaker_voice_asset_id);

-- vector_presets -------------------------------------------------------------
DROP TABLE IF EXISTS ext_emotion_tts__vector_presets__new;
CREATE TABLE ext_emotion_tts__vector_presets__new (
    preset_id       TEXT PRIMARY KEY NOT NULL,
    deployment_id   TEXT NOT NULL,
    preset_name     TEXT NOT NULL,
    vector_json     TEXT NOT NULL,
    created_at      INTEGER NOT NULL,
    updated_at      INTEGER NOT NULL,
    UNIQUE (deployment_id, preset_name),
    FOREIGN KEY (deployment_id)
        REFERENCES ext_emotion_tts__deployments(deployment_id) ON DELETE CASCADE
);
INSERT INTO ext_emotion_tts__vector_presets__new
SELECT * FROM ext_emotion_tts__vector_presets;
DROP TABLE ext_emotion_tts__vector_presets;
ALTER TABLE ext_emotion_tts__vector_presets__new RENAME TO ext_emotion_tts__vector_presets;
CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_vector_presets_deployment
    ON ext_emotion_tts__vector_presets (deployment_id);

-- runs -----------------------------------------------------------------------
DROP TABLE IF EXISTS ext_emotion_tts__runs__new;
CREATE TABLE ext_emotion_tts__runs__new (
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
    error_detail                    TEXT,
    FOREIGN KEY (deployment_id)
        REFERENCES ext_emotion_tts__deployments(deployment_id) ON DELETE CASCADE
);
INSERT INTO ext_emotion_tts__runs__new
SELECT * FROM ext_emotion_tts__runs;
DROP TABLE ext_emotion_tts__runs;
ALTER TABLE ext_emotion_tts__runs__new RENAME TO ext_emotion_tts__runs;
CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_runs_deployment_queued
    ON ext_emotion_tts__runs (deployment_id, queued_at DESC);
CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_runs_status
    ON ext_emotion_tts__runs (status);
CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_runs_original
    ON ext_emotion_tts__runs (original_run_id);

-- utterances (FK to runs, not deployments) -----------------------------------
DROP TABLE IF EXISTS ext_emotion_tts__utterances__new;
CREATE TABLE ext_emotion_tts__utterances__new (
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
    content_hash                        TEXT
                                             CHECK (content_hash IS NULL OR length(content_hash) = 64),
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
    UNIQUE (run_id, global_index),
    FOREIGN KEY (run_id)
        REFERENCES ext_emotion_tts__runs(run_id) ON DELETE CASCADE
);
INSERT INTO ext_emotion_tts__utterances__new
SELECT * FROM ext_emotion_tts__utterances;
DROP TABLE ext_emotion_tts__utterances;
ALTER TABLE ext_emotion_tts__utterances__new RENAME TO ext_emotion_tts__utterances;
CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_utterances_run
    ON ext_emotion_tts__utterances (run_id, global_index);
CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_utterances_status
    ON ext_emotion_tts__utterances (status);
CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_utterances_content_hash
    ON ext_emotion_tts__utterances (content_hash);

-- export_history -------------------------------------------------------------
DROP TABLE IF EXISTS ext_emotion_tts__export_history__new;
CREATE TABLE ext_emotion_tts__export_history__new (
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
    created_at               INTEGER NOT NULL,
    FOREIGN KEY (deployment_id)
        REFERENCES ext_emotion_tts__deployments(deployment_id) ON DELETE CASCADE
);
INSERT INTO ext_emotion_tts__export_history__new
SELECT * FROM ext_emotion_tts__export_history;
DROP TABLE ext_emotion_tts__export_history;
ALTER TABLE ext_emotion_tts__export_history__new RENAME TO ext_emotion_tts__export_history;
CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_export_history_deployment
    ON ext_emotion_tts__export_history (deployment_id, created_at DESC);
CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_export_history_run
    ON ext_emotion_tts__export_history (run_id);

-- workflows ------------------------------------------------------------------
DROP TABLE IF EXISTS ext_emotion_tts__workflows__new;
CREATE TABLE ext_emotion_tts__workflows__new (
    deployment_id   TEXT PRIMARY KEY NOT NULL,
    document_json   TEXT NOT NULL,
    customised      INTEGER NOT NULL DEFAULT 0
                        CHECK (customised IN (0, 1)),
    updated_at      INTEGER NOT NULL,
    FOREIGN KEY (deployment_id)
        REFERENCES ext_emotion_tts__deployments(deployment_id) ON DELETE CASCADE
);
INSERT INTO ext_emotion_tts__workflows__new
SELECT * FROM ext_emotion_tts__workflows;
DROP TABLE ext_emotion_tts__workflows;
ALTER TABLE ext_emotion_tts__workflows__new RENAME TO ext_emotion_tts__workflows;
CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_workflows_customised
    ON ext_emotion_tts__workflows (customised);

COMMIT;

PRAGMA foreign_keys = ON;
