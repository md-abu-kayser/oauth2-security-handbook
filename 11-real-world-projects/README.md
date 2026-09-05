# 11 — Real-World Projects

This section turns OAuth 2.0 and OIDC concepts into production-style systems. Each project is intentionally designed around architecture, trust boundaries, secure defaults, automated verification, deployment, and operational readiness.

## Projects

| Project                | Primary Skills                                                               |
| ---------------------- | ---------------------------------------------------------------------------- |
| 01 — REST API          | Authorization Server, Resource Server, scopes, token validation, hardening   |
| 02 — SPA + PKCE        | Browser OAuth, PKCE, callback security, session design                       |
| 03 — Mobile OAuth      | Native-app constraints, redirect security, secure storage, refresh lifecycle |
| 04 — Microservices     | Gateway, token propagation, service identity, introspection, audit           |
| 05 — Multi-Tenant SaaS | Tenant isolation, tenant-aware claims, OIDC federation, provisioning         |

## Recommended order

```text
01 REST API
    ↓
02 SPA + PKCE
    ↓
03 Mobile OAuth
    ↓
04 Microservices
    ↓
05 Multi-Tenant SaaS
```

## Definition of done

Every project should answer:

```text
Who authenticates whom?
Who issues each token?
Who validates it?
What is its audience?
Which scopes are accepted?
How is the authorization transaction bound?
How are credentials stored and rotated?
How does logout/revocation work?
How is abuse detected?
What happens when the provider is unavailable?
```
