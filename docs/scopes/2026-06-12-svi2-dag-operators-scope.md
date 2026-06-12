# Scope — svi2-pro real DAG (worker split vs instrument)

Goal: make the svi2-pro deployment **Workflow Graph** tab show a real multi-stage DAG that
**lights up live** during a render, instead of the current empty state.

## Findings (verified in code, 2026-06-12)

1. **Host generic run-engine is a placeholder.** `crates/nexus-run/src/engine.rs` topo-sorts nodes,
   emits `NodeScheduled/Started/Completed`, but `create_artifact_for_step` writes `b"placeholder"`
   and `_worker_for_op` is fetched-then-unused (L261). It does NOT invoke workers or run real ops.
2. **Extensions run their own workers.** svi2 renders monolithically in the Python worker
   (`svi2_video_worker`), one `svi2.video.render` operator (`operators/video_render.yaml`).
3. **svi2 emits its own telemetry**, not host node events: `rpc.py PROGRESS = "svi2.video.progress"`
   + `telemetry.py`. None carry a workflow `node_id`.
4. **The overlay consumes `NexusEvent{ node_id, status, progress }`** off `/api/v1/events`
   (`event_streams.ts` RunEvent). The deployment Graph tab is now fed live `nodeProgress`+`runId`
   (P0, commit `0c43f2d3`) — but only lights up for events whose `node_id` matches the graph nodes.
5. **`parse_workflow` requires `operator: String` on every node** (`nexus-workflow/parser.rs:45`).
   svi2's existing `workflows/svi2_render.yaml` is aspirational: `qwen_edit/stitch/interpolate/mux`
   have no operator and reference ops that don't exist → it would be rejected → never ingested.
6. **Workflow ingest is recipe-driven**: a recipe with `workflow_template: "workflows/x.yaml"`
   (`nexus-extension/recipe.rs:12`) makes `app.rs:770` read+parse+insert a `WorkflowRecord` stamped
   with the extension id; the module aggregator then resolves `module.workflow_id` from it.
7. svi2's worker stages map cleanly to modules already: anchor (`vae`/`text_encoder`),
   `qwen_edit`, diffusion (`pipeline_svi2`/`wan22`/`svi_chain`), stitch (`svi_chain`),
   interpolate (`interpolate`/`rife_torch`), mux (`ffmpeg_io`), optional `rtx_upscale`.

## The pivotal constraint

svi2 diffusion needs Wan2.2 DiT + VAE **resident in VRAM** and carries chain state (anchor latent,
rolling crossfade) across clips. Any approach where each stage is a **separately-scheduled worker
invocation** would reload models per node → unusable (minutes + VRAM thrash) and would break
identity-lock coherence (the whole reason svi2 exists). So the "graph" must not force process/model
boundaries between heavy stages.

## Options

### Option A — Declare + Instrument (RECOMMENDED)
Keep the monolithic render (models resident, coherence intact). Make the graph **show** + **light up**
by declaration + worker progress instrumentation — NOT by real host orchestration.

- A1. Author stage **operator contracts** (YAML IO-only, no new execution): `svi2.video.anchor`,
  `svi2.video.qwen_edit` (optional), `svi2.video.diffuse`, `svi2.video.stitch`,
  `svi2.video.interpolate`, `svi2.video.mux`. Register in manifest `operators:`.
- A2. Rewrite `workflows/svi2_render.yaml` so every node has a real `operator` + valid edges; keep
  `optional: true` on qwen_edit. Add `workflow_template: "workflows/svi2_render.yaml"` to the recipe.
  → graph now parses, ingests, and **renders** in the Graph tab.
- A3. **Worker→host node events.** Bridge `svi2.video.progress` to host `NexusEvent` carrying the
  matching `node_id` + `status`(running/completed/failed) + `progress` as the monolith crosses each
  stage boundary. Confirm the worker→host event channel (host adapter / RPC bridge) can stamp run_id
  + node_id. → graph **lights up per stage** live.
- A4. (stretch) per-node duration + VRAM into event fields → feeds future heatmap (P2).

Effort: **M**. Risk: **low**. No engine dependency, no model reload, no coherence risk.
Caveat: nodes are display+telemetry, not independently runnable. Edit/bypass per node is NOT real.

### Option B — True host-orchestrated operators (full split)
Each stage a real operator the host schedules; host emits node events natively.
Blocked by: (1) placeholder host engine must be built to actually invoke workers + pass artifacts;
(2) **model residency** — needs a persistent stateful worker session / model-server holding GPU state
across node calls; (3) large intermediate tensors (anchor latent, clip frames) passed as artifacts =
disk IO + serialization. Effort: **XL**, multi-spec. Risk: **high** (perf + coherence regression).
Not justified solely for the overlay.

### Option C — Hybrid (coarse split)
4 nodes where boundaries are cheap file artifacts: `prepare/anchor` → `render-core`
(diffusion+stitch, the model-resident heavy node) → `interpolate` → `mux/upscale`. With worker-emit
(A3) instead of host scheduling, this is Option A with fewer, truthful nodes. Good middle ground if
6 nodes feel dishonest given one process does the work.

## Recommendation
**Option A** (or C for fewer, more honest nodes). It delivers the user's goal — svi2 DAG that shows
and animates live per stage — at M effort with no architectural blockers and zero render-quality risk.
Reserve Option B for if/when the host generic engine becomes a real multi-worker orchestrator.

## Spike results (2026-06-12) — answered

**Q: Does anything light the overlay today? → NO (now fixed generically).**
`latestProgressByNode` required `e.status`, but the bus tags node events by snake_case `type`
(`node_started/node_progress/node_completed/node_failed`) with **no `status` field** — and
`subscribeEvents` casts the wire JSON straight to `RunEvent` with no transform. So the overlay was
built-but-dark for everyone. Fixed: `type → status` mapping in `latestProgressByNode` (commit
`153a0000`). Now any producer emitting `NexusEvent::Node*` drives the overlay; first beneficiary is
the host workflow-run engine.

**Q: Can the worker→host channel stamp node_id? → Bus YES, path NO.**
`NexusEvent` (`crates/nexus-events/src/types.rs`) has `NodeStarted/NodeProgress/NodeCompleted/
NodeFailed { run_id, node_id, … }`. BUT the svi2 shim (`host_adapter.rs`) only *subscribes* to worker
notifications — there is **no exposed capability for an extension run to publish NexusEvents to the
host bus**, and the worker emits per-CLIP notifications (`clip.started/step/completed`), not per-STAGE.

## A3 remaining work (revised — it's a host contract, not a wire-up)
1. **Host (generic, boundary-owned):** a capability for an extension run to publish
   `NexusEvent::Node{Started,Progress,Completed,Failed}{run_id, node_id}` to `/api/v1/events`. Keyed by
   run_id + node_id; no extension-specific logic in host code. This is the missing primitive.
2. **svi2 worker:** emit per-stage boundary markers (anchor→qwen→diffusion→stitch→interpolate→mux),
   not just per-clip — add a `stage`/`node` field to progress notifications in `pipeline_svi2.py`.
3. **svi2 shim:** map worker stage markers → host node events using the run's workflow node_ids.
Spec-sized. Don't fake it — needs the host primitive (1) first.

## Pre-work to confirm before building
- **Does ANY extension light the overlay today?** emotion-tts shows a graph (declared) but no per-node
  `NexusEvent` emission was found — the overlay may be universally dark. If so, A3 is the first real
  feed and should establish the worker→host node-event convention generically (host-side, reusable).
- Exact worker→host event path + whether it can stamp `node_id` (inspect svi2 host_adapter / RPC bridge
  and the host events ingestion onto `/api/v1/events`).
- Boundary check: stage operator contracts + workflow YAML live under `extensions/builtin/svi2-pro/`
  (extension-owned). The only host touch is the generic event bus (already generic). No host coupling.

## Task breakdown (Option A)
1. Confirm worker→host event channel can carry run_id+node_id+status (spike).  [S]
2. Stage operator YAMLs + manifest registration.                                [S]
3. Parseable `svi2_render.yaml` + recipe `workflow_template`.                    [S]
4. Worker stage-boundary emit → host node events (map progress → node_id).      [M]
5. Verify live: render, graph lights up stage-by-stage; screenshot.             [S, GPU]
6. (opt) duration/VRAM in event payload for future heatmap.                      [S]
