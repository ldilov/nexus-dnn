//! Manifest-side representation of the dependency install plan.
//!
//! Parses the `dependencies:` block on an extension manifest into a validated, topo-sorted
//! [`InstallPlan`]. All validation errors are reported through [`crate::DepError`].

use std::collections::{HashMap, HashSet, VecDeque};

use serde::{Deserialize, Serialize};

use crate::error::DepError;
use crate::handler::HandlerRegistry;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Step {
    pub id: String,
    #[serde(rename = "type")]
    pub step_type: String,
    #[serde(default)]
    pub requires: Vec<String>,
    #[serde(default)]
    pub spec: serde_json::Value,
}

#[derive(Debug, Clone, Default, Serialize, Deserialize)]
pub struct DependenciesBlock {
    pub steps: Vec<Step>,
}

#[derive(Debug, Clone)]
pub struct InstallPlan {
    pub extension_id: String,
    /// Steps in topo order (suitable for sequential execution).
    pub steps: Vec<Step>,
}

impl InstallPlan {
    pub fn total_count(&self) -> usize {
        self.steps.len()
    }

    pub fn is_empty(&self) -> bool {
        self.steps.is_empty()
    }
}

/// Parse the `dependencies:` block from a YAML value, validate, and topo-sort.
///
/// Caller passes in the surrounding extension id and a [`HandlerRegistry`] so that
/// per-step `validate(spec)` calls run against the right handler at parse time
/// (FR-014). Pure-data validation (id uniqueness, requires resolution, cycle
/// detection) runs first; handler validation is deferred to the end so a malformed
/// graph fails before any handler is invoked.
pub fn parse_dependencies_block(
    extension_id: &str,
    block: DependenciesBlock,
    registry: &HandlerRegistry,
) -> Result<InstallPlan, DepError> {
    if block.steps.is_empty() {
        return Ok(InstallPlan {
            extension_id: extension_id.to_owned(),
            steps: Vec::new(),
        });
    }

    validate_id_uniqueness(&block.steps)?;
    validate_requires_resolution(&block.steps)?;
    let sorted = topo_sort(&block.steps)?;

    // Now per-step handler validation. Done after structural validation so an unknown
    // step_type can't mask a more interesting structural problem.
    for step in &sorted {
        registry.validate_step(&step.id, &step.step_type, &step.spec)?;
    }

    Ok(InstallPlan {
        extension_id: extension_id.to_owned(),
        steps: sorted,
    })
}

fn validate_id_uniqueness(steps: &[Step]) -> Result<(), DepError> {
    let mut seen: HashSet<&str> = HashSet::with_capacity(steps.len());
    for step in steps {
        if !seen.insert(step.id.as_str()) {
            return Err(DepError::DuplicateStepId {
                step_id: step.id.clone(),
            });
        }
    }
    Ok(())
}

fn validate_requires_resolution(steps: &[Step]) -> Result<(), DepError> {
    let known: HashSet<&str> = steps.iter().map(|s| s.id.as_str()).collect();
    for step in steps {
        for req in &step.requires {
            if !known.contains(req.as_str()) {
                return Err(DepError::MissingRequires {
                    step_id: step.id.clone(),
                    missing: req.clone(),
                });
            }
        }
    }
    Ok(())
}

/// Kahn's algorithm. Detects cycles and returns the steps in dependency-respecting order.
pub fn topo_sort(steps: &[Step]) -> Result<Vec<Step>, DepError> {
    let mut indegree: HashMap<&str, usize> = HashMap::with_capacity(steps.len());
    let mut adjacency: HashMap<&str, Vec<&str>> = HashMap::with_capacity(steps.len());
    for step in steps {
        indegree.entry(step.id.as_str()).or_insert(0);
        adjacency.entry(step.id.as_str()).or_default();
    }
    for step in steps {
        for req in &step.requires {
            // edge: req -> step (req must come before step)
            adjacency
                .entry(req.as_str())
                .or_default()
                .push(step.id.as_str());
            *indegree.entry(step.id.as_str()).or_insert(0) += 1;
        }
    }

    // Iterate steps in declared order so a deterministic ordering is preserved among
    // independent steps.
    let mut ready: VecDeque<&str> = steps
        .iter()
        .filter(|s| indegree.get(s.id.as_str()).copied().unwrap_or(0) == 0)
        .map(|s| s.id.as_str())
        .collect();

    let by_id: HashMap<&str, &Step> = steps.iter().map(|s| (s.id.as_str(), s)).collect();
    let mut sorted_ids: Vec<&str> = Vec::with_capacity(steps.len());

    while let Some(id) = ready.pop_front() {
        sorted_ids.push(id);
        if let Some(neighbors) = adjacency.get(id) {
            for &n in neighbors {
                let counter = indegree.get_mut(n).expect("indegree initialised");
                *counter -= 1;
                if *counter == 0 {
                    ready.push_back(n);
                }
            }
        }
    }

    if sorted_ids.len() != steps.len() {
        let remaining: Vec<&str> = steps
            .iter()
            .map(|s| s.id.as_str())
            .filter(|id| !sorted_ids.contains(id))
            .collect();
        return Err(DepError::CycleDetected {
            cycle: remaining.join(" -> "),
        });
    }

    Ok(sorted_ids
        .into_iter()
        .map(|id| (*by_id.get(id).expect("by_id complete")).clone())
        .collect())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn step(id: &str, requires: &[&str]) -> Step {
        Step {
            id: id.to_owned(),
            step_type: "test_echo".to_owned(),
            requires: requires.iter().map(|s| (*s).to_owned()).collect(),
            spec: serde_json::Value::Null,
        }
    }

    #[test]
    fn empty_dependencies_block_parses() {
        let registry = HandlerRegistry::new();
        let plan =
            parse_dependencies_block("ext-a", DependenciesBlock::default(), &registry).unwrap();
        assert!(plan.is_empty());
    }

    #[test]
    fn duplicate_step_id_rejected() {
        let block = DependenciesBlock {
            steps: vec![step("a", &[]), step("a", &[])],
        };
        let registry = HandlerRegistry::new();
        let err = parse_dependencies_block("ext", block, &registry).unwrap_err();
        match err {
            DepError::DuplicateStepId { step_id } => assert_eq!(step_id, "a"),
            other => panic!("expected DuplicateStepId, got {other:?}"),
        }
    }

    #[test]
    fn missing_requires_rejected() {
        let block = DependenciesBlock {
            steps: vec![step("a", &["b"])],
        };
        let registry = HandlerRegistry::new();
        let err = parse_dependencies_block("ext", block, &registry).unwrap_err();
        match err {
            DepError::MissingRequires { step_id, missing } => {
                assert_eq!(step_id, "a");
                assert_eq!(missing, "b");
            }
            other => panic!("expected MissingRequires, got {other:?}"),
        }
    }

    #[test]
    fn cycle_rejected() {
        let block = DependenciesBlock {
            steps: vec![step("a", &["b"]), step("b", &["a"])],
        };
        let registry = HandlerRegistry::new();
        let err = parse_dependencies_block("ext", block, &registry).unwrap_err();
        assert!(matches!(err, DepError::CycleDetected { .. }));
    }

    #[test]
    fn topo_sort_orders_dependencies_first() {
        let steps = vec![
            step("validate", &["python", "pkgs", "ffmpeg", "models"]),
            step("python", &[]),
            step("pkgs", &["python"]),
            step("ffmpeg", &[]),
            step("models", &["python"]),
        ];
        let sorted = topo_sort(&steps).unwrap();
        let order: Vec<&str> = sorted.iter().map(|s| s.id.as_str()).collect();
        // python and ffmpeg both have no requires; python comes first because it's
        // declared first. pkgs and models come after python; validate comes last.
        assert_eq!(order[0], "python");
        assert!(
            order.iter().position(|id| *id == "pkgs").unwrap()
                > order.iter().position(|id| *id == "python").unwrap()
        );
        assert!(
            order.iter().position(|id| *id == "models").unwrap()
                > order.iter().position(|id| *id == "python").unwrap()
        );
        assert_eq!(order.last().copied(), Some("validate"));
    }

    #[test]
    fn unknown_step_type_rejected_by_registry_validation() {
        let block = DependenciesBlock {
            steps: vec![step("a", &[])],
        };
        // Empty registry — `test_echo` is not registered.
        let registry = HandlerRegistry::new();
        let err = parse_dependencies_block("ext", block, &registry).unwrap_err();
        assert!(matches!(err, DepError::UnknownStepType { .. }));
    }
}
