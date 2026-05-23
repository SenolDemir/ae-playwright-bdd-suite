// src/reporter/html-report-generator.ts

import type { AiAnalysis, PlaywrightStats } from "./reporter.types.ts";

const CATEGORY_META: Record<string, { label: string; color: string }> = {
  locator_failure: { label: "Locator Failure", color: "#BA7517" },
  assertion_failure: { label: "Assertion Failure", color: "#185FA5" },
  api_failure: { label: "API Failure", color: "#A32D2D" },
  test_data_issue: { label: "Test Data Issue", color: "#534AB7" },
  environment_issue: { label: "Environment Issue", color: "#3B6D11" },
  application_bug: { label: "Application Bug", color: "#993C1D" },
  timeout: { label: "Timeout", color: "#5F5E5A" },
  flaky: { label: "Flaky", color: "#0F6E56" },
};

const PRIORITY_META: Record<
  string,
  { label: string; bg: string; text: string }
> = {
  critical: { label: "Critical", bg: "#FCEBEB", text: "#A32D2D" },
  high: { label: "High", bg: "#FAECE7", text: "#993C1D" },
  medium: { label: "Medium", bg: "#FAEEDA", text: "#854F0B" },
  low: { label: "Low", bg: "#EAF3DE", text: "#3B6D11" },
};

export function generateHtmlReport(
  analysis: AiAnalysis,
  stats: PlaywrightStats,
): string {
  const passed = stats?.expected ?? 0;
  const failed = stats?.unexpected ?? analysis.categorizedFailures.length;
  const total = passed + failed + (stats?.skipped ?? 0);
  const duration = stats?.duration
    ? `${Math.round(stats.duration / 1000)}s`
    : "N/A";
  const score = analysis.overallHealthScore ?? 0;
  const scoreColor =
    score >= 80 ? "#0F6E56" : score >= 50 ? "#BA7517" : "#A32D2D";
  const timestamp = new Date().toLocaleString();

  const priorityOrder = analysis.prioritizedFixOrder ?? [];

  const failureCards = analysis.categorizedFailures
    .sort((a, b) => {
      const ai = priorityOrder.indexOf(a.failureNumber);
      const bi = priorityOrder.indexOf(b.failureNumber);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    })
    .map((f, idx) => {
      const cat = CATEGORY_META[f.category] ?? {
        label: f.category,
        color: "#888780",
      };
      const pri = PRIORITY_META[f.priority] ?? {
        label: f.priority,
        bg: "#F1EFE8",
        text: "#5F5E5A",
      };
      const fixRank = priorityOrder.indexOf(f.failureNumber);
      const rankBadge =
        fixRank >= 0
          ? `<span style="background:#E6F1FB;color:#185FA5;font-size:11px;padding:2px 8px;border-radius:4px;font-weight:500;">Fix #${fixRank + 1}</span>`
          : "";
      return `
      <div style="background:#fff;border:0.5px solid #e5e5e3;border-radius:12px;padding:1.25rem;margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;flex-wrap:wrap;">
          ${rankBadge}
          <span style="background:${pri.bg};color:${pri.text};font-size:11px;padding:2px 8px;border-radius:4px;font-weight:500;">${pri.label}</span>
          <span style="background:#F1EFE8;color:${cat.color};font-size:11px;padding:2px 8px;border-radius:4px;font-weight:500;">${cat.label}</span>
          <span style="font-size:13px;color:#444;font-weight:500;margin-left:auto;">#${f.failureNumber} — ${f.title}</span>
        </div>
        <p style="font-size:14px;color:#2c2c2a;margin:0 0 8px;line-height:1.6;">${f.rootCauseSummary}</p>
        <div style="background:#F1EFE8;border-radius:8px;padding:10px 14px;font-size:13px;color:#444;">
          <strong style="color:#2c2c2a;">Suggested action:</strong> ${f.suggestedAction}
        </div>
        <p style="font-size:12px;color:#888;margin:8px 0 0;">${f.priorityReason}</p>
      </div>`;
    })
    .join("");

  const patternCards = (analysis.rootCausePatterns ?? [])
    .map((p) => {
      const likelihoodColor =
        p.likelihood === "high"
          ? "#A32D2D"
          : p.likelihood === "medium"
            ? "#BA7517"
            : "#3B6D11";
      return `
      <div style="background:#fff;border:0.5px solid #e5e5e3;border-radius:12px;padding:1rem 1.25rem;margin-bottom:10px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
          <span style="font-weight:500;font-size:14px;color:#2c2c2a;">${p.pattern}</span>
          <span style="margin-left:auto;font-size:11px;color:${likelihoodColor};font-weight:500;text-transform:uppercase;">${p.likelihood} likelihood</span>
        </div>
        <p style="font-size:13px;color:#5F5E5A;margin:0 0 6px;">${p.description}</p>
        <p style="font-size:12px;color:#888;margin:0;">Affects: ${p.affectedFailures.map((n) => `#${n}`).join(", ")}</p>
      </div>`;
    })
    .join("");

  const quickWins = (analysis.quickWins ?? [])
    .map(
      (w) =>
        `<li style="font-size:13px;color:#2c2c2a;padding:4px 0;">${w}</li>`,
    )
    .join("");

  const systemicIssues = (analysis.systemicIssues ?? [])
    .map(
      (i) =>
        `<li style="font-size:13px;color:#2c2c2a;padding:4px 0;">${i}</li>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>AI Test Analysis Report</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f4f0;color:#2c2c2a;line-height:1.6;padding:2rem}
  h1{font-size:22px;font-weight:500;margin-bottom:4px}
  h2{font-size:16px;font-weight:500;margin-bottom:12px;color:#2c2c2a}
  .container{max-width:860px;margin:0 auto}
  .card{background:#fff;border:0.5px solid #e5e5e3;border-radius:12px;padding:1.5rem;margin-bottom:1.5rem}
  .metric-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;margin-bottom:1.5rem}
  .metric{background:#F1EFE8;border-radius:8px;padding:1rem;text-align:center}
  .metric-label{font-size:12px;color:#5F5E5A;margin-bottom:4px}
  .metric-value{font-size:22px;font-weight:500}
  .tag{display:inline-block;font-size:11px;padding:2px 10px;border-radius:4px;font-weight:500}
  .section-label{font-size:11px;font-weight:500;color:#888;text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px}
  ul{padding-left:1.2rem}
</style>
</head>
<body>
<div class="container">

  <div style="margin-bottom:1.5rem">
    <h1>🤖 AI Test Analysis</h1>
    <p style="font-size:13px;color:#888;">Generated ${timestamp} · AutomationExercise.com Suite</p>
  </div>

  <div class="metric-grid">
    <div class="metric">
      <div class="metric-label">Health score</div>
      <div class="metric-value" style="color:${scoreColor}">${score}</div>
    </div>
    <div class="metric">
      <div class="metric-label">Total tests</div>
      <div class="metric-value">${total}</div>
    </div>
    <div class="metric">
      <div class="metric-label">Passed</div>
      <div class="metric-value" style="color:#0F6E56">${passed}</div>
    </div>
    <div class="metric">
      <div class="metric-label">Failed</div>
      <div class="metric-value" style="color:#A32D2D">${failed}</div>
    </div>
    <div class="metric">
      <div class="metric-label">Duration</div>
      <div class="metric-value" style="font-size:16px">${duration}</div>
    </div>
  </div>

  <div class="card">
    <div class="section-label">Executive summary</div>
    <p style="font-size:15px;color:#2c2c2a;line-height:1.7">${analysis.executiveSummary}</p>
  </div>

  ${
    patternCards
      ? `
  <div class="card">
    <h2>Root cause patterns</h2>
    ${patternCards}
  </div>`
      : ""
  }

  <div class="card">
    <h2>Failures — prioritized fix order</h2>
    ${failureCards}
  </div>

  ${
    quickWins
      ? `
  <div class="card">
    <h2>Quick wins</h2>
    <ul>${quickWins}</ul>
  </div>`
      : ""
  }

  ${
    systemicIssues
      ? `
  <div class="card">
    <h2>Systemic issues</h2>
    <ul>${systemicIssues}</ul>
  </div>`
      : ""
  }

  <p style="font-size:12px;color:#aaa;text-align:center;padding:1rem 0">
    AI analysis powered by Claude · For reference only — verify findings before acting
  </p>

</div>
</body>
</html>`;
}
