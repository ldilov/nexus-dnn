# `apps/web/src/models/` — residual legacy files

Spec 025 migrated the search surface to `apps/web/src/views/models-search/`
and deleted every file that had no external caller. What remains is imported
from `apps/web/src/layout/component_registry.tsx` to power the
`models_panel` node kind in extension UI layouts.

| File | Purpose |
|---|---|
| `ModelsPanel.tsx` | Extension-layout `models_panel` node. |
| `InstallProgress.tsx` | Internal to `ModelsPanel`. |
| `models_panel.css.ts` | Internal to `ModelsPanel`. |
| `hooks/` | Internal to `ModelsPanel`. |

Do not add new files here — put them under `views/<screen>/components/`
per Principle XII.
