import { html, nothing } from "lit";

export type ActiveCronRun = {
  jobId: string;
  jobName: string;
  startedAt: number;
  sessionKey?: string;
};

function formatElapsed(startedAt: number): string {
  const elapsed = Math.max(0, Math.round((Date.now() - startedAt) / 1000));
  if (elapsed < 60) {
    return `${elapsed}s`;
  }
  const mins = Math.floor(elapsed / 60);
  const secs = elapsed % 60;
  return `${mins}m ${secs}s`;
}

export function renderActiveCrons(activeRuns: ActiveCronRun[], onNavigateToCron?: () => void) {
  if (activeRuns.length === 0) {
    return nothing;
  }

  return html`
    <div style="
      margin-bottom: 12px;
      padding: 8px 12px;
      border-radius: var(--radius-md, 8px);
      background: rgba(34, 197, 94, 0.08);
      border: 1px solid rgba(34, 197, 94, 0.25);
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      font-size: 12px;
    ">
      <span style="
        width: 8px; height: 8px;
        border-radius: 50%;
        background: #22c55e;
        animation: status-pulse 2s ease-in-out infinite;
        flex-shrink: 0;
      "></span>
      <span style="color: var(--text); font-weight: 600;">Active cron:</span>
      ${activeRuns.map(
        (run) => html`
          <span style="
            padding: 2px 8px;
            border-radius: 4px;
            background: rgba(34, 197, 94, 0.12);
            color: var(--text);
          ">
            ${run.jobName}
            <span style="opacity: 0.6; margin-left: 4px;">${formatElapsed(run.startedAt)}</span>
          </span>
        `,
      )}
      ${
        onNavigateToCron
          ? html`<button
            class="btn"
            style="font-size: 11px; padding: 2px 8px; margin-left: auto;"
            @click=${onNavigateToCron}
          >View</button>`
          : nothing
      }
    </div>
  `;
}
