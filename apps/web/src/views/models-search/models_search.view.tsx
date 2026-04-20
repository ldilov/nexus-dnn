import { useCallback, useEffect, useMemo, useState } from "react";
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router";
import { toast } from "sonner";
import useSWR from "swr";
import {
  createDownload,
  fetchBackends,
  fetchDownloadStatus,
  fetchSearch,
  isTerminalState,
  parseSearchParams,
  pauseDownload,
  resumeDownload,
  serializeSearchParams,
  type BackendCapability,
  type CompatibilityStatus,
  type DownloadJob,
  type DownloadState,
  type Format,
  type Modality,
  type ModelFamily,
  type ParsedSearchParams,
  type SearchPage,
} from "../../services/model_store";
import { ModelsSearchUI } from "./models_search.ui";
import type { DownloadKind } from "./components/ModelCard";

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

  useEffect(() => {
    setQuery(loaderData.params.q);
  }, [loaderData.params.q]);

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

  const startDownload = useCallback(
    async (family: ModelFamily, target: DownloadKind) => {
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
        setActiveJobs((prev) => ({ ...prev, [job.job_id]: job }));
        if (target.kind === "variant") {
          setJobVariantMap((prev) => ({ ...prev, [job.job_id]: target.variantId }));
        }
        toast.success(
          target.kind === "variant"
            ? `Queued download`
            : target.kind === "bundle"
              ? "Bundle download queued"
              : "Download queued",
        );
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

  const toggleInList = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((x) => x !== value) : [...list, value];

  const handlers = useMemo(
    () => ({
      onQueryChange: (q: string) => setQuery(q),
      onToggleFormat: (fmt: Format) =>
        mutateParams({
          formats: toggleInList(loaderData.params.formats, fmt),
          page: 1,
        }),
      onToggleBackend: (id: string) =>
        mutateParams({
          backends: toggleInList(loaderData.params.backends, id),
          page: 1,
        }),
      onToggleModality: (m: Modality) =>
        mutateParams({
          modalities: toggleInList(loaderData.params.modalities, m),
          page: 1,
        }),
      onToggleCompat: (c: CompatibilityStatus) =>
        mutateParams({
          compat: toggleInList(loaderData.params.compat, c),
          page: 1,
        }),
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
    }),
    [
      loaderData.params,
      mutateParams,
      navigate,
      startDownload,
      onPause,
      onResume,
      onAuthRequired,
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
      jobStateByVariant={jobStateByVariant}
      jobIdByVariant={jobIdByVariant}
      jobByVariant={jobByVariant}
      {...handlers}
    />
  );
}
