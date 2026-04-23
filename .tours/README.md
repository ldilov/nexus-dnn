# Code Tours

Guided walkthroughs of the nexus-dnn codebase in [CodeTour](https://marketplace.visualstudio.com/items?itemName=vsls-contrib.codetour) format (`.tour` JSON files).

Open a `.tour` file in VS Code (or any CodeTour-compatible editor) and the reader is taken step-by-step through real files + line ranges with narrative explanations at each stop.

## Available tours

| File | Persona | Steps | Focus |
|------|---------|-------|-------|
| [`architect-full-stack.tour`](architect-full-stack.tour) | Software engineer / architect | 23 | End-to-end walkthrough of the host runtime + React UI, tracing a request from binary entrypoint through the extension contract bridge, the 10-phase install pipeline, the lease subsystem, the HTTP surface, and the frontend wiring. Grounded in spec 032 (the widest-surface-area feature). |

## For future agent sessions

Read `architect-full-stack.tour` first before making any non-trivial change. Each step carries four beats:
- **Situation** — what you're looking at.
- **Mechanism** — how it works.
- **Implication** — why it matters for this change.
- **Gotcha** — what a smart reader would miss.

Beyond the tour, the canonical entry points are:

- `.specify/memory/constitution.md` — the governing charter (13 principles, non-negotiable).
- `.claude/rules/host-extension-boundary.md` — per-file do/don't matrix for Principle XIII (the host ↔ extension boundary).
- `specs/<NNN>-<slug>/` — one folder per non-trivial feature (spec.md, plan.md, tasks.md, research.md, data-model.md, contracts/, quickstart.md, SESSION_CHECKPOINT.md). The spec folder is the contract; the code is the implementation. Note: `specs/` is globally gitignored — checkpoints and task files are local-only.
- `C:/Users/lazar/.claude/projects/D--Workspace-repos-nexus-dnn/memory/` — persistent agent memory. `MEMORY.md` is the index; individual `project_spec_<NNN>_progress.md` files carry per-spec state snapshots.

## Writing a new tour

Follow the CodeTour writing skill at `~/.claude/skills/code-tour/SKILL.md`. Keep the file path deterministic: `.tours/<persona>-<focus>.tour`. Always verify line anchors against the actual files before committing — tours that point at wrong lines are worse than no tours.
