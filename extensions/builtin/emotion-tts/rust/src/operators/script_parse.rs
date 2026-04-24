use async_trait::async_trait;
use serde::{Deserialize, Serialize};

use crate::domain::parser::{parse_script, ParsePlan, ParserMode};
use crate::domain::Result;
use crate::operators::{Operator, OperatorId};

pub const OP_ID: OperatorId = OperatorId {
    namespace: "emotiontts",
    name: "script.parse",
    version: "1.0.0",
};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Input {
    pub script: String,
    pub mode: ParserMode,
}

pub type Output = ParsePlan;

pub struct ScriptParseOperator;

#[async_trait]
impl Operator for ScriptParseOperator {
    type Input = Input;
    type Output = Output;

    fn id(&self) -> OperatorId {
        OP_ID
    }

    async fn execute(&self, input: Input) -> Result<Output> {
        Ok(parse_script(&input.script, input.mode))
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn parses_dialogue_end_to_end() {
        let op = ScriptParseOperator;
        let plan = op
            .execute(Input {
                script: "[Bob] hello\n[Alice] there".into(),
                mode: ParserMode::Dialogue,
            })
            .await
            .unwrap();
        assert_eq!(plan.utterances.len(), 2);
    }

    #[test]
    fn operator_id_shape() {
        assert_eq!(OP_ID.namespace, "emotiontts");
        assert_eq!(OP_ID.name, "script.parse");
    }
}
