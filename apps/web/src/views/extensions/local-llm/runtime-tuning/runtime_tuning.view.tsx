import { useCallback, useEffect, useState } from "react";
import { useLoaderData, useNavigation } from "react-router";
import {
  getCpuCores,
  getModelMetadata,
  type CpuCoreFacts,
  type ModelMetadata,
} from "../../../../services/host_api";
import { RuntimeTuningUI } from "./runtime_tuning.ui";

const FOCUSED_INSTALL_STORAGE_KEY = "local_llm:focused_install_id";
const GPU_LAYERS_STORAGE_KEY_PREFIX = "local_llm:gpu_layers:";
const FALLBACK_MAX_LAYERS = 128;

export interface RuntimeTuningLoaderData {
  installId: string | null;
  metadata: ModelMetadata | null;
  cpu: CpuCoreFacts;
}

const FALLBACK_CPU: CpuCoreFacts = {
  physical: 4,
  logical: 4,
  detection_ok: false,
};

function resolveInstallId(url: URL): string | null {
  const fromQuery = url.searchParams.get("install_id");
  if (fromQuery && fromQuery.length > 0) return fromQuery;
  if (typeof window === "undefined") return null;
  return window.sessionStorage.getItem(FOCUSED_INSTALL_STORAGE_KEY);
}

export async function loader({
  request,
}: {
  request: Request;
}): Promise<RuntimeTuningLoaderData> {
  const url = new URL(request.url);
  const installId = resolveInstallId(url);

  const cpuPromise = getCpuCores(request.signal).catch(() => FALLBACK_CPU);
  const metadataPromise = installId
    ? getModelMetadata(installId, request.signal).catch(() => null)
    : Promise.resolve(null);

  const [cpu, metadata] = await Promise.all([cpuPromise, metadataPromise]);
  return { installId, metadata, cpu };
}

export function RuntimeTuningView() {
  const { installId, metadata, cpu } = useLoaderData() as RuntimeTuningLoaderData;
  const navigation = useNavigation();

  const initialLayers = readStoredLayers(installId, metadata);
  const [gpuLayers, setGpuLayers] = useState<number>(initialLayers);

  useEffect(() => {
    setGpuLayers(readStoredLayers(installId, metadata));
  }, [installId, metadata]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onStorage = (event: StorageEvent) => {
      if (event.key !== FOCUSED_INSTALL_STORAGE_KEY) return;
      window.location.reload();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const onGpuLayersChange = useCallback(
    (value: number) => {
      setGpuLayers(value);
      if (installId && typeof window !== "undefined") {
        window.sessionStorage.setItem(
          `${GPU_LAYERS_STORAGE_KEY_PREFIX}${installId}`,
          String(value),
        );
      }
    },
    [installId],
  );

  return (
    <RuntimeTuningUI
      metadata={metadata}
      cpu={cpu}
      currentGpuLayers={gpuLayers}
      onGpuLayersChange={onGpuLayersChange}
      loading={navigation.state === "loading"}
    />
  );
}

function readStoredLayers(
  installId: string | null,
  metadata: ModelMetadata | null,
): number {
  const fallback = metadata?.layer_count ?? FALLBACK_MAX_LAYERS;
  if (!installId || typeof window === "undefined") return fallback;
  const raw = window.sessionStorage.getItem(
    `${GPU_LAYERS_STORAGE_KEY_PREFIX}${installId}`,
  );
  if (raw === null) return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed < 0) return fallback;
  return parsed;
}

export default RuntimeTuningView;
