import { useEffect, useState } from "react";
import { type Workflow, fetchWorkflows, fetchWorkflow } from "../api/client";
import { vars } from "../theme/contract.css";

export function StageView() {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selected, setSelected] = useState<Workflow | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWorkflows()
      .then(setWorkflows)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to load workflows"),
      );
  }, []);

  const handleSelect = (id: string) => {
    fetchWorkflow(id)
      .then(setSelected)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to load workflow"),
      );
  };

  if (error) return <div style={{ color: vars.color.error.base }}>{error}</div>;

  return (
    <div>
      <div style={{ marginBottom: 12 }}>
        <h3>Workflows</h3>
        {workflows.map((wf) => (
          <button
            key={wf.id}
            onClick={() => handleSelect(wf.id)}
            style={{ marginRight: 8, padding: "4px 8px", cursor: "pointer" }}
          >
            {wf.name}
          </button>
        ))}
      </div>
      {selected && (
        <div style={{ display: "flex", gap: 16, overflowX: "auto" }}>
          {selected.stages.map((stage) => (
            <div
              key={stage.name}
              style={{
                backgroundColor: vars.color.bg.elevated,
                borderRadius: 4,
                padding: 12,
                minWidth: 180,
              }}
            >
              <h4 style={{ margin: "0 0 8px" }}>{stage.name}</h4>
              {stage.nodes.map((node) => (
                <div
                  key={node.id}
                  style={{
                    background: vars.color.bg.panel,
                    borderRadius: 4,
                    padding: 8,
                    marginBottom: 6,
                    fontSize: 13,
                  }}
                >
                  <strong>{node.id}</strong>
                  <div style={{ opacity: 0.7 }}>{node.operator}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
