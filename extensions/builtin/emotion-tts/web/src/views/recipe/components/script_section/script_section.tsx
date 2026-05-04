import type { Deployment } from "../../../../services/deployments_client";
import type { CharacterMapping } from "../../../../services/mappings_client";
import type { OutputFormat } from "../../../../services/types";
import { QuickVoicePicker } from "../quick_voice_picker";
import { ScriptEditor } from "../script_editor";
import * as css from "./script_section.css";
import { ScriptSyntaxLegend, ScriptSyntaxPopover } from "./script_syntax_legend";

interface ScriptSectionProps {
  quickMode: boolean;
  onToggleQuickMode: (v: boolean) => void;
  deployment: Deployment;
  script: string;
  onScriptChange: (v: string) => void;
  outputFormat: OutputFormat;
  mappingsByLower: Map<string, CharacterMapping>;
  defaultVoiceAssetId: string | null;
  onDefaultVoiceAssetIdChange: (id: string | null) => void;
}

export function ScriptSection({
  quickMode,
  onToggleQuickMode,
  deployment,
  script,
  onScriptChange,
  outputFormat,
  mappingsByLower,
  defaultVoiceAssetId,
  onDefaultVoiceAssetIdChange,
}: ScriptSectionProps): JSX.Element {
  const charCount = script.length;
  const wordCount = script.trim() ? script.trim().split(/\s+/).length : 0;
  const lineCount = script.trim()
    ? script.trim().split(/\r?\n/).filter((l) => l.trim()).length
    : 0;

  return (
    <div className={css.root}>
      <div className={css.headerRow}>
        <label className={css.quickToggle}>
          <input
            type="checkbox"
            checked={quickMode}
            onChange={(e) => onToggleQuickMode(e.target.checked)}
          />
          Quick mode (no character mapping required)
        </label>
        {quickMode && (
          <QuickVoicePicker
            deploymentId={deployment.deploymentId}
            initialVoiceAssetId={defaultVoiceAssetId}
            onChange={onDefaultVoiceAssetIdChange}
          />
        )}
        <div className={css.counters} aria-live="polite">
          <span>
            <strong className={css.counterValue}>
              {charCount.toString().padStart(3, "0")}
            </strong>{" "}
            chars
          </span>
          <span>
            <strong className={css.counterValue}>
              {lineCount.toString().padStart(2, "0")}
            </strong>{" "}
            lines
          </span>
          <span>
            <strong className={css.counterValue}>
              {wordCount.toString().padStart(3, "0")}
            </strong>{" "}
            words
          </span>
          <ScriptSyntaxPopover />
        </div>
      </div>
      <ScriptEditor
        value={script}
        onChange={onScriptChange}
        outputFormat={outputFormat}
        mappings={mappingsByLower}
        deploymentId={deployment.deploymentId}
      />
      <ScriptSyntaxLegend />
    </div>
  );
}
