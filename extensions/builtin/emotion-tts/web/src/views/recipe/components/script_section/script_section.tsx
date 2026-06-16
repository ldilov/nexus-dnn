import type { Deployment } from "../../../../services/deployments_client";
import type { CharacterMapping } from "../../../../services/mappings_client";
import type { VectorPreset } from "../../../../services/presets_client";
import type { VoiceAsset } from "../../../../services/voice_assets_client";
import type { OutputFormat, PrebuiltSegment } from "../../../../services/types";
import { Storyboard } from "../storyboard/storyboard";
import { QuickVoicePicker } from "../quick_voice_picker";
import { ScriptEditor } from "../script_editor";
import { CharacterRowsEditor } from "../character_rows_editor/character_rows_editor";
import {
  EDITOR_MODE_OPTIONS,
  EditorModeToggle,
  type EditorMode,
} from "../editor_mode_toggle/editor_mode_toggle";
import { StoryEditor } from "../story_editor/story_editor";
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
  storyText: string;
  onStoryTextChange: (v: string) => void;
  storyCharacters: readonly string[];
  outputFormat: OutputFormat;
  mappingsByLower: Map<string, CharacterMapping>;
  defaultVoiceAssetId: string | null;
  onDefaultVoiceAssetIdChange: (id: string | null) => void;
  presets: readonly VectorPreset[];
  voiceAssets: readonly VoiceAsset[];
  onQueueChange?: ((segments: PrebuiltSegment[]) => void) | undefined;
}

export function ScriptSection({
  editorMode,
  onEditorModeChange,
  deployment,
  script,
  onScriptChange,
  rows,
  onRowsChange,
  storyText,
  onStoryTextChange,
  storyCharacters,
  outputFormat,
  mappingsByLower,
  defaultVoiceAssetId,
  onDefaultVoiceAssetIdChange,
  presets,
  voiceAssets,
  onQueueChange,
}: ScriptSectionProps): JSX.Element {
  const isQuick = editorMode === "quick";
  const isRows = editorMode === "rows";
  const isStory = editorMode === "story";
  const isStoryboard = editorMode === "storyboard";
  const usesStoryText = isStory || isStoryboard;
  const activeModeDescription = EDITOR_MODE_OPTIONS.find((o) => o.id === editorMode)?.description ?? "";
  const charCount = isRows
    ? rows.reduce((acc, r) => acc + r.text.length, 0)
    : usesStoryText
      ? storyText.length
      : script.length;
  const wordSource = isRows ? rows.map((r) => r.text).join(" ") : usesStoryText ? storyText : script;
  const wordCount = wordSource.trim() ? wordSource.trim().split(/\s+/).length : 0;
  const lineCount = isRows
    ? rows.filter((r) => r.text.trim().length > 0).length
    : (usesStoryText ? storyText : script).trim()
      ? (usesStoryText ? storyText : script).trim().split(/\r?\n/).filter((l) => l.trim()).length
      : 0;

  return (
    <div className={css.root}>
      <div
        className={`${css.quickBar} ${isQuick ? css.quickBarOn : ""}`}
        data-quick-on={isQuick || undefined}
      >
        <EditorModeToggle value={editorMode} onChange={onEditorModeChange} />
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
      <p className={css.modeCaption} aria-live="polite">{activeModeDescription}</p>
      {isStoryboard ? (
        <Storyboard
          voiceAssets={voiceAssets}
          presets={presets}
          storyText={storyText}
          onStoryTextChange={onStoryTextChange}
          mappings={mappingsByLower}
          onQueueChange={onQueueChange}
        />
      ) : isRows ? (
        <CharacterRowsEditor
          rows={rows}
          onRowsChange={onRowsChange}
          presets={presets}
          mappingsByLower={mappingsByLower}
        />
      ) : isStory ? (
        <StoryEditor
          value={storyText}
          onChange={onStoryTextChange}
          characters={storyCharacters}
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
      {!isQuick && !isRows && !isStory && !isStoryboard && <ScriptSyntaxLegend />}
    </div>
  );
}
