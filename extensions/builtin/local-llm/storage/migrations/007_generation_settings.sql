ALTER TABLE ext_local_llm_chat_threads ADD COLUMN generation_settings TEXT;
ALTER TABLE ext_local_llm_chat_threads ADD COLUMN active_model_family_id TEXT;
ALTER TABLE ext_local_llm_chat_threads ADD COLUMN active_model_variant_id TEXT;
