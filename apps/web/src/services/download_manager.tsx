import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import useSWR from "swr";
import {
  createDirectDownload,
  createDownload,
  directTargetFromFamily,
  fetchDownloadStatus,
  isTerminalState,
  pauseDownload,
  resumeDownload,
  cancelDownload,
  type DownloadJob,
  type ModelFamily,
} from "./model_store";
import { dispatchModelsChanged } from "./model_events";
import type { DownloadKind } from "../views/models-search/components/ModelCard";

/**
 * Shell-level owner of all Model Foundry download jobs. Lifting this state out
 * of the Models route means in-flight downloads stay visible (and pollable)
 * across route changes and full reloads, and the floating tray can surface
 * progress + cancel from anywhere in the shell.
 *
 * Host-owned and generic: no extension id appears here. The manager keys jobs
 * by their host-issued `job_id` and never inspects extension state.
 */
export interface DownloadManagerValue {
  /** Every known job keyed by `job_id` (active and recently-terminal). */
  jobs: Record<string, DownloadJob>;
  /** Maps a job id to the variant id it was started for (variant kind only). */
  jobVariantMap: Record<string, string>;
  startDownload: (family: ModelFamily, target: DownloadKind) => Promise<void>;
  pauseJob: (jobId: string) => Promise<void>;
  resumeJob: (jobId: string) => Promise<void>;
  cancelJob: (jobId: string) => Promise<void>;
  /** Drop a terminal (downloaded/failed) row from the tray without server I/O. */
  dismissJob: (jobId: string) => void;
}

const DownloadManagerContext = createContext<DownloadManagerValue | null>(null);

const ACTIVE_STORAGE_KEY = "nexus.downloads.active";
const VARIANTS_STORAGE_KEY = "nexus.downloads.variants";
const POLL_INTERVAL_MS = 1200;

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function readSessionStorage(key: string): string | null {
  if (typeof window === "undefined" || !window.sessionStorage) return null;
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSessionStorage(key: string, value: string): void {
  if (typeof window === "undefined" || !window.sessionStorage) return;
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    /* private mode / quota — rehydration is best-effort */
  }
}

function nonTerminalIds(jobs: Record<string, DownloadJob>): string[] {
  return Object.values(jobs)
    .filter((j) => !isTerminalState(j.state))
    .map((j) => j.job_id)
    .sort();
}

function parseStoredIds(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (v): v is string => typeof v === "string" && UUID_RE.test(v),
    );
  } catch {
    return [];
  }
}

function parseStoredVariants(raw: string | null): Record<string, string> {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (parsed === null || typeof parsed !== "object") return {};
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (UUID_RE.test(k) && typeof v === "string") out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}

export function DownloadManagerProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Record<string, DownloadJob>>({});
  const [jobVariantMap, setJobVariantMap] = useState<Record<string, string>>({});
  const jobsRef = useRef(jobs);
  jobsRef.current = jobs;

  useEffect(() => {
    const ids = parseStoredIds(readSessionStorage(ACTIVE_STORAGE_KEY));
    const storedVariants = parseStoredVariants(
      readSessionStorage(VARIANTS_STORAGE_KEY),
    );
    if (ids.length === 0) return;
    let cancelled = false;
    void (async () => {
      const fetched = await Promise.all(
        ids.map((id) => fetchDownloadStatus(id).catch(() => null)),
      );
      if (cancelled) return;
      const recovered = fetched.filter((j): j is DownloadJob => j !== null);
      const presentIds = new Set(recovered.map((j) => j.job_id));
      setJobs((prev) => {
        const next = { ...prev };
        for (const job of recovered) next[job.job_id] = job;
        return next;
      });
      setJobVariantMap((prev) => {
        const next = { ...prev };
        for (const [jobId, variantId] of Object.entries(storedVariants)) {
          if (presentIds.has(jobId)) next[jobId] = variantId;
        }
        return next;
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    writeSessionStorage(ACTIVE_STORAGE_KEY, JSON.stringify(nonTerminalIds(jobs)));
  }, [jobs]);

  useEffect(() => {
    writeSessionStorage(VARIANTS_STORAGE_KEY, JSON.stringify(jobVariantMap));
  }, [jobVariantMap]);

  const pollKey = useMemo(() => {
    const ids = nonTerminalIds(jobs);
    return ids.length ? `model-store/downloads:${ids.join(",")}` : null;
  }, [jobs]);

  useSWR(
    pollKey,
    async (key: string): Promise<(DownloadJob | null)[]> => {
      const ids = key.split(":")[1]?.split(",") ?? [];
      return Promise.all(
        ids.map((jid) => fetchDownloadStatus(jid).catch(() => null)),
      );
    },
    {
      refreshInterval: POLL_INTERVAL_MS,
      revalidateOnFocus: false,
      onSuccess: (updates) => {
        const snapshot = jobsRef.current;
        for (const job of updates) {
          if (!job) continue;
          const prior = snapshot[job.job_id];
          const wasNonTerminal = prior && !isTerminalState(prior.state);
          if (wasNonTerminal && job.state === "downloaded") {
            dispatchModelsChanged({ family_id: job.family_id });
          }
        }
        setJobs((prev) => {
          let changed = false;
          const next = { ...prev };
          for (const job of updates) {
            if (!job) continue;
            if (prev[job.job_id] !== job) {
              next[job.job_id] = job;
              changed = true;
            }
          }
          return changed ? next : prev;
        });
      },
    },
  );

  const startDownload = useCallback(
    async (family: ModelFamily, target: DownloadKind) => {
      if (family.repository.source_provider !== "huggingface") {
        const direct = directTargetFromFamily(family);
        if (!direct) return;
        try {
          const job = await createDirectDownload(family.family_id, direct);
          const canonical =
            typeof job.state === "string" && typeof job.family_id === "string"
              ? job
              : await fetchDownloadStatus(job.job_id);
          setJobs((prev) => ({ ...prev, [canonical.job_id]: canonical }));
          toast.success("Download queued");
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Download failed";
          toast.error(msg);
        }
        return;
      }

      const body = {
        family_id: family.family_id,
        target:
          target.kind === "primary"
            ? { kind: "primary" as const, artifact_id: target.artifactId }
            : target.kind === "variant"
              ? { kind: "variant" as const, variant_id: target.variantId }
              : { kind: "bundle" as const },
        include_dependencies: target.kind === "bundle",
      };
      try {
        const job = await createDownload(body);
        const canonical =
          typeof job.state === "string" && typeof job.family_id === "string"
            ? job
            : await fetchDownloadStatus(job.job_id);
        setJobs((prev) => ({ ...prev, [canonical.job_id]: canonical }));
        if (target.kind === "variant") {
          setJobVariantMap((prev) => ({
            ...prev,
            [canonical.job_id]: target.variantId,
          }));
        }
        const isDownloadOnly = family.compat === "downloadable_but_not_runnable";
        const baseMessage =
          target.kind === "variant"
            ? "Queued download"
            : target.kind === "bundle"
              ? "Bundle download queued"
              : "Download queued";
        if (isDownloadOnly) {
          toast.success(baseMessage, {
            description:
              "This format can't run in Local Chat — no compatible backend (need GGUF for llama.cpp).",
            duration: 7000,
          });
        } else {
          toast.success(baseMessage);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Download failed";
        toast.error(msg);
      }
    },
    [],
  );

  const pauseJob = useCallback(async (jobId: string) => {
    try {
      const updated = await pauseDownload(jobId);
      setJobs((prev) => ({ ...prev, [updated.job_id]: updated }));
      toast("Download paused");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Pause failed";
      toast.error(msg);
    }
  }, []);

  const resumeJob = useCallback(async (jobId: string) => {
    try {
      const updated = await resumeDownload(jobId);
      setJobs((prev) => ({ ...prev, [updated.job_id]: updated }));
      toast.success("Download resumed");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Resume failed";
      toast.error(msg);
    }
  }, []);

  const dropJob = useCallback((jobId: string) => {
    setJobs((prev) => {
      if (!(jobId in prev)) return prev;
      const next = { ...prev };
      delete next[jobId];
      return next;
    });
    setJobVariantMap((prev) => {
      if (!(jobId in prev)) return prev;
      const next = { ...prev };
      delete next[jobId];
      return next;
    });
  }, []);

  const cancelJob = useCallback(
    async (jobId: string) => {
      try {
        await cancelDownload(jobId);
        dropJob(jobId);
        toast("Download canceled");
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Cancel failed";
        toast.error(msg);
      }
    },
    [dropJob],
  );

  const dismissJob = useCallback(
    (jobId: string) => {
      dropJob(jobId);
    },
    [dropJob],
  );

  const value = useMemo<DownloadManagerValue>(
    () => ({
      jobs,
      jobVariantMap,
      startDownload,
      pauseJob,
      resumeJob,
      cancelJob,
      dismissJob,
    }),
    [
      jobs,
      jobVariantMap,
      startDownload,
      pauseJob,
      resumeJob,
      cancelJob,
      dismissJob,
    ],
  );

  return (
    <DownloadManagerContext.Provider value={value}>
      {children}
    </DownloadManagerContext.Provider>
  );
}

export function useDownloadManager(): DownloadManagerValue {
  const ctx = useContext(DownloadManagerContext);
  if (!ctx) {
    throw new Error(
      "useDownloadManager must be used within a DownloadManagerProvider",
    );
  }
  return ctx;
}
