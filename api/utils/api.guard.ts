// Live API tests hit the real site, which blocks GitHub-hosted runner IPs.
// They run locally, on a self-hosted runner, or when RUN_LIVE_API=true.
export const skipLiveApi: boolean = !!process.env.CI && process.env.RUN_LIVE_API !== "true";

export const SKIP_REASON =
  "automationexercise.com blocks GitHub-hosted runner IPs: requests may return HTTP 403 " +
  "or an HTML challenge/block page that fails JSON parsing (Unexpected token '<' ... is not valid JSON). " +
  "Run locally, on the self-hosted runner, or with RUN_LIVE_API=true.";
