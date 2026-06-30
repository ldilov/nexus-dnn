const TRIGGER_GENERATE = "faceavatar:trigger-generate";

export function mountDevControls(app: HTMLElement): void {
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

  const genRecipe = document.createElement("button");
  genRecipe.type = "button";
  genRecipe.className = "dev-controls__btn";
  genRecipe.textContent = "Recipe: generate";
  genRecipe.addEventListener("click", () => {
    app.setAttribute("route", "/preview/generate");
  });

  const graftRecipe = document.createElement("button");
  graftRecipe.type = "button";
  graftRecipe.className = "dev-controls__btn";
  graftRecipe.textContent = "Recipe: head-refine";
  graftRecipe.addEventListener("click", () => {
    app.setAttribute("route", "/preview/head-refine");
  });

  bar.append(label, trigger, genRecipe, graftRecipe);
  document.body.appendChild(bar);
}
