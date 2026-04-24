import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { ExtensionApiError } from "../../services/http";
import { resumeRun } from "../../services/runs_client";
import type { Run, RunStatus } from "../../services/types";

interface LoaderData {
  run: Run;
}

const RESUMABLE: readonly RunStatus[] = ["cancelled", "failed", "partial"];

export function RunDetailView(): JSX.Element {
  const { run } = useLoaderData() as LoaderData;
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const failedCount = run.utterances.filter(
    (u) => u.status === "failed" || u.status === "cancelled",
  ).length;
  const canResume = RESUMABLE.includes(run.status) && run.kind === "batch";

  const onRerun = async (): Promise<void> => {
    if (!run.deploymentId) return;
    setBusy(true);
    setError(null);
    try {
      const { runId } = await resumeRun(run.deploymentId, run.runId);
      navigate(`/${run.deploymentId}/runs/${runId}`);
    } catch (err: unknown) {
      setError(describeError(err));
    } finally {
      setBusy(false);
    }
  };

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

      {canResume && (
        <section>
          {failedCount > 0 ? (
            <p>
              {failedCount} line{failedCount === 1 ? "" : "s"} did not complete.
            </p>
          ) : (
            <p>This run was interrupted before it completed.</p>
          )}
          <button type="button" disabled={busy} onClick={() => void onRerun()}>
            {busy
              ? "Resuming…"
              : failedCount > 0
                ? "Rerun failed lines"
                : "Resume run"}
          </button>
          {error && <p role="alert">{error}</p>}
        </section>
      )}

      <h2>Utterances</h2>
      {(() => {
        const completed = run.utterances.filter((u) => u.status === "completed").length;
        const cached = run.utterances.filter((u) => u.cacheHit).length;
        const ratio = completed > 0 ? Math.round((cached / completed) * 100) : 0;
        return (
          <p>
            {cached}/{completed} completed segments served from cache ({ratio}%)
          </p>
        );
      })()}
      <ul>
        {run.utterances.map((u) => (
          <li key={u.utteranceId}>
            #{u.globalIndex.toString().padStart(3, "0")} [{u.characterDisplay}] {u.text} —{" "}
            {u.status}
            {u.durationMs ? ` (${u.durationMs} ms)` : ""}
            {u.cacheHit ? " · cached" : ""}
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

function describeError(err: unknown): string {
  if (err instanceof ExtensionApiError) return `${err.category}: ${err.message}`;
  if (err instanceof Error) return err.message;
  return "Unexpected error";
}
