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
          Fix the highlighted fields on the right to render a live preview.
        </div>
      ) : null}
      <div className={styles.stage}>
        {hasValidationErrors ? (
          <div className={styles.empty}>Preview paused — validation errors.</div>
        ) : (
          <RenderBoundary>
            <>{renderer(node, [])}</>
          </RenderBoundary>
        )}
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
          <strong>Preview couldn't render with the current prop values.</strong>
          <br />
          <span>
            {humanize(this.state.error)}
          </span>
          <br />
          <span style={{ opacity: 0.7 }}>Try adjusting the props on the right — the array shape or a prop's type likely doesn't match what the component expects.</span>
        </div>
      );
    }
    return this.props.children;
  }
}

function humanize(msg: string): string {
  if (/\.map is not a function/.test(msg)) {
    return "A prop expected an array (for `.map()`) but received a different type. Check any field that renders a list.";
  }
  if (/Cannot read propert(y|ies)/.test(msg)) {
    return "A prop referenced a nested field that isn't present. Verify object-shaped props have the expected keys.";
  }
  if (/is not iterable/.test(msg)) {
    return "A prop needed to be iterable (array/Set/Map) but wasn't.";
  }
  return msg;
}
