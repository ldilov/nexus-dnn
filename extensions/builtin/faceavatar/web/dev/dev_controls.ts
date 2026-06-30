const TRIGGER_GENERATE = "faceavatar:trigger-generate";

export function mountDevControls(): void {
  const bar = document.createElement("div");
  bar.className = "dev-controls";

  const label = document.createElement("span");
  label.className = "dev-controls__label";
  label.textContent = "offline preview";

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "dev-controls__btn";
  trigger.textContent = "Trigger mock generate";
  trigger.addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent(TRIGGER_GENERATE));
  });

  bar.append(label, trigger);
  document.body.appendChild(bar);
}
