# 🌐 API Reference

This page is the human-friendly map of the current API surface. For the deep route catalog, read [api/API.md](api/API.md).

## Base Paths

| Prefix | Meaning |
|--------|---------|
| `/api/v1` | main host and extension API surface |
| `/api/host` | host introspection surfaces |
| `/` | embedded frontend bundle |

## Response Model

Most JSON responses use the host envelope:

```json
{
  "data": {},
  "meta": {
    "timestamp": "2026-06-12T00:00:00Z"
  },
  "error": null
}
```

Streaming and binary routes are the main exceptions.

## Quick Surface Map

| Area | Purpose |
|------|---------|
| `/api/v1/health` | liveness and status |
| `/api/v1/extensions` | extension registry and lifecycle |
| `/api/v1/operators` | host-visible operator catalog |
| `/api/v1/recipes` | recipe catalog |
| `/api/v1/workflows` | workflow persistence and validation |
| `/api/v1/runs` | execution lifecycle |
| `/api/v1/artifacts` | artifact metadata and download |
| `/api/v1/backends` | backend catalogs, installs, leases |
| `/api/v1/model-store` | host model-store and downloads |
| `/api/v1/modules` | aggregated module surfaces |
| `/api/v1/extensions/{ext_id}/...` | extension-specific mounted APIs |

## Extension Routing

Extension APIs do not get their own top-level servers. They are mounted by the host under:

```text
/api/v1/extensions/{ext_id}/
/api/v1/extensions/{ext_id}/{*rest}
```

That is one of the key ways the host maintains platform authority.

## Health Example

```bash
curl http://127.0.0.1:3000/api/v1/health
```

```json
{
  "data": {
    "status": "ok",
    "details": {
      "...": "implementation may add live fields here"
    }
  },
  "meta": {
    "timestamp": "2026-06-12T00:00:00Z"
  },
  "error": null
}
```

## When To Read The Big API Doc

Go to [api/API.md](api/API.md) when you need:

- route-by-route behavior
- extension-specific endpoints
- stream semantics
- deprecation notes
- maintenance and regeneration details

## See Also

- [architecture.md](architecture.md)
- [extension-internals.md](extension-internals.md)
- [api/API.md](api/API.md)
