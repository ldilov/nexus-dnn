-- 020_run_export_zip_stale_at.sql
--
-- Spec 036 / US2 — adds a nullable `export_zip_stale_at` column to
-- `ext_emotion_tts__runs`. Set to the current epoch second when a per-utterance
-- audio edit lands so the run-detail UI can surface a "rebuild export" CTA
-- (FR-015 / US2 acceptance scenario 2). NULL means "ZIP matches current
-- segments — no rebuild needed".
--
-- The column is opaque to the host (Constitution XIII + spec 036 FR-001).

ALTER TABLE ext_emotion_tts__runs
    ADD COLUMN export_zip_stale_at INTEGER;
