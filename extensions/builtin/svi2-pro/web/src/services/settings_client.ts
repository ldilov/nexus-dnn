import { apiFetch } from "./http";
import type { ExtensionSettings } from "./types";

export async function getSettings(): Promise<ExtensionSettings> {
  return apiFetch("/settings");
}

export async function saveSettings(settings: ExtensionSettings): Promise<ExtensionSettings> {
  return apiFetch("/settings", {
    method: "PUT",
    body: JSON.stringify(settings),
  });
}
