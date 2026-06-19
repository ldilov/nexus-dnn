import type { RenderParams } from "../services/types";

const VERSION = 1;
const KEY_PREFIX = "nexus.video.svi2-pro.recipe";

/**
 * Per-render anchors that point at uploaded host files. They are not stable
 * across visits (the file may be gone), so they are never persisted — the
 * user re-selects an anchor each session.
 */
const TRANSIENT_KEYS: ReadonlyArray<keyof RenderParams> = ["ref_image_path", "last_image_path"];

interface PersistedRecipe {
  v: number;
  params: Partial<RenderParams>;
}

function keyFor(deploymentId: string): string {
  return `${KEY_PREFIX}.${deploymentId}`;
}

function storage(): Storage | null {
  try {
    return typeof window !== "undefined" ? window.localStorage : null;
  } catch {
    return null;
  }
}

export function loadPersistedParams(
  deploymentId: string | undefined,
): Partial<RenderParams> | null {
  if (!deploymentId) return null;
  const store = storage();
  if (!store) return null;
  try {
    const raw = store.getItem(keyFor(deploymentId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedRecipe;
    if (parsed.v !== VERSION || typeof parsed.params !== "object" || parsed.params === null) {
      return null;
    }
    return parsed.params;
  } catch {
    return null;
  }
}

export function savePersistedParams(deploymentId: string | undefined, params: RenderParams): void {
  if (!deploymentId) return;
  const store = storage();
  if (!store) return;
  try {
    const persistable: Record<string, unknown> = { ...params };
    for (const key of TRANSIENT_KEYS) delete persistable[key as string];
    const payload: PersistedRecipe = {
      v: VERSION,
      params: persistable as Partial<RenderParams>,
    };
    store.setItem(keyFor(deploymentId), JSON.stringify(payload));
  } catch {
    /* private mode / quota exceeded — persistence unavailable */
  }
}
