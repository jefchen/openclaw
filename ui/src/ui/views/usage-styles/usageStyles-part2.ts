export const usageStylesPart2 = `
  .usage-list-item .muted {
    font-size: 11px;
  }
  .usage-error-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .usage-error-row {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;
    align-items: center;
    font-size: 12px;
  }
  .usage-error-date {
    font-weight: 600;
  }
  .usage-error-rate {
    font-variant-numeric: tabular-nums;
  }
  .usage-error-sub {
    grid-column: 1 / -1;
    font-size: 11px;
    color: var(--muted);
  }
  .usage-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 8px;
  }
  .usage-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 2px 8px;
    border: 1px solid var(--border);
    border-radius: 999px;
    font-size: 11px;
    background: var(--bg);
    color: var(--text);
  }
  .usage-meta-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
  }
  .usage-meta-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 12px;
  }
  .usage-meta-item span {
    color: var(--muted);
    font-size: 11px;
  }
  .usage-insights-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 16px;
    margin-top: 16px;
  }
  .usage-insight-card {
    padding: 16px;
    border-radius: 12px;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease;
  }
  .usage-insight-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    border-color: var(--border-strong);
  }
  .usage-insight-title {
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 10px;
  }
  .usage-insight-subtitle {
    font-size: 11px;
    color: var(--muted);
    margin-top: 6px;
  }
  /* ===== CHART TOGGLE ===== */
  .chart-toggle {
    display: flex;
    background: var(--bg);
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--border);
  }
  .chart-toggle .toggle-btn {
    padding: 6px 14px;
    font-size: 13px;
    background: transparent;
    border: none;
    color: var(--muted);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .chart-toggle .toggle-btn:hover {
    color: var(--text);
    background: rgba(255, 255, 255, 0.03);
  }
  .chart-toggle .toggle-btn.active {
    background: linear-gradient(135deg, #ff5c5c 0%, #ff4d4d 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(255, 77, 77, 0.25);
  }
  .chart-toggle.small .toggle-btn {
    padding: 4px 8px;
    font-size: 11px;
  }
  .sessions-toggle {
    border-radius: 4px;
  }
  .sessions-toggle .toggle-btn {
    border-radius: 4px;
  }
  .daily-chart-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    margin-bottom: 6px;
  }

  /* ===== DAILY BAR CHART ===== */
  @keyframes bar-grow {
    from { transform: scaleY(0); }
    to { transform: scaleY(1); }
  }
  .daily-chart {
    margin-top: 12px;
  }
  .daily-chart-bars {
    display: flex;
    align-items: flex-end;
    height: 200px;
    gap: 4px;
    padding: 8px 4px 36px;
  }
  .daily-bar-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    justify-content: flex-end;
    cursor: pointer;
    position: relative;
    border-radius: 4px 4px 0 0;
    transition: background 0.2s ease;
    min-width: 0;
  }
  .daily-bar-wrapper:hover {
    background: var(--bg-hover);
  }
  .daily-bar-wrapper.selected {
    background: var(--accent-subtle);
  }
  .daily-bar-wrapper.selected .daily-bar {
    background: var(--accent);
  }
  .daily-bar {
    width: 100%;
    max-width: var(--bar-max-width, 32px);
    background: linear-gradient(180deg, #ff6b6b 0%, #ff4d4d 40%, #e63946 100%);
    border-radius: 4px 4px 0 0;
    min-height: 2px;
    transition: all 0.2s ease;
    overflow: hidden;
    transform-origin: bottom;
    animation: bar-grow 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  }
  .daily-bar-wrapper:nth-child(1) .daily-bar { animation-delay: 0ms; }
  .daily-bar-wrapper:nth-child(2) .daily-bar { animation-delay: 20ms; }
  .daily-bar-wrapper:nth-child(3) .daily-bar { animation-delay: 40ms; }
  .daily-bar-wrapper:nth-child(4) .daily-bar { animation-delay: 60ms; }
  .daily-bar-wrapper:nth-child(5) .daily-bar { animation-delay: 80ms; }
  .daily-bar-wrapper:nth-child(6) .daily-bar { animation-delay: 100ms; }
  .daily-bar-wrapper:nth-child(7) .daily-bar { animation-delay: 120ms; }
  .daily-bar-wrapper:nth-child(n+8) .daily-bar { animation-delay: 140ms; }
  .daily-bar-wrapper:hover .daily-bar {
    background: linear-gradient(180deg, #ff7d7d 0%, #ff5c5c 40%, #cc3d3d 100%);
    filter: brightness(1.1);
  }
  .daily-bar-label {
    position: absolute;
    bottom: -28px;
    font-size: 10px;
    color: var(--muted);
    white-space: nowrap;
    text-align: center;
    transform: rotate(-35deg);
    transform-origin: top center;
  }
  .daily-bar-total {
    position: absolute;
    top: -16px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 10px;
    color: var(--muted);
    white-space: nowrap;
  }
  .daily-bar-tooltip {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 12px;
    white-space: nowrap;
    z-index: 100;
    box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s ease;
  }
  .daily-bar-wrapper:hover .daily-bar-tooltip {
    opacity: 1;
  }

  /* ===== COST/TOKEN BREAKDOWN BAR ===== */
  .cost-breakdown {
    margin-top: 18px;
    padding: 16px;
    background: var(--bg-secondary);
    border-radius: 10px;
  }
  .cost-breakdown-header {
    font-weight: 600;
    font-size: 15px;
    letter-spacing: -0.02em;
    margin-bottom: 12px;
    color: var(--text-strong);
  }
  .cost-breakdown-bar {
    height: 28px;
    background: var(--bg);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  .cost-segment {
    height: 100%;
    transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
  }
  .cost-segment.output {
    background: linear-gradient(135deg, #ef4444, #dc2626);
  }
  .cost-segment.input {
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
  }
  .cost-segment.cache-write {
    background: linear-gradient(135deg, #34d399, #10b981);
  }
  .cost-segment.cache-read {
    background: linear-gradient(135deg, #22d3ee, #06b6d4);
  }
  .cost-breakdown-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 12px;
  }
  .cost-breakdown-total {
    margin-top: 10px;
    font-size: 12px;
    color: var(--muted);
  }
  .legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--text);
    cursor: help;
  }
  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 3px;
    flex-shrink: 0;
  }
  .legend-dot.output {
    background: linear-gradient(135deg, #ef4444, #dc2626);
  }
  .legend-dot.input {
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
  }
  .legend-dot.cache-write {
    background: linear-gradient(135deg, #34d399, #10b981);
  }
  .legend-dot.cache-read {
    background: linear-gradient(135deg, #22d3ee, #06b6d4);
  }
  .legend-dot.system {
    background: linear-gradient(135deg, #ff5c5c, #ff4d4d);
  }
  .legend-dot.skills {
    background: linear-gradient(135deg, #a78bfa, #8b5cf6);
  }
  .legend-dot.tools {
    background: linear-gradient(135deg, #f472b6, #ec4899);
  }
  .legend-dot.files {
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
  }
  .cost-breakdown-note {
    margin-top: 10px;
    font-size: 11px;
    color: var(--muted);
    line-height: 1.4;
  }

  /* ===== PURPOSE BREAKDOWN DONUT ===== */
  .purpose-breakdown {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--border);
  }
  .purpose-breakdown-header {
    font-weight: 600;
    font-size: 15px;
    letter-spacing: -0.02em;
    margin-bottom: 14px;
    color: var(--text-strong);
  }
  .purpose-breakdown-content {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  .purpose-donut {
    width: 140px;
    height: 140px;
    flex-shrink: 0;
  }
  .purpose-donut circle {
    transition: stroke-dasharray 0.6s cubic-bezier(0.16, 1, 0.3, 1), stroke-dashoffset 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .purpose-donut-center {
    font-size: 13px;
    font-weight: 700;
    fill: var(--text-strong);
  }
  .purpose-donut-sub {
    font-size: 7px;
    fill: var(--muted);
  }
  .purpose-legend {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    min-width: 0;
  }
  .purpose-legend-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: var(--text);
  }
  .purpose-legend-dot {
    width: 8px;
    height: 8px;
    border-radius: 3px;
    flex-shrink: 0;
  }
  .purpose-legend-label {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .purpose-legend-value {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: var(--text-strong);
  }
  .purpose-legend-pct {
    font-size: 11px;
    color: var(--muted);
    min-width: 36px;
    text-align: right;
  }

  /* ===== SESSION BARS (scrollable list) ===== */
  .session-bars {
    margin-top: 16px;
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid var(--border);
    border-radius: 10px;
    background: var(--bg);
  }
  .session-bar-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 14px;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    transition: background 0.2s ease, transform 0.15s ease;
  }
  .session-bar-row:last-child {
    border-bottom: none;
  }
  .session-bar-row:hover {
    background: var(--bg-hover);
  }
  .session-bar-row.selected {
    background: var(--accent-subtle);
  }
  .session-bar-label {
    flex: 1 1 auto;
    min-width: 0;
    font-size: 13px;
    color: var(--text);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  .session-bar-title {
    /* Prefer showing the full name; wrap instead of truncating. */
    white-space: normal;
    overflow-wrap: anywhere;
    word-break: break-word;
  }
  .session-bar-meta {
    font-size: 10px;
    color: var(--muted);
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .session-bar-track {
    flex: 0 0 90px;
    height: 6px;
    background: var(--bg-secondary);
    border-radius: 4px;
    overflow: hidden;
    opacity: 0.6;
  }
  .session-bar-fill {
    height: 100%;
    background: rgba(255, 77, 77, 0.7);
    border-radius: 4px;
    transition: width 0.3s ease;
  }
  .session-bar-value {
    flex: 0 0 70px;
    text-align: right;
    font-size: 12px;
    font-family: var(--font-mono);
    color: var(--muted);
  }
  .session-bar-actions {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex: 0 0 auto;
  }
  .session-copy-btn {
    height: 26px;
    padding: 0 10px;
    border-radius: 999px;
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    font-size: 11px;
    font-weight: 600;
    color: var(--muted);
    cursor: pointer;
    transition: background 0.15s, border-color 0.15s, color 0.15s;
  }
  .session-copy-btn:hover {
    background: var(--bg);
    border-color: var(--border-strong);
    color: var(--text);
  }

  /* ===== TIME SERIES CHART ===== */
  .session-timeseries {
    margin-top: 24px;
    padding: 16px;
    background: var(--bg-secondary);
    border-radius: 8px;
  }
  .timeseries-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  .timeseries-controls {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .timeseries-header {
    font-weight: 600;
    color: var(--text);
  }
  .timeseries-chart {
    width: 100%;
    overflow: hidden;
  }
  .timeseries-svg {
    width: 100%;
    height: auto;
    display: block;
  }
  .timeseries-svg .axis-label {
    font-size: 10px;
    fill: var(--muted);
  }
  .timeseries-svg .ts-area {
    fill: #ff4d4d;
    fill-opacity: 0.1;
  }
  .timeseries-svg .ts-line {
    fill: none;
    stroke: #ff4d4d;
    stroke-width: 2;
  }
  .timeseries-svg .ts-dot {
    fill: #ff4d4d;
    transition: r 0.15s, fill 0.15s;
  }
  .timeseries-svg .ts-dot:hover {
    r: 5;
  }
  .timeseries-svg .ts-bar {
    fill: #ff4d4d;
    transition: fill 0.2s ease;
  }
  .timeseries-svg .ts-bar:hover {
    fill: #ff6b6b;
  }
  .timeseries-svg .ts-bar.dimmed {
    opacity: 0.3;
  }
  .timeseries-svg .ts-bar.output { fill: #ef4444; }
  .timeseries-svg .ts-bar.input { fill: #f59e0b; }
  .timeseries-svg .ts-bar.cache-write { fill: #10b981; }
  .timeseries-svg .ts-bar.cache-read { fill: #06b6d4; }
  .timeseries-svg .ts-bar.output.dimmed { opacity: 0.3; }
  .timeseries-svg .ts-bar.input.dimmed { opacity: 0.3; }
  .timeseries-svg .ts-bar.cache-write.dimmed { opacity: 0.3; }
  .timeseries-svg .ts-bar.cache-read.dimmed { opacity: 0.3; }
  .timeseries-summary {
    margin-top: 12px;
    font-size: 13px;
    color: var(--muted);
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .timeseries-loading {
    padding: 24px;
    text-align: center;
    color: var(--muted);
  }

  /* ===== SESSION LOGS ===== */
  .session-logs {
    margin-top: 24px;
    background: var(--bg-secondary);
    border-radius: 8px;
    overflow: hidden;
  }
  .session-logs-header {
    padding: 10px 14px;
    font-weight: 600;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    background: var(--bg-secondary);
  }
  .session-logs-loading {
    padding: 24px;
    text-align: center;
    color: var(--muted);
  }
  .session-logs-list {
    max-height: 400px;
    overflow-y: auto;
  }
  .session-log-entry {
    padding: 10px 14px;
    border-bottom: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: var(--bg);
    transition: background 0.15s ease;
  }
  .session-log-entry:hover {
    background: var(--bg-hover);
  }
  .session-log-entry:last-child {
    border-bottom: none;
  }
  .session-log-entry.user {
    border-left: 3px solid var(--accent);
  }
  .session-log-entry.assistant {
    border-left: 3px solid var(--border-strong);
  }
  .session-log-meta {
    display: flex;
    gap: 8px;
    align-items: center;
    font-size: 11px;
    color: var(--muted);
    flex-wrap: wrap;
  }
  .session-log-role {
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 999px;
    background: var(--bg-secondary);
    border: 1px solid var(--border);
  }
  .session-log-entry.user .session-log-role {
    color: var(--accent);
  }
  .session-log-entry.assistant .session-log-role {
    color: var(--muted);
  }
  .session-log-content {
    font-size: 13px;
    line-height: 1.5;
    color: var(--text);
    white-space: pre-wrap;
    word-break: break-word;
    background: var(--bg-secondary);
    border-radius: 8px;
    padding: 8px 10px;
    border: 1px solid var(--border);
    max-height: 220px;
    overflow-y: auto;
  }

  /* ===== CONTEXT WEIGHT BREAKDOWN ===== */
  .context-weight-breakdown {
    margin-top: 24px;
    padding: 16px;
    background: var(--bg-secondary);
    border-radius: 8px;
  }
  .context-weight-breakdown .context-weight-header {
    font-weight: 600;
    font-size: 13px;
    margin-bottom: 4px;
    color: var(--text);
  }
  .context-weight-desc {
    font-size: 12px;
    color: var(--muted);
    margin: 0 0 12px 0;
  }
  .context-stacked-bar {
    height: 24px;
    background: var(--bg);
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  .context-segment {
    height: 100%;
    transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .context-segment.system {
    background: linear-gradient(135deg, #ff5c5c, #ff4d4d);
  }
  .context-segment.skills {
    background: linear-gradient(135deg, #a78bfa, #8b5cf6);
  }
  .context-segment.tools {
    background: linear-gradient(135deg, #f472b6, #ec4899);
  }
  .context-segment.files {
    background: linear-gradient(135deg, #fbbf24, #f59e0b);
  }
  .context-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    margin-top: 12px;
  }
  .context-total {
    margin-top: 10px;
    font-size: 12px;
    font-weight: 600;
    color: var(--muted);
  }
  .context-details {
    margin-top: 12px;
    border: 1px solid var(--border);
    border-radius: 6px;
    overflow: hidden;
  }
  .context-details summary {
    padding: 10px 14px;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    background: var(--bg);
    border-bottom: 1px solid var(--border);
  }
  .context-details[open] summary {
    border-bottom: 1px solid var(--border);
  }
  .context-list {
    max-height: 200px;
    overflow-y: auto;
  }
  .context-list-header {
    display: flex;
    justify-content: space-between;
    padding: 8px 14px;
    font-size: 11px;
    text-transform: uppercase;
    color: var(--muted);
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border);
  }
  .context-list-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 14px;
    font-size: 12px;
    border-bottom: 1px solid var(--border);
  }
  .context-list-item:last-child {
    border-bottom: none;
  }
  .context-list-item .mono {
    font-family: var(--font-mono);
    color: var(--text);
  }
  .context-list-item .muted {
    color: var(--muted);
    font-family: var(--font-mono);
  }

  /* ===== NO CONTEXT NOTE ===== */
  .no-context-note {
    margin-top: 24px;
    padding: 16px;
    background: var(--bg-secondary);
    border-radius: 8px;
    font-size: 13px;
    color: var(--muted);
    line-height: 1.5;
  }

  /* ===== TWO COLUMN LAYOUT ===== */
  .usage-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    margin-top: 18px;
    align-items: stretch;
  }
  .usage-grid-left {
    display: flex;
    flex-direction: column;
  }
  .usage-grid-right {
    display: flex;
    flex-direction: column;
  }

  /* ===== LEFT CARD (Daily + Breakdown) ===== */
  .usage-left-card {
    /* inherits background, border, shadow from .card */
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .usage-left-card .daily-chart-bars {
    flex: 1;
    min-height: 200px;
  }
  .usage-left-card .sessions-panel-title {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 12px;
  }

  /* ===== LOGS PAGE ENHANCEMENTS ===== */
  .logs-page-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    flex-wrap: wrap;
  }
  .logs-page-header-left {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .running-now-strip {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 10px 16px;
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(20, 184, 166, 0.06) 100%);
    border: 1px solid rgba(34, 197, 94, 0.2);
    border-radius: 10px;
    margin-top: 12px;
    margin-bottom: 4px;
    font-size: 12px;
    color: var(--text);
  }
  .running-now-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #22c55e;
    box-shadow: 0 0 8px rgba(34, 197, 94, 0.5);
    animation: status-pulse 2s ease-in-out infinite;
    flex-shrink: 0;
  }
  .running-now-label {
    font-weight: 600;
    color: #22c55e;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    font-size: 10px;
  }
  .running-now-items {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    flex: 1;
  }
  .running-now-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 3px 10px;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 999px;
    font-size: 11px;
  }
  .running-now-item::before {
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #22c55e;
    animation: status-pulse 1.5s ease-in-out infinite;
  }
  .log-source-filter {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .log-source-filter select {
    padding: 6px 10px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: var(--bg);
    color: var(--text);
    font-size: 12px;
    min-width: 140px;
  }
  .log-source-filter label {
    font-size: 12px;
    color: var(--muted);
    font-weight: 500;
  }
`;
