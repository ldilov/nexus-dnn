import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import type { HostModelView } from "../../../api/client";
import {
  fetchHostModelDependents,
  type DependentsResponse,
} from "../../../api/client";
import * as s from "../models.css";

export function ModelCard({ model }: { model: HostModelView }) {
  const isActive = model.state === "ready" || model.state === "active";
  const rootRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || visible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            return;
          }
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const { data, error } = useSWR<DependentsResponse>(
    visible ? `model-dependents:${model.install_id}` : null,
    () => fetchHostModelDependents(model.install_id),
    { revalidateOnFocus: false, shouldRetryOnError: false },
  );

  const loaded = Boolean(data || error);
  const count = data?.count ?? 0;
  const extensions = data?.extensions ?? [];
  const errorMessage = error ? (error instanceof Error ? error.message : "fetch failed") : null;

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
            loaded && !errorMessage
              ? extensions.map((e) => e.display_name).join(", ") || "no extensions"
              : "loading…"
          }
        >
          {errorMessage
            ? "—"
            : loaded
              ? `${count} extension${count === 1 ? "" : "s"}`
              : "…"}
        </span>
      </div>
    </article>
  );
}
