import { useLoaderData } from "react-router";
import type { Run } from "../../services/types";

interface LoaderData {
  run: Run;
}

export function RunDetailView(): JSX.Element {
  const { run } = useLoaderData() as LoaderData;
  return (
    <main>
      <h1>Run {run.runId}</h1>
      <dl>
        <dt>Status</dt>
        <dd>{run.status}</dd>
        <dt>Kind</dt>
        <dd>{run.kind}</dd>
        <dt>Format</dt>
        <dd>{run.outputFormat}</dd>
        <dt>Speed</dt>
        <dd>{run.speedFactor}×</dd>
      </dl>
      <h2>Utterances</h2>
      <ul>
        {run.utterances.map((u) => (
          <li key={u.utteranceId}>
            #{u.globalIndex.toString().padStart(3, "0")} [{u.characterDisplay}] {u.text} —{" "}
            {u.status}
            {u.durationMs ? ` (${u.durationMs} ms)` : ""}
          </li>
        ))}
      </ul>
      {run.exportArtifactRef && (
        <a href={`/api/v1/artifacts/${run.exportArtifactRef}/download`} download>
          Download ZIP
        </a>
      )}
    </main>
  );
}
