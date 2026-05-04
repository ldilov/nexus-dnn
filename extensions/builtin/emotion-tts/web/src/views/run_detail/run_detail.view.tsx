import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { ExtensionApiError } from "../../services/http";
import { resumeRun } from "../../services/runs_client";
import type { ApplyEditResponse } from "../../services/audio_edit_client";
import type { Run, RunStatus, UtteranceState, UtteranceStatus } from "../../services/types";
import { PerUtteranceEdit } from "./components/per_utterance_edit";
import { Button } from "../../components/button";
import { Panel, PanelHeader } from "../../components/panel";
import { sectionLabel } from "../../components/section_label.css";
import { StatusPill, type StatusPillTone } from "../../components/status_pill";
import * as css from "./run_detail.css";

interface LoaderData {
  run: Run;
}

const RESUMABLE: readonly RunStatus[] = ["cancelled", "failed", "partial"];
const TOAST_DURATION_MS = 2600;

export function RunDetailView(): JSX.Element {
  const { run: initialRun } = useLoaderData() as LoaderData;
  const navigate = useNavigate();
  const [run, setRun] = useState<Run>(initialRun);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingUtteranceId, setEditingUtteranceId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; severity: "success" | "error" } | null>(
    null,
  );

  useEffect(() => {
    setRun(initialRun);
  }, [initialRun]);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), TOAST_DURATION_MS);
    return () => clearTimeout(id);
  }, [toast]);

  const metrics = useMemo(() => deriveMetrics(run), [run]);
  const canResume = RESUMABLE.includes(run.status) && run.kind === "batch";
  const isExportStale = (run.exportZipStaleAt ?? null) !== null;

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

  const handleEditClick = useCallback((utteranceId: string) => {
    setEditingUtteranceId((prev) => (prev === utteranceId ? null : utteranceId));
  }, []);

  const handleEditCancel = useCallback(() => {
    setEditingUtteranceId(null);
  }, []);

  const handleEditApplied = (utteranceId: string, response: ApplyEditResponse): void => {
    setRun((prev) => applyEditToRun(prev, utteranceId, response));
    setEditingUtteranceId(null);
    setToast({ message: "Segment edited", severity: "success" });
  };

  const handleEditError = useCallback((message: string) => {
    setToast({ message, severity: "error" });
  }, []);

  return (
    <main className={css.shell}>
      <div className={css.frame}>
        <header className={css.hero}>
          <p className={css.eyebrow}>
            {run.deploymentId ? (
              <>
                <Link to={`/${run.deploymentId}/recipe`} className={css.eyebrowLink}>
                  ← Back to recipe
                </Link>
                <span className={css.eyebrowSeparator}>·</span>
              </>
            ) : null}
            <span>Run detail</span>
          </p>
          <div className={css.titleRow}>
            <h1 className={css.title}>
              {titleForKind(run.kind)}
              <span className={css.titleRunId}>{run.runId}</span>
            </h1>
            <StatusPill size="md" tone={heroToneFor(run.status)} pulse={run.status === "running"}>
              {run.status}
            </StatusPill>
          </div>
        </header>

        <section className={css.stats} aria-label="Run statistics">
          <StatCard label="Format" value={run.outputFormat.toUpperCase()} mono />
          <StatCard label="Speed" value={`${run.speedFactor.toFixed(2)}×`} mono />
          <StatCard
            label="Completed"
            value={`${metrics.completed} / ${metrics.total}`}
            progress={metrics.total > 0 ? metrics.completed / metrics.total : 0}
          />
          <StatCard
            label="Cache hit"
            value={`${metrics.cacheRatio}%`}
            progress={metrics.cacheRatio / 100}
          />
        </section>

        {canResume && (
          <section className={css.resumePanel} aria-labelledby="run-detail-resume-title">
            <div className={css.resumeCopy}>
              <h2 id="run-detail-resume-title" className={css.resumeTitle}>
                {metrics.failed > 0
                  ? `${metrics.failed} line${metrics.failed === 1 ? "" : "s"} did not complete`
                  : "Run was interrupted before completion"}
              </h2>
              <p className={css.resumeBody}>
                Resume picks up where the last attempt left off — completed audio is re-used from cache.
              </p>
            </div>
            <Button size="lg" disabled={busy} onClick={() => void onRerun()}>
              {busy
                ? "Resuming…"
                : metrics.failed > 0
                  ? "Rerun failed lines"
                  : "Resume run"}
            </Button>
            {error && (
              <p className={css.resumeError} role="alert">
                {error}
              </p>
            )}
          </section>
        )}

        <Panel aria-labelledby="run-detail-utterances">
          <PanelHeader>
            <h2 id="run-detail-utterances" className={sectionLabel}>
              01 / Utterances
            </h2>
            {metrics.completed > 0 && (
              <span className={css.cacheSummary}>
                <span className={css.cacheRatio}>{metrics.cached}</span>/{metrics.completed} from cache
              </span>
            )}
          </PanelHeader>
          <ul className={css.utteranceList}>
            {run.utterances.map((u) => {
              const isEditing = editingUtteranceId === u.utteranceId;
              const canEdit =
                u.status === "completed" &&
                (u.audioArtifactRef !== null && u.audioArtifactRef !== undefined);
              const audioRef = u.derivedArtifactRef ?? u.audioArtifactRef ?? null;
              const audioUrl = audioRef
                ? `/api/v1/artifacts/${encodeURIComponent(audioRef)}/download`
                : "";
              const hasEdit = (u.derivedArtifactRef ?? null) !== null;
              return (
                <li key={u.utteranceId} className={css.utteranceItem}>
                  <div className={css.utterance}>
                    <span className={css.uttIndex}>
                      #{u.globalIndex.toString().padStart(3, "0")}
                    </span>
                    <span className={css.uttCharacter} title={u.characterDisplay}>
                      {u.characterDisplay}
                    </span>
                    <span className={css.uttText} title={u.text}>
                      {u.text}
                    </span>
                    <span className={css.uttMeta}>
                      {u.cacheHit && <span className={css.cacheChip}>cached</span>}
                      {hasEdit && <span className={css.editChip}>edited</span>}
                      {u.durationMs ? <span>{formatDuration(u.durationMs)}</span> : null}
                      <StatusPill tone={utteranceToneFor(u.status as UtteranceStatus)}>
                        {u.status}
                      </StatusPill>
                      {canEdit && (
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => handleEditClick(u.utteranceId)}
                          aria-expanded={isEditing}
                          aria-label={isEditing ? "Close segment editor" : "Edit segment"}
                        >
                          {isEditing ? "Close" : "Edit"}
                        </Button>
                      )}
                    </span>
                  </div>
                  {isEditing && audioUrl && run.deploymentId && (
                    <PerUtteranceEdit
                      deploymentId={run.deploymentId}
                      runId={run.runId}
                      utterance={u}
                      audioUrl={audioUrl}
                      onApplied={(resp) => handleEditApplied(u.utteranceId, resp)}
                      onError={handleEditError}
                      onCancel={handleEditCancel}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </Panel>

        {renderExportFooter(run, isExportStale)}
      </div>

      {toast && (
        <div
          className={css.inlineToast}
          role={toast.severity === "error" ? "alert" : "status"}
          aria-live={toast.severity === "error" ? "assertive" : "polite"}
        >
          {toast.message}
        </div>
      )}
    </main>
  );
}

function renderExportFooter(run: Run, isStale: boolean): JSX.Element | null {
  if (!run.exportArtifactRef && !isStale) return null;
  const hadPriorExport = !!run.exportArtifactRef;
  const hint = hadPriorExport ? "Edits since last export" : "Edits pending export";
  return (
    <div className={css.footer}>
      {isStale ? (
        <div className={css.rebuildBlock}>
          <p className={css.rebuildHint}>{hint}</p>
          <Button
            variant="secondary"
            size="md"
            disabled
            aria-disabled="true"
            title="Rebuild required (backend rebuild endpoint pending)"
          >
            Rebuild required <span className={css.exportArrow}>↻</span>
          </Button>
        </div>
      ) : run.exportArtifactRef ? (
        <a
          href={`/api/v1/artifacts/${run.exportArtifactRef}/download`}
          download
          className={css.exportLink}
        >
          Download ZIP <span className={css.exportArrow}>↓</span>
        </a>
      ) : null}
    </div>
  );
}

function applyEditToRun(prev: Run, utteranceId: string, response: ApplyEditResponse): Run {
  const utterances: UtteranceState[] = prev.utterances.map((u) => {
    if (u.utteranceId !== utteranceId) return u;
    return {
      ...u,
      derivedArtifactRef: response.derived_artifact_ref,
      durationMs: response.derived_duration_ms,
    };
  });
  return {
    ...prev,
    utterances,
    exportZipStaleAt: prev.exportZipStaleAt ?? Math.floor(Date.now() / 1000),
  };
}

interface StatCardProps {
  label: string;
  value: string;
  mono?: boolean;
  progress?: number;
}

function StatCard({ label, value, mono, progress }: StatCardProps): JSX.Element {
  const progressClamped =
    progress !== undefined ? Math.min(1, Math.max(0, progress)) : undefined;
  return (
    <div
      className={css.statCard}
      style={
        progressClamped !== undefined
          ? ({ "--progress": String(progressClamped) } as Record<string, string>)
          : undefined
      }
    >
      <span className={css.statLabel}>{label}</span>
      <span className={mono ? css.statValueMono : css.statValue}>{value}</span>
      {progressClamped !== undefined && <span className={css.statBar} aria-hidden="true" />}
    </div>
  );
}

interface RunMetrics {
  total: number;
  completed: number;
  failed: number;
  cached: number;
  cacheRatio: number;
}

function deriveMetrics(run: Run): RunMetrics {
  const total = run.utterances.length;
  const completed = run.utterances.filter((u) => u.status === "completed").length;
  const failed = run.utterances.filter(
    (u) => u.status === "failed" || u.status === "cancelled",
  ).length;
  const cached = run.utterances.filter((u) => u.cacheHit).length;
  const cacheRatio = completed > 0 ? Math.round((cached / completed) * 100) : 0;
  return { total, completed, failed, cached, cacheRatio };
}

function titleForKind(kind: Run["kind"]): string {
  switch (kind) {
    case "test_line":
      return "Test line";
    case "resume":
      return "Resumed run";
    default:
      return "Batch run";
  }
}

function formatDuration(ms: number): string {
  if (ms < 1000) return `${ms} ms`;
  const seconds = (ms / 1000).toFixed(ms < 10_000 ? 2 : 1);
  return `${seconds} s`;
}

function describeError(err: unknown): string {
  if (err instanceof ExtensionApiError) return `${err.category}: ${err.message}`;
  if (err instanceof Error) return err.message;
  return "Unexpected error";
}

function heroToneFor(status: RunStatus): StatusPillTone {
  switch (status) {
    case "running":
      return "accent";
    case "completed":
      return "success";
    case "failed":
      return "danger";
    case "partial":
      return "warning";
    default:
      return "neutral";
  }
}

function utteranceToneFor(status: UtteranceStatus): StatusPillTone {
  switch (status) {
    case "running":
      return "accent";
    case "completed":
      return "success";
    case "failed":
      return "danger";
    case "cancelled":
      return "faint";
    default:
      return "neutral";
  }
}
