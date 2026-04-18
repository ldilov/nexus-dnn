use std::fmt;

use serde::{Deserialize, Serialize};

use crate::ids::{ModelId, VariantCodename};

#[derive(Clone, Debug, Eq, Hash, PartialEq, Serialize, Deserialize)]
#[non_exhaustive]
pub struct PoolKey {
    pub variant: VariantCodename,
    pub model_id: ModelId,
}

impl PoolKey {
    pub fn new(variant: VariantCodename, model_id: ModelId) -> Self {
        Self { variant, model_id }
    }
}

impl fmt::Display for PoolKey {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}@{}", self.variant, self.model_id)
    }
}
