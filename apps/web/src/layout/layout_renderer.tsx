import type { LayoutDefinition, LayoutNode as LayoutNodeType } from "../api/client";
import { ExtensionCustomElement } from "../components/layout/extension_custom_element";
import { getComponentRenderer } from "./component_registry";
import * as styles from "./layout_renderer.css";

type LayoutRendererProps = {
  layout: LayoutDefinition;
};

export function LayoutRenderer({ layout }: LayoutRendererProps) {
  return (
    <div className={styles.rendererRoot}>
      <LayoutNodeRenderer node={layout.root} />
    </div>
  );
}

type LayoutNodeRendererProps = {
  node: LayoutNodeType;
};

function LayoutNodeRenderer({ node }: LayoutNodeRendererProps) {
  const renderer = getComponentRenderer(node.type);

  const children = (node.children ?? []).map((child, i) => (
    <LayoutNodeRenderer key={child.id ?? i} node={child} />
  ));

  if (renderer) {
    return <>{renderer(node, children)}</>;
  }

  if (isCustomElementTag(node.type)) {
    return (
      <ExtensionCustomElement tag={node.type} props={node.props ?? undefined}>
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
