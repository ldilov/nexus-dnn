import { useMemo } from "react";
import { useNavigate } from "react-router";
import type { CharacterMapping } from "../../../services/mappings_client";
import type { OutputFormat } from "../../../services/types";
import * as css from "../recipe.css";
import { Banner } from "../../../components/banner";

interface Props {
  value: string;
  onChange: (next: string) => void;
  outputFormat: OutputFormat;
  mappings: Map<string, CharacterMapping>;
  deploymentId: string;
}

interface LineAttribution {
  lineNumber: number;
  character: string;
  text: string;
  hasMapping: boolean;
}

export function ScriptEditor(props: Props): JSX.Element {
  const navigate = useNavigate();
  const { attributions, unresolved, predictedFilenames } = useMemo(
    () => analyseScript(props.value, props.outputFormat, props.mappings),
    [props.value, props.outputFormat, props.mappings],
  );

  return (
    <div>
      <textarea
        className={css.scriptTextarea}
        value={props.value}
        onChange={(e) => props.onChange(e.currentTarget.value)}
        placeholder={"[Bob] Hey there\n[Alice] Hello\n..."}
        aria-label="Dialogue script"
        spellCheck={false}
      />

      {unresolved.length > 0 && (
        <Banner severity="error">
          <strong>Unresolved characters:</strong>{" "}
          {unresolved.map((name) => (
            <button
              type="button"
              key={name}
              className={css.secondaryButton}
              onClick={() =>
                navigate(
                  `/${props.deploymentId}/mappings/new?character=${encodeURIComponent(name)}`,
                )
              }
            >
              Create mapping for {name}
            </button>
          ))}
        </Banner>
      )}

      {attributions.length > 0 && (
        <div>
          <span className={css.label}>Parsed lines</span>
          <ul className={css.filenameList}>
            {attributions.map((a) => (
              <li key={a.lineNumber}>
                #{a.lineNumber.toString().padStart(3, "0")} [{a.character}] {a.text}
                {!a.hasMapping && a.character !== "Narrator" && " — unresolved"}
              </li>
            ))}
          </ul>
        </div>
      )}

      {predictedFilenames.length > 0 && (
        <div>
          <span className={css.label}>Predicted filenames</span>
          <ul className={css.filenameList}>
            {predictedFilenames.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function analyseScript(
  script: string,
  outputFormat: OutputFormat,
  mappings: Map<string, CharacterMapping>,
): { attributions: LineAttribution[]; unresolved: string[]; predictedFilenames: string[] } {
  const tagRegex = /^\[(?<body>[^\]]*)\](?<rest>.*)$/;
  const attributions: LineAttribution[] = [];
  const unresolvedSet = new Set<string>();
  const characterCounter = new Map<string, number>();
  const predictedFilenames: string[] = [];

  const lines = script.split(/\r?\n/);
  let globalIndex = 0;

  lines.forEach((raw, idx) => {
    const trimmed = raw.trim();
    if (!trimmed) return;
    const lineNumber = idx + 1;
    const match = trimmed.match(tagRegex);
    let character = "Narrator";
    let text = trimmed;
    if (match && match.groups) {
      const body = (match.groups["body"] ?? "").trim();
      const rest = (match.groups["rest"] ?? "").trim();
      const head = body.split("|")[0] ?? "";
      const name = head.split(":")[0] ?? "";
      character = name.trim() || "Narrator";
      text = rest;
    }

    globalIndex += 1;
    const lower = character.toLowerCase();
    const count = (characterCounter.get(lower) ?? 0) + 1;
    characterCounter.set(lower, count);
    const hasMapping = character === "Narrator" || mappings.has(lower);
    if (!hasMapping) unresolvedSet.add(character);

    attributions.push({ lineNumber, character, text, hasMapping });
    predictedFilenames.push(
      `${globalIndex.toString().padStart(3, "0")}_${sanitise(character)}_${count
        .toString()
        .padStart(3, "0")}.${outputFormat}`,
    );
  });

  return {
    attributions,
    unresolved: Array.from(unresolvedSet),
    predictedFilenames,
  };
}

function sanitise(name: string): string {
  const cleaned = name.replace(/[^A-Za-z0-9._-]/g, "_").replace(/_+/g, "_").replace(/^_|_$/g, "");
  return cleaned.length === 0 ? "Narrator" : cleaned.slice(0, 48);
}
