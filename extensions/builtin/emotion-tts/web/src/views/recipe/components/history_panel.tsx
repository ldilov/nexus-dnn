import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ExtensionApiError } from "../../../services/http";
import { resumeRun } from "../../../services/runs_client";
import type { RunStatus, RunSummary } from "../../../services/types";
import * as css from "../recipe.css";
import { Banner } from "../../../components/banner";
import { Button } from "../../../components/button";
import { StatusPill } from "../../../components/status_pill";

interface Props {
  runs: RunSummary[];
  deploymentId: string;
}

const RESUMABLE_STATUSES: readonly RunStatus[] = ["cancelled", "failed", "partial"];

export function HistoryPanel({ runs, deploymentId }: Props): JSX.Element {
  const navigate = useNavigate();
  const [busyRunId, setBusyRunId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (runs.length === 0) {
    return <p className={css.label}>No runs yet.</p>;
  }

  const onResume = async (runId: string): Promise<void> => {
    setBusyRunId(runId);
    setError(null);
    try {
      const { runId: resumedId } = await resumeRun(deploymentId, runId);
      navigate(`/${deploymentId}/runs/${resumedId}`);
    } catch (err: unknown) {
      setError(describeError(err));
    } finally {
      setBusyRunId(null);
    }
  };

  return (
    <>
      {error && <Banner severity="error">{error}</Banner>}
      <ul className={css.filenameList}>
        {runs.map((r) => {
          const resumable = RESUMABLE_STATUSES.includes(r.status) && r.kind === "batch";
          return (
            <li key={r.runId}>
              <Link to={`/${deploymentId}/runs/${r.runId}`}>
                {r.kind} · {r.status} · {new Date(r.queuedAt * 1000).toLocaleString()}
              </Link>
              {resumable && (
                <>
                  {" "}
                  <StatusPill tone={r.status === "failed" ? "danger" : "warning"}>
                    partial — resumable
                  </StatusPill>
                  {" "}
                  <Button
                    variant="secondary"
                    disabled={busyRunId === r.runId}
                    onClick={() => void onResume(r.runId)}
                  >
                    {busyRunId === r.runId ? "Resuming…" : "Resume"}
                  </Button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

function describeError(err: unknown): string {
  if (err instanceof ExtensionApiError) return `${err.category}: ${err.message}`;
  if (err instanceof Error) return err.message;
  return "Unexpected error";
}
