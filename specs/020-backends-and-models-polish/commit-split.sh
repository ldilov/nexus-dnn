#!/usr/bin/env bash
# Spec 020 — commit-split script (US1 + US2 + US3 + US4 combined).
#
# From `main` with a dirty working tree that mixes session-19 tail work and
# spec-020 changes, this script:
#
#   1. Cuts branch `020-backends-and-models-polish` from main.
#   2. Stages ONLY the files that belong to spec 020 (all 4 user stories +
#      contract tests + polish), skipping every session-19 file.
#   3. Commits with a structured message.
#   4. Switches back to main so the remaining session-19 files can be
#      committed separately by the operator.
#
# READ BEFORE RUNNING. Uses `git add <explicit path>` only — never `-A` or
# `.` — so secrets / unrelated files cannot slip in.
# Does NOT push.
#
# If `git add` errors for a path that was never touched in your tree,
# comment out that line and rerun. The list is additive — a missing file
# is not a correctness bug, it just means nothing of spec 020 touched it.

set -euo pipefail

cd "$(git rev-parse --show-toplevel)"

if [[ "$(git branch --show-current)" != "main" ]]; then
  echo "Expected to be on main; currently on $(git branch --show-current)"
  exit 1
fi

echo "Step 1/4: cut feature branch 020-backends-and-models-polish"
git checkout -b 020-backends-and-models-polish

echo "Step 2/4: stage spec 020 files (US1 + US2 + US3 + US4 + polish)"

# Spec artifacts
git add specs/020-backends-and-models-polish/

# Root + workspace hygiene
git add README.md
git add Cargo.lock

# --- Rust: nexus-api ---
git add crates/nexus-api/Cargo.toml
git add crates/nexus-api/README.md
git add crates/nexus-api/src/handlers/backends/catalog.rs
git add crates/nexus-api/src/handlers/backends/host_models.rs
git add crates/nexus-api/src/handlers/backends/mod.rs
git add crates/nexus-api/src/router.rs
git add crates/nexus-api/tests/backends_variants_contract.rs
git add crates/nexus-api/tests/host_model_dependents_contract.rs
git add crates/nexus-api/tests/host_models_install_contract.rs

# --- Rust: nexus-backend-runtimes ---
git add crates/nexus-backend-runtimes/src/adapter.rs
git add crates/nexus-backend-runtimes/src/error.rs
git add crates/nexus-backend-runtimes/src/llamacpp/mod.rs
git add crates/nexus-backend-runtimes/src/manifest/mod.rs
git add crates/nexus-backend-runtimes/src/manifest/variants.rs

# --- Rust: nexus-models-store ---
git add crates/nexus-models-store/src/leases.rs
git add crates/nexus-models-store/src/lib.rs

# --- Frontend: design tokens ---
git add apps/web/src/theme/contract.css.ts
git add apps/web/src/theme/dark.css.ts

# --- Frontend: shared infrastructure ---
git add apps/web/package.json
git add apps/web/scripts/scan-noop-handlers.mjs
git add apps/web/src/api/client.ts
git add apps/web/src/hooks/use_api.ts

# --- Frontend: US1 (variant picker) ---
git add apps/web/src/backends/hooks/use_install_stream.ts
git add apps/web/src/backends/variant_picker_drawer.css.ts
git add apps/web/src/backends/variant_picker_drawer.tsx

# --- Frontend: US2 (detail drawer) ---
git add apps/web/src/backends/backend_detail_drawer.css.ts
git add apps/web/src/backends/backend_detail_drawer.tsx
git add apps/web/src/views/backends_view.tsx

# --- Frontend: US3 (HF panel on /models) ---
git add apps/web/src/models/hf_search_panel.css.ts
git add apps/web/src/models/hf_search_panel.tsx
git add apps/web/src/views/models_view.tsx

# --- Frontend: US4 (DAG draft nodes) ---
git add apps/web/src/hooks/use_draft_nodes.ts
git add apps/web/src/nodes/operator_node.css.ts
git add apps/web/src/nodes/operator_node.tsx
git add apps/web/src/nodes/types.ts
git add apps/web/src/views/graph_view.css.ts
git add apps/web/src/views/graph_view.tsx

echo "Step 3/4: commit spec 020"
git commit -m "$(cat <<'EOF'
feat(backends+models): spec 020 — variant picker, detail drawer, HF panel, DAG drafts

User Story 1 — Install flow (P1, FR-Q1-01..06)
- New GET /api/v1/llm/backends/{id}/variants projects VersionManifest
  assets via MachineDescriptor into per-variant rows with a recommended
  flag. Frontend VariantPickerDrawer (glassmorphic, Spectral Graphite)
  → POST /install → existing InstallModal via new use_install_stream
  WS adapter. All noop handlers removed from backends_view.tsx; SC-Q1-02
  enforced via new pnpm scan:noop.

User Story 2 — View Details drawer (P2, FR-Q1-04..06)
- New BackendDetailDrawer renders full install metadata (JetBrains Mono
  values), mounted LogConsole, inline validation banner, and a state-
  matrix action row (Validate / Repair / Uninstall / Close). Repair CTA
  re-opens VariantPickerDrawer with preselected combo. Uninstall confirm
  → DELETE /api/v1/backends/{installId} → SWR mutate("host-backends").

User Story 3 — HF search on /models (P1, FR-Q3-01..06)
- New GET /api/v1/host-models/{install_id}/dependents returns distinct
  leasing extensions (FR-Q3-06). New POST /api/v1/host-models returns
  501 host_install_pending with a structured envelope pointing to the
  follow-up pipeline wiring slice — stable contract so the frontend
  handles it as "coming soon". Frontend HfSearchPanel reuses hfSearch +
  300 ms debounce + format/license filters; already-installed dedup
  detection via already_installed_ids; install button hits the real 501
  endpoint. ModelsView lazily fetches dependents per row via
  IntersectionObserver and renders a "Shared by N extension(s)" row
  (FR-Q3-06, SC-Q3-03).

User Story 4 — DAG draft nodes (P3, FR-Q4-01..05)
- Pure-frontend useDraftNodes hook + computePromotions pure helper.
  Newly-dropped operator nodes start as draft (orange dashed outline
  via .nodeDraft + DRAFT chip in header), required-input validation
  suppressed. Auto-promotes to live when all required ports have an
  incoming edge OR a literal value. Live nodes never demote (FR-Q4-03).
  Save blocks when drafts remain, with a sonner toast listing ids
  (FR-Q4-04). Right-click "Mark all N draft nodes live" context item.

Governance (Principle VI + VIII)
- 4 new contract tests variants, 3 dependents, 4 install — all green.
- 5 new unit tests on the project_variants projection helper.
- crates/nexus-api/README.md documents the new /variants route.
- Root README.md adds a "Recent specs" section.
- apps/web/src/theme/{contract,dark}.css.ts grow scrim + shadowElevation
  tokens so drawer CSS doesn't leak raw rgba literals.

Full cargo test -p nexus-api sweep: 143 tests pass, 0 fail.
pnpm tsc --noEmit + scan:theme + scan:noop all clean.

Follow-up: host-install pipeline (ModelStoreCtx wiring into AppState +
HF-probe-driven file resolution) documented on the install_host_model
handler. Out of scope here.
EOF
)"

echo "Step 4/4: switch back to main for the session-19 remainder"
git checkout main

cat <<'NOTE'

Branch 020-backends-and-models-polish created with one structured commit.

Still on main: the ~25 files from the session-19 tail (modules_view,
blueprint_view, deployment_detail_placeholder, draft_view, etc.) plus
the specs/019-extension-modules/plan.md edit. Review with `git status`
and commit them as `feat(web): spec-019 tail ...` on main or on a
separate branch.

DO NOT merge main into 020-* until the session-19 work lands — it
would cross-contaminate the diff.
NOTE
