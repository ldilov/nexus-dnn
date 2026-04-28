-- 018_utterance_updated_at.sql
--
-- Spec 036 — adds a nullable `updated_at` column to `ext_emotion_tts__utterances`.
-- Mirrors the voice-asset pattern so that per-utterance edit-chain writes
-- (FR-007) can stamp a change-detection timestamp. NULL on existing rows means
-- "never updated post-creation; use finished_at as the recency proxy."

ALTER TABLE ext_emotion_tts__utterances
    ADD COLUMN updated_at INTEGER;
