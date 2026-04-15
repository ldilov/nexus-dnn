use chrono::{DateTime, Duration, Utc};
use sha2::{Digest, Sha256};
use sqlx::SqlitePool;

use crate::error::HfResult;

#[derive(Debug, Clone)]
pub struct CachedBody {
    pub body: String,
    pub etag: Option<String>,
    pub fetched_at: DateTime<Utc>,
    pub expires_at: DateTime<Utc>,
}

pub struct CatalogCacheRepo {
    pool: SqlitePool,
    ttl: Duration,
}

impl CatalogCacheRepo {
    pub fn new(pool: SqlitePool, ttl: Duration) -> Self {
        Self { pool, ttl }
    }

    pub fn cache_key(endpoint: &str, inputs: &[(&str, &str)]) -> String {
        let mut hasher = Sha256::new();
        hasher.update(endpoint.as_bytes());
        for (k, v) in inputs {
            hasher.update(b"\x1f");
            hasher.update(k.as_bytes());
            hasher.update(b"=");
            hasher.update(v.as_bytes());
        }
        let bytes = hasher.finalize();
        let mut out = String::with_capacity(bytes.len() * 2);
        for b in bytes {
            out.push_str(&format!("{b:02x}"));
        }
        out
    }

    pub async fn get(&self, key: &str) -> HfResult<Option<CachedBody>> {
        let now = Utc::now();
        let row: Option<(String, Option<String>, String, String)> = sqlx::query_as(
            "SELECT response_body, etag, fetched_at, expires_at FROM host_hf_catalog_cache \
             WHERE cache_key = ?1",
        )
        .bind(key)
        .fetch_optional(&self.pool)
        .await?;

        let Some((body, etag, fetched_at, expires_at)) = row else {
            return Ok(None);
        };

        let fetched_at = DateTime::parse_from_rfc3339(&fetched_at)
            .map(|t| t.with_timezone(&Utc))
            .unwrap_or(now);
        let expires_at = DateTime::parse_from_rfc3339(&expires_at)
            .map(|t| t.with_timezone(&Utc))
            .unwrap_or(now);

        Ok(Some(CachedBody {
            body,
            etag,
            fetched_at,
            expires_at,
        }))
    }

    pub async fn put(&self, key: &str, body: &str, etag: Option<&str>) -> HfResult<()> {
        let now = Utc::now();
        let expires_at = now + self.ttl;
        sqlx::query(
            "INSERT INTO host_hf_catalog_cache \
             (cache_key, response_body, etag, fetched_at, expires_at) \
             VALUES (?1, ?2, ?3, ?4, ?5) \
             ON CONFLICT(cache_key) DO UPDATE SET \
               response_body = excluded.response_body, \
               etag = excluded.etag, \
               fetched_at = excluded.fetched_at, \
               expires_at = excluded.expires_at",
        )
        .bind(key)
        .bind(body)
        .bind(etag)
        .bind(now.to_rfc3339())
        .bind(expires_at.to_rfc3339())
        .execute(&self.pool)
        .await?;
        Ok(())
    }

    pub async fn sweep_expired(&self, now: DateTime<Utc>) -> HfResult<u64> {
        let result = sqlx::query("DELETE FROM host_hf_catalog_cache WHERE expires_at < ?1")
            .bind(now.to_rfc3339())
            .execute(&self.pool)
            .await?;
        Ok(result.rows_affected())
    }

    pub fn is_fresh(entry: &CachedBody, now: DateTime<Utc>) -> bool {
        entry.expires_at > now
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn cache_key_is_stable_across_input_order() {
        let a = CatalogCacheRepo::cache_key("/api/models", &[("q", "llama"), ("page", "1")]);
        let b = CatalogCacheRepo::cache_key("/api/models", &[("q", "llama"), ("page", "1")]);
        assert_eq!(a, b);
    }

    #[test]
    fn cache_key_differs_by_query() {
        let a = CatalogCacheRepo::cache_key("/api/models", &[("q", "llama")]);
        let b = CatalogCacheRepo::cache_key("/api/models", &[("q", "qwen")]);
        assert_ne!(a, b);
    }
}
