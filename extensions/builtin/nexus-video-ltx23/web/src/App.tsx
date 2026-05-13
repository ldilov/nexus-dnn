import { useCallback, useState, type ReactElement } from "react";
import useSWR from "swr";
import {
  type CreateRenderRequest,
  type DepStatus,
  type ProfileInstallStatus,
  type QualityPreset,
  type RenderPlan,
  type RenderRun,
  type RuntimeProfilePreference,
  type RuntimeProfileSummary,
  artifactUrl,
  hostApi,
  ltxApi,
  profileInstallApi,
} from "./api";
import * as s from "./styles.css";

const initialRequest: CreateRenderRequest = {
  prompt: "a slow cinematic dolly shot over a futuristic city at dusk",
  duration_seconds: 6,
  runtime_profile: "auto",
  quality_preset: "balanced_16gb",
};

export function App(): ReactElement {
  const [draft, setDraft] = useState<CreateRenderRequest>(initialRequest);
  const [plan, setPlan] = useState<RenderPlan | null>(null);
  const [planError, setPlanError] = useState<string | null>(null);
  const [planning, setPlanning] = useState(false);
  const [activeRunId, setActiveRunId] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { data: profiles } = useSWR<RuntimeProfileSummary[]>(
    "/runtime-profiles",
    () => ltxApi.listProfiles(),
    { revalidateOnFocus: false },
  );

  const { data: run, mutate: refetchRun } = useSWR<RenderRun | null>(
    activeRunId ? `/renders/${activeRunId}` : null,
    () => (activeRunId ? ltxApi.getRender(activeRunId) : Promise.resolve(null)),
    {
      refreshInterval: (latest) => {
        if (!latest) return 1000;
        if (
          latest.status === "completed" ||
          latest.status === "failed" ||
          latest.status === "cancelled"
        ) {
          return 0;
        }
        return 600;
      },
    },
  );

  const handlePlan = useCallback(async () => {
    setPlanning(true);
    setPlanError(null);
    try {
      const result = await ltxApi.plan(draft);
      setPlan(result);
    } catch (e) {
      setPlanError(e instanceof Error ? e.message : String(e));
      setPlan(null);
    } finally {
      setPlanning(false);
    }
  }, [draft]);

  const handleSubmit = useCallback(async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await ltxApi.createRender(draft);
      setActiveRunId(result.id);
      void refetchRun();
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : String(e));
    } finally {
      setSubmitting(false);
    }
  }, [draft, refetchRun]);

  const handleCancel = useCallback(async () => {
    if (!activeRunId) return;
    try {
      await ltxApi.cancel(activeRunId);
      void refetchRun();
    } catch (e) {
      console.error("cancel failed", e);
    }
  }, [activeRunId, refetchRun]);

  return (
    <div className={s.shell}>
      <div className={s.formColumn}>
        <DependencyBanner />
        <FormPanel
          draft={draft}
          onChange={setDraft}
          profiles={profiles ?? []}
          onPlan={handlePlan}
          onSubmit={handleSubmit}
          planning={planning}
          submitting={submitting}
          plan={plan}
          planError={planError}
          submitError={submitError}
        />
      </div>
      <ResultPanel run={run ?? null} onCancel={handleCancel} />
    </div>
  );
}

function DependencyBanner(): ReactElement | null {
  const [installing, setInstalling] = useState(false);
  const [installError, setInstallError] = useState<string | null>(null);
  const { data: deps, mutate } = useSWR<DepStatus>(
    "host:dependencies",
    () => hostApi.listDependencies(),
    {
      refreshInterval: (latest) => {
        if (!latest) return 1500;
        const hasRunning = latest.steps.some(
          (st) => st.status === "running" || st.status === "pending",
        );
        return hasRunning ? 1000 : 5000;
      },
    },
  );

  const handleInstall = useCallback(
    async (force = false) => {
      setInstalling(true);
      setInstallError(null);
      try {
        await hostApi.startInstall(force);
        void mutate();
      } catch (e) {
        setInstallError(e instanceof Error ? e.message : String(e));
      } finally {
        setInstalling(false);
      }
    },
    [mutate],
  );

  if (!deps) return null;
  const failed = deps.steps.find((st) => st.status === "failed");
  const allOk = deps.all_satisfied;
  const running = deps.steps.some(
    (st) => st.status === "running" || (!allOk && st.status === "pending"),
  );

  return (
    <section className={s.panel}>
      <div className={s.depHeader}>
        <h3 className={s.header} style={{ fontSize: "15px" }}>
          Runtime
        </h3>
        <span className={depPillClass(allOk, !!failed, running)}>
          {allOk
            ? "ready"
            : failed
              ? "install failed"
              : running
                ? "installing…"
                : "not installed"}
        </span>
      </div>

      <ul className={s.depList}>
        {deps.steps.map((st) => (
          <li key={st.id} className={s.depItem}>
            <span className={depItemDotClass(st.status)} />
            <span>{st.id}</span>
            <span className={s.meta}>
              {st.artifact?.summary ?? st.status}
            </span>
          </li>
        ))}
      </ul>

      {failed?.last_error ? (
        <div className={s.errorBox}>
          <strong>{failed.id} failed</strong>: {failed.last_error.message}
        </div>
      ) : null}
      {installError ? <div className={s.errorBox}>{installError}</div> : null}

      {!allOk || failed ? (
        <div className={s.buttonRow}>
          <button
            type="button"
            className={s.button}
            disabled={installing || running}
            onClick={() => void handleInstall(false)}
          >
            {running || installing ? "Installing…" : "Install runtime"}
          </button>
          {failed ? (
            <button
              type="button"
              className={s.buttonSecondary}
              disabled={installing || running}
              onClick={() => void handleInstall(true)}
            >
              Force reinstall
            </button>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}

function depPillClass(
  allOk: boolean,
  failed: boolean,
  running: boolean,
): string {
  if (failed) return s.riskFail;
  if (allOk) return s.riskSafe;
  if (running) return s.riskModerate;
  return s.riskRisky;
}

function depItemDotClass(status: string): string {
  switch (status) {
    case "ok":
      return s.dotCompleted;
    case "running":
      return s.dotRendering;
    case "failed":
      return s.dotFailed;
    default:
      return s.dotQueued;
  }
}

interface FormPanelProps {
  draft: CreateRenderRequest;
  onChange: (next: CreateRenderRequest) => void;
  profiles: RuntimeProfileSummary[];
  onPlan: () => void;
  onSubmit: () => void;
  planning: boolean;
  submitting: boolean;
  plan: RenderPlan | null;
  planError: string | null;
  submitError: string | null;
}

function FormPanel({
  draft,
  onChange,
  profiles,
  onPlan,
  onSubmit,
  planning,
  submitting,
  plan,
  planError,
  submitError,
}: FormPanelProps): ReactElement {
  const update = useCallback(
    <K extends keyof CreateRenderRequest>(
      key: K,
      value: CreateRenderRequest[K],
    ) => onChange({ ...draft, [key]: value }),
    [draft, onChange],
  );

  return (
    <section className={s.panel}>
      <h2 className={s.header}>LTX 2.3 Video Generator</h2>
      <p className={s.subhead}>
        Prompt-driven video synthesis · external-segments mode · 16 GB safe
        defaults
      </p>

      <div className={s.fieldRow}>
        <label className={s.label} htmlFor="ltx-prompt">
          Prompt
        </label>
        <textarea
          id="ltx-prompt"
          className={s.textarea}
          value={draft.prompt}
          onChange={(e) => update("prompt", e.target.value)}
          placeholder="describe the scene…"
        />
      </div>

      <div className={s.fieldRow}>
        <label className={s.label} htmlFor="ltx-neg">
          Negative prompt (optional)
        </label>
        <input
          id="ltx-neg"
          className={s.input}
          value={draft.negative_prompt ?? ""}
          onChange={(e) =>
            update(
              "negative_prompt",
              e.target.value.length > 0 ? e.target.value : undefined,
            )
          }
          placeholder="flicker, watermark, distortion…"
        />
      </div>

      <div className={s.inputRow}>
        <div className={s.fieldRow}>
          <label className={s.label} htmlFor="ltx-duration">
            Duration (s)
          </label>
          <input
            id="ltx-duration"
            className={s.input}
            type="number"
            min={1}
            max={300}
            value={draft.duration_seconds}
            onChange={(e) =>
              update(
                "duration_seconds",
                Math.max(1, Math.min(300, Number(e.target.value) || 1)),
              )
            }
          />
        </div>
        <div className={s.fieldRow}>
          <label className={s.label} htmlFor="ltx-seed">
            Seed (optional)
          </label>
          <input
            id="ltx-seed"
            className={s.input}
            type="number"
            value={draft.seed ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              update("seed", v === "" ? undefined : Number(v));
            }}
            placeholder="leave blank for random"
          />
        </div>
      </div>

      <div className={s.inputRow}>
        <div className={s.fieldRow}>
          <label className={s.label} htmlFor="ltx-runtime">
            Runtime
          </label>
          <select
            id="ltx-runtime"
            className={s.select}
            value={draft.runtime_profile}
            onChange={(e) =>
              update(
                "runtime_profile",
                e.target.value as RuntimeProfilePreference,
              )
            }
          >
            <option value="auto">Auto (recommended)</option>
            <option value="rtx40-fp8">RTX 40 FP8</option>
            <option value="rtx50-fp8">RTX 50 FP8 (Blackwell)</option>
            <option value="rtx50-nvfp4">RTX 50 NVFP4 (experimental)</option>
          </select>
        </div>
        <div className={s.fieldRow}>
          <label className={s.label} htmlFor="ltx-quality">
            Quality
          </label>
          <select
            id="ltx-quality"
            className={s.select}
            value={draft.quality_preset}
            onChange={(e) =>
              update("quality_preset", e.target.value as QualityPreset)
            }
          >
            <option value="draft">Draft (fastest)</option>
            <option value="balanced_16gb">Balanced 16 GB</option>
            <option value="quality_16gb">Quality 16 GB</option>
            <option value="high">High (24 GB+)</option>
          </select>
        </div>
      </div>

      <ProfileStatus profiles={profiles} selected={draft.runtime_profile} />
      <ProfileInstallPanel selected={draft.runtime_profile} />

      <div className={s.buttonRow}>
        <button
          type="button"
          className={s.buttonSecondary}
          onClick={onPlan}
          disabled={planning || submitting || draft.prompt.trim().length === 0}
        >
          {planning ? "Planning…" : "Preview plan"}
        </button>
        <button
          type="button"
          className={s.button}
          onClick={onSubmit}
          disabled={submitting || draft.prompt.trim().length === 0}
        >
          {submitting ? "Submitting…" : "Generate video"}
        </button>
      </div>

      {planError ? <div className={s.errorBox}>{planError}</div> : null}
      {submitError ? <div className={s.errorBox}>{submitError}</div> : null}

      {plan ? <PlanBlock plan={plan} /> : null}
    </section>
  );
}

function ProfileInstallPanel({
  selected,
}: {
  selected: RuntimeProfilePreference;
}): ReactElement | null {
  const profileId = profileIdForSelection(selected);
  const [installing, setInstalling] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const { data: status, mutate } = useSWR<ProfileInstallStatus | null>(
    profileId ? `profile-install:${profileId}` : null,
    () => (profileId ? profileInstallApi.status(profileId) : Promise.resolve(null)),
    {
      refreshInterval: (latest) => {
        if (!latest) return 0;
        return latest.in_flight ? 2000 : 0;
      },
    },
  );

  const handleInstall = useCallback(async () => {
    if (!profileId) return;
    setInstalling(true);
    setActionError(null);
    try {
      await profileInstallApi.start(profileId);
      void mutate();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : String(e));
    } finally {
      setInstalling(false);
    }
  }, [profileId, mutate]);

  if (!profileId || !status) return null;
  if (status.installed) {
    return (
      <div className={s.warningBox}>
        <strong>Runtime installed</strong> · {status.repo}
      </div>
    );
  }

  const inFlight = status.in_flight || installing;
  const phaseLabel = phaseDisplayLabel(status.phase);
  const buttonLabel = inFlight
    ? phaseLabel ?? "Installing…"
    : "Install runtime & download weights";
  return (
    <div className={s.warningBox}>
      <strong>Runtime not installed</strong>: {status.repo ?? "unknown repo"}
      <div className={s.meta} style={{ marginTop: 4 }}>
        Resolves the diffusers extras (torch · diffusers · accelerate) via{" "}
        <code>uv sync --extra diffusers</code>, then downloads weights from
        Hugging Face into {status.dest ?? "<host_data_dir>/models/…"}.
      </div>
      {status.last_error ? (
        <div className={s.meta} style={{ marginTop: 4, color: "#e57373" }}>
          Last error: {status.last_error}
        </div>
      ) : null}
      {actionError ? (
        <div className={s.meta} style={{ marginTop: 4, color: "#e57373" }}>
          {actionError}
        </div>
      ) : null}
      <div className={s.buttonRow} style={{ marginTop: 8 }}>
        <button
          type="button"
          className={s.button}
          disabled={inFlight}
          onClick={() => void handleInstall()}
        >
          {buttonLabel}
        </button>
      </div>
      <InstallProgressLog
        phase={status.phase}
        recentProgress={status.recent_progress}
      />
    </div>
  );
}

function phaseDisplayLabel(phase: string | null): string | null {
  if (!phase) return null;
  if (phase.startsWith("error:")) return "Failed";
  switch (phase) {
    case "starting":
      return "Starting…";
    case "resolving_deps":
      return "Resolving deps…";
    case "downloading_weights":
      return "Downloading weights…";
    case "done":
      return "Finishing…";
    default:
      return phase;
  }
}

function InstallProgressLog({
  phase,
  recentProgress,
}: {
  phase: string | null;
  recentProgress: string[];
}): ReactElement | null {
  if (!phase && recentProgress.length === 0) return null;
  const phaseHint = phaseDisplayLabel(phase);
  return (
    <details className={s.progressDetails}>
      <summary className={s.progressSummary}>
        Install progress
        {phaseHint ? <span className={s.meta}> · {phaseHint}</span> : null}
        {recentProgress.length > 0 ? (
          <span className={s.meta}> · {recentProgress.length} lines</span>
        ) : null}
      </summary>
      {recentProgress.length === 0 ? (
        <p className={s.meta} style={{ marginTop: 6 }}>
          No output captured yet.
        </p>
      ) : (
        <pre className={s.progressBlock}>{recentProgress.join("\n")}</pre>
      )}
    </details>
  );
}

function profileIdForSelection(
  pref: RuntimeProfilePreference,
): string | null {
  if (pref === "auto") return null;
  return pref;
}

function ProfileStatus({
  profiles,
  selected,
}: {
  profiles: RuntimeProfileSummary[];
  selected: RuntimeProfilePreference;
}): ReactElement | null {
  if (profiles.length === 0) return null;
  const target =
    selected === "auto"
      ? "nexus.video.ltx23.fake"
      : `nexus.video.ltx23.${selected}`;
  const match = profiles.find((p) => p.runtime_id === target);
  if (!match) return null;
  const tone = match.healthy ? "ok" : "warn";
  return (
    <div className={tone === "ok" ? s.warningBox : s.warningBox}>
      <strong>{match.display_name}</strong>
      {": "}
      {match.status_message}
      {match.experimental ? " (experimental)" : null}
    </div>
  );
}

function PlanBlock({ plan }: { plan: RenderPlan }): ReactElement {
  const riskClass =
    plan.vram_risk === "safe"
      ? s.riskSafe
      : plan.vram_risk === "moderate"
        ? s.riskModerate
        : plan.vram_risk === "risky"
          ? s.riskRisky
          : s.riskFail;

  return (
    <div className={s.panel} style={{ background: "transparent", padding: 0 }}>
      <h3 className={s.header} style={{ fontSize: "15px" }}>
        Render plan
      </h3>
      <div className={s.planRow}>
        <span className={s.planKey}>Mode</span>
        <span className={s.planVal}>{plan.mode}</span>
      </div>
      <div className={s.planRow}>
        <span className={s.planKey}>Segments</span>
        <span className={s.planVal}>{plan.segment_count}</span>
      </div>
      <div className={s.planRow}>
        <span className={s.planKey}>Resolution</span>
        <span className={s.planVal}>
          {plan.width}×{plan.height}
        </span>
      </div>
      <div className={s.planRow}>
        <span className={s.planKey}>FPS</span>
        <span className={s.planVal}>
          {plan.base_fps} → {plan.output_fps} ({plan.interpolation})
        </span>
      </div>
      <div className={s.planRow}>
        <span className={s.planKey}>Duration</span>
        <span className={s.planVal}>
          {plan.requested_duration_seconds.toFixed(1)}s
        </span>
      </div>
      <div className={s.planRow}>
        <span className={s.planKey}>VRAM budget</span>
        <span className={s.planVal}>{plan.gpu_memory_budget_mb} MB</span>
      </div>
      <div className={s.planRow}>
        <span className={s.planKey}>VRAM risk</span>
        <span className={riskClass}>{plan.vram_risk}</span>
      </div>
      <div className={s.planRow}>
        <span className={s.planKey}>Runtime</span>
        <span className={s.planVal}>{plan.runtime_profile}</span>
      </div>
      {plan.warnings.length > 0 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {plan.warnings.map((w) => (
            <div key={w.code} className={s.warningBox}>
              <strong>{w.code}</strong>: {w.message}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function ResultPanel({
  run,
  onCancel,
}: {
  run: RenderRun | null;
  onCancel: () => void;
}): ReactElement {
  if (!run) {
    return (
      <section className={s.panel}>
        <h2 className={s.header}>Output</h2>
        <p className={s.emptyHint}>
          No render in progress yet. Configure the form on the left and press
          “Generate video”.
        </p>
      </section>
    );
  }

  const isTerminal =
    run.status === "completed" ||
    run.status === "failed" ||
    run.status === "cancelled";

  return (
    <section className={s.panel}>
      <h2 className={s.header}>Render {shortId(run.id)}</h2>
      <p className={s.meta}>
        runtime: {run.runtime_profile ?? "?"} · {run.width}×{run.height} ·{" "}
        {run.requested_duration_seconds.toFixed(1)}s
      </p>

      <StatusBar run={run} />

      {run.error_code ? (
        <div className={s.errorBox}>
          <strong>{run.error_code}</strong>:{" "}
          {run.error_message ?? "unknown error"}
        </div>
      ) : null}

      <SegmentTimeline segments={run.segments} />

      {run.status === "completed" && run.final_artifact_id ? (
        <FinalPreview artifactId={run.final_artifact_id} />
      ) : null}

      {!isTerminal ? (
        <div className={s.buttonRow}>
          <button
            type="button"
            className={s.buttonDanger}
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      ) : null}
    </section>
  );
}

function StatusBar({ run }: { run: RenderRun }): ReactElement {
  return (
    <div className={s.fieldRow}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
        }}
      >
        <span>
          <strong>{run.status}</strong>
        </span>
        <span>
          {run.completed_segments}/{run.segment_count} segments ·{" "}
          {run.progress_percent.toFixed(0)}%
        </span>
      </div>
      <div className={s.progressOuter}>
        <div
          className={s.progressInner}
          style={{ width: `${Math.max(2, run.progress_percent)}%` }}
        />
      </div>
    </div>
  );
}

function SegmentTimeline({
  segments,
}: {
  segments: RenderRun["segments"];
}): ReactElement {
  return (
    <div className={s.segmentList}>
      {segments.map((seg) => (
        <div key={seg.index} className={s.segmentRow}>
          <span className={dotClass(seg.status)} />
          <span>
            Segment {seg.index + 1} · {seg.duration_seconds.toFixed(1)}s
          </span>
          <span className={s.meta}>{seg.status}</span>
        </div>
      ))}
    </div>
  );
}

function dotClass(status: string): string {
  switch (status) {
    case "queued":
      return s.dotQueued;
    case "rendering":
      return s.dotRendering;
    case "completed":
      return s.dotCompleted;
    case "failed":
      return s.dotFailed;
    default:
      return s.dotQueued;
  }
}

function FinalPreview({ artifactId }: { artifactId: string }): ReactElement {
  const url = artifactUrl(artifactId);
  return (
    <div className={s.videoBox}>
      <video className={s.video} src={url} controls preload="metadata" />
      <a
        className={s.downloadLink}
        href={url}
        download={`${artifactId}.mp4`}
      >
        Download MP4
      </a>
      <p className={s.meta}>artifact: {artifactId}</p>
    </div>
  );
}

function shortId(id: string): string {
  return id.length > 12 ? `${id.slice(0, 6)}…${id.slice(-4)}` : id;
}

