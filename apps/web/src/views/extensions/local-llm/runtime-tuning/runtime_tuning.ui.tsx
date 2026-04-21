import GpuLayersSlider from "./components/gpu_layers_slider.ui";
import SummaryBadge from "./components/summary_badge.ui";
import type { ModelMetadata, CpuCoreFacts } from "../../../../services/host_api";
import * as styles from "./runtime_tuning.css";

export interface RuntimeTuningUIProps {
  metadata: ModelMetadata | null;
  cpu: CpuCoreFacts;
  currentGpuLayers: number;
  onGpuLayersChange: (value: number) => void;
  loading: boolean;
}

const FALLBACK_MAX_LAYERS = 128;

export function RuntimeTuningUI({
  metadata,
  currentGpuLayers,
  onGpuLayersChange,
  loading,
}: RuntimeTuningUIProps) {
  if (!metadata) {
    return (
      <section
        aria-label="Runtime tuning panel"
        className={styles.emptyState}
      >
        No model focused — open the picker to select one.
      </section>
    );
  }

  const layerCountKnown = typeof metadata.layer_count === "number";
  const maxLayers = metadata.layer_count ?? FALLBACK_MAX_LAYERS;
  const familyName = metadata.architecture ?? "Unknown architecture";

  return (
    <section
      aria-label="Runtime tuning panel"
      className={`${styles.panel} ${loading ? styles.loadingVeil : ""}`}
    >
      <header className={styles.header}>
        <h2 className={styles.title}>Runtime Tuning</h2>
        <p className={styles.subtitle}>
          <span>{familyName}</span>
          <span className={styles.installId}>{metadata.install_id}</span>
        </p>
      </header>

      <div className={styles.body}>
        <GpuLayersSlider
          value={currentGpuLayers}
          max={maxLayers}
          layerCountKnown={layerCountKnown}
          onChange={onGpuLayersChange}
        />
      </div>

      <footer className={styles.footer}>
        <SummaryBadge
          value={currentGpuLayers}
          max={maxLayers}
          layerCountKnown={layerCountKnown}
        />
      </footer>
    </section>
  );
}

export default RuntimeTuningUI;
