import { StrictMode, createElement, useState } from "react";
import { createRoot } from "react-dom/client";
import "../theme/tokens.css";
import { Storyboard } from "../views/recipe/components/storyboard/storyboard";

const SCRIPT =
  "The chronometer flashed red, reflecting off the graphite console. " +
  "“We have approximately thirty seconds before the hull breaches,” she stated, " +
  "her voice devoid of panic — a purely mathematical assessment of their impending doom.\n\n" +
  "Kael didn’t look up from the diagnostic panel. " +
  "“Divert auxiliary power from life support to the forward deflectors.”\n\n" +
  "“That will reduce atmospheric integrity by forty percent.”\n\n" +
  "“If the hull breaches, it’s reduced by a hundred percent,” he shot back, " +
  "his fingers flying across the haptic interface. " +
  "The ship shuddered violently, throwing sparks from the overhead conduits.";

function Harness(): JSX.Element {
  const [text, setText] = useState(SCRIPT);
  return createElement(
    "emotion-tts-app",
    { "data-accent": "primary", "data-density": "cozy", "data-card": "flat" },
    <Storyboard voiceAssets={[]} presets={[]} storyText={text} onStoryTextChange={setText} />,
  );
}

const el = document.getElementById("root");
if (el) {
  createRoot(el).render(
    <StrictMode>
      <Harness />
    </StrictMode>,
  );
}
