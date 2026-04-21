# Extension UI Authoring

**Status**: stub — full guide lands with spec-027 US4 (T060–T065).

Until then, the canonical reference lives in the feature's own quickstart:
[specs/027-extension-ui-playground/quickstart.md](../../specs/027-extension-ui-playground/quickstart.md).

## Quick links

- **Component catalog endpoint**: `GET /api/v1/ui/components` — the published shape of every host-provided UI component (category, props schema, examples).
- **Playground**: `/dev/components` inside the host UI — browse the catalog, edit props live, copy ready-to-paste YAML.
- **Extension UI loader**: `GET /api/v1/extensions/{id}/ui/{*path}` — serves static assets shipped by an installed extension.
- **Registered custom elements**: `GET /api/v1/ui/extension-components` — lists tags registered by installed extensions.
- **Per-extension reload**: `POST /api/v1/extensions/{id}/reload` — re-reads one extension's manifest atomically without restarting the host.

## Decision flow

```
Does the host catalog cover what you need to render?
  yes → YAML-only: reference catalog tags directly from your layout
   no → Custom element: ship a UI bundle + declare in manifest
```

## YAML-only path (minimal example)

```yaml
ui:
  layouts:
    - file: layouts/main.yaml
      placement: main
      default: true
```

Your layout references catalog tags like `split_panel`, `card`, `markdown_view`. Browse them all at `/dev/components` in the host UI.

## Custom-element path (minimal example)

```yaml
ui:
  assets:
    root: ui/dist
  custom_elements:
    - tag: ext-my-widget
      module: widget.esm.js
      entry: register
```

Rules the host enforces at install time:

- `tag` must match `^[a-z][a-z0-9]*(-[a-z0-9]+)+$` (custom-element grammar — must contain a hyphen).
- `tag` must be globally unique across installed extensions.
- `module` must resolve to an existing file inside `assets.root`.
- `assets.root` must stay inside your extension directory.

Your ES module exports a `register()` function that defines the custom element. The host loads the bundle lazily on first render, calls `register()`, then mounts the tag.

## Failure modes

- **Bundle fails to load or throws**: the host renders an in-place error placeholder identifying your extension and the failure reason. Surrounding layout keeps working.
- **Tag collision at install time**: install is rejected with a readable error.
- **Uninstall**: your tag unregisters, asset routes return 404, any reference to the tag renders an "unknown tag" placeholder.

## For the full guide

See the [feature quickstart](../../specs/027-extension-ui-playground/quickstart.md) for:

- End-to-end worked examples
- Attribute coercion rules for custom elements (booleans → empty-string attributes, objects → JSON strings)
- Per-extension reload workflow for local iteration
- Testing patterns

This page will be fleshed out into the canonical reference once US4 lands.
