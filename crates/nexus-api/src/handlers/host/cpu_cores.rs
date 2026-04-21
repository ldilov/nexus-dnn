//! `GET /api/host/cpu/cores` — spec 028 T028.
//!
//! Returns detected physical and logical CPU core counts. Detection is
//! cached in a `OnceLock` because core counts are stable for the host's
//! lifetime. See
//! `specs/028-gguf-layer-metadata/contracts/host_cpu_cores.openapi.yaml`.

use std::sync::OnceLock;

use axum::Json;
use axum::extract::State;
use nexus_backend_runtimes::{CpuCoreFacts, detect_cpu_cores};
use serde::Serialize;

use crate::AppState;

static CACHED_FACTS: OnceLock<CpuCoreFacts> = OnceLock::new();

#[derive(Debug, Clone, Copy, Serialize)]
#[non_exhaustive]
pub struct CpuCoreFactsDto {
    pub physical: u32,
    pub logical: u32,
    pub detection_ok: bool,
}

impl From<CpuCoreFacts> for CpuCoreFactsDto {
    fn from(facts: CpuCoreFacts) -> Self {
        Self {
            physical: facts.physical,
            logical: facts.logical,
            detection_ok: facts.detection_ok,
        }
    }
}

pub async fn get_cpu_cores(State(_state): State<AppState>) -> Json<CpuCoreFactsDto> {
    let facts = *CACHED_FACTS.get_or_init(detect_cpu_cores);
    Json(CpuCoreFactsDto::from(facts))
}
