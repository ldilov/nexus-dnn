import { WORKFLOW_STAGES } from "../src/services/generate_events";
import type { GenerateParams, GenerationJob, GraftParams } from "../src/services/types";

const PREFIX = "/api/v1/extensions/nexus.3d.faceavatar";

let uploadCounter = 0;
let jobCounter = 0;

let sampleJobs: GenerationJob[] = [
  {
    id: "job-demo-0001",
    kind: "generate",
    inputImageRef: "art-input-01",
    baseMeshRef: null,
    params: { seed: 7, expression: "neutral", texture: true },
    status: "succeeded",
    glbRef: "art-glb-0001",
    metadata: {
      attention_backend: "flash",
      compute_cap: "sm_121",
      mesh: { vertices: 491_220, faces: 982_104 },
      textured: true,
      identity_score: 0.84,
      stage_timings: { fit: 12_400, texture: 18_900, glb: 6_900 },
    },
    errorCode: null,
    errorMessage: null,
    createdAt: new Date(Date.now() - 3600_000).toISOString(),
    updatedAt: new Date(Date.now() - 3400_000).toISOString(),
  },
  {
    id: "job-demo-0002",
    kind: "graft",
    inputImageRef: "art-input-02",
    baseMeshRef: "art-glb-0001",
    params: { seed: 0, seam: "neck", keep_hair: true },
    status: "failed",
    glbRef: null,
    metadata: null,
    errorCode: 73,
    errorMessage: "CUDA out of memory in seam weld",
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

function buildTimeline(stages: readonly string[], textured: boolean): MockFrame[] {
  const total = 10;
  const frames: MockFrame[] = [];
  let elapsed = 0;
  const push = (data: string, gap: number) => {
    elapsed += gap;
    frames.push({ data, delayMs: elapsed });
  };

  stages.forEach((stage) => {
    const steps = stage === "fit" ? total : 4;
    for (let step = 1; step <= steps; step += 1) {
      push(jrpc("faceavatar.generate.progress", { stage, step, total: steps }), 120);
    }
  });

  // Emit an out-of-spec frame to prove the client ignores unknown methods.
  push(jrpc("runtime.memory_stats", { vram_peak_gib: 9.2 }), 60);

  push(
    jrpc("faceavatar.generate.done", {
      glbRef: "art-glb-mock",
      metadata: {
        attention_backend: "flash",
        compute_cap: "sm_121",
        mesh: { vertices: 512_000, faces: 1_000_000 },
        textured,
        identity_score: 0.88,
        stage_timings: { fit: 13_100, texture: 19_500, glb: 7_300 },
        sha256: "ab12cd34ef56aa00",
      },
    }),
    300,
  );
  return frames;
}

function generateTimeline(params: GenerateParams): MockFrame[] {
  const stages = WORKFLOW_STAGES.filter(
    (s) => (s !== "texture" || params.texture) && s !== "align" && s !== "weld",
  );
  return buildTimeline(stages, Boolean(params.texture));
}

function graftTimeline(params: GraftParams): MockFrame[] {
  const stages = WORKFLOW_STAGES.filter((s) => s !== "texture" || params.texture_blend);
  return buildTimeline(stages, params.texture_blend ?? true);
}

class MockEventSource {
  onmessage: ((ev: MessageEvent) => void) | null = null;
  onerror: ((ev: Event) => void) | null = null;
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor(url: string) {
    const frames = pendingTimelines.get(url) ?? [];
    pendingTimelines.delete(url);
    for (const frame of frames) {
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

  if (path === "/generate/jobs" && method === "GET") {
    return json({ jobs: sampleJobs });
  }
  if (path.startsWith("/generate/jobs/") && path.endsWith("/cancel")) {
    return json({ status: "cancelled" });
  }
  if (path.startsWith("/generate/jobs/") && method === "DELETE") {
    const id = decodeURIComponent(path.slice("/generate/jobs/".length));
    sampleJobs = sampleJobs.filter((j) => j.id !== id);
    return json({ status: "deleted" });
  }
  if (path.startsWith("/generate/jobs/") && method === "GET") {
    return json(sampleJobs[0]);
  }
  if (path === "/generate/start" && method === "POST") {
    const body = JSON.parse(String(init?.body ?? "{}")) as {
      image?: string;
      params: GenerateParams;
    };
    jobCounter += 1;
    const jobId = `mock-job-${jobCounter}`;
    pendingTimelines.set(`${PREFIX}/generate/jobs/${jobId}/events`, generateTimeline(body.params));
    return json({ jobId });
  }
  if (path === "/graft/start" && method === "POST") {
    const body = JSON.parse(String(init?.body ?? "{}")) as {
      base_mesh?: string;
      image?: string;
      params: GraftParams;
    };
    jobCounter += 1;
    const jobId = `mock-graft-${jobCounter}`;
    pendingTimelines.set(`${PREFIX}/generate/jobs/${jobId}/events`, graftTimeline(body.params));
    return json({ jobId });
  }
  if (path === "/uploads" && method === "POST") {
    uploadCounter += 1;
    return json({ ref: `mock-upload-${uploadCounter}` });
  }
  if (path.startsWith("/media/") && method === "HEAD") {
    return new Response(null, { status: 200 });
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
