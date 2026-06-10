/**
 * Spec 053 — useDependencyReadiness.
 *
 * Single source of dependency-readiness truth shared by the `DependencyGate`
 * and the `DependencyStatusChip`. Keyed purely by `:id` with zero extension-id
 * literals. Reuses the gate's SWR key (`/extensions/:id/dependencies`) so an
 * install completion (which `mutate`s that key via `useInstallProgress`) keeps
 * both surfaces live without divergent fetch logic.
 */
import useSWR from "swr";

import { fetchDependencies } from "../../services/extension_dependencies_client";

export function dependenciesSwrKey(extensionId: string): string {
  return `/extensions/${extensionId}/dependencies`;
}

export interface DependencyReadiness {
  /** True when every managed step is satisfied (or none are declared). */
  ready: boolean;
  /** Count of declared steps that are not yet satisfied. */
  missingCount: number;
  /** Total number of managed steps the extension declares. */
  total: number;
  /** No managed deps declared at all. */
  hasManagedDeps: boolean;
  isLoading: boolean;
  error: unknown;
}

export function useDependencyReadiness(extensionId: string): DependencyReadiness {
  const { data, error, isLoading } = useSWR(
    dependenciesSwrKey(extensionId),
    () => fetchDependencies(extensionId),
  );

  const steps = data?.steps ?? [];
  const total = steps.length;
  const missingCount = steps.filter((step) => !step.satisfied).length;
  const ready = Boolean(data?.all_satisfied) || total === 0;

  return {
    ready,
    missingCount,
    total,
    hasManagedDeps: total > 0,
    isLoading,
    error,
  };
}
