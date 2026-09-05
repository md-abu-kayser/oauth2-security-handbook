# OIDC Flow Diagrams

## Authorization Code + PKCE

```text
User
 |
 v
RP ---- authorize ----> OP
 |                       |
 |<-------- code --------|
 |
 | code + verifier
 v
Token Endpoint
 |
 +--> ID Token
 +--> Access Token
```

## ID Token validation

```text
ID Token
  |
  +--> signature
  +--> issuer
  +--> audience
  +--> expiration
  +--> nonce
  |
  v
Authenticated local session
```

## UserInfo

```text
RP -- Access Token --> UserInfo
                         |
                         v
                       claims
```
