#![forbid(unsafe_code)]

pub mod compatibility;
pub mod diagnostic;
pub mod error;
pub mod events;
pub mod hash;
pub mod id;
pub mod parameter;
pub mod path_guard;
pub mod repository;
pub mod service;
pub mod sqlite_repo;
pub mod state;

pub use repository::DeploymentRepository;
pub use sqlite_repo::SqliteDeploymentRepository;

pub use error::DeploymentError;
pub use events::DeploymentEvent;
pub use id::{DeploymentId, DeploymentRevisionId};
pub use state::{DeploymentState, MappingState, RestoreState};
