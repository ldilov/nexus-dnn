import type { Deployment } from "../../../../services/deployments_client";
import type { CharacterMapping } from "../../../../services/mappings_client";
import type { OutputFormat } from "../../../../services/types";
import { Checkbox } from "../../../../components/checkbox";
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
      <div
        className={`${css.quickBar} ${quickMode ? css.quickBarOn : ""}`}
        data-quick-on={quickMode || undefined}
      >
        <Checkbox
          checked={quickMode}
          onChange={onToggleQuickMode}
          emphasis
          label="Quick mode"
          hint="single voice · plain prose · no character syntax"
        />
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
        quickMode={quickMode}
      />
      {!quickMode && <ScriptSyntaxLegend />}
    </div>
  );
}
