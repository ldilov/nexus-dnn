import type { GlobalEmotion } from "../../../services/types";
import type { PerformanceSlidersValue } from "../components/performance_sliders";
import type { PreFlightCheck } from "../components/pre_flight_block";

export interface BuildDiagnosticsArgs {
  script: string;
  quickMode: boolean;
  defaultVoiceAssetId: string | null | undefined;
  characters: readonly string[];
  unmappedCount: number;
  globalEmotion: GlobalEmotion;
  performance: PerformanceSlidersValue;
}

export function buildDiagnostics({
  script,
  quickMode,
  defaultVoiceAssetId,
  characters,
  unmappedCount,
  globalEmotion,
  performance,
}: BuildDiagnosticsArgs): PreFlightCheck[] {
  const checks: PreFlightCheck[] = [];
  const trimmed = script.trim();
  if (!trimmed) {
    checks.push({ id: "script", status: "warn", label: "Script", detail: "empty" });
  } else {
    const lineCount = trimmed.split(/\r?\n/).filter((l) => l.trim()).length;
    checks.push({
      id: "script",
      status: "ok",
      label: "Script",
      detail: `${lineCount} lines · ${trimmed.length} chars`,
    });
  }

  if (quickMode) {
    checks.push({
      id: "voice",
      status: defaultVoiceAssetId ? "ok" : "warn",
      label: "Quick voice",
      detail: defaultVoiceAssetId ? "default voice set" : "no default voice",
    });
  } else if (characters.length === 0) {
    checks.push({ id: "cast", status: "info", label: "Cast", detail: "no characters detected" });
  } else if (unmappedCount === 0) {
    checks.push({ id: "cast", status: "ok", label: "Cast", detail: `${characters.length} mapped` });
  } else {
    checks.push({
      id: "cast",
      status: "warn",
      label: "Cast",
      detail: `${unmappedCount} unmapped`,
    });
  }

  if (globalEmotion.mode === "qwen_template" && !globalEmotion.qwenTemplate?.trim()) {
    checks.push({ id: "emotion", status: "warn", label: "Emotion", detail: "Qwen template empty" });
  } else if (globalEmotion.mode === "emotion_vector") {
    const v = globalEmotion.vector;
    const hasNonZero = Array.isArray(v) && v.some((n) => Math.abs(n) > 0.01);
    checks.push({
      id: "emotion",
      status: hasNonZero ? "ok" : "info",
      label: "Emotion",
      detail: hasNonZero ? "8-axis vector" : "neutral vector",
    });
  } else if (globalEmotion.mode === "audio_ref") {
    checks.push({ id: "emotion", status: "ok", label: "Emotion", detail: "audio reference" });
  } else {
    checks.push({ id: "emotion", status: "info", label: "Emotion", detail: "neutral" });
  }

  checks.push({
    id: "performance",
    status: "info",
    label: "Performance",
    detail: `intensity ${Math.round(performance.intensity * 100)}% · pace ${performance.pace.toFixed(2)}× · pitch ${performance.pitchSt >= 0 ? "+" : ""}${performance.pitchSt.toFixed(1)}st`,
  });

  return checks;
}
