/**
 * Spec 042 — Tauri-mode IPC transport.
 *
 * Maps each `IpcAdapter` method to a `cmd_*` invoke call. Streaming methods
 * construct a `tauri::ipc::Channel<T>` and pass it as the `on_batch` /
 * `on_sample` argument; the host fills the channel as events arrive.
 */

import { Channel, invoke } from "@tauri-apps/api/core";
import {
  HOST_CMD_SCHEMA_V1,
  IpcRpcError,
  isIpcErrorPayload,
  type BreadcrumbInput,
  type BucketedInput,
  type BucketedResult,
  type EventBatch,
  type IpcAdapter,
  type MetricSample,
  type MetricsSubInput,
  type MnemonicInput,
  type MnemonicResult,
  type Ok,
  type QueryWindowInput,
  type QueryWindowResult,
  type SubscribeInput,
  type SubscribeResult,
  type Subscription,
  type TraySetStateInput,
  type TuningPatchInput,
  type TuningPatchResult,
} from "./ipc_adapter_types";

async function call<T>(cmd: string, args: Record<string, unknown>): Promise<T> {
  try {
    return await invoke<T>(cmd, args);
  } catch (raw) {
    if (isIpcErrorPayload(raw)) {
      throw new IpcRpcError(raw);
    }
    const message = raw instanceof Error ? raw.message : String(raw);
    throw new IpcRpcError({
      code: "transport",
      message,
      retriable: false,
    });
  }
}

function makeSubscription(
  subscriptionId: string,
  channel: Channel<unknown>,
  unsubscribeCmd: string,
): Subscription {
  let closed = false;
  return {
    subscriptionId,
    async unsubscribe(): Promise<void> {
      if (closed) return;
      closed = true;
      channel.onmessage = () => {};
      try {
        await invoke(unsubscribeCmd, { subscription_id: subscriptionId });
      } catch {
        return;
      }
    },
  };
}

export const tauriRpc: IpcAdapter = {
  window: {
    show(): Promise<Ok> {
      return call<Ok>("cmd_window_show", { schema: HOST_CMD_SCHEMA_V1 });
    },
    hide(): Promise<Ok> {
      return call<Ok>("cmd_window_hide", { schema: HOST_CMD_SCHEMA_V1 });
    },
    focus(): Promise<Ok> {
      return call<Ok>("cmd_window_focus", { schema: HOST_CMD_SCHEMA_V1 });
    },
    setTitlebarBreadcrumb(input: BreadcrumbInput): Promise<Ok> {
      return call<Ok>("cmd_window_set_titlebar_breadcrumb", { input });
    },
  },

  tray: {
    setState(input: TraySetStateInput): Promise<Ok> {
      return call<Ok>("cmd_tray_set_state", { input });
    },
  },

  runEvents: {
    async subscribe(
      input: SubscribeInput,
      onBatch: (batch: EventBatch) => void,
    ): Promise<Subscription> {
      const channel = new Channel<EventBatch>();
      channel.onmessage = (batch: EventBatch): void => {
        onBatch(batch);
      };
      const result = await call<SubscribeResult>("cmd_run_events_subscribe", {
        input,
        on_batch: channel,
      });
      return makeSubscription(
        result.subscription_id,
        channel as Channel<unknown>,
        "cmd_run_events_unsubscribe",
      );
    },

    queryWindow(input: QueryWindowInput): Promise<QueryWindowResult> {
      return call<QueryWindowResult>("cmd_run_events_query_window", { input });
    },

    bucketed(input: BucketedInput): Promise<BucketedResult> {
      return call<BucketedResult>("cmd_run_events_bucketed", { input });
    },
  },

  runtimeTuning: {
    patch(input: TuningPatchInput): Promise<TuningPatchResult> {
      return call<TuningPatchResult>("cmd_runtime_tuning_patch", { input });
    },
  },

  block: {
    registerMnemonic(input: MnemonicInput): Promise<MnemonicResult> {
      return call<MnemonicResult>("cmd_block_register_mnemonic", { input });
    },
  },

  pulseFloor: {
    async metricsSubscribe(
      input: MetricsSubInput,
      onSample: (sample: MetricSample) => void,
    ): Promise<Subscription> {
      const channel = new Channel<MetricSample>();
      channel.onmessage = (sample: MetricSample): void => {
        onSample(sample);
      };
      const result = await call<SubscribeResult>(
        "cmd_pulse_floor_metrics_subscribe",
        { input, on_sample: channel },
      );
      return makeSubscription(
        result.subscription_id,
        channel as Channel<unknown>,
        "cmd_pulse_floor_metrics_unsubscribe",
      );
    },
  },
};
