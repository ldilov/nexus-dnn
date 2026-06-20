import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { ModelCard } from "../ModelCard";
import type {
  Artifact,
  DownloadJob,
  DownloadState,
  ModelFamily,
} from "../../../../services/model_store";

afterEach(() => cleanup());

function makeArtifact(overrides: Partial<Artifact> = {}): Artifact {
  return {
    artifact_id: "art-1",
    role: "primary",
    format: "safetensors",
    precision: "fp16",
    precision_source: "explicit",
    size_bytes: 1024 * 1024 * 500,
    filename: "model.safetensors",
    download_url: "https://example.test/model.safetensors",
    sha256: null,
    install_state: "not_downloaded",
    ...overrides,
  };
}

function makeFamily(overrides: Partial<ModelFamily> = {}): ModelFamily {
  return {
    family_id: "fam-1",
    repository: {
      repo_id: "acme/tiny-gpt2",
      source_provider: "huggingface",
      owner: "acme",
      name: "tiny-gpt2",
      description: "tiny model for testing",
      license: "mit",
      tags: [],
      downloads: 100,
      likes: 5,
      last_updated: null,
      modality: "llm",
    },
    artifacts: [makeArtifact()],
    variants: [],
    dependencies: [],
    compat: "compatible",
    warnings: [],
    ...overrides,
  };
}

function makeJob(overrides: Partial<DownloadJob> = {}): DownloadJob {
  return {
    job_id: "job-1",
    family_id: "fam-1",
    requested_kind: "primary",
    include_dependencies: false,
    state: "downloading",
    targets: [],
    warnings: [],
    progress_bytes: 0,
    total_bytes: null,
    error_reason: null,
    created_at: "2026-05-12T00:00:00Z",
    started_at: "2026-05-12T00:00:01Z",
    finished_at: null,
    ...overrides,
  };
}

const noop = vi.fn();

function renderCard(opts: {
  family?: ModelFamily;
  liveState?: DownloadState;
  job?: DownloadJob;
  onDownload?: (...args: unknown[]) => void;
  onPause?: (jobId: string) => void;
  onResume?: (jobId: string) => void;
  onDelete?: (artifactId: string, label: string) => void;
}) {
  const family = opts.family ?? makeFamily();
  const jobStateByFamily: Record<string, DownloadState | undefined> = {};
  const jobIdByFamily: Record<string, string | undefined> = {};
  const jobByFamily: Record<string, DownloadJob | undefined> = {};
  if (opts.liveState && opts.job) {
    jobStateByFamily[family.family_id] = opts.liveState;
    jobIdByFamily[family.family_id] = opts.job.job_id;
    jobByFamily[family.family_id] = opts.job;
  }
  return render(
    <ModelCard
      family={family}
      jobStateByVariant={{}}
      jobIdByVariant={{}}
      jobByVariant={{}}
      jobStateByFamily={jobStateByFamily}
      jobIdByFamily={jobIdByFamily}
      jobByFamily={jobByFamily}
      onDownload={opts.onDownload ?? noop}
      onPause={opts.onPause ?? noop}
      onResume={opts.onResume ?? noop}
      onAuthRequired={noop}
      onDelete={opts.onDelete ?? noop}
    />,
  );
}

describe("ModelCard — primary download state-machine", () => {
  it("renders the Download primary button when state is not_downloaded", () => {
    renderCard({});
    expect(
      screen.getByRole("button", { name: /download primary/i }),
    ).toBeInTheDocument();
  });

  it("renders a progress bar with percent when state is downloading", () => {
    const job = makeJob({
      state: "downloading",
      progress_bytes: 250,
      total_bytes: 1000,
    });
    renderCard({ liveState: "downloading", job });
    const bar = screen.getByRole("progressbar");
    expect(bar).toBeInTheDocument();
    expect(bar.getAttribute("aria-valuenow")).toBe("25");
    expect(bar.getAttribute("aria-valuemax")).toBe("100");
    expect(
      screen.getByRole("button", { name: /pause download/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /download primary/i }),
    ).not.toBeInTheDocument();
  });

  it("renders the Downloaded chip when state is downloaded", () => {
    const job = makeJob({
      state: "downloaded",
      progress_bytes: 1000,
      total_bytes: 1000,
    });
    renderCard({ liveState: "downloaded", job });
    expect(screen.getByText(/downloaded/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /re-download/i }),
    ).toBeInTheDocument();
  });

  it("fires onDelete from the Downloaded chip", () => {
    const onDelete = vi.fn();
    const job = makeJob({ state: "downloaded", progress_bytes: 1000, total_bytes: 1000 });
    renderCard({ liveState: "downloaded", job, onDelete });
    fireEvent.click(screen.getByRole("button", { name: /delete download/i }));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("falls back to Artifact.install_state when no live job exists (downloaded)", () => {
    const family = makeFamily({
      artifacts: [makeArtifact({ install_state: "downloaded" })],
    });
    renderCard({ family });
    expect(screen.getByText(/downloaded/i)).toBeInTheDocument();
  });

  it("renders Resume button when state is paused", () => {
    const job = makeJob({
      state: "paused",
      progress_bytes: 500,
      total_bytes: 1000,
    });
    const onResume = vi.fn();
    renderCard({ liveState: "paused", job, onResume });
    const resumeBtn = screen.getByRole("button", { name: /resume download/i });
    fireEvent.click(resumeBtn);
    expect(onResume).toHaveBeenCalledWith("job-1");
  });

  it("renders Retry button with error reason when state is failed", () => {
    const job = makeJob({
      state: "failed",
      progress_bytes: 100,
      total_bytes: 1000,
      error_reason: "checksum mismatch",
    });
    const onDownload = vi.fn();
    renderCard({ liveState: "failed", job, onDownload });
    expect(screen.getByText(/download failed/i)).toBeInTheDocument();
    expect(screen.getByText(/checksum mismatch/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /retry download/i }));
    expect(onDownload).toHaveBeenCalledTimes(1);
  });

  it("renders queued badge when state is queued", () => {
    const job = makeJob({ state: "queued" });
    renderCard({ liveState: "queued", job });
    expect(screen.getByRole("status", { name: /download queued/i })).toBeInTheDocument();
  });
});
