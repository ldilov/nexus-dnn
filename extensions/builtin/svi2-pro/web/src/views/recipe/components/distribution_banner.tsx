import { type ReactElement, useMemo } from "react";
import {
  CUSTOM_RESOLUTION,
  buildResolutionOptions,
  matchResolutionOption,
} from "../../../domain/resolution_presets";
import type { PresetSummary } from "../../../services/types";
import { useRenderRequest } from "../../../store/render_request_store";
import * as styles from "./distribution_banner.css";

type BannerTone = "ok" | "neutral" | "warn";

interface BannerState {
  tone: BannerTone;
  text: string;
  tag: string;
}

interface DistributionBannerProps {
  presets: PresetSummary[];
  warningText?: string | undefined;
}

const TONE_BANNER: Record<BannerTone, string> = {
  ok: styles.bannerOk,
  neutral: styles.bannerNeutral,
  warn: styles.bannerWarn,
};
const TONE_ICON: Record<BannerTone, string> = {
  ok: styles.iconOk,
  neutral: styles.iconNeutral,
  warn: styles.iconWarn,
};
const TONE_TAG: Record<BannerTone, string> = {
  ok: styles.tagOk,
  neutral: styles.tagNeutral,
  warn: styles.tagWarn,
};

function bannerState(stepsDown: number | null, warningText?: string): BannerState {
  if (stepsDown === 0) {
    return {
      tone: "ok",
      text: "In distribution — identity-lock nominal at the native 480p budget.",
      tag: "in-distribution",
    };
  }
  if (stepsDown === 1) {
    return {
      tone: "neutral",
      text: "One step below native — minor identity drift possible, but well within bounds.",
      tag: "caution",
    };
  }
  if (stepsDown !== null && stepsDown >= 2) {
    return {
      tone: "warn",
      text: "Below the trained 480p budget — identity-lock weakens (off-distribution). Render still proceeds.",
      tag: "off-distribution",
    };
  }
  if (warningText) {
    return { tone: "warn", text: warningText, tag: "custom" };
  }
  return {
    tone: "neutral",
    text: "Custom resolution — outside the preset ladder. Identity-lock is untested here.",
    tag: "custom",
  };
}

function ToneIcon({ tone }: { tone: BannerTone }): ReactElement {
  if (tone === "ok") {
    return (
      <svg viewBox="0 0 20 20" width="100%" height="100%" fill="none" aria-hidden="true">
        <title>in distribution</title>
        <path
          d="M10 1.8l6.4 2.4v4.4c0 4.1-2.7 7.9-6.4 9.6-3.7-1.7-6.4-5.5-6.4-9.6V4.2L10 1.8z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M7 10l2.1 2.1L13.2 8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (tone === "warn") {
    return (
      <svg viewBox="0 0 20 20" width="100%" height="100%" fill="none" aria-hidden="true">
        <title>warning</title>
        <path
          d="M10 2.6L18.6 17H1.4L10 2.6z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M10 8v4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="10" cy="14.4" r="0.9" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" width="100%" height="100%" fill="none" aria-hidden="true">
      <title>info</title>
      <circle cx="10" cy="10" r="8.25" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 9v5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="10" cy="6.2" r="0.9" fill="currentColor" />
    </svg>
  );
}

export function DistributionBanner({
  presets,
  warningText,
}: DistributionBannerProps): ReactElement | null {
  const { params } = useRenderRequest();
  const options = useMemo(() => buildResolutionOptions(presets), [presets]);
  if (options.length === 0) return null;

  const selection = matchResolutionOption(params, options);
  const stepsDown =
    selection === CUSTOM_RESOLUTION
      ? null
      : (options.find((o) => o.id === selection)?.stepsDown ?? null);
  const state = bannerState(stepsDown, warningText);

  return (
    <output
      className={[styles.banner, TONE_BANNER[state.tone]].join(" ")}
      aria-live="polite"
    >
      <span className={[styles.icon, TONE_ICON[state.tone]].join(" ")} aria-hidden="true">
        <ToneIcon tone={state.tone} />
      </span>
      <span className={styles.text}>{state.text}</span>
      <span className={TONE_TAG[state.tone]}>{state.tag}</span>
    </output>
  );
}
