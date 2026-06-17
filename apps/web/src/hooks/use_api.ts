import useSWR, { type SWRConfiguration, type SWRResponse } from "swr";
import {
  apiFetch,
  fetchDeployments,
  fetchHostModels,
  fetchLayouts,
  fetchModule,
  fetchModules,
  fetchWorkflow,
  type DeploymentSummary,
  type HostModelsResponse,
  type LayoutSummary,
  type ModuleDetail,
  type ModuleSummary,
  type Workflow,
} from "../api/client";

// ─── Fetcher ──────────────────────────────────────────────────────────────
// SWR needs a fetcher that receives the cache key and returns a Promise.

export const apiSwrFetcher = <T,>(path: string) => apiFetch<T>(path);

// ─── Module listing ───────────────────────────────────────────────────────

export interface ModulesEnvelope {
  readonly modules: readonly ModuleSummary[];
  readonly total: number;
}

export interface UseModulesOptions {
  kind?: "all" | "extension" | "user";
  q?: string;
  limit?: number;
  config?: SWRConfiguration<ModulesEnvelope>;
}

export function useModules(
  options: UseModulesOptions = {},
): SWRResponse<ModulesEnvelope> {
  const { kind = "all", q, limit = 200, config } = options;
  // SWR uses the key as both cache identifier and fetcher arg — so we
  // stringify filters into an array for stable equality.
  const key = ["modules", kind, q ?? "", limit] as const;
  return useSWR<ModulesEnvelope>(
    key,
    () => fetchModules({ kind, q: q?.trim() || undefined, limit }),
    config,
  );
}

// ─── Module detail ────────────────────────────────────────────────────────

export function useModule(
  moduleId: string | null | undefined,
  config?: SWRConfiguration<ModuleDetail>,
): SWRResponse<ModuleDetail> {
  // `null` key disables the fetch — SWR's convention for conditional hooks.
  return useSWR<ModuleDetail>(
    moduleId ? ["module", moduleId] : null,
    () => fetchModule(moduleId as string),
    config,
  );
}

// ─── Workflow ─────────────────────────────────────────────────────────────

export function useWorkflow(
  workflowId: string | null | undefined,
  config?: SWRConfiguration<Workflow>,
): SWRResponse<Workflow> {
  return useSWR<Workflow>(
    workflowId ? ["workflow", workflowId] : null,
    () => fetchWorkflow(workflowId as string),
    config,
  );
}

// ─── Deployments list ─────────────────────────────────────────────────────

export function useDeploymentsList(
  config?: SWRConfiguration<readonly DeploymentSummary[]>,
): SWRResponse<readonly DeploymentSummary[]> {
  return useSWR<readonly DeploymentSummary[]>(
    "deployments",
    () => fetchDeployments(),
    config,
  );
}

// ─── Deployment detail ────────────────────────────────────────────────────
//

export function useDeployment(
  deploymentId: string | null | undefined,
  config?: SWRConfiguration<DeploymentSummary>,
): SWRResponse<DeploymentSummary> {
  return useSWR<DeploymentSummary>(
    deploymentId ? ["deployment", deploymentId] : null,
    () => apiFetch<DeploymentSummary>(`/deployments/${encodeURIComponent(deploymentId as string)}`),
    config,
  );
}

// ─── Extension layouts ────────────────────────────────────────────────────

export function useLayouts(
  config?: SWRConfiguration<readonly LayoutSummary[]>,
): SWRResponse<readonly LayoutSummary[]> {
  return useSWR<readonly LayoutSummary[]>(
    "ui/layouts",
    () => fetchLayouts(),
    config,
  );
}

// ─── Host-managed models (spec 017) ──────────────────────────────────────

export function useHostModels(
  config?: SWRConfiguration<HostModelsResponse>,
): SWRResponse<HostModelsResponse> {
  return useSWR<HostModelsResponse>("host-models", () => fetchHostModels(), config);
}

import type { BackendListResponse } from "../views/backends/types";
import { fetchHostBackends } from "../services/backends";

export function useHostBackends(
  config?: SWRConfiguration<BackendListResponse>,
): SWRResponse<BackendListResponse> {
  return useSWR<BackendListResponse>("host-backends", () => fetchHostBackends(), config);
}
