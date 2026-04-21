ALTER TABLE model_store_installed_artifacts ADD COLUMN layer_count INTEGER;
ALTER TABLE model_store_installed_artifacts ADD COLUMN max_context INTEGER;
ALTER TABLE model_store_installed_artifacts ADD COLUMN architecture TEXT;
ALTER TABLE model_store_installed_artifacts ADD COLUMN hidden_size INTEGER;
ALTER TABLE model_store_installed_artifacts ADD COLUMN extraction_status TEXT;
ALTER TABLE model_store_installed_artifacts ADD COLUMN extracted_at INTEGER;
