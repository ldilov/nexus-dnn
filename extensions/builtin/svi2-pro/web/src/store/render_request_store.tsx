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
import { applyPreset, defaultParamsFromSettings } from "../domain/build_params";
import { snapToValidFrames } from "../domain/length";
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
}

interface RenderRequestActions {
  applyPresetById: (preset: PresetSummary) => void;
  setMode: (mode: GenerationMode) => void;
  updateParam: <K extends keyof RenderParams>(key: K, value: RenderParams[K]) => void;
  setPrompts: (prompts: string[]) => void;
  setRefImage: (name: string | null, path: string) => void;
  setLastImage: (name: string | null, path: string | null) => void;
  setQwenEdit: (config: Partial<QwenEditConfig>) => void;
  setSettings: (settings: ExtensionSettings) => void;
  startRenderJob: () => Promise<void>;
  cancelRenderJob: () => Promise<void>;
  resetRender: () => void;
  showJobResult: (job: RenderJob) => Promise<void>;
}

type RenderRequestContextValue = RenderRequestState & RenderRequestActions;

const RenderRequestContext = createContext<RenderRequestContextValue | null>(null);

interface ProviderProps {
  initialSettings?: ExtensionSettings;
  initialPreset?: PresetSummary | null;
  children: ReactNode;
}

export function RenderRequestProvider({
  initialSettings = DEFAULT_SETTINGS,
  initialPreset = null,
  children,
}: ProviderProps): ReactElement {
  const [settings, setSettingsState] = useState<ExtensionSettings>(initialSettings);
  const [presetId, setPresetId] = useState<string | null>(
    initialPreset?.id ?? CANONICAL_PRESET_ID,
  );
  const [presetApplied, setPresetApplied] = useState<boolean>(initialPreset !== null);
  const [params, setParams] = useState<RenderParams>(() => {
    const base = defaultParamsFromSettings(initialSettings);
    return initialPreset ? applyPreset(base, initialPreset) : base;
  });
  const [refImageName, setRefImageName] = useState<string | null>(null);
  const [lastImageName, setLastImageName] = useState<string | null>(null);
  const [qwenEdit, setQwenEditState] = useState<QwenEditConfig>({
    enabled: false,
    prompt: "",
  });
  const [render, setRender] = useState<RenderState>(initialRenderState);
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

  const applyPresetById = useCallback(
    (preset: PresetSummary) => {
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
    [settings],
  );

  const setMode = useCallback((mode: GenerationMode) => {
    setParams((prev) => {
      if (mode === "text_to_video") return { ...prev, mode };
      const { seed: _drop, ...rest } = prev;
      return { ...rest, mode };
    });
  }, []);

  const updateParam = useCallback(
    <K extends keyof RenderParams>(key: K, value: RenderParams[K]) => {
      setParams((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const setPrompts = useCallback((prompts: string[]) => {
    setParams((prev) => ({ ...prev, prompts }));
  }, []);

  const setRefImage = useCallback((name: string | null, path: string) => {
    setRefImageName(name);
    setParams((prev) => ({ ...prev, ref_image_path: path }));
  }, []);

  const setLastImage = useCallback((name: string | null, path: string | null) => {
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
  }, []);

  const setQwenEdit = useCallback((config: Partial<QwenEditConfig>) => {
    setQwenEditState((prev) => ({ ...prev, ...config }));
  }, []);

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
  }, [params, presetId, qwenEdit.enabled, subscribeToJob]);

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
      applyPresetById,
      setMode,
      updateParam,
      setPrompts,
      setRefImage,
      setLastImage,
      setQwenEdit,
      setSettings,
      startRenderJob,
      cancelRenderJob,
      resetRender,
      showJobResult,
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
      applyPresetById,
      setMode,
      updateParam,
      setPrompts,
      setRefImage,
      setLastImage,
      setQwenEdit,
      setSettings,
      startRenderJob,
      cancelRenderJob,
      resetRender,
      showJobResult,
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
