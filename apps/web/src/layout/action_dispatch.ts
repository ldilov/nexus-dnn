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
      "/extensions/local-llm/chat/threads",
      {},
    )) as { data?: { id?: string; title?: string } };
    const id = payload?.data?.id;
    const title = payload?.data?.title ?? "new session";
    toast.success(`Created ${title}`);
    if (id) {
      window.dispatchEvent(
        new CustomEvent("local-llm/thread:created", { detail: { id, title } }),
      );
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : "request failed";
    toast.error(`Couldn't create session: ${msg}`);
  }
}

function openModelPicker(): void {
  window.dispatchEvent(new CustomEvent("local-llm/model-picker:open"));
  toast.message("Choose Model — picker wiring coming in US3");
}

export async function dispatchLayoutAction(action: string): Promise<void> {
  switch (action) {
    case "llm.new_thread":
      await newLocalLlmThread();
      return;
    case "llm.open_model_browser":
      openModelPicker();
      return;
    default:
      toast.message(`Unknown action: ${action}`);
  }
}
