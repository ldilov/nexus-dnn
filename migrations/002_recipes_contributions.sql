CREATE TABLE IF NOT EXISTS recipes (
    id TEXT PRIMARY KEY,
    version TEXT NOT NULL,
    display_name TEXT NOT NULL,
    summary TEXT NOT NULL,
    category TEXT NOT NULL,
    extension_id TEXT NOT NULL REFERENCES extensions(id),
    extension_version TEXT NOT NULL,
    workflow_template_ref TEXT NOT NULL,
    thumbnail TEXT,
    input_summary TEXT,
    bindings TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS ui_contributions (
    id TEXT PRIMARY KEY,
    kind TEXT NOT NULL,
    extension_id TEXT NOT NULL REFERENCES extensions(id),
    display_name TEXT NOT NULL,
    description TEXT,
    target TEXT,
    supported_types TEXT,
    priority INTEGER DEFAULT 0,
    metadata TEXT,
    availability TEXT NOT NULL DEFAULT 'available'
);

CREATE INDEX IF NOT EXISTS idx_recipes_extension ON recipes(extension_id);
CREATE INDEX IF NOT EXISTS idx_recipes_category ON recipes(category);
CREATE INDEX IF NOT EXISTS idx_ui_contributions_kind ON ui_contributions(kind);
CREATE INDEX IF NOT EXISTS idx_ui_contributions_extension ON ui_contributions(extension_id);

ALTER TABLE extensions ADD COLUMN recipe_count INTEGER DEFAULT 0;
ALTER TABLE extensions ADD COLUMN ui_contribution_count INTEGER DEFAULT 0;
ALTER TABLE extensions ADD COLUMN validation_errors TEXT;

ALTER TABLE runs ADD COLUMN run_label TEXT;
ALTER TABLE runs ADD COLUMN execution_profile TEXT;
ALTER TABLE runs ADD COLUMN predecessor_run_id TEXT;
