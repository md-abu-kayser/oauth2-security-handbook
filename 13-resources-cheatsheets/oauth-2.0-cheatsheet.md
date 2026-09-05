# OAuth 2.0 Quick Reference

## Roles

```text
Resource Owner       -> controls a protected resource
Client               -> requests delegated authorization
Authorization Server -> issues authorization credentials/tokens
Resource Server      -> protects APIs/resources
```

## Core endpoints

```text
Authorization
Token
Introspection
Revocation
```

## Modern redirect-based flow

```text
Authorization Code
+
PKCE (S256)
+
state
+
exact redirect URI
+
HTTPS
```

## Token rule

```text
Access Token -> resource/API authorization
ID Token     -> OIDC authentication assertion
```

## Validation

```text
signature
issuer
audience
expiration
scope
```
