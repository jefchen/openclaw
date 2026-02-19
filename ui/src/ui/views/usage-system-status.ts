import { html, nothing } from "lit";

interface SystemStats {
  cpu: { usagePercent: number; loadAvg: [number, number, number] };
  memory: { usedGB: number; totalGB: number; usagePercent: number };
  disk: { usedGB: number; totalGB: number; usagePercent: number };
}

let cachedStats: SystemStats | null = null;
let fetchInFlight = false;
let lastFetchMs = 0;
const STALE_MS = 5_000;

function barColor(pct: number): string {
  if (pct >= 80) return "#ef4444";
  if (pct >= 50) return "#eab308";
  return "#22c55e";
}

function gradientBar(pct: number): ReturnType<typeof html> {
  const color = barColor(pct);
  const clamped = Math.min(100, Math.max(0, pct));
  return html`
    <div style="
      position: relative;
      height: 8px;
      border-radius: 6px;
      background: var(--border, #333);
      overflow: hidden;
      flex: 1;
      min-width: 80px;
    ">
      <div style="
        position: absolute;
        inset: 0;
        width: ${clamped.toFixed(1)}%;
        border-radius: 6px;
        background: linear-gradient(90deg, ${color}cc, ${color});
        transition: width 0.4s ease;
      "></div>
    </div>
  `;
}

function renderGaugeRow(
  label: string,
  pct: number,
  detail: string,
): ReturnType<typeof html> {
  const color = barColor(pct);
  return html`
    <div style="display: flex; align-items: center; gap: 12px; min-width: 0;">
      <span style="
        font-size: 11px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.04em;
        color: var(--muted);
        min-width: 52px;
      ">${label}</span>
      ${gradientBar(pct)}
      <span style="
        font-size: 14px;
        font-weight: 700;
        color: ${color};
        min-width: 44px;
        text-align: right;
        letter-spacing: -0.02em;
      ">${pct.toFixed(0)}%</span>
      <span style="
        font-size: 11px;
        color: var(--muted);
        white-space: nowrap;
      ">${detail}</span>
    </div>
  `;
}

export function renderSystemStatus(
  onRequestUpdate?: () => void,
): ReturnType<typeof html> {
  const now = Date.now();

  // Trigger a non-blocking fetch if data is stale
  if (!fetchInFlight && now - lastFetchMs > STALE_MS) {
    fetchInFlight = true;
    fetch("http://127.0.0.1:18790/stats")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: any) => {
        cachedStats = data as SystemStats;
        lastFetchMs = Date.now();
        onRequestUpdate?.();
      })
      .catch(() => {
        // Silently ignore - we'll show "unavailable" state
        lastFetchMs = Date.now();
      })
      .finally(() => {
        fetchInFlight = false;
      });
  }

  if (!cachedStats) {
    if (fetchInFlight) {
      return html`
        <div class="system-status-strip">
          <div class="system-status-title">System</div>
          <span style="font-size: 12px; color: var(--muted);">Loading system stats...</span>
        </div>
      `;
    }
    return nothing;
  }

  const stats = cachedStats;

  return html`
    <div class="system-status-strip">
      <div class="system-status-title">System</div>
      <div style="display: flex; flex-direction: column; gap: 8px; flex: 1; min-width: 0;">
        ${renderGaugeRow("CPU", stats.cpu.usagePercent, "")}
        ${renderGaugeRow(
          "Mem",
          stats.memory.usagePercent,
          `${stats.memory.usedGB.toFixed(1)} / ${stats.memory.totalGB.toFixed(1)} GB`,
        )}
        ${renderGaugeRow(
          "Disk",
          stats.disk.usagePercent,
          `${stats.disk.usedGB.toFixed(1)} / ${stats.disk.totalGB.toFixed(1)} GB`,
        )}
      </div>
      <div class="system-status-meta">
        <span style="font-size: 11px; color: var(--muted);">
          Load: ${stats.cpu.loadAvg[0].toFixed(2)} / ${stats.cpu.loadAvg[1].toFixed(2)} / ${stats.cpu.loadAvg[2].toFixed(2)}
        </span>
        <span class="system-status-live">Live</span>
      </div>
    </div>
  `;
}
