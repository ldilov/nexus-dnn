/**
 * Spec 042 — IPC adapter type surface.
 *
 * Defines the typed RPC contract that both `tauri_transport.ts` and
 * `http_transport.ts` conform to. Re-exports the wire-protocol shapes from
 * `run_events_types.ts` so transports import a single dependency.
 */

export {
  HOST_CMD_SCHEMA_V1,
  IpcRpcError,
  RUN_EVENT_SCHEMA_V1,
  isIpcErrorPayload,
  runId,
  seqNum,
  sourceId,
} from "./run_events_types";

export type {
  AllocationTarget,
  AnsiSpan,
  ArtifactEvent,
  BreadcrumbInput,
  BucketedInput,
  BucketedResult,
  ErrorEvent,
  ErrorReason,
  EventBatch,
  GapEvent,
  GapReason,
  GapReport,
  HostCmdSchemaVersion,
  IpcErrorPayload,
  LineEvent,
  LineStream,
  MetricEvent,
  MetricSample,
  MetricUnit,
  MetricsSubInput,
  MnemonicInput,
  MnemonicResult,
  Ok,
  PhaseEvent,
  PhaseName,
  PhaseState,
  QueryWindowInput,
  QueryWindowResult,
  RunBucket,
  RunEventItem,
  RunEventSchemaVersion,
  RunId,
  ScraperUnknownEvent,
  SeqNum,
  SeqRange,
  Severity,
  SourceId,
  SubscribeInput,
  SubscribeResult,
  Subscription,
  TensorAllocateEvent,
  TensorGroup,
  TraySetStateInput,
  TrayState,
  TuningPatchInput,
  TuningPatchResult,
  WidgetEvent,
  WidgetKind,
} from "./run_events_types";

import type {
  BreadcrumbInput,
  BucketedInput,
  BucketedResult,
  EventBatch,
  MetricSample,
  MetricsSubInput,
  MnemonicInput,
  MnemonicResult,
  Ok,
  QueryWindowInput,
  QueryWindowResult,
  SubscribeInput,
  Subscription,
  TraySetStateInput,
  TuningPatchInput,
  TuningPatchResult,
} from "./run_events_types";

export interface IpcWindowApi {
  show(): Promise<Ok>;
  hide(): Promise<Ok>;
  focus(): Promise<Ok>;
  setTitlebarBreadcrumb(input: BreadcrumbInput): Promise<Ok>;
}

export interface IpcTrayApi {
  setState(input: TraySetStateInput): Promise<Ok>;
}

export interface IpcRunEventsApi {
  subscribe(
    input: SubscribeInput,
    onBatch: (batch: EventBatch) => void,
  ): Promise<Subscription>;
  queryWindow(input: QueryWindowInput): Promise<QueryWindowResult>;
  bucketed(input: BucketedInput): Promise<BucketedResult>;
}

export interface IpcRuntimeTuningApi {
  patch(input: TuningPatchInput): Promise<TuningPatchResult>;
}

export interface IpcBlockApi {
  registerMnemonic(input: MnemonicInput): Promise<MnemonicResult>;
}

export interface IpcPulseFloorApi {
  metricsSubscribe(
    input: MetricsSubInput,
    onSample: (sample: MetricSample) => void,
  ): Promise<Subscription>;
}

export interface IpcAdapter {
  window: IpcWindowApi;
  tray: IpcTrayApi;
  runEvents: IpcRunEventsApi;
  runtimeTuning: IpcRuntimeTuningApi;
  block: IpcBlockApi;
  pulseFloor: IpcPulseFloorApi;
}
