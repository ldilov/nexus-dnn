import { Popover } from "../../../../components/popover";
import * as popoverCss from "../../../../components/popover.css";
import * as css from "./script_syntax_legend.css";

export function ScriptSyntaxPopover(): JSX.Element {
  return (
    <Popover label="Syntax" glyph="?">
      <h3 className={popoverCss.heading}>Script syntax</h3>
      <ul className={popoverCss.itemList}>
        <li className={popoverCss.item}>
          <code className={popoverCss.itemSyntax}>[Char] line text</code>
          <span className={popoverCss.itemHelp}>
            Plain line — uses the speaker's mapped voice.
          </span>
        </li>
        <li className={popoverCss.item}>
          <code className={popoverCss.itemSyntax}>[Char|emotion_vector:happy=0.7]</code>
          <span className={popoverCss.itemHelp}>
            Per-line 8-axis emotion override. Combine axes with commas.
          </span>
        </li>
        <li className={popoverCss.item}>
          <code className={popoverCss.itemSyntax}>[Char|qwen:Friendly teen]</code>
          <span className={popoverCss.itemHelp}>
            Send a free-text mood prompt — the Qwen helper turns it into an emotion vector.
          </span>
        </li>
        <li className={popoverCss.item}>
          <code className={popoverCss.itemSyntax}>[Char|preset:Bittersweet]</code>
          <span className={popoverCss.itemHelp}>Apply a saved preset by name.</span>
        </li>
        <li className={popoverCss.item}>
          <code className={popoverCss.itemSyntax}>[Char|audio:slow_breath.wav]</code>
          <span className={popoverCss.itemHelp}>
            Use a reference audio clip as the emotion source.
          </span>
        </li>
      </ul>
      <p className={popoverCss.note}>
        <span className={popoverCss.noteStrong}>Quick mode</span>: when enabled no [Char] tags
        are required — every line uses the deployment's default voice. Toggle it above the editor.
      </p>
      <p className={popoverCss.note}>
        <span className={popoverCss.noteStrong}>Mappings</span>: assign characters to voices in
        the Cast section below. Unmapped characters in non-quick mode trigger a pre-flight warning.
      </p>
    </Popover>
  );
}

export function ScriptSyntaxLegend(): JSX.Element {
  return (
    <ul className={css.list}>
      <li>
        <code className={css.codeAccent}>[Char]</code> plain line
      </li>
      <li>
        <code className={css.codeAccent}>[Char|emotion_vector:happy=0.7]</code> per-line vector
      </li>
      <li>
        <code className={css.codeSecondary}>[Char|qwen:warm]</code> AI prompt mapping
      </li>
      <li>
        <code className={css.codeTertiary}>[Char|preset:Bittersweet]</code> saved preset
      </li>
      <li>
        <code className={css.codeSuccess}>[Char|audio:slow_breath.wav]</code> audio reference
      </li>
    </ul>
  );
}
