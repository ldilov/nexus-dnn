//! Spec 051 PR-3 (Delta D). Host-owned HTTP surface for per-extension
//! lease idle-timeout configuration. Generic by ext-id — the host
//! resolves the caller's extension into one or more
//! `RuntimeInstallId`s via the catalog + installs repos, then forwards
//! the timeout to the `LeaseManager`. The manager itself stays
//! extension-agnostic.

pub mod idle_timeout;
