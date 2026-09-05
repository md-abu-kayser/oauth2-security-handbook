# 08 — Integrations and Providers

This section turns protocol knowledge into provider-specific engineering practice.

> **Important:** Providers implement OAuth 2.0/OIDC with product-specific endpoints, scopes, consent behavior, token lifetimes, identity APIs, and operational policies. Always verify provider configuration against its current official documentation.

## Chapters

| Chapter | Provider / Topic                       |
| ------- | -------------------------------------- |
| 01      | Google OAuth 2.0                       |
| 02      | GitHub OAuth 2.0                       |
| 03      | Facebook Login / OAuth                 |
| 04      | Microsoft identity platform            |
| 05      | Auth0 and Okta                         |
| 06      | Keycloak and open-source IdPs          |
| 07      | Social login security and architecture |

## Common integration pattern

```text
Application
   |
   | Authorization Request
   v
Provider
   |
   | Authorization Code
   v
Application callback
   |
   | Code + PKCE / client authentication
   v
Token Endpoint
   |
   | Access Token / ID Token
   v
Application
```

## Provider integration checklist

- [ ] Register the correct application type.
- [ ] Configure exact redirect URIs.
- [ ] Use Authorization Code for modern browser/server integrations.
- [ ] Use PKCE for public/browser/native clients as appropriate.
- [ ] Request minimum scopes.
- [ ] Keep confidential credentials server-side.
- [ ] Validate provider issuer and token semantics.
- [ ] Use provider APIs only with the scopes actually required.
- [ ] Document logout, revocation, refresh, and account-linking behavior.
- [ ] Pin production configuration to the intended environment.
