import { useEffect, useState } from "react";
import { listHostBackends } from "../../../services/backends";

export type RequiredBackend = "llama.cpp" | "tensorrt_llm" | "unknown";

export interface ModelCompatibility {
  requiredBackend: RequiredBackend;
  backendInstalled: boolean;
  guidanceCopy: string | null;
  installCta: { label: string; backendId: string } | null;
}

interface BackendsResponse {
  backends: Array<{ id: string; card_state: string }>;
}

function tagModel(modelPath: string | null): RequiredBackend {
  if (!modelPath) return "unknown";
  if (/\.gguf$/i.test(modelPath)) return "llama.cpp";
  return "unknown";
}

export function useModelCompatibility(
  modelPath: string | null,
  baseUrl = "",
): ModelCompatibility {
  const requiredBackend = tagModel(modelPath);
  const [installed, setInstalled] = useState<boolean>(false);

  useEffect(() => {
    if (requiredBackend === "unknown") return;
    let cancelled = false;
    (async () => {
      try {
        const data = (await listHostBackends(baseUrl)) as BackendsResponse | null;
        if (!data) return;
        const match = data.backends.find((b) => b.id === requiredBackend);
        if (!cancelled && match) {
          setInstalled(match.card_state === "ready" || match.card_state === "installed_unvalidated");
        }
      } catch {
        return;
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [requiredBackend, baseUrl]);

  if (requiredBackend === "llama.cpp" && !installed) {
    return {
      requiredBackend,
      backendInstalled: false,
      guidanceCopy: "This model requires llama.cpp. Install the llama.cpp runtime to continue.",
      installCta: { label: "Install llama.cpp", backendId: "llama.cpp" },
    };
  }
  return {
    requiredBackend,
    backendInstalled: installed,
    guidanceCopy: null,
    installCta: null,
  };
}
