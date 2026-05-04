-- 023_voice_asset_chain_digest.sql
--
-- Spec 038 / US5 — adds a nullable `voice_asset_chain_digest` column to
-- `ext_emotion_tts__character_mappings`. When the operator applies an
-- audio-edit chain to the voice asset bound to a character, the resulting
-- chain digest (SHA-256 hex over the canonical chain JSON) is stored here
-- so cast rows can render a chain-digest indicator without joining the
-- audit log.
--
-- NULL means "no chain applied yet" or "chain has been cleared via
-- DELETE .../edit". The column is opaque to the host (Constitution XIII).
--
-- Renumber note: spec 038 plan reserved 019; that slot was already taken
-- by 019_voice_asset_derived_ref.sql. We use 023 instead.

ALTER TABLE ext_emotion_tts__character_mappings
    ADD COLUMN voice_asset_chain_digest TEXT;
