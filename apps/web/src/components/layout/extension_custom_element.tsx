import { Component, createElement, type ReactNode } from "react";
import {
  LoadFailedError,
  RegisterFailedError,
  UnknownTagError,
  isExtensionUiError,
  loadAndRegister,
  type ImportModule,
} from "../../services/extension_ui";
import * as styles from "./extension_custom_element.css";

type FailureReason =
  | "unknown_tag"
  | "load_failed"
  | "register_failed"
  | "render_failed";

interface FailureState {
  reason: FailureReason;
  extension_id: string | null;
  detail: string;
}

interface ExtensionCustomElementProps {
  tag: string;
  props?: Record<string, unknown>;
  children?: ReactNode;
  importer?: ImportModule;
}

interface ExtensionCustomElementState {
  status: "loading" | "ready" | "failed";
  failure: FailureState | null;
}

export class ExtensionCustomElement extends Component<
  ExtensionCustomElementProps,
  ExtensionCustomElementState
> {
  private cancelled = false;

  constructor(props: ExtensionCustomElementProps) {
    super(props);
    this.state = { status: "loading", failure: null };
  }

  override componentDidMount() {
    this.cancelled = false;
    void this.register();
  }

  override componentDidUpdate(prevProps: ExtensionCustomElementProps) {
    if (prevProps.tag !== this.props.tag) {
      this.cancelled = false;
      this.setState({ status: "loading", failure: null }, () => {
        void this.register();
      });
    }
  }

  override componentWillUnmount() {
    this.cancelled = true;
  }

  override componentDidCatch(err: unknown) {
    if (this.cancelled) return;
    this.setState({
      status: "failed",
      failure: {
        reason: "render_failed",
        extension_id: null,
        detail: err instanceof Error ? err.message : String(err),
      },
    });
  }

  private async register() {
    const { tag, importer } = this.props;
    try {
      await loadAndRegister(tag, importer);
      if (!this.cancelled) {
        this.setState({ status: "ready", failure: null });
      }
    } catch (err) {
      if (this.cancelled) return;
      this.setState({ status: "failed", failure: toFailure(err) });
    }
  }

  override render() {
    const { tag, props, children } = this.props;
    if (this.state.status === "failed" && this.state.failure) {
      return <ExtensionUiFailure tag={tag} failure={this.state.failure} />;
    }
    if (this.state.status === "loading") {
      return (
        <div className={styles.loading} role="status" aria-live="polite">
          loading {tag}…
        </div>
      );
    }
    return createElement(tag, toAttrs(props), children);
  }
}

function toFailure(err: unknown): FailureState {
  if (err instanceof UnknownTagError) {
    return { reason: "unknown_tag", extension_id: null, detail: err.message };
  }
  if (err instanceof LoadFailedError) {
    return {
      reason: "load_failed",
      extension_id: err.extension_id,
      detail: err.message,
    };
  }
  if (err instanceof RegisterFailedError) {
    return {
      reason: "register_failed",
      extension_id: err.extension_id,
      detail: err.message,
    };
  }
  if (isExtensionUiError(err)) {
    return {
      reason: err.reason,
      extension_id: err.extension_id,
      detail: err.message,
    };
  }
  return {
    reason: "render_failed",
    extension_id: null,
    detail: err instanceof Error ? err.message : String(err),
  };
}

function toAttrs(props?: Record<string, unknown>): Record<string, unknown> {
  if (!props) return {};
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(props)) {
    if (v === null || v === undefined) continue;
    if (typeof v === "boolean") {
      if (v) out[k] = "";
      continue;
    }
    if (typeof v === "string" || typeof v === "number") {
      out[k] = String(v);
      continue;
    }
    out[k] = JSON.stringify(v);
  }
  return out;
}

interface ExtensionUiFailureProps {
  tag: string;
  failure: FailureState;
}

export function ExtensionUiFailure({ tag, failure }: ExtensionUiFailureProps) {
  return (
    <div
      className={styles.failure}
      role="alert"
      data-testid="extension-ui-failure"
      data-tag={tag}
      data-reason={failure.reason}
      data-extension-id={failure.extension_id ?? ""}
    >
      <div className={styles.failureTitle}>Extension UI failed</div>
      <div className={styles.failureMeta}>
        <span>tag: {tag}</span>
        {failure.extension_id ? <span>extension: {failure.extension_id}</span> : null}
        <span>reason: {failure.reason}</span>
      </div>
      <div className={styles.failureDetail}>{failure.detail}</div>
    </div>
  );
}
