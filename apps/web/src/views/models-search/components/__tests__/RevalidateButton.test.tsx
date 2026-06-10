import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

const { toastSuccess, toastError, revalidateHostModels } = vi.hoisted(() => ({
  toastSuccess: vi.fn(),
  toastError: vi.fn(),
  revalidateHostModels: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: { success: toastSuccess, error: toastError },
}));

vi.mock("../../../../services/model_store", () => ({
  revalidateHostModels,
}));

import { RevalidateButton } from "../RevalidateButton";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("RevalidateButton — spec 054 G2.3", () => {
  it("calls the revalidate client, toasts the result, and refreshes", async () => {
    revalidateHostModels.mockResolvedValue({ checked: 4, pruned: 2 });
    const onRevalidated = vi.fn();
    render(<RevalidateButton onRevalidated={onRevalidated} />);

    fireEvent.click(screen.getByRole("button", { name: /revalidate/i }));

    await waitFor(() => expect(revalidateHostModels).toHaveBeenCalledTimes(1));
    expect(toastSuccess).toHaveBeenCalledWith(
      "Revalidated installed models",
      expect.objectContaining({
        description: expect.stringContaining("2 stale records"),
      }),
    );
    expect(onRevalidated).toHaveBeenCalledTimes(1);
  });

  it("reports an all-present sweep without claiming pruned rows", async () => {
    revalidateHostModels.mockResolvedValue({ checked: 3, pruned: 0 });
    const onRevalidated = vi.fn();
    render(<RevalidateButton onRevalidated={onRevalidated} />);

    fireEvent.click(screen.getByRole("button", { name: /revalidate/i }));

    await waitFor(() => expect(toastSuccess).toHaveBeenCalledTimes(1));
    const opts = toastSuccess.mock.calls[0]?.[1] as { description: string };
    expect(opts.description).toContain("all present");
    expect(opts.description).not.toContain("pruned");
    expect(onRevalidated).toHaveBeenCalledTimes(1);
  });

  it("toasts an error and does not refresh when revalidate fails", async () => {
    revalidateHostModels.mockRejectedValue(new Error("model store unavailable"));
    const onRevalidated = vi.fn();
    render(<RevalidateButton onRevalidated={onRevalidated} />);

    fireEvent.click(screen.getByRole("button", { name: /revalidate/i }));

    await waitFor(() => expect(toastError).toHaveBeenCalledTimes(1));
    expect(toastError).toHaveBeenCalledWith("model store unavailable");
    expect(onRevalidated).not.toHaveBeenCalled();
  });
});
