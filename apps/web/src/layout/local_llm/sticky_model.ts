import {
  deleteDeploymentExtensionSettings,
  fetchDeploymentExtensionSettings,
  putDeploymentExtensionSettings,
} from "../../services/deployment_extension_settings";
import type { RuntimeTuning } from "../../services/local_llm_chat";

export interface StickyModel {
  family_id: string;
  variant_id: string;
  tuning: RuntimeTuning;
  saved_at: string;
}

const STORAGE_KEY = "local-llm:deployment-active-model";

/**
 * Extension id under which the local-LLM per-deployment model selection is
 * persisted via the generic host contract. localStorage is retained only as a
 * synchronous cache + one-time migration source; the server is the source of
 * truth (see {@link hydrateDeploymentModel}).
 */
const EXTENSION_ID = "nexus.local-llm";

interface StickyMap {
  [deploymentId: string]: StickyModel | undefined;
}

function loadAll(): StickyMap {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as StickyMap;
    }
    return {};
  } catch {
    return {};
  }
}

function writeLocal(deploymentId: string, model: StickyModel | null): void {
  try {
    const all = loadAll();
    if (model) {
      all[deploymentId] = model;
    } else {
      delete all[deploymentId];
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* ignore quota / private-mode errors */
  }
}

function isStickyModel(value: unknown): value is StickyModel {
  if (value === null || typeof value !== "object") return false;
  const v = value as Partial<StickyModel>;
  return (
    typeof v.family_id === "string" &&
    typeof v.variant_id === "string" &&
    typeof v.saved_at === "string" &&
    v.tuning !== null &&
    typeof v.tuning === "object"
  );
}

/** Synchronous cache read — instant UI, reconciled by {@link hydrateDeploymentModel}. */
export function readDeploymentModel(deploymentId: string | null | undefined): StickyModel | null {
  if (!deploymentId) return null;
  const all = loadAll();
  return all[deploymentId] ?? null;
}

export function persistDeploymentModel(
  deploymentId: string | null | undefined,
  model: StickyModel,
): void {
  if (!deploymentId) return;
  writeLocal(deploymentId, model);
  void putDeploymentExtensionSettings(deploymentId, EXTENSION_ID, model).catch(() => {
    /* server best-effort; localStorage cache already holds the value */
  });
}

export function clearDeploymentModel(deploymentId: string | null | undefined): void {
  if (!deploymentId) return;
  writeLocal(deploymentId, null);
  void deleteDeploymentExtensionSettings(deploymentId, EXTENSION_ID).catch(() => {
    /* server best-effort */
  });
}

/**
 * Reconcile the per-deployment model with the server: server wins when a row
 * exists; otherwise a cached localStorage value is migrated up to the server
 * once. Falls back to the localStorage cache if the server is unreachable.
 * `signal` lets a caller abort late side effects (cache write + migration PUT)
 * when the deployment changes mid-flight, so a stale fetch can't overwrite the
 * newly-active deployment's state. Returns the authoritative model (or null).
 */
export async function hydrateDeploymentModel(
  deploymentId: string | null | undefined,
  signal?: AbortSignal,
): Promise<StickyModel | null> {
  if (!deploymentId) return null;
  try {
    const remote = await fetchDeploymentExtensionSettings<StickyModel>(deploymentId, EXTENSION_ID);
    if (signal?.aborted) return readDeploymentModel(deploymentId);
    if (remote.updated_at !== null && isStickyModel(remote.settings)) {
      writeLocal(deploymentId, remote.settings);
      return remote.settings;
    }
    const cached = readDeploymentModel(deploymentId);
    if (cached && !signal?.aborted) {
      await putDeploymentExtensionSettings(deploymentId, EXTENSION_ID, cached);
    }
    return cached;
  } catch {
    return readDeploymentModel(deploymentId);
  }
}
