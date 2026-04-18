import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { materializeDraft } from "../../../api/client";
import {
  clearDraftEnvelope,
  readDraftEnvelope,
  writeDraftEnvelope,
  type DraftEnvelope,
} from "../draft/draft_envelope";
import type { ReactNode } from "react";
import * as s from "./instance.css";

function Shell({ children }: { children: ReactNode }) {
  return <div className={s.root}>{children}</div>;
}

interface DraftViewProps {
  sourceModuleId: string;
  draftUuid: string;
}

type State =
  | { kind: "loading" }
  | { kind: "ready"; envelope: DraftEnvelope }
  | { kind: "error"; message: string };

export function DraftView({ sourceModuleId, draftUuid }: DraftViewProps) {
  const navigate = useNavigate();
  const [state, setState] = useState<State>({ kind: "loading" });
  const [saving, setSaving] = useState(false);
  const [sizeWarning, setSizeWarning] = useState<string | null>(null);
  const saveDebounce = useRef<number | null>(null);

  useEffect(() => {
    const envelope = readDraftEnvelope(draftUuid);
    if (envelope) {
      setState({ kind: "ready", envelope });
      return;
    }
    setState({
      kind: "error",
      message:
        "Draft not found in sessionStorage. It may have been cleared by the 7-day sweeper.",
    });
  }, [draftUuid]);

  useEffect(
    () => () => {
      if (saveDebounce.current) window.clearTimeout(saveDebounce.current);
    },
    [],
  );

  const mirrorToStorage = useCallback(
    (next: DraftEnvelope) => {
      if (saveDebounce.current) window.clearTimeout(saveDebounce.current);
      saveDebounce.current = window.setTimeout(() => {
        const result = writeDraftEnvelope(draftUuid, next);
        if (!result.ok) {
          setSizeWarning(
            result.reason === "oversized"
              ? "Draft exceeds the 512 KiB cap. Save now before adding more."
              : "sessionStorage is unavailable; your edits will not survive a reload.",
          );
        } else {
          setSizeWarning(null);
        }
      }, 500);
    },
    [draftUuid],
  );

  const handleRename = useCallback(
    (value: string) => {
      setState((prev) => {
        if (prev.kind !== "ready") return prev;
        const next: DraftEnvelope = { ...prev.envelope, display_name: value };
        mirrorToStorage(next);
        return { kind: "ready", envelope: next };
      });
    },
    [mirrorToStorage],
  );

  const handleSave = useCallback(async () => {
    if (state.kind !== "ready") return;
    setSaving(true);
    try {
      const result = await materializeDraft(draftUuid, {
        workflow_payload: state.envelope.workflow_payload,
        display_name: state.envelope.display_name || "Untitled Module",
        // Spec 019 FR-BM04 — pass source so the handler branches correctly.
        ...({ source_module_id: state.envelope.source_module_id } as Record<
          string,
          unknown
        >),
      });
      clearDraftEnvelope(draftUuid);
      navigate(`/deployments/${encodeURIComponent(result.deployment_id)}`);
    } catch (err: unknown) {
      setState({
        kind: "error",
        message: err instanceof Error ? err.message : "Save failed",
      });
    } finally {
      setSaving(false);
    }
  }, [state, draftUuid, navigate]);

  const handleDiscard = useCallback(() => {
    const ok = window.confirm(
      "Discard this draft? The unsaved workflow will be lost.",
    );
    if (!ok) return;
    clearDraftEnvelope(draftUuid);
    // Spec 019 FR-052 — navigate to fork source. Blank Module → modules list;
    // others → the source module detail.
    if (sourceModuleId === "user:blank") {
      navigate("/modules");
    } else {
      navigate(`/modules/${encodeURIComponent(sourceModuleId)}`);
    }
  }, [draftUuid, sourceModuleId, navigate]);

  const bannerText = useMemo(() => {
    if (state.kind !== "ready") return "Loading draft…";
    const src = state.envelope.source_display_name;
    return `Unsaved draft forked from ${src}. First save creates a new deployment.`;
  }, [state]);

  if (state.kind === "loading") {
    return (
      <Shell>
        <header className={s.identityBanner}>
          <span className={s.idText}>Loading draft…</span>
        </header>
      </Shell>
    );
  }

  if (state.kind === "error") {
    return (
      <Shell>
        <div className={s.errorBox} role="alert">
          {state.message}
        </div>
        <button
          type="button"
          className={`${s.secondaryBtn} ${s.centeredSpinner}`}
          onClick={() => navigate("/modules")}
        >
          Back to modules
        </button>
      </Shell>
    );
  }

  const env = state.envelope;

  return (
    <Shell>
      <div className={s.draftBanner} role="status">
        <span>{bannerText}</span>
        <div className={`${s.bannerActions} ${s.zeroMarginLeft}`}>
          <input
            type="text"
            value={env.display_name}
            placeholder="Untitled Module"
            onChange={(e) => handleRename(e.target.value)}
            aria-label="Draft display name"
            className={s.inputNarrow}
          />
          <button
            type="button"
            className={s.primaryBtn}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving…" : "Save Draft"}
          </button>
          <button
            type="button"
            className={s.secondaryBtn}
            onClick={handleDiscard}
          >
            Discard
          </button>
        </div>
      </div>

      {sizeWarning && (
        <div className={s.warningBanner} role="alert">
          {sizeWarning}
        </div>
      )}

      <header className={s.identityBanner}>
        <span className={s.statusDot} aria-hidden="true" />
        <span className={s.idText}>— (draft)</span>
        <span className={s.displayName}>
          {env.display_name || "Untitled Module"}
        </span>
        <span className={s.sourceBadge}>
          <span
            className={`material-symbols-outlined ${s.iconSm}`}
            aria-hidden="true"
          >
            {env.source_module_id === "user:blank" ? "add_box" : "apps"}
          </span>
          Draft from {env.source_display_name}
        </span>
      </header>

      <div className={s.panel}>
        <div className={s.readOnlyNote}>
          The editable draft editor (Graph canvas, parameter overlays, step
          bindings) is wired in a follow-up slice. For now the draft carries
          the forked payload byte-identical — clicking Save creates a new
          {" "}{/* scan-terminology: allow */}deployment backed by the source,
          and from that deployment's editor you can make arbitrary changes
          with full revision tracking (spec 018 territory).
        </div>
        <section>
          <h3 className={s.sectionHeader}>Forked payload</h3>
          <pre className={s.payloadPre}>
            {JSON.stringify(env.workflow_payload, null, 2)}
          </pre>
        </section>
      </div>
    </Shell>
  );
}
