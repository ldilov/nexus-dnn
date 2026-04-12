import { useEffect, useState } from "react";
import { type Operator, fetchOperators } from "../api/client";
import { vars } from "../theme/contract.css";

export function OperatorsList() {
  const [operators, setOperators] = useState<Operator[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOperators()
      .then(setOperators)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to load operators"),
      );
  }, []);

  if (error) return <div style={{ color: vars.color.error.base }}>{error}</div>;

  return (
    <div>
      <h3>Operators</h3>
      {operators.length === 0 && <p>No operators available</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {operators.map((op) => (
          <li key={op.id} style={{ marginBottom: 6 }}>
            <strong>{op.name}</strong>
            <span style={{ marginLeft: 8, opacity: 0.7 }}>[{op.category}]</span>
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              {op.input_types.join(", ")} &rarr; {op.output_types.join(", ")}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
