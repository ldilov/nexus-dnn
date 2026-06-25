import {
  createContext,
  type ReactElement,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DEFAULT_PARAMS } from "../domain/defaults";
import {
  cancelledState,
  type GenerateState,
  INITIAL_STATE,
  reduceFrame,
  startedState,
} from "../domain/generate_state";
import {
  cancelGenerate,
  startGenerate,
  subscribeGenerateStream,
} from "../services/generate_client";
import { getGenerationJob } from "../services/history_client";
import type { GenerateParams, GenerationJob } from "../services/types";

export const ACTIVE_JOB_KEY = "nexus.3d.trellis2.active-job";

function persistActiveJob(jobId: string): void {
  try {
    sessionStorage.setItem(ACTIVE_JOB_KEY, JSON.stringify({ jobId }));
  } catch {
    /* private mode — persistence unavailable */
  }
}

function clearActiveJob(): void {
  try {
    sessionStorage.removeItem(ACTIVE_JOB_KEY);
  } catch {
    /* private mode — persistence unavailable */
  }
}

function readActiveJobId(): string | null {
  try {
    const raw = sessionStorage.getItem(ACTIVE_JOB_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { jobId?: unknown };
    return typeof parsed.jobId === "string" ? parsed.jobId : null;
  } catch {
    return null;
  }
}

function jobToState(job: GenerationJob): GenerateState {
  if (job.status === "succeeded") {
    return {
      ...INITIAL_STATE,
      phase: "done",
      overallFraction: 1,
      glbRef: job.glbRef,
      thumbnailRef: null,
      metadata: job.metadata,
    };
  }
  if (job.status === "failed") {
    return {
      ...INITIAL_STATE,
      phase: "error",
      errorCode: job.errorCode,
      errorMessage: job.errorMessage,
    };
  }
  if (job.status === "cancelled") {
    return { ...INITIAL_STATE, phase: "cancelled" };
  }
  return startedState();
}

type GenerateParamsState = GenerateParams;

interface GenerateRequestState {
  params: GenerateParamsState;
  imageRef: string | null;
  imageName: string | null;
  generate: GenerateState;
}

interface GenerateRequestActions {
  updateParam: <K extends keyof GenerateParamsState>(
    key: K,
    value: GenerateParamsState[K],
  ) => void;
  applyParams: (patch: Partial<GenerateParamsState>) => void;
  setImage: (ref: string, name: string) => void;
  clearImage: () => void;
  startJob: () => Promise<void>;
  cancelJob: () => Promise<void>;
  resetGenerate: () => void;
  showJobResult: (job: GenerationJob) => Promise<void>;
}

type GenerateRequestContextValue = GenerateRequestState & GenerateRequestActions;

const GenerateRequestContext = createContext<GenerateRequestContextValue | null>(null);

interface ProviderProps {
  children: ReactNode;
}

export function GenerateRequestProvider({ children }: ProviderProps): ReactElement {
  const [params, setParams] = useState<GenerateParamsState>(() => ({ ...DEFAULT_PARAMS }));
  const [imageRef, setImageRef] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const [generate, setGenerate] = useState<GenerateState>(INITIAL_STATE);

  const streamCleanup = useRef<(() => void) | null>(null);
  const generateRef = useRef<GenerateState>(generate);
  generateRef.current = generate;

  const subscribeToJob = useCallback((jobId: string) => {
    streamCleanup.current?.();
    streamCleanup.current = subscribeGenerateStream(jobId, (frame) => {
      setGenerate((prev) => reduceFrame(prev, frame));
    });
  }, []);

  const updateParam = useCallback(
    <K extends keyof GenerateParamsState>(key: K, value: GenerateParamsState[K]) => {
      setParams((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const applyParams = useCallback((patch: Partial<GenerateParamsState>) => {
    setParams((prev) => ({ ...prev, ...patch }));
  }, []);

  const setImage = useCallback((ref: string, name: string) => {
    setImageRef(ref);
    setImageName(name);
  }, []);

  const clearImage = useCallback(() => {
    setImageRef(null);
    setImageName(null);
  }, []);

  const resetGenerate = useCallback(() => {
    streamCleanup.current?.();
    streamCleanup.current = null;
    clearActiveJob();
    setGenerate(INITIAL_STATE);
  }, []);

  const startJob = useCallback(async () => {
    if (!imageRef) return;
    streamCleanup.current?.();
    const body = { image: imageRef, params: { ...params } };
    const { jobId } = await startGenerate(body);
    setGenerate(startedState());
    persistActiveJob(jobId);
    subscribeToJob(jobId);
  }, [imageRef, params, subscribeToJob]);

  const cancelJob = useCallback(async () => {
    const jobId = readActiveJobId();
    if (!jobId) {
      setGenerate((prev) => cancelledState(prev));
      return;
    }
    const { status } = await cancelGenerate(jobId);
    if (status === "cancelling") return;
    streamCleanup.current?.();
    streamCleanup.current = null;
    clearActiveJob();
    setGenerate((prev) => cancelledState(prev));
  }, []);

  const showJobResult = useCallback(async (job: GenerationJob) => {
    streamCleanup.current?.();
    streamCleanup.current = null;
    try {
      const full = await getGenerationJob(job.id);
      setGenerate(jobToState(full));
    } catch {
      setGenerate(jobToState(job));
    }
  }, []);

  useEffect(() => {
    if (generate.phase === "done" || generate.phase === "error" || generate.phase === "cancelled") {
      clearActiveJob();
    }
  }, [generate.phase]);

  useEffect(() => {
    const resumeIfRunning = () => {
      const current = generateRef.current;
      if (current.phase !== "running") return;
      const jobId = readActiveJobId();
      if (jobId) subscribeToJob(jobId);
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
    const jobId = readActiveJobId();
    if (!jobId) return;
    let cancelled = false;
    void getGenerationJob(jobId)
      .then((job) => {
        if (cancelled) return;
        if (job.status === "queued" || job.status === "running") {
          setGenerate(startedState());
          subscribeToJob(jobId);
          return;
        }
        clearActiveJob();
        setGenerate(jobToState(job));
      })
      .catch(() => {
        /* job gone or offline — leave the form idle */
      });
    return () => {
      cancelled = true;
    };
  }, [subscribeToJob]);

  useEffect(() => {
    return () => {
      streamCleanup.current?.();
      streamCleanup.current = null;
    };
  }, []);

  const value = useMemo<GenerateRequestContextValue>(
    () => ({
      params,
      imageRef,
      imageName,
      generate,
      updateParam,
      applyParams,
      setImage,
      clearImage,
      startJob,
      cancelJob,
      resetGenerate,
      showJobResult,
    }),
    [
      params,
      imageRef,
      imageName,
      generate,
      updateParam,
      applyParams,
      setImage,
      clearImage,
      startJob,
      cancelJob,
      resetGenerate,
      showJobResult,
    ],
  );

  return (
    <GenerateRequestContext.Provider value={value}>{children}</GenerateRequestContext.Provider>
  );
}

export function useGenerateRequest(): GenerateRequestContextValue {
  const ctx = useContext(GenerateRequestContext);
  if (!ctx) {
    throw new Error("useGenerateRequest must be used within GenerateRequestProvider");
  }
  return ctx;
}
