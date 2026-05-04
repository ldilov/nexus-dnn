import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ExtensionApiError } from "../../../services/http";
import { cancelRun, createRun, getRun, resumeRun, subscribeRunProgress } from "../../../services/runs_client";
import type { CreateRunRequest, ProgressEvent, Run } from "../../../services/types";
import * as css from "../recipe.css";
import * as panel from "./run_panel.css";
import { Banner } from "../../../components/banner";
import { Button } from "../../../components/button";
import {
  sizeStyle as buttonSize,
  variantStyle as buttonVariant,
} from "../../../components/button.css";
import { StatusPill } from "../../../components/status_pill";

type Phase = "idle" | "starting" | "running" | "terminal" | "error";

interface SegmentState {
  globalIndex: number;
  status: "queued" | "running" | "completed" | "failed" | "cancelled";
  durationMs?: number;
  failureCategory?: string;
}

interface DiagnosticItem {
  label: string;
  status: "ok" | "warn" | "fail";
  detail?: string;
}

interface Props {
  deploymentId: string;
  createPayload: CreateRunRequest;
  canGenerate: boolean;
  diagnostics?: DiagnosticItem[];
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

  // Notify any sticky/floating action bar of the current phase so it can
  // disable Generate while a run is in flight.
  useEffect(() => {
    const detail: { busy: boolean } = {
      busy: phase === "starting" || phase === "running",
    };
    window.dispatchEvent(new CustomEvent("emotion-tts:run-state", { detail }));
  }, [phase]);

  const handleRunTerminal = useCallback(
    (terminalRun: Run): void => {
      const status = terminalRun.status;
      if (status === "completed" || status === "partial") {
        toast.success(
          status === "completed"
            ? "Run complete — open the Artifacts tab to download"
            : "Partial run — open the Artifacts tab for what was produced",
          {
            action: {
              label: "Artifacts",
              onClick: () => {
                navigate(`/${props.deploymentId}?tab=artifacts`);
              },
            },
          },
        );
      }
    },
    [navigate, props.deploymentId],
  );

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
        (event) =>
          handleEvent(
            event,
            setSegments,
            setPhase,
            (terminalRun) => {
              setRun(terminalRun);
              handleRunTerminal(terminalRun);
            },
            props.deploymentId,
            created.runId,
          ),
        () => setPhase("error"),
      );
    } catch (err) {
      setPhase("error");
      setError(extractMessage(err));
    }
  }, [props.deploymentId, props.createPayload, handleRunTerminal]);

  // Sticky action bar bridge — listen for "trigger-generate" events fired by
  // the floating toolbar and start a run when we're idle/terminal/error.
  useEffect(() => {
    const onTrigger = (): void => {
      if (phase === "idle" || phase === "terminal" || phase === "error") {
        void startRun();
      }
    };
    window.addEventListener("emotion-tts:trigger-generate", onTrigger);
    return () => window.removeEventListener("emotion-tts:trigger-generate", onTrigger);
  }, [phase, startRun]);

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
  const inFlightCount = segmentList.filter((s) => s.status === "running").length;
  const completedCount = segmentList.filter((s) => s.status === "completed").length;
  const showQueueChip =
    phase === "starting" || phase === "running" || segmentList.length > 0;

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
  const DEFAULT_FAILURE_HELP = "Check the run detail page for the per-segment error log.";

  const errorIsUnmapped = error?.toLowerCase().includes("unmapped") ?? false;

  const diagnostics = props.diagnostics ?? [];
  const blockingDiagnostic = diagnostics.find((d) => d.status === "fail");

  const generateLabel =
    phase === "starting"
      ? "Starting…"
      : phase === "running"
        ? "Generating…"
        : "Generate";
  const generateDisabled = !props.canGenerate || canCancel || !!blockingDiagnostic;
  const isRunning = phase === "starting" || phase === "running";
  // "idle" (breathing halo) only when we're truly ready to fire — otherwise
  // the static disabled style applies.
  const generateState =
    isRunning
      ? "running"
      : !generateDisabled
        ? "idle"
        : "blocked";

  return (
    <div className={panel.root}>
      <div className={panel.card}>
        <span className={panel.numeral} aria-hidden="true">
          01
        </span>
        <div className={panel.diagnostics}>
          <span className={panel.diagnosticsLabel}>
            Pre-flight
            {showQueueChip && (
              <span className={panel.queueChip}>
                <span className={panel.queueDot} aria-hidden="true" />
                {inFlightCount > 0
                  ? `${inFlightCount} in flight`
                  : `${completedCount} done`}
              </span>
            )}
          </span>
          {diagnostics.length > 0 ? (
            <ul className={panel.diagList} aria-label="Pre-flight checks">
              {diagnostics.map((d) => (
                <li key={d.label} className={panel.diagItem}>
                  <span
                    className={panel.diagDot}
                    data-status={d.status}
                    aria-hidden="true"
                  />
                  <span className={panel.diagLabel}>{d.label}</span>
                  {d.detail && (
                    <span className={panel.diagDetail}>{d.detail}</span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <span className={panel.diagDetail}>Ready when you are.</span>
          )}
        </div>

        <div className={panel.cta}>
          <button
            type="button"
            className={panel.generateBtn}
            data-state={generateState}
            onClick={startRun}
            disabled={generateDisabled}
            aria-busy={isRunning || undefined}
          >
            {isRunning ? (
              <span className={panel.spinner} aria-hidden="true" />
            ) : (
              <span className={panel.ctaIcon} aria-hidden="true">
                ▶
              </span>
            )}
            {generateLabel}
          </button>
          {canCancel && (
            <button
              type="button"
              className={panel.cancelBtn}
              onClick={cancel}
              aria-label="Cancel current run"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {error && (
        <Banner
          severity="error"
          style={{
            marginBottom: 12,
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 8,
          }}
        >
          <strong>Run failed to start</strong>
          <span>{error}</span>
          {errorIsUnmapped && (
            <Button
              variant="secondary"
              onClick={() => navigate(`/${props.deploymentId}/mappings`)}
              style={{ alignSelf: "flex-start" }}
            >
              Open Mappings →
            </Button>
          )}
        </Banner>
      )}


      {dominantFailure && (
        <Banner severity="error" style={{ flexDirection: "column", alignItems: "flex-start" }}>
          <strong>
            Run failed — {dominantFailure.count} of {dominantFailure.total} segments
            failed with <code>{dominantFailure.category}</code>
          </strong>
          <div style={{ marginTop: 6, fontWeight: 400 }}>
            {failureHelp[dominantFailure.category] ?? DEFAULT_FAILURE_HELP}
          </div>
        </Banner>
      )}

      {run?.exportArtifactRef && (
        <a
          href={`/api/v1/extensions/nexus.audio.emotiontts/exports/${run.exportArtifactRef}/download`}
          download
          className={`${buttonVariant.secondary} ${buttonSize.md}`}
          style={{ textDecoration: "none" }}
        >
          Download ZIP
        </a>
      )}

      {isPartial && run && (
        <Banner severity="warning">
          <span style={{ flex: 1 }}>Partial run — some segments failed or were cancelled.</span>
          <Button
            variant="secondary"
            disabled={!!blockingDiagnostic}
            onClick={async () => {
              try {
                const resumed = await resumeRun(props.deploymentId, run.runId);
                setRunId(resumed.runId);
                setSegments(new Map());
                setRun(null);
                setPhase("running");
                unsubscribeRef.current?.();
                unsubscribeRef.current = subscribeRunProgress(
                  props.deploymentId,
                  resumed.runId,
                  (event) => handleEvent(event, setSegments, setPhase, setRun, props.deploymentId, resumed.runId),
                  () => setPhase("error"),
                );
              } catch (err) {
                setError(extractMessage(err));
                setPhase("error");
              }
            }}
          >
            Resume run
          </Button>
        </Banner>
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
                  <StatusPill tone={toneFor(s.status)}>{s.status}</StatusPill>
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

function toneFor(status: SegmentState["status"]): "success" | "accent" | "danger" | "neutral" {
  switch (status) {
    case "completed":
      return "success";
    case "running":
      return "accent";
    case "failed":
      return "danger";
    default:
      return "neutral";
  }
}

function preflightTone(status: DiagnosticItem["status"]): "success" | "warning" | "danger" {
  switch (status) {
    case "ok":
      return "success";
    case "warn":
      return "warning";
    case "fail":
      return "danger";
  }
}

function preflightGlyph(status: DiagnosticItem["status"]): string {
  switch (status) {
    case "ok":
      return "ok";
    case "warn":
      return "warn";
    case "fail":
      return "stop";
  }
}

function extractMessage(err: unknown): string {
  if (err instanceof ExtensionApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "unknown error";
}
