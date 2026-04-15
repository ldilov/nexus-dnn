use serde::{Deserialize, Serialize};
use sqlx::{Row, SqlitePool};

use super::errors::{ModelStoreError, ModelStoreResult};
use super::quantization::{MatchQuality, Quantization};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct ModelDependency {
    pub family: String,
    pub version: String,
    pub revision: Option<String>,
    pub allow_unpinned: bool,
    pub min_params: Option<u64>,
    pub quantization: Option<Quantization>,
    pub variant: Option<String>,
    pub required: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub enum UnsatisfiableReason {
    ParameterCountTooLow,
    QuantizationIncompatible,
    PrivateModelOwnedByOther,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct MatchedDep {
    pub dep: ModelDependency,
    pub install_id: String,
    pub sha256_root: String,
    pub quality: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub struct UnsatisfiableDep {
    pub dep: ModelDependency,
    pub reason: UnsatisfiableReason,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq, Default)]
pub struct ModelResolutionReport {
    pub matched: Vec<MatchedDep>,
    pub missing: Vec<ModelDependency>,
    pub unsatisfiable: Vec<UnsatisfiableDep>,
}

#[derive(Debug, Clone, Default)]
pub struct ResolutionContext {
    pub extension_id: Option<String>,
}

#[derive(Debug, Clone)]
struct CandidateRow {
    install_id: String,
    family: String,
    version: String,
    quantization: Option<Quantization>,
    variant: String,
    sha256_root: String,
    source_revision: String,
    param_count: u64,
    created_at: String,
}

async fn load_candidates(
    pool: &SqlitePool,
    ctx: &ResolutionContext,
) -> ModelStoreResult<Vec<CandidateRow>> {
    let rows = sqlx::query(
        "SELECT install_id, family, version, quantization, variant, sha256_root, \
                source_revision, private_model, owner_extension_id, created_at \
         FROM host_model_installs \
         WHERE state = 'ready' AND (private_model = 0 OR owner_extension_id = $1)",
    )
    .bind(ctx.extension_id.as_deref().unwrap_or(""))
    .fetch_all(pool)
    .await?;

    let mut out = Vec::with_capacity(rows.len());
    for row in rows {
        let raw_q: Option<String> = row.try_get("quantization").ok();
        let quantization = raw_q.and_then(|s| s.parse::<Quantization>().ok());
        out.push(CandidateRow {
            install_id: row.try_get("install_id")?,
            family: row.try_get("family")?,
            version: row.try_get("version")?,
            quantization,
            variant: row.try_get("variant")?,
            sha256_root: row.try_get("sha256_root")?,
            source_revision: row.try_get("source_revision")?,
            param_count: 0,
            created_at: row.try_get("created_at")?,
        });
    }
    Ok(out)
}

fn quality_tag(q: MatchQuality) -> &'static str {
    match q {
        MatchQuality::Exact => "exact",
        MatchQuality::Family => "family",
        MatchQuality::None => "none",
    }
}

fn pick_best<'a>(
    dep: &ModelDependency,
    candidates: &'a [CandidateRow],
) -> Option<(&'a CandidateRow, MatchQuality)> {
    let mut scored: Vec<(&CandidateRow, MatchQuality)> = candidates
        .iter()
        .filter(|c| c.family == dep.family && c.version == dep.version)
        .filter(|c| dep.variant.as_ref().is_none_or(|v| v == &c.variant))
        .filter(|c| {
            dep.revision
                .as_ref()
                .is_none_or(|r| r == &c.source_revision)
        })
        .map(|c| {
            let q = Quantization::match_quality(dep.quantization.as_ref(), c.quantization.as_ref());
            (c, q)
        })
        .filter(|(_, q)| *q != MatchQuality::None)
        .collect();
    scored.sort_by(|a, b| {
        let order = |q: MatchQuality| match q {
            MatchQuality::Exact => 0,
            MatchQuality::Family => 1,
            MatchQuality::None => 2,
        };
        order(a.1)
            .cmp(&order(b.1))
            .then_with(|| b.0.created_at.cmp(&a.0.created_at))
    });
    scored.into_iter().next()
}

pub async fn check_model_dependencies(
    pool: &SqlitePool,
    deps: &[ModelDependency],
    ctx: &ResolutionContext,
) -> ModelStoreResult<ModelResolutionReport> {
    let candidates = load_candidates(pool, ctx).await?;
    let mut report = ModelResolutionReport::default();

    for dep in deps {
        if let Some(min_params) = dep.min_params {
            let any_family_version = candidates
                .iter()
                .any(|c| c.family == dep.family && c.version == dep.version);
            if any_family_version {
                let meets = candidates.iter().any(|c| {
                    c.family == dep.family
                        && c.version == dep.version
                        && c.param_count >= min_params
                });
                if !meets {
                    report.unsatisfiable.push(UnsatisfiableDep {
                        dep: dep.clone(),
                        reason: UnsatisfiableReason::ParameterCountTooLow,
                    });
                    continue;
                }
            }
        }

        match pick_best(dep, &candidates) {
            Some((c, q)) => report.matched.push(MatchedDep {
                dep: dep.clone(),
                install_id: c.install_id.clone(),
                sha256_root: c.sha256_root.clone(),
                quality: quality_tag(q).to_string(),
            }),
            None => report.missing.push(dep.clone()),
        }
    }
    Ok(report)
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct ResolveReport {
    pub matched: Vec<MatchedDep>,
    pub missing: Vec<MissingDep>,
    pub unsatisfiable: Vec<UnsatisfiableDep>,
    pub total_download_bytes: u64,
    pub total_disk_bytes_after: u64,
    pub estimated_vram_bytes_peak: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MissingDep {
    pub dep: ModelDependency,
    pub estimated_bytes: u64,
}

pub trait SizeProbe: Send + Sync {
    fn estimate_bytes(&self, dep: &ModelDependency) -> u64;
}

pub struct ZeroSizeProbe;
impl SizeProbe for ZeroSizeProbe {
    fn estimate_bytes(&self, _dep: &ModelDependency) -> u64 {
        0
    }
}

pub async fn resolve_dry_run(
    pool: &SqlitePool,
    deps: &[ModelDependency],
    ctx: &ResolutionContext,
    probe: &dyn SizeProbe,
) -> ModelStoreResult<ResolveReport> {
    let base = check_model_dependencies(pool, deps, ctx).await?;
    let missing: Vec<MissingDep> = base
        .missing
        .into_iter()
        .map(|dep| {
            let bytes = probe.estimate_bytes(&dep);
            MissingDep {
                dep,
                estimated_bytes: bytes,
            }
        })
        .collect();
    let total_download: u64 = missing.iter().map(|m| m.estimated_bytes).sum();
    Ok(ResolveReport {
        matched: base.matched,
        missing,
        unsatisfiable: base.unsatisfiable,
        total_download_bytes: total_download,
        total_disk_bytes_after: total_download,
        estimated_vram_bytes_peak: 0,
    })
}

pub async fn count_installs_and_blobs(
    pool: &SqlitePool,
    blobs_root: &std::path::Path,
) -> ModelStoreResult<(i64, usize)> {
    let n: i64 = sqlx::query("SELECT COUNT(*) AS n FROM host_model_installs")
        .fetch_one(pool)
        .await?
        .try_get("n")?;
    let mut count = 0usize;
    if let Ok(mut rd) = tokio::fs::read_dir(blobs_root).await {
        while let Some(prefix) = rd.next_entry().await.map_err(ModelStoreError::Io)? {
            if prefix.file_type().await?.is_dir()
                && let Ok(mut files) = tokio::fs::read_dir(prefix.path()).await
            {
                while let Some(_f) = files.next_entry().await.map_err(ModelStoreError::Io)? {
                    count += 1;
                }
            }
        }
    }
    Ok((n, count))
}

#[cfg(test)]
mod tests {
    use super::*;
    use chrono::Utc;
    use sqlx::sqlite::SqlitePoolOptions;

    async fn fresh_pool() -> SqlitePool {
        let pool = SqlitePoolOptions::new()
            .max_connections(2)
            .connect("sqlite::memory:")
            .await
            .unwrap();
        for stmt in include_str!("../../../../migrations/009_host_model_store.sql").split(';') {
            let t = stmt.trim();
            if !t.is_empty() {
                sqlx::query(t).execute(&pool).await.unwrap();
            }
        }
        pool
    }

    async fn insert(
        pool: &SqlitePool,
        id: &str,
        family: &str,
        version: &str,
        q: Option<&str>,
        created_at: &str,
    ) {
        sqlx::query(
            "INSERT INTO host_model_installs (install_id, family, version, quantization, \
             variant, install_root, files_manifest, sha256_root, source_revision, state, \
             source_kind, created_at, updated_at) VALUES ($1,$2,$3,$4,'default','/t','[]',\
             $1,$1,'ready','direct_url',$5,$5)",
        )
        .bind(id)
        .bind(family)
        .bind(version)
        .bind(q)
        .bind(created_at)
        .execute(pool)
        .await
        .unwrap();
    }

    fn dep(q: Option<Quantization>) -> ModelDependency {
        ModelDependency {
            family: "llama".into(),
            version: "3-8b".into(),
            revision: None,
            allow_unpinned: true,
            min_params: None,
            quantization: q,
            variant: None,
            required: true,
        }
    }

    #[tokio::test]
    async fn partition_matched_missing() {
        let pool = fresh_pool().await;
        insert(
            &pool,
            "a",
            "llama",
            "3-8b",
            Some("Q4_K_M"),
            "2026-04-15T00:00:00Z",
        )
        .await;
        let deps = vec![dep(Some(Quantization::Q4_K_M)), dep(None).clone(), {
            let mut d = dep(None);
            d.family = "nonexistent".into();
            d
        }];
        let report = check_model_dependencies(&pool, &deps, &ResolutionContext::default())
            .await
            .unwrap();
        assert_eq!(report.matched.len(), 2);
        assert_eq!(report.missing.len(), 1);
    }

    #[tokio::test]
    async fn tie_breaker_exact_over_family() {
        let pool = fresh_pool().await;
        let now = Utc::now().to_rfc3339();
        insert(&pool, "fam", "llama", "3-8b", Some("Q4_K_S"), &now).await;
        insert(&pool, "exa", "llama", "3-8b", Some("Q4_K_M"), &now).await;
        let d = dep(Some(Quantization::Q4_K_M));
        let r = check_model_dependencies(&pool, &[d], &ResolutionContext::default())
            .await
            .unwrap();
        assert_eq!(r.matched[0].install_id, "exa");
        assert_eq!(r.matched[0].quality, "exact");
    }

    #[tokio::test]
    async fn dry_run_is_side_effect_free() {
        let pool = fresh_pool().await;
        let tmp = tempfile::TempDir::new().unwrap();
        insert(
            &pool,
            "a",
            "llama",
            "3-8b",
            Some("Q4_K_M"),
            "2026-04-15T00:00:00Z",
        )
        .await;

        let before = count_installs_and_blobs(&pool, tmp.path()).await.unwrap();
        let mut d = dep(None);
        d.family = "missing".into();
        let report = resolve_dry_run(&pool, &[d], &ResolutionContext::default(), &ZeroSizeProbe)
            .await
            .unwrap();
        let after = count_installs_and_blobs(&pool, tmp.path()).await.unwrap();
        assert_eq!(before, after);
        assert_eq!(report.missing.len(), 1);
    }

    #[tokio::test]
    async fn latency_p95_under_100ms_with_50_installs_5_deps() {
        let pool = fresh_pool().await;
        for i in 0..50 {
            let t = format!("2026-04-15T00:{:02}:00Z", i);
            insert(&pool, &format!("i{i}"), "llama", "3-8b", Some("Q4_K_M"), &t).await;
        }
        let deps: Vec<ModelDependency> = (0..5).map(|_| dep(Some(Quantization::Q4_K_M))).collect();

        let mut times = Vec::with_capacity(200);
        for _ in 0..200 {
            let start = std::time::Instant::now();
            check_model_dependencies(&pool, &deps, &ResolutionContext::default())
                .await
                .unwrap();
            times.push(start.elapsed().as_micros());
        }
        times.sort();
        let p95 = times[(times.len() as f64 * 0.95) as usize];
        assert!(p95 < 100_000, "p95 = {p95}us exceeds 100ms budget");
    }
}
