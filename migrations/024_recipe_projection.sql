ALTER TABLE recipes ADD COLUMN workflow_id TEXT;
ALTER TABLE recipes ADD COLUMN workflow_version TEXT;
ALTER TABLE recipes ADD COLUMN projection_schema_version INTEGER;
ALTER TABLE recipes ADD COLUMN projection TEXT;
ALTER TABLE recipes ADD COLUMN status TEXT;
ALTER TABLE recipes ADD COLUMN author_kind TEXT NOT NULL DEFAULT 'extension';

CREATE INDEX IF NOT EXISTS idx_recipes_author ON recipes(author_kind);
