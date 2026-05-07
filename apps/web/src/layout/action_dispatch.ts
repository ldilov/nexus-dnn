import { toast } from "sonner";

const API_BASE = "/api/v1";

async function postJson(path: string, body: unknown): Promise<unknown> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function newLocalLlmThread(): Promise<void> {
  try {
    const payload = (await postJson(
      // audit-allow: boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
      "/extensions/local-llm/chat/threads",
      {},
    )) as { data?: { id?: string; title?: string } };
    const id = payload?.data?.id;
    const title = payload?.data?.title ?? "new session";
    toast.success(`Created ${title}`);
    if (id) {
      window.dispatchEvent(
        // audit-allow: boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
        new CustomEvent("local-llm/thread:created", { detail: { id, title } }),
      );
      window.dispatchEvent(
        // audit-allow: boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
        new CustomEvent("local-llm/session.state.changed", {
          detail: { id, cause: "created" },
        }),
      );
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : "request failed";
    toast.error(`Couldn't create session: ${msg}`);
  }
}

function openModelLoadDialog(): void {
  // audit-allow: boundary — extension-defined window-event channel for opening the load dialog
  window.dispatchEvent(new CustomEvent("local-llm/model-load-dialog:open"));
}

export async function dispatchLayoutAction(action: string): Promise<void> {
  switch (action) {
    case "llm.new_thread":
      await newLocalLlmThread();
      return;
    case "llm.open_model_browser":
      openModelLoadDialog();
      return;
    default:
      toast.message(`Unknown action: ${action}`);
  }
}
