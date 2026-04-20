#![allow(dead_code)]

use std::sync::{Arc, Mutex};

use async_trait::async_trait;
use nexus_api::AppState;
use nexus_artifact::FilesystemArtifactStore;
use nexus_events::bus::BroadcastEventBus;
use nexus_extension::InMemoryExtensionRegistry;
use nexus_huggingface::{
    DownloadSpec, DownloadedArtifact, HfError, HfResult, HuggingFaceCapability, RepoMetadata,
    SearchPage, SearchReq, SearchResult,
};
use nexus_models_store::capabilities::{CapabilityRegistry, LlamaCppAdapter, TestAdapter};
use nexus_models_store::downloads::{DownloadOrchestrator, InstallMap, JobStore, TokenStore};
use nexus_models_store::model::{BackendCapability, BackendStatus};
use nexus_models_store::types::Format;
use nexus_run::DefaultRunEngine;
use nexus_scheduler::RoundRobinScheduler;
use nexus_storage::SqliteDatabase;
use nexus_worker::DefaultWorkerManager;
use semver::Version;

/// A HuggingFace stub with a pre-programmed search response and a
/// recorded list of the requests it saw.
#[derive(Default)]
pub struct StubHf {
    pub fixed_results: Mutex<Vec<SearchResult>>,
    pub detail: Mutex<Option<RepoMetadata>>,
    pub force_error: Mutex<Option<HfError>>,
    pub observed_queries: Mutex<Vec<String>>,
}

impl StubHf {
    pub fn with_results(results: Vec<SearchResult>) -> Arc<Self> {
        Arc::new(Self {
            fixed_results: Mutex::new(results),
            detail: Mutex::new(None),
            force_error: Mutex::new(None),
            observed_queries: Mutex::new(vec![]),
        })
    }

    pub fn with_error(err: HfError) -> Arc<Self> {
        Arc::new(Self {
            fixed_results: Mutex::new(vec![]),
            detail: Mutex::new(None),
            force_error: Mutex::new(Some(err)),
            observed_queries: Mutex::new(vec![]),
        })
    }
}

#[async_trait]
impl HuggingFaceCapability for StubHf {
    async fn search(&self, req: SearchReq) -> HfResult<SearchPage> {
        self.observed_queries.lock().unwrap().push(req.query.clone());
        if let Some(err) = self.force_error.lock().unwrap().take() {
            return Err(err);
        }
        let results = self.fixed_results.lock().unwrap().clone();
        Ok(SearchPage {
            query: req.query,
            page: req.page,
            has_next: false,
            results,
        })
    }

    async fn detail(
        &self,
        repo_id: &str,
        revision: Option<&str>,
    ) -> HfResult<RepoMetadata> {
        Ok(self.detail.lock().unwrap().clone().unwrap_or(RepoMetadata {
            repo_id: repo_id.to_owned(),
            revision: revision.unwrap_or("main").to_owned(),
            author: None,
            license: None,
            pipeline_tag: None,
            library_name: None,
            tags: vec![],
            siblings: vec![],
            config: None,
            downloads: None,
            last_modified: None,
        }))
    }

    async fn download(&self, _spec: DownloadSpec) -> HfResult<DownloadedArtifact> {
        Err(HfError::Cancelled)
    }
}

/// Build a `TestAdapter` shaped like a hypothetical `diffusers`
/// backend — exercises SC-003 / SC-004 (adding a backend requires
/// zero page-code edits).
pub fn fake_diffusers_adapter(status: BackendStatus) -> TestAdapter {
    TestAdapter::new(BackendCapability {
        backend_id: nexus_models_store::ids::BackendId::from("diffusers"),
        display_name: "diffusers".into(),
        supported_formats: vec![Format::Safetensors, Format::PytorchBin],
        supports_quantized_variants: false,
        supports_multi_artifact_models: true,
        status,
    })
}

pub struct TestHarness {
    pub state: AppState,
    pub hf: Arc<StubHf>,
    pub tokens: TokenStore,
    pub job_store: Arc<JobStore>,
    pub orchestrator: Arc<DownloadOrchestrator>,
    pub install_map: InstallMap,
    _tempdir: tempfile::TempDir,
}

pub async fn harness_with(hf: Arc<StubHf>) -> TestHarness {
    harness_with_extra(hf, None).await
}

pub async fn harness_with_extra(
    hf: Arc<StubHf>,
    extra_backend: Option<BackendStatus>,
) -> TestHarness {
    let db = Arc::new(
        SqliteDatabase::new("sqlite::memory:")
            .await
            .expect("in-memory db"),
    );
    let event_bus = Arc::new(BroadcastEventBus::default());
    let worker_manager = Arc::new(DefaultWorkerManager::new(event_bus.clone()));

    let ext_dir = tempfile::tempdir().expect("tempdir");
    let host_ver = Version::new(1, 0, 0);
    let proto_ver = Version::new(1, 0, 0);
    let (extension_registry, _) =
        InMemoryExtensionRegistry::from_directory(ext_dir.path(), &host_ver, &proto_ver)
            .await
            .expect("empty extension registry");

    let artifact_dir = ext_dir.path().join("artifacts");
    std::fs::create_dir_all(&artifact_dir).expect("artifact dir");
    let artifact_store = Arc::new(FilesystemArtifactStore::new(artifact_dir));

    let scheduler: Arc<RoundRobinScheduler> = Arc::new(RoundRobinScheduler);
    let run_engine = Arc::new(DefaultRunEngine::new(
        db.clone(),
        worker_manager.clone(),
        artifact_store.clone(),
        event_bus.clone(),
        scheduler.clone(),
    ));

    let mut reg = CapabilityRegistry::new();
    reg.register(Arc::new(LlamaCppAdapter::new()));
    if let Some(status) = extra_backend {
        reg.register(Arc::new(fake_diffusers_adapter(status)));
    }
    let registry = Arc::new(reg);

    let shared_pool = Arc::new(db.pool().clone());
    let job_store = Arc::new(JobStore::new(shared_pool.clone()));
    let install_map = InstallMap::new(shared_pool);
    let tokens = TokenStore::new(None);
    let sink_root = ext_dir.path().join("downloads");
    std::fs::create_dir_all(&sink_root).expect("mkdir downloads");
    let orchestrator = Arc::new(DownloadOrchestrator::new(
        (*job_store).clone(),
        install_map.clone(),
        sink_root,
        reqwest::Client::new(),
        tokens.clone(),
    ));

    let state = AppState {
        health_status_fn: Arc::new(|| serde_json::json!({ "status": "ok" })),
        db,
        event_bus,
        extension_registry: Arc::new(extension_registry),
        run_engine,
        worker_manager,
        scheduler,
        artifact_store,
        extensions_dir: None,
        storage_manager: None,
        backend_adapter_registry: None,
        spawner: None,
        huggingface: Some(hf.clone()),
        capability_registry: Some(registry),
        download_job_store: Some(job_store.clone()),
        download_orchestrator: Some(orchestrator.clone()),
        install_map: Some(install_map.clone()),
        hf_token_store: Some(tokens.clone()),
        backend_event_bus: Arc::new(
            nexus_backend_runtimes::events::BroadcastPublisher::new(1024),
        ),
        draft_materialize_map:
            nexus_api::handlers::modules::draft_map::DraftMaterializeMap::new(),
        host_install_paths: None,
    };

    TestHarness {
        state,
        hf,
        tokens,
        job_store,
        orchestrator,
        install_map,
        _tempdir: ext_dir,
    }
}

pub fn gguf_result(repo_id: &str, quants: &[(&str, u64)]) -> SearchResult {
    SearchResult {
        repo_id: repo_id.to_owned(),
        author: repo_id.split('/').next().map(str::to_owned),
        license: Some("apache-2.0".to_owned()),
        downloads_30d: Some(42_000),
        last_modified: Some("2026-01-01T00:00:00Z".into()),
        files: quants
            .iter()
            .map(|(q, sz)| nexus_huggingface::RepoFile {
                path: format!("model.{q}.gguf"),
                size_bytes: Some(*sz),
            })
            .collect(),
        formats: vec!["gguf".into()],
        quantizations: quants.iter().map(|(q, _)| (*q).to_owned()).collect(),
        pipeline_tag: Some("text-generation".into()),
    }
}

pub fn safetensors_result(repo_id: &str) -> SearchResult {
    SearchResult {
        repo_id: repo_id.to_owned(),
        author: repo_id.split('/').next().map(str::to_owned),
        license: Some("llama3".to_owned()),
        downloads_30d: Some(50_000),
        last_modified: Some("2026-01-01T00:00:00Z".into()),
        files: vec![nexus_huggingface::RepoFile {
            path: "model-fp16.safetensors".into(),
            size_bytes: Some(14_000_000_000),
        }],
        formats: vec!["safetensors".into()],
        quantizations: vec![],
        pipeline_tag: Some("text-generation".into()),
    }
}
