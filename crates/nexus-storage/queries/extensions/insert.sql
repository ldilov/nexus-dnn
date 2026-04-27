-- Upsert: on each host boot the registry re-discovers every builtin
-- extension and re-persists its row. Using INSERT-only leaves stale
-- `status='error'` (or stale capabilities / validation_errors) from
-- a prior failed run and the in-memory registry desyncs from the DB
-- — user sees ERROR in the UI but the toggle handler returns
-- "already active" because the registry was rebuilt cleanly. Update
-- every column the activation pipeline owns (everything except
-- `primary_recipe_id` + `default_workflow_id`, owned by
-- `upsert_primary_refs`).
INSERT INTO extensions (id, name, version, description, publisher, host_api_compat,
    protocol_compat, runtime_family, entrypoint, capabilities, status, directory,
    installed_at, recipe_count, ui_contribution_count, validation_errors,
    primary_recipe_id, default_workflow_id, icon_kind, icon_symbol, icon_svg)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
ON CONFLICT(id) DO UPDATE SET
    name = excluded.name,
    version = excluded.version,
    description = excluded.description,
    publisher = excluded.publisher,
    host_api_compat = excluded.host_api_compat,
    protocol_compat = excluded.protocol_compat,
    runtime_family = excluded.runtime_family,
    entrypoint = excluded.entrypoint,
    capabilities = excluded.capabilities,
    status = excluded.status,
    directory = excluded.directory,
    installed_at = excluded.installed_at,
    recipe_count = excluded.recipe_count,
    ui_contribution_count = excluded.ui_contribution_count,
    validation_errors = excluded.validation_errors,
    icon_kind = excluded.icon_kind,
    icon_symbol = excluded.icon_symbol,
    icon_svg = excluded.icon_svg
