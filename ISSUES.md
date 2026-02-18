# Known Issues

_Living document — add new issues as they're discovered. Format: Symptom → Root Cause → Fix._

## Telegram "fetch failed" on startup — Node.js v25 TLS rejection

**Symptom:** On startup, Telegram probe fails with `Telegram: failed (unknown) - fetch failed`. All 3 retry attempts fail.

**Root Cause:** Homebrew's Node.js v25.6.0 has a CA bundle that rejects Telegram's SSL certificate (`self-signed certificate in certificate chain`). The LaunchAgent plist defaults to `/opt/homebrew/bin/node` which resolves to v25. `curl` and `openssl` work fine because they use the macOS system Keychain, while Node uses its own bundled CA store.

**Diagnosis:**

1. Added logging to `src/telegram/probe.ts` to surface the `cause` property of the fetch error.
2. Confirmed `/opt/homebrew/bin/node` (v25.6.0) fails and `~/.nvm/versions/node/v24.13.0/bin/node` succeeds.

**Fix:** Update `~/Library/LaunchAgents/ai.openclaw.gateway.plist` to use nvm Node:

```xml
<string>/Users/jeffreychen/.nvm/versions/node/v24.13.0/bin/node</string>
```

Then fully reload the LaunchAgent (important: `kickstart` does NOT re-read the plist):

```bash
launchctl bootout gui/501/ai.openclaw.gateway
sleep 2
launchctl bootstrap gui/501 ~/Library/LaunchAgents/ai.openclaw.gateway.plist
```

**Do NOT use** `openclaw daemon restart` or `launchctl kickstart` — these restart the process but keep the cached plist, so the old node path persists.

**Note:** `openclaw onboard --install-daemon` may regenerate the plist and revert to Homebrew node. Cannot uninstall Homebrew node because `gemini-cli` depends on it.

---

## Brave Search API key expiry — "SUBSCRIPTION_TOKEN_INVALID"

**Symptom:** `web_search` calls fail with HTTP 422: `SUBSCRIPTION_TOKEN_INVALID`.

**Root Cause:** Brave Search API key expired or was revoked.

**Fix:** Get a new key from [brave.com/search/api](https://brave.com/search/api/) and update via:

```bash
openclaw config set tools.web.search.apiKey <NEW_KEY>
```

Or patch via gateway config. Restart picks it up automatically.

**Date:** 2026-02-17

---

## Morning briefing cron timeout

**Symptom:** Daily morning briefing cron job fails with `job execution timed out`.

**Root Cause:** Default 120s timeout was too short — the briefing fetches weather, news, stocks, and todos which can take 2+ minutes.

**Fix:** Increase `timeoutSeconds` to 180+ in the cron job payload.

**Date:** 2026-02-17
