import type { InstalledModelsIndex } from "./types";

const INSTALLED_URL = "/api/v1/model-store/installed";

interface Envelope<T> {
  success?: boolean;
  data?: T;
}

export async function listInstalledModels(): Promise<InstalledModelsIndex> {
  const resp = await fetch(INSTALLED_URL, {
    headers: { accept: "application/json" },
  });
  if (!resp.ok) {
    throw new Error(`model-store installed: HTTP ${resp.status}`);
  }
  const body = (await resp.json()) as Envelope<InstalledModelsIndex> | InstalledModelsIndex;
  if ("installed" in body) return body;
  if (body.data && "installed" in body.data) return body.data;
  return { family_ids: [], installed: [], truncated: false };
}
