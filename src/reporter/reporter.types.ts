// src/reporter/reporter.types.ts

export interface FailureSummary {
  title: string;
  fullPath: string;
  file: string;
  status: "failed" | "timedOut";
  errorMessage: string;
  failedStep: string;
  retries: number;
  duration: number;
  isFlaky: boolean;
}

export interface RootCausePattern {
  pattern: string;
  description: string;
  affectedFailures: number[];
  likelihood: "high" | "medium" | "low";
}

export interface CategorizedFailure {
  failureNumber: number;
  title: string;
  category:
    | "locator_failure"
    | "assertion_failure"
    | "api_failure"
    | "test_data_issue"
    | "environment_issue"
    | "application_bug"
    | "timeout"
    | "flaky";
  rootCauseSummary: string;
  suggestedAction: string;
  priority: "critical" | "high" | "medium" | "low";
  priorityReason: string;
}

export interface AiAnalysis {
  executiveSummary: string;
  overallHealthScore: number;
  rootCausePatterns: RootCausePattern[];
  categorizedFailures: CategorizedFailure[];
  prioritizedFixOrder: number[];
  systemicIssues: string[];
  quickWins: string[];
}

export interface PlaywrightStats {
  expected: number;
  unexpected: number;
  skipped: number;
  duration: number;
}

export interface PlaywrightResults {
  stats: PlaywrightStats;
  suites: any[];
}
