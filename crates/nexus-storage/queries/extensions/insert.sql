INSERT INTO extensions (id, name, version, description, publisher, host_api_compat,
    protocol_compat, runtime_family, entrypoint, capabilities, status, directory,
    installed_at, recipe_count, ui_contribution_count, validation_errors,
    primary_recipe_id, default_workflow_id, icon_kind, icon_symbol, icon_svg)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
