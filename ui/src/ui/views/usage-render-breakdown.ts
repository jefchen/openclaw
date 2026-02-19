import { html, nothing } from "lit";
import { formatCost, formatTokens } from "./usage-metrics.ts";
import type { UsageAggregates } from "./usageTypes.ts";

export type BreakdownTab = "agent" | "model" | "channel" | "tool";

type BreakdownEntry = {
  label: string;
  sublabel?: string;
  tokens: number;
  cost: number;
  count?: number;
};

function buildEntries(aggregates: UsageAggregates, tab: BreakdownTab): BreakdownEntry[] {
  switch (tab) {
    case "agent":
      return (aggregates?.byAgent ?? []).map((a) => ({
        label: a.agentId || "unknown",
        tokens: a.totals.totalTokens,
        cost: a.totals.totalCost,
      }));
    case "model":
      return (aggregates?.byModel ?? []).map((m) => ({
        label: m.model || "unknown",
        sublabel: m.provider,
        tokens: m.totals.totalTokens,
        cost: m.totals.totalCost,
        count: m.count,
      }));
    case "channel":
      return (aggregates?.byChannel ?? []).map((c) => ({
        label: c.channel || "unknown",
        tokens: c.totals.totalTokens,
        cost: c.totals.totalCost,
      }));
    case "tool":
      return (aggregates?.tools?.tools ?? []).map((t) => ({
        label: t.name,
        tokens: 0,
        cost: 0,
        count: t.count,
      }));
    default:
      return [];
  }
}

function renderBar(
  entry: BreakdownEntry,
  maxValue: number,
  mode: "tokens" | "cost",
  isToolTab: boolean,
) {
  const value = isToolTab ? (entry.count ?? 0) : mode === "tokens" ? entry.tokens : entry.cost;
  const pct = maxValue > 0 ? Math.max(1, (value / maxValue) * 100) : 0;
  const displayValue = isToolTab
    ? `${entry.count ?? 0} calls`
    : mode === "tokens"
      ? formatTokens(value)
      : formatCost(value);

  return html`
    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
      <div style="
        width: 120px; flex-shrink: 0;
        font-size: 12px; color: var(--text);
        overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
      " title="${entry.label}${entry.sublabel ? ` (${entry.sublabel})` : ""}">
        ${entry.label}
      </div>
      <div style="flex: 1; height: 20px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden;">
        <div style="
          width: ${pct}%;
          height: 100%;
          background: linear-gradient(90deg, var(--accent), rgba(255, 92, 92, 0.6));
          border-radius: 4px;
          transition: width 0.3s ease;
        "></div>
      </div>
      <div style="
        width: 80px; flex-shrink: 0;
        font-size: 11px; color: var(--muted);
        text-align: right; font-family: var(--mono);
      ">${displayValue}</div>
    </div>
  `;
}

const TABS: { id: BreakdownTab; label: string }[] = [
  { id: "model", label: "Model" },
  { id: "agent", label: "Agent" },
  { id: "channel", label: "Channel" },
  { id: "tool", label: "Tool" },
];

export function renderBreakdownCard(
  aggregates: UsageAggregates | null,
  chartMode: "tokens" | "cost",
  activeTab: BreakdownTab,
  onTabChange: (tab: BreakdownTab) => void,
) {
  if (!aggregates) {
    return nothing;
  }

  const entries = buildEntries(aggregates, activeTab);
  const isToolTab = activeTab === "tool";
  const sorted = [...entries].toSorted((a, b) => {
    if (isToolTab) {
      return (b.count ?? 0) - (a.count ?? 0);
    }
    return chartMode === "tokens" ? b.tokens - a.tokens : b.cost - a.cost;
  });
  const maxValue =
    sorted.length > 0
      ? isToolTab
        ? (sorted[0].count ?? 0)
        : chartMode === "tokens"
          ? sorted[0].tokens
          : sorted[0].cost
      : 0;
  const top = sorted.slice(0, 10);

  return html`
    <div class="card" style="margin-top: 16px;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <div class="card-title" style="margin: 0;">Breakdown</div>
        <div style="display: flex; gap: 4px;">
          ${TABS.map(
            (tab) => html`
              <button
                class="btn ${activeTab === tab.id ? "active" : ""}"
                style="font-size: 11px; padding: 3px 10px; ${activeTab === tab.id ? "background: var(--accent); color: #fff;" : ""}"
                @click=${() => onTabChange(tab.id)}
              >${tab.label}</button>
            `,
          )}
        </div>
      </div>
      ${
        top.length === 0
          ? html`
              <div class="muted" style="font-size: 12px; padding: 8px 0">No data for this breakdown.</div>
            `
          : top.map((entry) => renderBar(entry, maxValue, chartMode, isToolTab))
      }
      ${sorted.length > 10 ? html`<div class="muted" style="font-size: 11px; margin-top: 4px;">+${sorted.length - 10} more</div>` : nothing}
    </div>
  `;
}
