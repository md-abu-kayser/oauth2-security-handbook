# Grant / Flow Comparison

| Scenario | Preferred direction |
|---|---|
| Server-side web app | Authorization Code |
| SPA | Authorization Code + PKCE |
| Native app | Authorization Code + PKCE |
| Device | Device Authorization |
| Machine-to-machine | Client Credentials |
| OIDC sign-in | Authorization Code + OIDC |

## Legacy

```text
Implicit Grant
Resource Owner Password Credentials
```

Do not select a legacy mode for a new system simply because an old tutorial demonstrates it.

## Decision tree

```text
End-user?
|
+-- No -> service-to-service -> Client Credentials
|
+-- Yes -> redirect-capable -> Authorization Code
|                     + PKCE for public clients
|
+-- Device-constrained -> Device Authorization
```
