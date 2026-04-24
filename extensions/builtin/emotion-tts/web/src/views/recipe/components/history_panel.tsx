import { Link } from "react-router";
import type { RunSummary } from "../../../services/types";
import * as css from "../recipe.css";

interface Props {
  runs: RunSummary[];
  deploymentId: string;
}

export function HistoryPanel({ runs, deploymentId }: Props): JSX.Element {
  if (runs.length === 0) {
    return <p className={css.label}>No runs yet.</p>;
  }
  return (
    <ul className={css.filenameList}>
      {runs.map((r) => (
        <li key={r.runId}>
          <Link to={`/${deploymentId}/runs/${r.runId}`}>
            {r.kind} · {r.status} · {new Date(r.queuedAt * 1000).toLocaleString()}
          </Link>
        </li>
      ))}
    </ul>
  );
}
