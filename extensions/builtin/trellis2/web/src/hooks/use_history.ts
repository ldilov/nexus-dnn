import { useCallback, useEffect, useState } from "react";
import {
  deleteGenerationJob,
  listGenerationJobs,
} from "../services/history_client";
import type { GenerationJob } from "../services/types";

export interface HistoryHandle {
  jobs: GenerationJob[];
  loading: boolean;
  reload: () => void;
  remove: (jobId: string) => Promise<void>;
}

/** Loads the generation history and reloads it whenever `refreshKey` changes
 * (e.g. when a render finishes). Failures leave the prior list intact. */
export function useHistory(refreshKey: unknown): HistoryHandle {
  const [jobs, setJobs] = useState<GenerationJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [tick, setTick] = useState(0);

  const reload = useCallback(() => setTick((n) => n + 1), []);

  const remove = useCallback(async (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    await deleteGenerationJob(jobId);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: tick and refreshKey are the intended reload triggers.
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    void listGenerationJobs()
      .then((res) => {
        if (!cancelled) setJobs(res.jobs);
      })
      .catch(() => {
        /* offline or empty — keep the prior list */
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [tick, refreshKey]);

  return { jobs, loading, reload, remove };
}
