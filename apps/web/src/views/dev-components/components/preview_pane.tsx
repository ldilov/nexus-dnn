import { Component, type ReactNode } from "react";
import type { LayoutNode } from "../../../services/api_client";
import type { ComponentMetadata } from "../../../services/ui_catalog";
import { getComponentRenderer } from "../../../layout/component_registry";
import * as styles from "./preview_pane.css";

export interface PreviewPaneProps {
  metadata: ComponentMetadata | null;
  propValues: Record<string, unknown>;
  hasValidationErrors: boolean;
}

export function PreviewPane({
  metadata,
  propValues,
  hasValidationErrors,
}: PreviewPaneProps) {
  if (!metadata) {
    return (
      <div className={styles.empty}>
        Pick a component from the catalog to preview it here.
      </div>
    );
  }

  const renderer = getComponentRenderer(metadata.name);
  if (!renderer) {
    return (
      <div className={styles.error}>
        No registered renderer for <code>{metadata.name}</code>. The catalog
        publishes metadata but no React component is registered on the client.
      </div>
    );
  }

  const node: LayoutNode = {
    type: metadata.name,
    props: propValues,
  };

  return (
    <div className={styles.root} aria-label={`Preview of ${metadata.name}`}>
      {hasValidationErrors ? (
        <div className={styles.warn} role="status">
          Preview is using the last valid values. Fix the highlighted fields to
          update.
        </div>
      ) : null}
      <div className={styles.stage}>
        <RenderBoundary>
          <>{renderer(node, [])}</>
        </RenderBoundary>
      </div>
    </div>
  );
}

interface RenderBoundaryState {
  error: string | null;
}

class RenderBoundary extends Component<
  { children: ReactNode },
  RenderBoundaryState
> {
  state: RenderBoundaryState = { error: null };

  static getDerivedStateFromError(err: unknown): RenderBoundaryState {
    return { error: err instanceof Error ? err.message : String(err) };
  }

  override componentDidUpdate(prevProps: { children: ReactNode }) {
    if (prevProps.children !== this.props.children && this.state.error) {
      this.setState({ error: null });
    }
  }

  override render() {
    if (this.state.error) {
      return (
        <div className={styles.error} role="alert">
          Renderer threw: {this.state.error}
        </div>
      );
    }
    return this.props.children;
  }
}
