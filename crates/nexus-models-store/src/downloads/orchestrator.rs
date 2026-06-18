//! Download orchestrator — enforces the fixed 2-slot concurrency cap
//! (FR-087, FR-088), owns the FIFO waiting queue, and streams each
//! target artifact from its upstream URL to disk while publishing
//! progress back to the [`JobStore`].
//!
//! State flow per target:
//! `queued → downloading → downloaded | paused | failed | auth_required`.
//!
//! Resumable (T082): pre-flight probes the on-disk size and sends a
//! `Range: bytes=N-` request when the byte count is consistent with a
//! previous partial download. HTTP `206 Partial Content` is honoured;
//! `200 OK` means the server ignored the Range header and we restart
//! from zero (truncating the on-disk file).
//!
//! Rehydration (T083): on startup, any row left in `downloading` is
//! flipped to `paused` so the user can explicitly resume — preventing
//! an automatic reconnect storm against the upstream.
//!
//! Pause / resume (T086): a per-job `tokio::sync::watch` signal lets
//! an in-flight stream exit cleanly between chunks; `resume` just
//! flips state back to `queued` and re-enqueues the job.

use std::collections::{HashMap, VecDeque};
use std::path::{Path, PathBuf};
use std::sync::Arc;
use std::time::Duration;

use futures_util::StreamExt;
use reqwest::StatusCode;
use reqwest::header::{CONTENT_RANGE, HeaderMap, HeaderValue, RANGE};
use sha2::{Digest, Sha256};
use tokio::io::{AsyncSeekExt, AsyncWriteExt};
use tokio::sync::{Mutex, OwnedSemaphorePermit, Semaphore, watch};
use tokio_util::sync::CancellationToken;

use crate::downloads::MAX_CONCURRENT_DOWNLOADS;
use crate::downloads::auth::TokenStore;
use crate::downloads::install_map::{InstallMap, InstalledArtifactRecord};
use crate::downloads::legibility::{self, IndexEntry, ManifestSidecar};
use crate::downloads::store::{
    JobStore, JobStoreError, PersistedJob, PersistedTarget, RequestedKind, TargetState,
};
use crate::ids::{JobId, VariantId};
use crate::normalize::classify::classify_format;
use crate::types::DownloadState;

#[derive(Clone)]
pub struct DownloadOrchestrator {
    inner: Arc<Inner>,
}

struct Inner {
    store: JobStore,
    install_map: InstallMap,
    semaphore: Arc<Semaphore>,
    queue: Mutex<VecDeque<JobId>>,
    sink_root: PathBuf,
    http: reqwest::Client,
    tokens: TokenStore,
    civitai_tokens: TokenStore,
    pause_signals: Mutex<HashMap<JobId, watch::Sender<bool>>>,
    cancel: CancellationToken,
}

/// RAII permit guard — drops the semaphore permit when the job worker
/// finishes (Principle VII).
struct DownloadSlot(#[allow(dead_code)] OwnedSemaphorePermit);

impl DownloadOrchestrator {
    pub fn sink_root(&self) -> &Path {
        &self.inner.sink_root
    }

    #[must_use]
    pub fn new(
        store: JobStore,
        install_map: InstallMap,
        sink_root: PathBuf,
        http: reqwest::Client,
        tokens: TokenStore,
        civitai_tokens: TokenStore,
    ) -> Self {
        Self::with_cancel(
            store,
            install_map,
            sink_root,
            http,
            tokens,
            civitai_tokens,
            CancellationToken::new(),
        )
    }

    #[must_use]
    pub fn with_cancel(
        store: JobStore,
        install_map: InstallMap,
        sink_root: PathBuf,
        http: reqwest::Client,
        tokens: TokenStore,
        civitai_tokens: TokenStore,
        cancel: CancellationToken,
    ) -> Self {
        let this = Self {
            inner: Arc::new(Inner {
                store,
                install_map,
                semaphore: Arc::new(Semaphore::new(MAX_CONCURRENT_DOWNLOADS)),
                queue: Mutex::new(VecDeque::new()),
                sink_root,
                http,
                tokens,
                civitai_tokens,
                pause_signals: Mutex::new(HashMap::new()),
                cancel,
            }),
        };
        this.spawn_token_listener();
        this
    }

    /// FR-114 — a token change re-queues every job parked in
    /// `AuthRequired`. We spawn a single background listener at
    /// orchestrator construction; it lives for the process's lifetime.
    fn spawn_token_listener(&self) {
        let mut rx = self.inner.tokens.subscribe();
        let orch = self.clone();
        let cancel = self.inner.cancel.clone();
        tokio::spawn(async move {
            loop {
                tokio::select! {
                    _ = cancel.cancelled() => break,
                    event = rx.recv() => match event {
                        Ok(ev) => {
                            tracing::info!(?ev, "token event; invalidating auth_required jobs");
                            if let Err(e) = orch.invalidate_auth_required().await {
                                tracing::warn!(error = %e, "auth_required invalidation failed");
                            }
                        }
                        Err(_) => break,
                    }
                }
            }
        });
    }

    /// Flip every `auth_required` job back to `queued` and enqueue it.
    /// Safe to call multiple times; `enqueue` will simply no-op once
    /// every slot is busy. Exposed `pub` for tests.
    pub async fn invalidate_auth_required(&self) -> Result<(), JobStoreError> {
        let ids = self
            .inner
            .store
            .list_by_state(DownloadState::AuthRequired)
            .await?;
        for id in ids {
            self.inner
                .store
                .update_state(&id, DownloadState::Queued, None)
                .await?;
            self.enqueue(id).await;
        }
        Ok(())
    }

    /// Transition every stranded `Downloading` row to `Paused` — run
    /// once at host startup before any worker is spawned (T083).
    pub async fn recover_startup_state(&self) -> Result<(), JobStoreError> {
        self.inner.store.rehydrate_downloading_to_paused().await
    }

    /// Enqueue a newly-created or resumed job. Returns immediately.
    pub async fn enqueue(&self, job_id: JobId) {
        let mut queue = self.inner.queue.lock().await;
        queue.push_back(job_id);
        drop(queue);
        self.try_spawn_workers();
    }

    /// Request a pause. Returns `true` if the job was actively running;
    /// `false` if the job was merely queued (for which the caller
    /// should [`Self::cancel_queued`]).
    pub async fn pause(&self, job_id: JobId) -> bool {
        let signals = self.inner.pause_signals.lock().await;
        if let Some(tx) = signals.get(&job_id) {
            let _ = tx.send(true);
            true
        } else {
            false
        }
    }

    /// Remove a queued job from the FIFO without affecting any
    /// in-flight stream (complementary to [`Self::pause`]).
    pub async fn cancel_queued(&self, job_id: JobId) -> bool {
        let mut queue = self.inner.queue.lock().await;
        if let Some(pos) = queue.iter().position(|id| id == &job_id) {
            queue.remove(pos);
            true
        } else {
            false
        }
    }

    /// Resume a paused job — flips the persisted state back to
    /// `queued` and enqueues it. Idempotent.
    pub async fn resume(&self, job_id: JobId) -> Result<(), JobStoreError> {
        self.inner
            .store
            .update_state(&job_id, DownloadState::Queued, None)
            .await?;
        self.enqueue(job_id).await;
        Ok(())
    }

    fn try_spawn_workers(&self) {
        for _ in 0..MAX_CONCURRENT_DOWNLOADS {
            if self.inner.semaphore.available_permits() == 0 {
                return;
            }
            let orch = self.clone();
            tokio::spawn(async move {
                let permit = match orch.inner.semaphore.clone().try_acquire_owned() {
                    Ok(p) => p,
                    Err(_) => return,
                };
                let slot = DownloadSlot(permit);
                let Some(job_id) = orch.inner.queue.lock().await.pop_front() else {
                    return;
                };
                orch.run_job(job_id).await;
                drop(slot);
                orch.try_spawn_workers();
            });
        }
    }

    async fn run_job(&self, job_id: JobId) {
        let job = match self.inner.store.get(&job_id).await {
            Ok(Some(j)) => j,
            Ok(None) => {
                tracing::warn!(%job_id, "orchestrator: job vanished before run");
                return;
            }
            Err(e) => {
                tracing::error!(%job_id, error = %e, "orchestrator: load job failed");
                return;
            }
        };

        if job.state.is_terminal() {
            return;
        }

        let (tx, rx) = watch::channel(false);
        {
            let mut map = self.inner.pause_signals.lock().await;
            map.insert(job_id, tx);
        }

        if let Err(e) = self
            .inner
            .store
            .update_state(&job_id, DownloadState::Downloading, None)
            .await
        {
            tracing::error!(%job_id, error = %e, "orchestrator: mark downloading failed");
            self.inner.pause_signals.lock().await.remove(&job_id);
            return;
        }

        let outcome = self.stream_targets(&job, rx).await;

        {
            let mut map = self.inner.pause_signals.lock().await;
            map.remove(&job_id);
        }

        if outcome.is_ok() {
            self.write_legibility_sidecar(&job).await;
        }

        let (state, err) = match outcome {
            Ok(()) => (DownloadState::Downloaded, None),
            Err(TargetFailure::Paused) => (DownloadState::Paused, None),
            Err(TargetFailure::AuthRequired) => (
                DownloadState::AuthRequired,
                Some("upstream returned 401/403; set huggingface.access_token".to_owned()),
            ),
            Err(TargetFailure::Upstream(msg)) => (DownloadState::Failed, Some(msg)),
            Err(TargetFailure::Io(msg)) => (DownloadState::Failed, Some(msg)),
        };
        let _ = self
            .inner
            .store
            .update_state(&job_id, state, err.as_deref())
            .await;
    }

    async fn stream_targets(
        &self,
        job: &PersistedJob,
        pause_rx: watch::Receiver<bool>,
    ) -> Result<(), TargetFailure> {
        let sink_dir = self.inner.sink_root.join(job.job_id.to_string());
        tokio::fs::create_dir_all(&sink_dir)
            .await
            .map_err(|e| TargetFailure::Io(format!("mkdir: {e}")))?;

        for target in &job.targets {
            if target.state == TargetState::Downloaded {
                continue;
            }
            self.inner
                .store
                .update_target_state(&job.job_id, &target.artifact_id, TargetState::Downloading)
                .await
                .map_err(store_err)?;

            let result = self
                .stream_one(job, target, &sink_dir, pause_rx.clone())
                .await;

            match result {
                Ok(computed_sha) => {
                    if let Some(ref sha) = computed_sha {
                        let _ = self
                            .inner
                            .store
                            .update_target_sha256(&job.job_id, &target.artifact_id, sha)
                            .await;
                    }
                    let _ = self
                        .inner
                        .store
                        .update_target_state(
                            &job.job_id,
                            &target.artifact_id,
                            TargetState::Downloaded,
                        )
                        .await;
                    self.record_install(job, target, computed_sha).await;
                }
                Err(TargetFailure::Paused) => {
                    let _ = self
                        .inner
                        .store
                        .update_target_state(&job.job_id, &target.artifact_id, TargetState::Queued)
                        .await;
                    return Err(TargetFailure::Paused);
                }
                Err(failure) => {
                    let _ = self
                        .inner
                        .store
                        .update_target_state(&job.job_id, &target.artifact_id, TargetState::Failed)
                        .await;
                    return Err(failure);
                }
            }
        }
        Ok(())
    }

    /// Returns the computed sha256 hex on a full download (`resume_from == 0`),
    /// or `None` when resuming a partial download (the on-disk prefix is not
    /// re-read, so a full-file hash cannot be computed correctly on resume).
    async fn stream_one(
        &self,
        job: &PersistedJob,
        target: &PersistedTarget,
        sink_dir: &Path,
        mut pause_rx: watch::Receiver<bool>,
    ) -> Result<Option<String>, TargetFailure> {
        let path = sink_dir.join(&target.filename);
        if let Some(parent) = path.parent() {
            let _ = tokio::fs::create_dir_all(parent).await;
        }

        let disk_len = tokio::fs::metadata(&path)
            .await
            .ok()
            .map(|m| m.len())
            .unwrap_or(0);
        let mut resume_from = target.downloaded_bytes.min(disk_len);
        if disk_len != resume_from {
            truncate_to(&path, resume_from).await?;
        }

        let mut headers = HeaderMap::new();
        if resume_from > 0
            && let Ok(value) = HeaderValue::from_str(&format!("bytes={resume_from}-"))
        {
            headers.insert(RANGE, value);
        }

        let hf_tok = self.inner.tokens.current().await;
        let cv_tok = self.inner.civitai_tokens.current().await;
        let mut req = self.inner.http.get(&target.download_url).headers(headers);
        if let Some(tok) = token_for_url(&target.download_url, &hf_tok, &cv_tok) {
            req = req.bearer_auth(tok);
        }

        let response = req
            .send()
            .await
            .map_err(|e| TargetFailure::Upstream(format!("GET failed: {e}")))?;

        if response.status() == StatusCode::UNAUTHORIZED
            || response.status() == StatusCode::FORBIDDEN
        {
            return Err(TargetFailure::AuthRequired);
        }

        let partial = response.status() == StatusCode::PARTIAL_CONTENT;
        if !response.status().is_success() {
            return Err(TargetFailure::Upstream(format!(
                "HTTP {} on {}",
                response.status(),
                target.filename
            )));
        }
        if !partial {
            resume_from = 0;
            truncate_to(&path, 0).await?;
        }

        let mut file = tokio::fs::OpenOptions::new()
            .create(true)
            .write(true)
            .truncate(false)
            .open(&path)
            .await
            .map_err(|e| TargetFailure::Io(format!("open {:?}: {e}", path.file_name())))?;
        file.seek(std::io::SeekFrom::Start(resume_from))
            .await
            .map_err(|e| TargetFailure::Io(format!("seek: {e}")))?;

        // Size the server promises for THIS request: a 206 carries the full
        // size in Content-Range's total, a 200 in Content-Length.
        let advertised_total = if partial {
            response
                .headers()
                .get(CONTENT_RANGE)
                .and_then(|v| v.to_str().ok())
                .and_then(parse_content_range_total)
        } else {
            response.content_length()
        };

        if let Some(file_size) = advertised_total {
            if target.expected_bytes.is_none() {
                let _ = self
                    .inner
                    .store
                    .raise_total_bytes(&job.job_id, file_size)
                    .await;
            }
        }

        let mut stream = response.bytes_stream();
        let mut downloaded: u64 = resume_from;
        let mut last_flush = tokio::time::Instant::now();
        let mut hasher: Option<Sha256> = if resume_from == 0 {
            Some(Sha256::new())
        } else {
            None
        };

        loop {
            tokio::select! {
                biased;

                changed = pause_rx.changed() => {
                    if changed.is_ok() && *pause_rx.borrow() {
                        file.flush().await.ok();
                        let _ = self
                            .inner
                            .store
                            .update_target_progress(
                                &job.job_id,
                                &target.artifact_id,
                                downloaded,
                            )
                            .await;
                        return Err(TargetFailure::Paused);
                    }
                }

                chunk = stream.next() => {
                    let Some(chunk_res) = chunk else { break };
                    let chunk = chunk_res
                        .map_err(|e| TargetFailure::Upstream(format!("stream chunk: {e}")))?;
                    if let Some(h) = hasher.as_mut() {
                        h.update(&chunk);
                    }
                    file.write_all(&chunk)
                        .await
                        .map_err(|e| TargetFailure::Io(format!("write: {e}")))?;
                    downloaded = downloaded.saturating_add(chunk.len() as u64);
                    if last_flush.elapsed() > Duration::from_millis(750) {
                        let _ = self
                            .inner
                            .store
                            .update_target_progress(
                                &job.job_id,
                                &target.artifact_id,
                                downloaded,
                            )
                            .await;
                        last_flush = tokio::time::Instant::now();
                    }
                }
            }
        }

        file.flush()
            .await
            .map_err(|e| TargetFailure::Io(format!("flush: {e}")))?;
        let _ = self
            .inner
            .store
            .update_target_progress(&job.job_id, &target.artifact_id, downloaded)
            .await;

        // A stream that ends early (HF/Xet throttle, dropped connection) looks
        // identical to success; reject it so a partial never marks Downloaded.
        match verify_transfer_size(downloaded, advertised_total, target.expected_bytes) {
            SizeVerdict::Ok => {}
            SizeVerdict::Unverifiable => tracing::warn!(
                target: "model_store",
                file = %target.filename,
                received = downloaded,
                "download size unverifiable — no Content-Length, Content-Range, or manifest size"
            ),
            SizeVerdict::Mismatch { expected, received } => {
                return Err(TargetFailure::Upstream(format!(
                    "truncated transfer for {}: received {received} of {expected} bytes",
                    target.filename
                )));
            }
        }

        let computed_sha = hasher.map(|h| format!("{:x}", h.finalize()));

        if let (Some(computed), Some(expected)) =
            (computed_sha.as_deref(), target.sha256.as_deref())
        {
            if !sha_matches(expected, computed) {
                return Err(TargetFailure::Upstream(format!(
                    "checksum mismatch for {}: expected {expected}, got {computed}",
                    target.filename
                )));
            }
        }

        Ok(computed_sha)
    }
}

fn token_for_url(
    url: &str,
    hf_token: &Option<String>,
    civitai_token: &Option<String>,
) -> Option<String> {
    let after_scheme = url.split("://").nth(1).unwrap_or(url);
    let host_with_port = after_scheme.split('/').next().unwrap_or("").to_ascii_lowercase();
    let host = host_with_port
        .find('@')
        .map(|i| &host_with_port[i + 1..])
        .unwrap_or(&host_with_port);
    let host = host.find(':').map(|i| &host[..i]).unwrap_or(host);
    if host.ends_with("huggingface.co") || host.ends_with("hf.co") {
        hf_token.clone()
    } else if host.ends_with("civitai.com") {
        civitai_token.clone()
    } else {
        None
    }
}

/// Normalize and compare two sha256 strings, ignoring case and a `sha256:` prefix.
/// An empty expected (after normalization) never matches.
fn sha_matches(expected: &str, actual: &str) -> bool {
    let normalize = |s: &str| s.trim().trim_start_matches("sha256:").to_ascii_lowercase();
    let e = normalize(expected);
    !e.is_empty() && e == normalize(actual)
}

/// Total size parsed from a `Content-Range: bytes START-END/TOTAL` header.
/// `None` for an unknown total (`*`) or a malformed value.
fn parse_content_range_total(value: &str) -> Option<u64> {
    let total = value.rsplit('/').next()?.trim();
    if total == "*" {
        return None;
    }
    total.parse::<u64>().ok()
}

/// Verdict on whether a finished transfer received every byte it should have.
#[derive(Debug, PartialEq, Eq)]
enum SizeVerdict {
    Ok,
    Mismatch { expected: u64, received: u64 },
    Unverifiable,
}

fn verify_transfer_size(
    received: u64,
    advertised: Option<u64>,
    manifest: Option<u64>,
) -> SizeVerdict {
    match advertised.or(manifest).filter(|&n| n > 0) {
        Some(expected) if received == expected => SizeVerdict::Ok,
        Some(expected) => SizeVerdict::Mismatch { expected, received },
        None => SizeVerdict::Unverifiable,
    }
}

impl DownloadOrchestrator {
    /// Spec 054 G7 — write the per-job `manifest.json` sidecar (AC-7.1) and
    /// upsert the top-level `index.json` entry (AC-7.2) once every target in
    /// the job has streamed cleanly. Best-effort: the weights are already on
    /// disk, so a legibility write failure is logged, never fatal.
    async fn write_legibility_sidecar(&self, job: &PersistedJob) {
        let sink_root = &self.inner.sink_root;
        let job_id = job.job_id.to_string();
        let files: Vec<String> = job.targets.iter().map(|t| t.filename.clone()).collect();
        let manifest = ManifestSidecar {
            family_id: job.family_id.as_str().to_owned(),
            source_repo: job.source_repo.clone(),
            accelerator: None,
            files,
            created_at: job.created_at.to_rfc3339(),
        };
        if let Err(e) = legibility::write_manifest(sink_root, &job_id, &manifest).await {
            tracing::warn!(
                target: "model_store",
                job_id = %job_id,
                error = %e,
                "legibility: manifest.json sidecar write failed"
            );
        }
        let entry = IndexEntry {
            family_id: job.family_id.as_str().to_owned(),
            repo: job.source_repo.clone(),
        };
        if let Err(e) = legibility::upsert_index_entry(sink_root, &job_id, entry).await {
            tracing::warn!(
                target: "model_store",
                job_id = %job_id,
                error = %e,
                "legibility: index.json upsert failed"
            );
        }
    }

    /// Write the FR-086 reverse-mapping row after a target commits
    /// cleanly. Non-fatal if it fails — the download already succeeded
    /// and the mapping can be rebuilt by a future backfill if needed.
    async fn record_install(
        &self,
        job: &PersistedJob,
        target: &PersistedTarget,
        computed_sha: Option<String>,
    ) {
        let variant_id = match job.requested_kind {
            RequestedKind::Variant => job
                .targets
                .iter()
                .find(|t| t.artifact_id == target.artifact_id)
                .and_then(|_| variant_id_from_job(job)),
            RequestedKind::Primary | RequestedKind::Bundle => None,
        };
        let recorded_sha = computed_sha.or_else(|| target.sha256.clone());
        let record = InstalledArtifactRecord {
            artifact_id: target.artifact_id.clone(),
            family_id: job.family_id.clone(),
            variant_id,
            format: classify_format(&target.filename),
            source_provider: job.source_provider.clone(),
            source_repo: job.source_repo.clone(),
            source_revision: None,
            filename: target.filename.clone(),
            job_id: job.job_id,
            sha256: recorded_sha,
            size_bytes: target.expected_bytes.or(Some(target.downloaded_bytes)),
        };
        if let Err(e) = self.inner.install_map.record(record).await {
            tracing::warn!(
                job_id = %job.job_id,
                error = %e,
                "install-map record failed (artifact still on disk)"
            );
            return;
        }

        let install_map = self.inner.install_map.clone();
        let artifact_id = target.artifact_id.clone();
        let artifact_path = resolve_artifact_path(&self.inner, job, target);
        tokio::spawn(async move {
            let metadata = nexus_model_metadata::extract_any(&artifact_path, artifact_id.as_str());
            if let Err(e) = install_map
                .update_extraction_metadata(&artifact_id, &metadata)
                .await
            {
                tracing::warn!(
                    artifact_id = %artifact_id,
                    error = %e,
                    "extraction-metadata update failed"
                );
            }
        });
    }
}

fn resolve_artifact_path(inner: &Inner, job: &PersistedJob, target: &PersistedTarget) -> PathBuf {
    inner
        .sink_root
        .join(job.job_id.to_string())
        .join(&target.filename)
}

fn variant_id_from_job(job: &PersistedJob) -> Option<VariantId> {
    if !matches!(job.requested_kind, RequestedKind::Variant) {
        return None;
    }
    let first = job.targets.first()?;
    let aid = first.artifact_id.as_str();
    let fam = job.family_id.as_str();
    if !aid.starts_with(fam) {
        return None;
    }
    let rest = aid.get(fam.len()..)?;
    let hash_at = rest.find('#')?;
    let filename = rest.get(hash_at + 1..)?;
    let base = filename.rsplit('/').next()?;
    let stem = base
        .strip_suffix(".gguf")
        .or_else(|| base.strip_suffix(".ggml"))?;
    let quant = stem.rsplit(['.', '-']).next()?;
    Some(VariantId::from(format!(
        "{fam}@{}",
        quant.to_ascii_uppercase()
    )))
}

async fn truncate_to(path: &Path, size: u64) -> Result<(), TargetFailure> {
    if !path.exists() {
        return Ok(());
    }
    let file = tokio::fs::OpenOptions::new()
        .write(true)
        .open(path)
        .await
        .map_err(|e| TargetFailure::Io(format!("open for truncate: {e}")))?;
    file.set_len(size)
        .await
        .map_err(|e| TargetFailure::Io(format!("truncate: {e}")))?;
    Ok(())
}

#[derive(Debug)]
enum TargetFailure {
    Paused,
    AuthRequired,
    Upstream(String),
    Io(String),
}

fn store_err(e: JobStoreError) -> TargetFailure {
    TargetFailure::Io(format!("store: {e}"))
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::downloads::legibility::{self, MANIFEST_FILENAME};
    use crate::downloads::store::{PersistedTarget, TargetState};
    use crate::ids::ArtifactId;
    use crate::types::DependencyRole;
    use chrono::Utc;
    use sqlx::sqlite::{SqliteConnectOptions, SqlitePoolOptions};
    use std::str::FromStr;

    async fn build_orchestrator(sink_root: PathBuf) -> DownloadOrchestrator {
        let opts = SqliteConnectOptions::from_str("sqlite::memory:").unwrap();
        let pool = SqlitePoolOptions::new()
            .max_connections(1)
            .connect_with(opts)
            .await
            .unwrap();
        sqlx::query(include_str!(
            "../../../../migrations/013_model_store_download_jobs.sql"
        ))
        .execute(&pool)
        .await
        .unwrap();
        let pool = Arc::new(pool);
        DownloadOrchestrator::new(
            JobStore::new(pool.clone()),
            InstallMap::new(pool),
            sink_root,
            reqwest::Client::new(),
            TokenStore::new(None),
            TokenStore::new(None),
        )
    }

    fn sample_job(job_id: JobId) -> PersistedJob {
        PersistedJob {
            job_id,
            family_id: crate::ids::FamilyId::from("huggingface:acme/model"),
            source_provider: "huggingface".into(),
            source_repo: "acme/model".into(),
            requested_kind: RequestedKind::Bundle,
            include_dependencies: false,
            state: DownloadState::Downloaded,
            progress_bytes: 7,
            total_bytes: Some(7),
            error_reason: None,
            warnings: vec![],
            created_at: Utc::now(),
            started_at: None,
            finished_at: None,
            targets: vec![
                PersistedTarget {
                    artifact_id: ArtifactId::from("huggingface:acme/model#model.gguf"),
                    filename: "model.gguf".into(),
                    role: DependencyRole::Primary,
                    download_url: "https://example/model.gguf".into(),
                    expected_bytes: Some(7),
                    downloaded_bytes: 7,
                    sha256: None,
                    state: TargetState::Downloaded,
                },
                PersistedTarget {
                    artifact_id: ArtifactId::from("huggingface:acme/model#config.json"),
                    filename: "config.json".into(),
                    role: DependencyRole::Primary,
                    download_url: "https://example/config.json".into(),
                    expected_bytes: Some(2),
                    downloaded_bytes: 2,
                    sha256: None,
                    state: TargetState::Downloaded,
                },
            ],
        }
    }

    /// AC-7.1 / AC-7.2 — on a completed job the orchestrator writes a
    /// `manifest.json` sidecar carrying the family + files and registers the
    /// job in the top-level `index.json`.
    #[tokio::test]
    async fn completed_job_writes_sidecar_and_index_entry() {
        let tmp = tempfile::tempdir().unwrap();
        let sink_root = tmp.path().to_path_buf();
        let orch = build_orchestrator(sink_root.clone()).await;
        let job_id = JobId::new();
        let job = sample_job(job_id);

        orch.write_legibility_sidecar(&job).await;

        let manifest_path = sink_root.join(job_id.to_string()).join(MANIFEST_FILENAME);
        let bytes = tokio::fs::read(&manifest_path).await.unwrap();
        let manifest: ManifestSidecar = serde_json::from_slice(&bytes).unwrap();
        assert_eq!(manifest.family_id, "huggingface:acme/model");
        assert_eq!(manifest.source_repo, "acme/model");
        assert_eq!(manifest.files, vec!["model.gguf", "config.json"]);

        let index = legibility::read_index(&sink_root).await.unwrap();
        let entry = index.get(&job_id.to_string()).expect("index entry present");
        assert_eq!(entry.family_id, "huggingface:acme/model");
        assert_eq!(entry.repo, "acme/model");
    }

    #[test]
    fn content_range_total_parses_full_size() {
        assert_eq!(parse_content_range_total("bytes 0-1000/1001"), Some(1001));
        assert_eq!(parse_content_range_total("bytes 500-1000/1001"), Some(1001));
        assert_eq!(parse_content_range_total("bytes 0-1/2 "), Some(2));
    }

    #[test]
    fn content_range_total_rejects_unknown_or_garbage() {
        assert_eq!(parse_content_range_total("bytes 0-100/*"), None);
        assert_eq!(parse_content_range_total("garbage"), None);
        assert_eq!(parse_content_range_total(""), None);
    }

    /// The regression for the DGX I2V-LOW failure: the server advertised the
    /// full size but the stream ended early — a truncated transfer must be a
    /// Mismatch, never silently accepted.
    #[test]
    fn truncated_transfer_is_a_mismatch() {
        assert_eq!(
            verify_transfer_size(7_350_000_000, Some(15_000_000_000), Some(15_000_000_000)),
            SizeVerdict::Mismatch {
                expected: 15_000_000_000,
                received: 7_350_000_000,
            }
        );
    }

    #[test]
    fn complete_transfer_is_ok() {
        assert_eq!(
            verify_transfer_size(1001, Some(1001), None),
            SizeVerdict::Ok
        );
        assert_eq!(
            verify_transfer_size(1001, None, Some(1001)),
            SizeVerdict::Ok
        );
    }

    #[test]
    fn advertised_size_wins_over_manifest() {
        // Server is authoritative for this transfer: matching its advertised
        // length is complete even when a stale manifest size disagrees.
        assert_eq!(
            verify_transfer_size(1001, Some(1001), Some(999)),
            SizeVerdict::Ok
        );
        // Falls short of the advertised length → mismatch despite manifest.
        assert_eq!(
            verify_transfer_size(500, Some(1001), Some(500)),
            SizeVerdict::Mismatch {
                expected: 1001,
                received: 500,
            }
        );
    }

    #[test]
    fn unknown_size_is_unverifiable_not_a_failure() {
        assert_eq!(
            verify_transfer_size(1001, None, None),
            SizeVerdict::Unverifiable
        );
        assert_eq!(
            verify_transfer_size(1001, Some(0), Some(0)),
            SizeVerdict::Unverifiable
        );
    }

    #[test]
    fn sha_matches_normalizes_case_and_prefix() {
        let hex = "abcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890";
        assert!(sha_matches(hex, hex));
        assert!(sha_matches(&hex.to_ascii_uppercase(), hex));
        assert!(sha_matches(&format!("sha256:{hex}"), hex));
        assert!(sha_matches(
            &format!("sha256:{}", hex.to_ascii_uppercase()),
            hex
        ));
        assert!(!sha_matches("aabbcc", hex));
    }

    #[test]
    fn sha_matches_rejects_empty_expected() {
        assert!(!sha_matches("", ""));
        assert!(!sha_matches("sha256:", "abc"));
    }
}

#[cfg(test)]
mod token_select_tests {
    use super::token_for_url;

    #[test]
    fn hf_token_only_for_huggingface_hosts() {
        let hf = Some("HF".to_string());
        let cv = Some("CV".to_string());
        assert_eq!(
            token_for_url("https://huggingface.co/x/y/resolve/main/m.gguf", &hf, &cv),
            Some("HF".to_string())
        );
        assert_eq!(
            token_for_url("https://cdn-lfs.huggingface.co/abc", &hf, &cv),
            Some("HF".to_string())
        );
    }

    #[test]
    fn civitai_token_only_for_civitai_hosts() {
        let hf = Some("HF".to_string());
        let cv = Some("CV".to_string());
        assert_eq!(
            token_for_url("https://civitai.com/api/download/models/7", &hf, &cv),
            Some("CV".to_string())
        );
    }

    #[test]
    fn no_token_for_arbitrary_hosts() {
        let hf = Some("HF".to_string());
        let cv = Some("CV".to_string());
        assert_eq!(token_for_url("https://example.com/m.gguf", &hf, &cv), None);
    }
}
