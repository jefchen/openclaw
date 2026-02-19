import { loadCostUsageSummary } from "../infra/session-cost-usage.js";

function formatTokens(n: number): string {
  if (n >= 1_000_000) {
    return `${(n / 1_000_000).toFixed(1)}M`;
  }
  if (n >= 1_000) {
    return `${(n / 1_000).toFixed(1)}K`;
  }
  return String(n);
}

function formatCost(n: number): string {
  return `$${n.toFixed(2)}`;
}

export async function generateDailyUsageReport(daysBack = 1): Promise<string> {
  const now = new Date();
  const endOfDay = new Date(now);
  endOfDay.setHours(0, 0, 0, 0);

  const startOfDay = new Date(endOfDay);
  startOfDay.setDate(startOfDay.getDate() - daysBack);

  const summary = await loadCostUsageSummary({
    startMs: startOfDay.getTime(),
    endMs: endOfDay.getTime(),
  });

  const lines: string[] = [];
  const dateLabel =
    daysBack === 1
      ? startOfDay.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })
      : `${startOfDay.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${new Date(endOfDay.getTime() - 1).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;

  lines.push(`**Daily Usage Report — ${dateLabel}**`);
  lines.push("");
  lines.push(`**Total tokens:** ${formatTokens(summary.totals.totalTokens)}`);
  lines.push(
    `  Input: ${formatTokens(summary.totals.input)} | Output: ${formatTokens(summary.totals.output)} | Cache read: ${formatTokens(summary.totals.cacheRead)}`,
  );
  lines.push(`**Total cost:** ${formatCost(summary.totals.totalCost)}`);
  lines.push(
    `  Input: ${formatCost(summary.totals.inputCost)} | Output: ${formatCost(summary.totals.outputCost)} | Cache: ${formatCost(summary.totals.cacheReadCost + summary.totals.cacheWriteCost)}`,
  );
  lines.push(`**Sessions:** ${summary.daily.length > 0 ? summary.daily.length : 0} day(s)`);

  if (summary.daily.length > 0) {
    lines.push("");
    lines.push("**Daily breakdown:**");
    for (const day of summary.daily.slice(-7)) {
      lines.push(
        `  ${day.date}: ${formatTokens(day.totalTokens)} tokens, ${formatCost(day.totalCost)}`,
      );
    }
  }

  return lines.join("\n");
}
