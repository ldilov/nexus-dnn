import { DEFAULT_SETTINGS } from "../domain/settings_defaults";
import { apiFetch } from "./http";
import type { ExtensionSettings } from "./types";

export async function getSettings(): Promise<ExtensionSettings> {
  // The store is an opaque blob, so settings saved before a key existed omit it.
  // Merge over defaults so new keys surface their default, never undefined.
  const stored = await apiFetch<Partial<ExtensionSettings>>("/settings");
  return { ...DEFAULT_SETTINGS, ...stored };
}

export async function saveSettings(settings: ExtensionSettings): Promise<ExtensionSettings> {
  return apiFetch("/settings", {
    method: "PUT",
    body: JSON.stringify(settings),
  });
}
