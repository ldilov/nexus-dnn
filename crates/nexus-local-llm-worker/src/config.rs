use std::num::NonZeroUsize;
use std::time::Duration;

const DEFAULT_POOL_CAP: usize = 2;
const DEFAULT_IDLE_TIMEOUT_SECS: u64 = 600;
const DEFAULT_ACQUIRE_LEASE_TIMEOUT_SECS: u64 = 120;
const DEFAULT_LOG_TAIL_CAPACITY: usize = 200;

#[derive(Clone, Debug)]
pub struct WorkerConfig {
    pub pool_cap: NonZeroUsize,
    pub idle_timeout: Duration,
    pub acquire_lease_timeout: Duration,
    pub log_tail_capacity: usize,
}

impl WorkerConfig {
    pub fn from_env_or_defaults() -> Self {
        let pool_cap = read_env_usize("NEXUS_LOCAL_LLM_POOL_CAP")
            .filter(|n| *n > 0)
            .and_then(NonZeroUsize::new)
            .unwrap_or_else(|| {
                NonZeroUsize::new(DEFAULT_POOL_CAP).expect("default pool cap is non-zero")
            });

        let idle_timeout = Duration::from_secs(
            read_env_u64("NEXUS_LOCAL_LLM_IDLE_TIMEOUT").unwrap_or(DEFAULT_IDLE_TIMEOUT_SECS),
        );

        let acquire_lease_timeout = Duration::from_secs(
            read_env_u64("NEXUS_LOCAL_LLM_ACQUIRE_LEASE_TIMEOUT")
                .unwrap_or(DEFAULT_ACQUIRE_LEASE_TIMEOUT_SECS),
        );

        let log_tail_capacity = read_env_usize("NEXUS_LOCAL_LLM_LOG_TAIL_CAPACITY")
            .unwrap_or(DEFAULT_LOG_TAIL_CAPACITY);

        Self {
            pool_cap,
            idle_timeout,
            acquire_lease_timeout,
            log_tail_capacity,
        }
    }
}

impl Default for WorkerConfig {
    fn default() -> Self {
        Self::from_env_or_defaults()
    }
}

fn read_env_usize(key: &str) -> Option<usize> {
    std::env::var(key).ok().and_then(|v| v.parse().ok())
}

fn read_env_u64(key: &str) -> Option<u64> {
    std::env::var(key).ok().and_then(|v| v.parse().ok())
}
