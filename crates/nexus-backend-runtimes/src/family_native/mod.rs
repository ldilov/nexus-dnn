//! Native-binary runtime family placeholder (spec 032, FR-021).
//!
//! Family for runtimes that ship a pre-built native binary and need no
//! bootstrap / dependency install. In v1 this module is a typed seam
//! reserved for a future `RuntimeFamily::Native` variant (not yet added to
//! the enum); its primary purpose right now is to anchor the "the generic
//! pipeline is family-agnostic" invariant by giving us a second module path
//! the pipeline can point at.
//!
//! Concrete no-op handler lands in T063.
