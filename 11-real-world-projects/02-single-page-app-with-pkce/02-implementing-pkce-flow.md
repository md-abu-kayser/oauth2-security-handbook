# 02 — Implementing PKCE Flow

## 1. Generate verifier

Use a cryptographically secure random source. Example for Node tooling:

```js
import crypto from "node:crypto";

const verifier = crypto.randomBytes(32).toString("base64url");
```

In browser code use Web Crypto or a vetted library.

## 2. Derive S256 challenge

```text
challenge = BASE64URL(SHA256(verifier))
```

Send:

```text
code_challenge=...
code_challenge_method=S256
```

Keep the verifier out of the authorization URL.

## 3. Callback sequence

```text
callback
  ↓
check provider error
  ↓
validate state
  ↓
load transaction
  ↓
exchange code + verifier
  ↓
validate returned artifacts
  ↓
create session
```

## 4. Attack tests

```text
wrong verifier -> reject
missing verifier -> reject when required
reused code -> reject
wrong state -> reject
expired transaction -> reject
```

## 5. Lab

Implement a local mock Authorization Server that stores the challenge with the authorization code and rejects an exchange whose verifier does not produce the same S256 challenge.
