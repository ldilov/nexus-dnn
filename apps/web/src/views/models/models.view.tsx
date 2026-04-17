import { useEffect, useMemo, useRef, useState } from "react";
import type { HostModelView } from "../../api/client";
import {
  fetchHostModelDependents,
  type DependentsResponse,
} from "../../api/client";
import { useHostModels } from "../../hooks/use_api";
import { HfSearchPanel } from "../../models/hf_search_panel";
import * as s from "./models.css";

export function ModelsView() {
  const { data, error, isLoading } = useHostModels();

  const installs: readonly HostModelView[] = useMemo(
    () => data?.installs ?? [],
    [data],
  );

  const summary = useMemo(() => {
    const byState = new Map<string, number>();
    const families = new Set<string>();
    for (const m of installs) {
      byState.set(m.state, (byState.get(m.state) ?? 0) + 1);
      families.add(m.family);
    }
    return { byState, familyCount: families.size };
  }, [installs]);

  const errorMessage =
    error instanceof Error
      ? error.message
      : error
        ? "Failed to load host models"
        : null;

  return (
    <div className={s.root}>
      <header className={s.header}>
        <h1 className={s.title}>Models</h1>
        <p className={s.subtitle}>
          Host-managed model store. Installs are shared across every extension
          that declares a compatible model dependency — no more per-extension
          duplication.
        </p>
        {installs.length > 0 && (
          <div className={s.summary}>
            <span className={s.chip}>{installs.length} installed</span>
            <span className={s.chip}>{summary.familyCount} families</span>
            {[...summary.byState.entries()].map(([state, n]) => (
              <span key={state} className={s.chip}>
                {state}: {n}
              </span>
            ))}
          </div>
        )}
      </header>

      {isLoading && <p className={s.subtitle}>Loading installed models…</p>}

      {errorMessage && (
        <div className={s.errorBox} role="alert">
          {errorMessage}
        </div>
      )}

      {!isLoading && !errorMessage && installs.length === 0 && (
        <div className={s.empty}>
          <span className="material-symbols-outlined" style={{ fontSize: "40px" }}>
            model_training
          </span>
          <div>
            No host-managed models installed yet. Search Hugging Face below to
            add one.
          </div>
        </div>
      )}

      {installs.length > 0 && (
        <div className={s.grid}>
          {installs.map((m) => (
            <ModelCard key={m.install_id} model={m} />
          ))}
        </div>
      )}

      <HfSearchPanel />
    </div>
  );
}

interface DependentsCache {
  loaded: boolean;
  count: number;
  extensions: DependentsResponse["extensions"];
  error?: string;
}

function ModelCard({ model }: { model: HostModelView }) {
  const isActive = model.state === "ready" || model.state === "active";
  const [dependents, setDependents] = useState<DependentsCache>({
    loaded: false,
    count: 0,
    extensions: [],
  });
  const rootRef = useRef<HTMLElement | null>(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || hasLoadedRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || hasLoadedRef.current) continue;
          hasLoadedRef.current = true;
          fetchHostModelDependents(model.install_id)
            .then((res) =>
              setDependents({
                loaded: true,
                count: res.count,
                extensions: res.extensions,
              }),
            )
            .catch((err: unknown) =>
              setDependents({
                loaded: true,
                count: 0,
                extensions: [],
                error: err instanceof Error ? err.message : "fetch failed",
              }),
            );
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [model.install_id]);

  return (
    <article className={s.card} ref={rootRef}>
      <div className={s.cardHead}>
        <div>
          <div className={s.cardTitle}>{model.family}</div>
          <div className={s.cardVariant}>
            v{model.version} · {model.variant}
            {model.quantization ? ` · ${model.quantization}` : ""}
          </div>
        </div>
        <span
          className={`${s.stateChip}${isActive ? ` ${s.stateChipActive}` : ""}`}
        >
          {model.state}
        </span>
      </div>

      <div className={s.cardRow}>
        <span className={s.rowLabel}>Source</span>
        <span className={s.rowValue}>
          {model.source_kind}
          {model.source_revision ? ` @ ${model.source_revision.slice(0, 12)}` : ""}
        </span>
      </div>

      {model.license_spdx && (
        <div className={s.cardRow}>
          <span className={s.rowLabel}>License</span>
          <span className={s.rowValue}>{model.license_spdx}</span>
        </div>
      )}

      {model.owner_extension_id && (
        <div className={s.cardRow}>
          <span className={s.rowLabel}>Owner ext</span>
          <span className={s.rowValue}>{model.owner_extension_id}</span>
        </div>
      )}

      <div className={s.cardRow}>
        <span className={s.rowLabel}>Install id</span>
        <span className={s.rowValue}>{model.install_id}</span>
      </div>

      <div className={s.cardRow}>
        <span className={s.rowLabel}>Shared by</span>
        <span
          className={s.rowValue}
          data-testid={`model-shared-${model.install_id}`}
          title={
            dependents.loaded
              ? dependents.extensions.map((e) => e.display_name).join(", ") || "no extensions"
              : "loading…"
          }
        >
          {dependents.error
            ? "—"
            : dependents.loaded
              ? `${dependents.count} extension${dependents.count === 1 ? "" : "s"}`
              : "…"}
        </span>
      </div>
    </article>
  );
}
