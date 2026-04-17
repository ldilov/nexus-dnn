import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
import { toast } from "sonner";
import {
  fetchBackendVariants,
  startBackendInstall,
  type BackendVariant,
  type BackendVariantsResponse,
  ContractError,
} from "../../../api/client";
import * as s from "./variant_picker_drawer.css";

interface Props {
  backendId: string;
  mode: "install" | "repair";
  preselectedReleaseId?: string | null;
  preselectedAcceleratorProfile?: string | null;
  onClose: () => void;
  onStarted: (runtimeInstallId: string) => void;
}

function keyOf(v: BackendVariant): string {
  return `${v.release_id}|${v.platform}|${v.accelerator_profile}`;
}

function defaultSelection(
  data: BackendVariantsResponse | undefined,
  preselectedReleaseId: string | null | undefined,
  preselectedProfile: string | null | undefined,
): string | null {
  if (!data) return null;
  const supported = data.variants.filter((v) => v.supported);
  if (supported.length === 0) return null;
  if (preselectedReleaseId) {
    const match = supported.find(
      (v) =>
        v.release_id === preselectedReleaseId &&
        (!preselectedProfile || v.accelerator_profile === preselectedProfile),
    );
    if (match) return keyOf(match);
  }
  const recommended = supported.find((v) => v.recommended);
  if (recommended) return keyOf(recommended);
  const first = supported[0];
  return first ? keyOf(first) : null;
}

export function VariantPickerDrawer({
  backendId,
  mode,
  preselectedReleaseId,
  preselectedAcceleratorProfile,
  onClose,
  onStarted,
}: Props) {
  const { data, error, isLoading } = useSWR<BackendVariantsResponse>(
    ["backend-variants", backendId],
    () => fetchBackendVariants(backendId),
    { revalidateOnFocus: false },
  );

  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (selectedKey === null) {
      const initial = defaultSelection(
        data,
        preselectedReleaseId,
        preselectedAcceleratorProfile,
      );
      if (initial) setSelectedKey(initial);
    }
  }, [data, preselectedReleaseId, preselectedAcceleratorProfile, selectedKey]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const catalogMissing =
    error instanceof ContractError && error.status === 404;

  const selectedVariant = useMemo<BackendVariant | null>(() => {
    if (!data || !selectedKey) return null;
    return data.variants.find((v) => keyOf(v) === selectedKey) ?? null;
  }, [data, selectedKey]);

  const handleInstall = async () => {
    if (!selectedVariant) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await startBackendInstall(backendId, {
        release_id: selectedVariant.release_id,
        accelerator_profile: selectedVariant.accelerator_profile,
      });
      onStarted(res.runtime_install_id);
    } catch (e) {
      const msg =
        e instanceof Error
          ? e.message
          : "install failed — see console for details";
      setSubmitError(msg);
      toast.error(`Install failed: ${msg}`);
      setSubmitting(false);
    }
  };

  const scrimClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={s.scrim}
      onClick={scrimClick}
      role="presentation"
      data-testid={`variant-picker-${backendId}`}
    >
      <aside
        className={s.drawer}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`variant-picker-title-${backendId}`}
      >
        <header className={s.header}>
          <span className={s.eyebrow}>{mode === "repair" ? "Repair" : "Install"}</span>
          <h2 className={s.title} id={`variant-picker-title-${backendId}`}>
            {backendId}
          </h2>
          <p className={s.subtitle}>
            {mode === "repair"
              ? "Reinstall a variant to recover from a broken state."
              : "Pick the release × platform × accelerator combo matching your machine."}
          </p>
        </header>

        <div className={s.body}>
          {isLoading && <div className={s.loading}>Loading catalog…</div>}

          {catalogMissing && (
            <div className={s.errorBanner}>
              Backend catalog unavailable — the version manifest yaml is missing
              or unreadable on disk. Install cannot proceed from this UI.
            </div>
          )}

          {error && !catalogMissing && (
            <div className={s.errorBanner}>
              {error instanceof Error
                ? error.message
                : "Failed to load variants"}
            </div>
          )}

          {submitError && <div className={s.errorBanner}>{submitError}</div>}

          {data?.variants.map((v) => {
            const k = keyOf(v);
            const selected = selectedKey === k;
            const variant = !v.supported ? "disabled" : selected ? "selected" : "idle";
            return (
              <div
                key={k}
                className={s.row[variant]}
                onClick={() => v.supported && setSelectedKey(k)}
                role="radio"
                aria-checked={selected}
                aria-disabled={!v.supported}
                tabIndex={v.supported ? 0 : -1}
                onKeyDown={(e) => {
                  if ((e.key === " " || e.key === "Enter") && v.supported) {
                    e.preventDefault();
                    setSelectedKey(k);
                  }
                }}
                title={v.disabled_reason ?? undefined}
                data-testid={`variant-row-${v.release_id}-${v.accelerator_profile}`}
              >
                <span className={s.radioMark} />
                <div className={s.rowContent}>
                  <span className={s.rowLabel}>{v.label}</span>
                  <span className={s.rowMeta}>
                    {formatBytes(v.size_bytes)}
                    {v.disabled_reason && (
                      <span className={s.unsupportedTag}>· {v.disabled_reason}</span>
                    )}
                  </span>
                </div>
                {v.recommended && v.supported && (
                  <span className={s.recommendedChip}>Recommended</span>
                )}
              </div>
            );
          })}

          {data && data.variants.length === 0 && (
            <div className={s.errorBanner}>
              No variants published for this backend on this platform.
            </div>
          )}
        </div>

        <footer className={s.footer}>
          <button
            type="button"
            className={s.secondaryButton}
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className={s.primaryButton}
            disabled={!selectedVariant || submitting || catalogMissing}
            onClick={handleInstall}
            data-testid="variant-picker-confirm"
          >
            {submitting
              ? "Starting…"
              : mode === "repair"
                ? "Repair"
                : "Install"}
          </button>
        </footer>
      </aside>
    </div>
  );
}

function formatBytes(bytes: number | null): string {
  if (bytes === null || bytes <= 0) return "—";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i += 1;
  }
  return `${value.toFixed(value >= 100 ? 0 : 1)} ${units[i]}`;
}
