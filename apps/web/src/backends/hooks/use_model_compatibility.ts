import { useEffect, useState } from "react";

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
        const res = await fetch(`${baseUrl}/api/v1/llm/backends`);
        if (!res.ok) return;
        const json = (await res.json()) as { data: BackendsResponse };
        const match = json.data.backends.find((b) => b.id === requiredBackend);
        if (!cancelled && match) {
          setInstalled(match.card_state === "ready" || match.card_state === "installed_unvalidated");
        }
      } catch {
        /* ignore — surface via install CTA */
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
