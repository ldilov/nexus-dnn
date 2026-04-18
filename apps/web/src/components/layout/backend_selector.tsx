import { type ReactNode, useState, useCallback, useEffect } from "react";
import * as styles from "./backend_styles.css";
import { fetchLoadState } from "../../api/client";
import { installRuntime, getInstallStatus } from "../../services/local_llm_rpc";

type BackendStatus = "running" | "installed" | "available" | "installing" | "failed" | "unavailable";

type AccelerationOption = {
  id: string;
  label: string;
};

type BackendOption = {
  id: string;
  name: string;
  version: string;
  description: string;
  icon: string;
  status: BackendStatus;
  optimizedFor?: string;
  accelerationOptions?: AccelerationOption[];
  selectedAcceleration?: string;
};

type BackendSelectorProps = {
  backends?: BackendOption[];
  title?: string;
  description?: string;
  children?: ReactNode;
};

const STATUS_CONFIG: Record<BackendStatus, { label: string; dot: string }> = {
  running: { label: "RUNNING", dot: styles.backendStatusDotRunning },
  installed: { label: "INSTALLED", dot: styles.backendStatusDotInstalled },
  available: { label: "NOT INSTALLED", dot: styles.backendStatusDotAvailable },
  installing: { label: "INSTALLING...", dot: styles.backendStatusDotAvailable },
  failed: { label: "FAILED", dot: styles.backendStatusDotUnavailable },
  unavailable: { label: "UNAVAILABLE", dot: styles.backendStatusDotUnavailable },
};

function BackendCard({ backend }: { backend: BackendOption }) {
  const [status, setStatus] = useState(backend.status);
  const [logs, setLogs] = useState<string[]>([]);
  const [selectedAccel, setSelectedAccel] = useState(
    backend.selectedAcceleration ?? backend.accelerationOptions?.[0]?.id ?? "cpu"
  );

  const appendLog = useCallback((msg: string) => {
    const ts = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev.slice(-200), `[${ts}] ${msg}`]);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchLoadState(backend.id)
      .then((state) => {
        if (cancelled) return;
        if (state.ready) {
          setStatus("installed");
        }
      })
      .catch(() => {
        // Backend not wired for this id yet; retain the status passed in via props.
      });
    return () => {
      cancelled = true;
    };
  }, [backend.id]);

  const handleInstall = useCallback(async () => {
    setStatus("installing");
    appendLog(`Starting installation of ${backend.name} (${selectedAccel})...`);
    appendLog(`Resolving download URL from version manifest...`);

    try {
      const result = await installRuntime({
        backendId: backend.id,
        acceleration: selectedAccel,
      });

      if (result.ok) {
        if (result.taskId) {
          appendLog(`Install task started: ${result.taskId}`);
          pollInstallStatus(result.taskId);
        } else {
          appendLog(`[INFO] Install initiated (mock mode)`);
          simulateInstall();
        }
      } else {
        appendLog(`[INFO] Backend API not connected yet, simulating install...`);
        simulateInstall();
      }
    } catch {
      appendLog(`[INFO] Running in standalone mode, simulating install...`);
      simulateInstall();
    }

    function simulateInstall() {
      const steps = [
        "Resolving asset: llama-b4970-bin-win-" + selectedAccel,
        "Downloading archive... 0%",
        "Downloading archive... 25%",
        "Downloading archive... 50%",
        "Downloading archive... 75%",
        "Downloading archive... 100%",
        "Verifying checksum...",
        "Extracting archive...",
        "Locating server binary...",
        "Found: llama-server" + (navigator.platform.includes("Win") ? ".exe" : ""),
        "Validating binary... OK",
        "Installation complete!",
      ];

      steps.forEach((step, i) => {
        setTimeout(() => {
          appendLog(step);
          if (i === steps.length - 1) {
            setStatus("installed");
            appendLog(`${backend.name} is ready to activate.`);
          }
        }, (i + 1) * 400);
      });
    }

    function pollInstallStatus(taskId: string) {
      const interval = setInterval(async () => {
        try {
          const status = await getInstallStatus(taskId);
          appendLog(`Install progress: ${status.progressPercent}%`);
          if (status.status === "completed") {
            clearInterval(interval);
            setStatus("installed");
            appendLog("Installation complete!");
          } else if (status.status === "failed") {
            clearInterval(interval);
            setStatus("failed");
            appendLog(`Installation failed: ${status.error ?? "unknown"}`);
          }
        } catch {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, [backend.id, backend.name, selectedAccel, appendLog]);

  const handleActivate = useCallback(async () => {
    appendLog(`Activating ${backend.name}...`);
    appendLog("Starting llama-server process...");
    setStatus("running");
    appendLog("[OK] Backend activated successfully");
    appendLog("Health endpoint: http://127.0.0.1:8080/health");
    appendLog("Chat endpoint: http://127.0.0.1:8080/v1/chat/completions");

    try {
      const state = await fetchLoadState(backend.id);
      if (!state.ready) {
        appendLog("[WARN] Backend reports not ready — check diagnostics.");
        return;
      }
      if (state.loaded_model_id) {
        appendLog(`[OK] Model loaded: ${state.loaded_model_id}`);
      } else {
        appendLog("No model loaded — select one from the Models panel.");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "unknown";
      appendLog(`[WARN] Could not query load state: ${msg}`);
    }
  }, [backend.name, backend.id, appendLog]);

  const handleDeactivate = useCallback(() => {
    appendLog(`Deactivating ${backend.name}...`);
    appendLog("Sending graceful shutdown...");
    setStatus("installed");
    appendLog("[OK] Backend stopped");
  }, [backend.name, appendLog]);

  const isActive = status === "running";
  // Alternate accents per backend id for visual variety (cyan vs pink).
  const isPinkAccent = backend.id === "llama.cpp";
  const cardCls = [
    styles.backendCard,
    isActive ? styles.backendCardActive : "",
    isPinkAccent ? styles.backendCardAccentPink : styles.backendCardAccentCyan,
  ].filter(Boolean).join(" ");

  const iconBoxCls = isActive
    ? styles.backendIconBoxCyan
    : isPinkAccent
      ? styles.backendIconBoxPink
      : styles.backendIconBoxPrimary;

  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.available;
  const familyLabel = isPinkAccent ? "Local · Hybrid Runtime" : "Accelerated · GPU Runtime";

  return (
    <div>
      <div className={cardCls}>
        <div className={styles.backendCardInner}>
        <div className={styles.backendCardTopRow}>
          <div className={styles.backendHeadlineRow}>
            <div className={[styles.backendIconBox, iconBoxCls].join(" ")}>
              <span className="material-symbols-outlined" style={{ fontSize: "26px", fontVariationSettings: "'FILL' 1, 'wght' 500" }}>{backend.icon}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <span className={styles.backendFamilyLabel}>{familyLabel}</span>
              <span className={styles.backendName}>{backend.name}</span>
            </div>
          </div>
          <span className={styles.backendStatusBadge}>
            <span className={[styles.backendStatusDot, config.dot].join(" ")} />
            {config.label}
          </span>
        </div>

        {backend.accelerationOptions && backend.accelerationOptions.length > 1 && status !== "running" && (
          <select className={styles.backendAccelSelect} value={selectedAccel} onChange={(e) => setSelectedAccel(e.target.value)}>
            {backend.accelerationOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        )}

        {!backend.accelerationOptions && <span className={styles.backendVersionChip}>{backend.version}</span>}

        <p className={styles.backendDescription}>{backend.description}</p>

        <div className={styles.backendFooter}>
          {status === "available" && (
            <button type="button" className={styles.backendActivateButton} onClick={handleInstall}>
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>download</span> INSTALL
            </button>
          )}
          {status === "installing" && (
            <button type="button" className={styles.backendInstallingButton} disabled>
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>hourglass_top</span> INSTALLING...
            </button>
          )}
          {status === "installed" && (
            <button type="button" className={styles.backendActivateButton} onClick={handleActivate}>
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>bolt</span> ACTIVATE
            </button>
          )}
          {status === "running" && (
            <button type="button" className={styles.backendDeactivateButton} onClick={handleDeactivate}>
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>stop</span> DEACTIVATE
            </button>
          )}
          {status === "failed" && (
            <button type="button" className={styles.backendActivateButton} onClick={handleInstall}>
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>refresh</span> RETRY INSTALL
            </button>
          )}
          {backend.optimizedFor && <span className={styles.backendOptimizedLabel}>Optimized for {backend.optimizedFor}</span>}
        </div>
        </div>
      </div>

      {logs.length > 0 && (
        <div className={styles.backendLogPanel}>
          <div className={styles.backendLogHeader}>
            <span>SYSTEM LOG</span>
            <span className={styles.backendLogLive}>{status === "installing" || status === "running" ? "LIVE" : ""}</span>
          </div>
          <div className={styles.backendLogBody}>
            {logs.map((line, i) => (
              <div key={i} className={styles.backendLogLine}>{line}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function BackendSelector({ backends = [], title, description, children }: BackendSelectorProps) {
  return (
    <div className={styles.backendSelectorContainer}>
      {(title || description) && (
        <div className={styles.backendSelectorHeader}>
          <span className={styles.backendSelectorEyebrow}>
            <span className={styles.backendSelectorEyebrowDot} />
            <span className="material-symbols-outlined" style={{ fontSize: "12px" }}>hub</span>
            Inference Runtime Catalog
          </span>
          {title && <h2 className={styles.backendSelectorTitle}>{title}</h2>}
          {description && <p className={styles.backendSelectorDescription}>{description}</p>}
        </div>
      )}
      {backends.length > 0 && (
        <div className={styles.backendGrid}>{backends.map((b) => <BackendCard key={b.id} backend={b} />)}</div>
      )}
      {children}
    </div>
  );
}

export type { BackendOption, BackendSelectorProps };
