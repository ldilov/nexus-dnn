import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { ExtensionApiError } from "../../../services/http";
import {
  cancelRun,
  createRun,
  createRuns,
  chunkJobs,
  getRun,
  resumeRun,
  subscribeRunProgress,
} from "../../../services/runs_client";
import { getRuntimeHealth, type RuntimeHealth } from "../../../services/runtime_client";
import type { CreateRunRequest, ProgressEvent, Run } from "../../../services/types";
import type { RunProgress } from "./storyboard/storyboard_data";
import {
  allTerminal,
  applyEvent,
  countByStatus,
  initialItems,
  toRunProgressMap,
  withQueueMetrics,
  type ItemState,
  type RunChunk,
  type StatusCounts,
  type StoryboardJob,
} from "./run_panel_items";
import {
  STICKY_BAR_THRESHOLD,
  useScrollPastThreshold,
} from "../hooks/use_scroll_past_threshold";
import {
  dispatchRunCompleted,
  dispatchRunState,
  subscribeTriggerGenerate,
} from "../lib/run_events";
import * as css from "../recipe.css";
import * as panel from "./run_panel.css";
import { Banner } from "../../../components/banner";
import { Button } from "../../../components/button";
import {
  sizeStyle as buttonSize,
  variantStyle as buttonVariant,
} from "../../../components/button.css";
import { StatusPill } from "../../../components/status_pill";

const HEALTH_POLL_MS = 4000;

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
  /** Storyboard mode only: the ordered, stably-identified utterances. When
   * present (length > 0) Generate fans the jobs out into `workersActive`
   * concurrent runs and renders a per-item progress grid. */
  storyboardJobs?: readonly StoryboardJob[] | undefined;
  /** Storyboard mode only: live per-job state pushed up so the carousel cards
   * can flip queued → rendering → ready/failed without a refresh. */
  onJobProgressChange?: ((progress: Map<string, RunProgress>) => void) | undefined;
}

export function RunPanel(props: Props): JSX.Element {
  const navigate = useNavigate();
  const storyboardJobs = props.storyboardJobs;
  const isStoryboard = (storyboardJobs?.length ?? 0) > 0;

  const [phase, setPhase] = useState<Phase>("idle");
  const [runId, setRunId] = useState<string | null>(null);
  const [segments, setSegments] = useState<Map<number, SegmentState>>(new Map());
  const [items, setItems] = useState<Map<string, ItemState>>(new Map());
  const [chunks, setChunks] = useState<RunChunk[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [run, setRun] = useState<Run | null>(null);
  const [health, setHealth] = useState<RuntimeHealth | null>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const multiUnsubRef = useRef<Array<() => void>>([]);
  const chunksRef = useRef<RunChunk[]>([]);
  // Guards the run-completed broadcast: allTerminal is checked inside the
  // per-event updater across N runs, so without this it can fire repeatedly.
  const completedFiredRef = useRef<boolean>(false);

  useEffect(() => {
    chunksRef.current = chunks;
  }, [chunks]);

  const teardownStreams = useCallback(() => {
    unsubscribeRef.current?.();
    unsubscribeRef.current = null;
    for (const off of multiUnsubRef.current) off();
    multiUnsubRef.current = [];
  }, []);

  useEffect(() => {
    return () => {
      teardownStreams();
    };
  }, [teardownStreams]);

  useEffect(() => {
    let cancelled = false;
    const poll = async (): Promise<void> => {
      try {
        const h = await getRuntimeHealth();
        if (!cancelled) setHealth(h);
      } catch {
        // ignore
      }
    };
    void poll();
    const id = window.setInterval(poll, HEALTH_POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  // Notify any sticky/floating action bar of the current phase so it can
  // disable Generate while a run is in flight.
  useEffect(() => {
    dispatchRunState({ busy: phase === "starting" || phase === "running" });
  }, [phase]);

  // Push the live per-item map up to the carousel whenever it changes.
  useEffect(() => {
    if (!props.onJobProgressChange) return;
    props.onJobProgressChange(toRunProgressMap(items));
  }, [items, props.onJobProgressChange]);

  const handleRunTerminal = useCallback(
    (terminalRun: Run): void => {
      const status = terminalRun.status;
      if (status === "completed" || status === "partial") {
        dispatchRunCompleted();
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

  const startStoryboardRuns = useCallback(async () => {
    const jobs = storyboardJobs ?? [];
    setPhase("starting");
    setError(null);
    setSegments(new Map());
    setRun(null);
    setRunId(null);
    completedFiredRef.current = false;
    teardownStreams();

    const workers = Math.max(1, health?.workersActive ?? 1);
    const jobChunks = chunkJobs([...jobs], workers);
    const payloads: CreateRunRequest[] = jobChunks.map((chunk) => ({
      ...props.createPayload,
      prebuiltSegments: chunk.map((j) => j.segment),
    }));

    try {
      const created = await createRuns(props.deploymentId, payloads);
      const runChunks: RunChunk[] = created.map((res, i) => ({
        runId: res.runId,
        jobs: jobChunks[i] ?? [],
      }));
      chunksRef.current = runChunks;
      setChunks(runChunks);
      setItems(withQueueMetrics(initialItems(jobs), runChunks));
      setPhase("running");

      const offs = runChunks.map((chunk) =>
        subscribeRunProgress(
          props.deploymentId,
          chunk.runId,
          (event) => {
            setItems((prev) => {
              const merged = applyEvent(prev, chunksRef.current, event);
              const withMetrics = withQueueMetrics(merged, chunksRef.current);
              if (allTerminal(withMetrics) && !completedFiredRef.current) {
                completedFiredRef.current = true;
                teardownStreams();
                setPhase("terminal");
                dispatchRunCompleted();
              }
              return withMetrics;
            });
          },
          () => setPhase("error"),
        ),
      );
      multiUnsubRef.current = offs;
    } catch (err) {
      setPhase("error");
      setError(extractMessage(err));
    }
  }, [
    storyboardJobs,
    health?.workersActive,
    props.deploymentId,
    props.createPayload,
    teardownStreams,
  ]);

  const startSingleRun = useCallback(async () => {
    setPhase("starting");
    setError(null);
    setSegments(new Map());
    setRun(null);
    try {
      const created = await createRun(props.deploymentId, props.createPayload);
      setRunId(created.runId);
      setPhase("running");
      teardownStreams();
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
  }, [props.deploymentId, props.createPayload, handleRunTerminal, teardownStreams]);

  const startRun = useCallback(async () => {
    if (isStoryboard) {
      await startStoryboardRuns();
    } else {
      await startSingleRun();
    }
  }, [isStoryboard, startStoryboardRuns, startSingleRun]);

  // Sticky action bar bridge — listen for "trigger-generate" events fired by
  // the floating toolbar and start a run when we're idle/terminal/error.
  useEffect(() => {
    return subscribeTriggerGenerate(() => {
      if (phase === "idle" || phase === "terminal" || phase === "error") {
        void startRun();
      }
    });
  }, [phase, startRun]);

  const cancel = useCallback(async () => {
    if (isStoryboard) {
      const ids = chunksRef.current.map((c) => c.runId);
      await Promise.all(
        ids.map((id) =>
          cancelRun(props.deploymentId, id).catch(() => undefined),
        ),
      );
      // Stop listening and settle the UI: any item still queued/generating is
      // now cancelled, so the grid leaves its spinners instead of hanging.
      completedFiredRef.current = true;
      teardownStreams();
      setItems((prev) => {
        const next = new Map(prev);
        for (const [jobId, it] of prev) {
          if (it.status === "queued" || it.status === "generating") {
            next.set(jobId, {
              ...it,
              status: "cancelled",
              queuePosition: undefined,
              etaMs: undefined,
            });
          }
        }
        return next;
      });
      setPhase("terminal");
      return;
    }
    if (!runId) return;
    try {
      await cancelRun(props.deploymentId, runId);
    } catch (err) {
      setError(extractMessage(err));
    }
  }, [isStoryboard, props.deploymentId, runId, teardownStreams]);

  const segmentList = Array.from(segments.values()).sort((a, b) => a.globalIndex - b.globalIndex);
  const itemList = useMemo(
    () => (storyboardJobs ?? []).map((j) => items.get(j.jobId)).filter((it): it is ItemState => it != null),
    [storyboardJobs, items],
  );
  const itemCounts = useMemo(() => countByStatus(items), [items]);
  const canCancel = phase === "starting" || phase === "running";
  const isPartial = run?.status === "partial";

  const inFlightCount = isStoryboard
    ? itemCounts.generating
    : segmentList.filter((s) => s.status === "running").length;
  const completedCount = isStoryboard
    ? itemCounts.done
    : segmentList.filter((s) => s.status === "completed").length;
  const showQueueChip = isStoryboard
    ? phase === "starting" || phase === "running" || itemList.length > 0
    : phase === "starting" || phase === "running" || segmentList.length > 0;

  const failedSegments = segmentList.filter((s) => s.status === "failed");
  const dominantFailure = useMemo(() => {
    if (phase !== "terminal") return null;
    const cats = isStoryboard
      ? itemList.filter((it) => it.status === "failed").map((it) => it.failureCategory ?? "unknown")
      : failedSegments.map((s) => s.failureCategory ?? "unknown");
    if (cats.length === 0) return null;
    const counts = new Map<string, number>();
    for (const cat of cats) counts.set(cat, (counts.get(cat) ?? 0) + 1);
    let topCategory = "unknown";
    let topCount = 0;
    for (const [cat, n] of counts) {
      if (n > topCount) {
        topCategory = cat;
        topCount = n;
      }
    }
    const total = isStoryboard ? itemList.length : segmentList.length;
    return { category: topCategory, count: topCount, total };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, isStoryboard, itemList, failedSegments, segmentList]);
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

  const badge = health?.badge ?? "not_installed";
  const runtimeReady = badge === "ready" || badge === "running";

  const totalJobs = storyboardJobs?.length ?? 0;
  const generateBlockedReason = !runtimeReady
    ? "Start runtime to generate"
    : !props.canGenerate
      ? "Nothing to generate yet"
      : null;
  const generateLabel =
    phase === "starting"
      ? "Starting…"
      : phase === "running"
        ? isStoryboard
          ? `Generating ${totalJobs} segment${totalJobs === 1 ? "" : "s"}…`
          : "Generating…"
        : generateBlockedReason ?? "Generate";
  const generateDisabled = !props.canGenerate || canCancel || !runtimeReady;
  const isRunning = phase === "starting" || phase === "running";
  // "idle" (breathing halo) only when we're truly ready to fire — otherwise
  // the static disabled style applies.
  const generateState =
    isRunning
      ? "running"
      : !generateDisabled
        ? "idle"
        : "blocked";

  const stickyVisible = useScrollPastThreshold(STICKY_BAR_THRESHOLD);
  const showInlineGenerate = !stickyVisible || isRunning;

  return (
    <div className={panel.root}>
      <div className={panel.card}>
        <div className={panel.diagnostics}>
          <span className={panel.diagnosticsLabel}>
            <span className={panel.numeral} aria-hidden="true">
              01
            </span>
            Pre-flight
            {showQueueChip && (
              <span className={panel.queueChip}>
                <span className={panel.queueDot} aria-hidden="true" />
                {inFlightCount > 0
                  ? `${inFlightCount} generating`
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

        <div className={panel.cta} data-state={generateState}>
          {showInlineGenerate ? (
            <Button
              variant="primary"
              size="sm"
              onClick={startRun}
              disabled={generateDisabled}
              loading={isRunning}
              title={generateBlockedReason ?? undefined}
            >
              {!isRunning && (
                <span className={panel.ctaIcon} aria-hidden="true">
                  ▶
                </span>
              )}
              {generateLabel}
            </Button>
          ) : (
            <span className={panel.stickyHandoff} aria-hidden="true">
              Generate available in toolbar
              <span className={panel.stickyHandoffArrow}>↑</span>
            </span>
          )}
          {canCancel && (
            <Button
              variant="ghost"
              size="xs"
              onClick={cancel}
              aria-label={isStoryboard ? "Cancel all running segments" : "Cancel current run"}
            >
              Cancel
            </Button>
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
        // audit-allow: download anchor — Button primitive lacks <a> polymorphic
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
            disabled={false}
            onClick={async () => {
              try {
                const resumed = await resumeRun(props.deploymentId, run.runId);
                setRunId(resumed.runId);
                setSegments(new Map());
                setRun(null);
                setPhase("running");
                teardownStreams();
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

      {isStoryboard && itemList.length > 0 && (
        <ItemProgressGrid items={itemList} counts={itemCounts} />
      )}

      {!isStoryboard && segmentList.length > 0 && (
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

function formatEta(ms: number): string {
  const s = Math.max(1, Math.round(ms / 1000));
  return `~${s}s`;
}

function itemTone(status: ItemState["status"]): "success" | "accent" | "danger" | "neutral" {
  switch (status) {
    case "done":
      return "success";
    case "generating":
      return "accent";
    case "failed":
      return "danger";
    default:
      return "neutral";
  }
}

function itemLabel(status: ItemState["status"]): string {
  switch (status) {
    case "done":
      return "Ready";
    case "generating":
      return "Generating";
    case "failed":
      return "Failed";
    case "cancelled":
      return "Cancelled";
    default:
      return "Queued";
  }
}

interface ItemProgressGridProps {
  items: readonly ItemState[];
  counts: StatusCounts;
}

function headSummary(counts: StatusCounts): string {
  if (counts.generating > 0) return `${counts.generating} generating`;
  const parts: string[] = [`${counts.done} done`];
  if (counts.failed > 0) parts.push(`${counts.failed} failed`);
  if (counts.cancelled > 0) parts.push(`${counts.cancelled} cancelled`);
  return parts.join(" · ");
}

function ItemProgressGrid({ items, counts }: ItemProgressGridProps): JSX.Element {
  return (
    <div className={panel.progressGrid} role="list" aria-label="Per-segment generation progress">
      <div className={panel.progressGridHead}>
        <span className={panel.progressGridTitle}>Segments</span>
        <span className={panel.inFlightBadge} data-tone={counts.generating > 0 ? "live" : "idle"}>
          <span className={panel.inFlightDot} aria-hidden="true" />
          {headSummary(counts)}
        </span>
      </div>
      {items.map((it) => (
        <div
          key={it.jobId}
          className={panel.progressGridRow}
          role="listitem"
          data-status={it.status}
          aria-label={`${it.label} — ${itemLabel(it.status)}`}
        >
          <span className={panel.gridLabel}>{it.label}</span>
          <span className={panel.gridStatus}>
            <StatusPill tone={itemTone(it.status)} pulse={it.status === "generating"}>
              {itemLabel(it.status)}
            </StatusPill>
          </span>
          <span className={panel.gridMeta}>
            {it.status === "generating" && (
              <span className={panel.spinner} aria-hidden="true" />
            )}
            {it.status === "done" && typeof it.durationMs === "number" ? (
              <span className={panel.gridDuration}>{(it.durationMs / 1000).toFixed(1)}s</span>
            ) : it.status === "queued" && typeof it.etaMs === "number" ? (
              <span className={panel.etaChip}>
                {it.queuePosition && it.queueTotal ? `#${it.queuePosition} · ` : ""}
                {formatEta(it.etaMs)}
              </span>
            ) : it.status === "generating" ? (
              <span className={panel.etaChip}>working…</span>
            ) : null}
          </span>
          <span className={panel.gridFailure}>
            {it.status === "failed" ? it.failureCategory ?? "error" : ""}
          </span>
        </div>
      ))}
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

function extractMessage(err: unknown): string {
  if (err instanceof ExtensionApiError) return err.message;
  if (err instanceof Error) return err.message;
  return "unknown error";
}
