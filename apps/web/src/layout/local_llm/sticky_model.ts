import type { RuntimeTuning } from "../../services/local_llm_chat";

export interface StickyModel {
  family_id: string;
  variant_id: string;
  tuning: RuntimeTuning;
  saved_at: string;
}

const STORAGE_KEY = "local-llm:deployment-active-model";

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
  try {
    const all = loadAll();
    all[deploymentId] = model;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* ignore quota / private-mode errors */
  }
}

export function clearDeploymentModel(deploymentId: string | null | undefined): void {
  if (!deploymentId) return;
  try {
    const all = loadAll();
    delete all[deploymentId];
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* ignore */
  }
}
