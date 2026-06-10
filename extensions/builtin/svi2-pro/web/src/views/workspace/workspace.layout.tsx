import type { ReactElement } from "react";
import { Outlet, useLoaderData } from "react-router";
import { Toaster } from "sonner";
import { CANONICAL_PRESET_ID } from "../../domain/preset_meta";
import { DEFAULT_SETTINGS } from "../../domain/settings_defaults";
import { RenderRequestProvider } from "../../store/render_request_store";
import type { ExtensionSettings, PresetCatalog, PresetSummary } from "../../services/types";
import * as styles from "./workspace.css";

export interface WorkspaceLoaderData {
  catalog: PresetCatalog | null;
  settings: ExtensionSettings;
}

export function WorkspaceLayout(): ReactElement {
  const data = useLoaderData() as WorkspaceLoaderData;

  const initialPreset = pickCanonical(data.catalog?.presets ?? []);

  return (
    <RenderRequestProvider initialSettings={data.settings} initialPreset={initialPreset}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <h1 className={styles.title}>SVI 2.0 Pro</h1>
            <p className={styles.subtitle}>
              Long, identity-locked image-to-video from a single anchor image. Chain 4n+1-frame
              clips with the error-recycling SVI LoRA for coherent long takes.
            </p>
          </div>
        </header>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
      <Toaster position="bottom-right" theme="dark" richColors />
    </RenderRequestProvider>
  );
}

function pickCanonical(presets: PresetSummary[]): PresetSummary | null {
  return presets.find((p) => p.id === CANONICAL_PRESET_ID) ?? presets[0] ?? null;
}

export const FALLBACK_SETTINGS = DEFAULT_SETTINGS;
