//! Spec 032 — Backend-Runtime Catalog HTTP surface + manifest-contribution
//! bridge.
//!
//! The handlers in [`list`] / [`get`] / [`install`] expose
//! `/api/v1/backend-runtimes*` per
//! [contracts/http/backend_runtimes.yaml](../../../../specs/032-backend-runtime-catalog/contracts/http/backend_runtimes.yaml).
//! [`registration`] bridges `nexus_extension::manifest::BackendRuntimeContribution`
//! → `nexus_backend_runtimes::generic::catalog::CatalogEntry` so this is
//! the only place those two crates meet (Principle XIII boundary).

pub mod dto;
pub mod get;
pub mod install;
pub mod installs_delete;
pub mod installs_get;
pub mod installs_health;
pub mod installs_list;
pub mod installs_progress;
pub mod installs_restart;
pub mod installs_retry;
pub mod installs_start;
pub mod installs_stop;
pub mod leases_delete;
pub mod leases_get;
pub mod leases_list;
pub mod list;
pub mod pipeline_runner;
pub mod registration;
