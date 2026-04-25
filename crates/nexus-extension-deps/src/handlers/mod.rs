//! Built-in step handlers for spec 035.
//!
//! Each handler lives in its own module and is registered by
//! [`crate::handler::HandlerRegistry::default()`] at host startup (US1 task T031).
//! Handlers are filled in across US1 tasks T026..T030.

pub mod model_artifact;
pub mod package_set;
pub mod runtime;
pub mod system_binary;
pub mod validation;
