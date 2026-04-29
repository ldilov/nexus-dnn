-- 021_utterance_derived_ref.sql
--
-- Spec 036 / US2 — adds a nullable `derived_artifact_ref` column to
-- `ext_emotion_tts__utterances`. Mirrors migration 019 for voice assets:
-- when a per-utterance audio-edit chain is applied, the materialised derived
-- segment audio's artifact ref is stored here so the source `audio_artifact_ref`
-- (the originally-synthesized segment) remains untouched.
--
-- NULL means "no derived artifact — read from `audio_artifact_ref`".
-- The column is opaque to the host (Constitution XIII + spec 036 FR-001).

ALTER TABLE ext_emotion_tts__utterances
    ADD COLUMN derived_artifact_ref TEXT;
