-- 022_eq3_op_support.sql
--
-- Spec 038 / US6 — forward-compat marker registering the new `eq3` audio-edit
-- operation alongside the existing `gain`, `pitch_shift`, and `silence_strip`
-- modes added in this spec. The chain runner dispatches on the `mode` string
-- inside the chain JSON; no host-side enum needs updating because the
-- `ext_emotion_tts__audio_edit_log.op_modes` column stores the modes verbatim.
--
-- This migration is idempotent and intentionally empty: the column type is
-- TEXT and accepts any new mode string. We commit the file to keep the
-- migration history aligned with spec 038's documented numbering.
--
-- Renumber note: spec 038 plan reserved 018; that slot was already taken
-- by 018_utterance_updated_at.sql. We use 022 instead.

SELECT 1;
