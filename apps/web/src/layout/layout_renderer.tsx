import { useMemo, type ReactNode } from "react";
import type { LayoutDefinition, LayoutNode as LayoutNodeType } from "../api/client";
import { ExtensionCustomElement } from "../components/layout/extension_custom_element";
import { getComponentRenderer } from "./component_registry";
import { LayoutContext, type LayoutContextValue } from "./layout_context";
import * as styles from "./layout_renderer.css";

interface LayoutContextProviderProps {
  deploymentId?: string;
  children: ReactNode;
}

function LayoutContextProvider({ deploymentId, children }: LayoutContextProviderProps) {
  const value = useMemo<LayoutContextValue>(() => ({ deploymentId }), [deploymentId]);
  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
}

type LayoutRendererProps = {
  layout: LayoutDefinition;
  /**
   * Attributes injected onto the layout's ROOT custom element only.
   * Used by the deployment-detail page to pass `deployment-id` so the
   * mounted extension bundle can route to its per-deployment views
   * (e.g. `/<id>/recipe`) instead of falling back to its index
   * landing page.
   */
  rootAttrs?: Record<string, string>;
  /**
   * Callback that receives the underlying ROOT custom element node once
   * mounted (and `null` on unmount). The deployment-detail shell uses
   * this to dispatch the per-extension action contract — see
   * `apps/web/src/types/extension_actions.ts`.
   */
  rootElementRef?: (el: HTMLElement | null) => void;
  /**
   * Deployment context exposed to native registry renderers via
   * `useLayoutContext()`. Mirrors the `deployment-id` attribute carried
   * to extension custom elements through `rootAttrs`.
   */
  deploymentId?: string;
};

export function LayoutRenderer({ layout, rootAttrs, rootElementRef, deploymentId }: LayoutRendererProps) {
  const resolvedDeploymentId = deploymentId ?? rootAttrs?.["deployment-id"];
  return (
    <LayoutContextProvider deploymentId={resolvedDeploymentId}>
      <div className={styles.rendererRoot}>
        <LayoutNodeRenderer
          node={layout.root}
          injectAttrs={rootAttrs}
          elementRef={rootElementRef}
        />
      </div>
    </LayoutContextProvider>
  );
}

type LayoutNodeRendererProps = {
  node: LayoutNodeType;
  /**
   * Extra attributes merged onto this node's props if it's a custom
   * element. Only the root node receives these — children render with
   * their own YAML-declared props untouched.
   */
  injectAttrs?: Record<string, string>;
  /**
   * Forwarded to the root custom element so callers (e.g. the deployment
   * shell) can attach event listeners. Only the root node receives this.
   */
  elementRef?: (el: HTMLElement | null) => void;
};

function LayoutNodeRenderer({ node, injectAttrs, elementRef }: LayoutNodeRendererProps) {
  const renderer = getComponentRenderer(node.type);

  const children = (node.children ?? []).map((child, i) => (
    <LayoutNodeRenderer key={child.id ?? i} node={child} />
  ));

  if (renderer) {
    return <>{renderer(node, children)}</>;
  }

  if (isCustomElementTag(node.type)) {
    const merged: Record<string, unknown> = {
      ...(node.props ?? {}),
      ...(injectAttrs ?? {}),
    };
    return (
      <ExtensionCustomElement tag={node.type} props={merged} elementRef={elementRef}>
        {children}
      </ExtensionCustomElement>
    );
  }

  return <UnknownComponent type={node.type} />;
}

function isCustomElementTag(type: string): boolean {
  const hyphenIdx = type.indexOf("-");
  if (hyphenIdx <= 0 || hyphenIdx === type.length - 1) return false;
  return /^[a-z][a-z0-9]*(-[a-z0-9]+)+$/.test(type);
}

function UnknownComponent({ type }: { type: string }) {
  return (
    <div className={styles.unknownComponent}>
      Unknown component: {type}
    </div>
  );
}

export { LayoutNodeRenderer };
