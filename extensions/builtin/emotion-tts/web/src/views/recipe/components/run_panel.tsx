import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();
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

  // When a run reaches terminal state and one or more segments failed,
  // surface the most common failure category as a prominent banner so the
  // user doesn't have to scan a table to figure out what went wrong.
  const failedSegments = segmentList.filter((s) => s.status === "failed");
  const dominantFailure = (() => {
    if (phase !== "terminal" || failedSegments.length === 0) return null;
    const counts = new Map<string, number>();
    for (const s of failedSegments) {
      const cat = s.failureCategory ?? "unknown";
      counts.set(cat, (counts.get(cat) ?? 0) + 1);
    }
    let topCategory = "unknown";
    let topCount = 0;
    for (const [cat, n] of counts) {
      if (n > topCount) {
        topCategory = cat;
        topCount = n;
      }
    }
    const total = segmentList.length;
    return { category: topCategory, count: topCount, total };
  })();
  const failureHelp: Record<string, string> = {
    missing_voice_mapping:
      "One or more characters in the script have no voice mapping. " +
      "Click Mappings in the header to upload a voice sample and map the character.",
    voice_file_missing:
      "A mapping points at a voice file that no longer exists on disk. " +
      "Re-upload the voice in the Mappings editor.",
    synthesis_failed:
      "IndexTTS2 raised an error during inference. " +
      "Check the host log for the [synth ...] checkpoints to see which step failed.",
    cancelled:
      "Run was cancelled. Click Generate to retry.",
  };

  // If the error message mentions unmapped characters (the host's
  // create_run rejects with a structured "X unmapped characters …" message
  // when the script references characters with no voice mapping), offer a
  // direct "Open Mappings" button so the user has a one-click recovery
  // path instead of having to scan the recipe header for the right link.
  const errorIsUnmapped = error?.toLowerCase().includes("unmapped") ?? false;

  return (
    <div>
      {error && (
        <div
          className={css.dangerBanner}
          role="alert"
          aria-live="assertive"
          style={{
            marginBottom: 12,
            padding: "12px 14px",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            fontSize: "0.95rem",
            lineHeight: 1.45,
          }}
        >
          <strong>Run failed to start</strong>
          <span>{error}</span>
          {errorIsUnmapped && (
            <button
              type="button"
              className={css.secondaryButton}
              onClick={() => navigate(`/${props.deploymentId}/mappings`)}
              style={{ alignSelf: "flex-start" }}
            >
              Open Mappings →
            </button>
          )}
        </div>
      )}

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

      {dominantFailure && (
        <div className={css.dangerBanner} role="alert">
          <strong>
            Run failed — {dominantFailure.count} of {dominantFailure.total} segments
            failed with <code>{dominantFailure.category}</code>
          </strong>
          {failureHelp[dominantFailure.category] && (
            <div style={{ marginTop: 6, fontWeight: 400 }}>
              {failureHelp[dominantFailure.category]}
            </div>
          )}
        </div>
      )}

      {run?.exportArtifactRef && (
        <a
          href={`/api/v1/extensions/nexus.audio.emotiontts/exports/${run.exportArtifactRef}/download`}
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
