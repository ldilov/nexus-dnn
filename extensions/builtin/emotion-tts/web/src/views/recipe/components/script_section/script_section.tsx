import type { Deployment } from "../../../../services/deployments_client";
import type { CharacterMapping } from "../../../../services/mappings_client";
import type { VectorPreset } from "../../../../services/presets_client";
import type { OutputFormat } from "../../../../services/types";
import { QuickVoicePicker } from "../quick_voice_picker";
import { ScriptEditor } from "../script_editor";
import { CharacterRowsEditor } from "../character_rows_editor/character_rows_editor";
import { EditorModeToggle, type EditorMode } from "../editor_mode_toggle/editor_mode_toggle";
import type { PerCharacterRow } from "../../lib/serialise_rows";
import * as css from "./script_section.css";
import { ScriptSyntaxLegend, ScriptSyntaxPopover } from "./script_syntax_legend";

interface ScriptSectionProps {
  editorMode: EditorMode;
  onEditorModeChange: (mode: EditorMode) => void;
  deployment: Deployment;
  script: string;
  onScriptChange: (v: string) => void;
  rows: PerCharacterRow[];
  onRowsChange: (rows: PerCharacterRow[]) => void;
  outputFormat: OutputFormat;
  mappingsByLower: Map<string, CharacterMapping>;
  defaultVoiceAssetId: string | null;
  onDefaultVoiceAssetIdChange: (id: string | null) => void;
  presets: readonly VectorPreset[];
}

export function ScriptSection({
  editorMode,
  onEditorModeChange,
  deployment,
  script,
  onScriptChange,
  rows,
  onRowsChange,
  outputFormat,
  mappingsByLower,
  defaultVoiceAssetId,
  onDefaultVoiceAssetIdChange,
  presets,
}: ScriptSectionProps): JSX.Element {
  const isQuick = editorMode === "quick";
  const isRows = editorMode === "rows";
  const charCount = isRows ? rows.reduce((acc, r) => acc + r.text.length, 0) : script.length;
  const wordSource = isRows ? rows.map((r) => r.text).join(" ") : script;
  const wordCount = wordSource.trim() ? wordSource.trim().split(/\s+/).length : 0;
  const lineCount = isRows
    ? rows.filter((r) => r.text.trim().length > 0).length
    : script.trim()
      ? script.trim().split(/\r?\n/).filter((l) => l.trim()).length
      : 0;

  return (
    <div className={css.root}>
      <div
        className={`${css.quickBar} ${isQuick ? css.quickBarOn : ""}`}
        data-quick-on={isQuick || undefined}
      >
        <EditorModeToggle value={editorMode} onChange={onEditorModeChange} storyDisabled />
        {isQuick && (
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
          {!isRows && <ScriptSyntaxPopover />}
        </div>
      </div>
      {isRows ? (
        <CharacterRowsEditor
          rows={rows}
          onRowsChange={onRowsChange}
          presets={presets}
          mappingsByLower={mappingsByLower}
        />
      ) : (
        <ScriptEditor
          value={script}
          onChange={onScriptChange}
          outputFormat={outputFormat}
          mappings={mappingsByLower}
          deploymentId={deployment.deploymentId}
          quickMode={isQuick}
        />
      )}
      {!isQuick && !isRows && <ScriptSyntaxLegend />}
    </div>
  );
}
