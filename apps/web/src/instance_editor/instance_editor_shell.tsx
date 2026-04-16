import { useCallback, useEffect, useMemo, useState } from "react";
import { materializeDraft, type MaterializeResult } from "../api/client";
import { draftStorageKey, isDraftUuid } from "../modules/draft/draft_uuid";
import * as s from "./instance_editor_shell.css";

type TabId = "recipe" | "stage" | "graph" | "trace";

const TABS: readonly { id: TabId; label: string }[] = [
  { id: "recipe", label: "Recipe" },
  { id: "stage", label: "Stage" },
  { id: "graph", label: "Graph" },
  { id: "trace", label: "Trace" },
];

interface InstanceEditorProps {
  deploymentId?: string;
  draftUuid?: string;
  onNavigate: (hash: string) => void;
}

type DraftPayload = {
  uuid: string;
  display_name: string;
  workflow_payload: unknown;
  created_at: string;
};

type Mode =
  | { kind: "viewing-current"; deploymentId: string }
  | { kind: "viewing-historic"; deploymentId: string; revisionId: string }
  | { kind: "draft"; uuid: string; payload: DraftPayload }
  | { kind: "error"; message: string };

const DRAFT_SIZE_CAP = 512 * 1024;

export function InstanceEditor({
  deploymentId,
  draftUuid,
  onNavigate,
}: InstanceEditorProps) {
  const initialMode: Mode = useMemo(() => {
    if (deploymentId) {
      return { kind: "viewing-current", deploymentId };
    }
    if (draftUuid && isDraftUuid(draftUuid)) {
      const cached = sessionStorage.getItem(draftStorageKey(draftUuid));
      if (cached) {
        try {
          const payload = JSON.parse(cached) as DraftPayload;
          return { kind: "draft", uuid: draftUuid, payload };
        } catch {
          // fall through to fresh draft
        }
      }
      const fresh: DraftPayload = {
        uuid: draftUuid,
        display_name: "",
        workflow_payload: { nodes: [], edges: [] },
        created_at: new Date().toISOString(),
      };
      return { kind: "draft", uuid: draftUuid, payload: fresh };
    }
    return { kind: "error", message: "Missing deploymentId or draftUuid" };
  }, [deploymentId, draftUuid]);

  const [mode, setMode] = useState<Mode>(initialMode);
  const [activeTab, setActiveTab] = useState<TabId>("graph");
  const [recipeSegment, setRecipeSegment] = useState<"overlay" | "blueprint">(
    "overlay",
  );
  const [overlayDirty, setOverlayDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  // FR-BM03 — debounced sessionStorage mirror for drafts.
  useEffect(() => {
    if (mode.kind !== "draft") return;
    const handle = window.setTimeout(() => {
      try {
        const serialized = JSON.stringify(mode.payload);
        if (serialized.length > DRAFT_SIZE_CAP) {
          setError(
            `Draft exceeds 512 KiB cap (${serialized.length} bytes). Save the module before adding more.`,
          );
          return;
        }
        sessionStorage.setItem(draftStorageKey(mode.uuid), serialized);
        setError(null);
      } catch (err) {
        console.warn("[draft] sessionStorage write failed", err);
      }
    }, 500);
    return () => window.clearTimeout(handle);
  }, [mode]);

  const handleUpdateDraftName = useCallback((name: string) => {
    setMode((prev) =>
      prev.kind === "draft"
        ? { ...prev, payload: { ...prev.payload, display_name: name } }
        : prev,
    );
  }, []);

  const handleSaveDraft = useCallback(async () => {
    if (mode.kind !== "draft") return;
    setSaving(true);
    setError(null);
    try {
      const result: MaterializeResult = await materializeDraft(mode.uuid, {
        workflow_payload: mode.payload.workflow_payload,
        display_name: mode.payload.display_name || "Untitled Module",
      });
      sessionStorage.removeItem(draftStorageKey(mode.uuid));
      // FR-BM05 — rewrite URL without reload.
      onNavigate(
        `#/deployments/${encodeURIComponent(result.deployment_id)}`,
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Materialize failed");
    } finally {
      setSaving(false);
    }
  }, [mode, onNavigate]);

  const handleDiscardDraft = useCallback(() => {
    if (mode.kind !== "draft") return;
    const proceed = window.confirm(
      "Discard this draft? The unsaved workflow will be lost.",
    );
    if (!proceed) return;
    sessionStorage.removeItem(draftStorageKey(mode.uuid));
    onNavigate("#/modules");
  }, [mode, onNavigate]);

  const isDraft = mode.kind === "draft";
  const isHistoric = mode.kind === "viewing-historic";
  const isError = mode.kind === "error";

  if (isError) {
    return (
      <div className={s.root}>
        <div className={s.errorBox} role="alert">
          {(mode as { message: string }).message}
        </div>
      </div>
    );
  }

  return (
    <div className={s.root}>
      {isDraft && (
        <div className={s.draftBanner} role="status">
          <span>
            Unsaved draft — first save will create a new User Module.
          </span>
          <div className={s.actions}>
            <input
              type="text"
              placeholder="Untitled Module"
              value={
                mode.kind === "draft" ? mode.payload.display_name : ""
              }
              onChange={(e) => handleUpdateDraftName(e.target.value)}
              aria-label="Module display name"
            />
            <button
              type="button"
              className={s.primaryBtn}
              disabled={saving}
              onClick={handleSaveDraft}
            >
              {saving ? "Saving…" : "Save Draft"}
            </button>
            <button
              type="button"
              className={s.secondaryBtn}
              onClick={handleDiscardDraft}
            >
              Discard
            </button>
          </div>
        </div>
      )}

      {isHistoric && (
        <div className={s.viewingBanner} role="status">
          <span>
            Viewing revision{" "}
            {mode.kind === "viewing-historic" ? mode.revisionId : ""} — edits
            are disabled.
          </span>
          <div className={s.actions}>
            <button
              type="button"
              className={s.secondaryBtn}
              onClick={() =>
                mode.kind === "viewing-historic"
                  ? setMode({
                      kind: "viewing-current",
                      deploymentId: mode.deploymentId,
                    })
                  : undefined
              }
            >
              Back to current
            </button>
            <button
              type="button"
              className={s.primaryBtn}
              onClick={() =>
                window.alert(
                  "Make-current flow lands in a follow-up slice once the revisions endpoint is wired.",
                )
              }
            >
              Make this the current revision
            </button>
          </div>
        </div>
      )}

      <header className={s.identityBanner}>
        <button
          type="button"
          className={s.backLink}
          onClick={() => onNavigate("#/modules")}
        >
          ← Modules
        </button>
        <span className={s.statusDot} aria-hidden="true" />
        <span className={s.idText}>
          {isDraft ? "— (draft)" : deploymentId}
        </span>
        <span className={s.displayName}>
          {isDraft
            ? mode.kind === "draft"
              ? mode.payload.display_name || "Untitled Module"
              : ""
            : "Instance"}{" "}
          {/* scan-terminology: allow */}
        </span>
        <span className={s.moduleBadge}>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "14px" }}
            aria-hidden="true"
          >
            apps
          </span>
          {isDraft ? "Blank Module" : "Module"}
        </span>
        <button
          type="button"
          className={s.revisionBtn}
          disabled={isDraft}
          onClick={() =>
            window.alert(
              "Revision picker lands in a follow-up slice.",
            )
          }
        >
          {isDraft ? "—" : "rev ▾"}
        </button>
      </header>

      <nav className={s.tabBar} role="tablist" aria-label="Instance editor tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            className={s.tabBtn}
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div
        className={s.panel}
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {error && (
          <div className={s.errorBox} role="alert">
            {error}
          </div>
        )}

        {activeTab === "recipe" && (
          <>
            <div
              className={s.segmentedControl}
              role="tablist"
              aria-label="Recipe view"
            >
              {(["overlay", "blueprint"] as const).map((seg) => (
                <button
                  key={seg}
                  type="button"
                  role="tab"
                  className={s.segmentBtn}
                  aria-selected={recipeSegment === seg}
                  onClick={() => setRecipeSegment(seg)}
                  disabled={isHistoric && seg === "overlay"}
                >
                  {seg === "overlay" ? "Overlay" : "Blueprint"}
                  {seg === "overlay" && overlayDirty && (
                    <span className={s.dirtyDot} aria-label="unsaved changes" />
                  )}
                </button>
              ))}
            </div>
            <p style={{ opacity: 0.7 }}>
              Parameter overlays and blueprint projection land in a follow-up
              slice. Use the Graph tab to shape the workflow for now.
            </p>
            {!isHistoric && (
              <button
                type="button"
                className={s.secondaryBtn}
                onClick={() => setOverlayDirty((d) => !d)}
                style={{ marginTop: "1rem" }}
              >
                {overlayDirty ? "Clear dirty flag" : "Simulate overlay edit"}
              </button>
            )}
          </>
        )}

        {activeTab === "stage" && (
          <p style={{ opacity: 0.7 }}>
            Stage view for this {/* scan-terminology: allow */} deployment —
            scoped to its current revision. (Integration with the existing
            StageView lands once the deployment-scoped workflow selector is
            wired.)
          </p>
        )}

        {activeTab === "graph" && (
          <p style={{ opacity: 0.7 }}>
            Graph view — the primary editing canvas. Draft mode opens here by
            default so new User Modules can be sketched immediately. (Wired
            to the existing GraphView in a follow-up slice.)
          </p>
        )}

        {activeTab === "trace" && (
          <p style={{ opacity: 0.7 }}>
            Run trace filtered by this {/* scan-terminology: allow */} deployment's
            deployment_run_links.
          </p>
        )}
      </div>
    </div>
  );
}
