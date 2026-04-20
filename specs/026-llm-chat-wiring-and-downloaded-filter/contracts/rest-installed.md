# Contract — `GET /api/v1/model-store/installed`

## Request

```
GET /api/v1/model-store/installed HTTP/1.1
Accept: application/json
```

No query parameters in v1. No body. No request headers required beyond
what the existing `/api/v1/model-store/*` routes already accept.

## Response (200)

```json
{
  "data": {
    "family_ids": ["llama-3-8b", "qwen-2.5-7b"],
    "installed": [
      {
        "artifact_id": "a_0193f1c6-…",
        "family_id": "llama-3-8b",
        "variant_id": "Q5_K_M",
        "format": "gguf",
        "filename": "llama-3-8b.Q5_K_M.gguf",
        "size_bytes": 5379129344,
        "source_repo": "TheBloke/Llama-3-8B-GGUF",
        "source_revision": "main",
        "installed_at": "2026-04-20T12:34:00Z"
      }
    ],
    "truncated": false
  },
  "meta": { "timestamp": "2026-04-20T12:34:05Z" },
  "error": null
}
```

### Ordering

`installed` MUST be sorted by `installed_at DESC`. Ties broken by
`artifact_id ASC`.

### Limit

Hard ceiling of 500 rows. If the DB holds more, the handler MUST
return the first 500 by the ordering above and set
`truncated = true`. v1 ships no paging knob.

## Response (5xx)

Uses the standard `ApiResponse::err` envelope:

```json
{
  "data": null,
  "meta": { "timestamp": "…" },
  "error": {
    "code": "storage",
    "category": "internal",
    "message": "…"
  }
}
```

`ModelStoreError::Storage` → 500 `storage`. No other error variants
possible on this path (no inputs to validate, no upstream fetch).

## Caching

- `Cache-Control: private, max-age=2` — SWR pairs well with this on
  the frontend.
- `ETag` MAY be added in a follow-up; not required for v1.
- No per-user scoping in v1 (single-user desktop app).

## Contract tests

| ID | What it asserts |
|---|---|
| T-I1 | Empty table returns `{family_ids: [], installed: [], truncated: false}` with status 200. |
| T-I2 | After one `install_map.record(...)`, the row appears exactly once; `family_ids` contains that family. |
| T-I3 | 501 rows ⇒ response has exactly 500 items and `truncated = true`. |
| T-I4 | Ordering: inserting A at T+0 then B at T+1 ⇒ response lists B before A. |
| T-I5 | Storage error (pool closed) ⇒ 500 with `error.code = "storage"`. |

File: `crates/nexus-api/tests/contract_model_store_installed.rs`.
