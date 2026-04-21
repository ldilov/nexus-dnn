import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ExtensionCustomElement } from "./extension_custom_element";
import { resetExtensionUiCachesForTest } from "../../services/extension_ui";

function mockCatalog(
  tags: Array<{ tag: string; extension_id: string; asset_href: string; entry: string }>,
) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () =>
      new Response(
        JSON.stringify({
          schema_version: "1",
          components: tags,
        }),
        { status: 200, headers: { "content-type": "application/json" } },
      ),
    ),
  );
}

describe("ExtensionCustomElement", () => {
  beforeEach(() => {
    resetExtensionUiCachesForTest();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    cleanup();
  });

  it("renders a failure placeholder when the tag is not in the catalog", async () => {
    mockCatalog([]);
    render(<ExtensionCustomElement tag="ext-unknown" />);
    const fail = await screen.findByTestId("extension-ui-failure");
    expect(fail).toHaveAttribute("data-reason", "unknown_tag");
    expect(fail).toHaveAttribute("data-tag", "ext-unknown");
  });

  it("renders a failure placeholder when the module import throws", async () => {
    mockCatalog([
      {
        tag: "ext-broken",
        extension_id: "nexus.test.broken",
        asset_href: "/api/v1/extensions/nexus.test.broken/ui/broken.js",
        entry: "register",
      },
    ]);
    const importer = vi.fn(async () => {
      throw new Error("simulated network failure");
    });
    render(<ExtensionCustomElement tag="ext-broken" importer={importer} />);
    const fail = await screen.findByTestId("extension-ui-failure");
    expect(fail).toHaveAttribute("data-reason", "load_failed");
    expect(fail).toHaveAttribute("data-extension-id", "nexus.test.broken");
    expect(fail.textContent).toContain("simulated network failure");
  });

  it("renders a failure placeholder when register() throws", async () => {
    mockCatalog([
      {
        tag: "ext-bad-register",
        extension_id: "nexus.test.bad",
        asset_href: "/api/v1/extensions/nexus.test.bad/ui/bad.js",
        entry: "register",
      },
    ]);
    const importer = vi.fn(async () => ({
      register: () => {
        throw new Error("register() exploded");
      },
    }));
    render(<ExtensionCustomElement tag="ext-bad-register" importer={importer} />);
    const fail = await screen.findByTestId("extension-ui-failure");
    expect(fail).toHaveAttribute("data-reason", "register_failed");
    expect(fail.textContent).toContain("register() exploded");
  });

  it("renders a failure placeholder when the module has no callable entry", async () => {
    mockCatalog([
      {
        tag: "ext-no-entry",
        extension_id: "nexus.test.noentry",
        asset_href: "/api/v1/extensions/nexus.test.noentry/ui/noentry.js",
        entry: "register",
      },
    ]);
    const importer = vi.fn(async () => ({}));
    render(<ExtensionCustomElement tag="ext-no-entry" importer={importer} />);
    const fail = await screen.findByTestId("extension-ui-failure");
    expect(fail).toHaveAttribute("data-reason", "register_failed");
  });

  it("mounts the custom element after successful register()", async () => {
    mockCatalog([
      {
        tag: "ext-ok",
        extension_id: "nexus.test.ok",
        asset_href: "/api/v1/extensions/nexus.test.ok/ui/ok.js",
        entry: "register",
      },
    ]);
    const register = vi.fn(() => {});
    const importer = vi.fn(async () => ({ register }));
    const { container } = render(
      <ExtensionCustomElement
        tag="ext-ok"
        props={{ flavor: "mint", enabled: true }}
        importer={importer}
      />,
    );
    await waitFor(() => expect(register).toHaveBeenCalled());
    await waitFor(() => {
      expect(container.querySelector("ext-ok")).not.toBeNull();
    });
    const el = container.querySelector("ext-ok") as HTMLElement;
    expect(el.getAttribute("flavor")).toBe("mint");
    expect(el.getAttribute("enabled")).toBe("");
  });
});
