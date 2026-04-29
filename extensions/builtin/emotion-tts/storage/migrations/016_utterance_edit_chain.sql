-- 016_utterance_edit_chain.sql
--
-- Spec 036 — adds a nullable `edit_chain_json` column to
-- `ext_emotion_tts__utterances`. Same shape and semantics as migration 015 for
-- voice assets, scoped to per-segment run output. The source for an utterance
-- edit is the originally-synthesized segment audio, preserved on disk.

ALTER TABLE ext_emotion_tts__utterances
    ADD COLUMN edit_chain_json TEXT;
