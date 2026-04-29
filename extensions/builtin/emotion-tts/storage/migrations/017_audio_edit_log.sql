-- 017_audio_edit_log.sql
--
-- Spec 036 FR-029..FR-032 — extension-owned audit log. One row per chain
-- state-change (apply / clear / op-remove). Append-only by contract; entries
-- survive target deletion (FR-030 edge case) so historical edits remain
-- queryable for forensic value.
--
-- Soft FK to deployment_id (Constitution Appendix G — no physical FK across
-- the host/extension boundary). Likewise no physical FK on target_id —
-- voice_assets and utterances are in different tables and the audit log is
-- intentionally append-only past asset deletes.

CREATE TABLE IF NOT EXISTS ext_emotion_tts__audio_edit_log (
    entry_id        TEXT PRIMARY KEY NOT NULL,
    deployment_id   TEXT NOT NULL,
    target_id       TEXT NOT NULL,
    target_kind     TEXT NOT NULL
                         CHECK (target_kind IN ('voice_asset', 'utterance')),
    digest_before   TEXT NOT NULL
                         CHECK (length(digest_before) = 64),
    digest_after    TEXT NOT NULL
                         CHECK (length(digest_after) = 64),
    operation_count INTEGER NOT NULL
                         CHECK (operation_count >= 0),
    recorded_at     TEXT NOT NULL
                         DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    actor           TEXT NOT NULL DEFAULT 'system'
);

CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_audio_edit_log_target
    ON ext_emotion_tts__audio_edit_log (target_id, recorded_at DESC);

CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_audio_edit_log_deployment
    ON ext_emotion_tts__audio_edit_log (deployment_id, recorded_at DESC);
