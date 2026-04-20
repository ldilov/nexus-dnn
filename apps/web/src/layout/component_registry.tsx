import { type ReactNode } from "react";
import type { LayoutNode } from "../api/client";
import { SplitPanel } from "../components/layout/split_panel";
import { Stack } from "../components/layout/stack";
import { TabsLayout } from "../components/layout/tabs_layout";
import { CardLayout } from "../components/layout/card_layout";
import { ChatPanel } from "../components/layout/chat_panel";
import { DataTable } from "../components/layout/data_table";
import { LayoutForm } from "../components/layout/form";
import { FileBrowser } from "../components/layout/file_browser";
import { MetricsDashboard } from "../components/layout/metrics_dashboard";
import { LayoutStatusBar } from "../components/layout/status_bar";
import { ActionBar } from "../components/layout/action_bar";
import { ListComponent } from "../components/layout/list_component";
import { ThreadListComponent } from "../components/layout/thread_list";
import { ModelSelectorComponent } from "../components/layout/model_selector";
import { GenerationSettingsFormComponent } from "../components/layout/generation_settings_form";
import { DetailView } from "../components/layout/detail_view";
import { EmptyState } from "../components/layout/empty_state";
import { CodeBlock } from "../components/layout/code_block";
import { MarkdownView } from "../components/layout/markdown_view";
import { ProgressTracker } from "../components/layout/progress_tracker";
import { LogViewer } from "../components/layout/log_viewer";
import { SetupStepper } from "../components/layout/setup_stepper";
import { InstallModal as ExtensionInstallModal } from "../components/layout/extension_install_modal";
import { SummaryStrip } from "../components/layout/summary_strip";
import { RuntimeCard } from "../components/layout/runtime_card";
import { DiagnosticsView } from "../components/layout/diagnostics_view";
import { HistoryList } from "../components/layout/history_list";
import { BackendSelector } from "../components/layout/backend_selector";
import type { BackendOption } from "../components/layout/backend_selector";
import { WorkspaceShell, type ToolbarAction, type DrawerConfig } from "../components/layout/workspace_shell";
import { ModelsPanel } from "../models/ModelsPanel";

type ComponentRenderer = (node: LayoutNode, children: ReactNode[]) => ReactNode;

function toProps(node: LayoutNode): Record<string, unknown> {
  return node.props ?? {};
}

const registry: Record<string, ComponentRenderer> = {
  split_panel: (node, children) => {
    const props = toProps(node);
    return (
      <SplitPanel
        direction={props.direction as "horizontal" | "vertical" | undefined}
        sizes={props.sizes as (string | number)[] | undefined}
      >
        {children}
      </SplitPanel>
    );
  },

  stack: (_node, children) => <Stack>{children}</Stack>,

  tabs: (node, children) => {
    const props = toProps(node);
    return (
      <TabsLayout tabs={props.tabs as { label: string; icon?: string }[] | undefined}>
        {children}
      </TabsLayout>
    );
  },

  card: (node, children) => {
    const props = toProps(node);
    return (
      <CardLayout
        title={props.title as string | undefined}
        variant={props.variant as "default" | "interactive" | "outlined" | undefined}
      >
        {children}
      </CardLayout>
    );
  },

  chat_panel: (node, children) => {
    const props = toProps(node);
    return (
      <ChatPanel
        showStopButton={props.showStopButton as boolean | undefined}
        showRetryButton={props.showRetryButton as boolean | undefined}
        streamingEnabled={props.streamingEnabled as boolean | undefined}
        messages={props.messages as { id: string; role: "user" | "assistant" | "system"; content: string }[] | undefined}
        welcomeIcon={props.welcomeIcon as string | undefined}
        welcomeTitle={props.welcomeTitle as string | undefined}
        welcomeDescription={props.welcomeDescription as string | undefined}
        modelName={props.modelName as string | undefined}
        modelChips={props.modelChips as { label: string; type: "model" | "optimize" }[] | undefined}
      >
        {children}
      </ChatPanel>
    );
  },

  data_table: (node, children) => {
    const props = toProps(node);
    return (
      <DataTable
        columns={props.columns as { key: string; label: string; sortable?: boolean; width?: string }[] | undefined}
        rows={props.rows as Record<string, unknown>[] | undefined}
        selectable={props.selectable as boolean | undefined}
      >
        {children}
      </DataTable>
    );
  },

  form: (node, children) => {
    const props = toProps(node);
    return (
      <LayoutForm
        fields={props.fields as { key: string; label: string; type: "text" | "number" | "slider" | "select" | "toggle" | "textarea"; default?: unknown; min?: number; max?: number; step?: number; options?: { label: string; value: string }[] }[] | undefined}
        values={props.values as Record<string, unknown> | undefined}
      >
        {children}
      </LayoutForm>
    );
  },

  file_browser: (node, children) => {
    const props = toProps(node);
    return (
      <FileBrowser
        path={props.path as string | undefined}
        entries={props.entries as { name: string; type: "file" | "directory"; size?: number }[] | undefined}
      >
        {children}
      </FileBrowser>
    );
  },

  metrics_dashboard: (node, children) => {
    const props = toProps(node);
    return (
      <MetricsDashboard
        layout={props.layout as "default" | "compact" | undefined}
        metrics={props.metrics as { key: string; label: string; format?: "number" | "percent" | "bytes" | "duration" }[] | undefined}
        data={props.data as Record<string, unknown> | undefined}
      >
        {children}
      </MetricsDashboard>
    );
  },

  status_bar: (node, children) => {
    const props = toProps(node);
    return (
      <LayoutStatusBar
        compact={props.compact as boolean | undefined}
        items={props.items as { label: string; value?: string; status?: "ok" | "warning" | "error" }[] | undefined}
      >
        {children}
      </LayoutStatusBar>
    );
  },

  model_selector: (_node, _children) => <ModelSelectorComponent />,

  generation_settings_form: (_node, _children) => <GenerationSettingsFormComponent />,

  action_bar: (node, children) => {
    const props = toProps(node);
    return (
      <ActionBar
        actions={props.actions as { label: string; icon?: string; action?: string; variant?: "primary" | "secondary" | "ghost" | "danger" }[] | undefined}
      >
        {children}
      </ActionBar>
    );
  },

  list: (node, children) => {
    const props = toProps(node);
    const itemType = props.itemType as string | undefined;
    if (itemType === "thread") {
      return (
        <ThreadListComponent
          emptyMessage={props.emptyMessage as string | undefined}
        />
      );
    }
    return (
      <ListComponent
        items={props.items as { id: string; label: string; description?: string }[] | undefined}
        itemType={itemType}
        emptyMessage={props.emptyMessage as string | undefined}
        selectable={props.selectable as boolean | undefined}
      >
        {children}
      </ListComponent>
    );
  },

  detail_view: (node, children) => {
    const props = toProps(node);
    return (
      <DetailView
        fields={props.fields as { label: string; key: string; format?: "text" | "status_badge" | "code" }[] | undefined}
        data={props.data as Record<string, unknown> | undefined}
      >
        {children}
      </DetailView>
    );
  },

  empty_state: (node, children) => {
    const props = toProps(node);
    return (
      <EmptyState
        icon={props.icon as string | undefined}
        title={props.title as string | undefined}
        description={props.description as string | undefined}
        primaryAction={props.primaryAction as { label: string; action?: string } | undefined}
      >
        {children}
      </EmptyState>
    );
  },

  code_block: (node, children) => {
    const props = toProps(node);
    return (
      <CodeBlock
        code={props.code as string | undefined}
        language={props.language as string | undefined}
        showHeader={props.showHeader as boolean | undefined}
      >
        {children}
      </CodeBlock>
    );
  },

  markdown_view: (node, children) => {
    const props = toProps(node);
    return (
      <MarkdownView content={props.content as string | undefined}>
        {children}
      </MarkdownView>
    );
  },

  progress_tracker: (node, children) => {
    const props = toProps(node);
    return (
      <ProgressTracker
        label={props.label as string | undefined}
        percent={props.percent as number | undefined}
        bytesLoaded={props.bytesLoaded as number | undefined}
        bytesTotal={props.bytesTotal as number | undefined}
        showCancel={props.showCancel as boolean | undefined}
      >
        {children}
      </ProgressTracker>
    );
  },

  log_viewer: (node, children) => {
    const props = toProps(node);
    return (
      <LogViewer
        entries={props.entries as { timestamp?: string; level: "debug" | "info" | "warn" | "error"; message: string }[] | undefined}
        autoScroll={props.autoScroll as boolean | undefined}
      >
        {children}
      </LogViewer>
    );
  },

  setup_stepper: (node, children) => {
    const props = toProps(node);
    return (
      <SetupStepper
        steps={props.steps as { label: string; status: string }[] | undefined}
      >
        {children}
      </SetupStepper>
    );
  },

  install_modal: (node, children) => {
    const props = toProps(node);
    return (
      <ExtensionInstallModal
        visible={props.visible as boolean | undefined}
        phases={props.phases as { name: string; status: string }[] | undefined}
        logs={props.logs as string[] | undefined}
        progress={props.progress as { percent: number; bytesLoaded?: number; bytesTotal?: number } | undefined}
        elapsed={props.elapsed as string | undefined}
      >
        {children}
      </ExtensionInstallModal>
    );
  },

  summary_strip: (node, children) => {
    const props = toProps(node);
    return (
      <SummaryStrip
        items={props.items as { label: string; value: string; badge?: string }[] | undefined}
      >
        {children}
      </SummaryStrip>
    );
  },

  runtime_card: (node, children) => {
    const props = toProps(node);
    return (
      <RuntimeCard
        title={props.title as string | undefined}
        fields={props.fields as { label: string; value: string }[] | undefined}
      >
        {children}
      </RuntimeCard>
    );
  },

  profile_card: (node, children) => {
    const props = toProps(node);
    return (
      <RuntimeCard
        title={props.title as string | undefined}
        fields={props.fields as { label: string; value: string }[] | undefined}
      >
        {children}
      </RuntimeCard>
    );
  },

  diagnostics_view: (node, children) => {
    const props = toProps(node);
    return (
      <DiagnosticsView
        failure={props.failure as { category: string; message: string; detail: string; command?: string; remediation: string; binaryPath?: string; modelPath?: string } | undefined}
        nextAction={props.nextAction as { label: string; action: string } | undefined}
      >
        {children}
      </DiagnosticsView>
    );
  },

  history_list: (node, children) => {
    const props = toProps(node);
    return (
      <HistoryList
        entries={props.entries as { id: string; action: string; result: string; startedAt: string; finishedAt?: string; summary?: string }[] | undefined}
      >
        {children}
      </HistoryList>
    );
  },

  models_panel: (node, _children) => {
    const props = toProps(node);
    const extensionId = (props.extension_id as string | undefined) ?? "local-llm";
    return <ModelsPanel extensionId={extensionId} />;
  },

  backend_selector: (node, children) => {
    const props = toProps(node);
    return (
      <BackendSelector
        backends={props.backends as BackendOption[] | undefined}
        title={props.title as string | undefined}
        description={props.description as string | undefined}
      >
        {children}
      </BackendSelector>
    );
  },

  workspace_shell: (node, children) => {
    const props = toProps(node);
    const rawChildren = node.children ?? [];
    const toolbarActions = (props.toolbarActions as ToolbarAction[] | undefined) ?? [];
    const eyebrow = props.eyebrow as string | undefined;

    const drawers: DrawerConfig[] = [];
    const contentNodes: ReactNode[] = [];

    rawChildren.forEach((raw, i) => {
      const rendered = children[i];
      if (raw.type === "workspace_drawer") {
        const drawerProps = raw.props ?? {};
        drawers.push({
          id: (drawerProps.id as string) ?? String(i),
          title: (drawerProps.title as string) ?? "",
          width: drawerProps.width as number | undefined,
          body: rendered,
        });
      } else {
        contentNodes.push(rendered);
      }
    });

    return (
      <WorkspaceShell eyebrow={eyebrow} toolbarActions={toolbarActions} drawers={drawers}>
        {contentNodes}
      </WorkspaceShell>
    );
  },

  workspace_drawer: (_node, children) => <>{children}</>,
  workspace_content: (_node, children) => <>{children}</>,
};

export function getComponentRenderer(type: string): ComponentRenderer | undefined {
  return registry[type];
}

export function getRegisteredTypes(): string[] {
  return Object.keys(registry);
}
