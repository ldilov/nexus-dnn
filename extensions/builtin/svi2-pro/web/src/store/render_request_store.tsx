import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { applyPreset, defaultParamsFromSettings } from "../domain/build_params";
import { loadPersistedParams, savePersistedParams } from "./recipe_persistence";
import { snapToValidFrames } from "../domain/length";
import { mediaExists } from "../services/media_url";
import { basenameOfPath } from "../domain/path_basename";
import {
  cancelledState,
  connectionLostState,
  initialRenderState,
  markStalled,
  reduceRenderFrame,
  renderStateFromJob,
  startedState,
  type RenderState,
} from "../domain/render_state";
import { DEFAULT_SETTINGS } from "../domain/settings_defaults";
import { CANONICAL_PRESET_ID } from "../domain/preset_meta";
import { getRenderJob } from "../services/history_client";
import { cancelRender, startRender, subscribeRenderStream } from "../services/render_client";
import type {
  ExtensionSettings,
  GenerationMode,
  PresetSummary,
  RenderJob,
  RenderParams,
} from "../services/types";

export interface QwenEditConfig {
  enabled: boolean;
  prompt: string;
}

const STALL_WARN_MS = 90_000;
const STALL_LOST_MS = 240_000;
const STALL_TICK_MS = 5_000;

export const ACTIVE_RENDER_KEY = "nexus.video.svi2-pro.active-render";

function persistActiveRender(jobId: string): void {
  try {
    sessionStorage.setItem(ACTIVE_RENDER_KEY, JSON.stringify({ jobId }));
  } catch {
    /* private mode — persistence unavailable */
  }
}

function clearActiveRender(): void {
  try {
    sessionStorage.removeItem(ACTIVE_RENDER_KEY);
  } catch {
    /* private mode — persistence unavailable */
  }
}

function readActiveRenderJobId(): string | null {
  try {
    const raw = sessionStorage.getItem(ACTIVE_RENDER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { jobId?: unknown };
    return typeof parsed.jobId === "string" ? parsed.jobId : null;
  } catch {
    return null;
  }
}

interface RenderRequestState {
  settings: ExtensionSettings;
  presetId: string | null;
  presetApplied: boolean;
  params: RenderParams;
  refImageName: string | null;
  lastImageName: string | null;
  qwenEdit: QwenEditConfig;
  render: RenderState;
  isDirty: boolean;
}

interface ApplyPresetOptions {
  /** User-driven gallery applies mark the form dirty (default). The system
   * auto-apply on mount passes `false` so a route-loader/SWR miss does not
   * flip dirty with no user action. */
  markDirty?: boolean;
}

interface RenderRequestActions {
  applyPresetById: (preset: PresetSummary, opts?: ApplyPresetOptions) => void;
  setMode: (mode: GenerationMode) => void;
  updateParam: <K extends keyof RenderParams>(key: K, value: RenderParams[K]) => void;
  setPrompts: (prompts: string[]) => void;
  setRefImage: (name: string | null, path: string) => void;
  setLastImage: (name: string | null, path: string | null) => void;
  /** Clear the reference anchor WITHOUT marking the form dirty. Used by the
   * remote-preview onError path so a transient image-load failure after a clean
   * restore does not spuriously flip dirty. */
  clearRefImageSilent: () => void;
  /** Clear the last-image anchor WITHOUT marking the form dirty (see above). */
  clearLastImageSilent: () => void;
  setQwenEdit: (config: Partial<QwenEditConfig>) => void;
  setSettings: (settings: ExtensionSettings) => void;
  startRenderJob: () => Promise<void>;
  cancelRenderJob: () => Promise<void>;
  resetRender: () => void;
  showJobResult: (job: RenderJob) => Promise<void>;
  restoreJobIntoForm: (job: RenderJob) => Promise<void>;
  /** Stable accessor for the current dirty flag read at click time (reads
   * `dirtyRef.current`); avoids depending on the `isDirty` state value in
   * callbacks that would otherwise re-create on every keystroke. */
  getIsDirty: () => boolean;
}

type RenderRequestContextValue = RenderRequestState & RenderRequestActions;

const RenderRequestContext = createContext<RenderRequestContextValue | null>(null);

interface ProviderProps {
  initialSettings?: ExtensionSettings;
  initialPreset?: PresetSummary | null;
  deploymentId?: string | undefined;
  children: ReactNode;
}

export function RenderRequestProvider({
  initialSettings = DEFAULT_SETTINGS,
  initialPreset = null,
  deploymentId,
  children,
}: ProviderProps): ReactElement {
  const [settings, setSettingsState] = useState<ExtensionSettings>(initialSettings);
  const [presetId, setPresetId] = useState<string | null>(
    initialPreset?.id ?? CANONICAL_PRESET_ID,
  );
  const [presetApplied, setPresetApplied] = useState<boolean>(initialPreset !== null);
  const [params, setParams] = useState<RenderParams>(() => {
    const base = defaultParamsFromSettings(initialSettings);
    const seeded = initialPreset ? applyPreset(base, initialPreset) : base;
    const persisted = loadPersistedParams(deploymentId);
    return persisted ? { ...seeded, ...persisted } : seeded;
  });
  const [refImageName, setRefImageName] = useState<string | null>(null);
  const [lastImageName, setLastImageName] = useState<string | null>(null);
  const [qwenEdit, setQwenEditState] = useState<QwenEditConfig>({
    enabled: false,
    prompt: "",
  });
  const [render, setRender] = useState<RenderState>(initialRenderState);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const dirtyRef = useRef<boolean>(false);
  const streamCleanup = useRef<(() => void) | null>(null);
  const stallTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const renderRef = useRef<RenderState>(render);
  renderRef.current = render;
  const reconnecting = useRef<boolean>(false);
  const lastReconnectAt = useRef<number>(0);
  const reconnectRef = useRef<((jobId: string) => void) | null>(null);

  const stopWatchdog = useCallback(() => {
    if (stallTimer.current !== null) {
      clearInterval(stallTimer.current);
      stallTimer.current = null;
    }
  }, []);

  const startWatchdog = useCallback(() => {
    stopWatchdog();
    stallTimer.current = setInterval(() => {
      const current = renderRef.current;
      if (current.phase !== "running" || current.lastFrameAt === null) return;
      if (reconnecting.current) return;
      const elapsed = Date.now() - current.lastFrameAt;
      const sinceReconnect = Date.now() - lastReconnectAt.current;
      if (elapsed >= STALL_LOST_MS && sinceReconnect >= STALL_LOST_MS) {
        if (current.jobId) reconnectRef.current?.(current.jobId);
        return;
      }
      if (elapsed >= STALL_WARN_MS) {
        setRender((prev) => markStalled(prev));
      }
    }, STALL_TICK_MS);
  }, [stopWatchdog]);

  const subscribeToJob = useCallback(
    (jobId: string) => {
      streamCleanup.current?.();
      streamCleanup.current = subscribeRenderStream(
        jobId,
        (frame) => {
          setRender((prev) => reduceRenderFrame(prev, frame));
        },
        () => {
          if (reconnecting.current) return;
          setRender((prev) => markStalled(prev));
        },
      );
      startWatchdog();
    },
    [startWatchdog],
  );

  const reconnectOrGiveUp = useCallback(
    (jobId: string) => {
      if (reconnecting.current) return;
      const activeJobId = jobId;
      reconnecting.current = true;
      lastReconnectAt.current = Date.now();
      subscribeToJob(jobId);
      setRender((prev) =>
        prev.phase === "running" ? { ...prev, lastFrameAt: Date.now() } : prev,
      );
      const stillActive = () =>
        renderRef.current.jobId === activeJobId && renderRef.current.phase === "running";
      const giveUp = (next: RenderState) => {
        if (!stillActive()) return;
        streamCleanup.current?.();
        streamCleanup.current = null;
        stopWatchdog();
        setRender(next);
      };
      void getRenderJob(jobId)
        .then((job) => {
          if (job.status === "succeeded" || job.status === "failed" || job.status === "cancelled") {
            giveUp(renderStateFromJob(job));
          }
        })
        .catch(() => {
          giveUp(connectionLostState(renderRef.current));
        })
        .finally(() => {
          reconnecting.current = false;
        });
    },
    [subscribeToJob, stopWatchdog],
  );

  reconnectRef.current = reconnectOrGiveUp;

  const markDirty = useCallback(() => {
    if (dirtyRef.current) return;
    dirtyRef.current = true;
    setIsDirty(true);
  }, []);

  const clearDirty = useCallback(() => {
    dirtyRef.current = false;
    setIsDirty(false);
  }, []);

  const applyPresetById = useCallback(
    (preset: PresetSummary, opts?: ApplyPresetOptions) => {
      if (opts?.markDirty !== false) markDirty();
      const requiresLast = preset.params.requires_last_image === true;
      setPresetId(preset.id);
      setPresetApplied(true);
      setParams((prev) => {
        // Rebuild from settings defaults so keys set by the PREVIOUS preset
        // (requires_last_image, off-budget width, …) never leak across.
        const base = {
          ...defaultParamsFromSettings(settings),
          mode: prev.mode ?? "image_to_video",
          ref_image_path: prev.ref_image_path,
          prompts: prev.prompts,
          last_image_path: requiresLast ? (prev.last_image_path ?? null) : null,
        };
        return applyPreset(base, preset);
      });
      if (!requiresLast) setLastImageName(null);
    },
    [settings, markDirty],
  );

  const setMode = useCallback(
    (mode: GenerationMode) => {
      markDirty();
      setParams((prev) => {
        if (mode === "text_to_video") return { ...prev, mode };
        const { seed: _drop, ...rest } = prev;
        return { ...rest, mode };
      });
    },
    [markDirty],
  );

  const updateParam = useCallback(
    <K extends keyof RenderParams>(key: K, value: RenderParams[K]) => {
      markDirty();
      setParams((prev) => ({ ...prev, [key]: value }));
    },
    [markDirty],
  );

  const setPrompts = useCallback(
    (prompts: string[]) => {
      markDirty();
      setParams((prev) => ({ ...prev, prompts }));
    },
    [markDirty],
  );

  const setRefImage = useCallback(
    (name: string | null, path: string) => {
      markDirty();
      setRefImageName(name);
      setParams((prev) => ({ ...prev, ref_image_path: path }));
    },
    [markDirty],
  );

  const setLastImage = useCallback(
    (name: string | null, path: string | null) => {
      markDirty();
      setLastImageName(name);
      setParams((prev) => {
        if (path === null || path.length === 0) {
          return { ...prev, last_image_path: path };
        }
        return {
          ...prev,
          last_image_path: path,
          num_clips: 1,
          frames_per_clip: snapToValidFrames(prev.frames_per_clip ?? 81),
        };
      });
    },
    [markDirty],
  );

  const clearRefImageSilent = useCallback(() => {
    setRefImageName(null);
    setParams((prev) => ({ ...prev, ref_image_path: "" }));
  }, []);

  const clearLastImageSilent = useCallback(() => {
    setLastImageName(null);
    setParams((prev) => ({ ...prev, last_image_path: null }));
  }, []);

  const setQwenEdit = useCallback(
    (config: Partial<QwenEditConfig>) => {
      markDirty();
      setQwenEditState((prev) => ({ ...prev, ...config }));
    },
    [markDirty],
  );

  const getIsDirty = useCallback(() => dirtyRef.current, []);

  const setSettings = useCallback((next: ExtensionSettings) => {
    setSettingsState(next);
  }, []);

  const resetRender = useCallback(() => {
    streamCleanup.current?.();
    streamCleanup.current = null;
    stopWatchdog();
    clearActiveRender();
    setRender(initialRenderState());
  }, [stopWatchdog]);

  const startRenderJob = useCallback(async () => {
    clearDirty();
    streamCleanup.current?.();
    lastReconnectAt.current = 0;
    // Diagnostic: confirm exactly what the UI sends to the backend.
    console.info("[svi2] render → params", {
      base_model: {
        dit_high_path: params.dit_high_path ?? "(bundled)",
        dit_low_path: params.dit_low_path ?? "(bundled)",
        svi_lora_tier: params.svi_lora_tier ?? "high",
      },
      quality: {
        num_inference_steps: params.num_inference_steps,
        cfg_scale: params.cfg_scale,
        sigma_shift: params.sigma_shift,
        switch_boundary: params.switch_boundary,
        solver: params.solver,
        seed: params.seed,
        seed_multiplier: params.seed_multiplier,
      },
      basics: {
        width: params.width,
        height: params.height,
        num_clips: params.num_clips,
        frames_per_clip: params.frames_per_clip,
        fps: params.fps,
        interpolate_fps: params.interpolate_fps,
        interpolate_method: params.interpolate_method,
        upscale_factor: params.upscale_factor,
        upscale_model: params.upscale_model,
        upscale_quality: params.upscale_quality,
      },
      compile: {
        use_torch_compile: params.use_torch_compile,
        torch_compile_mode: params.torch_compile_mode,
        blocks_to_swap: params.blocks_to_swap,
      },
      user_loras: params.user_loras ?? [],
      presetId,
    });
    const { jobId } = await startRender({ presetId, params });
    setRender(startedState(jobId, qwenEdit.enabled));
    persistActiveRender(jobId);
    subscribeToJob(jobId);
  }, [params, presetId, qwenEdit.enabled, subscribeToJob, clearDirty]);

  const cancelRenderJob = useCallback(async () => {
    const jobId = renderRef.current.jobId ?? render.jobId;
    if (!jobId) return;
    const { status } = await cancelRender(jobId);
    if (status === "cancelling") {
      return;
    }
    streamCleanup.current?.();
    streamCleanup.current = null;
    stopWatchdog();
    clearActiveRender();
    setRender((prev) => cancelledState(prev));
  }, [render.jobId, stopWatchdog]);

  const showJobResult = useCallback(
    async (job: RenderJob) => {
      streamCleanup.current?.();
      streamCleanup.current = null;
      stopWatchdog();
      try {
        const full = await getRenderJob(job.id);
        setRender(renderStateFromJob(full));
      } catch {
        setRender(renderStateFromJob(job));
      }
    },
    [stopWatchdog],
  );

  const restoreJobIntoForm = useCallback(
    async (job: RenderJob) => {
      streamCleanup.current?.();
      streamCleanup.current = null;
      stopWatchdog();

      let full = job;
      try {
        full = await getRenderJob(job.id);
      } catch {
        full = job;
      }

      // Resolve BOTH HEAD probes first, then write params ONCE with corrected
      // paths so a stale historical path never transiently reaches localStorage.
      const refPath = full.params.ref_image_path ?? "";
      let correctedRef = refPath;
      let refName: string | null = null;
      if (refPath.length > 0) {
        if (await mediaExists(refPath)) {
          refName = basenameOfPath(refPath);
        } else {
          correctedRef = "";
          toast.warning("Input image no longer on disk — re-upload to render");
        }
      }

      const lastPath = full.params.last_image_path ?? null;
      let correctedLast: string | null = lastPath;
      let lastName: string | null = null;
      if (lastPath && lastPath.length > 0) {
        if (await mediaExists(lastPath)) {
          lastName = basenameOfPath(lastPath);
        } else {
          correctedLast = null;
          toast.warning("Last image no longer on disk — re-upload to render");
        }
      }

      // Re-base on settings defaults so newly-added keys keep sane defaults
      // while the historical run's (corrected) values win.
      setParams({
        ...defaultParamsFromSettings(settings),
        ...full.params,
        ref_image_path: correctedRef,
        last_image_path: correctedLast,
      });
      setPresetId(full.presetId);
      setPresetApplied(full.presetId !== null);
      setRefImageName(refName);
      setLastImageName(lastName);

      setRender(renderStateFromJob(full));
      clearDirty();
    },
    [settings, stopWatchdog, clearDirty],
  );

  useEffect(() => {
    savePersistedParams(deploymentId, params);
  }, [deploymentId, params]);

  useEffect(() => {
    if (render.phase === "done" || render.phase === "error" || render.phase === "cancelled") {
      clearActiveRender();
    }
  }, [render.phase]);

  useEffect(() => {
    const resumeIfRunning = () => {
      const current = renderRef.current;
      if (current.phase !== "running" || !current.jobId) return;
      subscribeToJob(current.jobId);
      setRender((prev) =>
        prev.phase === "running" ? { ...prev, stalled: false, lastFrameAt: Date.now() } : prev,
      );
    };
    const onVisibility = () => {
      if (document.visibilityState === "visible") resumeIfRunning();
    };
    const onFocus = () => resumeIfRunning();
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("focus", onFocus);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("focus", onFocus);
    };
  }, [subscribeToJob]);

  useEffect(() => {
    const jobId = readActiveRenderJobId();
    if (!jobId) return;
    let cancelled = false;
    void getRenderJob(jobId)
      .then((job) => {
        if (cancelled) return;
        if (job.status === "succeeded" || job.status === "failed" || job.status === "cancelled") {
          clearActiveRender();
          setRender(renderStateFromJob(job));
          return;
        }
        setRender(startedState(jobId, false));
        subscribeToJob(jobId);
      })
      .catch(() => {
        /* job gone or offline — leave the form idle, persisted key stays for next visit */
      });
    return () => {
      cancelled = true;
    };
  }, [subscribeToJob]);

  useEffect(() => {
    return () => {
      streamCleanup.current?.();
      streamCleanup.current = null;
      stopWatchdog();
    };
  }, [stopWatchdog]);

  const value = useMemo<RenderRequestContextValue>(
    () => ({
      settings,
      presetId,
      presetApplied,
      params,
      refImageName,
      lastImageName,
      qwenEdit,
      render,
      isDirty,
      applyPresetById,
      setMode,
      updateParam,
      setPrompts,
      setRefImage,
      setLastImage,
      clearRefImageSilent,
      clearLastImageSilent,
      setQwenEdit,
      setSettings,
      startRenderJob,
      cancelRenderJob,
      resetRender,
      showJobResult,
      restoreJobIntoForm,
      getIsDirty,
    }),
    [
      settings,
      presetId,
      presetApplied,
      params,
      refImageName,
      lastImageName,
      qwenEdit,
      render,
      isDirty,
      applyPresetById,
      setMode,
      updateParam,
      setPrompts,
      setRefImage,
      setLastImage,
      clearRefImageSilent,
      clearLastImageSilent,
      setQwenEdit,
      setSettings,
      startRenderJob,
      cancelRenderJob,
      resetRender,
      showJobResult,
      restoreJobIntoForm,
      getIsDirty,
    ],
  );

  return (
    <RenderRequestContext.Provider value={value}>{children}</RenderRequestContext.Provider>
  );
}

export function useRenderRequest(): RenderRequestContextValue {
  const ctx = useContext(RenderRequestContext);
  if (!ctx) {
    throw new Error("useRenderRequest must be used within RenderRequestProvider");
  }
  return ctx;
}
