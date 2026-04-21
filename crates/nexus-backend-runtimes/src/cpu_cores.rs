use serde::{Deserialize, Serialize};

const FALLBACK_CORES: u32 = 4;

#[derive(Debug, Clone, Copy, Serialize, Deserialize)]
#[non_exhaustive]
pub struct CpuCoreFacts {
    pub physical: u32,
    pub logical: u32,
    pub detection_ok: bool,
}

pub fn detect_cpu_cores() -> CpuCoreFacts {
    let logical = std::thread::available_parallelism()
        .map(|n| n.get() as u32)
        .unwrap_or(FALLBACK_CORES);
    let system = sysinfo::System::new();
    let physical = system
        .physical_core_count()
        .map(|n| n as u32)
        .unwrap_or(logical);
    let detection_ok = physical > 0 && logical > 0 && physical <= logical;
    if !detection_ok {
        return CpuCoreFacts {
            physical: FALLBACK_CORES,
            logical: FALLBACK_CORES,
            detection_ok: false,
        };
    }
    CpuCoreFacts {
        physical,
        logical,
        detection_ok: true,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn detect_cpu_cores_returns_consistent_facts() {
        let facts = detect_cpu_cores();
        assert!(facts.physical > 0, "physical cores must be > 0");
        assert!(facts.logical > 0, "logical cores must be > 0");
        assert!(
            facts.physical <= facts.logical,
            "physical ({}) must not exceed logical ({})",
            facts.physical,
            facts.logical
        );
        assert!(facts.detection_ok, "detection_ok must be true on dev host");
    }

    #[test]
    fn cpu_core_facts_serializes_round_trip() {
        let original = CpuCoreFacts {
            physical: 8,
            logical: 16,
            detection_ok: true,
        };
        let json = serde_json::to_string(&original).expect("serialize");
        assert!(json.contains("\"physical\":8"));
        assert!(json.contains("\"logical\":16"));
        assert!(json.contains("\"detection_ok\":true"));
        let decoded: CpuCoreFacts = serde_json::from_str(&json).expect("deserialize");
        assert_eq!(decoded.physical, 8);
        assert_eq!(decoded.logical, 16);
        assert!(decoded.detection_ok);
    }
}
