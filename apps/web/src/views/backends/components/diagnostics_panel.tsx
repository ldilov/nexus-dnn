import type { DiagnosticRecord } from "../types";

interface Props {
  diagnostics: DiagnosticRecord[];
  onCopyReport: (report: DiagnosticRecord) => void;
}

export function DiagnosticsPanel({ diagnostics, onCopyReport }: Props) {
  if (diagnostics.length === 0) {
    return <div data-testid="diagnostics-empty">No diagnostics recorded.</div>;
  }
  return (
    <div data-testid="diagnostics-panel">
      {diagnostics.map((d, idx) => (
        <article key={idx} data-category={d.category}>
          <header>
            <strong>{d.title}</strong>
            <span> — {d.category}</span>
          </header>
          <p>{d.explanation}</p>
          <p>
            <em>Likely cause:</em> {d.likely_cause}
          </p>
          <ul>
            {d.suggested_actions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
          <details>
            <summary>Technical details</summary>
            <pre>{JSON.stringify(d.technical_details, null, 2)}</pre>
          </details>
          <button type="button" onClick={() => onCopyReport(d)}>
            Copy report
          </button>
        </article>
      ))}
    </div>
  );
}
