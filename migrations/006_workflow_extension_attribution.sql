ALTER TABLE workflows ADD COLUMN extension_id TEXT REFERENCES extensions(id);
ALTER TABLE workflows ADD COLUMN extension_version TEXT;
ALTER TABLE workflows ADD COLUMN extension_version_first_seen TEXT;

CREATE INDEX IF NOT EXISTS idx_workflows_extension ON workflows(extension_id);
