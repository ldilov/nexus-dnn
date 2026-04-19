# `apps/web/src/models/` — residual legacy files

This folder predates the Principle XII layered architecture. Spec 025
(models-search refactor) migrated the search surface to
`apps/web/src/views/models-search/` and deleted every file that had no
external caller. The remaining files are **not orphaned** — they are
imported from surfaces that live outside spec 025's scope:

| File | External caller | Why it stays |
|---|---|---|
| `ModelsPanel.tsx` | `apps/web/src/layout/component_registry.tsx` | Powers the `models_panel` node kind emitted by extension UI layouts. Migration belongs to a future extension-layout spec. |
| `InstallProgress.tsx` | Imported by `ModelsPanel` transitively | Internal to `ModelsPanel`. |
| `hf_search_panel.tsx` + `hf_search_panel.css.ts` | `apps/web/src/views/models/models.ui.tsx` | Embedded in the existing `/models` installed-models screen. A follow-up spec will replace that embedding with a link to `/models-search`. |
| `models_panel.css.ts` | Used by `ModelsPanel.tsx` | Internal. |
| `hooks/` | Used by `ModelsPanel.tsx` | Internal. |

**Deleted in spec 025 (T110)**:

- `CatalogSearch.tsx` — superseded by the FilterBar in `views/models-search/components/`.
- `HyperparameterForm.tsx` — unused.
- `InstalledList.tsx` — unused.
- `ModelCard.tsx` — superseded by `views/models-search/components/ModelCard.tsx`.
- `backend_compat_badge.tsx` — superseded by `views/models-search/components/CompatibilityBadge.tsx`.

## Follow-up

A future spec should migrate the two remaining external callers off
this folder, at which point everything under `apps/web/src/models/`
can be deleted. Do not add new files here — put them under
`views/<screen>/components/` per Principle XII.
