# Project 02 — Single-Page App with PKCE

## Outcome

Build a browser application using Authorization Code + PKCE and compare direct-browser token handling with a Backend-for-Frontend (BFF) architecture.

## Architecture options

```text
Direct:
SPA -> Authorization Server -> SPA -> API

BFF:
Browser -> BFF -> Authorization Server
                -> API
```

## Acceptance criteria

- No client secret is embedded in browser code.
- State is validated on callback.
- PKCE uses S256.
- OAuth artifacts are isolated from unrelated UI code.
- Session lifetime and logout are explicit.
- XSS/CSRF/token-storage trade-offs are documented.
