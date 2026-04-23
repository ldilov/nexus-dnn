//! Default in-memory `ExtensionRouterRegistry` implementation.

use std::collections::HashMap;
use std::sync::RwLock;
use std::sync::atomic::{AtomicBool, Ordering};

use axum::Router;
use chrono::{DateTime, Utc};

use super::id::ExtensionId;
use super::{ExtensionRouterRegistry, RegistryError, now};

/// One stored router registration. The router itself is `Clone` (axum
/// routers are cheaply cloneable handles), so dispatch can clone-then-call.
#[derive(Clone)]
#[non_exhaustive]
pub enum Registration {
    Ok {
        router: Router,
        registered_at: DateTime<Utc>,
        http_routes: Vec<String>,
    },
    Failed {
        reason: String,
        registered_at: DateTime<Utc>,
    },
}

pub struct DefaultRegistry {
    inner: RwLock<HashMap<ExtensionId, Registration>>,
    sealed: AtomicBool,
}

impl DefaultRegistry {
    pub fn new() -> Self {
        Self {
            inner: RwLock::new(HashMap::new()),
            sealed: AtomicBool::new(false),
        }
    }
}

impl Default for DefaultRegistry {
    fn default() -> Self {
        Self::new()
    }
}

impl ExtensionRouterRegistry for DefaultRegistry {
    fn register(
        &self,
        id: ExtensionId,
        router: Router,
        http_routes: Vec<String>,
    ) -> Result<(), RegistryError> {
        if self.sealed.load(Ordering::Acquire) {
            return Err(RegistryError::Sealed);
        }
        let mut guard = self.inner.write().expect("registry write lock poisoned");
        if guard.contains_key(&id) {
            return Err(RegistryError::Duplicate(id.into_string()));
        }
        guard.insert(
            id,
            Registration::Ok {
                router,
                registered_at: now(),
                http_routes,
            },
        );
        Ok(())
    }

    fn register_failure(&self, id: ExtensionId, reason: String) -> Result<(), RegistryError> {
        if self.sealed.load(Ordering::Acquire) {
            return Err(RegistryError::Sealed);
        }
        let mut guard = self.inner.write().expect("registry write lock poisoned");
        if guard.contains_key(&id) {
            return Err(RegistryError::Duplicate(id.into_string()));
        }
        guard.insert(
            id,
            Registration::Failed {
                reason,
                registered_at: now(),
            },
        );
        Ok(())
    }

    fn seal(&self) {
        self.sealed.store(true, Ordering::Release);
    }

    fn get(&self, id: &str) -> Option<Registration> {
        let guard = self.inner.read().expect("registry read lock poisoned");
        guard
            .iter()
            .find(|(k, _)| k.as_str() == id)
            .map(|(_, v)| v.clone())
    }

    fn list_ids(&self) -> Vec<String> {
        let guard = self.inner.read().expect("registry read lock poisoned");
        let mut out: Vec<String> = guard.keys().map(|k| k.as_str().to_owned()).collect();
        out.sort();
        out
    }

    fn contains(&self, id: &str) -> bool {
        let guard = self.inner.read().expect("registry read lock poisoned");
        guard.iter().any(|(k, _)| k.as_str() == id)
    }

    fn is_sealed(&self) -> bool {
        self.sealed.load(Ordering::Acquire)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use axum::routing::get;

    fn empty_router() -> Router {
        Router::new().route("/ping", get(|| async { "pong" }))
    }

    #[test]
    fn registers_and_retrieves_ok() {
        let reg = DefaultRegistry::new();
        let id = ExtensionId::parse("alpha").unwrap();
        reg.register(id.clone(), empty_router(), vec!["/ping".into()])
            .unwrap();
        assert!(reg.contains("alpha"));
        assert!(matches!(reg.get("alpha"), Some(Registration::Ok { .. })));
    }

    #[test]
    fn duplicate_registration_rejected() {
        let reg = DefaultRegistry::new();
        let id = ExtensionId::parse("alpha").unwrap();
        reg.register(id.clone(), empty_router(), vec![]).unwrap();
        let err = reg
            .register(id, empty_router(), vec![])
            .expect_err("expected duplicate");
        assert!(matches!(err, RegistryError::Duplicate(_)));
    }

    #[test]
    fn registers_failure_then_dispatches_failed_variant() {
        let reg = DefaultRegistry::new();
        let id = ExtensionId::parse("broken").unwrap();
        reg.register_failure(id, "boom".into()).unwrap();
        assert!(matches!(
            reg.get("broken"),
            Some(Registration::Failed { reason, .. }) if reason == "boom"
        ));
    }

    #[test]
    fn post_seal_writes_rejected() {
        let reg = DefaultRegistry::new();
        reg.seal();
        let id = ExtensionId::parse("alpha").unwrap();
        let err = reg
            .register(id.clone(), empty_router(), vec![])
            .expect_err("expected sealed");
        assert!(matches!(err, RegistryError::Sealed));
        let err2 = reg
            .register_failure(id, "x".into())
            .expect_err("expected sealed");
        assert!(matches!(err2, RegistryError::Sealed));
        assert!(reg.is_sealed());
    }

    #[test]
    fn list_ids_is_sorted_and_contains_works() {
        let reg = DefaultRegistry::new();
        for s in ["zeta", "alpha", "beta"] {
            let id = ExtensionId::parse(s).unwrap();
            reg.register(id, empty_router(), vec![]).unwrap();
        }
        assert_eq!(reg.list_ids(), vec!["alpha", "beta", "zeta"]);
        assert!(reg.contains("beta"));
        assert!(!reg.contains("missing"));
    }
}
