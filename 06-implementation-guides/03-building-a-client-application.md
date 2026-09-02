# 03 — Building a Client Application

## 1. Client responsibilities

A secure client must correctly handle:

```text
registration
authorization request
state
PKCE
nonce (OIDC)
callback validation
authorization code exchange
token validation
session management
token refresh
logout / revocation policy
```

## 2. Recommended web flow

```text
/login
  ↓
generate state + nonce + PKCE
  ↓
store transaction
  ↓
redirect to provider
  ↓
/callback?code=...&state=...
  ↓
validate state
  ↓
exchange code + verifier
  ↓
validate ID Token
  ↓
create application session
```

## 3. Server-side session architecture

A strong pattern for many web applications is:

```text
Browser
  |
  | Secure + HttpOnly session cookie
  v
Backend / BFF
  |
  | OAuth credentials
  v
Provider / API
```

This can reduce exposure of OAuth credential material to browser JavaScript.

## 4. Callback handler

Pseudo-code:

```js
async function callback(req, res) {
  const tx = await transactionStore.consume(req.query.state);

  if (!tx) throw new BadRequest("invalid state");

  const tokens = await oauthClient.exchangeCode({
    code: req.query.code,
    redirectUri: tx.redirectUri,
    codeVerifier: tx.codeVerifier,
  });

  const identity = await oidcVerifier.verify(tokens.id_token, {
    nonce: tx.nonce,
  });

  await sessionService.create(res, identity);
}
```

This is intentionally framework-neutral.

## 5. Session fixation concerns

Do not keep a pre-login session identifier as the authenticated session without regeneration /
rotation where your framework requires it.

Authentication should result in a fresh authenticated session boundary.

## 6. Token refresh

Refresh logic should handle:

```text
normal refresh
rotated refresh token
invalid_grant
re-authentication required
provider outage
concurrent refresh races
```

A distributed system may need a lock or single-flight strategy around refresh rotation.

## 7. Return-to handling

If the login flow supports `returnTo`, allow-list internal destinations.

Never blindly redirect to:

```text
?returnTo=https://attacker.example
```

## 8. Client testing

Automate:

```text
state mismatch
missing code
PKCE mismatch
wrong issuer
wrong audience
nonce mismatch
expired ID Token
invalid signature
refresh token reuse
session expiration
```

## 9. Exercise

Build a server-rendered or BFF-style client and document:

- threat model
- session model
- token storage
- callback validation
- provider key rotation
- failure behavior
