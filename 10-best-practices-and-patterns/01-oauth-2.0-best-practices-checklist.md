# 01 — OAuth 2.0 Best Practices Checklist

## Client

```text
[ ] Choose the correct client type
[ ] Do not ship confidential secrets in public clients
[ ] Use Authorization Code for modern redirect-based authorization
[ ] Use PKCE where required / appropriate
[ ] Request minimum scopes
[ ] Protect authorization transactions
```

## Redirects

```text
[ ] Register exact redirect URIs
[ ] Do not use arbitrary redirect parameters
[ ] Avoid open redirectors
[ ] Use HTTPS in production
```

RFC 9700 requires exact redirect URI matching except for its documented localhost-native-app exception and prohibits open redirectors in these flows. citeturn143287search0

## Authorization request

```text
[ ] state
[ ] nonce for OIDC where applicable
[ ] PKCE
[ ] appropriate response type
[ ] minimal scopes
```

## Token endpoint

```text
[ ] authenticate confidential clients appropriately
[ ] enforce code binding
[ ] validate redirect URI
[ ] validate PKCE
[ ] reject replay
[ ] do not leak secrets in errors
```

## Resource server

```text
[ ] Validate issuer
[ ] Validate audience
[ ] Validate expiration
[ ] Validate signature / introspection result
[ ] Validate scope / authorization
[ ] Reject malformed tokens
```

## Operations

```text
[ ] secrets in secret manager
[ ] no token logging
[ ] rotation strategy
[ ] revocation strategy
[ ] alerting
[ ] audit logs
[ ] rate limiting
[ ] security regression tests
```

## Architecture review

Ask:

```text
What is the trust boundary?
What can the attacker control?
What credential is being protected?
What prevents replay?
What prevents redirect abuse?
What happens when a token is compromised?
```
