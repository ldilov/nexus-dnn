use std::collections::HashMap;

use crate::manifest::OperatorDefinition;

pub struct OperatorIndex {
    operators: Vec<OperatorDefinition>,
    by_id: HashMap<String, usize>,
    by_extension: HashMap<String, Vec<usize>>,
    by_category: HashMap<String, Vec<usize>>,
    duplicate_ids: HashMap<String, Vec<String>>,
}

impl OperatorIndex {
    pub fn build(entries: Vec<(String, OperatorDefinition)>) -> Self {
        let mut operators = Vec::with_capacity(entries.len());
        let mut by_id: HashMap<String, usize> = HashMap::new();
        let mut by_extension: HashMap<String, Vec<usize>> = HashMap::new();
        let mut by_category: HashMap<String, Vec<usize>> = HashMap::new();
        let mut duplicate_ids: HashMap<String, Vec<String>> = HashMap::new();

        for (extension_id, op) in entries {
            let idx = operators.len();
            let op_id = op.operator.id.clone();

            if let Some(&existing_idx) = by_id.get(&op_id) {
                let existing_ext = find_extension_for_index(existing_idx, &by_extension);
                duplicate_ids
                    .entry(op_id.clone())
                    .or_insert_with(|| vec![existing_ext])
                    .push(extension_id.clone());
            } else {
                by_id.insert(op_id.clone(), idx);
            }

            by_extension.entry(extension_id).or_default().push(idx);

            if let Some(cat) = &op.operator.category {
                by_category.entry(cat.clone()).or_default().push(idx);
            }

            operators.push(op);
        }

        Self {
            operators,
            by_id,
            by_extension,
            by_category,
            duplicate_ids,
        }
    }

    pub fn by_id(&self, id: &str) -> Option<&OperatorDefinition> {
        self.by_id.get(id).map(|&idx| &self.operators[idx])
    }

    pub fn by_extension(&self, extension_id: &str) -> Vec<&OperatorDefinition> {
        self.by_extension
            .get(extension_id)
            .map(|indices| indices.iter().map(|&idx| &self.operators[idx]).collect())
            .unwrap_or_default()
    }

    pub fn by_category(&self, category: &str) -> Vec<&OperatorDefinition> {
        self.by_category
            .get(category)
            .map(|indices| indices.iter().map(|&idx| &self.operators[idx]).collect())
            .unwrap_or_default()
    }

    pub fn has_duplicate(&self, id: &str) -> bool {
        self.duplicate_ids.contains_key(id)
    }

    pub fn all(&self) -> &[OperatorDefinition] {
        &self.operators
    }
}

fn find_extension_for_index(
    target_idx: usize,
    by_extension: &HashMap<String, Vec<usize>>,
) -> String {
    for (ext_id, indices) in by_extension {
        if indices.contains(&target_idx) {
            return ext_id.clone();
        }
    }
    String::from("unknown")
}
