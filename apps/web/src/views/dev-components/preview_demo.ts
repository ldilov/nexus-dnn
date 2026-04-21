import type { LayoutNode } from "../../services/api_client";
import type { ComponentMetadata } from "../../services/ui_catalog";

/**
 * Augments the playground preview with synthetic children for container
 * components and per-component notes for surfaces that normally need live
 * backend data. Prop values come from the user's editor state (seeded by
 * the schema's `default` keyword), not from this file.
 */
export function buildPreviewNode(
  metadata: ComponentMetadata,
  userProps: Record<string, unknown>,
): { node: LayoutNode; children: LayoutNode[]; hint: string | null } {
  const node: LayoutNode = { type: metadata.name, props: userProps };
  const children = demoChildrenFor(metadata.name);
  const hint = DATA_BACKED_HINT[metadata.name] ?? null;
  return { node, children, hint };
}

const DATA_BACKED_HINT: Record<string, string> = {
  thread_list:
    "Thread list normally fetches /api/v1/extensions/local-llm/chat/threads. Install the chat extension to see live threads.",
  model_selector:
    "Model selector binds to the host model registry. Load a model to see live choices.",
  generation_settings_form:
    "Generation settings form binds to the host's runtime parameter store. Load a model to populate the fields.",
  models_panel:
    "Models panel fetches the host model store for the given extension. Install models to see live content.",
};

function demoChildrenFor(name: string): LayoutNode[] {
  switch (name) {
    case "split_panel":
      return [
        demoPanel("Left pane", "This is the first child."),
        demoPanel("Right pane", "This is the second child."),
      ];
    case "tabs":
      return [
        demoPanel("Overview content", "Children render in tab order."),
        demoPanel("Settings content", null),
        demoPanel("Advanced content", null),
      ];
    case "stack":
      return [
        demoPanel("Top row", null),
        demoPanel("Middle row", null),
        demoPanel("Bottom row", null),
      ];
    case "card":
      return [
        {
          type: "markdown_view",
          props: {
            content:
              "Card bodies render whatever you nest inside them. Here's a `markdown_view`.",
          },
        },
      ];
    case "workspace_shell":
      return [
        {
          type: "workspace_drawer",
          props: { id: "nav", title: "Navigation", width: 220 },
          children: [
            {
              type: "list",
              props: {
                items: [
                  { id: "home", label: "Home" },
                  { id: "models", label: "Models" },
                  { id: "runs", label: "Runs" },
                ],
                selectable: true,
              },
            },
          ],
        },
        {
          type: "workspace_content",
          children: [
            demoPanel("Main content", "The workspace shell's content area."),
          ],
        },
      ];
    case "workspace_drawer":
    case "workspace_content":
      return [demoPanel("Slot body", null)];
    case "form":
      return [];
    default:
      return [];
  }
}

function demoPanel(title: string, body: string | null): LayoutNode {
  return {
    type: "card",
    props: { title, variant: "outlined" },
    children: body
      ? [{ type: "markdown_view", props: { content: body } }]
      : [],
  };
}
