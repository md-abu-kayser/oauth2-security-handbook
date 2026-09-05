# OAuth 2.0 Best Practices — 2025 Reference Edition

> Filename retained for repository continuity. For current decisions, use the newest applicable security standards and provider documentation.

## Baseline

```text
Authorization Code
+
PKCE (S256)
+
exact redirect URI validation
+
state / transaction binding
+
HTTPS
+
strict issuer/audience validation
+
least privilege
+
secure token storage
```

## Avoid

```text
Implicit for new systems
Password grant for new systems
wildcard redirect URIs
open redirectors
tokens in URLs
hard-coded secrets
decoded-only JWT trust
email-only external identity keys
token logging
```

## Operations

```text
secret scanning
dependency scanning
negative security tests
audit logs
request correlation
alerts
incident response
```
