import { useState } from "react";
import type { CatalogEntry, InstallResponse } from "../../../services/backend_runtimes_client";
import { startInstall } from "../../../services/backend_runtimes_client";
import * as css from "../backend_runtimes.css";

interface Props {
  runtime: CatalogEntry;
  onInstalled: (resp: InstallResponse) => void;
  onClose: () => void;
}

/**
 * T068 — Install modal. Free-form release / platform / accelerator
 * fields since the version-manifest isn't exposed via HTTP yet. Host
 * validates the tuple; a 404/409 surfaces as a form error.
 */
export function InstallModal({ runtime, onInstalled, onClose }: Props) {
  const [releaseId, setReleaseId] = useState("v0_0_1");
  const [platform, setPlatform] = useState(detectPlatform());
  const [profile, setProfile] = useState("cpu");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);
    setError(null);
    try {
      const resp = await startInstall(runtime.runtime_id, {
        release_id: releaseId,
        platform,
        accelerator_profile: profile,
      });
      onInstalled(resp);
    } catch (e) {
      setError(e instanceof Error ? e.message : "install failed");
      setSubmitting(false);
    }
  };

  return (
    <div
      className={css.modalBackdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="install-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !submitting) onClose();
      }}
    >
      <div className={css.modalPanel}>
        <div id="install-modal-title" className={css.modalTitle}>
          Install {runtime.display_name}
        </div>

        <div className={css.modalField}>
          <label className={css.modalLabel} htmlFor="install-release">
            Release ID
          </label>
          <input
            id="install-release"
            className={css.modalInput}
            value={releaseId}
            onChange={(e) => setReleaseId(e.target.value)}
            disabled={submitting}
          />
        </div>

        <div className={css.modalField}>
          <label className={css.modalLabel} htmlFor="install-platform">
            Platform
          </label>
          <input
            id="install-platform"
            className={css.modalInput}
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            disabled={submitting}
          />
        </div>

        <div className={css.modalField}>
          <label className={css.modalLabel} htmlFor="install-profile">
            Accelerator profile
          </label>
          <input
            id="install-profile"
            className={css.modalInput}
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            disabled={submitting}
          />
        </div>

        {error && <div className={css.errorBox}>{error}</div>}

        <div className={css.modalFooter}>
          <button
            type="button"
            className={css.actionButton}
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="button"
            className={`${css.actionButton} ${css.actionButtonPrimary}`}
            onClick={submit}
            disabled={submitting || !releaseId || !platform || !profile}
          >
            {submitting ? "Submitting…" : "Install"}
          </button>
        </div>
      </div>
    </div>
  );
}

function detectPlatform(): string {
  if (typeof navigator === "undefined") return "linux-x64";
  const platform = navigator.platform?.toLowerCase() ?? "";
  const ua = navigator.userAgent?.toLowerCase() ?? "";
  const isArm64 = ua.includes("aarch64") || ua.includes("arm64") || ua.includes("armv8");
  if (platform.includes("win")) return "windows-x64";
  if (platform.includes("mac")) return "darwin-arm64";
  if (isArm64) return "linux-arm64";
  return "linux-x64";
}
