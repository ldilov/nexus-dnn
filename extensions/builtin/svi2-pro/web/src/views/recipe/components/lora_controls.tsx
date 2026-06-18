import { type ReactElement } from "react";
import useSWR from "swr";
import { fetchInstalledLoras } from "../../../services/installed_loras";
import { useRenderRequest } from "../../../store/render_request_store";
import { LoraPicker } from "./lora_picker";
import * as styles from "./quick_controls.css";

export function LoraControls(): ReactElement {
  const { params, updateParam } = useRenderRequest();
  const lorasQuery = useSWR("svi2/installed-loras", fetchInstalledLoras, {
    shouldRetryOnError: false,
  });

  const loras = lorasQuery.data ?? [];

  return (
    <>
      {lorasQuery.error && (
        <div className={styles.loadError} role="alert">
          Failed to load installed LoRAs
        </div>
      )}
      <LoraPicker
        label="LoRA — high noise"
        pickerId="svi2-lora-high"
        value={params.user_lora_high_path}
        weight={params.user_lora_high_weight ?? 1.0}
        options={loras}
        onChange={(path) => updateParam("user_lora_high_path", path)}
        onWeight={(n) => updateParam("user_lora_high_weight", n)}
      />
      <LoraPicker
        label="LoRA — low noise"
        pickerId="svi2-lora-low"
        value={params.user_lora_low_path}
        weight={params.user_lora_low_weight ?? 1.0}
        options={loras}
        onChange={(path) => updateParam("user_lora_low_path", path)}
        onWeight={(n) => updateParam("user_lora_low_weight", n)}
      />
    </>
  );
}
