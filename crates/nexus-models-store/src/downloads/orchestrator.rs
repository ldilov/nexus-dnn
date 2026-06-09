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
use reqwest::header::{HeaderMap, HeaderValue, RANGE};
use tokio::io::{AsyncSeekExt, AsyncWriteExt};
use tokio::sync::{Mutex, OwnedSemaphorePermit, Semaphore, watch};
use tokio_util::sync::CancellationToken;

use crate::downloads::MAX_CONCURRENT_DOWNLOADS;
use crate::downloads::auth::TokenStore;
use crate::downloads::install_map::{InstallMap, InstalledArtifactRecord};
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
    ) -> Self {
        Self::with_cancel(
            store,
            install_map,
            sink_root,
            http,
            tokens,
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
                Ok(()) => {
                    let _ = self
                        .inner
                        .store
                        .update_target_state(
                            &job.job_id,
                            &target.artifact_id,
                            TargetState::Downloaded,
                        )
                        .await;
                    self.record_install(job, target).await;
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

    async fn stream_one(
        &self,
        job: &PersistedJob,
        target: &PersistedTarget,
        sink_dir: &Path,
        mut pause_rx: watch::Receiver<bool>,
    ) -> Result<(), TargetFailure> {
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

        let mut req = self.inner.http.get(&target.download_url).headers(headers);
        if let Some(tok) = self.inner.tokens.current().await {
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

        let mut stream = response.bytes_stream();
        let mut downloaded: u64 = resume_from;
        let mut last_flush = tokio::time::Instant::now();

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
        Ok(())
    }
}

impl DownloadOrchestrator {
    /// Write the FR-086 reverse-mapping row after a target commits
    /// cleanly. Non-fatal if it fails — the download already succeeded
    /// and the mapping can be rebuilt by a future backfill if needed.
    async fn record_install(&self, job: &PersistedJob, target: &PersistedTarget) {
        let variant_id = match job.requested_kind {
            RequestedKind::Variant => job
                .targets
                .iter()
                .find(|t| t.artifact_id == target.artifact_id)
                .and_then(|_| variant_id_from_job(job)),
            RequestedKind::Primary | RequestedKind::Bundle => None,
        };
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
            sha256: target.sha256.clone(),
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
