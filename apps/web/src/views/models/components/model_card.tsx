import { useEffect, useRef, useState } from "react";
import type { HostModelView } from "../../../api/client";
import {
  fetchHostModelDependents,
  type DependentsResponse,
} from "../../../api/client";
import * as s from "../models.css";

interface DependentsCache {
  loaded: boolean;
  count: number;
  extensions: DependentsResponse["extensions"];
  error?: string;
}

export function ModelCard({ model }: { model: HostModelView }) {
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
