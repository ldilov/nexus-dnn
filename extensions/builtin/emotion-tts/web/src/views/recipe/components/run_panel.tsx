import { useCallback, useEffect, useRef, useState } from "react";
import { ExtensionApiError } from "../../../services/http";
import { cancelRun, createRun, getRun, subscribeRunProgress } from "../../../services/runs_client";
import type { CreateRunRequest, ProgressEvent, Run } from "../../../services/types";
import * as css from "../recipe.css";

type Phase = "idle" | "starting" | "running" | "terminal" | "error";

interface SegmentState {
  globalIndex: number;
  status: "queued" | "running" | "completed" | "failed" | "cancelled";
  durationMs?: number;
  failureCategory?: string;
}

interface Props {
  deploymentId: string;
  createPayload: CreateRunRequest;
  canGenerate: boolean;
}

export function RunPanel(props: Props): JSX.Element {
  const [phase, setPhase] = useState<Phase>("idle");
  const [runId, setRunId] = useState<string | null>(null);
  const [segments, setSegments] = useState<Map<number, SegmentState>>(new Map());
  const [error, setError] = useState<string | null>(null);
  const [run, setRun] = useState<Run | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    return () => {
      unsubscribeRef.current?.();
    };
  }, []);

  const startRun = useCallback(async () => {
    setPhase("starting");
    setError(null);
    setSegments(new Map());
    setRun(null);
    try {
      const created = await createRun(props.deploymentId, props.createPayload);
      setRunId(created.runId);
      setPhase("running");
      unsubscribeRef.current?.();
      unsubscribeRef.current = subscribeRunProgress(
        props.deploymentId,
        created.runId,
        (event) => handleEvent(event, setSegments, setPhase, setRun, props.deploymentId, created.runId),
        () => setPhase("error"),
      );
    } catch (err) {
      setPhase("error");
      setError(extractMessage(err));
    }
  }, [props.deploymentId, props.createPayload]);

  const cancel = useCallback(async () => {
    if (!runId) return;
    try {
      await cancelRun(props.deploymentId, runId);
    } catch (err) {
      setError(extractMessage(err));
    }
  }, [props.deploymentId, runId]);

  const segmentList = Array.from(segments.values()).sort((a, b) => a.globalIndex - b.globalIndex);
  const canCancel = phase === "starting" || phase === "running";
  const isPartial = run?.status === "partial";

  return (
    <div>
      <div className={css.controlRow}>
        <button
          type="button"
          className={css.primaryButton}
          disabled={!props.canGenerate || canCancel}
          onClick={startRun}
        >
          {phase === "running" ? "Running…" : "Generate + Export ZIP"}
        </button>
        <button
          type="button"
          className={css.dangerButton}
          disabled={!canCancel}
          onClick={cancel}
        >
          Cancel
        </button>
      </div>

      {error && <div className={css.dangerBanner}>{error}</div>}

      {run?.exportArtifactRef && (
        <a
          href={`/api/v1/artifacts/${run.exportArtifactRef}/download`}
          download
          className={css.secondaryButton}
        >
          Download ZIP
        </a>
      )}

      {isPartial && (
        <div className={css.warningBanner}>
          Partial run — click Generate again to resume (cache-hit completed segments).
        </div>
      )}

      {segmentList.length > 0 && (
        <table className={css.progressTable}>
          <thead>
            <tr>
              <th className={css.progressCell}>#</th>
              <th className={css.progressCell}>Status</th>
              <th className={css.progressCell}>Duration</th>
              <th className={css.progressCell}>Failure</th>
            </tr>
          </thead>
          <tbody>
            {segmentList.map((s) => (
              <tr key={s.globalIndex} className={css.progressRow}>
                <td className={css.progressCell}>{s.globalIndex.toString().padStart(3, "0")}</td>
                <td className={css.progressCell}>
                  <span className={pillFor(s.status)}>{s.status}</span>
                </td>
                <td className={css.progressCell}>{s.durationMs ? `${s.durationMs} ms` : "—"}</td>
                <td className={css.progressCell}>{s.failureCategory ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

async function handleEvent(
  event: ProgressEvent,
  setSegments: (updater: (prev: Map<number, SegmentState>) => Map<number, SegmentState>) => void,
  setPhase: (phase: Phase) => void,
  setRun: (run: Run) => void,
  deploymentId: string,
  runId: string,
): Promise<void> {
  switch (event.type) {
    case "segment_started":
      setSegments((prev) => {
        const next = new Map(prev);
        next.set(event.globalIndex, { globalIndex: event.globalIndex, status: "running" });
        return next;
      });
      return;
    case "segment_completed":
      setSegments((prev) => {
        const next = new Map(prev);
        next.set(event.globalIndex, {
          globalIndex: event.globalIndex,
          status: "completed",
          durationMs: event.durationMs,
        });
        return next;
      });
      return;
    case "segment_failed":
      setSegments((prev) => {
        const next = new Map(prev);
        next.set(event.globalIndex, {
          globalIndex: event.globalIndex,
          status: "failed",
          failureCategory: event.failureCategory,
        });
        return next;
      });
      return;
    case "run_terminal":
      setPhase("terminal");
      try {
        const run = await getRun(deploymentId, runId);
        setRun(run);
      } catch {
        /* observer hook only */
      }
      return;
  }
}

function pillFor(status: SegmentState["status"]): string {
  switch (status) {
    case "completed":
      return css.statusPillCompleted;
    case "running":
      return css.statusPillRunning;
    case "failed":
      return css.statusPillFailed;
    default:
      return css.statusPill;
  }
}

function extractMessage(err: unknown): string {
  if (err instanceof ExtensionApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "unknown error";
}
