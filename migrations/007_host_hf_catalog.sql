CREATE TABLE IF NOT EXISTS host_hf_catalog_cache (
    cache_key     TEXT PRIMARY KEY NOT NULL,
    response_body TEXT NOT NULL,
    etag          TEXT,
    fetched_at    TEXT NOT NULL,
    expires_at    TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS host_hf_idx_catalog_expires
    ON host_hf_catalog_cache(expires_at);
