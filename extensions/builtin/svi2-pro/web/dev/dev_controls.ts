const TRIGGER_RENDER = "svi2-pro:trigger-render";

export function mountDevControls(): void {
  const bar = document.createElement("div");
  bar.className = "dev-controls";

  const label = document.createElement("span");
  label.className = "dev-controls__label";
  label.textContent = "offline preview";

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "dev-controls__btn";
  trigger.textContent = "Trigger mock render";
  trigger.addEventListener("click", () => {
    window.dispatchEvent(new CustomEvent(TRIGGER_RENDER));
  });

  bar.append(label, trigger);
  document.body.appendChild(bar);
}
