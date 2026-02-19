import { html, nothing } from "lit";

export type UsageLiveRun = {
  runId: string;
  sessionKey?: string;
  startedAt: number;
  toolsActive: number;
};

export type UsageLiveProps = {
  activeRuns: UsageLiveRun[];
  activeCronRuns: number;
};

function formatElapsed(startedAt: number): string {
  const elapsed = Math.max(0, Date.now() - startedAt);
  const secs = Math.floor(elapsed / 1000);
  if (secs < 60) {
    return `${secs}s`;
  }
  const mins = Math.floor(secs / 60);
  const remainSecs = secs % 60;
  return `${mins}m ${remainSecs}s`;
}

export function renderUsageLive(props: UsageLiveProps) {
  const total = props.activeRuns.length + props.activeCronRuns;
  if (total === 0) {
    return nothing;
  }

  return html`
    <div class="usage-live-strip">
      <div class="usage-live-indicator">
        <span class="usage-live-dot"></span>
        <span class="usage-live-label">Live</span>
      </div>
      <div class="usage-live-runs">
        ${props.activeRuns.map(
          (run) => html`
            <span class="usage-live-run">
              <span class="usage-live-run-icon">
                <svg viewBox="0 0 24 24" width="12" height="12"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </span>
              ${run.sessionKey ? html`<span class="usage-live-run-key">${run.sessionKey.length > 24 ? run.sessionKey.slice(0, 24) + "\u2026" : run.sessionKey}</span>` : nothing}
              <span class="usage-live-run-time">${formatElapsed(run.startedAt)}</span>
              ${run.toolsActive > 0 ? html`<span class="usage-live-run-tools">${run.toolsActive} tool${run.toolsActive > 1 ? "s" : ""}</span>` : nothing}
            </span>
          `,
        )}
        ${
          props.activeCronRuns > 0
            ? html`
                <span class="usage-live-run">
                  <span class="usage-live-run-icon">
                    <svg viewBox="0 0 24 24" width="12" height="12"><circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" stroke-width="2"/><path d="M12 6v6l4 2" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round"/></svg>
                  </span>
                  <span>${props.activeCronRuns} cron job${props.activeCronRuns > 1 ? "s" : ""}</span>
                </span>
              `
            : nothing
        }
      </div>
    </div>
  `;
}
