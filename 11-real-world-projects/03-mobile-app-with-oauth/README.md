# Project 03 — Mobile App with OAuth

## Outcome

Design a native application as a public client using an external user-agent, Authorization Code + PKCE, secure redirect handling, and platform-protected credential storage.

## Core risks

```text
redirect interception
malicious app impersonation
local credential theft
refresh-token replay
background/foreground race conditions
```

## Acceptance criteria

- No shipped client secret is treated as confidential.
- Authorization uses PKCE.
- Redirect mechanism is platform-appropriate.
- Tokens use platform secure storage.
- Refresh is serialized and failures require correct re-authentication behavior.
