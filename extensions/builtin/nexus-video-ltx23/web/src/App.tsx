import {
  useCallback,
  useRef,
  useState,
  type FormEvent,
  type ReactElement,
} from "react";
import useSWR from "swr";
import {
  type AdvancedSettings,
  type CreateRenderRequest,
  type DepStatus,
  type ProfileInstallStatus,
  type QualityPreset,
  type RenderPlan,
  type RenderRun,
  type RuntimeProfilePreference,
  type RuntimeProfileSummary,
  type SceneSpec,
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
  const [cancelling, setCancelling] = useState(false);
  const [retryingSegmentIndex, setRetryingSegmentIndex] = useState<number | null>(
    null,
  );
  const [retryError, setRetryError] = useState<string | null>(null);

  const { data: profiles } = useSWR<RuntimeProfileSummary[]>(
    "ltx:runtime-profiles",
    () => ltxApi.listProfiles(),
    { revalidateOnFocus: false },
  );

  const { data: run, mutate: refetchRun } = useSWR<RenderRun | null>(
    activeRunId ? `ltx:renders:${activeRunId}` : null,
    () => (activeRunId ? ltxApi.getRender(activeRunId) : Promise.resolve(null)),
    {
      // Adaptive cadence — the original 600ms-always polling was wasteful
      // for renders that take 4+ min per segment. Poll fast on first
      // load (no data yet), slower while a segment is mid-flight,
      // stop entirely on terminal status.
      refreshInterval: (latest) => {
        if (!latest) return 1000;
        if (
          latest.status === "completed" ||
          latest.status === "failed" ||
          latest.status === "cancelled"
        ) {
          return 0;
        }
        // 2s during long renders is plenty for a status-word UI;
        // segment-completion events bump us forward naturally.
        return 2000;
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
    if (!activeRunId || cancelling) return;
    setCancelling(true);
    setSubmitError(null);
    try {
      await ltxApi.cancel(activeRunId);
      void refetchRun();
    } catch (e) {
      setSubmitError(
        `Cancel failed: ${e instanceof Error ? e.message : String(e)}`,
      );
    } finally {
      setCancelling(false);
    }
  }, [activeRunId, cancelling, refetchRun]);

  const handleRetrySegment = useCallback(
    async (segmentIndex: number) => {
      if (!activeRunId || retryingSegmentIndex !== null) return;
      setRetryingSegmentIndex(segmentIndex);
      setRetryError(null);
      try {
        await ltxApi.retrySegment(activeRunId, segmentIndex);
        void refetchRun();
      } catch (e) {
        setRetryError(
          `Retry of segment ${segmentIndex + 1} failed: ${
            e instanceof Error ? e.message : String(e)
          }`,
        );
      } finally {
        setRetryingSegmentIndex(null);
      }
    },
    [activeRunId, retryingSegmentIndex, refetchRun],
  );

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
      <ResultPanel
        run={run ?? null}
        onCancel={handleCancel}
        cancelling={cancelling}
        onRetrySegment={handleRetrySegment}
        retryingSegmentIndex={retryingSegmentIndex}
        retryError={retryError}
      />
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

  const handleFormSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (submitting || draft.prompt.trim().length === 0) return;
      onSubmit();
    },
    [submitting, draft.prompt, onSubmit],
  );

  return (
    <form className={s.panel} onSubmit={handleFormSubmit} noValidate>
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

      <div className={s.fieldRow}>
        <label className={s.label} htmlFor="ltx-character">
          Character anchor (optional)
        </label>
        <input
          id="ltx-character"
          className={s.input}
          value={draft.character_prompt ?? ""}
          onChange={(e) =>
            update(
              "character_prompt",
              e.target.value.length > 0 ? e.target.value : undefined,
            )
          }
          placeholder="a woman in a red coat, short black hair, brown eyes"
        />
        <span className={s.meta}>
          Prepended to every scene's prompt; combined with image
          conditioning to keep characters consistent across cuts.
        </span>
      </div>

      <div className={s.fieldRow}>
        <label className={s.label} htmlFor="ltx-style">
          Style anchor (optional)
        </label>
        <input
          id="ltx-style"
          className={s.input}
          value={draft.style_prompt ?? ""}
          onChange={(e) =>
            update(
              "style_prompt",
              e.target.value.length > 0 ? e.target.value : undefined,
            )
          }
          placeholder="moody noir, deep teal shadows, neon highlights, 35mm film grain"
        />
        <span className={s.meta}>
          Appended to every scene's prompt; threads visual style across
          segment boundaries.
        </span>
      </div>

      <ScenesEditor draft={draft} update={update} />

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
            onChange={(e) => {
              // Parse explicitly + reject NaN — `Number("") || 1`
              // silently coerced empty fields to 1, masking the
              // user's intent to clear the value before retyping.
              const parsed = Number(e.target.value);
              if (Number.isFinite(parsed)) {
                update(
                  "duration_seconds",
                  Math.max(1, Math.min(300, parsed)),
                );
              }
            }}
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
              if (v === "") {
                update("seed", undefined);
                return;
              }
              const parsed = Number(v);
              if (Number.isFinite(parsed)) {
                update("seed", parsed);
              }
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

      <AdvancedKnobs draft={draft} update={update} />

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
          type="submit"
          className={s.button}
          disabled={submitting || draft.prompt.trim().length === 0}
          aria-busy={submitting}
        >
          {submitting ? "Submitting…" : "Generate video"}
        </button>
      </div>

      {planError ? (
        <div className={s.errorBox} role="alert">{planError}</div>
      ) : null}
      {submitError ? (
        <div className={s.errorBox} role="alert">{submitError}</div>
      ) : null}

      {plan ? <PlanBlock plan={plan} /> : null}
    </form>
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

function ScenesEditor({
  draft,
  update,
}: {
  draft: CreateRenderRequest;
  update: <K extends keyof CreateRenderRequest>(
    key: K,
    value: CreateRenderRequest[K],
  ) => void;
}): ReactElement {
  const scenes = draft.scenes ?? [];

  // Parallel array of stable UI ids — React `key`s must remain stable
  // across reorders + deletes or input focus / uncontrolled-state in
  // textareas survives across the wrong scene. The DTO scenes array
  // doesn't carry ids (the server wouldn't know what to do with them),
  // so we maintain them as a separate component-local concern.
  const uiIdCounter = useRef(0);
  const [sceneIds, setSceneIds] = useState<string[]>(() =>
    scenes.map(() => `scene-${uiIdCounter.current++}`),
  );

  // Keep `sceneIds` in sync with scenes.length when external code
  // (e.g. sessionStorage rehydrate) mutates the array out of band.
  // Adds new ids when scenes grew externally; truncates when shrunk.
  // Reorder happens through our own mutators which keep the arrays
  // in lockstep, so this branch only catches "draft replaced wholesale".
  if (sceneIds.length !== scenes.length) {
    const next = sceneIds.slice(0, scenes.length);
    while (next.length < scenes.length) {
      next.push(`scene-${uiIdCounter.current++}`);
    }
    setSceneIds(next);
  }

  const commitScenes = useCallback(
    (nextScenes: SceneSpec[], nextIds: string[]) => {
      update("scenes", nextScenes.length > 0 ? nextScenes : undefined);
      setSceneIds(nextIds);
    },
    [update],
  );

  const addScene = useCallback(() => {
    const equalShare =
      scenes.length > 0 ? draft.duration_seconds / (scenes.length + 1) : draft.duration_seconds;
    commitScenes(
      [
        ...scenes,
        { prompt: "", duration_seconds: Math.max(1, Math.round(equalShare)) },
      ],
      [...sceneIds, `scene-${uiIdCounter.current++}`],
    );
  }, [scenes, sceneIds, commitScenes, draft.duration_seconds]);

  // exactOptionalPropertyTypes treats `undefined` as not assignable to
  // an optional field — callers pass numbers or pass null to clear, and
  // `null` triggers a delete on the corresponding key.
  const updateScene = useCallback(
    (
      idx: number,
      patch: { [K in keyof SceneSpec]?: SceneSpec[K] | null },
    ) => {
      const next = scenes.map((sc, i) => {
        if (i !== idx) return sc;
        const merged: SceneSpec = { ...sc };
        // `prompt` is required — `null` is treated as empty string clear.
        if (patch.prompt !== undefined) {
          merged.prompt = patch.prompt ?? "";
        }
        if (patch.duration_seconds !== undefined) {
          if (patch.duration_seconds === null) delete merged.duration_seconds;
          else merged.duration_seconds = patch.duration_seconds;
        }
        if (patch.seed !== undefined) {
          if (patch.seed === null) delete merged.seed;
          else merged.seed = patch.seed;
        }
        return merged;
      });
      commitScenes(next, sceneIds);
    },
    [scenes, sceneIds, commitScenes],
  );

  const removeScene = useCallback(
    (idx: number) => {
      commitScenes(
        scenes.filter((_, i) => i !== idx),
        sceneIds.filter((_, i) => i !== idx),
      );
    },
    [scenes, sceneIds, commitScenes],
  );

  const moveScene = useCallback(
    (idx: number, direction: -1 | 1) => {
      const target = idx + direction;
      if (target < 0 || target >= scenes.length) return;
      // Pre-validate to satisfy noUncheckedIndexedAccess — the
      // bounds check above guarantees both look-ups succeed but
      // TS can't propagate that knowledge through the index op.
      const fromScene = scenes[idx];
      const toScene = scenes[target];
      const fromId = sceneIds[idx];
      const toId = sceneIds[target];
      if (
        fromScene === undefined ||
        toScene === undefined ||
        fromId === undefined ||
        toId === undefined
      ) {
        return;
      }
      const nextScenes = [...scenes];
      const nextIds = [...sceneIds];
      nextScenes[idx] = toScene;
      nextScenes[target] = fromScene;
      nextIds[idx] = toId;
      nextIds[target] = fromId;
      commitScenes(nextScenes, nextIds);
    },
    [scenes, sceneIds, commitScenes],
  );

  const scenesTotal = scenes.reduce(
    (acc, sc) => acc + (sc.duration_seconds ?? 0),
    0,
  );

  return (
    <details className={s.progressDetails}>
      <summary className={s.progressSummary}>
        Scenes — {scenes.length === 0 ? "none (single prompt)" : `${scenes.length} scenes`}
        {scenesTotal > 0 ? (
          <span className={s.meta}>
            {" · "}
            {scenesTotal.toFixed(1)}s / {draft.duration_seconds}s
          </span>
        ) : null}
      </summary>
      <p className={s.meta} style={{ marginTop: 8 }}>
        Split the video into named scenes. Each scene's midpoint
        determines which prompt the corresponding segments use; scenes
        run consecutively in order. Leave empty to use the global prompt
        for the whole video.
      </p>
      {scenes.map((scene, idx) => {
        const uiId = sceneIds[idx] ?? `scene-fallback-${idx}`;
        const parseNumberInput = (raw: string): number | null => {
          if (raw === "") return null;
          const parsed = Number(raw);
          return Number.isFinite(parsed) ? parsed : null;
        };
        return (
          <div
            key={uiId}
            className={s.panel}
            style={{ background: "rgba(0,0,0,0.18)", marginTop: 10, padding: 12 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <strong className={s.meta}>Scene {idx + 1}</strong>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  type="button"
                  className={s.buttonSubtle}
                  onClick={() => moveScene(idx, -1)}
                  disabled={idx === 0}
                  aria-label={`Move scene ${idx + 1} up`}
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  className={s.buttonSubtle}
                  onClick={() => moveScene(idx, 1)}
                  disabled={idx === scenes.length - 1}
                  aria-label={`Move scene ${idx + 1} down`}
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  className={s.buttonSubtle}
                  onClick={() => removeScene(idx)}
                  aria-label={`Remove scene ${idx + 1}`}
                  title="Remove scene"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className={s.fieldRow}>
              <label className={s.label} htmlFor={`ltx-${uiId}-prompt`}>
                Scene prompt
              </label>
              <textarea
                id={`ltx-${uiId}-prompt`}
                className={s.textarea}
                value={scene.prompt}
                onChange={(e) => updateScene(idx, { prompt: e.target.value })}
                placeholder="what happens in this scene…"
                rows={2}
              />
            </div>
            <div className={s.inputRow}>
              <div className={s.fieldRow}>
                <label
                  className={s.label}
                  htmlFor={`ltx-${uiId}-duration`}
                >
                  Duration (s)
                </label>
                <input
                  id={`ltx-${uiId}-duration`}
                  className={s.input}
                  type="number"
                  min={1}
                  step={0.5}
                  value={scene.duration_seconds ?? ""}
                  onChange={(e) => {
                    updateScene(idx, {
                      duration_seconds: parseNumberInput(e.target.value),
                    });
                  }}
                  placeholder="auto"
                />
              </div>
              <div className={s.fieldRow}>
                <label
                  className={s.label}
                  htmlFor={`ltx-${uiId}-seed`}
                >
                  Scene seed (optional)
                </label>
                <input
                  id={`ltx-${uiId}-seed`}
                  className={s.input}
                  type="number"
                  value={scene.seed ?? ""}
                  onChange={(e) => {
                    updateScene(idx, {
                      seed: parseNumberInput(e.target.value),
                    });
                  }}
                  placeholder="derived"
                />
              </div>
            </div>
          </div>
        );
      })}
      <div className={s.buttonRow} style={{ marginTop: 10 }}>
        <button
          type="button"
          className={s.buttonSecondary}
          onClick={addScene}
        >
          + Add scene
        </button>
      </div>
    </details>
  );
}

function AdvancedKnobs({
  draft,
  update,
}: {
  draft: CreateRenderRequest;
  update: <K extends keyof CreateRenderRequest>(
    key: K,
    value: CreateRenderRequest[K],
  ) => void;
}): ReactElement {
  const advanced = draft.advanced ?? {};
  const setAdvanced = useCallback(
    <K extends keyof AdvancedSettings>(
      key: K,
      value: AdvancedSettings[K],
    ) => {
      const next: AdvancedSettings = { ...advanced };
      if (value === undefined || value === null) {
        delete next[key];
      } else {
        next[key] = value;
      }
      update("advanced", Object.keys(next).length > 0 ? next : undefined);
    },
    [advanced, update],
  );

  return (
    <details className={s.progressDetails}>
      <summary className={s.progressSummary}>
        Advanced — guidance &amp; steps
        {advanced.guidance_scale !== undefined ? (
          <span className={s.meta}> · cfg {advanced.guidance_scale}</span>
        ) : null}
        {advanced.num_inference_steps !== undefined ? (
          <span className={s.meta}>
            {" · "}
            {advanced.num_inference_steps} steps
          </span>
        ) : null}
      </summary>
      <div className={s.inputRow} style={{ marginTop: 10 }}>
        <div className={s.fieldRow}>
          <label className={s.label} htmlFor="ltx-cfg">
            Guidance scale (temperature)
          </label>
          <input
            id="ltx-cfg"
            className={s.input}
            type="number"
            min={1}
            max={15}
            step={0.5}
            value={advanced.guidance_scale ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              setAdvanced(
                "guidance_scale",
                v === "" ? undefined : Number(v),
              );
            }}
            placeholder="4.0 (default)"
          />
          <span className={s.meta}>
            1–7. Higher = stricter prompt adherence; lower = more
            creative drift. Distilled LTX 2.3 default is 4.0.
          </span>
        </div>
        <div className={s.fieldRow}>
          <label className={s.label} htmlFor="ltx-steps">
            Inference steps
          </label>
          <input
            id="ltx-steps"
            className={s.input}
            type="number"
            min={2}
            max={50}
            step={1}
            value={advanced.num_inference_steps ?? ""}
            onChange={(e) => {
              const v = e.target.value;
              setAdvanced(
                "num_inference_steps",
                v === "" ? undefined : Math.round(Number(v)),
              );
            }}
            placeholder="8 (default)"
          />
          <span className={s.meta}>
            Distilled model is tuned for 8. Higher steps improve detail
            with ~linear wall-clock cost.
          </span>
        </div>
      </div>
    </details>
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

interface ResultPanelProps {
  run: RenderRun | null;
  onCancel: () => void;
  cancelling: boolean;
  onRetrySegment: (segmentIndex: number) => void;
  retryingSegmentIndex: number | null;
  retryError: string | null;
}

function ResultPanel({
  run,
  onCancel,
  cancelling,
  onRetrySegment,
  retryingSegmentIndex,
  retryError,
}: ResultPanelProps): ReactElement {
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

  // A retry is allowed for non-completed runs whose individual segment
  // failed. The server also refuses retries on completed/cancelled
  // runs (see api.rs retry_segment terminal guard) — keep the UI
  // affordance in sync so users don't see a button that 4xxs.
  const retryAllowed = run.status !== "completed" && run.status !== "cancelled";

  return (
    <section className={s.panel}>
      <h2 className={s.header}>Render {shortId(run.id)}</h2>
      <p className={s.meta}>
        runtime: {run.runtime_profile ?? "?"} · {run.width}×{run.height} ·{" "}
        {run.requested_duration_seconds.toFixed(1)}s
      </p>

      <StatusBar run={run} />

      {run.error_code ? (
        <div className={s.errorBox} role="alert" aria-live="polite">
          <strong>{run.error_code}</strong>:{" "}
          {run.error_message ?? "unknown error"}
        </div>
      ) : null}

      {retryError ? (
        <div className={s.errorBox} role="alert" aria-live="polite">
          {retryError}
        </div>
      ) : null}

      <SegmentTimeline
        segments={run.segments}
        onRetry={retryAllowed ? onRetrySegment : null}
        retryingSegmentIndex={retryingSegmentIndex}
      />

      {run.status === "completed" && run.final_artifact_id ? (
        <FinalPreview artifactId={run.final_artifact_id} />
      ) : null}

      {!isTerminal ? (
        <div className={s.buttonRow}>
          <button
            type="button"
            className={s.buttonDanger}
            onClick={onCancel}
            disabled={cancelling}
            aria-busy={cancelling}
          >
            {cancelling ? "Cancelling…" : "Cancel"}
          </button>
        </div>
      ) : null}
    </section>
  );
}

function StatusBar({ run }: { run: RenderRun }): ReactElement {
  const eta = estimateEta(run);
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
          {eta ? <span className={s.meta}> · {eta}</span> : null}
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

interface SegmentTimelineProps {
  segments: RenderRun["segments"];
  onRetry: ((segmentIndex: number) => void) | null;
  retryingSegmentIndex: number | null;
}

function SegmentTimeline({
  segments,
  onRetry,
  retryingSegmentIndex,
}: SegmentTimelineProps): ReactElement {
  return (
    <div className={s.segmentList}>
      {segments.map((seg) => {
        const isRetrying = retryingSegmentIndex === seg.index;
        const canRetry = onRetry !== null && seg.status === "failed";
        return (
          <div key={seg.index} className={s.segmentRow}>
            <span className={dotClass(seg.status)} />
            <span>
              Segment {seg.index + 1} · {seg.duration_seconds.toFixed(1)}s
            </span>
            <span className={s.meta}>{seg.status}</span>
            {canRetry ? (
              <button
                type="button"
                className={s.buttonSubtle}
                onClick={() => onRetry?.(seg.index)}
                disabled={retryingSegmentIndex !== null}
                aria-busy={isRetrying}
                aria-label={`Retry segment ${seg.index + 1}`}
              >
                {isRetrying ? "Retrying…" : "Retry"}
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

/**
 * Estimate remaining time for an in-flight render.
 *
 * Strategy: take the average wall-clock duration of completed
 * segments (started_at → completed_at), multiply by the number of
 * segments still to run. Falls back silently when there's no
 * timestamp data or the run is already terminal — better a missing
 * ETA than a confidently-wrong one.
 *
 * The real LTX-2.3 pipeline takes ~12-15 minutes per segment on a
 * 16 GB GPU; this is the difference between "screen feels frozen" and
 * "Segment 3 of 6 · ~28m remaining" which is the actual UX gap the
 * frontend agent flagged in HIGH 3.
 */
function estimateEta(run: RenderRun): string | null {
  if (
    run.status === "completed" ||
    run.status === "failed" ||
    run.status === "cancelled"
  ) {
    return null;
  }
  if (run.segment_count <= 0) {
    return null;
  }
  const completed = run.segments.filter(
    (s) => s.status === "completed" && s.started_at && s.completed_at,
  );
  if (completed.length === 0) {
    return null;
  }
  const totalMs = completed.reduce((sum, seg) => {
    const start = Date.parse(seg.started_at!);
    const end = Date.parse(seg.completed_at!);
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
      return sum;
    }
    return sum + (end - start);
  }, 0);
  if (totalMs === 0) {
    return null;
  }
  const avgMs = totalMs / completed.length;
  const remaining = run.segment_count - run.completed_segments;
  if (remaining <= 0) {
    return null;
  }
  const etaMs = remaining * avgMs;
  return `~${formatDuration(etaMs)} remaining`;
}

function formatDuration(ms: number): string {
  const totalSeconds = Math.round(ms / 1000);
  if (totalSeconds < 60) {
    return `${totalSeconds}s`;
  }
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes < 60) {
    return seconds === 0 ? `${minutes}m` : `${minutes}m ${seconds}s`;
  }
  const hours = Math.floor(minutes / 60);
  const remMinutes = minutes % 60;
  return `${hours}h ${remMinutes}m`;
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

