-- 024_audit_chain_snapshot.sql
--
-- Spec 038 / US7 / FR-102 — adds a nullable `chain_snapshot_json` column to
-- ext_emotion_tts__audio_edit_log so the targeted "Revert to this chain"
-- action can replay a specific historical chain.
--
-- The column stores the FULL canonical chain JSON of `digest_after` at the
-- time the audit row was appended. NULL means "snapshot unavailable" — for
-- rows written before this migration (legacy) the frontend falls back to
-- "revert to identity" semantics.
--
-- The column is opaque to the host (Constitution XIII).

ALTER TABLE ext_emotion_tts__audio_edit_log
    ADD COLUMN chain_snapshot_json TEXT;
