import presetCatalog from "../../data/render_presets.json";
import type {
  ExtensionSettings,
  PresetCatalog,
  RenderJob,
  RenderParams,
} from "../src/services/types";
import { DEFAULT_SETTINGS } from "../src/domain/settings_defaults";

const PREFIX = "/api/v1/extensions/nexus.video.svi2-pro";
const SAMPLE_OUTPUT = "/workspace/svi2-pro/sample/long_take_demo.mp4";

let settings: ExtensionSettings = { ...DEFAULT_SETTINGS, modelsDir: "D:/svi2_models", outputDir: "D:/svi2_out" };
let uploadCounter = 0;

const sampleJobs: RenderJob[] = [
  {
    id: "job-demo-0001",
    presetId: "svi-canonical",
    params: { ref_image_path: "/uploads/nun.png", prompts: ["a slow dolly toward the figure"] },
    status: "succeeded",
    outputPath: SAMPLE_OUTPUT,
    renderReport: { frames: 325, duration_seconds: 1224.5, vram_peak_gib: 11.4, sha256: "5370c6e8aa" },
    errorCode: null,
    errorMessage: null,
    createdAt: new Date(Date.now() - 3600_000).toISOString(),
    updatedAt: new Date(Date.now() - 2400_000).toISOString(),
  },
  {
    id: "job-demo-0002",
    presetId: "flf2v-morph-lowvram",
    params: { ref_image_path: "/uploads/face.png", prompts: ["gradual demonic transformation"] },
    status: "failed",
    outputPath: null,
    renderReport: null,
    errorCode: 73,
    errorMessage: "CUDA out of memory at VAE decode",
    createdAt: new Date(Date.now() - 7200_000).toISOString(),
    updatedAt: new Date(Date.now() - 7000_000).toISOString(),
  },
];

interface MockFrame {
  data: string;
  delayMs: number;
}

function jrpc(method: string, params: unknown): string {
  return JSON.stringify({ method, params });
}

function buildRenderTimeline(params: RenderParams): MockFrame[] {
  const numClips = params.num_clips ?? 3;
  const totalSteps = Math.min(params.num_inference_steps ?? 50, 12);
  const frames: MockFrame[] = [];
  let elapsed = 0;
  const push = (data: string, gap: number) => {
    elapsed += gap;
    frames.push({ data, delayMs: elapsed });
  };

  push(jrpc("svi2.video.progress", { fraction: 0.02, stage: "anchor" }), 200);
  for (let clip = 0; clip < numClips; clip += 1) {
    push(jrpc("svi2.video.clip.started", { clip_index: clip, num_clips: numClips }), 250);
    for (let step = 1; step <= totalSteps; step += 1) {
      const progress = (clip * totalSteps + step) / (numClips * totalSteps);
      const wobble = Math.sin((clip * totalSteps + step) / 2.5) * 2.2;
      push(
        jrpc("svi2.video.clip.step", {
          clip_index: clip,
          step,
          total_steps: totalSteps,
          seconds_per_step: 75 - 30 * progress + wobble,
        }),
        90,
      );
      const fraction = (clip + step / totalSteps) / numClips;
      push(jrpc("svi2.video.progress", { fraction: fraction * 0.92 + 0.02 }), 0);
    }
    push(jrpc("runtime.memory_stats", { vram_peak_gib: 9.6 + clip * 0.4 }), 60);
    push(jrpc("svi2.video.clip.completed", { clip_index: clip, num_clips: numClips }), 120);
  }
  push(jrpc("svi2.video.progress", { fraction: 0.97, stage: "interpolate" }), 300);
  push(
    jrpc("svi2.video.done", {
      output_path: SAMPLE_OUTPUT,
      render_report: {
        frames: 325,
        duration_seconds: 1224.5,
        vram_peak_gib: 11.4,
        sha256: "5370c6e8aabbccdd",
        resolution_warning: null,
      },
    }),
    260,
  );
  return frames;
}

class MockEventSource {
  onmessage: ((ev: MessageEvent) => void) | null = null;
  onerror: ((ev: Event) => void) | null = null;
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor(url: string) {
    const params = pendingTimelines.get(url) ?? [];
    pendingTimelines.delete(url);
    for (const frame of params) {
      const timer = setTimeout(() => {
        this.onmessage?.(new MessageEvent("message", { data: frame.data }));
      }, frame.delayMs);
      this.timers.push(timer);
    }
  }

  close(): void {
    for (const t of this.timers) clearTimeout(t);
    this.timers = [];
  }
}

const pendingTimelines = new Map<string, MockFrame[]>();
let jobCounter = 0;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function handle(url: string, init: RequestInit | undefined): Promise<Response | null> {
  if (!url.startsWith(PREFIX)) return null;
  const path = url.slice(PREFIX.length).split("?")[0] ?? "";
  const method = (init?.method ?? "GET").toUpperCase();

  if (path === "/presets" && method === "GET") {
    return json(presetCatalog as PresetCatalog);
  }
  if (path === "/settings" && method === "GET") {
    return json(settings);
  }
  if (path === "/settings" && method === "PUT") {
    settings = JSON.parse(String(init?.body ?? "{}")) as ExtensionSettings;
    return json(settings);
  }
  if (path === "/render/jobs" && method === "GET") {
    return json({ jobs: sampleJobs });
  }
  if (path.startsWith("/render/jobs/") && path.endsWith("/cancel")) {
    return json({ status: "cancelled" });
  }
  if (path.startsWith("/render/jobs/") && method === "GET") {
    return json(sampleJobs[0]);
  }
  if (path === "/render/start" && method === "POST") {
    const body = JSON.parse(String(init?.body ?? "{}")) as { params: RenderParams };
    jobCounter += 1;
    const jobId = `mock-job-${jobCounter}`;
    pendingTimelines.set(`${PREFIX}/render/jobs/${jobId}/events`, buildRenderTimeline(body.params));
    return json({ jobId });
  }
  if (path === "/uploads" && method === "POST") {
    uploadCounter += 1;
    return json({ path: `/workspace/uploads/mock-${uploadCounter}.png` });
  }
  return json({ category: "not_found", message: `mock has no route for ${method} ${path}` }, 404);
}

export function installMockBackend(): void {
  const realFetch = globalThis.fetch.bind(globalThis);
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = typeof input === "string" ? input : input.toString();
    const handled = await handle(url, init);
    if (handled) return handled;
    return realFetch(input as RequestInfo, init);
  }) as typeof fetch;

  globalThis.EventSource = MockEventSource as unknown as typeof EventSource;
}
