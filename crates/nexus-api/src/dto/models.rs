use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct ModelLimitsDto {
    pub max_context: Option<u32>,
    pub vocab_size: Option<u32>,
    pub hidden_size: Option<u32>,
    pub num_heads: Option<u32>,
    pub num_layers: Option<u32>,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct HyperparameterCommonDto {
    pub temperature: f32,
    pub top_p: f32,
    pub top_k: u32,
    pub repetition_penalty: f32,
    pub max_context_length: u32,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct HyperparameterLlamacppDto {
    pub n_gpu_layers: Option<i32>,
    pub n_batch: Option<u32>,
    pub mlock: Option<bool>,
    pub mmap: Option<bool>,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct HyperparameterTrtDto {
    pub max_input_len: Option<u32>,
    pub max_output_len: Option<u32>,
    pub enable_kv_cache_reuse: Option<bool>,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct HyperparameterProfileDto {
    pub common: HyperparameterCommonDto,
    pub llamacpp: Option<HyperparameterLlamacppDto>,
    pub trt: Option<HyperparameterTrtDto>,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct BackendCompatDto {
    pub compatible: bool,
    pub signal: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct BackendCompatMapDto {
    pub llamacpp: BackendCompatDto,
    pub trt_llm: BackendCompatDto,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct RepoFileDto {
    pub path: String,
    pub size_bytes: Option<u64>,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct HfSearchResultDto {
    pub repo_id: String,
    pub author: Option<String>,
    pub license: Option<String>,
    pub downloads_30d: Option<u64>,
    pub last_modified: Option<String>,
    pub files: Vec<RepoFileDto>,
    pub formats: Vec<String>,
    pub quantizations: Vec<String>,
    pub backend_compat: BackendCompatMapDto,
    pub already_installed_ids: Vec<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct HfSearchPageDto {
    pub query: String,
    pub page: u32,
    pub has_next: bool,
    pub results: Vec<HfSearchResultDto>,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct InstalledModelDto {
    pub id: String,
    pub repo_id: Option<String>,
    pub revision: Option<String>,
    pub display_name: String,
    pub format: Option<String>,
    pub quantization: Option<String>,
    pub size_bytes: Option<u64>,
    pub routed_backend: Option<String>,
    pub routing_signal: Option<String>,
    pub state: String,
    pub installed_at: String,
    pub model_limits: Option<ModelLimitsDto>,
    pub hyperparameters: Option<HyperparameterProfileDto>,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct CatalogListDto {
    pub installed: Vec<InstalledModelDto>,
    pub hf_results: Vec<HfSearchResultDto>,
    pub hf_status: String,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct InstallModelRequestDto {
    pub source: String,
    pub repo_id: String,
    pub revision: Option<String>,
    pub files: Vec<String>,
    pub display_name: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct ModelInstallTaskDto {
    pub task_id: String,
    pub model_install_id: Option<String>,
    pub routed_backend: Option<String>,
    pub routing_signal: Option<String>,
    pub progress_channel: String,
    pub cancel_endpoint: String,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct LoadStateDto {
    pub backend_id: String,
    pub loaded_model_id: Option<String>,
    pub loaded_at: Option<String>,
    pub ready: bool,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct LoadTaskDto {
    pub load_task_id: String,
    pub progress_channel: String,
    pub estimated_duration_seconds: Option<u32>,
}
