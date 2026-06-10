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

  const stopWatchdog = useCallback(() => {
    if (stallTimer.current !== null) {
      clearInterval(stallTimer.current);
      stallTimer.current = null;
    }
  }, []);

  const startWatchdog = useCallback(() => {
    stopWatchdog();
    stallTimer.current = setInterval(() => {
      setRender((prev) => {
        if (prev.phase !== "running" || prev.lastFrameAt === null) return prev;
        const elapsed = Date.now() - prev.lastFrameAt;
        if (elapsed >= STALL_LOST_MS) {
          streamCleanup.current?.();
          streamCleanup.current = null;
          stopWatchdog();
          return connectionLostState(prev);
        }
        if (elapsed >= STALL_WARN_MS) {
          return markStalled(prev);
        }
        return prev;
      });
    }, STALL_TICK_MS);
  }, [stopWatchdog]);

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
    setRender(initialRenderState());
  }, [stopWatchdog]);

  const startRenderJob = useCallback(async () => {
    streamCleanup.current?.();
    const { jobId } = await startRender({ presetId, params });
    setRender(startedState(jobId, qwenEdit.enabled));
    streamCleanup.current = subscribeRenderStream(
      jobId,
      (frame) => {
        setRender((prev) => reduceRenderFrame(prev, frame));
      },
      () => {
        setRender((prev) => markStalled(prev));
      },
    );
    startWatchdog();
  }, [params, presetId, qwenEdit.enabled, startWatchdog]);

  const cancelRenderJob = useCallback(async () => {
    const jobId = render.jobId;
    if (!jobId) return;
    const { status } = await cancelRender(jobId);
    if (status === "cancelling") {
      return;
    }
    streamCleanup.current?.();
    streamCleanup.current = null;
    stopWatchdog();
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
