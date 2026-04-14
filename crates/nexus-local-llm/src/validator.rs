use serde::{Deserialize, Serialize};

use crate::diagnostics::FailureCategory;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ValidationCheck {
    pub check_id: String,
    pub ok: bool,
    pub message: String,
    pub duration_ms: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ValidationReport {
    pub runtime_install_id: Option<String>,
    pub overall_ok: bool,
    pub checks: Vec<ValidationCheck>,
    pub failure_category: Option<FailureCategory>,
}

impl ValidationReport {
    pub fn new(runtime_install_id: Option<String>) -> Self {
        Self {
            runtime_install_id,
            overall_ok: true,
            checks: Vec::new(),
            failure_category: None,
        }
    }

    pub fn push(&mut self, check: ValidationCheck) {
        if !check.ok {
            self.overall_ok = false;
        }
        self.checks.push(check);
    }

    pub fn fail_with(&mut self, category: FailureCategory) {
        self.overall_ok = false;
        self.failure_category = Some(category);
    }
}

pub const CHECK_IDS: [&str; 7] = [
    "binary_exists",
    "binary_version_probe",
    "dependent_libraries",
    "profile_matches_package",
    "health_probe_starts",
    "health_endpoint_reachable",
    "health_probe_shutdown",
];
