import type { LayoutDefinition, LayoutNode as LayoutNodeType } from "../api/client";
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

  if (!renderer) {
    return <UnknownComponent type={node.type} />;
  }

  const children = (node.children ?? []).map((child, i) => (
    <LayoutNodeRenderer key={child.id ?? i} node={child} />
  ));

  return <>{renderer(node, children)}</>;
}

function UnknownComponent({ type }: { type: string }) {
  return (
    <div className={styles.unknownComponent}>
      Unknown component: {type}
    </div>
  );
}

export { LayoutNodeRenderer };
