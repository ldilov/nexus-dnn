import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router";
import { toast } from "sonner";
import useSWR from "swr";
import {
  createDirectDownload,
  createDownload,
  directTargetFromFamily,
  fetchBackends,
  fetchDownloadStatus,
  fetchInstalled,
  fetchSearch,
  isTerminalState,
  parseSearchParams,
  pauseDownload,
  deleteInstalled,
  resolveUrl,
  resumeDownload,
  serializeSearchParams,
  uploadModelWithProgress,
  type BackendCapability,
  type DownloadJob,
  type DownloadState,
  type ModelFamily,
  type ParsedSearchParams,
  type SearchPage,
} from "../../services/model_store";
import {
  dispatchModelsChanged,
  subscribeModelsChanged,
} from "../../services/model_events";
import { ModelsSearchUI } from "./models_search.ui";
import type {
  DownloadKind,
  ModelOnDiskIdentity,
} from "./components/ModelCard";
import type { ActiveUpload } from "../../services/model_store";

export interface ModelsSearchLoaderData {
  params: ParsedSearchParams;
  backends: BackendCapability[];
  backendsDegraded: boolean;
  page: SearchPage;
  error: { code?: string; message: string } | null;
}

const EMPTY_PAGE: SearchPage = {
  page: 1,
  page_size: 30,
  total_results: 0,
  families: [],
  facets: { formats: {}, licenses: {}, modalities: {} },
};

export async function loader({
  request,
}: {
  request: Request;
}): Promise<ModelsSearchLoaderData> {
  const url = new URL(request.url);
  const params = parseSearchParams(url.searchParams);
  let backends: BackendCapability[] = [];
  let backendsDegraded = false;
  try {
    const res = await fetchBackends(request.signal);
    backends = res.backends;
  } catch {
    backendsDegraded = true;
  }

  try {
    const page = await fetchSearch(params, request.signal);
    return { params, backends, backendsDegraded, page, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Search failed";
    const code =
      err instanceof Response
        ? err.status === 502
          ? "upstream_unavailable"
          : `http_${err.status}`
        : undefined;
    return {
      params,
      backends,
      backendsDegraded,
      page: { ...EMPTY_PAGE, page_size: params.pageSize, page: params.page },
      error: { code, message },
    };
  }
}

export function ModelsSearchView() {
  const loaderData = useLoaderData() as ModelsSearchLoaderData;
  const navigation = useNavigation();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState(loaderData.params.q);
  const [activeJobs, setActiveJobs] = useState<Record<string, DownloadJob>>({});
  const [jobVariantMap, setJobVariantMap] = useState<Record<string, string>>({});
  const [resolved, setResolved] = useState<ModelFamily | null>(null);
  const [resolving, setResolving] = useState(false);
  const [uploads, setUploads] = useState<Record<string, ActiveUpload>>({});
  const uploadCancels = useRef<Record<string, () => void>>({});
  const [resolveError, setResolveError] = useState<{ message: string } | null>(null);
  const [installedSignal, setInstalledSignal] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    setQuery(loaderData.params.q);
  }, [loaderData.params.q]);

  useEffect(() => {
    return subscribeModelsChanged(() => {
      setInstalledSignal((n) => n + 1);
    });
  }, []);

  useEffect(() => {
    const cancels = uploadCancels.current;
    return () => {
      for (const cancel of Object.values(cancels)) cancel();
    };
  }, []);

  const installed = useSWR(
    `model-store/installed:${installedSignal}`,
    async () => {
      const index = await fetchInstalled();
      return {
        artifacts: index.installed,
        truncated: index.truncated,
      };
    },
  );

  const refreshInstalled = useCallback(() => {
    setInstalledSignal((n) => n + 1);
  }, []);

  const installedError = installed.error
    ? {
        message:
          installed.error instanceof Error
            ? installed.error.message
            : "Could not load downloaded models",
      }
    : null;

  const mutateParams = useCallback(
    (patch: Partial<ParsedSearchParams>) => {
      const next: ParsedSearchParams = { ...loaderData.params, ...patch };
      const qs = serializeSearchParams(next).toString();
      navigate(
        { pathname: location.pathname, search: qs ? `?${qs}` : "" },
        { replace: false },
      );
    },
    [loaderData.params, location.pathname, navigate],
  );

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed === loaderData.params.q) return undefined;
    const handle = window.setTimeout(() => {
      mutateParams({ q: trimmed, page: 1 });
    }, 280);
    return () => window.clearTimeout(handle);
  }, [query, loaderData.params.q, mutateParams]);

  const activeJobKey = useMemo(() => {
    const ids = Object.values(activeJobs)
      .filter((j) => !isTerminalState(j.state))
      .map((j) => j.job_id)
      .sort();
    return ids.length ? `model-store/downloads:${ids.join(",")}` : null;
  }, [activeJobs]);

  useSWR(
    activeJobKey,
    async (key: string) => {
      const ids = key.split(":")[1]?.split(",") ?? [];
      const updates = await Promise.all(
        ids.map((jid) => fetchDownloadStatus(jid).catch(() => null)),
      );
      setActiveJobs((prev) => {
        const next = { ...prev };
        for (const job of updates) {
          if (!job) continue;
          const prior = prev[job.job_id];
          const wasNonTerminal = prior && !isTerminalState(prior.state);
          if (wasNonTerminal && job.state === "downloaded") {
            dispatchModelsChanged({ family_id: job.family_id });
          }
          next[job.job_id] = job;
        }
        return next;
      });
      return updates;
    },
    { refreshInterval: 1200 },
  );

  const jobStateByVariant = useMemo<Record<string, DownloadState | undefined>>(
    () => {
      const out: Record<string, DownloadState | undefined> = {};
      for (const j of Object.values(activeJobs)) {
        const vid = jobVariantMap[j.job_id];
        if (vid) out[vid] = j.state;
      }
      return out;
    },
    [activeJobs, jobVariantMap],
  );

  const jobIdByVariant = useMemo<Record<string, string | undefined>>(
    () => {
      const out: Record<string, string | undefined> = {};
      for (const j of Object.values(activeJobs)) {
        const vid = jobVariantMap[j.job_id];
        if (vid) out[vid] = j.job_id;
      }
      return out;
    },
    [activeJobs, jobVariantMap],
  );

  const jobByVariant = useMemo<Record<string, DownloadJob | undefined>>(
    () => {
      const out: Record<string, DownloadJob | undefined> = {};
      for (const j of Object.values(activeJobs)) {
        const vid = jobVariantMap[j.job_id];
        if (vid) out[vid] = j;
      }
      return out;
    },
    [activeJobs, jobVariantMap],
  );

  const jobByFamily = useMemo<Record<string, DownloadJob | undefined>>(
    () => {
      const PRIORITY: Record<DownloadState, number> = {
        downloading: 6,
        queued: 5,
        paused: 4,
        failed: 3,
        downloaded: 2,
        not_downloaded: 1,
        incompatible: 0,
        auth_required: 0,
      };
      const out: Record<string, DownloadJob | undefined> = {};
      for (const j of Object.values(activeJobs)) {
        const existing = out[j.family_id];
        if (!existing) {
          out[j.family_id] = j;
          continue;
        }
        const nextScore = PRIORITY[j.state] ?? 0;
        const prevScore = PRIORITY[existing.state] ?? 0;
        if (nextScore > prevScore) {
          out[j.family_id] = j;
          continue;
        }
        if (nextScore === prevScore) {
          const nextTs = j.started_at ?? j.created_at;
          const prevTs = existing.started_at ?? existing.created_at;
          if (nextTs > prevTs) {
            out[j.family_id] = j;
          }
        }
      }
      return out;
    },
    [activeJobs],
  );

  const jobStateByFamily = useMemo<Record<string, DownloadState | undefined>>(
    () => {
      const out: Record<string, DownloadState | undefined> = {};
      for (const [familyId, j] of Object.entries(jobByFamily)) {
        if (j) out[familyId] = j.state;
      }
      return out;
    },
    [jobByFamily],
  );

  const jobIdByFamily = useMemo<Record<string, string | undefined>>(
    () => {
      const out: Record<string, string | undefined> = {};
      for (const [familyId, j] of Object.entries(jobByFamily)) {
        if (j) out[familyId] = j.job_id;
      }
      return out;
    },
    [jobByFamily],
  );

  const identityByFamily = useMemo<
    Record<string, ModelOnDiskIdentity | undefined>
  >(() => {
    const out: Record<string, ModelOnDiskIdentity | undefined> = {};
    for (const [familyId, j] of Object.entries(jobByFamily)) {
      if (j && j.state === "downloaded") {
        out[familyId] = { familyId: j.family_id, jobId: j.job_id };
      }
    }
    return out;
  }, [jobByFamily]);

  const jobByArtifact = useMemo<Record<string, DownloadJob | undefined>>(
    () => {
      const out: Record<string, DownloadJob | undefined> = {};
      for (const j of Object.values(activeJobs)) {
        for (const t of j.targets) {
          out[t.artifact_id] = j;
        }
      }
      return out;
    },
    [activeJobs],
  );

  const jobStateByArtifact = useMemo<Record<string, DownloadState | undefined>>(
    () => {
      const out: Record<string, DownloadState | undefined> = {};
      for (const [artifactId, j] of Object.entries(jobByArtifact)) {
        if (j) out[artifactId] = j.state;
      }
      return out;
    },
    [jobByArtifact],
  );

  const jobIdByArtifact = useMemo<Record<string, string | undefined>>(
    () => {
      const out: Record<string, string | undefined> = {};
      for (const [artifactId, j] of Object.entries(jobByArtifact)) {
        if (j) out[artifactId] = j.job_id;
      }
      return out;
    },
    [jobByArtifact],
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
          setActiveJobs((prev) => ({ ...prev, [canonical.job_id]: canonical }));
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
        setActiveJobs((prev) => ({ ...prev, [canonical.job_id]: canonical }));
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

  const onPause = useCallback(async (jobId: string) => {
    try {
      const updated = await pauseDownload(jobId);
      setActiveJobs((prev) => ({ ...prev, [updated.job_id]: updated }));
      toast("Download paused");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Pause failed";
      toast.error(msg);
    }
  }, []);

  const onResume = useCallback(async (jobId: string) => {
    try {
      const updated = await resumeDownload(jobId);
      setActiveJobs((prev) => ({ ...prev, [updated.job_id]: updated }));
      toast.success("Download resumed");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Resume failed";
      toast.error(msg);
    }
  }, []);

  const onAuthRequired = useCallback((family: ModelFamily) => {
    toast.info(
      `${family.repository.name} requires a Hugging Face token. Set huggingface.access_token in host settings to access gated repositories.`,
      { duration: 7000 },
    );
  }, []);

  const handlers = useMemo(
    () => ({
      onQueryChange: (q: string) => setQuery(q),
      onSourceChange: (source: ParsedSearchParams["source"]) => {
        setResolved(null);
        setResolveError(null);
        mutateParams({ source, page: 1 });
      },
      onToggleShowUnsupported: () =>
        mutateParams({
          showUnsupported: !loaderData.params.showUnsupported,
          page: 1,
        }),
      onCycleInstalled: () => {
        const current = loaderData.params.installed;
        const next: ParsedSearchParams["installed"] =
          current === "any"
            ? "installed"
            : current === "installed"
              ? "not_installed"
              : "any";
        mutateParams({ installed: next, page: 1 });
      },
      onClearInstalled: () => mutateParams({ installed: "any", page: 1 }),
      onClearAll: () => {
        setQuery("");
        navigate({ pathname: location.pathname, search: "" }, { replace: false });
      },
      onResolveUrl: async (url: string) => {
        setResolving(true);
        setResolveError(null);
        setResolved(null);
        try {
          const family = await resolveUrl(url);
          setResolved(family);
        } catch (e) {
          setResolveError({
            message:
              e instanceof Error ? e.message : "could not resolve URL",
          });
        } finally {
          setResolving(false);
        }
      },
      onUpload: (file: File) => {
        setResolveError(null);
        const id =
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? crypto.randomUUID()
            : `upload-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        setUploads((prev) => ({
          ...prev,
          [id]: {
            id,
            filename: file.name,
            pct: null,
            loaded: 0,
            total: file.size > 0 ? file.size : null,
            status: "uploading",
          },
        }));

        const clearUpload = () => {
          delete uploadCancels.current[id];
          setUploads((prev) => {
            const next = { ...prev };
            delete next[id];
            return next;
          });
        };

        const handle = uploadModelWithProgress(file, {
          onProgress: ({ loaded, total, pct }) => {
            setUploads((prev) => {
              const cur = prev[id];
              if (!cur || cur.status !== "uploading") return prev;
              return { ...prev, [id]: { ...cur, loaded, total, pct } };
            });
          },
        });
        uploadCancels.current[id] = handle.cancel;

        const run = async () => {
          try {
            await handle.promise;
            clearUpload();
            dispatchModelsChanged();
            refreshInstalled();
            toast.success(`Uploaded "${file.name}"`);
          } catch (e: unknown) {
            delete uploadCancels.current[id];
            const message = e instanceof Error ? e.message : "upload failed";
            if (message === "upload aborted") {
              clearUpload();
              return;
            }
            setUploads((prev) => {
              const cur = prev[id];
              if (!cur) return prev;
              return { ...prev, [id]: { ...cur, status: "error", error: message } };
            });
            toast.error(message);
          }
        };
        void run();
      },
      onCancelUpload: (id: string) => {
        const cancel = uploadCancels.current[id];
        if (cancel) {
          cancel();
          return;
        }
        setUploads((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
      },
      // Catalog/ModelCard delete: full reload to resync the grid. The panel's
      // onDeleteInstalled (below) does a soft SWR refresh + deletingId tracking.
      onDelete: async (artifactId: string, label: string) => {
        if (
          !window.confirm(
            `Delete "${label}"? This permanently removes the downloaded files from disk.`,
          )
        ) {
          return;
        }
        try {
          await deleteInstalled(artifactId);
          dispatchModelsChanged();
          navigate(0);
        } catch (e) {
          toast.error(e instanceof Error ? e.message : "could not delete model");
        }
      },
      onDeleteInstalled: async (artifactId: string, label: string) => {
        if (
          !window.confirm(
            `Delete "${label}"? This permanently removes the downloaded files from disk.`,
          )
        ) {
          return;
        }
        setDeletingId(artifactId);
        try {
          await deleteInstalled(artifactId);
          dispatchModelsChanged();
          refreshInstalled();
          toast.success(`Deleted "${label}"`);
        } catch (e) {
          toast.error(e instanceof Error ? e.message : "could not delete model");
        } finally {
          setDeletingId(null);
        }
      },
      onRefreshInstalled: refreshInstalled,
      onSortChange: (sort: ParsedSearchParams["sort"]) =>
        mutateParams({ sort, page: 1 }),
      onViewChange: (view: "grid" | "list") => mutateParams({ view }),
      onPageChange: (page: number) => {
        mutateParams({ page });
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
      onPageSizeChange: (pageSize: number) =>
        mutateParams({ pageSize, page: 1 }),
      onDownload: startDownload,
      onPause,
      onResume,
      onAuthRequired,
      onRetry: () => navigate(0),
      onRevalidated: () => {
        dispatchModelsChanged();
        navigate(0);
      },
    }),
    [
      loaderData.params,
      mutateParams,
      navigate,
      startDownload,
      onPause,
      onResume,
      onAuthRequired,
      refreshInstalled,
      location.pathname,
    ],
  );

  return (
    <ModelsSearchUI
      params={loaderData.params}
      query={query}
      backends={loaderData.backends}
      page={loaderData.page}
      loading={navigation.state === "loading"}
      error={loaderData.error}
      degraded={loaderData.backendsDegraded}
      resolved={resolved}
      resolving={resolving}
      uploads={uploads}
      resolveError={resolveError}
      installedArtifacts={installed.data?.artifacts ?? null}
      installedLoading={installed.isLoading}
      installedError={installedError}
      installedTruncated={installed.data?.truncated ?? false}
      deletingId={deletingId}
      jobStateByVariant={jobStateByVariant}
      jobIdByVariant={jobIdByVariant}
      jobByVariant={jobByVariant}
      jobStateByFamily={jobStateByFamily}
      jobIdByFamily={jobIdByFamily}
      jobByFamily={jobByFamily}
      jobStateByArtifact={jobStateByArtifact}
      jobIdByArtifact={jobIdByArtifact}
      jobByArtifact={jobByArtifact}
      identityByFamily={identityByFamily}
      {...handlers}
    />
  );
}
