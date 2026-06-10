import { apiFetch } from "./http";
import type { PresetCatalog } from "./types";

export async function listPresets(): Promise<PresetCatalog> {
  return apiFetch("/presets");
}
