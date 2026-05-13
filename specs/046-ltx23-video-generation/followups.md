# Spec 046 — Follow-ups

| ID | Item | Phase | Notes |
|---|---|---|---|
| F1 | Tune restart-threshold values (N=6, frag>30%, free<2.5GB) from first-week telemetry | post P2 | Move from defaults to data-driven |
| F2 | Native looping sampler (Phase B continuity) | future spec | Higher peak VRAM, better continuity; only after external-segments is stable |
| F3 | ComfyUI integration as an alternative runtime stack | future spec | Only if user demand for graph-view workflows emerges |
| F4 | LTX 2.3 audio-track generation | future spec | Requires new model artifact + new pipeline |
| F5 | IC-LoRA / motion-track control | future spec | Phase B continuity |
| F6 | Multi-GPU / cloud-runtime execution | future spec | Out of host scope today |
| F7 | Privacy mode — prompt redaction in storage + logs | post P2 | Hook in privacy.rs |
| F8 | Story-beats editor (advanced UI) | post P2 | Optional advanced field |
| F9 | DAG view (read-only) of the rendered workflow | post P2 | Inspectability for advanced users |
| F10 | Benchmark cache for VRAM-risk estimator improvement | post P3 | Persist per-GPU measurements |
