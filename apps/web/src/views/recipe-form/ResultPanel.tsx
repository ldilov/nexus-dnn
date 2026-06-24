import type { ReactElement } from "react";
import type { Output } from "../../api/generated/Output";
import * as styles from "./result_panel.css";

export interface ResultPanelProps {
  output: Output;
  artifacts: Record<string, unknown>;
  nodeOutputs?: Record<string, unknown>;
}

function ArtifactRenderer({
  artifactKey,
  value,
  previewStyle,
}: {
  artifactKey: string;
  value: unknown;
  previewStyle: string;
}): ReactElement {
  const src = typeof value === "string" ? value : "";

  let inner: ReactElement;

  if (previewStyle === "player") {
    inner = (
      <video
        data-testid="artifact-player"
        className={styles.mediaPlayer}
        src={src}
        controls
        aria-label={artifactKey}
      />
    );
  } else if (previewStyle === "image") {
    inner = (
      <img
        className={styles.imagePreview}
        src={src}
        alt={artifactKey}
      />
    );
  } else if (previewStyle === "text") {
    inner = (
      <pre data-testid="text-output" className={styles.textOutput}>
        {typeof value === "string" ? value : JSON.stringify(value, null, 2)}
      </pre>
    );
  } else {
    // Generic fallback: offer a download link.
    inner = (
      <a
        data-testid="artifact-fallback"
        className={styles.fallbackLink}
        href={src}
        download
      >
        Download {artifactKey}
      </a>
    );
  }

  return (
    <div
      data-testid="artifact-item"
      data-artifact-key={artifactKey}
      className={styles.artifactItem}
    >
      {inner}
    </div>
  );
}

/**
 * Renders run results driven by the recipe's Output spec.
 * Generic: no extension-id hardcoding, no node-id assumptions.
 * Primary artifact is rendered first; secondary[] follow in order.
 * Intermediate node outputs are gated by `output.show_intermediate`.
 */
export function ResultPanel({
  output,
  artifacts,
  nodeOutputs,
}: ResultPanelProps): ReactElement {
  const { primary_artifact, secondary, preview_style, show_intermediate } = output;

  const orderedKeys = [primary_artifact, ...secondary];
  const hasArtifacts = orderedKeys.some((key) => key in artifacts);

  if (!hasArtifacts) {
    return (
      <div className={styles.root}>
        <div data-testid="result-empty" className={styles.emptyState}>
          No results yet.
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <div className={styles.artifactList}>
        {orderedKeys.map((key) => {
          if (!(key in artifacts)) return null;
          const value = artifacts[key];
          return (
            <ArtifactRenderer
              key={key}
              artifactKey={key}
              value={value}
              previewStyle={preview_style}
            />
          );
        })}
      </div>

      {show_intermediate && nodeOutputs && Object.keys(nodeOutputs).length > 0 && (
        <div data-testid="node-outputs" className={styles.nodeOutputsSection}>
          <div className={styles.nodeOutputsTitle}>Intermediate outputs</div>
          {Object.entries(nodeOutputs).map(([nodeKey, nodeVal]) => (
            <div key={nodeKey}>
              <span>{nodeKey}: </span>
              <span>{typeof nodeVal === "string" ? nodeVal : JSON.stringify(nodeVal)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
