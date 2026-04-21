// Fixture bundle for US3 contract tests. Not executed — only served as bytes.
export function register() {
  if (!customElements.get("ext-fixture-widget")) {
    class ExtFixtureWidget extends HTMLElement {
      connectedCallback() {
        this.textContent = "fixture";
      }
    }
    customElements.define("ext-fixture-widget", ExtFixtureWidget);
  }
}
