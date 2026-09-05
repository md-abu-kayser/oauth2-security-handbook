# 04 — Tools for Testing: Postman and OAuth Playgrounds

Postman can execute common OAuth 2.0 flows, including Authorization Code, Authorization Code with PKCE, Client Credentials, Device-style scenarios, and token requests depending on the configuration. citeturn143287search11

## 1. Postman workflow

Use a collection:

```text
OAuth Test Collection
├── 01 Authorization
├── 02 Callback / token setup
├── 03 Token request
├── 04 Protected API
├── 05 Error cases
└── 06 Introspection / revocation
```

## 2. Environment variables

Store non-secret configuration as variables:

```text
baseUrl
authorizationUrl
tokenUrl
clientId
redirectUri
scope
```

Treat secrets and tokens as sensitive even when using Postman environments.

## 3. Authorization Code + PKCE

Postman can be configured for Authorization Code with PKCE. citeturn143287search11

Verify manually:

```text
authorization request
code
verifier
token response
API call
```

## 4. Token inspection

For JWTs, inspect:

```text
header
payload
signature
issuer
audience
expiration
scopes
```

Remember:

```text
decode != verify
```

A token viewer is not a substitute for cryptographic validation.

## 5. Negative test collection

Build requests for:

```text
missing Authorization
invalid token
expired token
wrong scope
wrong audience
malformed token
```

## 6. Reproducibility

Export:

```text
collection.json
environment template
README
test data
```

Never export real production secrets.

## 7. OAuth playground mindset

A good playground should expose:

```text
browser redirect
authorization request
token exchange
token claims
API request
errors
```

Use it to understand the HTTP wire format before relying on a high-level SDK.

## 8. Lab

Create a Postman collection that executes:

```text
Authorization Code + PKCE
  -> token
  -> protected endpoint
  -> intentionally invalid request
```

Document every request and response field.
